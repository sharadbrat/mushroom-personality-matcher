import type { TraitGroup } from '../types';

interface Props {
  traitGroups: TraitGroup[];
  selectedTraits: string[];
  onToggleTrait: (t: string) => void;
  onConfirm: () => void;
}

export default function TraitPicker({ traitGroups, selectedTraits, onToggleTrait, onConfirm }: Props) {
  const canConfirm = selectedTraits.length >= 3;
  return (
    <div className="match-flow-content">
      <div className="match-flow-title">What are you like?</div>
      <div className="match-flow-subtitle">
        Pick at least 3 traits and we'll find your closest clay match &mdash; {selectedTraits.length} selected
      </div>
      <div className="trait-groups">
        {traitGroups.map((group) => (
          <div key={group.label}>
            <div className="trait-group-label">{group.label}</div>
            <div className="trait-chip-row">
              {group.traits.map((trait) => {
                const active = selectedTraits.includes(trait);
                return (
                  <button
                    key={trait}
                    className={`trait-chip${active ? ' trait-chip--active' : ''}`}
                    onClick={() => onToggleTrait(trait)}
                  >
                    {trait}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        className={`confirm-button${canConfirm ? '' : ' confirm-button--disabled'}`}
        onClick={onConfirm}
        disabled={!canConfirm}
      >
        Find my mushroom
      </button>
    </div>
  );
}
