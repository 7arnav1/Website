import { IconHeart, IconX } from './HingeIcons';

export default function HingePromptCard({
  question,
  answer,
  showPass = false,
  showHeartOnly = false,
  onPass,
  onHeart,
  className = '',
}) {
  return (
    <article className={`hinge-prompt-card ${className}`}>
      <p className="hinge-prompt-q">{question}</p>
      <p className="hinge-prompt-a">{answer}</p>
      {(showPass || showHeartOnly) && (
        <div className="hinge-prompt-actions">
          {showPass ? (
            <button type="button" className="hinge-fab" onClick={onPass} aria-label="Pass">
              <IconX />
            </button>
          ) : (
            <span className="hinge-fab-spacer" aria-hidden="true" />
          )}
          <button
            type="button"
            className="hinge-fab hinge-fab--heart"
            onClick={onHeart}
            aria-label="Like"
          >
            <IconHeart size={22} />
          </button>
        </div>
      )}
    </article>
  );
}
