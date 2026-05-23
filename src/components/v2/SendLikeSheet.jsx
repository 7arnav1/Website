import { site } from '../../data/site';

export default function SendLikeSheet({ open, onClose, title, github, demo, presetComments = [] }) {
  if (!open) return null;

  const chips = presetComments.length
    ? presetComments
    : ["Let's connect!", 'Would love to chat', 'This is great'];

  return (
    <div className="hinge-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Send a like" onClick={onClose}>
      <div className="hinge-sheet" onClick={(e) => e.stopPropagation()}>
        <h3>Send a like</h3>
        <p>Drop a comment with your like{title ? ` on “${title}”` : ''}.</p>
        <div className="hinge-sheet-chips">
          {chips.map((c) => (
            <button key={c} type="button" className="hinge-sheet-chip">
              {c}
            </button>
          ))}
        </div>
        <div className="hinge-sheet-actions">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="hinge-sheet-btn hinge-sheet-btn--primary">
              View GitHub
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="hinge-sheet-btn hinge-sheet-btn--ghost">
              {demo.includes('github') ? 'Watch demo' : 'Live demo'}
            </a>
          )}
          <a href={site.resume} className="hinge-sheet-btn hinge-sheet-btn--ghost">
            Download resume
          </a>
          <button type="button" className="hinge-sheet-btn hinge-sheet-btn--ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
