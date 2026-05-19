import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(reducedMotion) {
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;

    if (reducedMotion) {
      gsap.set('main .reveal', { opacity: 1, y: 0 });
      return undefined;
    }

    gsap.set('main .reveal', { opacity: 0, y: 48 });

    const ctx = gsap.context(() => {
      main.querySelectorAll('.section').forEach((section) => {
        const reveals = section.querySelectorAll('.reveal');
        if (!reveals.length) return;

        gsap.to(reveals, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray('main .section-title').forEach((el) => {
        gsap.from(el, {
          scale: 0.9,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });
    }, main);

    return () => ctx.revert();
  }, [reducedMotion]);
}
