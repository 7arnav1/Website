import { useState } from 'react';
import { education } from '../../data/education';
import { site } from '../../data/site';
import { uwLogo } from '../../data/workLogos';
import { IconVerifiedBadge, IconSliders, IconGear } from '../../components/v2/HingeIcons';
import HingeLogoIcon from '../../components/v2/HingeLogoIcon';

export default function EducationTab() {
  const [tab, setTab] = useState('getmore');

  return (
    <div className="hinge-scroll">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px 0' }}>
        <p className="hinge-wordmark hinge-wordmark--header">Hinge</p>
        <div className="hinge-header-actions" style={{ paddingTop: 0 }}>
          <button type="button" className="hinge-icon-btn" aria-label="Filters">
            <IconSliders />
          </button>
          <a href="/" className="hinge-icon-btn" aria-label="Settings">
            <IconGear />
          </a>
        </div>
      </div>

      <div className="hinge-profile-center">
        <div className="hinge-avatar-ring hinge-avatar-ring--logo">
          <img src={uwLogo} alt="University of Wisconsin–Madison" />
          <span className="hinge-avatar-edit" aria-hidden="true">
            ✎
          </span>
        </div>
        <h2 className="hinge-name-center">
          {site.name.split(' ')[0]}
          <IconVerifiedBadge />
        </h2>
      </div>

      <div className="hinge-subtabs">
        <button
          type="button"
          className={`hinge-subtab ${tab === 'getmore' ? 'hinge-subtab--active' : ''}`}
          onClick={() => setTab('getmore')}
        >
          Get more
        </button>
        <button type="button" className="hinge-subtab" onClick={() => setTab('safety')}>
          Safety
        </button>
        <button type="button" className="hinge-subtab" onClick={() => setTab('my')}>
          My Hinge
        </button>
      </div>

      <div className="hinge-content-pad">
        <div className="hinge-promo-card">
          <p className="hinge-promo-title">Dean&apos;s List</p>
          <p className="hinge-promo-sub">
            {education.degree} · GPA {education.gpa} · graduating May 2026
          </p>
          <a href={site.resume} className="hinge-promo-btn">
            View resume
          </a>
        </div>

        <div className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--teal">
            <HingeLogoIcon src={uwLogo} alt="UW–Madison" />
            <span className="hinge-row-badge">4.0</span>
          </div>
          <div>
            <p className="hinge-row-title">{education.school}</p>
            <p className="hinge-row-desc">
              {education.degree} · {education.period}
            </p>
          </div>
        </div>

        <div className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--purple">
            <HingeLogoIcon src={uwLogo} alt="UW–Madison" />
            <span className="hinge-row-badge">0</span>
          </div>
          <div>
            <p className="hinge-row-title">{education.certificate}</p>
            <p className="hinge-row-desc">
              {education.honors} · {education.location}
            </p>
          </div>
        </div>

        <div className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--purple">
            <IconVerifiedBadge />
            <span className="hinge-row-badge">0</span>
          </div>
          <div>
            <p className="hinge-row-title">Coursework</p>
            <p className="hinge-row-desc">ML, systems, databases, data engineering</p>
          </div>
        </div>
      </div>

      <div className="hinge-chips">
        {education.coursework.map((c) => (
          <span key={c} className="hinge-chip">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
