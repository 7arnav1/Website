import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import MagneticButton from '../interactions/MagneticButton';
import SpontaFeatured from './SpontaFeatured';
import { ProjectPlanetsRow } from './ProjectPlanets';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useUniverse } from '../../context/UniverseContext';

export default function ProjectShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const panelRefs = useRef({});
  const [activeId, setActiveId] = useState(projects[0]?.id ?? 'sponta');
  const reduced = usePrefersReducedMotion();
  const { registerFocusProject } = useUniverse();

  const scrollToProject = useCallback((id) => {
    const panel = panelRefs.current[id];
    if (!panel) return;
    panel.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
    setActiveId(id);
  }, [reduced]);

  useEffect(
    () => registerFocusProject(scrollToProject),
    [registerFocusProject, scrollToProject],
  );

  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const onScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = projects[0].id;
      let minDist = Infinity;
      projects.forEach((p) => {
        const el = panelRefs.current[p.id];
        if (!el) return;
        const elCenter = el.offsetLeft + el.clientWidth / 2;
        const dist = Math.abs(center - elCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = p.id;
        }
      });
      setActiveId(closest);
    };

    track.addEventListener('scroll', onScroll, { passive: true });

    const onKey = (e) => {
      if (!section.contains(document.activeElement) && document.activeElement !== document.body) return;
      const idx = projects.findIndex((p) => p.id === activeIdRef.current);
      if (e.key === 'ArrowRight' && idx < projects.length - 1) {
        e.preventDefault();
        scrollToProject(projects[idx + 1].id);
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        scrollToProject(projects[idx - 1].id);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [scrollToProject]);

  useEffect(() => {
    if (reduced || !trackRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-panel').forEach((panel, i) => {
        gsap.from(panel, {
          opacity: 0,
          x: 40,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="projects"
      className="section section--projects"
      ref={sectionRef}
      tabIndex={-1}
      aria-label="Projects"
    >
      <div className="section-inner">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Tap a planet or scroll the cards below.
        </p>
      </div>

      <ProjectPlanetsRow activeId={activeId} onSelect={scrollToProject} />

      <SpontaFeatured />

      <nav className="project-tabs" aria-label="Project navigation">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`project-tab ${activeId === p.id ? 'project-tab--active' : ''}`}
            style={{ '--tab-accent': p.accent }}
            onClick={() => scrollToProject(p.id)}
            aria-current={activeId === p.id ? 'true' : undefined}
          >
            {p.title}
          </button>
        ))}
      </nav>

      <div className="project-showcase-wrap">
        <div className="project-track" ref={trackRef} data-lenis-prevent>
          {projects.map((p, i) => (
            <article
              key={p.id}
              id={`project-panel-${p.id}`}
              ref={(el) => {
                panelRefs.current[p.id] = el;
              }}
              className="project-panel"
              style={{ '--panel-accent': p.accent }}
            >
              <span className="project-panel-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="project-panel-title">{p.title}</h3>
              <p className="project-panel-role">
                {p.role} · {p.period}
              </p>
              <p className="project-panel-desc">{p.description}</p>
              {p.demoVideo && (
                <div className="project-demo-video">
                  <video
                    src={p.demoVideo}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${p.title} demo video`}
                  />
                </div>
              )}
              <div className="project-metrics">
                {p.metrics.map((m) => (
                  <span key={m} className="metric-chip">
                    {m}
                  </span>
                ))}
              </div>
              <div className="card-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <MagneticButton
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  GitHub →
                </MagneticButton>
                {p.demo && (
                  <MagneticButton
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {p.id === 'sponta' || p.demoVideo ? 'Watch demo →' : 'Live demo →'}
                  </MagneticButton>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="project-scroll-hint">Drag sideways or use tabs ↑</p>
      </div>
    </section>
  );
}
