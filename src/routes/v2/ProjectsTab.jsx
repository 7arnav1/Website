import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../data/site';
import { projectDeck } from '../../data/v2ProjectDeck';
import SendLikeSheet from '../../components/v2/SendLikeSheet';
import { IconHeart, IconX, IconRose, IconInfo } from '../../components/v2/HingeIcons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function ProjectsTab() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [matchOpen, setMatchOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  const project = projectDeck[index];
  const next = projectDeck[index + 1];
  const done = index >= projectDeck.length;

  const advance = useCallback(() => {
    if (index + 1 >= projectDeck.length) {
      setMatchOpen(true);
      return;
    }
    if (reduced) {
      setIndex((i) => i + 1);
      return;
    }
    setExiting(true);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setExiting(false);
    }, 340);
  }, [index, reduced]);

  if (done) {
    return (
      <div className="hinge-projects-screen">
        <div className="hinge-empty" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3>You&apos;ve seen all projects</h3>
          <p style={{ color: 'var(--hinge-text-secondary)' }}>Replay or say hi</p>
          <button
            type="button"
            className="hinge-sheet-btn hinge-sheet-btn--primary"
            style={{ margin: '20px auto 0', maxWidth: 200 }}
            onClick={() => {
              setIndex(0);
              setMatchOpen(false);
            }}
          >
            Replay
          </button>
        </div>
        {matchOpen && <MatchOverlay onClose={() => setMatchOpen(false)} />}
      </div>
    );
  }

  return (
    <div className="hinge-projects-screen">
      <div className="hinge-page-header">
        <h1 className="hinge-page-title">
          Standouts
          <button type="button" className="hinge-icon-btn" style={{ marginLeft: 4, verticalAlign: 'middle' }} aria-label="Info">
            <IconInfo />
          </button>
        </h1>
        <a href={site.resume} className="hinge-roses-pill">
          <IconRose />
          Roses (0)
        </a>
      </div>

      <p className="hinge-projects-progress">
        {index + 1} of {projectDeck.length} — tap ✕ for next project
      </p>

      <div className="hinge-standouts-scroll">
        <div className="hinge-standouts-track" style={{ position: 'relative', width: '100%', maxWidth: 360, margin: '0 auto' }}>
          {next && (
            <div className="hinge-standout-card hinge-standout-card--behind" aria-hidden="true">
              <StandoutVisual project={next} />
            </div>
          )}
          {project && (
            <div
              className={`hinge-standout-card hinge-standout-card--front ${exiting ? 'hinge-standout-card--exit' : ''}`}
            >
              <StandoutVisual project={project} />
              <div className="hinge-standout-actions">
                <button type="button" className="hinge-fab" onClick={advance} aria-label="Pass">
                  <IconX />
                </button>
                <button
                  type="button"
                  className="hinge-fab hinge-fab--heart"
                  onClick={() => setSheetOpen(true)}
                  aria-label="Like"
                  style={{ marginLeft: 'auto' }}
                >
                  <IconHeart size={22} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <SendLikeSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={project?.title}
        github={project?.href}
        demo={project?.demo}
        presetComments={[
          `Obsessed with ${project?.title}`,
          'Can I see the repo?',
          "It's a match",
        ]}
      />

      {matchOpen && <MatchOverlay onClose={() => setMatchOpen(false)} />}
    </div>
  );
}

function StandoutVisual({ project }) {
  return (
    <>
      {project.image ? (
        <img src={project.image} alt="" className="hinge-standout-img" style={{ objectPosition: 'center top' }} />
      ) : (
        <div className="hinge-standout-gradient" style={{ '--accent': project.accent }}>
          {project.logo && (
            <img src={project.logo} alt="" className="hinge-standout-logo-mark" />
          )}
        </div>
      )}
      <span className="hinge-standout-name">{project.title.toLowerCase()}</span>
      <div className="hinge-standout-prompt">
        <p className="hinge-standout-prompt-q">{project.prompt}</p>
        <p className="hinge-standout-prompt-a">{project.promptAnswer}</p>
        <button type="button" className="hinge-standout-rose" aria-label="Rose">
          <IconRose size={16} />
        </button>
      </div>
    </>
  );
}

function MatchOverlay({ onClose }) {
  return (
    <div className="hinge-match-overlay">
      <h2 className="hinge-match-title">It&apos;s a Match!</h2>
      <p className="hinge-match-sub">You liked every project. Let&apos;s build something together.</p>
      <div className="hinge-match-actions">
        <Link to="/v2/contact" className="hinge-sheet-btn hinge-sheet-btn--primary">
          Contact me
        </Link>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="hinge-sheet-btn hinge-sheet-btn--ghost">
          View GitHub
        </a>
        <button type="button" className="hinge-sheet-btn hinge-sheet-btn--ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
