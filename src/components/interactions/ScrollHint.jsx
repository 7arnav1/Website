import { useEffect, useState } from 'react';

export default function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(window.scrollY > 80);
    window.addEventListener('scroll', hide, { passive: true });
    return () => window.removeEventListener('scroll', hide);
  }, []);

  if (hidden) return null;

  return (
    <div className="scroll-hint" aria-hidden="true">
      <span>Scroll to explore</span>
      <span className="scroll-hint-orbs">Click the glowing planets → projects</span>
      <span className="scroll-hint-chevron">↓</span>
    </div>
  );
}
