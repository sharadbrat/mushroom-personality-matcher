import type { ReactNode } from 'react';
import type { Mushroom, QuizPhase } from '../types';
import MushroomDetail from './MushroomDetail';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  phase: QuizPhase;
  onClose: () => void;
  onToggleSold: () => void;
  onStartTest: () => void;
  quizContent: ReactNode;
}

export default function DetailModal({ mushroom, sold, phase, onClose, onToggleSold, onStartTest, quizContent }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose}>✕</button>
        {phase === 'detail' && (
          <MushroomDetail mushroom={mushroom} sold={sold} onToggleSold={onToggleSold} onStartTest={onStartTest} />
        )}
        {phase !== 'detail' && quizContent}
      </div>
    </div>
  );
}
