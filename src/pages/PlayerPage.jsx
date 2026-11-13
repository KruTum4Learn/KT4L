import { useRef } from 'react';
import { SUBJECTS } from '../data/media.js';
import Icon from '../components/Icon.jsx';
import { to, asset } from '../lib/router.js';

export default function PlayerPage({ item }) {
  const box = useRef(null);
  if (!item || item.status !== 'ready') {
    return (
      <div className="empty-state">
        <span className="empty-icon"><Icon name="search" /></span>
        <h1>ไม่พบสื่อนี้</h1>
        <p>สื่ออาจถูกย้ายหรือยังจัดทำไม่เสร็จ ลองเลือกจากคลังสื่อดูนะ</p>
        <a className="btn btn-primary" href={to.library()}>ไปที่คลังสื่อ</a>
      </div>
    );
  }
  const subj = SUBJECTS[item.subject] || SUBJECTS.other;
  const Comp = item.component;
  const full = () => box.current?.requestFullscreen?.().catch(() => {});
  // iPhone ไม่รองรับเต็มจอกับกล่องทั่วไป จึงซ่อนปุ่มเมื่อใช้ไม่ได้
  const canFull = typeof document !== 'undefined' && document.fullscreenEnabled;

  return (
    <section className="player" aria-labelledby="player-title">
      <div className="player-head">
        <a className="btn btn-secondary btn-back" href={to.library(item.subject)}>
          <Icon name="arrow-left" /> <span>กลับ</span>
        </a>
        <div className="player-title">
          <span className={`badge badge-subject subj-${subj.color}`}>{subj.name} · {item.grade}</span>
          <h1 id="player-title">{item.title}</h1>
        </div>
        <div className="player-actions">
          {item.download && (
            <a className="btn btn-secondary" href={asset(item.download)} download>
              <Icon name="download" /> ดาวน์โหลด
            </a>
          )}
          {item.type === 'html' && (
            <a className="btn btn-secondary" href={asset(item.src)} target="_blank" rel="noreferrer">
              <Icon name="external" /> เปิดแท็บใหม่
            </a>
          )}
          {canFull && (
            <button type="button" className="btn btn-primary" onClick={full}>
              <Icon name="maximize" /> เต็มจอ
            </button>
          )}
        </div>
      </div>
      <div className="stage" ref={box}>
        {item.type === 'html'
          ? <iframe src={asset(item.src)} title={item.title} allow="autoplay; fullscreen" />
          : <div className="react-stage"><Comp /></div>}
      </div>
    </section>
  );
}
