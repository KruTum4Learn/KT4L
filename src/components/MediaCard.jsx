import { SUBJECTS } from '../data/media.js';

export default function MediaCard({ item }) {
  const subj = SUBJECTS[item.subject] || SUBJECTS.other;
  const ready = item.status === 'ready';
  const body = (
    <>
      <span className="stage-card-top">
        <span className="stage-icon">{item.icon}</span>
        {item.grade && <span className="grade-pill">{item.grade}</span>}
      </span>
      <span className="stage-number">{subj.name}</span>
      <strong>{item.title}</strong>
      <span className="stage-description">{item.description}</span>
      {item.tags.length > 0 && (
        <span className="tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</span>
      )}
      <span className="card-link">
        {ready ? <>เปิดสื่อ <span aria-hidden="true">→</span></> : 'กำลังจัดทำ'}
      </span>
    </>
  );
  const cls = `stage-card ${subj.color}`;
  return ready
    ? <a className={cls} href={'#/media/' + item.id}>{body}</a>
    : <div className={cls + ' disabled'} aria-disabled="true">{body}</div>;
}
