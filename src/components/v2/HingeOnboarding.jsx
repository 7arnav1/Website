import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'arnav-hinge-tour-v2';

const STEPS = [
  {
    title: 'Welcome — yes, it’s Hinge',
    body: 'This is my portfolio dressed up as Hinge. Same vibe, real resume inside.',
    arrow: 'none',
    route: '/v2',
  },
  {
    title: 'Five tabs below',
    body: 'Profile · Experience · Projects · Education · Contact — tap the icons in the black bar.',
    arrow: 'bottom-nav',
    route: '/v2',
  },
  {
    title: 'Profile = my “dating” profile',
    body: 'Filter by AI / SWE / TPM / Data. Scroll photos & prompts. Tap ♥ on anything you like.',
    arrow: 'feed',
    route: '/v2',
  },
  {
    title: 'Projects = swipe mode',
    body: 'Open the ♥ tab (badge shows 4). Tap ✕ to pass to the next project, ♥ to like & see links.',
    arrow: 'projects-nav',
    route: '/v2/projects',
  },
  {
    title: 'Experience & Contact',
    body: '★ = jobs (Matches list). Avatar = email, resume & GitHub. Classic site is in ··· menu.',
    arrow: 'none',
    route: '/v2',
  },
];

export default function HingeOnboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const current = STEPS[step];
  const isLast = step >= STEPS.length - 1;

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const next = () => {
    if (isLast) {
      finish();
      return;
    }
    const nextStep = step + 1;
    const target = STEPS[nextStep]?.route;
    if (target && pathname !== target) navigate(target);
    setStep(nextStep);
  };

  return (
    <div className="hinge-tour-backdrop" role="dialog" aria-modal="true" aria-label="Tour">
      {current.arrow === 'bottom-nav' && (
        <div className="hinge-tour-arrow hinge-tour-arrow--nav" aria-hidden="true">
          <span className="hinge-tour-arrow-icon">↓</span>
        </div>
      )}
      {current.arrow === 'feed' && (
        <div className="hinge-tour-arrow hinge-tour-arrow--feed" aria-hidden="true">
          <span className="hinge-tour-arrow-icon">↓</span>
        </div>
      )}
      {current.arrow === 'projects-nav' && (
        <div className="hinge-tour-arrow hinge-tour-arrow--heart-tab" aria-hidden="true">
          <span className="hinge-tour-arrow-icon">↓</span>
        </div>
      )}

      <div className="hinge-tour-card">
        <p className="hinge-tour-step">
          {step + 1} / {STEPS.length}
        </p>
        <h2 className="hinge-tour-title">{current.title}</h2>
        <p className="hinge-tour-body">{current.body}</p>
        <div className="hinge-tour-actions">
          <button type="button" className="hinge-tour-skip" onClick={finish}>
            Skip
          </button>
          <button type="button" className="hinge-tour-next" onClick={next}>
            {isLast ? 'Got it' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
