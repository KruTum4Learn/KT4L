# ห้องเรียนครูตั้ม · KruTumForLearn (KT4L)

เว็บรวมสื่อการสอนประถมศึกษา ใช้ฟรี ไม่ต้องสมัคร เขียนด้วย **React + Vite** ขึ้นเว็บที่ **Vercel**
เว็บจริง: https://kt4l.vercel.app

## เริ่มใช้งานครั้งแรก

1. ติดตั้ง **Node.js** (เวอร์ชัน LTS) จาก https://nodejs.org
2. เปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วพิมพ์

```bash
npm install      # ครั้งแรกครั้งเดียว
npm run dev      # เปิดเว็บทดสอบที่ http://localhost:5173
```

แก้โค้ดแล้วบันทึก หน้าเว็บจะอัปเดตเองทันที

## เพิ่มสื่อใหม่ (ทุกสัปดาห์)

```bash
npm run new-media
```

ระบบจะถามทีละข้อ: รหัสสื่อ ชื่อ วิชา ระดับชั้น ประเภท คำอธิบาย แท็ก แล้วทำให้เอง 2 อย่าง

- สร้างโฟลเดอร์ `public/media/<รหัสสื่อ>/` พร้อม `index.html` ตั้งต้น
- เพิ่มรายการใน `src/data/media.js`

จากนั้น

1. วางไฟล์สื่อจริงทับ `public/media/<รหัสสื่อ>/index.html` (ไฟล์เสียง ภาพ วางในโฟลเดอร์เดียวกัน)
2. (ถ้ามี) ใส่ภาพปก `cover.webp` ขนาด 640×360 และไฟล์ดาวน์โหลด แล้วลบ `//` หน้าบรรทัด `thumbnail` / `download` ใน media.js
3. `npm run dev` แล้วเปิด `http://localhost:5173/learn/<รหัสสื่อ>` ลองดู
4. push ขึ้น GitHub → Vercel อัปเดตเว็บให้ภายใน 1–2 นาที

### ข้อมูลแต่ละสื่อใน `src/data/media.js`

| ช่อง | จำเป็น | ความหมาย |
|---|---|---|
| `id` | ✓ | รหัสสื่อ a-z 0-9 และ - ใช้เป็นลิงก์ `/learn/<id>` |
| `title` | ✓ | ชื่อสื่อ |
| `subject` | ✓ | `science` `english` `computer` `other` (เพิ่มวิชาได้ที่ `SUBJECTS`) |
| `grade` | ✓ | ระดับชั้น เช่น `ป.4` ใช้ในตัวกรอง |
| `type` | ✓ | `html` = ไฟล์ใน public/media · `react` = คอมโพเนนต์ใน src/media |
| `src` | html | path ไฟล์ เช่น `media/<id>/index.html` |
| `component` | react | คอมโพเนนต์ที่ import เข้ามา |
| `description` | ✓ | คำอธิบาย 1 ประโยค (ขึ้นในการ์ด และตอนแชร์ลิงก์) |
| `tags` | ✓ | แท็กสำหรับค้นหา |
| `status` | ✓ | `ready` พร้อมใช้ · `soon` กำลังจัดทำ |
| `kind` | | ประเภทสื่อในตัวกรอง (เกม / แอนิเมชัน / ใบงาน) ไม่ใส่จะเดาจากแท็ก |
| `thumbnail` | | ภาพปก 16:9 ใช้ทั้งบนการ์ดและตอนแชร์ลิงก์ ไม่ใส่จะวาดปกจากสีวิชาให้ |
| `download` | | ไฟล์ให้ดาวน์โหลด (เช่น ใบงาน PDF) ใส่แล้วจะมีปุ่มดาวน์โหลด |

**สื่อแบบ React:** สร้างไฟล์ใน `src/media/<ชื่อ>/` (ดูตัวอย่าง `english-classroom/ClassroomWords.jsx`)
แล้ว `import` ใน media.js ใส่ `type: 'react', component: ชื่อคอมโพเนนต์`

## ลิงก์ของเว็บ

| ลิงก์ | หน้า |
|---|---|
| `/` | หน้าแรก ค้นหาและกรองสื่อ |
| `/library` | คลังสื่อทั้งหมด |
| `/library/science` | คลังสื่อตามวิชา |
| `/learn/<id>` | เปิดสื่อ เช่น `/learn/light-medium` |

ลิงก์แบบเก่า (`/#/media/light-medium`) ยังใช้ได้ ระบบพาไปลิงก์ใหม่ให้เอง
ใช้ `/learn/` ไม่ใช้ `/media/` เพราะ `/media/` คือโฟลเดอร์ไฟล์สื่อ

## แชร์ลิงก์และ Google

ตอน `npm run build` สคริปต์ `scripts/prerender.mjs` จะสร้างให้อัตโนมัติ

- หน้า HTML ของสื่อแต่ละชิ้น ที่มีชื่อ คำอธิบาย และภาพของสื่อนั้น → แชร์ใน LINE / Facebook แล้วขึ้นตัวอย่างถูกชิ้น
- `sitemap.xml` และ `robots.txt` → ให้ Google เก็บหน้าสื่อทุกชิ้น

ถ้าเปลี่ยนโดเมน ให้ตั้ง Environment Variable `SITE_URL` ใน Vercel (เช่น `https://kt4l.com`)
หลังขึ้นเว็บครั้งแรก แนะนำส่ง `https://kt4l.vercel.app/sitemap.xml` ใน Google Search Console

## โครงสร้างโปรเจกต์

```
├─ index.html                 หน้าเว็บหลัก ฟอนต์ ไอคอน ภาพแชร์
├─ vercel.json                ตั้งค่าลิงก์แบบปกติบน Vercel
├─ design-system/kt4l/MASTER.md  สี ฟอนต์ ระยะห่าง ปุ่ม การ์ด (อ่านก่อนแก้หน้าตา)
├─ scripts/
│  ├─ new-media.mjs           npm run new-media
│  └─ prerender.mjs           สร้างหน้าแชร์ + sitemap หลัง build
├─ public/
│  ├─ logo.webp, favicon-48.png, apple-touch-icon.png, og.png
│  └─ media/<id>/             สื่อแบบไฟล์ HTML
└─ src/
   ├─ data/media.js           ★ ทะเบียนสื่อ
   ├─ App.jsx                 โครงหน้า + เลือกหน้าตามลิงก์
   ├─ lib/router.js           ระบบลิงก์ (/learn, /library)
   ├─ lib/mediaView.js        ตัวช่วยค้นหา/กรอง/เดาประเภทสื่อ
   ├─ lib/sound.js            เสียงเอฟเฟกต์ของสื่อ React
   ├─ components/             Topbar, MediaBrowser (ค้นหา+กรอง), MediaCard, Icon
   ├─ pages/                  HomePage, LibraryPage, PlayerPage
   ├─ media/                  สื่อที่เขียนด้วย React
   ├─ tokens.css              ค่าสี ฟอนต์ ระยะห่าง (design tokens)
   └─ styles.css              หน้าตาทั้งหมด
```

## ขึ้นเว็บ (Vercel)

1. push โปรเจกต์ขึ้น GitHub
2. ที่ https://vercel.com กด **Add New → Project** เลือก repository นี้ แล้วกด **Deploy**
3. ทุกครั้งที่ push โค้ดใหม่ เว็บจะอัปเดตเอง

ทดสอบแบบเว็บจริงในเครื่อง: `npm run build` แล้ว `npm run preview`
