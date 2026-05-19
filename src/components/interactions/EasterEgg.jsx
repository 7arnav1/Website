import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function burstConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-burst';
  const colors = ['#b24bf3', '#4da6ff', '#50e3a4', '#ff9f43', '#fff'];

  for (let i = 0; i < 48; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${-10 + Math.random() * 20}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
    container.appendChild(piece);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 2200);
}

function showToast(message) {
  const el = document.createElement('div');
  el.className = 'easter-toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

export default function EasterEgg() {
  const [toast, setToast] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let logoClicks = 0;
    let logoTimer;

    const onKey = (e) => {
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        setToast(true);
        document.body.classList.add('easter-active');
        if (!reduced) burstConfetti();
        if (!reduced) {
          setTimeout(() => document.body.classList.remove('easter-active'), 2000);
        }
        setTimeout(() => setToast(false), 2800);
      }
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
        if (!reduced) burstConfetti();
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
  }, [reduced]);

  if (!toast) return null;

  return (
    <div className="easter-toast" role="status">
      You found the secret. Nice.
    </div>
  );
}
