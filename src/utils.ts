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

const TRAIT_TO_BUCKET: Record<string, string> = {
  confident: 'Bold & Energetic',
  playful: 'Bold & Energetic',
  sassy: 'Bold & Energetic',
  energetic: 'Bold & Energetic',
  silly: 'Bold & Energetic',
  surprised: 'Bold & Energetic',
  alert: 'Bold & Energetic',
  curious: 'Bold & Energetic',
  cheerful: 'Warm & Social',
  happy: 'Warm & Social',
  friendly: 'Warm & Social',
  sweet: 'Warm & Social',
  gentle: 'Warm & Social',
  cozy: 'Warm & Social',
  calm: 'Calm & Grounded',
  serene: 'Calm & Grounded',
  sleepy: 'Calm & Grounded',
  dreamy: 'Calm & Grounded',
  chill: 'Calm & Grounded',
  quiet: 'Calm & Grounded',
  mysterious: 'Calm & Grounded',
  wise: 'Calm & Grounded',
  grumpy: 'Careful & Steady',
  stubborn: 'Careful & Steady',
  serious: 'Careful & Steady',
  angry: 'Careful & Steady',
  sad: 'Careful & Steady',
  frustrated: 'Careful & Steady',
  nervous: 'Careful & Steady',
  quirky: 'Careful & Steady',
};

const BUCKET_ORDER = ['Bold & Energetic', 'Warm & Social', 'Calm & Grounded', 'Careful & Steady'];

export function buildTraitGroups(mushroomList: Mushroom[]): TraitGroup[] {
  const bucketTags: Record<string, string[]> = {};
  BUCKET_ORDER.forEach((b) => { bucketTags[b] = []; });
  const seenTags = new Set<string>();
  mushroomList.forEach((m) => {
    m.tags.forEach((t) => {
      if (seenTags.has(t)) return;
      seenTags.add(t);
      const bucket = TRAIT_TO_BUCKET[t] || BUCKET_ORDER[0];
      bucketTags[bucket].push(t);
    });
  });
  BUCKET_ORDER.forEach((b) => bucketTags[b].sort());
  return BUCKET_ORDER.map((label) => ({ label, traits: bucketTags[label] }));
}
