import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

// Physical calculations always use SI unless explicitly documented otherwise.
const h=6.62607015e-34, c=299792458, kB=1.380649e-23, e=1.602176634e-19;
const me=9.1093837139e-31, meC2=me*c*c/e/1e3, lambdaC=h/(me*c)*1e12;
const hc_eVnm=h*c/e*1e9, bWien=2.897771955e-3;
const MODULES=[
{key:'blackbody',short:'รังสีวัตถุดำ',en:'BLACKBODY RADIATION',title:'การแผ่รังสีวัตถุดำและสมมติฐานของพลังค์',subtitle:'ทดลองกับเตาวัตถุดำเสมือน • ปรับอุณหภูมิและตรวจสอบสเปกตรัมต่อเนื่องจากกฎของพลังค์',controls:[['T','อุณหภูมิวัตถุ','range',1000,12000,100,5800,'K'],['wl','ความยาวคลื่นที่ตรวจวัด','range',100,2500,10,500,'nm']],challenge:'ปรับอุณหภูมิเป็น 3,000 K และ 6,000 K เปรียบเทียบตำแหน่งยอดสเปกตรัม แล้วตรวจสอบกฎการกระจัดของวีน λmaxT = b'},
{key:'photoelectric',short:'โฟโตอิเล็กทริก',en:'PHOTOELECTRIC EFFECT',title:'ปรากฏการณ์โฟโตอิเล็กทริก',subtitle:'แหล่งกำเนิดแสงฉายบนแผ่นโลหะและอิเล็กโทรมิเตอร์ • ทดลองความถี่ ความเข้มและศักย์หยุดยั้ง',controls:[['wl','ความยาวคลื่นแสง','range',150,900,5,350,'nm'],['intensity','ความเข้มสัมพัทธ์','range',1,100,1,65,'%'],['metal','ผิวโลหะ','select',[['Na','โซเดียม (2.28 eV)'],['K','โพแทสเซียม (2.30 eV)'],['Zn','สังกะสี (4.30 eV)'],['Cu','ทองแดง (4.70 eV)']],'Na'],['voltage','ศักย์ต้าน (anode − cathode)','range',-4,2,0.1,0,'V']],challenge:'เลือกโซเดียม ค่อย ๆ เพิ่มความยาวคลื่นจนกระทั่งอิเล็กตรอนหยุดหลุดออกมา แล้วเปรียบเทียบผลของความเข้มแสงที่ความถี่เดิม'},
{key:'xray',short:'การผลิตรังสีเอกซ์',en:'X-RAY TUBE',title:'การผลิตรังสีเอกซ์และสเปกตรัมรังสีเอกซ์',subtitle:'จำลองหลอดคูลิดจ์ • อิเล็กตรอนชนเป้าโลหะ เกิด Bremsstrahlung และเส้นลักษณะเฉพาะ',controls:[['V','แรงดันเร่ง','range',10,120,1,50,'kV'],['current','กระแสหลอด','range',1,20,1,8,'mA'],['target','โลหะเป้า','select',[['Cu','ทองแดง Cu'],['Mo','โมลิบดีนัม Mo'],['W','ทังสเตน W']],'Cu']],challenge:'เปลี่ยนแรงดันจาก 30 เป็น 60 kV สังเกตความยาวคลื่นต่ำสุด จากนั้นเปลี่ยนโลหะเป้าและเปรียบเทียบตำแหน่งเส้นรังสีเอกซ์ลักษณะเฉพาะ'},
{key:'compton',short:'ปรากฏการณ์คอมพ์ตัน',en:'COMPTON SCATTERING',title:'ปรากฏการณ์คอมพ์ตัน',subtitle:'ชนโฟตอนกับอิเล็กตรอนอิสระที่เริ่มต้นหยุดนิ่ง • วัดมุมกระเจิงและพลังงานที่ถ่ายโอน',controls:[['E','พลังงานโฟตอนตกกระทบ','range',50,2000,10,662,'keV'],['theta','มุมกระเจิงโฟตอน','range',0,180,1,75,'°']],challenge:'เปลี่ยนมุมกระเจิงเป็น 0°, 90° และ 180° บันทึกการเปลี่ยนความยาวคลื่น Δλ และอธิบายเหตุใดค่า Δλ ไม่ขึ้นกับพลังงานเริ่มต้น'},
{key:'pair',short:'ผลิตคู่และประลัยคู่',en:'PAIR PRODUCTION / ANNIHILATION',title:'การผลิตคู่อนุภาคและการประลัยคู่',subtitle:'โฟตอนพลังงานสูงใกล้นิวเคลียสเปลี่ยนเป็น e⁻ และ e⁺ • สังเกตโฟตอน 511 keV ในการประลัยคู่ขณะหยุดนิ่ง',controls:[['E','พลังงานโฟตอนต้นทาง','range',0.5,5,0.01,1.5,'MeV'],['mode','โหมดกระบวนการ','select',[['creation','Pair production'],['annihilation','Annihilation at rest']],'creation']],challenge:'ปรับ Eγ ต่ำกว่าและสูงกว่า 1.022 MeV แล้วอธิบายเงื่อนไขการเกิดคู่อนุภาคและบทบาทของนิวเคลียสในการอนุรักษ์โมเมนตัม'}
];
const workFunctions={Na:2.28,K:2.30,Zn:4.30,Cu:4.70};
const targets={Cu:{ka:8.048,kb:8.905,edge:8.979},Mo:{ka:17.48,kb:19.61,edge:20.00},W:{ka:59.32,kb:67.24,edge:69.53}}; // Approximate K-line energies/edges in keV.
let current=0,state={},playing=true,clockT=0,log=[],scene,renderer,camera,root,particles=[],dynamicMeshes=[],plotData=[],sceneText=[],labelsVisible=true,labelScale=1.0,orbit={x:-0.24,y:0.43,dist:13};
const $=id=>document.getElementById(id);const fmt=(x,d=3)=>Number.isFinite(x)?Number(x).toLocaleString('en-US',{maximumFractionDigits:d}):'—';
const photonEnergy=wl=>hc_eVnm/wl;
const planck=(wl_nm,T)=>{const lam=wl_nm*1e-9,xx=h*c/(lam*kB*T);return xx>700?0:(2*h*c*c)/(lam**5*Math.expm1(xx));};
function paramsFor(m){const o={};for(const control of m.controls)o[control[0]]=control[2]==='range'?control[6]:control[4];return o;}
function setModule(i){current=i;state=paramsFor(MODULES[i]);log=[];clockT=0;buildTabs();buildControls();$('eyebrow').textContent=`EXPERIMENT 0${i+1} / 05 · ${MODULES[i].en}`;$('title').textContent=MODULES[i].title;$('subtitle').textContent=MODULES[i].subtitle;$('challenge').textContent=MODULES[i].challenge;$('sceneTag').textContent=MODULES[i].en;$('clock').textContent='LAB RUNNING';buildScene();update();renderLog();}
function buildTabs(){$('tabs').innerHTML=MODULES.map((m,i)=>`<button type="button" class="tab ${i===current?'active':''}" data-i="${i}"><span class="index">0${i+1}</span><span><strong>${m.short}</strong><small>${m.en}</small></span></button>`).join('');$('tabs').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>setModule(Number(b.dataset.i))));}
function buildControls(){$('controls').innerHTML=MODULES[current].controls.map(a=>a[2]==='range'?`<div class="control"><div class="head"><label for="ctrl-${a[0]}">${a[1]}</label><strong id="val-${a[0]}" class="readout"></strong></div><input id="ctrl-${a[0]}" data-key="${a[0]}" type="range" min="${a[3]}" max="${a[4]}" step="${a[5]}" value="${state[a[0]]}"><div class="rangebounds"><span>${a[3]} ${a[7]}</span><span>${a[4]} ${a[7]}</span></div></div>`:`<div class="control"><div class="head"><label for="ctrl-${a[0]}">${a[1]}</label></div><select id="ctrl-${a[0]}" data-key="${a[0]}">${a[3].map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('')}</select></div>`).join('');
$('controls').querySelectorAll('input,select').forEach(el=>{el.value=state[el.dataset.key];el.addEventListener('input',()=>{state[el.dataset.key]=el.tagName==='SELECT'?el.value:Number(el.value);update();});});}
function refreshControlLabels(){for(const a of MODULES[current].controls)if(a[2]==='range')$('val-'+a[0]).textContent=`${fmt(state[a[0]],a[5]<1?2:0)} ${a[7]}`;}
function metrics(entries){$('metrics').innerHTML=entries.map(([l,v])=>`<div class="measurement"><span>${l}</span><strong>${v}</strong></div>`).join('');}
function explain(eq,ex){$('equations').innerHTML=eq.map(x=>`<div class="equation">${x}</div>`).join('');$('explanation').textContent=ex;}
function update(){refreshControlLabels();let data=[],result=[],equations=[],description='',plotTitle='',plotNote='';let axes={x:'',y:''},columns=[],row=[];const s=state;
if(current===0){const peak=bWien/s.T*1e9,rad=planck(s.wl,s.T),sigma=5.670374419e-8*s.T**4,E=photonEnergy(s.wl);result=[['อุณหภูมิวัตถุ',`${fmt(s.T,0)} K`],['ความยาวคลื่นยอด (λmax)',`${fmt(peak,1)} nm`],['พลังงานโฟตอนที่เลือก',`${fmt(E,3)} eV`],['Spectral radiance (Bλ)',`${rad.toExponential(3)} W·sr⁻¹·m⁻³`],['Radiant exitance รวม',`${sigma.toExponential(3)} W/m²`]];equations=['E = hf = hc/λ','Bλ(T) = (2hc²/λ⁵) / [exp(hc/λkT) − 1]','λmax T = 2.89777 × 10⁻³ m·K'];description='เส้นกราฟใช้กฎของพลังค์ในรูป spectral radiance ต่อหน่วยความยาวคลื่น (SI) โดยสีของวัตถุ 3D แทนสีเชิงการมองเห็นโดยประมาณ ไม่ใช่ผลการบูรณาการสีที่แม่นยำ';plotTitle='Blackbody spectral radiance';plotNote=`เส้นสเปกตรัมสำหรับ T = ${s.T} K • เส้นประเป็นตำแหน่ง λmax ≈ ${fmt(peak,1)} nm`;axes={x:'Wavelength (nm)',y:'Relative Bλ'};let max=0;for(let wl=100;wl<=2500;wl+=10){let v=planck(wl,s.T);max=Math.max(max,v);data.push({x:wl,y:v});}data=data.map(x=>({x:x.x,y:x.y/max}));columns=['T (K)','λ (nm)','λmax (nm)','Eγ (eV)','Bλ (W sr-1 m-3)'];row=[s.T,s.wl,peak,E,rad];}
if(current===1){const phi=workFunctions[s.metal],E=photonEnergy(s.wl),K=Math.max(0,E-phi),f=c/(s.wl*1e-9),threshold=hc_eVnm/phi;const emits=E>phi;const available=emits && s.voltage>-(E-phi);const currentNanoA=available?s.intensity*0.12:0;result=[['Photon energy',`${fmt(E,3)} eV`],['Work function (φ)',`${fmt(phi,2)} eV`],['Threshold wavelength',`${fmt(threshold,1)} nm`],['Kmax',`${fmt(K,3)} eV`],['Stopping potential',`${fmt(K,3)} V`],['Detected current (idealized)',`${fmt(currentNanoA,2)} nA`]];equations=['hf = φ + Kmax','Kmax = max(0, hf − φ)','eVstop = Kmax'];description='กระแสในแบบจำลองเป็นค่าเชิงคุณภาพที่ปรับตามความเข้ม และมีจุดตัดแบบอุดมคติเมื่อแรงดันต้านหยุดอิเล็กตรอนทั้งหมด ไม่ใช่ลักษณะ I–V จากหลอดจริง';plotTitle='Maximum kinetic energy vs frequency';plotNote=`เส้นแรงงาน φ = ${phi} eV • ความถี่ขีดเริ่ม f₀ = ${(phi*e/h/1e14).toFixed(2)} ×10¹⁴ Hz`;axes={x:'Frequency (×10¹⁴ Hz)',y:'Kmax (eV)'};for(let ff=2;ff<=22;ff+=.2)data.push({x:ff,y:Math.max(0,h*(ff*1e14)/e-phi)});columns=['Metal','λ (nm)','Intensity (%)','V (V)','Eγ (eV)','Kmax (eV)','Current (nA)'];row=[s.metal,s.wl,s.intensity,s.voltage,E,K,currentNanoA];}
if(current===2){const minWL=1.239841984/s.V;const tg=targets[s.target];let maxY=0;const lines=[tg.ka,tg.kb].filter(energy=>s.V>tg.edge).map(energy=>({wl:1.239841984/energy,energy}));for(let wl=.008;wl<=.25;wl+=.0006){let base=wl<minWL?0:Math.max(0,(wl-minWL)/Math.pow(wl,2))*s.current;let peaks=0;for(const l of lines)peaks+=base===0?0:0.9*s.current*Math.exp(-.5*((wl-l.wl)/.0028)**2);const y=base+peaks;data.push({x:wl,y});maxY=Math.max(maxY,y);}data=data.map(pt=>({x:pt.x,y:pt.y/Math.max(1,maxY)}));result=[['Electron impact energy',`${fmt(s.V,0)} keV`],['Cutoff wavelength',`${fmt(minWL,4)} nm`],['Tube current',`${fmt(s.current,0)} mA`],['Kα characteristic line',`${fmt(tg.ka,2)} keV`],['Kβ characteristic line',`${fmt(tg.kb,2)} keV`],['K-line excitation',s.V>tg.edge?'YES':'NO']];equations=['Emax = eV','λmin = hc/(eV)','Bremsstrahlung + characteristic lines'];description='กราฟต่อเนื่องเป็นรูปแบบเชิงคุณภาพสำหรับ Bremsstrahlung และยอด Kα/Kβ เป็นการประมาณด้วยฟังก์ชัน Gaussian; ตำแหน่งเส้นใช้ค่าพลังงานเป้าหมายโดยประมาณ การเกิดเส้น K ต้องมีพลังงานเกิน K-edge';plotTitle='X-ray spectrum (illustrative relative intensity)';plotNote=`Duane–Hunt cutoff: ${fmt(minWL,4)} nm • เส้นลักษณะเฉพาะแสดงเมื่อ V > K-edge (${tg.edge} kV)`;axes={x:'Wavelength (nm)',y:'Relative intensity'};columns=['Target','V (kV)','Current (mA)','λmin (nm)','Kα (keV)','K-edge (keV)'];row=[s.target,s.V,s.current,minWL,tg.ka,tg.edge];}
if(current===3){const theta=s.theta*Math.PI/180,Eprime=s.E/(1+(s.E/meC2)*(1-Math.cos(theta))),delWL=lambdaC*(1-Math.cos(theta)),Ki=s.E-Eprime,initialWL=1.239841984/s.E;result=[['Incident photon energy',`${fmt(s.E,1)} keV`],['Scattered photon energy',`${fmt(Eprime,2)} keV`],['Wavelength shift (Δλ)',`${fmt(delWL,4)} pm`],['Electron kinetic energy',`${fmt(Ki,2)} keV`],['Initial wavelength',`${fmt(initialWL,5)} nm`],['Compton wavelength (e⁻)',`${fmt(lambdaC,5)} pm`]];equations=['Δλ = (h/mₑc)(1 − cos θ)','E′ = E/[1 + (E/mₑc²)(1 − cos θ)]','Kₑ = E − E′'];description='อิเล็กตรอนตั้งต้นอยู่หยุดนิ่ง ถือเป็นอิสระ การกระเจิงคำนวณโดยอนุรักษ์พลังงานและโมเมนตัมแบบสัมพัทธภาพ; 3D ไม่แสดงสเกลจริงของโมเมนตัม';plotTitle='Scattered photon energy vs angle';plotNote=`Eγ = ${s.E} keV • จุดสีส้มคือตำแหน่งมุม ${s.theta}°`;axes={x:'Scattering angle (°)',y:'E′ (keV)'};for(let theta=0;theta<=180;theta+=2)data.push({x:theta,y:s.E/(1+(s.E/meC2)*(1-Math.cos(theta*Math.PI/180)))});columns=['E (keV)','θ (deg)','E′ (keV)','Δλ (pm)','Kₑ (keV)'];row=[s.E,s.theta,Eprime,delWL,Ki];}
if(current===4){const threshold=2*meC2/1000,excess=Math.max(0,s.E-threshold),valid=s.E>=threshold;result=s.mode==='creation'?[['Incident photon',`${fmt(s.E,3)} MeV`],['Pair threshold',`${fmt(threshold,6)} MeV`],['Rest energy of e⁺ + e⁻',`${fmt(threshold,6)} MeV`],['Excess energy (upper bound)',`${fmt(excess,4)} MeV`],['Energy condition',valid?'ABOVE THRESHOLD':'BELOW THRESHOLD'],['Recoil nucleus','Momentum conservation']]:[['Electron rest energy',`${fmt(meC2,3)} keV`],['Positron rest energy',`${fmt(meC2,3)} keV`],['Total photon energy',`${fmt(threshold,6)} MeV`],['Photon 1',`${fmt(meC2,3)} keV`],['Photon 2',`${fmt(meC2,3)} keV`],['Emission angle','180° (at rest)']];equations=s.mode==='creation'?['γ + nucleus → e⁻ + e⁺ + nucleus','Eγ ≥ 2mₑc² ≈ 1.022 MeV','Eγ = 2mₑc² + Kₑ₋ + Kₑ₊ + Erec']:['e⁻ + e⁺ → γ₁ + γ₂','Eγ₁ = Eγ₂ = mₑc² ≈ 511 keV','pγ₁ + pγ₂ = 0 (CM at rest)'];description=s.mode==='creation'?'การผลิตคู่ใกล้นิวเคลียสต้องมีแรงถอยกลับของนิวเคลียสเพื่ออนุรักษ์โมเมนตัม พลังงานจลน์รวมจริงต่ำกว่าพลังงานส่วนเกินหากนิวเคลียสมีพลังงานถอยกลับ; เกณฑ์ 1.022 MeV เป็นขีดจำกัดเมื่อนิวเคลียสหนักมาก':'การประลัยคู่อิเล็กตรอน–โพซิตรอนที่จุดศูนย์กลางมวลหยุดนิ่งให้โฟตอนสองตัวพลังงานเท่ากัน 511 keV และเคลื่อนที่ตรงข้ามกัน';plotTitle='Energy accounting: pair creation threshold';plotNote='แถบสีส้มแสดงพลังงานมวลนิ่งขั้นต่ำ 1.022 MeV; ส่วนที่เกินเป็นพลังงานจลน์รวมและพลังงานถอยกลับ';axes={x:'Incident energy (MeV)',y:'Energy (MeV)'};for(let E=.5;E<=5.001;E+=.05)data.push({x:E,y:Math.max(0,E-threshold)});columns=['Mode','Input E (MeV)','Threshold (MeV)','Excess upper bound (MeV)'];row=[s.mode,s.E,threshold,excess];}
metrics(result);explain(equations,description);$('plotTitle').textContent=plotTitle;$('plotNote').textContent=plotNote;plotData=data;window.currentLogColumns=columns;window.currentLogRow=row;drawPlot(axes);updateSceneParameters();}
// Canvas chart: device pixel ratio-aware and uses numerical physics samples from update().
let plotAxes={};function drawPlot(axes=plotAxes){plotAxes=axes;const canvas=$('plot'),box=canvas.getBoundingClientRect();if(!box.width||!box.height)return;const dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(box.width*dpr);canvas.height=Math.round(box.height*dpr);const g=canvas.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);const W=box.width,H=box.height,p={l:66,r:22,t:36,b:48};const ww=W-p.l-p.r,hh=H-p.t-p.b;g.clearRect(0,0,W,H);if(!plotData.length)return;const xmin=Math.min(...plotData.map(t=>t.x)),xmax=Math.max(...plotData.map(t=>t.x)),ymax=Math.max(...plotData.map(t=>t.y),.01)*1.08;const X=x=>p.l+(x-xmin)/(xmax-xmin)*ww,Y=y=>p.t+hh-(y/ymax)*hh;g.strokeStyle='#203e50';g.lineWidth=1;g.fillStyle='#93aabe';g.font='10.5px IBM Plex Mono, monospace';for(let i=0;i<=5;i++){const y=i*ymax/5;const yy=Y(y);g.beginPath();g.moveTo(p.l,yy);g.lineTo(W-p.r,yy);g.stroke();g.textAlign='right';g.fillText(fmt(y,Math.abs(ymax)<2?2:0),p.l-9,yy+3)}for(let i=0;i<=5;i++){const x=xmin+i*(xmax-xmin)/5;const xx=X(x);g.beginPath();g.moveTo(xx,p.t);g.lineTo(xx,H-p.b);g.stroke();g.textAlign='center';g.fillText(fmt(x,xmax<1?3:xmax<10?2:0),xx,H-p.b+16)}g.strokeStyle='#5e8bb0';g.fillStyle='#5e8bb0';g.lineWidth=1.6;g.beginPath();g.moveTo(p.l,p.t+hh);g.lineTo(p.l,p.t-6);g.moveTo(p.l,p.t+hh);g.lineTo(p.l+ww+6,p.t+hh);g.stroke();g.beginPath();g.moveTo(p.l,p.t-9);g.lineTo(p.l-4,p.t-1);g.lineTo(p.l+4,p.t-1);g.closePath();g.fill();g.beginPath();g.moveTo(p.l+ww+9,p.t+hh);g.lineTo(p.l+ww+1,p.t+hh-4);g.lineTo(p.l+ww+1,p.t+hh+4);g.closePath();g.fill();g.strokeStyle='#69dff9';g.lineWidth=2.4;g.beginPath();plotData.forEach((d,i)=>i?g.lineTo(X(d.x),Y(d.y)):g.moveTo(X(d.x),Y(d.y)));g.stroke();g.lineTo(X(plotData.at(-1).x),Y(0));g.lineTo(X(plotData[0].x),Y(0));g.closePath();g.fillStyle='rgba(63,189,230,0.08)';g.fill();let marker=null;if(current===0)marker=bWien/state.T*1e9;if(current===1)marker=c/(state.wl*1e-9)/1e14;if(current===2)marker=1.239841984/state.V;if(current===3)marker=state.theta;if(current===4)marker=state.E;if(marker!==null&&marker>=xmin&&marker<=xmax){const i=Math.min(plotData.length-1,Math.max(0,Math.round((marker-xmin)/(xmax-xmin)*(plotData.length-1))));const pt=plotData[i];g.strokeStyle='#ffbf75';g.setLineDash([5,4]);g.beginPath();g.moveTo(X(marker),p.t);g.lineTo(X(marker),p.t+hh);g.stroke();g.setLineDash([]);g.fillStyle='#ffcb8b';g.beginPath();g.arc(X(marker),Y(pt.y),4,0,Math.PI*2);g.fill()}const eqMap=['สมการ: Bλ(T) = (2hc²/λ⁵) / [exp(hc/λkT) − 1]  |  λmax·T = b','สมการ: Kmax = max(0, hf − φ)  |  eVstop = Kmax','สมการ: λmin = hc / (eV)  |  Bremsstrahlung + Kα, Kβ','สมการ: E′ = E / [1 + (E/mₑc²)(1 − cos θ)]  |  Δλ = λc(1 − cos θ)','สมการ: Eγ ≥ 2mₑc² ≈ 1.022 MeV  (Pair Creation Threshold)'];const eqText=eqMap[current]||'';if(eqText){g.font='600 10.5px IBM Plex Mono,"Noto Sans Thai",monospace';const bw=Math.min(W-p.l-12,g.measureText(eqText).width+20),bx=Math.max(p.l,p.l+(ww-bw)/2);g.fillStyle='rgba(8,22,38,0.88)';g.strokeStyle='#347094';g.lineWidth=1;g.beginPath();g.roundRect?g.roundRect(bx,5,bw,22,5):g.rect(bx,5,bw,22);g.fill();g.stroke();g.fillStyle='#75ebf8';g.textAlign='center';g.fillText(eqText,bx+bw/2,20);}g.fillStyle='#bfe8ff';g.font='600 11px IBM Plex Mono,"Noto Sans Thai",sans-serif';g.textAlign='center';g.fillText(`แกน X: ${axes.x}`,p.l+ww/2,H-7);g.save();g.translate(15,p.t+hh/2);g.rotate(-Math.PI/2);g.fillText(`แกน Y: ${axes.y}`,0,0);g.restore();}
function renderLog(){const columns=window.currentLogColumns||[];$('logHead').innerHTML='<tr>'+columns.map(x=>`<th>${x}</th>`).join('')+'</tr>';$('logBody').innerHTML=log.length?log.map(row=>'<tr>'+row.map(x=>`<td>${typeof x==='number'?fmt(x,5):x}</td>`).join('')+'</tr>').join(''):`<tr><td colspan="${columns.length||1}">ยังไม่มีข้อมูล กดบันทึกค่าการทดลอง</td></tr>`;$('logCount').textContent=`${log.length} RECORDS`;}
function downloadCSV(file,rows){const text=rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n');const blob=new Blob(['\ufeff'+text],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=file;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
// 3D equipment visualization. These models intentionally use visible, nonscale representations.
const mat=(color,metalness=.45,roughness=.28)=>new THREE.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:.25,clearcoatRoughness:.25});
const glow=(color,opacity=1)=>new THREE.MeshBasicMaterial({color,transparent:opacity<1,opacity,depthWrite:opacity===1});
const add=(geo,material,x=0,y=0,z=0,parent=root)=>{const o=new THREE.Mesh(geo,material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
const sphere=(r,color,x=0,y=0,z=0,parent=root)=>add(new THREE.SphereGeometry(r,24,18),typeof color==='number'?mat(color):color,x,y,z,parent);
const box=(w,hh,d,color,x=0,y=0,z=0,parent=root)=>add(new THREE.BoxGeometry(w,hh,d),typeof color==='number'?mat(color):color,x,y,z,parent);
function cyl(r,hh,color,x=0,y=0,z=0,parent=root){return add(new THREE.CylinderGeometry(r,r,hh,32),typeof color==='number'?mat(color):color,x,y,z,parent)}
function line(a,b,color=0x6cdef8,r=.035,parent=root){const p=new THREE.Vector3(...a),q=new THREE.Vector3(...b),delta=q.clone().sub(p),mesh=add(new THREE.CylinderGeometry(r,r,delta.length(),12),glow(color),0,0,0,parent);mesh.position.copy(p.clone().add(q).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh}
function ring(r,color,x=0,y=0,z=0,parent=root){const o=add(new THREE.TorusGeometry(r,.032,12,80),glow(color),x,y,z,parent);return o}
function wavelengthToHex(nm){
  if(nm<380)return 0x8b5cf6;if(nm<440)return 0x6366f1;if(nm<490)return 0x0ea5e9;
  if(nm<510)return 0x14b8a6;if(nm<580)return 0x22c55e;if(nm<645)return 0xf59e0b;return 0xef4444;
}
function label(text,x=0,y=0,z=0,accent='#7cecff',pinY=null){
  const c2=document.createElement('canvas');const ctx=c2.getContext('2d');
  ctx.font='700 24px Inter,"Noto Sans Thai",system-ui,sans-serif';
  const tw=Math.ceil(ctx.measureText(text).width);
  c2.width=Math.max(160,tw+44);c2.height=54;
  ctx.fillStyle='rgba(7,18,34,0.88)';ctx.strokeStyle=accent;ctx.lineWidth=3;
  ctx.beginPath();if(ctx.roundRect)ctx.roundRect(3,3,c2.width-6,c2.height-6,12);else ctx.rect(3,3,c2.width-6,c2.height-6);
  ctx.fill();ctx.stroke();
  ctx.font='700 24px Inter,"Noto Sans Thai",system-ui,sans-serif';
  ctx.fillStyle='#f1f5f9';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(text,c2.width/2,c2.height/2+1);
  const tex=new THREE.CanvasTexture(c2);tex.colorSpace=THREE.SRGBColorSpace;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));
  const baseW=c2.width/135,baseH=c2.height/135;
  sp.userData={baseW,baseH};
  sp.position.set(x,y,z);
  sp.scale.set(baseW*labelScale,baseH*labelScale,1);
  sp.visible=labelsVisible;
  root.add(sp);sceneText.push(sp);
  if(pinY!==null){
    const pin=line([x,y-.22,z],[x,pinY,z],0x38bdf8,.014);
    pin.visible=labelsVisible;sceneText.push(pin);
  }
  return sp;
}
function applyLabelPrefs(){
  sceneText.forEach(o=>{
    o.visible=labelsVisible;
    if(o.isSprite&&o.userData?.baseW){
      o.scale.set(o.userData.baseW*labelScale,o.userData.baseH*labelScale,1);
    }
  });
}
window.addEventListener('mp27:labels',ev=>{if(ev.detail){labelsVisible=ev.detail.visible;labelScale=ev.detail.scale;if($('toggleLabels'))$('toggleLabels').textContent=labelsVisible?'🏷️ ป้ายชื่อ: เปิด':'🏷️ ป้ายชื่อ: ซ่อน';applyLabelPrefs();}});
function equipment(){
 const table=box(13.4,.28,6.6,mat(0x111f2e,.72,.35),0,-2.66,0);
 box(13.56,.08,6.76,mat(0x64748b,.88,.22),0,-2.78,0);
 for(let fx of [-5.9,5.9])for(let fz of [-2.8,2.8]){cyl(.34,.28,mat(0x0b131d,.45,.65),fx,-2.92,fz);cyl(.26,.08,mat(0xd99b26,.85,.25),fx,-2.76,fz);}
 const grid=new THREE.GridHelper(12.8,20,0x2b4b63,0x193042);grid.position.y=-2.51;root.add(grid);
 for(let i=-2;i<=2;i++){sphere(.06,glow(0x38bdf8),5.6,-2.45,i);cyl(.11,.14,mat(0xd99b26,.88,.22),5.6,-2.5,i);}
}
function buildScene(){for(const item of [...root.children]){root.remove(item);item.traverse?.(node=>{node.geometry?.dispose?.();if(node.material?.map?.isTexture)node.material.map.dispose();if(node.material)Array.isArray(node.material)?node.material.forEach(m=>m.dispose()):node.material.dispose();});}particles=[];dynamicMeshes=[];sceneText=[];equipment();
 if(current===0){
  cyl(1.4,1.1,mat(0x1e293b,.8,.32),-1.5,-1.98,0);
  const furnaceJacket=cyl(1.75,3.2,mat(0x334155,.82,.26),-1.5,0,0);furnaceJacket.rotation.z=Math.PI/2;
  for(let k=-2;k<=2;k++){const fin=cyl(1.88,.08,mat(0x94a3b8,.88,.2),-1.5+k*.55,0,0);fin.rotation.z=Math.PI/2;}
  const core=sphere(1.38,glow(0xffae68),-1.2,0,0);core.name='bbCore';dynamicMeshes.push(core);
  const aperture=ring(1.52,0x8de6ef,0.12,0,0);aperture.rotation.y=Math.PI/2;
  box(.28,1.8,1.8,mat(0x1e293b,.85,.25),1.35,-.2,0);box(.16,.55,.16,mat(0x020617,.9,.2),1.35,0,0);
  cyl(.22,1.6,mat(0x475569,.82,.25),3.4,-1.7,0);box(1.35,1.0,1.05,mat(0x1e3a5f,.78,.28),3.4,-.25,0);
  const lens=cyl(.42,.18,new THREE.MeshPhysicalMaterial({color:0xbae6fd,roughness:.06,transmission:.65,transparent:true,opacity:.6}),2.65,-.25,0);lens.rotation.z=Math.PI/2;
  for(let i=0;i<18;i++){const a=i*2.399,r=2.1+i*.07;const p=sphere(.075,glow(0xffbe78,0.85),-1.0+Math.cos(a)*r,Math.sin(a)*r*.6,Math.sin(a)*1.5);particles.push(p)}
  label('เตาวัตถุดำ (Blackbody Furnace)',-1.5,2.45,0,'#fbbf24',1.8);
  label('ช่องรับแสง (Aperture Slit)',1.35,1.75,0,'#38bdf8',.7);
  label('เครื่องสเปกโตรมิเตอร์ (Spectrometer)',3.4,1.65,0,'#34d399',.3);
 }
 if(current===1){
  const glassBulb=new THREE.Mesh(new THREE.CylinderGeometry(1.72,1.72,4.3,36),new THREE.MeshPhysicalMaterial({color:0xbce8ff,roughness:.06,metalness:.05,transmission:.55,transparent:true,opacity:.24,side:THREE.DoubleSide}));
  glassBulb.rotation.z=Math.PI/2;glassBulb.position.set(1.5,0,0);root.add(glassBulb);
  ring(1.74,0x94a3b8,-0.65,0,0).rotation.y=Math.PI/2;ring(1.74,0x94a3b8,3.65,0,0).rotation.y=Math.PI/2;
  // UV/VIS Lamp positioned above-front, shining onto the FRONT (+x) face of the Photocathode
  const lampGroup=new THREE.Group();lampGroup.position.set(1.45,2.45,1.45);lampGroup.lookAt(0.16,0,0);root.add(lampGroup);
  const lampBody=new THREE.Mesh(new THREE.CylinderGeometry(.46,.56,1.25,28),mat(0x334155,.85,.25));lampBody.rotation.x=Math.PI/2;lampGroup.add(lampBody);
  const lampGlow=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.18,28),glow(wavelengthToHex(state.wl)));lampGlow.rotation.x=Math.PI/2;lampGlow.position.z=.65;lampGlow.name='lampGlow';lampGroup.add(lampGlow);dynamicMeshes.push(lampGlow);
  const beam=line([1.45,2.45,1.45],[0.16,0,0],wavelengthToHex(state.wl),.22);beam.name='uvBeam';beam.material.opacity=.30;beam.material.transparent=true;dynamicMeshes.push(beam);
  const metalCol={Na:0xe2e8f0,K:0xcbd5e1,Zn:0x94a3b8,Cu:0xd97706}[state.metal]||0xd6c79c;
  box(.18,2.45,2.3,mat(0x334155,.8,.3),-.22,0,0);
  const cathode=box(.32,2.25,2.1,mat(metalCol,.9,.18),0.02,0,0);cathode.name='cathodePlate';dynamicMeshes.push(cathode);
  box(.24,2.1,1.8,mat(0x0ea5e9,.8,.22),2.9,0,0);
  cyl(.16,1.25,mat(0xd99b26,.85,.22),0,-1.85,0);cyl(.16,1.25,mat(0xd99b26,.85,.22),2.9,-1.85,0);
  box(4.4,1.0,2.3,mat(0x0f253a,.72,.35),1.5,-2.05,0);
  for(let i=0;i<7;i++){const p=sphere(.12,glow(wavelengthToHex(state.wl)),1.45,2.45,1.45);particles.push(p)}
  for(let i=0;i<12;i++){const p=sphere(.08,glow(0x7cecff),.24+(i%5)*.45,(Math.floor(i/5)-1)*.65,(i%3-1)*.36);particles.push(p)}
  label('หลอดแสง UV/VIS (ส่องกระทบหน้าแคโทด)',1.55,3.25,1.45,'#c084fc',2.7);
  label('ขั้วแคโทดโลหะ (Photocathode)',-.15,2.25,0,'#fbbf24',1.2);
  label('ขั้วแอโนด (Anode)',2.9,2.15,0,'#38bdf8',1.1);
  label('แอมมิเตอร์ & แหล่งจ่ายต้าน V',1.5,-1.25,0,'#34d399',-1.55);
  line([.3,-1.35,0],[2.9,-1.35,0],0x66a9d0,.04);
 }
 if(current===2){
  const chamber=new THREE.Mesh(new THREE.CylinderGeometry(1.22,1.22,5.6,36),new THREE.MeshPhysicalMaterial({color:0x93d5f7,roughness:.08,metalness:.05,transmission:.52,transparent:true,opacity:.26}));
  chamber.rotation.z=Math.PI/2;root.add(chamber);
  cyl(.65,1.45,mat(0x1e293b,.85,.28),-2.75,-1.8,0);cyl(.65,1.45,mat(0x1e293b,.85,.28),2.25,-1.8,0);
  const source=cyl(.62,.58,mat(0x94a3b8,.88,.2),-2.65,0,0);source.rotation.z=Math.PI/2;
  ring(.32,0xf97316,-2.3,0,0).rotation.y=Math.PI/2;
  const targetCol={Cu:0xea580c,Mo:0x94a3b8,W:0x475569}[state.target]||0xea580c;
  const target=box(.42,1.85,1.85,mat(targetCol,.9,.18),1.6,0,0);target.rotation.z=Math.PI/4;target.name='xrayTarget';dynamicMeshes.push(target);
  cyl(.24,1.55,mat(0xd97706,.9,.2),2.45,0,0).rotation.z=Math.PI/2;
  // Beryllium exit window at bottom (-y) perpendicular to electron beam
  cyl(.55,.16,mat(0x334155,.8,.3),1.6,-1.25,0);
  for(let i=0;i<15;i++){particles.push(sphere(.055,glow(0x38bdf8),-2.5+i*.25,(i%3-1)*.12,(i%4-2)*.08))}
  for(let i=0;i<14;i++){particles.push(sphere(.07,glow(0xfbbf24),1.6+(i%5-2)*.14,-.3-i*.15,(i%4-2)*.14))}
  label('ไส้หลอดทังสเตน (Filament Cathode)',-2.6,1.85,0,'#fb923c',.65);
  label('เป้าโลหะ 45° (Cu / Mo / W)',1.7,2.0,0,'#fbbf24',.95);
  label('หน้าต่างรังสีเอกซ์ (Be Window)',1.6,-2.15,0,'#34d399',-1.35);
 }
 if(current===3){
  cyl(.35,2.4,mat(0x334155,.85,.25),0,-1.35,0);cyl(1.15,.25,mat(0x475569,.85,.22),0,-2.4,0);
  box(1.1,1.0,1.0,mat(0x1e293b,.85,.3),-4.2,0,0);
  sphere(.55,mat(0x334155,.88,.18),0,0,0);sphere(.2,glow(0x9fe9f7),0,0,0);
  line([-3.6,0,0],[-.65,0,0],0x38bdf8,.065);
  for(let i=0;i<9;i++){const p=sphere(.09,glow(0x6be0ff),-3.6+i*.35,0,0);particles.push(p)}
  const scatter=line([.5,0,0],[3.5,2.4,0],0xffcf76,.065);scatter.name='scatterLine';dynamicMeshes.push(scatter);
  const naiDet=cyl(.46,1.15,mat(0xd99b26,.88,.22),3.6,2.45,0);naiDet.name='naiDet';dynamicMeshes.push(naiDet);
  const scatPhoton=sphere(.11,glow(0xffcf76),.5,0,0);scatPhoton.name='scatPhoton';particles.push(scatPhoton);
  const outgoing=line([.45,-.07,0],[2.4,-1.9,0],0x60a5fa,.05);outgoing.name='electronTrack';dynamicMeshes.push(outgoing);
  const electron=sphere(.19,glow(0x93c5fd),2.4,-1.9,0);electron.name='electron';dynamicMeshes.push(electron);
  label('โฟตอน γ ตกกระทบ (Pb Shield)',-3.6,1.35,0,'#38bdf8',.5);
  label('เป้าแกรไฟต์ (e⁻ อิสระ)',0,1.25,0,'#e2e8f0',.55);
  label('หัววัด NaI(Tl) มุม θ',3.2,3.2,0,'#fbbf24',2.55);
  label('อิเล็กตรอนกระเจิง (มุม φ)',2.4,-2.4,0,'#60a5fa',-1.7);
 }
 if(current===4){
  if(state.mode==='creation'){
   ring(2.2,0x38bdf8,0,0,0);box(1.3,1.2,1.2,mat(0x1e293b,.88,.28),-3.4,0,0);
   sphere(1.05,new THREE.MeshStandardMaterial({color:0x55648f,metalness:.25,roughness:.4,wireframe:true}),0,0,0);
   sphere(.4,glow(0xefbb72),0,0,0);line([-4.4,0,0],[-.95,0,0],0xffd97e,.06);
   for(let i=0;i<8;i++)particles.push(sphere(.075,glow(0xffe5a0),-4.2+i*.4,0,0));
   let electron=sphere(.23,glow(0x38bdf8),2,1.5,0);electron.name='electron';let positron=sphere(.23,glow(0xf43f5e),2,-1.5,0);positron.name='positron';dynamicMeshes.push(electron,positron);
   line([.55,.15,0],[3.7,2.4,0],0x38bdf8,.04);line([.55,-.15,0],[3.7,-2.4,0],0xf43f5e,.04);
   label('นิวเคลียสคูลอมบ์ (อนุรักษ์โมเมนตัม)',0,2.55,0,'#fbbf24',1.05);
   label('อิเล็กตรอน e⁻ (โค้งขึ้น)',3.2,2.05,0,'#38bdf8',1.55);
   label('โพซิตรอน e⁺ (โค้งลง)',3.2,-1.95,0,'#fb7185',-1.55);
  }else{
   ring(2.4,0x38bdf8,0,0,0);
   const colCore=sphere(.34,glow(0xffffff),0,0,0);colCore.name='annihCore';dynamicMeshes.push(colCore);
   const eMinus=sphere(.22,glow(0x38bdf8),-2.6,0,0);eMinus.name='eMinus';
   const ePlus=sphere(.22,glow(0xf43f5e),2.6,0,0);ePlus.name='ePlus';
   const g1=sphere(.16,glow(0xfbbf24),0,0,0);g1.name='gamma1';
   const g2=sphere(.16,glow(0xfbbf24),0,0,0);g2.name='gamma2';
   dynamicMeshes.push(eMinus,ePlus,g1,g2);
   line([-3.4,0,0],[3.4,0,0],0x38bdf8,.03);
   line([0,-3.2,0],[0,3.2,0],0xfbbf24,.045);
   label('จุดประลัยคู่ (CM at rest)',1.6,.55,0,'#e2e8f0',.15);
   label('e⁻ วิ่งเข้าชน',-2.8,1.15,0,'#38bdf8',.25);
   label('e⁺ วิ่งเข้าชน',2.8,1.15,0,'#fb7185',.25);
   label('โฟตอน γ₁ (511 keV)',0,3.35,0,'#fbbf24',2.6);
   label('โฟตอน γ₂ (511 keV · 180°)',0,-3.35,0,'#fbbf24',-2.6);
  }
 }
 updateSceneParameters();}
function updateSceneParameters(){if(!root)return;if(current===0){const T=state.T;const color=new THREE.Color();const u=Math.min(1,Math.max(0,(T-1000)/10000));color.setHSL(.055+u*.1,.9,.50+u*.25);const o=dynamicMeshes.find(x=>x.name==='bbCore');if(o)o.material.color.copy(color);}
if(current===1){const hex=wavelengthToHex(state.wl);const emitted=photonEnergy(state.wl)>workFunctions[state.metal];const available=state.voltage>-(photonEnergy(state.wl)-workFunctions[state.metal]);const lg=dynamicMeshes.find(x=>x.name==='lampGlow');if(lg)lg.material.color.setHex(hex);const bm=dynamicMeshes.find(x=>x.name==='uvBeam');if(bm)bm.material.color.setHex(hex);particles.slice(0,7).forEach((x,i)=>{x.visible=i<(state.intensity/100*7);x.material.color.setHex(hex);});particles.slice(7).forEach(x=>x.visible=emitted&&available);}
if(current===2){const targetCol={Cu:0xea580c,Mo:0x94a3b8,W:0x475569}[state.target]||0xea580c;const tgMesh=dynamicMeshes.find(x=>x.name==='xrayTarget');if(tgMesh)tgMesh.material.color.setHex(targetCol);}
if(current===3){
  const theta=state.theta*Math.PI/180;
  const phi=theta<1e-3?Math.PI/2:Math.atan(1/((1+state.E/meC2)*Math.tan(theta/2)));
  const sc=dynamicMeshes.find(x=>x.name==='scatterLine');const det=dynamicMeshes.find(x=>x.name==='naiDet');
  const elTrk=dynamicMeshes.find(x=>x.name==='electronTrack');const elObj=dynamicMeshes.find(x=>x.name==='electron');
  if(sc){const a=new THREE.Vector3(.5,0,0),b=new THREE.Vector3(.5+3.5*Math.cos(theta),3.5*Math.sin(theta),0);const d=b.clone().sub(a);sc.position.copy(a.clone().add(b).multiplyScalar(.5));sc.geometry.dispose();sc.geometry=new THREE.CylinderGeometry(.065,.065,d.length(),12);sc.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());if(det){det.position.copy(b);det.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());}}
  if(elTrk&&theta>1e-3){const a=new THREE.Vector3(.45,0,0),b=new THREE.Vector3(.45+3.0*Math.cos(phi),-3.0*Math.sin(phi),0);const d=b.clone().sub(a);elTrk.position.copy(a.clone().add(b).multiplyScalar(.5));elTrk.geometry.dispose();elTrk.geometry=new THREE.CylinderGeometry(.05,.05,d.length(),10);elTrk.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());if(elObj)elObj.position.copy(b);}
}
if(current===4){const isCreation=state.mode==='creation',valid=state.E>=2*meC2/1000;if(!isCreation&&!dynamicMeshes.some(o=>o.name==='annihCore')){buildScene();return;}if(isCreation&&dynamicMeshes.some(o=>o.name==='annihCore')){buildScene();return;}dynamicMeshes.forEach(o=>{if(isCreation)o.visible=valid;});}}
function setup3D(){scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x081421,.017);camera=new THREE.PerspectiveCamera(43,1,.1,100);renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;$('scene').appendChild(renderer.domElement);const pmrem=new THREE.PMREMGenerator(renderer),env=new THREE.Scene();env.background=new THREE.Color(0x091625);const card=new THREE.Mesh(new THREE.BoxGeometry(10,5,.4),new THREE.MeshBasicMaterial({color:0xdbf3ff}));card.position.set(-6,8,6);env.add(card);scene.environment=pmrem.fromScene(env,.04).texture;pmrem.dispose();root=new THREE.Group();scene.add(root);scene.add(new THREE.HemisphereLight(0xbbe0ff,0x14263b,1.8));const dir=new THREE.DirectionalLight(0xf5f9ff,2.4);dir.position.set(4,10,8);dir.castShadow=true;scene.add(dir);const key=new THREE.PointLight(0x77d9ff,60,40);key.position.set(-3,6,8);scene.add(key);const warm=new THREE.PointLight(0xffbc81,38,30);warm.position.set(5,2,-4);scene.add(warm);const stars=new THREE.BufferGeometry();const coords=[];for(let i=0;i<160;i++){coords.push((Math.random()-.5)*32,(Math.random()-.5)*20,(Math.random()-.5)*20-5)}stars.setAttribute('position',new THREE.Float32BufferAttribute(coords,3));scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0x5c89af,size:.025})));let dragging=false,lastX=0,lastY=0;const el=renderer.domElement;el.addEventListener('pointerdown',ev=>{dragging=true;lastX=ev.clientX;lastY=ev.clientY;el.setPointerCapture(ev.pointerId)});el.addEventListener('pointermove',ev=>{if(!dragging)return;orbit.y+=(ev.clientX-lastX)*.008;orbit.x=Math.max(-1.2,Math.min(1.2,orbit.x+(ev.clientY-lastY)*.008));lastX=ev.clientX;lastY=ev.clientY});el.addEventListener('pointerup',()=>dragging=false);el.addEventListener('wheel',ev=>{ev.preventDefault();orbit.dist=Math.max(7,Math.min(25,orbit.dist+ev.deltaY*.015))},{passive:false});resize();new ResizeObserver(resize).observe($('scene'));function resize(){const r=$('scene').getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();drawPlot();}
let prev=performance.now();function animate(now){requestAnimationFrame(animate);const dt=Math.min(.05,(now-prev)/1000);prev=now;if(playing)clockT+=dt*Number($('timeScale').value);root.rotation.y=orbit.y;root.rotation.x=orbit.x;camera.position.set(0,1,orbit.dist);camera.lookAt(0,-.25,0);if(playing){if(current===0){particles.forEach((p,i)=>{const a=i*2.399+clockT*.35,r=2.4+i*.07;p.position.set(-1.2+Math.cos(a)*r,Math.sin(a)*r*.5,Math.sin(a)*1.3);});}if(current===1){particles.slice(0,7).forEach((p,i)=>{const u=(clockT*.75+i/7)%1;p.position.set(1.45+(0.16-1.45)*u,2.45+(0-2.45)*u+(i%3-1)*.08,1.45+(0-1.45)*u);});particles.slice(7).forEach((p,i)=>{p.position.x=.24+((clockT*(1+Math.max(0,photonEnergy(state.wl)-workFunctions[state.metal]))+i*.32)%2.55);});}if(current===2){const vFac=0.6+state.V/60;particles.slice(0,15).forEach((p,i)=>{p.position.x=-2.5+((clockT*2.5*vFac+i*.25)%4.0);});particles.slice(15).forEach((p,i)=>{const u=(clockT*1.8+(i%7)/7)%1;p.position.set(1.6+((i%5-2)*.18)*u,-0.25-2.1*u,((i%3-1)*.18)*u);});}if(current===3){const th=state.theta*Math.PI/180;particles.slice(0,9).forEach((p,i)=>{p.position.x=-3.6+((clockT*2+i*.38)%3.2);});const sp=particles[9];if(sp){const u=(clockT*1.4)%1;sp.position.set(.5+3.3*Math.cos(th)*u,3.3*Math.sin(th)*u,0);}}if(current===4){if(state.mode==='creation'){particles.forEach((p,i)=>{p.position.x=-4+((clockT*1.6+i*.42)%3.6);});dynamicMeshes.forEach((obj)=>{if(obj.name==='electron')obj.position.set(1+Math.sin(clockT*.7)*.6,1.1+Math.sin(clockT*.5)*.3,0);if(obj.name==='positron')obj.position.set(1+Math.sin(clockT*.7)*.6,-1.1-Math.sin(clockT*.5)*.3,0)});}else{const cy=(clockT*.7)%1;const em=dynamicMeshes.find(o=>o.name==='eMinus'),ep=dynamicMeshes.find(o=>o.name==='ePlus'),g1=dynamicMeshes.find(o=>o.name==='gamma1'),g2=dynamicMeshes.find(o=>o.name==='gamma2');if(cy<.5){const u=cy*2;if(em){em.visible=true;em.position.set(-2.6*(1-u),0,0);}if(ep){ep.visible=true;ep.position.set(2.6*(1-u),0,0);}if(g1)g1.visible=false;if(g2)g2.visible=false;}else{const u=(cy-.5)*2;if(em)em.visible=false;if(ep)ep.visible=false;if(g1){g1.visible=true;g1.position.set(0,3.1*u,0);}if(g2){g2.visible=true;g2.position.set(0,-3.1*u,0);}}}}}
renderer.render(scene,camera)}requestAnimationFrame(animate);}
$('toggle').addEventListener('click',()=>{playing=!playing;$('toggle').textContent=playing?'⏸ หยุดชั่วคราว':'▶ เล่นต่อ';$('clock').textContent=playing?'LAB RUNNING':'PAUSED';});$('resetView').addEventListener('click',()=>{orbit={x:-.24,y:.43,dist:13};});$('toggleLabels')?.addEventListener('click',()=>{labelsVisible=!labelsVisible;$('toggleLabels').textContent=labelsVisible?'🏷️ ป้ายชื่อ: เปิด':'🏷️ ป้ายชื่อ: ซ่อน';applyLabelPrefs();});$('labelSmaller')?.addEventListener('click',()=>{labelScale=Math.max(0.55,Number((labelScale-0.15).toFixed(2)));applyLabelPrefs();});$('labelLarger')?.addEventListener('click',()=>{labelScale=Math.min(1.9,Number((labelScale+0.15).toFixed(2)));applyLabelPrefs();});$('zoomIn')?.addEventListener('click',()=>{orbit.dist=Math.max(6,orbit.dist-1.4);});$('zoomOut')?.addEventListener('click',()=>{orbit.dist=Math.min(25,orbit.dist+1.4);});$('timeScale').addEventListener('input',ev=>{$('timeScaleValue').textContent=`${Number(ev.target.value).toFixed(1)}×`;});$('reset').addEventListener('click',()=>{state=paramsFor(MODULES[current]);buildControls();update();});$('randomize').addEventListener('click',()=>{for(const a of MODULES[current].controls){if(a[2]==='range'){const v=a[3]+Math.floor(Math.random()*((a[4]-a[3])/a[5]+1))*a[5];state[a[0]]=Number(v.toFixed(6));}else{state[a[0]]=a[3][Math.floor(Math.random()*a[3].length)][0];}}buildControls();update();});$('record').addEventListener('click',()=>{if(log.length>=1000){alert('บันทึกได้สูงสุด 1,000 รายการต่อการทดลอง');return;}log.push([...window.currentLogRow]);renderLog();});$('clearLog').addEventListener('click',()=>{log=[];renderLog();});$('export').addEventListener('click',()=>downloadCSV(`photonlab_${MODULES[current].key}_curve.csv`,[[plotAxes.x,plotAxes.y],...plotData.map(o=>[o.x,o.y])]));$('helpBtn').addEventListener('click',()=>$('help').classList.remove('hidden'));$('closeHelp').addEventListener('click',()=>$('help').classList.add('hidden'));$('help').addEventListener('click',ev=>{if(ev.target===$('help'))$('help').classList.add('hidden');});document.addEventListener('keydown',e=>{if(e.key==='Escape')$('help').classList.add('hidden');});window.addEventListener('resize',()=>drawPlot());
setup3D();setModule(0);
