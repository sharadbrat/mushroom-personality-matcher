import type { ConfettiPiece, Mushroom } from '../types';

interface Props {
  matchPct: number;
  mushroom: Mushroom;
  confetti: ConfettiPiece[];
  onRetake: () => void;
  onClose: () => void;
}

export default function QuizReveal({ matchPct, mushroom, confetti, onRetake, onClose }: Props) {
  return (
    <div className="reveal-phase">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="reveal-confetti-piece"
          style={{ left: `${c.left}%`, background: c.color, animation: `confettiFall ${c.duration}s ease-in ${c.delay}s infinite` }}
        />
      ))}
      <div className="reveal-eyebrow">It's a match!</div>
      <div className="reveal-pct">{matchPct}%</div>
      <div className="reveal-message">
        You and {mushroom.name} are basically the same clay. Friendship: officially founded.
      </div>
      <div className="reveal-mushroom">
        <img className="reveal-mushroom-image" src={mushroom.image} alt={mushroom.name} />
        <div className="reveal-mushroom-name">{mushroom.name}</div>
        <div className="reveal-mushroom-tags">
          {mushroom.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      </div>
      <div className="reveal-actions">
        <button className="secondary-button" onClick={onRetake}>Take Again</button>
        <button className="primary-button" onClick={onClose}>Back to Mushrooms</button>
      </div>
    </div>
  );
}
