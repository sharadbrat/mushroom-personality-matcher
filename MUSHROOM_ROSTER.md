# Shroomarium Content Reference

Full personality-matching questionnaire and mushroom roster, as of the P01-P38 photo batch being fully resolved (2026-09-27). Source of truth is `src/data/mushrooms.ts` and `src/utils.ts` — this file is a human-readable snapshot of that data.

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

## 3. Live Mushroom Roster (114 named cards)

Legend: **New** = brand-new character, first appearance in the 2026-08-15 photo set or the P01-P38 batch · **Refreshed** = same character, new single photo, description/traits unchanged · **Multi-piece** = multiple clay pieces sharing one name/description/traits (all cards say e.g. "Fungary", ids differ: `fungary-1` / `fungary-2` / ...) · **Restored** = older `.webp` photo brought back after being temporarily hidden by the photo-set sync; description/traits unchanged.

| Name | Status | Traits | Description |
|---|---|---|---|
| Antonio | New | confident · silly · energetic | Mid-aria, always. The neighbors have opinions. |
| Apocap | Refreshed | confident · playful · sassy | Embrace the chaos. Welcome shroomageddon. |
| Barney Mc Glee | New | sleepy · happy · cozy | Half asleep, fully delighted. |
| Bean | Restored | cheerful · cozy · happy | Perpetually pleased. Ask him why, he won't know. |
| Billy | New | nervous · quiet · sad | Assumes the worst. Usually right. |
| Bitterbutton ×3 | Multi-piece | grumpy · sad · stubborn | Your tiny rage manager for everyday frustrations. |
| Caleb | Restored | calm · dreamy · serene | Off in his own galaxy. Send snacks. |
| Carrie | New | nervous · quirky · surprised | Always mid double-take. |
| Catshroom | New | playful · curious · quirky | Not a cat. Acts like one anyway. |
| Chancelina | New | serene · calm · dreamy | Elegant, aloof, unbothered by the moss. |
| Charlie | New | nervous · alert · quiet | Charlie's fine. Charlie's just processing. |
| Chillbert ×7 | Multi-piece | chill · confident · playful | Fingers up, problems down. You're welcome. |
| Churo | Restored | cozy · gentle · sleepy | Naps professionally. Very good at it. |
| Clay | New | cheerful · playful · silly | Literally made of clay. Doesn't dwell on it. |
| Creed | New | serious · stubborn · alert | Has a creed. Won't share it. |
| Disco Shroo | New | confident · playful · silly | Born under a disco ball. Never left. |
| Doomshroom | Refreshed | angry · grumpy · serious | When life gives lemons, he throws them back screaming. |
| Echo | Restored | dreamy · quiet · sad | Feels everything, says nothing. |
| Eligiah | New | surprised · alert · curious | Wide-eyed about literally everything. |
| Eric | New | nervous · quirky · silly | That mouth again. Never a good sign. |
| Eternity | New | calm · serene · wise | Closed her eyes once. Hasn't opened them since. |
| Faye | Restored | dreamy · gentle · sweet | Made of stardust and soft feelings. |
| Fern | Restored | curious · quirky · sassy | Knows something you don't. |
| Ferris | New | confident · playful · cheerful | Skipping today. Skipping every day. |
| Frustrashroom ×2 | Multi-piece | frustrated · grumpy · stubborn | I don't know what I'm doing either. |
| Fungary ×3 | Multi-piece | cheerful · curious · friendly | I'm fine, I'm fine. |
| Garlic | New | alert · nervous · quirky | Keeps vampires and small talk away. |
| Grumplet ×4 | Multi-piece | grumpy · serious · stubborn | He judges the world so you can relax. Just let him speak to the manager. |
| Heaven | New | alert · mysterious · quirky | Cracked, spotted, faraway. Not from around here. |
| Hero | New | alert · curious · sweet | Hero, in name only. Still scared of the dark. |
| Honey | New | curious · gentle · sweet | Sweet as the name promises. Slightly nosy about it. |
| Infinity | New | calm · quirky · sleepy | Covered in dots. Counting them put her to sleep. |
| Jamie | Restored | curious · friendly · happy | Everyone's favorite new best friend. |
| Jimothy | New | serious · stubborn · calm | Not impressed. Rarely is. |
| Johaness | Restored | calm · gentle · sweet | Quietly the nicest one here. |
| Kyle | New | cheerful · happy · silly | Grinning. No particular reason. |
| Lennard | Restored | confident · serious · stubborn | Not asking twice. |
| Leto | New | confident · gentle · sassy | One eyebrow up. Permanently unconvinced. |
| Lil Nosey | Restored | mysterious · quiet · quirky | He's lowkey low key. |
| Loopy Shroopy | New | playful · quirky · silly | Tongue out, eyes everywhere. Physically incapable of a serious photo. |
| Lord Giant | Restored | alert · curious · nervous | Big name. Bigger worries. |
| Lorelei | Restored | calm · serene · sleepy | Drifting off somewhere lovely. |
| Louis ×2 | Multi-piece | grumpy · serious · nervous | Louis has concerns. Several. |
| Lumen | Restored | alert · mysterious · serious | Watching. Always watching. |
| Mabel | New | alert · mysterious · nervous | Knows something. Isn't saying what. |
| Mark | Restored | curious · playful · silly | Found a ladybug. Life complete. |
| Maxie | New | curious · silly · surprised | Didn't see that coming. Never does. |
| Moss | Restored | calm · cozy · gentle | Settled in. Never leaving. |
| Mushmello ×2 | Multi-piece | cozy · sleepy · sweet | The one that keeps the nicest, sweetest dreams. The rest can burn. |
| Nemo | Restored | chill · dreamy · serene | Found Nemo. He wasn't lost, just chilling. |
| Nina | New | curious · happy · surprised | Delighted by absolutely everything, apparently. |
| Niuls | New | confident · sassy · playful | Hands on hips. Judging your outfit. |
| Norbert | New | calm · cozy · happy | Orange you glad he's this chill? |
| Nosewise ×2 | Multi-piece | alert · curious · quirky | You can rely on him, he's pretty damn serious. |
| Nugget | Refreshed | calm · mysterious · quiet | Says nothing. Somehow says everything. |
| Okayniel | New | confident · playful · cheerful | Gives the OK sign to absolutely everything. |
| Onyx | New | serious · stubborn · alert | Cold as the stone. Twice as sharp. |
| Peach | New | curious · gentle · nervous | Soft, fuzzy, easily bruised. |
| Pesto | Restored | alert · curious · gentle | Sharp eyes, soft heart. |
| Peter | Restored | calm · gentle · sleepy | One eye open, just in case. |
| Pickle | Restored | curious · nervous · surprised | In a bit of a pickle. Always. |
| Pippa | New | alert · mysterious · quiet | Watches. Says nothing. Never blinks first. |
| Pixie | New | curious · quirky · sweet | Small, sweet, up to something. |
| Plotty | New | grumpy · stubborn · serious | Plotty's plan has 47 steps. Step one: glare. |
| Professor Spore | Refreshed | calm · serious · wise | Ask anything. He'll nod knowingly. |
| Raven | Restored | calm · gentle · serene | Peace, but make it pastel. |
| Ray | New | cheerful · happy · friendly | A literal ray of sunshine. Slightly damp. |
| Robert | New | serious · calm · quiet | Robert doesn't do small talk. |
| Robin | New | sleepy · sad · quiet | Robin's had a day. Every day. |
| Sam | New | grumpy · nervous · quirky | Not a good day. Wasn't yesterday either. |
| Samson | New | confident · friendly · happy | All the confidence, none of the muscles. |
| Secret | Restored | cheerful · curious · playful | Can't tell you. Wouldn't be a secret. |
| Shhhroom | New | quiet · mysterious · nervous | Shhh. Or don't. Whatever. Shhh though. |
| Shroomita | Refreshed | alert · confident · mysterious | She just got here. It got exclusive. |
| Shroopsy ×4 | Multi-piece | energetic · quirky · silly | Shroopsy had a plan. This was not it. |
| Skippy | Restored | calm · chill · confident | Too cool to rush. |
| Spoon | New | cheerful · friendly · playful | Stirs up trouble. Sweetly. |
| Sporacle ×2 | Multi-piece | calm · mysterious · wise | Sporacle has seen the future. Sporacle is taking a moment. |
| Sporella | New | confident · sweet · mysterious | Sporella. Yes, like the ball. No, no prince. |
| Stroop | Restored | gentle · sleepy · sweet | Soft, sweet, slightly syrupy. |
| Sven | New | calm · gentle · quiet | Sven says little. Means all of it. |
| Ted | Restored | calm · confident · playful | Knows exactly what he's doing. |
| Teeny And Tiny | Restored | energetic · friendly · playful | Small, loud, inseparable. |
| Theo | New | curious · calm · alert | Theo's just here for the view. |
| Tofu | Restored | curious · friendly · gentle | Goes well with literally everyone. |
| Tove | Restored | chill · serene · sleepy | Basically already asleep. |
| Troy | New | calm · friendly · gentle | Named after a legendary siege. Personally avoids conflict. |
| Twix | Restored | calm · cozy · sweet | Snack-sized comfort. |
| Victor | Restored | angry · grumpy · stubborn | Won the argument. Still mad. |
| Whisper | Restored | calm · quiet · serene | Barely there. Perfectly calm. |
| Whycelium ×2 | Multi-piece | energetic · silly · surprised | So what? Who cares? Whatever. Take Whycelium home, he handles all the nonsense. |
| Winnie | New | cheerful · gentle · sweet | Blushes at everything. Means it every time. |

**Tally:** 46 new · 5 refreshed · 11 multi-piece characters (33 cards) · 30 restored = 114 cards.

## 4. P01-P38 batch, resolved

The 38 raw phone photos provisionally named `P01`-`P38` have all been sorted: 12 turned out to be more pieces of existing characters (`_N` files on the matching slug, e.g. `P01`/`P04` → `shroopsy_3`/`shroopsy_4`), 2 were a second piece of an existing single-photo character (`P13` → `louis_2`, `P14` → `whycelium_2`), 23 were brand-new characters given a real name, traits, and description per `MUSHROOM_CONTENT_GUIDE.md` (e.g. `P05` → `hero`), and 1 (`P38`) was a duplicate photo of `P34`/`heaven` from a different angle and was deleted. All resolved photos are folded into section 3 above; no photos from the batch remain unidentified.
