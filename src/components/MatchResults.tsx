import type { Mushroom } from '../types';

interface Props {
  results: Mushroom[];
  selectedTraits: string[];
  onSelect: (m: Mushroom) => void;
}

export default function MatchResults({ results, selectedTraits, onSelect }: Props) {
  return (
    <div className="match-flow-content">
      <div className="match-flow-title">Your top matches</div>
      <div className="match-flow-subtitle">Ranked by shared personality traits</div>
      <div className="match-results-grid">
        {results.map((m) => {
          const shared = m.tags.filter((t) => selectedTraits.includes(t)).length;
          return (
            <button key={m.id} className="match-result-card" onClick={() => onSelect(m)}>
              <div className="match-result-portrait">
                <img className="match-result-portrait-image" src={m.image} alt={m.name} />
              </div>
              <div className="match-result-body">
                <div className="match-result-name">{m.name}</div>
                <div className="match-result-label">{shared} of {m.tags.length} traits shared</div>
              </div>
            </button>
          );
        })}
      </div>
      {results.length === 0 && (
        <div className="match-results-empty">No overlap found with those traits &mdash; try picking a different mix.</div>
      )}
    </div>
  );
}
