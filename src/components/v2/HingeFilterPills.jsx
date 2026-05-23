import { IconChevronDown, IconSliders } from './HingeIcons';

export default function HingeFilterPills({ filters, active, onChange }) {
  return (
    <div className="hinge-filter-bar">
      <button type="button" className="hinge-filter-settings" aria-label="Filters">
        <IconSliders />
      </button>
      <div className="hinge-filters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`hinge-filter-pill ${active === f ? 'hinge-filter-pill--active' : ''}`}
            onClick={() => onChange(f)}
          >
            {f}
            <IconChevronDown />
          </button>
        ))}
      </div>
    </div>
  );
}
