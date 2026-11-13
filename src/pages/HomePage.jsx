import { MEDIA, SUBJECTS } from '../data/media.js';
import MediaCard from '../components/MediaCard.jsx';

function Illustration() {
  return (
    <div className="illustration" aria-label="ภาพประกอบห้องเรียน">
      <span className="sun">☀</span>
      <span className="spark spark-one">✦</span>
      <span className="spark spark-two">✧</span>
      <div className="flask">
        <div className="flask-neck" />
        <div className="flask-body">
          <div className="liquid" />
          <span className="bubble bubble-one" />
          <span className="bubble bubble-two" />
        </div>
      </div>
      <div className="illustration-caption">นักเรียนรู้ตัวน้อย</div>
    </div>
  );
}

export default function HomePage() {
  const ready = MEDIA.filter((m) => m.status === 'ready');
  const subjects = new Set(ready.map((m) => m.subject)).size;
  const featured = ready[0];
  const activeSubjects = Object.entries(SUBJECTS).filter(([key]) => ready.some((m) => m.subject === key));

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">สื่อการสอนประถมศึกษา · เรียนรู้แบบ 5E</span>
          <h1>ห้องเรียน<br /><span>ครูตั้ม</span></h1>
          <p>
            รวมสื่อการสอน เกม และแบบฝึกหัดที่ครูทำเอง
            เปิดเรียนได้ทั้งบนโปรเจกเตอร์ในห้อง และบนมือถือที่บ้าน
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/library">
              <span aria-hidden="true">▶</span> เข้าสู่คลังสื่อ
            </a>
          </div>
          <div className="hero-note">
            <span className="note-star">✦</span>
            มีสื่อพร้อมใช้ {ready.length} ชิ้น · {subjects} วิชา
          </div>
        </div>
        <Illustration />
      </section>

      {featured && (
        <a className="progress-section featured" href={'#/media/' + featured.id}>
          <span className="stage-icon featured-icon">{featured.icon}</span>
          <div className="featured-copy">
            <span className="section-kicker">สื่อแนะนำวันนี้ · {SUBJECTS[featured.subject].name} {featured.grade}</span>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
          </div>
          <span className="button button-primary">เริ่มเรียน →</span>
        </a>
      )}

      <section className="lesson-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">เลือกตามวิชา</span>
            <h2>อยากเรียนวิชาอะไรวันนี้</h2>
          </div>
          <span className="heading-decoration">✧</span>
        </div>
        <div className="subject-grid">
          {activeSubjects.map(([key, s]) => {
            const n = ready.filter((m) => m.subject === key).length;
            return (
              <a key={key} className={`subject-tile ${s.color}`} href={'#/library/' + key}>
                <span className="stage-icon">{s.icon}</span>
                <span><strong>{s.name}</strong><small>{n} สื่อ</small></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="lesson-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">สื่อล่าสุด</span>
            <h2>เลือกสื่อที่อยากเรียน</h2>
          </div>
          <a className="card-link" href="#/library">ดูทั้งหมด →</a>
        </div>
        <div className="stage-grid">
          {ready.slice(0, 4).map((m) => <MediaCard key={m.id} item={m} />)}
        </div>
      </section>
    </>
  );
}
