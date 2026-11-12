import { SUBJECTS } from '../data/media.js';

export default function MediaCard({ item }) {
  const subj = SUBJECTS[item.subject] || SUBJECTS.other;
  const ready = item.status === 'ready';
  const body = (
    <>
      <div className={'cover t-' + subj.color}>
        <span className="cover-icon">{item.icon}</span>
        {item.grade && <span className="grade">{item.grade}</span>}
      </div>
      <div className="card-body">
        <span className="subject">{subj.icon} {subj.name}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="tags">
          {item.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
      <div className="card-foot">
        {ready ? <span className="go">เปิดสื่อ →</span> : <span className="soon">กำลังจัดทำ</span>}
      </div>
    </>
  );
  return ready
    ? <a className="card" href={'#/media/' + item.id}>{body}</a>
    : <div className="card disabled" aria-disabled="true">{body}</div>;
}
