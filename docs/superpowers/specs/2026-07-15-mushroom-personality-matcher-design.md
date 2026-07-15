# Mushroom Personality Matcher — Design

## Source

Imported from a claude.ai/design prototype (project `446bac11-e9be-4b8f-b039-070a8b2a9014`,
file `Mushroom Personality Matcher.dc.html`, plus `mushroom-data.js`). The prototype uses a
proprietary `x-dc` template runtime (`support.js`) intended only for prototyping inside the
design tool — not something to ship. This spec covers porting its exact visual design and
behavior into a standalone React app.

## Product behavior (from the prototype, unchanged)

- A gallery of 45 procedurally-generated clay mushroom characters (deterministic generation
  from fixed name/archetype/adjective/habitat word banks — no randomness).
- Each mushroom has: id, name, initials, tagline (personality archetype), tags (3 traits),
  description, and a portrait color.
- **Search**: fuzzy-matches mushroom names as the user types (substring or in-order character
  match).
- **Mushroom detail modal**: portrait, name, tagline, description, tags, and either a "Take the
  Personality Test" button (if not sold) or a "sold" message, plus a toggle to mark
  sold/available.
- **Personality quiz**: 5 fixed questions, each with 4 options, one at a time with a progress
  dots indicator. On the last answer, a ~1.8s simulated "loading" phase (progress bar filling
  via a 150ms interval) leads to a reveal screen: a random 95–99% match score, confetti
  animation, and buttons to retake or return to the gallery.
- **"Not sure? Find my mushroom" flow** (separate modal): user picks 3+ personality traits from
  four grouped buckets (Bold & Energetic / Warm & Social / Calm & Grounded / Careful & Steady,
  derived from the mushroom archetypes). Confirming triggers the same simulated loading, then
  shows the top 3 unsold mushrooms ranked by shared-trait count (ties/no-overlap handled with an
  empty-state message). Selecting a result opens that mushroom's detail modal.
- **Sold state** persists across reloads via `localStorage` (key `mushroom-sold-ids`). Sold
  mushrooms show a grayscale portrait and a "Sold" badge in the gallery and detail view, and are
  excluded from match results.
- Visual language: cream background (`#f6f1e7`), warm browns/oranges (`#4a3d2a` text, `#c4703f`
  primary accent), sage green secondary accent (`#6b7d4f`), pill-shaped buttons/chips/badges,
  `Baloo 2` display font + `Nunito` body font (Google Fonts), soft card shadows, rounded-corner
  modals with `modalIn`/`popIn`/`confettiFall` animations.

## Stack

Vite + React + TypeScript. Client-only SPA, no backend, no routing (single page with modal
overlays). No test framework — this is a small interactive UI verified manually via the dev
server.

## Architecture

```
src/
  main.tsx              — entry point
  App.tsx               — owns all top-level state, composes everything below
  types.ts              — Mushroom, Question, TraitGroup, etc.
  data/
    mushrooms.ts         — ported generation logic (45 mushrooms) + fixed question bank
  hooks/
    useSoldMushrooms.ts  — localStorage-backed sold-id set (load once, persist on toggle)
  components/
    Header.tsx           — title, search input, "Find my mushroom" button
    MushroomGrid.tsx      — grid of MushroomCard, empty-state message
    MushroomCard.tsx      — single gallery card (portrait, name, tagline, tags, sold badge)
    DetailModal.tsx        — modal shell + phase switch (detail/question/loading/reveal)
    MushroomDetail.tsx      — detail phase content
    QuizQuestion.tsx         — question phase content + progress dots
    QuizLoading.tsx           — shared loading UI (reused by both flows via props)
    QuizReveal.tsx             — reveal phase content + confetti
    MatchFlowModal.tsx     — modal shell + phase switch (picking/loading/results)
    TraitPicker.tsx          — trait bucket chips + confirm button
    MatchResults.tsx          — ranked result cards + empty state
  styles/
    global.css            — font imports, CSS variables for the palette, keyframes, body reset
    (one .css file per component, colocated, using the same values as the prototype)
```

State lives in `App` via `useState` (mirrors the prototype's single-component state; the app is
small enough that prop drilling through ~2 levels is clear and doesn't need context/reducer):

- `query: string`
- `selectedId: string | null`, `phase: 'detail' | 'question' | 'loading' | 'reveal'`, `qIndex`,
  `answers`, `loadingPct`, `matchPct`, `confetti`
- `matchFlow: 'picking' | 'loading' | 'results' | null`, `selectedTraits`, `matchLoadingPct`,
  `matchResults`
- `soldIds` (from `useSoldMushrooms`, synced to `localStorage`)

Derived data (filtered list, fuzzy match, trait buckets, styled card props) computed inline in
`App` or child components via `useMemo`, same logic as the prototype's `renderVals()`.

## Data & logic port

`mushroom-data.js`'s word banks, the 45-mushroom generation loop, and the 5-question bank port
verbatim into `data/mushrooms.ts` with TypeScript types — same output, same determinism (no
`Math.random()` in generation; only the quiz reveal's match % and the loading-bar timer use
randomness/timers, matching the prototype).

## Out of scope

- Any backend/persistence beyond `localStorage`.
- Editing mushroom data at runtime (beyond the sold toggle).
- Responsive/mobile-specific redesign — the prototype's grid (`auto-fill, minmax(240px,1fr)`)
  and modal sizing already flex reasonably; port as-is.
