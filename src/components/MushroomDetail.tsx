import type { Mushroom } from '../types';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  onToggleSold: () => void;
  onStartTest: () => void;
}

export default function MushroomDetail({ mushroom, sold, onToggleSold, onStartTest }: Props) {
  return (
    <div className="detail-layout">
      <div className="detail-hero">
        <img
          className="detail-hero-image"
          src={mushroom.image}
          alt={mushroom.name}
          style={{ filter: sold ? 'grayscale(0.7)' : 'none' }}
        />
        {sold && <div className="sold-badge">Sold</div>}
      </div>
      <div className="detail-info">
        <div>
          <div className="detail-name">{mushroom.name}</div>
          <div className="detail-tagline">{mushroom.tagline}</div>
        </div>
        <div className="detail-description">{mushroom.description}</div>
        <div className="detail-tags">
          {mushroom.tags.map((tag) => (
            <div className="tag-chip" key={tag}>{tag}</div>
          ))}
        </div>
        <div className="detail-actions">
          {!sold && (
            <button className="primary-button" onClick={onStartTest}>Take the Personality Test</button>
          )}
          {sold && (
            <div className="sold-message">This mushroom has already found its person.</div>
          )}
          <button className="secondary-button" onClick={onToggleSold}>
            {sold ? 'Mark Available' : 'Mark Sold'}
          </button>
        </div>
      </div>
    </div>
  );
}
