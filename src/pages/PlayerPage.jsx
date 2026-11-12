import { useRef } from 'react';
import { SUBJECTS } from '../data/media.js';

export default function PlayerPage({ item }) {
  const box = useRef(null);
  if (!item || item.status !== 'ready') {
    return (
      <div className="wrap">
        <div className="empty">ไม่พบสื่อนี้ <a href="#/library">กลับไปคลังสื่อ</a></div>
      </div>
    );
  }
  const subj = SUBJECTS[item.subject] || SUBJECTS.other;
  const Comp = item.component;
  const full = () => box.current?.requestFullscreen?.().catch(() => {});

  return (
    <div className="wrap player">
      <div className="player-bar">
        <a className="btn ghost" href={'#/library/' + item.subject}>← กลับ</a>
        <div className="player-title">
          <small>{subj.icon} {subj.name} · {item.grade}</small>
          <h1>{item.title}</h1>
        </div>
        <button className="btn ghost" onClick={full}>⛶ เต็มจอ</button>
      </div>
      <div className="stage" ref={box}>
        {item.type === 'html' ? (
          <iframe src={item.src} title={item.title} allow="autoplay; fullscreen" />
        ) : (
          <div className="react-stage"><Comp /></div>
        )}
      </div>
    </div>
  );
}
