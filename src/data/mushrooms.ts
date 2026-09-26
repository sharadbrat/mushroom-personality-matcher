import type { Mushroom, Question } from '../types';

const imageModules = import.meta.glob('./images/*.{png,webp}', { eager: true, import: 'default' }) as Record<string, string>;

// Assigned by eyeballing each clay mushroom's expression and vibe. Kept to a
// pool of 30 traits total so trait-matching results stay meaningful.
const TRAITS: Record<string, [string, string, string]> = {
  antonio: ['confident', 'silly', 'energetic'],
  apocap: ['confident', 'playful', 'sassy'],
  barney_mc_glee: ['sleepy', 'happy', 'cozy'],
  bean: ['cheerful', 'cozy', 'happy'],
  bitterbutton: ['grumpy', 'sad', 'stubborn'],
  caleb: ['calm', 'dreamy', 'serene'],
  catshroom: ['playful', 'curious', 'quirky'],
  chancelina: ['serene', 'calm', 'dreamy'],
  charlie: ['nervous', 'alert', 'quiet'],
  chillbert: ['chill', 'confident', 'playful'],
  churo: ['cozy', 'gentle', 'sleepy'],
  creed: ['serious', 'stubborn', 'alert'],
  disco_shroo: ['confident', 'playful', 'silly'],
  doomshroom: ['angry', 'grumpy', 'serious'],
  echo: ['dreamy', 'quiet', 'sad'],
  eligiah: ['surprised', 'alert', 'curious'],
  faye: ['dreamy', 'gentle', 'sweet'],
  fern: ['curious', 'quirky', 'sassy'],
  ferris: ['confident', 'playful', 'cheerful'],
  frustrashroom: ['frustrated', 'grumpy', 'stubborn'],
  fungary: ['cheerful', 'curious', 'friendly'],
  garlic: ['alert', 'nervous', 'quirky'],
  grumplet: ['grumpy', 'serious', 'stubborn'],
  jamie: ['curious', 'friendly', 'happy'],
  jimothy: ['serious', 'stubborn', 'calm'],
  johaness: ['calm', 'gentle', 'sweet'],
  lennard: ['confident', 'serious', 'stubborn'],
  lil_nosey: ['mysterious', 'quiet', 'quirky'],
  lord_giant: ['alert', 'curious', 'nervous'],
  lorelei: ['calm', 'serene', 'sleepy'],
  louis: ['grumpy', 'serious', 'nervous'],
  lumen: ['alert', 'mysterious', 'serious'],
  mark: ['curious', 'playful', 'silly'],
  moss: ['calm', 'cozy', 'gentle'],
  mushmello: ['cozy', 'sleepy', 'sweet'],
  nemo: ['chill', 'dreamy', 'serene'],
  niuls: ['confident', 'sassy', 'playful'],
  norbert: ['calm', 'cozy', 'happy'],
  nosewise: ['alert', 'curious', 'quirky'],
  nugget: ['calm', 'mysterious', 'quiet'],
  okayniel: ['confident', 'playful', 'cheerful'],
  onyx: ['serious', 'stubborn', 'alert'],
  pesto: ['alert', 'curious', 'gentle'],
  peter: ['calm', 'gentle', 'sleepy'],
  pickle: ['curious', 'nervous', 'surprised'],
  plotty: ['grumpy', 'stubborn', 'serious'],
  professor_spore: ['calm', 'serious', 'wise'],
  raven: ['calm', 'gentle', 'serene'],
  ray: ['cheerful', 'happy', 'friendly'],
  robert: ['serious', 'calm', 'quiet'],
  robin: ['sleepy', 'sad', 'quiet'],
  secret: ['cheerful', 'curious', 'playful'],
  shhhroom: ['quiet', 'mysterious', 'nervous'],
  shroomita: ['alert', 'confident', 'mysterious'],
  shroopsy: ['energetic', 'quirky', 'silly'],
  skippy: ['calm', 'chill', 'confident'],
  sporacle: ['calm', 'mysterious', 'wise'],
  sporella: ['confident', 'sweet', 'mysterious'],
  stroop: ['gentle', 'sleepy', 'sweet'],
  sven: ['calm', 'gentle', 'quiet'],
  ted: ['calm', 'confident', 'playful'],
  teeny_and_tiny: ['energetic', 'friendly', 'playful'],
  theo: ['curious', 'calm', 'alert'],
  tofu: ['curious', 'friendly', 'gentle'],
  tove: ['chill', 'serene', 'sleepy'],
  twix: ['calm', 'cozy', 'sweet'],
  victor: ['angry', 'grumpy', 'stubborn'],
  whisper: ['calm', 'quiet', 'serene'],
  whycelium: ['energetic', 'silly', 'surprised'],
};

const DESCRIPTIONS: Record<string, string> = {
  antonio: 'Mid-aria, always. The neighbors have opinions.',
  apocap: 'Embrace the chaos. Welcome shroomageddon.',
  barney_mc_glee: 'Half asleep, fully delighted.',
  bean: 'Perpetually pleased. Ask him why, he won’t know.',
  bitterbutton: 'Your tiny rage manager for everyday frustrations.',
  caleb: 'Off in his own galaxy. Send snacks.',
  catshroom: 'Not a cat. Acts like one anyway.',
  chancelina: 'Elegant, aloof, unbothered by the moss.',
  charlie: "Charlie's fine. Charlie's just processing.",
  chillbert: "Fingers up, problems down. You're welcome.",
  churo: 'Naps professionally. Very good at it.',
  creed: 'Has a creed. Won’t share it.',
  disco_shroo: 'Born under a disco ball. Never left.',
  doomshroom: 'When life gives lemons, he throws them back screaming.',
  echo: 'Feels everything, says nothing.',
  eligiah: 'Wide-eyed about literally everything.',
  faye: 'Made of stardust and soft feelings.',
  fern: 'Knows something you don’t.',
  ferris: 'Skipping today. Skipping every day.',
  frustrashroom: "I don't know what I'm doing either.",
  fungary: "I'm fine, I'm fine.",
  garlic: 'Keeps vampires and small talk away.',
  grumplet: 'He judges the world so you can relax. Just let him speak to the manager.',
  jamie: 'Everyone’s favorite new best friend.',
  jimothy: 'Not impressed. Rarely is.',
  johaness: 'Quietly the nicest one here.',
  lennard: 'Not asking twice.',
  lil_nosey: "He's lowkey low key.",
  lord_giant: 'Big name. Bigger worries.',
  lorelei: 'Drifting off somewhere lovely.',
  louis: 'Louis has concerns. Several.',
  lumen: 'Watching. Always watching.',
  mark: 'Found a ladybug. Life complete.',
  moss: 'Settled in. Never leaving.',
  mushmello: 'The one that keeps the nicest, sweetest dreams. The rest can burn.',
  nemo: 'Found Nemo. He wasn’t lost, just chilling.',
  niuls: 'Hands on hips. Judging your outfit.',
  norbert: 'Orange you glad he’s this chill?',
  nosewise: "You can rely on him, he's pretty damn serious.",
  nugget: 'Says nothing. Somehow says everything.',
  okayniel: 'Gives the OK sign to absolutely everything.',
  onyx: 'Cold as the stone. Twice as sharp.',
  pesto: 'Sharp eyes, soft heart.',
  peter: 'One eye open, just in case.',
  pickle: 'In a bit of a pickle. Always.',
  plotty: "Plotty's plan has 47 steps. Step one: glare.",
  professor_spore: "Ask anything. He'll nod knowingly.",
  raven: 'Peace, but make it pastel.',
  ray: 'A literal ray of sunshine. Slightly damp.',
  robert: "Robert doesn't do small talk.",
  robin: "Robin's had a day. Every day.",
  secret: 'Can’t tell you. Wouldn’t be a secret.',
  shhhroom: 'Shhh. Or don’t. Whatever. Shhh though.',
  shroomita: 'She just got here. It got exclusive.',
  shroopsy: 'Shroopsy had a plan. This was not it.',
  skippy: 'Too cool to rush.',
  sporacle: 'Sporacle has seen the future. Sporacle is taking a moment.',
  sporella: 'Sporella. Yes, like the ball. No, no prince.',
  stroop: 'Soft, sweet, slightly syrupy.',
  sven: 'Sven says little. Means all of it.',
  ted: 'Knows exactly what he’s doing.',
  teeny_and_tiny: 'Small, loud, inseparable.',
  theo: "Theo's just here for the view.",
  tofu: 'Goes well with literally everyone.',
  tove: 'Basically already asleep.',
  twix: 'Snack-sized comfort.',
  victor: 'Won the argument. Still mad.',
  whisper: 'Barely there. Perfectly calm.',
  whycelium: 'So what? Who cares? Whatever. Take Whycelium home, he handles all the nonsense.',
};

// Two-photo mushrooms (e.g. fungary_1.png / fungary_2.png) are separate clay
// pieces that share one name, one description, and one trait set - strip the
// trailing _N before looking either up, so both photos read as "Fungary"
// while keeping distinct ids/cards.
function baseSlug(slug: string): string {
  return slug.replace(/_\d+$/, '');
}

function slugToName(slug: string): string {
  return slug
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildMushrooms(): Mushroom[] {
  return Object.entries(imageModules)
    .map(([path, image]) => {
      const slug = path.split('/').pop()!.replace(/\.(png|webp)$/, '');
      const base = baseSlug(slug);
      return {
        id: slug.replace(/_/g, '-'),
        name: slugToName(base),
        tags: TRAITS[base] ?? ['temp'],
        description: DESCRIPTIONS[base] ?? 'temp',
        image,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const mushrooms: Mushroom[] = buildMushrooms();

export const questions: Question[] = [
  { id: 1, text: "What's your perfect vacation?", options: ['Cabin', 'City trip', 'Beach', 'Backpacking'] },
  { id: 2, text: "What's your perfect weekend?", options: ['Reading', 'With friends', 'Spontaneous', 'Cleaning'] },
  { id: 3, text: "What's your perfect dinner?", options: ['Comfort food', 'Fancy restaurant', 'Home made', 'Grilled cheese'] },
  { id: 4, text: "What's your favorite marine animal?", options: ['Octopus', 'Dolphin', 'Turtle', 'Jellyfish'] },
  { id: 5, text: "What's your favorite colour?", options: ['Morning-brown', 'Screaming pink', 'Mossy green', 'Mushroom'] },
];
