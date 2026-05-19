import Section from '../layout/Section';
import TiltCard from '../interactions/TiltCard';
import { leadership } from '../../data/leadership';

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership" subtitle="Campus impact beyond the keyboard.">
      <div className="cards-grid">
        {leadership.map((item) => (
          <TiltCard key={item.id} className="card reveal">
            <div className="card-header">
              <h3>{item.title}</h3>
              <span className="card-org">{item.org}</span>
              <span className="card-period">{item.period}</span>
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
