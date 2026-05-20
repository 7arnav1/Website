import Section from '../layout/Section';
import TiltCard from '../interactions/TiltCard';
import { experience } from '../../data/experience';

export default function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="Work, research, and teaching.">
      <div className="cards-grid experience-grid">
        {experience.map((item) => (
          <TiltCard key={item.id} className="card reveal">
            <div className="card-header">
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
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
