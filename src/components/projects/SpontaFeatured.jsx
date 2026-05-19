import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { flagshipProject } from '../../data/projects';
import MagneticButton from '../interactions/MagneticButton';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function SpontaFeatured() {
  const blockRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const images = flagshipProject.images;

  useEffect(() => {
    if (reduced || paused || images.length < 2) return undefined;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [reduced, paused, images.length]);

  useEffect(() => {
    if (reduced || !blockRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.sponta-metric', {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.5,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: blockRef.current,
          start: 'top 80%',
        },
      });
    }, blockRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <article className="sponta-featured reveal" ref={blockRef} aria-label="Featured project SPONTA">
      <div className="sponta-featured-content">
        <span className="sponta-flagship-badge">Flagship project</span>
        <h3 className="sponta-featured-title">{flagshipProject.title}</h3>
        <p className="sponta-featured-role">
          {flagshipProject.role} · {flagshipProject.period}
        </p>
        <p className="sponta-featured-desc">{flagshipProject.description}</p>
        <div className="sponta-metrics">
          {flagshipProject.metrics.map((m) => (
            <span key={m} className="metric-chip sponta-metric">
              {m}
            </span>
          ))}
        </div>
        <div className="card-tags">
          {flagshipProject.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-actions">
          <MagneticButton
            href={flagshipProject.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GitHub →
          </MagneticButton>
          <MagneticButton
            href={flagshipProject.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Watch demo →
          </MagneticButton>
        </div>
      </div>

      <div
        className="phone-mockup"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="phone-frame">
          <div className="phone-notch" aria-hidden="true" />
          <div className="phone-screen">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`SPONTA app screenshot ${i + 1}`}
                className={`phone-slide ${i === slide ? 'phone-slide--active' : ''}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <div className="phone-dots" aria-hidden="true">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`phone-dot ${i === slide ? 'phone-dot--active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Show screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
