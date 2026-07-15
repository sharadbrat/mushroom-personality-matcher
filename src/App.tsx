import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import MushroomGrid from './components/MushroomGrid';
import DetailModal from './components/DetailModal';
import QuizQuestion from './components/QuizQuestion';
import QuizLoading from './components/QuizLoading';
import QuizReveal from './components/QuizReveal';
import { mushrooms, questions } from './data/mushrooms';
import { fuzzyMatch } from './utils';
import { useSoldMushrooms } from './hooks/useSoldMushrooms';
import type { ConfettiPiece, QuizPhase } from './types';
import './styles/global.css';
import './styles/gallery.css';
import './styles/modal.css';
import './styles/quiz.css';

const CONFETTI_COLORS = ['#c4703f', '#6b7d4f', '#e0a83a', '#a15c8c', '#4f8ba7'];

function buildConfetti(): ConfettiPiece[] {
  return Array.from({ length: 44 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: 1.8 + ((i * 29) % 100) / 60,
    delay: ((i * 53) % 120) / 100,
  }));
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<QuizPhase>('detail');
  const [qIndex, setQIndex] = useState(0);
  const [loadingPct, setLoadingPct] = useState(0);
  const [matchPct, setMatchPct] = useState(0);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const { soldIds, toggleSold } = useSoldMushrooms();
  const loadingTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (loadingTimer.current) window.clearInterval(loadingTimer.current);
  }, []);

  const filtered = useMemo(
    () => mushrooms.filter((m) => fuzzyMatch(m.name, query)),
    [query]
  );

  const selected = mushrooms.find((m) => m.id === selectedId) ?? null;

  const resetQuiz = () => {
    setPhase('detail');
    setQIndex(0);
    setLoadingPct(0);
  };

  const openCard = (m: { id: string }) => {
    setSelectedId(m.id);
    resetQuiz();
  };

  const closeModal = () => {
    if (loadingTimer.current) window.clearInterval(loadingTimer.current);
    setSelectedId(null);
    resetQuiz();
  };

  const startTest = () => {
    setPhase('question');
    setQIndex(0);
  };

  const beginLoading = () => {
    if (loadingTimer.current) window.clearInterval(loadingTimer.current);
    const start = Date.now();
    const totalMs = 1800;
    loadingTimer.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      if (pct >= 100) {
        window.clearInterval(loadingTimer.current!);
        loadingTimer.current = null;
        setLoadingPct(100);
        setMatchPct(95 + Math.floor(Math.random() * 5));
        setConfetti(buildConfetti());
        setPhase('reveal');
      } else {
        setLoadingPct(pct);
      }
    }, 150);
  };

  const answerQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      setPhase('loading');
      setLoadingPct(0);
      beginLoading();
    } else {
      setQIndex((i) => i + 1);
    }
  };

  const retakeTest = () => {
    setPhase('question');
    setQIndex(0);
    setLoadingPct(0);
  };

  let quizContent = null;
  if (selected) {
    if (phase === 'question') {
      quizContent = (
        <QuizQuestion
          question={questions[qIndex]}
          questionNumber={qIndex + 1}
          questionTotal={questions.length}
          onAnswer={answerQuestion}
        />
      );
    } else if (phase === 'loading') {
      quizContent = (
        <QuizLoading title="Identifying personality, calculating..." subtitle="Please hold your clay still" pct={loadingPct} />
      );
    } else if (phase === 'reveal') {
      quizContent = (
        <QuizReveal
          matchPct={matchPct}
          mushroomName={selected.name}
          confetti={confetti}
          onRetake={retakeTest}
          onClose={closeModal}
        />
      );
    }
  }

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
          onStartTest={startTest}
          quizContent={quizContent}
        />
      )}
    </div>
  );
}
