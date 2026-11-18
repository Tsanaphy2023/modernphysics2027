let THREE=null,OrbitControls=null,useFallback3D=false;

const C=299792458, c2=C*C;
const $=id=>document.getElementById(id);
const S={module:'postulates',beta:0.6,t:0,running:true,timeScale:1,x:1,tEvent:2,L0:4,H:1,f0:500,m:1,deltaM:0.001};
const gamma=()=>1/Math.sqrt(1-S.beta*S.beta);
const fmt=(n,d=3)=>Number.isFinite(n)?Number(n).toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:d}):'—';
const sci=(n,d=4)=>Number(n).toExponential(d).replace('e+',' × 10^').replace('e-',' × 10^-');
const setText=(id,text)=>$(id).textContent=text;
const modules={
 postulates:{title:'สมมติฐานของไอน์สไตน์',crumb:'POSTULATES',scene:'Light Clock & Inertial Frames',chart:'เส้นทางแสงในกรอบ S และ S′',description:'ตรวจสอบหลักสัมพัทธภาพและความคงตัวของอัตราเร็วแสงด้วยนาฬิกาแสงบนยานที่เคลื่อนที่',activity:'เปลี่ยนความเร็วตั้งแต่ 0 ถึง 0.9c แล้วสังเกตว่าแสงยังเดินทางด้วยอัตราเร็ว c ในทุกกรอบเฉื่อย แม้ว่ารูปทรงเส้นทางแสงต่างกัน',formula:'c = 299,792,458 m/s',explain:'(1) กฎฟิสิกส์มีรูปแบบเดียวกันในทุกกรอบอ้างอิงเฉื่อย (2) อัตราเร็วแสงในสุญญากาศมีค่า c เท่ากันสำหรับผู้สังเกตเฉื่อยทุกคน โดยไม่ขึ้นกับการเคลื่อนที่ของแหล่งกำเนิด'},
 transforms:{title:'การแปลงกาล–อวกาศแบบกาลิเลียนและลอเรนตซ์',crumb:'TRANSFORMATIONS',scene:'Spacetime Coordinate Transform',chart:'เปรียบเทียบ x′ แบบกาลิเลียนและลอเรนตซ์',description:'เปรียบเทียบการแปลงพิกัดเหตุการณ์ในกรอบอ้างอิงที่เคลื่อนที่ตามแกน x ด้วยความเร็วคงตัว',activity:'กำหนดเหตุการณ์ x = 1 light-second และ t = 2 s; เพิ่ม β แล้วเปรียบเทียบ t′ ของกาลิเลียนกับลอเรนตซ์',formula:'x′ = γ(x − βct),   t′ = γ(t − βx/c)',explain:'กาลิเลียน: x′ = x − vt, t′ = t (เวลาสัมบูรณ์) ส่วนลอเรนตซ์: x′ = γ(x − vt), t′ = γ(t − vx/c²) ซึ่งรักษาช่วงกาล–อวกาศ c²t² − x² ให้คงเดิม'},
 dilation:{title:'การยืดของเวลาและการหดสั้นของความยาว',crumb:'TIME & LENGTH',scene:'Moving Light Clock & Contracted Ship',chart:'ตัวประกอบเวลา γ และอัตราส่วนความยาว L/L₀',description:'สังเกตนาฬิกาที่เคลื่อนที่ช้าลงเมื่อเทียบกับนาฬิกาห้องทดลอง และความยาวตามแนวการเคลื่อนที่หดลง',activity:'ปรับความเร็วเป็น 0.6c และ 0.8c คำนวณ Δt/Δτ และ L/L₀ จากนั้นเปรียบเทียบกับผลการวัด',formula:'Δt = γΔτ,   L = L₀/γ',explain:'Δτ คือช่วงเวลาแท้ (proper time) ที่วัดโดยนาฬิกาอยู่กับเหตุการณ์ทั้งสอง ส่วน L₀ คือความยาวแท้ที่วัดในกรอบพักของวัตถุ การวัด L ต้องวัดตำแหน่งปลายทั้งสองพร้อมกันในกรอบผู้สังเกต'},
 doppler:{title:'ปรากฏการณ์ดอปเพลอร์เชิงสัมพัทธภาพ',crumb:'DOPPLER',scene:'Relativistic Light Wavefronts',chart:'อัตราส่วนความถี่ที่สังเกต f/f₀',description:'ปรับทิศทางการเคลื่อนที่สัมพัทธ์และเปรียบเทียบความถี่ที่ผู้สังเกตตรวจพบ รวมทั้งการเลื่อนสีน้ำเงิน–แดง',activity:'ตั้ง f₀ = 500 THz แล้วเปลี่ยน β จาก +0.6 (เข้าใกล้) เป็น −0.6 (ถอยห่าง) สังเกตการเลื่อนความถี่และความยาวคลื่น',formula:'f_obs = f₀ √[(1+β)/(1−β)]',explain:'กำหนด β > 0 เมื่อแหล่งกำเนิดเคลื่อนที่เข้าหาผู้สังเกตตามแนวเล็ง และ β < 0 เมื่อถอยห่าง สูตรนี้ใช้กับดอปเพลอร์ตามแนวเส้นตรงในสุญญากาศ รวมผลจลนศาสตร์ของเวลา'},
 momentum:{title:'โมเมนตัมและพลังงานเชิงสัมพัทธภาพ',crumb:'RELATIVISTIC DYNAMICS',scene:'Relativistic Particle Accelerator',chart:'พลังงานจลน์คลาสสิกและสัมพัทธภาพ',description:'สำรวจผลของความเร็วสูงต่อโมเมนตัม พลังงานรวม และพลังงานจลน์ของอนุภาคที่มีมวลพัก',activity:'กำหนดมวลพัก 1 kg และทดลอง β = 0.1, 0.6, 0.9; เปรียบเทียบพลังงานจลน์ K กับ ½mv² และสังเกตความแตกต่าง',formula:'p = γmv,   E = γmc²,   K = (γ−1)mc²',explain:'พลังงานรวมและโมเมนตัมเป็นไปตามความสัมพันธ์ E² = (pc)² + (mc²)² โดยมวล m คือมวลนิ่ง (invariant mass) ไม่ใช่มวลที่เพิ่มตามความเร็ว'},
 equivalence:{title:'ความสมมูลระหว่างมวลและพลังงาน',crumb:'MASS–ENERGY',scene:'Mass–Energy Conversion Chamber',chart:'พลังงานเทียบเท่ากับมวล Δm',description:'แปลงค่ามวลที่เปลี่ยนไปเป็นพลังงานพักเทียบเท่า และสำรวจมาตราส่วนพลังงานที่มหาศาล',activity:'กำหนดมวลแปรเปลี่ยน 0.001 kg เปรียบเทียบ E = Δmc² กับ 1 kg และอธิบายเหตุใดปฏิกิริยาจึงต้องอนุรักษ์พลังงานรวม',formula:'E₀ = mc²,   ΔE = Δmc²',explain:'พลังงานพัก E₀ ขึ้นกับมวลนิ่ง m ส่วน ΔE = Δmc² ใช้อธิบายการเปลี่ยนแปลงพลังงานพักของระบบเมื่อมวลนิ่งของระบบเปลี่ยนไป ไม่ได้หมายความว่ามวลทั้งหมดจะเปลี่ยนเป็นพลังงานในทุกปฏิกิริยา'}
};

const colorCyan=0x4eeaff,colorPurple=0xa69cff,colorAmber=0xffc96b,colorGreen=0x58e8b1,colorRose=0xff6b8b;
let renderer,scene,camera,orbit,grid,stars;
let ship,shipGlow,clockTop,clockBottom,clockBeam;
const clockStruts=[];
let postulatesGroup,zigzagLine,zigzagPositions,refLabPhoton,refShipPhoton;
let transformsGroup,sPrimeAxes,eventBeacon,galBar,lorBar,coneLines;
let dilationGroup,labClockTop,labClockBeam,labPulse,labStruts=[],ghostHull,caliperL0,caliperL;
let dopplerGroup,dopplerRings=[],detectorCore,detectorRing;
let momentumGroup,relParticle,relAura,relArrow,clsParticle,clsArrow,accelCoils=[];
let equivalenceGroup,massCore,defectShell,energyPillar,shockwaves=[],gammaPhotons=[];
let pulse;

function triWave(phase){return 1-Math.abs((phase%2+2)%2-1);}
function postulateShipX(t,b){
 if(Math.abs(b)<1e-4)return 0;
 const span=9.6,u=b*1.9*t+4.8;
 return ((u%span)+span)%span-4.8;
}
function postulatePassStart(t,b){
 if(Math.abs(b)<1e-4)return 0;
 const span=9.6,v=b*1.9,u=v*t+4.8,k=Math.floor(u/span);
 const uStart=b>0?k*span:(k+1)*span;
 return Math.max(0,(uStart-4.8)/v);
}
function dopplerSpectrum(b,f0){
 const factor=Math.sqrt((1+b)/(1-b)),fObs=f0*factor,lamNm=(C/(fObs*1e12))*1e9;
 let hex=colorGreen,css='#58e8b1',label='NO SHIFT';
 if(lamNm<430){hex=0x9c82ff;css='#9c82ff';label='BLUESHIFT (UV/VIOLET)';}
 else if(lamNm<490){hex=0x4eeaff;css='#4eeaff';label='BLUESHIFT (BLUE/CYAN)';}
 else if(lamNm<565){hex=0x58e8b1;css='#58e8b1';label='GREEN SPECTRUM';}
 else if(lamNm<615){hex=0xffc96b;css='#ffc96b';label='YELLOW–ORANGE';}
 else{hex=0xff6358;css='#ff6358';label='REDSHIFT (RED/IR)';}
 return {factor,fObs,lamNm,hex,css,label};
}
let lastTagHtml='';
function updateViewportTags(){
 const host=$('viewportTags');if(!host)return;
 const m=S.module;let html='';
 if(m==='postulates'){
  html=`<span class="frame-tag">FRAME S: LAB ZIGZAG</span><span class="frame-tag highlight">FRAME S′: SHIP CLOCK</span><span class="frame-tag amber">CONSTANCY c (c ≠ c+v)</span>`;
 }else if(m==='transforms'){
  html=`<span class="frame-tag">FRAME S (x, t)</span><span class="frame-tag highlight">FRAME S′ (x′, t′)</span><span class="frame-tag amber">GALILEAN x′_Gal</span><span class="frame-tag green">LORENTZ x′_Lorentz</span>`;
 }else if(m==='dilation'){
  html=`<span class="frame-tag">LAB CLOCK Δt</span><span class="frame-tag highlight">SHIP CLOCK Δτ = Δt/γ</span><span class="frame-tag amber">REST HULL L₀</span><span class="frame-tag green">CONTRACTED L = L₀/γ</span>`;
 }else if(m==='doppler'){
  const sp=dopplerSpectrum(S.beta,S.f0);
  const cls=S.beta>0.01?'':S.beta<-0.01?'rose':'green';
  html=`<span class="frame-tag ${cls}">λ_obs ≈ ${fmt(sp.lamNm,0)} nm · ${sp.label}</span><span class="frame-tag highlight">ASYMMETRIC WAVEFRONTS</span><span class="frame-tag amber">OBSERVER DETECTOR</span>`;
 }else if(m==='momentum'){
  html=`<span class="frame-tag highlight">RELATIVISTIC p = γmv</span><span class="frame-tag amber">CLASSICAL p = mv</span><span class="frame-tag rose">v = c BARRIER</span>`;
 }else if(m==='equivalence'){
  html=`<span class="frame-tag amber">REST MASS CORE m₀</span><span class="frame-tag rose">MASS DEFECT Δm</span><span class="frame-tag green">γ-RAY PHOTONS (ΔE = Δmc²)</span>`;
 }
 if(html!==lastTagHtml){lastTagHtml=html;host.innerHTML=html;}
}

function material(color,opacity=1,emissiveInt=.14){return new THREE.MeshStandardMaterial({color,metalness:.35,roughness:.3,transparent:opacity<1,opacity,emissive:color,emissiveIntensity:emissiveInt});}
function cylinderBetween(a,b,r,col){const mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);const d=new THREE.Vector3().subVectors(b,a);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),12),new THREE.MeshBasicMaterial({color:col}));mesh.position.copy(mid);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return mesh;}
function buildAxesSet(colX,colY,colZ,len=3.2){
 const grp=new THREE.Group();
 const addAxis=(dir,col)=>{
  const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,len,8),new THREE.MeshBasicMaterial({color:col}));
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.07,.22,10),new THREE.MeshBasicMaterial({color:col}));
  if(dir==='x'){shaft.rotation.z=-Math.PI/2;shaft.position.x=len*.5;tip.rotation.z=-Math.PI/2;tip.position.x=len+.1;}
  if(dir==='y'){shaft.position.y=len*.5;tip.position.y=len+.1;}
  if(dir==='z'){shaft.rotation.x=Math.PI/2;shaft.position.z=len*.5;tip.rotation.x=Math.PI/2;tip.position.z=len+.1;}
  grp.add(shaft,tip);
 };
 addAxis('x',colX);addAxis('y',colY);addAxis('z',colZ);
 return grp;
}
function buildArrowMesh(col){
 const grp=new THREE.Group();
 const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,1,12),new THREE.MeshBasicMaterial({color:col}));
 shaft.rotation.z=-Math.PI/2;shaft.position.x=.5;
 const head=new THREE.Mesh(new THREE.ConeGeometry(.12,.3,12),new THREE.MeshBasicMaterial({color:col}));
 head.rotation.z=-Math.PI/2;head.position.x=1.12;
 grp.add(shaft,head);grp.userData={shaft,head};
 return grp;
}
function setArrowLength(grp,len,dir=1){
 const L=Math.max(.18,Math.abs(len));
 grp.scale.x=dir>=0?1:-1;
 grp.userData.shaft.scale.y=L;grp.userData.shaft.position.x=L*.5;
 grp.userData.head.position.x=L+.12;
}
function buildBarSegment(col){
 const m=new THREE.Mesh(new THREE.BoxGeometry(1,.09,.09),new THREE.MeshBasicMaterial({color:col}));
 return m;
}
function setBarSpan(mesh,x1,x2,y,z){
 const w=Math.max(.04,Math.abs(x2-x1));
 mesh.scale.x=w;mesh.position.set((x1+x2)*.5,y,z);
}

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
function clearLoadingEl(){const el=$('sceneLoading');if(el)el.remove();}
function buildStudioEnv(rend,sc){
 const pmrem=new THREE.PMREMGenerator(rend),env=new THREE.Scene();env.background=new THREE.Color(0x091628);
 const addPanel=(w,h,col,pos,rot)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide}));m.position.set(...pos);m.rotation.set(...rot);env.add(m);};
 addPanel(20,8,0xffffff,[0,12,0],[Math.PI/2,0,0]);
 addPanel(14,7,0x8ce8ff,[-12,4,8],[0,Math.PI/3,0]);
 addPanel(14,7,0xb8b0ff,[12,4,-8],[0,-Math.PI*2/3,0]);
 sc.environment=pmrem.fromScene(env,0.04).texture;
 pmrem.dispose();
}

function init3D(){
 const host=$('sceneHost');scene=new THREE.Scene();scene.background=new THREE.Color(0x081525);scene.fog=new THREE.FogExp2(0x081525,.016);
 camera=new THREE.PerspectiveCamera(46,1,.1,500);camera.position.set(6.8,4.2,9.2);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.32;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);clearLoadingEl();
 buildStudioEnv(renderer,scene);
 orbit=new OrbitControls(camera,renderer.domElement);orbit.enableDamping=true;orbit.dampingFactor=.06;orbit.minDistance=5;orbit.maxDistance=40;orbit.target.set(0,.8,0);orbit.maxPolarAngle=Math.PI*.87;
 scene.add(new THREE.HemisphereLight(0xaad5ff,0x17223c,1.8));const key=new THREE.DirectionalLight(0xeef7ff,2.6);key.position.set(4,11,7);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-9,right:9,top:9,bottom:-9});scene.add(key);const rim=new THREE.PointLight(colorPurple,32,20);rim.position.set(-4,4,-3);scene.add(rim);const cyanLamp=new THREE.PointLight(colorCyan,28,16);cyanLamp.position.set(4,2,3);scene.add(cyanLamp);
 const titanium=new THREE.MeshStandardMaterial({color:0x8aa8c2,metalness:.88,roughness:.24});
 const darkMetal=new THREE.MeshStandardMaterial({color:0x1b2b3d,metalness:.75,roughness:.34});
 const brassMat=new THREE.MeshStandardMaterial({color:0xd99b26,metalness:.86,roughness:.24});
 const glassMat=new THREE.MeshPhysicalMaterial({color:0x8be4ff,transmission:.88,transparent:true,opacity:1,roughness:.06,metalness:0,ior:1.52,thickness:.3,clearcoat:1,depthWrite:false});
 grid=new THREE.GridHelper(80,80,0x2a6785,0x1a364b);grid.position.y=-1.4;grid.material.transparent=true;grid.material.opacity=.35;scene.add(grid);
 const plane=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.MeshStandardMaterial({color:0x0a1726,roughness:.85,metalness:.25}));plane.rotation.x=-Math.PI/2;plane.position.y=-1.44;plane.receiveShadow=true;scene.add(plane);
 for(const z of [-2.8,2.8]){const rail=new THREE.Mesh(new THREE.BoxGeometry(50,.08,.09),titanium);rail.position.set(0,-1.28,z);rail.receiveShadow=true;scene.add(rail);}

 // Shared Spacecraft & Onboard Light Clock (S')
 ship=new THREE.Group();scene.add(ship);
if(window.MP27Labels){
 ship.add(window.MP27Labels.makeSprite(THREE,'ยานอวกาศ & นาฬิกาแสง (กรอบ S′)',0,2.8,.95,'#a59bff'));
}
window.addEventListener('mp27:labels',()=>{if(scene&&window.MP27Labels)window.MP27Labels.applyToRoot(scene);});
 const fuselage=new THREE.Mesh(new THREE.CapsuleGeometry(.69,3.7,8,24),titanium);fuselage.rotation.z=Math.PI/2;fuselage.scale.set(1,.78,1.25);fuselage.position.y=.22;fuselage.castShadow=true;ship.add(fuselage);
 const hull=new THREE.Mesh(new THREE.CylinderGeometry(.82,.82,3.8,24),glassMat);hull.rotation.z=Math.PI/2;hull.position.y=.2;ship.add(hull);
 const nose=new THREE.Mesh(new THREE.ConeGeometry(.85,1.3,24),titanium);nose.rotation.z=-Math.PI/2;nose.position.set(2.55,.2,0);nose.castShadow=true;ship.add(nose);
 const engine=new THREE.Mesh(new THREE.CylinderGeometry(.58,.75,.45,24),darkMetal);engine.rotation.z=Math.PI/2;engine.position.set(-2.08,.2,0);ship.add(engine);
 shipGlow=new THREE.Mesh(new THREE.ConeGeometry(.35,1.1,20),new THREE.MeshBasicMaterial({color:0x45dffc,transparent:true,opacity:.5,depthWrite:false}));shipGlow.rotation.z=Math.PI/2;shipGlow.position.set(-2.7,.2,0);ship.add(shipGlow);
 for(let i=-1;i<=1;i++){const win=new THREE.Mesh(new THREE.SphereGeometry(.32,16,12),glassMat);win.scale.set(1,.24,.65);win.position.set(i*.9,.9,0);ship.add(win);}
 for(const side of [-1,1]){const wing=new THREE.Mesh(new THREE.BoxGeometry(1.8,.09,1.25),darkMetal);wing.position.set(-.35,-.05,side*1.15);wing.castShadow=true;ship.add(wing);}
 clockBottom=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.1,24),new THREE.MeshPhysicalMaterial({color:colorCyan,emissive:colorCyan,emissiveIntensity:.25,metalness:.2,roughness:.08,clearcoat:1}));clockBottom.position.set(0,-.14,.95);ship.add(clockBottom);
 clockTop=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.1,24),new THREE.MeshPhysicalMaterial({color:colorPurple,emissive:colorPurple,emissiveIntensity:.25,metalness:.2,roughness:.08,clearcoat:1}));clockTop.position.set(0,2.0,.95);ship.add(clockTop);
 for(const x of [-.25,.25]){const strut=cylinderBetween(new THREE.Vector3(x,-.5,.95),new THREE.Vector3(x,.5,.95),.028,0x8eaac4);ship.add(strut);clockStruts.push({mesh:strut,x});}
 clockBeam=new THREE.Mesh(new THREE.CylinderGeometry(.024,.024,1,12),new THREE.MeshBasicMaterial({color:colorPurple,transparent:true,opacity:.55,depthWrite:false}));clockBeam.position.set(0,.93,.95);ship.add(clockBeam);
 pulse=new THREE.Mesh(new THREE.SphereGeometry(.14,24,16),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorPurple,emissiveIntensity:1.6,roughness:.2,metalness:.1}));ship.add(pulse);pulse.add(new THREE.PointLight(colorPurple,3,3));

 // 01 Postulates Group: Zigzag Worldline Trail + Constant-c Photons
 postulatesGroup=new THREE.Group();scene.add(postulatesGroup);
 const zigCount=48;zigzagPositions=new Float32Array(zigCount*3);
 const zigGeo=new THREE.BufferGeometry();zigGeo.setAttribute('position',new THREE.BufferAttribute(zigzagPositions,3));
 zigzagLine=new THREE.Line(zigGeo,new THREE.LineBasicMaterial({color:colorCyan,transparent:true,opacity:.95}));postulatesGroup.add(zigzagLine);
 refLabPhoton=new THREE.Mesh(new THREE.SphereGeometry(.14,16,12),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorCyan,emissiveIntensity:1.5}));
 refShipPhoton=new THREE.Mesh(new THREE.SphereGeometry(.14,16,12),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorAmber,emissiveIntensity:1.5}));
 const labGate=new THREE.Mesh(new THREE.TorusGeometry(.32,.04,10,28),brassMat);labGate.rotation.y=Math.PI/2;labGate.position.set(-5,.2,-1.6);
 const gatePost=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,1.3,12),titanium);gatePost.position.set(-5,-.75,-1.6);
 const laserRail1=new THREE.Mesh(new THREE.BoxGeometry(16,.02,.02),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.28}));laserRail1.position.set(1,.2,-1.6);
 const laserRail2=new THREE.Mesh(new THREE.BoxGeometry(16,.02,.02),new THREE.MeshBasicMaterial({color:colorAmber,transparent:true,opacity:.28}));laserRail2.position.set(1,.2,-2.2);
 postulatesGroup.add(refLabPhoton,refShipPhoton,labGate,gatePost,laserRail1,laserRail2);

 // 02 Transforms Group: Dual S & S' Axes, Event Beacon, Galilean vs Lorentz Bars, Light Cone
 transformsGroup=new THREE.Group();scene.add(transformsGroup);
 transformsGroup.add(buildAxesSet(colorCyan,0x67d8ff,0x3596b8,5.2));
 sPrimeAxes=buildAxesSet(colorPurple,0xc5bfff,0x796fd3,3.8);transformsGroup.add(sPrimeAxes);
 eventBeacon=new THREE.Group();
 const bCore=new THREE.Mesh(new THREE.SphereGeometry(.2,20,16),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorAmber,emissiveIntensity:1.4}));
 const bRing=new THREE.Mesh(new THREE.TorusGeometry(.38,.025,10,32),new THREE.MeshBasicMaterial({color:colorAmber,transparent:true,opacity:.75}));bRing.rotation.x=Math.PI/2;
 const bStem=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,4,8),new THREE.MeshBasicMaterial({color:colorAmber,transparent:true,opacity:.45}));bStem.position.y=-2;
 eventBeacon.add(bCore,bRing,bStem);transformsGroup.add(eventBeacon);
 galBar=buildBarSegment(colorAmber);lorBar=buildBarSegment(colorGreen);transformsGroup.add(galBar,lorBar);
 coneLines=new THREE.Group();
 for(const dir of [-1,1]){const ray=cylinderBetween(new THREE.Vector3(0,0,0),new THREE.Vector3(dir*4.2,4.2,0),.022,colorCyan);ray.material.transparent=true;ray.material.opacity=.4;coneLines.add(ray);}
 transformsGroup.add(coneLines);

 // 03 Dilation Group: Stationary Lab Clock + Ghost L0 Reference Hull + Calipers
 dilationGroup=new THREE.Group();scene.add(dilationGroup);
if(window.MP27Labels){
 dilationGroup.add(window.MP27Labels.makeSprite(THREE,'นาฬิกาห้องทดลอง (กรอบ S)',-3.4,2.65,2.4,'#45ddf3'));
}
 const labBase=new THREE.Mesh(new THREE.CylinderGeometry(.55,.68,.24,24),darkMetal);labBase.position.set(-3.4,-1.32,2.4);labBase.receiveShadow=true;dilationGroup.add(labBase);
 const labPed=new THREE.Mesh(new THREE.CylinderGeometry(.1,.12,1.1,16),titanium);labPed.position.set(-3.4,-.72,2.4);dilationGroup.add(labPed);
 const labClockBottom=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.1,24),new THREE.MeshPhysicalMaterial({color:colorCyan,emissive:colorCyan,emissiveIntensity:.25,metalness:.2,roughness:.08,clearcoat:1}));labClockBottom.position.set(-3.4,-.14,2.4);dilationGroup.add(labClockBottom);
 labClockTop=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.1,24),new THREE.MeshPhysicalMaterial({color:colorCyan,emissive:colorCyan,emissiveIntensity:.25,metalness:.2,roughness:.08,clearcoat:1}));labClockTop.position.set(-3.4,2.0,2.4);dilationGroup.add(labClockTop);
 labStruts=[];for(const ox of [-.25,.25]){const st=cylinderBetween(new THREE.Vector3(-3.4+ox,-.5,2.4),new THREE.Vector3(-3.4+ox,.5,2.4),.025,0x8eaac4);dilationGroup.add(st);labStruts.push({mesh:st,ox});}
 labClockBeam=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,1,12),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.55,depthWrite:false}));labClockBeam.position.set(-3.4,.93,2.4);dilationGroup.add(labClockBeam);
 labPulse=new THREE.Mesh(new THREE.SphereGeometry(.15,20,16),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorCyan,emissiveIntensity:1.7}));labPulse.position.set(-3.4,.9,2.4);dilationGroup.add(labPulse);
 ghostHull=new THREE.Group();
 const ghBody=new THREE.Mesh(new THREE.CylinderGeometry(.92,.92,3.9,16,1,true),new THREE.MeshBasicMaterial({color:colorAmber,wireframe:true,transparent:true,opacity:.32}));ghBody.rotation.z=Math.PI/2;ghBody.position.y=.2;
 const ghNose=new THREE.Mesh(new THREE.ConeGeometry(.92,1.35,12,1,true),new THREE.MeshBasicMaterial({color:colorAmber,wireframe:true,transparent:true,opacity:.32}));ghNose.rotation.z=-Math.PI/2;ghNose.position.set(2.6,.2,0);
 ghostHull.add(ghBody,ghNose);dilationGroup.add(ghostHull);
 caliperL0=buildBarSegment(colorAmber);caliperL=buildBarSegment(colorGreen);dilationGroup.add(caliperL0,caliperL);

 // 04 Doppler Group: True Asymmetric Wavefronts + Grounded Observer Detector Station
 dopplerGroup=new THREE.Group();scene.add(dopplerGroup);dopplerRings=[];
 for(let i=0;i<12;i++){
  const rGroup=new THREE.Group();
  const rXZ=new THREE.Mesh(new THREE.TorusGeometry(1,.022,8,72),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.65,depthWrite:false}));rXZ.rotation.x=Math.PI/2;
  const rXY=new THREE.Mesh(new THREE.TorusGeometry(1,.015,8,72),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.32,depthWrite:false}));
  rGroup.add(rXZ,rXY);dopplerGroup.add(rGroup);dopplerRings.push({grp:rGroup,m1:rXZ.material,m2:rXY.material});
 }
 const obsGroup=new THREE.Group();obsGroup.position.set(5.4,.2,0);
 const dish=new THREE.Mesh(new THREE.ConeGeometry(1.15,.9,28,1,true),titanium);dish.rotation.z=Math.PI/2;dish.castShadow=true;
 const stand=new THREE.Mesh(new THREE.CylinderGeometry(.12,.2,.85,16),darkMetal);stand.position.set(.35,-1.22,0);
 const obsFoot=new THREE.Mesh(new THREE.CylinderGeometry(.55,.62,.14,24),darkMetal);obsFoot.position.set(.35,-1.57,0);
 detectorCore=new THREE.Mesh(new THREE.SphereGeometry(.26,20,16),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorCyan,emissiveIntensity:1.6}));detectorCore.position.set(-.3,0,0);
 detectorRing=new THREE.Mesh(new THREE.TorusGeometry(.55,.038,10,36),brassMat);detectorRing.rotation.y=Math.PI/2;detectorRing.position.set(-.3,0,0);
 obsGroup.add(dish,stand,obsFoot,detectorCore,detectorRing);dopplerGroup.add(obsGroup);

 // 05 Momentum Group: Grounded 3D Accelerator Tunnel + Relativistic vs Classical Particles + v=c Barrier
 momentumGroup=new THREE.Group();scene.add(momentumGroup);accelCoils=[];
 for(let i=-4;i<=4;i++){
  const coil=new THREE.Mesh(new THREE.TorusGeometry(2.0,.07,14,48),new THREE.MeshStandardMaterial({color:0x377fa6,metalness:.82,roughness:.25,emissive:0x1b4f6e,emissiveIntensity:.25}));coil.rotation.y=Math.PI/2;coil.position.set(i*1.2,.62,0);coil.castShadow=true;
  const cFoot=new THREE.Mesh(new THREE.BoxGeometry(.22,.16,.8),darkMetal);cFoot.position.set(i*1.2,-1.36,0);
  momentumGroup.add(coil,cFoot);accelCoils.push(coil);
 }
 const track1=new THREE.Mesh(new THREE.BoxGeometry(11,.04,.06),new THREE.MeshBasicMaterial({color:colorPurple,transparent:true,opacity:.45}));track1.position.set(0,.45,-.85);
 const track2=new THREE.Mesh(new THREE.BoxGeometry(11,.04,.06),new THREE.MeshBasicMaterial({color:colorAmber,transparent:true,opacity:.45}));track2.position.set(0,.45,1.05);
 const barrier=new THREE.Mesh(new THREE.PlaneGeometry(4.2,3.4),new THREE.MeshBasicMaterial({color:colorRose,transparent:true,opacity:.16,side:THREE.DoubleSide,depthWrite:false}));barrier.rotation.y=Math.PI/2;barrier.position.set(5.4,.45,0);
 const barrierFrame=new THREE.Mesh(new THREE.BoxGeometry(.08,3.45,4.25),new THREE.MeshBasicMaterial({color:colorRose,wireframe:true,transparent:true,opacity:.55}));barrierFrame.position.set(5.4,.45,0);
 momentumGroup.add(track1,track2,barrier,barrierFrame);
 relParticle=new THREE.Mesh(new THREE.SphereGeometry(.26,24,18),new THREE.MeshStandardMaterial({color:0xffffff,emissive:colorPurple,emissiveIntensity:1.5}));
 relAura=new THREE.Mesh(new THREE.TorusGeometry(.45,.035,10,36),new THREE.MeshBasicMaterial({color:colorCyan,transparent:true,opacity:.8}));relParticle.add(relAura);
 relArrow=buildArrowMesh(colorPurple);relParticle.add(relArrow);
 clsParticle=new THREE.Mesh(new THREE.SphereGeometry(.22,20,16),new THREE.MeshStandardMaterial({color:0xffd896,emissive:colorAmber,emissiveIntensity:.9}));
 clsArrow=buildArrowMesh(colorAmber);clsParticle.add(clsArrow);
 momentumGroup.add(relParticle,clsParticle);

 // 06 Equivalence Group: Grounded Containment Chamber + Mass Core + Defect Shell + Gamma Photons + Energy Pillar
 equivalenceGroup=new THREE.Group();scene.add(equivalenceGroup);
 const eqBase=new THREE.Mesh(new THREE.CylinderGeometry(2.35,2.55,.22,36),darkMetal);eqBase.position.set(0,-1.33,0);eqBase.receiveShadow=true;equivalenceGroup.add(eqBase);
 for(const cy of [-.95,2.25]){const coil=new THREE.Mesh(new THREE.TorusGeometry(2.1,.095,14,56),titanium);coil.rotation.x=Math.PI/2;coil.position.y=cy;equivalenceGroup.add(coil);}
 for(let k=0;k<4;k++){const a=k*Math.PI/2;const pil=new THREE.Mesh(new THREE.CylinderGeometry(.055,.065,3.5,12),brassMat);pil.position.set(Math.cos(a)*2.1,.52,Math.sin(a)*2.1);equivalenceGroup.add(pil);}
 massCore=new THREE.Mesh(new THREE.IcosahedronGeometry(.58,3),new THREE.MeshStandardMaterial({color:0xffce87,emissive:0xff8327,emissiveIntensity:.75,metalness:.45,roughness:.15}));massCore.position.set(0,.65,0);
 defectShell=new THREE.Mesh(new THREE.IcosahedronGeometry(.82,2),new THREE.MeshBasicMaterial({color:colorRose,wireframe:true,transparent:true,opacity:.5}));defectShell.position.set(0,.65,0);
 equivalenceGroup.add(massCore,defectShell);
 shockwaves=[];for(let i=0;i<3;i++){const sw=new THREE.Mesh(new THREE.TorusGeometry(1,.028,10,64),new THREE.MeshBasicMaterial({color:i%2?colorGreen:colorAmber,transparent:true,opacity:.7,depthWrite:false}));sw.rotation.x=Math.PI/2;sw.position.set(0,.65,0);equivalenceGroup.add(sw);shockwaves.push(sw);}
 gammaPhotons=[];for(let i=0;i<12;i++){
  const theta=Math.acos(1-2*(i+.5)/12),phi=Math.PI*(1+Math.sqrt(5))*i;
  const dir=new THREE.Vector3(Math.sin(theta)*Math.cos(phi),Math.cos(theta),Math.sin(theta)*Math.sin(phi));
  const ph=new THREE.Mesh(new THREE.SphereGeometry(.09,12,10),new THREE.MeshBasicMaterial({color:colorGreen}));
  equivalenceGroup.add(ph);gammaPhotons.push({mesh:ph,dir,offset:i/12});
 }
 const pillarBase=new THREE.Mesh(new THREE.BoxGeometry(.65,.18,.65),darkMetal);pillarBase.position.set(3.8,-1.35,-.8);
 energyPillar=new THREE.Mesh(new THREE.BoxGeometry(.42,1,.42),new THREE.MeshPhysicalMaterial({color:colorGreen,emissive:colorGreen,emissiveIntensity:.75,transparent:true,opacity:.88,roughness:.12,clearcoat:1}));
 equivalenceGroup.add(pillarBase,energyPillar);

 const points=[];for(let i=0;i<280;i++){points.push((Math.random()-.5)*70,Math.random()*28-1,(Math.random()-.5)*70);}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
 stars=new THREE.Points(geo,new THREE.PointsMaterial({color:0x6badd7,size:.045,transparent:true,opacity:.65}));scene.add(stars);

 function resize(){const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,true);drawChart();}
 new ResizeObserver(resize).observe(host);resize();
 $('resetCamera').onclick=()=>{camera.position.set(6.8,4.2,9.2);orbit.target.set(0,.8,0);orbit.update();};
}

let fbCanvas,fbCtx,fbW=1,fbH=1;
const fbCam={yaw:.64,pitch:.3,dist:12.2,tx:0,ty:.8,tz:0};
const fbStars=Array.from({length:180},()=>[(Math.random()-.5)*60,Math.random()*24-1,(Math.random()-.5)*60]);
function initFallback3D(){
 useFallback3D=true;const host=$('sceneHost');clearLoadingEl();
 fbCanvas=document.createElement('canvas');fbCanvas.setAttribute('aria-label','3D Simulation Canvas');host.appendChild(fbCanvas);fbCtx=fbCanvas.getContext('2d');
 function resize(){fbW=Math.max(1,host.clientWidth);fbH=Math.max(1,host.clientHeight);const dpr=Math.min(devicePixelRatio||1,2);fbCanvas.width=Math.round(fbW*dpr);fbCanvas.height=Math.round(fbH*dpr);fbCtx.setTransform(dpr,0,0,dpr,0,0);drawChart();}
 new ResizeObserver(resize).observe(host);resize();
 let drag=false,lx=0,ly=0;
 fbCanvas.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;fbCanvas.setPointerCapture?.(e.pointerId);});
 window.addEventListener('pointerup',()=>{drag=false;});
 window.addEventListener('pointermove',e=>{if(!drag)return;fbCam.yaw-=(e.clientX-lx)*.008;fbCam.pitch=Math.max(-.25,Math.min(1.25,fbCam.pitch+(e.clientY-ly)*.008));lx=e.clientX;ly=e.clientY;});
 fbCanvas.addEventListener('wheel',e=>{e.preventDefault();fbCam.dist=Math.max(5,Math.min(40,fbCam.dist+e.deltaY*.012));},{passive:false});
 $('resetCamera').onclick=()=>{fbCam.yaw=.64;fbCam.pitch=.3;fbCam.dist=12.2;};
}
function fbProject(x,y,z){
 const cy=Math.cos(fbCam.yaw),sy=Math.sin(fbCam.yaw),cp=Math.cos(fbCam.pitch),sp=Math.sin(fbCam.pitch);
 const dx=x-fbCam.tx,dy=y-fbCam.ty,dz=z-fbCam.tz;
 const rx=dx*cy-dz*sy,rz0=dx*sy+dz*cy;
 const ry=dy*cp-rz0*sp,rz=dy*sp+rz0*cp+fbCam.dist;
 if(rz<=.2)return null;
 const f=fbH/(2*Math.tan(23*Math.PI/180));
 return {x:fbW*.5+(rx/rz)*f,y:fbH*.5-(ry/rz)*f,z:rz,s:f/rz};
}
function fbLine(a,b,col,w=1){const p1=fbProject(a[0],a[1],a[2]),p2=fbProject(b[0],b[1],b[2]);if(!p1||!p2)return;fbCtx.strokeStyle=col;fbCtx.lineWidth=w;fbCtx.beginPath();fbCtx.moveTo(p1.x,p1.y);fbCtx.lineTo(p2.x,p2.y);fbCtx.stroke();}
function fbPoly(pts3,fill,stroke,lw=1){const pts=pts3.map(p=>fbProject(p[0],p[1],p[2]));if(pts.some(p=>!p))return;fbCtx.beginPath();pts.forEach((p,i)=>i?fbCtx.lineTo(p.x,p.y):fbCtx.moveTo(p.x,p.y));fbCtx.closePath();if(fill){fbCtx.fillStyle=fill;fbCtx.fill();}if(stroke){fbCtx.strokeStyle=stroke;fbCtx.lineWidth=lw;fbCtx.stroke();}}
function fbDisc(c,r,col,glow=null){const p=fbProject(c[0],c[1],c[2]);if(!p)return;const pr=Math.max(1.5,r*p.s);if(glow){const g=fbCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,pr*2.8);g.addColorStop(0,glow);g.addColorStop(1,'rgba(0,0,0,0)');fbCtx.fillStyle=g;fbCtx.beginPath();fbCtx.arc(p.x,p.y,pr*2.8,0,Math.PI*2);fbCtx.fill();}fbCtx.fillStyle=col;fbCtx.beginPath();fbCtx.arc(p.x,p.y,pr,0,Math.PI*2);fbCtx.fill();}
function fbCircle(cx,cy,cz,r,plane,col,lw=1.6,n=36){
 const pts=Array.from({length:n},(_,i)=>{const a=i*Math.PI*2/n;return plane==='xz'?fbProject(cx+Math.cos(a)*r,cy,cz+Math.sin(a)*r):plane==='yz'?fbProject(cx,cy+Math.sin(a)*r,cz+Math.cos(a)*r):fbProject(cx+Math.cos(a)*r,cy+Math.sin(a)*r,cz);});
 if(pts.every(Boolean)){fbCtx.strokeStyle=col;fbCtx.lineWidth=lw;fbCtx.beginPath();pts.forEach((p,i)=>i?fbCtx.lineTo(p.x,p.y):fbCtx.moveTo(p.x,p.y));fbCtx.closePath();fbCtx.stroke();}
}
function fbDrawShip(px,py,pz,sx,dir=1,clockPhase,topY,botY,wireframeOnly=false){
 const tr=(x,y,z)=>[px+x*sx*dir,py+y,pz+z];
 const wingCol=wireframeOnly?null:'rgba(55,90,120,0.85)',wingStroke=wireframeOnly?'rgba(255,201,107,0.38)':'rgba(110,175,215,0.6)';
 for(const side of [-1,1])fbPoly([tr(-1.25,-.05,side*.55),tr(.55,-.05,side*.55),tr(.3,-.05,side*1.78),tr(-1.25,-.05,side*1.78)],wingCol,wingStroke,1.2);
 const segs=12,ringPts=(x,r)=>Array.from({length:segs},(_,i)=>{const a=i*Math.PI*2/segs;return tr(x,.2+Math.sin(a)*r*.82,Math.cos(a)*r*1.12);});
 const xs=[-2.05,-1.2,0,1.2,1.9],rs=[.68,.84,.88,.84,.72];
 for(let k=0;k<xs.length-1;k++){
  const r1=ringPts(xs[k],rs[k]),r2=ringPts(xs[k+1],rs[k+1]);
  for(let i=0;i<segs;i++){const ni=(i+1)%segs;fbPoly([r1[i],r1[ni],r2[ni],r2[i]],wireframeOnly?null:'rgba(78,125,165,0.52)',wireframeOnly?'rgba(255,201,107,0.34)':'rgba(115,180,220,0.32)',.9);}
 }
 const noseBase=ringPts(1.9,.76),noseTip=tr(3.15,.2,0);
 for(let i=0;i<segs;i++){const ni=(i+1)%segs;fbPoly([noseBase[i],noseBase[ni],noseTip],wireframeOnly?null:'rgba(156,180,198,0.68)',wireframeOnly?'rgba(255,201,107,0.38)':'rgba(195,225,245,0.45)',1);}
 if(wireframeOnly)return;
 const flameLen=1.0+.28*Math.sin(S.t*10),engBase=ringPts(-2.08,.52),engTip=tr(-2.08-flameLen,.2,0);
 for(let i=0;i<segs;i+=2){const ni=(i+1)%segs;fbPoly([engBase[i],engBase[ni],engTip],'rgba(69,223,252,0.38)','rgba(120,245,255,0.5)',1);}
 fbDisc(tr(-2.2,.2,0),.32,'#7ef2ff','rgba(69,223,252,0.5)');
 for(let i=-1;i<=1;i++)fbDisc(tr(i*.9,.92,0),.2,'#54dbf0','rgba(84,219,240,0.3)');
 for(const ox of [-.25,.25])fbLine(tr(ox,botY,.95),tr(ox,topY,.95),'rgba(120,160,195,0.85)',2);
 fbLine(tr(0,botY,.95),tr(0,topY,.95),'rgba(166,156,255,0.58)',2.5);
 fbDisc(tr(0,botY,.95),.24,'#4eeaff','rgba(78,234,255,0.35)');fbDisc(tr(0,topY,.95),.24,'#a69cff','rgba(166,156,255,0.35)');
 const pulseY=botY+.1+Math.max(.2,topY-botY-.2)*triWave(clockPhase);
 fbDisc(tr(0,pulseY,.95),.16,'#ffffff','rgba(166,156,255,0.95)');
}

function updateFallback3D(){
 if(!fbCtx)return;
 const g=gamma(),m=S.module,b=S.beta;
 const topY=2*S.H,botY=-.14,py=.14*Math.sin(S.t*1.5)*.12;
 const grad=fbCtx.createRadialGradient(fbW*.55,fbH*.38,20,fbW*.5,fbH*.5,Math.max(fbW,fbH)*.72);
 grad.addColorStop(0,'#132a46');grad.addColorStop(.55,'#09182b');grad.addColorStop(1,'#060f1c');
 fbCtx.fillStyle=grad;fbCtx.fillRect(0,0,fbW,fbH);
 for(const [sx,sy,sz] of fbStars){const p=fbProject(sx,sy,sz);if(p){fbCtx.fillStyle='rgba(128,195,235,0.45)';fbCtx.fillRect(p.x,p.y,1.6,1.6);}}
 for(let i=-16;i<=16;i+=2){fbLine([i,-1.4,-16],[i,-1.4,16],'rgba(42,103,133,0.22)',1);fbLine([-16,-1.4,i],[16,-1.4,i],'rgba(42,103,133,0.22)',1);}
 fbLine([-20,-1.16,-2.8],[20,-1.16,-2.8],'rgba(69,221,243,0.45)',2);fbLine([-20,-1.16,2.8],[20,-1.16,2.8],'rgba(69,221,243,0.45)',2);

 if(m==='postulates'){
  const sx=postulateShipX(S.t,b);
  fbDrawShip(sx,py,0,1,1,(S.t/g)/(2*S.H),topY,botY);
  const tStart=Math.max(postulatePassStart(S.t,b),S.t-4.5);
  for(let i=0;i<47;i++){
   const t1=tStart+(S.t-tStart)*i/47,t2=tStart+(S.t-tStart)*(i+1)/47;
   const y1=botY+.1+Math.max(.2,topY-botY-.2)*triWave((t1/g)/(2*S.H));
   const y2=botY+.1+Math.max(.2,topY-botY-.2)*triWave((t2/g)/(2*S.H));
   fbLine([postulateShipX(t1,b),y1,.95],[postulateShipX(t2,b),y2,.95],'rgba(78,234,255,0.92)',2.4);
  }
  const phase=S.t%3.2,emitX=postulateShipX(S.t-phase,b);
  fbLine([-5,.2,-1.6],[9,.2,-1.6],'rgba(78,234,255,0.25)',1.5);
  fbLine([-5,.2,-2.2],[9,.2,-2.2],'rgba(255,201,107,0.25)',1.5);
  fbDisc([-5+2.6*phase,.2,-1.6],.16,'#ffffff','rgba(78,234,255,0.9)');
  fbDisc([emitX+2.0+2.6*phase,.2,-2.2],.16,'#ffffff','rgba(255,201,107,0.9)');
 }else if(m==='transforms'){
  const sPrimeX=Math.max(-4.5,Math.min(4.5,b*S.tEvent*.5)),ex=Math.max(-5.5,Math.min(5.5,S.x*.5)),ey=Math.max(.35,Math.min(3.5,1.6+S.tEvent*.12));
  fbLine([0,0,0],[5.2,0,0],'#4eeaff',2.2);fbLine([0,0,0],[0,3.8,0],'#67d8ff',2.2);fbLine([0,0,0],[0,0,3.5],'#3596b8',2.2);
  fbLine([sPrimeX,.05,0],[sPrimeX+3.8,.05,0],'#a69cff',2.2);fbLine([sPrimeX,.05,0],[sPrimeX,3.2,0],'#c5bfff',2.2);
  fbLine([0,0,0],[4.2,4.2,0],'rgba(78,234,255,0.35)',1.6);fbLine([0,0,0],[-4.2,4.2,0],'rgba(78,234,255,0.35)',1.6);
  fbDrawShip(sPrimeX,py,-1.7,.68,1,(S.t/g)/(2*S.H),1.3,-.1);
  fbLine([ex,-1.4,0],[ex,ey,0],'rgba(255,201,107,0.45)',1.6);
  fbDisc([ex,ey,0],.22,'#ffffff','rgba(255,201,107,0.9)');
  fbLine([sPrimeX,.55,0],[ex,.55,0],'#ffc96b',4);
  fbLine([sPrimeX,1.05,0],[sPrimeX+g*(ex-sPrimeX),1.05,0],'#58e8b1',4);
 }else if(m==='dilation'){
  const baseScale=Math.max(.5,Math.min(1.85,S.L0/4)),sx=3.2*Math.sin(S.t*.4*b);
  fbDrawShip(sx,py,0,baseScale/g,1,(S.t/g)/(2*S.H),topY,botY,false);
  fbDrawShip(sx,py,0,baseScale,1,0,topY,botY,true);
  const half0=2.55*baseScale,halfL=half0/g;
  fbLine([sx-half0,2.5,0],[sx+half0,2.5,0],'#ffc96b',3.5);
  fbLine([sx-halfL,-1.05,0],[sx+halfL,-1.05,0],'#58e8b1',3.5);
  for(const ox of [-.25,.25])fbLine([-3.4+ox,botY,2.4],[-3.4+ox,topY,2.4],'rgba(73,136,165,0.85)',2);
  fbLine([-3.4,botY,2.4],[-3.4,topY,2.4],'rgba(78,234,255,0.55)',2.5);
  fbDisc([-3.4,botY,2.4],.24,'#4eeaff','rgba(78,234,255,0.35)');fbDisc([-3.4,topY,2.4],.24,'#4eeaff','rgba(78,234,255,0.35)');
  fbDisc([-3.4,botY+.1+Math.max(.2,topY-botY-.2)*triWave(S.t/(2*S.H)),2.4],.16,'#ffffff','rgba(78,234,255,0.95)');
 }else if(m==='doppler'){
  const sp=dopplerSpectrum(b,S.f0),shipX=-1.8;
  fbDrawShip(shipX,py,0,.85,b>=0?1:-1,(S.t/g)/(2*S.H),1.6,-.14);
  for(let i=0;i<12;i++){
   const age=(((S.t*2.4-i)%12+12)%12)/2.4,rx=shipX-(b*1.8)*age,rr=.25+2.5*age;
   fbCircle(rx,.25,0,rr,'xz',sp.css,Math.max(.45,1.9*(1-age/5)));
   fbCircle(rx,.25,0,rr,'xy',sp.css,Math.max(.3,1.1*(1-age/5)));
  }
  fbCircle(5.4,.2,0,.95,'yz','rgba(110,175,215,0.75)',2);
  fbDisc([5.1,.2,0],.26,'#ffffff',sp.css);
 }else if(m==='momentum'){
  for(let i=-4;i<=4;i++)fbCircle(i*1.2,.45,0,2.0,'yz','rgba(44,104,138,0.65)',2);
  fbLine([5.4,-1.2,-2],[5.4,2.1,-2],'rgba(255,107,139,0.7)',2);fbLine([5.4,-1.2,2],[5.4,2.1,2],'rgba(255,107,139,0.7)',2);
  fbLine([5.4,2.1,-2],[5.4,2.1,2],'rgba(255,107,139,0.7)',2);
  const px=Math.abs(b)<1e-4?0:((b*2.2*S.t+4.8)%9.6+9.6)%9.6-4.8;
  const dir=b>=0?1:-1,mFac=.75+.25*Math.log10(1+S.m*9);
  const pRelLen=Math.min(3.8,(.3+g*Math.abs(b)*1.3)*mFac),pClsLen=Math.min(2.4,(.3+Math.abs(b)*1.3)*mFac);
  fbDisc([px,.45,-.85],.24*mFac,'#ffffff','rgba(166,156,255,0.85)');
  fbCircle(px,.45,-.85,(.42+Math.min(.5,(g-1)*.35))*mFac,'xy','rgba(78,234,255,0.8)',2);
  fbLine([px,.45,-.85],[px+dir*pRelLen,.45,-.85],'#a69cff',4);
  fbDisc([px,.45,1.05],.2*mFac,'#ffd896','rgba(255,201,107,0.75)');
  fbLine([px,.45,1.05],[px+dir*pClsLen,.45,1.05],'#ffc96b',3.5);
 }else if(m==='equivalence'){
  const intensity=Math.min(2.2,Math.max(.35,Math.log10(1+S.deltaM*1e6)/3)),sc=.7+intensity*.2;
  fbCircle(0,-.95,0,2.1,'xz','rgba(42,102,132,0.8)',2.5);fbCircle(0,2.25,0,2.1,'xz','rgba(42,102,132,0.8)',2.5);
  for(let k=0;k<4;k++){const a=k*Math.PI/2;fbLine([Math.cos(a)*2.1,-.95,Math.sin(a)*2.1],[Math.cos(a)*2.1,2.25,Math.sin(a)*2.1],'rgba(46,88,116,0.7)',2);}
  fbDisc([0,.65,0],.62*sc,'#ffce87','rgba(255,145,55,0.85)');
  fbCircle(0,.65,0,(.85+.1*Math.sin(S.t*6))*sc,'xy','rgba(255,107,139,0.7)',1.6);
  for(let i=0;i<3;i++){const phase=(S.t*(.7+intensity*.4)+i/3)%1,rr=.5+phase*3.2;fbCircle(0,.65,0,rr,'xz',i%2?'rgba(88,232,177,0.7)':'rgba(255,201,107,0.7)',2);}
  for(let i=0;i<12;i++){
   const th=Math.acos(1-2*(i+.5)/12),ph=Math.PI*(1+Math.sqrt(5))*i,r=((S.t*(1.4+intensity*.8)+i/12)%1)*3.6;
   fbDisc([Math.sin(th)*Math.cos(ph)*r,.65+Math.cos(th)*r,Math.sin(th)*Math.sin(ph)*r],.09,'#58e8b1','rgba(88,232,177,0.6)');
  }
  const hBar=.35+Math.min(3.3,Math.log10(1+S.deltaM*1e6)*.55);
  fbLine([3.8,-1.25,-.8],[3.8,-1.25+hBar,-.8],'#58e8b1',12);
 }
}

function update3D(){
 if(useFallback3D){updateFallback3D();return;}
 if(!ship)return;
 const g=gamma(),m=S.module,b=S.beta,topY=2*S.H,botY=-.14;
 ship.visible=m!=='equivalence'&&m!=='momentum';
 postulatesGroup.visible=m==='postulates';
 transformsGroup.visible=m==='transforms';
 dilationGroup.visible=m==='dilation';
 dopplerGroup.visible=m==='doppler';
 momentumGroup.visible=m==='momentum';
 equivalenceGroup.visible=m==='equivalence';

 shipGlow.scale.set(1,1+.28*Math.sin(S.t*10),1);
 clockTop.position.y=topY;clockBottom.position.y=botY;
 for(const s of clockStruts){s.mesh.position.set(s.x,(topY+botY)*.5,.95);s.mesh.scale.set(1,Math.max(.1,topY-botY),1);}
 clockBeam.position.set(0,(topY+botY)*.5,.95);clockBeam.scale.set(1,Math.max(.1,topY-botY),1);
 pulse.position.set(0,botY+.1+Math.max(.2,topY-botY-.2)*triWave((S.t/g)/(2*S.H)),.95);
 ship.rotation.y=0;ship.position.y=.14*Math.sin(S.t*1.5)*.12;

 if(m==='postulates'){
  ship.scale.set(1,1,1);ship.position.x=postulateShipX(S.t,b);
  const tStart=Math.max(postulatePassStart(S.t,b),S.t-4.5),nPts=48;
  for(let i=0;i<nPts;i++){
   const ti=tStart+(S.t-tStart)*i/(nPts-1);
   zigzagPositions[i*3]=postulateShipX(ti,b);
   zigzagPositions[i*3+1]=botY+.1+Math.max(.2,topY-botY-.2)*triWave((ti/g)/(2*S.H));
   zigzagPositions[i*3+2]=.95;
  }
  zigzagLine.geometry.attributes.position.needsUpdate=true;
  const phase=S.t%3.2,emitX=postulateShipX(S.t-phase,b);
  refLabPhoton.position.set(-5+2.6*phase,.2,-1.6);
  refShipPhoton.position.set(emitX+2.0+2.6*phase,.2,-2.2);
 }else if(m==='transforms'){
  const sPrimeX=Math.max(-4.5,Math.min(4.5,b*S.tEvent*.5)),ex=Math.max(-5.5,Math.min(5.5,S.x*.5)),ey=Math.max(.35,Math.min(3.5,1.6+S.tEvent*.12));
  ship.scale.set(.68,.68,.68);ship.position.set(sPrimeX,ship.position.y,-1.7);
  sPrimeAxes.position.set(sPrimeX,.05,0);
  eventBeacon.position.set(ex,ey,0);
  setBarSpan(galBar,sPrimeX,ex,.55,0);
  setBarSpan(lorBar,sPrimeX,sPrimeX+g*(ex-sPrimeX),1.05,0);
 }else if(m==='dilation'){
  const baseScale=Math.max(.5,Math.min(1.85,S.L0/4)),sx=3.2*Math.sin(S.t*.4*b);
  ship.scale.set(baseScale/g,1,1);ship.position.set(sx,ship.position.y,0);
  ghostHull.scale.set(baseScale,1,1);ghostHull.position.set(sx,ship.position.y,0);
  const half0=2.55*baseScale,halfL=half0/g;
  setBarSpan(caliperL0,sx-half0,sx+half0,2.55,0);
  setBarSpan(caliperL,sx-halfL,sx+halfL,-1.05,0);
  labClockTop.position.y=topY;
  for(const s of labStruts){s.mesh.position.set(-3.4+s.ox,(topY+botY)*.5,2.4);s.mesh.scale.set(1,Math.max(.1,topY-botY),1);}
  labClockBeam.position.set(-3.4,(topY+botY)*.5,2.4);labClockBeam.scale.set(1,Math.max(.1,topY-botY),1);
  labPulse.position.set(-3.4,botY+.1+Math.max(.2,topY-botY-.2)*triWave(S.t/(2*S.H)),2.4);
 }else if(m==='doppler'){
  const sp=dopplerSpectrum(b,S.f0),shipX=-1.8;
  ship.scale.set(.85,.85,.85);ship.position.set(shipX,ship.position.y,0);ship.rotation.y=b>=0?0:Math.PI;
  dopplerRings.forEach((ring,i)=>{
   const age=(((S.t*2.4-i)%12+12)%12)/2.4,rx=shipX-(b*1.8)*age,rr=.25+2.5*age;
   ring.grp.position.set(rx,.25,0);ring.grp.scale.setScalar(rr);
   ring.m1.color.setHex(sp.hex);ring.m2.color.setHex(sp.hex);
   ring.m1.opacity=Math.max(.08,.75*(1-age/5));ring.m2.opacity=Math.max(.04,.35*(1-age/5));
  });
  detectorCore.material.emissive.setHex(sp.hex);detectorRing.material.color.setHex(sp.hex);
  detectorRing.scale.setScalar(1+.12*Math.sin(S.t*8));
 }else if(m==='momentum'){
  const px=Math.abs(b)<1e-4?0:((b*2.2*S.t+4.8)%9.6+9.6)%9.6-4.8;
  const dir=b>=0?1:-1,mFac=.75+.25*Math.log10(1+S.m*9);
  const pRelLen=Math.min(3.8,(.3+g*Math.abs(b)*1.3)*mFac),pClsLen=Math.min(2.4,(.3+Math.abs(b)*1.3)*mFac);
  relParticle.position.set(px,.45,-.85);relAura.rotation.y=S.t*2.4;relAura.rotation.x=S.t*1.6;
  relAura.scale.setScalar((.85+Math.min(1.2,(g-1)*.7))*mFac);
  setArrowLength(relArrow,pRelLen,dir);
  clsParticle.position.set(px,.45,1.05);
  setArrowLength(clsArrow,pClsLen,dir);
  accelCoils.forEach((c,idx)=>{c.material.emissiveIntensity=.15+.45*Math.abs(b)*(0.5+0.5*Math.sin(S.t*4-idx*.6));});
 }else if(m==='equivalence'){
  const intensity=Math.min(2.2,Math.max(.35,Math.log10(1+S.deltaM*1e6)/3)),sc=.7+intensity*.2;
  massCore.scale.setScalar(sc);massCore.rotation.y=S.t*.5;
  defectShell.scale.setScalar(sc*(1+.08*Math.sin(S.t*6)));defectShell.rotation.x=-S.t*.4;defectShell.rotation.y=S.t*.6;
  shockwaves.forEach((sw,i)=>{const ph=(S.t*(.7+intensity*.4)+i/3)%1;sw.scale.setScalar(.5+ph*3.2);sw.material.opacity=Math.max(.04,.8*(1-ph));});
  gammaPhotons.forEach(gp=>{const r=((S.t*(1.4+intensity*.8)+gp.offset)%1)*3.6;gp.mesh.position.set(gp.dir.x*r,.65+gp.dir.y*r,gp.dir.z*r);});
  const hBar=.35+Math.min(3.3,Math.log10(1+S.deltaM*1e6)*.55);
  energyPillar.scale.y=hBar;energyPillar.position.set(3.8,-1.26+hBar*.5,-.8);
 }
 orbit.update();renderer.render(scene,camera);
}

function dynamicFields(){const m=S.module;const fields=[];
 if(m==='transforms'){fields.push(['x','ตำแหน่งเหตุการณ์ x (light-second)','-10','10','.1','ตำแหน่งในกรอบ S หน่วย light-second (1 ls = c × 1 s)']);fields.push(['tEvent','เวลาของเหตุการณ์ t (s)','-10','10','.1','เหตุการณ์เดียวกันวัดในกรอบ S']);}
 if(m==='dilation'||m==='postulates'){fields.push(['H','ความสูงนาฬิกาแสง H (light-second)','0.2','3','.1','ระยะระหว่างกระจกในกรอบยาน']);fields.push(['L0','ความยาวแท้ L₀ (m)','1','20','.5','ความยาววัดในกรอบพักของยาน']);}
 if(m==='doppler')fields.push(['f0','ความถี่แหล่งกำเนิด f₀ (THz)','100','900','10','β เป็นบวกเมื่อแหล่งกำเนิดเข้าใกล้ผู้สังเกต']);
 if(m==='momentum')fields.push(['m','มวลนิ่ง m (kg)','0.001','10','.001','ใช้ค่า SI ในการคำนวณพลังงานและโมเมนตัม']);
 if(m==='equivalence')fields.push(['deltaM','มวลที่เปลี่ยนแปลง Δm (kg)','0.000001','1','0.000001','พลังงานพักที่เปลี่ยนไปตามขนาด Δm']);
 $('dynamicControls').innerHTML=fields.map(([key,label,min,max,step,hint])=>`<div class="field"><label for="field-${key}">${label}</label><input id="field-${key}" type="number" min="${min}" max="${max}" step="${step}" value="${S[key]}"><small>${hint}</small></div>`).join('');
 for(const [key,,min,max] of fields){$('field-'+key).addEventListener('input',e=>{const n=Number(e.target.value);if(e.target.value!==''&&Number.isFinite(n)){S[key]=Math.max(Number(min),Math.min(Number(max),n));updateMeasurements();}});}
}
function switchModule(m){S.module=m;S.t=0;const d=modules[m];setText('moduleTitle',d.title);setText('breadcrumbName',d.crumb);setText('sceneHeading',d.scene);setText('chartTitle',d.chart);setText('moduleDescription',d.description);setText('activityText',d.activity);$('moduleNav').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.module===m));$('theory').innerHTML=`<div class="formula">${d.formula}</div><p>${d.explain}</p><p class="theory-hint">หมายเหตุ: ใช้กรอบเฉื่อยที่มีการเคลื่อนที่สัมพัทธ์ตามแกน x และละเลยแรงโน้มถ่วง</p>`;dynamicFields();updateViewportTags();updateMeasurements();}
function addReading(label,value,unit='',tone=''){return `<div class="reading"><div><span class="reading-label">${label}</span>${unit?`<span class="reading-unit">${unit}</span>`:''}</div><span class="reading-value ${tone}">${value}</span></div>`;}
function setAnalogHands(prefix,secVal){
 const s=Math.max(0,secVal);
 const secDeg=(s%60)*6,minDeg=((s/60)%60)*6,hrDeg=((s/3600)%12)*30;
 const elS=$(prefix+'Sec'),elM=$(prefix+'Min'),elH=$(prefix+'Hour');
 if(elS)elS.setAttribute('transform',`rotate(${secDeg} 32 32)`);
 if(elM)elM.setAttribute('transform',`rotate(${minDeg} 32 32)`);
 if(elH)elH.setAttribute('transform',`rotate(${hrDeg} 32 32)`);
}
function updateMeasurements(){const b=S.beta,g=gamma(),t=S.t,proper=t/g;
 setText('metricBeta',`${fmt(b,2)} c`);setText('metricGamma',`${fmt(g,4)} γ`);setText('metricTime',`${fmt(t,2)} s`);setText('metricProper',`${fmt(proper,2)} s`);setText('betaValue',`${b>=0?'+':''}${fmt(b,3)} c`);setText('transportClock',`${fmt(t,2)} s`);
 setAnalogHands('analogLab',t);setAnalogHands('analogShip',proper);
 document.querySelectorAll('.speed-presets button').forEach(el=>el.classList.toggle('selected',Math.abs(+el.dataset.beta-b)<.001));
 let r='';const add=(...args)=>{r+=addReading(...args);};
 if(S.module==='postulates'){add('อัตราเร็วแสงในกรอบ S',`${fmt(C,0)} m/s`,'ค่าคงที่ในสุญญากาศ');add('อัตราเร็วแสงในกรอบ S′',`${fmt(C,0)} m/s`,'ค่าคงที่ในสุญญากาศ','purple');add('ระยะทางแนวดิ่งของแสงใน S′',`${fmt(2*S.H,2)} ls`,'ต่อการสะท้อนครบหนึ่งรอบ');add('เวลาต่อรอบใน S′',`${fmt(2*S.H,3)} s`,'proper light-clock period');add('เวลาต่อรอบที่เห็นจาก S',`${fmt(2*S.H*g,3)} s`,'time dilation','amber');}
 if(S.module==='transforms'){const x=S.x,te=S.tEvent;add('x′ แบบกาลิเลียน',`${fmt(x-b*te,4)} ls`);add('t′ แบบกาลิเลียน',`${fmt(te,4)} s`);add('x′ แบบลอเรนตซ์',`${fmt(g*(x-b*te),4)} ls`,'','purple');add('t′ แบบลอเรนตซ์',`${fmt(g*(te-b*x),4)} s`,'','amber');add('ช่วงกาล–อวกาศ s²',`${fmt(te*te-x*x,4)} s²`,'ค่าคงเดิมในทุกกรอบเฉื่อย');}
 if(S.module==='dilation'){add('เวลาที่ผ่านไปในห้องทดลอง',`${fmt(t,3)} s`);add('เวลาบนนาฬิกายาน',`${fmt(proper,3)} s`,'proper time','purple');add('อัตราส่วน Δt/Δτ',`${fmt(g,4)}`,'γ','amber');add('ความยาวแท้ L₀',`${fmt(S.L0,3)} m`);add('ความยาวที่วัดจาก S',`${fmt(S.L0/g,3)} m`,'ตามแนวการเคลื่อนที่','purple');add('ความยาวที่หายไป',`${fmt(S.L0*(1-1/g),3)} m`);}
 if(S.module==='doppler'){const factor=Math.sqrt((1+b)/(1-b)),f=S.f0*factor,lam=C/(f*1e12);add('ความถี่ต้นกำเนิด',`${fmt(S.f0,2)} THz`);add('ความถี่ที่ตรวจวัด',`${fmt(f,2)} THz`,'','purple');add('ตัวประกอบดอปเพลอร์',`${fmt(factor,5)}`);add('ความยาวคลื่นที่ตรวจวัด',`${fmt(lam*1e9,2)} nm`);add('สถานะการเคลื่อนที่',b>0?'เข้าใกล้ / Blueshift':b<0?'ถอยห่าง / Redshift':'ไม่มีการเลื่อน','', 'amber');}
 if(S.module==='momentum'){const p=g*S.m*b*C,E=g*S.m*c2,K=(g-1)*S.m*c2,Kclass=.5*S.m*b*b*c2;add('โมเมนตัมเชิงสัมพัทธภาพ p',`${sci(p)} kg·m/s`,'','purple');add('พลังงานพัก E₀',`${sci(S.m*c2)} J`);add('พลังงานรวม E',`${sci(E)} J`,'','amber');add('พลังงานจลน์เชิงสัมพัทธภาพ K',`${sci(K)} J`);add('พลังงานจลน์นิวตัน',`${sci(Kclass)} J`);add('อัตราส่วน K/K_classical',b===0?'1.0000':fmt(K/Kclass,4));}
 if(S.module==='equivalence'){const E=S.deltaM*c2;add('มวลที่เปลี่ยนไป Δm',`${fmt(S.deltaM,6)} kg`);add('พลังงานเทียบเท่า ΔE',`${sci(E)} J`,'','amber');add('พลังงานเทียบเท่า',`${sci(E/3.6e6)} kWh`);add('พลังงานเทียบเท่า',`${sci(E/1e6)} MJ`);add('พลังงานพักของมวล 1 kg',`${sci(c2)} J`,'','purple');}
 $('readings').innerHTML=r;if(S.module==='doppler')updateViewportTags();drawChart();update3D();}
function calcSeries(){const b=S.beta,g=gamma(),n=110,pts=[],lines=[];let maxX=5,xLabel='แกน X: เวลา t (s)',yLabel='แกน Y: ค่า',eqText='';
 if(S.module==='postulates'){maxX=5;lines.push({name:'ระยะทางแสงใน S (ls)',color:'#4eeaff',fn:x=>x},{name:'แนวการเคลื่อนที่ S′ (ls)',color:'#a69cff',fn:x=>x/g});yLabel='แกน Y: ระยะทาง (light-second)';eqText='สมการ: x_S = ct,   x_S′ = ct / γ   (c = 299,792,458 m/s คงตัว)';}
 if(S.module==='transforms'){maxX=5;lines.push({name:'Galilean x′ (ls)',color:'#4eeaff',fn:x=>S.x-b*x},{name:'Lorentz x′ (ls)',color:'#a69cff',fn:x=>g*(S.x-b*x)});yLabel='แกน Y: ตำแหน่ง x′ (ls)';eqText='สมการ: x′_Gal = x − βct   เทียบกับ   x′_Lorentz = γ(x − βct)';}
 if(S.module==='dilation'){maxX=.95;xLabel='แกน X: ความเร็ว β = v/c';lines.push({name:'γ (time dilation)',color:'#4eeaff',fn:x=>1/Math.sqrt(1-x*x)},{name:'L / L₀',color:'#ffcb72',fn:x=>Math.sqrt(1-x*x)});yLabel='แกน Y: ตัวประกอบ (ไม่มีหน่วย)';eqText='สมการ: γ = 1/√(1−β²),   Δt = γΔτ,   L/L₀ = 1/γ = √(1−β²)';}
 if(S.module==='doppler'){maxX=.95;xLabel='แกน X: ความเร็วเข้าใกล้ β';lines.push({name:'f/f₀ (approach)',color:'#4eeaff',fn:x=>Math.sqrt((1+x)/(1-x))},{name:'f/f₀ (recede)',color:'#a69cff',fn:x=>Math.sqrt((1-x)/(1+x))});yLabel='แกน Y: ความถี่สัมพัทธ์ f_obs/f₀';eqText='สมการดอปเพลอร์: f_obs / f₀ = √[(1+β)/(1−β)]';}
 if(S.module==='momentum'){maxX=.95;xLabel='แกน X: ขนาดความเร็ว |β|';lines.push({name:'K relativistic / mc²',color:'#4eeaff',fn:x=>1/Math.sqrt(1-x*x)-1},{name:'K Newtonian / mc²',color:'#ffcb72',fn:x=>.5*x*x});yLabel='แกน Y: พลังงานจลน์ / mc²';eqText='สมการพลังงานจลน์: K_rel / mc² = γ − 1   เทียบกับ   K_Newton / mc² = ½β²';}
 if(S.module==='equivalence'){maxX=Math.max(.01,S.deltaM*1.3);xLabel='แกน X: มวล Δm (kg)';lines.push({name:'ΔE (×10¹⁶ J)',color:'#4eeaff',fn:x=>x*c2/1e16});yLabel='แกน Y: พลังงาน ΔE (10¹⁶ J)';eqText='สมการมวล–พลังงาน: ΔE = Δm c²';}
 for(let i=0;i<=n;i++){const x=maxX*i/n;pts.push({x,values:lines.map(l=>l.fn(x))});}
 const markerX=S.module==='transforms'?Math.min(maxX,Math.max(0,S.tEvent)):S.module==='dilation'||S.module==='momentum'?Math.abs(b):S.module==='doppler'?Math.abs(b):S.module==='equivalence'?S.deltaM:Math.min(maxX,S.t);
 return {pts,lines,maxX,xLabel,yLabel,markerX,eqText};}
function drawChart(){const canvas=$('physicsChart');if(!canvas)return;const rect=canvas.getBoundingClientRect();if(rect.width===0)return;const dpr=Math.min(devicePixelRatio,2);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);const W=rect.width,H=rect.height;
 const {pts,lines,maxX,xLabel,yLabel,markerX,eqText}=calcSeries();const left=66,right=22,top=36,bottom=50,w=W-left-right,h=H-top-bottom;
 const vals=pts.flatMap(p=>p.values);let lo=Math.min(0,...vals),hi=Math.max(1e-6,...vals);if(hi===lo)hi=lo+1;let pad=(hi-lo)*.12;lo-=pad;hi+=pad;
 ctx.clearRect(0,0,W,H);ctx.font='10.5px ui-monospace,monospace';ctx.strokeStyle='#294057';ctx.fillStyle='#8aa3bd';ctx.lineWidth=1;
 for(let i=0;i<=4;i++){let yy=top+h*i/4;ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(left+w,yy);ctx.stroke();ctx.textAlign='right';ctx.fillText(fmt(hi-(hi-lo)*i/4,2),left-8,yy+3);let xx=left+w*i/4;ctx.beginPath();ctx.moveTo(xx,top);ctx.lineTo(xx,top+h);ctx.stroke();ctx.textAlign='center';ctx.fillText(fmt(maxX*i/4,2),xx,H-28);ctx.textAlign='left';}
 ctx.strokeStyle='#5e8bb0';ctx.fillStyle='#5e8bb0';ctx.lineWidth=1.6;
 ctx.beginPath();ctx.moveTo(left,top+h);ctx.lineTo(left,top-6);ctx.moveTo(left,top+h);ctx.lineTo(left+w+6,top+h);ctx.stroke();
 ctx.beginPath();ctx.moveTo(left,top-9);ctx.lineTo(left-4,top-1);ctx.lineTo(left+4,top-1);ctx.closePath();ctx.fill();
 ctx.beginPath();ctx.moveTo(left+w+9,top+h);ctx.lineTo(left+w+1,top+h-4);ctx.lineTo(left+w+1,top+h+4);ctx.closePath();ctx.fill();
 ctx.textAlign='center';ctx.fillStyle='#bfe8ff';ctx.font='600 11.5px "Noto Sans Thai",system-ui,sans-serif';ctx.fillText(xLabel,left+w/2,H-9);ctx.save();ctx.translate(15,top+h/2);ctx.rotate(-Math.PI/2);ctx.fillText(yLabel,0,0);ctx.restore();ctx.textAlign='left';
 const py=v=>top+h-(v-lo)/(hi-lo)*h,px=x=>left+x/maxX*w;
 lines.forEach((line,j)=>{ctx.beginPath();pts.forEach((p,i)=>{let xx=px(p.x),yy=py(p.values[j]);if(i===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);});ctx.strokeStyle=line.color;ctx.lineWidth=2.5;ctx.stroke();});
 const mx=px(Math.min(maxX,markerX));ctx.setLineDash([4,5]);ctx.strokeStyle='#e5f4ff8c';ctx.beginPath();ctx.moveTo(mx,top);ctx.lineTo(mx,top+h);ctx.stroke();ctx.setLineDash([]);
 if(eqText){ctx.font='600 11px ui-monospace,"Noto Sans Thai",monospace';const bw=Math.min(W-left-12,ctx.measureText(eqText).width+20),bx=Math.max(left,left+(w-bw)/2);ctx.fillStyle='rgba(8,22,38,0.88)';ctx.strokeStyle='#347094';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,5,bw,22,5):ctx.rect(bx,5,bw,22);ctx.fill();ctx.stroke();ctx.fillStyle='#75ebf8';ctx.textAlign='center';ctx.fillText(eqText,bx+bw/2,20);ctx.textAlign='left';}
 $('chartLegend').innerHTML=lines.map(l=>`<span class="swatch" style="background:${l.color}"></span>${l.name}`).join('');
}
function downloadCSV(){const {pts,lines,xLabel}=calcSeries(),rows=[[xLabel,...lines.map(l=>l.name)],...pts.map(p=>[p.x,...p.values])];const metadata=[['# Relativity Lab 2027'],[`# module: ${S.module}`],[`# beta: ${S.beta}`],[`# gamma: ${gamma()}`],[`# c: ${C} m/s`]];const csv='\ufeff'+[...metadata,...rows].map(row=>row.map(v=>String(v).includes(',')?`"${String(v).replace(/"/g,'""')}"`:v).join(',')).join('\r\n');const a=document.createElement('a'),url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.href=url;a.download=`relativity_${S.module}_${Date.now()}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('moduleNav').addEventListener('click',e=>{let btn=e.target.closest('[data-module]');if(btn)switchModule(btn.dataset.module);});
$('beta').addEventListener('input',e=>{S.beta=+e.target.value;updateMeasurements();});
document.querySelectorAll('.speed-presets button').forEach(b=>b.addEventListener('click',()=>{S.beta=+b.dataset.beta;$('beta').value=S.beta;updateMeasurements();}));
$('timeScale').addEventListener('input',e=>{S.timeScale=+e.target.value;setText('timeScaleOutput',fmt(S.timeScale,1)+'×');});
$('playPause').addEventListener('click',()=>{S.running=!S.running;setText('playPause',S.running?'Ⅱ หยุดการจำลอง':'▶ เล่นการจำลอง');});
$('resetSimulation').addEventListener('click',()=>{S.t=0;updateMeasurements();});
$('randomize').addEventListener('click',()=>{S.beta=Math.round((Math.random()*1.8-.9)*100)/100;$('beta').value=S.beta;updateMeasurements();});
$('exportCSV').addEventListener('click',downloadCSV);
let last=performance.now();function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(S.running){S.t+=dt*S.timeScale;updateMeasurements();}else update3D();requestAnimationFrame(frame);}
async function bootstrap(){
 switchModule('postulates');
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
