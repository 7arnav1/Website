import { useEffect } from 'react';

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

function showToast(message) {
  const el = document.createElement('div');
  el.className = 'easter-toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

export default function EasterEgg() {
  useEffect(() => {
    let logoClicks = 0;
    let logoTimer;

    const onKey = (e) => {
      if (e.key !== '?' || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      window.open(RICKROLL_URL, '_blank', 'noopener,noreferrer');
    };

    const onLogoClick = (e) => {
      const logo = e.target.closest('.nav-logo');
      if (!logo) return;
      logoClicks += 1;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(() => {
        logoClicks = 0;
      }, 1200);
      if (logoClicks >= 5) {
        logoClicks = 0;
        showToast('Logo spam unlocked. Respect.');
      }
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onLogoClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onLogoClick);
      clearTimeout(logoTimer);
    };
  }, []);

  return null;
}
