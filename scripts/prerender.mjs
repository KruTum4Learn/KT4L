// ============================================================
//  สร้างหน้าแชร์ของสื่อแต่ละชิ้น + sitemap.xml + robots.txt
//  ทำงานอัตโนมัติหลัง `npm run build` (ไม่ต้องรันเอง)
//
//  ทำไมต้องมี: LINE / Facebook / Google ไม่รัน JavaScript
//  จึงต้องมีไฟล์ HTML ที่ใส่ชื่อ คำอธิบาย และภาพของสื่อชิ้นนั้นไว้ล่วงหน้า
//  พอคนเปิดลิงก์จริง React จะทำงานต่อตามปกติ
//
//  เปลี่ยนโดเมนเว็บ: ตั้งค่า SITE_URL ใน Vercel หรือแก้ค่าเริ่มต้นด้านล่าง
// ============================================================
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = process.env.DIST_DIR || join(ROOT, 'dist');
const SITE = (process.env.SITE_URL || 'https://kt4l.vercel.app').replace(/\/$/, '');
const SITE_NAME = 'ห้องเรียนครูตั้ม · KT4L';

// --- อ่าน src/data/media.js (แปลง JSX ให้ Node อ่านได้) ---
const tmp = join(ROOT, 'node_modules', '.cache', 'kt4l-media.mjs');
await build({
  entryPoints: [join(ROOT, 'src/data/media.js')],
  outfile: tmp,
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  packages: 'external',
  logLevel: 'error',
});
const { MEDIA, SUBJECTS } = await import(pathToFileURL(tmp).href + '?t=' + Date.now());
rmSync(tmp, { force: true });

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => (!p ? '' : /^https?:\/\//.test(p) ? p : SITE + '/' + p.replace(/^\.?\//, ''));

function page({ path, title, description, image, body, jsonld }) {
  const url = SITE + path;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${esc(image || SITE + '/og.png')}$2`);

  const extra = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="th_TH" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : '',
  ].join('\n    ');
  html = html.replace('</head>', `    ${extra}\n  </head>`);
  // เนื้อหาสำรองให้ Google อ่านได้ (React จะแทนที่ทันทีเมื่อเปิดหน้า)
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}

function write(path, html) {
  // /learn/x → dist/learn/x.html (Vercel cleanUrls เปิดเป็น /learn/x)
  const file = join(DIST, (path === '/' ? 'index' : path.slice(1)) + '.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const ready = MEDIA.filter((m) => m.status === 'ready');
const urls = ['/'];

// หน้าแรก: เติม canonical + เนื้อหาสำรอง
write('/', page({
  path: '/',
  title: SITE_NAME,
  description: 'สื่อการสอน เกม และแบบฝึกหัดระดับประถมศึกษา ใช้ฟรี เปิดเรียนได้ทันทีบนจอใหญ่ในห้องหรือมือถือ',
  body: `<h1>${esc(SITE_NAME)}</h1><ul>${ready.map((m) => `<li><a href="/learn/${m.id}">${esc(m.title)}</a></li>`).join('')}</ul>`,
  jsonld: { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE + '/', inLanguage: 'th' },
}));

// คลังสื่อ ทั้งหมด + รายวิชา
const subjectKeys = Object.keys(SUBJECTS).filter((k) => ready.some((m) => m.subject === k));
for (const key of [null, ...subjectKeys]) {
  const path = key ? '/library/' + key : '/library';
  const name = key ? SUBJECTS[key].name : 'คลังสื่อทั้งหมด';
  const list = key ? ready.filter((m) => m.subject === key) : ready;
  write(path, page({
    path,
    title: `${name} · ${SITE_NAME}`,
    description: `รวมสื่อการสอน${key ? 'วิชา' + name : ''}ระดับประถม ${list.length} ชิ้น ใช้ฟรี ค้นหาและกรองตามระดับชั้นได้`,
    body: `<h1>${esc(name)}</h1><ul>${list.map((m) => `<li><a href="/learn/${m.id}">${esc(m.title)}</a> ${esc(m.grade)}</li>`).join('')}</ul>`,
  }));
  urls.push(path);
}

// สื่อแต่ละชิ้น
for (const m of ready) {
  const subject = SUBJECTS[m.subject]?.name || '';
  const path = '/learn/' + m.id;
  const title = `${m.title} · ${subject} ${m.grade}`.trim();
  write(path, page({
    path,
    title: `${title} · ${SITE_NAME}`,
    description: m.description,
    image: m.thumbnail ? abs(m.thumbnail) : '',
    body: `<h1>${esc(m.title)}</h1><p>${esc(subject)} ${esc(m.grade)}</p><p>${esc(m.description)}</p>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: m.title,
      description: m.description,
      url: SITE + path,
      inLanguage: 'th',
      educationalLevel: m.grade || undefined,
      about: subject || undefined,
      keywords: (m.tags || []).join(', ') || undefined,
      isAccessibleForFree: true,
      image: m.thumbnail ? abs(m.thumbnail) : undefined,
      provider: { '@type': 'Person', name: 'ครูตั้ม (KruTumForLearn)' },
    },
  }));
  urls.push(path);
}

writeFileSync(join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n') + '\n</urlset>\n');
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`✓ หน้าแชร์ ${urls.length} หน้า + sitemap.xml + robots.txt (${SITE})`);
