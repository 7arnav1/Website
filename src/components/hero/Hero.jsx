import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../../data/site';
import MagneticButton from '../interactions/MagneticButton';
import ScrollHint from '../interactions/ScrollHint';
import { HeroPlanets } from '../projects/ProjectPlanets';
import { useUniverse } from '../../context/UniverseContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function Hero() {
  const scrollRef = useRef(null);
  const stickyRef = useRef(null);
  const overlayRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { focusProject } = useUniverse();
  const [eyebrowIdx, setEyebrowIdx] = useState(0);

  const onPlanetClick = (id) => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => focusProject(id), 450);
  };

  useEffect(() => {
    if (reduced || site.heroEyebrows.length < 2) return undefined;
    const id = setInterval(() => {
      setEyebrowIdx((i) => (i + 1) % site.heroEyebrows.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 24, duration: 0.6 })
        .from('.hero-title-line', { opacity: 0, y: 48, duration: 0.8, stagger: 0.12 }, '-=0.3')
        .from('.hero-tagline', { opacity: 0, y: 24, duration: 0.6 }, '-=0.4')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.35')
        .from('.hero-cta .btn', { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, '-=0.3');

      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.96,
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, scrollRef);

    return () => ctx.revert();
  }, [reduced]);

  const [firstName, lastName] = site.name.split(' ');

  return (
    <div className="hero-scroll" ref={scrollRef} id="top">
      <div className="hero-sticky" ref={stickyRef}>
        <HeroPlanets onSelect={onPlanetClick} />
        <div className="hero-overlay" ref={overlayRef}>
          <p className="hero-eyebrow" key={eyebrowIdx}>
            {site.heroEyebrows[eyebrowIdx]}
          </p>
          <h1 className="hero-title">
            <span className="hero-title-line">{firstName}</span>
            <span className="hero-title-line hero-title-line--accent">{lastName}</span>
          </h1>
          <p className="hero-tagline">{site.tagline}</p>
          <p className="hero-subtitle">{site.subtitle}</p>
          <p className="hero-open-to">{site.openTo}</p>

          <div className="hero-cta">
            <MagneticButton href="#projects" className="btn-primary">
              View work
            </MagneticButton>
            <MagneticButton href={site.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </MagneticButton>
            <MagneticButton href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </MagneticButton>
            <MagneticButton href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </MagneticButton>
          </div>

          <ScrollHint />
        </div>
      </div>
    </div>
  );
}
