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
  bitterbutton: 'Your tiny rage manager for everyday frustrations.',
  chillbert: "Fingers up, problems down. You're welcome.",
  doomshroom: 'When life gives lemons, he throws them back screaming.',
  frustrashroom: "I don't know what I'm doing either.",
  fungary: "I'm fine, I'm fine.",
  grumplet: 'He judges the world so you can relax. Just let him speak to the manager.',
  lol_nosey: "He's lowkey low key.",
  mushmello: 'The one that keeps the nicest, sweetest dreams. The rest can burn.',
  nosewise: "You can rely on him, he's pretty damn serious.",
  professor_spore: "Ask anything. He'll nod knowingly.",
  shroomita: 'She just got here. It got exclusive.',
  shroopsy: 'Shroopsy had a plan. This was not it.',
  sporacle: 'Sporacle has seen the future. Sporacle is taking a moment.',
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
