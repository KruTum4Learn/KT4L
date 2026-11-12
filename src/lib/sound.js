// เสียงเอฟเฟกต์สังเคราะห์ ใช้ได้กับทุกสื่อที่เป็น React
let ctx = null;
let muted = false;
export const setMuted = (m) => { muted = m; };
export const isMuted = () => muted;

function ac() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* no audio */ }
  }
  return ctx;
}
function tone(freq, dur, type = 'sine', vol = 0.18, delay = 0) {
  const a = ac();
  if (!a || muted) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}
export const sfx = {
  correct: () => { tone(660, 0.14, 'triangle'); tone(990, 0.25, 'triangle', 0.18, 0.12); },
  wrong: () => tone(200, 0.3, 'sawtooth', 0.07),
  pop: () => tone(600, 0.08),
  tada: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.3, 'triangle', 0.14, i * 0.11)),
};
