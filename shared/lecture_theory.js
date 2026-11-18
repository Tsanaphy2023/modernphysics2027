/* Modern Physics 2027 — Lecturer Theory, KaTeX LaTeX Equations & Vector SVG Diagrams (Modules 01–09) */
(() => {
  const LECTURE_DATA = {
    relativity: {
      badge: 'บทที่ 01 · สัมพัทธภาพพิเศษ',
      title: 'ทฤษฎีสัมพัทธภาพพิเศษ (Special Relativity)',
      concept:
        'เมื่อวัตถุเคลื่อนที่ด้วยความเร็วสูงใกล้เคียงความเร็วแสง ($c \\approx 3.00 \\times 10^8\\;\\mathrm{m/s}$) เวลาและระยะทางไม่ได้คงที่สัมบูรณ์อีกต่อไป ผู้สังเกตที่อยู่นิ่งจะเห็นนาฬิกาบนยานอวกาศเดินช้าลง (Time Dilation) และเห็นความยาวของยานหดสั้นลงตามแนวการเคลื่อนที่ (Length Contraction)',
      deep:
        'ตั้งอยู่บนสมมติฐาน 2 ข้อของไอน์สไตน์: (1) กฎฟิสิกส์เหมือนกันในทุกกรอบอ้างอิงเฉื่อย (2) อัตราเร็วแสงในสุญญากาศ $c$ มีค่าคงที่เท่ากันสำหรับผู้สังเกตทุกคน การแปลงพิกัดแบบกาลิเลียนจึงถูกแทนที่ด้วยการแปลงลอเรนซ์ (Lorentz Transformation) โดยมีตัวประกอบลอเรนซ์ $\\gamma = 1 / \\sqrt{1 - \\beta^2}$ เป็นตัวเชื่อมกาล-อวกาศ (Spacetime)',
      equations: [
        {
          latex: '\\gamma = \\frac{1}{\\sqrt{1 - \\beta^2}}, \\qquad \\beta = \\frac{v}{c}',
          label: 'ตัวประกอบลอเรนซ์ (Lorentz Factor)',
          vars: '$\\beta$ = อัตราส่วนความเร็วต่อแสง ($|\\beta| < 1$), $\\gamma \\ge 1$ (ไร้มิติ)',
        },
        {
          latex: '\\Delta t = \\gamma\\,\\Delta\\tau',
          label: 'การยืดของเวลา (Time Dilation)',
          vars: '$\\Delta\\tau$ = เวลาแท้บนกรอบยาน ($\\mathrm{s}$), $\\Delta t$ = เวลาที่ผู้สังเกตนิ่งวัดได้ ($\\mathrm{s}$)',
        },
        {
          latex: 'L = \\frac{L_0}{\\gamma} = L_0\\sqrt{1 - \\beta^2}',
          label: 'การหดสั้นของความยาว (Length Contraction)',
          vars: '$L_0$ = ความยาวแท้เมื่ออยู่นิ่ง ($\\mathrm{m}$), $L$ = ความยาวที่วัดขณะเคลื่อนที่ ($\\mathrm{m}$)',
        },
      ],
      example: {
        problem: 'ยานอวกาศยาวแท้ $L_0 = 10.0\\;\\mathrm{m}$ เคลื่อนที่ด้วยความเร็ว $v = 0.80c$ ($\\beta = 0.80$) ถ้านักบินจับเวลา $\\Delta\\tau = 3.0\\;\\mathrm{s}$ ผู้สังเกตบนโลกจะวัด $\\Delta t$ และ $L$ ได้เท่าใด?',
        solution: '$\\gamma = 1 / \\sqrt{1 - 0.80^2} = 1 / 0.60 = 1.667 \\implies \\Delta t = 1.667 \\times 3.0 = 5.00\\;\\mathrm{s}$ และ $L = 10.0 / 1.667 = 6.00\\;\\mathrm{m}$',
      },
      question: {
        prompt: 'ทำไมอนุภาคมิวออน (Muon) จากรังสีคอสมิกที่มีครึ่งชีวิตสั้นมากเพียง $2.2\\;\\mu\\mathrm{s}$ จึงสามารถเดินทางลงมาถึงผิวโลกได้?',
        answer: 'เพราะมิวออนเคลื่อนที่ด้วยความเร็วใกล้ $c$ ($\\beta \\approx 0.995$) ในมุมมองชาวโลกเวลาของมิวออนยืดออก ($\\gamma \\approx 10$) ส่วนในมุมมองมิวออนระยะทางชั้นบรรยากาศหดสั้นลง 10 เท่า',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพนาฬิกาแสงและตัวประกอบลอเรนซ์">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="32" font-size="13" font-weight="700" fill="#0f172a">Light Clock: กรอบนิ่ง (Δτ) เทียบกับ กรอบเคลื่อนที่ด้วย v (Δt = γΔτ)</text>
          <rect x="34" y="54" width="120" height="120" rx="8" fill="#ffffff" stroke="#94a3b8"/>
          <line x1="58" y1="68" x2="130" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="58" y1="158" x2="130" y2="158" stroke="#1e293b" stroke-width="4"/>
          <line x1="94" y1="72" x2="94" y2="154" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 3"/>
          <circle cx="94" cy="113" r="6" fill="#f59e0b">
            <animate attributeName="cy" values="74;152;74" dur="1.4s" repeatCount="indefinite"/>
          </circle>
          <text x="94" y="192" text-anchor="middle" font-size="11" fill="#334155">กรอบยาน (v = 0): ระยะ 2d = cΔτ</text>
          <rect x="190" y="54" width="300" height="120" rx="8" fill="#ffffff" stroke="#94a3b8"/>
          <line x1="215" y1="68" x2="265" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="315" y1="68" x2="365" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="415" y1="68" x2="465" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="215" y1="158" x2="265" y2="158" stroke="#1e293b" stroke-width="4"/>
          <line x1="315" y1="158" x2="365" y2="158" stroke="#1e293b" stroke-width="4"/>
          <line x1="415" y1="158" x2="465" y2="158" stroke="#1e293b" stroke-width="4"/>
          <polyline points="240,154 340,72 440,154" fill="none" stroke="#2563eb" stroke-width="2.8"/>
          <circle r="6" fill="#2563eb">
            <animateMotion path="M 240,154 L 340,72 L 440,154" dur="2.33s" repeatCount="indefinite"/>
          </circle>
          <line x1="240" y1="113" x2="440" y2="113" stroke="#10b981" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="340" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">vΔt →</text>
          <text x="275" y="104" font-size="11" font-weight="700" fill="#2563eb">cΔt/2</text>
          <text x="340" y="192" text-anchor="middle" font-size="11" fill="#334155">ผู้สังเกตนิ่ง: แสงเดินทางแนวเฉียงยาวขึ้น → เวลา Δt ยืดออก</text>
        </svg>`,
    },

    quantum_light: {
      badge: 'บทที่ 02 · ทฤษฎีควอนตัมของแสง',
      title: 'ปรากฏการณ์โฟโตอิเล็กทริกและโฟตอน (Photoelectric Effect)',
      concept:
        'แสงไม่ได้เป็นเพียงคลื่นต่อเนื่อง แต่ประพฤติตัวเป็นก้อนพลังงานเรียกว่า "โฟตอน" (Photon) การจะทำให้อิเล็กตรอนหลุดจากผิวโลหะได้ขึ้นอยู่กับ "ความถี่แสง" ไม่ใช่ความเข้มแสง ถ้ายิงแสงความถี่ต่ำกว่าความถี่ขีดเริ่ม $f_0$ ต่อให้เปิดไฟสว่างแค่ไหนอิเล็กตรอนก็จะไม่หลุด',
      deep:
        'สมการโฟโตอิเล็กทริกของไอน์สไตน์อาศัยกฎอนุรักษ์พลังงานระดับควอนตัม: พลังงาน 1 โฟตอน $E = hf$ ถูกถ่ายโอนให้แก่อิเล็กตรอน 1 ตัวทันที ส่วนหนึ่งใช้เอาชนะฟังก์ชันงาน $\\phi$ (Work Function) ของโลหะ ที่เหลือกลายเป็นพลังงานจลน์สูงสุด $K_{\\max}$ ซึ่งวัดได้จากศักย์หยุดยั้ง $V_s$ ($eV_s = K_{\\max}$)',
      equations: [
        {
          latex: 'E = hf = \\frac{hc}{\\lambda}',
          label: 'พลังงานของ 1 โฟตอน (Planck–Einstein)',
          vars: '$h = 6.626 \\times 10^{-34}\\;\\mathrm{J\\cdot s}$, $f$ = ความถี่ ($\\mathrm{Hz}$), $\\lambda$ = ความยาวคลื่น ($\\mathrm{m}$)',
        },
        {
          latex: 'K_{\\max} = hf - \\phi = eV_s',
          label: 'พลังงานจลน์สูงสุดของโฟโตอิเล็กตรอน',
          vars: '$\\phi$ = ฟังก์ชันงานของโลหะ ($\\mathrm{eV}$), $V_s$ = ศักย์หยุดยั้ง ($\\mathrm{V}$)',
        },
        {
          latex: 'f_0 = \\frac{\\phi}{h}, \\qquad \\lambda_0 = \\frac{hc}{\\phi}',
          label: 'ความถี่และขีดเริ่มความยาวคลื่น (Threshold)',
          vars: 'ต้องใช้ $f > f_0$ (หรือ $\\lambda < \\lambda_0$) จึงจะเกิดกระแสโฟโตอิเล็กทริก',
        },
      ],
      example: {
        problem: 'ฉายแสงความยาวคลื่น $\\lambda = 400\\;\\mathrm{nm}$ ($E \\approx 3.10\\;\\mathrm{eV}$) ตกกระทบผิวโพแทสเซียมที่มี $\\phi = 2.30\\;\\mathrm{eV}$ จะได้ $K_{\\max}$ และศักย์หยุดยั้งเท่าใด?',
        solution: '$K_{\\max} = hf - \\phi = 3.10 - 2.30 = 0.80\\;\\mathrm{eV} \\implies$ ศักย์หยุดยั้ง $V_s = 0.80\\;\\mathrm{V}$',
      },
      question: {
        prompt: 'หากเพิ่ม "ความเข้มแสง" เป็น 2 เท่า โดยใช้ความยาวคลื่นเดิม ($f > f_0$) ค่า $K_{\\max}$ และกระแสไฟฟ้า $i$ จะเปลี่ยนแปลงอย่างไร?',
        answer: 'กระแสไฟฟ้า $i$ เพิ่มเป็น 2 เท่า (จำนวนโฟตอนต่อวินาทีมากขึ้น) แต่ $K_{\\max}$ เท่าเดิม เพราะพลังงานต่อ 1 โฟตอน ($hf$) ขึ้นกับความถี่เท่านั้น',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="กราฟ Kmax กับความถี่ f ในปรากฏการณ์โฟโตอิเล็กทริก">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ความสัมพันธ์ K_max = hf − φ (ความชันเท่ากับค่าคงที่พลังค์ h)</text>
          <line x1="70" y1="150" x2="470" y2="150" stroke="#334155" stroke-width="2"/>
          <line x1="70" y1="44" x2="70" y2="195" stroke="#334155" stroke-width="2"/>
          <text x="474" y="154" font-size="11" font-weight="700" fill="#334155">f (Hz)</text>
          <text x="24" y="54" font-size="11" font-weight="700" fill="#334155">K_max (eV)</text>
          <line x1="70" y1="190" x2="360" y2="52" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4 3"/>
          <line x1="154" y1="150" x2="360" y2="52" stroke="#2563eb" stroke-width="3"/>
          <circle r="5.5" fill="#f59e0b">
            <animateMotion path="M 154,150 L 360,52" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="154" cy="150" r="5" fill="#dc2626">
            <animate attributeName="r" values="4.5;7.5;4.5" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <text x="154" y="168" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">f₀ (ขีดเริ่ม)</text>
          <line x1="250" y1="150" x2="445" y2="58" stroke="#059669" stroke-width="3"/>
          <circle cx="250" cy="150" r="5" fill="#059669"/>
          <text x="250" y="168" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">f₀ โลหะ 2 (φ สูงกว่า)</text>
          <text x="340" y="88" font-size="11" font-weight="700" fill="#2563eb">Slope = h</text>
          <text x="76" y="188" font-size="11" fill="#475569">จุดตัดแกน Y = −φ</text>
        </svg>`,
    },

    matter_waves: {
      badge: 'บทที่ 03 · สมบัติคลื่นของอนุภาค',
      title: 'คลื่นสสารของเดอบรอยล์และการกระเจิงคอมป์ตัน',
      concept:
        'ไม่เพียงแสงที่ประพฤติตัวเป็นอนุภาคได้ แต่อนุภาคที่มีมวลอย่างอิเล็กตรอนก็มีสมบัติความเป็นคลื่นด้วยเช่นกัน เรียกว่า "คลื่นสสาร" (Matter Wave) ยิ่งอนุภาคมีโมเมนตัมมาก ความยาวคลื่นเดอบรอยล์จะยิ่งสั้นลง',
      deep:
        'หลุยส์ เดอ บรอยล์ เสนอสมมติฐาน $\\lambda = h / p$ เพื่อเชื่อมทวิภาวะของคลื่นและอนุภาค (Wave-Particle Duality) สำหรับอิเล็กตรอนที่ถูกเร่งด้วยความต่างศักย์ $V$ จะได้ $\\lambda = h / \\sqrt{2m_e eV}$ นอกจากนี้การทดลองการกระเจิงคอมป์ตัน (Compton Scattering) ยังยืนยันว่าโฟตอนมีโมเมนตัม $p = h/\\lambda$',
      equations: [
        {
          latex: '\\lambda = \\frac{h}{p} = \\frac{h}{mv}',
          label: 'ความยาวคลื่นเดอบรอยล์ (de Broglie Wavelength)',
          vars: '$p$ = โมเมนตัม ($\\mathrm{kg\\cdot m/s}$), $h = 6.626 \\times 10^{-34}\\;\\mathrm{J\\cdot s}$',
        },
        {
          latex: '\\lambda = \\frac{h}{\\sqrt{2m_e eV}} \\approx \\frac{1.226}{\\sqrt{V}}\\;\\mathrm{nm}',
          label: 'อิเล็กตรอนที่เร่งด้วยความต่างศักย์ V',
          vars: '$V$ = ความต่างศักย์เร่งอนุภาค ($\\mathrm{V}$) แบบไม่สัมพัทธภาพ',
        },
        {
          latex: '\\Delta\\lambda = \\lambda\' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)',
          label: 'การเลื่อนความยาวคลื่นคอมป์ตัน (Compton Shift)',
          vars: '$\\lambda_c = h/(m_e c) \\approx 2.426\\;\\mathrm{pm}$, $\\theta$ = มุมกระเจิง',
        },
      ],
      example: {
        problem: 'เร่งอิเล็กตรอนด้วยความต่างศักย์ $V = 100\\;\\mathrm{V}$ อิเล็กตรอนจะมีความยาวคลื่นเดอบรอยล์เท่าใด?',
        solution: '$\\lambda \\approx 1.226 / \\sqrt{100} = 0.1226\\;\\mathrm{nm} = 1.226\\;\\text{\\AA}$ ซึ่งใกล้เคียงระยะห่างระหว่างอะตอมในผลึก จึงเกิดการเลี้ยวเบนได้',
      },
      question: {
        prompt: 'ทำไมลูกฟุตบอลที่เตะด้วยความเร็ว $20\\;\\mathrm{m/s}$ จึงไม่แสดงพฤติกรรมการเลี้ยวเบนให้เราเห็นเหมือนอิเล็กตรอน?',
        answer: 'เพราะมวลของลูกฟุตบอล ($\\approx 0.45\\;\\mathrm{kg}$) ใหญ่กว่าอิเล็กตรอนมหาศาล ทำให้ $\\lambda = h/(mv) \\approx 7 \\times 10^{-35}\\;\\mathrm{m}$ ซึ่งเล็กกว่าขนาดนิวเคลียสมาก จึงสังเกตการเลี้ยวเบนไม่ได้',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพคลื่นนิ่งเดอบรอยล์และคอมป์ตัน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ทวิภาวะคลื่น–อนุภาค: คลื่นสสารเดอบรอยล์ &amp; การกระเจิงคอมป์ตัน</text>
          <circle cx="130" cy="118" r="56" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 3"/>
          <path d="M 130,54 Q 160,64 176,82 T 192,118 T 176,154 T 130,182 T 84,154 T 68,118 T 84,82 Z" fill="none" stroke="#2563eb" stroke-width="2.5">
            <animateTransform attributeName="transform" type="rotate" from="0 130 118" to="360 130 118" dur="8s" repeatCount="indefinite"/>
          </path>
          <circle cx="130" cy="118" r="7" fill="#dc2626"/>
          <text x="130" y="200" text-anchor="middle" font-size="11" fill="#334155">วงโคจรคลื่นนิ่ง: 2πr = nλ</text>
          <line x1="255" y1="125" x2="345" y2="125" stroke="#f59e0b" stroke-width="3"/>
          <circle r="5" fill="#f59e0b">
            <animateMotion path="M 255,125 L 355,125" dur="1.4s" repeatCount="indefinite"/>
          </circle>
          <polygon points="345,125 335,120 335,130" fill="#f59e0b"/>
          <text x="295" y="114" text-anchor="middle" font-size="11" font-weight="700" fill="#b45309">โฟตอน λ</text>
          <circle cx="355" cy="125" r="8" fill="#0f172a"/>
          <text x="355" y="147" text-anchor="middle" font-size="10" fill="#334155">e⁻ นิ่ง</text>
          <line x1="362" y1="120" x2="455" y2="75" stroke="#2563eb" stroke-width="2.8"/>
          <circle r="4.5" fill="#2563eb">
            <animateMotion path="M 362,120 L 455,75" dur="1.4s" begin="0.7s" repeatCount="indefinite"/>
          </circle>
          <text x="435" y="68" font-size="11" font-weight="700" fill="#2563eb">λ′ &gt; λ (มุม θ)</text>
          <line x1="362" y1="130" x2="455" y2="165" stroke="#059669" stroke-width="2.5"/>
          <circle r="5" fill="#059669">
            <animateMotion path="M 362,130 L 455,165" dur="1.4s" begin="0.7s" repeatCount="indefinite"/>
          </circle>
          <text x="430" y="182" font-size="11" font-weight="700" fill="#059669">e⁻ กระเด็น</text>
        </svg>`,
    },

    electron_diffraction: {
      badge: 'บทที่ 04 · การเลี้ยวเบนของอิเล็กตรอน',
      title: 'การเลี้ยวเบนของอิเล็กตรอนผ่านผลึกแกรไฟต์ (Electron Diffraction)',
      concept:
        'เมื่อยิงลำอิเล็กตรอนพลังงานสูงผ่านแผ่นแกรไฟต์บางๆ อิเล็กตรอนจะเกิดการเลี้ยวเบนเป็น "วงแหวนสว่างซ้อนกัน" บนจอเรืองแสงคล้ายคลื่นแสงผ่านเกรตติง นี่คือหลักฐานตรงที่ยืนยันว่าอิเล็กตรอนมีความเป็นคลื่น',
      deep:
        'ตามกฎของแบรกก์ (Bragg’s Law) สำหรับผลึกพอลิคริสตัลไลน์แกรไฟต์ที่มีระยะห่างระนาบผลึกหลัก $d_1 = 0.213\\;\\mathrm{nm}$ และ $d_2 = 0.123\\;\\mathrm{nm}$ เมื่อปรับศักย์เร่ง $V_a$ สูงขึ้น ความยาวคลื่น $\\lambda = h / \\sqrt{2m_e e V_a}$ จะลดลง ทำให้มุมเลี้ยวเบน $\\theta$ และเส้นผ่านศูนย์กลางวงแหวน $D$ หดเล็กลง',
      equations: [
        {
          latex: 'n\\lambda = 2d\\sin\\theta',
          label: 'กฎการเลี้ยวเบนของแบรกก์ (Bragg’s Law)',
          vars: '$d$ = ระยะห่างระนาบผลึก ($d_1 = 213\\;\\mathrm{pm}, d_2 = 123\\;\\mathrm{pm}$), $\\theta$ = มุมเกรซซิง',
        },
        {
          latex: 'D = 2L\\tan(2\\theta) \\approx \\frac{2L\\lambda}{d}',
          label: 'เส้นผ่านศูนย์กลางวงแหวนเลี้ยวเบนบนจอ',
          vars: '$L$ = ระยะจากเป้าแกรไฟต์ถึงจอเรืองแสง ($\\mathrm{m}$), $D$ = เส้นผ่านศูนย์กลางวง ($\\mathrm{m}$)',
        },
        {
          latex: '\\lambda_{\\mathrm{dB}} = \\frac{h}{\\sqrt{2m_e e V_a}}',
          label: 'เทียบความยาวคลื่นเดอบรอยล์กับมุมแบรกก์',
          vars: 'เมื่อ $V_a$ เพิ่มขึ้น $\\implies \\lambda$ ลดลง $\\implies$ วงแหวนเลี้ยวเบนหดเล็กลง',
        },
      ],
      example: {
        problem: 'ถ้าปรับศักย์เร่งขั้วแอโนด $V_a$ จาก $2.5\\;\\mathrm{kV}$ เพิ่มเป็น $5.0\\;\\mathrm{kV}$ รัศมีวงแหวนเลี้ยวเบนบนจอจะเปลี่ยนไปอย่างไร?',
        solution: 'เนื่องจาก $\\lambda \\propto 1/\\sqrt{V_a}$ และ $R \\propto \\lambda$ ดังนั้นเมื่อ $V_a$ เพิ่มเป็น 2 เท่า รัศมีวงแหวนจะลดลงเหลือ $1/\\sqrt{2} \\approx 0.707$ เท่าของเดิม',
      },
      question: {
        prompt: 'เหตุใดบนจอเรืองแสงจึงเห็นเป็น "วงแหวนวงกลม" 2 วง แทนที่จะเป็นจุดๆ เหมือนการเลี้ยวเบนจากผลึกเดี่ยว?',
        answer: 'เพราะแผ่นฟิล์มแกรไฟต์เป็นผลึกหลายผลึกขนาดเล็ก (Polycrystalline) ที่เรียงตัวสุ่มทุกทิศทางรอบแกนลำอิเล็กตรอน จึงเกิดจุดเลี้ยวเบนหมุนครบรอบเป็นวงแหวน 2 วงตามค่า $d_1$ และ $d_2$',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="ชุดทดลองหลอดสุญญากาศการเลี้ยวเบนอิเล็กตรอน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ชุดทดลอง Electron Diffraction Tube (2d sinθ = nλ)</text>
          <rect x="30" y="96" width="75" height="36" rx="4" fill="#334155"/>
          <text x="67" y="118" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700">ปืน e⁻ (V_a)</text>
          <rect x="165" y="84" width="10" height="60" fill="#0f172a"/>
          <text x="170" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">แกรไฟต์ (d₁, d₂)</text>
          <line x1="105" y1="114" x2="165" y2="114" stroke="#38bdf8" stroke-width="3"/>
          <circle r="4" fill="#38bdf8">
            <animateMotion path="M 105,114 L 170,114 L 345,62" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle r="4" fill="#38bdf8">
            <animateMotion path="M 105,114 L 170,114 L 345,166" dur="1.8s" begin="0.4s" repeatCount="indefinite"/>
          </circle>
          <line x1="175" y1="114" x2="345" y2="114" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3"/>
          <line x1="175" y1="114" x2="345" y2="62" stroke="#10b981" stroke-width="2.5"/>
          <line x1="175" y1="114" x2="345" y2="166" stroke="#10b981" stroke-width="2.5"/>
          <text x="260" y="106" text-anchor="middle" font-size="11" fill="#475569">L</text>
          <text x="255" y="78" font-size="11" font-weight="700" fill="#059669">มุม 2θ</text>
          <ellipse cx="350" cy="114" rx="12" ry="68" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
          <circle cx="445" cy="114" r="56" fill="#022c22" stroke="#10b981" stroke-width="2"/>
          <circle cx="445" cy="114" r="40" fill="none" stroke="#34d399" stroke-width="3">
            <animate attributeName="stroke-opacity" values="0.45;1;0.45" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="445" cy="114" r="22" fill="none" stroke="#6ee7b7" stroke-width="3">
            <animate attributeName="stroke-opacity" values="1;0.45;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="445" cy="114" r="4" fill="#a7f3d0"/>
          <text x="445" y="188" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">วงแหวน d₁ (ใน) &amp; d₂ (นอก)</text>
        </svg>`,
    },

    atomic_models: {
      badge: 'บทที่ 05 · แบบจำลองอะตอม',
      title: 'แบบจำลองอะตอมของบอร์และสเปกตรัมเส้น (Bohr Model)',
      concept:
        'อิเล็กตรอนในอะตอมไฮโดรเจนไม่ได้โคจรรอบนิวเคลียสที่ระยะใดก็ได้ แต่อยู่ได้เฉพาะ "วงโคจรเสถียร" ที่มีระดับพลังงานแน่นอน ($E_n$) เมื่ออิเล็กตรอนกระโดดจากชั้นสูงลงมาชั้นต่ำ จะคายโฟตอนที่มีสี/ความยาวคลื่นจำเพาะออกมาเป็นเส้นสเปกตรัม',
      deep:
        'นีลส์ บอร์ กำหนดเงื่อนไขควอนตัมของโมเมนตัมเชิงมุม $L = n\\hbar$ ทำให้รัศมีวงโคจรเป็นค่าแยกไม่ต่อเนื่อง $r_n = n^2 a_0$ ($a_0 = 0.529\\;\\text{\\AA}$) และระดับพลังงาน $E_n = -13.6 / n^2\\;\\mathrm{eV}$ การเปลี่ยนระดับจาก $n_i \\to n_f$ ให้สเปกตรัมชุดไลแมน (UV, $n_f=1$) และบัลเมอร์ (Visible, $n_f=2$)',
      equations: [
        {
          latex: 'E_n = -\\frac{13.6}{n^2}\\;\\mathrm{eV}, \\qquad r_n = n^2 a_0',
          label: 'ระดับพลังงานและรัศมีวงโคจรของบอร์',
          vars: '$n = 1, 2, 3, \\dots$ (เลขควอนตัมหลัก), $E_1 = -13.6\\;\\mathrm{eV}$ (Ground State)',
        },
        {
          latex: '\\Delta E = |E_i - E_f| = hf = \\frac{hc}{\\lambda}',
          label: 'เงื่อนไขความถี่ของบอร์ (Bohr Frequency Condition)',
          vars: 'คายโฟตอนเมื่อ $n_i > n_f$, ดูดกลืนโฟตอนเมื่อ $n_i < n_f$',
        },
        {
          latex: '\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)',
          label: 'สมการริดเบิร์ก (Rydberg Formula)',
          vars: '$R_H = 1.097 \\times 10^7\\;\\mathrm{m^{-1}}$, อนุกรมบัลเมอร์ใช้ $n_f = 2$',
        },
      ],
      example: {
        problem: 'อิเล็กตรอนในอะตอมไฮโดรเจนเปลี่ยนระดับจาก $n = 3$ ลงมาที่ $n = 2$ (เส้นสีแดง $\\mathrm{H}_\\alpha$) จะคายโฟตอนพลังงานและความยาวคลื่นเท่าใด?',
        solution: '$\\Delta E = E_3 - E_2 = (-1.51) - (-3.40) = 1.89\\;\\mathrm{eV} \\implies \\lambda = 1240 / 1.89 \\approx 656\\;\\mathrm{nm}$ (แสงสีแดง)',
      },
      question: {
        prompt: 'ทำไมสเปกตรัมของธาตุแต่ละชนิดจึงเป็นเส้นสีเฉพาะตัวไม่เหมือนกัน (คล้ายลายนิ้วมือ)?',
        answer: 'เพราะจำนวนโปรตอนในนิวเคลียสและการจัดเรียงอิเล็กตรอนของแต่ละธาตุต่างกัน ทำให้ขั้นบันไดระดับพลังงาน $E_n$ และผลต่าง $\\Delta E$ ไม่เหมือนกัน',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพระดับพลังงานอะตอมไฮโดรเจน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ระดับพลังงานไฮโดรเจน E_n = −13.6 / n² eV และอนุกรมบัลเมอร์</text>
          <line x1="70" y1="50" x2="300" y2="50" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="310" y="54" font-size="11" fill="#475569">n = ∞ (0.00 eV)</text>
          <line x1="70" y1="74" x2="300" y2="74" stroke="#334155" stroke-width="2"/>
          <text x="310" y="78" font-size="11" fill="#0f172a">n = 4 (−0.85 eV)</text>
          <line x1="70" y1="98" x2="300" y2="98" stroke="#334155" stroke-width="2"/>
          <text x="310" y="102" font-size="11" fill="#0f172a">n = 3 (−1.51 eV)</text>
          <line x1="70" y1="138" x2="300" y2="138" stroke="#2563eb" stroke-width="2.5"/>
          <text x="310" y="142" font-size="11" font-weight="700" fill="#2563eb">n = 2 (−3.40 eV)</text>
          <line x1="70" y1="194" x2="300" y2="194" stroke="#0f172a" stroke-width="3"/>
          <text x="310" y="198" font-size="11" font-weight="700" fill="#0f172a">n = 1 (−13.60 eV) Ground</text>
          <line x1="120" y1="98" x2="120" y2="136" stroke="#dc2626" stroke-width="3"/>
          <circle r="4.5" fill="#dc2626">
            <animateMotion path="M 120,98 L 120,136" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <polygon points="120,138 115,129 125,129" fill="#dc2626"/>
          <text x="120" y="122" text-anchor="end" dx="-6" font-size="10" font-weight="700" fill="#dc2626">656 nm</text>
          <line x1="180" y1="74" x2="180" y2="136" stroke="#0891b2" stroke-width="3"/>
          <circle r="4.5" fill="#0891b2">
            <animateMotion path="M 180,74 L 180,136" dur="1.8s" begin="0.4s" repeatCount="indefinite"/>
          </circle>
          <polygon points="180,138 175,129 185,129" fill="#0891b2"/>
          <text x="180" y="114" text-anchor="start" dx="6" font-size="10" font-weight="700" fill="#0891b2">486 nm</text>
          <line x1="250" y1="138" x2="250" y2="191" stroke="#7c3aed" stroke-width="2.5"/>
          <polygon points="250,193 245,184 255,184" fill="#7c3aed"/>
          <text x="258" y="170" font-size="10" font-weight="700" fill="#7c3aed">Lyman (UV)</text>
        </svg>`,
    },

    quantum_mechanics: {
      badge: 'บทที่ 06 · กลศาสตร์ควอนตัมเบื้องต้น',
      title: 'ฟังก์ชันคลื่น สมการชเรอดิงเงอร์ และ Quantum Tunneling',
      concept:
        'ในโลกควอนตัม เราไม่สามารถบอกตำแหน่งที่แน่นอนของอิเล็กตรอนได้ แต่บอกเป็น "ความน่าจะเป็น" จากฟังก์ชันคลื่น $|\\psi(x)|^2$ ที่น่าทึ่งคือ แม้อนุภาคจะมีพลังงานน้อยกว่าความสูงกำแพงศักย์ ($E < V_0$) ก็ยังมีโอกาส "ทะลุผ่าน" กำแพงศักย์ได้ (Quantum Tunneling)',
      deep:
        'สมการชเรอดิงเงอร์ 1 มิติ: $-\\frac{\\hbar^2}{2m}\\frac{\\mathrm{d}^2\\psi}{\\mathrm{d}x^2} + V(x)\\psi = E\\psi$ กำหนดพฤติกรรมของ $\\psi(x)$ ภายในบ่อศักย์อนันต์ (Particle in a Box) พลังงานถูกควอนไทซ์เป็น $E_n = n^2 h^2/(8mL^2)$ ส่วนในกรณีกำแพงศักย์จำกัด $\\psi$ ภายในกำแพงจะลดทอนแบบเอ็กซ์โพเนนเชียล $\\psi \\sim e^{-\\kappa x}$ ทำให้เกิดการทะลุผ่าน $T > 0$',
      equations: [
        {
          latex: 'P(x)\\,\\mathrm{d}x = |\\psi(x)|^2\\,\\mathrm{d}x, \\qquad \\int_{-\\infty}^{\\infty} |\\psi(x)|^2\\,\\mathrm{d}x = 1',
          label: 'การตีความความน่าจะเป็นของบอร์น (Born Rule)',
          vars: '$|\\psi(x)|^2$ = ความหนาแน่นความน่าจะเป็นในการพบอนุภาคที่ตำแหน่ง $x$',
        },
        {
          latex: 'E_n = \\frac{n^2 h^2}{8 m L^2}',
          label: 'ระดับพลังงานในบ่อศักย์อนันต์ 1 มิติ',
          vars: '$L$ = ความกว้างบ่อศักย์ ($\\mathrm{m}$), $n = 1, 2, 3, \\dots$',
        },
        {
          latex: '\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}',
          label: 'หลักความไม่แน่นอนของไฮเซนเบิร์ก',
          vars: 'ยิ่งระบุตำแหน่ง $\\Delta x$ แม่นยำ ความไม่แน่นอนของโมเมนตัม $\\Delta p$ ยิ่งมากขึ้น',
        },
      ],
      example: {
        problem: 'ในบ่อศักย์อนันต์ 1 มิติ ถ้าระดับพื้น $n = 1$ มีพลังงาน $E_1 = 2.0\\;\\mathrm{eV}$ แล้วระดับกระตุ้นที่ 2 ($n = 3$) จะมีพลังงานเท่าใด?',
        solution: 'จาก $E_n = n^2 E_1 \\implies E_3 = 3^2 \\times 2.0 = 18.0\\;\\mathrm{eV}$',
      },
      question: {
        prompt: 'ปรากฏการณ์ Quantum Tunneling มีประโยชน์อย่างไรในเทคโนโลยีหรือธรรมชาติรอบตัว?',
        answer: 'ใช้ในกล้องจุลทรรศน์ STM ส่องดูอะตอม, หน่วยความจำ Flash Memory/SSD และอธิบายปฏิกิริยานิวเคลียร์ฟิวชันในดวงอาทิตย์รวมถึงการสลายให้อนุภาคแอลฟา',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพการทะลุผ่านกำแพงศักย์ Quantum Tunneling">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">Quantum Tunneling: อนุภาคพลังงาน E &lt; V₀ ทะลุผ่านกำแพงศักย์</text>
          <rect x="210" y="65" width="90" height="115" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
          <text x="255" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">กำแพงศักย์ V₀ (ความกว้าง a)</text>
          <line x1="30" y1="180" x2="490" y2="180" stroke="#334155" stroke-width="1.5"/>
          <line x1="35" y1="120" x2="480" y2="120" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 4"/>
          <text x="48" y="114" font-size="11" font-weight="700" fill="#475569">E &lt; V₀</text>
          <path d="M 40,120 Q 60,72 80,120 T 120,120 T 160,120 T 200,120 L 210,104 C 235,112 265,126 300,132 Q 320,118 340,126 T 380,126 T 420,126 T 460,126" fill="none" stroke="#2563eb" stroke-width="3"/>
          <circle r="5" fill="#2563eb">
            <animateMotion path="M 40,120 L 210,104 L 300,132 L 460,126" dur="2.6s" repeatCount="indefinite"/>
          </circle>
          <text x="120" y="198" text-anchor="middle" font-size="11" fill="#1e40af">คลื่นตกกระทบ + สะท้อน</text>
          <text x="255" y="198" text-anchor="middle" font-size="11" fill="#b91c1c">ลดทอน e^(−κx)</text>
          <text x="400" y="198" text-anchor="middle" font-size="11" fill="#059669">คลื่นทะลุผ่าน (T &gt; 0)</text>
        </svg>`,
    },

    solid_state: {
      badge: 'บทที่ 07 · ฟิสิกส์โมเลกุลและของแข็ง',
      title: 'แถบพลังงานของของแข็งและสารกึ่งตัวนำ (Energy Bands)',
      concept:
        'เมื่ออะตอมจำนวนมหาศาลมาเรียงชิดกันเป็นผลึก ระดับพลังงานเดี่ยวๆ จะแผ่ออกเป็น "แถบพลังงาน" ความแตกต่างระหว่าง ตัวนำ สารกึ่งตัวนำ และฉนวน อยู่ที่ความกว้างของช่องว่างพลังงาน (Band Gap, $E_g$) ระหว่างแถบเวเลนซ์และแถบนำไฟฟ้า',
      deep:
        'ในสารกึ่งตัวนำ (เช่น $\\mathrm{Si}$ มี $E_g \\approx 1.12\\;\\mathrm{eV}$) การเติมสารเจือ (Doping) หมู่ V เช่น ฟอสฟอรัส จะได้สารกึ่งตัวนำชนิด $n$ (พาหะหลักคืออิเล็กตรอน) ส่วนการเติมหมู่ III เช่น โบรอน จะได้ชนิด $p$ (พาหะหลักคือโฮล) เมื่อนำมาต่อกันเป็นรอยต่อ $p\\text{-}n$ จะเกิดไดโอดและ LED ที่ให้แสงตามค่า $E_g = hc/\\lambda$',
      equations: [
        {
          latex: 'E_g = E_c - E_v',
          label: 'ช่องว่างพลังงาน (Band Gap Energy)',
          vars: 'ตัวนำ: แถบซ้อนทับกัน, สารกึ่งตัวนำ: $E_g \\approx 0.5\\text{–}3\\;\\mathrm{eV}$, ฉนวน: $E_g > 4\\;\\mathrm{eV}$',
        },
        {
          latex: 'f(E) = \\frac{1}{\\exp\\!\\left(\\dfrac{E - E_F}{k_B T}\\right) + 1}',
          label: 'ฟังก์ชันการกระจายแฟร์มี–ดิแรก (Fermi–Dirac)',
          vars: '$E_F$ = ระดับพลังงานแฟร์มี, $k_B = 8.617 \\times 10^{-5}\\;\\mathrm{eV/K}$',
        },
        {
          latex: '\\lambda_{\\mathrm{LED}} = \\frac{hc}{E_g} \\approx \\frac{1240}{E_g\\;(\\mathrm{eV})}\\;\\mathrm{nm}',
          label: 'ความยาวคลื่นแสงที่เปล่งจาก LED',
          vars: 'เช่น $\\mathrm{GaN}$ ($E_g \\approx 2.7\\;\\mathrm{eV}$) ให้แสงสีน้ำเงิน $\\approx 460\\;\\mathrm{nm}$',
        },
      ],
      example: {
        problem: 'ไดโอดเปล่งแสง (LED) สีเขียวมีความยาวคลื่น $\\lambda = 530\\;\\mathrm{nm}$ ต้องใช้วัสดุสารกึ่งตัวนำที่มี Band Gap ประมาณเท่าใด?',
        solution: '$E_g \\approx 1240 / 530 \\approx 2.34\\;\\mathrm{eV}$',
      },
      question: {
        prompt: 'ทำไมโลหะจึงนำไฟฟ้าได้ดีมากแม้ที่อุณหภูมิต่ำ แต่เมื่ออุณหภูมิสูงขึ้นความนำไฟฟ้ากลับลดลง (ตรงข้ามกับสารกึ่งตัวนำ)?',
        answer: 'โลหะมีอิเล็กตรอนอิสระเต็มแถบนำไฟฟ้าอยู่แล้ว เมื่อร้อนขึ้นอะตอมสั่นแรงขึ้นทำให้อิเล็กตรอนชนกระเจิงมากขึ้น (ความต้านทานเพิ่ม) ส่วนสารกึ่งตัวนำเมื่อร้อนขึ้นอิเล็กตรอนกระโดดข้าม $E_g$ ได้มากขึ้น จึงนำไฟฟ้าดีขึ้น',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="เปรียบเทียบแถบพลังงานตัวนำ สารกึ่งตัวนำ และฉนวน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">เปรียบเทียบแถบพลังงาน: ตัวนำ vs สารกึ่งตัวนำ vs ฉนวน</text>
          <rect x="38" y="85" width="110" height="45" rx="4" fill="#bae6fd" stroke="#0284c7"/>
          <rect x="38" y="115" width="110" height="55" rx="4" fill="#3b82f6" fill-opacity="0.7" stroke="#1d4ed8"/>
          <text x="93" y="192" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">ตัวนำ (ซ้อนทับ E_g=0)</text>
          <rect x="205" y="55" width="110" height="45" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="260" y="81" text-anchor="middle" font-size="10" fill="#0369a1">Conduction Band</text>
          <line x1="260" y1="100" x2="260" y2="128" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="260" y="118" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">E_g ≈ 1.1 eV</text>
          <rect x="205" y="128" width="110" height="45" rx="4" fill="#2563eb" stroke="#1d4ed8"/>
          <circle cx="240" cy="140" r="4.5" fill="#facc15">
            <animate attributeName="cy" values="140;82;140" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <text x="260" y="155" text-anchor="middle" font-size="10" fill="#ffffff">Valence Band</text>
          <text x="260" y="192" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">สารกึ่งตัวนำ (Si)</text>
          <rect x="372" y="46" width="110" height="32" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="427" y="110" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">E_g กว้าง (&gt; 4 eV)</text>
          <rect x="372" y="138" width="110" height="36" rx="4" fill="#2563eb" stroke="#1d4ed8"/>
          <text x="427" y="192" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">ฉนวน (Insulator)</text>
        </svg>`,
    },

    nuclear_physics: {
      badge: 'บทที่ 08 · โครงสร้างนิวเคลียร์และกัมมันตภาพรังสี',
      title: 'เสถียรภาพนิวเคลียร์และการสลายตัวกัมมันตรังสี',
      concept:
        'นิวเคลียสที่ไม่เสถียรจะปรับตัวเองโดยการปล่อยรังสี $\\alpha, \\beta$ หรือ $\\gamma$ ออกมา อัตราการสลายตัวขึ้นอยู่กับ "ครึ่งชีวิต" (Half-life, $T_{1/2}$) ซึ่งเป็นเวลาที่นิวเคลียสเหลือครึ่งหนึ่งของเริ่มต้น และเกิดแบบสุ่มทางสถิติ (Monte Carlo)',
      deep:
        'พลังงานยึดเหนี่ยวของนิวเคลียสเกิดจากส่วนพร่องมวล $\\Delta m$ ผ่านสมการ $E_B = \\Delta m\\,c^2$ กฎการสลายตัวของรัทเทอร์ฟอร์ด–ซอดดี: $N(t) = N_0 e^{-\\lambda t}$ โดย $\\lambda = \\ln(2)/T_{1/2}$ และกัมมันตภาพ $A(t) = \\lambda N(t)$ ในการวัดจริงด้วยเครื่อง Geiger–Müller จำนวนนับต่อช่วงเวลาจะมีความผันผวนแบบสถิติปัวส์ซง ($\\sigma = \\sqrt{N}$)',
      equations: [
        {
          latex: 'N(t) = N_0 e^{-\\lambda t} = N_0 \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}',
          label: 'กฎการสลายตัวกัมมันตรังสี',
          vars: '$N_0$ = จำนวนนิวเคลียสเริ่มต้น, $\\lambda$ = ค่าคงที่การสลายตัว ($\\mathrm{s^{-1}}$)',
        },
        {
          latex: 'T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}',
          label: 'ความสัมพันธ์ครึ่งชีวิตและค่าคงที่สลายตัว',
          vars: '$T_{1/2}$ = ครึ่งชีวิต (หน่วยเวลาเดียวกับ $t$)',
        },
        {
          latex: 'E_B = \\left[Z m_p + (A - Z)m_n - M_{\\mathrm{nuc}}\\right] c^2',
          label: 'พลังงานยึดเหนี่ยว (Binding Energy)',
          vars: '$1\\;\\mathrm{u} \\approx 931.5\\;\\mathrm{MeV}/c^2$, เหล็ก-56 มีพลังงานยึดเหนี่ยวต่อนิวคลีออนสูงสุด',
        },
      ],
      example: {
        problem: 'ไอโอดีน-131 มีครึ่งชีวิต $T_{1/2} = 8.02$ วัน ถ้ามีตัวอย่างเริ่มต้น $N_0 = 1{,}000$ นิวเคลียส เมื่อเวลาผ่านไป $16.04$ วัน จะเหลือกี่นิวเคลียส?',
        solution: 'เวลา $16.04$ วัน = 2 เท่าของครึ่งชีวิต $\\implies N = 1{,}000 \\times (1/2)^2 = 250$ นิวเคลียส',
      },
      question: {
        prompt: 'ทำไมการนับรังสีจากตัวอย่างเดิมซ้ำๆ หลายครั้ง จึงได้ตัวเลขไม่เท่ากันเป๊ะ (เช่น 98, 103, 95 ครั้ง/นาที)?',
        answer: 'เพราะการสลายตัวของนิวเคลียสแต่ละตัวเป็นกระบวนการสุ่มเชิงควอนตัมที่อิสระต่อกัน ทำให้จำนวนการสลายตัวกระจายตัวตามสถิติปัวส์ซง (ความคลาดเคลื่อน $\\sigma \\approx \\sqrt{N}$)',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="กราฟการสลายตัวกัมมันตรังสีแบบ Exponential">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">กราฟการสลายตัว N(t) = N₀ e^(−λt) และช่วงครึ่งชีวิต (T₁/₂)</text>
          <line x1="65" y1="180" x2="470" y2="180" stroke="#334155" stroke-width="2"/>
          <line x1="65" y1="45" x2="65" y2="180" stroke="#334155" stroke-width="2"/>
          <text x="475" y="184" font-size="11" font-weight="700" fill="#334155">t</text>
          <text x="28" y="55" font-size="11" font-weight="700" fill="#334155">N(t)</text>
          <path d="M 65,55 Q 140,120 185,117 T 305,149 T 445,172" fill="none" stroke="#2563eb" stroke-width="3"/>
          <circle r="5" fill="#f59e0b">
            <animateMotion path="M 65,55 Q 140,120 185,117 T 305,149 T 445,172" dur="3.0s" repeatCount="indefinite"/>
          </circle>
          <circle cx="65" cy="55" r="4.5" fill="#dc2626"/>
          <text x="42" y="59" font-size="10" font-weight="700" fill="#0f172a">N₀</text>
          <line x1="65" y1="117" x2="185" y2="117" stroke="#94a3b8" stroke-dasharray="4 3"/>
          <line x1="185" y1="117" x2="185" y2="180" stroke="#94a3b8" stroke-dasharray="4 3"/>
          <circle cx="185" cy="117" r="4.5" fill="#dc2626"/>
          <text x="35" y="121" font-size="10" fill="#334155">N₀/2</text>
          <text x="185" y="196" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">1 T₁/₂</text>
          <line x1="65" y1="149" x2="305" y2="149" stroke="#94a3b8" stroke-dasharray="4 3"/>
          <line x1="305" y1="149" x2="305" y2="180" stroke="#94a3b8" stroke-dasharray="4 3"/>
          <circle cx="305" cy="149" r="4.5" fill="#dc2626"/>
          <text x="35" y="153" font-size="10" fill="#334155">N₀/4</text>
          <text x="305" y="196" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">2 T₁/₂</text>
          <text x="425" y="196" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">3 T₁/₂</text>
        </svg>
        <svg viewBox="0 0 520 185" width="100%" style="margin-top:10px;" role="img" aria-label="สัญลักษณ์และอำนาจทะลุผ่านของรังสีอัลฟา บีตา แกมมา">
          <rect x="6" y="6" width="508" height="173" rx="12" fill="#0b1526" stroke="#334155"/>
          <text x="18" y="25" font-size="11.5" font-weight="800" fill="#fbbf24">รังสีอัลฟา (α) · บีตา (β±) · แกมมา (γ) : สัญลักษณ์และอำนาจทะลุผ่าน</text>
          <!-- Barriers: Paper, Aluminium, Lead -->
          <rect x="210" y="38" width="10" height="122" rx="2" fill="#f8fafc" opacity="0.9"/>
          <text x="215" y="172" text-anchor="middle" font-size="8.5" fill="#e2e8f0">กระดาษ</text>
          <rect x="315" y="38" width="16" height="122" rx="2" fill="#94a3b8" opacity="0.85"/>
          <text x="323" y="172" text-anchor="middle" font-size="8.5" fill="#cbd5e1">อะลูมิเนียม (Al)</text>
          <rect x="430" y="38" width="26" height="122" rx="3" fill="#475569" stroke="#64748b"/>
          <text x="443" y="172" text-anchor="middle" font-size="8.5" fill="#94a3b8">ตะกั่ว (Pb)</text>

          <!-- Alpha Row -->
          <text x="18" y="60" font-size="11" font-weight="800" fill="#fb923c">α (⁴₂He, +2e)</text>
          <line x1="115" y1="56" x2="208" y2="56" stroke="#fb923c" stroke-width="2" stroke-dasharray="4 3"/>
          <g>
            <circle cx="0" cy="0" r="4" fill="#fb923c"/><circle cx="6" cy="0" r="4" fill="#38bdf8"/>
            <circle cx="3" cy="-5" r="4" fill="#38bdf8"/><circle cx="3" cy="5" r="4" fill="#fb923c"/>
            <animateTransform attributeName="transform" type="translate" values="115,56; 204,56; 115,56" dur="2.6s" repeatCount="indefinite"/>
          </g>

          <!-- Beta Row -->
          <text x="18" y="102" font-size="11" font-weight="800" fill="#34d399">β± (e⁻/e⁺, ±1e)</text>
          <line x1="115" y1="98" x2="313" y2="98" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
          <circle r="4.5" fill="#34d399">
            <animate attributeName="cx" values="115;312;115" dur="2.1s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="98;98;98" dur="2.1s" repeatCount="indefinite"/>
          </circle>

          <!-- Gamma Row -->
          <text x="18" y="144" font-size="11" font-weight="800" fill="#c084fc">γ (โฟตอน, 0)</text>
          <path d="M115,140 Q125,130 135,140 T155,140 T175,140 T195,140 T215,140 T235,140 T255,140 T275,140 T295,140 T315,140 T335,140 T355,140 T375,140 T395,140 T415,140 T435,140" fill="none" stroke="#c084fc" stroke-width="2.2">
            <animate attributeName="stroke-dashoffset" values="40;0" dur="0.9s" repeatCount="indefinite"/>
          </path>
          <circle r="4" fill="#e879f9">
            <animate attributeName="cx" values="115;435" dur="1.5s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="140;140" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </svg>`,
    },

    particle_physics: {
      badge: 'บทที่ 09 · ฟิสิกส์อนุภาคมูลฐาน',
      title: 'แบบจำลองมาตรฐาน (Standard Model) และแรงพื้นฐาน 4 ชนิด',
      concept:
        'โปรตอนและนิวตรอนไม่ใช่อนุภาคที่เล็กที่สุด แต่ประกอบขึ้นจาก "ควาร์ก" (Quarks) ยึดกันด้วยกลูออน ส่วนอิเล็กตรอนจัดอยู่ในตระกูล "เลปตอน" (Leptons) ทุกปฏิสัมพันธ์ในธรรมชาติเกิดขึ้นผ่านการแลกเปลี่ยนอนุภาคสื่อแรง (Gauge Bosons) และมีโบซอนฮิกส์เป็นตัวให้มวล',
      deep:
        'แบบจำลองมาตรฐานแบ่งอนุภาคมูลฐานเป็น 2 กลุ่มใหญ่: (1) เฟอร์มิออน (Spin $1/2$) ได้แก่ ควาร์ก 6 รสชาติ ($u, d, c, s, t, b$) และเลปตอน 6 ชนิด ($e, \\nu_e, \\mu, \\nu_\\mu, \\tau, \\nu_\\tau$) (2) โบซอนสื่อแรง (Spin $1$) ได้แก่ กลูออน (Strong), โฟตอน (EM), $W^\\pm/Z^0$ (Weak) และฮิกส์โบซอน (Spin $0$) นอกจากนี้ หลังเหตุการณ์บิกแบง (Big Bang) ที่อุณหภูมิสูงยิ่งยวด แรงทั้ง 4 เคยรวมเป็นหนึ่งเดียวก่อนจะเกิดการทำลายสมมาตร (Symmetry Breaking) แยกตัวออกมาตามลำดับ: แรงโน้มถ่วง ($10^{-43}\\text{ s}$) $\\to$ แรงเข้ม ($10^{-36}\\text{ s}$) $\\to$ แรงอ่อนและแรงแม่เหล็กไฟฟ้าแยกจาก Electroweak ($10^{-12}\\text{ s}$)',
      equations: [
        {
          latex: 'p = uud\\;\\left(+\\frac{2}{3} + \\frac{2}{3} - \\frac{1}{3} = +1e\\right), \\qquad n = udd\\;(0)',
          label: 'องค์ประกอบควาร์กของโปรตอนและนิวตรอน',
          vars: 'ประจุควาร์ก: $u, c, t = +\\tfrac{2}{3}e \\mid d, s, b = -\\tfrac{1}{3}e$',
        },
        {
          latex: '\\sum Q_i = \\sum Q_f, \\qquad \\sum B_i = \\sum B_f, \\qquad \\sum L_i = \\sum L_f',
          label: 'กฎการอนุรักษ์ในปฏิกิริยาอนุภาค',
          vars: '$Q$ = ประจุไฟฟ้า, $B$ = เลขแบริออน (โปรตอน/นิวตรอน $= +1$), $L$ = เลขเลปตอน',
        },
        {
          latex: 'n \\longrightarrow p + e^- + \\bar{\\nu}_e',
          label: 'การสลายตัวบีตาลบผ่านแรงนิวเคลียร์อย่างอ่อน (W⁻ Boson)',
          vars: 'ควาร์ก $d$ เปลี่ยนเป็น $u$ โดยปล่อย $W^-$ แล้วสลายต่อเป็นอิเล็กตรอน + แอนตินิวทริโน',
        },
      ],
      example: {
        problem: 'ในปฏิกิริยาสลายตัวบีตา $n \\to p + e^- + \\bar{\\nu}_e$ จงตรวจสอบการอนุรักษ์ประจุ $Q$ และเลขแบริออน $B$',
        solution: 'ก่อนสลาย: $Q = 0,\\; B = +1$ | หลังสลาย: $Q = (+1) + (-1) + 0 = 0,\\; B = (+1) + 0 + 0 = +1$ (อนุรักษ์ครบทั้งคู่)',
      },
      question: {
        prompt: 'ทำไมเราจึงไม่เคยพบ "ควาร์กเดี่ยวๆ" หลุดออกมาลอยอิสระนอกโปรตอนหรือนิวตรอนได้เลย?',
        answer: 'เนื่องจากสมบัติ Color Confinement ของแรงนิวเคลียร์อย่างเข้ม ยิ่งดึงควาร์กออกจากกัน พลังงานในสนามกลูออนยิ่งเพิ่มจนสร้างคู่ควาร์ก-แอนติควาร์กใหม่ขึ้นมาจับคู่กันแทน',
      },
      svg: `
        <svg viewBox="0 0 520 230" width="100%" role="img" aria-label="ตารางแบบจำลองมาตรฐาน Standard Model 17 อนุภาค">
          <rect x="6" y="6" width="508" height="218" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="18" y="25" font-size="12" font-weight="800" fill="#0f172a">แบบจำลองมาตรฐาน (Standard Model of Elementary Particles)</text>
          <text x="72" y="40" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">Gen I</text>
          <text x="158" y="40" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">Gen II</text>
          <text x="244" y="40" text-anchor="middle" font-size="9" font-weight="700" fill="#64748b">Gen III</text>
          <text x="342" y="40" text-anchor="middle" font-size="9" font-weight="700" fill="#b91c1c">Gauge Bosons</text>
          <text x="444" y="40" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">Scalar Boson</text>
          <!-- Row 1: Up-type Quarks + Gluon + Higgs -->
          <rect x="34" y="45" width="76" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="40" y="56" font-size="8" fill="#6d28d9">+2/3</text><text x="72" y="68" text-anchor="middle" font-size="14" font-weight="800" fill="#4c1d95">u</text><text x="72" y="79" text-anchor="middle" font-size="8" fill="#5b21b6">up</text>
          <rect x="120" y="45" width="76" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="126" y="56" font-size="8" fill="#6d28d9">+2/3</text><text x="158" y="68" text-anchor="middle" font-size="14" font-weight="800" fill="#4c1d95">c</text><text x="158" y="79" text-anchor="middle" font-size="8" fill="#5b21b6">charm</text>
          <rect x="206" y="45" width="76" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="212" y="56" font-size="8" fill="#6d28d9">+2/3</text><text x="244" y="68" text-anchor="middle" font-size="14" font-weight="800" fill="#4c1d95">t</text><text x="244" y="79" text-anchor="middle" font-size="8" fill="#5b21b6">top</text>
          <rect x="304" y="45" width="76" height="38" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
          <text x="310" y="56" font-size="8" fill="#b91c1c">0</text><text x="342" y="68" text-anchor="middle" font-size="14" font-weight="800" fill="#991b1b">g</text><text x="342" y="79" text-anchor="middle" font-size="8" fill="#b91c1c">gluon</text>
          <rect x="404" y="45" width="80" height="82" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2">
            <animate attributeName="stroke-width" values="1.5;3.5;1.5" dur="2.2s" repeatCount="indefinite"/>
          </rect>
          <text x="412" y="59" font-size="8.5" fill="#b45309">0 · Spin 0</text>
          <text x="444" y="88" text-anchor="middle" font-size="20" font-weight="800" fill="#92400e">H</text>
          <text x="444" y="106" text-anchor="middle" font-size="9.5" font-weight="700" fill="#78350f">Higgs Boson</text>
          <text x="444" y="119" text-anchor="middle" font-size="8" fill="#92400e">125 GeV</text>
          <!-- Row 2: Down-type Quarks + Photon -->
          <rect x="34" y="89" width="76" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="40" y="100" font-size="8" fill="#6d28d9">−1/3</text><text x="72" y="112" text-anchor="middle" font-size="14" font-weight="800" fill="#4c1d95">d</text><text x="72" y="123" text-anchor="middle" font-size="8" fill="#5b21b6">down</text>
          <rect x="120" y="89" width="76" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="126" y="100" font-size="8" fill="#6d28d9">−1/3</text><text x="158" y="112" text-anchor="middle" font-size="14" font-weight="800" fill="#4c1d95">s</text><text x="158" y="123" text-anchor="middle" font-size="8" fill="#5b21b6">strange</text>
          <rect x="206" y="89" width="76" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.4"/>
          <text x="212" y="100" font-size="8" fill="#6d28d9">−1/3</text><text x="244" y="112" text-anchor="middle" font-size="14" font-weight="800" fill="#4c1d95">b</text><text x="244" y="123" text-anchor="middle" font-size="8" fill="#5b21b6">bottom</text>
          <rect x="304" y="89" width="76" height="38" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
          <text x="310" y="100" font-size="8" fill="#b91c1c">0</text><text x="342" y="112" text-anchor="middle" font-size="14" font-weight="800" fill="#991b1b">γ</text><text x="342" y="123" text-anchor="middle" font-size="8" fill="#b91c1c">photon</text>
          <!-- Row 3: Charged Leptons + Z Boson -->
          <rect x="34" y="133" width="76" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
          <text x="40" y="144" font-size="8" fill="#15803d">−1</text><text x="72" y="156" text-anchor="middle" font-size="14" font-weight="800" fill="#14532d">e</text><text x="72" y="167" text-anchor="middle" font-size="8" fill="#166534">electron</text>
          <rect x="120" y="133" width="76" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
          <text x="126" y="144" font-size="8" fill="#15803d">−1</text><text x="158" y="156" text-anchor="middle" font-size="14" font-weight="800" fill="#14532d">μ</text><text x="158" y="167" text-anchor="middle" font-size="8" fill="#166534">muon</text>
          <rect x="206" y="133" width="76" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
          <text x="212" y="144" font-size="8" fill="#15803d">−1</text><text x="244" y="156" text-anchor="middle" font-size="14" font-weight="800" fill="#14532d">τ</text><text x="244" y="167" text-anchor="middle" font-size="8" fill="#166534">tau</text>
          <rect x="304" y="133" width="76" height="38" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
          <text x="310" y="144" font-size="8" fill="#b91c1c">0</text><text x="342" y="156" text-anchor="middle" font-size="14" font-weight="800" fill="#991b1b">Z⁰</text><text x="342" y="167" text-anchor="middle" font-size="8" fill="#b91c1c">Z boson</text>
          <!-- Row 4: Neutrinos + W Boson -->
          <rect x="34" y="177" width="76" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
          <text x="40" y="188" font-size="8" fill="#15803d">0</text><text x="72" y="200" text-anchor="middle" font-size="14" font-weight="800" fill="#14532d">νₑ</text><text x="72" y="211" text-anchor="middle" font-size="8" fill="#166534">e neutrino</text>
          <rect x="120" y="177" width="76" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
          <text x="126" y="188" font-size="8" fill="#15803d">0</text><text x="158" y="200" text-anchor="middle" font-size="14" font-weight="800" fill="#14532d">ν_μ</text><text x="158" y="211" text-anchor="middle" font-size="8" fill="#166534">μ neutrino</text>
          <rect x="206" y="177" width="76" height="38" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
          <text x="212" y="188" font-size="8" fill="#15803d">0</text><text x="244" y="200" text-anchor="middle" font-size="14" font-weight="800" fill="#14532d">ν_τ</text><text x="244" y="211" text-anchor="middle" font-size="8" fill="#166534">τ neutrino</text>
          <rect x="304" y="177" width="76" height="38" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
          <text x="310" y="188" font-size="8" fill="#b91c1c">±1</text><text x="342" y="200" text-anchor="middle" font-size="14" font-weight="800" fill="#991b1b">W±</text><text x="342" y="211" text-anchor="middle" font-size="8" fill="#b91c1c">W boson</text>
          <!-- Animated force exchange pulse -->
          <circle cx="293" cy="130" r="4.5" fill="#dc2626">
            <animate attributeName="cy" values="64;196;64" dur="2.8s" repeatCount="indefinite"/>
          </circle>
          <text x="444" y="152" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">■ Quarks (Spin 1/2)</text>
          <text x="444" y="168" text-anchor="middle" font-size="9" font-weight="700" fill="#166534">■ Leptons (Spin 1/2)</text>
          <text x="444" y="184" text-anchor="middle" font-size="9" font-weight="700" fill="#b91c1c">■ Gauge Bosons (Spin 1)</text>
          <text x="444" y="200" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">■ Higgs (Spin 0)</text>
        </svg>
        <svg viewBox="0 0 520 175" width="100%" style="margin-top:10px;" role="img" aria-label="การแยกตัวของแรงพื้นฐาน 4 ชนิดหลังบิกแบงและเส้นแรง">
          <rect x="6" y="6" width="508" height="163" rx="12" fill="#0b1526" stroke="#334155"/>
          <text x="18" y="25" font-size="11.5" font-weight="800" fill="#7dd3fc">การแยกตัวของแรงพื้นฐานหลังบิกแบง (Big Bang Symmetry Breaking) &amp; เส้นแรง</text>
          <!-- Big Bang Origin -->
          <circle cx="48" cy="92" r="16" fill="#fbbf24" opacity="0.9">
            <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="48" y="95" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0f172a">Big Bang</text>
          <text x="48" y="120" text-anchor="middle" font-size="8" fill="#fde68a">t = 0</text>
          <!-- Branches -->
          <path d="M64,92 L135,92 L220,44 L485,44" fill="none" stroke="#f59e0b" stroke-width="2.4"/>
          <path d="M135,92 L230,78 L485,78" fill="none" stroke="#a855f7" stroke-width="2.4"/>
          <path d="M135,92 L290,114 L485,114" fill="none" stroke="#34d399" stroke-width="2.4"/>
          <path d="M290,114 L360,144 L485,144" fill="none" stroke="#38bdf8" stroke-width="2.4"/>
          <!-- Epoch Nodes -->
          <circle cx="135" cy="92" r="4.5" fill="#f8fafc"/>
          <text x="135" y="109" text-anchor="middle" font-size="7.5" fill="#cbd5e1">10⁻⁴³ s (Planck)</text>
          <circle cx="220" cy="78" r="4.5" fill="#c084fc"/>
          <text x="220" y="95" text-anchor="middle" font-size="7.5" fill="#d8b4fe">10⁻³⁶ s (GUT)</text>
          <circle cx="290" cy="114" r="4.5" fill="#34d399"/>
          <text x="290" y="131" text-anchor="middle" font-size="7.5" fill="#6ee7b7">10⁻¹² s (Electroweak)</text>
          <!-- Force Labels & Field Lines Summary -->
          <text x="492" y="47" text-anchor="end" font-size="9" font-weight="700" fill="#fbbf24">Gravity (เส้นแรงโน้มถ่วง ∞ · 10⁻³⁹)</text>
          <text x="492" y="81" text-anchor="end" font-size="9" font-weight="700" fill="#c084fc">Strong (ฟลักซ์สี g · ~1 fm · 1)</text>
          <text x="492" y="117" text-anchor="end" font-size="9" font-weight="700" fill="#34d399">Weak (W±, Z⁰ · 10⁻¹⁸ m · 10⁻⁶)</text>
          <text x="492" y="147" text-anchor="end" font-size="9" font-weight="700" fill="#38bdf8">EM (เส้นสนามไฟฟ้า γ · ∞ · 1/137)</text>
        </svg>`,
    },
  };

  const MODULE_ORDER = Object.keys(LECTURE_DATA);

  function renderMathInContainer(el) {
    if (!el) return;
    if (typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  const WORKED_EXAMPLES = {
    relativity: [
      {
        title: 'ตัวอย่างที่ 1: การยืดออกของเวลา (Time Dilation)',
        problem: 'ยานอวกาศเคลื่อนที่ผ่านโลกด้วยอัตราเร็ว $v = 0.60c$ นักบินบนยานจับเวลาเหตุการณ์หนึ่งได้ $\\Delta\\tau = 4.00\\text{ s}$ ผู้สังเกตบนโลกจะวัดเวลา $\\Delta t$ ได้เท่าใด?',
        concept: 'ผู้สังเกตที่อยู่นิ่งเทียบกับเหตุการณ์ (นักบินบนยาน) วัดได้เวลาแท้ $\\Delta\\tau$ ส่วนผู้สังเกตบนโลกที่เห็นยานเคลื่อนที่จะวัดเวลาได้ยืดออกตาม $\\Delta t = \\gamma\\Delta\\tau$',
        steps: '1) หาแฟกเตอร์ลอเรนตซ์: $\\gamma = \\frac{1}{\\sqrt{1 - 0.60^2}} = \\frac{1}{\\sqrt{0.64}} = 1.25$<br>2) คำนวณเวลาบนโลก: $\\Delta t = \\gamma\\Delta\\tau = 1.25 \\times 4.00 = \\mathbf{5.00\\text{ s}}$',
      },
      {
        title: 'ตัวอย่างที่ 2: การหดสั้นของความยาว (Length Contraction)',
        problem: 'ยานอวกาศมีความยาวแท้ $L_0 = 100\\text{ m}$ เคลื่อนที่ผ่านสถานีอวกาศด้วยความเร็ว $v = 0.80c$ คนบนสถานีจะวัดความยาวของยานได้กี่เมตร?',
        concept: 'ความยาวตามแนวการเคลื่อนที่ที่วัดโดยผู้สังเกตซึ่งเห็นวัตถุเคลื่อนที่จะหดสั้นลงตาม $L = L_0 / \\gamma$',
        steps: '1) หา $\\gamma = \\frac{1}{\\sqrt{1 - 0.80^2}} = \\frac{1}{0.60} = \\frac{5}{3} \\approx 1.667$<br>2) คำนวณความยาว: $L = \\frac{L_0}{\\gamma} = \\frac{100}{5/3} = \\mathbf{60.0\\text{ m}}$',
      },
      {
        title: 'ตัวอย่างที่ 3: การรวมความเร็วสัมพัทธภาพและพลังงานรวม',
        problem: 'ยาน A วิ่งขวา $0.80c$ เทียบกับโลก และยิงโพรบไปด้านหน้าด้วยความเร็ว $0.50c$ เทียบกับยาน คนบนโลกจะวัดความเร็วโพรบได้เท่าใด? และถ้าโพรบมีมวลนิ่ง $m = 2.0\\text{ kg}$ จะมีพลังงานนิ่งเท่าใด?',
        concept: 'ห้ามบวกความเร็วแบบกาลิเลียน ต้องใช้สูตรรวมความเร็วสัมพัทธภาพ $u = \\frac{u\'+v}{1+u\'v/c^2}$ ส่วนพลังงานนิ่งคือ $E_0 = mc^2$',
        steps: '1) ความเร็วเทียบโลก: $u = \\frac{0.50 + 0.80}{1 + (0.50)(0.80)}c = \\frac{1.30}{1.40}c \\approx \\mathbf{0.929c}$<br>2) พลังงานนิ่ง: $E_0 = mc^2 = 2.0 \\times (3\\times 10^8)^2 = \\mathbf{1.8\\times 10^{17}\\text{ J}}$',
      },
    ],
    quantum_light: [
      {
        title: 'ตัวอย่างที่ 1: กฎการกระจัดของวีนและพลังงานโฟตอน',
        problem: 'เตาเผาวัตถุดำมีอุณหภูมิ $T = 5{,}800\\text{ K}$ จงหาความยาวคลื่นยอด $\\lambda_{\\max}$ และพลังงานของโฟตอนที่ความยาวคลื่นนี้ ($b = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}$, $hc \\approx 1{,}240\\text{ eV}\\cdot\\text{nm}$)',
        concept: 'ใช้กฎของวีน $\\lambda_{\\max} T = b$ เพื่อหาความยาวคลื่นยอด แล้วแปลงเป็นพลังงานด้วย $E = hc/\\lambda$',
        steps: '1) $\\lambda_{\\max} = \\frac{2.898\\times 10^{-3}}{5{,}800} \\approx 4.997\\times 10^{-7}\\text{ m} \\approx \\mathbf{500\\text{ nm}}$ (สีเขียว)<br>2) $E = \\frac{1{,}240\\text{ eV}\\cdot\\text{nm}}{500\\text{ nm}} = \\mathbf{2.48\\text{ eV}}$',
      },
      {
        title: 'ตัวอย่างที่ 2: ปรากฏการณ์โฟโตอิเล็กทริกและศักย์หยุดยั้ง',
        problem: 'ฉายแสง $\\lambda = 310\\text{ nm}$ ลงบนโลหะโพแทสเซียมที่มีฟังก์ชันงาน $\\phi = 2.30\\text{ eV}$ จงหาพลังงานจลน์สูงสุด $K_{\\max}$ และศักย์หยุดยั้ง $V_{\\text{stop}}$',
        concept: 'คำนวณพลังงานต่อโฟตอน $E = hc/\\lambda$ แล้วใช้สมการไอน์สไตน์ $K_{\\max} = E - \\phi = eV_{\\text{stop}}$',
        steps: '1) พลังงานโฟตอน: $E = \\frac{1{,}240}{310} = 4.00\\text{ eV}$<br>2) พลังงานจลน์สูงสุด: $K_{\\max} = 4.00 - 2.30 = \\mathbf{1.70\\text{ eV}}$<br>3) ศักย์หยุดยั้ง: $V_{\\text{stop}} = \\mathbf{1.70\\text{ V}}$',
      },
      {
        title: 'ตัวอย่างที่ 3: การกระเจิงคอมป์ตัน (Compton Scattering)',
        problem: 'โฟตอนรังสีเอกซ์ความยาวคลื่นเริ่มต้น $\\lambda = 0.0500\\text{ nm}$ ($50.0\\text{ pm}$) ชนอิเล็กตรอนอิสระแล้วกระเจิงทำมุม $\\theta = 90^\\circ$ จงหาความยาวคลื่นหลังชน $\\lambda\'$',
        concept: 'ใช้สมการคอมป์ตัน $\\Delta\\lambda = \\lambda_C(1 - \\cos\\theta)$ โดยความยาวคลื่นคอมป์ตันของอิเล็กตรอน $\\lambda_C = 2.426\\text{ pm}$',
        steps: '1) $\\Delta\\lambda = 2.426\\,(1 - \\cos 90^\\circ) = 2.426\\text{ pm}$<br>2) $\\lambda\' = \\lambda + \\Delta\\lambda = 50.0 + 2.426 = \\mathbf{52.43\\text{ pm}}$',
      },
    ],
    matter_waves: [
      {
        title: 'ตัวอย่างที่ 1: ความยาวคลื่นเดอบรอยล์ของอิเล็กตรอนที่ถูกเร่ง',
        problem: 'อิเล็กตรอนถูกเร่งจากหยุดนิ่งผ่านความต่างศักย์ $V = 100\\text{ V}$ จงหาความยาวคลื่นเดอบรอยล์ $\\lambda$ ($\\lambda \\approx \\frac{1.226}{\\sqrt{V}}\\text{ nm}$)',
        concept: 'พลังงานจลน์ $K = eV = \\frac{p^2}{2m_e}$ ทำให้ $p = \\sqrt{2m_e eV}$ และ $\\lambda = h/p$',
        steps: '1) แทนค่าในสูตรลัดสำหรับอิเล็กตรอน: $\\lambda = \\frac{1.226}{\\sqrt{100}}\\text{ nm}$<br>2) ได้ $\\lambda = \\mathbf{0.1226\\text{ nm}}$ (เทียบเท่าขนาดอะตอม)',
      },
      {
        title: 'ตัวอย่างที่ 2: หลักความไม่แน่นอนของไฮเซนเบิร์ก',
        problem: 'ทราบตำแหน่งอิเล็กตรอนภายในขอบเขต $\\Delta x = 0.10\\text{ nm}$ จงหาความไม่แน่นอนขั้นต่ำของโมเมนตัม $\\Delta p_{\\min}$ ($\\hbar = 1.055\\times 10^{-34}\\text{ J}\\cdot\\text{s}$)',
        concept: 'จาก $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$ จะได้ $\\Delta p_{\\min} = \\frac{\\hbar}{2\\Delta x}$',
        steps: '1) $\\Delta x = 0.10\\times 10^{-9} = 1.0\\times 10^{-10}\\text{ m}$<br>2) $\\Delta p_{\\min} = \\frac{1.055\\times 10^{-34}}{2 \\times 1.0\\times 10^{-10}} = \\mathbf{5.275\\times 10^{-25}\\text{ kg}\\cdot\\text{m/s}}$',
      },
      {
        title: 'ตัวอย่างที่ 3: ความกว้างเส้นสเปกตรัมจาก $\\Delta E \\cdot \\Delta t \\ge \\hbar/2$',
        problem: 'อิเล็กตรอนในสถานะกระตุ้นมีอายุขัยเฉลี่ย $\\Delta t = 1.0\\times 10^{-8}\\text{ s}$ ก่อนคายโฟตอน จงประมาณความไม่แน่นอนขั้นต่ำของพลังงาน $\\Delta E$ ในหน่วย $\\text{eV}$',
        concept: 'สถานะที่มีอายุขัยจำกัดจะมีความกว้างพลังงานตาม $\\Delta E \\ge \\frac{\\hbar}{2\\Delta t}$',
        steps: '1) $\\Delta E_{\\min} = \\frac{1.055\\times 10^{-34}}{2\\times 10^{-8}} = 5.275\\times 10^{-27}\\text{ J}$<br>2) แปลงเป็น $\\text{eV}$: $\\frac{5.275\\times 10^{-27}}{1.602\\times 10^{-19}} \\approx \\mathbf{3.29\\times 10^{-8}\\text{ eV}}$',
      },
    ],
    electron_diffraction: [
      {
        title: 'ตัวอย่างที่ 1: รัศมีวงแหวนเลี้ยวเบนในหลอด Teltron',
        problem: 'หลอด Teltron มีระยะห่างฉาก $L = 135\\text{ mm}$ ยิงอิเล็กตรอนที่ $V_a = 4.0\\text{ kV}$ ผ่านแกรไฟต์ ($d_{10} = 213\\text{ pm}$) จงหา $\\lambda$ และรัศมีวงแหวนใน $R_1$',
        concept: 'คำนวณ $\\lambda = 1226.4/\\sqrt{V_a(\\text{V})}\\text{ pm}$ แล้วใช้เงื่อนไขมุมเล็ก $R_1 \\approx L\\lambda / d_{10}$',
        steps: '1) $\\lambda = \\frac{1226.4}{\\sqrt{4000}} \\approx 19.39\\text{ pm}$<br>2) $R_1 \\approx \\frac{135\\text{ mm} \\times 19.39\\text{ pm}}{213\\text{ pm}} \\approx \\mathbf{12.3\\text{ mm}}$',
      },
      {
        title: 'ตัวอย่างที่ 2: อัตราส่วนวงแหวนแกรไฟต์ $R_2 / R_1$',
        problem: 'ถ้าวัดรัศมีวงแหวนในของแกรไฟต์ได้ $R_1 = 14.2\\text{ mm}$ ที่ $V_a = 3.0\\text{ kV}$ รัศมีวงแหวนนอก $R_2$ (ระนาบ $d_{11} = 123\\text{ pm}$) ควรมีค่าเท่าใด?',
        concept: 'เพราะ $R \\propto 1/d$ อัตราส่วน $R_2/R_1 = d_{10}/d_{11} = 213/123 \\approx \\sqrt{3} \\approx 1.732$ คงตัวทุกแรงดัน',
        steps: '1) $R_2 = R_1 \\times 1.732 = 14.2 \\times 1.732 \\approx \\mathbf{24.6\\text{ mm}}$',
      },
      {
        title: 'ตัวอย่างที่ 3: การออกแบบเงื่อนไข Trace Table และ Fail-Safe',
        problem: 'ในอัลกอริทึมควบคุมหลอด Teltron ที่มีขอบเขตปลอดภัย $2.0 \\le V_a \\le 5.0\\text{ kV}$ หากป้อน $V_a = 5.4\\text{ kV}$ ระบบต้องทำงานอย่างไร?',
        concept: 'ตรวจสอบเงื่อนไข Decision `2.0 <= Va <= 5.0` หากเป็น False ต้องเข้าสู่สาขา Fail-Safe Reset ทันที',
        steps: '1) ตรวจเงื่อนไข: $5.4 \\le 5.0$ เป็น <b>False</b><br>2) Action: ยกเลิกการยิงลำอิเล็กตรอนและสั่ง <b>EHT ← OFF (Fail-Safe)</b>',
      },
    ],
    atomic_models: [
      {
        title: 'ตัวอย่างที่ 1: สเปกตรัมไฮโดรเจนเส้น $H_\\alpha$ (Balmer Series)',
        problem: 'อิเล็กตรอนในอะตอมไฮโดรเจนเปลี่ยนระดับจาก $n_i = 3$ ลงสู่ $n_f = 2$ จงหาพลังงานและความยาวคลื่นของโฟตอนที่ปล่อยออกมา',
        concept: 'ใช้ $E_n = -13.6/n^2\\text{ eV}$ หา $\\Delta E = E_3 - E_2$ แล้วแปลงเป็น $\\lambda = hc / \\Delta E$',
        steps: '1) $E_3 = -13.6/9 = -1.51\\text{ eV}$, $E_2 = -13.6/4 = -3.40\\text{ eV}$<br>2) $\\Delta E = (-1.51) - (-3.40) = \\mathbf{1.89\\text{ eV}}$<br>3) $\\lambda = \\frac{1{,}240}{1.89} \\approx \\mathbf{656.1\\text{ nm}}$ (แสงสีแดง)',
      },
      {
        title: 'ตัวอย่างที่ 2: รัศมีวงโคจรโบร์และไอออนคล้ายไฮโดรเจน $\\text{He}^+$',
        problem: 'จงหาพลังงานสถานะพื้น ($n=1$) และรัศมีวงโคจรแรกของไอออนฮีเลียม $\\text{He}^+$ ($Z = 2$, $a_0 = 0.0529\\text{ nm}$)',
        concept: 'สำหรับไอออน 1 อิเล็กตรอน $E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}$ และ $r_n = \\frac{n^2 a_0}{Z}$',
        steps: '1) $E_1 = -13.6 \\times \\frac{2^2}{1^2} = \\mathbf{-54.4\\text{ eV}}$<br>2) $r_1 = \\frac{1^2 \\times 0.0529}{2} = \\mathbf{0.0265\\text{ nm}}$',
      },
      {
        title: 'ตัวอย่างที่ 3: การทดลองฟรังก์–เฮิรตซ์ (Franck–Hertz)',
        problem: 'ในการทดลองฟรังก์–เฮิรตซ์ที่ใช้ไอปรอท (ระดับกระตุ้นแรก $4.9\\text{ eV}$) ถ้าเร่งอิเล็กตรอนด้วยแรงดัน $11.5\\text{ V}$ อิเล็กตรอนจะชนแบบไม่ยืดหยุ่นได้มากที่สุดกี่ครั้ง และเหลือพลังงานกี่ $\\text{eV}$?',
        concept: 'อิเล็กตรอนจะถ่ายทอดพลังงานครั้งละ $4.9\\text{ eV}$ เมื่อพลังงานจลน์ถึงหรือเกิน $4.9\\text{ eV}$',
        steps: '1) จำนวนครั้งที่ชนได้: $\\lfloor 11.5 / 4.9 \\rfloor = \\mathbf{2\\text{ ครั้ง}}$ ($2 \\times 4.9 = 9.8\\text{ eV}$)<br>2) พลังงานจลน์ที่เหลือ: $11.5 - 9.8 = \\mathbf{1.7\\text{ eV}}$ (เกิดร่องกระแสที่ 4.9 V และ 9.8 V)',
      },
    ],
    quantum_mechanics: [
      {
        title: 'ตัวอย่างที่ 1: ระดับพลังงานในบ่อศักย์อนันต์ 1 มิติ',
        problem: 'อิเล็กตรอนถูกกักในบ่อศักย์อนันต์กว้าง $L = 0.20\\text{ nm}$ จงหาพลังงานสถานะพื้น $E_1$ และระดับกระตุ้นที่ 1 ($E_2$) (ใช้ $\\frac{h^2}{8m_e} \\approx 3.76\\times 10^{-19}\\text{ eV}\\cdot\\text{m}^2$ หรือ $E_1 \\approx \\frac{0.376}{L(\\text{nm})^2}\\text{ eV}$)',
        concept: 'ใช้ $E_n = n^2 E_1 = \\frac{n^2 h^2}{8m_e L^2}$',
        steps: '1) $E_1 \\approx \\frac{0.376}{(0.20)^2} = \\frac{0.376}{0.04} = \\mathbf{9.40\\text{ eV}}$<br>2) $E_2 = 2^2 E_1 = 4 \\times 9.40 = \\mathbf{37.6\\text{ eV}}$',
      },
      {
        title: 'ตัวอย่างที่ 2: การทะลุผ่านกำแพงศักย์ (Quantum Tunneling)',
        problem: 'อิเล็กตรอนพลังงาน $E = 2.0\\text{ eV}$ ชนกำแพงศักย์สูง $V_0 = 5.0\\text{ eV}$ กว้าง $a = 0.20\\text{ nm}$ จงหาค่าสัมประสิทธิ์การลดทอน $\\kappa = \\frac{\\sqrt{2m_e(V_0 - E)}}{\\hbar}$ และประมาณค่า $T \\approx e^{-2\\kappa a}$',
        concept: 'คำนวณ $\\kappa$ ในหน่วย $\\text{nm}^{-1}$ แล้วแทนในสูตรประมาณแบบ WKB $T \\approx e^{-2\\kappa a}$',
        steps: '1) $\\kappa \\approx 5.12\\sqrt{V_0 - E}\\;(\\text{nm}^{-1}) = 5.12\\sqrt{3.0} \\approx 8.87\\text{ nm}^{-1}$<br>2) $2\\kappa a = 2 \\times 8.87 \\times 0.20 = 3.55$<br>3) $T \\approx e^{-3.55} \\approx \\mathbf{0.0287}$ (ทะลุผ่านได้ ~2.9%)',
      },
      {
        title: 'ตัวอย่างที่ 3: ตัวแกว่งกวัดฮาร์มอนิกเชิงควอนตัม (QHO)',
        problem: 'โมเลกุลสั่นด้วยความถี่เชิงมุมที่ให้ $\\hbar\\omega = 0.24\\text{ eV}$ จงหาพลังงานสถานะพื้น $E_0$ และพลังงานที่ต้องใช้เพื่อกระตุ้นจาก $n=0$ ไปยัง $n=2$',
        concept: 'ระดับพลังงานของ QHO คือ $E_n = (n + \\frac{1}{2})\\hbar\\omega$ โดยมีพลังงานจุดศูนย์ $E_0 = \\frac{1}{2}\\hbar\\omega$',
        steps: '1) พลังงานสถานะพื้น: $E_0 = \\frac{1}{2}(0.24) = \\mathbf{0.12\\text{ eV}}$<br>2) $\\Delta E = E_2 - E_0 = 2\\hbar\\omega = 2(0.24) = \\mathbf{0.48\\text{ eV}}$',
      },
    ],
    solid_state: [
      {
        title: 'ตัวอย่างที่ 1: ค่าความยาวคลื่นขีดเริ่มของนาโน ZnO ($E_g \\approx 3.37\\text{ eV}$)',
        problem: 'อนุภาคนาโน ZnO มี Direct Band Gap $E_g = 3.37\\text{ eV}$ จงหาความยาวคลื่นแสงสูงสุดที่สามารถกระตุ้นอิเล็กตรอนข้าม Band Gap ได้',
        concept: 'โฟตอนต้องมีพลังงาน $E = hc/\\lambda \\ge E_g$ จึงได้ $\\lambda_{\\max} = hc / E_g$',
        steps: '1) $\\lambda_{\\max} = \\frac{1{,}240\\text{ eV}\\cdot\\text{nm}}{3.37\\text{ eV}} \\approx \\mathbf{368\\text{ nm}}$ (ช่วงรังสี UV-A)',
      },
      {
        title: 'ตัวอย่างที่ 2: สภาพนำไฟฟ้ากึ่งตัวนำกับอุณหภูมิ',
        problem: 'ซิลิคอนมี $E_g = 1.12\\text{ eV}$ ที่ $T = 300\\text{ K}$ ($k_B T \\approx 0.0259\\text{ eV}$) จงคำนวณแฟกเตอร์โบล์ตซมันน์ $e^{-E_g / (2k_B T)}$',
        concept: 'ความหนาแน่นพาหะนำไฟฟ้าในสารกึ่งตัวนำบริสุทธิ์แปรผันตาม $\\exp(-E_g / 2k_B T)$',
        steps: '1) เลขชี้กำลัง: $-\\frac{1.12}{2 \\times 0.0259} = -21.62$<br>2) $e^{-21.62} \\approx \\mathbf{4.08\\times 10^{-10}}$ (เมื่อ $T$ เพิ่ม ค่านี้จะพุ่งสูงขึ้นเร็วมาก)',
      },
      {
        title: 'ตัวอย่างที่ 3: เงื่อนไขวิกฤตของตัวนำยวดยิ่ง (Meissner Effect)',
        problem: 'สารตัวนำยวดยิ่ง YBCO มี $T_c = 90\\text{ K}$ และ $B_c(0) = 0.70\\text{ T}$ ถ้าลดอุณหภูมิลงเหลือ $T = 40\\text{ K}$ แล้วใส่สนามแม่เหล็ก $B = 0.50\\text{ T}$ จะยังเป็นตัวนำยวดยิ่งหรือไม่?',
        concept: 'คำนวณ $B_c(T) = B_c(0)\\left[1 - (T/T_c)^2\\right]$ แล้วตรวจว่าทั้ง $T < T_c$ และ $B < B_c(T)$ เป็นจริงหรือไม่',
        steps: '1) $B_c(40) = 0.70\\left[1 - (40/90)^2\\right] = 0.70(1 - 0.1975) = \\mathbf{0.562\\text{ T}}$<br>2) ตรวจเงื่อนไข: $40 < 90$ (จริง) และ $0.50 < 0.562$ (จริง) → <b>ยังเป็นตัวนำยวดยิ่ง ($R=0$, เกิด Meissner)</b>',
      },
    ],
    nuclear_physics: [
      {
        title: 'ตัวอย่างที่ 1: รัศมีนิวเคลียสเหล็ก-56 ($^{56}_{26}\\text{Fe}$)',
        problem: 'จงประมาณรัศมีของนิวเคลียส $^{56}\\text{Fe}$ โดยใช้ $r_0 = 1.2\\text{ fm}$ และหาจำนวนนิวตรอน $N$',
        concept: 'ใช้สูตรเชิงประจักษ์ $R \\approx r_0 A^{1/3}$ และ $N = A - Z$',
        steps: '1) $A^{1/3} = 56^{1/3} \\approx 3.826$<br>2) $R \\approx 1.2 \\times 3.826 = \\mathbf{4.59\\text{ fm}}$<br>3) จำนวนนิวตรอน: $N = 56 - 26 = \\mathbf{30\\text{ ตัว}}$',
      },
      {
        title: 'ตัวอย่างที่ 2: สมการสลายตัวแอลฟาและบีตาลบ',
        problem: 'จงเขียนสมการสลายตัวเมื่อ $^{238}_{92}\\text{U}$ ปล่อยอนุภาคแอลฟา 1 ตัว และเมื่อ $^{14}_{6}\\text{C}$ สลายตัวแบบ $\\beta^-$',
        concept: 'อนุรักษ์เลขมวล $A$ (บน) และเลขอะตอม/ประจุ $Z$ (ล่าง) ทั้งสองฝั่งของสมการ',
        steps: '1) แอลฟา: $^{238}_{92}\\text{U} \\to \\mathbf{^{234}_{90}\\text{Th}} + \\,^4_2\\text{He}$<br>2) บีตาลบ: $^{14}_{6}\\text{C} \\to \\mathbf{^{14}_{7}\\text{N}} + e^- + \\bar{\\nu}_e$',
      },
      {
        title: 'ตัวอย่างที่ 3: กฎการสลายตัวและกัมมันตภาพ (Half-Life)',
        problem: 'สารกัมมันตรังสีเริ่มต้น $N_0 = 8{,}000$ อะตอม มีครึ่งชีวิต $T_{1/2} = 5$ วัน เมื่อเวลาผ่านไป $15$ วัน จะเหลือกี่อะตอม และคิดเป็นกี่เปอร์เซ็นต์?',
        concept: 'หาจำนวนครึ่งชีวิต $n = t / T_{1/2}$ แล้วคำนวณ $N(t) = N_0 (1/2)^n$',
        steps: '1) $n = 15 / 5 = 3$ ครึ่งชีวิต<br>2) $N(15) = 8{,}000 \\times (1/2)^3 = 8{,}000 / 8 = \\mathbf{1{,}000\\text{ อะตอม}}$ ($\\mathbf{12.5\\%}$)',
      },
    ],
    particle_physics: [
      {
        title: 'ตัวอย่างที่ 1: การคำนวณประจุไฟฟ้าของโปรตอนและนิวตรอนจากควาร์ก',
        problem: 'กำหนดควาร์ก $u$ มีประจุ $+2/3e$ และ $d$ มีประจุ $-1/3e$ จงคำนวณประจุสุทธิของโปรตอน ($uud$), นิวตรอน ($udd$) และ $\\Delta^{++}$ ($uuu$)',
        concept: 'นำประจุของควาร์กองค์ประกอบทั้ง 3 ตัวมารวมกันทางพีชคณิต',
        steps: '1) โปรตอน ($uud$): $+\\frac{2}{3} + \\frac{2}{3} - \\frac{1}{3} = \\mathbf{+1e}$<br>2) นิวตรอน ($udd$): $+\\frac{2}{3} - \\frac{1}{3} - \\frac{1}{3} = \\mathbf{0}$<br>3) $\\Delta^{++}$ ($uuu$): $+\\frac{2}{3} + \\frac{2}{3} + \\frac{2}{3} = \\mathbf{+2e}$',
      },
      {
        title: 'ตัวอย่างที่ 2: กฎการอนุรักษ์ในการสลายตัวของอนุภาคมูลฐาน',
        problem: 'ตรวจสอบว่าการสลายตัว $\\mu^- \\to e^- + \\bar{\\nu}_e + \\nu_\\mu$ อนุรักษ์ประจุ $Q$ และเลขตระกูลเลปตอน ($L_e, L_\\mu$) หรือไม่',
        concept: 'ตรวจสอบผลรวม $Q, L_e, L_\\mu$ ก่อนและหลังการสลายตัวแยกทีละตระกูล',
        steps: '1) ประจุ $Q$: ก่อน $= -1$ | หลัง $= -1 + 0 + 0 = -1$ (อนุรักษ์)<br>2) $L_e$: ก่อน $= 0$ | หลัง $= (+1) + (-1) + 0 = 0$ (อนุรักษ์)<br>3) $L_\\mu$: ก่อน $= +1$ | หลัง $= 0 + 0 + (+1) = +1$ (อนุรักษ์)',
      },
      {
        title: 'ตัวอย่างที่ 3: ความยาวคลื่นขีดเริ่มและพิสัยของแรงสื่อด้วยโบซอนมีมวล',
        problem: 'เหตุใดแรงอ่อนที่สื่อด้วย $W^\\pm$ ($m_W c^2 \\approx 80.4\\text{ GeV}$) จึงมีพิสัยสั้นมาก ประมาณเท่าใดจากความสัมพันธ์ $R \\approx \\frac{\\hbar c}{m_W c^2}$ ($\\hbar c \\approx 0.197\\text{ GeV}\\cdot\\text{fm}$)?',
        concept: 'พิสัยแรงแปรผกผันกับมวลของเกจโบซอนสื่อแรง โบซอนยิ่งหนัก พิสัยยิ่งสั้น',
        steps: '1) $R \\approx \\frac{0.197\\text{ GeV}\\cdot\\text{fm}}{80.4\\text{ GeV}} \\approx \\mathbf{2.45\\times 10^{-3}\\text{ fm}}$ ($\\sim 10^{-18}\\text{ m}$)<br>2) เทียบกับโฟตอน ($m=0$) ที่ให้พิสัยเป็นอนันต์ ($\\infty$)',
      },
    ],
  };

  function renderLectureBody(data, pageId) {
    const eqHtml = data.equations
      .map(
        (eq, idx) => `
        <div class="lecture-eq-card">
          <div class="lecture-eq-head">
            <span class="lecture-eq-label">${eq.label}</span>
            <span class="lecture-eq-badge">สมการสำคัญ ${idx + 1}</span>
          </div>
          <div class="lecture-eq-formula">$$${eq.latex}$$</div>
          <div class="lecture-eq-vars">${eq.vars}</div>
        </div>`
      )
      .join('');

    const examples = WORKED_EXAMPLES[pageId] || [{
      title: 'ตัวอย่างคำนวณประกอบการสอน',
      problem: data.example.problem,
      concept: 'วิเคราะห์ตัวแปรที่โจทย์กำหนดและเลือกสมการหลักของบทเรียน',
      steps: data.example.solution,
    }];

    const examplesHtml = examples
      .map(
        (ex, i) => `
        <div class="lecture-example-box" style="margin-bottom:10px;">
          <div class="lecture-kicker">📝 ${ex.title}</div>
          <p><strong>โจทย์:</strong> ${ex.problem}</p>
          <button type="button" class="btn btn-outline btn-small lecture-reveal-btn" data-show="👁️ แสดงแนวคิดและวิธีทำ" data-hide="🙈 ซ่อนแนวคิดและวิธีทำ">👁️ แสดงแนวคิดและวิธีทำ</button>
          <div class="lecture-qa-ans lecture-sol" style="display:none;margin-top:8px;">
            <p style="margin:0 0 6px;"><strong>💡 แนวคิด:</strong> ${ex.concept}</p>
            <p style="margin:0;"><strong>✍️ วิธีทำ:</strong><br>${ex.steps}</p>
          </div>
        </div>`
      )
      .join('');

    return `
      <div class="lecture-grid">
        <div class="lecture-col-text">
          <div class="lecture-block">
            <div class="lecture-kicker">💡 แนวคิดหลัก (เหมาะสำหรับปูพื้นฐาน 661/วิทย์)</div>
            <p>${data.concept}</p>
          </div>
          <div class="lecture-block lecture-deep-block">
            <div class="lecture-kicker">∑ ทฤษฎีและสมการเชิงลึก</div>
            <p>${data.deep}</p>
          </div>
          <div class="lecture-eq-list">${eqHtml}</div>
        </div>
        <div class="lecture-col-visual">
          <div class="lecture-svg-wrap">${data.svg}</div>
          ${examplesHtml}
          <div class="lecture-qa-box">
            <div class="lecture-kicker">💬 คำถามชวนคิดหน้าชั้น (Think-Pair-Share)</div>
            <p>${data.question.prompt}</p>
            <button type="button" class="btn btn-outline btn-small lecture-reveal-btn" data-show="👁️ แสดงแนวคำตอบ" data-hide="🙈 ซ่อนแนวคำตอบ">👁️ แสดงแนวคำตอบ</button>
            <div class="lecture-qa-ans" style="display:none;">${data.question.answer}</div>
          </div>
        </div>
      </div>
    `;
  }

  function ensurePresentationModal() {
    let dlg = document.getElementById('lecture-present-dialog');
    if (dlg) return dlg;
    dlg = document.createElement('dialog');
    dlg.id = 'lecture-present-dialog';
    dlg.className = 'lecture-present-dialog';
    dlg.innerHTML = `
      <div class="lecture-present-head">
        <div>
          <span id="lp-badge" class="pill">บทเรียน</span>
          <h2 id="lp-title" style="margin:6px 0 0;">ชื่อบทเรียน</h2>
        </div>
        <div class="btn-row">
          <button type="button" id="lp-prev-btn" class="btn btn-outline btn-small">◀ บทก่อนหน้า</button>
          <button type="button" id="lp-next-btn" class="btn btn-outline btn-small">บทถัดไป ▶</button>
          <button type="button" id="lp-close-btn" class="icon-btn" aria-label="ปิดสไลด์">✕</button>
        </div>
      </div>
      <div id="lp-body" class="lecture-present-body"></div>
    `;
    document.body.appendChild(dlg);
    dlg.querySelector('#lp-close-btn').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });
    return dlg;
  }

  function openPresentation(pageId) {
    const data = LECTURE_DATA[pageId];
    if (!data) return;
    const dlg = ensurePresentationModal();
    dlg.dataset.currentPage = pageId;
    dlg.querySelector('#lp-badge').textContent = data.badge;
    dlg.querySelector('#lp-title').textContent = data.title;
    const body = dlg.querySelector('#lp-body');
    body.innerHTML = renderLectureBody(data, pageId);
    renderMathInContainer(body);

    body.querySelectorAll('.lecture-reveal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ans = btn.nextElementSibling;
        const shown = ans.style.display !== 'none';
        ans.style.display = shown ? 'none' : 'block';
        btn.textContent = shown ? (btn.dataset.show || '👁️ แสดงแนวคำตอบ') : (btn.dataset.hide || '🙈 ซ่อนแนวคำตอบ');
        if (!shown) renderMathInContainer(ans);
      });
    });

    const idx = MODULE_ORDER.indexOf(pageId);
    const prevBtn = dlg.querySelector('#lp-prev-btn');
    const nextBtn = dlg.querySelector('#lp-next-btn');
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= MODULE_ORDER.length - 1;
    prevBtn.onclick = () => idx > 0 && openPresentation(MODULE_ORDER[idx - 1]);
    nextBtn.onclick = () => idx < MODULE_ORDER.length - 1 && openPresentation(MODULE_ORDER[idx + 1]);

    if (!dlg.open) dlg.showModal();
  }

  function injectLectureDecks() {
    MODULE_ORDER.forEach((pageId) => {
      const section = document.querySelector(`section.page[data-page="${pageId}"]`);
      if (!section || section.querySelector('.lecture-deck')) return;
      const data = LECTURE_DATA[pageId];

      const deck = document.createElement('details');
      deck.className = 'card lecture-deck';
      deck.innerHTML = `
        <summary class="lecture-summary">
          <div class="lecture-summary-left">
            <span class="lecture-pill">📖 ทฤษฎี &amp; สื่อบรรยายอาจารย์</span>
            <span class="lecture-summary-title">${data.title}</span>
          </div>
          <div class="lecture-summary-actions">
            <button type="button" class="btn btn-primary btn-small lecture-present-btn">🖥️ ฉายสไลด์เต็มจอ</button>
            <span class="lecture-chevron">▾ เปิด/พับเนื้อหา</span>
          </div>
        </summary>
        <div class="lecture-deck-content">${renderLectureBody(data, pageId)}</div>
      `;

      const presentBtn = deck.querySelector('.lecture-present-btn');
      presentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPresentation(pageId);
      });

      deck.querySelectorAll('.lecture-reveal-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const ans = btn.nextElementSibling;
          const shown = ans.style.display !== 'none';
          ans.style.display = shown ? 'none' : 'block';
          btn.textContent = shown ? (btn.dataset.show || '👁️ แสดงแนวคำตอบ') : (btn.dataset.hide || '🙈 ซ่อนแนวคำตอบ');
          if (!shown) renderMathInContainer(ans);
        });
      });

      const header = section.querySelector('.page-header');
      if (header && header.nextSibling) {
        section.insertBefore(deck, header.nextSibling);
      } else {
        section.prepend(deck);
      }
      renderMathInContainer(deck);
    });
  }

  const LAB_URLS = {
    relativity: './special_relativity_theory/index.html',
    quantum_light: './quantum_theory_of_light/index.html',
    matter_waves: './wave_properties_of_particles/index.html',
    electron_diffraction: './electron_diffraction_lab/index.html',
    atomic_models: './atomic_structure_models/index.html',
    quantum_mechanics: './introductory_quantum_mechanics_1/index.html',
    solid_state: './molecular_solid_state_physics/index.html',
    nuclear_physics: './nuclear_structure_radioactivity/index.html',
    particle_physics: './elementary_particle_physics/index.html',
  };

  function initHeroCarousel() {
    const root = document.getElementById('hero-lab-carousel');
    if (!root) return;
    let idx = 0;
    let timer = null;
    const badgeEl = document.getElementById('hc-badge');
    const counterEl = document.getElementById('hc-counter');
    const visualEl = document.getElementById('hc-visual');
    const titleEl = document.getElementById('hc-title');
    const eqEl = document.getElementById('hc-eq');
    const labLink = document.getElementById('hc-lab-link');
    const theoryBtn = document.getElementById('hc-theory-btn');
    const dotsEl = document.getElementById('hc-dots');

    dotsEl.innerHTML = MODULE_ORDER.map(
      (id, i) => `<button type="button" class="hc-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="สไลด์ ${i + 1}"></button>`
    ).join('');

    function showSlide(nextIdx) {
      idx = (nextIdx + MODULE_ORDER.length) % MODULE_ORDER.length;
      const key = MODULE_ORDER[idx];
      const data = LECTURE_DATA[key];
      badgeEl.textContent = data.badge;
      counterEl.textContent = `${idx + 1} / ${MODULE_ORDER.length}`;
      visualEl.innerHTML = data.svg;
      titleEl.textContent = data.title;
      eqEl.innerHTML = `$$${data.equations[0].latex}$$`;
      labLink.href = LAB_URLS[key] || '#';
      renderMathInContainer(eqEl);
      dotsEl.querySelectorAll('.hc-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(() => showSlide(idx + 1), 5000);
    }
    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    document.getElementById('hc-prev')?.addEventListener('click', () => { showSlide(idx - 1); startAuto(); });
    document.getElementById('hc-next')?.addEventListener('click', () => { showSlide(idx + 1); startAuto(); });
    dotsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.hc-dot');
      if (btn) { showSlide(parseInt(btn.dataset.idx, 10)); startAuto(); }
    });
    theoryBtn?.addEventListener('click', () => openPresentation(MODULE_ORDER[idx]));
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);

    showSlide(0);
    startAuto();
  }

  window.MP27Lecture = { LECTURE_DATA, LAB_URLS, openPresentation, renderMathInContainer };
  document.addEventListener('DOMContentLoaded', () => {
    injectLectureDecks();
    initHeroCarousel();
    const overviewEl = document.querySelector('section.page[data-page="overview"]');
    renderMathInContainer(overviewEl);
    // Retry once after deferred KaTeX auto-render loads
    setTimeout(() => {
      document.querySelectorAll('.lecture-deck, #hero-lab-carousel, section.page[data-page="overview"]').forEach(renderMathInContainer);
    }, 350);
  });
})();
