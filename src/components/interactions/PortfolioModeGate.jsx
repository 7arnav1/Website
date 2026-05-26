import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PortfolioModeGate() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const pickProfessional = () => setOpen(false);

  const pickFun = () => {
    setOpen(false);
    navigate('/v2');
  };

  return (
    <div className="mode-gate-backdrop" role="presentation">
      <div
        className="mode-gate-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mode-gate-title"
        aria-describedby="mode-gate-desc"
      >
        <p className="mode-gate-eyebrow">Welcome to arnavs.tech</p>
        <h2 id="mode-gate-title" className="mode-gate-title">
          Quick vibe check
        </h2>
        <p id="mode-gate-desc" className="mode-gate-desc">
          Are you here to hire me, or to see if my portfolio is unhinged? (Both are valid.)
        </p>

        <div className="mode-gate-actions">
          <button type="button" className="mode-gate-btn mode-gate-btn--fun" onClick={pickFun}>
            <span className="mode-gate-btn-label">Fun version</span>
            <span className="mode-gate-btn-sub">Hinge mode — swipe my projects</span>
          </button>
          <button
            type="button"
            className="mode-gate-btn mode-gate-btn--pro"
            onClick={pickProfessional}
          >
            <span className="mode-gate-btn-label">Professional portfolio</span>
            <span className="mode-gate-btn-sub">Universe scroll, recruiters welcome</span>
          </button>
        </div>

        <p className="mode-gate-foot">You can switch anytime — Hinge link lives in the nav.</p>
      </div>
    </div>
  );
}
