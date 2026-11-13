import Icon from './Icon.jsx';

const LINKS = [
  { id: 'home', href: '#/', label: 'หน้าหลัก', icon: 'home' },
  { id: 'library', href: '#/library', label: 'คลังสื่อ', icon: 'grid' },
  { id: 'science', href: '#/library/science', label: 'วิทยาศาสตร์', icon: 'flask' },
  { id: 'english', href: '#/library/english', label: 'ภาษาอังกฤษ', icon: 'languages' },
];

export default function Topbar({ section, param }) {
  let current = section || 'home';
  if (section === 'library' && (param === 'science' || param === 'english')) current = param;
  if (section === 'media') current = 'library';

  const links = (cls) =>
    LINKS.map((l) => (
      <a key={l.id} href={l.href} className={cls} aria-current={current === l.id ? 'page' : undefined}>
        <Icon name={l.icon} />
        <span>{l.label}</span>
      </a>
    ));

  return (
    <>
      <a className="skip-link" href="#main">ข้ามไปที่เนื้อหา</a>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#/" aria-label="ห้องเรียนครูตั้ม หน้าหลัก">
            <span className="brand-mark" aria-hidden="true">ต</span>
            <span className="brand-text">
              <strong>ห้องเรียนครูตั้ม</strong>
              <small>KruTum4Learn · สื่อการสอนประถม</small>
            </span>
          </a>
          <nav className="topnav" aria-label="เมนูหลัก">{links('topnav-link')}</nav>
        </div>
      </header>

      {/* มือถือ: เมนูด้านล่าง กดง่ายด้วยนิ้วโป้ง (ซ่อนในหน้าเล่นสื่อเพื่อให้จอกว้าง) */}
      {section !== 'media' && (
        <nav className="bottomnav" aria-label="เมนูหลัก (มือถือ)">{links('bottomnav-link')}</nav>
      )}
    </>
  );
}
