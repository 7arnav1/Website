import Starfield from '../components/universe/Starfield';
import { UniverseProvider } from '../context/UniverseContext';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import Hero from '../components/hero/Hero';
import StatsStrip from '../components/ui/StatsStrip';
import About from '../components/about/About';
import Education from '../components/education/Education';
import ExperienceTimeline from '../components/experience/ExperienceTimeline';
import Leadership from '../components/leadership/Leadership';
import ProjectShowcase from '../components/projects/ProjectShowcase';
import Skills from '../components/skills/Skills';
import Contact from '../components/contact/Contact';
import ExploreBanner from '../components/interactions/ExploreBanner';
import CursorGlow from '../components/interactions/CursorGlow';
import CursorTrail from '../components/interactions/CursorTrail';
import EasterEgg from '../components/interactions/EasterEgg';
import PortfolioModeGate from '../components/interactions/PortfolioModeGate';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLenisScroll } from '../hooks/useLenisScroll';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

function V1Content() {
  const reducedMotion = usePrefersReducedMotion();
  useLenisScroll(reducedMotion);
  useScrollAnimations(reducedMotion);

  return (
    <>
      <PortfolioModeGate />
      <div className="grain" aria-hidden="true" />
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <ExploreBanner />
      <CursorGlow />
      <CursorTrail />
      <Nav />
      <main className="main-content">
        <Hero />
        <StatsStrip />
        <About />
        <Education />
        <ExperienceTimeline />
        <Leadership />
        <ProjectShowcase />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <EasterEgg />
    </>
  );
}

export default function V1Portfolio() {
  return (
    <>
      <Starfield />
      <UniverseProvider>
        <V1Content />
      </UniverseProvider>
    </>
  );
}
