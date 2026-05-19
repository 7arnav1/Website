import { useState } from 'react';
import Section from '../layout/Section';
import { skills } from '../../data/skills';

const labels = {
  languages: 'Languages',
  aiMl: 'AI / ML & LLMs',
  apis: 'APIs & Auth',
  cloud: 'Cloud & DevOps',
  databases: 'Databases',
  frameworks: 'Frameworks & Tools',
};

export default function Skills() {
  const [active, setActive] = useState('languages');

  return (
    <Section id="skills" title="Technical skills" subtitle="Hover a category to focus.">
      <div className="skills-interactive reveal">
        <div className="skills-tabs" role="tablist">
          {Object.keys(skills).map((group) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={active === group}
              className={`skills-tab ${active === group ? 'skills-tab--active' : ''}`}
              onMouseEnter={() => setActive(group)}
              onFocus={() => setActive(group)}
            >
              {labels[group]}
            </button>
          ))}
        </div>
        <div key={active} className="skills-panel skills-panel--single">
          <div className="skills-tags skills-tags--large">
            {skills[active].map((s) => (
              <span key={s} className="tag tag--skill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
