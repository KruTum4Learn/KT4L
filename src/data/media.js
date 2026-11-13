// ============================================================
//  ทะเบียนสื่อทั้งหมด  ← เพิ่มสื่อใหม่ที่ไฟล์นี้ไฟล์เดียว
//
//  type: 'html'  = สื่อไฟล์ HTML วางไว้ใน public/media/<โฟลเดอร์>/index.html
//  type: 'react' = สื่อที่เขียนเป็นคอมโพเนนต์ React ใน src/media/
//  status: 'ready' พร้อมใช้ | 'soon' กำลังทำ (กดไม่ได้)
// ============================================================
import ClassroomWords from '../media/english-classroom/ClassroomWords.jsx';

export const SUBJECTS = {
  science: { name: 'วิทยาศาสตร์', color: 'blue', icon: '🔬' },
  english: { name: 'ภาษาอังกฤษ', color: 'pink', icon: '🔤' },
  computer: { name: 'วิทยาการคำนวณ', color: 'purple', icon: '💻' },
  other: { name: 'อื่นๆ', color: 'orange', icon: '⭐' },
};

export const MEDIA = [
  {
    id: 'light-medium',
    title: 'ตัวกลางของแสง',
    subject: 'science',
    grade: 'ป.4',
    type: 'html',
    src: 'media/light-medium/index.html',
    icon: '🕯️',
    description: 'แอนิเมชันพร้อมเสียงครู ห้องทดลองบังเทียน และแบบฝึกหัด 4 แบบ ตามขั้น 5E',
    tags: ['5E', 'แอนิเมชัน', 'เสียงครู'],
    status: 'ready',
  },
  {
    id: 'english-classroom',
    title: 'Classroom Objects',
    subject: 'english',
    grade: 'ป.4',
    type: 'react',
    component: ClassroomWords,
    icon: '✏️',
    description: 'ดูภาพ ฟังเสียง แล้วเลือกคำศัพท์สิ่งของในห้องเรียนให้ถูก',
    tags: ['คำศัพท์', 'เกม'],
    status: 'ready',
  },
  {
    id: 'next-media',
    title: 'สื่อชิ้นต่อไป',
    subject: 'other',
    grade: '',
    type: 'html',
    src: '',
    icon: '🧩',
    description: 'ช่องว่างสำหรับสื่อที่กำลังจะทำ เปลี่ยนรายละเอียดได้ใน src/data/media.js',
    tags: [],
    status: 'soon',
  },
];
