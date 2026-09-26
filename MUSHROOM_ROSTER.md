# Shroomarium Content Reference

Full personality-matching questionnaire and mushroom roster, as of the P01-P38 photo batch and its partial naming (2026-09-26). Source of truth is `src/data/mushrooms.ts` and `src/utils.ts` — this file is a human-readable snapshot of that data.

## 1. The Personality Quiz

Shown per-mushroom in the detail modal ("Take the Personality Test"). Five questions, four options each, purely for flavor/reveal — the quiz always ends on the mushroom you opened.

| # | Question | Options |
|---|---|---|
| 1 | What's your perfect vacation? | Cabin · City trip · Beach · Backpacking |
| 2 | What's your perfect weekend? | Reading · With friends · Spontaneous · Cleaning |
| 3 | What's your perfect dinner? | Comfort food · Takeout · Street food · Fancy solo |
| 4 | What's your favorite marine animal? | Octopus · Dolphin · Turtle · Jellyfish |
| 5 | What's your favorite colour? | Morning-brown · Screaming pink · Mossy green · Mushroom |

## 2. The "Find My Mushroom" Trait Picker

The other entry point ("Not sure? Find my mushroom") shows every trait in use, grouped into four buckets, and matches on overlap with the 3 traits assigned to each mushroom.

| Bucket | Traits |
|---|---|
| Bold & Energetic | alert · confident · curious · energetic · playful · sassy · silly · surprised |
| Warm & Social | cheerful · cozy · friendly · gentle · happy · sweet |
| Calm & Grounded | calm · chill · dreamy · mysterious · quiet · serene · sleepy · wise |
| Careful & Steady | angry · frustrated · grumpy · nervous · quirky · sad · serious · stubborn |

30 traits total, fixed pool — every mushroom (new or old) draws its 3 tags from this list only, so match results stay meaningful across the whole roster.

## 3. Live Mushroom Roster (89 named cards)

Legend: **New** = brand-new character, first appearance in the 2026-08-15 photo set · **Refreshed** = same character, new single photo, description/traits unchanged · **Multi-piece** = multiple clay pieces sharing one name/description/traits (all cards say e.g. "Fungary", ids differ: `fungary-1` / `fungary-2` / ...) · **Restored** = older `.webp` photo brought back after being temporarily hidden by the photo-set sync; description/traits unchanged.

| Name | Status | Traits | Description |
|---|---|---|---|
| Antonio | New | confident · silly · energetic | Mid-aria, always. The neighbors have opinions. |
| Apocap | Refreshed | confident · playful · sassy | Embrace the chaos. Welcome shroomageddon. |
| Barney Mc Glee | New | sleepy · happy · cozy | Half asleep, fully delighted. |
| Bean | Restored | cheerful · cozy · happy | Perpetually pleased. Ask him why, he won't know. |
| Bitterbutton ×3 | Multi-piece | grumpy · sad · stubborn | Your tiny rage manager for everyday frustrations. |
| Caleb | Restored | calm · dreamy · serene | Off in his own galaxy. Send snacks. |
| Catshroom | New | playful · curious · quirky | Not a cat. Acts like one anyway. |
| Chancelina | New | serene · calm · dreamy | Elegant, aloof, unbothered by the moss. |
| Charlie | New | nervous · alert · quiet | Charlie's fine. Charlie's just processing. |
| Chillbert ×7 | Multi-piece | chill · confident · playful | Fingers up, problems down. You're welcome. |
| Churo | Restored | cozy · gentle · sleepy | Naps professionally. Very good at it. |
| Creed | New | serious · stubborn · alert | Has a creed. Won't share it. |
| Disco Shroo | New | confident · playful · silly | Born under a disco ball. Never left. |
| Doomshroom | Refreshed | angry · grumpy · serious | When life gives lemons, he throws them back screaming. |
| Echo | Restored | dreamy · quiet · sad | Feels everything, says nothing. |
| Eligiah | New | surprised · alert · curious | Wide-eyed about literally everything. |
| Faye | Restored | dreamy · gentle · sweet | Made of stardust and soft feelings. |
| Fern | Restored | curious · quirky · sassy | Knows something you don't. |
| Ferris | New | confident · playful · cheerful | Skipping today. Skipping every day. |
| Frustrashroom ×2 | Multi-piece | frustrated · grumpy · stubborn | I don't know what I'm doing either. |
| Fungary ×3 | Multi-piece | cheerful · curious · friendly | I'm fine, I'm fine. |
| Garlic | New | alert · nervous · quirky | Keeps vampires and small talk away. |
| Grumplet ×4 | Multi-piece | grumpy · serious · stubborn | He judges the world so you can relax. Just let him speak to the manager. |
| Jamie | Restored | curious · friendly · happy | Everyone's favorite new best friend. |
| Jimothy | New | serious · stubborn · calm | Not impressed. Rarely is. |
| Johaness | Restored | calm · gentle · sweet | Quietly the nicest one here. |
| Lennard | Restored | confident · serious · stubborn | Not asking twice. |
| Lil Nosey | Restored | mysterious · quiet · quirky | He's lowkey low key. |
| Lord Giant | Restored | alert · curious · nervous | Big name. Bigger worries. |
| Lorelei | Restored | calm · serene · sleepy | Drifting off somewhere lovely. |
| Louis | New | grumpy · serious · nervous | Louis has concerns. Several. |
| Lumen | Restored | alert · mysterious · serious | Watching. Always watching. |
| Mark | Restored | curious · playful · silly | Found a ladybug. Life complete. |
| Moss | Restored | calm · cozy · gentle | Settled in. Never leaving. |
| Mushmello ×2 | Multi-piece | cozy · sleepy · sweet | The one that keeps the nicest, sweetest dreams. The rest can burn. |
| Nemo | Restored | chill · dreamy · serene | Found Nemo. He wasn't lost, just chilling. |
| Niuls | New | confident · sassy · playful | Hands on hips. Judging your outfit. |
| Norbert | New | calm · cozy · happy | Orange you glad he's this chill? |
| Nosewise ×2 | Multi-piece | alert · curious · quirky | You can rely on him, he's pretty damn serious. |
| Nugget | Refreshed | calm · mysterious · quiet | Says nothing. Somehow says everything. |
| Okayniel | New | confident · playful · cheerful | Gives the OK sign to absolutely everything. |
| Onyx | New | serious · stubborn · alert | Cold as the stone. Twice as sharp. |
| Pesto | Restored | alert · curious · gentle | Sharp eyes, soft heart. |
| Peter | Restored | calm · gentle · sleepy | One eye open, just in case. |
| Pickle | Restored | curious · nervous · surprised | In a bit of a pickle. Always. |
| Plotty | New | grumpy · stubborn · serious | Plotty's plan has 47 steps. Step one: glare. |
| Professor Spore | Refreshed | calm · serious · wise | Ask anything. He'll nod knowingly. |
| Raven | Restored | calm · gentle · serene | Peace, but make it pastel. |
| Ray | New | cheerful · happy · friendly | A literal ray of sunshine. Slightly damp. |
| Robert | New | serious · calm · quiet | Robert doesn't do small talk. |
| Robin | New | sleepy · sad · quiet | Robin's had a day. Every day. |
| Secret | Restored | cheerful · curious · playful | Can't tell you. Wouldn't be a secret. |
| Shhhroom | New | quiet · mysterious · nervous | Shhh. Or don't. Whatever. Shhh though. |
| Shroomita | Refreshed | alert · confident · mysterious | She just got here. It got exclusive. |
| Shroopsy ×4 | Multi-piece | energetic · quirky · silly | Shroopsy had a plan. This was not it. |
| Skippy | Restored | calm · chill · confident | Too cool to rush. |
| Sporacle ×2 | Multi-piece | calm · mysterious · wise | Sporacle has seen the future. Sporacle is taking a moment. |
| Sporella | New | confident · sweet · mysterious | Sporella. Yes, like the ball. No, no prince. |
| Stroop | Restored | gentle · sleepy · sweet | Soft, sweet, slightly syrupy. |
| Sven | New | calm · gentle · quiet | Sven says little. Means all of it. |
| Ted | Restored | calm · confident · playful | Knows exactly what he's doing. |
| Teeny And Tiny | Restored | energetic · friendly · playful | Small, loud, inseparable. |
| Theo | New | curious · calm · alert | Theo's just here for the view. |
| Tofu | Restored | curious · friendly · gentle | Goes well with literally everyone. |
| Tove | Restored | chill · serene · sleepy | Basically already asleep. |
| Twix | Restored | calm · cozy · sweet | Snack-sized comfort. |
| Victor | Restored | angry · grumpy · stubborn | Won the argument. Still mad. |
| Whisper | Restored | calm · quiet · serene | Barely there. Perfectly calm. |
| Whycelium | Refreshed | energetic · silly · surprised | So what? Who cares? Whatever. Take Whycelium home, he handles all the nonsense. |

**Tally:** 24 new · 6 refreshed · 9 multi-piece characters (29 cards) · 30 restored = 89 cards.

## 4. Pending / Unnamed Roster (26 cards)

38 raw phone photos came in as one batch and were provisionally named `P01`-`P38` with `'temp'` placeholder traits/description. 12 have since been identified as more pieces of existing characters (folded into section 3 above, as `_N` files on the matching slug — e.g. `P01`/`P04` → `shroopsy_3`/`shroopsy_4`). The rest are still waiting on a name, traits, and a description per `MUSHROOM_CONTENT_GUIDE.md`.

| Slug | Traits | Description |
|---|---|---|
| P05, P06, P09, P11, P12, P13, P14, P15, P17, P18, P20, P21, P23, P24, P25, P26, P27, P28, P29, P30, P31, P33, P34, P35, P36, P38 | temp · temp · temp | temp |
