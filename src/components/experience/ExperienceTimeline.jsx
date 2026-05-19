import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/experience';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function ExperienceTimeline() {
  const lineRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !lineRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" className="section section--experience">
      <div className="section-inner">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Industry, research, and teaching.</p>

        <div className="timeline">
          <div className="timeline-line" ref={lineRef} aria-hidden="true" />
          {experience.map((item, i) => (
            <article
              key={item.id}
              className={`timeline-item reveal ${i === 0 ? 'timeline-item--featured' : ''}`}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <h3>{item.title}</h3>
                  <span className="card-org">{item.org}</span>
                  <span className="card-period">{item.period}</span>
                  {item.highlight && <span className="card-badge">{item.highlight}</span>}
                </div>
                <ul>
                  {item.bullets.map((b) => (
                    <li key={b.slice(0, 48)}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
