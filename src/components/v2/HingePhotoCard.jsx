import { IconHeart } from './HingeIcons';

export default function HingePhotoCard({ image, alt, onHeart, className = '' }) {
  return (
    <article className={`hinge-photo-card ${className}`}>
      <img src={image} alt={alt || ''} loading="lazy" />
      <button type="button" className="hinge-fab hinge-fab--heart" onClick={onHeart} aria-label="Like">
        <IconHeart size={22} />
      </button>
    </article>
  );
}
