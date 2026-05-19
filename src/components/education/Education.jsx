import Section from '../layout/Section';
import { education } from '../../data/education';

export default function Education() {
  return (
    <Section id="education" title="Education" subtitle={education.school} className="section--education">
      <div className="education-card reveal">
        <div className="education-header">
          <h3>{education.degree}</h3>
          <span className="education-cert">{education.certificate}</span>
          <span className="card-period">
            {education.location} · {education.period}
          </span>
        </div>
        <p className="education-stats">
          GPA {education.gpa} · {education.honors}
        </p>
        <p className="education-coursework-label">Relevant coursework</p>
        <div className="skills-tags">
          {education.coursework.map((c) => (
            <span key={c} className="tag tag--skill">
              {c}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
