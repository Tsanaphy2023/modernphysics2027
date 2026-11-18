const H=6.62607015e-34,HB=H/(2*Math.PI),ME=9.1093837139e-31,MP=1.67262192595e-27,MN=1.67492750056e-27,E=1.602176634e-19,C=299792458;
const state={module:'debroglie',playing:true,t:0,voltage:150,particle:'electron',dv:54,angle:50,d:0.091,sigma:1.7,wavelength:1.2};
const modules={
 debroglie:{title:'สมมติฐานคลื่นสสารของเดอบรอยล์',desc:'การเคลื่อนที่ของอนุภาคสัมพันธ์กับความยาวคลื่น λ = h / p',label:'MATTER WAVE · DE BROGLIE',graph:'คลื่นสสาร (ค่าคลื่นแบบ normalized)',hint:'แกน x: ตำแหน่งสัมพัทธ์ · แกน y: แอมพลิจูด',fields:[{key:'particle',label:'ชนิดอนุภาค',type:'select',options:[['electron','อิเล็กตรอน'],['proton','โปรตอน'],['neutron','นิวตรอน']]},{key:'voltage',label:'พลังงานจลน์ (eV)',min:1,max:5000,step:1,unit:' eV'}],theory:'<p>หลุยส์ เดอบรอยล์เสนอว่าอนุภาคที่มีโมเมนตัม p มีสมบัติเป็นคลื่น โดยความยาวคลื่นลดลงเมื่อโมเมนตัมเพิ่มขึ้น</p><span class="formula">λ = h / p</span><span class="formula">p c = √[K(K + 2mc²)]</span><p>ใช้พลังงานจลน์ K เป็น eV และคำนวณโมเมนตัมเชิงสัมพัทธภาพเพื่อให้ใช้ได้แม้พลังงานสูง</p>',task:'เลือกอิเล็กตรอนที่ 150 eV จากนั้นเพิ่มพลังงานเป็น 600 eV แล้วตรวจสอบว่า λ มีค่าลดลงประมาณครึ่งหนึ่งหรือไม่'},
 davisson:{title:'การทดลองของเดวิสสัน–เจอร์เมอร์',desc:'กระเจิงอิเล็กตรอนบนผลึกนิกเกิล และตรวจวัดความเข้มตามมุมกระเจิง',label:'ELECTRON DIFFRACTION · Ni CRYSTAL',graph:'ความเข้มการกระเจิงกับมุมตรวจวัด',hint:'แกน x: มุมกระเจิง (°) · แกน y: ความเข้มสัมพัทธ์',fields:[{key:'dv',label:'แรงดันเร่งอิเล็กตรอน',min:20,max:200,step:1,unit:' V'},{key:'angle',label:'มุมตรวจวัด (มุมกระเจิง)',min:20,max:160,step:1,unit:'°'},{key:'d',label:'ระยะระนาบผลึก Ni (nm)',min:0.075,max:0.16,step:0.001,unit:' nm'}],theory:'<p>ลำอิเล็กตรอนที่เร่งผ่านศักย์ไฟฟ้า V ชนผลึกนิกเกิลแล้วเกิดยอดความเข้มจากการแทรกสอด เป็นหลักฐานเชิงทดลองของคลื่นสสาร</p><span class="formula">λ ≈ 1.226 / √V  (nm)</span><span class="formula">nλ = 2d sin θᴮ</span><p>สำหรับเรขาคณิตแบบเรียนที่ใช้ในโมเดลนี้ θᴮ = (180° − φ)/2 โดย φ เป็นมุมกระเจิง ทดลอง 54 V, d ≈ 0.091 nm และ φ ≈ 50°</p><p>กราฟเป็นแบบจำลองยอดเลี้ยวเบนเชิงปรากฏการณ์ ไม่ใช่การคำนวณโครงสร้างผลึกจาก first principles</p>',task:'ตั้ง V = 54 V, d = 0.091 nm แล้วกวาดมุม φ เพื่อหายอดความเข้มใกล้ 50° และเปรียบเทียบ λ จากเดอบรอยล์กับกฎของแบรกก์'},
 uncertainty:{title:'กลุ่มคลื่นและหลักความไม่แน่นอนของไฮเซนเบิร์ก',desc:'สำรวจความสัมพันธ์ระหว่างความกว้างของกลุ่มคลื่นและการกระจายโมเมนตัม',label:'GAUSSIAN WAVE PACKET · FOURIER',graph:'กลุ่มคลื่น Gaussian ในอวกาศ',hint:'แกน x: ตำแหน่ง (nm) · แกน y: ψ (normalized)',fields:[{key:'sigma',label:'ความไม่แน่นอนตำแหน่ง Δx',min:0.25,max:5,step:0.05,unit:' nm'},{key:'wavelength',label:'ความยาวคลื่นพาหะ λ₀',min:0.4,max:3,step:0.05,unit:' nm'}],theory:'<p>กลุ่มคลื่นประกอบด้วยคลื่นระนาบหลายเลขคลื่นรวมกัน เมื่อบีบกลุ่มคลื่นให้แคบลง การกระจายเลขคลื่นและโมเมนตัมจะกว้างขึ้น</p><span class="formula">Δx · Δp ≥ ℏ / 2</span><span class="formula">Δk = 1 / (2Δx)</span><span class="formula">Δp = ℏΔk</span><p>แบบจำลองใช้กลุ่มคลื่น Gaussian ที่มีค่าเบี่ยงเบนมาตรฐาน Δx = σₓ จึงได้ค่าเท่ากันพอดี ΔxΔp = ℏ/2 และใช้ความสัมพันธ์แบบอนุภาคอิสระ E = p²/(2m) เพื่ออธิบายความเร็วกลุ่ม</p>',task:'ปรับ Δx จาก 4 nm เป็น 0.5 nm แล้วเปรียบเทียบ Δp และรูปคลื่น ตรวจสอบผลคูณ ΔxΔp / ℏ ว่ายังคงเป็น 0.5'}
};
const $=s=>document.querySelector(s), fmt=(v,n=3)=>Number.isFinite(v)?Number(v).toPrecision(n):'—';
function restEnergy(m){return m*C*C/E;}function momentum(m,K){const k=K*E;return Math.sqrt(k*(k+2*m*C*C))/C;}
function mass(){return {electron:ME,proton:MP,neutron:MN}[state.particle];}
function wavelength(m,K){return H/momentum(m,K);}
function diffractionPhi(V,d){const l=wavelength(ME,V)*1e9;if(l>2*d)return null;return 180-2*Math.asin(l/(2*d))*180/Math.PI;}
function intensity(phi){const l=wavelength(ME,state.dv)*1e9;const bragg=2*state.d*Math.cos(phi*Math.PI/360);return 0.07+0.93*Math.exp(-0.5*((bragg-l)/0.010)**2);}
const chart=$('#chart');let lastPlot=[];
function controls(){const m=modules[state.module];$('#moduleTitle').textContent=m.title;$('#moduleDesc').textContent=m.desc;$('#sceneLabel').textContent=m.label;$('#graphTitle').textContent=m.graph;$('#graphHint').textContent=m.hint;$('#theory').innerHTML=m.theory;$('#task').textContent=m.task;$('#controls').innerHTML=m.fields.map(f=>`<div class="field"><label for="${f.key}"><span>${f.label}</span><output id="v_${f.key}"></output></label>${f.type==='select'?`<select id="${f.key}">${f.options.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select>`:`<input id="${f.key}" type="range" min="${f.min}" max="${f.max}" step="${f.step}"><div class="minmax"><span>${f.min}${f.unit}</span><span>${f.max}${f.unit}</span></div>`}</div>`).join('');for(const f of m.fields){const el=$('#'+f.key);el.value=state[f.key];el.addEventListener('input',()=>{state[f.key]=f.type==='select'?el.value:+el.value;refresh();});}refresh();}
function metrics(items){$('#metrics').innerHTML=items.map(([k,v])=>`<div class="metric"><small>${k}</small><b>${v}</b></div>`).join('');}
function refresh(){for(const f of modules[state.module].fields){const out=$('#v_'+f.key);if(out)out.textContent=f.type==='select'?({electron:'อิเล็กตรอน',proton:'โปรตอน',neutron:'นิวตรอน'}[state[f.key]]):`${state[f.key]}${f.unit}`;}
if(state.module==='debroglie'){const m=mass(),l=wavelength(m,state.voltage);metrics([['ความยาวคลื่น λ',fmt(l*1e9,5)+' nm'],['โมเมนตัม p',fmt(momentum(m,state.voltage))+' kg·m/s'],['พลังงานจลน์ K',fmt(state.voltage)+' eV']]);}
else if(state.module==='davisson'){const l=wavelength(ME,state.dv)*1e9;const peak=diffractionPhi(state.dv,state.d);metrics([['λ เดอบรอยล์',fmt(l,5)+' nm'],['มุมยอดเลี้ยวเบน φ',peak===null?'ไม่มีอันดับหนึ่ง':fmt(peak,4)+'°'],['ความเข้มที่ตรวจวัด',fmt(intensity(state.angle)*100,4)+' %']]);}
else{const sx=state.sigma*1e-9,sp=HB/(2*sx),k=2*Math.PI/(state.wavelength*1e-9);metrics([['Δp',fmt(sp)+' kg·m/s'],['ΔxΔp / ℏ',fmt(sx*sp/HB,4)],['เลขคลื่น k₀',fmt(k,4)+' rad/m']]);}drawGraph();updateScene();}
function plotData(){const n=360,data=[];if(state.module==='debroglie'){for(let i=0;i<=n;i++){let x=-6+12*i/n;data.push([x,Math.sin(2*Math.PI*x/Math.max(.25,wavelength(mass(),state.voltage)*1e9)*1.1-state.t*3)]);}}else if(state.module==='davisson'){for(let i=0;i<=n;i++){const x=20+140*i/n;data.push([x,intensity(x)]);}}else{for(let i=0;i<=n;i++){const x=-14+28*i/n,s=state.sigma,w=state.wavelength;data.push([x,Math.exp(-x*x/(4*s*s))*Math.cos(2*Math.PI*x/w-state.t*2)]);}}return data;}
function drawGraph(){
 const ctx=chart.getContext('2d'),w=chart.clientWidth,h=chart.clientHeight;if(!w||!h)return;
 const ratio=Math.min(devicePixelRatio||1,2);chart.width=Math.round(w*ratio);chart.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,w,h);
 const left=66,right=22,top=36,bottom=48,pw=w-left-right,ph=h-top-bottom,arr=plotData();lastPlot=arr;
 const [xmin,xmax]=[arr[0][0],arr.at(-1)[0]],ymin=state.module==='davisson'?0:-1.1,ymax=1.1;
 const px=x=>left+(x-xmin)/(xmax-xmin)*pw,py=y=>top+(ymax-y)/(ymax-ymin)*ph;
 ctx.strokeStyle='#27435b';ctx.lineWidth=1;ctx.fillStyle='#9eb6cc';ctx.font='10.5px ui-monospace,monospace';
 for(let i=0;i<=5;i++){const x=left+pw*i/5;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,h-bottom);ctx.stroke();ctx.textAlign='center';ctx.fillText((xmin+(xmax-xmin)*i/5).toFixed(state.module==='davisson'?0:1),x,h-bottom+15);}
 for(let i=0;i<=4;i++){const y=top+ph*i/4;ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(w-right,y);ctx.stroke();ctx.textAlign='right';ctx.fillText((ymax-(ymax-ymin)*i/4).toFixed(1),left-8,y+4);}
 ctx.strokeStyle='#6392b8';ctx.fillStyle='#6392b8';ctx.lineWidth=1.6;
 ctx.beginPath();ctx.moveTo(left,h-bottom);ctx.lineTo(left,top-6);ctx.moveTo(left,h-bottom);ctx.lineTo(w-right+6,h-bottom);ctx.stroke();
 ctx.beginPath();ctx.moveTo(left,top-9);ctx.lineTo(left-4,top-1);ctx.lineTo(left+4,top-1);ctx.closePath();ctx.fill();
 ctx.beginPath();ctx.moveTo(w-right+9,h-bottom);ctx.lineTo(w-right+1,h-bottom-4);ctx.lineTo(w-right+1,h-bottom+4);ctx.closePath();ctx.fill();
 ctx.strokeStyle='#68e8f3';ctx.lineWidth=2.4;ctx.beginPath();arr.forEach(([x,y],i)=>i?ctx.lineTo(px(x),py(y)):ctx.moveTo(px(x),py(y)));ctx.stroke();
 if(state.module==='davisson'){const x=state.angle;ctx.strokeStyle='#ffbd73';ctx.setLineDash([5,4]);ctx.beginPath();ctx.moveTo(px(x),top);ctx.lineTo(px(x),h-bottom);ctx.stroke();ctx.setLineDash([]);}
 let xLabel='แกน X: ตำแหน่งสัมพัทธ์ x (nm)',yLabel='แกน Y: แอมพลิจูด Re(ψ)',eqText=`สมการ: ψ(x,t) = sin(2πx/λ − ωt)  |  λ = h/p = ${fmt(wavelength(mass(),state.voltage)*1e9,4)} nm`;
 if(state.module==='davisson'){xLabel='แกน X: มุมตรวจวัด / มุมกระเจิง φ (องศา °)';yLabel='แกน Y: ความเข้มสัมพัทธ์ I(φ)';eqText=`สมการ: nλ = 2d cos(φ/2)  |  λ ≈ 1.226/√V = ${fmt(wavelength(ME,state.dv)*1e9,4)} nm`;}
 else if(state.module==='uncertainty'){xLabel='แกน X: ตำแหน่ง x (nm)';yLabel='แกน Y: กลุ่มคลื่น ψ(x,t)';eqText=`สมการ: ψ = exp(−x²/4Δx²) cos(2πx/λ₀ − ωt)  |  Δx·Δp = ℏ/2`;}
 ctx.fillStyle='#bfe8ff';ctx.font='600 11px "Noto Sans Thai",system-ui,sans-serif';ctx.textAlign='center';ctx.fillText(xLabel,left+pw/2,h-8);
 ctx.save();ctx.translate(15,top+ph/2);ctx.rotate(-Math.PI/2);ctx.fillText(yLabel,0,0);ctx.restore();
 ctx.font='600 11px ui-monospace,"Noto Sans Thai",monospace';
 const bw=Math.min(w-left-10,ctx.measureText(eqText).width+20),bx=Math.max(left,left+(pw-bw)/2);
 ctx.fillStyle='rgba(8,24,42,0.88)';ctx.strokeStyle='#347094';ctx.lineWidth=1;
 ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,5,bw,22,5):ctx.rect(bx,5,bw,22);ctx.fill();ctx.stroke();
 ctx.fillStyle='#78f2cf';ctx.textAlign='center';ctx.fillText(eqText,bx+bw/2,20);ctx.textAlign='left';
}
const initial={debroglie:{voltage:150,particle:'electron'},davisson:{dv:54,angle:50,d:.091},uncertainty:{sigma:1.7,wavelength:1.2}};
document.querySelectorAll('[data-module]').forEach(b=>b.addEventListener('click',()=>{state.module=b.dataset.module;state.t=0;document.querySelectorAll('[data-module]').forEach(e=>e.classList.toggle('active',e===b));controls();}));$('#play').addEventListener('click',()=>{state.playing=!state.playing;$('#play').textContent=state.playing?'⏸ หยุดเวลา':'▶ เล่นต่อ';});$('#reset').addEventListener('click',()=>{Object.assign(state,initial[state.module]);state.t=0;controls();});$('#export').addEventListener('click',()=>{const rows=[`# Modern Physics 2027 / ${state.module}`,`# parameters: ${JSON.stringify(Object.fromEntries(modules[state.module].fields.map(f=>[f.key,state[f.key]])))}`,'x,y',...lastPlot.map(row=>row.map(v=>v.toPrecision(9)).join(','))];const blob=new Blob([rows.join('\n')],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`wave_particle_${state.module}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
// WebGL 3D engine: imported only if the browser can reach the CDN.
let THREE,scene,camera,renderer,group,controls3d,dynamic=[],particleMeshes=[],detector;
function setupPbrStudio(rend,sc){
 const pmrem=new THREE.PMREMGenerator(rend),env=new THREE.Scene();
 env.background=new THREE.Color(0x091625);
 const addCard=(c,x,y,z,sx,sy,sz)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),new THREE.MeshBasicMaterial({color:c}));m.position.set(x,y,z);env.add(m);};
 addCard(0xdbf3ff,-7,9,6,8,5,.4);addCard(0xfff1d6,8,6,-5,6,5,.4);addCard(0x38bdf8,0,12,0,10,.4,10);
 sc.environment=pmrem.fromScene(env,.04).texture;pmrem.dispose();
}
async function init3d(){try{THREE=await import('three');const {OrbitControls}=await import('three/addons/controls/OrbitControls.js');const host=$('#scene');scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x07131f,.015);camera=new THREE.PerspectiveCamera(46,1,.1,1000);camera.position.set(15,10.5,20);renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);setupPbrStudio(renderer,scene);controls3d=new OrbitControls(camera,renderer.domElement);controls3d.enableDamping=true;controls3d.minDistance=7;controls3d.maxDistance=48;scene.add(new THREE.HemisphereLight(0xbce3ff,0x14263a,1.7));const key=new THREE.DirectionalLight(0xf1f7ff,2.4);key.position.set(6,13,9);key.castShadow=true;scene.add(key);const light=new THREE.PointLight(0x78ebff,65,45);light.position.set(-4,8,8);scene.add(light);group=new THREE.Group();scene.add(group);const grid=new THREE.GridHelper(27,24,0x2b5970,0x153348);grid.position.y=-4.2;scene.add(grid);function resize(){const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}new ResizeObserver(resize).observe(host);buildScene();function render(){requestAnimationFrame(render);if(state.playing){state.t+=.016; if(Math.floor(state.t*60)%3===0)drawGraph();}animateScene();controls3d.update();renderer.render(scene,camera);}render();}catch(err){console.warn('3D unavailable',err);$('#fallback').hidden=false;$('#fallback').style.display='grid';}}
function mat(color,opacity=1,metal=.45,rough=.28,emissiveInt=.18){return new THREE.MeshPhysicalMaterial({color,roughness:rough,metalness:metal,clearcoat:.35,clearcoatRoughness:.2,transparent:opacity<1,opacity,emissive:color,emissiveIntensity:emissiveInt});}
function sphere(x,y,z,r,color,metal=.3,rough=.28){const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,14),mat(color,1,metal,rough,.22));m.position.set(x,y,z);m.castShadow=true;group.add(m);return m;}
function boxMesh(x,y,z,sx,sy,sz,color,metal=.7,rough=.32,em=.04){const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat(color,1,metal,rough,em));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;}
function cylMesh(x,y,z,r1,r2,len,color,rx=0,rz=0,metal=.75,rough=.28,op=1){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,len,30,1,op<1),mat(color,op,metal,rough,op<1?.06:.05));m.position.set(x,y,z);m.rotation.set(rx,0,rz);m.castShadow=true;group.add(m);return m;}
function line(points,color,opacity=1){const geo=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));const m=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:opacity<1,opacity}));group.add(m);return m;}
function addOpticalBench(w=21,d=9){
 boxMesh(0,-3.9,0,w,.45,d,0x16293d,.65,.42,.02);
 boxMesh(0,-3.62,0,w-.6,.16,1.6,0x2d4a66,.82,.26,.04);
 for(let x=-Math.floor(w/2)+2;x<=Math.floor(w/2)-2;x+=3){boxMesh(x,-4.15,-d/2+.6,.7,.35,.7,0x0c1522,.4,.7,0);boxMesh(x,-4.15,d/2-.6,.7,.35,.7,0x0c1522,.4,.7,0);}
}
function clear(){if(!group)return;while(group.children.length){const obj=group.children[0];group.remove(obj);obj.traverse(o=>{o.geometry?.dispose();if(o.material){const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});}particleMeshes=[];dynamic=[];detector=null;}
function addLab3dLabels(){
 if(!window.MP27Labels||!group)return;
 const addL=(t,x,y,z,c)=>group.add(window.MP27Labels.makeSprite(THREE,t,x,y,z,c));
 if(state.module==='debroglie'){
  addL('ปืนอิเล็กตรอน (Cathode)',-7.6,2.4,0,'#fbbf24');
  addL('หลอดสุญญากาศ (Vacuum Tube)',0,2.5,0,'#38bdf8');
  addL('จอเรืองแสง (Phosphor Screen)',8.05,2.4,0,'#34d399');
 }else if(state.module==='davisson'){
  addL('ปืนยิง e⁻ (Electron Gun)',-6.4,4.8,0,'#fbbf24');
  addL('ผลึกนิกเกิล (Ni Crystal)',0,1.6,0,'#38bdf8');
  addL('หัววัดฟาราเดย์ (Detector θ)',5.0,5.2,0,'#34d399');
 }else{
  addL('คลื่นแพ็กเก็ต (Wave Packet)',0,2.2,0,'#38bdf8');
 }
}
window.addEventListener('mp27:labels',()=>{if(group&&window.MP27Labels)window.MP27Labels.applyToRoot(group);});
function buildScene(){if(!group)return;clear();addOpticalBench(22,8.5);addLab3dLabels();if(state.module==='debroglie'){
 const glass=new THREE.Mesh(new THREE.CylinderGeometry(1.75,1.75,16.4,36,1,true),new THREE.MeshPhysicalMaterial({color:0x93d9ff,roughness:.08,metalness:.05,transmission:.55,transparent:true,opacity:.24,side:THREE.DoubleSide}));glass.rotation.z=Math.PI/2;group.add(glass);
 cylMesh(-8.3,0,0,1.82,1.82,.65,0x47617a,0,Math.PI/2,.85,.25);cylMesh(8.3,0,0,1.82,1.82,.65,0x47617a,0,Math.PI/2,.85,.25);
 boxMesh(-8.1,-1.85,0,1.4,3.4,1.6,0x2c4257,.78,.32);boxMesh(8.1,-1.85,0,1.4,3.4,1.6,0x2c4257,.78,.32);
 cylMesh(-7.6,0,0,.62,.75,1.3,0xd97706,0,Math.PI/2,.88,.22,.15);
 cylMesh(8.05,0,0,1.4,1.4,.22,0x22d3ee,0,Math.PI/2,.3,.4,.35);
 for(let i=0;i<85;i++){const x=-7.4+14.8*i/84;const m=sphere(x,0,0,.065,0x83f6ff,.1,.2);particleMeshes.push(m);}
 sphere(-7.2,0,0,.42,0xffc780,.2,.2);sphere(7.8,0,0,.44,0x87baff,.2,.2);
}else if(state.module==='davisson'){
 cylMesh(0,-2.0,0,1.8,2.1,3.2,0x22384f,.0,0,.8,.3);
 cylMesh(0,-.35,0,2.25,2.25,.28,0xd99b26,0,0,.88,.24);
 for(let x=-4;x<=4;x++){for(let z=-4;z<=4;z++){const y=.22+.12*Math.sin(x*1.8+z);sphere(x*.58,y,z*.58,.15,0xc4dcff,.85,.18);}}
 const arc=new THREE.Mesh(new THREE.TorusGeometry(7,.1,16,64,Math.PI),mat(0x64748b,1,.85,.28,.05));arc.position.set(0,2,0);group.add(arc);
 cylMesh(-6.2,3.1,0,.45,.62,2.4,0x334155,0,Math.PI*.35,.82,.28);
 sphere(-7.2,3.7,0,.48,0xffbf7c,.4,.2);
 for(let i=0;i<20;i++){let m=sphere(-7.2+i*.35,3.7-i*.18,0,.085,0x7dedff);particleMeshes.push(m);}
 detector=cylMesh(5,4,0,.55,.55,1.1,0x10b981,0,0,.7,.28,.35);
 line([[-7.2,3.7,0],[0,.2,0]],0x58d9ff,.75);
}else{
 for(let i=-10;i<=10;i+=2){boxMesh(i,-3.2,0,.18,.9,1.2,0x475569,.8,.3);line([[i,-.18,-.55],[i,.18,.55]],0x34536f,.5);}
 for(let i=0;i<180;i++){const m=sphere(-11+22*i/179,0,0,.045,0x86e7ff,.15,.2);particleMeshes.push(m);}
 line([[-11,0,0],[11,0,0]],0x426581,.55);
}updateScene();}
function updateScene(){if(!group)return;if(state.module==='davisson'&&detector){const rad=state.angle*Math.PI/180;detector.position.set(7*Math.cos(rad),2+7*Math.sin(rad),0);detector.scale.setScalar(.6+intensity(state.angle)*.6);}}
function animateScene(){if(!group)return;const t=state.t;if(state.module==='debroglie'){let lambda=wavelength(mass(),state.voltage)*1e9;const cycles=Math.max(2,Math.min(22,12/lambda));particleMeshes.forEach((m,i)=>{let x=-8+16*i/(particleMeshes.length-1),phase=2*Math.PI*cycles*(i/(particleMeshes.length-1))-t*3;m.position.set(x,1.4*Math.sin(phase),1.4*Math.cos(phase));});}
else if(state.module==='davisson'){particleMeshes.forEach((m,i)=>{const a=((i/20+t*.16)%1);m.position.set(-8+8*a,4-4*a,0);});if(detector){const s=.5+intensity(state.angle)*.7;detector.scale.setScalar(s);}}
else{const s=state.sigma;particleMeshes.forEach((m,i)=>{const x=-11+22*i/(particleMeshes.length-1),env=Math.exp(-x*x/(4*s*s)),y=2.8*env*Math.cos(2*Math.PI*x/state.wavelength-t*2);m.position.y=y;m.position.z=.5*env*Math.sin(2*Math.PI*x/state.wavelength-t*2);m.scale.setScalar(.45+env*.8);});}}
controls();init3d();window.addEventListener('resize',drawGraph);
