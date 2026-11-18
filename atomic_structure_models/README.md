# Atomic Structure Lab 2027

Realtime 3D Interactive Simulator — โครงสร้างอะตอมและแบบจำลองอะตอม

โฟลเดอร์: `modernphysics2027/atomic_structure_models/`

## เริ่มใช้งาน

เปิด Terminal ที่ `modernphysics2027/atomic_structure_models` แล้วรัน:

```bash
python3 -m http.server 8003
```

จากนั้นเปิด `http://localhost:8003` โดยต้องมีอินเทอร์เน็ตเพื่อโหลด Three.js และ OrbitControls จาก jsDelivr และ Google Fonts (กรณีออฟไลน์จะใช้ system fonts แต่ฉาก 3D ยังต้องใช้ไลบรารี)

## สถานีการทดลอง

1. **Thomson & Rutherford**: เลือกโมเดล ตั้งพลังงานอนุภาคแอลฟา 1–10 MeV, ระยะเฉียด 0.5–20 fm, เลขอะตอม Z=20–90; คำนวณมุมการกระเจิงจากการชน Coulomb แบบเป้าหนักนิ่ง (ในโมเดล Rutherford) และกราฟมุมต่อระยะเฉียด
2. **Hydrogen line spectra**: เลือก Lyman/Balmer/Paschen, n₂ 3–9; คำนวณ λ และ E photon ด้วยสูตร Rydberg; สเปกตรัมเส้นตำแหน่งตาม λ
3. **Bohr atomic model**: เลือกระดับ nᵢ/n𝒇 1–7; แสดงระดับ Eₙ=−13.6/n² eV และปล่อย/ดูดกลืนโฟตอนเมื่อ nᵢ≠n𝒇
4. **Franck–Hertz**: ปรับแรงดันเร่ง 0–35 V, retarding potential 0.2–3 V, ก๊าซตัวอย่าง Hg หรือ Ne; กราฟกระแสเชิงคุณภาพที่ร่องซ้ำราว 4.9 V (Hg) หรือ ~16.6 V (Ne)

ทุกโมดูลมีฉาก 3D หมุน ซูม เล่น/หยุด/step ปรับอัตราเร็วภาพ ค่าคำนวณ กราฟ และปุ่ม Export CSV (ข้อมูลจากฟังก์ชันจำลอง ไม่ใช่ค่าที่วัดจริง)

## ข้อจำกัดและสมมติฐานสำคัญ

- **Thomson**: รูปลูกพลัมฝังลูกเกดและกราฟเป็นภาพเชิงคุณภาพ ไม่ได้แก้สนามไฟฟ้าจากทรงกลมประจุจริงหรืออินทิเกรตสมการการเคลื่อนที่
- **Rutherford**: มุมจาก `θ=2 arctan[(k Z z e²)/(2 E b)]` โดยถือการกระเจิง Coulomb ภายใต้การประมาณเป้าหมายหนักนิ่ง ไม่รวม screening/finite nucleus/recoil; เส้น 3D เป็นภาพประกอบที่ไม่ใช่ trajectory numerical solver
- **Hydrogen**: ใช้ Rydberg constant สำหรับไฮโดรเจนและไม่มี fine structure / Zeeman / Doppler broadening. ช่วง UV/IR ใช้สีสัญลักษณ์ไม่ใช่แสงที่ตามองเห็น
- **Bohr**: orbit 3D คือแบบจำลองทางประวัติศาสตร์ ไม่ใช่ quantum orbital; ค่า 13.6 eV เป็นค่าประมาณ
- **Franck–Hertz**: กราฟเป็นฟังก์ชันเชิงปรากฏการณ์ให้เกิด periodic dips ไม่ใช่ผลวัดหรือ kinetic simulation ของหลอดจริง; Ne มีหลาย excited states จริง จึงเป็นเพียงตัวอย่าง simplified excitation energy
- แอนิเมชันช้าหรือเร็วไม่ได้แทนเวลาจริงระดับอะตอม และไม่ใช่เครื่องมือวัดเชิงมาตรวิทยา

## โครงสร้าง

- `index.html` — dashboard, navigation, viewport, plots, instrument control
- `styles.css` — responsive dark scientific UI
- `app.js` — physics calculations, charting, Three.js visualization and CSV export
- `README.md` — instructions and modeling assumptions

## กิจกรรมประเมินความเข้าใจที่แนะนำ

- ทำตารางมุมกระเจิงต่อ impact parameter และอธิบายหลักฐานของนิวเคลียส
- ใช้สูตร Rydberg ทำนาย Hα/Hβ/Hγ และเปรียบเทียบกับกราฟ
- ศึกษาระดับ Eₙ ของโบร์ พร้อมความหมายของการดูดกลืนและการเปล่งโฟตอน
- ระบุช่วง ΔV ระหว่างกระแสลดลง และเชื่อมโยงกับการกระตุ้นอะตอมไอปรอท

## หมายเหตุด้านเทคนิค

ใช้ JavaScript modules ที่โหลดจาก CDN; บางระบบไม่อนุญาตให้เปิดแบบ `file://` โดยตรง ให้ใช้ local HTTP server ตามขั้นตอนข้างต้น.
