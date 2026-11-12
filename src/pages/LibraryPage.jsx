import { MEDIA, SUBJECTS } from '../data/media.js';
import MediaCard from '../components/MediaCard.jsx';

export default function LibraryPage({ subject }) {
  const list = subject ? MEDIA.filter((m) => m.subject === subject) : MEDIA;
  return (
    <div className="wrap">
      <div>
        <p className="eyebrow">คลังสื่อ</p>
        <h1 className="page-title">{subject ? SUBJECTS[subject]?.name : 'สื่อทั้งหมด'}</h1>
      </div>
      <div className="chips">
        <a className={'chip' + (!subject ? ' on' : '')} href="#/library">ทั้งหมด</a>
        {Object.entries(SUBJECTS).map(([k, s]) => (
          <a key={k} className={'chip' + (subject === k ? ' on' : '')} href={'#/library/' + k}>
            {s.icon} {s.name}
          </a>
        ))}
      </div>
      {list.length ? (
        <div className="grid">{list.map((m) => <MediaCard key={m.id} item={m} />)}</div>
      ) : (
        <div className="empty">ยังไม่มีสื่อในวิชานี้ เพิ่มได้ที่ไฟล์ src/data/media.js</div>
      )}
    </div>
  );
}
