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
  shroopsy: ['energetic', 'quirky', 'silly'],
  skippy: ['calm', 'chill', 'confident'],
  sporacle: ['calm', 'mysterious', 'wise'],
  stroop: ['gentle', 'sleepy', 'sweet'],
  ted: ['calm', 'confident', 'playful'],
  teeny_and_tiny: ['energetic', 'friendly', 'playful'],
  tofu: ['curious', 'friendly', 'gentle'],
  tove: ['gentle', 'serene', 'sweet'],
  twix: ['angry', 'grumpy', 'stubborn'],
  victor: ['calm', 'cozy', 'sweet'],
  whisper: ['calm', 'quiet', 'serene'],
  whycelium: ['energetic', 'silly', 'surprised'],
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
        tagline: 'temp',
        tags: TRAITS[slug] ?? ['temp'],
        description: 'temp',
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
