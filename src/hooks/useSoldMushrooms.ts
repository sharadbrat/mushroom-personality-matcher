import { useCallback, useState } from 'react';

const STORAGE_KEY = 'mushroom-sold-ids';

function loadSoldIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useSoldMushrooms() {
  const [soldIds, setSoldIds] = useState<string[]>(loadSoldIds);

  const toggleSold = useCallback((id: string) => {
    setSoldIds((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable — sold state just won't persist
      }
      return next;
    });
  }, []);

  return { soldIds, toggleSold };
}
