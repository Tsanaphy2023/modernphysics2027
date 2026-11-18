/* Modern Physics 2027 — Q_bot: Futuristic Multilingual Agentic AI Physics Copilot */
(() => {
  if (window.MP27QBot) return;

  const LANGS = {
    'th-TH': {
      flag: '🇹🇭',
      label: 'ไทย',
      greeting: 'สวัสดีครับ! ผม Q_bot ผู้ช่วย AI ประจำห้องปฏิบัติการฟิสิกส์ยุคใหม่ ถามทฤษฎี สมการ หรือสั่งให้ผมช่วยควบคุม Simulator ได้เลยครับ',
      placeholder: 'ถาม Q_bot เช่น "อธิบายบทนี้", "สรุปสมการ", "เปิดสไลด์"...',
      micStart: '🎤 กำลังฟังคำถามภาษาไทย...',
      micUnsupported: 'เบราว์เซอร์นี้ไม่รองรับการรับเสียง กรุณาพิมพ์ถามได้เลยครับ',
      thinking: 'กำลังวิเคราะห์บริบทฟิสิกส์...',
      quick: ['อธิบายบทนี้', 'สรุปสมการสำคัญ', 'ตัวอย่างคำนวณ', 'เปิดสไลด์ทฤษฎี'],
    },
    'en-US': {
      flag: '🇺🇸',
      label: 'English',
      greeting: 'Hello! I am Q_bot, your AI Copilot for Modern Physics 2027. Ask me about theory, equations, or ask me to control the simulator!',
      placeholder: 'Ask Q_bot e.g. "Explain this lab", "Key equations", "Open slides"...',
      micStart: '🎤 Listening in English...',
      micUnsupported: 'Speech recognition is not supported in this browser.',
      thinking: 'Analyzing physics context...',
      quick: ['Explain this lab', 'Key equations', 'Worked example', 'Open theory slides'],
    },
    'zh-CN': {
      flag: '🇨🇳',
      label: '中文',
      greeting: '你好！我是 Q_bot，现代物理 2027 实验室的 AI 助手。你可以用中文向我提问物理原理、公式，或让我演示操作！',
      placeholder: '向 Q_bot 提问，例如：“解释本实验”、“核心公式”...',
      micStart: '🎤 正在聆听中文语音...',
      micUnsupported: '当前浏览器不支持语音输入，请直接输入文字。',
      thinking: '正在分析物理问题...',
      quick: ['解释本实验', '核心公式', '计算示例', '打开理论幻灯片'],
    },
    'ja-JP': {
      flag: '🇯🇵',
      label: '日本語',
      greeting: 'こんにちは！私は現代物理学2027ラボのAIアシスタント Q_bot です。理論や公式の解説、シミュレーターの操作をお手伝いします！',
      placeholder: 'Q_bot に質問（例：「この実験を説明」「公式まとめ」）...',
      micStart: '🎤 日本語で音声を認識中...',
      micUnsupported: 'このブラウザは音声入力に対応していません。',
      thinking: '物理コンテキストを解析中...',
      quick: ['この実験を説明', '公式まとめ', '計算例', 'スライドを開く'],
    },
  };

  const KB = {
    relativity: {
      'th-TH': 'บทที่ 1 ทฤษฎีสัมพัทธภาพพิเศษของไอน์สไตน์: เมื่อวัตถุเคลื่อนที่เร็วใกล้ความเร็วแสง c เวลาบนยานจะเดินช้าลง (Δt = γΔτ) และความยาวตามแนวการเคลื่อนที่จะหดสั้นลง (L = L₀/γ) โดย γ = 1/√(1 − β²) ครับ ลองปรับค่า β ใกล้ 0.9c แล้วสังเกตนาฬิกาเข็มคู่ได้เลยครับ',
      'en-US': 'Module 01 Special Relativity: As speed approaches c, moving clocks run slower (Δt = γΔτ) and lengths contract along motion (L = L₀/γ), where γ = 1/√(1 − β²). Try increasing β toward 0.9c and watch the dual analog clocks!',
      'zh-CN': '第1章 狭义相对论：当物体速度接近光速 c 时，运动时钟变慢 (Δt = γΔτ)，沿运动方向长度收缩 (L = L₀/γ)，其中 γ = 1/√(1 − β²)。',
      'ja-JP': '第1章 特殊相対性理論：光速 c に近づくと、動く時計は遅れ (Δt = γΔτ)、長さは収縮します (L = L₀/γ)。γ = 1/√(1 − β²) です。',
    },
    quantum_light: {
      'th-TH': 'บทที่ 2 ปรากฏการณ์โฟโตอิเล็กทริก: แสงประพฤติตัวเป็นก้อนพลังงานโฟตอน E = hf การทำให้อิเล็กตรอนหลุดจากโลหะขึ้นกับความถี่ f ต้องมากกว่าความถี่ขีดเริ่ม f₀ = φ/h โดย K_max = hf − φ ครับ',
      'en-US': 'Module 02 Photoelectric Effect: Light arrives in discrete photons with energy E = hf. Electrons escape only when f > f₀ = φ/h, with maximum kinetic energy K_max = hf − φ.',
      'zh-CN': '第2章 光电效应：光由能量子光子组成，单光子能量 E = hf。只有当频率 f > f₀ = φ/h 时电子才能逸出，最大动能 K_max = hf − φ。',
      'ja-JP': '第2章 光電効果：光はエネルギー E = hf の光子として振る舞います。f > f₀ = φ/h のとき電子が飛び出し、最大運動エネルギーは K_max = hf − φ です。',
    },
    matter_waves: {
      'th-TH': 'บทที่ 3 คลื่นสสารของเดอบรอยล์และการกระเจิงคอมป์ตัน: อนุภาคที่มีโมเมนตัม p มีความยาวคลื่น λ = h/p ยิ่งศักย์เร่ง V สูง ความยาวคลื่นอิเล็กตรอนยิ่งสั้นลง (λ ≈ 1.226/√V nm) ครับ',
      'en-US': 'Module 03 Matter Waves & Compton Scattering: Every particle with momentum p has a de Broglie wavelength λ = h/p. For electrons accelerated by voltage V, λ ≈ 1.226/√V nm.',
      'zh-CN': '第3章 物质波与康普顿散射：具有动量 p 的粒子对应德布罗意波长 λ = h/p。电压 V 越高，电子波长越短。',
      'ja-JP': '第3章 物質波とコンプトン散乱：運動量 p の粒子はド・ブロイ波長 λ = h/p を持ちます。加速電圧 V が高いほど波長は短くなります。',
    },
    electron_diffraction: {
      'th-TH': 'บทที่ 4 การเลี้ยวเบนของอิเล็กตรอนผ่านผลึกแกรไฟต์: อิเล็กตรอนเกิดการแทรกสอดแบบเสริมเป็นวงแหวน 2 วงตามกฎของแบรกก์ nλ = 2d sinθ (d₁ = 213 pm, d₂ = 123 pm) เมื่อเพิ่มแรงดัน V_a วงแหวนจะหดเล็กลงครับ',
      'en-US': 'Module 04 Electron Diffraction: Electrons diffract through polycrystalline graphite into concentric rings following Bragg’s law nλ = 2d sinθ. Increasing V_a shrinks the ring diameter.',
      'zh-CN': '第4章 电子衍射：电子穿过石墨多晶薄膜，按照布拉格定律 nλ = 2d sinθ 形成同心衍射环。增大加速电压 V_a 会使衍射环变小。',
      'ja-JP': '第4章 電子回折：電子はグラファイト薄膜でブラッグの法則 nλ = 2d sinθ に従って回折し、同心円状のリングを作ります。',
    },
    atomic_models: {
      'th-TH': 'บทที่ 5 แบบจำลองอะตอมของบอร์: อิเล็กตรอนอยู่ในระดับพลังงานแยกไม่ต่อเนื่อง E_n = −13.6/n² eV เมื่อกระโดดจากชั้นสูงลงชั้นต่ำจะคายโฟตอนพลังงาน ΔE = |E_i − E_f| = hc/λ เกิดเป็นเส้นสเปกตรัมครับ',
      'en-US': 'Module 05 Bohr Atomic Model: Electrons occupy quantized energy levels E_n = −13.6/n² eV. Transitions release photons with ΔE = hc/λ, creating line spectra.',
      'zh-CN': '第5章 玻尔原子模型：电子处于量子化能级 E_n = −13.6/n² eV，跃迁时发射特定波长的光子 ΔE = hc/λ，形成线状光谱。',
      'ja-JP': '第5章 ボーアの原子模型：電子は量子化されたエネルギー準位 E_n = −13.6/n² eV に存在し、遷移時に ΔE = hc/λ の光子を放出します。',
    },
    quantum_mechanics: {
      'th-TH': 'บทที่ 6 กลศาสตร์ควอนตัมเบื้องต้น: ตำแหน่งอนุภาคบอกด้วยความน่าจะเป็น |ψ(x)|² ในบ่อศักย์อนันต์พลังงานคือ E_n = n²h²/(8mL²) และอนุภาคพลังงาน E < V₀ ยังทะลุผ่านกำแพงศักย์ได้ด้วย Quantum Tunneling ครับ',
      'en-US': 'Module 06 Quantum Mechanics: Particle location is described by probability density |ψ(x)|². Even when E < V₀, waves decay exponentially inside a barrier and tunnel through!',
      'zh-CN': '第6章 量子力学基础：粒子位置由概率密度 |ψ(x)|² 描述。即使能量 E < V₀，波函数也能通过量子隧穿效应穿过势垒。',
      'ja-JP': '第6章 量子力学入門：粒子の存在確率は |ψ(x)|² で表されます。E < V₀ でも量子トンネル効果により障壁を透過できます。',
    },
    solid_state: {
      'th-TH': 'บทที่ 7 ฟิสิกส์ของแข็งและสารกึ่งตัวนำ: สมบัติการนำไฟฟ้าขึ้นกับช่องว่างพลังงาน E_g ระหว่างแถบเวเลนซ์และแถบนำไฟฟ้า ส่วน LED เปล่งแสงที่ความยาวคลื่น λ ≈ 1240/E_g (nm) ครับ',
      'en-US': 'Module 07 Solid-State Physics: Conductivity depends on the energy band gap E_g. Semiconductors have E_g ≈ 0.5–3 eV, and LEDs emit photons at λ ≈ 1240/E_g nm.',
      'zh-CN': '第7章 固体物理与半导体：材料的导电性取决于带隙宽度 E_g。LED 发光波长约为 λ ≈ 1240/E_g nm。',
      'ja-JP': '第7章 固体物理学：電気伝導性はバンドギャップ E_g に依存します。LED の発光波長は λ ≈ 1240/E_g nm です。',
    },
    nuclear_physics: {
      'th-TH': 'บทที่ 8 นิวเคลียร์และกัมมันตภาพรังสี: การสลายตัวเป็นไปตามกฎ N(t) = N₀ e^(−λt) โดยมีครึ่งชีวิต T₁/₂ = ln(2)/λ และความผันผวนของเครื่องนับเป็นสถิติปัวส์ซงครับ',
      'en-US': 'Module 08 Nuclear Radioactivity: Radioactive decay follows N(t) = N₀ e^(−λt) with half-life T₁/₂ = ln(2)/λ, exhibiting Poisson counting fluctuations.',
      'zh-CN': '第8章 原子核与放射性：放射性衰变遵循 N(t) = N₀ e^(−λt)，半衰期 T₁/₂ = ln(2)/λ，计数服从泊松统计。',
      'ja-JP': '第8章 原子核と放射能：放射性崩壊は N(t) = N₀ e^(−λt) に従い、半減期 T₁/₂ = ln(2)/λ となります。',
    },
    particle_physics: {
      'th-TH': 'บทที่ 9 ฟิสิกส์อนุภาคมูลฐาน: โปรตอน (uud) และนิวตรอน (udd) ประกอบจากควาร์ก ยึดเหนี่ยวด้วยกลูออน ส่วนอิเล็กตรอนเป็นเลปตอน ทุกปฏิกิริยาต้องอนุรักษ์ประจุ Q, เลขแบริออน B และเลขเลปตอน L ครับ',
      'en-US': 'Module 09 Particle Physics: Protons (uud) and neutrons (udd) are built from quarks bound by gluons. All interactions conserve charge Q, baryon number B, and lepton number L.',
      'zh-CN': '第9章 粒子物理标准模型：质子 (uud) 和中子 (udd) 由夸克通过胶子束缚而成，所有反应均遵守电荷、重子数和轻子数守恒。',
      'ja-JP': '第9章 素粒子物理学：陽子 (uud) と中性子 (udd) はクォークから構成され、電荷 Q・バリオン数 B・レプトン数 L が保存されます。',
    },
  };

  let currentLang = localStorage.getItem('mp27_qbot_lang') || 'th-TH';
  if (!LANGS[currentLang]) currentLang = 'th-TH';
  let autoSpeak = true;
  let isOpen = false;
  let recognition = null;

  function playChime() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (_) {}
  }

  function cleanForSpeech(text, lang) {
    let s = String(text || '')
      .replace(/\$\$/g, ' ')
      .replace(/\$/g, ' ')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 / $2')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/[{}]/g, '');
    if (lang === 'th-TH') {
      s = s
        .replace(/Δt/g, 'เดลต้าที')
        .replace(/Δτ/g, 'เดลต้าทาว')
        .replace(/γ/g, 'แกมมา')
        .replace(/β/g, 'เบตา')
        .replace(/λ/g, 'แลมบ์ดา')
        .replace(/θ/g, 'ธีตา')
        .replace(/φ/g, 'ฟาย')
        .replace(/ψ/g, 'ซาย')
        .replace(/ħ/g, 'เอชบาร์')
        .replace(/≈/g, 'ประมาณ ')
        .replace(/=/g, ' เท่ากับ ');
    }
    return s.replace(/\s+/g, ' ').trim();
  }

  function setSpeakingUi(speaking) {
    const orb = document.getElementById('qbot-fab');
    const wave = document.getElementById('qbot-wave');
    const panel = document.getElementById('qbot-panel');
    if (orb) orb.classList.toggle('speaking', speaking);
    if (wave) wave.classList.toggle('active', speaking);
    if (panel) panel.classList.toggle('speaking', speaking);
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingUi(false);
  }

  function speakText(text) {
    if (!autoSpeak || !('speechSynthesis' in window)) return;
    stopSpeaking();
    const utter = new SpeechSynthesisUtterance(cleanForSpeech(text, currentLang));
    utter.lang = currentLang;
    utter.rate = currentLang === 'th-TH' ? 1.02 : 1.0;
    utter.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const prefix = currentLang.split('-')[0];
    const match =
      voices.find((v) => v.lang === currentLang && /google|natural|neural/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith(prefix));
    if (match) utter.voice = match;
    utter.onstart = () => setSpeakingUi(true);
    utter.onend = () => setSpeakingUi(false);
    utter.onerror = () => setSpeakingUi(false);
    window.speechSynthesis.speak(utter);
  }

  function getActiveModuleKey() {
    const ctScript = document.querySelector('script[data-ct-module]');
    if (ctScript && ctScript.dataset.ctModule) return ctScript.dataset.ctModule;
    const activePage = document.querySelector('section.page.active');
    if (activePage && activePage.dataset.page && KB[activePage.dataset.page]) {
      return activePage.dataset.page;
    }
    return 'relativity';
  }

  function buildReply(queryRaw) {
    const q = String(queryRaw || '').trim().toLowerCase();
    const modKey = getActiveModuleKey();
    const lect = window.MP27Lecture?.LECTURE_DATA?.[modKey];

    // Autonomous actions
    if (q.includes('สไลด์') || q.includes('ทฤษฎี') || q.includes('slide') || q.includes('幻灯片') || q.includes('スライド')) {
      if (window.MP27Lecture?.openPresentation) {
        window.MP27Lecture.openPresentation(modKey);
      } else {
        document.getElementById('ct-theory-btn')?.click();
      }
      return KB[modKey]?.[currentLang] || LANGS[currentLang].greeting;
    }

    if (q.includes('ar') || q.includes('xr') || q.includes('กล้อง') || q.includes('camera')) {
      document.getElementById('ct-xr-btn')?.click();
      return currentLang === 'th-TH'
        ? 'เปิดโหมด AR:XR ตรวจจับใบหน้า ตา คิ้ว มือ และนิ้วให้แล้วครับ ลองจีบนิ้วชี้กับนิ้วโป้งหน้ากล้องได้เลย!'
        : 'AR:XR Vision Controller toggled! Try pinching your thumb and index finger in front of the camera.';
    }

    if (q.includes('รีเซ็ต') || q.includes('reset')) {
      document.querySelector('#resetSimulation, #reset-btn')?.click();
      return currentLang === 'th-TH' ? 'รีเซ็ตค่า Simulator เรียบร้อยแล้วครับ' : 'Simulator reset complete.';
    }

    const betaMatch = q.match(/(?:beta|β|ความเร็ว)\s*[=:]?\s*(0?\.\d+)/i);
    if (betaMatch) {
      const bVal = parseFloat(betaMatch[1]);
      const slider = document.querySelector('#beta, #ipo-beta');
      if (slider && bVal < 1) {
        slider.value = String(bVal);
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        return currentLang === 'th-TH'
          ? `ปรับค่าความเร็วสัมพัทธ์ β = ${bVal}c บน Simulator ให้แล้วครับ`
          : `Set relative speed β = ${bVal}c on the simulator.`;
      }
    }

    if ((q.includes('สมการ') || q.includes('สูตร') || q.includes('equation') || q.includes('公式')) && lect) {
      const eqLines = lect.equations.map((e) => `• ${e.label}: ${e.latex.replace(/\\\\/g, ' ')}`).join('\n');
      return `${lect.title}\n${eqLines}`;
    }

    if ((q.includes('ตัวอย่าง') || q.includes('คำนวณ') || q.includes('example') || q.includes('示例') || q.includes('例')) && lect) {
      return `โจทย์: ${lect.example.problem}\nวิธีทำ: ${lect.example.solution}`;
    }

    // Topic routing by keywords
    const topicMap = [
      { keys: ['สัมพัทธภาพ', 'เวลา', 'นาฬิกา', 'relativity', 'lorentz', 'time', '相对论', '相対'], mod: 'relativity' },
      { keys: ['โฟโต', 'โฟตอน', 'แสง', 'photoelectric', 'photon', '光电', '光電'], mod: 'quantum_light' },
      { keys: ['เดอบรอยล์', 'คอมป์ตัน', 'คลื่นสสาร', 'broglie', 'compton', '物质波', '物質波'], mod: 'matter_waves' },
      { keys: ['เลี้ยวเบน', 'แกรไฟต์', 'แบรกก์', 'diffraction', 'bragg', '衍射', '回折'], mod: 'electron_diffraction' },
      { keys: ['บอร์', 'อะตอม', 'สเปกตรัม', 'bohr', 'atom', '原子', 'ボーア'], mod: 'atomic_models' },
      { keys: ['ชเรอดิงเงอร์', 'ทะลุ', 'tunnel', 'schrodinger', 'quantum', '量子'], mod: 'quantum_mechanics' },
      { keys: ['ของแข็ง', 'แถบพลังงาน', 'สารกึ่งตัวนำ', 'led', 'band', 'semiconductor', '半导体', '半導体'], mod: 'solid_state' },
      { keys: ['นิวเคลียร์', 'ครึ่งชีวิต', 'กัมมันต', 'nuclear', 'decay', 'half', '核', '放射'], mod: 'nuclear_physics' },
      { keys: ['ควาร์ก', 'เลปตอน', 'ฮิกส์', 'quark', 'lepton', 'standard model', '粒子', 'クォーク'], mod: 'particle_physics' },
    ];

    for (const t of topicMap) {
      if (t.keys.some((k) => q.includes(k))) {
        return KB[t.mod]?.[currentLang] || KB[t.mod]['th-TH'];
      }
    }

    return KB[modKey]?.[currentLang] || LANGS[currentLang].greeting;
  }

  function injectStyles() {
    if (document.getElementById('qbot-css')) return;
    const st = document.createElement('style');
    st.id = 'qbot-css';
    st.textContent = `
      #qbot-fab {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 99990;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px 8px 10px;
        border-radius: 999px;
        border: 1.5px solid rgba(56, 189, 248, 0.7);
        background: linear-gradient(135deg, #09152b 0%, #172554 100%);
        color: #f8fafc;
        font-family: system-ui, -apple-system, 'Sarabun', sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(2, 132, 199, 0.35);
      }
      #qbot-fab:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(56, 189, 248, 0.45); }
      .qbot-orb {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #67e8f9, #0284c7 65%, #1e1b4b);
        box-shadow: 0 0 12px #38bdf8;
        position: relative;
      }
      #qbot-fab.speaking .qbot-orb { animation: qbotPulse 0.8s infinite alternate; }
      @keyframes qbotPulse { from { transform: scale(1); box-shadow: 0 0 10px #38bdf8; } to { transform: scale(1.16); box-shadow: 0 0 22px #22d3ee; } }

      #qbot-panel {
        position: fixed;
        right: 18px;
        bottom: 82px;
        width: min(380px, 92vw);
        max-height: 74vh;
        z-index: 99995;
        display: none;
        flex-direction: column;
        border-radius: 16px;
        border: 1.5px solid rgba(56, 189, 248, 0.55);
        background: rgba(9, 18, 36, 0.96);
        color: #e2e8f0;
        font-family: system-ui, -apple-system, 'Sarabun', sans-serif;
        box-shadow: 0 22px 60px rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(12px);
        overflow: hidden;
      }
      #qbot-panel.open { display: flex; }
      .qbot-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px 14px;
        background: linear-gradient(90deg, #0f172a, #1e3a8a);
        border-bottom: 1px solid rgba(56, 189, 248, 0.3);
      }
      .qbot-head-title { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 14px; color: #38bdf8; }
      .qbot-wave { display: flex; align-items: center; gap: 2px; height: 14px; }
      .qbot-wave i { display: block; width: 3px; height: 4px; background: #38bdf8; border-radius: 2px; }
      .qbot-wave.active i { animation: qbotWave 0.6s infinite ease-in-out alternate; }
      .qbot-wave.active i:nth-child(2) { animation-delay: 0.15s; }
      .qbot-wave.active i:nth-child(3) { animation-delay: 0.3s; }
      @keyframes qbotWave { from { height: 4px; } to { height: 14px; } }
      .qbot-head-ctrl { display: flex; align-items: center; gap: 6px; }
      #qbot-lang {
        background: #0f172a;
        color: #f8fafc;
        border: 1px solid #38bdf8;
        border-radius: 8px;
        padding: 3px 6px;
        font-size: 11.5px;
      }
      .qbot-icon-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #f8fafc;
        border-radius: 8px;
        padding: 4px 7px;
        font-size: 12px;
        cursor: pointer;
      }
      .qbot-msgs {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 9px;
        min-height: 190px;
      }
      .qbot-msg {
        max-width: 88%;
        padding: 9px 12px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.55;
        white-space: pre-line;
      }
      .qbot-msg.bot { align-self: flex-start; background: #1e293b; border: 1px solid #334155; color: #f1f5f9; }
      .qbot-msg.user { align-self: flex-end; background: #0284c7; color: #ffffff; }
      .qbot-quick {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 6px 12px 8px;
        border-top: 1px solid #1e293b;
      }
      .qbot-chip {
        background: rgba(56, 189, 248, 0.14);
        border: 1px solid rgba(56, 189, 248, 0.4);
        color: #bae6fd;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 11.5px;
        cursor: pointer;
      }
      .qbot-chip:hover { background: rgba(56, 189, 248, 0.28); }
      .qbot-input-row {
        display: flex;
        gap: 6px;
        padding: 10px 12px;
        background: #0f172a;
        border-top: 1px solid #1e293b;
      }
      #qbot-input {
        flex: 1;
        background: #1e293b;
        color: #f8fafc;
        border: 1px solid #334155;
        border-radius: 10px;
        padding: 8px 10px;
        font-size: 13px;
        outline: none;
      }
      #qbot-input:focus { border-color: #38bdf8; }
      .qbot-fab-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #38bdf8;
        box-shadow: 0 0 12px rgba(56, 189, 248, 0.75);
        animation: qbotIdleFloat 3.6s ease-in-out infinite;
      }
      #qbot-fab.speaking .qbot-fab-avatar {
        animation: qbotSpeakBounce 0.45s ease-in-out infinite alternate;
        border-color: #22d3ee;
        box-shadow: 0 0 18px #22d3ee;
      }
      .qbot-avatar-stage {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        background: radial-gradient(circle at 22% 50%, rgba(14, 116, 144, 0.35), rgba(15, 23, 42, 0.92));
        border-bottom: 1px solid rgba(56, 189, 248, 0.25);
      }
      .qbot-holo-wrap {
        position: relative;
        width: 66px;
        height: 66px;
        flex: 0 0 66px;
        display: grid;
        place-items: center;
      }
      .qbot-holo-ring {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1.5px dashed rgba(56, 189, 248, 0.8);
        animation: qbotSpin 12s linear infinite;
      }
      .qbot-holo-ring.inner {
        inset: 4px;
        border-style: solid;
        border-color: rgba(34, 211, 238, 0.45) transparent;
        animation: qbotSpinRev 7s linear infinite;
      }
      .qbot-holo-img {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #38bdf8;
        animation: qbotIdleFloat 3.4s ease-in-out infinite;
      }
      #qbot-panel.speaking .qbot-holo-img {
        animation: qbotSpeakBounce 0.42s ease-in-out infinite alternate;
        box-shadow: 0 0 20px rgba(34, 211, 238, 0.85);
      }
      #qbot-panel.speaking .qbot-holo-ring {
        border-color: #22d3ee;
        animation-duration: 3s;
      }
      .qbot-prof-name { font-size: 13px; font-weight: 800; color: #f8fafc; }
      .qbot-prof-role { font-size: 11px; color: #93c5fd; margin-top: 2px; }
      .qbot-prof-status {
        display: inline-block;
        margin-top: 4px;
        font-size: 10.5px;
        font-weight: 700;
        color: #6ee7b7;
        background: rgba(16, 185, 129, 0.14);
        border: 1px solid rgba(52, 211, 153, 0.4);
        padding: 1px 8px;
        border-radius: 999px;
      }
      @keyframes qbotIdleFloat {
        0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
        50% { transform: translateY(-2px) scale(1.03) rotate(1.2deg); }
      }
      @keyframes qbotSpeakBounce {
        from { transform: scale(1) rotate(-1deg); }
        to { transform: scale(1.07) rotate(1.5deg); }
      }
      @keyframes qbotSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes qbotSpinRev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    `;
    document.head.appendChild(st);
  }

  function getAvatarUrl() {
    const isSubLab = Boolean(document.querySelector('script[data-ct-module]'));
    return isSubLab ? '../shared/dr_chewa_avatar.jpg' : './shared/dr_chewa_avatar.jpg';
  }

  function initQBot() {
    if (!document.body || document.getElementById('qbot-fab')) return;
    injectStyles();
    const avatarUrl = getAvatarUrl();

    const fab = document.createElement('button');
    fab.id = 'qbot-fab';
    fab.type = 'button';
    fab.innerHTML = `<img class="qbot-fab-avatar" src="${avatarUrl}" alt="ผศ.ดร.ชีวะ ทัศนา"/><span>Q_bot · ผศ.ดร.ชีวะ</span>`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'qbot-panel';
    const langOpts = Object.entries(LANGS)
      .map(([code, cfg]) => `<option value="${code}"${code === currentLang ? ' selected' : ''}>${cfg.flag} ${cfg.label}</option>`)
      .join('');

    panel.innerHTML = `
      <div class="qbot-head">
        <div class="qbot-head-title">
          <span>🤖 Q_bot Copilot</span>
          <span id="qbot-wave" class="qbot-wave"><i></i><i></i><i></i></span>
        </div>
        <div class="qbot-head-ctrl">
          <select id="qbot-lang" title="เลือกภาษา Q_bot">${langOpts}</select>
          <button type="button" id="qbot-tts-btn" class="qbot-icon-btn" title="เปิด/ปิดเสียงพูด">🔊</button>
          <button type="button" id="qbot-close-btn" class="qbot-icon-btn" title="ปิด">✕</button>
        </div>
      </div>
      <div class="qbot-avatar-stage">
        <div class="qbot-holo-wrap">
          <span class="qbot-holo-ring"></span>
          <span class="qbot-holo-ring inner"></span>
          <img class="qbot-holo-img" src="${avatarUrl}" alt="ผศ.ดร.ชีวะ ทัศนา 3D Pixar Avatar"/>
        </div>
        <div>
          <div class="qbot-prof-name">ผศ.ดร.ชีวะ ทัศนา</div>
          <div class="qbot-prof-role">อาจารย์ผู้สอน · ฟิสิกส์ยุคใหม่ มรภ.รำไพพรรณี</div>
          <span class="qbot-prof-status">● AI Hologram Ready</span>
        </div>
      </div>
      <div id="qbot-msgs" class="qbot-msgs"></div>
      <div id="qbot-quick" class="qbot-quick"></div>
      <div class="qbot-input-row">
        <button type="button" id="qbot-mic-btn" class="qbot-icon-btn" title="ถามด้วยเสียง">🎤</button>
        <input id="qbot-input" type="text" placeholder="${LANGS[currentLang].placeholder}" />
        <button type="button" id="qbot-send-btn" class="qbot-icon-btn" style="background:#0284c7;border-color:#38bdf8;">ส่ง</button>
      </div>
    `;
    document.body.appendChild(panel);

    const msgsEl = panel.querySelector('#qbot-msgs');
    const quickEl = panel.querySelector('#qbot-quick');
    const inputEl = panel.querySelector('#qbot-input');
    const langSel = panel.querySelector('#qbot-lang');
    const ttsBtn = panel.querySelector('#qbot-tts-btn');

    function addMsg(text, role) {
      const div = document.createElement('div');
      div.className = `qbot-msg ${role}`;
      div.textContent = text;
      msgsEl.appendChild(div);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function renderQuick() {
      inputEl.placeholder = LANGS[currentLang].placeholder;
      quickEl.innerHTML = LANGS[currentLang].quick
        .map((q) => `<button type="button" class="qbot-chip">${q}</button>`)
        .join('');
    }

    function handleAsk(raw) {
      const text = String(raw || '').trim();
      if (!text) return;
      addMsg(text, 'user');
      inputEl.value = '';
      const reply = buildReply(text);
      setTimeout(() => {
        addMsg(reply, 'bot');
        speakText(reply);
      }, 150);
    }

    addMsg(LANGS[currentLang].greeting, 'bot');
    renderQuick();

    fab.addEventListener('click', () => {
      isOpen = !isOpen;
      panel.classList.toggle('open', isOpen);
      if (isOpen) {
        playChime();
        inputEl.focus();
      } else {
        stopSpeaking();
      }
    });

    panel.querySelector('#qbot-close-btn').addEventListener('click', () => {
      isOpen = false;
      panel.classList.remove('open');
      stopSpeaking();
    });

    ttsBtn.addEventListener('click', () => {
      autoSpeak = !autoSpeak;
      ttsBtn.textContent = autoSpeak ? '🔊' : '🔇';
      if (!autoSpeak) stopSpeaking();
    });

    langSel.addEventListener('change', () => {
      currentLang = langSel.value;
      localStorage.setItem('mp27_qbot_lang', currentLang);
      renderQuick();
      const greet = LANGS[currentLang].greeting;
      addMsg(greet, 'bot');
      speakText(greet);
    });

    quickEl.addEventListener('click', (e) => {
      const chip = e.target.closest('.qbot-chip');
      if (chip) handleAsk(chip.textContent);
    });

    panel.querySelector('#qbot-send-btn').addEventListener('click', () => handleAsk(inputEl.value));
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAsk(inputEl.value);
    });

    panel.querySelector('#qbot-mic-btn').addEventListener('click', () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        addMsg(LANGS[currentLang].micUnsupported, 'bot');
        return;
      }
      if (recognition) {
        try { recognition.stop(); } catch (_) {}
      }
      recognition = new SR();
      recognition.lang = currentLang;
      recognition.interimResults = false;
      addMsg(LANGS[currentLang].micStart, 'bot');
      recognition.onresult = (ev) => {
        const transcript = ev.results?.[0]?.[0]?.transcript || '';
        if (transcript) handleAsk(transcript);
      };
      recognition.onerror = () => {};
      recognition.start();
    });
  }

  window.MP27QBot = { init: initQBot, speak: speakText, stop: stopSpeaking };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQBot);
  } else {
    initQBot();
  }
})();
