import type { Mushroom, Question } from '../types';

const imageModules = import.meta.glob('./images/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

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
        tags: ['temp'],
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
