import { useState } from 'react';
import { setMuted } from '../lib/sound.js';

const LINKS = [
  { id: 'home', href: '#/', label: 'หน้าหลัก', icon: '🏠', tone: 'purple' },
  { id: 'library', href: '#/library', label: 'คลังสื่อ', icon: '📚', tone: 'sky' },
];

export default function Sidebar({ active }) {
  const [muted, setM] = useState(false);
  const current = active === 'media' ? 'library' : active || 'home';
  return (
    <nav className="side" aria-label="เมนูหลัก">
      <a className="brand" href="#/">
        <span className="logo">🎓</span>
        <span>
          <b>ห้องเรียนครูตั้ม</b>
          <small>สื่อการสอนประถมศึกษา</small>
        </span>
      </a>
      {LINKS.map((l) => (
        <a key={l.id} href={l.href} className={'nav' + (current === l.id ? ' on' : '')}>
          <span className={'ic t-' + l.tone}>{l.icon}</span>
          {l.label}
        </a>
      ))}
      <div className="grow" />
      <button
        className="toggle"
        aria-pressed={muted}
        onClick={() => { setM(!muted); setMuted(!muted); }}
      >
        {muted ? '🔇 เสียงเกม: ปิด' : '🔊 เสียงเกม: เปิด'}
      </button>
    </nav>
  );
}
