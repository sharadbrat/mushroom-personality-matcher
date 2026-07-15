import type { Mushroom, TraitGroup } from './types';

export function fuzzyMatch(name: string, query: string): boolean {
  if (!query) return true;
  const n = name.toLowerCase();
  const q = query.toLowerCase();
  if (n.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < n.length && qi < q.length; i++) {
    if (n[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

const ARCHETYPE_TO_BUCKET: Record<string, string> = {
  'Chaotic Optimist': 'Bold & Energetic',
  'Bold Show-Off': 'Bold & Energetic',
  'Competitive Spirit': 'Bold & Energetic',
  'Mischievous Prankster': 'Bold & Energetic',
  'Cheerful Chatterbox': 'Warm & Social',
  'Gentle Caretaker': 'Warm & Social',
  'Free-Spirited Artist': 'Warm & Social',
  'Anxious Sweetheart': 'Warm & Social',
  'Quiet Observer': 'Calm & Grounded',
  'Stoic Philosopher': 'Calm & Grounded',
  'Cozy Homebody': 'Calm & Grounded',
  'Grumpy But Loyal': 'Calm & Grounded',
  'Overthinking Planner': 'Careful & Steady',
  'Stubborn Traditionalist': 'Careful & Steady',
  'Dreamy Wanderer': 'Careful & Steady',
};

const BUCKET_ORDER = ['Bold & Energetic', 'Warm & Social', 'Calm & Grounded', 'Careful & Steady'];

export function buildTraitGroups(mushroomList: Mushroom[]): TraitGroup[] {
  const bucketTags: Record<string, string[]> = {};
  BUCKET_ORDER.forEach((b) => { bucketTags[b] = []; });
  const seenLabels = new Set<string>();
  mushroomList.forEach((m) => {
    if (!seenLabels.has(m.tagline)) {
      seenLabels.add(m.tagline);
      const bucket = ARCHETYPE_TO_BUCKET[m.tagline] || BUCKET_ORDER[0];
      m.tags.forEach((t) => {
        if (!bucketTags[bucket].includes(t)) bucketTags[bucket].push(t);
      });
    }
  });
  return BUCKET_ORDER.map((label) => ({ label, traits: bucketTags[label] }));
}
