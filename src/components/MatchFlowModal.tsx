import type { ReactNode } from 'react';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

export default function MatchFlowModal({ onClose, children }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-panel modal-panel--narrow">
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}
