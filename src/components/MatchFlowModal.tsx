import type { ReactNode } from 'react';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

export default function MatchFlowModal({ onClose, children }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel modal-panel--narrow" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}
