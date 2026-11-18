/**
 * Modern Physics 2027 — Track B: Computational & Experimental Physics Research Solvers
 * Pure-JS, zero-dependency numerical methods (Split-Step Fourier TDSE, Seeded Monte Carlo,
 * Levenberg-Marquardt Non-Linear Least Squares, and FAIR Simulation Manifests).
 */
(() => {
  'use strict';

  const CODATA_2022 = Object.freeze({
    h: 6.62607015e-34,
    hbar: 1.054571817e-34,
    c: 299792458,
    e: 1.602176634e-19,
    me: 9.1093837015e-31,
    mp: 1.67262192369e-27,
    mn: 1.67492749804e-27,
    kB: 1.380649e-23,
    eps0: 8.8541878128e-12,
    rydberg: 10973731.56816,
    amu: 1.6605390666e-27,
  });

  // Deterministic Mulberry32 PRNG for reproducible Monte Carlo simulations
  function createRng(seed = 2027) {
    let s = (Number(seed) >>> 0) || 1;
    return function next() {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gaussianRand(rng) {
    const u1 = Math.max(1e-12, rng());
    const u2 = rng();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  function poissonRand(lambda, rng) {
    if (lambda <= 0) return 0;
    if (lambda > 30) {
      return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * gaussianRand(rng)));
    }
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= rng();
    } while (p > L);
    return k - 1;
  }

  // In-place Radix-2 Cooley-Tukey FFT (N must be power of 2)
  function fft(re, im, inverse = false) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) {
        [re[i], re[j]] = [re[j], re[i]];
        [im[i], im[j]] = [im[j], im[i]];
      }
    }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = (2 * Math.PI / len) * (inverse ? 1 : -1);
      const wlenRe = Math.cos(ang);
      const wlenIm = Math.sin(ang);
      for (let i = 0; i < n; i += len) {
        let wRe = 1;
        let wIm = 0;
        for (let j = 0; j < len / 2; j++) {
          const uRe = re[i + j];
          const uIm = im[i + j];
          const vRe = re[i + j + len / 2] * wRe - im[i + j + len / 2] * wIm;
          const vIm = re[i + j + len / 2] * wIm + im[i + j + len / 2] * wRe;
          re[i + j] = uRe + vRe;
          im[i + j] = uIm + vIm;
          re[i + j + len / 2] = uRe - vRe;
          im[i + j + len / 2] = uIm - vIm;
          const nextWRe = wRe * wlenRe - wIm * wlenIm;
          wIm = wRe * wlenIm + wIm * wlenRe;
          wRe = nextWRe;
        }
      }
    }
    if (inverse) {
      for (let i = 0; i < n; i++) {
        re[i] /= n;
        im[i] /= n;
      }
    }
  }

  // Split-Step Fourier Method (SSFM) for 1D TDSE (hbar = m = 1)
  function solveTdse1D({
    potentialType = 'single_barrier',
    V0 = 4.0,
    barrierWidth = 1.2,
    k0 = 2.6,
    sigma = 1.0,
    x0 = -6.0,
    steps = 120,
    dt = 0.025,
    N = 256,
    L = 32.0,
  } = {}) {
    const dx = L / N;
    const x = new Float64Array(N);
    const V = new Float64Array(N);
    const psiRe = new Float64Array(N);
    const psiIm = new Float64Array(N);

    for (let i = 0; i < N; i++) {
      const xi = -L / 2 + i * dx;
      x[i] = xi;
      if (potentialType === 'single_barrier') {
        V[i] = (xi >= 0 && xi <= barrierWidth) ? V0 : 0;
      } else if (potentialType === 'double_barrier') {
        const gap = barrierWidth;
        const inFirst = xi >= -gap && xi <= 0;
        const inSecond = xi >= gap && xi <= gap * 2;
        V[i] = (inFirst || inSecond) ? V0 : 0;
      } else if (potentialType === 'harmonic') {
        V[i] = 0.06 * V0 * xi * xi;
      } else if (potentialType === 'step') {
        V[i] = xi >= 0 ? V0 : 0;
      }

      const d = xi - x0;
      const env = Math.exp(-(d * d) / (4 * sigma * sigma));
      psiRe[i] = env * Math.cos(k0 * xi);
      psiIm[i] = env * Math.sin(k0 * xi);
    }

    // Normalize initial wavefunction
    let norm0 = 0;
    for (let i = 0; i < N; i++) norm0 += (psiRe[i] * psiRe[i] + psiIm[i] * psiIm[i]) * dx;
    const invNorm0 = 1 / Math.sqrt(Math.max(1e-12, norm0));
    for (let i = 0; i < N; i++) {
      psiRe[i] *= invNorm0;
      psiIm[i] *= invNorm0;
    }

    // Momentum grid k
    const kArr = new Float64Array(N);
    const dk = (2 * Math.PI) / L;
    for (let i = 0; i < N; i++) {
      kArr[i] = (i < N / 2 ? i : i - N) * dk;
    }

    // Precompute half-step potential & full-step kinetic operators
    const halfVRe = new Float64Array(N);
    const halfVIm = new Float64Array(N);
    const kinRe = new Float64Array(N);
    const kinIm = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const thV = -0.5 * V[i] * dt;
      halfVRe[i] = Math.cos(thV);
      halfVIm[i] = Math.sin(thV);
      const thK = -0.5 * kArr[i] * kArr[i] * dt;
      kinRe[i] = Math.cos(thK);
      kinIm[i] = Math.sin(thK);
    }

    for (let s = 0; s < steps; s++) {
      for (let i = 0; i < N; i++) {
        const r = psiRe[i] * halfVRe[i] - psiIm[i] * halfVIm[i];
        const m = psiRe[i] * halfVIm[i] + psiIm[i] * halfVRe[i];
        psiRe[i] = r;
        psiIm[i] = m;
      }
      fft(psiRe, psiIm, false);
      for (let i = 0; i < N; i++) {
        const r = psiRe[i] * kinRe[i] - psiIm[i] * kinIm[i];
        const m = psiRe[i] * kinIm[i] + psiIm[i] * kinRe[i];
        psiRe[i] = r;
        psiIm[i] = m;
      }
      fft(psiRe, psiIm, true);
      for (let i = 0; i < N; i++) {
        const r = psiRe[i] * halfVRe[i] - psiIm[i] * halfVIm[i];
        const m = psiRe[i] * halfVIm[i] + psiIm[i] * halfVRe[i];
        psiRe[i] = r;
        psiIm[i] = m;
      }
    }

    const prob = new Float64Array(N);
    let norm = 0;
    let expectX = 0;
    let expectX2 = 0;
    let transmissionT = 0;
    let reflectionR = 0;
    const rightBound = potentialType === 'double_barrier' ? barrierWidth * 2 : (potentialType === 'single_barrier' ? barrierWidth : 0);

    for (let i = 0; i < N; i++) {
      const p = psiRe[i] * psiRe[i] + psiIm[i] * psiIm[i];
      prob[i] = p;
      const w = p * dx;
      norm += w;
      expectX += x[i] * w;
      expectX2 += x[i] * x[i] * w;
      if (x[i] > rightBound) transmissionT += w;
      else if (x[i] < 0) reflectionR += w;
    }
    const deltaX = Math.sqrt(Math.max(0, expectX2 - expectX * expectX));

    // Compute <p> and deltaP in k-space
    const kRe = new Float64Array(psiRe);
    const kIm = new Float64Array(psiIm);
    fft(kRe, kIm, false);
    let kNorm = 0;
    let expectP = 0;
    let expectP2 = 0;
    for (let i = 0; i < N; i++) {
      const kp = kRe[i] * kRe[i] + kIm[i] * kIm[i];
      kNorm += kp;
      expectP += kArr[i] * kp;
      expectP2 += kArr[i] * kArr[i] * kp;
    }
    if (kNorm > 0) {
      expectP /= kNorm;
      expectP2 /= kNorm;
    }
    const deltaP = Math.sqrt(Math.max(0, expectP2 - expectP * expectP));

    return {
      x: Array.from(x),
      V: Array.from(V),
      psiRe: Array.from(psiRe),
      psiIm: Array.from(psiIm),
      probDensity: Array.from(prob),
      normCheck: norm,
      transmissionT,
      reflectionR,
      expectX,
      expectP,
      deltaX,
      deltaP,
      uncertaintyProduct: deltaX * deltaP,
      kineticEnergyInitial: 0.5 * k0 * k0,
    };
  }

  // Seeded Monte Carlo Radioactive Decay with Poisson Counting Statistics
  function simulateMonteCarloDecay({
    N0 = 1000,
    halfLife = 8.02,
    tMax = 32.0,
    steps = 32,
    seed = 2027,
  } = {}) {
    const rng = createRng(seed);
    const lam = Math.LN2 / Math.max(1e-6, halfLife);
    const dt = tMax / steps;
    const probDecay = 1 - Math.exp(-lam * dt);
    const series = [];
    let currentN = Math.max(1, Math.round(N0));
    let chi2 = 0;

    for (let i = 0; i <= steps; i++) {
      const t = i * dt;
      const expected = N0 * Math.exp(-lam * t);
      const sigma = Math.sqrt(Math.max(1, currentN));
      const observedCount = Math.max(0, poissonRand(currentN, rng));
      if (expected > 1) {
        chi2 += Math.pow(observedCount - expected, 2) / expected;
      }
      series.push({
        t,
        mcN: currentN,
        observedNoisy: observedCount,
        sigma,
        analyticalN: expected,
      });
      // Binomial survival step
      let decayed = 0;
      for (let k = 0; k < currentN; k++) {
        if (rng() < probDecay) decayed++;
      }
      currentN = Math.max(0, currentN - decayed);
    }

    return {
      seed,
      lambda: lam,
      chi2Reduced: chi2 / Math.max(1, steps - 1),
      series,
    };
  }

  // Parse CSV text (x,y or x,y,sigma)
  function parseExperimentalCsv(csvText) {
    const lines = String(csvText || '').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    const points = [];
    for (const line of lines) {
      const parts = line.split(/[,\t;]+/).map((p) => p.trim());
      if (parts.length < 2) continue;
      const x = parseFloat(parts[0]);
      const y = parseFloat(parts[1]);
      const sy = parts.length >= 3 ? parseFloat(parts[2]) : NaN;
      if (Number.isFinite(x) && Number.isFinite(y)) {
        points.push({ x, y, sigma: Number.isFinite(sy) && sy > 0 ? sy : 1.0 });
      }
    }
    return points;
  }

  // Solve symmetric linear system A * dx = b (small matrix <= 4x4)
  function solveLinear(A, b) {
    const n = b.length;
    const M = A.map((row, i) => [...row, b[i]]);
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
      }
      [M[i], M[maxRow]] = [M[maxRow], M[i]];
      const piv = Math.abs(M[i][i]) < 1e-12 ? 1e-12 : M[i][i];
      for (let j = i; j <= n; j++) M[i][j] /= piv;
      for (let k = 0; k < n; k++) {
        if (k === i) continue;
        const f = M[k][i];
        for (let j = i; j <= n; j++) M[k][j] -= f * M[i][j];
      }
    }
    return M.map((row) => row[n]);
  }

  // Levenberg-Marquardt Non-Linear Least Squares Curve Fitter
  function fitExperimentalData(points, modelName = 'linear') {
    if (!Array.isArray(points) || points.length < 3) {
      throw new Error('ต้องมีจุดข้อมูลอย่างน้อย 3 จุดสำหรับการทำ Curve Fitting');
    }

    const models = {
      linear: {
        label: 'Linear: y = a·x + b',
        paramNames: ['a (slope)', 'b (intercept)'],
        init: (pts) => {
          const n = pts.length;
          const mx = pts.reduce((s, p) => s + p.x, 0) / n;
          const my = pts.reduce((s, p) => s + p.y, 0) / n;
          let num = 0, den = 0;
          pts.forEach((p) => { num += (p.x - mx) * (p.y - my); den += (p.x - mx) ** 2; });
          const a = den !== 0 ? num / den : 1;
          return [a, my - a * mx];
        },
        fn: (x, p) => p[0] * x + p[1],
      },
      exponential_decay: {
        label: 'Exponential Decay: N(t) = N₀·exp(−λt)',
        paramNames: ['N₀', 'λ (decay constant)'],
        init: (pts) => {
          const y0 = Math.max(1, pts[0].y);
          const yEnd = Math.max(0.5, pts[pts.length - 1].y);
          const dt = Math.max(1e-3, pts[pts.length - 1].x - pts[0].x);
          const lam = Math.max(1e-4, Math.log(y0 / yEnd) / dt);
          return [y0, lam];
        },
        fn: (x, p) => p[0] * Math.exp(-p[1] * x),
      },
      inverse_square: {
        label: 'Inverse Square: y = A / (x + x₀)² + B',
        paramNames: ['A', 'x₀', 'B'],
        init: () => [1.0, 0.1, 0.0],
        fn: (x, p) => p[0] / Math.pow(Math.max(1e-3, x + p[1]), 2) + p[2],
      },
    };

    const m = models[modelName] || models.linear;
    let params = m.init(points);
    const k = params.length;
    let lambdaLm = 1e-3;
    const eps = 1e-6;

    const evalResiduals = (p) => points.map((pt) => (pt.y - m.fn(pt.x, p)) / pt.sigma);
    const sumSq = (r) => r.reduce((s, v) => s + v * v, 0);

    let r = evalResiduals(params);
    let chi2 = sumSq(r);

    for (let iter = 0; iter < 60; iter++) {
      const J = points.map((pt, i) => {
        const row = [];
        for (let j = 0; j < k; j++) {
          const pPlus = [...params];
          pPlus[j] += eps;
          row.push(-(m.fn(pt.x, pPlus) - m.fn(pt.x, params)) / (eps * pt.sigma));
        }
        return row;
      });

      const JtJ = Array.from({ length: k }, () => new Array(k).fill(0));
      const Jtr = new Array(k).fill(0);
      for (let i = 0; i < points.length; i++) {
        for (let a = 0; a < k; a++) {
          Jtr[a] -= J[i][a] * r[i];
          for (let b = 0; b < k; b++) JtJ[a][b] += J[i][a] * J[i][b];
        }
      }

      const A = JtJ.map((row, a) => row.map((v, b) => (a === b ? v * (1 + lambdaLm) + 1e-9 : v)));
      const delta = solveLinear(A, Jtr);
      const nextParams = params.map((v, j) => v + delta[j]);
      const nextR = evalResiduals(nextParams);
      const nextChi2 = sumSq(nextR);

      if (nextChi2 < chi2) {
        params = nextParams;
        r = nextR;
        const diff = Math.abs(chi2 - nextChi2);
        chi2 = nextChi2;
        lambdaLm = Math.max(1e-7, lambdaLm * 0.3);
        if (diff < 1e-9) break;
      } else {
        lambdaLm = Math.min(1e6, lambdaLm * 5);
      }
    }

    const dof = Math.max(1, points.length - k);
    const reducedChi2 = chi2 / dof;
    const meanY = points.reduce((s, p) => s + p.y, 0) / points.length;
    const ssTot = points.reduce((s, p) => s + (p.y - meanY) ** 2, 0);
    const ssRes = points.reduce((s, p) => s + (p.y - m.fn(p.x, params)) ** 2, 0);
    const r2 = ssTot > 0 ? 1 - ssRes / ssTot : 1;
    const rmse = Math.sqrt(ssRes / points.length);

    // Estimate standard errors from diagonal of (J^T J)^-1 * reducedChi2
    const JtJFinal = Array.from({ length: k }, () => new Array(k).fill(0));
    for (let i = 0; i < points.length; i++) {
      const row = [];
      for (let j = 0; j < k; j++) {
        const pPlus = [...params];
        pPlus[j] += eps;
        row.push((m.fn(points[i].x, pPlus) - m.fn(points[i].x, params)) / (eps * points[i].sigma));
      }
      for (let a = 0; a < k; a++) for (let b = 0; b < k; b++) JtJFinal[a][b] += row[a] * row[b];
    }
    const paramErrors = [];
    for (let j = 0; j < k; j++) {
      const unit = new Array(k).fill(0);
      unit[j] = 1;
      const col = solveLinear(JtJFinal, unit);
      paramErrors.push(Math.sqrt(Math.max(0, col[j] * reducedChi2)));
    }

    return {
      model: modelName,
      modelLabel: m.label,
      params: params.map((v, j) => ({ name: m.paramNames[j], value: v, se: paramErrors[j] })),
      r2,
      rmse,
      reducedChi2,
      fittedCurve: points.map((p) => ({ x: p.x, yObs: p.y, yFit: m.fn(p.x, params), residual: p.y - m.fn(p.x, params) })),
    };
  }

  function buildResearchManifest({ module = 'research_lab', solver = 'analytical', seed = 2027, parameters = {}, diagnostics = {} } = {}) {
    return {
      schema: 'mp2027.fair.v1',
      generated_at: new Date().toISOString(),
      module,
      solver,
      seed,
      constants_standard: 'CODATA-2022',
      codata_constants: CODATA_2022,
      parameters,
      diagnostics,
      environment: typeof navigator !== 'undefined' ? navigator.userAgent : 'node-cli',
    };
  }

  const api = {
    CODATA_2022,
    createRng,
    solveTdse1D,
    simulateMonteCarloDecay,
    parseExperimentalCsv,
    fitExperimentalData,
    buildResearchManifest,
  };

  if (typeof window !== 'undefined') window.MP27Solvers = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
