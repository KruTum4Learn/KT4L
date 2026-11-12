# ห้องเรียนครูตั้ม (เว็บรวมสื่อการสอน)

เว็บรวมสื่อการสอนที่เขียนด้วย **React + Vite**

## โครงสร้างโปรเจกต์

```
kru-media/
├─ index.html                  หน้าเว็บหลัก (โหลดฟอนต์ Mitr, Sarabun)
├─ public/media/               สื่อแบบไฟล์ HTML (คัดลอกไปทั้งโฟลเดอร์ตอน build)
│  └─ light-medium/            ตัวกลางของแสง + โฟลเดอร์ audio เสียงครู 26 ไฟล์
└─ src/
   ├─ data/media.js            ★ ทะเบียนสื่อ เพิ่มสื่อใหม่ที่นี่
   ├─ App.jsx                  ระบบเปลี่ยนหน้า (#/ , #/library , #/media/<id>)
   ├─ components/              Sidebar, MediaCard
   ├─ pages/                   HomePage, LibraryPage, PlayerPage
   ├─ media/                   สื่อที่เขียนด้วย React (เช่น เกม Classroom Objects)
   ├─ lib/sound.js             เสียงเอฟเฟกต์ ใช้ร่วมกันทุกสื่อ
   └─ styles.css               สีและหน้าตาทั้งหมด
```

## เริ่มใช้งานครั้งแรก

1. ติดตั้ง **Node.js** (เวอร์ชัน LTS) จาก https://nodejs.org
2. เปิด Terminal (หรือ Command Prompt) ในโฟลเดอร์ `kru-media` แล้วพิมพ์

```bash
npm install      # ติดตั้งครั้งแรกครั้งเดียว
npm run dev      # เปิดเว็บทดสอบ ที่ http://localhost:5173
```

แก้โค้ดแล้วบันทึก หน้าเว็บจะอัปเดตเองทันที

## เพิ่มสื่อใหม่

**แบบที่ 1: สื่อไฟล์ HTML** (เช่น ไฟล์ที่ทำกับ Claude)
1. สร้างโฟลเดอร์ `public/media/<ชื่อสื่อ>/` แล้ววางไฟล์เป็น `index.html`
2. เพิ่มรายการใน `src/data/media.js`

```js
{
  id: 'magnet',
  title: 'แรงแม่เหล็ก',
  subject: 'science',
  grade: 'ป.3',
  type: 'html',
  src: 'media/magnet/index.html',
  icon: '🧲',
  description: 'คำอธิบายสั้นๆ',
  tags: ['เกม'],
  status: 'ready',
},
```

**แบบที่ 2: สื่อที่เขียนด้วย React**
1. สร้างไฟล์ใน `src/media/<ชื่อสื่อ>/` ดูตัวอย่างจาก `english-classroom/ClassroomWords.jsx`
2. `import` เข้ามาใน `src/data/media.js` แล้วใส่ `type: 'react', component: ชื่อคอมโพเนนต์`

เพิ่มวิชาใหม่ได้ที่ `SUBJECTS` ในไฟล์เดียวกัน

## นำขึ้นเว็บให้นักเรียนเข้าได้ (ฟรี)

**Vercel (ง่ายที่สุด)**
1. อัปโหลดโปรเจกต์ขึ้น GitHub
2. เข้า https://vercel.com เข้าสู่ระบบด้วย GitHub แล้วกด **Add New → Project**
3. เลือก repository นี้ แล้วกด **Deploy** (Vercel รู้เองว่าเป็น Vite)
4. ได้ลิงก์ เช่น `kru-media.vercel.app` ส่งให้นักเรียนได้เลย ทุกครั้งที่ push โค้ดใหม่ เว็บจะอัปเดตเอง

**หรือสร้างไฟล์เอง** ด้วย `npm run build` จะได้โฟลเดอร์ `dist/` ไปวางบนโฮสต์ใดก็ได้

## ลิงก์ตรงไปที่สื่อ
- หน้าคลังวิทยาศาสตร์: `.../#/library/science`
- ตัวกลางของแสง: `.../#/media/light-medium`
