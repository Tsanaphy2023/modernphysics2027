'use strict';
const $=id=>document.getElementById(id);
const PARTICLES=[
{id:'u',name:'Up quark',symbol:'u',cat:'quark',gen:1,charge:'+2/3 e',spin:'1/2',mass:'2.16 MeV/c²',mev:2.16,color:0xa987ff,notes:'ควาร์กรุ่น 1 เป็นองค์ประกอบของโปรตอนและนิวตรอน ถูกกักขังด้วยปฏิสัมพันธ์แรงเข้ม'},
{id:'d',name:'Down quark',symbol:'d',cat:'quark',gen:1,charge:'−1/3 e',spin:'1/2',mass:'4.67 MeV/c²',mev:4.67,color:0xa987ff,notes:'ควาร์กรุ่น 1 พบในโปรตอน (uud) และนิวตรอน (udd)'},
{id:'c',name:'Charm quark',symbol:'c',cat:'quark',gen:2,charge:'+2/3 e',spin:'1/2',mass:'1.27 GeV/c²',mev:1270,color:0xa987ff,notes:'ควาร์กรุ่น 2 ที่พบในฮาดรอนอายุสั้น'},
{id:'s',name:'Strange quark',symbol:'s',cat:'quark',gen:2,charge:'−1/3 e',spin:'1/2',mass:'93 MeV/c²',mev:93,color:0xa987ff,notes:'เกี่ยวข้องกับฮาดรอนที่มีค่า strangeness'},
{id:'t',name:'Top quark',symbol:'t',cat:'quark',gen:3,charge:'+2/3 e',spin:'1/2',mass:'172.76 GeV/c²',mev:172760,color:0xa987ff,notes:'ควาร์กที่หนักที่สุดในแบบจำลองมาตรฐาน'},
{id:'b',name:'Bottom quark',symbol:'b',cat:'quark',gen:3,charge:'−1/3 e',spin:'1/2',mass:'4.18 GeV/c²',mev:4180,color:0xa987ff,notes:'ควาร์กรุ่น 3 พบใน B mesons'},
{id:'e',name:'Electron',symbol:'e⁻',cat:'lepton',gen:1,charge:'−1 e',spin:'1/2',mass:'0.511 MeV/c²',mev:.511,color:0x3ee7ce,notes:'เลปตอนมีประจุ ไม่เข้าร่วมแรงเข้ม เป็นองค์ประกอบของอะตอม'},
{id:'ve',name:'Electron neutrino',symbol:'νₑ',cat:'lepton',gen:1,charge:'0',spin:'1/2',mass:'เล็กมาก (ไม่ทราบค่าแน่นอน)',mev:null,color:0x3ee7ce,notes:'นิวตริโนไม่มีประจุไฟฟ้า มีมวลไม่เป็นศูนย์ตามหลักฐานการสั่นของนิวตริโน'},
{id:'mu',name:'Muon',symbol:'μ⁻',cat:'lepton',gen:2,charge:'−1 e',spin:'1/2',mass:'105.66 MeV/c²',mev:105.66,color:0x3ee7ce,notes:'อนุภาคคล้ายอิเล็กตรอนแต่หนักกว่าและไม่เสถียร'},
{id:'vmu',name:'Muon neutrino',symbol:'νμ',cat:'lepton',gen:2,charge:'0',spin:'1/2',mass:'เล็กมาก (ไม่ทราบค่าแน่นอน)',mev:null,color:0x3ee7ce,notes:'นิวตริโนที่สัมพันธ์กับปฏิสัมพันธ์แบบ muon'},
{id:'tau',name:'Tau',symbol:'τ⁻',cat:'lepton',gen:3,charge:'−1 e',spin:'1/2',mass:'1.77686 GeV/c²',mev:1776.86,color:0x3ee7ce,notes:'เลปตอนมีประจุในรุ่นที่สาม'},
{id:'vtau',name:'Tau neutrino',symbol:'ντ',cat:'lepton',gen:3,charge:'0',spin:'1/2',mass:'เล็กมาก (ไม่ทราบค่าแน่นอน)',mev:null,color:0x3ee7ce,notes:'นิวตริโนในรุ่นที่สาม'},
{id:'photon',name:'Photon',symbol:'γ',cat:'boson',gen:0,charge:'0',spin:'1',mass:'0',mev:0,color:0xf6c86c,notes:'เกจโบซอนของแรงแม่เหล็กไฟฟ้า ไม่มีมวลหยุดนิ่ง'},
{id:'gluon',name:'Gluon',symbol:'g',cat:'boson',gen:0,charge:'0',spin:'1',mass:'0',mev:0,color:0xf6c86c,notes:'มี 8 สถานะสี ทำหน้าที่สื่อแรงเข้มใน Quantum Chromodynamics'},
{id:'w',name:'W boson',symbol:'W±',cat:'boson',gen:0,charge:'±1 e',spin:'1',mass:'80.38 GeV/c²',mev:80380,color:0xf6c86c,notes:'มี W⁺ และ W⁻ เป็นตัวกลางแรงอ่อน เช่น เบตาดีเคย์'},
{id:'z',name:'Z boson',symbol:'Z⁰',cat:'boson',gen:0,charge:'0',spin:'1',mass:'91.19 GeV/c²',mev:91190,color:0xf6c86c,notes:'โบซอนสื่อแรงอ่อนแบบกระแสเป็นกลาง'},
{id:'h',name:'Higgs boson',symbol:'H',cat:'scalar',gen:0,charge:'0',spin:'0',mass:'125.25 GeV/c²',mev:125250,color:0xfb8ed7,notes:'การกระตุ้นเชิงควอนตัมของสนามฮิกส์ เกี่ยวข้องกับการเกิดมวลของอนุภาคมูลฐานหลายชนิด'}
];
const FORCES={
em:{name:'แรงแม่เหล็กไฟฟ้า',en:'Electromagnetic force',carrier:'โฟตอน (γ)',range:'อนันต์',coupling:'α ≈ 1/137',color:0x5ce7fe,desc:'มีผลต่ออนุภาคที่มีประจุไฟฟ้า แรงอาจดึงดูดหรือผลักตามเครื่องหมายประจุ สนามที่แสดงเป็นภาพประกอบและใช้ความสัมพันธ์ผกผันกำลังสองในกรณีไฟฟ้าสถิต',activity:'เปลี่ยนระยะห่างจาก 1 fm เป็น 2 fm แล้วพิจารณาว่าแรงไฟฟ้าสถิตระหว่างประจุจุดควรลดลงกี่เท่า',answer:'ตามกฎคูลอมบ์ |F| ∝ 1/r² ดังนั้นเมื่อระยะเพิ่มเป็นสองเท่า แรงเหลือ 1/4 ของเดิม'},
strong:{name:'แรงเข้ม',en:'Strong interaction',carrier:'กลูออน (g)',range:'การกักขังควาร์กในระดับฮาดรอน ~1 fm',coupling:'ขึ้นกับสเกลพลังงาน',color:0xb397ff,desc:'กลูออนส่งผ่านประจุสีระหว่างควาร์ก แรงเข้มแบบ QCD ไม่สามารถแทนด้วยกฎ 1/r² ง่าย ๆ เส้นเชื่อมที่ปรากฏเป็นภาพของฟลักซ์สีเชิงสัญลักษณ์',activity:'อธิบายเหตุใดจึงไม่พบควาร์กโดดเดี่ยวในการทดลองทั่วไป',answer:'เมื่อพยายามแยกควาร์ก พลังงานในสนามสีเพิ่มขึ้นจนเกิดคู่ควาร์ก–ปฏิควาร์กใหม่และเกิด hadronization แทนควาร์กเดี่ยว'},
weak:{name:'แรงอ่อน',en:'Weak interaction',carrier:'W⁺, W⁻, Z⁰',range:'~10⁻¹⁸ m',coupling:'ระยะสั้นมาก',color:0x5ee9ad,desc:'ปฏิสัมพันธ์แรงอ่อนสามารถเปลี่ยนชนิด (flavor) ของควาร์กและเลปตอน สื่อกลางด้วย W และ Z ที่มีมวลมาก ภาพการส่งผ่านอนุภาคเป็นสัญลักษณ์',activity:'ยกตัวอย่างกระบวนการทางนิวเคลียร์ที่เกี่ยวข้องกับ W boson',answer:'การสลายเบตาลบ: นิวตรอน → โปรตอน + อิเล็กตรอน + แอนตินิวตริโนอิเล็กตรอน โดยภายในมีการเปลี่ยน d → u + W⁻'},
gravity:{name:'แรงโน้มถ่วง',en:'Gravity',carrier:'ยังไม่พบอนุภาคสื่อแรง (graviton เป็นสมมติฐาน)',range:'อนันต์',coupling:'อ่อนมากในระดับอนุภาค',color:0xffcb83,desc:'แรงโน้มถ่วงอธิบายด้วยความโค้งของกาลอวกาศในสัมพัทธภาพทั่วไป ยังไม่มีคำอธิบายควอนตัมที่ยืนยันครบถ้วน และแรงโน้มถ่วงไม่ใช่ส่วนหนึ่งของแบบจำลองมาตรฐาน',activity:'แบบจำลองมาตรฐานครอบคลุมแรงพื้นฐานทั้งสี่ชนิดหรือไม่',answer:'ไม่ครอบคลุมแรงโน้มถ่วง แบบจำลองมาตรฐานครอบคลุมแรงเข้ม แรงอ่อน และแรงแม่เหล็กไฟฟ้าเท่านั้น'}
};
let activeTab='forces',selectedForce='em',selectedParticle='e',running=true,speed=1,simTime=0,renderer,scene,camera,visualGroup,controlsOrbit,raf=0,lastTime=0,webgl=false,chartData=[];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const pretty=(n,d=3)=>Number.isFinite(n)?n.toLocaleString('en-US',{maximumFractionDigits:d}):'—';
function metrics(pairs){$('metrics').innerHTML=pairs.map(([k,v])=>`<div class="metric"><span>${k}</span><b>${v}</b></div>`).join('');}
function setTab(tab){activeTab=tab;document.querySelectorAll('.nav-button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));for(const name of ['Forces','Particles','Standard'])$('control'+name).hidden=({Forces:'forces',Particles:'particles',Standard:'standard'}[name]!==tab);$('modelPanel').hidden=tab!=='standard';$('answerText').hidden=true;simTime=0;refresh();}
function colorHex(c){return '#'+c.toString(16).padStart(6,'0');}
function refresh(){const info={forces:['แรงพื้นฐานทั้ง 4 ชนิดในธรรมชาติ','สลับชนิดแรง เพื่อเปรียบเทียบตัวกลาง ช่วงอิทธิพล และธรรมชาติของปฏิสัมพันธ์','3D FORCE EXPLORER'],particles:['อนุภาคมูลฐานและสมบัติ','เลือกควาร์ก เลปตอน เกจโบซอน และฮิกส์โบซอน เพื่อสำรวจสมบัติ','3D PARTICLE EXPLORER'],standard:['ตารางแบบจำลองมาตรฐาน','สำรวจอนุภาค 3 รุ่น และโบซอนที่สื่อแรงใน Standard Model','STANDARD MODEL EXPLORER']}[activeTab];$('stationTitle').textContent=info[0];$('stationDescription').textContent=info[1];$('stageName').textContent=info[2];if(activeTab==='forces')refreshForce();else if(activeTab==='particles')refreshParticle();else refreshStandard();buildScene();drawChart();}
function refreshForce(){const f=FORCES[selectedForce],d=Number($('distance').value);$('distanceVal').textContent=d.toFixed(2)+' fm';metrics([['ชนิดแรง',f.en],['ตัวกลาง',f.carrier],['พิสัย',f.range],['สเกลระยะที่แสดง',d.toFixed(2)+' fm']]);$('description').innerHTML=`<p>${f.desc}</p><p><b>ความแรง/คัปปลิง:</b> ${f.coupling}</p>`;$('activityText').innerHTML='<p>'+f.activity+'</p>';$('answerText').textContent=f.answer;$('plotTitle').textContent=selectedForce==='em'||selectedForce==='gravity'?'แรงสัมพัทธ์ตามระยะ (กฎผกผันกำลังสอง)':'การลดทอนเชิงสาธิตของปฏิสัมพันธ์';$('plotNote').textContent=selectedForce==='em'||selectedForce==='gravity'?'กราฟปรับมาตราส่วนโดยให้ค่าเท่ากับ 1 ที่ระยะ 1 fm; ไม่แสดงค่าคงที่แรงจริง':'กราฟเชิงสาธิตเพื่อเปรียบเทียบระยะ ไม่ใช่ผลคำนวณ QCD หรือ electroweak scattering';chartData=Array.from({length:150},(_,i)=>{const x=.1+i*4.9/149;return [x,selectedForce==='em'||selectedForce==='gravity'?1/(x*x):selectedForce==='weak'?Math.exp(-x/.35):1/(1+Math.exp((x-1.3)*3))];});}
function refreshParticle(){
  const p=PARTICLES.find(v=>v.id===selectedParticle);
  const beta=Number($('particleSpeed').value);
  const gamma=1/Math.sqrt(1-beta*beta);
  $('particleSpeedVal').textContent=beta.toFixed(2)+' c';
  const totalE=(p.mev!==null&&p.mev>0)?(p.mev*gamma>=1000?`${(p.mev*gamma/1000).toFixed(2)} GeV`:`${(p.mev*gamma).toFixed(2)} MeV`):(p.mev===0?'E = pc (m = 0)':'น้อยมาก');
  metrics([['อนุภาค',`${p.name} (${p.symbol})`],['ชนิด',({quark:'Quark',lepton:'Lepton',boson:'Gauge boson',scalar:'Scalar boson'})[p.cat]+(p.gen?` · Gen ${p.gen}`:'')],['ประจุไฟฟ้า',p.charge],['สปิน',p.spin],['มวลหยุดนิ่ง',p.mass],['พลังงานรวม (γmc²)',`${totalE} (γ=${gamma.toFixed(2)})`]]);
  $('description').innerHTML=`<p>${p.notes}</p><p><b>หมายเหตุสเกล:</b> อนุภาคมูลฐานเป็น Point-like ไม่มีรัศมีเชิงกลจริง ขนาดในฉาก 3D/2D แทนสเกลลอการิทึมของมวล $\\log_{10}(m)$ เท่านั้น</p>`;
  $('activityText').innerHTML='<p>เปรียบเทียบมวลของ Electron, Muon และ Tau แล้วลองปรับความเร็ว $\\beta$ เพื่อสังเกตการเพิ่มขึ้นของพลังงานสัมพัทธภาพ $\\gamma mc^2$</p>';
  $('answerText').textContent='มวลเพิ่มตามรุ่นสำหรับเลปตอนมีประจุ: e ≈ 0.511 MeV, μ ≈ 105.66 MeV, τ ≈ 1776.86 MeV และเมื่อ β เข้าใกล้ c พลังงานรวม E = γmc² จะพุ่งสูงขึ้น';
  $('plotTitle').textContent='มวลหยุดนิ่งของอนุภาค (log₁₀ MeV/c²)';
  $('plotNote').textContent='กราฟแสดงมวลอนุภาค 12 ชนิดที่มีค่ามวลระบุชัดเจน (จุดสีทองคืออนุภาคที่กำลังเลือก)';
  chartData=PARTICLES.filter(x=>x.mev>0).map((x,i)=>[i,Math.log10(x.mev),x.symbol,x.id===selectedParticle]);
}
function refreshStandard(){renderGrid();const p=PARTICLES.find(v=>v.id===selectedParticle);metrics([['จำนวนเฟอร์มิออน',12+' ชนิด'],['ควาร์ก / เลปตอน','6 / 6'],['เกจโบซอน','γ, g, W±, Z⁰'],['ฮิกส์โบซอน','H (สปิน 0)'],['ที่เลือก',p.name]]);$('description').innerHTML='<p>Standard Model อธิบายปฏิสัมพันธ์แม่เหล็กไฟฟ้า อ่อน และเข้ม ไม่รวมแรงโน้มถ่วง มีอนุภาคเฟอร์มิออน 3 รุ่น และสนามฮิกส์</p><p>การ์ด W± รวมสองสถานะประจุและ gluon รวมแปดสถานะสี</p>';$('activityText').innerHTML='<p>เลือก Quarks รุ่น 1 แล้วระบุควาร์กที่ใช้ประกอบโปรตอนและนิวตรอน และเหตุใดโปรตอนจึงมีประจุ +1e</p>';$('answerText').textContent='โปรตอนประกอบด้วย uud: +2/3 +2/3 −1/3 = +1e; นิวตรอนประกอบด้วย udd: +2/3 −1/3 −1/3 = 0';$('plotTitle').textContent='จำนวนอนุภาคเฟอร์มิออนรายรุ่น';$('plotNote').textContent='แต่ละรุ่นประกอบด้วยควาร์ก 2 ชนิด และเลปตอน 2 ชนิด';chartData=[[1,4],[2,4],[3,4]];}
function renderGrid(){const cat=$('categorySelect').value,gen=$('generationSelect').value,q=$('searchInput').value.trim().toLowerCase();const filtered=PARTICLES.filter(p=>(cat==='all'||p.cat===cat)&&(gen==='all'||String(p.gen)===gen||p.gen===0&&cat!=='all'&&cat!=='quark'&&cat!=='lepton')&&(!q||`${p.id} ${p.name} ${p.symbol}`.toLowerCase().includes(q)));$('modelCount').textContent=`${filtered.length} การ์ด`;$('smGrid').innerHTML=filtered.map(p=>`<button class="particle-card ${p.cat} ${p.id===selectedParticle?'selected':''}" data-particle="${p.id}" title="${p.name}"><span class="symbol">${p.symbol}</span><small>${p.name}</small><span class="mass">${p.mass}</span><span class="mass" style="color:#7dd3fc;">Q:${p.charge} · s:${p.spin}</span></button>`).join('');$('smGrid').querySelectorAll('[data-particle]').forEach(b=>b.addEventListener('click',()=>{selectedParticle=b.dataset.particle;$('particleSelect').value=selectedParticle;refresh();}));}
function makeSphere(radius,color,x=0,y=0,z=0,opts={}){
  const mat=new THREE.MeshPhysicalMaterial({
    color,metalness:opts.metalness??.3,roughness:opts.roughness??.22,clearcoat:.45,
    emissive:color,emissiveIntensity:opts.emissiveIntensity??.2,
    transparent:Boolean(opts.opacity!==undefined&&opts.opacity<1),opacity:opts.opacity??1,
    wireframe:Boolean(opts.wireframe)
  });
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,28,20),mat);
  mesh.position.set(x,y,z);
  if(opts.userData)Object.assign(mesh.userData,opts.userData);
  visualGroup.add(mesh);
  return mesh;
}
function makeLine(points,color,opacity=1){
  const geo=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));
  const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:opacity<1,opacity}));
  visualGroup.add(line);
  return line;
}
function makeTextSprite(text,x,y,z,color='#e2e8f0',scale=1.6){
  if(window.MP27Labels&&typeof window.MP27Labels.makeSprite==='function'){
    return window.MP27Labels.makeSprite(THREE,text,x,y,z,color);
  }
  const c=document.createElement('canvas');c.width=512;c.height=128;
  const g=c.getContext('2d');
  g.fillStyle='rgba(9,18,36,0.78)';g.fillRect(8,18,496,92);
  g.strokeStyle=color;g.lineWidth=3;g.strokeRect(8,18,496,92);
  g.fillStyle=color;g.font='700 32px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';
  g.fillText(text,256,64);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));
  sp.position.set(x,y,z);sp.scale.set(scale*2.2,scale*0.55,1);
  return sp;
}
function massRadius(p){
  if(!p||p.mev===0)return 0.34;
  if(p.mev===null)return 0.24;
  return clamp(0.32+(Math.log10(p.mev)+1)*0.105,0.28,0.96);
}
function rings(x,color){for(let r of [1,1.45,1.85]){const pts=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;pts.push([x,Math.sin(a)*r,Math.cos(a)*r]);}makeLine(pts,color,.25);}}
window.addEventListener('mp27:labels',()=>{if(visualGroup&&window.MP27Labels)window.MP27Labels.applyToRoot(visualGroup);});
function buildScene(){
  if(!webgl)return;
  while(visualGroup.children.length){
    const child=visualGroup.children[0];
    visualGroup.remove(child);
    child.geometry?.dispose();
    if(Array.isArray(child.material))child.material.forEach(m=>{m.map?.dispose();m.dispose();});
    else{child.material?.map?.dispose();child.material?.dispose();}
  }
  for(const xPos of [-2.8,0,2.8]){
    const cRing=new THREE.Mesh(new THREE.TorusGeometry(2.85,.055,12,64),new THREE.MeshPhysicalMaterial({color:0x334155,metalness:.85,roughness:.25,transparent:true,opacity:.55}));
    cRing.rotation.y=Math.PI/2;cRing.position.x=xPos;visualGroup.add(cRing);
  }

  if(activeTab==='forces'){
    const d=Number($('distance').value),f=FORCES[selectedForce],gap=1.1+d*.45;
    visualGroup.add(makeTextSprite(`${f.name} • ตัวกลาง: ${f.carrier}`,0,3.05,0,colorHex(f.color),1.8));
    if(selectedForce==='strong'){
      // 3-Quark Color Confinement (RGB) + Gluon Flux Tubes
      const qCols=[0xf43f5e,0x22c55e,0x38bdf8],qNames=['q (Red)','q (Green)','q (Blue)'];
      const r=0.55+d*0.22;
      const pts=[];
      for(let i=0;i<3;i++){
        const a=i*Math.PI*2/3-Math.PI/2;
        const px=Math.cos(a)*r,py=Math.sin(a)*r;
        pts.push([px,py,0]);
        makeSphere(0.32,qCols[i],px,py,0);
        visualGroup.add(makeTextSprite(qNames[i],px,py+0.55,0,colorHex(qCols[i]),0.9));
      }
      for(let i=0;i<3;i++){
        const p1=pts[i],p2=pts[(i+1)%3];
        makeLine([p1,p2],0xc084fc,0.85);
        makeSphere(0.11,0xfbbf24,(p1[0]+p2[0])/2,(p1[1]+p2[1])/2,0,{userData:{bosonOrb:true,idx:i}});
      }
      makeSphere(r+0.68,0xa855f7,0,0,0,{opacity:0.12,wireframe:true});
    }else if(selectedForce==='gravity'){
      // Spacetime Curvature Grid + Two Masses
      const seg=24,size=6.2;
      for(let i=-seg/2;i<=seg/2;i+=2){
        const row=[],col=[];
        for(let j=-seg/2;j<=seg/2;j++){
          const x=i*size/seg,z=j*size/seg;
          const dip1=-1.15/Math.hypot(x+gap/2,z,0.55);
          const dip2=-0.85/Math.hypot(x-gap/2,z,0.55);
          row.push([x,dip1+dip2-0.4,z]);
          const x2=j*size/seg,z2=i*size/seg;
          const d1=-1.15/Math.hypot(x2+gap/2,z2,0.55);
          const d2=-0.85/Math.hypot(x2-gap/2,z2,0.55);
          col.push([x2,d1+d2-0.4,z2]);
        }
        makeLine(row,0xf59e0b,0.45);makeLine(col,0xf59e0b,0.45);
      }
      makeSphere(0.5,0xfbbf24,-gap/2,0.15,0);
      makeSphere(0.34,0x38bdf8,gap/2,0.15,0);
      visualGroup.add(makeTextSprite('Spacetime Curvature (GR)',0,-1.85,0,'#fbbf24',1.35));
    }else if(selectedForce==='weak'){
      // Weak decay vertex: d -> u + W- -> e- + nu_e_bar
      makeSphere(0.36,0xa987ff,-gap/2,0.4,0);
      visualGroup.add(makeTextSprite('d quark (-1/3 e)',-gap/2,1.0,0,'#c4b5fd',0.95));
      makeSphere(0.36,0x38bdf8,-gap/2,-0.6,0);
      visualGroup.add(makeTextSprite('u quark (+2/3 e)',-gap/2,-1.2,0,'#7dd3fc',0.95));
      makeLine([[-gap/2,0.4,0],[0,0,0],[-gap/2,-0.6,0]],0xa987ff,0.85);
      makeLine([[0,0,0],[gap/2,0,0]],0x34d399,0.9);
      makeSphere(0.22,0x34d399,0,0,0,{userData:{bosonOrb:true,idx:0}});
      visualGroup.add(makeTextSprite('W⁻ (80.38 GeV)',gap*0.2,0.45,0,'#34d399',0.95));
      makeLine([[gap/2,0,0],[gap/2+0.9,0.7,0]],0x3ee7ce,0.9);
      makeLine([[gap/2,0,0],[gap/2+0.9,-0.7,0]],0xfde047,0.75);
      makeSphere(0.2,0x3ee7ce,gap/2+0.9,0.7,0);
      makeSphere(0.14,0xfde047,gap/2+0.9,-0.7,0);
      visualGroup.add(makeTextSprite('e⁻ + ν̄ₑ',gap/2+0.9,1.18,0,'#5eead4',0.95));
    }else{
      // Electromagnetic: Charge + / - & Photon wave exchange
      makeSphere(0.42,0x38bdf8,-gap/2,0,0);
      makeSphere(0.42,0xf43f5e,gap/2,0,0);
      visualGroup.add(makeTextSprite('q₁ (+)',-gap/2,0.9,0,'#38bdf8',0.9));
      visualGroup.add(makeTextSprite('q₂ (−)',gap/2,0.9,0,'#fb7185',0.9));
      if($('forceView').value==='field'){rings(-gap/2,0x5ce7fe);rings(gap/2,0xf43f5e);}
      else{
        const wave=[];
        for(let i=0;i<=48;i++){const u=i/48,x=-gap/2+u*gap;wave.push([x,Math.sin(u*Math.PI*6)*0.22,0]);}
        makeLine(wave,0xfbbf24,0.95);
        for(let i=0;i<3;i++)makeSphere(0.09,0xfbbf24,0,0,0,{userData:{bosonOrb:true,idx:i}});
      }
    }
  }else if(activeTab==='particles'){
    const p=PARTICLES.find(x=>x.id===selectedParticle)||PARTICLES[0];
    const r=massRadius(p);
    const catName=({quark:'Quark',lepton:'Lepton',boson:'Gauge Boson',scalar:'Scalar Boson'})[p.cat];
    visualGroup.add(makeTextSprite(`${p.symbol} · ${p.name} (${catName})`,0,2.95,0,colorHex(p.color),1.7));
    visualGroup.add(makeTextSprite(`มวล: ${p.mass} | ประจุ: ${p.charge} | สปิน: ${p.spin}`,0,-2.35,0,'#cbd5e1',1.55));
    if(p.mev===0){
      // Massless gauge boson: glowing wave torus + core glow
      const torus=new THREE.Mesh(new THREE.TorusGeometry(0.68,0.12,16,64),new THREE.MeshPhysicalMaterial({color:p.color,emissive:p.color,emissiveIntensity:0.55,metalness:0.2,roughness:0.15}));
      visualGroup.add(torus);
      makeSphere(0.24,p.color,0,0,0,{opacity:0.45});
    }else{
      makeSphere(r,p.color,0,0,0);
    }
    // Spin vector arrow (s = 1/2 or 1; Higgs s = 0 has scalar halo)
    if(p.spin!=='0'){
      const arrowLen=p.spin==='1'?1.45:1.15;
      makeLine([[0,-arrowLen,0],[0,arrowLen,0]],0xfde047,0.9);
      const cone=new THREE.Mesh(new THREE.ConeGeometry(0.12,0.32,16),new THREE.MeshBasicMaterial({color:0xfde047}));
      cone.position.set(0,arrowLen+0.1,0);visualGroup.add(cone);
      visualGroup.add(makeTextSprite(`Spin s = ${p.spin}`,0.85,arrowLen,0,'#fde047',0.85));
    }else{
      makeSphere(r+0.35,0xfb8ed7,0,0,0,{opacity:0.18,wireframe:true});
      visualGroup.add(makeTextSprite('Scalar Field (s = 0)',0,1.45,0,'#f9a8d4',0.95));
    }
    for(let i=0;i<3;i++){
      const pts=[];
      for(let j=0;j<=100;j++){const a=j/100*Math.PI*2;pts.push([Math.cos(a)*(r+0.42),Math.sin(a)*(r+0.42)*Math.cos(i*1.05),Math.sin(a)*(r+0.42)*Math.sin(i*1.05)]);}
      makeLine(pts,p.color,.38);
    }
    if($('particleMode').value==='pair'){
      makeSphere(r*0.85,0xffb26d,2.0,0,0);
      makeLine([[0,0,0],[2.0,0,0]],0xffffff,.4);
      visualGroup.add(makeTextSprite(`Anti-${p.symbol}`,2.0,r+0.55,0,'#fdba74',0.95));
    }
  }else{
    // Tab 03: Full 17-Particle Standard Model 3D Matrix
    const cat=$('categorySelect').value,gen=$('generationSelect').value,q=$('searchInput').value.trim().toLowerCase();
    visualGroup.add(makeTextSprite('แบบจำลองมาตรฐาน 17 อนุภาค (Standard Model 3D Matrix)',0,3.1,0,'#38bdf8',1.8));
    const layout={
      u:[0,1.4],c:[1,1.4],t:[2,1.4],
      d:[0,0.45],s:[1,0.45],b:[2,0.45],
      e:[0,-0.55],mu:[1,-0.55],tau:[2,-0.55],
      ve:[0,-1.5],vmu:[1,-1.5],vtau:[2,-1.5],
      photon:[3.2,1.4],gluon:[3.2,0.45],w:[3.2,-0.55],z:[3.2,-1.5],
      h:[4.35,0.45]
    };
    PARTICLES.forEach(p=>{
      const pos=layout[p.id];if(!pos)return;
      const x=(pos[0]-2.1)*1.25,y=pos[1];
      const match=(cat==='all'||p.cat===cat)&&(gen==='all'||String(p.gen)===gen||p.gen===0&&cat!=='all'&&cat!=='quark'&&cat!=='lepton')&&(!q||`${p.id} ${p.name} ${p.symbol}`.toLowerCase().includes(q));
      const isSel=p.id===selectedParticle;
      const r=clamp(massRadius(p)*0.42,0.14,0.38);
      makeSphere(r,p.color,x,y,isSel?0.35:0,{opacity:match?1:0.18,emissiveIntensity:isSel?0.65:0.2});
      if(isSel){
        const ring=new THREE.Mesh(new THREE.TorusGeometry(r+0.14,0.03,10,32),new THREE.MeshBasicMaterial({color:0xffffff}));
        ring.position.set(x,y,0.35);visualGroup.add(ring);
      }
      if(match){
        visualGroup.add(makeTextSprite(`${p.symbol}`,x,y-r-0.22,isSel?0.4:0.05,isSel?'#ffffff':colorHex(p.color),0.65));
      }
    });
  }
}
async function init3d(){const area=$('scene');if(!window.THREE){try{const mod=await import('https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js');window.THREE=mod;}catch(_){}}if(!window.THREE){$('rendererStatus').textContent='โหมด 2D สำรอง';return;}try{scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(48,area.clientWidth/area.clientHeight,.1,100);camera.position.set(0,2.9,7.8);renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.28;renderer.setSize(area.clientWidth,area.clientHeight);area.prepend(renderer.domElement);window.MP27RegisterXR?.(renderer,scene,camera,THREE);const pmrem=new THREE.PMREMGenerator(renderer),env=new THREE.Scene();env.background=new THREE.Color(0x091625);const card=new THREE.Mesh(new THREE.BoxGeometry(9,4,.4),new THREE.MeshBasicMaterial({color:0xdbf3ff}));card.position.set(-5,7,5);env.add(card);scene.environment=pmrem.fromScene(env,.04).texture;pmrem.dispose();scene.add(new THREE.HemisphereLight(0xbce3ff,0x14263b,1.75));const dir=new THREE.DirectionalLight(0xf3f9ff,2.2);dir.position.set(4,9,6);scene.add(dir);const light=new THREE.PointLight(0x8bdcfd,75);light.position.set(3,4,5);scene.add(light);visualGroup=new THREE.Group();scene.add(visualGroup);webgl=true;$('fallbackCanvas').style.display='none';$('rendererStatus').textContent='3D PBR พร้อมใช้งาน';let dragging=false,lastX=0,lastY=0,rotX=0,rotY=0,zoom=7.8;renderer.domElement.style.touchAction='none';renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)});renderer.domElement.addEventListener('pointerup',()=>dragging=false);renderer.domElement.addEventListener('pointermove',e=>{if(!dragging)return;rotY+=(e.clientX-lastX)*.008;rotX=clamp(rotX+(e.clientY-lastY)*.006,-1.4,1.4);lastX=e.clientX;lastY=e.clientY;visualGroup.rotation.set(rotX,rotY,0);});renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();zoom=clamp(zoom+e.deltaY*.008,3,16);camera.position.set(0,zoom*.37,zoom);},{passive:false});window.addEventListener('resize',()=>{const w=area.clientWidth,h=area.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);drawChart();});buildScene();}catch(e){webgl=false;$('rendererStatus').textContent='โหมด 2D สำรอง';console.warn(e);}}
function frame(now){const dt=Math.min((now-lastTime)/1000||0,.04);lastTime=now;if(running)simTime+=dt*speed;if(webgl){if(running){if(activeTab==='standard'){visualGroup.rotation.y=Math.sin(simTime*.35)*.16;}else if(activeTab==='particles'){const pSpd=0.6+Number($('particleSpeed').value)*2.4;visualGroup.rotation.y+=dt*speed*pSpd*.25;}else{visualGroup.rotation.y+=dt*speed*.19;}if(activeTab==='forces'){visualGroup.children.forEach(mesh=>{if(mesh.userData&&mesh.userData.bosonOrb){const i=mesh.userData.idx||0;mesh.position.x=Math.sin(simTime*2.4+i*1.7)*.75;}});}}renderer.render(scene,camera);}else drawFallback();raf=requestAnimationFrame(frame);}
function drawFallback(){const canvas=$('fallbackCanvas'),ctx=canvas.getContext('2d'),r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=r.width,h=r.height;if(!w||!h)return;if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);const a=w*.33,b=w*.67,cy=h*.5;const orb=(x,y,size,color)=>{const grd=ctx.createRadialGradient(x-size*.25,y-size*.25,2,x,y,size);grd.addColorStop(0,'#ffffff');grd.addColorStop(.3,color);grd.addColorStop(1,'#0b2032');ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();};if(activeTab==='forces'){ctx.strokeStyle=colorHex(FORCES[selectedForce].color);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(a,cy);ctx.quadraticCurveTo(w*.5,cy-70,b,cy);ctx.stroke();orb(a,cy,32,'#56d5f4');orb(b,cy,32,colorHex(FORCES[selectedForce].color));}else{const p=PARTICLES.find(x=>x.id===selectedParticle);orb(w/2,cy,58,colorHex(p.color));ctx.strokeStyle=colorHex(p.color);ctx.beginPath();ctx.ellipse(w/2,cy,115,55,Math.sin(simTime*.2),0,Math.PI*2);ctx.stroke();}ctx.textAlign='center';ctx.font='14px sans-serif';ctx.fillStyle='#afc9dd';ctx.fillText('2D visual fallback · Educational model',w/2,h-30);}
function drawChart(){const canvas=$('plot'),ctx=canvas.getContext('2d'),rect=canvas.getBoundingClientRect(),w=rect.width||700,h=rect.height||245,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.fillStyle='#091624';ctx.fillRect(0,0,w,h);const L=62,R=20,T=34,B=42,PW=w-L-R,PH=h-T-B;ctx.font='11px sans-serif';ctx.strokeStyle='#2a465f';ctx.lineWidth=1;for(let i=0;i<=4;i++){let y=T+PH*i/4;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(w-R,y);ctx.stroke();}
ctx.strokeStyle='#7cc4e8';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(L,T-5);ctx.lineTo(L,T+PH);ctx.lineTo(w-R+6,T+PH);ctx.stroke();ctx.fillStyle='#7cc4e8';ctx.beginPath();ctx.moveTo(w-R+10,T+PH);ctx.lineTo(w-R+2,T+PH-4);ctx.lineTo(w-R+2,T+PH+4);ctx.fill();ctx.beginPath();ctx.moveTo(L,T-9);ctx.lineTo(L-4,T-1);ctx.lineTo(L+4,T-1);ctx.fill();
const data=chartData;if(!data.length)return;let xs=data.map(d=>d[0]),ys=data.map(d=>d[1]),xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(0,...ys),ymax=Math.max(...ys);if(ymax===ymin)ymax+=1;if(xmax===xmin)xmax+=1;const X=x=>L+(x-xmin)/(xmax-xmin)*PW,Y=y=>T+(ymax-y)/(ymax-ymin)*PH;ctx.fillStyle='#91abc4';ctx.textAlign='right';for(let i=0;i<=4;i++)ctx.fillText(pretty(ymax-(ymax-ymin)*i/4,2),L-8,T+PH*i/4+4);ctx.textAlign='center';for(let i=0;i<=4;i++)ctx.fillText(pretty(xmin+(xmax-xmin)*i/4,2),L+PW*i/4,T+PH+15);ctx.strokeStyle='#60e5f6';ctx.lineWidth=2.6;ctx.beginPath();data.forEach(([x,y],i)=>i?ctx.lineTo(X(x),Y(y)):ctx.moveTo(X(x),Y(y)));ctx.stroke();if(activeTab==='forces'){const x=Number($('distance').value);ctx.strokeStyle='#f4c86b';ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(X(x),T);ctx.lineTo(X(x),T+PH);ctx.stroke();ctx.setLineDash([]);}if(activeTab!=='forces'){data.forEach((pt)=>{const [x,y,lbl,hi]=pt;ctx.fillStyle=hi?'#fbbf24':'#9cebe4';ctx.beginPath();ctx.arc(X(x),Y(y),hi?6:3.5,0,Math.PI*2);ctx.fill();if(lbl){ctx.fillStyle=hi?'#fbbf24':'#cbd5e1';ctx.font='700 10px sans-serif';ctx.fillText(lbl,X(x),Y(y)-9);}});}
const xLbl=activeTab==='forces'?'ระยะห่างอนุภาค r (fm)':activeTab==='particles'?'ลำดับอนุภาคที่มีมวล (Index)':'รุ่นอนุภาค (Generation)';
const yLbl=activeTab==='forces'?'ความแรงสัมพัทธ์':activeTab==='particles'?'log₁₀(Mass / MeV)':'จำนวนเฟอร์มิออน/รุ่น';
const eqTxt=activeTab==='forces'?(selectedForce==='em'||selectedForce==='gravity'?'สมการ: F(r) ∝ 1 / r²':'สมการ: V(r) ∼ e^(−mr) / r (Short Range)'):activeTab==='particles'?'สมการ: m_τ > m_μ > m_e , E = √(p²c² + m²c⁴)':'สมการ: Standard Model = 6 Quarks + 6 Leptons + 5 Bosons';
ctx.font='600 11px ui-monospace,monospace';const bw=Math.min(w-L-8,ctx.measureText(eqTxt).width+20),bx=Math.max(L,L+(PW-bw)/2);ctx.fillStyle='rgba(8,24,42,0.9)';ctx.strokeStyle='#347094';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,4,bw,22,5):ctx.rect(bx,4,bw,22);ctx.fill();ctx.stroke();ctx.fillStyle='#78f2cf';ctx.fillText(eqTxt,bx+bw/2,19);
ctx.font='600 11px "Noto Sans Thai",sans-serif';ctx.fillStyle='#bfe8ff';ctx.fillText('แกน X: '+xLbl,L+PW/2,h-6);ctx.save();ctx.translate(14,T+PH/2);ctx.rotate(-Math.PI/2);ctx.fillText('แกน Y: '+yLbl,0,0);ctx.restore();ctx.textAlign='left';}
function exportCSV(){let headers=activeTab==='forces'?'distance_fm,relative_response':activeTab==='particles'?'particle_index,log10_mass_MeV':'generation,fermion_types';const csv=headers+'\n'+chartData.map(row=>row.join(',')).join('\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='particle_physics_'+activeTab+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function setup(){PARTICLES.forEach(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=p.name+' ('+p.symbol+')';$('particleSelect').appendChild(option)});$('particleSelect').value='e';document.querySelectorAll('.nav-button').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));$('forceSelect').addEventListener('change',e=>{selectedForce=e.target.value;refresh();});['distance','forceView'].forEach(id=>$(id).addEventListener('input',refresh));$('particleSelect').addEventListener('change',e=>{selectedParticle=e.target.value;refresh();});['particleSpeed','particleMode'].forEach(id=>$(id).addEventListener('input',refresh));['categorySelect','generationSelect','searchInput'].forEach(id=>$(id).addEventListener('input',refresh));$('speed').addEventListener('input',e=>{speed=Number(e.target.value);$('speedVal').textContent=speed.toFixed(1)+'×';});$('playBtn').addEventListener('click',()=>{running=!running;$('playBtn').textContent=running?'⏸ หยุด':'▶ เล่น';});$('stepBtn').addEventListener('click',()=>{running=false;$('playBtn').textContent='▶ เล่น';simTime+=.1;if(webgl)visualGroup.rotation.y+=.08;});$('resetBtn').addEventListener('click',()=>{simTime=0;running=true;speed=1;$('speed').value=1;$('speedVal').textContent='1.0×';$('playBtn').textContent='⏸ หยุด';if(webgl)visualGroup.rotation.set(0,0,0);refresh();});$('csvBtn').addEventListener('click',exportCSV);$('answerBtn').addEventListener('click',()=>{$('answerText').hidden=!$('answerText').hidden;});$('helpBtn').addEventListener('click',()=>$('helpDialog').showModal());$('closeHelp').addEventListener('click',()=>$('helpDialog').close());init3d();refresh();raf=requestAnimationFrame(frame);}
document.addEventListener('DOMContentLoaded',setup);
