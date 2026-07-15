# Mushroom Personality Matcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the claude.ai/design prototype (`Mushroom Personality Matcher.dc.html` + `mushroom-data.js`) into a standalone Vite + React + TypeScript SPA with identical visuals and behavior.

**Architecture:** Single-page client-only app. `App` owns all state via `useState`; children are presentational, receiving data + callbacks as props. No routing, no backend — sold-state persists to `localStorage`.

**Tech Stack:** Vite, React 18, TypeScript. No test framework (per spec) — each task's verification step is `npm run build` (typecheck) plus a manual check in the dev server.

## Global Constraints

- Visual values (colors, fonts, spacing, border-radius, shadows) must match the prototype exactly — copy values verbatim from `docs/superpowers/specs/2026-07-15-mushroom-personality-matcher-design.md`.
- Fonts: `Baloo 2` (weights 500/600/700/800) for display text, `Nunito` (weights 400/600/700/800) for body text, both via Google Fonts.
- Palette: background `#f6f1e7`, primary text `#3a2f22`/`#4a3d2a`, muted text `#8a7a63`/`#5c4f3c`, orange accent `#c4703f` (shadow `#9a5731`), green accent `#6b7d4f` (shadow `#55613e`), card border `#efe6d4`/`#e6dcc8`, chip bg `#f1ead9`.
- Mushroom generation must be deterministic — no `Math.random()` in `data/mushrooms.ts` (only the quiz reveal % and loading-bar timers use randomness/timing, per spec).
- Sold IDs persist under `localStorage` key `mushroom-sold-ids`.

---

## File Structure

```
index.html
package.json
tsconfig.json
tsconfig.node.json
vite.config.ts
src/
  main.tsx
  App.tsx
  types.ts
  utils.ts
  data/
    mushrooms.ts
  hooks/
    useSoldMushrooms.ts
  components/
    Header.tsx
    MushroomGrid.tsx
    MushroomCard.tsx
    DetailModal.tsx
    MushroomDetail.tsx
    QuizQuestion.tsx
    QuizLoading.tsx
    QuizReveal.tsx
    MatchFlowModal.tsx
    TraitPicker.tsx
    MatchResults.tsx
  styles/
    global.css
    gallery.css
    modal.css
    quiz.css
    matchflow.css
```

---

### Task 1: Project scaffold, global styles, and types

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/types.ts`, `src/styles/global.css`
- Create: `.gitignore`

**Interfaces:**
- Produces: `Mushroom`, `Question`, `TraitGroup` types (used by every later task); `global.css` classes `.app-shell`.

- [ ] **Step 1: Scaffold the Vite React-TS project**

```bash
cd /Users/sharadbrat/Desktop/projects/mushroom-personality-matcher
npm create vite@latest . -- --template react-ts
```

When prompted about the current directory not being empty (it has `.git`, `docs`, `.serena`), choose to continue / ignore existing files.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Add `.gitignore` entries**

Ensure `.gitignore` includes:

```
node_modules
dist
.DS_Store
```

- [ ] **Step 4: Replace `index.html` head with fonts + title**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mushroom Personality Matcher</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Write `src/styles/global.css`**

```css
@keyframes confettiFall {
  0% { transform: translateY(-40px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(640px) rotate(360deg); opacity: 0; }
}
@keyframes popIn {
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes modalIn {
  0% { transform: scale(0.96) translateY(12px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: #f6f1e7;
  font-family: 'Nunito', sans-serif;
  color: #3a2f22;
}

.app-shell {
  min-height: 100vh;
  background: #f6f1e7;
  padding-bottom: 60px;
}

button, .clickable {
  cursor: pointer;
}
```

- [ ] **Step 6: Delete Vite template boilerplate**

```bash
rm -f src/App.css src/index.css src/assets/react.svg
rm -rf public
```

(`src/App.tsx` and `src/main.tsx` will be overwritten in later steps — leave `src/App.tsx` for Task 7's owner to replace.)

- [ ] **Step 7: Write `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 8: Write `src/types.ts`**

```ts
export interface Mushroom {
  id: string;
  name: string;
  initials: string;
  tagline: string;
  tags: string[];
  description: string;
  color: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface TraitGroup {
  label: string;
  traits: string[];
}

export type QuizPhase = 'detail' | 'question' | 'loading' | 'reveal';
export type MatchFlowPhase = 'picking' | 'loading' | 'results' | null;

export interface ConfettiPiece {
  id: number;
  styleStr: string;
}
```

- [ ] **Step 9: Write a placeholder `src/App.tsx` so the build succeeds**

```tsx
export default function App() {
  return <div className="app-shell" />;
}
```

- [ ] **Step 10: Verify the build**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React TS project with fonts and shared types"
```

---

### Task 2: Data layer — mushroom generation and question bank

**Files:**
- Create: `src/data/mushrooms.ts`
- Create: `src/utils.ts`

**Interfaces:**
- Consumes: `Mushroom`, `Question`, `TraitGroup` from `src/types.ts` (Task 1).
- Produces: `mushrooms: Mushroom[]`, `questions: Question[]` from `src/data/mushrooms.ts`; `fuzzyMatch(name: string, query: string): boolean` and `buildTraitGroups(mushrooms: Mushroom[]): TraitGroup[]` from `src/utils.ts` — both used starting Task 4.

- [ ] **Step 1: Write `src/data/mushrooms.ts`**

```ts
import type { Mushroom, Question } from '../types';

const firstParts = ['Bramble', 'Nub', 'Toad', 'Speck', 'Moss', 'Puddle', 'Fen', 'Thimb', 'Dab', 'Wrink', 'Spor', 'Loam', 'Peat', 'Chant', 'Button'];
const suffixes = ['cap', 'ton', 'wick'];
const adjectives = ['squat', 'tall and wobbly', 'petite', 'lumpy', 'smooth', 'freckled', 'chunky', 'slender', 'dimpled', 'craggy', 'round-bellied', 'knobbly', 'stubby', 'sun-baked', 'cracked'];
const habitats = [
  'collects pebbles after every rainstorm',
  'naps under the biggest fern in the patch',
  'hums little tunes to passing earthworms',
  'stacks acorn caps into wobbly towers',
  'counts raindrops on quiet afternoons',
  'braids moss into tiny bracelets',
  'sketches clouds on flat rocks',
  'chats with snails about the weather',
  'hoards shiny buttons in a mossy burrow',
  'practices somersaults down the hill',
  'waters the younger mushrooms every morning',
  'whittles twigs into little spoons',
  'chases fireflies until well past dusk',
  'folds fallen leaves into tiny boats',
  'balances stones into tall, silly towers',
];

interface Archetype {
  label: string;
  tags: string[];
  sentence: string;
}

export const archetypes: Archetype[] = [
  { label: 'Chaotic Optimist', tags: ['Chaotic', 'Optimistic', 'Loud Laugher'], sentence: 'Always assumes the best, even when caked head to toe in mud.' },
  { label: 'Grumpy But Loyal', tags: ['Grumpy', 'Fiercely Loyal', 'Soft Interior'], sentence: 'Grumbles constantly, but would take on a badger for a friend.' },
  { label: 'Overthinking Planner', tags: ['Meticulous', 'Anxious', 'Prepared'], sentence: 'Has a backup plan for the backup plan.' },
  { label: 'Dreamy Wanderer', tags: ['Dreamy', 'Curious', 'Easily Distracted'], sentence: "Follows every butterfly, whether or not it's going anywhere." },
  { label: 'Quiet Observer', tags: ['Quiet', 'Watchful', 'Deep Thinker'], sentence: 'Notices everything, says little, remembers all of it.' },
  { label: 'Bold Show-Off', tags: ['Confident', 'Dramatic', 'Attention-Loving'], sentence: 'Turns every hello into a small performance.' },
  { label: 'Gentle Caretaker', tags: ['Nurturing', 'Patient', 'Warm-Hearted'], sentence: 'Tucks the smaller mushrooms in every single night.' },
  { label: 'Mischievous Prankster', tags: ['Sneaky', 'Playful', 'Unpredictable'], sentence: 'Has hidden a pebble in every pocket in the market.' },
  { label: 'Stubborn Traditionalist', tags: ['Stubborn', 'Old-Fashioned', 'Reliable'], sentence: 'Still does things exactly the way it did in spore-year one.' },
  { label: 'Anxious Sweetheart', tags: ['Sensitive', 'Sweet', 'Easily Startled'], sentence: 'Apologizes to furniture it accidentally bumps into.' },
  { label: 'Cheerful Chatterbox', tags: ['Talkative', 'Cheerful', 'Friend-Collector'], sentence: 'Has never met a stranger, only a future best friend.' },
  { label: 'Stoic Philosopher', tags: ['Calm', 'Wise', 'Unbothered'], sentence: 'Answers nearly every question with another question.' },
  { label: 'Competitive Spirit', tags: ['Competitive', 'Energetic', 'Determined'], sentence: 'Turns puddle-jumping into a full Olympic event.' },
  { label: 'Cozy Homebody', tags: ['Cozy', 'Cautious', 'Homebound'], sentence: 'Has never left its patch of moss, entirely by choice.' },
  { label: 'Free-Spirited Artist', tags: ['Creative', 'Free-Spirited', 'Messy'], sentence: "Paints with mud and insists on calling it 'seasonal work.'" },
];

const palette = ['#c4703f', '#6b7d4f', '#e0a83a', '#a15c8c', '#4f8ba7', '#b5652f'];

function buildMushrooms(): Mushroom[] {
  const list: Mushroom[] = [];
  for (let i = 0; i < 45; i++) {
    const first = firstParts[i % 15];
    const suf = suffixes[Math.floor(i / 15)];
    const name = first + suf;
    const arche = archetypes[i % 15];
    const adjective = adjectives[(i + 4) % 15];
    const habitat = habitats[(i + 9) % 15];
    const color = palette[i % 6];
    list.push({
      id: 'm' + i,
      name,
      initials: name.slice(0, 2).toUpperCase(),
      tagline: arche.label,
      tags: arche.tags,
      description: `${name} is a ${adjective} clay mushroom who ${habitat}. ${arche.sentence}`,
      color,
    });
  }
  return list;
}

export const mushrooms: Mushroom[] = buildMushrooms();

export const questions: Question[] = [
  { id: 1, text: "What's your perfect vacation?", options: ['A quiet cabin in the woods', 'A bustling city adventure', 'A beach with absolutely nothing to do', 'Backpacking somewhere brand new'] },
  { id: 2, text: "What's your perfect weekend?", options: ['Curled up with a good book', 'Out with a big group of friends', 'Trying something completely spontaneous', 'Deep-cleaning and organizing everything'] },
  { id: 3, text: "What's your perfect dinner?", options: ['Home-cooked comfort food', 'A loud, messy group potluck', 'Street food from a food truck', 'A fancy quiet meal for one'] },
  { id: 4, text: "What's your favorite marine animal?", options: ['Octopus', 'Dolphin', 'Turtle', 'Jellyfish'] },
  { id: 5, text: "What's your favorite stone?", options: ['A smooth river pebble', 'A cracked-open geode', 'Solid granite', 'A glowing moonstone'] },
];
```

- [ ] **Step 2: Write `src/utils.ts`**

```ts
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
```

- [ ] **Step 3: Verify with a scratch check**

```bash
npx tsx -e "
import { mushrooms, questions } from './src/data/mushrooms';
import { buildTraitGroups, fuzzyMatch } from './src/utils';
console.log('mushroom count', mushrooms.length);
console.log('question count', questions.length);
console.log('trait groups', buildTraitGroups(mushrooms).map(g => g.label + ':' + g.traits.length));
console.log('fuzzy Toadton~ttn', fuzzyMatch('Toadton', 'ttn'));
"
```

Expected: `mushroom count 45`, `question count 5`, four trait groups each with traits, `fuzzy Toadton~ttn true`. If `tsx` isn't installed, run `npm install -D tsx` first.

- [ ] **Step 4: Verify the build**

```bash
npm run build
```

Expected: succeeds, no TS errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/mushrooms.ts src/utils.ts
git commit -m "feat: port mushroom generation, question bank, and matching utils"
```

---

### Task 3: `useSoldMushrooms` hook

**Files:**
- Create: `src/hooks/useSoldMushrooms.ts`

**Interfaces:**
- Produces: `useSoldMushrooms(): { soldIds: string[]; toggleSold: (id: string) => void }` — used by Task 7 (`App.tsx`).

- [ ] **Step 1: Write the hook**

```ts
import { useCallback, useState } from 'react';

const STORAGE_KEY = 'mushroom-sold-ids';

function loadSoldIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
```

- [ ] **Step 2: Verify the build**

```bash
npm run build
```

Expected: succeeds (the hook is unused until Task 7, so confirm no TS error from the unused-export lint — Vite's default build won't flag unused exports, only unused local vars, so this should pass cleanly).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useSoldMushrooms.ts
git commit -m "feat: add localStorage-backed sold-mushroom hook"
```

---

### Task 4: Gallery — `MushroomCard`, `MushroomGrid`, `Header`

**Files:**
- Create: `src/components/MushroomCard.tsx`, `src/components/MushroomGrid.tsx`, `src/components/Header.tsx`
- Create: `src/styles/gallery.css`
- Modify: `src/App.tsx` (temporary standalone wiring so the gallery is visible; full state machine lands in Task 7)

**Interfaces:**
- Consumes: `Mushroom` type (Task 1), `mushrooms` data + `fuzzyMatch` util (Task 2).
- Produces: `MushroomCard` props `{ mushroom: Mushroom; sold: boolean; onOpen: (m: Mushroom) => void }`; `MushroomGrid` props `{ mushrooms: Mushroom[]; soldIds: string[]; onOpen: (m: Mushroom) => void }`; `Header` props `{ query: string; onQueryChange: (v: string) => void; onFindMushroom: () => void }` — all consumed by Task 7's `App.tsx`.

- [ ] **Step 1: Write `src/styles/gallery.css`**

```css
.header-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f6f1e7ee;
  backdrop-filter: blur(6px);
  padding: 28px 40px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #e6dcc8;
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: #4a3d2a;
}

.header-subtitle {
  font-size: 14px;
  color: #8a7a63;
  font-weight: 600;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 2px solid #e6dcc8;
  border-radius: 999px;
  padding: 12px 20px;
  min-width: 260px;
  box-shadow: 0 2px 0 rgba(58, 47, 34, 0.04);
}

.search-box input {
  border: none;
  outline: none;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #3a2f22;
  width: 100%;
  background: transparent;
}

.find-mushroom-button {
  background: #c4703f;
  color: #fff;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 22px;
  border-radius: 999px;
  border: none;
  box-shadow: 0 4px 0 #9a5731;
  white-space: nowrap;
}

.mushroom-grid {
  padding: 32px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.mushroom-grid-empty {
  text-align: center;
  padding: 60px 20px;
  color: #8a7a63;
  font-size: 16px;
  font-weight: 700;
}

.mushroom-card {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #efe6d4;
  box-shadow: 0 3px 0 rgba(58, 47, 34, 0.06), 0 8px 20px rgba(58, 47, 34, 0.05);
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0;
  transition: transform 0.15s ease;
}

.mushroom-card:hover {
  transform: translateY(-4px);
}

.mushroom-portrait {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mushroom-portrait .portrait-label {
  position: absolute;
  top: 12px;
  left: 14px;
  font-family: ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
}

.mushroom-portrait .portrait-eyes {
  display: flex;
  gap: 26px;
  align-items: center;
  justify-content: center;
}

.mushroom-portrait .portrait-eye {
  width: 14px;
  height: 16px;
  border-radius: 50%;
  background: rgba(58, 47, 34, 0.55);
}

.mushroom-portrait .portrait-mouth {
  width: 12px;
  height: 16px;
  border-radius: 50% 50% 60% 60%;
  background: rgba(58, 47, 34, 0.4);
  margin: 8px auto 0;
}

.mushroom-portrait .portrait-initials {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.5);
}

.sold-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: #4a3d2a;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
}

.mushroom-card-body {
  padding: 18px 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.mushroom-card-name {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #4a3d2a;
}

.mushroom-card-tagline {
  font-size: 14px;
  font-weight: 700;
  color: #8a7a63;
}

.mushroom-card-description {
  font-size: 14px;
  line-height: 1.5;
  color: #5c4f3c;
  flex: 1;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.tag-chip {
  background: #f1ead9;
  color: #6b5c42;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 999px;
}
```

- [ ] **Step 2: Write `src/components/MushroomCard.tsx`**

```tsx
import type { Mushroom } from '../types';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  onOpen: (m: Mushroom) => void;
}

export default function MushroomCard({ mushroom, sold, onOpen }: Props) {
  return (
    <button className="mushroom-card" onClick={() => onOpen(mushroom)}>
      <div
        className="mushroom-portrait"
        style={{ background: mushroom.color, filter: sold ? 'grayscale(0.7)' : 'none' }}
      >
        <div className="portrait-label">portrait</div>
        <div className="portrait-eyes">
          <div className="portrait-eye" />
          <div className="portrait-eye" />
        </div>
        <div className="portrait-mouth" />
        <div className="portrait-initials">{mushroom.initials}</div>
        {sold && <div className="sold-badge">Sold</div>}
      </div>
      <div className="mushroom-card-body">
        <div className="mushroom-card-name">{mushroom.name}</div>
        <div className="mushroom-card-tagline">{mushroom.tagline}</div>
        <div className="mushroom-card-description">{mushroom.description}</div>
        <div className="tag-row">
          {mushroom.tags.map((tag) => (
            <div className="tag-chip" key={tag}>{tag}</div>
          ))}
        </div>
      </div>
    </button>
  );
}
```

- [ ] **Step 3: Write `src/components/MushroomGrid.tsx`**

```tsx
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
```

- [ ] **Step 4: Write `src/components/Header.tsx`**

```tsx
interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  onFindMushroom: () => void;
}

export default function Header({ query, onQueryChange, onFindMushroom }: Props) {
  return (
    <div className="header-bar">
      <div className="header-title-group">
        <div className="header-title">Mushroom Personality Matcher</div>
        <div className="header-subtitle">Pick a clay friend and take the compatibility test</div>
      </div>
      <div className="header-controls">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="8" cy="8" r="6" fill="none" stroke="#8a7a63" strokeWidth={2} />
            <line x1="12.4" y1="12.4" x2="17" y2="17" stroke="#8a7a63" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search mushrooms by name..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <button className="find-mushroom-button" onClick={onFindMushroom}>
          Not sure? Find my mushroom
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Temporarily wire `src/App.tsx` to preview the gallery**

```tsx
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
```

This wiring is intentionally partial — `onFindMushroom` and `onOpen` are no-ops until Task 7 replaces this file with the full state machine.

- [ ] **Step 6: Manual check**

```bash
npm run dev
```

Open the printed local URL. Expected: cream page, sticky header with search box and orange "Find my mushroom" button, a grid of 45 mushroom cards with colored portraits, names, taglines, descriptions, and tag chips. Typing in the search box filters the grid; clearing it to match nothing shows the empty-state message. Stop the dev server (Ctrl+C) when done.

- [ ] **Step 7: Verify the build**

```bash
npm run build
```

Expected: succeeds, no TS errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/MushroomCard.tsx src/components/MushroomGrid.tsx src/components/Header.tsx src/styles/gallery.css src/App.tsx
git commit -m "feat: build mushroom gallery with search"
```

---

### Task 5: Detail modal — `DetailModal`, `MushroomDetail`

**Files:**
- Create: `src/components/DetailModal.tsx`, `src/components/MushroomDetail.tsx`
- Create: `src/styles/modal.css`
- Modify: `src/App.tsx` (wire modal open/close/sold-toggle; quiz phases still stubbed until Task 6)

**Interfaces:**
- Consumes: `Mushroom` type; `useSoldMushrooms` (Task 3); `MushroomGrid`'s `onOpen` callback shape (Task 4).
- Produces: `DetailModal` props `{ mushroom: Mushroom; sold: boolean; phase: QuizPhase; onClose: () => void; onToggleSold: () => void; onStartTest: () => void; quizContent: React.ReactNode }` (the `quizContent` slot is filled by Task 6's question/loading/reveal components — kept as a `ReactNode` prop so this task doesn't need to know their internals). `MushroomDetail` props `{ mushroom: Mushroom; sold: boolean; onToggleSold: () => void; onStartTest: () => void }`.

- [ ] **Step 1: Write `src/styles/modal.css`**

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(58, 47, 34, 0.55);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-panel {
  background: #fffdf8;
  width: 100%;
  max-width: 960px;
  max-height: 92vh;
  overflow-y: auto;
  border-radius: 32px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: modalIn 0.25s ease;
}

.modal-panel--narrow {
  max-width: 900px;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: #4a3d2a;
}

.detail-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 56px 44px 44px;
  align-items: flex-start;
}

.detail-hero {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  width: 100%;
  max-width: 320px;
  flex: none;
}

.detail-hero .portrait-label {
  position: absolute;
  top: 18px;
  left: 20px;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
}

.detail-hero .portrait-eyes {
  display: flex;
  gap: 44px;
  align-items: center;
  justify-content: center;
}

.detail-hero .portrait-eye {
  width: 26px;
  height: 30px;
  border-radius: 50%;
  background: rgba(58, 47, 34, 0.55);
}

.detail-hero .portrait-mouth {
  width: 22px;
  height: 30px;
  border-radius: 50% 50% 60% 60%;
  background: rgba(58, 47, 34, 0.4);
  margin: 16px auto 0;
}

.detail-hero .sold-badge {
  top: 18px;
  right: 18px;
  font-size: 12px;
  padding: 6px 12px;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-width: 260px;
}

.detail-name {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 34px;
  color: #4a3d2a;
}

.detail-tagline {
  font-size: 16px;
  font-weight: 700;
  color: #8a7a63;
  margin-top: 4px;
}

.detail-description {
  font-size: 17px;
  line-height: 1.6;
  color: #5c4f3c;
  max-width: 520px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-tags .tag-chip {
  font-size: 13px;
  padding: 7px 14px;
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.primary-button {
  background: #6b7d4f;
  color: #fff;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 17px;
  padding: 16px 30px;
  border-radius: 999px;
  border: none;
  box-shadow: 0 4px 0 #55613e;
}

.secondary-button {
  background: #ffffff;
  border: 2px solid #e6dcc8;
  color: #4a3d2a;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 15px;
  padding: 15px 24px;
  border-radius: 999px;
}

.sold-message {
  display: flex;
  align-items: center;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #a89a80;
}
```

- [ ] **Step 2: Write `src/components/MushroomDetail.tsx`**

```tsx
import type { Mushroom } from '../types';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  onToggleSold: () => void;
  onStartTest: () => void;
}

export default function MushroomDetail({ mushroom, sold, onToggleSold, onStartTest }: Props) {
  return (
    <div className="detail-layout">
      <div className="detail-hero" style={{ background: mushroom.color, filter: sold ? 'grayscale(0.7)' : 'none' }}>
        <div className="portrait-label">portrait</div>
        <div className="portrait-eyes">
          <div className="portrait-eye" />
          <div className="portrait-eye" />
        </div>
        <div className="portrait-mouth" />
        {sold && <div className="sold-badge">Sold</div>}
      </div>
      <div className="detail-info">
        <div>
          <div className="detail-name">{mushroom.name}</div>
          <div className="detail-tagline">{mushroom.tagline}</div>
        </div>
        <div className="detail-description">{mushroom.description}</div>
        <div className="detail-tags">
          {mushroom.tags.map((tag) => (
            <div className="tag-chip" key={tag}>{tag}</div>
          ))}
        </div>
        <div className="detail-actions">
          {!sold && (
            <button className="primary-button" onClick={onStartTest}>Take the Personality Test</button>
          )}
          {sold && (
            <div className="sold-message">This mushroom has already found its person.</div>
          )}
          <button className="secondary-button" onClick={onToggleSold}>
            {sold ? 'Mark Available' : 'Mark Sold'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/DetailModal.tsx`**

```tsx
import type { ReactNode } from 'react';
import type { Mushroom, QuizPhase } from '../types';
import MushroomDetail from './MushroomDetail';

interface Props {
  mushroom: Mushroom;
  sold: boolean;
  phase: QuizPhase;
  onClose: () => void;
  onToggleSold: () => void;
  onStartTest: () => void;
  quizContent: ReactNode;
}

export default function DetailModal({ mushroom, sold, phase, onClose, onToggleSold, onStartTest, quizContent }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose}>✕</button>
        {phase === 'detail' && (
          <MushroomDetail mushroom={mushroom} sold={sold} onToggleSold={onToggleSold} onStartTest={onStartTest} />
        )}
        {phase !== 'detail' && quizContent}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Wire `src/App.tsx`**

```tsx
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
```

- [ ] **Step 5: Manual check**

```bash
npm run dev
```

Click a mushroom card. Expected: modal opens with portrait, name, tagline, description, tags, "Take the Personality Test" button, and "Mark Sold" button. Click "Mark Sold" — button label flips to "Mark Available", portrait grays out, "Take the Personality Test" is replaced by the sold message. Click ✕ to close; reopening the same card shows the sold state persisted (and survives a page reload, since it's in `localStorage`). Click "Take the Personality Test" — shows the Task 6 placeholder text. Stop the server when done.

- [ ] **Step 6: Verify the build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/components/DetailModal.tsx src/components/MushroomDetail.tsx src/styles/modal.css src/App.tsx
git commit -m "feat: add mushroom detail modal with sold toggle"
```

---

### Task 6: Quiz flow — `QuizQuestion`, `QuizLoading`, `QuizReveal`

**Files:**
- Create: `src/components/QuizQuestion.tsx`, `src/components/QuizLoading.tsx`, `src/components/QuizReveal.tsx`
- Create: `src/styles/quiz.css`
- Modify: `src/App.tsx` (full quiz state machine)

**Interfaces:**
- Consumes: `Question` type; `questions` data (Task 2); `DetailModal`'s `quizContent` slot (Task 5).
- Produces: `QuizQuestion` props `{ question: Question; questionNumber: number; questionTotal: number; onAnswer: (answerText: string) => void }`; `QuizLoading` props `{ title: string; subtitle: string; pct: number }` (generic — reused by Task 8's match-loading screen); `QuizReveal` props `{ matchPct: number; mushroomName: string; confetti: ConfettiPiece[]; onRetake: () => void; onClose: () => void }`.

- [ ] **Step 1: Write `src/styles/quiz.css`**

```css
.quiz-phase {
  padding: 60px 48px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-height: 480px;
  justify-content: center;
}

.progress-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
}

.progress-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.question-eyebrow {
  font-size: 13px;
  font-weight: 700;
  color: #8a7a63;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.question-text {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 28px;
  color: #4a3d2a;
  text-align: center;
  max-width: 520px;
  margin: 8px 0 28px;
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 420px;
}

.question-option {
  background: #ffffff;
  border: 2px solid #e6dcc8;
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #4a3d2a;
  text-align: center;
}

.question-option:hover {
  border-color: #6b7d4f;
  background: #f4f7ee;
}

.loading-phase {
  padding: 80px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
  min-height: 480px;
}

.loading-title {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: #4a3d2a;
  text-align: center;
}

.loading-subtitle {
  font-size: 15px;
  color: #8a7a63;
  font-weight: 700;
}

.loading-bar-track {
  width: 280px;
  height: 14px;
  background: #efe6d4;
  border-radius: 999px;
  overflow: hidden;
}

.loading-bar-fill {
  height: 100%;
  background: #c4703f;
  border-radius: 999px;
  transition: width 0.2s ease;
}

.loading-pct {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 40px;
  color: #c4703f;
}

.reveal-phase {
  padding: 70px 48px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 480px;
  position: relative;
  overflow: hidden;
}

.reveal-confetti-piece {
  position: absolute;
  top: -20px;
  width: 8px;
  height: 14px;
  border-radius: 2px;
}

.reveal-eyebrow {
  font-size: 15px;
  font-weight: 800;
  color: #6b7d4f;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  z-index: 2;
}

.reveal-pct {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 64px;
  color: #4a3d2a;
  animation: popIn 0.5s ease;
  z-index: 2;
}

.reveal-message {
  font-size: 18px;
  font-weight: 700;
  color: #5c4f3c;
  text-align: center;
  max-width: 460px;
  z-index: 2;
}

.reveal-actions {
  display: flex;
  gap: 14px;
  margin-top: 20px;
  z-index: 2;
}
```

- [ ] **Step 2: Write `src/components/QuizQuestion.tsx`**

```tsx
import type { Question } from '../types';

interface Props {
  question: Question;
  questionNumber: number;
  questionTotal: number;
  onAnswer: (answerText: string) => void;
}

export default function QuizQuestion({ question, questionNumber, questionTotal, onAnswer }: Props) {
  return (
    <div className="quiz-phase">
      <div className="progress-dots">
        {Array.from({ length: questionTotal }, (_, i) => (
          <div
            key={i}
            className="progress-dot"
            style={{ background: i < questionNumber - 1 ? '#6b7d4f' : i === questionNumber - 1 ? '#c4703f' : '#e4dcc8' }}
          />
        ))}
      </div>
      <div className="question-eyebrow">Question {questionNumber} of {questionTotal}</div>
      <div className="question-text">{question.text}</div>
      <div className="question-options">
        {question.options.map((opt) => (
          <button key={opt} className="question-option" onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/QuizLoading.tsx`**

```tsx
interface Props {
  title: string;
  subtitle: string;
  pct: number;
}

export default function QuizLoading({ title, subtitle, pct }: Props) {
  return (
    <div className="loading-phase">
      <div className="loading-title">{title}</div>
      <div className="loading-subtitle">{subtitle}</div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="loading-pct">{pct}%</div>
    </div>
  );
}
```

- [ ] **Step 4: Update `ConfettiPiece` to structured fields**

React's `style` prop doesn't support a raw `cssText` string — each confetti piece needs individual style fields. Edit `src/types.ts`'s `ConfettiPiece` (defined in Task 1) to:

```ts
export interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  duration: number;
  delay: number;
}
```

- [ ] **Step 5: Write `src/components/QuizReveal.tsx`**

```tsx
import type { ConfettiPiece } from '../types';

interface Props {
  matchPct: number;
  mushroomName: string;
  confetti: ConfettiPiece[];
  onRetake: () => void;
  onClose: () => void;
}

export default function QuizReveal({ matchPct, mushroomName, confetti, onRetake, onClose }: Props) {
  return (
    <div className="reveal-phase">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="reveal-confetti-piece"
          style={{ left: `${c.left}%`, background: c.color, animation: `confettiFall ${c.duration}s ease-in ${c.delay}s infinite` }}
        />
      ))}
      <div className="reveal-eyebrow">It's a match!</div>
      <div className="reveal-pct">{matchPct}%</div>
      <div className="reveal-message">
        You and {mushroomName} are basically the same clay. Friendship: officially founded.
      </div>
      <div className="reveal-actions">
        <button className="secondary-button" onClick={onRetake}>Take Again</button>
        <button className="primary-button" onClick={onClose}>Back to Mushrooms</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Wire the full quiz state machine into `src/App.tsx`**

```tsx
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
```

- [ ] **Step 7: Manual check**

```bash
npm run dev
```

Open a mushroom, click "Take the Personality Test". Expected: 5 questions in sequence, progress dots advancing, then a ~1.8s loading bar animating to 100%, then a reveal screen with a 95–99% match, falling confetti, and the mushroom's name in the message. Click "Take Again" — restarts at question 1. Click "Back to Mushrooms" — closes the modal. Stop the server when done.

- [ ] **Step 8: Verify the build**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add src/components/QuizQuestion.tsx src/components/QuizLoading.tsx src/components/QuizReveal.tsx src/styles/quiz.css src/App.tsx src/types.ts
git commit -m "feat: implement personality quiz flow with confetti reveal"
```

---

### Task 7: "Find my mushroom" flow — `MatchFlowModal`, `TraitPicker`, `MatchResults`

**Files:**
- Create: `src/components/MatchFlowModal.tsx`, `src/components/TraitPicker.tsx`, `src/components/MatchResults.tsx`
- Create: `src/styles/matchflow.css`
- Modify: `src/App.tsx` (full match-flow state machine, replaces the `onFindMushroom={() => {}}` no-op)

**Interfaces:**
- Consumes: `TraitGroup` type, `buildTraitGroups` util (Task 2); `Mushroom` type; reuses `QuizLoading` (Task 6) for the match-loading screen.
- Produces: `MatchFlowModal` props `{ phase: 'picking' | 'loading' | 'results'; onClose: () => void; children: ReactNode }`; `TraitPicker` props `{ traitGroups: TraitGroup[]; selectedTraits: string[]; onToggleTrait: (t: string) => void; onConfirm: () => void }`; `MatchResults` props `{ results: Mushroom[]; selectedTraits: string[]; onSelect: (m: Mushroom) => void }`.

- [ ] **Step 1: Write `src/styles/matchflow.css`**

```css
.match-flow-content {
  padding: 56px 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.match-flow-title {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 30px;
  color: #4a3d2a;
}

.match-flow-subtitle {
  font-size: 15px;
  font-weight: 700;
  color: #8a7a63;
  margin-bottom: 22px;
}

.trait-groups {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 32px;
}

.trait-group-label {
  font-size: 12px;
  font-weight: 800;
  color: #a89a80;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.trait-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.trait-chip {
  font-size: 14px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 999px;
  border: 2px solid #e6dcc8;
  background: #ffffff;
  color: #4a3d2a;
}

.trait-chip--active {
  background: #6b7d4f;
  color: #fff;
  border-color: #6b7d4f;
}

.confirm-button {
  align-self: flex-start;
  background: #6b7d4f;
  color: #fff;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 17px;
  padding: 16px 30px;
  border-radius: 999px;
  border: none;
  box-shadow: 0 4px 0 #55613e;
}

.confirm-button--disabled {
  background: #e4dcc8;
  color: #a89a80;
  box-shadow: none;
  cursor: not-allowed;
}

.match-results-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}

.match-result-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 3px 0 rgba(58, 47, 34, 0.06), 0 8px 20px rgba(58, 47, 34, 0.05);
  border: 1px solid #efe6d4;
  width: 230px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0;
}

.match-result-portrait {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.match-result-body {
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.match-result-name {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #4a3d2a;
}

.match-result-tagline {
  font-size: 13px;
  font-weight: 700;
  color: #8a7a63;
}

.match-result-label {
  font-size: 12px;
  font-weight: 800;
  color: #6b7d4f;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.match-results-empty {
  color: #8a7a63;
  font-weight: 700;
  padding: 20px 0;
}
```

- [ ] **Step 2: Write `src/components/TraitPicker.tsx`**

```tsx
import type { TraitGroup } from '../types';

interface Props {
  traitGroups: TraitGroup[];
  selectedTraits: string[];
  onToggleTrait: (t: string) => void;
  onConfirm: () => void;
}

export default function TraitPicker({ traitGroups, selectedTraits, onToggleTrait, onConfirm }: Props) {
  const canConfirm = selectedTraits.length >= 3;
  return (
    <div className="match-flow-content">
      <div className="match-flow-title">What are you like?</div>
      <div className="match-flow-subtitle">
        Pick at least 3 traits and we'll find your closest clay match &mdash; {selectedTraits.length} selected
      </div>
      <div className="trait-groups">
        {traitGroups.map((group) => (
          <div key={group.label}>
            <div className="trait-group-label">{group.label}</div>
            <div className="trait-chip-row">
              {group.traits.map((trait) => {
                const active = selectedTraits.includes(trait);
                return (
                  <button
                    key={trait}
                    className={`trait-chip${active ? ' trait-chip--active' : ''}`}
                    onClick={() => onToggleTrait(trait)}
                  >
                    {trait}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        className={`confirm-button${canConfirm ? '' : ' confirm-button--disabled'}`}
        onClick={onConfirm}
        disabled={!canConfirm}
      >
        Find my mushroom
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/MatchResults.tsx`**

```tsx
import type { Mushroom } from '../types';

interface Props {
  results: Mushroom[];
  selectedTraits: string[];
  onSelect: (m: Mushroom) => void;
}

export default function MatchResults({ results, selectedTraits, onSelect }: Props) {
  return (
    <div className="match-flow-content">
      <div className="match-flow-title">Your top matches</div>
      <div className="match-flow-subtitle">Ranked by shared personality traits</div>
      <div className="match-results-grid">
        {results.map((m) => {
          const shared = m.tags.filter((t) => selectedTraits.includes(t)).length;
          return (
            <button key={m.id} className="match-result-card" onClick={() => onSelect(m)}>
              <div className="match-result-portrait" style={{ background: m.color }} />
              <div className="match-result-body">
                <div className="match-result-name">{m.name}</div>
                <div className="match-result-tagline">{m.tagline}</div>
                <div className="match-result-label">{shared} of {selectedTraits.length} traits shared</div>
              </div>
            </button>
          );
        })}
      </div>
      {results.length === 0 && (
        <div className="match-results-empty">No overlap found with those traits &mdash; try picking a different mix.</div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/MatchFlowModal.tsx`**

```tsx
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
```

- [ ] **Step 5: Wire the match-flow state machine into `src/App.tsx`**

Add to the existing `App.tsx` (from Task 6): new imports (`MatchFlowModal`, `TraitPicker`, `MatchResults`, `buildTraitGroups`, `matchflow.css`), new state, and render branch. Full updated file:

```tsx
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
```

- [ ] **Step 6: Manual check**

```bash
npm run dev
```

Click "Not sure? Find my mushroom". Expected: modal with four trait-group buckets (Bold & Energetic / Warm & Social / Calm & Grounded / Careful & Steady) of clickable trait chips, a running "N selected" count, and a disabled "Find my mushroom" button until 3+ traits are picked. Selecting 3+ traits enables the button (green); clicking it shows the same loading-bar animation, then up to 3 ranked result cards with "N of M traits shared" labels. Clicking a result opens that mushroom's detail modal directly. Test the empty-result case by picking 3 traits that only sold-out or non-overlapping mushrooms have (or mark enough mushrooms sold first) — expect the "No overlap found" message. Stop the server when done.

- [ ] **Step 7: Verify the build**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/components/MatchFlowModal.tsx src/components/TraitPicker.tsx src/components/MatchResults.tsx src/styles/matchflow.css src/App.tsx
git commit -m "feat: implement find-my-mushroom trait-matching flow"
```

---

### Task 8: Final polish and full manual walkthrough

**Files:**
- Modify: `README.md` (create if absent)
- No other files expected to change — this task is verification, not new features.

**Interfaces:**
- Consumes: the complete app from Tasks 1–7.
- Produces: nothing new — confirms the app matches the spec end-to-end.

- [ ] **Step 1: Write a minimal `README.md`**

```md
# Mushroom Personality Matcher

A gallery of 45 clay mushroom characters. Browse, search, and take a personality quiz
to see your match percentage with any mushroom — or use "Find my mushroom" to pick your
own traits and get ranked matches. Sold status persists locally.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`
```

- [ ] **Step 2: Full manual walkthrough**

```bash
npm run dev
```

Walk through, in order:
1. Gallery loads with 45 cards, correct fonts (Baloo 2 headings, Nunito body) and colors.
2. Search narrows the grid; an unmatched query shows the empty state; clearing restores all 45.
3. Open a card → detail modal → mark sold → close → reopen same card → still sold → reload the page → still sold (localStorage).
4. Mark it available again (cleanup for the next check).
5. Take the personality test on an unsold mushroom end-to-end (5 questions → loading → reveal with confetti) → "Take Again" restarts it → "Back to Mushrooms" closes the modal.
6. Open "Find my mushroom" → pick fewer than 3 traits (button stays disabled) → pick 3+ (button enables) → confirm → loading → results → click a result → its detail modal opens.
7. Resize the browser window narrow (~375px) — grid reflows to fewer columns, modals stay usable (scroll, no horizontal overflow).

Fix any visual or behavioral mismatch against `docs/superpowers/specs/2026-07-15-mushroom-personality-matcher-design.md` before proceeding.

- [ ] **Step 3: Final build check**

```bash
npm run build
```

Expected: clean build, no TypeScript errors, no console warnings in the dev server output from the walkthrough.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add README with dev/build instructions"
```
