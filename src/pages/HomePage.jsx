import { MEDIA, SUBJECTS } from '../data/media.js';
import MediaCard from '../components/MediaCard.jsx';

export default function HomePage() {
  const ready = MEDIA.filter((m) => m.status === 'ready');
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <p className="eyebrow">ยินดีต้อนรับ</p>
          <h1>ห้องเรียน<span>ครูตั้ม</span></h1>
          <p className="lead">รวมสื่อการสอน เกม และแบบฝึกหัดที่ครูทำเอง เปิดเรียนได้ทั้งบนโปรเจกเตอร์ในห้อง และบนมือถือที่บ้าน</p>
          <div className="row">
            <a className="btn" href="#/library">ดูคลังสื่อทั้งหมด</a>
          </div>
        </div>
        <div className="stats">
          <div><b>{ready.length}</b><span>สื่อพร้อมใช้</span></div>
          <div><b>{new Set(ready.map((m) => m.subject)).size}</b><span>วิชา</span></div>
        </div>
      </section>

      <section>
        <h2 className="sec-title">เลือกตามวิชา</h2>
        <div className="subjects">
          {Object.entries(SUBJECTS).map(([key, s]) => {
            const n = MEDIA.filter((m) => m.subject === key && m.status === 'ready').length;
            return (
              <a key={key} className="subject-tile" href={'#/library/' + key}>
                <span className={'ic t-' + s.color}>{s.icon}</span>
                <b>{s.name}</b>
                <small>{n} สื่อ</small>
              </a>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="sec-title">สื่อล่าสุด</h2>
        <div className="grid">
          {MEDIA.slice(0, 3).map((m) => <MediaCard key={m.id} item={m} />)}
        </div>
      </section>
    </div>
  );
}
