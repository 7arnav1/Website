import { useEffect, useRef, useState } from 'react';

function animateValue(from, to, duration, decimals, onUpdate, onComplete) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - t) ** 3;
    const val = from + (to - from) * eased;
    onUpdate(decimals > 0 ? val.toFixed(decimals) : Math.round(val));
    if (t < 1) requestAnimationFrame(step);
    else onComplete?.();
  };
  requestAnimationFrame(step);
}

export default function StatCounter({ value, label, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(decimals > 0 ? '0.0' : '0');
  const [started, setStarted] = useState(false);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animateValue(0, value, 1400, decimals, setDisplay, () => setPopped(true));
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, started]);

  return (
    <div className={`stat-item ${popped ? 'stat-item--pop' : ''}`} ref={ref}>
      <span className="stat-value">
        {display}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
