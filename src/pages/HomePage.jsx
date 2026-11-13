import { MEDIA, SUBJECTS } from '../data/media.js';
import MediaBrowser from '../components/MediaBrowser.jsx';
import Icon from '../components/Icon.jsx';
import { SUBJECT_ICON } from '../lib/mediaView.js';

function Illustration() {
  return (
    <div className="illustration" aria-hidden="true">
      <span className="ill-sun" />
      <span className="ill-cloud" />
      <div className="flask">
        <div className="flask-neck" />
        <div className="flask-body">
          <div className="liquid" />
          <span className="bubble bubble-one" />
          <span className="bubble bubble-two" />
        </div>
      </div>
      <span className="ill-ground" />
    </div>
  );
}

export default function HomePage() {
  const ready = MEDIA.filter((m) => m.status === 'ready');
  const subjects = new Set(ready.map((m) => m.subject)).size;
  const featured = ready[0];

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">สื่อการสอนประถมศึกษา · เรียนรู้แบบ 5E</span>
          <h1 id="hero-title">ห้องเรียน<span>ครูตั้ม</span></h1>
          <p className="lead">
            รวมสื่อการสอน เกม และแบบฝึกหัดที่ครูทำเอง
            เปิดเรียนได้ทั้งบนโปรเจกเตอร์ในห้อง และบนมือถือที่บ้าน
          </p>
          <ul className="hero-stats">
            <li><strong>{ready.length}</strong> สื่อพร้อมใช้</li>
            <li><strong>{subjects}</strong> วิชา</li>
            <li><strong>ฟรี</strong> ไม่ต้องสมัคร</li>
          </ul>
        </div>
        <Illustration />
      </section>

      <section className="section" aria-labelledby="browse-title">
        <div className="section-head">
          <div>
            <span className="kicker">ค้นหาสื่อ</span>
            <h2 id="browse-title">วันนี้อยากเรียนอะไรดี</h2>
          </div>
          <a className="link-arrow" href="#/library">ดูคลังสื่อทั้งหมด <Icon name="arrow-right" /></a>
        </div>
        <MediaBrowser searchLabel="ค้นหาสื่อการสอน" />
      </section>

      {featured && (
        <section className="section" aria-labelledby="featured-title">
          <a className={`featured subj-${SUBJECTS[featured.subject].color}`} href={'#/media/' + featured.id}>
            <span className="featured-icon"><Icon name={SUBJECT_ICON[featured.subject]} /></span>
            <span className="featured-copy">
              <span className="kicker">สื่อแนะนำ · {SUBJECTS[featured.subject].name} {featured.grade}</span>
              <strong id="featured-title">{featured.title}</strong>
              <span>{featured.description}</span>
            </span>
            <span className="btn btn-sun">เริ่มเรียน <Icon name="arrow-right" /></span>
          </a>
        </section>
      )}
    </>
  );
}
