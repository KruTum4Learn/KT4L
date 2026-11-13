// ============================================================
//  เพิ่มสื่อใหม่ด้วยคำสั่งเดียว:  npm run new-media
//
//  1. ถามข้อมูลสื่อทีละข้อ (กด Enter เพื่อใช้ค่าในวงเล็บ)
//  2. สร้างโฟลเดอร์ public/media/<id>/ พร้อม index.html ตั้งต้น
//  3. เพิ่มรายการใหม่ลงใน src/data/media.js ให้อัตโนมัติ
//  จากนั้นแค่วางไฟล์สื่อจริงทับ index.html แล้ว push ขึ้น GitHub
// ============================================================
import { createInterface } from 'node:readline';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'src/data/media.js');
const src = readFileSync(DATA, 'utf8');

// อ่านรายชื่อวิชาและ id ที่มีอยู่แล้วจาก media.js
const subjects = [...src.matchAll(/^\s{2}(\w+):\s*\{\s*name:\s*'([^']+)'/gm)].map((m) => ({ key: m[1], name: m[2] }));
const usedIds = new Set([...src.matchAll(/\bid:\s*'([^']+)'/g)].map((m) => m[1]));

const rl = createInterface({ input: process.stdin, terminal: false });
const lines = rl[Symbol.asyncIterator]();
const ask = async (q, def = '') => {
  process.stdout.write(def ? `${q} (${def}): ` : `${q}: `);
  const { value, done } = await lines.next();
  if (done) { console.log('\nยกเลิก'); process.exit(1); }
  return value.trim() || def;
};

console.log('\n✏️  เพิ่มสื่อใหม่ใน KT4L\n');

let id;
for (;;) {
  id = (await ask('ชื่อโฟลเดอร์/รหัสสื่อ ภาษาอังกฤษตัวเล็ก ใช้ - คั่น เช่น magnet-force')).toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) { console.log('  ใช้ได้เฉพาะ a-z 0-9 และ - เช่น plant-parts'); continue; }
  if (usedIds.has(id) || existsSync(join(ROOT, 'public/media', id))) { console.log('  มีรหัสนี้แล้ว ลองชื่ออื่น'); continue; }
  break;
}

let title;
while (!(title = await ask('ชื่อสื่อ เช่น แรงแม่เหล็ก'))) console.log('  ต้องใส่ชื่อสื่อ');

console.log('  วิชา: ' + subjects.map((s, i) => `${i + 1}) ${s.name}`).join('  '));
let subject;
for (;;) {
  const n = Number(await ask('เลือกวิชา (ใส่เลข)', '1'));
  if (subjects[n - 1]) { subject = subjects[n - 1].key; break; }
  console.log('  ใส่เลข 1-' + subjects.length);
}

const grade = await ask('ระดับชั้น', 'ป.4');
const kind = await ask('ประเภทสื่อ เกม / แอนิเมชัน / ใบงาน / อื่นๆ', 'เกม');
const description = await ask('คำอธิบายสั้นๆ 1 ประโยค', 'สื่อการเรียนรู้เรื่อง' + title);
const tags = (await ask('แท็ก คั่นด้วยจุลภาค เช่น แรง,ทดลอง', kind))
  .split(/[,，]/).map((t) => t.trim()).filter(Boolean);
const ready = (await ask('เปิดให้ใช้เลยไหม y = พร้อมใช้, n = ขึ้นว่ากำลังจัดทำ', 'y')).toLowerCase().startsWith('y');
rl.close();

// --- 1) โฟลเดอร์ + index.html ตั้งต้น ---
const dir = join(ROOT, 'public/media', id);
mkdirSync(dir, { recursive: true });
const q = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${q(title)}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mali:wght@700&family=Noto+Sans+Thai:wght@400;600&display=swap" />
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: "Noto Sans Thai", sans-serif;
           background: #fff8ec; color: #002b5e; text-align: center; padding: 24px; box-sizing: border-box; }
    h1 { font-family: "Mali", sans-serif; font-size: clamp(32px, 6vw, 56px); margin: 0 0 12px; }
    p { font-size: 18px; color: #3e4f72; }
  </style>
</head>
<body>
  <!-- วางไฟล์สื่อจริงทับไฟล์นี้ได้เลย (ชื่อไฟล์ต้องเป็น index.html) -->
  <main>
    <h1>${q(title)}</h1>
    <p>${q(description)}</p>
  </main>
</body>
</html>
`);

// --- 2) เพิ่มรายการลง media.js ---
const s = (v) => `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const entry = `  {
    id: ${s(id)},
    title: ${s(title)},
    subject: ${s(subject)},
    grade: ${s(grade)},
    type: 'html',
    src: ${s(`media/${id}/index.html`)},
    kind: ${s(kind)},
    description: ${s(description)},
    tags: [${tags.map(s).join(', ')}],
    // thumbnail: ${s(`media/${id}/cover.webp`)},   ← ภาพปก 16:9 (แนะนำ 640×360) ใส่แล้วลบ // ออก
    // download: ${s(`media/${id}/worksheet.pdf`)}, ← ไฟล์ให้ดาวน์โหลด ใส่แล้วลบ // ออก
    status: ${ready ? "'ready'" : "'soon'"},
  },
`;
const start = src.indexOf('export const MEDIA = [');
const end = src.lastIndexOf('];');
if (start < 0 || end < start) {
  console.error('\n✗ หา "export const MEDIA = [" ใน media.js ไม่เจอ เพิ่มรายการด้วยตัวเองตามนี้:\n\n' + entry);
  process.exit(1);
}
// ใส่ก่อนช่อง "สื่อชิ้นต่อไป" (status: soon ที่เป็นช่องว่าง) ถ้ามี ไม่งั้นใส่ท้ายรายการ
const placeholder = src.indexOf("id: 'next-media'");
const at = placeholder > start ? src.lastIndexOf('  {', placeholder) : end;
writeFileSync(DATA, src.slice(0, at) + entry + src.slice(at));

console.log(`
✓ สร้าง public/media/${id}/index.html
✓ เพิ่ม "${title}" ใน src/data/media.js

ขั้นต่อไป:
  1. วางไฟล์สื่อจริงทับ public/media/${id}/index.html (ไฟล์เสียง/ภาพวางในโฟลเดอร์เดียวกัน)
  2. npm run dev แล้วเปิด http://localhost:5173/learn/${id} เพื่อลองดู
  3. push ขึ้น GitHub → Vercel อัปเดตเว็บให้เอง
`);
