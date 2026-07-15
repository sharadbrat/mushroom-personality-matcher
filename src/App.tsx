import { useMemo, useState } from 'react';
import Header from './components/Header';
import MushroomGrid from './components/MushroomGrid';
import DetailModal from './components/DetailModal';
import { mushrooms } from './data/mushrooms';
import { fuzzyMatch } from './utils';
import { useSoldMushrooms } from './hooks/useSoldMushrooms';
import type { QuizPhase } from './types';
import './styles/global.css';
import './styles/gallery.css';
import './styles/modal.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<QuizPhase>('detail');
  const { soldIds, toggleSold } = useSoldMushrooms();

  const filtered = useMemo(
    () => mushrooms.filter((m) => fuzzyMatch(m.name, query)),
    [query]
  );

  const selected = mushrooms.find((m) => m.id === selectedId) ?? null;

  const openCard = (m: { id: string }) => {
    setSelectedId(m.id);
    setPhase('detail');
  };

  const closeModal = () => {
    setSelectedId(null);
    setPhase('detail');
  };

  return (
    <div className="app-shell">
      <Header query={query} onQueryChange={setQuery} onFindMushroom={() => {}} />
      <MushroomGrid mushrooms={filtered} soldIds={soldIds} onOpen={openCard} />
      {selected && (
        <DetailModal
          mushroom={selected}
          sold={soldIds.includes(selected.id)}
          phase={phase}
          onClose={closeModal}
          onToggleSold={() => toggleSold(selected.id)}
          onStartTest={() => setPhase('question')}
          quizContent={<div style={{ padding: 48 }}>Quiz coming in Task 6</div>}
        />
      )}
    </div>
  );
}
