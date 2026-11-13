import { useRef } from 'react';
import { SUBJECTS } from '../data/media.js';

export default function PlayerPage({ item }) {
  const box = useRef(null);
  if (!item || item.status !== 'ready') {
    return <div className="empty">ไม่พบสื่อนี้ <a href="#/library">กลับไปคลังสื่อ</a></div>;
  }
  const subj = SUBJECTS[item.subject] || SUBJECTS.other;
  const Comp = item.component;
  const full = () => box.current?.requestFullscreen?.().catch(() => {});

  return (
    <section className="activity-panel player">
      <div className="activity-heading">
        <a className="close-button" href={'#/library/' + item.subject} aria-label="กลับ">←</a>
        <div className="player-title">
          <span className="section-kicker">{subj.name} · {item.grade}</span>
          <h2>{item.title}</h2>
        </div>
        <div className="player-actions">
          {item.type === 'html' && (
            <a className="button button-secondary" href={item.src} target="_blank" rel="noreferrer">เปิดเต็มหน้า ↗</a>
          )}
          <button className="button button-secondary" onClick={full}>⛶ เต็มจอ</button>
        </div>
      </div>
      <div className="stage" ref={box}>
        {item.type === 'html'
          ? <iframe src={item.src} title={item.title} allow="autoplay; fullscreen" />
          : <div className="react-stage"><Comp /></div>}
      </div>
    </section>
  );
}
