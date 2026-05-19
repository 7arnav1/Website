export default function Section({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="section-inner">
        {title && <h2 className="section-title reveal">{title}</h2>}
        {subtitle && <p className="section-subtitle reveal">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
