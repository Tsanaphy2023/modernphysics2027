(() => {
  'use strict';

  const MODULE_CONFIG = {
    relativity: {
      title: '01 ทฤษฎีสัมพัทธภาพพิเศษ — CT & ISO 5807 Workflow',
      nodes: [
        'START (Relativity 3D)',
        'INIT c, β = v/c, L₀',
        'INPUT β (-0.95..0.95)',
        'CHECK |β| < 1.0 ?',
        'CALC γ, Δt = γΔτ, L = L₀/γ',
        'PLOT & EXPORT END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นการจำลองสัมพัทธภาพพิเศษ (S และ S′)',
        '[หกเหลี่ยม Preparation] INITIALISE c ← 299792458 m/s, β ← v/c, H ← 1 ls',
        '[ด้านขนาน Input] INPUT ความเร็วสัมพัทธ์ β (-0.95 ≤ β ≤ +0.95)',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไขขอบเขต |β| < 1.0 ?',
        '[สี่เหลี่ยม Process] คำนวณ γ = 1/√(1−β²), Δt = γΔτ, L = L₀/γ',
        '[วงรี Terminator] OUTPUT กราฟและส่งออก CSV',
      ],
      distractors: ['[สี่เหลี่ยม Process] กำหนดให้ c′ = c + v และเวลาสัมบูรณ์ t′ = t เสมอ'],
      prompt: 'สรุปผลจากแบบจำลอง 3D Light Clock / Lorentz γ ที่ทดลองได้ในหน้านี้:',
    },
    quantum_light: {
      title: '02 ทฤษฎีควอนตัมของแสง — CT & ISO 5807 Workflow',
      nodes: [
        'START (Photon Lab 3D)',
        'INIT h, c, Metal φ',
        'INPUT λ (nm) & V_stop',
        'CHECK E = hc/λ >= φ ?',
        'CALC Kmax = hf − φ',
        'OUTPUT Spectrum & END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองทฤษฎีควอนตัมของแสง',
        '[หกเหลี่ยม Preparation] INITIALISE h ← 6.626×10⁻³⁴ J·s, φ (Work Function)',
        '[ด้านขนาน Input] INPUT ความยาวคลื่นแสง λ (nm) และชนิดโลหะ',
        '[ข้าวหลามตัด Decision] ตรวจสอบพลังงานโฟตอน E = hc/λ > φ ?',
        '[สี่เหลี่ยม Process] คำนวณ Kmax = hf − φ และ λmin = hc/(eV)',
        '[วงรี Terminator] OUTPUT สเปกตรัมควอนตัมและจบ',
      ],
      distractors: ['[สี่เหลี่ยม Process] เพิ่มความเข้มแสงเพียงอย่างเดียวเพื่อเพิ่มค่า Kmax แม้ความถี่ต่ำกว่าขีดเริ่ม'],
      prompt: 'สรุปผลการทดลองโฟโตอิเล็กทริก/คอมพ์ตัน/วัตถุดำที่สังเกตได้จากแบบจำลอง 3D:',
    },
    matter_waves: {
      title: '03 สมบัติคลื่นของอนุภาค — CT & ISO 5807 Workflow',
      nodes: [
        'START (Matter Wave 3D)',
        'INIT m (e⁻/p⁺/n), h, ℏ',
        'INPUT K (eV) & Δx',
        'CHECK K > 0 AND Δx > 0 ?',
        'CALC λ = h/p & Δp ≥ ℏ/(2Δx)',
        'RENDER 3D PACKET & END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นการศึกษาสมบัติคลื่นของอนุภาค',
        '[หกเหลี่ยม Preparation] INITIALISE m (e⁻/p⁺/n), h, Δx, λ₀',
        '[ด้านขนาน Input] INPUT พลังงานจลน์ K (eV) หรือความกว้าง Δx (nm)',
        '[ข้าวหลามตัด Decision] ตรวจสอบ K > 0 และ Δx > 0 ?',
        '[สี่เหลี่ยม Process] คำนวณ λ = h/p และ Δp ≥ ℏ/(2Δx)',
        '[วงรี Terminator] OUTPUT คลื่นสสาร 3D และกลุ่มคลื่น',
      ],
      distractors: ['[สี่เหลี่ยม Process] บีบ Δx ให้แคบลงพร้อมกับลด Δp ให้แคบลงพร้อมกันได้ไม่จำกัด'],
      prompt: 'สรุปความสัมพันธ์คลื่นเดอบรอยล์ / Goniometer ดาวิสสัน-เจอร์เมอร์ / ไฮเซนเบิร์ก:',
    },
    electron_diffraction: {
      title: '04 ปฏิบัติการเลี้ยวเบนอิเล็กตรอน — CT & ISO 5807 Workflow',
      nodes: [
        'START (Teltron Lab 3D)',
        'INIT Va ← 2.0kV, L ← 0.135m',
        'INPUT Va (kV)',
        '2.0 <= Va <= 5.0 kV ?',
        'COMPUTE λ, R₁, R₂',
        'FAIL-SAFE OFF & END',
      ],
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
      distractors: ['[สี่เหลี่ยม Process] เปิดความต่างศักย์ EHT 6.0 kV ทิ้งไว้ตลอดโดยไม่ทำ Fail-Safe Reset'],
      prompt: 'สรุปผลการวัดวงแหวนเลี้ยวเบน R₁, R₂ บนหลอด Teltron และการถดถอยเชิงเส้น R vs 1/√Va:',
    },
    atomic_models: {
      title: '05 แบบจำลองอะตอมและสเปกตรัม — CT & ISO 5807 Workflow',
      nodes: [
        'START (Atomic Lab 3D)',
        'INIT R_H, Z, e, ε₀',
        'INPUT E_α, b OR (nᵢ, n_f)',
        'CHECK b > 0 AND nᵢ ≠ n_f ?',
        'CALC θ_Rutherford & 1/λ = R_H(1/n₁²−1/n₂²)',
        'OUTPUT Spectrum / Franck-Hertz & END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองแบบจำลองอะตอมและสเปกตรัม',
        '[หกเหลี่ยม Preparation] INITIALISE R_H ← 1.097×10⁷ m⁻¹, E₁ ← −13.6 eV, Z',
        '[ด้านขนาน Input] INPUT พารามิเตอร์ชน (E, b) หรือระดับพลังงาน (nᵢ, n_f)',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไข b > 0 และ nᵢ > n_f (คายโฟตอน) ?',
        '[สี่เหลี่ยม Process] คำนวณมุมกระเจิง θ, ΔE = Eᵢ − E_f และ λ = hc/ΔE',
        '[วงรี Terminator] OUTPUT เส้นสเปกตรัมและกราฟฟรังก์-เฮิรตซ์',
      ],
      distractors: ['[สี่เหลี่ยม Process] ให้อิเล็กตรอนในวงโคจรโบร์แผ่คลื่นแม่เหล็กไฟฟ้าต่อเนื่องและยุบตัวลงสู่นิวเคลียสทันที'],
      prompt: 'สรุปผลการทดลองการกระเจิงรัทเทอร์ฟอร์ด สเปกตรัมไฮโดรเจน แบบจำลองโบร์ และฟรังก์-เฮิรตซ์:',
    },
    quantum_mechanics: {
      title: '06 กลศาสตร์ควอนตัมเบื้องต้น — CT & ISO 5807 Workflow',
      nodes: [
        'START (Quantum Mechanics 3D)',
        'INIT ℏ = m = 1, L, V₀, ω',
        'INPUT Quantum State n, E, V₀, a',
        'CHECK Normalization ∫|ψ|²dx = 1 ?',
        'CALC ψₙ(x,t), Eₙ & Tunneling T',
        'OUTPUT Re(ψ), Im(ψ), |ψ|² & END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองกลศาสตร์ควอนตัม 1 มิติ',
        '[หกเหลี่ยม Preparation] INITIALISE ℏ, m, ความกว้างบ่อ L, ความสูงกำแพง V₀',
        '[ด้านขนาน Input] INPUT เลขควอนตัม n, พลังงานอนุภาค E และความหนากำแพง a',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไข E < V₀ (Quantum Tunneling) ?',
        '[สี่เหลี่ยม Process] คำนวณ Eₙ = n²π²ℏ²/(2mL²), κ = √(2m(V₀−E))/ℏ และสัมประสิทธิ์ทะลุผ่าน T',
        '[วงรี Terminator] OUTPUT ฟังก์ชันคลื่น ψ(x,t) และความน่าจะเป็น |ψ|²',
      ],
      distractors: ['[สี่เหลี่ยม Process] กำหนดให้พลังงานจุดศูนย์ของตัวแกว่งกวัดฮาร์มอนิก E₀ = 0 และ T = 0 เสมอเมื่อ E < V₀'],
      prompt: 'สรุปพฤติกรรมฟังก์ชันคลื่น ψ(x,t) บ่อศักย์อนันต์ 1 มิติ การทะลุผ่านกำแพง (Tunneling) และพลังงานจุดศูนย์:',
    },
    solid_state: {
      title: '07 ฟิสิกส์โมเลกุลและของแข็ง — CT & ISO 5807 Workflow',
      nodes: [
        'START (Solid-State Lab 3D)',
        'INIT Dₑ, a, Eg, Tc, Bc(0)',
        'INPUT r, Lattice Type, T, B',
        'CHECK T < Tc AND B < Bc(T) ?',
        'CALC U_Morse(r), σ(T), Bc(T)',
        'OUTPUT Band / Meissner State & END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองฟิสิกส์โมเลกุลและสถานะของแข็ง',
        '[หกเหลี่ยม Preparation] INITIALISE Dₑ, ค่าคงที่แลตทิซ a, ช่องว่างพลังงาน Eg, Tc',
        '[ด้านขนาน Input] INPUT อุณหภูมิ T (K), สนามแม่เหล็ก B (T) และชนิดวัสดุ',
        '[ข้าวหลามตัด Decision] ตรวจสอบเงื่อนไขตัวนำยวดยิ่ง T < Tc และ B < Bc(T) ?',
        '[สี่เหลี่ยม Process] คำนวณศักย์มอร์ส U(r), การนำไฟฟ้า σ(T) ∝ exp(−Eg/2kBT) และ Bc(T)',
        '[วงรี Terminator] OUTPUT โครงผลึก 3D และการลอยตัวไมสเนอร์',
      ],
      distractors: ['[สี่เหลี่ยม Process] เพิ่มอุณหภูมิ T ให้สูงกว่า Tc เพื่อลดความต้านทานของตัวนำยวดยิ่งเป็นศูนย์'],
      prompt: 'สรุปผลศักย์มอร์ส โครงสร้างผลึก (SC/BCC/FCC) ช่องว่างพลังงาน Eg และเงื่อนไขตัวนำยวดยิ่ง:',
    },
    nuclear_physics: {
      title: '08 โครงสร้างนิวเคลียสและกัมมันตภาพรังสี — CT & ISO 5807 Workflow',
      nodes: [
        'START (Nuclear Lab 3D)',
        'INIT r₀ = 1.2 fm, u = 931.494 MeV',
        'INPUT Nuclide (Z, A), T½, N₀, t',
        'CHECK Conservation ΔZ, ΔA & T½ > 0 ?',
        'CALC R = r₀A^(1/3), B/A, N(t) = N₀·2^(−t/T½)',
        'OUTPUT Decay Curve & END',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองโครงสร้างนิวเคลียสและกัมมันตภาพรังสี',
        '[หกเหลี่ยม Preparation] INITIALISE r₀ ← 1.2 fm, m_p, m_n, u ← 931.494 MeV, N₀',
        '[ด้านขนาน Input] INPUT เลขอะตอม Z, เลขมวล A, ชนิดการสลาย (α/β/γ) และครึ่งชีวิต T½',
        '[ข้าวหลามตัด Decision] ตรวจสอบการอนุรักษ์เลขมวล A และประจุ Z ก่อน-หลังสลาย ?',
        '[สี่เหลี่ยม Process] คำนวณมวลพร่อง Δm, พลังงานยึดเหนี่ยว B/A และ N(t) = N₀ exp(−λt)',
        '[วงรี Terminator] OUTPUT กราฟการสลายตัวและกัมมันตภาพ A(t)',
      ],
      distractors: ['[สี่เหลี่ยม Process] กำหนดให้ครึ่งชีวิต T½ ลดลงตามจำนวนนิวเคลียสที่เหลืออยู่ N(t)'],
      prompt: 'สรุปความสัมพันธ์รัศมีนิวเคลียส พลังงานยึดเหนี่ยวต่อนิวคลีออน (B/A) กฎอนุรักษ์ α/β/γ และครึ่งชีวิต:',
    },
    particle_physics: {
      title: '09 ฟิสิกส์อนุภาคมูลฐาน — CT & ISO 5807 Workflow',
      nodes: [
        'START (Particle Physics 3D)',
        'INIT Standard Model 17 Particles & 4 Forces',
        'INPUT Force / Particle / Generation',
        'CHECK Charge Q, Spin & Color Confinement ?',
        'CALC Exchange Boson Range & Mass Hierarchy',
        'OUTPUT 3D Vertex & Standard Model Grid',
      ],
      expected_seq: [
        '[วงรี Terminator] เริ่มต้นห้องทดลองฟิสิกส์อนุภาคมูลฐานและ Standard Model',
        '[หกเหลี่ยม Preparation] INITIALISE ตารางเฟอร์มิออน 12 ชนิด, เกจโบซอน (γ, g, W±, Z⁰) และฮิกส์ H',
        '[ด้านขนาน Input] INPUT ชนิดแรงพื้นฐาน ระยะห่าง r (fm) หรือหมวดหมู่อนุภาค',
        '[ข้าวหลามตัด Decision] ตรวจสอบประจุไฟฟ้า Q, เลขแบริออน B และการกักขังสี (Confinement) ?',
        '[สี่เหลี่ยม Process] วิเคราะห์ตัวกลางแลกเปลี่ยนแรงและคำนวณสัดส่วนแรงตามระยะ r',
        '[วงรี Terminator] OUTPUT แบบจำลองมาตรฐาน 3D และกราฟมวลอนุภาค',
      ],
      distractors: ['[สี่เหลี่ยม Process] แยกควาร์กเดี่ยวให้หลุดเป็นอิสระด้วยแรงโน้มถ่วงในแบบจำลองมาตรฐาน'],
      prompt: 'สรุปแรงพื้นฐานทั้ง 4 ชนิด โบซอนสื่อแรง โครงสร้างควาร์กของโปรตอน/นิวตรอน และขอบเขต Standard Model:',
    },
  };

  const DEFAULT_ROSTER = [
    { student_id: 'TEACHER01', full_name: 'อาจารย์ชีวะ (ทดสอบระบบ)', section: 'อาจารย์/ทดสอบ' },
    { student_id: '6614611001', full_name: 'นางสาวกนกวรรณพึ่งฉ่ำ', section: '661/วิทย์' },
    { student_id: '6614611002', full_name: 'นางสาวกาญจน์สณีทรงศรี', section: '661/วิทย์' },
    { student_id: '6614611003', full_name: 'นางสาวกิติยาแสงทอง', section: '661/วิทย์' },
    { student_id: '6614611004', full_name: 'นางสาวชุลีขวัญคนขยัน', section: '661/วิทย์' },
  ];

  const scriptEl = document.currentScript || document.querySelector('script[data-ct-module]');
  const modKey = (scriptEl && scriptEl.dataset.ctModule) || 'electron_diffraction';
  const cfg = MODULE_CONFIG[modKey] || MODULE_CONFIG.electron_diffraction;

  let roster = DEFAULT_ROSTER.slice();
  let student = null;
  try { student = JSON.parse(localStorage.getItem('mp2027_current_student') || 'null'); } catch (_) {}

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function stateKey(sid) {
    return `mp2027_state:${sid || 'guest'}`;
  }

  function loadState() {
    const def = {
      completed: {
        relativity: false, quantum_light: false, matter_waves: false, electron_diffraction: false,
        atomic_models: false, quantum_mechanics: false, solid_state: false, nuclear_physics: false, particle_physics: false,
        challenge10: false,
      },
      attempts: {},
      snapshot: { semi_answers: {}, trace_answers: {} },
    };
    try {
      const raw = localStorage.getItem(stateKey(student?.student_id));
      if (!raw) return def;
      const p = JSON.parse(raw);
      return Object.assign({}, def, p, {
        completed: Object.assign({}, def.completed, p.completed || {}),
        snapshot: Object.assign({}, def.snapshot, p.snapshot || {}, {
          semi_answers: Object.assign({}, (p.snapshot && p.snapshot.semi_answers) || {}),
        }),
      });
    } catch (_) {
      return def;
    }
  }

  function saveState(st) {
    try {
      localStorage.setItem(stateKey(student?.student_id), JSON.stringify(st));
    } catch (_) {}
  }

  // Binary STL Exporter generating authentic watertight 3D apparatus geometry (Optical Bench + Apparatus Tube/Mirror)
  function buildApparatusStlBuffer() {
    const tris = [];
    const addTri = (a, b, c) => tris.push([a, b, c]);
    const addBox = (cx, cy, cz, sx, sy, sz) => {
      const hx = sx / 2, hy = sy / 2, hz = sz / 2;
      const v = [
        [cx - hx, cy - hy, cz - hz], [cx + hx, cy - hy, cz - hz],
        [cx + hx, cy + hy, cz - hz], [cx - hx, cy + hy, cz - hz],
        [cx - hx, cy - hy, cz + hz], [cx + hx, cy - hy, cz + hz],
        [cx + hx, cy + hy, cz + hz], [cx - hx, cy + hy, cz + hz],
      ];
      [[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]].forEach(([i,j,k]) => addTri(v[i], v[j], v[k]));
    };
    const addCyl = (cx, cy, cz, r, len, segs = 24) => {
      const x0 = cx - len / 2, x1 = cx + len / 2;
      for (let i = 0; i < segs; i++) {
        const a0 = (i / segs) * Math.PI * 2;
        const a1 = ((i + 1) / segs) * Math.PI * 2;
        const y0 = cy + r * Math.cos(a0), z0 = cz + r * Math.sin(a0);
        const y1 = cy + r * Math.cos(a1), z1 = cz + r * Math.sin(a1);
        addTri([x0, cy, cz], [x0, y1, z1], [x0, y0, z0]);
        addTri([x1, cy, cz], [x1, y0, z0], [x1, y1, z1]);
        addTri([x0, y0, z0], [x0, y1, z1], [x1, y1, z1]);
        addTri([x0, y0, z0], [x1, y1, z1], [x1, y0, z0]);
      }
    };

    // Optical bench base plate & pedestals + main cylindrical chamber
    addBox(0, 0, 2, 120, 48, 4);
    addBox(-40, 0, 12, 16, 22, 16);
    addBox(40, 0, 12, 18, 30, 16);
    addCyl(0, 0, 24, 14, 96, 28);
    addCyl(46, 0, 24, 22, 14, 28);

    const buf = new ArrayBuffer(84 + tris.length * 50);
    const dv = new DataView(buf);
    const hdr = `ModernPhysics2027 ${modKey} Apparatus STL`;
    for (let i = 0; i < Math.min(80, hdr.length); i++) dv.setUint8(i, hdr.charCodeAt(i));
    dv.setUint32(80, tris.length, true);
    let off = 84;
    tris.forEach(([a, b, c]) => {
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const len = Math.hypot(nx, ny, nz) || 1;
      dv.setFloat32(off, nx / len, true); dv.setFloat32(off + 4, ny / len, true); dv.setFloat32(off + 8, nz / len, true);
      [a, b, c].forEach((p, idx) => {
        const pOff = off + 12 + idx * 12;
        dv.setFloat32(pOff, p[0], true); dv.setFloat32(pOff + 4, p[1], true); dv.setFloat32(pOff + 8, p[2], true);
      });
      dv.setUint16(off + 48, 0, true);
      off += 50;
    });
    return buf;
  }

  function capturePngSnapshot() {
    const canvas = document.querySelector('#scene canvas, canvas[data-engine], canvas');
    if (!canvas) {
      alert('ไม่พบพื้นที่ Canvas 3D สำหรับจับภาพ');
      return;
    }
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `modernphysics2027_${modKey}_${Date.now()}.png`;
      a.click();
    } catch (e) {
      alert(`ไม่สามารถบันทึกภาพได้: ${e.message}`);
    }
  }

  function downloadStl() {
    const buf = buildApparatusStlBuffer();
    const blob = new Blob([buf], { type: 'application/octet-stream' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `modernphysics2027_${modKey}_apparatus.stl`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function renderIsoSvg(nodes) {
    const h = nodes.length * 54 + 16;
    let out = `<svg viewBox="0 0 300 ${h}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="cts-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1 L10 5 L0 9 z" fill="#1e293b"/></marker></defs><rect width="300" height="${h}" rx="10" fill="#f8fafc"/>`;
    nodes.forEach((n, i) => {
      const y = 8 + i * 54;
      const fill = i === 0 || i === nodes.length - 1 ? '#e0f2fe' : i === 3 ? '#fee2e2' : '#dcfce7';
      const stroke = i === 0 || i === nodes.length - 1 ? '#0284c7' : i === 3 ? '#dc2626' : '#16a34a';
      out += `<rect x="16" y="${y}" width="268" height="34" rx="${i === 0 || i === nodes.length - 1 ? 17 : 6}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;
      out += `<text x="150" y="${y + 21}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(n)}</text>`;
      if (i < nodes.length - 1) out += `<line x1="150" y1="${y + 34}" x2="150" y2="${y + 54}" stroke="#1e293b" stroke-width="1.5" marker-end="url(#cts-a)"/>`;
    });
    return out + '</svg>';
  }

  function trackTelemetry(eventType, eventData = null, durationMs = 0) {
    const sid = (student && student.student_id) ? student.student_id : 'guest';
    const payload = {
      student_id: sid,
      module_id: modKey,
      event_type: eventType,
      event_data: eventData,
      duration_ms: durationMs,
    };
    try {
      const q = JSON.parse(localStorage.getItem('mp2027_per_events') || '[]');
      q.push(Object.assign({ ts: new Date().toISOString() }, payload));
      localStorage.setItem('mp2027_per_events', JSON.stringify(q.slice(-200)));
    } catch (_) {}
    fetch('../api/per.php?action=log_event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  function applyUiMode(mode) {
    const isConcept = mode === 'conceptual';
    document.body.classList.toggle('mode-conceptual', isConcept);
    document.body.classList.toggle('mode-equations', !isConcept);
    try { localStorage.setItem('mp2027_ui_mode', mode); } catch (_) {}
    const btn = document.getElementById('ct-mode-btn');
    if (btn) {
      btn.textContent = isConcept ? '💡 โหมดแนวคิด (วิทย์ทั่วไป)' : '∑ โหมดสมการเชิงลึก';
      btn.classList.toggle('active-mode', isConcept);
    }
  }

  async function launchArXrView() {
    trackTelemetry('ar_xr_toggle', { modKey });
    const stageEl = document.querySelector('#scene, #stage, #viewport');
    let xrStatus = 'Desktop 3D Spatial AR Simulation';
    if (navigator.xr && navigator.xr.isSessionSupported) {
      try {
        const arOk = await navigator.xr.isSessionSupported('immersive-ar');
        const vrOk = await navigator.xr.isSessionSupported('immersive-vr');
        if (arOk) xrStatus = 'WebXR Immersive-AR Ready';
        else if (vrOk) xrStatus = 'WebXR Immersive-VR Ready';
      } catch (_) {}
    }

    if (stageEl && stageEl.requestFullscreen && xrStatus.indexOf('Desktop') === -1) {
      try { await stageEl.requestFullscreen(); } catch (_) {}
    }

    const hud = document.createElement('div');
    hud.className = 'ct-xr-hud';
    hud.innerHTML = `
      <video id="ct-xr-cam" autoplay playsinline muted></video>
      <div class="ct-xr-reticle">
        <div style="font-size:11px;font-weight:800;color:#38bdf8;letter-spacing:0.08em;">AR:XR SPATIAL SIMULATOR MODE</div>
        <h3 style="margin:6px 0;">${esc(cfg.title)}</h3>
        <p style="font-size:13px;color:#cbd5e1;margin:0 0 12px;">สถานะอุปกรณ์: <strong>${esc(xrStatus)}</strong> — โหมดนี้เปิดกล้อง AR Passthrough (หากอนุญาต) หรือโหมด Spatial Fullscreen เพื่อสังเกตอุปกรณ์ 3D</p>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
          <button type="button" id="ct-xr-fs" class="ct-suite-btn primary">⛶ ขยายฉาก 3D เต็มจอ</button>
          <button type="button" id="ct-xr-close" class="ct-suite-btn">✕ ออกจากโหมด AR:XR</button>
        </div>
      </div>
    `;
    document.body.appendChild(hud);

    let stream = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          const v = hud.querySelector('#ct-xr-cam');
          if (v) v.srcObject = s;
        }).catch(() => {});
    }

    const cleanup = () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      hud.remove();
    };
    hud.querySelector('#ct-xr-close').addEventListener('click', cleanup);
    hud.querySelector('#ct-xr-fs').addEventListener('click', () => {
      cleanup();
      if (stageEl && stageEl.requestFullscreen) stageEl.requestFullscreen().catch(() => {});
    });
  }

  async function initSuite() {
    if (!document.body || document.querySelector('.ct-suite-bar')) return;

    // Top Floating CT Bar
    const bar = document.createElement('div');
    bar.className = 'ct-suite-bar';
    bar.innerHTML = `
      <div class="ct-suite-left">
        <a class="ct-suite-brand" href="../index.html">🏠 AR:XR Portal</a>
        <span id="ct-bar-student" style="color:#93c5fd;font-weight:700;">${student ? `${esc(student.student_id)} ${esc(student.full_name)}` : 'ผู้เรียนทั่วไป (Guest)'}</span>
      </div>
      <div class="ct-suite-actions">
        <button type="button" class="ct-suite-btn" id="ct-theory-btn">📖 ทฤษฎี &amp; ภาพประกอบ</button>
        <button type="button" class="ct-suite-btn" id="ct-mode-btn">💡 โหมดแนวคิด</button>
        <button type="button" class="ct-suite-btn" id="ct-xr-btn">🥽 AR:XR</button>
        <button type="button" class="ct-suite-btn" id="ct-pick-stu-btn">👤 เลือกชื่อ</button>
        <button type="button" class="ct-suite-btn" id="ct-png-btn">📸 PNG</button>
        <button type="button" class="ct-suite-btn" id="ct-stl-btn">🧊 3D STL</button>
        <button type="button" class="ct-suite-btn" id="ct-json-btn">↓ JSON</button>
        <button type="button" class="ct-suite-btn primary" id="ct-open-submit-btn">📤 ส่งงาน / AI</button>
        <a class="ct-suite-btn" href="../teacher.html">🔐 Teacher</a>
      </div>
    `;
    document.body.prepend(bar);

    const savedMode = localStorage.getItem('mp2027_ui_mode') || 'equations';
    applyUiMode(savedMode);
    trackTelemetry('lab_open', { mode: savedMode });

    let sliderTimer = null;
    document.addEventListener('input', (ev) => {
      if (ev.target && ev.target.type === 'range') {
        clearTimeout(sliderTimer);
        sliderTimer = setTimeout(() => {
          trackTelemetry('slider_change', { id: ev.target.id || ev.target.dataset.key || 'slider', val: ev.target.value });
        }, 700);
      }
    });

    // Embedded CT Section
    const targetParent = document.querySelector('main') || document.body;
    const sec = document.createElement('section');
    sec.className = 'ct-suite-section';
    sec.id = 'ct-lab-integration';
    const bank = [...cfg.expected_seq, ...cfg.distractors].sort();

    function refreshDrawer() {
      const st = loadState();
      const semi = st.snapshot.semi_answers[modKey] || { seq: [], text: '' };
      const seq = Array.isArray(semi.seq) ? semi.seq : [];

      sec.innerHTML = `
        <div class="ct-suite-head">
          <div>
            <div class="ct-suite-eyebrow">CT-LAB04 INTEGRATION • ${esc(modKey.toUpperCase())}</div>
            <h3>${esc(cfg.title)}</h3>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span style="font-size:12px;font-weight:800;padding:4px 10px;border-radius:99px;background:${st.completed[modKey] ? '#dcfce7;color:#15803d' : '#eef4ff;color:#2563eb'};">
              ${st.completed[modKey] ? '✓ บันทึกผ่านการจำลอง 3D แล้ว' : 'กำลังปฏิบัติการ 3D'}
            </span>
            <button type="button" class="ct-suite-btn primary" id="ct-mark-done-btn" style="padding:7px 12px;">✓ ยืนยันผล 3D &amp; ส่งตรวจ AI</button>
          </div>
        </div>
        <div class="ct-suite-grid">
          <div class="ct-suite-svg-box">${renderIsoSvg(cfg.nodes)}</div>
          <div class="ct-suite-col">
            <strong style="font-size:13px;display:block;margin-bottom:8px;">เรียงลำดับบล็อก ISO 5807 (${seq.length}/${cfg.expected_seq.length}) — อย่าเลือกตัวลวง!</strong>
            <div class="ct-suite-seq-list">
              ${seq.length === 0 ? '<div style="font-size:12px;color:#64748b;padding:8px;">คลิกบล็อกด้านล่างเพื่อเพิ่มเข้าลำดับ...</div>' : seq.map((item, i) => `
                <div class="ct-seq-row">
                  <span class="ct-seq-num">${i + 1}</span>
                  <span style="flex:1;">${esc(item)}</span>
                  <button type="button" data-del="${i}" style="border:1px solid #cbd5e1;background:#fff;border-radius:6px;padding:2px 7px;color:#dc2626;cursor:pointer;">✕</button>
                </div>
              `).join('')}
            </div>
            <div class="ct-suite-bank-list">
              ${bank.map((item) => {
                const used = seq.includes(item);
                return `<button type="button" class="ct-bank-item ${used ? 'used' : ''}" data-add="${esc(item)}" ${used ? 'disabled' : ''}>${used ? '✓ ' : '+ '}${esc(item)}</button>`;
              }).join('')}
            </div>
            <label style="font-size:12.5px;font-weight:750;display:block;margin-top:8px;">${esc(cfg.prompt)}</label>
            <textarea class="ct-suite-textarea" id="ct-suite-note" rows="3" placeholder="บันทึกข้อสรุปที่ได้จากการปรับพารามิเตอร์ในแล็บ 3D...">${esc(semi.text || '')}</textarea>
            <div id="ct-suite-ai-result"></div>
          </div>
        </div>
      `;

      sec.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => {
        const cur = loadState();
        const s = cur.snapshot.semi_answers[modKey] || { seq: [], text: '' };
        s.seq = [...(s.seq || []), b.dataset.add];
        cur.snapshot.semi_answers[modKey] = s;
        saveState(cur);
        refreshDrawer();
      }));

      sec.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => {
        const cur = loadState();
        const s = cur.snapshot.semi_answers[modKey] || { seq: [], text: '' };
        s.seq.splice(Number(b.dataset.del), 1);
        cur.snapshot.semi_answers[modKey] = s;
        saveState(cur);
        refreshDrawer();
      }));

      sec.querySelector('#ct-suite-note')?.addEventListener('input', (e) => {
        const cur = loadState();
        const s = cur.snapshot.semi_answers[modKey] || { seq: [], text: '' };
        s.text = e.target.value;
        cur.snapshot.semi_answers[modKey] = s;
        saveState(cur);
      });

      sec.querySelector('#ct-mark-done-btn')?.addEventListener('click', () => {
        const cur = loadState();
        cur.completed[modKey] = true;
        saveState(cur);
        refreshDrawer();
        openModal();
      });
    }

    targetParent.appendChild(sec);
    refreshDrawer();

    // Submission Modal
    const dlg = document.createElement('dialog');
    dlg.className = 'ct-suite-dialog';
    dlg.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <div class="ct-suite-eyebrow">DIRECT LAB SUBMISSION</div>
          <h3 style="margin:2px 0 0;">ส่งผลการทดลอง (${esc(modKey)}) เข้าระบบฐานข้อมูล</h3>
        </div>
        <button type="button" id="ct-dlg-close" style="border:1px solid #cbd5e1;background:#fff;border-radius:8px;width:32px;height:32px;cursor:pointer;">✕</button>
      </div>
      <div class="ct-suite-field">
        <label>เลือกชื่อนักศึกษา</label>
        <select id="ct-dlg-stu-sel"></select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="ct-suite-field"><label>รหัสนักศึกษา</label><input id="ct-dlg-sid" type="text" /></div>
        <div class="ct-suite-field"><label>ชื่อ-นามสกุล</label><input id="ct-dlg-name" type="text" /></div>
      </div>
      <div class="ct-suite-field">
        <label>สรุปผลถึงอาจารย์</label>
        <textarea id="ct-dlg-note" rows="3"></textarea>
      </div>
      <button type="button" id="ct-dlg-submit" class="ct-suite-btn primary" style="width:100%;justify-content:center;padding:10px;font-size:13px;">📤 ยืนยันส่งงานและให้ AI ตรวจทันที</button>
      <div id="ct-dlg-out" style="margin-top:10px;"></div>
    `;
    document.body.appendChild(dlg);

    function openModal() {
      const sel = dlg.querySelector('#ct-dlg-stu-sel');
      sel.innerHTML = `<option value="">-- เลือกนักศึกษา --</option>` + roster.map((r) => `<option value="${esc(r.student_id)}">${esc(r.student_id)} — ${esc(r.full_name)} (${esc(r.section)})</option>`).join('');
      if (student) {
        sel.value = student.student_id || '';
        dlg.querySelector('#ct-dlg-sid').value = student.student_id || '';
        dlg.querySelector('#ct-dlg-name').value = student.full_name || '';
      }
      const st = loadState();
      dlg.querySelector('#ct-dlg-note').value = (st.snapshot.semi_answers[modKey] && st.snapshot.semi_answers[modKey].text) || '';
      dlg.showModal();
    }

    try {
      const res = await fetch('../api/submit.php?action=roster');
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      if (ct.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data.students) && data.students.length) roster = data.students;
      }
    } catch (_) {}

    dlg.querySelector('#ct-dlg-stu-sel').addEventListener('change', (e) => {
      const found = roster.find((r) => r.student_id === e.target.value);
      if (found) {
        student = found;
        try { localStorage.setItem('mp2027_current_student', JSON.stringify(found)); } catch (_) {}
        dlg.querySelector('#ct-dlg-sid').value = found.student_id;
        dlg.querySelector('#ct-dlg-name').value = found.full_name;
        bar.querySelector('#ct-bar-student').textContent = `${found.student_id} ${found.full_name}`;
        refreshDrawer();
      }
    });

    dlg.querySelector('#ct-dlg-close').addEventListener('click', () => dlg.close());
    dlg.querySelector('#ct-dlg-submit').addEventListener('click', async () => {
      const sid = dlg.querySelector('#ct-dlg-sid').value.trim();
      const name = dlg.querySelector('#ct-dlg-name').value.trim();
      const note = dlg.querySelector('#ct-dlg-note').value.trim();
      if (!sid || !name) { alert('กรุณาระบุรหัสและชื่อนักศึกษา'); return; }
      const secName = roster.find((r) => r.student_id === sid)?.section || '661/วิทย์';
      student = { student_id: sid, full_name: name, section: secName };
      try { localStorage.setItem('mp2027_current_student', JSON.stringify(student)); } catch (_) {}
      const cur = loadState();
      cur.completed[modKey] = true;
      saveState(cur);

      const out = dlg.querySelector('#ct-dlg-out');
      try {
        const res = await fetch('../api/submit.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_id: sid,
            full_name: name,
            section: secName,
            module_id: modKey,
            student_note: note,
            completed: cur.completed,
            attempts: cur.attempts,
            snapshot: cur.snapshot,
          }),
        });
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (!ct.includes('application/json')) throw new Error('STATIC_MODE');
        const data = await res.json();
        out.innerHTML = `<div class="ct-suite-ai-box"><strong>✓ ${esc(data.message || 'บันทึกแล้ว')} (AI Score: ${data.ai_score ?? '--'}/100)</strong><pre style="white-space:pre-wrap;margin:6px 0 0;font-family:inherit;">${esc(data.ai_feedback || '')}</pre></div>`;
      } catch (_) {
        const semi = cur.snapshot.semi_answers[modKey] || {};
        const seqOk = Array.isArray(semi.seq) ? semi.seq.filter((x) => cfg.expected_seq.includes(x)).length : 0;
        const est = Math.min(100, 40 + Math.round((seqOk / cfg.expected_seq.length) * 35) + (note.length >= 20 ? 20 : 10));
        try {
          const list = JSON.parse(localStorage.getItem('mp2027_local_submissions') || '[]');
          list.unshift({ id: Date.now(), student_id: sid, full_name: name, section: secName, module_id: modKey, ai_score: est, ai_feedback: `Static Lab Submit (${modKey}): เยี่ยมชมแล็บ 3D และส่งงานเรียบร้อย`, status: 'graded', submitted_at: new Date().toISOString().slice(0, 19).replace('T', ' ') });
          localStorage.setItem('mp2027_local_submissions', JSON.stringify(list.slice(0, 40)));
        } catch (_) {}
        out.innerHTML = `<div class="ct-suite-ai-box"><strong>✓ บันทึกผลในโหมด Static Preview (ประเมินเบื้องต้น ${est}/100)</strong></div>`;
      }
      refreshDrawer();
    });

    function loadScriptOnce(src) {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => resolve();
        document.head.appendChild(s);
      });
    }

    async function openTheoryModal() {
      if (!document.querySelector('link[href*="katex.min.css"]')) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
        document.head.appendChild(l);
      }
      if (!window.katex) {
        await loadScriptOnce('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js');
      }
      if (typeof window.renderMathInElement !== 'function') {
        await loadScriptOnce('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js');
      }
      if (!window.MP27Lecture) {
        await loadScriptOnce('../shared/lecture_theory.js');
      }
      if (window.MP27Lecture && typeof window.MP27Lecture.openPresentation === 'function') {
        window.MP27Lecture.openPresentation(modKey);
        trackTelemetry('theory_open');
      }
    }

    bar.querySelector('#ct-theory-btn').addEventListener('click', openTheoryModal);
    bar.querySelector('#ct-mode-btn').addEventListener('click', () => {
      const next = document.body.classList.contains('mode-conceptual') ? 'equations' : 'conceptual';
      applyUiMode(next);
      trackTelemetry('mode_switch', { mode: next });
    });
    bar.querySelector('#ct-xr-btn').addEventListener('click', launchArXrView);
    bar.querySelector('#ct-pick-stu-btn').addEventListener('click', openModal);
    bar.querySelector('#ct-open-submit-btn').addEventListener('click', openModal);
    bar.querySelector('#ct-png-btn').addEventListener('click', () => { trackTelemetry('png_export'); capturePngSnapshot(); });
    bar.querySelector('#ct-stl-btn').addEventListener('click', () => { trackTelemetry('stl_export'); downloadStl(); });
    bar.querySelector('#ct-json-btn').addEventListener('click', () => {
      const manifest = {
        schema: 'mp2027.fair.v1',
        generated_at: new Date().toISOString(),
        module: modKey,
        constants_standard: 'CODATA-2022',
        ui_mode: localStorage.getItem('mp2027_ui_mode') || 'equations',
      };
      const blob = new Blob([JSON.stringify({ manifest, student, module: modKey, state: loadState() }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `modernphysics2027_${modKey}_${student?.student_id || 'guest'}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSuite);
  else initSuite();
})();
