import type { Mushroom } from '../types';
import { CARD_FOCUS } from '../data/cardFocus';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  onOpen: (m: Mushroom) => void;
}

export default function MushroomCard({ mushroom, sold, onOpen }: Props) {
  const focus = CARD_FOCUS[mushroom.id];
  return (
    <button className="mushroom-card" onClick={() => onOpen(mushroom)}>
      <div className="mushroom-portrait">
        <img
          className="mushroom-portrait-image"
          src={mushroom.image}
          alt={mushroom.name}
          style={{
            filter: sold ? 'grayscale(0.7)' : 'none',
            objectPosition: focus ? `${focus.x}% ${focus.y}%` : 'center',
            ...(focus && { transform: `scale(${focus.zoom})`, transformOrigin: `${focus.x}% ${focus.y}%` }),
          }}
        />
        {sold && <div className="sold-badge">Sold</div>}
      </div>
      <div className="mushroom-card-body">
        <div className="mushroom-card-name">{mushroom.name}</div>
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
