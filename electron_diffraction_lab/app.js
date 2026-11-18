let THREE=null,OrbitControls=null,useFallback3D=false;

const H_PLANCK=6.62607015e-34;
const E_CHARGE=1.60217663e-19;
const M_ELECTRON=9.1093837e-31;
const C_LIGHT=299792458;
const D10=0.213e-9;
const D11=0.123e-9;

const PARTICLES={
 electron:{name:'อิเล็กตรอน (e⁻)',symbol:'e⁻',mass:M_ELECTRON,charge:E_CHARGE,massFactor:1},
 muon:{name:'มิวออน (μ⁻)',symbol:'μ⁻',mass:206.768*M_ELECTRON,charge:E_CHARGE,massFactor:206.768},
 proton:{name:'โปรตอน (p⁺)',symbol:'p⁺',mass:1836.15*M_ELECTRON,charge:E_CHARGE,massFactor:1836.15}
};

const $=id=>document.getElementById(id);
const S={
 module:'teltron',
 vaKV:3.5,
 Lcm:13.5,
 particle:'electron',
 plane:'10',
 whichWay:false,
 t:0,
 running:true,
 timeScale:1,
 hits:[],
 firedCount:0,
 emitTimer:0,
 flight:null,
 records:[],
 quizAnswers:{}
};

const fmt=(n,d=3)=>Number.isFinite(n)?Number(n).toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:d}):'—';
const sci=(n,d=3)=>Number.isFinite(n)?Number(n).toExponential(d).replace('e+',' × 10^').replace('e-',' × 10^-'):'—';
const setText=(id,text)=>{const el=$(id);if(el)el.textContent=text;};

function calcPhysics(vaKV=S.vaKV,Lcm=S.Lcm,pKey=S.particle){
 const part=PARTICLES[pKey]||PARTICLES.electron;
 const Va=vaKV*1000;
 const K=part.charge*Va;
 const p=Math.sqrt(2*part.mass*K);
 const v=p/part.mass;
 const beta=v/C_LIGHT;
 const lambda=H_PLANCK/p;
 const lambdaPm=lambda*1e12;
 const lambdaNm=lambda*1e9;
 const invSqrtV=1/Math.sqrt(Va);
 const L=Lcm/100;
 const sinT1=Math.min(.95,lambda/(2*D10));
 const sinT2=Math.min(.95,lambda/(2*D11));
 const theta1=Math.asin(sinT1);
 const theta2=Math.asin(sinT2);
 const R1m=L*Math.tan(Math.min(1.25,2*theta1));
 const R2m=L*Math.tan(Math.min(1.25,2*theta2));
 return {part,Va,K,p,v,beta,lambda,lambdaPm,lambdaNm,invSqrtV,L,theta1,theta2,R1m,R2m,R1cm:R1m*100,R2cm:R2m*100};
}

function seedSampleRecords(){
 S.records=[2.0,3.0,4.0].map(va=>{
  const ph=calcPhysics(va,S.Lcm,'electron');
  return {vaKV:va,invSqrtV:ph.invSqrtV,lambdaPm:ph.lambdaPm,R1cm:ph.R1cm,R2cm:ph.R2cm};
 });
}
seedSampleRecords();

const modules={
 teltron:{
  title:'การเลี้ยวเบนของอิเล็กตรอนผ่านผลึกแกรไฟต์',
  crumb:'TELTRON TUBE',
  scene:'3D Teltron Electron Diffraction Tube',
  chart:'ความสัมพันธ์เชิงเส้น R เทียบกับ 1/√Vₐ',
  description:'สังเกตวงแหวนเลี้ยวเบนเดอบาย–แชร์เรอร์บนฉากเรืองแสงสีเขียว ปรับความต่างศักย์เร่ง Vₐ เพื่อตรวจสอบการขยาย–หดตัวของรัศมีวงแหวน R₁ และ R₂',
  activity:'ปรับค่าความต่างศักย์ Vₐ (เช่น 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0 kV) แล้วกด "บันทึกค่าลงตาราง" จากนั้นดูความชันกราฟเชิงเส้นและค่า d₁₀, d₁₁ ที่คำนวณได้',
  formula:'λ = h / √(2mₑeVₐ),    2d sinθ = nλ,    R ≈ (Lh / d√(2mₑe)) · Vₐ⁻¹/²',
  explain:'อิเล็กตรอนที่ถูกเร่งด้วยความต่างศักย์ Vₐ จะประพฤติตัวเป็นคลื่นสสารความยาวคลื่น λ เมื่อผ่านแผ่นฟิล์มแกรไฟต์หลายผลึก จะแทรกสอดเสริมกันเป็นรูปกรวยมุม 2θ เกิดวงแหวนกลม R₁ (d₁₀ = 0.213 nm) และ R₂ (d₁₁ = 0.123 nm) บนฉากเรืองแสง'
 },
 debroglie:{
  title:'สมมติฐานคลื่นสสารของเดอบรอยล์',
  crumb:'DE BROGLIE WAVE',
  scene:'3D Helical Matter Wave ψ(x, t)',
  chart:'ความยาวคลื่นเดอบรอยล์ λ เทียบกับ Vₐ',
  description:'เปรียบเทียบความยาวคลื่นสสาร λ ของอิเล็กตรอน มิวออน และโปรตอน ที่ถูกเร่งด้วยความต่างศักย์ Vₐ เท่ากัน',
  activity:'ลองสลับชนิดอนุภาคจากอิเล็กตรอนเป็นมิวออนหรือโปรตอนที่ความต่างศักย์ 3.5 kV เดียวกัน แล้วสังเกตการเปลี่ยนแปลงของความยาวคลื่นและจำนวนลูกคลื่น',
  formula:'λ = h / p = h / √(2meVₐ)',
  explain:'อนุภาคทุกชนิดที่มีโมเมนตัม p มีความยาวคลื่นสสารสัมพันธ์อยู่ด้วย เมื่อความต่างศักย์ Vₐ เพิ่มขึ้นหรือมวลอนุภาค m เพิ่มขึ้น โมเมนตัม p จะเพิ่มขึ้น ส่งผลให้ความยาวคลื่น λ สั้นลง'
 },
 crystal:{
  title:'โครงสร้างผลึกแกรไฟต์และกฎการเลี้ยวเบนของแบรกก์',
  crumb:'BRAGG LATTICE',
  scene:'Hexagonal Graphite Crystal & Bragg Planes',
  chart:'เส้นโค้งความเข้มการสะท้อนของแบรกก์ (n = 1)',
  description:'ศึกษาโครงสร้างผลึกหกเหลี่ยมของแกรไฟต์และเงื่อนไขความต่างทางเดินแสงของคลื่นอิเล็กตรอนที่สะท้อนจากระนาบอะตอม (10) และ (11)',
  activity:'สลับระนาบผลึก (10) (d = 0.213 nm) กับ (11) (d = 0.123 nm) และปรับ Vₐ เพื่อสังเกตมุมแบรกก์ θ และระยะห่างระหว่างระนาบ d',
  formula:'2d sinθ = nλ,    d₁₀ = 0.213 nm,    d₁₁ = 0.123 nm  (d₁₀/d₁₁ = √3)',
  explain:'คลื่นอิเล็กตรอนที่สะท้อนจากระนาบอะตอมชั้นล่างเดินทางไกลกว่าชั้นบนเป็นระยะ 2d sinθ เมื่อระยะนี้เท่ากับจำนวนเต็มเท่าของความยาวคลื่น (nλ) คลื่นทั้งสองจะเสริมกันพอดี'
 },
 doubleslit:{
  title:'การศึกษาทวิภาวะคลื่น–อนุภาคผ่านช่องแคบคู่ทีละอิเล็กตรอน',
  crumb:'DOUBLE SLIT',
  scene:'Single-Electron Double-Slit Chamber',
  chart:'การแจกแจงความน่าจะเป็นบนฉากรับภาพ I(z)',
  description:'ยิงอิเล็กตรอนทีละ 1 ตัวผ่านช่องแคบคู่เพื่อดูการก่อตัวของแถบแทรกสอด และทดสอบผลของการเปิดเครื่องตรวจวัดเส้นทาง (Which-Way Detector)',
  activity:'กดปุ่ม "+100 อิเล็กตรอน" เพื่อสังเกตจุดตกกระทบ (อนุภาค) ที่รวมตัวเป็นแถบแทรกสอด (คลื่น) จากนั้นลองเปิดสวิตช์ "ตรวจวัดเส้นทาง" เพื่อดูการยุบตัวของฟังก์ชันคลื่น',
  formula:'P(z) = |ψ₁ + ψ₂|²  (ไม่วัดเส้นทาง)    vs    P(z) = |ψ₁|² + |ψ₂|²  (ตรวจวัดเส้นทาง)',
  explain:'อิเล็กตรอนแต่ละตัวตกกระทบบนฉากเป็น 1 จุด (สมบัติอนุภาค) แต่เมื่อสะสมจำนวนมาก ความน่าจะเป็นในการพบตำแหน่งเป็นไปตามการแทรกสอดของคลื่น หากตรวจวัดว่าผ่านช่องใด การแทรกสอดจะหายไปทันที'
 },
 assessment:{
  title:'บันทึกผลการทดลองและแบบประเมินความรู้ความเข้าใจ',
  crumb:'POE ASSESSMENT',
  scene:'Teltron Calibration & Data Analysis View',
  chart:'กราฟถดถอยเชิงเส้น R₁, R₂ เทียบกับ 1/√Vₐ',
  description:'รวบรวมข้อมูลรัศมีวงแหวนที่ความต่างศักย์ต่างๆ เพื่อคำนวณค่า d₁₀, d₁₁ จากความชันกราฟ พร้อมทำแบบทดสอบประเมินมโนทัศน์ทวิภาวะ 5 ข้อ',
  activity:'บันทึกข้อมูลให้ครบอย่างน้อย 5–7 ค่าความต่างศักย์ (2.0–5.0 kV) ตรวจสอบค่า % Error ของ d₁₀ และ d₁₁ ด้านล่าง แล้วตอบคำถามประเมินความเข้าใจครบทั้ง 5 ข้อ',
  formula:'d_exp = Lh / (k√(2mₑe)),    %Error = |d_exp − d_std| / d_std × 100%',
  explain:'เมื่อพล็อต R บนแกนตั้งและ Vₐ⁻¹/² บนแกนนอน กราฟเส้นตรงที่ผ่านจุดกำเนิดมีความชัน k ซึ่งเชื่อมโยงค่าคงตัวของพลังค์ h และระยะห่างระนาบอะตอม d ของผลึกแกรไฟต์โดยตรง'
 }
};

const QUIZ_ITEMS=[
 {
  q:'1. [Predict] หากเพิ่มความต่างศักย์เร่ง Vₐ จาก 2.0 kV เป็น 5.0 kV ขนาดรัศมีวงเลี้ยวเบน R₁, R₂ บนฉากเรืองแสงจะเปลี่ยนอย่างไร?',
  opts:[
   'ขยายใหญ่ขึ้น เพราะอิเล็กตรอนมีพลังงานจลน์สูงขึ้น',
   'หดเล็กลง เพราะโมเมนตัมเพิ่มขึ้น ทำให้ λ = h/p สั้นลง',
   'เท่าเดิม เพราะระยะห่างระนาบผลึก d ไม่เปลี่ยนแปลง'
  ],
  ans:1,
  exp:'ถูกต้อง! เมื่อ Vₐ เพิ่มขึ้น โมเมนตัม p = √(2mₑeVₐ) เพิ่มขึ้น ความยาวคลื่นเดอบรอยล์ λ = h/p จึงสั้นลง และจาก 2d sinθ = λ มุมเลี้ยวเบน θ และรัศมีวงแหวน R จึงหดเล็กลง'
 },
 {
  q:'2. เหตุใดลวดลายการเลี้ยวเบนของอิเล็กตรอนผ่านแผ่นแกรไฟต์ในหลอด Teltron จึงเป็นวงแหวนกลมซ้อนกันแทนที่จะเป็นจุด?',
  opts:[
   'เพราะแผ่นแกรไฟต์เป็นแบบหลายผลึก (Polycrystalline) ที่ผลึกเล็กๆ วางตัวสุ่มทุกมุมรอบแกนลำ',
   'เพราะขั้วแอโนดหมุนลำอิเล็กตรอนเป็นวงกลมตลอดเวลา',
   'เพราะประจุลบของอิเล็กตรอนผลักกันเองในหลอดสุญญากาศ'
  ],
  ans:0,
  exp:'ถูกต้อง! แกรไฟต์ประกอบด้วยผลึกขนาดเล็กจำนวนมากที่หันระนาบสุ่มทุกทิศทางรอบแกนลำอิเล็กตรอน ลำที่สะท้อนตามเงื่อนไขแบรกก์จึงกระจายออกเป็นกรวยกลม เกิดเป็นวงแหวนเดอบาย–แชร์เรอร์'
 },
 {
  q:'3. ตามโครงสร้างผลึกหกเหลี่ยมของแกรไฟต์ (d₁₀ = 0.213 nm, d₁₁ = 0.123 nm) อัตราส่วนรัศมีวงนอกต่อวงใน R₂/R₁ มีค่าใกล้เคียงเท่าใด?',
  opts:[
   'ประมาณ 1.000 (R₂ = R₁)',
   'ประมาณ 1.414 (√2)',
   'ประมาณ 1.732 (√3)'
  ],
  ans:2,
  exp:'ถูกต้อง! เนื่องจาก R ∝ 1/d ดังนั้น R₂/R₁ = d₁₀/d₁₁ = 0.213 / 0.123 ≈ 1.732 = √3 เสมอ ไม่ว่าจะตั้งค่า Vₐ เป็นเท่าใด'
 },
 {
  q:'4. หากเปลี่ยนอนุภาคจากอิเล็กตรอนเป็นโปรตอน (mₚ ≈ 1836 mₑ) ที่เร่งด้วยความต่างศักย์ Vₐ เท่ากัน ความยาวคลื่นเดอบรอยล์ λ จะเป็นอย่างไร?',
  opts:[
   'สั้นลงประมาณ 42.85 เท่า (λ ∝ 1/√m)',
   'ยาวขึ้นประมาณ 42.85 เท่า',
   'เท่าเดิม เพราะประจุขนาด e เท่ากัน'
  ],
  ans:0,
  exp:'ถูกต้อง! จาก λ = h/√(2meVₐ) เมื่อมวล m เพิ่มขึ้น 1836 เท่า ความยาวคลื่น λ จึงลดลง √1836 ≈ 42.85 เท่า'
 },
 {
  q:'5. ในการทดลองช่องแคบคู่ทีละอิเล็กตรอน เมื่อเปิดเครื่องตรวจวัดเส้นทาง (Which-Way Detector) เพื่อดูว่าอิเล็กตรอนผ่านช่องใด ลวดลายบนฉากจะเป็นอย่างไร?',
  opts:[
   'แถบแทรกสอดสว่าง–มืดชัดเจนขึ้นกว่าเดิม',
   'แถบแทรกสอดหายไป เหลือเพียงแถบสว่าง 2 แถบตรงกับช่องแคบทั้งสอง',
   'อิเล็กตรอนจะหยุดเคลื่อนที่หน้าช่องแคบ'
  ],
  ans:1,
  exp:'ถูกต้อง! การตรวจวัดเส้นทางทำให้ทราบตำแหน่งของอิเล็กตรอนที่ช่องแคบ ซึ่งทำลายการซ้อนทับเชิงควอนตัม (Superposition) ส่งผลให้แถบแทรกสอดหายไปและแสดงพฤติกรรมแบบอนุภาคคลาสสิก'
 }
];

const colorCyan=0x45ddf3,colorPurple=0xa59bff,colorAmber=0xffcb72,colorGreen=0x4df7a6,colorRose=0xff6b8b;
const BEAM_Y=0.65,BENCH_Y=-1.45;
class MeterNeedlePhysics{
 constructor(damping=0.82,spring=0.16){this.currentAngle=0;this.velocity=0;this.damping=damping;this.spring=spring;}
 update(target){const f=(target-this.currentAngle)*this.spring;this.velocity=(this.velocity+f)*this.damping;this.currentAngle+=this.velocity;return this.currentAngle;}
}
const ehtNeedlePhysics=new MeterNeedlePhysics(0.82,0.16);

let renderer,scene,camera,orbit,stars;
let teltronGroup,gunGlowMesh,innerCone,outerCone,ring1Mesh,ring2Mesh,jaw1Top,jaw1Bot,jaw2Top,jaw2Bot,ehtNeedlePivot,ehtKnobPivot,beamPackets=[];
let debroglieGroup,waveRealLine,waveImagLine,waveRealPos,waveImagPos,waveNodes=[],envRings=[];
let crystalGroup,planeTopMesh,planeBotMesh,latticeTop,latticeBot,braggBeamGroup,dSpacerBar,incidentArm,diffractedArm;
let doubleSlitGroup,detectorLamp1,detectorLamp2,probeLaser1,probeLaser2,flightSphere,hitPointsGeo,hitPositions;

function clearLoadingEl(){const el=$('sceneLoading');if(el)el.remove();}
function matStd(color,opacity=1,emInt=.14,metal=.3,rough=.3){return new THREE.MeshStandardMaterial({color,metalness:metal,roughness:rough,transparent:opacity<1,opacity,emissive:color,emissiveIntensity:emInt});}
function setBarSpanY(mesh,y1,y2,x,z){const h=Math.max(.02,Math.abs(y2-y1));mesh.scale.y=h;mesh.position.set(x,(y1+y2)*.5,z);}
function cylinderBetween(a,b,r,mat){
 const mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5),d=new THREE.Vector3().subVectors(b,a);
 const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.01,d.length()),12),mat);
 mesh.position.copy(mid);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return mesh;
}
function buildStudioEnv(rend,sc){
 const pmrem=new THREE.PMREMGenerator(rend),env=new THREE.Scene();env.background=new THREE.Color(0x0b1624);
 const addPanel=(w,h,col,pos,rot)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide}));m.position.set(...pos);m.rotation.set(...rot);env.add(m);};
 addPanel(18,8,0xffffff,[0,10,0],[Math.PI/2,0,0]);
 addPanel(12,6,0x9fdcff,[-10,4,8],[0,Math.PI/3,0]);
 addPanel(12,6,0x6df7c4,[10,3,-8],[0,-Math.PI*2/3,0]);
 addPanel(16,5,0x2e4a6b,[0,-6,0],[-Math.PI/2,0,0]);
 sc.environment=pmrem.fromScene(env,0.04).texture;
 pmrem.dispose();
}
function createOpticalPost(x,topY,z,mats){
 const grp=new THREE.Group(),h=Math.max(.2,topY-BENCH_Y);
 const base=new THREE.Mesh(new THREE.CylinderGeometry(.24,.28,.08,20),mats.darkAnodized);base.position.set(x,BENCH_Y+.04,z);base.castShadow=true;base.receiveShadow=true;
 const rod=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,h,16),mats.steel);rod.position.set(x,BENCH_Y+h*.5,z);rod.castShadow=true;
 const collar=new THREE.Mesh(new THREE.CylinderGeometry(.125,.125,.12,18),mats.brass);collar.position.set(x,BENCH_Y+.45,z);
 const screw=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.12,10),mats.brass);screw.rotation.x=Math.PI/2;screw.position.set(x,BENCH_Y+.45,z+.14);
 grp.add(base,rod,collar,screw);return grp;
}
function createSiliconeLead(pts,r,hexCol,mats){
 const grp=new THREE.Group();
 const curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)));
 const cable=new THREE.Mesh(new THREE.TubeGeometry(curve,28,r,10,false),new THREE.MeshStandardMaterial({color:hexCol,roughness:.55,metalness:.08}));
 cable.castShadow=true;grp.add(cable);
 for(const endPt of [pts[0],pts[pts.length-1]]){
  const boot=new THREE.Mesh(new THREE.CylinderGeometry(r*1.8,r*1.8,.16,12),mats.bakelite);
  boot.position.set(...endPt);grp.add(boot);
 }
 return grp;
}

let lastTagHtml='';
function updateViewportTags(){
 const host=$('viewportTags');if(!host)return;
 const m=S.module,ph=calcPhysics();let html='';
 if(m==='teltron'||m==='assessment'){
  html=`<span class="frame-tag amber">EHT ${fmt(S.vaKV,2)} kV · TELTRON TUBE</span><span class="frame-tag green">R₁ = ${fmt(ph.R1cm,2)} cm · R₂ = ${fmt(ph.R2cm,2)} cm</span><span class="frame-tag">λ = ${fmt(ph.lambdaPm,2)} pm</span>`;
 }else if(m==='debroglie'){
  html=`<span class="frame-tag">${ph.part.symbol} QUADRUPOLE BEAM</span><span class="frame-tag highlight">Re(ψ) &amp; Im(ψ) PHASE</span><span class="frame-tag green">λ = ${ph.lambdaPm>=1?fmt(ph.lambdaPm,2)+' pm':fmt(ph.lambdaPm,4)+' pm'}</span>`;
 }else if(m==='crystal'){
  const dNm=S.plane==='10'?0.213:0.123;
  const thDeg=(S.plane==='10'?ph.theta1:ph.theta2)*180/Math.PI;
  html=`<span class="frame-tag amber">GONIOMETER (${S.plane}) d = ${dNm} nm</span><span class="frame-tag green">BRAGG θ = ${fmt(thDeg,2)}°</span><span class="frame-tag">2d sinθ = λ</span>`;
 }else if(m==='doubleslit'){
  html=S.whichWay
   ?`<span class="frame-tag rose">WHICH-WAY PROBE: ON</span><span class="frame-tag amber">CLASSICAL 2-BAND COLLAPSE</span><span class="frame-tag">N = ${S.firedCount} e⁻</span>`
   :`<span class="frame-tag green">WHICH-WAY PROBE: OFF</span><span class="frame-tag highlight">QUANTUM INTERFERENCE |ψ₁+ψ₂|²</span><span class="frame-tag">N = ${S.firedCount} e⁻</span>`;
 }
 if(html!==lastTagHtml){lastTagHtml=html;host.innerHTML=html;}
}

function sampleDoubleSlitZ(){
 const ph=calcPhysics();
 const waveFactor=Math.max(.55,Math.min(1.6,20.7/Math.max(5,ph.lambdaPm)));
 const betaS=2.8/waveFactor,alphaS=0.62/waveFactor;
 for(let tries=0;tries<60;tries++){
  const z=(Math.random()*2-1)*2.4;
  let prob;
  if(S.whichWay){
   const s=0.56;prob=.5*(Math.exp(-((z-s)**2)/.11)+Math.exp(-((z+s)**2)/.11));
  }else{
   const env=alphaS*z===0?1:Math.sin(alphaS*z)/(alphaS*z);
   prob=(Math.cos(betaS*z)**2)*(env**2)*Math.exp(-(z*z)/4.5);
  }
  if(Math.random()<=prob)return z;
 }
 return (Math.random()-.5)*.8;
}

function addElectronHits(count){
 for(let i=0;i<count;i++){
  const z=sampleDoubleSlitZ(),y=BEAM_Y+(Math.random()*2-1)*1.25;
  S.hits.push([4.35,y,z]);S.firedCount++;
 }
 if(S.hits.length>1400)S.hits=S.hits.slice(S.hits.length-1400);
 syncHitBuffer();
}

function syncHitBuffer(){
 if(!hitPositions||!hitPointsGeo)return;
 const maxN=1400,n=Math.min(maxN,S.hits.length);
 for(let i=0;i<maxN;i++){
  if(i<n){hitPositions[i*3]=S.hits[i][0];hitPositions[i*3+1]=S.hits[i][1];hitPositions[i*3+2]=S.hits[i][2];}
  else{hitPositions[i*3]=999;hitPositions[i*3+1]=999;hitPositions[i*3+2]=999;}
 }
 hitPointsGeo.attributes.position.needsUpdate=true;
 hitPointsGeo.setDrawRange(0,n);
}

function resetDoubleSlitHits(seedCount=24){S.hits=[];S.firedCount=0;S.flight=null;addElectronHits(seedCount);}
resetDoubleSlitHits(35);

async function loadThreeModules(){
 const sources=[
  ['three','three/addons/controls/OrbitControls.js'],
  ['https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js','https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js'],
  ['https://unpkg.com/three@0.160.1/build/three.module.js','https://esm.sh/three@0.160.1/examples/jsm/controls/OrbitControls.js']
 ];
 const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('Three.js load timeout')),ms))]);
 let lastErr=null;
 for(const [threeUrl,orbitUrl] of sources){
  try{
   const [threeMod,orbitMod]=await withTimeout(Promise.all([import(threeUrl),import(orbitUrl)]),4500);
   if(threeMod&&orbitMod&&orbitMod.OrbitControls){THREE=threeMod;OrbitControls=orbitMod.OrbitControls;return true;}
  }catch(err){lastErr=err;}
 }
 throw lastErr||new Error('Unable to load Three.js');
}

function init3D(){
 const host=$('sceneHost');scene=new THREE.Scene();scene.background=new THREE.Color(0x07121e);scene.fog=new THREE.FogExp2(0x07121e,.014);
 camera=new THREE.PerspectiveCamera(44,1,.1,500);camera.position.set(2.0,3.5,10.6);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.28;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 host.appendChild(renderer.domElement);clearLoadingEl();
 buildStudioEnv(renderer,scene);

 orbit=new OrbitControls(camera,renderer.domElement);orbit.enableDamping=true;orbit.dampingFactor=.06;
 orbit.minDistance=4.2;orbit.maxDistance=32;orbit.target.set(0,BEAM_Y-.15,0);orbit.maxPolarAngle=Math.PI*.86;

 scene.add(new THREE.HemisphereLight(0xb8dcff,0x142030,1.65));
 const key=new THREE.DirectionalLight(0xeef7ff,2.6);key.position.set(5,11,7);key.castShadow=true;
 key.shadow.mapSize.set(1024,1024);key.shadow.camera.near=2;key.shadow.camera.far=28;
 Object.assign(key.shadow.camera,{left:-7.5,right:7.5,top:6,bottom:-6});scene.add(key);
 const fill=new THREE.PointLight(colorCyan,18,18);fill.position.set(-5,3.5,5);scene.add(fill);
 const greenLamp=new THREE.PointLight(colorGreen,20,14);greenLamp.position.set(4.5,1.8,2.6);scene.add(greenLamp);

 const mats={
  steel:new THREE.MeshStandardMaterial({color:0xb8cad9,metalness:.88,roughness:.22}),
  darkAnodized:new THREE.MeshStandardMaterial({color:0x1b2836,metalness:.72,roughness:.36}),
  brass:new THREE.MeshStandardMaterial({color:0xd99b26,metalness:.86,roughness:.24}),
  copper:new THREE.MeshStandardMaterial({color:0xc86d3b,metalness:.85,roughness:.26}),
  ceramic:new THREE.MeshStandardMaterial({color:0xe8e2d5,metalness:.05,roughness:.44}),
  bakelite:new THREE.MeshStandardMaterial({color:0x1a171c,metalness:.14,roughness:.52}),
  glass:new THREE.MeshPhysicalMaterial({color:0xc9eeff,transmission:.90,opacity:1,transparent:true,roughness:.05,metalness:0,ior:1.52,thickness:.35,clearcoat:1,clearcoatRoughness:.05,depthWrite:false})
 };

 // Grounded Optical Laboratory Table Bench (Top at y = BENCH_Y = -1.45)
 const grid=new THREE.GridHelper(60,60,0x245670,0x142a3b);grid.position.y=BENCH_Y-.28;grid.material.transparent=true;grid.material.opacity=.28;scene.add(grid);
 const benchGroup=new THREE.Group();scene.add(benchGroup);
 const benchTop=new THREE.Mesh(new THREE.BoxGeometry(13.0,.22,6.2),new THREE.MeshStandardMaterial({color:0x121d2b,metalness:.68,roughness:.36}));
 benchTop.position.set(-.1,BENCH_Y-.11,0);benchTop.receiveShadow=true;benchGroup.add(benchTop);
 const trimZ=new THREE.BoxGeometry(13.1,.24,.09),trimX=new THREE.BoxGeometry(.09,.24,6.28);
 for(const sz of [-3.12,3.12]){const t=new THREE.Mesh(trimZ,mats.steel);t.position.set(-.1,BENCH_Y-.11,sz);benchGroup.add(t);}
 for(const sx of [-6.62,6.42]){const t=new THREE.Mesh(trimX,mats.steel);t.position.set(sx,BENCH_Y-.11,0);benchGroup.add(t);}
 for(const fx of [-6.0,5.8])for(const fz of [-2.6,2.6]){const foot=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,.16,16),mats.darkAnodized);foot.position.set(fx,BENCH_Y-.3,fz);benchGroup.add(foot);}

 // 1. Teltron Electron Diffraction Tube + Universal Stand + EHT Power Supply + Silicone Leads + 3D Vernier Caliper
 teltronGroup=new THREE.Group();scene.add(teltronGroup);
 const standBase=new THREE.Mesh(new THREE.BoxGeometry(7.8,.08,1.9),mats.darkAnodized);standBase.position.set(-1.1,BENCH_Y+.04,0);standBase.receiveShadow=true;standBase.castShadow=true;
 const rearPillar=new THREE.Mesh(new THREE.CylinderGeometry(.11,.13,BEAM_Y-BENCH_Y-.45,16),mats.steel);rearPillar.position.set(-3.8,(BENCH_Y+BEAM_Y-.45)*.5,0);rearPillar.castShadow=true;
 const neckClamp=new THREE.Mesh(new THREE.TorusGeometry(.57,.075,14,32),mats.darkAnodized);neckClamp.rotation.y=Math.PI/2;neckClamp.position.set(-3.8,BEAM_Y,0);
 for(const sz of [-.66,.66]){const ts=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.16,12),mats.brass);ts.rotation.x=Math.PI/2;ts.position.set(-3.8,BEAM_Y,sz);teltronGroup.add(ts);}
 const cradlePillar=new THREE.Mesh(new THREE.CylinderGeometry(.1,.12,.38,14),mats.steel);cradlePillar.position.set(1.65,BENCH_Y+.22,0);
 const cradleArc=new THREE.Mesh(new THREE.TorusGeometry(1.88,.075,12,24,Math.PI*.38),mats.darkAnodized);cradleArc.rotation.z=-Math.PI*.69;cradleArc.position.set(1.65,BEAM_Y,0);
 teltronGroup.add(standBase,rearPillar,neckClamp,cradlePillar,cradleArc);

 // Teltron D-Tube Internal Assembly & Borosilicate Bulb
 const bakeliteCap=new THREE.Mesh(new THREE.CylinderGeometry(.53,.55,.52,24),mats.bakelite);bakeliteCap.rotation.z=Math.PI/2;bakeliteCap.position.set(-5.05,BEAM_Y,0);bakeliteCap.castShadow=true;
 for(const [py,pz] of [[.12,.14],[-.12,.14],[.12,-.14],[-.12,-.14]]){const pin=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.22,10),mats.brass);pin.rotation.z=Math.PI/2;pin.position.set(-5.36,BEAM_Y+py,pz);teltronGroup.add(pin);}
 const ceramicSpacer=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.08,20),mats.ceramic);ceramicSpacer.rotation.z=Math.PI/2;ceramicSpacer.position.set(-4.52,BEAM_Y,0);
 gunGlowMesh=new THREE.Mesh(new THREE.SphereGeometry(.16,16,14),new THREE.MeshBasicMaterial({color:0xff9838}));gunGlowMesh.position.set(-4.35,BEAM_Y,0);
 const wehnelt=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.35,20),mats.steel);wehnelt.rotation.z=Math.PI/2;wehnelt.position.set(-4.15,BEAM_Y,0);
 const anodeCyl=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.95,22),mats.steel);anodeCyl.rotation.z=Math.PI/2;anodeCyl.position.set(-3.1,BEAM_Y,0);
 const hvCap=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,.22,16),mats.brass);hvCap.position.set(-2.65,BEAM_Y+.58,0);
 const targetHolder=new THREE.Mesh(new THREE.TorusGeometry(.34,.045,12,28),mats.brass);targetHolder.rotation.y=Math.PI/2;targetHolder.position.set(-1.7,BEAM_Y,0);
 const graphiteFoil=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.025,24),matStd(0x28303a,1,.04,.65,.45));graphiteFoil.rotation.z=Math.PI/2;graphiteFoil.position.set(-1.7,BEAM_Y,0);
 const neckGlass=new THREE.Mesh(new THREE.CylinderGeometry(.53,.53,3.6,28,1,true),mats.glass);neckGlass.rotation.z=Math.PI/2;neckGlass.position.set(-3.2,BEAM_Y,0);
 const bulbGlass=new THREE.Mesh(new THREE.SphereGeometry(1.85,36,28),mats.glass);bulbGlass.scale.set(1.48,1,1);bulbGlass.position.set(1.62,BEAM_Y,0);
 const screenDisc=new THREE.Mesh(new THREE.CylinderGeometry(1.75,1.75,.07,40),matStd(0x103c2f,.42,.16,.1,.25));screenDisc.material.depthWrite=false;screenDisc.rotation.z=Math.PI/2;screenDisc.position.set(4.28,BEAM_Y,0);
 const centralBeam=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,8.5,12),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.62}));centralBeam.rotation.z=Math.PI/2;centralBeam.position.set(0,BEAM_Y,0);
 const centerSpot=new THREE.Mesh(new THREE.CircleGeometry(.11,20),new THREE.MeshBasicMaterial({color:0xc9fff0,side:THREE.DoubleSide}));centerSpot.rotation.y=-Math.PI/2;centerSpot.position.set(4.22,BEAM_Y,0);
 teltronGroup.add(bakeliteCap,ceramicSpacer,gunGlowMesh,wehnelt,anodeCyl,hvCap,targetHolder,graphiteFoil,neckGlass,bulbGlass,screenDisc,centralBeam,centerSpot);

 innerCone=new THREE.Mesh(new THREE.ConeGeometry(1,5.92,36,1,true),new THREE.MeshBasicMaterial({color:colorGreen,transparent:true,opacity:.18,side:THREE.DoubleSide,depthWrite:false}));
 innerCone.rotation.z=Math.PI/2;innerCone.position.set(1.26,BEAM_Y,0);
 outerCone=new THREE.Mesh(new THREE.ConeGeometry(1,5.92,36,1,true),new THREE.MeshBasicMaterial({color:0x36d7b7,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false}));
 outerCone.rotation.z=Math.PI/2;outerCone.position.set(1.26,BEAM_Y,0);
 ring1Mesh=new THREE.Mesh(new THREE.TorusGeometry(1,.036,12,64),new THREE.MeshBasicMaterial({color:colorGreen}));ring1Mesh.rotation.y=Math.PI/2;ring1Mesh.position.set(4.22,BEAM_Y,0);
 ring2Mesh=new THREE.Mesh(new THREE.TorusGeometry(1,.032,12,64),new THREE.MeshBasicMaterial({color:0x3fe6ff}));ring2Mesh.rotation.y=Math.PI/2;ring2Mesh.position.set(4.22,BEAM_Y,0);
 teltronGroup.add(innerCone,outerCone,ring1Mesh,ring2Mesh);

 // 3D Stainless-Steel Vernier Caliper Assembly in front of phosphor screen
 const calStand=createOpticalPost(4.52,BEAM_Y+1.95,-.52,mats);
 const calBracket=new THREE.Mesh(new THREE.BoxGeometry(.09,.09,.32),mats.darkAnodized);calBracket.position.set(4.52,BEAM_Y,-.37);
 const calBeam=new THREE.Mesh(new THREE.BoxGeometry(.07,3.7,.14),mats.steel);calBeam.position.set(4.52,BEAM_Y,-.22);
 const makeJaw=(col)=>{
  const g=new THREE.Group();
  const arm=new THREE.Mesh(new THREE.BoxGeometry(.06,.05,.38),mats.brass);arm.position.set(0,0,.18);
  const tip=new THREE.Mesh(new THREE.BoxGeometry(.08,.04,.09),new THREE.MeshBasicMaterial({color:col}));tip.position.set(0,0,.38);
  g.add(arm,tip);return g;
 };
 jaw1Top=makeJaw(colorGreen);jaw1Bot=makeJaw(colorGreen);jaw2Top=makeJaw(colorCyan);jaw2Bot=makeJaw(colorCyan);
 jaw1Top.position.set(4.52,BEAM_Y,-.22);jaw1Bot.position.set(4.52,BEAM_Y,-.22);
 jaw2Top.position.set(4.52,BEAM_Y,-.22);jaw2Bot.position.set(4.52,BEAM_Y,-.22);
 teltronGroup.add(calStand,calBracket,calBeam,jaw1Top,jaw1Bot,jaw2Top,jaw2Bot);

 // EHT 0-6.0 kV High-Voltage Power Supply Unit + Analog Mirror Meter + Damped Needle
 const ehtGroup=new THREE.Group();ehtGroup.position.set(-2.7,BENCH_Y,-2.15);ehtGroup.rotation.y=0.28;teltronGroup.add(ehtGroup);
 const ehtBody=new THREE.Mesh(new THREE.BoxGeometry(2.35,1.28,1.35),mats.darkAnodized);ehtBody.position.y=.64;ehtBody.castShadow=true;ehtBody.receiveShadow=true;
 const ehtFace=new THREE.Mesh(new THREE.BoxGeometry(2.15,1.12,.05),matStd(0x1f3042,1,.02,.5,.4));ehtFace.position.set(0,.64,.67);
 for(const fx of [-1.19,1.19])for(let i=0;i<6;i++){const fin=new THREE.Mesh(new THREE.BoxGeometry(.04,.9,.12),mats.steel);fin.position.set(fx,.64,-.48+i*.19);ehtGroup.add(fin);}
 const meterBack=new THREE.Mesh(new THREE.BoxGeometry(.95,.62,.04),new THREE.MeshStandardMaterial({color:0xf3f7fa,roughness:.4}));meterBack.position.set(-.42,.82,.70);
 const mirrorStrip=new THREE.Mesh(new THREE.TorusGeometry(.36,.02,8,24,Math.PI*.72),mats.steel);mirrorStrip.rotation.z=Math.PI*.14;mirrorStrip.position.set(-.42,.60,.725);
 ehtNeedlePivot=new THREE.Group();ehtNeedlePivot.position.set(-.42,.58,.73);
 const needleMesh=new THREE.Mesh(new THREE.BoxGeometry(.018,.44,.015),new THREE.MeshBasicMaterial({color:0xef4444}));needleMesh.position.y=.22;
 const needleCap=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.03,14),mats.bakelite);needleCap.rotation.x=Math.PI/2;
 ehtNeedlePivot.add(needleMesh,needleCap);
 ehtKnobPivot=new THREE.Group();ehtKnobPivot.position.set(.56,.82,.72);
 const knobCyl=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,.16,24),mats.bakelite);knobCyl.rotation.x=Math.PI/2;
 const knobPtr=new THREE.Mesh(new THREE.BoxGeometry(.03,.18,.04),new THREE.MeshBasicMaterial({color:0xffffff}));knobPtr.position.set(0,.09,.08);
 ehtKnobPivot.add(knobCyl,knobPtr);
 const pwrSwitch=new THREE.Mesh(new THREE.BoxGeometry(.18,.12,.06),new THREE.MeshBasicMaterial({color:colorGreen}));pwrSwitch.position.set(.56,.34,.70);
 const sockHV=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.09,14),matStd(0xe11d48,1,.1,.2,.4));sockHV.rotation.x=Math.PI/2;sockHV.position.set(-.72,.28,.71);
 const sockGnd=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.09,14),mats.bakelite);sockGnd.rotation.x=Math.PI/2;sockGnd.position.set(-.36,.28,.71);
 const sockHtr=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.09,14),mats.brass);sockHtr.rotation.x=Math.PI/2;sockHtr.position.set(.0,.28,.71);
 ehtGroup.add(ehtBody,ehtFace,meterBack,mirrorStrip,ehtNeedlePivot,ehtKnobPivot,pwrSwitch,sockHV,sockGnd,sockHtr);

 // Connect drooping Silicone Leads precisely from EHT Sockets to Teltron Terminals
 ehtGroup.updateMatrixWorld(true);
 const pHV=sockHV.getWorldPosition(new THREE.Vector3()),pGnd=sockGnd.getWorldPosition(new THREE.Vector3()),pHtr=sockHtr.getWorldPosition(new THREE.Vector3());
 teltronGroup.add(createSiliconeLead([[pHV.x,pHV.y,pHV.z+.05],[pHV.x-.1,BENCH_Y+.35,-1.1],[-2.75,BENCH_Y+.9,-.55],[-2.65,BEAM_Y+.68,0]],.032,0xe11d48,mats));
 teltronGroup.add(createSiliconeLead([[pGnd.x,pGnd.y,pGnd.z+.05],[-3.9,BENCH_Y+.18,-1.3],[-4.8,BENCH_Y+.28,-.7],[-5.35,BEAM_Y+.12,.14]],.03,0x1e293b,mats));
 teltronGroup.add(createSiliconeLead([[pHtr.x,pHtr.y,pHtr.z+.05],[-3.6,BENCH_Y+.24,-1.2],[-4.6,BENCH_Y+.36,-.6],[-5.35,BEAM_Y-.12,-.14]],.03,0xeab308,mats));

 beamPackets=[];for(let i=0;i<10;i++){const pkt=new THREE.Mesh(new THREE.SphereGeometry(.065,10,8),new THREE.MeshBasicMaterial({color:0xffffff}));teltronGroup.add(pkt);beamPackets.push(pkt);}

 // 2. de Broglie Matter Wave on Grounded Optical Rail with Magnetic Quadrupole Coils
 debroglieGroup=new THREE.Group();scene.add(debroglieGroup);
 const dbRail=new THREE.Mesh(new THREE.BoxGeometry(10.6,.12,.38),mats.steel);dbRail.position.set(.1,BENCH_Y+.06,0);dbRail.receiveShadow=true;
 const dbGun=new THREE.Mesh(new THREE.CylinderGeometry(.32,.4,1.15,20),mats.darkAnodized);dbGun.rotation.z=Math.PI/2;dbGun.position.set(-4.7,BEAM_Y,0);
 const dbSnout=new THREE.Mesh(new THREE.CylinderGeometry(.14,.18,.35,18),mats.brass);dbSnout.rotation.z=Math.PI/2;dbSnout.position.set(-4.0,BEAM_Y,0);
 const faradayCup=new THREE.Mesh(new THREE.CylinderGeometry(.38,.32,.75,20),mats.steel);faradayCup.rotation.z=Math.PI/2;faradayCup.position.set(5.0,BEAM_Y,0);
 const dbAxis=new THREE.Mesh(new THREE.BoxGeometry(8.8,.02,.02),new THREE.MeshBasicMaterial({color:0x3d6785}));dbAxis.position.set(.4,BEAM_Y,0);
 debroglieGroup.add(dbRail,createOpticalPost(-4.7,BEAM_Y,0,mats),createOpticalPost(5.0,BEAM_Y,0,mats),dbGun,dbSnout,faradayCup,dbAxis);
 for(const qx of [-2.0,.4,2.8]){
  debroglieGroup.add(createOpticalPost(qx,BEAM_Y-.95,0,mats));
  const yoke=new THREE.Mesh(new THREE.TorusGeometry(.95,.08,12,32),mats.steel);yoke.rotation.y=Math.PI/2;yoke.position.set(qx,BEAM_Y,0);
  debroglieGroup.add(yoke);
  for(let p=0;p<4;p++){const a=p*Math.PI/2+Math.PI/4;const pole=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.32,12),mats.copper);pole.position.set(qx,BEAM_Y+Math.sin(a)*.74,Math.cos(a)*.74);pole.rotation.x=Math.PI/2-a;debroglieGroup.add(pole);}
 }
 const wPts=140;waveRealPos=new Float32Array(wPts*3);waveImagPos=new Float32Array(wPts*3);
 const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.BufferAttribute(waveRealPos,3));
 const ig=new THREE.BufferGeometry();ig.setAttribute('position',new THREE.BufferAttribute(waveImagPos,3));
 waveRealLine=new THREE.Line(rg,new THREE.LineBasicMaterial({color:colorCyan}));
 waveImagLine=new THREE.Line(ig,new THREE.LineBasicMaterial({color:colorPurple,transparent:true,opacity:.88}));
 debroglieGroup.add(waveRealLine,waveImagLine);
 waveNodes=[];for(let i=0;i<14;i++){const nd=new THREE.Mesh(new THREE.SphereGeometry(.10,12,10),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorGreen,emissiveIntensity:1.5}));debroglieGroup.add(nd);waveNodes.push(nd);}
 envRings=[];for(let i=0;i<18;i++){const er=new THREE.Mesh(new THREE.TorusGeometry(.72,.015,8,28),new THREE.MeshBasicMaterial({color:colorGreen,transparent:true,opacity:.26}));er.rotation.y=Math.PI/2;debroglieGroup.add(er);envRings.push(er);}

 // 3. Hexagonal Graphite Crystal Lattice + Precision Brass Goniometer + Articulated Bragg Arms
 crystalGroup=new THREE.Group();scene.add(crystalGroup);
 const gonioBase=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.6,.22,32),mats.darkAnodized);gonioBase.position.set(0,BENCH_Y+.11,0);gonioBase.receiveShadow=true;
 const gonioDial=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.2,.14,32),mats.brass);gonioDial.position.set(0,BENCH_Y+.29,0);
 const gonioStem=new THREE.Mesh(new THREE.CylinderGeometry(.12,.14,.42,16),mats.steel);gonioStem.position.set(0,BENCH_Y+.54,0);
 crystalGroup.add(gonioBase,gonioDial,gonioStem);

 planeTopMesh=new THREE.Mesh(new THREE.PlaneGeometry(4.8,3.6),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false}));planeTopMesh.rotation.x=Math.PI/2;
 planeBotMesh=new THREE.Mesh(new THREE.PlaneGeometry(4.8,3.6),new THREE.MeshBasicMaterial({color:colorPurple,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false}));planeBotMesh.rotation.x=Math.PI/2;
 crystalGroup.add(planeTopMesh,planeBotMesh);

 const buildGrapheneSheet=(atomMat,bondMat)=>{
  const grp=new THREE.Group(),pts=[],a=.68,s3=Math.sqrt(3);
  for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){
   const bx=(i+j*.5)*a*s3,bz=j*a*1.5;
   pts.push([bx,bz],[bx,bz+a]);
  }
  const uniq=[];
  for(const [x,z] of pts){if(!uniq.some(u=>Math.hypot(u[0]-x,u[1]-z)<.05)&&Math.hypot(x,z)<2.35)uniq.push([x,z]);}
  for(const [x,z] of uniq){const at=new THREE.Mesh(new THREE.SphereGeometry(.12,14,12),atomMat);at.position.set(x,0,z);at.castShadow=true;grp.add(at);}
  for(let p=0;p<uniq.length;p++)for(let q=p+1;q<uniq.length;q++){
   const dist=Math.hypot(uniq[p][0]-uniq[q][0],uniq[p][1]-uniq[q][1]);
   if(dist<a*1.15)grp.add(cylinderBetween(new THREE.Vector3(uniq[p][0],0,uniq[p][1]),new THREE.Vector3(uniq[q][0],0,uniq[q][1]),.032,bondMat));
  }
  return grp;
 };
 latticeTop=buildGrapheneSheet(matStd(colorCyan,1,.25,.4,.25),mats.steel);
 latticeBot=buildGrapheneSheet(matStd(colorPurple,1,.25,.4,.25),mats.steel);
 crystalGroup.add(latticeTop,latticeBot);
 dSpacerBar=new THREE.Mesh(new THREE.BoxGeometry(.06,1.5,.06),new THREE.MeshBasicMaterial({color:colorAmber}));dSpacerBar.position.set(-2.9,0,0);
 crystalGroup.add(dSpacerBar);

 incidentArm=new THREE.Group();
 const incTube=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,1.6,18),mats.steel);incTube.rotation.z=Math.PI/2;incTube.position.x=-2.7;
 const incNoz=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,.3,16),mats.brass);incNoz.rotation.z=Math.PI/2;incNoz.position.x=-1.8;
 incidentArm.add(incTube,incNoz);
 diffractedArm=new THREE.Group();
 const difTube=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,1.5,18),mats.darkAnodized);difTube.rotation.z=Math.PI/2;difTube.position.x=2.75;
 const difWin=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.12,16),matStd(colorGreen,1,.5,.2,.2));difWin.rotation.z=Math.PI/2;difWin.position.x=1.95;
 diffractedArm.add(difTube,difWin);
 braggBeamGroup=new THREE.Group();crystalGroup.add(incidentArm,diffractedArm,braggBeamGroup);

 // 4. Grounded Optical Rail Double-Slit Chamber with Micrometer & Fiber-Optic Which-Way Bridge
 doubleSlitGroup=new THREE.Group();scene.add(doubleSlitGroup);
 const dsRail=new THREE.Mesh(new THREE.BoxGeometry(10.4,.12,.38),mats.steel);dsRail.position.set(-.2,BENCH_Y+.06,0);dsRail.receiveShadow=true;
 const dsGun=new THREE.Mesh(new THREE.CylinderGeometry(.32,.4,1.15,20),mats.darkAnodized);dsGun.rotation.z=Math.PI/2;dsGun.position.set(-4.8,BEAM_Y,0);
 const dsSnout=new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,.3,16),mats.brass);dsSnout.rotation.z=Math.PI/2;dsSnout.position.set(-4.1,BEAM_Y,0);
 const slitPost=createOpticalPost(-1.2,BEAM_Y-1.35,0,mats);
 const slitFrame=new THREE.Mesh(new THREE.BoxGeometry(.22,2.85,3.75),mats.darkAnodized);slitFrame.position.set(-1.2,BEAM_Y,0);
 const wallTop=new THREE.Mesh(new THREE.BoxGeometry(.12,2.55,1.12),mats.copper);wallTop.position.set(-1.2,BEAM_Y,-1.22);
 const wallMid=new THREE.Mesh(new THREE.BoxGeometry(.12,2.55,.68),mats.copper);wallMid.position.set(-1.2,BEAM_Y,0);
 const wallBot=new THREE.Mesh(new THREE.BoxGeometry(.12,2.55,1.12),mats.copper);wallBot.position.set(-1.2,BEAM_Y,1.22);
 const microDrum=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.65,16),mats.brass);microDrum.position.set(-1.2,BEAM_Y+1.72,0);
 const dsScreen=new THREE.Mesh(new THREE.BoxGeometry(.12,2.9,5.0),matStd(0x10392c,.45,.15,.15,.25));dsScreen.material.depthWrite=false;dsScreen.position.set(4.45,BEAM_Y,0);
 const dsScreenFrame=new THREE.Mesh(new THREE.BoxGeometry(.18,3.1,5.2),mats.darkAnodized);dsScreenFrame.position.set(4.53,BEAM_Y,0);
 const ccdCam=new THREE.Mesh(new THREE.BoxGeometry(.55,.45,.45),mats.steel);ccdCam.position.set(4.85,BEAM_Y,0);
 detectorLamp1=new THREE.Mesh(new THREE.TorusGeometry(.22,.038,10,24),new THREE.MeshBasicMaterial({color:colorRose}));detectorLamp1.rotation.y=Math.PI/2;detectorLamp1.position.set(-1.02,BEAM_Y,-.52);
 detectorLamp2=new THREE.Mesh(new THREE.TorusGeometry(.22,.038,10,24),new THREE.MeshBasicMaterial({color:colorRose}));detectorLamp2.rotation.y=Math.PI/2;detectorLamp2.position.set(-1.02,BEAM_Y,.52);
 probeLaser1=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,1.1,8),new THREE.MeshBasicMaterial({color:colorRose,transparent:true,opacity:.85}));probeLaser1.position.set(-1.02,BEAM_Y+.65,-.52);
 probeLaser2=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,1.1,8),new THREE.MeshBasicMaterial({color:colorRose,transparent:true,opacity:.85}));probeLaser2.position.set(-1.02,BEAM_Y+.65,.52);
 flightSphere=new THREE.Mesh(new THREE.SphereGeometry(.12,14,12),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorGreen,emissiveIntensity:1.8}));
 hitPositions=new Float32Array(1400*3);
 hitPointsGeo=new THREE.BufferGeometry();hitPointsGeo.setAttribute('position',new THREE.BufferAttribute(hitPositions,3));
 const hitPts=new THREE.Points(hitPointsGeo,new THREE.PointsMaterial({color:colorGreen,size:.085,transparent:true,opacity:.92}));
 doubleSlitGroup.add(dsRail,createOpticalPost(-4.8,BEAM_Y,0,mats),slitPost,createOpticalPost(4.5,BEAM_Y-1.45,0,mats),dsGun,dsSnout,slitFrame,wallTop,wallMid,wallBot,microDrum,dsScreenFrame,dsScreen,ccdCam,detectorLamp1,detectorLamp2,probeLaser1,probeLaser2,flightSphere,hitPts);
 syncHitBuffer();

 const sPts=[];for(let i=0;i<240;i++)sPts.push((Math.random()-.5)*60,Math.random()*24-1,(Math.random()-.5)*60);
 const sGeo=new THREE.BufferGeometry();sGeo.setAttribute('position',new THREE.Float32BufferAttribute(sPts,3));
 stars=new THREE.Points(sGeo,new THREE.PointsMaterial({color:0x6badd7,size:.04,transparent:true,opacity:.55}));scene.add(stars);

 function resize(){const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,true);drawChart();}
 new ResizeObserver(resize).observe(host);resize();
 $('resetCamera').onclick=()=>{camera.position.set(2.0,3.5,10.6);orbit.target.set(0,BEAM_Y-.15,0);orbit.update();};
}

let fbCanvas,fbCtx,fbW=1,fbH=1;
const fbCam={yaw:.48,pitch:.28,dist:11.8,tx:0,ty:BEAM_Y-.15,tz:0};
function initFallback3D(){
 useFallback3D=true;const host=$('sceneHost');clearLoadingEl();
 fbCanvas=document.createElement('canvas');fbCanvas.setAttribute('aria-label','3D Simulation Canvas');host.appendChild(fbCanvas);fbCtx=fbCanvas.getContext('2d');
 function resize(){fbW=Math.max(1,host.clientWidth);fbH=Math.max(1,host.clientHeight);const dpr=Math.min(devicePixelRatio||1,2);fbCanvas.width=Math.round(fbW*dpr);fbCanvas.height=Math.round(fbH*dpr);fbCtx.setTransform(dpr,0,0,dpr,0,0);drawChart();}
 new ResizeObserver(resize).observe(host);resize();
 let drag=false,lx=0,ly=0;
 fbCanvas.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;fbCanvas.setPointerCapture?.(e.pointerId);});
 window.addEventListener('pointerup',()=>{drag=false;});
 window.addEventListener('pointermove',e=>{if(!drag)return;fbCam.yaw-=(e.clientX-lx)*.008;fbCam.pitch=Math.max(-.25,Math.min(1.25,fbCam.pitch+(e.clientY-ly)*.008));lx=e.clientX;ly=e.clientY;});
 fbCanvas.addEventListener('wheel',e=>{e.preventDefault();fbCam.dist=Math.max(4.5,Math.min(35,fbCam.dist+e.deltaY*.012));},{passive:false});
 $('resetCamera').onclick=()=>{fbCam.yaw=.48;fbCam.pitch=.28;fbCam.dist=11.8;};
}
function fbProject(x,y,z){
 const cy=Math.cos(fbCam.yaw),sy=Math.sin(fbCam.yaw),cp=Math.cos(fbCam.pitch),sp=Math.sin(fbCam.pitch);
 const dx=x-fbCam.tx,dy=y-fbCam.ty,dz=z-fbCam.tz;
 const rx=dx*cy-dz*sy,rz0=dx*sy+dz*cy,ry=dy*cp-rz0*sp,rz=dy*sp+rz0*cp+fbCam.dist;
 if(rz<=.2)return null;
 const f=fbH/(2*Math.tan(22*Math.PI/180));
 return {x:fbW*.5+(rx/rz)*f,y:fbH*.5-(ry/rz)*f,z:rz,s:f/rz};
}
function fbLine(a,b,col,w=1.5){const p1=fbProject(a[0],a[1],a[2]),p2=fbProject(b[0],b[1],b[2]);if(!p1||!p2)return;fbCtx.strokeStyle=col;fbCtx.lineWidth=w;fbCtx.beginPath();fbCtx.moveTo(p1.x,p1.y);fbCtx.lineTo(p2.x,p2.y);fbCtx.stroke();}
function fbDisc(c,r,col,glow=null){const p=fbProject(c[0],c[1],c[2]);if(!p)return;const pr=Math.max(1.4,r*p.s);if(glow){const g=fbCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,pr*2.6);g.addColorStop(0,glow);g.addColorStop(1,'rgba(0,0,0,0)');fbCtx.fillStyle=g;fbCtx.beginPath();fbCtx.arc(p.x,p.y,pr*2.6,0,Math.PI*2);fbCtx.fill();}fbCtx.fillStyle=col;fbCtx.beginPath();fbCtx.arc(p.x,p.y,pr,0,Math.PI*2);fbCtx.fill();}
function fbCircleYZ(x,cy,cz,r,col,lw=2){const pts=Array.from({length:40},(_,i)=>{const a=i*Math.PI*2/40;return fbProject(x,cy+Math.sin(a)*r,cz+Math.cos(a)*r);});if(pts.every(Boolean)){fbCtx.strokeStyle=col;fbCtx.lineWidth=lw;fbCtx.beginPath();pts.forEach((p,i)=>i?fbCtx.lineTo(p.x,p.y):fbCtx.moveTo(p.x,p.y));fbCtx.closePath();fbCtx.stroke();}}

function updateFallback3D(){
 if(!fbCtx)return;
 const ph=calcPhysics(),m=S.module;
 const grad=fbCtx.createRadialGradient(fbW*.55,fbH*.38,20,fbW*.5,fbH*.5,Math.max(fbW,fbH)*.72);
 grad.addColorStop(0,'#122b44');grad.addColorStop(.55,'#091728');grad.addColorStop(1,'#060f1c');
 fbCtx.fillStyle=grad;fbCtx.fillRect(0,0,fbW,fbH);
 for(let i=-12;i<=12;i+=2){fbLine([i,BENCH_Y,-10],[i,BENCH_Y,10],'rgba(42,103,133,0.22)',1);fbLine([-12,BENCH_Y,i],[12,BENCH_Y,i],'rgba(42,103,133,0.22)',1);}

 if(m==='teltron'||m==='assessment'){
  const r1=Math.max(.1,Math.min(1.62,ph.R1cm*.55)),r2=Math.max(.18,Math.min(1.70,ph.R2cm*.55));
  fbLine([-4.8,BENCH_Y,0],[2.6,BENCH_Y,0],'#3b536b',5);
  fbLine([-3.8,BENCH_Y,0],[-3.8,BEAM_Y-.55,0],'#9fb8cc',4);fbLine([1.65,BENCH_Y,0],[1.65,BEAM_Y-1.85,0],'#9fb8cc',4);
  fbCircleYZ(-3.8,BEAM_Y,0,.58,'#d99b26',3);fbCircleYZ(-1.7,BEAM_Y,0,.36,'#d99b26',2.5);
  fbCircleYZ(4.22,BEAM_Y,0,1.76,'rgba(125,205,235,0.55)',2);
  fbLine([-3.8,BENCH_Y,-2.1],[-1.6,BENCH_Y,-2.1],'#647e9e',3);fbLine([-3.8,BENCH_Y+1.2,-1.5],[-1.6,BENCH_Y+1.2,-1.5],'#647e9e',2.5);
  fbLine([-3.4,BENCH_Y+.3,-1.5],[-2.7,BENCH_Y+.8,-1.5],'#e11d48',2);fbLine([-2.7,BENCH_Y+.8,-1.5],[-2.65,BEAM_Y+.58,0],'#e11d48',2.2);
  fbLine([-2.9,BENCH_Y+.3,-1.5],[-4.8,BENCH_Y+.3,-.8],'#1e293b',2);fbLine([-4.8,BENCH_Y+.3,-.8],[-5.3,BEAM_Y,0],'#eab308',2);
  fbDisc([-4.35,BEAM_Y,0],.18,'#ff9838','rgba(255,152,56,0.8)');
  fbLine([-4.35,BEAM_Y,0],[4.22,BEAM_Y,0],'rgba(69,221,243,0.75)',2.4);
  for(let k=0;k<8;k++){const a=k*Math.PI/4;fbLine([-1.7,BEAM_Y,0],[4.22,BEAM_Y+Math.sin(a)*r1,Math.cos(a)*r1],'rgba(77,247,166,0.35)',1.2);fbLine([-1.7,BEAM_Y,0],[4.22,BEAM_Y+Math.sin(a)*r2,Math.cos(a)*r2],'rgba(63,230,255,0.25)',1);}
  fbCircleYZ(4.22,BEAM_Y,0,r1,'#4df7a6',3.2);fbCircleYZ(4.22,BEAM_Y,0,r2,'#3fe6ff',2.8);
  fbDisc([4.22,BEAM_Y,0],.11,'#baffea','rgba(77,247,166,0.9)');
  fbLine([4.52,BENCH_Y,-.22],[4.52,BEAM_Y+1.8,-.22],'#9fb8cc',3);
  fbLine([4.52,BEAM_Y-r1,-.22],[4.52,BEAM_Y-r1,.16],'#4df7a6',3);fbLine([4.52,BEAM_Y+r1,-.22],[4.52,BEAM_Y+r1,.16],'#4df7a6',3);
  fbLine([4.52,BEAM_Y-r2,-.22],[4.52,BEAM_Y-r2,.16],'#45ddf3',3);fbLine([4.52,BEAM_Y+r2,-.22],[4.52,BEAM_Y+r2,.16],'#45ddf3',3);
 }else if(m==='debroglie'){
  fbLine([-5.0,BENCH_Y,0],[5.2,BENCH_Y,0],'#8aa3b8',4);
  fbLine([-4.7,BENCH_Y,0],[-4.7,BEAM_Y,0],'#9fb8cc',3);fbLine([5.0,BENCH_Y,0],[5.0,BEAM_Y,0],'#9fb8cc',3);
  for(const qx of [-2.0,.4,2.8]){fbLine([qx,BENCH_Y,0],[qx,BEAM_Y-.95,0],'#9fb8cc',2.5);fbCircleYZ(qx,BEAM_Y,0,.95,'#c86d3b',2.5);}
  const kVis=Math.max(1.2,Math.min(9.5,2.1*Math.sqrt(S.vaKV)*Math.sqrt(ph.part.massFactor>10?6:1)));
  let prevR=null,prevI=null;
  for(let i=0;i<110;i++){
   const x=-4.0+i*8.6/109,phVal=kVis*x-S.t*4.5;
   const pr=[x,BEAM_Y+.8*Math.cos(phVal),0],pi=[x,BEAM_Y,0+.8*Math.sin(phVal)];
   if(prevR)fbLine(prevR,pr,'#45ddf3',2.2);if(prevI)fbLine(prevI,pi,'rgba(165,155,255,0.8)',1.6);
   prevR=pr;prevI=pi;
  }
  for(let i=0;i<10;i++){const x=-3.8+((S.t*1.6+i*.85)%8.4);fbDisc([x,BEAM_Y,0],.09,'#ffffff','rgba(77,247,166,0.85)');}
 }else if(m==='crystal'){
  fbLine([0,BENCH_Y,0],[0,-.5,0],'#d99b26',5);
  const sep=S.plane==='10'?.78:.48;
  for(const ly of [sep,-sep]){
   for(let gx=-1;gx<=1;gx++)for(let gz=-1;gz<=1;gz++)fbDisc([(gz%2?.45:0)+gx*.95,ly,gz*.85],.11,ly>0?'#45ddf3':'#a59bff');
  }
  const th=S.plane==='10'?ph.theta1:ph.theta2,visTh=Math.max(.18,Math.min(.92,th*5.5));
  const dx=Math.cos(visTh)*3.2,dy=Math.sin(visTh)*3.2;
  fbLine([-dx,sep+dy,0],[0,sep,0],'#4df7a6',2.8);fbLine([0,sep,0],[dx,sep+dy,0],'#4df7a6',2.8);
  fbLine([-dx,-sep+dy,0],[0,-sep,0],'#ffc96b',2.4);fbLine([0,-sep,0],[dx,-sep+dy,0],'#ffc96b',2.4);
  fbLine([-2.9,-sep,0],[-2.9,sep,0],'#ffc96b',3.5);
 }else if(m==='doubleslit'){
  fbLine([-5.0,BENCH_Y,0],[4.8,BENCH_Y,0],'#8aa3b8',4);
  fbLine([-4.8,BENCH_Y,0],[-4.8,BEAM_Y,0],'#9fb8cc',3);fbLine([-1.2,BENCH_Y,0],[-1.2,BEAM_Y-1.35,0],'#9fb8cc',3);
  for(const z of [-1.22,0,1.22]){const w=z===0?.34:.56;fbLine([-1.2,BEAM_Y-1.3,z-w],[-1.2,BEAM_Y+1.3,z-w],'#c86d3b',2);fbLine([-1.2,BEAM_Y-1.3,z+w],[-1.2,BEAM_Y+1.3,z+w],'#c86d3b',2);}
  fbCircleYZ(-1.02,BEAM_Y,-.52,.22,S.whichWay?'#ff6b8b':'rgba(120,140,160,0.4)',2.5);
  fbCircleYZ(-1.02,BEAM_Y,.52,.22,S.whichWay?'#ff6b8b':'rgba(120,140,160,0.4)',2.5);
  fbLine([4.45,BEAM_Y-1.45,-2.5],[4.45,BEAM_Y-1.45,2.5],'#2c6858',2);fbLine([4.45,BEAM_Y+1.45,-2.5],[4.45,BEAM_Y+1.45,2.5],'#2c6858',2);
  for(const pt of S.hits.slice(-600))fbDisc(pt,.05,'#4df7a6');
  if(S.flight)fbDisc(S.flight.pos,.11,'#ffffff','rgba(77,247,166,0.9)');
 }
}

function update3D(){
 if(useFallback3D){updateFallback3D();return;}
 if(!teltronGroup)return;
 const ph=calcPhysics(),m=S.module;
 teltronGroup.visible=m==='teltron'||m==='assessment';
 debroglieGroup.visible=m==='debroglie';
 crystalGroup.visible=m==='crystal';
 doubleSlitGroup.visible=m==='doubleslit';

 if(teltronGroup.visible){
  const r1=Math.max(.1,Math.min(1.60,ph.R1cm*.55)),r2=Math.max(.18,Math.min(1.68,ph.R2cm*.55));
  gunGlowMesh.scale.setScalar(.85+.25*(S.vaKV/6)+.1*Math.sin(S.t*8));
  innerCone.scale.set(r1,1,r1);outerCone.scale.set(r2,1,r2);
  ring1Mesh.scale.setScalar(r1);ring2Mesh.scale.setScalar(r2);
  jaw1Top.position.y=BEAM_Y+r1;jaw1Bot.position.y=BEAM_Y-r1;
  jaw2Top.position.y=BEAM_Y+r2;jaw2Bot.position.y=BEAM_Y-r2;
  ehtNeedlePivot.rotation.z=ehtNeedlePhysics.update(-((S.vaKV/6)-.5)*1.55);
  ehtKnobPivot.rotation.z=-((S.vaKV-1.5)/4.5)*4.2+2.1;
  beamPackets.forEach((pkt,i)=>{
   const u=((S.t*.9+i/beamPackets.length)%1),x=-4.3+u*8.52;
   if(i%3===0||x<-1.7){pkt.position.set(x,BEAM_Y,0);}
   else{const r=i%2?r1:r2,ang=i*1.9,frac=(x+1.7)/5.92;pkt.position.set(x,BEAM_Y+Math.sin(ang)*r*frac,Math.cos(ang)*r*frac);}
  });
 }else if(m==='debroglie'){
  const kVis=Math.max(1.2,Math.min(11,2.1*Math.sqrt(S.vaKV)*Math.sqrt(ph.part.massFactor>10?6:1)));
  const nPts=140;
  for(let i=0;i<nPts;i++){
   const x=-4.0+i*8.6/(nPts-1),phase=kVis*x-S.t*4.5;
   waveRealPos[i*3]=x;waveRealPos[i*3+1]=BEAM_Y+.78*Math.cos(phase);waveRealPos[i*3+2]=0;
   waveImagPos[i*3]=x;waveImagPos[i*3+1]=BEAM_Y;waveImagPos[i*3+2]=.78*Math.sin(phase);
  }
  waveRealLine.geometry.attributes.position.needsUpdate=true;
  waveImagLine.geometry.attributes.position.needsUpdate=true;
  waveNodes.forEach((nd,i)=>{const x=-3.8+((S.t*1.6+i*.65)%8.4);nd.position.set(x,BEAM_Y,0);});
  envRings.forEach((er,i)=>{
   const x=-3.8+i*8.4/(envRings.length-1),sc=.35+.55*Math.abs(Math.cos(kVis*x-S.t*4.5));
   er.position.set(x,BEAM_Y,0);er.scale.setScalar(sc);
  });
 }else if(m==='crystal'){
  const sep=S.plane==='10'?.78:.48;
  planeTopMesh.position.y=sep;planeBotMesh.position.y=-sep;
  latticeTop.position.y=sep;latticeBot.position.y=-sep;
  setBarSpanY(dSpacerBar,-sep,sep,-2.9,0);
  const th=S.plane==='10'?ph.theta1:ph.theta2,visTh=Math.max(.18,Math.min(.92,th*5.5));
  incidentArm.position.set(0,sep,0);incidentArm.rotation.z=-visTh;
  diffractedArm.position.set(0,sep,0);diffractedArm.rotation.z=visTh;
  while(braggBeamGroup.children.length)braggBeamGroup.remove(braggBeamGroup.children[0]);
  const dx=Math.cos(visTh)*3.2,dy=Math.sin(visTh)*3.2;
  const addSeg=(a,b,col)=>{braggBeamGroup.add(cylinderBetween(a,b,.03,new THREE.MeshBasicMaterial({color:col})));};
  addSeg(new THREE.Vector3(-dx,sep+dy,0),new THREE.Vector3(0,sep,0),colorGreen);
  addSeg(new THREE.Vector3(0,sep,0),new THREE.Vector3(dx,sep+dy,0),colorGreen);
  addSeg(new THREE.Vector3(-dx,-sep+dy,0),new THREE.Vector3(0,-sep,0),colorAmber);
  addSeg(new THREE.Vector3(0,-sep,0),new THREE.Vector3(dx,-sep+dy,0),colorAmber);
 }else if(m==='doubleslit'){
  detectorLamp1.material.color.setHex(S.whichWay?colorRose:0x2b3e52);
  detectorLamp2.material.color.setHex(S.whichWay?colorRose:0x2b3e52);
  probeLaser1.visible=S.whichWay;probeLaser2.visible=S.whichWay;
  if(S.flight){flightSphere.visible=true;flightSphere.position.set(S.flight.pos[0],S.flight.pos[1],S.flight.pos[2]);}
  else flightSphere.visible=false;
 }
 orbit.update();renderer.render(scene,camera);
}

function advanceDoubleSlit(dt){
 if(S.module!=='doubleslit'||!S.running)return;
 S.emitTimer+=dt*S.timeScale;
 if(!S.flight&&S.emitTimer>=.22){
  S.emitTimer=0;
  const zTarget=sampleDoubleSlitZ(),yTarget=BEAM_Y+(Math.random()*2-1)*1.2,slitZ=Math.random()<.5?-.52:.52;
  S.flight={prog:0,slitZ,zTarget,yTarget,pos:[-4.5,BEAM_Y,0]};
 }
 if(S.flight){
  S.flight.prog+=dt*S.timeScale*2.1;
  const u=Math.min(1,S.flight.prog);
  if(u<.4){
   const k=u/.4;S.flight.pos=[-4.5+3.3*k,BEAM_Y,S.flight.slitZ*k];
  }else{
   const k=(u-.4)/.6;S.flight.pos=[-1.2+5.55*k,BEAM_Y+(S.flight.yTarget-BEAM_Y)*k,S.flight.slitZ+(S.flight.zTarget-S.flight.slitZ)*k];
  }
  if(u>=1){
   S.hits.push([4.35,S.flight.yTarget,S.flight.zTarget]);
   S.firedCount++;if(S.hits.length>1400)S.hits.shift();
   syncHitBuffer();S.flight=null;
  }
 }
}

function computeRegression(){
 if(S.records.length<2)return null;
 let sumX2=0,sumXY1=0,sumXY2=0;
 for(const rec of S.records){
  const x=rec.invSqrtV,y1=rec.R1cm/100,y2=rec.R2cm/100;
  sumX2+=x*x;sumXY1+=x*y1;sumXY2+=x*y2;
 }
 if(sumX2===0)return null;
 const k1=sumXY1/sumX2,k2=sumXY2/sumX2,L=S.Lcm/100;
 const factor=L*H_PLANCK/Math.sqrt(2*M_ELECTRON*E_CHARGE);
 const d10Exp=factor/k1,d11Exp=factor/k2;
 const err10=Math.abs(d10Exp-D10)/D10*100,err11=Math.abs(d11Exp-D11)/D11*100;
 return {k1,k2,d10Nm:d10Exp*1e9,d11Nm:d11Exp*1e9,err10,err11};
}

function renderRecordsAndRegression(){
 const wrap=$('labTableWrap'),regBox=$('regressionSummary');if(!wrap||!regBox)return;
 if(S.records.length===0){
  wrap.innerHTML='<div style="padding:12px;color:#7f9ab8;font-size:11.5px;text-align:center">ยังไม่มีข้อมูลในตาราง — ปรับค่า Vₐ แล้วกด "＋ บันทึกค่าลงตาราง"</div>';
  regBox.innerHTML='ต้องการข้อมูลอย่างน้อย <b>2 ค่า Vₐ</b> เพื่อวิเคราะห์กราฟเชิงเส้นหาค่า d₁₀ และ d₁₁';
  return;
 }
 wrap.innerHTML=`<table class="data-table"><thead><tr><th>#</th><th>Vₐ (kV)</th><th>Vₐ⁻¹/²</th><th>λ (pm)</th><th>R₁ (cm)</th><th>R₂ (cm)</th><th>R₂/R₁</th><th></th></tr></thead><tbody>${
  S.records.map((r,idx)=>`<tr><td>${idx+1}</td><td>${fmt(r.vaKV,2)}</td><td>${fmt(r.invSqrtV,5)}</td><td>${fmt(r.lambdaPm,2)}</td><td>${fmt(r.R1cm,2)}</td><td>${fmt(r.R2cm,2)}</td><td>${fmt(r.R2cm/r.R1cm,3)}</td><td><button class="del-row" data-idx="${idx}" title="ลบแถว">✕</button></td></tr>`).join('')
 }</tbody></table>`;
 wrap.querySelectorAll('.del-row').forEach(btn=>btn.addEventListener('click',()=>{S.records.splice(+btn.dataset.idx,1);renderRecordsAndRegression();drawChart();}));
 const reg=computeRegression();
 if(!reg){
  regBox.innerHTML='บันทึกเพิ่มอีกอย่างน้อย 1 จุด เพื่อคำนวณความชันเชิงเส้น (R เทียบกับ Vₐ⁻¹/²)';
 }else{
  regBox.innerHTML=`<b>ผลการวิเคราะห์ถดถอยเชิงเส้น (${S.records.length} จุด):</b><br>ความชัน k₁ = <b>${fmt(reg.k1,4)}</b> m·V¹/² → d₁₀,exp = <b>${fmt(reg.d10Nm,4)} nm</b> (Error ${fmt(reg.err10,2)}%)<br>ความชัน k₂ = <b>${fmt(reg.k2,4)}</b> m·V¹/² → d₁₁,exp = <b>${fmt(reg.d11Nm,4)} nm</b> (Error ${fmt(reg.err11,2)}%)`;
 }
}

function renderQuiz(){
 const wrap=$('quizWrap');if(!wrap)return;
 let score=0;QUIZ_ITEMS.forEach((item,i)=>{if(S.quizAnswers[i]===item.ans)score++;});
 setText('quizScore',`คะแนน ${score}/${QUIZ_ITEMS.length}`);
 wrap.innerHTML=`<div class="quiz-head"><span>แบบประเมินความเข้าใจ (5 ข้อ)</span><button id="resetQuiz" class="ghost-btn">ทำแบบทดสอบใหม่</button></div>`+
  QUIZ_ITEMS.map((item,qi)=>{
   const chosen=S.quizAnswers[qi],answered=chosen!==undefined;
   return `<div class="quiz-card"><p class="quiz-q">${item.q}</p><div class="quiz-opts">${
    item.opts.map((opt,oi)=>{
     let cls='quiz-opt';
     if(answered&&oi===item.ans)cls+=' correct';
     else if(answered&&oi===chosen&&chosen!==item.ans)cls+=' wrong';
     return `<button class="${cls}" data-q="${qi}" data-o="${oi}">${opt}</button>`;
    }).join('')
   }</div>${answered?`<div class="quiz-exp">${item.exp}</div>`:''}</div>`;
  }).join('');
 wrap.querySelectorAll('.quiz-opt').forEach(btn=>btn.addEventListener('click',()=>{S.quizAnswers[+btn.dataset.q]=+btn.dataset.o;renderQuiz();}));
 const rq=$('resetQuiz');if(rq)rq.addEventListener('click',()=>{S.quizAnswers={};renderQuiz();});
}

function recordCurrentPoint(){
 const ph=calcPhysics();
 const exist=S.records.findIndex(r=>Math.abs(r.vaKV-S.vaKV)<.05);
 const row={vaKV:S.vaKV,invSqrtV:ph.invSqrtV,lambdaPm:ph.lambdaPm,R1cm:ph.R1cm,R2cm:ph.R2cm};
 if(exist>=0)S.records[exist]=row;else S.records.push(row);
 S.records.sort((a,b)=>a.vaKV-b.vaKV);
 renderRecordsAndRegression();drawChart();
}

function dynamicFields(){
 const m=S.module;let html='';
 if(m==='teltron'||m==='assessment'){
  html+=`<div class="field"><label for="field-Lcm">ระยะจากเป้าแกรไฟต์ถึงฉาก L (cm)</label><input id="field-Lcm" type="number" min="8" max="20" step="0.5" value="${S.Lcm}"><small>ค่ามาตรฐานหลอด Teltron อยู่ที่ 13.5 cm</small></div>`;
 }
 if(m==='debroglie'||m==='teltron'){
  html+=`<div class="field"><label for="field-particle">ชนิดของอนุภาค (Particle)</label><select id="field-particle"><option value="electron"${S.particle==='electron'?' selected':''}>อิเล็กตรอน (e⁻, m = 1 mₑ)</option><option value="muon"${S.particle==='muon'?' selected':''}>มิวออน (μ⁻, m = 206.8 mₑ)</option><option value="proton"${S.particle==='proton'?' selected':''}>โปรตอน (p⁺, m = 1836 mₑ)</option></select><small>มวลอนุภาคที่มากขึ้นทำให้ความยาวคลื่น λ สั้นลง</small></div>`;
 }
 if(m==='crystal'){
  html+=`<div class="field"><label for="field-plane">ระนาบผลึกแกรไฟต์ที่ศึกษา</label><select id="field-plane"><option value="10"${S.plane==='10'?' selected':''}>ระนาบ (10) · d₁₀ = 0.213 nm (วงใน)</option><option value="11"${S.plane==='11'?' selected':''}>ระนาบ (11) · d₁₁ = 0.123 nm (วงนอก)</option></select><small>อัตราส่วน d₁₀ / d₁₁ = √3 ≈ 1.732</small></div>`;
 }
 if(m==='doubleslit'){
  html+=`<div class="field"><div class="toggle-row"><span>เปิดตรวจวัดเส้นทาง (Which-Way Detector)</span><input id="field-whichWay" type="checkbox"${S.whichWay?' checked':''}></div><small>เมื่อเปิดใช้งาน จะทราบว่าอิเล็กตรอนผ่านช่องซ้ายหรือขวา ทำให้แถบแทรกสอดหายไป</small><div class="btn-row"><button id="burst100" class="accent-btn">＋ ยิง +100 อิเล็กตรอน</button><button id="clearHits" class="secondary-btn">ล้างจุดบนฉาก</button></div></div>`;
 }
 $('dynamicControls').innerHTML=html;
 const fL=$('field-Lcm');if(fL)fL.addEventListener('input',e=>{const n=+e.target.value;if(Number.isFinite(n)){S.Lcm=Math.max(8,Math.min(20,n));updateMeasurements();}});
 const fP=$('field-particle');if(fP)fP.addEventListener('change',e=>{S.particle=e.target.value;updateMeasurements();});
 const fPl=$('field-plane');if(fPl)fPl.addEventListener('change',e=>{S.plane=e.target.value;updateMeasurements();});
 const fW=$('field-whichWay');if(fW)fW.addEventListener('change',e=>{S.whichWay=e.target.checked;resetDoubleSlitHits(35);updateMeasurements();});
 const b100=$('burst100');if(b100)b100.addEventListener('click',()=>{addElectronHits(100);updateMeasurements();});
 const cH=$('clearHits');if(cH)cH.addEventListener('click',()=>{resetDoubleSlitHits(0);updateMeasurements();});
}

function switchModule(m){
 S.module=m;S.t=0;const d=modules[m];
 setText('moduleTitle',d.title);setText('breadcrumbName',d.crumb);setText('sceneHeading',d.scene);
 setText('chartTitle',d.chart);setText('moduleDescription',d.description);setText('activityText',d.activity);
 $('moduleNav').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.module===m));
 $('theory').innerHTML=`<div class="formula">${d.formula}</div><p>${d.explain}</p><p class="theory-hint">ค่าคงตัว: h = 6.626×10⁻³⁴ J·s, mₑ = 9.109×10⁻³¹ kg, e = 1.602×10⁻¹⁹ C</p>`;
 const panel=$('labAssessmentPanel');
 if(panel){panel.classList.toggle('panel-focus',m==='assessment');if(m==='assessment')panel.scrollIntoView({behavior:'smooth',block:'nearest'});}
 dynamicFields();updateViewportTags();updateMeasurements();
}

function addReading(label,value,unit='',tone=''){return `<div class="reading"><div><span class="reading-label">${label}</span>${unit?`<span class="reading-unit">${unit}</span>`:''}</div><span class="reading-value ${tone}">${value}</span></div>`;}
function updateMeasurements(){
 const ph=calcPhysics();
 setText('metricVa',`${fmt(S.vaKV,2)} kV`);setText('metricVaNote',`Vₐ = ${fmt(ph.Va,0)} V`);
 setText('metricLambda',ph.lambdaPm>=1?`${fmt(ph.lambdaPm,2)} pm`:`${fmt(ph.lambdaPm,4)} pm`);
 setText('metricR1',`${fmt(ph.R1cm,2)} cm`);setText('metricR2',`${fmt(ph.R2cm,2)} cm`);
 setText('voltageValue',`${fmt(S.vaKV,2)} kV`);
 setText('transportClock',S.module==='doubleslit'?`${S.firedCount} e⁻`:`${fmt(S.t,2)} s`);
 document.querySelectorAll('.voltage-presets button').forEach(el=>el.classList.toggle('selected',Math.abs(+el.dataset.va-S.vaKV)<.05));

 let r='';const add=(...args)=>{r+=addReading(...args);};
 add('โมเมนตัมอนุภาค p',`${sci(ph.p,3)} kg·m/s`,ph.part.name,'purple');
 add('อัตราเร็ว v (เทียบ c)',`${fmt(ph.beta*100,2)} % c`,`${sci(ph.v,3)} m/s`);
 add('ความยาวคลื่นเดอบรอยล์ λ',`${fmt(ph.lambdaNm,5)} nm`,`${fmt(ph.lambdaPm,2)} pm`,'green');
 if(S.module==='crystal'){
  const thDeg=(S.plane==='10'?ph.theta1:ph.theta2)*180/Math.PI;
  add(`มุมแบรกก์ θ (${S.plane})`,`${fmt(thDeg,2)} °`,'n = 1','amber');
  add('ความต่างทางเดินคลื่น 2d sinθ',`${fmt(ph.lambdaNm,5)} nm`,'= λ (แทรกสอดเสริม)');
 }else if(S.module==='doubleslit'){
  add('จำนวนอิเล็กตรอนสะสม',`${S.firedCount} ตัว`,S.whichWay?'ตรวจวัดเส้นทาง (2 แถบ)':'ซ้อนทับควอนตัม (แทรกสอด)','green');
  add('สถานะฟังก์ชันคลื่น',S.whichWay?'ยุบตัว (Decoherence)':'แทรกสอดเสริม–หักล้าง','P(z)','amber');
 }else{
  add('รัศมีวงใน R₁ (ระนาบ 10)',`${fmt(ph.R1cm,2)} cm`,`2θ₁ = ${fmt(ph.theta1*360/Math.PI,2)}°`,'green');
  add('รัศมีวงนอก R₂ (ระนาบ 11)',`${fmt(ph.R2cm,2)} cm`,`2θ₂ = ${fmt(ph.theta2*360/Math.PI,2)}°`);
  add('อัตราส่วน R₂ / R₁',`${fmt(ph.R2cm/ph.R1cm,3)}`,'ทฤษฎี √3 ≈ 1.732','amber');
 }
 $('readings').innerHTML=r;updateViewportTags();drawChart();update3D();
}

function calcSeries(){
 const ph=calcPhysics(),n=110,pts=[],lines=[];
 let minX=0.012,maxX=0.026,xLabel='แกน X: 1 / √Vₐ (V⁻¹/²)',yLabel='แกน Y: รัศมีวงแหวน R (cm)',markerX=ph.invSqrtV,eqText='';
 if(S.module==='teltron'||S.module==='assessment'){
  eqText='สมการกราฟ: R = (Lh / d√(2mₑe)) · (1/√Vₐ)   [d₁₀ = 0.213 nm, d₁₁ = 0.123 nm]';
  lines.push({name:'R₁ (d₁₀ = 0.213 nm)',color:'#4df7a6',fn:x=>((S.Lcm*H_PLANCK)/(D10*Math.sqrt(2*ph.part.mass*ph.part.charge)))*x});
  lines.push({name:'R₂ (d₁₁ = 0.123 nm)',color:'#45ddf3',fn:x=>((S.Lcm*H_PLANCK)/(D11*Math.sqrt(2*ph.part.mass*ph.part.charge)))*x});
 }else if(S.module==='debroglie'){
  minX=1.5;maxX=6.0;xLabel='แกน X: ความต่างศักย์ Vₐ (kV)';yLabel='แกน Y: ความยาวคลื่น λ (pm)';markerX=S.vaKV;
  eqText=`สมการกราฟ: λ = h / √(2meVₐ)   (${ph.part.symbol} : λ = ${fmt(ph.lambdaPm,2)} pm)`;
  lines.push({name:`λ (${ph.part.symbol})`,color:'#4df7a6',fn:v=>(H_PLANCK/Math.sqrt(2*ph.part.mass*ph.part.charge*v*1000))*1e12});
 }else if(S.module==='crystal'){
  minX=0;maxX=15;xLabel='แกน X: มุมแบรกก์ θ (องศา °)';yLabel='แกน Y: ความเข้มการสะท้อนสัมพัทธ์';
  const thDeg=(S.plane==='10'?ph.theta1:ph.theta2)*180/Math.PI;markerX=thDeg;
  eqText=`สมการแบรกก์: 2d sinθ = nλ  (n = 1, ระนาบ ${S.plane}, θ = ${fmt(thDeg,2)}°)`;
  lines.push({name:`Bragg Peak (${S.plane})`,color:'#ffcb72',fn:x=>Math.exp(-((x-thDeg)**2)/.35)});
 }else if(S.module==='doubleslit'){
  minX=-2.4;maxX=2.4;xLabel='แกน X: ตำแหน่งบนฉาก z (cm)';yLabel='แกน Y: ความน่าจะเป็น P(z)';markerX=0;
  eqText=S.whichWay?'สมการความน่าจะเป็น: P(z) = |ψ₁|² + |ψ₂|²  (ตรวจวัดเส้นทาง — ยุบตัว 2 แถบ)':'สมการความน่าจะเป็น: P(z) = |ψ₁ + ψ₂|² = I₀ cos²(βz) sinc²(αz)';
  const wf=Math.max(.55,Math.min(1.6,20.7/Math.max(5,ph.lambdaPm))),betaS=2.8/wf,alphaS=.62/wf;
  lines.push({name:S.whichWay?'Classical |ψ₁|²+|ψ₂|²':'Quantum |ψ₁+ψ₂|²',color:S.whichWay?'#ff6b8b':'#4df7a6',fn:z=>{
   if(S.whichWay){const s=.56;return .5*(Math.exp(-((z-s)**2)/.11)+Math.exp(-((z+s)**2)/.11));}
   const env=alphaS*z===0?1:Math.sin(alphaS*z)/(alphaS*z);
   return (Math.cos(betaS*z)**2)*(env**2)*Math.exp(-(z*z)/4.5);
  }});
 }
 for(let i=0;i<=n;i++){const x=minX+(maxX-minX)*i/n;pts.push({x,values:lines.map(l=>l.fn(x))});}
 return {pts,lines,minX,maxX,xLabel,yLabel,markerX,eqText};
}

function drawChart(){
 const canvas=$('physicsChart');if(!canvas)return;const rect=canvas.getBoundingClientRect();if(rect.width===0)return;
 const dpr=Math.min(devicePixelRatio,2);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
 const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);const W=rect.width,H=rect.height;
 const {pts,lines,minX,maxX,xLabel,yLabel,markerX,eqText}=calcSeries();
 const left=66,right=22,top=36,bottom=50,w=W-left-right,h=H-top-bottom;
 const vals=pts.flatMap(p=>p.values);let lo=Math.min(0,...vals),hi=Math.max(1e-6,...vals);if(hi===lo)hi=lo+1;const pad=(hi-lo)*.12;lo-=pad;hi+=pad;
 ctx.clearRect(0,0,W,H);ctx.font='10.5px ui-monospace,monospace';ctx.strokeStyle='#294057';ctx.fillStyle='#8aa3bd';ctx.lineWidth=1;
 for(let i=0;i<=4;i++){
  const yy=top+h*i/4;ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(left+w,yy);ctx.stroke();
  ctx.textAlign='right';ctx.fillText(fmt(hi-(hi-lo)*i/4,2),left-8,yy+3);
  const xx=left+w*i/4;ctx.beginPath();ctx.moveTo(xx,top);ctx.lineTo(xx,top+h);ctx.stroke();
  ctx.textAlign='center';ctx.fillText(fmt(minX+(maxX-minX)*i/4,3),xx,H-28);
 }
 ctx.strokeStyle='#5e8bb0';ctx.fillStyle='#5e8bb0';ctx.lineWidth=1.6;
 ctx.beginPath();ctx.moveTo(left,top+h);ctx.lineTo(left,top-6);ctx.moveTo(left,top+h);ctx.lineTo(left+w+6,top+h);ctx.stroke();
 ctx.beginPath();ctx.moveTo(left,top-9);ctx.lineTo(left-4,top-1);ctx.lineTo(left+4,top-1);ctx.closePath();ctx.fill();
 ctx.beginPath();ctx.moveTo(left+w+9,top+h);ctx.lineTo(left+w+1,top+h-4);ctx.lineTo(left+w+1,top+h+4);ctx.closePath();ctx.fill();
 ctx.textAlign='center';ctx.fillStyle='#bfe8ff';ctx.font='600 11.5px "Noto Sans Thai",system-ui,sans-serif';
 ctx.fillText(xLabel,left+w/2,H-9);
 ctx.save();ctx.translate(15,top+h/2);ctx.rotate(-Math.PI/2);ctx.fillText(yLabel,0,0);ctx.restore();ctx.textAlign='left';
 const py=v=>top+h-(v-lo)/(hi-lo)*h,px=x=>left+(x-minX)/(maxX-minX)*w;
 lines.forEach((line,j)=>{ctx.beginPath();pts.forEach((p,i)=>{const xx=px(p.x),yy=py(p.values[j]);if(i===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);});ctx.strokeStyle=line.color;ctx.lineWidth=2.5;ctx.stroke();});
 if(S.module==='teltron'||S.module==='assessment'){
  for(const r of S.records){
   const rx=px(r.invSqrtV);
   if(rx>=left&&rx<=left+w){
    ctx.fillStyle='#ffcb72';ctx.beginPath();ctx.arc(rx,py(r.R1cm),4.5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(rx,py(r.R2cm),4.5,0,Math.PI*2);ctx.fill();
   }
  }
 }
 const mx=px(Math.max(minX,Math.min(maxX,markerX)));
 ctx.setLineDash([4,5]);ctx.strokeStyle='#e5f4ff8c';ctx.beginPath();ctx.moveTo(mx,top);ctx.lineTo(mx,top+h);ctx.stroke();ctx.setLineDash([]);
 if(eqText){
  ctx.font='600 11px ui-monospace,"Noto Sans Thai",monospace';
  const bw=Math.min(W-left-12,ctx.measureText(eqText).width+20),bx=Math.max(left,left+(w-bw)/2);
  ctx.fillStyle='rgba(8,22,38,0.88)';ctx.strokeStyle='#2f6d63';ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,5,bw,22,5):ctx.rect(bx,5,bw,22);ctx.fill();ctx.stroke();
  ctx.fillStyle='#6af8b8';ctx.textAlign='center';ctx.fillText(eqText,bx+bw/2,20);ctx.textAlign='left';
 }
 $('chartLegend').innerHTML=lines.map(l=>`<span class="swatch" style="background:${l.color}"></span>${l.name}`).join('');
}

function downloadCSV(){
 const rows=[['#','Va (kV)','Va (V)','1/sqrt(Va) (V^-1/2)','lambda (pm)','R1 (cm)','R2 (cm)','R2/R1'],...S.records.map((r,i)=>[i+1,r.vaKV,r.vaKV*1000,r.invSqrtV.toFixed(6),r.lambdaPm.toFixed(3),r.R1cm.toFixed(3),r.R2cm.toFixed(3),(r.R2cm/r.R1cm).toFixed(4)])];
 const reg=computeRegression(),meta=[['# Quantum Lab 2027 - Lab 02 Electron Diffraction'],[`# L = ${S.Lcm} cm`],reg?[`# d10_exp = ${reg.d10Nm.toFixed(4)} nm (Error ${reg.err10.toFixed(2)}%)`,`# d11_exp = ${reg.d11Nm.toFixed(4)} nm (Error ${reg.err11.toFixed(2)}%)`]:['# Insufficient points for regression']];
 const csv='\ufeff'+[...meta,...rows].map(r=>r.join(',')).join('\r\n');
 const a=document.createElement('a'),url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
 a.href=url;a.download=`electron_diffraction_lab_${Date.now()}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

$('moduleNav').addEventListener('click',e=>{const btn=e.target.closest('[data-module]');if(btn)switchModule(btn.dataset.module);});
$('voltage').addEventListener('input',e=>{S.vaKV=+e.target.value;updateMeasurements();});
document.querySelectorAll('.voltage-presets button').forEach(b=>b.addEventListener('click',()=>{S.vaKV=+b.dataset.va;$('voltage').value=S.vaKV;updateMeasurements();}));
$('timeScale').addEventListener('input',e=>{S.timeScale=+e.target.value;setText('timeScaleOutput',fmt(S.timeScale,1)+'×');});
$('playPause').addEventListener('click',()=>{S.running=!S.running;setText('playPause',S.running?'Ⅱ หยุดการจำลอง':'▶ เล่นการจำลอง');});
$('resetSimulation').addEventListener('click',()=>{S.t=0;if(S.module==='doubleslit')resetDoubleSlitHits(0);updateMeasurements();});
$('recordPoint').addEventListener('click',recordCurrentPoint);
$('addCurrentBtn').addEventListener('click',recordCurrentPoint);
$('clearRecords').addEventListener('click',()=>{S.records=[];renderRecordsAndRegression();drawChart();});
$('randomize').addEventListener('click',()=>{S.vaKV=Math.round((1.5+Math.random()*4.5)*10)/10;$('voltage').value=S.vaKV;updateMeasurements();});
$('exportCSV').addEventListener('click',downloadCSV);

let last=performance.now();
function frame(now){
 const dt=Math.min(.05,(now-last)/1000);last=now;
 if(S.running){S.t+=dt*S.timeScale;advanceDoubleSlit(dt);updateMeasurements();}
 else update3D();
 requestAnimationFrame(frame);
}

async function bootstrap(){
 renderRecordsAndRegression();
 renderQuiz();
 switchModule('teltron');
 requestAnimationFrame(frame);
 try{
  await loadThreeModules();
  init3D();
  update3D();
 }catch(error){
  console.warn('Falling back to built-in 3D Canvas renderer:',error);
  initFallback3D();
  update3D();
 }
}
bootstrap();
