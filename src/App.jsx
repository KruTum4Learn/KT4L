import { useEffect } from 'react';
import Topbar from './components/Topbar.jsx';
import Icon from './components/Icon.jsx';
import HomePage from './pages/HomePage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';
import { MEDIA, SUBJECTS } from './data/media.js';
import { useRoute, to } from './lib/router.js';

const SITE = 'ห้องเรียนครูตั้ม · KT4L';

export default function App() {
  const { section, param } = useRoute();
  const item = section === 'media' ? MEDIA.find((m) => m.id === param) : null;

  // ชื่อแท็บเบราว์เซอร์ตามหน้า
  useEffect(() => {
    let title = SITE;
    if (section === 'library') title = (param ? SUBJECTS[param]?.name || 'คลังสื่อ' : 'คลังสื่อทั้งหมด') + ' · ' + SITE;
    if (item) title = item.title + ' · ' + SITE;
    document.title = title;
  }, [section, param, item]);

  let page;
  if (section === 'library') page = <LibraryPage subject={param} />;
  else if (section === 'media') page = <PlayerPage item={item} />;
  else if (section === 'notfound') page = (
    <div className="empty-state">
      <span className="empty-icon"><Icon name="search" /></span>
      <h1>ไม่พบหน้านี้</h1>
      <p>ลิงก์อาจพิมพ์ผิด หรือหน้านี้ถูกย้ายไปแล้ว</p>
      <a className="btn btn-primary" href={to.home()}>กลับหน้าแรก</a>
    </div>
  );
  else page = <HomePage />;

  return (
    <div className="app-shell" data-page={section}>
      <Topbar section={section} param={param} />
      <main id="main" tabIndex={-1} className={'page-content' + (section === 'media' ? ' wide' : '')}>
        {page}
      </main>
      <footer className={'footer' + (section === 'media' ? ' wide' : '')}>
        <strong>ห้องเรียนครูตั้ม · KT4L</strong>
        <span>เรียนรู้ด้วยความสงสัย แล้วค้นพบคำตอบด้วยตัวเอง</span>
      </footer>
    </div>
  );
}
