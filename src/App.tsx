import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import MushroomGrid from './components/MushroomGrid';
import DetailModal from './components/DetailModal';
import QuizQuestion from './components/QuizQuestion';
import QuizLoading from './components/QuizLoading';
import QuizReveal from './components/QuizReveal';
import MatchFlowModal from './components/MatchFlowModal';
import TraitPicker from './components/TraitPicker';
import MatchResults from './components/MatchResults';
import { mushrooms, questions } from './data/mushrooms';
import { buildTraitGroups, fuzzyMatch } from './utils';
import { useSoldMushrooms } from './hooks/useSoldMushrooms';
import type { ConfettiPiece, Mushroom, QuizPhase, MatchFlowPhase } from './types';
import './styles/global.css';
import './styles/gallery.css';
import './styles/modal.css';
import './styles/quiz.css';
import './styles/matchflow.css';

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

const TRAIT_GROUPS = buildTraitGroups(mushrooms);

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

  const [matchFlow, setMatchFlow] = useState<MatchFlowPhase>(null);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [matchLoadingPct, setMatchLoadingPct] = useState(0);
  const [matchResults, setMatchResults] = useState<Mushroom[]>([]);
  const matchTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (loadingTimer.current) window.clearInterval(loadingTimer.current);
    if (matchTimer.current) window.clearInterval(matchTimer.current);
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

  const openMatchFlow = () => {
    setMatchFlow('picking');
    setSelectedTraits([]);
    setMatchLoadingPct(0);
    setMatchResults([]);
  };

  const closeMatchFlow = () => {
    if (matchTimer.current) window.clearInterval(matchTimer.current);
    setMatchFlow(null);
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const beginMatchLoading = () => {
    if (matchTimer.current) window.clearInterval(matchTimer.current);
    const start = Date.now();
    const totalMs = 1800;
    matchTimer.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      if (pct >= 100) {
        window.clearInterval(matchTimer.current!);
        matchTimer.current = null;
        const scored = mushrooms
          .filter((m) => !soldIds.includes(m.id))
          .map((m) => ({ m, count: m.tags.filter((t) => selectedTraits.includes(t)).length }))
          .filter((x) => x.count > 0)
          .sort((a, b) => b.count - a.count);
        setMatchLoadingPct(100);
        setMatchResults(scored.slice(0, 3).map((x) => x.m));
        setMatchFlow('results');
      } else {
        setMatchLoadingPct(pct);
      }
    }, 150);
  };

  const confirmTraits = () => {
    if (selectedTraits.length < 3) return;
    setMatchFlow('loading');
    setMatchLoadingPct(0);
    beginMatchLoading();
  };

  const selectFromResults = (m: Mushroom) => {
    if (matchTimer.current) window.clearInterval(matchTimer.current);
    setMatchFlow(null);
    setSelectedId(m.id);
    resetQuiz();
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
      <Header query={query} onQueryChange={setQuery} onFindMushroom={openMatchFlow} />
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
      {matchFlow && (
        <MatchFlowModal onClose={closeMatchFlow}>
          {matchFlow === 'picking' && (
            <TraitPicker
              traitGroups={TRAIT_GROUPS}
              selectedTraits={selectedTraits}
              onToggleTrait={toggleTrait}
              onConfirm={confirmTraits}
            />
          )}
          {matchFlow === 'loading' && (
            <QuizLoading
              title="Identifying personality, calculating..."
              subtitle="Comparing your traits to every mushroom in the patch"
              pct={matchLoadingPct}
            />
          )}
          {matchFlow === 'results' && (
            <MatchResults results={matchResults} selectedTraits={selectedTraits} onSelect={selectFromResults} />
          )}
        </MatchFlowModal>
      )}
    </div>
  );
}
