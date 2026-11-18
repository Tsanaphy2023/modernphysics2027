(() => {
  'use strict';

  const DEFAULT_ROSTER = [
    { student_id: 'TEACHER01', full_name: 'อาจารย์ชีวะ (ทดสอบระบบ)', section: 'อาจารย์/ทดสอบ' },
    { student_id: '6614611001', full_name: 'นางสาวกนกวรรณพึ่งฉ่ำ', section: '661/วิทย์' },
    { student_id: '6614611002', full_name: 'นางสาวกาญจน์สณีทรงศรี', section: '661/วิทย์' },
    { student_id: '6614611003', full_name: 'นางสาวกิติยาแสงทอง', section: '661/วิทย์' },
    { student_id: '6614611004', full_name: 'นางสาวชุลีขวัญคนขยัน', section: '661/วิทย์' },
    { student_id: '6614611005', full_name: 'นางสาวณัฐณิชานาคาพยัคฆ์', section: '661/วิทย์' },
    { student_id: '6614611006', full_name: 'นางสาวณัฐวรรณคำกอก', section: '661/วิทย์' },
    { student_id: '6614611007', full_name: 'นางสาวเณศราโพธิ์นิล', section: '661/วิทย์' },
    { student_id: '6614611009', full_name: 'นางสาวธันยธรณ์หมั่นกู้', section: '661/วิทย์' },
    { student_id: '6614611010', full_name: 'นางสาวธิชานันท์นนเทศา', section: '661/วิทย์' },
    { student_id: '6614611011', full_name: 'นางสาวนภัสนาวงศ์จันทร์', section: '661/วิทย์' },
    { student_id: '6614611012', full_name: 'นางสาวพรทิพย์บรรณสาร', section: '661/วิทย์' },
    { student_id: '6614611013', full_name: 'นางสาวพัชราพรมจีน', section: '661/วิทย์' },
    { student_id: '6614611014', full_name: 'นางสาวภัทริดาเจ๊ะมัด', section: '661/วิทย์' },
    { student_id: '6614611015', full_name: 'นายมนตรีจันทร์เทศ', section: '661/วิทย์' },
    { student_id: '6614611018', full_name: 'นายอชิระสราภิรมย์', section: '661/วิทย์' },
    { student_id: '6614611019', full_name: 'นายอุดมชัยบุตรอุดม', section: '661/วิทย์' },
    { student_id: '6614611021', full_name: 'นางสาวจิฬาภรณ์อภิบาลศรี', section: '661/วิทย์' },
    { student_id: '6614611024', full_name: 'นายมงคลศรีสมบัติ', section: '661/วิทย์' },
    { student_id: '6614611025', full_name: 'นางสาววาสินีสุวรรณา', section: '661/วิทย์' },
    { student_id: '6614611029', full_name: 'นางสาวรัตมณีเถาวัลณีย์', section: '661/วิทย์' },
  ];

  const CORE_MODULES = [
    'relativity', 'quantum_light', 'matter_waves', 'electron_diffraction',
    'atomic_models', 'quantum_mechanics', 'solid_state', 'nuclear_physics', 'particle_physics',
  ];

  const SEMI_TASKS = {
    relativity: {
      title: 'จัดลำดับผังงานสัมพัทธภาพพิเศษ & วิเคราะห์กรอบเฉื่อย (IPO → Lorentz)',
      hint: 'เรียงลำดับบล็อก ISO 5807 ให้ถูกต้อง (ระวัง! อย่าเลือกบล็อกตัวลวงแบบกาลิเลียน)',
      prompt: 'อธิบายเหตุผลว่าเหตุใดอัตราเร็วแสง c จึงคงตัวในทุกกรอบเฉื่อย และผลของ γ ต่อเวลาที่เดินช้าลง (Δt) กับความยาวหดสั้น (L) พร้อมการดักขอบเขต |β| < 1:',
      keywords: ['γ', 'lorentz', 'ลอเรนตซ์', 'เวลา', 'หดสั้น', 'c', 'อัตราเร็วแสง', 'คงตัว', 'นาฬิกาแสง', 'dilation', 'contraction', 'ขอบเขต'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นการจำลองสัมพัทธภาพพิเศษ (S และ S′)',
        '[หกเหลี่ยม Preparation] INITIALISE c ← 299792458 m/s, β ← v/c, H ← 1 ls',
        '[ด้านขนาน Input] INPUT ความเร็วสัมพัทธ์ β (-0.95 ≤ β ≤ +0.95)',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไขขอบเขต |β| < 1.0 ?',
        '[สี่เหลี่ยม Process] คำนวณ γ = 1/√(1−β²), Δt = γΔτ, L = L₀/γ',
        '[วงรี Terminator] OUTPUT กราฟและส่งออก CSV',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] กำหนดให้ c′ = c + v และเวลาสัมบูรณ์ t′ = t เสมอ',
      ],
    },
    quantum_light: {
      title: 'จัดลำดับผังงานควอนตัมของแสง & วิเคราะห์พลังงานโฟตอน (Photoelectric)',
      hint: 'เรียงลำดับขั้นตอนจาก Preparation → Input → Decision E ≥ φ → Output (ระวังตัวลวงเรื่องความเข้มแสง)',
      prompt: 'อธิบายเหตุผลว่าเหตุใดการเพิ่มความเข้มแสงเพียงอย่างเดียวจึงไม่สามารถทำให้อิเล็กตรอนหลุดได้หากความถี่ยังต่ำกว่าขีดเริ่ม (f < φ/h):',
      keywords: ['โฟตอน', 'พลังค์', 'planck', 'ความถี่', 'work function', 'ฟังก์ชันงาน', 'ขีดเริ่ม', 'kmax', 'hf', 'คอมพ์ตัน', 'ความเข้ม', 'threshold'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองทฤษฎีควอนตัมของแสง',
        '[หกเหลี่ยม Preparation] INITIALISE h ← 6.626×10⁻³⁴ J·s, φ (Work Function)',
        '[ด้านขนาน Input] INPUT ความยาวคลื่นแสง λ (nm) และชนิดโลหะ',
        '[ข้าวหลามตัด Decision] ตรวจสอบพลังงานโฟตอน E = hc/λ > φ ?',
        '[สี่เหลี่ยม Process] คำนวณ Kmax = hf − φ และ λmin = hc/(eV)',
        '[วงรี Terminator] OUTPUT สเปกตรัมควอนตัมและจบ',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] เพิ่มความเข้มแสงเพียงอย่างเดียวเพื่อเพิ่มค่า Kmax แม้ความถี่ต่ำกว่าขีดเริ่ม',
      ],
    },
    matter_waves: {
      title: 'จัดลำดับผังงานคลื่นสสาร & วิเคราะห์หลักความไม่แน่นอนของไฮเซนเบิร์ก',
      hint: 'เรียงลำดับบล็อก ISO 5807 (ระวังตัวลวงที่ขัดแย้งกับ Δx·Δp ≥ ℏ/2)',
      prompt: 'อธิบายความสัมพันธ์ระหว่างความยาวคลื่นเดอบรอยล์ λ = h/p และเหตุใดเมื่อบีบความกว้างกลุ่มคลื่น Δx ให้แคบลง ความไม่แน่นอนของโมเมนตัม Δp จึงเพิ่มขึ้น:',
      keywords: ['เดอบรอยล์', 'de broglie', 'โมเมนตัม', 'λ = h/p', 'ความยาวคลื่น', 'ไฮเซนเบิร์ก', 'ไม่แน่นอน', 'Δx', 'Δp', 'กลุ่มคลื่น', 'มวล', 'แทรกสอด'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นการศึกษาสมบัติคลื่นของอนุภาค',
        '[หกเหลี่ยม Preparation] INITIALISE m (e⁻/p⁺/n), h, Δx, λ₀',
        '[ด้านขนาน Input] INPUT พลังงานจลน์ K (eV) หรือความกว้าง Δx (nm)',
        '[ข้าวหลามตัด Decision] ตรวจสอบ K > 0 และ Δx > 0 ?',
        '[สี่เหลี่ยม Process] คำนวณ λ = h/p และ Δp ≥ ℏ/(2Δx)',
        '[วงรี Terminator] OUTPUT คลื่นสสาร 3D และกลุ่มคลื่น',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] บีบ Δx ให้แคบลงพร้อมกับลด Δp ให้แคบลงพร้อมกันได้ไม่จำกัด',
      ],
    },
    electron_diffraction: {
      title: 'จัดลำดับผังงาน ISO 5807 ปฏิบัติการเลี้ยวเบนอิเล็กตรอน & Fail-Safe Reset',
      hint: 'เรียงลำดับ 8 บล็อกมาตรฐานจาก START → INITIALISE → INPUT Va → DECISION → COMPUTE → DELAY → CALL LinearRegression → FAIL-SAFE OFF & END',
      prompt: 'สรุปความสัมพันธ์ระหว่างแรงดันเร่ง Va กับรัศมีวงแหวนเลี้ยวเบน R₁, R₂ บนหลอดแกรไฟต์ รวมถึงความสำคัญของ Trace Table และ Fail-Safe Reset:',
      keywords: ['หดเล็กลง', 'เดอบรอยล์', 'แบรกก์', '2d sinθ', 'fail-safe', 'trace', 'dry run', 'polycrystalline', 'd10', 'd11', 'which-way', 'ทวิภาวะ'],
      expected_seq: [
        '[วงรี Terminator] START (Modern Physics Lab)',
        '[หกเหลี่ยม Preparation] INITIALISE Va ← 2.0 kV, MaxCycles ← 4, L ← 0.135 m',
        '[ด้านขนาน Input] INPUT Accelerating Voltage Va (kV)',
        '[ข้าวหลามตัด Decision] 2.0 <= Va <= 5.0 kV ?',
        '[สี่เหลี่ยม Process] COMPUTE λ = h/√(2mₑeVa) & R₁, R₂',
        '[รูปตัว D Delay] DELAY 1 SECOND (Measure Phosphor Ring)',
        '[สองขอบ Predefined] CALL LinearRegression_GraphFit(R, 1/√Va)',
        '[วงรี Terminator] FAIL-SAFE OFF & END',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] เปิดความต่างศักย์ EHT 6.0 kV ทิ้งไว้ตลอดโดยไม่ทำ Fail-Safe Reset',
      ],
    },
    atomic_models: {
      title: 'จัดลำดับผังงานแบบจำลองอะตอม (Rutherford × Bohr × Franck–Hertz)',
      hint: 'เรียงลำดับ 6 บล็อก ISO 5807 ให้ถูกต้อง (อย่าเลือกตัวลวงที่อิเล็กตรอนแผ่รังสีต่อเนื่อง)',
      prompt: 'สรุปหลักฐานสำคัญจากมุมกระเจิงรัทเทอร์ฟอร์ด สเปกตรัมไฮโดรเจนแบบจำลองโบร์ และร่องกระแส 4.9 V ของฟรังก์–เฮิรตซ์:',
      keywords: ['รัทเทอร์ฟอร์ด', 'rutherford', 'โบร์', 'bohr', 'ไฮโดรเจน', 'rydberg', 'balmer', 'บัลเมอร์', 'ฟรังก์', 'franck', '4.9', 'สเปกตรัม'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองแบบจำลองอะตอมและสเปกตรัม',
        '[หกเหลี่ยม Preparation] INITIALISE R_H ← 1.097×10⁷ m⁻¹, E₁ ← −13.6 eV, Z',
        '[ด้านขนาน Input] INPUT พารามิเตอร์ชน (E, b) หรือระดับพลังงาน (nᵢ, n_f)',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไข b > 0 และ nᵢ > n_f (คายโฟตอน) ?',
        '[สี่เหลี่ยม Process] คำนวณมุมกระเจิง θ, ΔE = Eᵢ − E_f และ λ = hc/ΔE',
        '[วงรี Terminator] OUTPUT เส้นสเปกตรัมและกราฟฟรังก์-เฮิรตซ์',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] ให้อิเล็กตรอนในวงโคจรโบร์แผ่คลื่นแม่เหล็กไฟฟ้าต่อเนื่องและยุบตัวลงสู่นิวเคลียสทันที',
      ],
    },
    quantum_mechanics: {
      title: 'จัดลำดับผังงานกลศาสตร์ควอนตัม 1 มิติ (Schrödinger & Tunneling)',
      hint: 'เรียงลำดับขั้นตอนจาก Preparation → Input → Decision Tunneling → Compute → Output (ระวังตัวลวง E₀ = 0)',
      prompt: 'อธิบายเหตุผลที่อนุภาคสามารถทะลุผ่านกำแพงศักย์เมื่อ E < V₀ (Tunneling) และเหตุใด E₀ ของฮาร์มอนิกจึงไม่เท่ากับศูนย์:',
      keywords: ['ชเรอดิงเงอร์', 'schrodinger', 'ψ', 'ความน่าจะเป็น', '|ψ|²', 'บ่ออนันต์', 'tunneling', 'ทะลุผ่าน', 'จุดศูนย์', 'zero-point', 'node', 'ปม'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองกลศาสตร์ควอนตัม 1 มิติ',
        '[หกเหลี่ยม Preparation] INITIALISE ℏ, m, ความกว้างบ่อ L, ความสูงกำแพง V₀',
        '[ด้านขนาน Input] INPUT เลขควอนตัม n, พลังงานอนุภาค E และความหนากำแพง a',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไข E < V₀ (Quantum Tunneling) ?',
        '[สี่เหลี่ยม Process] คำนวณ Eₙ = n²π²ℏ²/(2mL²), κ = √(2m(V₀−E))/ℏ และสัมประสิทธิ์ทะลุผ่าน T',
        '[วงรี Terminator] OUTPUT ฟังก์ชันคลื่น ψ(x,t) และความน่าจะเป็น |ψ|²',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] กำหนดให้พลังงานจุดศูนย์ของตัวแกว่งกวัดฮาร์มอนิก E₀ = 0 และ T = 0 เสมอเมื่อ E < V₀',
      ],
    },
    solid_state: {
      title: 'จัดลำดับผังงานโมเลกุลและฟิสิกส์ของแข็ง (Bands & Meissner Check)',
      hint: 'เรียงลำดับบล็อก ISO 5807 (ระวังตัวลวงที่เพิ่มอุณหภูมิเกิน Tc เพื่อทำให้เกิดตัวนำยวดยิ่ง)',
      prompt: 'อธิบายความแตกต่างระหว่างการนำไฟฟ้าของสารกึ่งตัวนำกับตัวนำเมื่อ T เพิ่มขึ้น และเงื่อนไขคู่ของสถานะตัวนำยวดยิ่ง:',
      keywords: ['มอร์ส', 'morse', 'ผลึก', 'fcc', 'bcc', 'ช่องว่างพลังงาน', 'band gap', 'eg', 'กึ่งตัวนำ', 'ตัวนำยวดยิ่ง', 'meissner', 'tc'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองฟิสิกส์โมเลกุลและสถานะของแข็ง',
        '[หกเหลี่ยม Preparation] INITIALISE Dₑ, ค่าคงที่แลตทิซ a, ช่องว่างพลังงาน Eg, Tc',
        '[ด้านขนาน Input] INPUT อุณหภูมิ T (K), สนามแม่เหล็ก B (T) และชนิดวัสดุ',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไขตัวนำยวดยิ่ง T < Tc และ B < Bc(T) ?',
        '[สี่เหลี่ยม Process] คำนวณศักย์มอร์ส U(r), การนำไฟฟ้า σ(T) ∝ exp(−Eg/2kBT) และ Bc(T)',
        '[วงรี Terminator] OUTPUT โครงผลึก 3D และการลอยตัวไมสเนอร์',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] เพิ่มอุณหภูมิ T ให้สูงกว่า Tc เพื่อลดความต้านทานของตัวนำยวดยิ่งเป็นศูนย์',
      ],
    },
    nuclear_physics: {
      title: 'จัดลำดับผังงานนิวเคลียร์และกัมมันตภาพรังสี (SEMF & Decay Law)',
      hint: 'เรียงลำดับ 6 บล็อกตรวจสอบกฎอนุรักษ์และคำนวณครึ่งชีวิต (ระวังตัวลวงที่กล่าวว่า T½ เปลี่ยนตาม N(t))',
      prompt: 'อธิบายเหตุผลที่ ⁵⁶Fe/⁶²Ni มีความเสถียรสูงสุดบนกราฟ B/A และเหตุใดครึ่งชีวิต T½ จึงเป็นค่าคงตัวเฉพาะตัวของนิวไคลด์:',
      keywords: ['รัศมี', 'มวลพร่อง', 'binding', 'ยึดเหนี่ยว', 'ครึ่งชีวิต', 'half-life', 'α', 'β', 'อนุรักษ์', 'fe', 'decay', 'n₀'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองโครงสร้างนิวเคลียสและกัมมันตภาพรังสี',
        '[หกเหลี่ยม Preparation] INITIALISE r₀ ← 1.2 fm, m_p, m_n, u ← 931.494 MeV, N₀',
        '[ด้านขนาน Input] INPUT เลขอะตอม Z, เลขมวล A, ชนิดการสลาย (α/β/γ) และครึ่งชีวิต T½',
        '[ข้าวหลามตัด Decision] ตรวจสอบการอนุรักษ์เลขมวล A และประจุ Z ก่อน-หลังสลาย ?',
        '[สี่เหลี่ยม Process] คำนวณมวลพร่อง Δm, พลังงานยึดเหนี่ยว B/A และ N(t) = N₀ exp(−λt)',
        '[วงรี Terminator] OUTPUT กราฟการสลายตัวและกัมมันตภาพ A(t)',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] กำหนดให้ครึ่งชีวิต T½ ลดลงตามจำนวนนิวเคลียสที่เหลืออยู่ N(t)',
      ],
    },
    particle_physics: {
      title: 'จัดลำดับผังงานฟิสิกส์อนุภาคมูลฐาน (Quarks & Standard Model)',
      hint: 'เรียงลำดับขั้นตอนจำแนกเฟอร์มิออน เกจโบซอน และตรรกะการกักขังสี (อย่าเลือกตัวลวงเรื่องการแยกควาร์กเดี่ยว)',
      prompt: 'สรุปส่วนประกอบควาร์กของโปรตอน (uud) และนิวตรอน (udd) ตัวกลางสื่อแรงทั้ง 4 และเหตุใดจึงไม่พบควาร์กเดี่ยวอิสระ:',
      keywords: ['ควาร์ก', 'quark', 'เลปตอน', 'lepton', 'โบซอน', 'boson', 'กลูออน', 'gluon', 'ฮิกส์', 'higgs', 'standard model', 'uud'],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองฟิสิกส์อนุภาคมูลฐานและ Standard Model',
        '[หกเหลี่ยม Preparation] INITIALISE ตารางเฟอร์มิออน 12 ชนิด, เกจโบซอน (γ, g, W±, Z⁰) และฮิกส์ H',
        '[ด้านขนาน Input] INPUT ชนิดแรงพื้นฐาน ระยะห่าง r (fm) หรือหมวดหมู่อนุภาค',
        '[ข้าวหลามตัด Decision] ตรวจสอบประจุไฟฟ้า Q, เลขแบริออน B และการกักขังสี (Confinement) ?',
        '[สี่เหลี่ยม Process] วิเคราะห์ตัวกลางแลกเปลี่ยนแรงและคำนวณสัดส่วนแรงตามระยะ r',
        '[วงรี Terminator] OUTPUT แบบจำลองมาตรฐาน 3D และกราฟมวลอนุภาค',
      ],
      distractors: [
        '[สี่เหลี่ยม Process] แยกควาร์กเดี่ยวให้หลุดเป็นอิสระด้วยแรงโน้มถ่วงในแบบจำลองมาตรฐาน',
      ],
    },
  };

  // Fallback assessment questions for static file:// or python3 -m http.server mode (answers kept inside closure, never rendered to DOM)
  const OFFLINE_CHALLENGE = [
    {
      id: 'q1',
      topic: 'Special Relativity (Light Clock & Lorentz γ)',
      question: 'ในห้องทดลองสัมพัทธภาพพิเศษ หากยานอวกาศเคลื่อนที่ด้วยความเร็ว β = 0.80c (γ = 1/√(1−0.8²) = 1.667) นาฬิกาแสงบนยานเดินผ่านไป Δτ = 3.00 s และยานมีความยาวแท้ L₀ = 10.0 m ผู้สังเกตในกรอบห้องทดลอง S จะวัดเวลา Δt และความยาว L ได้เท่าใด?',
      options: {
        A: 'Δt = 1.80 s และ L = 16.67 m',
        B: 'Δt = 5.00 s และ L = 6.00 m',
        C: 'Δt = 3.00 s และ L = 10.00 m',
        D: 'Δt = 5.00 s และ L = 10.00 m',
      },
      _k: 'B',
    },
    {
      id: 'q2',
      topic: 'Quantum Light (Photoelectric & Compton)',
      question: 'ในการทดลองปรากฏการณ์โฟโตอิเล็กทริก หากแสงสีแดงมีความยาวคลื่นยาวกว่าความยาวคลื่นขีดเริ่มของโลหะโซเดียม (hc/λ < φ) เมื่อเพิ่มความเข้มแสงเป็น 10 เท่า อิเล็กตรอนจะหลุดหรือไม่?',
      options: {
        A: 'หลุดทันที และมีพลังงานจลน์สูงสุด Kmax เพิ่มขึ้น 10 เท่า',
        B: 'ไม่หลุด เพราะพลังงานของโฟตอนเดี่ยว hf ต่ำกว่าฟังก์ชันงาน φ ไม่ขึ้นกับความเข้ม',
        C: 'หลุดได้เมื่อรอสะสมพลังงานความร้อนนานพอ',
        D: 'หลุดเฉพาะเมื่อต่อศักย์ต้านเป็นบวกมากๆ',
      },
      _k: 'B',
    },
    {
      id: 'q3',
      topic: 'Matter Waves & Heisenberg Uncertainty',
      question: 'ตามหลักความไม่แน่นอนของไฮเซนเบิร์ก Δx · Δp ≥ ℏ/2 หากบีบกลุ่มคลื่นของอนุภาคให้ความไม่แน่นอนของตำแหน่ง Δx แคบลงเหลือ 1/4 ของค่าเดิม ความไม่แน่นอนของโมเมนตัมขั้นต่ำ Δp จะเปลี่ยนอย่างไร?',
      options: {
        A: 'ลดลงเหลือ 1/4 ของค่าเดิม',
        B: 'เท่าเดิมไม่เปลี่ยนแปลง',
        C: 'เพิ่มขึ้นอย่างน้อย 4 เท่าของค่าเดิม',
        D: 'เพิ่มขึ้น 16 เท่าของค่าเดิม',
      },
      _k: 'C',
    },
    {
      id: 'q4',
      topic: 'Electron Diffraction & Bragg Law',
      question: 'ในการทดลองเลี้ยวเบนของอิเล็กตรอนผ่านแผ่นแกรไฟต์ (L = 13.5 cm) เมื่อเพิ่มความต่างศักย์เร่ง Vₐ จาก 2.0 kV เป็น 5.0 kV รัศมีวงแหวนเลี้ยวเบน R₁, R₂ บนฉากเรืองแสงจะเปลี่ยนอย่างไร และอัตราส่วน R₂/R₁ มีค่าเท่าใด?',
      options: {
        A: 'รัศมีขยายใหญ่ขึ้น และ R₂/R₁ ≈ 1.414',
        B: 'รัศมีหดเล็กลง (R ∝ 1/√Vₐ) และอัตราส่วน R₂/R₁ = d₁₀/d₁₁ ≈ √3 ≈ 1.732 คงตัว',
        C: 'รัศมีเท่าเดิม เพราะระยะ d₁₀, d₁₁ คงที่',
        D: 'รัศมีหดเล็กลงเฉพาะวงใน ส่วนวงนอกขยายตัว',
      },
      _k: 'B',
    },
    {
      id: 'q5',
      topic: 'Wave–Particle Duality & Trace Table Fail-Safe',
      question: 'ในการทดลองช่องแคบคู่ทีละอิเล็กตรอนและการออกแบบผังงาน/Trace Table ควบคุมหลอดทดลอง ข้อใดกล่าวถูกต้องที่สุดทั้งด้านควอนตัมและความปลอดภัยทางวิศวกรรม?',
      options: {
        A: 'เปิดเครื่องตรวจวัดเส้นทาง (Which-Way) ทำให้แถบแทรกสอดหายไปเหลือ 2 แถบ และจบวงวนควบคุมต้องทำ Fail-Safe Reset ปิด EHT ← OFF',
        B: 'เปิดเครื่องตรวจวัดเส้นทางทำให้แถบแทรกสอดชัดขึ้น และปล่อย EHT ค้างไว้ที่ 5.0 kV ได้เลย',
        C: 'อิเล็กตรอน 1 ตัวแทรกสอดเฉพาะเมื่อยิงพร้อมกัน 1,000 ตัวขึ้นไป และไม่จำเป็นต้องตรวจขอบเขต Vₐ',
        D: 'เปิด Which-Way Detector ไม่ส่งผลต่อฟังก์ชันคลื่น ψ₁ + ψ₂',
      },
      _k: 'A',
    },
    {
      id: 'q6',
      topic: 'Atomic Structure & Bohr / Franck–Hertz',
      question: 'ในแบบจำลองอะตอมไฮโดรเจนของโบร์ (Eₙ = −13.6/n² eV) การเปลี่ยนระดับจาก nᵢ = 3 → n_f = 2 (เส้น Hα) จะปล่อยโฟตอนพลังงานเท่าใด และในการทดลองฟรังก์–เฮิรตซ์ที่ใช้ไอปรอท ร่องกระแสลดลงทุกช่วงแรงดันกี่โวลต์?',
      options: {
        A: 'ดูดกลืนพลังงาน 1.89 eV และร่องกระแสห่างกันทุก 13.6 V',
        B: 'ปล่อยโฟตอนพลังงาน 1.89 eV (λ ≈ 656.3 nm) และร่องกระแสลดลงทุก ~4.9 V',
        C: 'ปล่อยโฟตอนพลังงาน 10.2 eV (λ ≈ 121.6 nm) และร่องกระแสห่างกันทุก 2.5 V',
        D: 'ปล่อยโฟตอนสเปกตรัมต่อเนื่องทุกความยาวคลื่นและกระแสเพิ่มขึ้นเป็นเส้นตรง',
      },
      _k: 'B',
    },
    {
      id: 'q7',
      topic: 'Introductory Quantum Mechanics (Wells & Tunneling)',
      question: 'สำหรับอนุภาคในบ่อศักย์อนันต์ 1 มิติกว้าง L (Eₙ = n²π²ℏ² / 2mL²) หากลดความกว้างบ่อลงเหลือ L/2 พลังงานระดับ n จะเปลี่ยนอย่างไร และตัวแกว่งกวัดฮาร์มอนิกควอนตัมมีพลังงานสถานะพื้น E₀ เท่าใด?',
      options: {
        A: 'พลังงานลดลงเหลือ 1/4 เท่า และ E₀ = 0',
        B: 'พลังงานเท่าเดิม และ E₀ = ℏω',
        C: 'พลังงานเพิ่มขึ้น 4 เท่า และ E₀ = ½ℏω (Zero-point energy > 0)',
        D: 'พลังงานเพิ่มขึ้น 2 เท่า และ E₀ = 0',
      },
      _k: 'C',
    },
    {
      id: 'q8',
      topic: 'Molecular & Solid-State Physics (Bands & Superconductors)',
      question: 'เหตุใดการนำไฟฟ้าของสารกึ่งตัวนำบริสุทธิ์ σ(T) ∝ exp(−Eg / 2kBT) จึงเพิ่มขึ้นเมื่ออุณหภูมิสูงขึ้น และเงื่อนไขครบถ้วนของการเกิดสถานะตัวนำยวดยิ่ง (Meissner Effect) คือข้อใด?',
      options: {
        A: 'เพราะอิเล็กตรอนข้ามช่องว่างพลังงาน Eg ไปยังแถบนำไฟฟ้าได้มากขึ้น และตัวนำยวดยิ่งต้องมีทั้ง T < Tc และ B < Bc(T)',
        B: 'เพราะอะตอมสั่นช้าลงเมื่อร้อนขึ้น และตัวนำยวดยิ่งเกิดขึ้นเมื่อ T > Tc',
        C: 'เพราะ Eg ขยายกว้างขึ้นตามอุณหภูมิ และเกิด Meissner ได้แม้สนามแม่เหล็ก B > Bc(T)',
        D: 'เพราะโลหะทุกชนิดลดความต้านทานลงเหลือ 0 ที่อุณหภูมิ 300 K',
      },
      _k: 'A',
    },
    {
      id: 'q9',
      topic: 'Nuclear Structure & Radioactivity',
      question: 'นิวเคลียสใดอยู่ใกล้จุดสูงสุดของกราฟพลังงานยึดเหนี่ยวต่อนิวคลีออน (B/A ≈ 8.8 MeV) และถ้าตั้งต้นด้วยนิวเคลียสกัมมันตรังสี N₀ = 8000 อะตอม เมื่อเวลาผ่านไป t = 3 T½ จะเหลือนิวเคลียสอยู่กี่อะตอม?',
      options: {
        A: '²³⁸U และเหลือ 2,000 อะตอม',
        B: '⁵⁶Fe / ⁶²Ni และเหลือ 1,000 อะตอม (12.5%)',
        C: '⁴He และเหลือ 2,667 อะตอม',
        D: '¹²C และเหลือ 0 อะตอม',
      },
      _k: 'B',
    },
    {
      id: 'q10',
      topic: 'Elementary Particle Physics & Standard Model',
      question: 'ในแบบจำลองมาตรฐาน (Standard Model) โปรตอนประกอบขึ้นจากควาร์กชนิดใด ตัวกลางใดสื่อแรงเข้มระหว่างควาร์ก และแรงพื้นฐานชนิดใดที่ Standard Model ยังไม่ครอบคลุม?',
      options: {
        A: 'uud (ประจุ +1e), กลูออน (g) สื่อแรงเข้ม, ยังไม่ครอบคลุมแรงโน้มถ่วง (Gravity)',
        B: 'udd (ประจุ +1e), โฟตอน (γ) สื่อแรงเข้ม, ยังไม่ครอบคลุมแรงแม่เหล็กไฟฟ้า',
        C: 'uuu (ประจุ +2e), W± สื่อแรงเข้ม, ยังไม่ครอบคลุมแรงอ่อน',
        D: 'uud (ประจุ +1e), ฮิกส์โบซอนสื่อแรงเข้ม, ครอบคลุมแรงโน้มถ่วงแล้ว',
      },
      _k: 'A',
    },
  ];

  const TRACE_EXPERIMENTS = {
    teltron_band: {
      tag: 'EXPERIMENT 4.1 • TELTRON EHT GUARD',
      title: 'Teltron EHT High-Voltage Safety Band (2.0 ≤ Va ≤ 5.0 kV)',
      desc: 'ไล่ค่าตัวแปรควบคุมหลอด Teltron ทีละรอบ (MaxCycles = 4) ตามเงื่อนไข 2.0 ≤ Va ≤ 5.0 kV พร้อมปิด Fail-Safe Reset ก่อนจบ',
      headers: ['Cycle', 'Va Input (kV)', '2.0 <= Va <= 5.0 ?', 'State / Output Action', 'EHT Flag'],
      activeNodes: [1, 2, 3, 4, 7],
      rows: [
        { cycle: '1', input: '1.5 kV', condAns: 'False', condOpts: ['True', 'False'], outAns: 'Standby', outOpts: ['Standby', 'Emit Beam', 'Fail-Safe OFF'], flagAns: 'WAIT' },
        { cycle: '2', input: '2.5 kV', condAns: 'True', condOpts: ['True', 'False'], outAns: 'Emit Beam', outOpts: ['Standby', 'Emit Beam', 'Fail-Safe OFF'], flagAns: 'ON' },
        { cycle: '3', input: '4.0 kV', condAns: 'True', condOpts: ['True', 'False'], outAns: 'Emit Beam', outOpts: ['Standby', 'Emit Beam', 'Fail-Safe OFF'], flagAns: 'ON' },
        { cycle: '4', input: '5.5 kV', condAns: 'False', condOpts: ['True', 'False'], outAns: 'Fail-Safe OFF', outOpts: ['Standby', 'Emit Beam', 'Fail-Safe OFF'], flagAns: 'OFF' },
      ],
    },
    debroglie_sweep: {
      tag: 'EXPERIMENT 4.2 • DE BROGLIE WAVELENGTH',
      title: 'de Broglie Wavelength λ & Inner Graphite Ring R₁ (L = 135 mm, d₁₀ = 213 pm)',
      desc: 'คำนวณค่า λ = 1226.4 / √Va(V) (pm) และรัศมีวงแหวนใน R₁ = L·λ / d₁₀ (mm) ที่ Va = 2.0, 3.0, 4.0, 5.0 kV (±0.6 tolerance)',
      headers: ['Cycle', 'Va (kV)', 'λ (pm) = 1226.4/√Va', 'R₁ (mm) ≈ Lλ/d₁₀', 'Trend vs Va'],
      activeNodes: [1, 2, 4, 5, 6],
      rows: [
        { cycle: '1', input: '2.0 kV', num1Ans: 27.4, num2Ans: 17.4, outAns: 'Largest Ring', outOpts: ['Largest Ring', 'Shrinking', 'Smallest Ring'] },
        { cycle: '2', input: '3.0 kV', num1Ans: 22.4, num2Ans: 14.2, outAns: 'Shrinking', outOpts: ['Largest Ring', 'Shrinking', 'Smallest Ring'] },
        { cycle: '3', input: '4.0 kV', num1Ans: 19.4, num2Ans: 12.3, outAns: 'Shrinking', outOpts: ['Largest Ring', 'Shrinking', 'Smallest Ring'] },
        { cycle: '4', input: '5.0 kV', num1Ans: 17.3, num2Ans: 11.0, outAns: 'Smallest Ring', outOpts: ['Largest Ring', 'Shrinking', 'Smallest Ring'] },
      ],
    },
    bragg_crystal: {
      tag: 'EXPERIMENT 4.3 • BRAGG POLYCRYSTALLINE RATIO',
      title: 'Poly-Crystalline Graphite Plane Ratio (d₁₀ = 0.213 nm, d₁₁ = 0.123 nm)',
      desc: 'ทวนสอบความคงตัวของอัตราส่วนวงแหวน R₂/R₁ = d₁₀/d₁₁ ≈ 1.732 และระบุผลเมื่อสิ้นสุดลูป MaxCycles = 4',
      headers: ['Cycle', 'Va (kV)', 'R₁ (mm)', 'R₂ (mm)', 'Ratio R₂/R₁ ≈ 1.732?'],
      activeNodes: [3, 4, 5, 6, 7],
      rows: [
        { cycle: '1', input: '2.5 kV', num1Ans: 15.5, num2Ans: 26.9, outAns: '1.732 (Valid)', outOpts: ['1.732 (Valid)', '1.414 (Error)', 'Fail-Safe OFF'] },
        { cycle: '2', input: '3.5 kV', num1Ans: 13.1, num2Ans: 22.7, outAns: '1.732 (Valid)', outOpts: ['1.732 (Valid)', '1.414 (Error)', 'Fail-Safe OFF'] },
        { cycle: '3', input: '4.5 kV', num1Ans: 11.6, num2Ans: 20.1, outAns: '1.732 (Valid)', outOpts: ['1.732 (Valid)', '1.414 (Error)', 'Fail-Safe OFF'] },
        { cycle: '4', input: 'Reset', num1Ans: 0, num2Ans: 0, outAns: 'Fail-Safe OFF', outOpts: ['1.732 (Valid)', '1.414 (Error)', 'Fail-Safe OFF'] },
      ],
    },
    double_slit: {
      tag: 'EXPERIMENT 4.4 • DOUBLE-SLIT DUALITY',
      title: 'Single-Electron Double-Slit Which-Way Collapse',
      desc: 'ติดตามสถานะการเกิดริ้วแทรกสอด (Interference) เทียบกับการยุบตัวของฟังก์ชันคลื่นเมื่อเปิด Which-Way Detector',
      headers: ['Trial', 'Which-Way Detector', 'Quantum Path Known?', 'Screen Pattern', 'Duality State'],
      activeNodes: [2, 3, 4, 5, 7],
      rows: [
        { cycle: '1', input: 'OFF', condAns: 'False', condOpts: ['True', 'False'], outAns: 'Interference Fringes', outOpts: ['Interference Fringes', '2-Band Particle'], flagAns: 'Wave Superposition' },
        { cycle: '2', input: 'ON', condAns: 'True', condOpts: ['True', 'False'], outAns: '2-Band Particle', outOpts: ['Interference Fringes', '2-Band Particle'], flagAns: 'Collapsed Particle' },
        { cycle: '3', input: 'OFF', condAns: 'False', condOpts: ['True', 'False'], outAns: 'Interference Fringes', outOpts: ['Interference Fringes', '2-Band Particle'], flagAns: 'Wave Superposition' },
        { cycle: '4', input: 'ON (End)', condAns: 'True', condOpts: ['True', 'False'], outAns: '2-Band Particle', outOpts: ['Interference Fringes', '2-Band Particle'], flagAns: 'Collapsed Particle' },
      ],
    },
  };

  let rosterList = DEFAULT_ROSTER.slice();
  let currentStudent = loadStoredStudent();
  let state = loadState(currentStudent && currentStudent.student_id ? currentStudent.student_id : 'guest');
  let activeTraceExp = 'teltron_band';
  let fc3NodesOrder = [0, 1, 2, 3, 4, 5];
  let psTimer = null;
  let psLine = 0;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function storageKey(sid) {
    return `mp2027_state:${sid || 'guest'}`;
  }

  function loadStoredStudent() {
    try {
      const raw = localStorage.getItem('mp2027_current_student');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function saveStoredStudent(stu) {
    currentStudent = stu;
    try {
      if (stu) localStorage.setItem('mp2027_current_student', JSON.stringify(stu));
      else localStorage.removeItem('mp2027_current_student');
    } catch (_) {}
    updateStudentBadge();
  }

  function defaultState() {
    return {
      completed: {
        relativity: false, quantum_light: false, matter_waves: false, electron_diffraction: false,
        atomic_models: false, quantum_mechanics: false, solid_state: false, nuclear_physics: false, particle_physics: false,
        challenge10: false,
      },
      attempts: {
        relativity: 0, quantum_light: 0, matter_waves: 0, electron_diffraction: 0,
        atomic_models: 0, quantum_mechanics: 0, solid_state: 0, nuclear_physics: 0, particle_physics: 0,
      },
      snapshot: {
        ipo_checked: false,
        four_tier_tested: false,
        pseudo_steps: 0,
        fc3_branch_tested: false,
        fc3_scenarios_done: 0,
        sandbox_tested: {},
        trace_answers: {},
        semi_answers: {},
      },
    };
  }

  function loadState(sid) {
    const def = defaultState();
    try {
      const raw = localStorage.getItem(storageKey(sid));
      if (!raw) return def;
      const parsed = JSON.parse(raw);
      return {
        completed: Object.assign({}, def.completed, parsed.completed || {}),
        attempts: Object.assign({}, def.attempts, parsed.attempts || {}),
        snapshot: Object.assign({}, def.snapshot, parsed.snapshot || {}, {
          sandbox_tested: Object.assign({}, (parsed.snapshot && parsed.snapshot.sandbox_tested) || {}),
          trace_answers: Object.assign({}, (parsed.snapshot && parsed.snapshot.trace_answers) || {}),
          semi_answers: Object.assign({}, (parsed.snapshot && parsed.snapshot.semi_answers) || {}),
        }),
      };
    } catch (_) {
      return def;
    }
  }

  function saveState() {
    const sid = currentStudent && currentStudent.student_id ? currentStudent.student_id : 'guest';
    try {
      localStorage.setItem(storageKey(sid), JSON.stringify(state));
    } catch (_) {}
    updateProgressUI();
  }

  function showToast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2800);
  }

  function trackPerEvent(moduleId, eventType, eventData = null, durationMs = 0) {
    const sid = (currentStudent && currentStudent.student_id) ? currentStudent.student_id : 'guest';
    const ev = { student_id: sid, module_id: moduleId || 'portal', event_type: eventType, event_data: eventData, duration_ms: durationMs };
    try {
      const q = JSON.parse(localStorage.getItem('mp2027_per_events') || '[]');
      q.push(Object.assign({ ts: new Date().toISOString() }, ev));
      localStorage.setItem('mp2027_per_events', JSON.stringify(q.slice(-200)));
    } catch (_) {}
    fetch('./api/per.php?action=log_event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ev),
    }).catch(() => {});
  }

  function applyPortalMode(mode) {
    const isConcept = mode === 'conceptual';
    document.body.classList.toggle('mode-conceptual', isConcept);
    document.body.classList.toggle('mode-equations', !isConcept);
    try { localStorage.setItem('mp2027_ui_mode', mode); } catch (_) {}
    const btn = $('#mode-toggle-btn');
    if (btn) {
      btn.textContent = isConcept ? '💡 โหมดแนวคิด (วิทย์ทั่วไป)' : '∑ โหมดสมการเชิงลึก';
      btn.classList.toggle('btn-teal', isConcept);
      btn.classList.toggle('btn-outline', !isConcept);
    }
  }

  async function apiJson(url, opts = {}) {
    const res = await fetch(url, opts);
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('application/json')) {
      throw new Error('STATIC_MODE');
    }
    const data = await res.json();
    if (!res.ok || data.ok === false) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    return data;
  }

  function updateStudentBadge() {
    const badge = $('#side-student-badge');
    const topBtn = $('#top-student-btn');
    if (currentStudent && currentStudent.student_id) {
      const label = `${currentStudent.student_id} ${currentStudent.full_name}`;
      if (badge) badge.textContent = label;
      if (topBtn) topBtn.textContent = `👤 ${currentStudent.full_name.slice(0, 14)}`;
    } else {
      if (badge) badge.textContent = 'ยังไม่ได้เลือกชื่อนักศึกษา';
      if (topBtn) topBtn.textContent = '👤 เลือกนักศึกษา';
    }
  }

  function updateProgressUI() {
    let doneCount = 0;
    CORE_MODULES.forEach((m) => {
      const ok = !!state.completed[m];
      if (ok) doneCount++;
      const navChk = $(`.nav-check[data-check="${m}"]`);
      if (navChk) {
        navChk.textContent = ok ? '✓' : '○';
        navChk.classList.toggle('done', ok);
      }
      const cardTag = $(`[data-card-status="${m}"]`);
      if (cardTag) {
        cardTag.textContent = ok ? 'ผ่านแล้ว ✓' : 'ยังไม่ส่ง';
        cardTag.className = `tag ${ok ? 'done' : 'soft'}`;
      }
    });

    const chOk = !!state.completed.challenge10;
    const chChk = $('.nav-check[data-check="challenge10"]');
    if (chChk) {
      chChk.textContent = chOk ? '✓' : '○';
      chChk.classList.toggle('done', chOk);
    }
    const chTag = $('[data-card-status="challenge10"]');
    if (chTag) {
      chTag.textContent = chOk ? 'ส่งผลแล้ว ✓' : 'วัดผล 10 ข้อ';
      chTag.className = `tag ${chOk ? 'done' : 'soft'}`;
    }

    const totalMods = CORE_MODULES.length;
    const progText = $('#side-prog-text');
    const progFill = $('#side-prog-fill');
    if (progText) progText.textContent = `${doneCount}/${totalMods}`;
    if (progFill) progFill.style.width = `${(doneCount / totalMods) * 100}%`;

    const pills = $('#sub-pills');
    if (pills) {
      pills.innerHTML = CORE_MODULES.map((m) => {
        const ok = !!state.completed[m];
        return `<span class="submit-pill ${ok ? 'done' : ''}">${m}: ${ok ? 'ผ่าน ✓' : 'รอตรวจ'}</span>`;
      }).join('');
    }
  }

  function switchPage(pageId) {
    $$('.page').forEach((p) => p.classList.toggle('active', p.dataset.page === pageId));
    $$('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.nav === pageId));
    $('#sidebar')?.classList.remove('open');
    $('#mobile-overlay')?.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== MODULE 01: SPECIAL RELATIVITY (IPO + FOUR-TIER) =====
  function runIpoPipeline() {
    const betaRaw = parseFloat($('#ipo-beta').value);
    const dtau = parseFloat($('#ipo-dtau').value) || 3.0;
    const l0 = parseFloat($('#ipo-l0').value) || 10.0;

    const bIn = $('#ipo-box-in');
    const bChk = $('#ipo-box-chk');
    const bProc = $('#ipo-box-proc');
    const bOut = $('#ipo-box-out');
    [bIn, bChk, bProc, bOut].forEach((b) => b.classList.remove('ok', 'err'));

    $('#ipo-res-in').textContent = `β = ${isNaN(betaRaw) ? 'NaN' : betaRaw.toFixed(2)}, Δτ = ${dtau.toFixed(1)}s, L₀ = ${l0.toFixed(1)}m`;

    if (isNaN(betaRaw)) {
      bIn.classList.add('err');
      bChk.classList.add('err');
      $('#ipo-res-chk').textContent = 'INVALID TYPE: ค่าไม่ใช่ตัวเลข';
      $('#ipo-res-proc').textContent = 'ข้ามการคำนวณ (Guard Halt)';
      $('#ipo-res-out').textContent = 'ERROR: กรุณาป้อนตัวเลข β';
      return;
    }

    if (Math.abs(betaRaw) >= 1.0) {
      bChk.classList.add('err');
      bProc.classList.add('err');
      $('#ipo-res-chk').textContent = `REJECTED (Erroneous): |β| = ${Math.abs(betaRaw).toFixed(2)} ≥ 1.0`;
      $('#ipo-res-proc').textContent = '1 − β² ≤ 0 → ป้องกันรากที่สองติดลบ';
      $('#ipo-res-out').textContent = 'ABORTED: วัตถุมีมวลเร็วเท่ากับ/เกิน c ไม่ได้';
      state.snapshot.ipo_checked = true;
      saveState();
      return;
    }

    const gamma = 1 / Math.sqrt(1 - betaRaw * betaRaw);
    const dt = gamma * dtau;
    const len = l0 / gamma;
    const isBoundary = Math.abs(betaRaw) >= 0.98;

    bIn.classList.add('ok');
    bChk.classList.add('ok');
    bProc.classList.add('ok');
    bOut.classList.add('ok');
    $('#ipo-res-chk').textContent = isBoundary
      ? `BOUNDARY PASS: |β| = ${Math.abs(betaRaw).toFixed(2)} (ใกล้ความเร็วแสง)`
      : `PASS: |β| = ${Math.abs(betaRaw).toFixed(2)} < 1.0`;
    $('#ipo-res-proc').textContent = `γ = ${gamma.toFixed(3)} → ยืดเวลา & หดสั้น`;
    $('#ipo-res-out').textContent = `Δt = ${dt.toFixed(2)} s, L = ${len.toFixed(2)} m`;

    state.snapshot.ipo_checked = true;
    saveState();
  }

  function initModule01() {
    $('#ipo-run-btn')?.addEventListener('click', runIpoPipeline);
    $$('.ipo-preset').forEach((btn) => {
      btn.addEventListener('click', () => {
        $('#ipo-beta').value = btn.dataset.beta;
        $('#ipo-dtau').value = btn.dataset.dtau;
        $('#ipo-l0').value = btn.dataset.l0;
        runIpoPipeline();
      });
    });

    $('#ft-check-btn')?.addEventListener('click', () => {
      const sels = $$('.ft-select');
      let okCount = 0;
      sels.forEach((s) => {
        s.classList.remove('cell-ok', 'cell-bad');
        const right = s.value === s.dataset.ans;
        s.classList.add(right ? 'cell-ok' : 'cell-bad');
        if (right) okCount++;
      });
      state.attempts.relativity = (state.attempts.relativity || 0) + 1;
      state.snapshot.four_tier_tested = true;
      state.snapshot.ipo_checked = true;
      const fb = $('#ft-feedback');
      if (okCount === sels.length) {
        state.completed.relativity = true;
        fb.className = 'feedback good';
        fb.textContent = `🎉 ถูกต้องครบทั้ง ${okCount}/${sels.length} กรณี! ผ่านกิจกรรม IPO & Four-Tier สัมพัทธภาพพิเศษแล้ว`;
      } else {
        fb.className = 'feedback bad';
        fb.textContent = `ถูกต้อง ${okCount}/${sels.length} กรณี — สังเกตความแตกต่างระหว่าง Boundary (ค่าขอบเขต 0.99c) กับ Erroneous (เกินจริง >1.0c)`;
      }
      saveState();
    });

    runIpoPipeline();
  }

  // ===== MODULE 02: QUANTUM LIGHT PSEUDOCODE RUNNER =====
  function stepPseudocode(nextLine) {
    const phi = parseFloat($('#ps-metal').value) || 2.14;
    const lam = parseFloat($('#ps-lambda').value) || 400;
    const ephot = 1239.84 / Math.max(1, lam);
    const lam0 = 1239.84 / phi;
    const cond = ephot >= phi;
    const kmax = cond ? ephot - phi : 0;

    if (nextLine == null) {
      if (psLine === 0) psLine = 1;
      else if (psLine < 5) psLine += 1;
      else if (psLine === 5) psLine = cond ? 6 : 7;
      else if (psLine === 6) psLine = 9;
      else if (psLine === 7) psLine = 8;
      else if (psLine === 8) psLine = 9;
      else psLine = 1;
    } else {
      psLine = nextLine;
    }

    $$('#ps-code-box .code-line').forEach((el) => {
      el.classList.toggle('active', Number(el.dataset.line) === psLine);
    });

    $('#w-pc').textContent = `Line 0${psLine}`;
    if (psLine >= 2) $('#w-phi').textContent = `${phi.toFixed(2)} eV`;
    if (psLine >= 3) $('#w-lam').textContent = `${lam.toFixed(0)} nm`;
    if (psLine >= 4) $('#w-ephot').textContent = `${ephot.toFixed(2)} eV`;
    if (psLine >= 5) $('#w-cond').textContent = cond ? 'TRUE (หลุด e⁻)' : 'FALSE (ต่ำกว่า φ)';
    if (psLine === 6 || psLine >= 8) {
      $('#w-kmax').textContent = cond ? `${kmax.toFixed(2)} eV (V_stop=${kmax.toFixed(2)}V)` : '0.00 eV (ไม่หลุด)';
      $('#w-lam0').textContent = `${lam0.toFixed(1)} nm`;
    }

    state.snapshot.pseudo_steps = (state.snapshot.pseudo_steps || 0) + 1;
    if (psLine === 9) {
      state.attempts.quantum_light = (state.attempts.quantum_light || 0) + 1;
      state.completed.quantum_light = true;
      const fb = $('#ps-feedback');
      fb.className = cond ? 'feedback good' : 'feedback info';
      fb.textContent = cond
        ? `✓ จบการทำงาน Line 09: โฟตอน E = ${ephot.toFixed(2)} eV ≥ φ = ${phi.toFixed(2)} eV → อิเล็กตรอนหลุดด้วย Kmax = ${kmax.toFixed(2)} eV`
        : `✓ จบการทำงาน Line 09 (Branch ELSE): โฟตอน E = ${ephot.toFixed(2)} eV < φ = ${phi.toFixed(2)} eV → ไม่มีโฟโตอิเล็กตรอน แม้เพิ่มความเข้ม 100%`;
    }
    saveState();
  }

  function resetPseudocode() {
    clearInterval(psTimer);
    psTimer = null;
    psLine = 0;
    $$('#ps-code-box .code-line').forEach((el) => el.classList.remove('active'));
    ['#w-phi', '#w-lam', '#w-ephot', '#w-cond', '#w-kmax', '#w-lam0'].forEach((id) => { $(id).textContent = '--'; });
    $('#w-pc').textContent = 'Ready';
    const fb = $('#ps-feedback');
    if (fb) fb.className = 'feedback';
  }

  function initModule02() {
    $('#ps-step-btn')?.addEventListener('click', () => stepPseudocode());
    $('#ps-reset-btn')?.addEventListener('click', resetPseudocode);
    $('#ps-run-btn')?.addEventListener('click', () => {
      resetPseudocode();
      psTimer = setInterval(() => {
        stepPseudocode();
        if (psLine === 9) {
          clearInterval(psTimer);
          psTimer = null;
        }
      }, 450);
    });
  }

  // ===== MODULE 03: MATTER WAVES ISO 5807 DRAGGABLE SVG + MULTI-BRANCH =====
  const FC3_META = [
    { id: 0, shape: 'term', text: 'START (Matter Wave Lab)', fill: '#e0f2fe', stroke: '#0284c7' },
    { id: 1, shape: 'prep', text: 'INITIALISE m (e⁻/p⁺/n), h, ℏ', fill: '#fef3c7', stroke: '#d97706' },
    { id: 2, shape: 'io', text: 'INPUT Kinetic Energy K & Δx', fill: '#e0e7ff', stroke: '#4f46e5' },
    { id: 3, shape: 'dec', text: 'K > 0 AND Δx > 0 ?', fill: '#fee2e2', stroke: '#dc2626' },
    { id: 4, shape: 'proc', text: 'COMPUTE λ = h/p & Δp ≥ ℏ/(2Δx)', fill: '#dcfce7', stroke: '#16a34a' },
    { id: 5, shape: 'term', text: 'OUTPUT Wave Packet & END', fill: '#e0f2fe', stroke: '#0284c7' },
  ];

  function renderFc3Svg() {
    const host = $('#fc3-svg-preview');
    if (!host) return;
    const h = fc3NodesOrder.length * 66 + 18;
    let body = `
      <svg viewBox="0 0 340 ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive ISO 5807 Flowchart">
        <defs>
          <marker id="fc3-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
          </marker>
        </defs>
        <rect x="0" y="0" width="340" height="${h}" rx="12" fill="#f8fafc"/>
    `;
    fc3NodesOrder.forEach((nodeIdx, pos) => {
      const m = FC3_META[nodeIdx];
      const y = 10 + pos * 66;
      const cx = 170;
      const cy = y + 21;
      let shapeEl = '';
      if (m.shape === 'term') {
        shapeEl = `<rect x="26" y="${y}" width="288" height="42" rx="21" fill="${m.fill}" stroke="${m.stroke}" stroke-width="2"/>`;
      } else if (m.shape === 'prep') {
        shapeEl = `<polygon points="44,${y} 296,${y} 316,${cy} 296,${y + 42} 44,${y + 42} 24,${cy}" fill="${m.fill}" stroke="${m.stroke}" stroke-width="2"/>`;
      } else if (m.shape === 'io') {
        shapeEl = `<polygon points="46,${y} 314,${y} 294,${y + 42} 26,${y + 42}" fill="${m.fill}" stroke="${m.stroke}" stroke-width="2"/>`;
      } else if (m.shape === 'dec') {
        shapeEl = `<polygon points="${cx},${y - 2} 314,${cy} ${cx},${y + 44} 26,${cy}" fill="${m.fill}" stroke="${m.stroke}" stroke-width="2"/>`;
      } else {
        shapeEl = `<rect x="26" y="${y}" width="288" height="42" rx="6" fill="${m.fill}" stroke="${m.stroke}" stroke-width="2"/>`;
      }
      body += `<g class="fc-drag-node" data-pos="${pos}" draggable="true">${shapeEl}<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${esc(m.text)}</text></g>`;
      if (pos < fc3NodesOrder.length - 1) {
        body += `<line x1="${cx}" y1="${y + 42}" x2="${cx}" y2="${y + 66}" stroke="#1e293b" stroke-width="2" marker-end="url(#fc3-arr)"/>`;
      }
    });
    body += '</svg>';
    host.innerHTML = body;

    let dragFrom = null;
    $$('.fc-drag-node', host).forEach((g) => {
      g.addEventListener('pointerdown', () => { dragFrom = Number(g.dataset.pos); g.classList.add('dragging'); });
      g.addEventListener('pointerup', () => {
        const to = Number(g.dataset.pos);
        g.classList.remove('dragging');
        if (dragFrom !== null && dragFrom !== to) {
          const tmp = fc3NodesOrder[dragFrom];
          fc3NodesOrder[dragFrom] = fc3NodesOrder[to];
          fc3NodesOrder[to] = tmp;
          renderFc3Svg();
        }
        dragFrom = null;
      });
    });
  }

  function initModule03() {
    renderFc3Svg();

    $('#fc3-shuffle-btn')?.addEventListener('change', (e) => {
      fc3NodesOrder = e.target.checked ? [0, 3, 1, 4, 2, 5] : [0, 1, 2, 3, 4, 5];
      renderFc3Svg();
    });

    $('#mw-verify-svg-btn')?.addEventListener('click', () => {
      const ok = fc3NodesOrder.every((v, i) => v === i);
      state.attempts.matter_waves = (state.attempts.matter_waves || 0) + 1;
      const fb = $('#fc3-feedback');
      if (ok) {
        state.snapshot.fc3_scenarios_done = Math.max(2, (state.snapshot.fc3_scenarios_done || 0) + 1);
        state.completed.matter_waves = true;
        fb.className = 'feedback good';
        fb.textContent = '✓ ลำดับผังงาน ISO 5807 สมบัติคลื่นอนุภาคถูกต้องสมบูรณ์! (START → PREP → INPUT → DECISION → COMPUTE → OUTPUT)';
      } else {
        fb.className = 'feedback bad';
        fb.textContent = 'ลำดับยังไม่ถูกต้อง ลองลากกล่องใน SVG สลับตำแหน่ง (คลิกค้างจากโหนดหนึ่งแล้วปล่อยบนโหนดปลายทาง) หรือปลดติ๊กสลับลำดับ';
      }
      saveState();
    });

    $('#mw-sim-btn')?.addEventListener('click', () => {
      const pType = $('#mw-particle').value;
      const kEv = parseFloat($('#mw-energy').value);
      const dxNm = parseFloat($('#mw-dx').value);
      const masses = { electron: 9.1093837e-31, proton: 1.6726219e-27, neutron: 1.6749275e-27 };
      const m = masses[pType] || masses.electron;
      const h = 6.62607015e-34;
      const hbar = h / (2 * Math.PI);
      const valid = kEv > 0 && dxNm > 0;

      if (!valid) {
        $('#mw-br-cond').textContent = 'FALSE Branch (K ≤ 0 หรือ Δx ≤ 0)';
        $('#mw-br-lam').textContent = 'UNDEFINED';
        $('#mw-br-dp').textContent = 'UNDEFINED';
        $('#mw-br-act').textContent = 'Guard Reject: ห้ามหารด้วย 0 หรือค่าลบ';
      } else {
        const kJ = kEv * 1.60217663e-19;
        const p = Math.sqrt(2 * m * kJ);
        const lamPm = (h / p) * 1e12;
        const dpMin = hbar / (2 * dxNm * 1e-9);
        $('#mw-br-cond').textContent = 'TRUE Branch (คำนวณคลื่นสสาร)';
        $('#mw-br-lam').textContent = `${lamPm.toFixed(3)} pm`;
        $('#mw-br-dp').textContent = `${dpMin.toExponential(2)} kg·m/s`;
        $('#mw-br-act').textContent = 'Plot Wave Packet & Fourier k-Spread';
      }
      state.snapshot.fc3_branch_tested = true;
      state.snapshot.fc3_scenarios_done = (state.snapshot.fc3_scenarios_done || 0) + 1;
      if (state.snapshot.fc3_scenarios_done >= 2 && fc3NodesOrder.every((v, i) => v === i)) {
        state.completed.matter_waves = true;
      }
      saveState();
    });
  }

  // ===== MODULE 04: ELECTRON DIFFRACTION & TRACE TABLE =====
  function renderTraceSvg(highlightStep = -1) {
    const box = $('#trace-svg-box');
    if (!box) return;
    const steps = [
      'START (Electron Diffraction Lab)',
      'INITIALISE Va ← 2.0 kV, MaxCycles ← 4, L ← 0.135m',
      'INPUT Accelerating Voltage Va (kV)',
      '2.0 <= Va <= 5.0 kV ?',
      'COMPUTE λ = h/√(2mₑeVa) & R₁, R₂',
      'DELAY 1s (Measure Phosphor Ring)',
      'CALL LinearRegression_GraphFit(R, 1/√Va)',
      'FAIL-SAFE OFF & END',
    ];
    const h = steps.length * 56 + 18;
    let svg = `<svg viewBox="0 0 340 ${h}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="tr-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/></marker></defs><rect x="0" y="0" width="340" height="${h}" rx="10" fill="#f8fafc"/>`;
    steps.forEach((txt, i) => {
      const y = 8 + i * 56;
      const active = i === highlightStep;
      const fill = active ? '#fde047' : i === 3 ? '#fee2e2' : i === 0 || i === 7 ? '#e0f2fe' : '#dcfce7';
      const stroke = active ? '#ea580c' : '#2563eb';
      svg += `<rect x="18" y="${y}" width="304" height="36" rx="${i === 0 || i === 7 ? 18 : 6}" fill="${fill}" stroke="${stroke}" stroke-width="${active ? 2.8 : 1.5}"/>`;
      svg += `<text x="170" y="${y + 22}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(txt)}</text>`;
      if (i < steps.length - 1) {
        svg += `<line x1="170" y1="${y + 36}" x2="170" y2="${y + 56}" stroke="#1e293b" stroke-width="1.5" marker-end="url(#tr-arr)"/>`;
      }
    });
    svg += '</svg>';
    box.innerHTML = svg;
  }

  function renderTraceTable() {
    const exp = TRACE_EXPERIMENTS[activeTraceExp];
    if (!exp) return;
    $('#trace-exp-tag').textContent = exp.tag;
    $('#trace-exp-title').textContent = exp.title;
    $('#trace-exp-desc').textContent = exp.desc;
    $('#trace-thead').innerHTML = `<tr>${exp.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>`;

    const saved = (state.snapshot.trace_answers && state.snapshot.trace_answers[activeTraceExp]) || null;
    const savedVals = (saved && saved.inputs) || {};

    $('#trace-tbody').innerHTML = exp.rows.map((r, rIdx) => {
      if (activeTraceExp === 'teltron_band' || activeTraceExp === 'double_slit') {
        const cKey = `r${rIdx}_c`;
        const oKey = `r${rIdx}_o`;
        const fKey = `r${rIdx}_f`;
        return `
          <tr data-row="${rIdx}">
            <td><strong>${esc(r.cycle)}</strong></td>
            <td><code>${esc(r.input)}</code></td>
            <td>
              <select class="trace-select tr-field" data-key="${cKey}" data-type="exact" data-ans="${esc(r.condAns)}">
                <option value="">-- เลือก --</option>
                ${r.condOpts.map((op) => `<option value="${esc(op)}" ${savedVals[cKey] === op ? 'selected' : ''}>${esc(op)}</option>`).join('')}
              </select>
            </td>
            <td>
              <select class="trace-select tr-field" data-key="${oKey}" data-type="exact" data-ans="${esc(r.outAns)}">
                <option value="">-- เลือก --</option>
                ${r.outOpts.map((op) => `<option value="${esc(op)}" ${savedVals[oKey] === op ? 'selected' : ''}>${esc(op)}</option>`).join('')}
              </select>
            </td>
            <td>
              <input class="trace-input tr-field" data-key="${fKey}" data-type="exact" data-ans="${esc(r.flagAns)}" value="${esc(savedVals[fKey] || '')}" placeholder="ระบุสถานะ..." />
            </td>
          </tr>
        `;
      }
      const n1Key = `r${rIdx}_n1`;
      const n2Key = `r${rIdx}_n2`;
      const oKey = `r${rIdx}_o`;
      return `
        <tr data-row="${rIdx}">
          <td><strong>${esc(r.cycle)}</strong></td>
          <td><code>${esc(r.input)}</code></td>
          <td><input type="number" step="0.1" class="trace-input tr-field" data-key="${n1Key}" data-type="num" data-ans="${r.num1Ans}" value="${esc(savedVals[n1Key] || '')}" placeholder="ตัวเลข" /></td>
          <td><input type="number" step="0.1" class="trace-input tr-field" data-key="${n2Key}" data-type="num" data-ans="${r.num2Ans}" value="${esc(savedVals[n2Key] || '')}" placeholder="ตัวเลข" /></td>
          <td>
            <select class="trace-select tr-field" data-key="${oKey}" data-type="exact" data-ans="${esc(r.outAns)}">
              <option value="">-- เลือก --</option>
              ${r.outOpts.map((op) => `<option value="${esc(op)}" ${savedVals[oKey] === op ? 'selected' : ''}>${esc(op)}</option>`).join('')}
            </select>
          </td>
        </tr>
      `;
    }).join('');

    const pill = $('#trace-score-pill');
    if (pill) {
      if (saved && typeof saved.score_pct === 'number') {
        pill.textContent = `${saved.score_pct}% ${saved.verified ? '✓' : ''}`;
        pill.className = `tag ${saved.verified ? 'done' : ''}`;
      } else {
        pill.textContent = 'ยังไม่ตรวจ';
        pill.className = 'tag soft';
      }
    }
    renderTraceSvg(-1);
  }

  function initModule04() {
    renderTraceTable();

    $$('#trace-exp-tabs .sub-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('#trace-exp-tabs .sub-tab').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeTraceExp = btn.dataset.exp;
        const fb = $('#trace-feedback');
        if (fb) fb.className = 'feedback';
        renderTraceTable();
      });
    });

    $('#trace-dryrun-btn')?.addEventListener('click', () => {
      const rows = $$('#trace-tbody tr');
      let step = 0;
      clearInterval(window._trTimer);
      window._trTimer = setInterval(() => {
        rows.forEach((r) => r.classList.remove('trace-active'));
        if (step < rows.length) {
          rows[step].classList.add('trace-active');
          renderTraceSvg(step + 2);
          step++;
        } else {
          renderTraceSvg(7);
          clearInterval(window._trTimer);
        }
      }, 650);
    });

    $('#trace-reset-btn')?.addEventListener('click', () => {
      $$('#trace-tbody .tr-field').forEach((el) => {
        el.value = '';
        el.classList.remove('cell-ok', 'cell-bad');
      });
      const fb = $('#trace-feedback');
      if (fb) fb.className = 'feedback';
    });

    $('#trace-check-btn')?.addEventListener('click', () => {
      const fields = $$('#trace-tbody .tr-field');
      let right = 0;
      const inputMap = {};
      fields.forEach((el) => {
        const val = (el.value || '').trim();
        inputMap[el.dataset.key] = val;
        el.classList.remove('cell-ok', 'cell-bad');
        let ok = false;
        if (el.dataset.type === 'num') {
          const num = parseFloat(val);
          const ans = parseFloat(el.dataset.ans);
          ok = !isNaN(num) && Math.abs(num - ans) <= 0.65;
        } else {
          ok = val.toLowerCase() === String(el.dataset.ans).trim().toLowerCase();
        }
        el.classList.add(ok ? 'cell-ok' : 'cell-bad');
        if (ok) right++;
      });

      const pct = Math.round((right / Math.max(1, fields.length)) * 100);
      const verified = pct >= 75;
      state.attempts.electron_diffraction = (state.attempts.electron_diffraction || 0) + 1;
      state.snapshot.trace_answers[activeTraceExp] = {
        verified,
        score_pct: pct,
        inputs: inputMap,
      };

      const verifiedCount = Object.values(state.snapshot.trace_answers).filter((v) => v && v.verified).length;
      if (verifiedCount >= 1) {
        state.completed.electron_diffraction = true;
      }

      const fb = $('#trace-feedback');
      fb.className = verified ? 'feedback good' : 'feedback bad';
      fb.textContent = verified
        ? `✓ ตรวจชุด ${activeTraceExp} ผ่าน ${right}/${fields.length} ช่อง (${pct}%) — ทวนสอบแล้ว ${verifiedCount}/4 ชุด`
        : `ถูกต้อง ${right}/${fields.length} ช่อง (${pct}%) — กรุณาตรวจสอบช่องสีแดง (ต้องได้อย่างน้อย 75%)`;

      renderTraceTable();
      // re-apply visual markers after re-render
      $$('#trace-tbody .tr-field').forEach((el) => {
        const ans = el.dataset.ans;
        const val = (el.value || '').trim();
        if (!val) return;
        const ok = el.dataset.type === 'num'
          ? (!isNaN(parseFloat(val)) && Math.abs(parseFloat(val) - parseFloat(ans)) <= 0.65)
          : (val.toLowerCase() === String(ans).trim().toLowerCase());
        el.classList.add(ok ? 'cell-ok' : 'cell-bad');
      });
      saveState();
    });
  }

  // ===== SHARED AI EVALUATION RENDERER & LOCAL GRADER FALLBACK =====
  function lcsLen(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    return dp[m][n];
  }

  function localHybridGrade(modKey, studentNote) {
    const keys = modKey === 'all' ? CORE_MODULES : [modKey];
    let totalSum = 0;
    let simSum = 0;
    let seqSum = 0;
    let subjSum = 0;
    const lines = [];

    keys.forEach((mk) => {
      const t = SEMI_TASKS[mk];
      const semi = (state.snapshot.semi_answers && state.snapshot.semi_answers[mk]) || {};
      const seq = Array.isArray(semi.seq) ? semi.seq : [];
      const text = (semi.text || studentNote || '').trim();
      const simScore = state.completed[mk] ? 38 : 15;
      const lcs = lcsLen(seq, t.expected_seq);
      const distractHits = seq.filter((s) => t.distractors.includes(s)).length;
      const seqScore = Math.max(0, Math.round((lcs / t.expected_seq.length) * 35 - distractHits * 8));
      let kwHits = 0;
      const low = text.toLowerCase();
      t.keywords.forEach((k) => { if (low.includes(k.toLowerCase())) kwHits++; });
      let subjScore = 0;
      if (text.length >= 25) subjScore = Math.min(25, 10 + kwHits * 3);
      else if (text.length > 0) subjScore = 8;

      const modTotal = Math.min(100, simScore + seqScore + subjScore);
      totalSum += modTotal;
      simSum += simScore;
      seqSum += seqScore;
      subjSum += subjScore;
      lines.push(`• ${mk}: ${modTotal}/100 (ทดลอง ${simScore}/40, เรียงบล็อก ${seqScore}/35, อธิบาย ${subjScore}/25)`);
    });

    const cnt = Math.max(1, keys.length);
    return {
      score: Math.round((totalSum / cnt) * 10) / 10,
      rubric: {
        simulation: Math.round((simSum / cnt) * 10) / 10,
        sequencing: Math.round((seqSum / cnt) * 10) / 10,
        subjective: Math.round((subjSum / cnt) * 10) / 10,
      },
      model: 'Browser Hybrid Fallback v1.0',
      feedback: `โหมดออฟไลน์/Static Preview (แนะนำเชื่อม PHP + SQLite สำหรับบันทึกจริง):\n${lines.join('\n')}`,
    };
  }

  function renderAiEvalHtml(res) {
    if (!res || res.ai_score == null) return '';
    const sc = Number(res.ai_score);
    const pillCls = sc >= 80 ? 'score-high' : sc >= 55 ? 'score-mid' : 'score-low';
    const r = res.ai_rubric || {};
    const sim = Number(r.simulation ?? 0);
    const seq = Number(r.sequencing ?? 0);
    const subj = Number(r.subjective ?? 0);
    return `
      <div class="ai-eval-card">
        <div class="ai-eval-head">
          <div class="ai-eval-title">🤖 ผลการประเมิน AI (${esc(res.ai_model || 'ModernPhysics2027 AI')})</div>
          <span class="ai-pill-badge ${pillCls}">คะแนน AI: ${sc.toFixed(1)} / 100</span>
        </div>
        <div class="ai-rubric-bars">
          <div class="ai-bar-row">
            <div class="ai-bar-label"><span>ห้องจำลอง &amp; Trace</span><strong>${sim}/40</strong></div>
            <div class="ai-bar-track"><div class="ai-bar-fill" style="width:${Math.min(100, (sim / 40) * 100)}%"></div></div>
          </div>
          <div class="ai-bar-row">
            <div class="ai-bar-label"><span>เรียงลำดับบล็อก</span><strong>${seq}/35</strong></div>
            <div class="ai-bar-track"><div class="ai-bar-fill" style="width:${Math.min(100, (seq / 35) * 100)}%"></div></div>
          </div>
          <div class="ai-bar-row">
            <div class="ai-bar-label"><span>เหตุผลทางฟิสิกส์</span><strong>${subj}/25</strong></div>
            <div class="ai-bar-track"><div class="ai-bar-fill" style="width:${Math.min(100, (subj / 25) * 100)}%"></div></div>
          </div>
        </div>
        <pre class="ai-feedback-pre">${esc(res.ai_feedback || '')}</pre>
      </div>
    `;
  }

  // ===== SEMI-STRUCTURED BUILDERS (PARSONS + REASONING) =====
  function renderSemiCard(target) {
    const modKey = target.dataset.semiModule;
    const cfg = SEMI_TASKS[modKey];
    if (!cfg) return;
    const saved = (state.snapshot.semi_answers && state.snapshot.semi_answers[modKey]) || { seq: [], text: '' };
    const seq = Array.isArray(saved.seq) ? saved.seq : [];
    const bank = [...cfg.expected_seq, ...cfg.distractors].sort();

    target.innerHTML = `
      <div class="subjective-card">
        <div class="panel-top" style="margin-bottom:8px;">
          <div>
            <div class="eyebrow">PARSONS BLOCK SEQUENCING &amp; EXPLANATION</div>
            <h3>${esc(cfg.title)}</h3>
          </div>
          <span class="tag">${seq.length}/${cfg.expected_seq.length} บล็อก</span>
        </div>
        <p style="margin:0 0 10px;font-size:13px;color:#7c4a10;">${esc(cfg.hint)}</p>

        <div class="semi-builder">
          <div class="semi-col">
            <div class="semi-col-title">1) ลำดับขั้นตอนที่เลือกไว้ (คลิกลบ/ย้ายลำดับได้)</div>
            <div class="semi-seq">
              ${seq.length === 0
                ? '<div class="empty-state" style="padding:12px;">คลิกเลือกบล็อกจากด้านขวาตามลำดับ...</div>'
                : seq.map((item, idx) => `
                  <div class="semi-seq-item">
                    <span class="semi-num">${idx + 1}</span>
                    <span class="semi-txt">${esc(item)}</span>
                    <div class="semi-actions">
                      <button type="button" class="semi-btn" data-act="up" data-idx="${idx}" title="เลื่อนขึ้น">▲</button>
                      <button type="button" class="semi-btn" data-act="down" data-idx="${idx}" title="เลื่อนลง">▼</button>
                      <button type="button" class="semi-btn del" data-act="del" data-idx="${idx}" title="ลบ">✕</button>
                    </div>
                  </div>
                `).join('')}
            </div>
          </div>

          <div class="semi-col">
            <div class="semi-col-title">2) คลังบล็อก (รวมตัวลวง 1 ข้อ — ห้ามเลือกตัวลวง!)</div>
            <div class="semi-bank">
              ${bank.map((item) => {
                const used = seq.includes(item);
                return `<button type="button" class="semi-bank-btn ${used ? 'used' : ''}" data-add="${esc(item)}" ${used ? 'disabled' : ''}>${used ? '✓ ' : '+ '}${esc(item)}</button>`;
              }).join('')}
            </div>
          </div>
        </div>

        <label style="display:block;font-size:13px;font-weight:750;margin-top:14px;">3) ${esc(cfg.prompt)}</label>
        <textarea class="subjective-input" rows="3" placeholder="เขียนคำอธิบายหลักฟิสิกส์และขั้นตอนวิธี...">${esc(saved.text || '')}</textarea>
      </div>

      <div class="module-submit-bar">
        <div>
          <strong style="font-size:14px;">พร้อมส่งโมดูล ${esc(modKey)} แล้วหรือยัง?</strong>
          <div style="font-size:12px;color:var(--muted);">ระบบจะบันทึกลง SQLite/MySQL และให้ AI ประเมินคะแนน 3 ด้านทันที</div>
        </div>
        <button type="button" class="btn btn-primary btn-small semi-direct-submit">📤 ส่งงานโมดูลนี้ให้ AI ตรวจทันที</button>
      </div>
      <div class="semi-ai-out"></div>
    `;

    $$('[data-add]', target).forEach((btn) => {
      btn.addEventListener('click', () => {
        const cur = state.snapshot.semi_answers[modKey] || { seq: [], text: '' };
        cur.seq = [...(cur.seq || []), btn.dataset.add];
        state.snapshot.semi_answers[modKey] = cur;
        const isDist = cfg.distractors.includes(btn.dataset.add);
        trackPerEvent(modKey, isDist ? 'distractor_hit' : 'parsons_add', { block: btn.dataset.add });
        saveState();
        renderSemiCard(target);
      });
    });

    $$('.semi-btn', target).forEach((btn) => {
      btn.addEventListener('click', () => {
        const cur = state.snapshot.semi_answers[modKey] || { seq: [], text: '' };
        const arr = [...(cur.seq || [])];
        const i = Number(btn.dataset.idx);
        const act = btn.dataset.act;
        if (act === 'del') arr.splice(i, 1);
        else if (act === 'up' && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        else if (act === 'down' && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
        cur.seq = arr;
        state.snapshot.semi_answers[modKey] = cur;
        saveState();
        renderSemiCard(target);
      });
    });

    $('.subjective-input', target)?.addEventListener('input', (e) => {
      const cur = state.snapshot.semi_answers[modKey] || { seq: [], text: '' };
      cur.text = e.target.value;
      state.snapshot.semi_answers[modKey] = cur;
      saveState();
    });

    $('.semi-direct-submit', target)?.addEventListener('click', () => {
      if (!currentStudent || !currentStudent.student_id) {
        openSubmitModal(modKey);
        showToast('กรุณาเลือกชื่อนักศึกษาก่อนส่งงาน');
        return;
      }
      submitToServer(modKey, $('.subjective-input', target)?.value || '', $('.semi-ai-out', target));
    });
  }

  function injectSemiCards() {
    $$('.semi-target').forEach(renderSemiCard);
  }

  // ===== MODULE 05: ASSESSMENT CHALLENGE =====
  function renderChallengeQuestions(questions) {
    const form = $('#ch-form');
    if (!form) return;
    form.innerHTML = questions.map((q, idx) => `
      <div class="panel" style="margin:0;padding:15px;">
        <div class="eyebrow" style="margin-bottom:4px;">ข้อ ${idx + 1} • ${esc(q.topic)}</div>
        <div style="font-size:14px;font-weight:750;margin-bottom:10px;">${esc(q.question)}</div>
        <div class="ch-options">
          ${Object.entries(q.options).map(([k, txt]) => `
            <label class="ch-option">
              <input type="radio" name="ch_${esc(q.id)}" value="${esc(k)}" />
              <span><strong>${esc(k)}.</strong> ${esc(txt)}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  async function initModule05() {
    let loadedQuestions = OFFLINE_CHALLENGE;
    try {
      const res = await apiJson('./api/challenge.php');
      if (Array.isArray(res.questions) && res.questions.length > 0) {
        loadedQuestions = res.questions;
      }
    } catch (_) {
      loadedQuestions = OFFLINE_CHALLENGE;
    }
    renderChallengeQuestions(loadedQuestions);

    $('#ch-submit-btn')?.addEventListener('click', async () => {
      if (!currentStudent || !currentStudent.student_id) {
        openSubmitModal('challenge10');
        showToast('กรุณาเลือกชื่อนักศึกษาก่อนส่งแบบทดสอบ');
        return;
      }

      const answers = {};
      for (const q of loadedQuestions) {
        const picked = $(`input[name="ch_${q.id}"]:checked`);
        if (!picked) {
          showToast(`กรุณาตอบคำถามให้ครบทั้ง ${loadedQuestions.length} ข้อ`);
          return;
        }
        answers[q.id] = picked.value;
      }
      const note = ($('#ch-note')?.value || '').trim();
      const outFb = $('#ch-result');
      const outBox = $('#ch-ai-box');

      try {
        const res = await apiJson('./api/challenge.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_id: currentStudent.student_id,
            full_name: currentStudent.full_name,
            section: currentStudent.section,
            answers,
            student_note: note,
          }),
        });
        state.completed.challenge10 = true;
        saveState();
        outFb.className = 'feedback good';
        outFb.textContent = res.message || 'บันทึกคำตอบเรียบร้อยแล้ว';
        outBox.innerHTML = res.ai_safe_feedback ? `<div class="ai-eval-card"><pre class="ai-feedback-pre">${esc(res.ai_safe_feedback)}</pre></div>` : '';
      } catch (err) {
        if (err.message === 'STATIC_MODE') {
          let right = 0;
          OFFLINE_CHALLENGE.forEach((q) => { if (answers[q.id] === q._k) right++; });
          state.completed.challenge10 = true;
          saveState();
          saveLocalSubmission({
            module_id: 'challenge10',
            ai_score: Math.round((right / OFFLINE_CHALLENGE.length) * 100),
            ai_feedback: `โหมด Static Preview: ผ่าน ${right}/${OFFLINE_CHALLENGE.length} ข้อ`,
            ai_model: 'Browser Hybrid Fallback v1.0',
            status: 'graded',
          });
          outFb.className = 'feedback good';
          outFb.textContent = `ส่งแบบทดสอบแล้ว (Static Fallback): ผ่าน ${right}/${OFFLINE_CHALLENGE.length} หัวข้อ`;
          outBox.innerHTML = '';
        } else {
          outFb.className = 'feedback bad';
          outFb.textContent = err.message;
        }
      }
    });
  }

  // ===== SUBMISSION MODAL, ROSTER & HISTORY =====
  function saveLocalSubmission(entry) {
    try {
      const list = JSON.parse(localStorage.getItem('mp2027_local_submissions') || '[]');
      list.unshift(Object.assign({
        id: Date.now(),
        student_id: currentStudent?.student_id || 'guest',
        full_name: currentStudent?.full_name || 'ผู้เรียนทั่วไป',
        section: currentStudent?.section || '',
        submitted_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      }, entry));
      localStorage.setItem('mp2027_local_submissions', JSON.stringify(list.slice(0, 40)));
    } catch (_) {}
  }

  async function submitToServer(modKey, noteText, targetContainer) {
    if (!currentStudent || !currentStudent.student_id || !currentStudent.full_name) {
      showToast('กรุณาเลือกนักศึกษาก่อนส่ง');
      return;
    }

    const payload = {
      student_id: currentStudent.student_id,
      full_name: currentStudent.full_name,
      section: currentStudent.section || '',
      module_id: modKey || 'all',
      student_note: noteText || '',
      completed: state.completed,
      attempts: state.attempts,
      snapshot: state.snapshot,
      client_time: new Date().toISOString(),
    };

    try {
      const res = await apiJson('./api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (targetContainer) targetContainer.innerHTML = renderAiEvalHtml(res);
      showToast(res.message || 'ส่งงานเรียบร้อยแล้ว');
      return res;
    } catch (err) {
      if (err.message === 'STATIC_MODE') {
        const localRes = localHybridGrade(modKey || 'all', noteText || '');
        const mockPayload = {
          module_id: modKey || 'all',
          ai_score: localRes.score,
          ai_rubric: localRes.rubric,
          ai_feedback: localRes.feedback,
          ai_model: localRes.model,
          status: 'graded',
        };
        saveLocalSubmission(mockPayload);
        if (targetContainer) targetContainer.innerHTML = renderAiEvalHtml(mockPayload);
        showToast('บันทึกผลในเบราว์เซอร์แล้ว (Static Fallback)');
        return mockPayload;
      }
      showToast(`ส่งงานไม่สำเร็จ: ${err.message}`);
      return null;
    }
  }

  function populateStudentDropdown() {
    const sec = $('#sub-section-filter')?.value || '';
    const sel = $('#sub-student-select');
    if (!sel) return;
    const filtered = sec ? rosterList.filter((s) => s.section === sec) : rosterList;
    sel.innerHTML = `<option value="">-- เลือกนักศึกษา (${filtered.length} คน) --</option>` +
      filtered.map((s) => `<option value="${esc(s.student_id)}">${esc(s.student_id)} — ${esc(s.full_name)} (${esc(s.section)})</option>`).join('');
    if (currentStudent && currentStudent.student_id) {
      sel.value = currentStudent.student_id;
    }
  }

  async function loadRoster() {
    try {
      const res = await apiJson('./api/submit.php?action=roster');
      if (Array.isArray(res.students) && res.students.length > 0) {
        rosterList = res.students;
      }
    } catch (_) {
      rosterList = DEFAULT_ROSTER.slice();
    }
    populateStudentDropdown();
  }

  async function loadHistory() {
    const host = $('#history-list');
    const lbl = $('#hist-student-label');
    if (!host) return;
    const sid = ($('#sub-student-id')?.value || currentStudent?.student_id || '').trim();
    if (!sid) {
      if (lbl) lbl.textContent = 'กรุณาเลือกรหัสนักศึกษาก่อนดูประวัติ';
      host.innerHTML = '<div class="empty-state">ยังไม่ระบุรหัสนักศึกษา</div>';
      return;
    }
    if (lbl) lbl.textContent = `ประวัติของ: ${sid}`;

    let rows = [];
    try {
      const res = await apiJson(`./api/submit.php?student_id=${encodeURIComponent(sid)}`);
      rows = res.submissions || [];
    } catch (_) {
      try {
        rows = JSON.parse(localStorage.getItem('mp2027_local_submissions') || '[]').filter((r) => r.student_id === sid);
      } catch (_) { rows = []; }
    }

    if (rows.length === 0) {
      host.innerHTML = '<div class="empty-state">ยังไม่มีประวัติการส่งงานในระบบ</div>';
      return;
    }

    host.innerHTML = rows.map((r) => `
      <div class="history-card">
        <div class="history-card-top">
          <strong>${esc(r.module_id)} (#${esc(r.id)})</strong>
          <span class="badge badge-${esc(r.status || 'submitted')}">${esc(r.status || 'submitted')}</span>
        </div>
        <div class="history-meta">
          <span>เวลา: ${esc(r.submitted_at || '')}</span>
          <span>AI Score: <strong>${r.ai_score != null ? r.ai_score : '--'}</strong></span>
          <span>Teacher Score: <strong>${r.teacher_score != null ? r.teacher_score : '--'}</strong></span>
        </div>
        ${r.ai_feedback ? `<div class="history-feedback"><pre class="ai-feedback-pre">${esc(r.ai_feedback)}</pre></div>` : ''}
      </div>
    `).join('');
  }

  function openSubmitModal(preselectMod = 'all') {
    const dlg = $('#submit-dialog');
    if (!dlg) return;
    if ($('#sub-module-id') && preselectMod) $('#sub-module-id').value = preselectMod;
    if (currentStudent) {
      if ($('#sub-student-id')) $('#sub-student-id').value = currentStudent.student_id || '';
      if ($('#sub-full-name')) $('#sub-full-name').value = currentStudent.full_name || '';
    }
    updateProgressUI();
    dlg.showModal();
  }

  function initSubmissionModal() {
    $('#open-submit-modal')?.addEventListener('click', () => openSubmitModal('all'));
    $('#top-student-btn')?.addEventListener('click', () => openSubmitModal('all'));
    $('#close-submit-dialog')?.addEventListener('click', () => $('#submit-dialog')?.close());

    $$('[data-stab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-stab]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const isHist = btn.dataset.stab === 'history';
        $('#stab-submit').style.display = isHist ? 'none' : 'block';
        $('#stab-history').style.display = isHist ? 'block' : 'none';
        if (isHist) loadHistory();
      });
    });

    $('#sub-section-filter')?.addEventListener('change', populateStudentDropdown);
    $('#sub-student-select')?.addEventListener('change', (e) => {
      const found = rosterList.find((s) => s.student_id === e.target.value);
      if (found) {
        $('#sub-student-id').value = found.student_id;
        $('#sub-full-name').value = found.full_name;
        saveStoredStudent(found);
        state = loadState(found.student_id);
        updateProgressUI();
        renderTraceTable();
        injectSemiCards();
      }
    });

    $('#confirm-submit-btn')?.addEventListener('click', async () => {
      const sid = $('#sub-student-id').value.trim();
      const name = $('#sub-full-name').value.trim();
      const sec = $('#sub-section-filter').value || (rosterList.find((s) => s.student_id === sid)?.section || '661/วิทย์');
      if (!sid || !name) {
        showToast('กรุณากรอกรหัสและชื่อนักศึกษา');
        return;
      }
      saveStoredStudent({ student_id: sid, full_name: name, section: sec });
      const modId = $('#sub-module-id').value || 'all';
      const note = $('#sub-note').value || '';
      const res = await submitToServer(modId, note, $('#sub-modal-ai-card'));
      const fb = $('#sub-modal-feedback');
      if (res && fb) {
        fb.className = 'feedback good';
        fb.textContent = res.message || 'ส่งงานเรียบร้อยแล้ว!';
      }
    });

    $('#refresh-history-btn')?.addEventListener('click', loadHistory);
  }

  function initGlobalEvents() {
    $$('[data-nav]').forEach((btn) => btn.addEventListener('click', () => switchPage(btn.dataset.nav)));
    $$('[data-go]').forEach((el) => el.addEventListener('click', () => switchPage(el.dataset.go)));

    $('#mobile-menu-btn')?.addEventListener('click', () => {
      $('#sidebar')?.classList.toggle('open');
      $('#mobile-overlay')?.classList.toggle('open');
    });
    $('#mobile-overlay')?.addEventListener('click', () => {
      $('#sidebar')?.classList.remove('open');
      $('#mobile-overlay')?.classList.remove('open');
    });

    $('#export-json-btn')?.addEventListener('click', () => {
      const manifest = window.MP27Solvers
        ? window.MP27Solvers.buildResearchManifest({ module: 'portal', solver: 'ct-lab04-hybrid', parameters: { ui_mode: localStorage.getItem('mp2027_ui_mode') || 'equations' }, diagnostics: { completed: state.completed } })
        : null;
      const blob = new Blob([JSON.stringify({ manifest, student: currentStudent, state }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `modernphysics2027_${currentStudent?.student_id || 'guest'}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  function initModules05To09() {
    // 05 Atomic Models
    const runAtomic = (saveProgress = false) => {
      const E = Math.max(0.5, parseFloat($('#am-energy')?.value) || 5);
      const b = Math.max(0.1, parseFloat($('#am-impact')?.value) || 7);
      const ni = Math.max(2, parseInt($('#am-ni')?.value || '3', 10));
      const nf = Math.max(1, parseInt($('#am-nf')?.value || '2', 10));
      const theta = 2 * Math.atan((8.98755e9 * 2 * 79 * 1.60218e-19) / (2 * E * 1e6 * b * 1e-15)) * (180 / Math.PI);
      const dE = (-13.6 / (nf * nf)) - (-13.6 / (ni * ni));
      const lam = Math.abs(dE) > 1e-9 ? 1239.842 / Math.abs(dE) : 0;
      const out = $('#am-out');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>Rutherford Scattering θ (Au Z=79)</span><span class="watch-val">${theta.toFixed(2)}°</span></div>
          <div class="watch-row"><span>Bohr Transition (${ni} → ${nf})</span><span class="watch-val">${dE < 0 ? 'EMIT' : dE > 0 ? 'ABSORB' : 'NONE'} |ΔE| = ${Math.abs(dE).toFixed(3)} eV</span></div>
          <div class="watch-row"><span>Hydrogen Spectral λ = hc/|ΔE|</span><span class="watch-val">${lam > 0 ? lam.toFixed(1) + ' nm' : '--'}</span></div>
        `;
      }
      if (saveProgress) {
        state.attempts.atomic_models = (state.attempts.atomic_models || 0) + 1;
        state.snapshot.sandbox_tested.atomic_models = true;
        state.completed.atomic_models = true;
        saveState();
        showToast('บันทึกผล Module 05 เรียบร้อย ✓');
      }
    };
    $('#am-calc-btn')?.addEventListener('click', () => runAtomic(true));
    runAtomic(false);

    // 06 Quantum Mechanics I
    const runQm = (saveProgress = false) => {
      const n = Math.max(1, parseInt($('#qm-n')?.value || '2', 10));
      const L = Math.max(0.5, parseFloat($('#qm-L')?.value) || 4);
      const E = Math.max(0.05, parseFloat($('#qm-E')?.value) || 2.6);
      const V = Math.max(0.1, parseFloat($('#qm-V')?.value) || 4.0);
      const a = 1.2;
      const En = (n * n * Math.PI * Math.PI) / (2 * L * L);
      let T = 1;
      if (Math.abs(E - V) < 1e-6) T = 1 / (1 + (V * a * a) / 2);
      else if (E < V) {
        const z = Math.sqrt(2 * (V - E)) * a;
        const sh = Math.sinh(Math.min(100, z));
        T = 1 / (1 + (V * V * sh * sh) / (4 * E * (V - E)));
      } else {
        const z = Math.sqrt(2 * (E - V)) * a;
        const sn = Math.sin(z);
        T = 1 / (1 + (V * V * sn * sn) / (4 * E * (E - V)));
      }
      const out = $('#qm-out');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>1D Infinite Well Eₙ (ℏ=m=1)</span><span class="watch-val">E_${n} = ${En.toFixed(3)} (Nodes: ${n - 1})</span></div>
          <div class="watch-row"><span>Regime (E vs V₀)</span><span class="watch-val">${E < V ? 'Quantum Tunneling (E < V₀)' : 'Over-Barrier (E ≥ V₀)'}</span></div>
          <div class="watch-row"><span>Transmission T / Reflection R</span><span class="watch-val">T = ${T.toFixed(5)} / R = ${(1 - T).toFixed(5)}</span></div>
        `;
      }
      if (saveProgress) {
        state.attempts.quantum_mechanics = (state.attempts.quantum_mechanics || 0) + 1;
        state.snapshot.sandbox_tested.quantum_mechanics = true;
        state.completed.quantum_mechanics = true;
        saveState();
        showToast('บันทึกผล Module 06 เรียบร้อย ✓');
      }
    };
    $('#qm-calc-btn')?.addEventListener('click', () => runQm(true));
    runQm(false);

    // 07 Solid State Physics
    const runSs = (saveProgress = false) => {
      const T = parseFloat($('#ss-T')?.value) || 40;
      const Tc = Math.max(1, parseFloat($('#ss-Tc')?.value) || 90);
      const B = Math.max(0, parseFloat($('#ss-B')?.value) || 0.2);
      const Bc0 = Math.max(0.05, parseFloat($('#ss-Bc0')?.value) || 0.7);
      const BcT = T < Tc ? Bc0 * (1 - Math.pow(T / Tc, 2)) : 0;
      const isSC = T < Tc && B < BcT;
      const out = $('#ss-out');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>Critical Field Bc(T) = Bc(0)[1−(T/Tc)²]</span><span class="watch-val">${BcT.toFixed(3)} T</span></div>
          <div class="watch-row"><span>Decision: (T &lt; Tc) AND (B &lt; Bc(T))</span><span class="watch-val">${isSC ? 'TRUE → Superconducting (R = 0, Meissner)' : 'FALSE → Normal State'}</span></div>
        `;
      }
      if (saveProgress) {
        state.attempts.solid_state = (state.attempts.solid_state || 0) + 1;
        state.snapshot.sandbox_tested.solid_state = true;
        state.completed.solid_state = true;
        saveState();
        showToast('บันทึกผล Module 07 เรียบร้อย ✓');
      }
    };
    $('#ss-calc-btn')?.addEventListener('click', () => runSs(true));
    runSs(false);

    // 08 Nuclear Physics
    const runNp = (saveProgress = false) => {
      const Z = Math.max(1, parseInt($('#np-Z')?.value || '26', 10));
      const A = Math.max(Z, parseInt($('#np-A')?.value || '56', 10));
      const N0 = Math.max(1, parseFloat($('#np-N0')?.value) || 8000);
      const nHalf = Math.max(0, parseFloat($('#np-half-n')?.value) || 3);
      const R = 1.2 * Math.cbrt(A);
      let pairing = A % 2 ? 0 : (Z % 2 === 0 ? 11.18 / Math.sqrt(A) : -11.18 / Math.sqrt(A));
      const bind = A <= 1 ? 0 : (15.75 * A - 17.8 * Math.pow(A, 2 / 3) - 0.711 * Z * (Z - 1) / Math.cbrt(A) - 23.7 * Math.pow(A - 2 * Z, 2) / A + pairing);
      const Nt = N0 * Math.pow(2, -nHalf);
      const out = $('#np-out');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>Nuclear Radius R ≈ 1.2 A^(1/3)</span><span class="watch-val">${R.toFixed(3)} fm (N = ${A - Z})</span></div>
          <div class="watch-row"><span>Binding Energy per Nucleon (SEMF B/A)</span><span class="watch-val">${(bind / A).toFixed(3)} MeV/A</span></div>
          <div class="watch-row"><span>Remaining Nuclei N(t) = N₀·2^(−t/T½)</span><span class="watch-val">${Nt.toFixed(1)} (${((Nt / N0) * 100).toFixed(2)}%)</span></div>
        `;
      }
      if (saveProgress) {
        state.attempts.nuclear_physics = (state.attempts.nuclear_physics || 0) + 1;
        state.snapshot.sandbox_tested.nuclear_physics = true;
        state.completed.nuclear_physics = true;
        saveState();
        showToast('บันทึกผล Module 08 เรียบร้อย ✓');
      }
    };
    $('#np-calc-btn')?.addEventListener('click', () => runNp(true));
    runNp(false);

    // 09 Elementary Particle Physics
    const runPp = (saveProgress = false) => {
      const hMap = {
        uud: { q: '+1 e', b: '+1', label: 'Proton (u + u + d = +2/3 + 2/3 − 1/3)' },
        udd: { q: '0', b: '+1', label: 'Neutron (u + d + d = +2/3 − 1/3 − 1/3)' },
        uuu: { q: '+2 e', b: '+1', label: 'Delta++ (u + u + u = +2/3 × 3)' },
        udbar: { q: '+1 e', b: '0', label: 'Pion+ Meson (u + anti-d = +2/3 + 1/3)' },
      };
      const fMap = {
        strong: 'Gluon (g, 8 color states) · Range ~1 fm (Color Confinement)',
        em: 'Photon (γ, massless) · Infinite range (1/r²)',
        weak: 'W± / Z⁰ Bosons (~80–91 GeV/c²) · Changes quark flavor',
        gravity: 'NOT in Standard Model (Graviton hypothetical, negligible at particle scale)',
      };
      const h = hMap[$('#pp-hadron')?.value] || hMap.uud;
      const f = fMap[$('#pp-force')?.value] || fMap.strong;
      const out = $('#pp-out');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>Hadron Composition</span><span class="watch-val">${esc(h.label)}</span></div>
          <div class="watch-row"><span>Net Charge Q / Baryon B</span><span class="watch-val">Q = ${esc(h.q)} , B = ${esc(h.b)}</span></div>
          <div class="watch-row"><span>Force Mediator</span><span class="watch-val">${esc(f)}</span></div>
        `;
      }
      if (saveProgress) {
        state.attempts.particle_physics = (state.attempts.particle_physics || 0) + 1;
        state.snapshot.sandbox_tested.particle_physics = true;
        state.completed.particle_physics = true;
        saveState();
        showToast('บันทึกผล Module 09 เรียบร้อย ✓');
      }
    };
    $('#pp-calc-btn')?.addEventListener('click', () => runPp(true));
    runPp(false);
  }

  const OFFLINE_PRETEST = [
    { id: 'p1', topic: 'Special Relativity', question: '[Pre-Test] ยานอวกาศเคลื่อนที่ด้วยความเร็ว β = 0.60c (γ = 1.25) วัดเวลาบนยานได้ Δτ = 4.00 s ผู้สังเกตบนโลกจะวัดอัตราเร็วแสงและเวลา Δt ได้อย่างไร?', options: { A: 'อัตราเร็วแสงเป็น c + 0.60c และ Δt = 3.20 s', B: 'อัตราเร็วแสงคงที่ c และ Δt = 5.00 s', C: 'อัตราเร็วแสงคงที่ c และ Δt = 4.00 s', D: 'อัตราเร็วแสงเป็น 0.40c และ Δt = 5.00 s' }, _k: 'B' },
    { id: 'p2', topic: 'Quantum Light', question: '[Pre-Test] ฉายแสงพลังงานโฟตอน > φ ลงบนโลหะ หากลดความเข้มแสงลงครึ่งหนึ่งโดยใช้ความยาวคลื่นเดิม Kmax จะเป็นอย่างไร?', options: { A: 'ลดลงครึ่งหนึ่ง', B: 'เท่าเดิม เพราะ Kmax = hf − φ ไม่ขึ้นกับความเข้มแสง', C: 'เพิ่มขึ้น 2 เท่า', D: 'อิเล็กตรอนหยุดหลุด' }, _k: 'B' },
    { id: 'p3', topic: 'Matter Waves', question: '[Pre-Test] หากบีบกลุ่มคลื่นให้อันแน่น Δx แคบลงเหลือครึ่งหนึ่ง (1/2) ความไม่แน่นอนขั้นต่ำของโมเมนตัม Δp จะเป็นอย่างไร?', options: { A: 'ลดลง 1/2', B: 'คงเดิม', C: 'เพิ่มขึ้นอย่างน้อย 2 เท่า ตาม Δx·Δp ≥ ℏ/2', D: 'เป็นศูนย์' }, _k: 'C' },
    { id: 'p4', topic: 'Electron Diffraction', question: '[Pre-Test] เมื่อลดแรงดันเร่ง Vₐ จาก 4.0 kV ลงเหลือ 2.0 kV ความยาวคลื่นเดอบรอยล์ λ และรัศมีวงแหวนเลี้ยวเบน R จะเปลี่ยนอย่างไร?', options: { A: 'λ สั้นลงและ R หดลง', B: 'λ ยาวขึ้นและ R ขยายใหญ่ขึ้น (R ∝ 1/√Vₐ)', C: 'คงเดิมตลอด', D: 'วงแหวนหายไป' }, _k: 'B' },
    { id: 'p5', topic: 'Wave–Particle Duality', question: '[Pre-Test] ถ้ายิงอิเล็กตรอนทีละตัวผ่านช่องแคบคู่โดยปิดตัวตรวจจับเส้นทาง (Which-Way OFF) เมื่อสะสมมากพอจะเกิดลวดลายใด?', options: { A: 'ริ้วแทรกสอดมืด–สว่างสลับกัน', B: 'แถบสว่างเพียง 2 แถบเท่านั้น', C: 'กระจายสุ่มไม่เป็นริ้ว', D: 'ไม่ผ่านช่องแคบ' }, _k: 'A' },
    { id: 'p6', topic: 'Atomic Structure', question: '[Pre-Test] เหตุใดสเปกตรัมของก๊าซไฮโดรเจนจึงปรากฏเป็น "เส้นสเปกตรัม" แยกขาดจากกัน?', options: { A: 'เพราะอิเล็กตรอนมีระดับพลังงานไม่ต่อเนื่องและปล่อยโฟตอน ΔE = hc/λ', B: 'เพราะกระจกหลอดดูดกลืนแสง', C: 'เพราะนิวเคลียสหมุนคงที่', D: 'เพราะแผ่คลื่นแม่เหล็กไฟฟ้าต่อเนื่อง' }, _k: 'A' },
    { id: 'p7', topic: 'Quantum Mechanics', question: '[Pre-Test] เมื่ออนุภาคพลังงาน E < V₀ วิ่งชนกำแพงศักย์ความกว้างจำกัด a ตามกลศาสตร์ควอนตัมจะเกิดอะไรขึ้น?', options: { A: 'สะท้อนกลับ 100% เสมอ', B: 'มีโอกาสทะลุผ่านกำแพง (Quantum Tunneling, T > 0)', C: 'หยุดนิ่งในกำแพง', D: 'พลังงาน E เพิ่มเกิน V₀ เอง' }, _k: 'B' },
    { id: 'p8', topic: 'Solid-State Physics', question: '[Pre-Test] ตัวนำยวดยิ่ง (Superconductor) จะยังคงสถานะ R = 0 และ Meissner Effect ได้เมื่อใด?', options: { A: 'เมื่อ T < Tc ไม่ว่า B จะแรงเท่าใด', B: 'เมื่อทั้ง T < Tc และ B < Bc(T)', C: 'เมื่อ T > Tc', D: 'เฉพาะในสุญญากาศ' }, _k: 'B' },
    { id: 'p9', topic: 'Nuclear Physics', question: '[Pre-Test] นิวเคลียสกัมมันตรังสีมี T½ = 10 วัน เริ่มต้น 4,000 อะตอม ผ่านไป 20 วัน จะเหลือกี่อะตอมและ T½ เปลี่ยนหรือไม่?', options: { A: '2,000 อะตอม, T½ เหลือ 5 วัน', B: '1,000 อะตอม, T½ คงเดิม 10 วัน', C: '0 อะตอม', D: '1,000 อะตอม, T½ เป็น 20 วัน' }, _k: 'B' },
    { id: 'p10', topic: 'Particle Physics', question: '[Pre-Test] นิวตรอน (n) มีประจุ 0 ประกอบด้วยควาร์กชุดใด และเหตุใดจึงไม่พบควาร์กเดี่ยวอิสระ?', options: { A: 'udd และถูกกักขังด้วยแรงเข้มผ่านกลูออน (Color Confinement)', B: 'uud และยึดด้วยแรงโน้มถ่วง', C: 'uuu และแยกอิสระได้', D: 'ไม่มีควาร์กภายใน' }, _k: 'A' },
  ];

  let preStartMs = Date.now();
  async function initPreTest() {
    let qs = OFFLINE_PRETEST;
    try {
      const res = await apiJson('./api/per.php?action=pretest');
      if (Array.isArray(res.questions) && res.questions.length > 0) qs = res.questions;
    } catch (_) {}

    const form = $('#pre-form');
    if (form) {
      form.innerHTML = qs.map((q, idx) => `
        <div class="panel" style="margin:0;padding:15px;">
          <div class="eyebrow" style="margin-bottom:4px;">ข้อ ${idx + 1} • ${esc(q.topic)}</div>
          <div style="font-size:14px;font-weight:750;margin-bottom:10px;">${esc(q.question)}</div>
          <div class="ch-options">
            ${Object.entries(q.options).map(([k, txt]) => `
              <label class="ch-option">
                <input type="radio" name="pre_${esc(q.id)}" value="${esc(k)}" />
                <span><strong>${esc(k)}.</strong> ${esc(txt)}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    setInterval(() => {
      const sec = Math.floor((Date.now() - preStartMs) / 1000);
      const pill = $('#pre-timer-pill');
      if (pill) pill.textContent = `เวลา: ${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
    }, 1000);

    $('#pre-submit-btn')?.addEventListener('click', async () => {
      if (!currentStudent || !currentStudent.student_id) {
        openSubmitModal('all');
        showToast('กรุณาเลือกชื่อนักศึกษาก่อนส่งแบบทดสอบก่อนเรียน');
        return;
      }
      const answers = {};
      for (const q of qs) {
        const picked = $(`input[name="pre_${q.id}"]:checked`);
        if (!picked) { showToast(`กรุณาตอบ Pre-Test ให้ครบทั้ง ${qs.length} ข้อ`); return; }
        answers[q.id] = picked.value;
      }
      const durSec = Math.max(1, Math.floor((Date.now() - preStartMs) / 1000));
      const fb = $('#pre-result');
      try {
        const res = await apiJson('./api/per.php?action=submit_pretest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_id: currentStudent.student_id,
            full_name: currentStudent.full_name,
            section: currentStudent.section || '661/วิทย์',
            answers,
            duration_sec: durSec,
          }),
        });
        state.completed.pretest = true;
        saveState();
        fb.className = 'feedback good';
        fb.textContent = res.message || 'บันทึก Pre-Test เรียบร้อยแล้ว';
      } catch (err) {
        if (err.message === 'STATIC_MODE') {
          let right = 0;
          OFFLINE_PRETEST.forEach((q) => { if (answers[q.id] === q._k) right++; });
          state.completed.pretest = true;
          saveState();
          trackPerEvent('pretest', 'pretest_submit', { score_pct: Math.round((right / OFFLINE_PRETEST.length) * 100) }, durSec * 1000);
          fb.className = 'feedback good';
          fb.textContent = `บันทึก Pre-Test แล้ว (Static Preview: ${right}/${OFFLINE_PRETEST.length} ข้อ)`;
        } else {
          fb.className = 'feedback bad';
          fb.textContent = err.message;
        }
      }
    });
  }

  function initResearchLab() {
    if (!window.MP27Solvers) return;
    const S = window.MP27Solvers;
    let lastFitManifest = null;

    $$('[data-rbtab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-rbtab]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        ['tdse', 'mc', 'fit'].forEach((k) => {
          const p = $(`#rb-panel-${k}`);
          if (p) p.style.display = k === btn.dataset.rbtab ? 'block' : 'none';
        });
      });
    });

    const runTdse = () => {
      const cv = $('#rb-tdse-canvas');
      if (!cv) return;
      const res = S.solveTdse1D({
        potentialType: $('#rb-tdse-pot')?.value || 'single_barrier',
        V0: parseFloat($('#rb-tdse-v0')?.value) || 4.5,
        k0: parseFloat($('#rb-tdse-k0')?.value) || 2.8,
        steps: parseInt($('#rb-tdse-steps')?.value || '100', 10),
      });
      const w = cv.clientWidth || 720, h = 260, dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = w * dpr; cv.height = h * dpr;
      const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
      ctx.fillStyle = '#081422'; ctx.fillRect(0, 0, w, h);
      const maxP = Math.max(0.25, ...res.probDensity);
      const maxV = Math.max(1, ...res.V);
      const X = (xi) => 44 + ((xi + 16) / 32) * (w - 64);
      const Y = (p) => h - 28 - (p / (maxP * 1.15)) * (h - 50);

      // Potential V(x)
      ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.6;
      ctx.beginPath();
      res.x.forEach((xi, i) => {
        const y = h - 28 - (res.V[i] / maxV) * (h - 50) * 0.7;
        i ? ctx.lineTo(X(xi), y) : ctx.moveTo(X(xi), y);
      });
      ctx.stroke(); ctx.setLineDash([]);

      // Probability |psi|^2
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.4;
      ctx.beginPath();
      res.x.forEach((xi, i) => (i ? ctx.lineTo(X(xi), Y(res.probDensity[i])) : ctx.moveTo(X(xi), Y(res.probDensity[i]))));
      ctx.stroke();

      ctx.fillStyle = '#bfe8ff'; ctx.font = '11px monospace';
      ctx.fillText('Blue: |ψ(x,t)|² (Split-Step FFT)   Yellow dashed: V(x)', 50, 18);

      const out = $('#rb-tdse-readouts');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>Norm Conservation ∫|ψ|²dx</span><span class="watch-val">${res.normCheck.toFixed(6)}</span></div>
          <div class="watch-row"><span>Transmission T / Reflection R</span><span class="watch-val">T = ${res.transmissionT.toFixed(4)} / R = ${res.reflectionR.toFixed(4)}</span></div>
          <div class="watch-row"><span>⟨x⟩ / Δx·Δp (≥ 0.5)</span><span class="watch-val">${res.expectX.toFixed(2)} / ${res.uncertaintyProduct.toFixed(3)}</span></div>
        `;
      }
      trackPerEvent('research_lab', 'tdse_solve', { pot: $('#rb-tdse-pot')?.value, T: Number(res.transmissionT.toFixed(4)) });
    };
    $('#rb-tdse-run')?.addEventListener('click', runTdse);
    runTdse();

    const runMc = () => {
      const cv = $('#rb-mc-canvas');
      if (!cv) return;
      const seed = parseInt($('#rb-mc-seed')?.value || '2027', 10);
      const N0 = parseFloat($('#rb-mc-n0')?.value) || 1000;
      const halfLife = parseFloat($('#rb-mc-half')?.value) || 8.0;
      const res = S.simulateMonteCarloDecay({ seed, N0, halfLife });

      const w = cv.clientWidth || 720, h = 260, dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = w * dpr; cv.height = h * dpr;
      const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
      ctx.fillStyle = '#081422'; ctx.fillRect(0, 0, w, h);
      const tMax = res.series[res.series.length - 1].t || 1;
      const X = (t) => 50 + (t / tMax) * (w - 72);
      const Y = (n) => h - 28 - (n / (N0 * 1.1)) * (h - 52);

      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
      ctx.beginPath();
      res.series.forEach((p, i) => (i ? ctx.lineTo(X(p.t), Y(p.analyticalN)) : ctx.moveTo(X(p.t), Y(p.analyticalN))));
      ctx.stroke();

      res.series.forEach((p) => {
        const px = X(p.t), py = Y(p.observedNoisy), dy = (p.sigma / (N0 * 1.1)) * (h - 52);
        ctx.strokeStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(px, py - dy); ctx.lineTo(px, py + dy); ctx.stroke();
        ctx.fillStyle = '#34d399'; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#bfe8ff'; ctx.font = '11px monospace';
      ctx.fillText(`Blue: Exact N₀e^(−λt)   Green/Yellow: Poisson MC ±√N (seed=${seed})`, 52, 18);

      const out = $('#rb-mc-readouts');
      if (out) {
        out.innerHTML = `
          <div class="watch-row"><span>Seed / Decay Constant λ</span><span class="watch-val">${seed} / ${res.lambda.toFixed(5)}</span></div>
          <div class="watch-row"><span>Reduced Chi-Square (χ²ν)</span><span class="watch-val">${res.chi2Reduced.toFixed(3)}</span></div>
        `;
      }
      trackPerEvent('research_lab', 'mc_run', { seed, chi2_red: Number(res.chi2Reduced.toFixed(3)) });
    };
    $('#rb-mc-run')?.addEventListener('click', runMc);
    runMc();

    const runFit = () => {
      const cv = $('#rb-fit-canvas');
      const raw = $('#rb-csv-text')?.value || '';
      const pts = S.parseExperimentalCsv(raw);
      const out = $('#rb-fit-readouts');
      if (pts.length < 3) {
        if (out) out.innerHTML = '<div class="empty-state">ต้องมีข้อมูลอย่างน้อย 3 จุด</div>';
        return;
      }
      const model = $('#rb-fit-model')?.value || 'exponential_decay';
      const fit = S.fitExperimentalData(pts, model);

      if (cv) {
        const w = cv.clientWidth || 720, h = 260, dpr = Math.min(devicePixelRatio || 1, 2);
        cv.width = w * dpr; cv.height = h * dpr;
        const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
        ctx.fillStyle = '#081422'; ctx.fillRect(0, 0, w, h);
        const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
        const xmin = Math.min(...xs), xmax = Math.max(...xs) || 1;
        const ymin = Math.min(0, ...ys), ymax = Math.max(...ys) * 1.12 || 1;
        const X = (v) => 54 + ((v - xmin) / (xmax - xmin || 1)) * (w - 76);
        const Y = (v) => h - 28 - ((v - ymin) / (ymax - ymin || 1)) * (h - 52);

        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.4;
        ctx.beginPath();
        fit.fittedCurve.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Y(p.yFit)) : ctx.moveTo(X(p.x), Y(p.yFit))));
        ctx.stroke();

        pts.forEach((p) => {
          ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 4.2, 0, Math.PI * 2); ctx.fill();
        });
        ctx.fillStyle = '#bfe8ff'; ctx.font = '11px monospace';
        ctx.fillText(`${fit.modelLabel}  |  R² = ${fit.r2.toFixed(5)}  |  χ²ν = ${fit.reducedChi2.toFixed(3)}`, 56, 18);
      }

      if (out) {
        out.innerHTML = fit.params.map((pr) => `<div class="watch-row"><span>${esc(pr.name)}</span><span class="watch-val">${pr.value.toPrecision(5)} ± ${pr.se.toPrecision(3)}</span></div>`).join('') +
          `<div class="watch-row"><span>Goodness of Fit (R² / RMSE / χ²ν)</span><span class="watch-val">${fit.r2.toFixed(5)} / ${fit.rmse.toFixed(3)} / ${fit.reducedChi2.toFixed(3)}</span></div>`;
      }
      lastFitManifest = S.buildResearchManifest({ module: 'research_lab', solver: `LM_${model}`, parameters: fit.params, diagnostics: { r2: fit.r2, rmse: fit.rmse, reducedChi2: fit.reducedChi2 } });
    };

    $('#rb-fit-run')?.addEventListener('click', runFit);
    $('#rb-csv-file')?.addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => { $('#rb-csv-text').value = String(r.result || ''); runFit(); };
      r.readAsText(f);
    });
    $('#rb-csv-sample')?.addEventListener('click', () => {
      $('#rb-fit-model').value = 'exponential_decay';
      $('#rb-csv-text').value = '0, 1000, 31.6\n4, 708, 26.6\n8, 492, 22.2\n12, 358, 18.9\n16, 245, 15.6\n20, 180, 13.4\n24, 122, 11.0';
      runFit();
    });
    $('#rb-fair-export')?.addEventListener('click', () => {
      if (!lastFitManifest) runFit();
      const blob = new Blob([JSON.stringify(lastFitManifest, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `mp2027_fair_manifest_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    runFit();
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateStudentBadge();
    updateProgressUI();
    applyPortalMode(localStorage.getItem('mp2027_ui_mode') || 'equations');
    $('#mode-toggle-btn')?.addEventListener('click', () => {
      const next = document.body.classList.contains('mode-conceptual') ? 'equations' : 'conceptual';
      applyPortalMode(next);
      trackPerEvent('portal', 'mode_switch', { mode: next });
    });
    initGlobalEvents();
    initPreTest();
    initModule01();
    initModule02();
    initModule03();
    initModule04();
    initModules05To09();
    initResearchLab();
    injectSemiCards();
    initModule05();
    initSubmissionModal();
    loadRoster();
  });
})();
