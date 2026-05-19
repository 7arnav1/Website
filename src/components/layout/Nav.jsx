import { useEffect, useState } from 'react';
import { site } from '../../data/site';
import { useUniverse } from '../../context/UniverseContext';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');
  const { quality, setQuality } = useUniverse();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleQuality = () => setQuality((q) => (q === 'high' ? 'low' : 'high'));

  return (
    <header className={`nav ${visible ? 'nav--visible' : ''}`}>
      <nav className="nav-inner" aria-label="Main">
        <a href="#top" className="nav-logo">
          {site.name.split(' ')[0]}
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? 'nav-link--active' : ''}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="nav-quality"
              onClick={toggleQuality}
              title="Toggle graphics quality"
              aria-label={`Graphics quality: ${quality}`}
            >
              {quality === 'high' ? 'HD' : 'Lite'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
