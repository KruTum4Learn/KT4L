// ตัวช่วยด้านการแสดงผลเท่านั้น ไม่แก้ข้อมูลใน src/data/media.js
//
// ช่องเสริมที่ใส่ใน media.js ได้ (ไม่บังคับ):
//   kind:      'เกม' | 'แอนิเมชัน' | 'ใบงาน' | อื่นๆ  ← ถ้าไม่ใส่ จะเดาจาก tags
//   thumbnail: 'media/<โฟลเดอร์>/cover.webp'           ← ถ้าไม่ใส่ จะวาดปกจากสีวิชาให้
//   download:  'media/<โฟลเดอร์>/worksheet.pdf'        ← ใส่เมื่อมีไฟล์ให้ดาวน์โหลด

export const SUBJECT_ICON = {
  science: 'flask',
  english: 'languages',
  computer: 'monitor',
  other: 'star',
};

export const KIND_ICON = {
  เกม: 'gamepad',
  แอนิเมชัน: 'film',
  ใบงาน: 'sheet',
};

export function kindOf(item) {
  if (item.kind) return item.kind;
  const tags = item.tags || [];
  if (tags.includes('เกม')) return 'เกม';
  if (tags.includes('แอนิเมชัน')) return 'แอนิเมชัน';
  if (tags.includes('ใบงาน') || tags.includes('แบบฝึกหัด')) return 'ใบงาน';
  return 'สื่อเรียน';
}

export function matchesQuery(item, subjectName, q) {
  if (!q) return true;
  const hay = [item.title, item.description, item.grade, subjectName, kindOf(item), ...(item.tags || [])]
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

// เรียงค่าไม่ซ้ำ เช่น ระดับชั้น ป.1 → ป.6
export const uniqueSorted = (values) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'th', { numeric: true }));
