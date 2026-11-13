import { useId, useMemo, useState } from 'react';
import { MEDIA, SUBJECTS } from '../data/media.js';
import MediaCard from './MediaCard.jsx';
import Icon from './Icon.jsx';
import { to, navigate } from '../lib/router.js';
import { SUBJECT_ICON, KIND_ICON, kindOf, matchesQuery, uniqueSorted } from '../lib/mediaView.js';

// ช่องค้นหา + ตัวกรอง (วิชา / ระดับชั้น / ประเภทสื่อ) + ผลลัพธ์
// subject มาจากลิงก์ (/library/<วิชา>) เมื่อใช้ในหน้าคลังสื่อ
// ส่วนหน้าแรกจะกรองวิชาในหน้าเดียวกันโดยไม่เปลี่ยนลิงก์
export default function MediaBrowser({ routeSubject, linkSubjects = false, searchLabel = 'ค้นหาสื่อ' }) {
  const ready = MEDIA.filter((m) => m.status === 'ready');
  const [q, setQ] = useState('');
  const [localSubject, setLocalSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [kind, setKind] = useState('');
  const subject = linkSubjects ? routeSubject || '' : localSubject;
  const searchId = useId();

  const subjects = Object.entries(SUBJECTS).filter(([k]) => ready.some((m) => m.subject === k));
  const grades = uniqueSorted(ready.map((m) => m.grade));
  const kinds = uniqueSorted(ready.map(kindOf));

  const list = useMemo(
    () =>
      ready.filter(
        (m) =>
          (!subject || m.subject === subject) &&
          (!grade || m.grade === grade) &&
          (!kind || kindOf(m) === kind) &&
          matchesQuery(m, SUBJECTS[m.subject]?.name, q.trim()),
      ),
    [subject, grade, kind, q],
  );

  const filtered = q || grade || kind || subject;
  const clearAll = () => {
    setQ(''); setGrade(''); setKind(''); setLocalSubject('');
    if (linkSubjects && routeSubject) navigate(to.library());
  };

  const countIn = (fn) => ready.filter(fn).length;

  return (
    <div className="browser">
      <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor={searchId}>{searchLabel}</label>
        <Icon name="search" className="search-icon" />
        <input
          id={searchId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหา เช่น แสง, คำศัพท์"
          autoComplete="off"
          enterKeyHint="search"
        />
        {q && (
          <button type="button" className="search-clear" onClick={() => setQ('')} aria-label="ล้างคำค้นหา">
            <Icon name="x" />
          </button>
        )}
      </form>

      <div className="filters">
        <FilterGroup label="วิชา">
          {linkSubjects ? (
            <>
              <a className="chip" aria-current={!subject ? 'true' : undefined} href={to.library()}>ทั้งหมด</a>
              {subjects.map(([k, s]) => (
                <a key={k} className={`chip subj-${s.color}`} aria-current={subject === k ? 'true' : undefined} href={to.library(k)}>
                  <Icon name={SUBJECT_ICON[k]} /> {s.name}
                </a>
              ))}
            </>
          ) : (
            <>
              <Chip on={!subject} onClick={() => setLocalSubject('')}>ทั้งหมด</Chip>
              {subjects.map(([k, s]) => (
                <Chip key={k} className={`subj-${s.color}`} on={subject === k} onClick={() => setLocalSubject(k)}>
                  <Icon name={SUBJECT_ICON[k]} /> {s.name}
                  <span className="chip-count">{countIn((m) => m.subject === k)}</span>
                </Chip>
              ))}
            </>
          )}
        </FilterGroup>

        {grades.length > 0 && (
          <FilterGroup label="ระดับชั้น">
            <Chip on={!grade} onClick={() => setGrade('')}>ทุกชั้น</Chip>
            {grades.map((g) => (
              <Chip key={g} on={grade === g} onClick={() => setGrade(g)}>{g}</Chip>
            ))}
          </FilterGroup>
        )}

        {kinds.length > 0 && (
          <FilterGroup label="ประเภทสื่อ">
            <Chip on={!kind} onClick={() => setKind('')}>ทุกประเภท</Chip>
            {kinds.map((k) => (
              <Chip key={k} on={kind === k} onClick={() => setKind(k)}>
                <Icon name={KIND_ICON[k] || 'book'} /> {k}
              </Chip>
            ))}
          </FilterGroup>
        )}
      </div>

      <div className="results-bar">
        <p className="results-count" aria-live="polite">
          พบสื่อ <strong>{list.length}</strong> ชิ้น
        </p>
        {filtered && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={clearAll}>
            <Icon name="x" /> ล้างตัวกรอง
          </button>
        )}
      </div>

      {list.length ? (
        <div className="card-grid">
          {list.map((m) => <MediaCard key={m.id} item={m} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="search" /></span>
          <h3>ยังไม่พบสื่อที่ตรงกัน</h3>
          <p>ลองใช้คำค้นหาอื่น หรือล้างตัวกรองเพื่อดูสื่อทั้งหมด</p>
          <button type="button" className="btn btn-primary" onClick={clearAll}>ดูสื่อทั้งหมด</button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div className="filter-group" role="group" aria-label={label}>
      <span className="filter-label">{label}</span>
      <div className="chip-row">{children}</div>
    </div>
  );
}

function Chip({ on, onClick, className = '', children }) {
  return (
    <button type="button" className={'chip ' + className} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}
