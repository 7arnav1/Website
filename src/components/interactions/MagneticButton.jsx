import { useRef } from 'react';

export default function MagneticButton({ children, className = '', href, onClick, ...props }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const Tag = href ? 'a' : 'button';
  const extra = href ? { href } : { type: 'button', onClick };

  return (
    <Tag
      ref={ref}
      className={`btn magnetic ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...extra}
      {...props}
    >
      {children}
    </Tag>
  );
}
