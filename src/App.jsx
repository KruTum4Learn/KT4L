import { useEffect, useState } from 'react';
import Topbar from './components/Topbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';
import { MEDIA } from './data/media.js';

// ระบบเปลี่ยนหน้าแบบง่าย ใช้ #hash ในลิงก์ เช่น #/media/light-medium
function useHashRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '') || 'home';
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  const [section, param] = route.split('/');

  let page;
  if (section === 'library') page = <LibraryPage subject={param} />;
  else if (section === 'media') page = <PlayerPage item={MEDIA.find((m) => m.id === param)} />;
  else page = <HomePage />;

  return (
    <div className="app-shell" data-page={section || 'home'}>
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
