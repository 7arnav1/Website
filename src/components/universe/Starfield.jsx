import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function mulberry32(seed) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildStars(count, seed) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${rand() * 100}%`,
    top: `${rand() * 100}%`,
    size: 1 + rand() * 2,
    delay: `${rand() * 3}s`,
    duration: `${1.1 + rand() * 1.6}s`,
    opacity: 0.4 + rand() * 0.5,
    tint: rand() < 0.1 ? 'purple' : rand() < 0.08 ? 'blue' : 'white',
  }));
}

export default function Starfield() {
  const reduced = usePrefersReducedMotion();
  const stars = useMemo(() => buildStars(120, 77), []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={`starfield ${reduced ? 'starfield--calm' : ''}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className={`starfield-star starfield-star--${s.tint}`}
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            animationDuration: s.duration,
            '--star-opacity': s.opacity,
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
