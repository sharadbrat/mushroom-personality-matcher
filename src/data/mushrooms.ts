import type { Mushroom, Question } from '../types';

const imageModules = import.meta.glob('./images/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

// Assigned by eyeballing each clay mushroom's expression and vibe. Kept to a
// pool of 30 traits total so trait-matching results stay meaningful.
const TRAITS: Record<string, [string, string, string]> = {
  apocap: ['confident', 'playful', 'sassy'],
  bean: ['cheerful', 'cozy', 'happy'],
  bitterbutton: ['grumpy', 'sad', 'stubborn'],
  caleb: ['calm', 'dreamy', 'serene'],
  chillbert: ['chill', 'confident', 'playful'],
  churo: ['cozy', 'gentle', 'sleepy'],
  doomshroom: ['angry', 'grumpy', 'serious'],
  echo: ['dreamy', 'quiet', 'sad'],
  faye: ['dreamy', 'gentle', 'sweet'],
  fern: ['curious', 'quirky', 'sassy'],
  frustrashroom: ['frustrated', 'grumpy', 'stubborn'],
  fungary: ['cheerful', 'curious', 'friendly'],
  grumplet: ['grumpy', 'serious', 'stubborn'],
  jamie: ['curious', 'friendly', 'happy'],
  johaness: ['calm', 'gentle', 'sweet'],
  lennard: ['confident', 'serious', 'stubborn'],
  lol_nosey: ['mysterious', 'quiet', 'quirky'],
  lord_giant: ['alert', 'curious', 'nervous'],
  lorelei: ['calm', 'serene', 'sleepy'],
  lumen: ['alert', 'mysterious', 'serious'],
  mark: ['curious', 'playful', 'silly'],
  moss: ['calm', 'cozy', 'gentle'],
  mushmello: ['cozy', 'sleepy', 'sweet'],
  nemo: ['chill', 'dreamy', 'serene'],
  nosewise: ['alert', 'curious', 'quirky'],
  nugget: ['calm', 'mysterious', 'quiet'],
  pesto: ['alert', 'curious', 'gentle'],
  peter: ['calm', 'gentle', 'sleepy'],
  pickle: ['curious', 'nervous', 'surprised'],
  professor_spore: ['calm', 'serious', 'wise'],
  raven: ['calm', 'gentle', 'serene'],
  secret: ['cheerful', 'curious', 'playful'],
  shroomita: ['alert', 'confident', 'mysterious'],
  shroopsy: ['energetic', 'quirky', 'silly'],
  skippy: ['calm', 'chill', 'confident'],
  sporacle: ['calm', 'mysterious', 'wise'],
  stroop: ['gentle', 'sleepy', 'sweet'],
  ted: ['calm', 'confident', 'playful'],
  teeny_and_tiny: ['energetic', 'friendly', 'playful'],
  tofu: ['curious', 'friendly', 'gentle'],
  tove: ['chill', 'serene', 'sleepy'],
  twix: ['calm', 'cozy', 'sweet'],
  victor: ['angry', 'grumpy', 'stubborn'],
  whisper: ['calm', 'quiet', 'serene'],
  whycelium: ['energetic', 'silly', 'surprised'],
};

const DESCRIPTIONS: Record<string, string> = {
  apocap: 'Embrace the chaos. Welcome shroomageddon.',
  bean: 'Perpetually pleased. Ask him why, he won’t know.',
  bitterbutton: 'Your tiny rage manager for everyday frustrations.',
  caleb: 'Off in his own galaxy. Send snacks.',
  chillbert: "Fingers up, problems down. You're welcome.",
  churo: 'Naps professionally. Very good at it.',
  doomshroom: 'When life gives lemons, he throws them back screaming.',
  echo: 'Feels everything, says nothing.',
  faye: 'Made of stardust and soft feelings.',
  fern: 'Knows something you don’t.',
  frustrashroom: "I don't know what I'm doing either.",
  fungary: "I'm fine, I'm fine.",
  grumplet: 'He judges the world so you can relax. Just let him speak to the manager.',
  jamie: 'Everyone’s favorite new best friend.',
  johaness: 'Quietly the nicest one here.',
  lennard: 'Not asking twice.',
  lol_nosey: "He's lowkey low key.",
  lord_giant: 'Big name. Bigger worries.',
  lorelei: 'Drifting off somewhere lovely.',
  lumen: 'Watching. Always watching.',
  mark: 'Found a ladybug. Life complete.',
  moss: 'Settled in. Never leaving.',
  mushmello: 'The one that keeps the nicest, sweetest dreams. The rest can burn.',
  nemo: 'Found Nemo. He wasn’t lost, just chilling.',
  nosewise: "You can rely on him, he's pretty damn serious.",
  nugget: 'Says nothing. Somehow says everything.',
  pesto: 'Sharp eyes, soft heart.',
  peter: 'One eye open, just in case.',
  pickle: 'In a bit of a pickle. Always.',
  professor_spore: "Ask anything. He'll nod knowingly.",
  raven: 'Peace, but make it pastel.',
  secret: 'Can’t tell you. Wouldn’t be a secret.',
  shroomita: 'She just got here. It got exclusive.',
  shroopsy: 'Shroopsy had a plan. This was not it.',
  skippy: 'Too cool to rush.',
  sporacle: 'Sporacle has seen the future. Sporacle is taking a moment.',
  stroop: 'Soft, sweet, slightly syrupy.',
  ted: 'Knows exactly what he’s doing.',
  teeny_and_tiny: 'Small, loud, inseparable.',
  tofu: 'Goes well with literally everyone.',
  tove: 'Basically already asleep.',
  twix: 'Snack-sized comfort.',
  victor: 'Won the argument. Still mad.',
  whisper: 'Barely there. Perfectly calm.',
  whycelium: 'So what? Who cares? Whatever. Take Whycelium home, he handles all the nonsense.',
};

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
      const slug = path.split('/').pop()!.replace(/\.webp$/, '');
      return {
        id: slug.replace(/_/g, '-'),
        name: slugToName(slug),
        tags: TRAITS[slug] ?? ['temp'],
        description: DESCRIPTIONS[slug] ?? 'temp',
        image,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const mushrooms: Mushroom[] = buildMushrooms();

export const questions: Question[] = [
  { id: 1, text: "What's your perfect vacation?", options: ['A quiet cabin in the woods', 'A bustling city adventure', 'A beach with absolutely nothing to do', 'Backpacking somewhere brand new'] },
  { id: 2, text: "What's your perfect weekend?", options: ['Curled up with a good book', 'Out with a big group of friends', 'Trying something completely spontaneous', 'Deep-cleaning and organizing everything'] },
  { id: 3, text: "What's your perfect dinner?", options: ['Home-cooked comfort food', 'A loud, messy group potluck', 'Street food from a food truck', 'A fancy quiet meal for one'] },
  { id: 4, text: "What's your favorite marine animal?", options: ['Octopus', 'Dolphin', 'Turtle', 'Jellyfish'] },
  { id: 5, text: "What's your favorite stone?", options: ['A smooth river pebble', 'A cracked-open geode', 'Solid granite', 'A glowing moonstone'] },
];
