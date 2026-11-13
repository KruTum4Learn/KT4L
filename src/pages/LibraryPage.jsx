import { SUBJECTS } from '../data/media.js';
import MediaBrowser from '../components/MediaBrowser.jsx';

export default function LibraryPage({ subject }) {
  const name = subject ? SUBJECTS[subject]?.name : 'สื่อทั้งหมด';
  return (
    <section className="section first" aria-labelledby="library-title">
      <div className="page-head">
        <span className="kicker">คลังสื่อ</span>
        <h1 id="library-title">{name || 'ไม่พบวิชานี้'}</h1>
        <p>ค้นหาหรือกรองตามวิชา ระดับชั้น และประเภทสื่อ แล้วกดเปิดเรียนได้ทันที</p>
      </div>
      <MediaBrowser key={subject || 'all'} routeSubject={subject} linkSubjects searchLabel="ค้นหาในคลังสื่อ" />
    </section>
  );
}
