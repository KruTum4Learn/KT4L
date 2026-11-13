const LINKS = [
  { id: 'home', href: '#/', label: 'หน้าหลัก' },
  { id: 'library', href: '#/library', label: 'คลังสื่อ' },
  { id: 'science', href: '#/library/science', label: 'วิทยาศาสตร์' },
  { id: 'english', href: '#/library/english', label: 'ภาษาอังกฤษ' },
];

export default function Topbar({ section, param }) {
  let current = section || 'home';
  if (section === 'library' && (param === 'science' || param === 'english')) current = param;
  if (section === 'media') current = 'library';

  return (
    <header className="topbar">
      <a className="brand" href="#/" aria-label="หน้าหลัก">
        <span className="brand-mark">ต</span>
        <span>
          <strong>ห้องเรียนครูตั้ม</strong>
          <small>สื่อการสอนประถมศึกษา</small>
        </span>
      </a>
      <nav className="topnav" aria-label="เมนูหลัก">
        {LINKS.map((l) => (
          <a key={l.id} href={l.href} className={'nav-link' + (current === l.id ? ' active' : '')}>
            {l.label}
          </a>
        ))}
      </nav>
      <span className="student-badge">นักเรียนรู้ตัวน้อย</span>
    </header>
  );
}
