/* Modern Physics 2027 — Lecturer Theory, Equations & Vector SVG Diagrams (Modules 01–09) */
(() => {
  const LECTURE_DATA = {
    relativity: {
      badge: 'บทที่ 01 · สัมพัทธภาพพิเศษ',
      title: 'ทฤษฎีสัมพัทธภาพพิเศษ (Special Relativity)',
      concept:
        'เมื่อวัตถุเคลื่อนที่ด้วยความเร็วสูงใกล้เคียงความเร็วแสง (c ≈ 3.00 × 10⁸ m/s) เวลาและระยะทางไม่ได้คงที่สัมบูรณ์อีกต่อไป ผู้สังเกตที่อยู่นิ่งจะเห็นนาฬิกาบนยานอวกาศเดินช้าลง (Time Dilation) และเห็นความยาวของยานหดสั้นลงตามแนวการเคลื่อนที่ (Length Contraction)',
      deep:
        'ตั้งอยู่บนสมมติฐาน 2 ข้อของไอน์สไตน์: (1) กฎฟิสิกส์เหมือนกันในทุกกรอบอ้างอิงเฉื่อย (2) อัตราเร็วแสงในสุญญากาศ c มีค่าคงที่เท่ากันสำหรับผู้สังเกตทุกคน การแปลงพิกัดแบบกาลิเลียนจึงถูกแทนที่ด้วยการแปลงลอเรนซ์ (Lorentz Transformation) โดยมีตัวประกอบลอเรนซ์ γ = 1 / √(1 − β²) เป็นตัวเชื่อมกาล-อวกาศ (Spacetime)',
      equations: [
        {
          formula: 'γ = 1 / √(1 − β²) ,  β = v / c',
          label: 'ตัวประกอบลอเรนซ์ (Lorentz Factor)',
          vars: 'β = อัตราส่วนความเร็วต่อแสง (ไร้มิติ, |β| < 1), γ ≥ 1 (ไร้มิติ)',
        },
        {
          formula: 'Δt = γ Δτ',
          label: 'การยืดของเวลา (Time Dilation)',
          vars: 'Δτ = เวลาแท้บนกรอบยาน (s), Δt = เวลาที่ผู้สังเกตนิ่งวัดได้ (s)',
        },
        {
          formula: 'L = L₀ / γ = L₀ √(1 − β²)',
          label: 'การหดสั้นของความยาว (Length Contraction)',
          vars: 'L₀ = ความยาวแท้เมื่ออยู่นิ่ง (m), L = ความยาวที่วัดขณะเคลื่อนที่ (m)',
        },
      ],
      example: {
        problem: 'ยานอวกาศยาวแท้ L₀ = 10.0 m เคลื่อนที่ด้วยความเร็ว v = 0.80c (β = 0.80) ถ้านักบินจับเวลา Δτ = 3.0 s ผู้สังเกตบนโลกจะวัด Δt และ L ได้เท่าใด?',
        solution: 'γ = 1 / √(1 − 0.80²) = 1 / 0.60 = 1.667 → Δt = 1.667 × 3.0 = 5.00 s และ L = 10.0 / 1.667 = 6.00 m (ตรงกับค่าเริ่มต้นใน IPO Pipeline)',
      },
      question: {
        prompt: 'ทำไมอนุภาคมิวออน (Muon) จากรังสีคอสมิกที่มีครึ่งชีวิตสั้นมากเพียง 2.2 μs จึงสามารถเดินทางลงมาถึงผิวโลกได้?',
        answer: 'เพราะมิวออนเคลื่อนที่ด้วยความเร็วใกล้ c (β ≈ 0.995) ในมุมมองชาวโลกเวลาของมิวออนยืดออก (γ ≈ 10) ส่วนในมุมมองมิวออนระยะทางชั้นบรรยากาศหดสั้นลง 10 เท่า',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพนาฬิกาแสงและตัวประกอบลอเรนซ์">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="32" font-size="13" font-weight="700" fill="#0f172a">Light Clock: กรอบนิ่ง (Δτ) เทียบกับ กรอบเคลื่อนที่ด้วย v (Δt = γΔτ)</text>
          <!-- Rest frame -->
          <rect x="34" y="54" width="120" height="120" rx="8" fill="#ffffff" stroke="#94a3b8"/>
          <line x1="58" y1="68" x2="130" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="58" y1="158" x2="130" y2="158" stroke="#1e293b" stroke-width="4"/>
          <line x1="94" y1="72" x2="94" y2="154" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 3"/>
          <circle cx="94" cy="113" r="6" fill="#f59e0b"/>
          <text x="94" y="192" text-anchor="middle" font-size="11" fill="#334155">กรอบยาน (v = 0): ระยะ 2d = cΔτ</text>
          <!-- Moving frame -->
          <rect x="190" y="54" width="300" height="120" rx="8" fill="#ffffff" stroke="#94a3b8"/>
          <line x1="215" y1="68" x2="265" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="315" y1="68" x2="365" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="415" y1="68" x2="465" y2="68" stroke="#1e293b" stroke-width="4"/>
          <line x1="215" y1="158" x2="265" y2="158" stroke="#1e293b" stroke-width="4"/>
          <line x1="315" y1="158" x2="365" y2="158" stroke="#1e293b" stroke-width="4"/>
          <line x1="415" y1="158" x2="465" y2="158" stroke="#1e293b" stroke-width="4"/>
          <polyline points="240,154 340,72 440,154" fill="none" stroke="#2563eb" stroke-width="2.8"/>
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
        'แสงไม่ได้เป็นเพียงคลื่นต่อเนื่อง แต่ประพฤติตัวเป็นก้อนพลังงานเรียกว่า "โฟตอน" (Photon) การจะทำให้อิเล็กตรอนหลุดจากผิวโลหะได้ขึ้นอยู่กับ "ความถี่แสง" ไม่ใช่ความเข้มแสง ถ้ายิงแสงความถี่ต่ำกว่าความถี่ขีดเริ่ม f₀ ต่อให้เปิดไฟสว่างแค่ไหนอิเล็กตรอนก็จะไม่หลุด',
      deep:
        'สมการโฟโตอิเล็กทริกของไอน์สไตน์อาศัยกฎอนุรักษ์พลังงานระดับควอนตัม: พลังงาน 1 โฟตอน E = hf ถูกถ่ายโอนให้แก่อิเล็กตรอน 1 ตัวทันที ส่วนหนึ่งใช้เอาชนะฟังก์ชันงาน φ (Work Function) ของโลหะ ที่เหลือกลายเป็นพลังงานจลน์สูงสุด K_max ซึ่งวัดได้จากศักย์หยุดยั้ง V_s (eV_s = K_max)',
      equations: [
        {
          formula: 'E = hf = hc / λ',
          label: 'พลังงานของ 1 โฟตอน (Planck–Einstein)',
          vars: 'h = 6.626 × 10⁻³⁴ J·s, f = ความถี่ (Hz), λ = ความยาวคลื่น (m)',
        },
        {
          formula: 'K_max = hf − φ = eV_s',
          label: 'พลังงานจลน์สูงสุดของโฟโตอิเล็กตรอน',
          vars: 'φ = ฟังก์ชันงานของโลหะ (eV), V_s = ศักย์หยุดยั้ง (V)',
        },
        {
          formula: 'f₀ = φ / h',
          label: 'ความถี่ขีดเริ่ม (Threshold Frequency)',
          vars: 'ต้องใช้ f > f₀ จึงจะเกิดกระแสโฟโตอิเล็กทริก',
        },
      ],
      example: {
        problem: 'ฉายแสงความยาวคลื่น λ = 400 nm (E ≈ 3.10 eV) ตกกระทบผิวโพแทสเซียมที่มี φ = 2.30 eV จะได้ K_max และศักย์หยุดยั้งเท่าใด?',
        solution: 'K_max = hf − φ = 3.10 − 2.30 = 0.80 eV → ศักย์หยุดยั้ง V_s = 0.80 V',
      },
      question: {
        prompt: 'หากเพิ่ม "ความเข้มแสง" เป็น 2 เท่า โดยใช้ความยาวคลื่นเดิม (f > f₀) ค่า K_max และกระแสไฟฟ้า i จะเปลี่ยนแปลงอย่างไร?',
        answer: 'กระแสไฟฟ้า i เพิ่มเป็น 2 เท่า (จำนวนโฟตอนต่อวินาทีมากขึ้น) แต่ K_max เท่าเดิม เพราะพลังงานต่อ 1 โฟตอน (hf) ขึ้นกับความถี่เท่านั้น',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="กราฟ Kmax กับความถี่ f ในปรากฏการณ์โฟโตอิเล็กทริก">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ความสัมพันธ์ K_max = hf − φ (ความชันเท่ากับค่าคงที่พลังค์ h)</text>
          <!-- Axes -->
          <line x1="70" y1="150" x2="470" y2="150" stroke="#334155" stroke-width="2"/>
          <line x1="70" y1="44" x2="70" y2="195" stroke="#334155" stroke-width="2"/>
          <text x="474" y="154" font-size="11" font-weight="700" fill="#334155">f (Hz)</text>
          <text x="24" y="54" font-size="11" font-weight="700" fill="#334155">K_max (eV)</text>
          <!-- Metal lines -->
          <line x1="70" y1="190" x2="360" y2="52" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4 3"/>
          <line x1="154" y1="150" x2="360" y2="52" stroke="#2563eb" stroke-width="3"/>
          <circle cx="154" cy="150" r="5" fill="#dc2626"/>
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
        'หลุยส์ เดอ บรอยล์ เสนอสมมติฐาน λ = h / p เพื่อเชื่อมทวิภาวะของคลื่นและอนุภาค (Wave-Particle Duality) สำหรับอิเล็กตรอนที่ถูกเร่งด้วยความต่างศักย์ V จะได้ λ = h / √(2m_e eV) นอกจากนี้การทดลองการกระเจิงคอมป์ตัน (Compton Scattering) ยังยืนยันว่าโฟตอนมีโมเมนตัม p = h/λ โดยความยาวคลื่นที่เปลี่ยนไป Δλ = (h/m_e c)(1 − cosθ)',
      equations: [
        {
          formula: 'λ = h / p = h / (mv)',
          label: 'ความยาวคลื่นเดอบรอยล์ (de Broglie Wavelength)',
          vars: 'p = โมเมนตัม (kg·m/s), h = 6.626 × 10⁻³⁴ J·s',
        },
        {
          formula: 'λ ≈ 1.226 / √V  (nm)',
          label: 'อิเล็กตรอนที่เร่งด้วยความต่างศักย์ V',
          vars: 'V = ความต่างศักย์เร่งอนุภาค (V) แบบไม่สัมพัทธภาพ',
        },
        {
          formula: 'Δλ = λ′ − λ = λ_c (1 − cosθ)',
          label: 'การเลื่อนความยาวคลื่นคอมป์ตัน (Compton Shift)',
          vars: 'λ_c = h / (m_e c) ≈ 2.426 pm, θ = มุมกระเจิง',
        },
      ],
      example: {
        problem: 'เร่งอิเล็กตรอนด้วยความต่างศักย์ V = 100 V อิเล็กตรอนจะมีความยาวคลื่นเดอบรอยล์เท่าใด?',
        solution: 'λ ≈ 1.226 / √100 = 0.1226 nm = 1.226 Å ซึ่งมีขนาดใกล้เคียงระยะห่างระหว่างอะตอมในผลึก จึงเกิดการเลี้ยวเบนได้',
      },
      question: {
        prompt: 'ทำไมลูกฟุตบอลที่เตะด้วยความเร็ว 20 m/s จึงไม่แสดงพฤติกรรมการเลี้ยวเบนให้เราเห็นเหมือนอิเล็กตรอน?',
        answer: 'เพราะมวลของลูกฟุตบอล (≈ 0.45 kg) ใหญ่กว่าอิเล็กตรอนมหาศาล ทำให้ λ = h/(mv) ≈ 7 × 10⁻³⁵ m ซึ่งเล็กกว่าขนาดนิวเคลียสมาก จึงสังเกตการเลี้ยวเบนไม่ได้',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพคลื่นนิ่งเดอบรอยล์และคอมป์ตัน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ทวิภาวะคลื่น–อนุภาค: คลื่นสสารเดอบรอยล์ &amp; การกระเจิงคอมป์ตัน</text>
          <!-- Standing wave circle -->
          <circle cx="130" cy="118" r="56" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 3"/>
          <path d="M 130,54 Q 160,64 176,82 T 192,118 T 176,154 T 130,182 T 84,154 T 68,118 T 84,82 Z" fill="none" stroke="#2563eb" stroke-width="2.5"/>
          <circle cx="130" cy="118" r="7" fill="#dc2626"/>
          <text x="130" y="200" text-anchor="middle" font-size="11" fill="#334155">วงโคจรคลื่นนิ่ง: 2πr = nλ</text>
          <!-- Compton scattering -->
          <line x1="255" y1="125" x2="345" y2="125" stroke="#f59e0b" stroke-width="3"/>
          <polygon points="345,125 335,120 335,130" fill="#f59e0b"/>
          <text x="295" y="114" text-anchor="middle" font-size="11" font-weight="700" fill="#b45309">โฟตอน λ</text>
          <circle cx="355" cy="125" r="8" fill="#0f172a"/>
          <text x="355" y="147" text-anchor="middle" font-size="10" fill="#334155">e⁻ นิ่ง</text>
          <line x1="362" y1="120" x2="455" y2="75" stroke="#2563eb" stroke-width="2.8"/>
          <text x="435" y="68" font-size="11" font-weight="700" fill="#2563eb">λ′ &gt; λ (มุม θ)</text>
          <line x1="362" y1="130" x2="455" y2="165" stroke="#059669" stroke-width="2.5"/>
          <text x="430" y="182" font-size="11" font-weight="700" fill="#059669">e⁻ กระเด็น</text>
        </svg>`,
    },

    electron_diffraction: {
      badge: 'บทที่ 04 · การเลี้ยวเบนของอิเล็กตรอน',
      title: 'การเลี้ยวเบนของอิเล็กตรอนผ่านผลึกแกรไฟต์ (Electron Diffraction)',
      concept:
        'เมื่อยิงลำอิเล็กตรอนพลังงานสูงผ่านแผ่นแกรไฟต์บางๆ อิเล็กตรอนจะเกิดการเลี้ยวเบนเป็น "วงแหวนสว่างซ้อนกัน" บนจอเรืองแสงคล้ายคลื่นแสงผ่านเกรตติง นี่คือหลักฐานตรงที่ยืนยันว่าอิเล็กตรอนมีความเป็นคลื่น',
      deep:
        'ตามกฎของแบรกก์ (Bragg’s Law) สำหรับผลึกพอลิคริสตัลไลน์แกรไฟต์ที่มีระยะห่างระนาบผลึกหลัก d₁ = 0.213 nm และ d₂ = 0.123 nm เมื่อปรับศักย์เร่ง V_a สูงขึ้น ความยาวคลื่น λ = h / √(2m_e eV_a) จะลดลง ทำให้มุมเลี้ยวเบน θ และรัศมีวงแหวน R ≈ L·tan(2θ) หดเล็กลงตามกฎ nλ = 2d sinθ',
      equations: [
        {
          formula: 'nλ = 2d sinθ',
          label: 'กฎการเลี้ยวเบนของแบรกก์ (Bragg’s Law)',
          vars: 'd = ระยะห่างระนาบผลึก (d₁ = 213 pm, d₂ = 123 pm), θ = มุมเกรซซิง',
        },
        {
          formula: 'D = 2L · tan(2θ) ≈ 2Lλ / d',
          label: 'เส้นผ่านศูนย์กลางวงแหวนเลี้ยวเบนบนจอ',
          vars: 'L = ระยะจากเป้าแกรไฟต์ถึงจอเรืองแสง (m), D = เส้นผ่านศูนย์กลางวง (m)',
        },
        {
          formula: 'λ_dB = h / √(2m_e eV_a)',
          label: 'เทียบความยาวคลื่นเดอบรอยล์กับมุมแบรกก์',
          vars: 'เมื่อ V_a เพิ่มขึ้น → λ ลดลง → วงแหวนเลี้ยวเบนหดเล็กลง',
        },
      ],
      example: {
        problem: 'ถ้าปรับศักย์เร่งขั้วแอโนด V_a จาก 2.5 kV เพิ่มเป็น 5.0 kV รัศมีวงแหวนเลี้ยวเบนบนจอจะเปลี่ยนไปอย่างไร?',
        solution: 'เนื่องจาก λ ∝ 1/√V_a และ R ∝ λ ดังนั้นเมื่อ V_a เพิ่มเป็น 2 เท่า รัศมีวงแหวนจะลดลงเหลือ 1/√2 ≈ 0.707 เท่าของเดิม',
      },
      question: {
        prompt: 'เหตุใดบนจอเรืองแสงจึงเห็นเป็น "วงแหวนวงกลม" 2 วง แทนที่จะเป็นจุดๆ เหมือนการเลี้ยวเบนจากผลึกเดี่ยว?',
        answer: 'เพราะแผ่นฟิล์มแกรไฟต์เป็นผลึกหลายผลึกขนาดเล็ก (Polycrystalline) ที่เรียงตัวสุ่มทุกทิศทางรอบแกนลำอิเล็กตรอน จึงเกิดจุดเลี้ยวเบนหมุนครบรอบเป็นวงแหวน 2 วงตามค่า d₁ และ d₂',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="ชุดทดลองหลอดสุญญากาศการเลี้ยวเบนอิเล็กตรอน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ชุดทดลอง Electron Diffraction Tube (2d sinθ = nλ)</text>
          <!-- Electron gun -->
          <rect x="30" y="96" width="75" height="36" rx="4" fill="#334155"/>
          <text x="67" y="118" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700">ปืน e⁻ (V_a)</text>
          <!-- Graphite target -->
          <rect x="165" y="84" width="10" height="60" fill="#0f172a"/>
          <text x="170" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">แกรไฟต์ (d₁, d₂)</text>
          <!-- Beam & diffracted cone -->
          <line x1="105" y1="114" x2="165" y2="114" stroke="#38bdf8" stroke-width="3"/>
          <line x1="175" y1="114" x2="345" y2="114" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3"/>
          <line x1="175" y1="114" x2="345" y2="62" stroke="#10b981" stroke-width="2.5"/>
          <line x1="175" y1="114" x2="345" y2="166" stroke="#10b981" stroke-width="2.5"/>
          <text x="260" y="106" text-anchor="middle" font-size="11" fill="#475569">L</text>
          <text x="255" y="78" font-size="11" font-weight="700" fill="#059669">มุม 2θ</text>
          <!-- Fluorescent screen -->
          <ellipse cx="350" cy="114" rx="12" ry="68" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
          <circle cx="445" cy="114" r="56" fill="#022c22" stroke="#10b981" stroke-width="2"/>
          <circle cx="445" cy="114" r="40" fill="none" stroke="#34d399" stroke-width="3"/>
          <circle cx="445" cy="114" r="22" fill="none" stroke="#6ee7b7" stroke-width="3"/>
          <circle cx="445" cy="114" r="4" fill="#a7f3d0"/>
          <text x="445" y="188" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">วงแหวน d₁ (ใน) &amp; d₂ (นอก)</text>
        </svg>`,
    },

    atomic_models: {
      badge: 'บทที่ 05 · แบบจำลองอะตอม',
      title: 'แบบจำลองอะตอมของบอร์และสเปกตรัมเส้น (Bohr Model)',
      concept:
        'อิเล็กตรอนในอะตอมไฮโดรเจนไม่ได้โคจรรอบนิวเคลียสที่ระยะใดก็ได้ แต่อยู่ได้เฉพาะ "วงโคจรเสถียร" ที่มีระดับพลังงานแน่นอน (E_n) เมื่ออิเล็กตรอนกระโดดจากชั้นสูงลงมาชั้นต่ำ จะคายโฟตอนที่มีสี/ความยาวคลื่นจำเพาะออกมาเป็นเส้นสเปกตรัม',
      deep:
        'นีลส์ บอร์ กำหนดเงื่อนไขควอนตัมของโมเมนตัมเชิงมุม L = nħ ทำให้รัศมีวงโคจรเป็นค่าแยกไม่ต่อเนื่อง r_n = n² a₀ (a₀ = 0.529 Å) และระดับพลังงาน E_n = −13.6 / n² eV การเปลี่ยนระดับจาก n_i → n_f ให้สเปกตรัมชุดต่างๆ เช่น ไลแมน (UV, n_f = 1), บัลเมอร์ (Visible, n_f = 2) ตามสูตรริดเบิร์ก',
      equations: [
        {
          formula: 'E_n = −13.6 / n²  (eV)',
          label: 'ระดับพลังงานอะตอมไฮโดรเจน',
          vars: 'n = 1, 2, 3, ... (เลขควอนตัมหลัก), E₁ = −13.6 eV (Ground State)',
        },
        {
          formula: 'ΔE = |E_i − E_f| = hf = hc / λ',
          label: 'เงื่อนไขความถี่ของบอร์ (Bohr Frequency Condition)',
          vars: 'คายโฟตอนเมื่อ n_i > n_f, ดูดกลืนโฟตอนเมื่อ n_i < n_f',
        },
        {
          formula: '1 / λ = R_H (1/n_f² − 1/n_i²)',
          label: 'สมการริดเบิร์ก (Rydberg Formula)',
          vars: 'R_H = 1.097 × 10⁷ m⁻¹, อนุกรมบัลเมอร์ (แสงที่ตามองเห็น) ใช้ n_f = 2',
        },
      ],
      example: {
        problem: 'อิเล็กตรอนในอะตอมไฮโดรเจนเปลี่ยนระดับจาก n = 3 ลงมาที่ n = 2 (เส้นสีแดง H-α) จะคายโฟตอนพลังงานและความยาวคลื่นเท่าใด?',
        solution: 'ΔE = E₃ − E₂ = (−1.51) − (−3.40) = 1.89 eV → λ = 1240 / 1.89 ≈ 656 nm (แสงสีแดง)',
      },
      question: {
        prompt: 'ทำไมสเปกตรัมของธาตุแต่ละชนิดจึงเป็นเส้นสีเฉพาะตัวไม่เหมือนกัน (คล้ายลายนิ้วมือ)?',
        answer: 'เพราะจำนวนโปรตอนในนิวเคลียสและการจัดเรียงอิเล็กตรอนของแต่ละธาตุต่างกัน ทำให้ขั้นบันไดระดับพลังงาน E_n และผลต่าง ΔE ไม่เหมือนกัน',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพระดับพลังงานอะตอมไฮโดรเจน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">ระดับพลังงานไฮโดรเจน E_n = −13.6 / n² eV และอนุกรมบัลเมอร์</text>
          <!-- Energy levels -->
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
          <!-- Transitions -->
          <line x1="120" y1="98" x2="120" y2="136" stroke="#dc2626" stroke-width="3"/>
          <polygon points="120,138 115,129 125,129" fill="#dc2626"/>
          <text x="120" y="122" text-anchor="end" dx="-6" font-size="10" font-weight="700" fill="#dc2626">656 nm</text>
          <line x1="180" y1="74" x2="180" y2="136" stroke="#0891b2" stroke-width="3"/>
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
        'ในโลกควอนตัม เราไม่สามารถบอกตำแหน่งที่แน่นอนของอิเล็กตรอนได้ แต่บอกเป็น "ความน่าจะเป็น" จากฟังก์ชันคลื่น |ψ(x)|² ที่น่าทึ่งคือ แม้อนุภาคจะมีพลังงานน้อยกว่าความสูงกำแพงศักย์ (E < V₀) ก็ยังมีโอกาส "ทะลุผ่าน" กำแพงศักย์ได้ (Quantum Tunneling)',
      deep:
        'สมการชเรอดิงเงอร์ 1 มิติ: −(ħ²/2m) d²ψ/dx² + V(x)ψ = Eψ กำหนดพฤติกรรมของ ψ(x) ภายในบ่อศักย์อนันต์ (Particle in a Box) พลังงานถูกควอนไทซ์เป็น E_n = n²h²/(8mL²) ส่วนในกรณีกำแพงศักย์จำกัด (Finite Barrier) ฟังก์ชันคลื่นภายในกำแพงจะลดลงแบบเอ็กซ์โพเนนเชียล ψ ~ e^(−κx) ทำให้เกิดสัมประสิทธิ์การทะลุผ่าน T > 0',
      equations: [
        {
          formula: 'P(x) dx = |ψ(x)|² dx ,  ∫ |ψ|² dx = 1',
          label: 'การตีความความน่าจะเป็นของบอร์น (Born Rule)',
          vars: '|ψ(x)|² = ความหนาแน่นความน่าจะเป็นในการพบอนุภาคที่ตำแหน่ง x',
        },
        {
          formula: 'E_n = n² h² / (8 m L²)',
          label: 'ระดับพลังงานในบ่อศักย์อนันต์ 1 มิติ',
          vars: 'L = ความกว้างบ่อศักย์ (m), n = 1, 2, 3, ...',
        },
        {
          formula: 'Δx · Δp ≥ ħ / 2',
          label: 'หลักความไม่แน่นอนของไฮเซนเบิร์ก',
          vars: 'ยิ่งระบุตำแหน่ง Δx แม่นยำ ความไม่แน่นอนของโมเมนตัม Δp ยิ่งมากขึ้น',
        },
      ],
      example: {
        problem: 'ในบ่อศักย์อนันต์ 1 มิติ ถ้าระดับพื้น n = 1 มีพลังงาน E₁ = 2.0 eV แล้วระดับกระตุ้นที่ 2 (n = 3) จะมีพลังงานเท่าใด?',
        solution: 'จาก E_n = n² E₁ → E₃ = 3² × 2.0 = 18.0 eV',
      },
      question: {
        prompt: 'ปรากฏการณ์ Quantum Tunneling มีประโยชน์อย่างไรในเทคโนโลยีหรือธรรมชาติรอบตัว?',
        answer: 'ใช้ในกล้องจุลทรรศน์ STM ส่องดูอะตอม, หน่วยความจำ Flash Memory/SSD และอธิบายปฏิกิริยานิวเคลียร์ฟิวชันในดวงอาทิตย์รวมถึงการสลายให้อนุภาคแอลฟา',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพการทะลุผ่านกำแพงศักย์ Quantum Tunneling">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">Quantum Tunneling: อนุภาคพลังงาน E &lt; V₀ ทะลุผ่านกำแพงศักย์</text>
          <!-- Barrier -->
          <rect x="210" y="65" width="90" height="115" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
          <text x="255" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">กำแพงศักย์ V₀ (ความกว้าง a)</text>
          <line x1="30" y1="180" x2="490" y2="180" stroke="#334155" stroke-width="1.5"/>
          <!-- Energy E line -->
          <line x1="35" y1="120" x2="480" y2="120" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 4"/>
          <text x="48" y="114" font-size="11" font-weight="700" fill="#475569">E &lt; V₀</text>
          <!-- Wavefunction -->
          <path d="M 40,120 Q 60,72 80,120 T 120,120 T 160,120 T 200,120 L 210,104 C 235,112 265,126 300,132 Q 320,118 340,126 T 380,126 T 420,126 T 460,126" fill="none" stroke="#2563eb" stroke-width="3"/>
          <text x="120" y="198" text-anchor="middle" font-size="11" fill="#1e40af">คลื่นตกกระทบ + สะท้อน</text>
          <text x="255" y="198" text-anchor="middle" font-size="11" fill="#b91c1c">ลดทอน e^(−κx)</text>
          <text x="400" y="198" text-anchor="middle" font-size="11" fill="#059669">คลื่นทะลุผ่าน (T &gt; 0)</text>
        </svg>`,
    },

    solid_state: {
      badge: 'บทที่ 07 · ฟิสิกส์โมเลกุลและของแข็ง',
      title: 'แถบพลังงานของของแข็งและสารกึ่งตัวนำ (Energy Bands)',
      concept:
        'เมื่ออะตอมจำนวนมหาศาลมาเรียงชิดกันเป็นผลึก ระดับพลังงานเดี่ยวๆ จะแผ่ออกเป็น "แถบพลังงาน" ความแตกต่างระหว่าง ตัวนำ สารกึ่งตัวนำ และฉนวน อยู่ที่ความกว้างของช่องว่างพลังงาน (Band Gap, E_g) ระหว่างแถบเวเลนซ์และแถบนำไฟฟ้า',
      deep:
        'ในสารกึ่งตัวนำ (เช่น Si มี E_g ≈ 1.12 eV) การเติมสารเจือ (Doping) หมู่ V เช่น ฟอสฟอรัส จะได้สารกึ่งตัวนำชนิด n (พาหะหลักคืออิเล็กตรอน) ส่วนการเติมหมู่ III เช่น โบรอน จะได้ชนิด p (พาหะหลักคือโฮล) เมื่อนำมาต่อกันเป็นรอยต่อ p-n จะเกิดไดโอดและ LED ที่ให้แสงตามค่า E_g = hc/λ',
      equations: [
        {
          formula: 'E_g = E_c − E_v',
          label: 'ช่องว่างพลังงาน (Band Gap Energy)',
          vars: 'ตัวนำ: แถบซ้อนทับกัน, สารกึ่งตัวนำ: E_g ≈ 0.5–3 eV, ฉนวน: E_g > 4 eV',
        },
        {
          formula: 'f(E) = 1 / [exp((E − E_F) / k_B T) + 1]',
          label: 'ฟังก์ชันการกระจายแฟร์มี–ดิแรก (Fermi–Dirac)',
          vars: 'E_F = ระดับพลังงานแฟร์มี, k_B = 8.617 × 10⁻⁵ eV/K',
        },
        {
          formula: 'λ_LED ≈ 1240 / E_g  (nm)',
          label: 'ความยาวคลื่นแสงที่เปล่งจาก LED',
          vars: 'E_g ในหน่วย eV (เช่น GaN E_g ≈ 2.7 eV ให้แสงสีน้ำเงิน ≈ 460 nm)',
        },
      ],
      example: {
        problem: 'ไดโอดเปล่งแสง (LED) สีเขียวมีความยาวคลื่น λ = 530 nm ต้องใช้วัสดุสารกึ่งตัวนำที่มี Band Gap ประมาณเท่าใด?',
        solution: 'E_g ≈ 1240 / 530 ≈ 2.34 eV',
      },
      question: {
        prompt: 'ทำไมโลหะจึงนำไฟฟ้าได้ดีมากแม้ที่อุณหภูมิต่ำ แต่เมื่ออุณหภูมิสูงขึ้นความนำไฟฟ้ากลับลดลง (ตรงข้ามกับสารกึ่งตัวนำ)?',
        answer: 'โลหะมีอิเล็กตรอนอิสระเต็มแถบนำไฟฟ้าอยู่แล้ว เมื่อร้อนขึ้นอะตอมสั่นแรงขึ้นทำให้อิเล็กตรอนชนกระเจิงมากขึ้น (ความต้านทานเพิ่ม) ส่วนสารกึ่งตัวนำเมื่อร้อนขึ้นอิเล็กตรอนกระโดดข้าม E_g ได้มากขึ้น จึงนำไฟฟ้าดีขึ้น',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="เปรียบเทียบแถบพลังงานตัวนำ สารกึ่งตัวนำ และฉนวน">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">เปรียบเทียบแถบพลังงาน: ตัวนำ vs สารกึ่งตัวนำ vs ฉนวน</text>
          <!-- Conductor -->
          <rect x="38" y="85" width="110" height="45" rx="4" fill="#bae6fd" stroke="#0284c7"/>
          <rect x="38" y="115" width="110" height="55" rx="4" fill="#3b82f6" fill-opacity="0.7" stroke="#1d4ed8"/>
          <text x="93" y="192" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">ตัวนำ (ซ้อนทับ E_g=0)</text>
          <!-- Semiconductor -->
          <rect x="205" y="55" width="110" height="45" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
          <text x="260" y="81" text-anchor="middle" font-size="10" fill="#0369a1">Conduction Band</text>
          <line x1="260" y1="100" x2="260" y2="128" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="260" y="118" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">E_g ≈ 1.1 eV</text>
          <rect x="205" y="128" width="110" height="45" rx="4" fill="#2563eb" stroke="#1d4ed8"/>
          <text x="260" y="155" text-anchor="middle" font-size="10" fill="#ffffff">Valence Band</text>
          <text x="260" y="192" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">สารกึ่งตัวนำ (Si)</text>
          <!-- Insulator -->
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
        'นิวเคลียสที่ไม่เสถียรจะปรับตัวเองโดยการปล่อยรังสี α, β หรือ γ ออกมา อัตราการสลายตัวขึ้นอยู่กับ "ครึ่งชีวิต" (Half-life, T₁/₂) ซึ่งเป็นเวลาที่นิวเคลียสเหลือครึ่งหนึ่งของเริ่มต้น และเกิดแบบสุ่มทางสถิติ (Monte Carlo)',
      deep:
        'พลังงานยึดเหนี่ยวของนิวเคลียสเกิดจากส่วนพร่องมวล Δm ผ่านสมการ E_B = Δm·c² กฎการสลายตัวของรัทเทอร์ฟอร์ด–ซอดดี: N(t) = N₀ e^(−λt) โดย λ = ln(2)/T₁/₂ และกัมมันตภาพ A(t) = λN(t) ในการวัดจริงด้วยเครื่อง Geiger–Müller จำนวนนับต่อช่วงเวลาจะมีความผันผวนแบบสถิติปัวส์ซง (σ = √N)',
      equations: [
        {
          formula: 'N(t) = N₀ e^(−λt) = N₀ (1/2)^(t / T₁/₂)',
          label: 'กฎการสลายตัวกัมมันตรังสี',
          vars: 'N₀ = จำนวนนิวเคลียสเริ่มต้น, λ = ค่าคงที่การสลายตัว (s⁻¹)',
        },
        {
          formula: 'T₁/₂ = ln(2) / λ ≈ 0.693 / λ',
          label: 'ความสัมพันธ์ครึ่งชีวิตและค่าคงที่สลายตัว',
          vars: 'T₁/₂ = ครึ่งชีวิต (หน่วยเวลาเดียวกับ t)',
        },
        {
          formula: 'E_B = [Z m_p + (A − Z)m_n − M_nuc] c²',
          label: 'พลังงานยึดเหนี่ยว (Binding Energy)',
          vars: '1 u ≈ 931.5 MeV/c², เหล็ก-56 มีพลังงานยึดเหนี่ยวต่อนิวคลีออนสูงสุด',
        },
      ],
      example: {
        problem: 'ไอโอดีน-131 มีครึ่งชีวิต T₁/₂ = 8.02 วัน ถ้ามีตัวอย่างเริ่มต้น N₀ = 1,000 นิวเคลียส เมื่อเวลาผ่านไป 16.04 วัน จะเหลือกี่นิวเคลียส?',
        solution: 'เวลา 16.04 วัน = 2 เท่าของครึ่งชีวิต → N = 1,000 × (1/2)² = 250 นิวเคลียส',
      },
      question: {
        prompt: 'ทำไมการนับรังสีจากตัวอย่างเดิมซ้ำๆ หลายครั้ง จึงได้ตัวเลขไม่เท่ากันเป๊ะ (เช่น 98, 103, 95 ครั้ง/นาที)?',
        answer: 'เพราะการสลายตัวของนิวเคลียสแต่ละตัวเป็นกระบวนการสุ่มเชิงควอนตัมที่อิสระต่อกัน ทำให้จำนวนการสลายตัวกระจายตัวตามสถิติปัวส์ซง (ความคลาดเคลื่อน σ ≈ √N)',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="กราฟการสลายตัวกัมมันตรังสีแบบ Exponential">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">กราฟการสลายตัว N(t) = N₀ e^(−λt) และช่วงครึ่งชีวิต (T₁/₂)</text>
          <line x1="65" y1="180" x2="470" y2="180" stroke="#334155" stroke-width="2"/>
          <line x1="65" y1="45" x2="65" y2="180" stroke="#334155" stroke-width="2"/>
          <text x="475" y="184" font-size="11" font-weight="700" fill="#334155">t</text>
          <text x="28" y="55" font-size="11" font-weight="700" fill="#334155">N(t)</text>
          <!-- Decay curve -->
          <path d="M 65,55 Q 140,120 185,117 T 305,149 T 445,172" fill="none" stroke="#2563eb" stroke-width="3"/>
          <!-- Half-life markers -->
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
        </svg>`,
    },

    particle_physics: {
      badge: 'บทที่ 09 · ฟิสิกส์อนุภาคมูลฐาน',
      title: 'แบบจำลองมาตรฐาน (Standard Model) และแรงพื้นฐาน 4 ชนิด',
      concept:
        'โปรตอนและนิวตรอนไม่ใช่อนุภาคที่เล็กที่สุด แต่ประกอบขึ้นจาก "ควาร์ก" (Quarks) ยึดกันด้วยกลูออน ส่วนอิเล็กตรอนจัดอยู่ในตระกูล "เลปตอน" (Leptons) ทุกปฏิสัมพันธ์ในธรรมชาติเกิดขึ้นผ่านการแลกเปลี่ยนอนุภาคสื่อแรง (Gauge Bosons) และมีโบซอนฮิกส์เป็นตัวให้มวล',
      deep:
        'แบบจำลองมาตรฐานแบ่งอนุภาคมูลฐานเป็น 2 กลุ่มใหญ่: (1) เฟอร์มิออน (Spin 1/2) ได้แก่ ควาร์ก 6 รสชาติ (u, d, c, s, t, b) และเลปตอน 6 ชนิด (e, ν_e, μ, ν_μ, τ, ν_τ) (2) โบซอนสื่อแรง (Spin 1) ได้แก่ กลูออน (Strong), โฟตอน (EM), W±/Z⁰ (Weak) และฮิกส์โบซอน (Spin 0) ทุกปฏิกิริยาต้องอนุรักษ์ประจุไฟฟ้า (Q), เลขแบริออน (B) และเลขเลปตอน (L)',
      equations: [
        {
          formula: 'p = uud (+2/3 + 2/3 − 1/3 = +1e) ,  n = udd (0)',
          label: 'องค์ประกอบควาร์กของโปรตอนและนิวตรอน',
          vars: 'ประจุควาร์ก: u, c, t = +2/3 e | d, s, b = −1/3 e',
        },
        {
          formula: '∑Q_i = ∑Q_f ,  ∑B_i = ∑B_f ,  ∑L_i = ∑L_f',
          label: 'กฎการอนุรักษ์ในปฏิกิริยาอนุภาค',
          vars: 'Q = ประจุ, B = เลขแบริออน (โปรตอน/นิวตรอน = +1), L = เลขเลปตอน',
        },
        {
          formula: 'n → p + e⁻ + ν̄_e',
          label: 'การสลายตัวบีตาลบผ่านแรงนิวเคลียร์อย่างอ่อน (W⁻ Boson)',
          vars: 'ควาร์ก d เปลี่ยนเป็น u โดยปล่อย W⁻ แล้วสลายต่อเป็นอิเล็กตรอน + แอนตินิวทริโน',
        },
      ],
      example: {
        problem: 'ในปฏิกิริยาสลายตัวบีตา n → p + e⁻ + ν̄_e จงตรวจสอบการอนุรักษ์ประจุ Q และเลขแบริออน B',
        solution: 'ก่อนสลาย: Q = 0, B = +1 | หลังสลาย: Q = (+1) + (−1) + 0 = 0, B = (+1) + 0 + 0 = +1 (อนุรักษ์ครบทั้งคู่)',
      },
      question: {
        prompt: 'ทำไมเราจึงไม่เคยพบ "ควาร์กเดี่ยวๆ" หลุดออกมาลอยอิสระนอกโปรตอนหรือนิวตรอนได้เลย?',
        answer: 'เนื่องจากสมบัติ Color Confinement ของแรงนิวเคลียร์อย่างเข้ม ยิ่งดึงควาร์กออกจากกัน พลังงานในสนามกลูออนยิ่งเพิ่มจนสร้างคู่ควาร์ก-แอนติควาร์กใหม่ขึ้นมาจับคู่กันแทน',
      },
      svg: `
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="แผนภาพตารางแบบจำลองมาตรฐาน Standard Model">
          <rect x="8" y="8" width="504" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">แบบจำลองมาตรฐาน (Standard Model of Particle Physics)</text>
          <!-- Quarks -->
          <rect x="28" y="48" width="186" height="66" rx="8" fill="#ede9fe" stroke="#7c3aed"/>
          <text x="121" y="65" text-anchor="middle" font-size="11" font-weight="700" fill="#5b21b6">Quarks (u, d, c, s, t, b)</text>
          <text x="121" y="85" text-anchor="middle" font-size="10" fill="#4c1d95">p = uud (+1e) | n = udd (0)</text>
          <text x="121" y="102" text-anchor="middle" font-size="10" fill="#6d28d9">รับรู้แรงนิวเคลียร์เข้ม (Strong)</text>
          <!-- Leptons -->
          <rect x="28" y="124" width="186" height="66" rx="8" fill="#dcfce7" stroke="#16a34a"/>
          <text x="121" y="142" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">Leptons (e⁻, μ, τ, ν_e, ν_μ, ν_τ)</text>
          <text x="121" y="162" text-anchor="middle" font-size="10" fill="#14532d">อิเล็กตรอน &amp; นิวทริโน</text>
          <text x="121" y="178" text-anchor="middle" font-size="10" fill="#15803d">ไม่รับรู้แรง Strong</text>
          <!-- Bosons -->
          <rect x="232" y="48" width="150" height="142" rx="8" fill="#fee2e2" stroke="#dc2626"/>
          <text x="307" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">Gauge Bosons (สื่อแรง)</text>
          <text x="307" y="92" text-anchor="middle" font-size="10" fill="#7f1d1d">• Gluon (g) → Strong</text>
          <text x="307" y="116" text-anchor="middle" font-size="10" fill="#7f1d1d">• Photon (γ) → EM</text>
          <text x="307" y="140" text-anchor="middle" font-size="10" fill="#7f1d1d">• W±, Z⁰ → Weak</text>
          <text x="307" y="164" text-anchor="middle" font-size="10" fill="#7f1d1d">(Spin = 1)</text>
          <!-- Higgs -->
          <rect x="396" y="48" width="96" height="142" rx="8" fill="#fef3c7" stroke="#d97706"/>
          <text x="444" y="88" text-anchor="middle" font-size="13" font-weight="700" fill="#92400e">Higgs (H⁰)</text>
          <text x="444" y="114" text-anchor="middle" font-size="10" fill="#78350f">Spin = 0</text>
          <text x="444" y="136" text-anchor="middle" font-size="10" fill="#78350f">กลไกให้มวล</text>
          <text x="444" y="152" text-anchor="middle" font-size="10" fill="#78350f">แก่อนุภาค</text>
        </svg>`,
    },
  };

  const MODULE_ORDER = Object.keys(LECTURE_DATA);

  function renderLectureBody(data) {
    const eqHtml = data.equations
      .map(
        (eq) => `
        <div class="lecture-eq-card">
          <div class="lecture-eq-label">${eq.label}</div>
          <div class="lecture-eq-formula">${eq.formula}</div>
          <div class="lecture-eq-vars">${eq.vars}</div>
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
          <div class="lecture-example-box">
            <div class="lecture-kicker">📝 ตัวอย่างคำนวณประกอบการสอน</div>
            <p><strong>โจทย์:</strong> ${data.example.problem}</p>
            <p class="lecture-sol"><strong>วิธีทำ:</strong> ${data.example.solution}</p>
          </div>
          <div class="lecture-qa-box">
            <div class="lecture-kicker">💬 คำถามชวนคิดหน้าชั้น (Think-Pair-Share)</div>
            <p>${data.question.prompt}</p>
            <button type="button" class="btn btn-outline btn-small lecture-reveal-btn">👁️ แสดงแนวคำตอบ</button>
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
    body.innerHTML = renderLectureBody(data);

    body.querySelectorAll('.lecture-reveal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ans = btn.nextElementSibling;
        const shown = ans.style.display !== 'none';
        ans.style.display = shown ? 'none' : 'block';
        btn.textContent = shown ? '👁️ แสดงแนวคำตอบ' : '🙈 ซ่อนแนวคำตอบ';
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
        <div class="lecture-deck-content">${renderLectureBody(data)}</div>
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
          btn.textContent = shown ? '👁️ แสดงแนวคำตอบ' : '🙈 ซ่อนแนวคำตอบ';
        });
      });

      const header = section.querySelector('.page-header');
      if (header && header.nextSibling) {
        section.insertBefore(deck, header.nextSibling);
      } else {
        section.prepend(deck);
      }
    });
  }

  window.MP27Lecture = { LECTURE_DATA, openPresentation };
  document.addEventListener('DOMContentLoaded', injectLectureDecks);
})();
