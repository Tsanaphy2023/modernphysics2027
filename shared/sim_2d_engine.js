/* Modern Physics 2027 — Real-Time Interactive 2D Physics Simulation Engine (All 9 Labs & All Sub-Stations) */
(() => {
  let rafId = 0;
  let activeMod = null;
  let canvasEl = null;
  let t0 = performance.now();

  function numVal(sel, fallback) {
    const el = document.querySelector(sel);
    if (!el) return fallback;
    const v = parseFloat(el.value);
    return Number.isFinite(v) ? v : fallback;
  }

  function strVal(sel, fallback) {
    const el = document.querySelector(sel);
    return el ? String(el.value || fallback) : fallback;
  }

  function firstSliderVal(fallback = 1) {
    const el = document.querySelector('input[type="range"]:not([id*="timeScale"]):not([id*="speed"])');
    if (!el) return fallback;
    const v = parseFloat(el.value);
    return Number.isFinite(v) ? v : fallback;
  }

  function getActiveSubStation(modKey) {
    if (modKey === 'relativity' || modKey === 'electron_diffraction') {
      return document.querySelector('#moduleNav .active')?.dataset?.module || '';
    }
    if (modKey === 'quantum_light') {
      return document.querySelector('#tabs .tab.active')?.dataset?.i || '0';
    }
    if (modKey === 'matter_waves' || modKey === 'atomic_models') {
      return document.querySelector('[data-module].active')?.dataset?.module || '';
    }
    if (modKey === 'quantum_mechanics') {
      const btns = Array.from(document.querySelectorAll('#modules button'));
      const idx = btns.findIndex((b) => b.classList.contains('active'));
      return idx >= 0 ? String(idx) : '0';
    }
    if (modKey === 'solid_state') {
      return document.querySelector('.tab.active')?.dataset?.id || 'molecule';
    }
    if (modKey === 'nuclear_physics') {
      const a = document.querySelector('#nav .active');
      return a?.dataset?.tab || a?.dataset?.module || 'nucleus';
    }
    if (modKey === 'particle_physics') {
      return document.querySelector('.nav-button.active')?.dataset?.tab || 'forces';
    }
    return '';
  }

  function wlToCss(nm) {
    if (nm < 380) return '#8b5cf6';
    if (nm < 450) return '#6366f1';
    if (nm < 495) return '#0ea5e9';
    if (nm < 570) return '#22c55e';
    if (nm < 595) return '#eab308';
    if (nm < 635) return '#f97316';
    return '#ef4444';
  }

  function drawFrame(now) {
    if (!canvasEl || !activeMod) return;
    const rect = canvasEl.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = Math.max(320, Math.round(rect.width));
    const H = Math.max(220, Math.round(rect.height));
    if (canvasEl.width !== Math.round(W * dpr) || canvasEl.height !== Math.round(H * dpr)) {
      canvasEl.width = Math.round(W * dpr);
      canvasEl.height = Math.round(H * dpr);
    }
    const g = canvasEl.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isLight = document.documentElement.classList.contains('mp27-light');
    const bg = isLight ? '#ffffff' : '#081426';
    const fg = isLight ? '#0f172a' : '#f1f5f9';
    const sub = isLight ? '#475569' : '#94a3b8';
    const gridCol = isLight ? '#e2e8f0' : '#172c47';
    const accent = isLight ? '#1d4ed8' : '#38bdf8';
    const t = (now - t0) / 1000;
    const subMod = getActiveSubStation(activeMod);

    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    g.strokeStyle = gridCol;
    g.lineWidth = 1;
    for (let x = 0; x < W; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y < H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }

    // ===== 1. SPECIAL RELATIVITY (6 STATIONS) =====
    if (activeMod === 'relativity') {
      const beta = Math.max(-0.95, Math.min(0.95, numVal('#beta', 0.6)));
      const gamma = 1 / Math.sqrt(1 - beta * beta);
      if (subMod === 'transforms') {
        const ox = W * 0.48, oy = H * 0.78, scale = Math.min(W, H) * 0.095;
        const evX = numVal('#field-x', 2), evT = numVal('#field-tEvent', 1);
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Minkowski Spacetime (S vs S')  |  β = ${beta.toFixed(2)}c, γ = ${gamma.toFixed(3)}`, 14, 22);
        g.strokeStyle = accent; g.lineWidth = 2;
        g.beginPath(); g.moveTo(40, oy); g.lineTo(W - 30, oy); g.stroke();
        g.beginPath(); g.moveTo(ox, oy + 20); g.lineTo(ox, 36); g.stroke();
        g.setLineDash([5, 4]); g.strokeStyle = '#f59e0b'; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(ox - 160, oy - 160); g.lineTo(ox, oy); g.lineTo(ox + 160, oy - 160); g.stroke();
        g.setLineDash([]);
        const tilt = beta * 145;
        g.strokeStyle = '#a855f7'; g.lineWidth = 2.2;
        g.beginPath(); g.moveTo(ox, oy); g.lineTo(ox + tilt, oy - 145); g.stroke();
        g.beginPath(); g.moveTo(ox - 145, oy + tilt); g.lineTo(ox + 145, oy - tilt); g.stroke();
        const px = ox + evX * scale, py = oy - evT * scale;
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(px, py, 6.5, 0, Math.PI * 2); g.fill();
        g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
        g.fillText('x (S)', W - 56, oy - 8); g.fillText('ct (S)', ox + 8, 46);
        g.fillStyle = '#c084fc'; g.fillText("ct'", ox + tilt + 6, oy - 140); g.fillText("x'", ox + 130, oy - tilt - 8);
        g.fillStyle = '#fbbf24'; g.fillText(`E(${evX.toFixed(1)}, ${evT.toFixed(1)})`, px + 9, py - 4);
      } else if (subMod === 'doppler') {
        const f0 = numVal('#field-f0', 500);
        const fObs = f0 * Math.sqrt((1 + beta) / (1 - beta));
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Relativistic Doppler  |  β = ${beta.toFixed(2)}c, f₀ = ${f0} THz → f_obs = ${fObs.toFixed(1)} THz`, 14, 22);
        const sx = W * 0.35 + Math.sin(t * 0.7) * 20, sy = H * 0.54;
        for (let i = 0; i < 6; i++) {
          const age = ((t * 1.1 + i / 6) % 1);
          const wx = sx - beta * 90 * age;
          const r = age * Math.min(W, H) * 0.42;
          g.strokeStyle = beta >= 0 ? '#38bdf8' : '#fb7185';
          g.globalAlpha = Math.max(0.15, 1 - age); g.lineWidth = 2;
          g.beginPath(); g.arc(wx, sy, r, 0, Math.PI * 2); g.stroke();
        }
        g.globalAlpha = 1;
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(sx, sy, 8, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#34d399'; g.fillRect(W * 0.84, sy - 18, 16, 36);
        g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
        g.fillText('แหล่งกำเนิด S′', sx - 30, sy + 24); g.fillText('ตัวตรวจวัด S', W * 0.80, sy + 34);
      } else if (subMod === 'momentum') {
        const m = numVal('#field-m', 1);
        const pCls = m * Math.abs(beta), pRel = gamma * pCls;
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Relativistic vs Classical Momentum  |  p_rel = ${pRel.toFixed(2)} mc vs p_cls = ${pCls.toFixed(2)} mc`, 14, 22);
        const px = 60 + ((t * (60 + Math.abs(beta) * 140)) % (W - 140));
        const yRel = H * 0.38, yCls = H * 0.68;
        g.fillStyle = '#a855f7'; g.beginPath(); g.arc(px, yRel, 11, 0, Math.PI * 2); g.fill();
        g.fillRect(px + 14, yRel - 5, Math.min(180, pRel * 42), 10);
        g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(px, yCls, 11, 0, Math.PI * 2); g.fill();
        g.fillRect(px + 14, yCls - 5, Math.min(180, pCls * 42), 10);
        g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
        g.fillText('Relativistic (γmv)', 24, yRel - 18); g.fillText('Classical (mv)', 24, yCls - 18);
      } else if (subMod === 'equivalence') {
        const dm = numVal('#field-deltaM', 0.001);
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Mass–Energy Equivalence  |  Δm = ${dm} kg → E = ${(dm * 8.98755e16).toExponential(2)} J`, 14, 22);
        const cx = W * 0.5, cy = H * 0.54;
        for (let i = 0; i < 4; i++) {
          const u = (t * 0.8 + i / 4) % 1;
          g.strokeStyle = '#34d399'; g.globalAlpha = 1 - u; g.lineWidth = 2.5;
          g.beginPath(); g.arc(cx, cy, 18 + u * 120, 0, Math.PI * 2); g.stroke();
        }
        g.globalAlpha = 1;
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx, cy, 20 + Math.sin(t * 6) * 2.5, 0, Math.PI * 2); g.fill();
      } else {
        const midX = W * 0.42;
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Light Clock & Contraction (${(subMod || 'dilation').toUpperCase()})  |  β = ${beta.toFixed(2)}c, γ = ${gamma.toFixed(3)}`, 14, 22);
        const lx = W * 0.16, topY = 58, botY = H - 36;
        g.strokeStyle = accent; g.lineWidth = 4;
        g.beginPath(); g.moveTo(lx - 34, topY); g.lineTo(lx + 34, topY); g.stroke();
        g.beginPath(); g.moveTo(lx - 34, botY); g.lineTo(lx + 34, botY); g.stroke();
        const pS = 0.5 - 0.5 * Math.cos(t * 3.0);
        g.fillStyle = '#f59e0b'; g.beginPath(); g.arc(lx, botY - pS * (botY - topY), 7, 0, Math.PI * 2); g.fill();
        const rx0 = midX + 20, rx1 = W - 28, rSpan = rx1 - rx0;
        const shipW = Math.max(24, 96 / gamma);
        const cx = rx0 + ((t * Math.abs(beta) * 90 + rSpan * 0.5) % rSpan);
        g.fillStyle = isLight ? '#dbeafe' : '#1e3a5f'; g.strokeStyle = '#7c3aed'; g.lineWidth = 2;
        g.fillRect(cx - shipW / 2, (topY + botY) / 2 - 18, shipW, 36); g.strokeRect(cx - shipW / 2, (topY + botY) / 2 - 18, shipW, 36);
        const pSp = 0.5 - 0.5 * Math.cos((t * 3.0) / gamma);
        g.fillStyle = '#a855f7'; g.beginPath(); g.arc(cx, botY - pSp * (botY - topY), 7, 0, Math.PI * 2); g.fill();
        g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
        g.fillText('กรอบนิ่ง S (Δτ)', lx - 38, H - 14);
        g.fillText(`กรอบยาน S' (หด ${(100 / gamma).toFixed(0)}%, ช้า ${gamma.toFixed(2)}×)`, midX + 20, H - 14);
      }

    // ===== 2. QUANTUM THEORY OF LIGHT (5 STATIONS) =====
    } else if (activeMod === 'quantum_light') {
      if (subMod === '0') {
        const T = numVal('#ctrl-T', 5800);
        const peakNm = 2.89777e6 / T;
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Blackbody Cavity  |  T = ${T.toFixed(0)} K, λ_max = ${peakNm.toFixed(0)} nm`, 14, 22);
        const cx = W * 0.34, cy = H * 0.54;
        g.strokeStyle = sub; g.lineWidth = 6;
        g.beginPath(); g.arc(cx, cy, 62, 0.25, Math.PI * 2 - 0.25); g.stroke();
        g.fillStyle = wlToCss(Math.min(700, Math.max(380, peakNm)));
        g.beginPath(); g.arc(cx, cy, 46, 0, Math.PI * 2); g.fill();
        for (let i = 0; i < 6; i++) {
          const u = (t * 0.9 + i / 6) % 1;
          g.fillStyle = '#fbbf24';
          g.beginPath(); g.arc(cx + 60 + u * (W * 0.42), cy + Math.sin(u * 12 + i) * 14, 4.5, 0, Math.PI * 2); g.fill();
        }
        g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
        g.fillText('เตาวัตถุดำ (Cavity)', cx - 44, H - 14); g.fillText('รังสีออกสู่ Spectrometer →', W * 0.62, H - 14);
      } else if (subMod === '2') {
        const V = numVal('#ctrl-V', 50), tg = strVal('#ctrl-target', 'Cu');
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Coolidge X-Ray Tube  |  V = ${V} kV, Target = ${tg} (45°), λ_min = ${(1.24 / V).toFixed(4)} nm`, 14, 22);
        const cx = W * 0.2, ax = W * 0.62, midY = H * 0.48;
        g.strokeStyle = sub; g.lineWidth = 2; g.strokeRect(cx - 20, 56, W * 0.62, H - 108);
        g.fillStyle = '#f97316'; g.fillRect(cx - 8, midY - 14, 14, 28); // Cathode
        g.save(); g.translate(ax, midY); g.rotate(Math.PI / 4);
        g.fillStyle = tg === 'Cu' ? '#ea580c' : '#94a3b8'; g.fillRect(-8, -32, 16, 64); g.restore();
        for (let i = 0; i < 6; i++) {
          const u = (t * (0.8 + V / 80) + i / 6) % 1;
          g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(cx + 12 + u * (ax - cx - 20), midY, 4, 0, Math.PI * 2); g.fill();
          g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(ax + ((i % 3) - 1) * 10, midY + 18 + u * (H - midY - 38), 4, 0, Math.PI * 2); g.fill();
        }
        g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
        g.fillText('e⁻ Beam', (cx + ax) / 2 - 20, midY - 14); g.fillText('↓ X-Ray Window (Be)', ax - 48, H - 12);
      } else if (subMod === '3') {
        const E = numVal('#ctrl-E', 662), theta = numVal('#ctrl-theta', 75);
        const th = (theta * Math.PI) / 180;
        const phi = th < 1e-3 ? Math.PI / 2 : Math.atan(1 / ((1 + E / 511) * Math.tan(th / 2)));
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Compton Scattering  |  E = ${E} keV, θ = ${theta}°, φ = ${(phi * 180 / Math.PI).toFixed(1)}°`, 14, 22);
        const cx = W * 0.45, cy = H * 0.54;
        g.strokeStyle = '#38bdf8'; g.lineWidth = 2.5;
        g.beginPath(); g.moveTo(40, cy); g.lineTo(cx, cy); g.stroke();
        g.strokeStyle = '#fbbf24'; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + 130 * Math.cos(th), cy - 130 * Math.sin(th)); g.stroke();
        g.strokeStyle = '#60a5fa'; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + 115 * Math.cos(phi), cy + 115 * Math.sin(phi)); g.stroke();
        const u = (t * 1.1) % 1;
        g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(40 + (cx - 40) * u, cy, 5, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx + 130 * Math.cos(th) * u, cy - 130 * Math.sin(th) * u, 5, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#60a5fa'; g.beginPath(); g.arc(cx + 115 * Math.cos(phi) * u, cy + 115 * Math.sin(phi) * u, 5, 0, Math.PI * 2); g.fill();
        g.fillStyle = fg; g.beginPath(); g.arc(cx, cy, 8, 0, Math.PI * 2); g.fill();
      } else if (subMod === '4') {
        const E = numVal('#ctrl-E', 1.5), mode = strVal('#ctrl-mode', 'creation');
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D ${mode === 'creation' ? 'Pair Production (γ → e⁻ + e⁺)' : 'Pair Annihilation (e⁻ + e⁺ → 2γ)'}  |  E = ${E.toFixed(2)} MeV`, 14, 22);
        const cx = W * 0.48, cy = H * 0.54;
        const u = (t * 0.85) % 1;
        if (mode === 'creation') {
          g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx, cy, 12, 0, Math.PI * 2); g.fill();
          g.strokeStyle = '#fbbf24'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(40, cy); g.lineTo(cx, cy); g.stroke();
          if (E >= 1.022) {
            g.strokeStyle = '#38bdf8'; g.beginPath(); g.moveTo(cx, cy); g.quadraticCurveTo(cx + 80, cy - 10, cx + 160, cy - 75); g.stroke();
            g.strokeStyle = '#f43f5e'; g.beginPath(); g.moveTo(cx, cy); g.quadraticCurveTo(cx + 80, cy + 10, cx + 160, cy + 75); g.stroke();
            g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(cx + 160 * u, cy - 75 * u * u, 5.5, 0, Math.PI * 2); g.fill();
            g.fillStyle = '#f43f5e'; g.beginPath(); g.arc(cx + 160 * u, cy + 75 * u * u, 5.5, 0, Math.PI * 2); g.fill();
          } else {
            g.fillStyle = '#ef4444'; g.fillText('E < 1.022 MeV (ไม่เกิดคู่อนุภาค)', cx + 20, cy - 10);
          }
        } else {
          if (u < 0.5) {
            const p = u * 2;
            g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(cx - 140 * (1 - p), cy, 6.5, 0, Math.PI * 2); g.fill();
            g.fillStyle = '#f43f5e'; g.beginPath(); g.arc(cx + 140 * (1 - p), cy, 6.5, 0, Math.PI * 2); g.fill();
          } else {
            const p = (u - 0.5) * 2;
            g.fillStyle = '#fbbf24';
            g.beginPath(); g.arc(cx, cy - 100 * p, 6, 0, Math.PI * 2); g.fill();
            g.beginPath(); g.arc(cx, cy + 100 * p, 6, 0, Math.PI * 2); g.fill();
          }
        }
      } else {
        // Photoelectric (subMod === '1')
        const wl = numVal('#ctrl-wl', 350), E = 1239.84 / wl, metal = strVal('#ctrl-metal', 'Na');
        const phi = { Na: 2.28, K: 2.30, Zn: 4.30, Cu: 4.70 }[metal] || 2.28;
        const beamCol = wlToCss(wl);
        g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
        g.fillText(`2D Photoelectric Tube  |  λ = ${wl.toFixed(0)} nm (${E.toFixed(2)} eV) vs φ(${metal}) = ${phi.toFixed(2)} eV`, 14, 22);
        const cx = W * 0.34, ax = W * 0.78, midY = H * 0.54;
        g.strokeStyle = sub; g.lineWidth = 2; g.strokeRect(cx - 24, 54, ax - cx + 56, H - 86);
        g.fillStyle = metal === 'Cu' ? '#d97706' : '#94a3b8'; g.fillRect(cx - 8, 74, 16, H - 126);
        g.fillStyle = accent; g.fillRect(ax - 6, 82, 12, H - 142);
        const lx = W * 0.58, ly = 42;
        g.strokeStyle = beamCol; g.lineWidth = 6; g.globalAlpha = 0.25;
        g.beginPath(); g.moveTo(lx, ly); g.lineTo(cx + 8, midY); g.stroke(); g.globalAlpha = 1;
        for (let i = 0; i < 5; i++) {
          const u = (t * 0.9 + i / 5) % 1;
          g.fillStyle = beamCol; g.beginPath(); g.arc(lx + (cx + 8 - lx) * u, ly + (midY - ly) * u, 5, 0, Math.PI * 2); g.fill();
        }
        if (E > phi) {
          for (let i = 0; i < 6; i++) {
            const u = (t * (0.5 + (E - phi) * 0.4) + i / 6) % 1;
            g.fillStyle = '#06b6d4'; g.beginPath(); g.arc(cx + 12 + (ax - cx - 20) * u, midY + ((i % 3) - 1) * 26, 4.5, 0, Math.PI * 2); g.fill();
          }
        }
      }

    // ===== 3. ELECTRON DIFFRACTION (4 STATIONS) =====
    } else if (activeMod === 'electron_diffraction') {
      const Va = numVal('#voltage', 3.5);
      const lambdaPm = 1226 / Math.sqrt(Va * 1000);
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D ${subMod.toUpperCase()}  |  Vₐ = ${Va.toFixed(2)} kV, λ_dB = ${lambdaPm.toFixed(1)} pm`, 14, 22);
      if (subMod === 'doubleslit') {
        const sx = W * 0.36, detX = W * 0.78, midY = H * 0.54;
        g.fillStyle = '#475569';
        g.fillRect(sx, 50, 8, midY - 76); g.fillRect(sx, midY - 12, 8, 24); g.fillRect(sx, midY + 26, 8, H - midY - 50);
        for (let i = 0; i < 8; i++) {
          const u = (t * 1.1 + i / 8) % 1;
          const targetY = midY + Math.sin(i * 1.7) * 70;
          g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(40 + u * (detX - 40), midY + (u > 0.45 ? (targetY - midY) * (u - 0.45) * 1.8 : 0), 4, 0, Math.PI * 2); g.fill();
        }
        g.strokeStyle = '#34d399'; g.lineWidth = 3;
        g.beginPath();
        for (let y = 54; y < H - 30; y += 3) {
          const dy = (y - midY) / 36;
          const inten = Math.pow(Math.cos(dy * 2.2), 2) * Math.exp(-dy * dy * 0.15);
          if (y === 54) g.moveTo(detX + inten * 55, y); else g.lineTo(detX + inten * 55, y);
        }
        g.stroke();
      } else {
        const sx = W * 0.72, sy = H * 0.54, maxR = Math.min(W * 0.2, H * 0.36);
        const r1 = maxR * (0.42 * Math.sqrt(3.5 / Va)), r2 = maxR * (0.72 * Math.sqrt(3.5 / Va));
        g.strokeStyle = sub; g.lineWidth = 2;
        g.beginPath(); g.moveTo(28, sy - 20); g.lineTo(W * 0.32, sy - 20); g.lineTo(W * 0.46, sy - 64);
        g.lineTo(W * 0.46, sy + 64); g.lineTo(W * 0.32, sy + 20); g.lineTo(28, sy + 20); g.closePath(); g.stroke();
        g.fillStyle = '#475569'; g.fillRect(W * 0.27, sy - 22, 6, 44);
        for (let i = 0; i < 6; i++) {
          const u = (t * 1.4 + i / 6) % 1;
          g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(36 + u * (W * 0.41), sy, 3.5, 0, Math.PI * 2); g.fill();
        }
        g.fillStyle = '#022c22'; g.beginPath(); g.arc(sx, sy, maxR, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#34d399'; g.lineWidth = 3; g.beginPath(); g.arc(sx, sy, Math.min(maxR - 4, r1), 0, Math.PI * 2); g.stroke();
        g.strokeStyle = '#6ee7b7'; g.lineWidth = 2.5; g.beginPath(); g.arc(sx, sy, Math.min(maxR - 2, r2), 0, Math.PI * 2); g.stroke();
      }

    // ===== 4. ATOMIC STRUCTURE MODELS (4 STATIONS) =====
    } else if (activeMod === 'atomic_models') {
      const cx = W * 0.5, cy = H * 0.54;
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      if (subMod === 'scattering') {
        g.fillText('2D Rutherford vs Thomson α-Scattering', 14, 22);
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx, cy, 10, 0, Math.PI * 2); g.fill();
        for (let i = -3; i <= 3; i++) {
          const b = i * 22;
          const defl = i === 0 ? 0.1 : 900 / (Math.abs(b) + 12);
          const u = (t * 0.8 + (i + 3) * 0.12) % 1;
          const px = 40 + u * (W - 80);
          const py = cy + b + (px > cx ? Math.sign(b || 1) * (px - cx) * defl * 0.015 : 0);
          g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(px, py, 4, 0, Math.PI * 2); g.fill();
        }
      } else if (subMod === 'spectrum') {
        const series = strVal('#ctrl-series', 'balmer');
        g.fillText(`2D Hydrogen Emission Spectrum (${series.toUpperCase()})`, 14, 22);
        const lines = series === 'balmer' ? [[656, '#ef4444'], [486, '#06b6d4'], [434, '#3b82f6'], [410, '#8b5cf6']] : [[121, '#a855f7'], [102, '#7c3aed'], [97, '#6366f1']];
        g.fillStyle = '#020617'; g.fillRect(40, 54, W - 80, H - 94);
        lines.forEach(([nm, col], idx) => {
          const lx = 70 + idx * ((W - 140) / Math.max(1, lines.length - 1));
          g.strokeStyle = col; g.lineWidth = 4 + Math.sin(t * 4 + idx) * 1.2;
          g.beginPath(); g.moveTo(lx, 62); g.lineTo(lx, H - 46); g.stroke();
          g.fillStyle = '#e2e8f0'; g.fillText(`${nm} nm`, lx - 18, H - 24);
        });
      } else if (subMod === 'franck') {
        const v = firstSliderVal(14.5);
        g.fillText(`2D Franck–Hertz Tube  |  V = ${v.toFixed(1)} V`, 14, 22);
        g.strokeStyle = sub; g.lineWidth = 2; g.strokeRect(50, 56, W - 100, H - 96);
        g.setLineDash([4, 4]); g.strokeStyle = '#38bdf8'; g.beginPath(); g.moveTo(W * 0.65, 62); g.lineTo(W * 0.65, H - 46); g.stroke(); g.setLineDash([]);
        for (let i = 0; i < 8; i++) {
          const u = (t * 0.9 + i / 8) % 1;
          g.fillStyle = u > 0.5 && v >= 4.9 ? '#f59e0b' : '#38bdf8';
          g.beginPath(); g.arc(60 + u * (W - 130), cy + Math.sin(i * 2) * 35, 4.5, 0, Math.PI * 2); g.fill();
        }
      } else {
        g.fillText('2D Bohr Quantized Orbits (E_n = −13.6 / n² eV)', 14, 22);
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx, cy, 9, 0, Math.PI * 2); g.fill();
        for (let n = 1; n <= 4; n++) {
          g.strokeStyle = accent; g.lineWidth = 1.5;
          g.beginPath(); g.arc(cx, cy, n * 28, 0, Math.PI * 2); g.stroke();
        }
        const r = 3 * 28;
        g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(cx + Math.cos(t * 2.5) * r, cy + Math.sin(t * 2.5) * r, 5.5, 0, Math.PI * 2); g.fill();
      }

    // ===== 5. SOLID STATE PHYSICS (4 STATIONS) =====
    } else if (activeMod === 'solid_state') {
      const cx = W * 0.5, cy = H * 0.55;
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      if (subMod === 'crystal') {
        g.fillText('2D Crystal Lattice Cross-Section (SC / BCC / FCC)', 14, 22);
        const sp = 44;
        for (let ix = -2; ix <= 2; ix++) for (let iy = -1; iy <= 1; iy++) {
          g.fillStyle = (ix + iy) % 2 === 0 ? '#38bdf8' : '#fbbf24';
          g.beginPath(); g.arc(cx + ix * sp, cy + iy * sp, 10, 0, Math.PI * 2); g.fill();
        }
      } else if (subMod === 'materials') {
        g.fillText('2D Energy Bands: Valence Band → E_g → Conduction Band', 14, 22);
        g.fillStyle = '#38bdf8'; g.fillRect(W * 0.25, H * 0.22, W * 0.5, 34);
        g.fillStyle = '#1d4ed8'; g.fillRect(W * 0.25, H * 0.64, W * 0.5, 34);
        const jumpY = H * 0.64 - ((t * 0.7) % 1) * (H * 0.42);
        g.fillStyle = '#facc15'; g.beginPath(); g.arc(cx, jumpY, 6, 0, Math.PI * 2); g.fill();
      } else if (subMod === 'super') {
        g.fillText('2D Meissner Effect (Magnetic Levitation)', 14, 22);
        g.fillStyle = '#14b8a6'; g.fillRect(cx - 80, H * 0.72, 160, 22);
        const magY = H * 0.44 + Math.sin(t * 3) * 8;
        g.fillStyle = '#f43f5e'; g.fillRect(cx - 34, magY, 68, 24);
      } else {
        const d = 48 + Math.sin(t * 5) * 14;
        g.fillText('2D Diatomic Molecular Vibration (Morse Potential)', 14, 22);
        g.strokeStyle = sub; g.lineWidth = 4; g.beginPath(); g.moveTo(cx - d, cy); g.lineTo(cx + d, cy); g.stroke();
        g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(cx - d, cy, 18, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx + d, cy, 14, 0, Math.PI * 2); g.fill();
      }

    // ===== 6. NUCLEAR PHYSICS (4 STATIONS) =====
    } else if (activeMod === 'nuclear_physics') {
      const cx = W * 0.42, cy = H * 0.54;
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Nuclear Structure & Decay (${(subMod || 'nucleus').toUpperCase()})`, 14, 22);
      for (let i = 0; i < 18; i++) {
        const a = i * 2.399 + t * 0.4, r = Math.sqrt(i + 1) * 10;
        g.fillStyle = i % 2 === 0 ? '#fb923c' : '#38bdf8';
        g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 8, 0, Math.PI * 2); g.fill();
      }
      if (subMod === 'decay' || subMod === 'half') {
        const u = (t * 0.9) % 1;
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(cx + u * (W * 0.42), cy + Math.sin(u * 10) * 8, 6, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#d97706'; g.fillRect(W * 0.82, cy - 22, 34, 44);
        g.fillStyle = fg; g.fillText('GM Detector', W * 0.78, cy + 40);
      }

    // ===== 7. ELEMENTARY PARTICLES (3 STATIONS) =====
    } else if (activeMod === 'particle_physics') {
      const cx = W * 0.5, cy = H * 0.54;
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Particle Physics (${(subMod || 'forces').toUpperCase()})`, 14, 22);
      if (subMod === 'forces') {
        const d = numVal('#distance', 3) * 18;
        g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(cx - 50 - d, cy, 16, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#f43f5e'; g.beginPath(); g.arc(cx + 50 + d, cy, 16, 0, Math.PI * 2); g.fill();
        const bx = (cx - 50 - d) + ((t * 1.3) % 1) * (100 + 2 * d);
        g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(bx, cy - Math.sin(((t * 1.3) % 1) * Math.PI) * 28, 7, 0, Math.PI * 2); g.fill();
      } else {
        g.fillStyle = '#8b5cf6'; g.beginPath(); g.arc(cx, cy, 26, 0, Math.PI * 2); g.fill();
        for (let i = 0; i < 3; i++) {
          const a = t * 2 + (i * Math.PI * 2) / 3;
          g.fillStyle = '#34d399'; g.beginPath(); g.arc(cx + Math.cos(a) * 65, cy + Math.sin(a) * 32, 7, 0, Math.PI * 2); g.fill();
        }
      }

    // ===== 8. MATTER WAVES & QUANTUM MECHANICS =====
    } else {
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Quantum / Matter Wave (${activeMod} · ${subMod || 'wave'})`, 14, 22);
      const midY = H * 0.56;
      if (activeMod === 'quantum_mechanics' && (subMod === '2' || subMod === '1')) {
        // Tunneling or Potential Well
        g.fillStyle = 'rgba(249,115,22,0.28)'; g.fillRect(W * 0.45, 54, 48, H - 90);
        g.strokeStyle = '#f97316'; g.strokeRect(W * 0.45, 54, 48, H - 90);
      }
      g.strokeStyle = accent; g.lineWidth = 2.8;
      g.beginPath();
      const k = activeMod === 'matter_waves' ? 0.09 : 0.055;
      for (let x = 20; x < W - 20; x += 3) {
        const damp = activeMod === 'quantum_mechanics' && subMod === '2' && x > W * 0.48 ? 0.35 : 1;
        const env = Math.exp(-Math.pow((x - W * 0.5) / (W * 0.32), 2));
        const y = midY - Math.sin(x * k - t * 4.5) * (H * 0.24) * env * damp;
        if (x === 20) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.stroke();
    }

    rafId = requestAnimationFrame(drawFrame);
  }

  window.MP27Sim2D = {
    start(canvas, modKey) {
      this.stop();
      canvasEl = canvas;
      activeMod = modKey;
      t0 = performance.now();
      rafId = requestAnimationFrame(drawFrame);
    },
    stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      activeMod = null;
      canvasEl = null;
    },
  };
})();
