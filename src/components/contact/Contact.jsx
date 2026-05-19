import Section from '../layout/Section';
import MagneticButton from '../interactions/MagneticButton';
import { site } from '../../data/site';

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Let's connect"
      subtitle="Open to AI, SWE, TPM, and Data Engineering roles starting 2026."
    >
      <div className="contact-actions reveal">
        <MagneticButton href={`mailto:${site.email}`} className="btn-primary">
          Email me
        </MagneticButton>
        <MagneticButton href={site.resume} target="_blank" rel="noopener noreferrer">
          Resume
        </MagneticButton>
        <MagneticButton href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </MagneticButton>
        <MagneticButton href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </MagneticButton>
      </div>
    </Section>
  );
}
