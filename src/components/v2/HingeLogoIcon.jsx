export default function HingeLogoIcon({ src, alt = '', className = '' }) {
  if (!src) return null;
  return <img src={src} alt={alt} className={`hinge-logo-img ${className}`} />;
}
