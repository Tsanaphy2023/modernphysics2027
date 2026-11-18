/* Modern Physics 2027 — Real-Time AR:XR Vision Controller (MediaPipe HandLandmarker + FaceLandmarker) */
(() => {
  const MP_VERSION = '0.10.14';
  const MP_BUNDLE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/vision_bundle.mjs`;
  const MP_WASM = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`;
  const HAND_MODEL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
  const FACE_MODEL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

  const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
  ];

  let active = false;
  let rafId = 0;
  let stream = null;
  let handLandmarker = null;
  let faceLandmarker = null;
  let hud = null;
  let lastActionMs = 0;
  let smoothPinch = null;
  let smoothYaw = 0;

  function getSliders() {
    return Array.from(document.querySelectorAll('input[type="range"]')).filter(
      (el) => !el.closest('#ct-xr-dock') && el.offsetParent !== null
    );
  }

  function setSliderNormalized(slider, norm) {
    if (!slider) return;
    const min = parseFloat(slider.min || '0');
    const max = parseFloat(slider.max || '100');
    const step = parseFloat(slider.step || '0.01') || 0.01;
    const clamped = Math.max(0, Math.min(1, norm));
    let val = min + clamped * (max - min);
    val = Math.round(val / step) * step;
    val = Math.max(min, Math.min(max, Number(val.toFixed(6))));
    if (String(slider.value) !== String(val)) {
      slider.value = String(val);
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return val;
  }

  function stepSlider(slider, dir) {
    if (!slider) return;
    const min = parseFloat(slider.min || '0');
    const max = parseFloat(slider.max || '100');
    const step = parseFloat(slider.step || '0.01') || (max - min) / 20;
    const cur = parseFloat(slider.value || min);
    const next = Math.max(min, Math.min(max, cur + dir * step * 2));
    slider.value = String(next);
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    slider.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function triggerPlayPause() {
    const now = performance.now();
    if (now - lastActionMs < 1300) return false;
    const btn = document.querySelector('#playPause, #play-btn, #togglePlay, button[id*="play" i]');
    if (btn) {
      btn.click();
      lastActionMs = now;
      return true;
    }
    return false;
  }

  function triggerReset() {
    const now = performance.now();
    if (now - lastActionMs < 1500) return false;
    const btn = document.querySelector('#resetSimulation, #reset-btn, button[id*="reset" i]');
    if (btn) {
      btn.click();
      lastActionMs = now;
      return true;
    }
    return false;
  }

  function countExtendedFingers(lm) {
    const tips = [8, 12, 16, 20];
    const pips = [6, 10, 14, 18];
    let count = 0;
    for (let i = 0; i < 4; i++) {
      if (lm[tips[i]].y < lm[pips[i]].y - 0.02) count++;
    }
    if (Math.abs(lm[4].x - lm[2].x) > 0.04) count++;
    return count;
  }

  function injectStyles() {
    if (document.getElementById('ct-arxr-dock-css')) return;
    const st = document.createElement('style');
    st.id = 'ct-arxr-dock-css';
    st.textContent = `
      #ct-xr-dock {
        position: fixed;
        right: 16px;
        bottom: 16px;
        width: 310px;
        z-index: 99999;
        background: rgba(9, 18, 36, 0.92);
        border: 1.5px solid rgba(56, 189, 248, 0.6);
        border-radius: 14px;
        box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);
        color: #e2e8f0;
        font-family: system-ui, -apple-system, 'Sarabun', sans-serif;
        overflow: hidden;
        backdrop-filter: blur(10px);
      }
      .ct-xr-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: linear-gradient(90deg, #0f172a, #1e293b);
        border-bottom: 1px solid rgba(56, 189, 248, 0.3);
        font-size: 12px;
        font-weight: 700;
        color: #38bdf8;
      }
      .ct-xr-stage {
        position: relative;
        width: 100%;
        aspect-ratio: 4 / 3;
        background: #020617;
      }
      .ct-xr-stage video,
      .ct-xr-stage canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scaleX(-1);
      }
      .ct-xr-body {
        padding: 10px 12px;
        font-size: 11.5px;
        display: grid;
        gap: 6px;
      }
      .ct-xr-telemetry {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      }
      .ct-xr-chip {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid #334155;
        border-radius: 8px;
        padding: 5px 7px;
      }
      .ct-xr-chip b { display: block; font-size: 10px; color: #94a3b8; }
      .ct-xr-chip span { font-size: 12px; font-weight: 700; color: #f8fafc; }
      #ct-xr-slider-pick {
        width: 100%;
        background: #0f172a;
        color: #e2e8f0;
        border: 1px solid #334155;
        border-radius: 6px;
        padding: 4px 6px;
        font-size: 11px;
      }
      .ct-xr-guide {
        font-size: 10.5px;
        color: #94a3b8;
        line-height: 1.45;
      }
    `;
    document.head.appendChild(st);
  }

  async function loadModels(statusEl) {
    if (handLandmarker && faceLandmarker) return true;
    statusEl.textContent = 'กำลังโหลด AI Vision (Hand + Face)...';
    const vision = await import(MP_BUNDLE);
    const fileset = await vision.FilesetResolver.forVisionTasks(MP_WASM);
    if (!handLandmarker) {
      handLandmarker = await vision.HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: HAND_MODEL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numHands: 2,
      });
    }
    if (!faceLandmarker) {
      faceLandmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: FACE_MODEL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        outputFaceBlendshapes: true,
        numFaces: 1,
      });
    }
    return true;
  }

  function stop() {
    active = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    if (hud) {
      hud.remove();
      hud = null;
    }
  }

  async function start(cfg = {}) {
    if (active) {
      stop();
      return;
    }
    active = true;
    injectStyles();

    const sliders = getSliders();
    const sliderOpts = sliders.map((el, i) => {
      const label = document.querySelector(`label[for="${el.id}"]`)?.textContent?.trim() || el.id || `พารามิเตอร์ ${i + 1}`;
      return `<option value="${i}">${label}</option>`;
    }).join('');

    hud = document.createElement('div');
    hud.id = 'ct-xr-dock';
    hud.innerHTML = `
      <div class="ct-xr-head">
        <span>🥽 AR:XR AI VISION CONTROL</span>
        <button type="button" id="ct-xr-close-btn" style="background:none;border:none;color:#f8fafc;cursor:pointer;font-size:14px;">✕</button>
      </div>
      <div class="ct-xr-stage">
        <video id="ct-xr-video" autoplay playsinline muted></video>
        <canvas id="ct-xr-overlay"></canvas>
      </div>
      <div class="ct-xr-body">
        <div id="ct-xr-status" style="color:#7dd3fc;font-weight:700;">กำลังเปิดกล้องเว็บแคม...</div>
        <select id="ct-xr-slider-pick" title="เลือกตัวแปรที่ต้องการควบคุม">${sliderOpts || '<option value="-1">ไม่พบแถบปรับค่า</option>'}</select>
        <div class="ct-xr-telemetry">
          <div class="ct-xr-chip"><b>🤏 มือ / นิ้ว (Pinch)</b><span id="ct-xr-hand-val">รอตรวจจับ...</span></div>
          <div class="ct-xr-chip"><b>😊 ใบหน้า / คิ้ว / ตา</b><span id="ct-xr-face-val">รอตรวจจับ...</span></div>
        </div>
        <div class="ct-xr-guide">
          • <b>จีบนิ้วชี้-โป้ง:</b> ปรับค่าตัวแปร | <b>แบมือ/กำมือ:</b> Play/Pause<br/>
          • <b>ชู 2 นิ้ว:</b> รีเซ็ต | <b>เลิกคิ้ว/กะพริบตา:</b> เพิ่มค่า / สลับสถานะ
        </div>
      </div>
    `;
    document.body.appendChild(hud);
    hud.querySelector('#ct-xr-close-btn').addEventListener('click', stop);

    const video = hud.querySelector('#ct-xr-video');
    const canvas = hud.querySelector('#ct-xr-overlay');
    const ctx = canvas.getContext('2d');
    const statusEl = hud.querySelector('#ct-xr-status');
    const handValEl = hud.querySelector('#ct-xr-hand-val');
    const faceValEl = hud.querySelector('#ct-xr-face-val');
    const sliderPick = hud.querySelector('#ct-xr-slider-pick');

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      video.srcObject = stream;
      await video.play();
    } catch (err) {
      statusEl.textContent = 'ไม่สามารถเข้าถึงกล้องได้ (กรุณาอนุญาตสิทธิ์กล้อง)';
      statusEl.style.color = '#fca5a5';
      return;
    }

    try {
      await loadModels(statusEl);
      statusEl.textContent = '✓ พร้อมควบคุมด้วย ใบหน้า ตา คิ้ว มือ นิ้ว';
      statusEl.style.color = '#6ee7b7';
    } catch (err) {
      statusEl.textContent = 'โหลดโมเดล MediaPipe ไม่สำเร็จ (ตรวจสอบอินเทอร์เน็ต)';
      statusEl.style.color = '#fcd34d';
      return;
    }

    let lastVideoTime = -1;
    const loop = () => {
      if (!active) return;
      if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const nowMs = performance.now();
        const targetIdx = parseInt(sliderPick.value, 10);
        const targetSlider = targetIdx >= 0 ? sliders[targetIdx] : null;

        // 1. Hand & Finger Detection
        const hRes = handLandmarker.detectForVideo(video, nowMs);
        if (hRes.landmarks && hRes.landmarks.length > 0) {
          const lm = hRes.landmarks[0];
          // Draw hand skeleton
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          for (const [a, b] of HAND_CONNECTIONS) {
            ctx.beginPath();
            ctx.moveTo(lm[a].x * canvas.width, lm[a].y * canvas.height);
            ctx.lineTo(lm[b].x * canvas.width, lm[b].y * canvas.height);
            ctx.stroke();
          }
          ctx.fillStyle = '#fbbf24';
          for (const pt of lm) {
            ctx.beginPath();
            ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 3, 0, Math.PI * 2);
            ctx.fill();
          }

          const pinchDist = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y);
          const norm = Math.max(0, Math.min(1, (pinchDist - 0.03) / 0.22));
          smoothPinch = smoothPinch === null ? norm : smoothPinch * 0.72 + norm * 0.28;
          const fingers = countExtendedFingers(lm);

          if (fingers === 2 && lm[8].y < lm[6].y && lm[12].y < lm[10].y && lm[16].y > lm[14].y) {
            if (triggerReset()) handValEl.textContent = '✌️ รีเซ็ต Simulator';
          } else if (fingers === 0) {
            if (triggerPlayPause()) handValEl.textContent = '✊ Play / Pause';
          } else if (targetSlider) {
            const v = setSliderNormalized(targetSlider, smoothPinch);
            handValEl.textContent = `🤏 ${Math.round(smoothPinch * 100)}% (${v})`;
          } else {
            handValEl.textContent = `✋ ${fingers} นิ้ว`;
          }
        } else {
          handValEl.textContent = 'ไม่พบมือ';
        }

        // 2. Face, Eyes & Eyebrows Detection
        const fRes = faceLandmarker.detectForVideo(video, nowMs);
        if (fRes.faceLandmarks && fRes.faceLandmarks.length > 0) {
          const flm = fRes.faceLandmarks[0];
          // Draw key eye, eyebrow, and nose landmarks
          const keyPts = [1, 33, 133, 362, 263, 70, 63, 105, 300, 293, 334];
          ctx.fillStyle = '#34d399';
          for (const id of keyPts) {
            const p = flm[id];
            if (p) {
              ctx.beginPath();
              ctx.arc(p.x * canvas.width, p.y * canvas.height, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          const shapes = {};
          if (fRes.faceBlendshapes && fRes.faceBlendshapes[0]) {
            for (const c of fRes.faceBlendshapes[0].categories) {
              shapes[c.categoryName] = c.score;
            }
          }
          const browUp = Math.max(shapes.browInnerUp || 0, shapes.browOuterUpLeft || 0, shapes.browOuterUpRight || 0);
          const blinkAvg = ((shapes.eyeBlinkLeft || 0) + (shapes.eyeBlinkRight || 0)) * 0.5;
          const noseX = flm[1] ? flm[1].x - 0.5 : 0;
          smoothYaw = smoothYaw * 0.8 + noseX * 0.2;

          if (blinkAvg > 0.55) {
            if (triggerPlayPause()) faceValEl.textContent = '😉 กะพริบตา → Play/Pause';
          } else if (browUp > 0.48 && targetSlider) {
            if (nowMs - lastActionMs > 350) {
              stepSlider(targetSlider, 1);
              lastActionMs = nowMs;
            }
            faceValEl.textContent = '🤨 เลิกคิ้ว → เพิ่มค่า';
          } else {
            const headDir = smoothYaw > 0.06 ? 'หันซ้าย' : smoothYaw < -0.06 ? 'หันขวา' : 'ตรง';
            faceValEl.textContent = `😊 หน้า${headDir} · คิ้ว ${(browUp * 100).toFixed(0)}%`;
          }
        } else {
          faceValEl.textContent = 'ไม่พบใบหน้า';
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  }

  window.MP27ArXr = { start, stop, toggle: start };
})();
