import { MEDIA, SUBJECTS } from '../data/media.js';
import MediaCard from '../components/MediaCard.jsx';

export default function LibraryPage({ subject }) {
  const ready = MEDIA.filter((m) => m.status === 'ready');
  const list = subject ? ready.filter((m) => m.subject === subject) : ready;
  const activeSubjects = Object.entries(SUBJECTS).filter(([k]) => ready.some((m) => m.subject === k));
  return (
    <section className="lesson-section first">
      <div className="section-heading">
        <div>
          <span className="section-kicker">คลังสื่อ</span>
          <h2 className="page-title">{subject ? SUBJECTS[subject]?.name : 'สื่อทั้งหมด'}</h2>
        </div>
        <span className="heading-decoration">✧</span>
      </div>
      <div className="chips">
        <a className={'nav-link' + (!subject ? ' active' : '')} href="#/library">ทั้งหมด</a>
        {activeSubjects.map(([k, s]) => (
          <a key={k} className={'nav-link' + (subject === k ? ' active' : '')} href={'#/library/' + k}>
            {s.icon} {s.name}
          </a>
        ))}
      </div>
      {list.length ? (
        <div className="stage-grid">{list.map((m) => <MediaCard key={m.id} item={m} />)}</div>
      ) : (
        <div className="empty">ยังไม่มีสื่อในวิชานี้ <a href="#/library">ดูสื่อทั้งหมด</a></div>
      )}
    </section>
  );
}
