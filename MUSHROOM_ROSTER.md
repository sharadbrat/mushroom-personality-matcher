# Shroomarium Content Reference

Full personality-matching questionnaire and mushroom roster, as of the photo-set sync (2026-08-15). Source of truth is `src/data/mushrooms.ts` and `src/utils.ts` — this file is a human-readable snapshot of that data.

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

## 3. Live Mushroom Roster (47 cards, current photo set)

Legend: **New** = brand-new character, first appearance in this photo set · **Refreshed** = same character, new single photo, description/traits unchanged · **Two-piece** = two separate clay pieces sharing one name/description/traits (both cards say e.g. "Fungary", ids differ: `fungary-1` / `fungary-2`).

| Name | Status | Traits | Description |
|---|---|---|---|
| Antonio | New | confident · silly · energetic | Mid-aria, always. The neighbors have opinions. |
| Apocap | Refreshed | confident · playful · sassy | Embrace the chaos. Welcome shroomageddon. |
| Barney Mc Glee | New | sleepy · happy · cozy | Half asleep, fully delighted. |
| Bitterbutton ×2 | Two-piece | grumpy · sad · stubborn | Your tiny rage manager for everyday frustrations. |
| Catshroom | New | playful · curious · quirky | Not a cat. Acts like one anyway. |
| Chancelina | New | serene · calm · dreamy | Elegant, aloof, unbothered by the moss. |
| Charlie | New | nervous · alert · quiet | Charlie's fine. Charlie's just processing. |
| Chillbert ×2 | Two-piece | chill · confident · playful | Fingers up, problems down. You're welcome. |
| Creed | New | serious · stubborn · alert | Has a creed. Won't share it. |
| Disco Shroo | New | confident · playful · silly | Born under a disco ball. Never left. |
| Doomshroom | Refreshed | angry · grumpy · serious | When life gives lemons, he throws them back screaming. |
| Eligiah | New | surprised · alert · curious | Wide-eyed about literally everything. |
| Ferris | New | confident · playful · cheerful | Skipping today. Skipping every day. |
| Frustrashroom | Refreshed | frustrated · grumpy · stubborn | I don't know what I'm doing either. |
| Fungary ×2 | Two-piece | cheerful · curious · friendly | I'm fine, I'm fine. |
| Garlic | New | alert · nervous · quirky | Keeps vampires and small talk away. |
| Grumplet ×2 | Two-piece | grumpy · serious · stubborn | He judges the world so you can relax. Just let him speak to the manager. |
| Jimothy | New | serious · stubborn · calm | Not impressed. Rarely is. |
| Louis | New | grumpy · serious · nervous | Louis has concerns. Several. |
| Mushmello ×2 | Two-piece | cozy · sleepy · sweet | The one that keeps the nicest, sweetest dreams. The rest can burn. |
| Niuls | New | confident · sassy · playful | Hands on hips. Judging your outfit. |
| Norbert | New | calm · cozy · happy | Orange you glad he's this chill? |
| Nosewise ×2 | Two-piece | alert · curious · quirky | You can rely on him, he's pretty damn serious. |
| Nugget | Refreshed | calm · mysterious · quiet | Says nothing. Somehow says everything. |
| Okayniel | New | confident · playful · cheerful | Gives the OK sign to absolutely everything. |
| Onyx | New | serious · stubborn · alert | Cold as the stone. Twice as sharp. |
| Plotty | New | grumpy · stubborn · serious | Plotty's plan has 47 steps. Step one: glare. |
| Professor Spore | Refreshed | calm · serious · wise | Ask anything. He'll nod knowingly. |
| Ray | New | cheerful · happy · friendly | A literal ray of sunshine. Slightly damp. |
| Robert | New | serious · calm · quiet | Robert doesn't do small talk. |
| Robin | New | sleepy · sad · quiet | Robin's had a day. Every day. |
| Shhhroom | New | quiet · mysterious · nervous | Shhh. Or don't. Whatever. Shhh though. |
| Shroomita | Refreshed | alert · confident · mysterious | She just got here. It got exclusive. |
| Shroopsy ×2 | Two-piece | energetic · quirky · silly | Shroopsy had a plan. This was not it. |
| Sporacle ×2 | Two-piece | calm · mysterious · wise | Sporacle has seen the future. Sporacle is taking a moment. |
| Sporella | New | confident · sweet · mysterious | Sporella. Yes, like the ball. No, no prince. |
| Sven | New | calm · gentle · quiet | Sven says little. Means all of it. |
| Theo | New | curious · calm · alert | Theo's just here for the view. |
| Whycelium | Refreshed | energetic · silly · surprised | So what? Who cares? Whatever. Take Whycelium home, he handles all the nonsense. |

**Tally:** 24 new · 7 refreshed · 8 two-piece pairs (16 cards) = 47 cards.

## 4. Retired Roster (kept in source, hidden from the app)

No current photo, so `buildMushrooms()` skips these — copy stays in `src/data/mushrooms.ts` in case the clay piece resurfaces.

| Name | Traits | Description |
|---|---|---|
| Bean | cheerful · cozy · happy | Perpetually pleased. Ask him why, he won't know. |
| Caleb | calm · dreamy · serene | Off in his own galaxy. Send snacks. |
| Churo | cozy · gentle · sleepy | Naps professionally. Very good at it. |
| Echo | dreamy · quiet · sad | Feels everything, says nothing. |
| Faye | dreamy · gentle · sweet | Made of stardust and soft feelings. |
| Fern | curious · quirky · sassy | Knows something you don't. |
| Jamie | curious · friendly · happy | Everyone's favorite new best friend. |
| Johaness | calm · gentle · sweet | Quietly the nicest one here. |
| Lennard | confident · serious · stubborn | Not asking twice. |
| Lil Nosey | mysterious · quiet · quirky | He's lowkey low key. |
| Lord Giant | alert · curious · nervous | Big name. Bigger worries. |
| Lorelei | calm · serene · sleepy | Drifting off somewhere lovely. |
| Lumen | alert · mysterious · serious | Watching. Always watching. |
| Mark | curious · playful · silly | Found a ladybug. Life complete. |
| Moss | calm · cozy · gentle | Settled in. Never leaving. |
| Nemo | chill · dreamy · serene | Found Nemo. He wasn't lost, just chilling. |
| Pesto | alert · curious · gentle | Sharp eyes, soft heart. |
| Peter | calm · gentle · sleepy | One eye open, just in case. |
| Pickle | curious · nervous · surprised | In a bit of a pickle. Always. |
| Raven | calm · gentle · serene | Peace, but make it pastel. |
| Secret | cheerful · curious · playful | Can't tell you. Wouldn't be a secret. |
| Skippy | calm · chill · confident | Too cool to rush. |
| Stroop | gentle · sleepy · sweet | Soft, sweet, slightly syrupy. |
| Ted | calm · confident · playful | Knows exactly what he's doing. |
| Teeny And Tiny | energetic · friendly · playful | Small, loud, inseparable. |
| Tofu | curious · friendly · gentle | Goes well with literally everyone. |
| Tove | chill · serene · sleepy | Basically already asleep. |
| Twix | calm · cozy · sweet | Snack-sized comfort. |
| Victor | angry · grumpy · stubborn | Won the argument. Still mad. |
| Whisper | calm · quiet · serene | Barely there. Perfectly calm. |
