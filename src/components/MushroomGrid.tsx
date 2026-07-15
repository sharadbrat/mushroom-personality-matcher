import type { Mushroom } from '../types';
import MushroomCard from './MushroomCard';

interface Props {
  mushrooms: Mushroom[];
  soldIds: string[];
  onOpen: (m: Mushroom) => void;
}

export default function MushroomGrid({ mushrooms, soldIds, onOpen }: Props) {
  if (mushrooms.length === 0) {
    return <div className="mushroom-grid-empty">No mushrooms match that name. Try a different search.</div>;
  }
  return (
    <div className="mushroom-grid">
      {mushrooms.map((m) => (
        <MushroomCard key={m.id} mushroom={m} sold={soldIds.includes(m.id)} onOpen={onOpen} />
      ))}
    </div>
  );
}
