import { useMemo, useState } from 'react';
import { sfx, setMuted, isMuted } from '../../lib/sound.js';

// ตัวอย่างสื่อที่เขียนด้วย React ล้วน: ดูภาพ ฟังเสียง เลือกคำศัพท์
const WORDS = [
  { word: 'pencil', th: 'ดินสอ', pic: '✏️' },
  { word: 'book', th: 'หนังสือ', pic: '📖' },
  { word: 'ruler', th: 'ไม้บรรทัด', pic: '📏' },
  { word: 'bag', th: 'กระเป๋า', pic: '🎒' },
  { word: 'scissors', th: 'กรรไกร', pic: '✂️' },
  { word: 'clock', th: 'นาฬิกา', pic: '⏰' },
  { word: 'chair', th: 'เก้าอี้', pic: '🪑' },
  { word: 'computer', th: 'คอมพิวเตอร์', pic: '💻' },
  { word: 'crayon', th: 'สีเทียน', pic: '🖍️' },
  { word: 'paper', th: 'กระดาษ', pic: '📄' },
];

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

function makeRound() {
  return shuffle(WORDS).map((q) => ({
    ...q,
    choices: shuffle([q, ...shuffle(WORDS.filter((w) => w !== q)).slice(0, 3)]).map((c) => c.word),
  }));
}

function say(text) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.85;
    speechSynthesis.speak(u);
  } catch { /* เครื่องไม่รองรับเสียงอ่าน */ }
}

export default function ClassroomWords() {
  const [round, setRound] = useState(makeRound);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [muted, setM] = useState(isMuted());
  const toggleMute = () => { setM(!muted); setMuted(!muted); };
  const q = round[i];
  const done = i >= round.length;

  const choose = (w) => {
    if (picked) return;
    setPicked(w);
    if (w === q.word) { setScore((s) => s + 1); sfx.correct(); say(q.word); }
    else sfx.wrong();
  };
  const next = () => { sfx.pop(); setPicked(null); setI(i + 1); if (i + 1 >= round.length) sfx.tada(); };
  const restart = () => { setRound(makeRound()); setI(0); setScore(0); setPicked(null); };

  const progress = useMemo(() => Math.round((Math.min(i, round.length) / round.length) * 100), [i, round.length]);

  if (done) {
    return (
      <div className="game done">
        <div className="big">{score}/{round.length}</div>
        <p>{score === round.length ? 'Excellent! ถูกทุกข้อ' : score >= 7 ? 'Great job! เก่งมาก' : 'Good try! ลองอีกครั้งนะ'}</p>
        <button className="button button-primary" onClick={restart}>Play again</button>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-top">
        <span className="pill">ข้อ {i + 1} / {round.length}</span>
        <div className="meter"><i style={{ width: progress + '%' }} /></div>
        <span className="pill">⭐ {score}</span>
        <button className="pill" onClick={toggleMute} aria-pressed={muted}>{muted ? '🔇 ปิดเสียง' : '🔊 เสียง'}</button>
      </div>
      <div className="game-q">
        <div className="pic" aria-label={q.th}>{q.pic}</div>
        <div>
          <h2>What is this?</h2>
          <button className="button button-secondary" onClick={() => say(q.word)}>🔊 ฟังเสียง</button>
        </div>
      </div>
      <div className="choices">
        {q.choices.map((w) => {
          const state = !picked ? '' : w === q.word ? ' right' : w === picked ? ' wrong' : '';
          return (
            <button key={w} className={'choice' + state} onClick={() => choose(w)}>{w}</button>
          );
        })}
      </div>
      {picked && (
        <div className="feedback-bar">
          <span><b>{q.word}</b> แปลว่า {q.th}</span>
          <button className="button button-primary" onClick={next}>Next ▶</button>
        </div>
      )}
    </div>
  );
}
