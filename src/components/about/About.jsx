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
        <p className="section-subtitle">I build — and I ship products people actually use.</p>

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
              I&apos;m a Computer Science &amp; Data Science student at UW–Madison (May 2026, GPA 3.8,
              Dean&apos;s List) with a Certificate in Business. I&apos;m a builder who also thinks like a
              tech product manager — roadmap, stakeholders, and metrics — not just code. I build
              production ML pipelines, APIs, and full-stack products, from ECG segmentation at
              Atrility Medical to AI research at SAIL @ N+1.
            </p>
            <p>
              I&apos;ve owned products (SPONTA, RegenMeds capstone), led YesUW as president, and shipped
              systems that work in the real world: Azure ML at scale, HIPAA-aware healthcare
              platforms, and mobile apps with 150+ beta users.{' '}
              <strong>Open to AI, SWE, TPM, and Data Engineering roles</strong> — I build, but I
              also ship products.
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
