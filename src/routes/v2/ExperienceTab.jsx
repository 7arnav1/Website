import { useState } from 'react';
import { experience } from '../../data/experience';
import { leadership } from '../../data/leadership';
import { getExperienceLogo } from '../../data/workLogos';
import { IconChevronDown } from '../../components/v2/HingeIcons';
import arnavPhoto from '../../Arnav.jpg';

function MatchAvatar({ jobId }) {
  const logo = getExperienceLogo(jobId);

  if (Array.isArray(logo)) {
    return (
      <div className="hinge-match-avatar-duo" aria-hidden="true">
        {logo.map((src) => (
          <img key={src} src={src} alt="" className="hinge-match-avatar-duo__img" />
        ))}
      </div>
    );
  }

  if (logo) {
    return <img src={logo} alt="" className="hinge-match-avatar hinge-match-avatar--logo" />;
  }

  return <img src={arnavPhoto} alt="" className="hinge-match-avatar" />;
}

function MatchSection({ title, count, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="hinge-match-section">
      <button
        type="button"
        className="hinge-match-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title} ({count})
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', display: 'flex' }}>
          <IconChevronDown />
        </span>
      </button>
      {open &&
        items.map((job) => (
          <div key={job.id} className="hinge-match-row">
            <MatchAvatar jobId={job.id} />
            <div className="hinge-match-body">
              <p className="hinge-match-name">{job.title}</p>
              <p className="hinge-match-preview">{job.bullets[0]}</p>
              <p className="hinge-match-time">
                {job.org} · {job.period}
                {job.highlight ? ` · ${job.highlight}` : ''}
              </p>
              <ul className="hinge-job-bullets">
                {job.bullets.slice(1, 3).map((b) => (
                  <li key={b.slice(0, 48)}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

export default function ExperienceTab() {
  const current = experience.filter((e) => e.period.includes('Present'));
  const past = experience.filter((e) => !e.period.includes('Present'));

  return (
    <div className="hinge-scroll">
      <h1 className="hinge-page-title" style={{ padding: '16px 16px 8px' }}>
        Matches
      </h1>
      <p
        className="hinge-page-sub"
        style={{ padding: '0 16px 8px', margin: 0, color: 'var(--hinge-text-secondary)' }}
      >
        (it&apos;s my work history)
      </p>

      <div className="hinge-matches-list">
        <MatchSection title="Your turn" count={current.length} items={current} defaultOpen />
        <MatchSection title="Their turn" count={past.length} items={past} />
        <MatchSection title="Hidden" count={leadership.length} items={leadership} />
      </div>
    </div>
  );
}
