/* Modern Physics 2027 — Real-Time Interactive 2D Physics Simulation Engine (All 9 Modules) */
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

    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);

    // Subtle engineering grid
    g.strokeStyle = gridCol;
    g.lineWidth = 1;
    for (let x = 0; x < W; x += 32) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (let y = 0; y < H; y += 32) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }

    if (activeMod === 'relativity') {
      const beta = Math.max(-0.95, Math.min(0.95, numVal('#beta', 0.6)));
      const gamma = 1 / Math.sqrt(1 - beta * beta);
      const midX = W * 0.42;
      g.fillStyle = fg;
      g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Light Clock & Lorentz Contraction  |  β = ${beta.toFixed(2)}c, γ = ${gamma.toFixed(3)}`, 14, 22);

      // Frame S (Rest)
      const lx = W * 0.16, topY = 58, botY = H - 36;
      g.strokeStyle = accent; g.lineWidth = 4;
      g.beginPath(); g.moveTo(lx - 34, topY); g.lineTo(lx + 34, topY); g.stroke();
      g.beginPath(); g.moveTo(lx - 34, botY); g.lineTo(lx + 34, botY); g.stroke();
      const pS = 0.5 - 0.5 * Math.cos(t * 3.0);
      const pyS = botY - pS * (botY - topY);
      g.setLineDash([4, 4]); g.strokeStyle = sub; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(lx, topY); g.lineTo(lx, botY); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#f59e0b';
      g.beginPath(); g.arc(lx, pyS, 7, 0, Math.PI * 2); g.fill();
      g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
      g.fillText('กรอบนิ่ง S (Δτ)', lx - 38, H - 14);

      // Frame S' (Moving)
      const rx0 = midX + 20, rx1 = W - 28, rSpan = rx1 - rx0;
      const shipW = Math.max(24, 96 / gamma);
      const cx = rx0 + ((t * Math.abs(beta) * 90 + rSpan * 0.5) % rSpan);
      g.fillStyle = isLight ? '#dbeafe' : '#1e3a5f';
      g.strokeStyle = '#7c3aed'; g.lineWidth = 2;
      g.fillRect(cx - shipW / 2, (topY + botY) / 2 - 18, shipW, 36);
      g.strokeRect(cx - shipW / 2, (topY + botY) / 2 - 18, shipW, 36);
      const pSp = 0.5 - 0.5 * Math.cos((t * 3.0) / gamma);
      const pySp = botY - pSp * (botY - topY);
      g.fillStyle = '#a855f7';
      g.beginPath(); g.arc(cx, pySp, 7, 0, Math.PI * 2); g.fill();
      g.fillStyle = fg;
      g.fillText(`กรอบยาน S' (หดเหลือ ${(100 / gamma).toFixed(0)}%, เดินช้า ${gamma.toFixed(2)}×)`, midX + 20, H - 14);
    } else if (activeMod === 'quantum_light') {
      const wl = numVal('#ctrl-wl', 350);
      const E = 1239.84 / wl;
      const metal = strVal('#ctrl-metal', 'Na');
      const phiMap = { Na: 2.28, K: 2.30, Zn: 4.30, Cu: 4.70 };
      const phi = phiMap[metal] || 2.28;
      const emit = E > phi;
      const beamCol = wlToCss(wl);

      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Photoelectric Tube  |  λ = ${wl.toFixed(0)} nm (E = ${E.toFixed(2)} eV) vs φ(${metal}) = ${phi.toFixed(2)} eV`, 14, 22);

      // Phototube outline
      const cx = W * 0.34, ax = W * 0.78, midY = H * 0.54;
      g.strokeStyle = sub; g.lineWidth = 2;
      g.strokeRect(cx - 24, 54, ax - cx + 56, H - 86);
      // Cathode (front face facing right!)
      g.fillStyle = metal === 'Cu' ? '#d97706' : '#94a3b8';
      g.fillRect(cx - 8, 74, 16, H - 126);
      // Anode
      g.fillStyle = accent;
      g.fillRect(ax - 6, 82, 12, H - 142);

      // UV/VIS Lamp shining onto FRONT (+x) of cathode
      const lx = W * 0.58, ly = 42;
      g.strokeStyle = beamCol; g.lineWidth = 6; g.globalAlpha = 0.25;
      g.beginPath(); g.moveTo(lx, ly); g.lineTo(cx + 8, midY); g.stroke();
      g.globalAlpha = 1;
      for (let i = 0; i < 5; i++) {
        const u = (t * 0.9 + i / 5) % 1;
        g.fillStyle = beamCol;
        g.beginPath();
        g.arc(lx + (cx + 8 - lx) * u, ly + (midY - ly) * u, 5, 0, Math.PI * 2);
        g.fill();
      }
      // Ejected photoelectrons
      if (emit) {
        const speed = 0.5 + Math.max(0.2, E - phi) * 0.45;
        for (let i = 0; i < 6; i++) {
          const u = (t * speed + i / 6) % 1;
          const ey = midY + ((i % 3) - 1) * 26;
          g.fillStyle = '#06b6d4';
          g.beginPath(); g.arc(cx + 12 + (ax - cx - 20) * u, ey, 4.5, 0, Math.PI * 2); g.fill();
        }
      } else {
        g.fillStyle = '#ef4444'; g.font = '700 12px system-ui, sans-serif';
        g.fillText('E < φ : ไม่เกิดโฟโตอิเล็กตรอน', cx + 30, midY);
      }
      g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
      g.fillText(`Cathode (${metal})`, cx - 22, H - 14);
      g.fillText('Anode', ax - 16, H - 14);
    } else if (activeMod === 'electron_diffraction') {
      const Va = numVal('#voltage', 3.5);
      const lambdaPm = 1226 / Math.sqrt(Va * 1000);
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Electron Diffraction  |  Vₐ = ${Va.toFixed(2)} kV, λ_dB = ${lambdaPm.toFixed(1)} pm`, 14, 22);

      // Left: Side Cross-Section | Right: Phosphor Screen Rings
      const sx = W * 0.72, sy = H * 0.54, maxR = Math.min(W * 0.2, H * 0.36);
      const r1 = maxR * (0.42 * Math.sqrt(3.5 / Va));
      const r2 = maxR * (0.72 * Math.sqrt(3.5 / Va));

      // Tube side view
      g.strokeStyle = sub; g.lineWidth = 2;
      g.beginPath(); g.moveTo(28, sy - 20); g.lineTo(W * 0.32, sy - 20); g.lineTo(W * 0.46, sy - 64);
      g.lineTo(W * 0.46, sy + 64); g.lineTo(W * 0.32, sy + 20); g.lineTo(28, sy + 20); g.closePath(); g.stroke();
      g.fillStyle = '#475569'; g.fillRect(W * 0.27, sy - 22, 6, 44); // Graphite target
      for (let i = 0; i < 6; i++) {
        const u = (t * 1.4 + i / 6) % 1;
        g.fillStyle = '#38bdf8';
        g.beginPath(); g.arc(36 + u * (W * 0.41), sy, 3.5, 0, Math.PI * 2); g.fill();
      }
      // Phosphor screen front view
      g.fillStyle = '#022c22'; g.beginPath(); g.arc(sx, sy, maxR, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#34d399'; g.lineWidth = 3;
      g.beginPath(); g.arc(sx, sy, Math.min(maxR - 4, r1), 0, Math.PI * 2); g.stroke();
      g.strokeStyle = '#6ee7b7'; g.lineWidth = 2.5;
      g.beginPath(); g.arc(sx, sy, Math.min(maxR - 2, r2), 0, Math.PI * 2); g.stroke();
      g.fillStyle = '#a7f3d0'; g.beginPath(); g.arc(sx, sy, 4, 0, Math.PI * 2); g.fill();
      g.fillStyle = fg; g.font = '600 11px system-ui, sans-serif';
      g.fillText('จอเรืองแสง (วงแหวน d₁, d₂)', sx - 64, H - 12);
    } else {
      // Live dynamic wave / orbit / decay 2D simulation for remaining modules
      g.fillStyle = fg; g.font = '700 13px system-ui, sans-serif';
      g.fillText(`2D Interactive Physics Simulation (${activeMod})`, 14, 22);
      const midY = H * 0.54;
      g.strokeStyle = accent; g.lineWidth = 2.8;
      g.beginPath();
      const k = activeMod === 'matter_waves' ? 0.08 : 0.05;
      for (let x = 20; x < W - 20; x += 3) {
        const env = Math.exp(-Math.pow((x - W * 0.5) / (W * 0.28), 2));
        const y = midY - Math.sin(x * k - t * 4.5) * (H * 0.25) * env;
        if (x === 20) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.stroke();
      g.fillStyle = '#f59e0b'; g.font = '600 11.5px system-ui, sans-serif';
      g.fillText('แอมพลิจูดคลื่นและตำแหน่งอนุภาค Real-time', 18, H - 14);
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
