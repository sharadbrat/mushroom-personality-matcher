import type { Mushroom } from '../types';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  onOpen: (m: Mushroom) => void;
}

export default function MushroomCard({ mushroom, sold, onOpen }: Props) {
  return (
    <button className="mushroom-card" onClick={() => onOpen(mushroom)}>
      <div
        className="mushroom-portrait"
        style={{ background: mushroom.color, filter: sold ? 'grayscale(0.7)' : 'none' }}
      >
        <div className="portrait-label">portrait</div>
        <div className="portrait-eyes">
          <div className="portrait-eye" />
          <div className="portrait-eye" />
        </div>
        <div className="portrait-mouth" />
        <div className="portrait-initials">{mushroom.initials}</div>
        {sold && <div className="sold-badge">Sold</div>}
      </div>
      <div className="mushroom-card-body">
        <div className="mushroom-card-name">{mushroom.name}</div>
        <div className="mushroom-card-tagline">{mushroom.tagline}</div>
        <div className="mushroom-card-description">{mushroom.description}</div>
        <div className="tag-row">
          {mushroom.tags.map((tag) => (
            <div className="tag-chip" key={tag}>{tag}</div>
          ))}
        </div>
      </div>
    </button>
  );
}
