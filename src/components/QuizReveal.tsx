import type { ConfettiPiece } from '../types';

interface Props {
  matchPct: number;
  mushroomName: string;
  confetti: ConfettiPiece[];
  onRetake: () => void;
  onClose: () => void;
}

export default function QuizReveal({ matchPct, mushroomName, confetti, onRetake, onClose }: Props) {
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
        You and {mushroomName} are basically the same clay. Friendship: officially founded.
      </div>
      <div className="reveal-actions">
        <button className="secondary-button" onClick={onRetake}>Take Again</button>
        <button className="primary-button" onClick={onClose}>Back to Mushrooms</button>
      </div>
    </div>
  );
}
