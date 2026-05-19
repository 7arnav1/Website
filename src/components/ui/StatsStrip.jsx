import { stats } from '../../data/stats';
import StatCounter from './StatCounter';

export default function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="Highlights">
      <div className="stats-strip-inner">
        {stats.map((s) => (
          <StatCounter
            key={s.label}
            value={s.value}
            label={s.label}
            suffix={s.suffix}
            decimals={s.decimals ?? 0}
          />
        ))}
      </div>
    </section>
  );
}
