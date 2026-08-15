# Mushroom Content Guide

How to write personality traits, descriptions, and card framing for a mushroom character, based on what's actually in its photo.

## Adding a new mushroom

1. Drop the `.webp` photo into `src/data/images/`. The gallery picks it up automatically — the filename becomes the slug, and the slug becomes the display name (underscores → spaces, each word capitalized: `lord_giant` → "Lord Giant").
2. Add an entry to `TRAITS` and `DESCRIPTIONS` in `src/data/mushrooms.ts`, keyed by that same slug. Skipping either falls back to a `'temp'` placeholder.
3. Optionally add a framing override in `src/data/cardFocus.ts` (see below) if the photo needs it.

## Personality traits

Look at the photo itself, not just the name. Useful signals:

- **Eyes / brows** — closed or heavy-lidded reads as calm/sleepy; wide, googly eyes read as curious/nervous/surprised; furrowed brows read as grumpy/angry/serious.
- **Mouth** — a smile reads as cheerful/friendly; a smirk reads as confident/sassy; neutral or downturned reads as sad/stubborn.
- **Pose / gesture** — raised hands or an open stance read as playful/confident; a small, tucked-in pose reads as shy/quiet.
- **Color mood** — dark reds and browns skew angry/serious; pastels skew gentle/sweet; sparkly finishes skew dreamy/mysterious.
- **The name**, when it's a strong hint (Frustrashroom, Grumplet, Sporacle) — but the photo is the tiebreaker, not the name.

Rules:

- **Exactly 3 traits per mushroom.**
- **Draw only from the fixed 30-word vocabulary below** — don't invent a 31st word. The cap keeps the "shared traits" matching meaningful and keeps the grouped trait picker in the "Find my mushroom" flow readable. If a mushroom genuinely needs a nuance the list doesn't have, retire an underused word first, and update `TRAIT_TO_BUCKET` in `src/utils.ts` in the same change.
- **No two mushrooms share the exact same 3-trait set** (order doesn't matter). If the first two traits are an obvious pairing that's already used elsewhere, vary the third.
- **Reuse traits freely across mushrooms.** Overlap is the point — it's what makes trait-matching produce real ranked results instead of every mushroom being an island.

The 30-word vocabulary, grouped the same way the trait picker groups them:

| Bold & Energetic | Warm & Social | Calm & Grounded | Careful & Steady |
|---|---|---|---|
| confident | cheerful | calm | grumpy |
| playful | happy | serene | stubborn |
| sassy | friendly | sleepy | serious |
| energetic | sweet | dreamy | angry |
| silly | gentle | chill | sad |
| surprised | cozy | quiet | frustrated |
| alert | | mysterious | nervous |
| curious | | wise | quirky |

### Lesson learned: verify one photo at a time

Assign traits by opening each photo **individually** — one image per look — rather than writing descriptions for a whole batch from memory or from images viewed in parallel. Doing it in bulk once caused three mushrooms (`twix`, `victor`, `tove`) to get their descriptions scrambled between photos, and it only surfaced later during an unrelated spot-check. Before trusting a trait assignment, re-open the exact file it's supposedly describing and confirm.

## Descriptions

- **Short.** One sentence, or two very short ones. If it needs three, it's too long for the card.
- **Playful, a little dry, never explains the joke.**
- **Describe the personality the photo suggests, not the physical appearance.** Not "he's orange with a red cap" — more like `fungary`: "I'm fine, I'm fine."
- **Voice varies by character, not by formula** — first-person quips (`fungary`: "I'm fine, I'm fine."), wry third-person asides (`victor`: "Won the argument. Still mad."), or a direct pitch to the shopper (`whycelium`: "Take Whycelium home, he handles all the nonsense."). Use whichever lands funniest for that specific mushroom.
- **Lean on the name** when it's already a pun or a punchline (`frustrashroom`, `sporacle`).

## Card image framing (`src/data/cardFocus.ts`)

Gallery cards are square. Most source photos are already a 1000×1000 square, so `object-fit: cover` has **zero room to crop or recenter anything** — if the subject sits off-center in the photo, it sits off-center in the card, full stop. Only add an override when a mushroom's face genuinely sits small or off-center in its own photo.

Measure it, don't eyeball it from a shrunk thumbnail:

```bash
magick <file>.webp -fuzz 25% -trim -format "%wx%h%O" info:
```

This prints the foreground bounding box against the photo's background. Use it to compute:

- `x` / `y` — center of that bounding box, as a percent of the full image size.
- `zoom` — how much to scale up so the subject fills a comfortable share of the frame. Keep it under ~1.4x so nothing gets cropped too tight.

Two different mechanisms are needed depending on the source photo's aspect ratio:

- **Square photos** (the normal case) need both `zoom` (> 1) and the resulting `transform: scale()` / `transformOrigin`. Setting only `x`/`y` with `zoom: 1` does nothing — `object-position` has no effect when the image and its container are already the same aspect ratio, since there's no overflow to reposition.
- **Non-square photos** (e.g. a phone snapshot, like Shroomita's) can often be fixed with `objectPosition` alone (`zoom: 1`), since `cover` already crops them to fit the square and `object-position` has real room to shift within that crop.

Note the key format differs from `mushrooms.ts`: `cardFocus.ts` is keyed by the mushroom's `id` (dashes — `lord-giant`), not its image slug (underscores — `lord_giant`).

## Where things live

| File | Contents | Key format |
|---|---|---|
| `src/data/mushrooms.ts` | `TRAITS`, `DESCRIPTIONS` | image filename slug (`lord_giant`) |
| `src/data/cardFocus.ts` | optional card framing overrides | mushroom `id` (`lord-giant`) |
| `src/utils.ts` | `TRAIT_TO_BUCKET` — groups the 30 traits into the 4 categories shown in the "Find my mushroom" picker | trait word |
