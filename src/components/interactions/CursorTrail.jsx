import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

const DOT_COUNT = 8;

export default function CursorTrail() {
  const dotsRef = useRef([]);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    if (reduced || mobile) return undefined;

    const positions = Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 }));
    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      let x = mouseX;
      let y = mouseY;
      positions.forEach((pos, i) => {
        const dot = dotsRef.current[i];
        if (!dot) return;
        const speed = 0.22 - i * 0.02;
        pos.x += (x - pos.x) * speed;
        pos.y += (y - pos.y) * speed;
        const scale = 1 - i * 0.1;
        const opacity = 0.5 - i * 0.055;
        dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${scale})`;
        dot.style.opacity = String(Math.max(0, opacity));
        x = pos.x;
        y = pos.y;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, mobile]);

  if (reduced || mobile) return null;

  return (
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="cursor-trail-dot"
        />
      ))}
    </div>
  );
}
