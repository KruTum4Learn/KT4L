import { SUBJECTS } from '../data/media.js';
import Icon from './Icon.jsx';
import { SUBJECT_ICON, KIND_ICON, kindOf } from '../lib/mediaView.js';

function Cover({ item, subj }) {
  if (item.thumbnail) {
    return (
      <img className="card-cover-img" src={item.thumbnail} alt="" loading="lazy" decoding="async" width="640" height="360" />
    );
  }
  // ไม่มีภาพปก: วาดปกจากสีวิชา + ไอคอน
  return (
    <span className="card-cover-art" aria-hidden="true">
      <span className="cover-badge"><Icon name={SUBJECT_ICON[item.subject] || 'star'} /></span>
      <span className="cover-title">{subj.name}</span>
    </span>
  );
}

export default function MediaCard({ item }) {
  const subj = SUBJECTS[item.subject] || SUBJECTS.other;
  const ready = item.status === 'ready';
  const kind = kindOf(item);
  const href = '#/media/' + item.id;

  return (
    <article className={`media-card subj-${subj.color}` + (ready ? '' : ' is-soon')}>
      {ready ? (
        <a className="card-cover" href={href} tabIndex={-1} aria-hidden="true"><Cover item={item} subj={subj} /></a>
      ) : (
        <span className="card-cover"><Cover item={item} subj={subj} /></span>
      )}

      <div className="card-body">
        <div className="card-meta">
          {item.grade && <span className="badge badge-grade">{item.grade}</span>}
          <span className="badge badge-subject">{subj.name}</span>
          <span className="badge badge-kind">
            <Icon name={KIND_ICON[kind] || 'book'} /> {kind}
          </span>
        </div>

        <h3 className="card-title">
          {ready ? <a href={href}>{item.title}</a> : item.title}
        </h3>
        <p className="card-desc">{item.description}</p>

        {item.tags.length > 0 && (
          <ul className="card-tags" aria-label="แท็ก">
            {item.tags.map((t) => <li key={t}>#{t}</li>)}
          </ul>
        )}

        <div className="card-actions">
          {ready ? (
            <>
              <a className="btn btn-primary" href={href}>
                <Icon name="play" /> เปิดสื่อ
              </a>
              {item.download && (
                <a className="btn btn-secondary" href={item.download} download>
                  <Icon name="download" /> ดาวน์โหลด
                </a>
              )}
            </>
          ) : (
            <span className="soon-note">กำลังจัดทำ เร็วๆ นี้</span>
          )}
        </div>
      </div>
    </article>
  );
}
