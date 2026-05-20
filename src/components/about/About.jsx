import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../../data/site';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import myPhoto from '../../portfolio.png';

export default function About() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile(900);

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !photoRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: photoRef.current,
        start: 'top 20%',
        end: 'bottom 80%',
        pin: true,
        pinSpacing: true,
      });

      gsap.to(photoRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section id="about" className="section section--about" ref={sectionRef}>
      <div className="section-inner about-section-inner">
        <h2 className="section-title">About</h2>
        <p className="section-subtitle">I like building things people actually open.</p>

        <div className="about-split">
          <div className="about-photo-wrap reveal" ref={photoRef}>
            <div className="about-photo-frame">
              <img
                src={myPhoto}
                alt="Arnav Srivastav in UW–Madison graduation regalia"
                className="about-photo"
                width={320}
                height={400}
              />
            </div>
          </div>
          <div className="about-copy reveal">
            <p>
              I study computer science and data science at UW–Madison (graduating May 2026,
              Dean&apos;s List) with a business certificate. I care about the product side as much as
              the code — who it&apos;s for, what to measure, when to cut scope. Lately that&apos;s meant
              ECG segmentation at Atrility Medical and LLM work at SAIL @ N+1.
            </p>
            <p>
              I&apos;ve run SPONTA and our RegenMeds capstone, led YesUW, and shipped things that
              had to work outside a notebook: Azure ML jobs, HIPAA-aware healthcare tooling, and a
              mobile app with 150+ beta testers.{' '}
              <strong>Happy to talk about AI, SWE, TPM, or data engineering roles.</strong>
            </p>
            <p className="about-contact-line">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {' · '}
              <a href={`tel:${site.phone.replace(/-/g, '')}`}>{site.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
