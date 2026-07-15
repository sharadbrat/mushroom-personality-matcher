import { useMemo, useState } from 'react';
import Header from './components/Header';
import MushroomGrid from './components/MushroomGrid';
import { mushrooms } from './data/mushrooms';
import { fuzzyMatch } from './utils';
import { useSoldMushrooms } from './hooks/useSoldMushrooms';
import './styles/global.css';
import './styles/gallery.css';

export default function App() {
  const [query, setQuery] = useState('');
  const { soldIds } = useSoldMushrooms();

  const filtered = useMemo(
    () => mushrooms.filter((m) => fuzzyMatch(m.name, query)),
    [query]
  );

  return (
    <div className="app-shell">
      <Header query={query} onQueryChange={setQuery} onFindMushroom={() => {}} />
      <MushroomGrid mushrooms={filtered} soldIds={soldIds} onOpen={() => {}} />
    </div>
  );
}
