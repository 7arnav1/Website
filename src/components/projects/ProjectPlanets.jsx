import { projects } from '../../data/projects';

const HERO_PLANETS = [
  { id: 'sponta', top: '14%', right: '6%', size: 96 },
  { id: 'justgo', top: '58%', left: '4%', size: 72 },
  { id: 'aivestor', top: '38%', left: '10%', size: 68 },
  { id: 'hive', top: '62%', right: '12%', size: 60 },
];

const DECO_ORBS = [
  { top: '22%', left: '22%', size: 28, color: 'rgba(178,75,243,0.5)' },
  { top: '70%', left: '28%', size: 20, color: 'rgba(77,166,255,0.45)' },
  { top: '30%', right: '28%', size: 24, color: 'rgba(80,227,164,0.4)' },
  { top: '78%', right: '22%', size: 18, color: 'rgba(255,159,67,0.45)' },
  { top: '48%', right: '4%', size: 22, color: 'rgba(178,75,243,0.35)' },
  { top: '8%', left: '42%', size: 16, color: 'rgba(255,255,255,0.25)' },
];

function PlanetSphere({ accent, size, label, onClick, active }) {
  return (
    <button
      type="button"
      className={`planet-orb ${active ? 'planet-orb--active' : ''}`}
      style={{
        '--planet-color': accent,
        '--planet-size': `${size}px`,
      }}
      onClick={onClick}
      aria-label={label ? `Open project ${label}` : undefined}
    >
      <span className="planet-orb-glow" aria-hidden="true" />
      <span className="planet-orb-core" aria-hidden="true" />
      {label && <span className="planet-orb-label">{label}</span>}
    </button>
  );
}

/** Floating planets on the hero — always visible (CSS, no WebGL). */
export function HeroPlanets({ onSelect }) {
  return (
    <div className="hero-planets" aria-label="Project planets">
      {DECO_ORBS.map((o, i) => (
        <span
          key={`deco-${i}`}
          className="planet-deco"
          style={{
            top: o.top,
            left: o.left,
            right: o.right,
            '--deco-size': `${o.size}px`,
            '--deco-color': o.color,
            animationDelay: `${i * 0.4}s`,
          }}
          aria-hidden="true"
        />
      ))}
      {HERO_PLANETS.map((slot) => {
        const p = projects.find((pr) => pr.id === slot.id);
        if (!p) return null;
        return (
          <div
            key={p.id}
            className="hero-planet-slot"
            style={{
              top: slot.top,
              left: slot.left,
              right: slot.right,
              animationDelay: `${HERO_PLANETS.indexOf(slot) * 0.25}s`,
            }}
          >
            <PlanetSphere
              accent={p.accent}
              size={slot.size}
              label={p.title}
              onClick={() => onSelect?.(p.id)}
            />
          </div>
        );
      })}
    </div>
  );
}

/** Planet picker row on the Projects section. */
export function ProjectPlanetsRow({ activeId, onSelect }) {
  return (
    <div className="project-planets-row" aria-label="Pick a project planet">
      <p className="project-planets-hint">Pick a planet</p>
      <div className="project-planets-grid">
        {projects.map((p) => (
          <PlanetSphere
            key={p.id}
            accent={p.accent}
            size={p.id === 'sponta' ? 80 : 64}
            label={p.title}
            active={activeId === p.id}
            onClick={() => onSelect(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
