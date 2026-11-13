// ระบบเปลี่ยนหน้าแบบลิงก์ปกติ (ไม่มี #)
//   /                     หน้าแรก
//   /library              คลังสื่อทั้งหมด
//   /library/<วิชา>       คลังสื่อตามวิชา
//   /learn/<id>           เปิดสื่อ
// ลิงก์แบบเก่า (#/media/<id>, #/library/...) ยังใช้ได้ ระบบจะพาไปลิงก์ใหม่ให้เอง
//
// หมายเหตุ: ใช้ /learn/ ไม่ใช้ /media/ เพราะ /media/ คือโฟลเดอร์ไฟล์สื่อใน public/
import { useEffect, useState } from 'react';

export const to = {
  home: () => '/',
  library: (subject) => (subject ? '/library/' + subject : '/library'),
  learn: (id) => '/learn/' + id,
};

// แปลง path ไฟล์ใน media.js (เช่น 'media/x/index.html') ให้เป็น path เต็มจากรากเว็บ
export const asset = (p) => (!p || /^(https?:)?\/\//.test(p) || p.startsWith('/') ? p : '/' + p.replace(/^\.\//, ''));

// แปลงลิงก์ #/ แบบเก่าเป็น path ใหม่
function fromLegacyHash(hash) {
  const h = hash.replace(/^#\/?/, '');
  if (!h) return null;
  const [section, param] = h.split('/');
  if (section === 'media' && param) return to.learn(param);
  if (section === 'library') return to.library(param);
  return to.home();
}

function parse(pathname) {
  const [section = '', param] = pathname.replace(/^\/+|\/+$/g, '').split('/').map(decodeURIComponent);
  if (section === 'learn') return { section: 'media', param };
  if (section === 'library') return { section: 'library', param };
  if (section === '') return { section: 'home' };
  return { section: 'notfound', param: section };
}

export function navigate(path, { replace = false } = {}) {
  if (path === window.location.pathname) return;
  window.history[replace ? 'replaceState' : 'pushState'](null, '', path);
  window.dispatchEvent(new Event('kt4l:navigate'));
}

export function useRoute() {
  const [route, setRoute] = useState(() => {
    const legacy = fromLegacyHash(window.location.hash);
    if (legacy) window.history.replaceState(null, '', legacy);
    return parse(window.location.pathname);
  });

  useEffect(() => {
    const update = () => {
      setRoute(parse(window.location.pathname));
      window.scrollTo(0, 0);
      // ย้ายโฟกัสไปเนื้อหาใหม่ ให้โปรแกรมอ่านหน้าจออ่านต่อได้
      requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
    };
    // คลิกลิงก์ภายในเว็บ: เปลี่ยนหน้าโดยไม่โหลดใหม่
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!/^\/(learn|library)?(\/|$)/.test(url.pathname)) return; // ไฟล์สื่อ/ไฟล์อื่น ให้เบราว์เซอร์จัดการ
      e.preventDefault();
      navigate(url.pathname);
    };
    const onHash = () => {
      const legacy = fromLegacyHash(window.location.hash);
      if (legacy) navigate(legacy, { replace: true });
    };
    window.addEventListener('popstate', update);
    window.addEventListener('kt4l:navigate', update);
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('kt4l:navigate', update);
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return route;
}
