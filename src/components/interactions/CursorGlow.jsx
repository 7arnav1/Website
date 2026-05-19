import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    if (reduced || mobile) return undefined;

    const el = glowRef.current;
    if (!el) return undefined;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, mobile]);

  if (reduced || mobile) return null;

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
