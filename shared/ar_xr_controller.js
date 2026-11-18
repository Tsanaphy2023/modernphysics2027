/* Modern Physics 2027 — Unified AR:XR Controller (AI Vision Gesture + AR Camera Overlay + Stereo VR + WebXR navigator.xr) */
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

  // XR & 3D Bridge State
  let xrTarget = null; // { renderer, scene, camera, THREE, origRender, savedBg, savedFog, savedClearAlpha }
  let xrMode = 'gesture'; // 'gesture' | 'ar-overlay' | 'stereo' | 'webxr'
  let facingMode = 'user'; // 'user' | 'environment'
  let arBgVideo = null;
  let stereoDivider = null;
  let stereoCam = null;
  let activeXrSession = null;
  let gyroActive = false;
  let gyroBase = null;

  function registerXR(renderer, scene, camera, threeRef) {
    if (!renderer || !scene || !camera) return;
    const T = threeRef || window.THREE;
    if (xrTarget && xrTarget.renderer === renderer) {
      xrTarget.scene = scene;
      xrTarget.camera = camera;
      if (T) xrTarget.THREE = T;
      return;
    }
    const origRender = renderer.render.bind(renderer);
    xrTarget = {
      renderer,
      scene,
      camera,
      THREE: T,
      origRender,
      savedBg: scene.background || null,
      savedFog: scene.fog || null,
      savedClearAlpha: typeof renderer.getClearAlpha === 'function' ? renderer.getClearAlpha() : 1,
    };

    renderer.render = function wrappedRender(s, c) {
      if (xrMode === 'stereo' && xrTarget && !renderer.xr?.isPresenting) {
        renderStereo(renderer, s, c, xrTarget.THREE);
        return;
      }
      origRender(s, c);
    };
  }

  window.MP27RegisterXR = registerXR;

  function renderStereo(renderer, scene, camera, T) {
    const size = { x: 0, y: 0 };
    if (T && T.Vector2) {
      const v = new T.Vector2();
      renderer.getSize(v);
      size.x = v.x;
      size.y = v.y;
    } else {
      size.x = renderer.domElement.clientWidth || 800;
      size.y = renderer.domElement.clientHeight || 450;
    }
    const w = size.x;
    const h = size.y;
    if (!w || !h) return;

    if (!stereoCam && T && T.StereoCamera) {
      stereoCam = new T.StereoCamera();
      stereoCam.eyeSep = 0.064;
    }

    const prevScissorTest = renderer.getScissorTest ? renderer.getScissorTest() : false;
    renderer.setScissorTest(true);

    if (stereoCam) {
      if (scene.matrixWorldAutoUpdate !== false) scene.updateMatrixWorld();
      if (camera.parent === null && camera.matrixWorldAutoUpdate !== false) camera.updateMatrixWorld();
      stereoCam.aspect = 0.5;
      stereoCam.update(camera);

      // Left Eye
      renderer.setScissor(0, 0, w / 2, h);
      renderer.setViewport(0, 0, w / 2, h);
      xrTarget.origRender(scene, stereoCam.cameraL);

      // Right Eye
      renderer.setScissor(w / 2, 0, w / 2, h);
      renderer.setViewport(w / 2, 0, w / 2, h);
      xrTarget.origRender(scene, stereoCam.cameraR);
    } else {
      // Fallback dual-viewport render if StereoCamera class isn't exposed
      const prevAspect = camera.aspect;
      camera.aspect = (w / 2) / h;
      camera.updateProjectionMatrix();

      renderer.setScissor(0, 0, w / 2, h);
      renderer.setViewport(0, 0, w / 2, h);
      xrTarget.origRender(scene, camera);

      renderer.setScissor(w / 2, 0, w / 2, h);
      renderer.setViewport(w / 2, 0, w / 2, h);
      xrTarget.origRender(scene, camera);

      camera.aspect = prevAspect;
      camera.updateProjectionMatrix();
    }

    renderer.setViewport(0, 0, w, h);
    renderer.setScissorTest(prevScissorTest);
  }

  function onDeviceOrientation(ev) {
    if (!gyroActive || !xrTarget || !xrTarget.scene) return;
    if (ev.alpha === null || ev.beta === null) return;
    if (!gyroBase) gyroBase = { alpha: ev.alpha, beta: ev.beta };
    const dYaw = ((ev.alpha - gyroBase.alpha) * Math.PI) / 180;
    const dPitch = ((ev.beta - gyroBase.beta) * Math.PI) / 180;
    xrTarget.scene.rotation.y = Math.max(-1.2, Math.min(1.2, dYaw * 0.45));
    xrTarget.scene.rotation.x = Math.max(-0.6, Math.min(0.6, dPitch * 0.3));
  }

  function enableGyro(on) {
    if (on === gyroActive) return;
    gyroActive = on;
    gyroBase = null;
    if (on) {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then((res) => {
          if (res === 'granted') window.addEventListener('deviceorientation', onDeviceOrientation);
        }).catch(() => {});
      } else {
        window.addEventListener('deviceorientation', onDeviceOrientation);
      }
    } else {
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      if (xrTarget && xrTarget.scene) {
        xrTarget.scene.rotation.set(0, 0, 0);
      }
    }
  }

  function applyArOverlay(enable) {
    if (!xrTarget) return;
    const { renderer, scene } = xrTarget;
    const canvas = renderer.domElement;
    const host = canvas.parentElement;
    if (!host) return;

    if (enable) {
      if (!xrTarget.savedBg && scene.background) xrTarget.savedBg = scene.background;
      if (!xrTarget.savedFog && scene.fog) xrTarget.savedFog = scene.fog;
      scene.background = null;
      scene.fog = null;
      renderer.setClearColor(0x000000, 0);

      if (getComputedStyle(host).position === 'static') {
        host.style.position = 'relative';
      }
      canvas.style.position = 'relative';
      canvas.style.zIndex = '2';
      canvas.style.background = 'transparent';

      if (!arBgVideo) {
        arBgVideo = document.createElement('video');
        arBgVideo.id = 'ct-xr-ar-bg';
        arBgVideo.autoplay = true;
        arBgVideo.playsInline = true;
        arBgVideo.muted = true;
        arBgVideo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;pointer-events:none;border-radius:inherit;';
        host.insertBefore(arBgVideo, canvas);
      }
      arBgVideo.style.transform = facingMode === 'user' ? 'scaleX(-1)' : 'none';
      if (stream) {
        arBgVideo.srcObject = stream;
        arBgVideo.play().catch(() => {});
      }
    } else {
      if (arBgVideo) {
        arBgVideo.remove();
        arBgVideo = null;
      }
      canvas.style.zIndex = '';
      if (xrTarget.savedBg !== undefined) scene.background = xrTarget.savedBg;
      if (xrTarget.savedFog !== undefined) scene.fog = xrTarget.savedFog;
      if (xrTarget.savedClearAlpha !== undefined) {
        renderer.setClearColor(0x071322, xrTarget.savedClearAlpha);
      }
    }
  }

  function applyStereoDivider(enable) {
    if (!xrTarget) return;
    const host = xrTarget.renderer.domElement.parentElement;
    if (!host) return;
    if (enable) {
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      if (!stereoDivider) {
        stereoDivider = document.createElement('div');
        stereoDivider.id = 'ct-xr-stereo-divider';
        stereoDivider.innerHTML = '<div class="ct-xr-eye-l">L</div><div class="ct-xr-eye-r">R</div>';
        host.appendChild(stereoDivider);
      }
      enableGyro(true);
    } else {
      if (stereoDivider) {
        stereoDivider.remove();
        stereoDivider = null;
      }
      enableGyro(false);
    }
  }

  async function startWebXRSession(sessionMode, statusEl) {
    if (!navigator.xr) {
      statusEl.textContent = 'เบราว์เซอร์นี้ไม่รองรับ WebXR (navigator.xr)';
      statusEl.style.color = '#fca5a5';
      return;
    }
    if (!xrTarget) {
      statusEl.textContent = 'ไม่พบฉาก 3D Three.js ในหน้านี้';
      statusEl.style.color = '#fca5a5';
      return;
    }
    try {
      const supported = await navigator.xr.isSessionSupported(sessionMode);
      if (!supported) {
        statusEl.textContent = `อุปกรณ์นี้ไม่รองรับ ${sessionMode}`;
        statusEl.style.color = '#fcd34d';
        return;
      }
      const session = await navigator.xr.requestSession(sessionMode, {
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'],
      });
      activeXrSession = session;
      const { renderer, scene, camera, origRender } = xrTarget;

      if (sessionMode === 'immersive-ar') {
        if (!xrTarget.savedBg && scene.background) xrTarget.savedBg = scene.background;
        if (!xrTarget.savedFog && scene.fog) xrTarget.savedFog = scene.fog;
        scene.background = null;
        scene.fog = null;
        renderer.setClearColor(0x000000, 0);
      }

      renderer.xr.enabled = true;
      await renderer.xr.setSession(session);
      renderer.setAnimationLoop(() => {
        origRender(scene, camera);
      });

      statusEl.textContent = `✓ กำลังทำงานในโหมด ${sessionMode}`;
      statusEl.style.color = '#6ee7b7';

      session.addEventListener('end', () => {
        activeXrSession = null;
        renderer.setAnimationLoop(null);
        renderer.xr.enabled = false;
        if (xrTarget.savedBg !== undefined) scene.background = xrTarget.savedBg;
        if (xrTarget.savedFog !== undefined) scene.fog = xrTarget.savedFog;
        statusEl.textContent = 'ออกจากโหมด WebXR แล้ว';
        statusEl.style.color = '#7dd3fc';
      });
    } catch (err) {
      statusEl.textContent = `เปิด WebXR ไม่สำเร็จ: ${err.message || err}`;
      statusEl.style.color = '#fca5a5';
    }
  }

  function setMode(nextMode, statusEl) {
    xrMode = nextMode;
    applyArOverlay(nextMode === 'ar-overlay');
    applyStereoDivider(nextMode === 'stereo');

    if (hud) {
      hud.querySelectorAll('.ct-xr-mode-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.mode === nextMode);
      });
      const webxrBox = hud.querySelector('#ct-xr-webxr-box');
      if (webxrBox) webxrBox.hidden = nextMode !== 'webxr';
      const camFlipBtn = hud.querySelector('#ct-xr-cam-flip');
      if (camFlipBtn) camFlipBtn.hidden = nextMode !== 'ar-overlay';
    }

    if (statusEl) {
      if (nextMode === 'ar-overlay') {
        statusEl.textContent = xrTarget ? '📷 AR Camera Overlay: วางโมเดล 3D ทับภาพกล้องจริง' : 'เปิดกล้อง AR Overlay (หน้านี้เป็น 2D)';
      } else if (nextMode === 'stereo') {
        statusEl.textContent = xrTarget ? '🥽 Stereo VR: แบ่งภาพ 2 ตา + Gyroscope' : 'Stereo VR ต้องใช้กับหน้าที่มี 3D Three.js';
      } else if (nextMode === 'webxr') {
        statusEl.textContent = '🌐 เลือกเปิด WebXR VR หรือ WebXR AR ด้านล่าง';
      } else {
        statusEl.textContent = '✓ พร้อมควบคุมด้วย ใบหน้า ตา คิ้ว มือ นิ้ว';
      }
      statusEl.style.color = '#6ee7b7';
    }
  }

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
    const btn = document.querySelector('#playPause, #play-btn, #playBtn, #togglePlay, button[id*="play" i]');
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
    const btn = document.querySelector('#resetSimulation, #reset-btn, #resetBtn, button[id*="reset" i]');
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
        left: 16px;
        bottom: 16px;
        width: 326px;
        z-index: 99999;
        background: rgba(9, 18, 36, 0.94);
        border: 1.5px solid rgba(56, 189, 248, 0.65);
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
      .ct-xr-modes {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        padding: 6px 8px;
        background: rgba(15, 23, 42, 0.95);
        border-bottom: 1px solid rgba(56, 189, 248, 0.2);
      }
      .ct-xr-mode-btn {
        background: #1e293b;
        color: #cbd5e1;
        border: 1px solid #334155;
        border-radius: 7px;
        padding: 5px 4px;
        font-size: 10.5px;
        font-weight: 700;
        cursor: pointer;
        text-align: center;
        transition: all 0.15s ease;
      }
      .ct-xr-mode-btn.active {
        background: linear-gradient(135deg, #0284c7, #2563eb);
        color: #ffffff;
        border-color: #7dd3fc;
      }
      .ct-xr-stage {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 10;
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
      .ct-xr-chip span { font-size: 11.5px; font-weight: 700; color: #f8fafc; }
      #ct-xr-slider-pick {
        width: 100%;
        background: #0f172a;
        color: #e2e8f0;
        border: 1px solid #334155;
        border-radius: 6px;
        padding: 4px 6px;
        font-size: 11px;
      }
      .ct-xr-btn-row {
        display: flex;
        gap: 6px;
      }
      .ct-xr-action-btn {
        flex: 1;
        background: linear-gradient(135deg, #0f766e, #0369a1);
        color: #f8fafc;
        border: 1px solid rgba(125, 211, 252, 0.45);
        border-radius: 7px;
        padding: 6px 8px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
      }
      .ct-xr-action-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .ct-xr-guide {
        font-size: 10.5px;
        color: #94a3b8;
        line-height: 1.45;
      }
      #ct-xr-stereo-divider {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 6;
        border-left: 0;
      }
      #ct-xr-stereo-divider::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(56, 189, 248, 0.85);
        box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
      }
      .ct-xr-eye-l, .ct-xr-eye-r {
        position: absolute;
        top: 8px;
        padding: 2px 7px;
        font-size: 10px;
        font-weight: 700;
        background: rgba(2, 6, 23, 0.72);
        color: #38bdf8;
        border-radius: 6px;
      }
      .ct-xr-eye-l { left: 10px; }
      .ct-xr-eye-r { right: 10px; }
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

  async function openCameraStream(videoEl) {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: facingMode }, width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false,
    });
    if (videoEl) {
      videoEl.srcObject = stream;
      await videoEl.play();
    }
    if (arBgVideo) {
      arBgVideo.srcObject = stream;
      arBgVideo.style.transform = facingMode === 'user' ? 'scaleX(-1)' : 'none';
      arBgVideo.play().catch(() => {});
    }
  }

  function stop() {
    active = false;
    setMode('gesture', null);
    if (activeXrSession) {
      activeXrSession.end().catch(() => {});
      activeXrSession = null;
    }
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

  async function start() {
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
        <span>🥽 AR:XR &amp; WEBXR CONTROLLER</span>
        <button type="button" id="ct-xr-close-btn" style="background:none;border:none;color:#f8fafc;cursor:pointer;font-size:14px;">✕</button>
      </div>
      <div class="ct-xr-modes">
        <button type="button" class="ct-xr-mode-btn active" data-mode="gesture">✋ Gesture</button>
        <button type="button" class="ct-xr-mode-btn" data-mode="ar-overlay">📷 AR ฉากจริง</button>
        <button type="button" class="ct-xr-mode-btn" data-mode="stereo">🥽 Stereo VR</button>
        <button type="button" class="ct-xr-mode-btn" data-mode="webxr">🌐 WebXR</button>
      </div>
      <div class="ct-xr-stage">
        <video id="ct-xr-video" autoplay playsinline muted></video>
        <canvas id="ct-xr-overlay"></canvas>
      </div>
      <div class="ct-xr-body">
        <div id="ct-xr-status" style="color:#7dd3fc;font-weight:700;">กำลังเปิดกล้องเว็บแคม...</div>
        <div id="ct-xr-webxr-box" hidden>
          <div class="ct-xr-btn-row">
            <button type="button" class="ct-xr-action-btn" id="ct-xr-enter-vr">🕶️ Enter WebXR VR</button>
            <button type="button" class="ct-xr-action-btn" id="ct-xr-enter-ar">📱 Enter WebXR AR</button>
          </div>
          <div id="ct-xr-cap" style="font-size:10.5px;color:#94a3b8;margin-top:4px;">กำลังตรวจสอบความพร้อม navigator.xr...</div>
        </div>
        <div class="ct-xr-btn-row">
          <select id="ct-xr-slider-pick" title="เลือกตัวแปรที่ต้องการควบคุม">${sliderOpts || '<option value="-1">ไม่พบแถบปรับค่า</option>'}</select>
          <button type="button" class="ct-xr-action-btn" id="ct-xr-cam-flip" style="flex:0 0 auto;" hidden>🔄 สลับกล้อง</button>
        </div>
        <div class="ct-xr-telemetry">
          <div class="ct-xr-chip"><b>🤏 มือ / นิ้ว (Pinch)</b><span id="ct-xr-hand-val">รอตรวจจับ...</span></div>
          <div class="ct-xr-chip"><b>😊 ใบหน้า / คิ้ว / ตา</b><span id="ct-xr-face-val">รอตรวจจับ...</span></div>
        </div>
        <div class="ct-xr-guide">
          • <b>AR ฉากจริง:</b> วาง 3D ทับกล้องจริง | <b>Stereo VR:</b> แว่นมือถือ 2 ตา<br/>
          • <b>จีบนิ้ว:</b> ปรับค่า | <b>กำมือ:</b> Play/Pause | <b>ชู 2 นิ้ว:</b> รีเซ็ต
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
    const camFlipBtn = hud.querySelector('#ct-xr-cam-flip');
    const capEl = hud.querySelector('#ct-xr-cap');
    const enterVrBtn = hud.querySelector('#ct-xr-enter-vr');
    const enterArBtn = hud.querySelector('#ct-xr-enter-ar');

    hud.querySelectorAll('.ct-xr-mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => setMode(btn.dataset.mode, statusEl));
    });

    camFlipBtn.addEventListener('click', async () => {
      facingMode = facingMode === 'user' ? 'environment' : 'user';
      await openCameraStream(video);
    });

    enterVrBtn.addEventListener('click', () => startWebXRSession('immersive-vr', statusEl));
    enterArBtn.addEventListener('click', () => startWebXRSession('immersive-ar', statusEl));

    if (navigator.xr) {
      Promise.all([
        navigator.xr.isSessionSupported('immersive-vr').catch(() => false),
        navigator.xr.isSessionSupported('immersive-ar').catch(() => false),
      ]).then(([vrOk, arOk]) => {
        enterVrBtn.disabled = !vrOk;
        enterArBtn.disabled = !arOk;
        capEl.textContent = `WebXR: VR ${vrOk ? '✓ พร้อม' : '✗ ไม่รองรับ'} · AR ${arOk ? '✓ พร้อม' : '✗ ไม่รองรับ'}`;
      });
    } else {
      enterVrBtn.disabled = true;
      enterArBtn.disabled = true;
      capEl.textContent = 'WebXR (navigator.xr) ไม่รองรับในเบราว์เซอร์นี้ (ใช้ AR ฉากจริง / Stereo VR แทนได้)';
    }

    try {
      await openCameraStream(video);
    } catch (err) {
      statusEl.textContent = 'เปิดกล้องไม่ได้ (ยังใช้ Stereo VR / WebXR ได้)';
      statusEl.style.color = '#fcd34d';
    }

    try {
      await loadModels(statusEl);
      setMode(xrMode, statusEl);
    } catch (err) {
      statusEl.textContent = 'โหลด AI Vision ไม่สำเร็จ (ยังใช้ AR ฉากจริง / Stereo VR / WebXR ได้)';
      statusEl.style.color = '#fcd34d';
    }

    let lastVideoTime = -1;
    const loop = () => {
      if (!active) return;
      if (handLandmarker && faceLandmarker && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const nowMs = performance.now();
        const targetIdx = parseInt(sliderPick.value, 10);
        const targetSlider = targetIdx >= 0 ? sliders[targetIdx] : null;

        const hRes = handLandmarker.detectForVideo(video, nowMs);
        if (hRes.landmarks && hRes.landmarks.length > 0) {
          const lm = hRes.landmarks[0];
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

        const fRes = faceLandmarker.detectForVideo(video, nowMs);
        if (fRes.faceLandmarks && fRes.faceLandmarks.length > 0) {
          const flm = fRes.faceLandmarks[0];
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

  window.MP27ArXr = { start, stop, toggle: start, registerXR, setMode };
  if (window.__mp27PendingXR) {
    registerXR(
      window.__mp27PendingXR.renderer,
      window.__mp27PendingXR.scene,
      window.__mp27PendingXR.camera,
      window.__mp27PendingXR.threeRef
    );
  }
})();
