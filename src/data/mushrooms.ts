import type { Mushroom, Question } from '../types';

const firstParts = ['Bramble', 'Nub', 'Toad', 'Speck', 'Moss', 'Puddle', 'Fen', 'Thimb', 'Dab', 'Wrink', 'Spor', 'Loam', 'Peat', 'Chant', 'Button'];
const suffixes = ['cap', 'ton', 'wick'];
const adjectives = ['squat', 'tall and wobbly', 'petite', 'lumpy', 'smooth', 'freckled', 'chunky', 'slender', 'dimpled', 'craggy', 'round-bellied', 'knobbly', 'stubby', 'sun-baked', 'cracked'];
const habitats = [
  'collects pebbles after every rainstorm',
  'naps under the biggest fern in the patch',
  'hums little tunes to passing earthworms',
  'stacks acorn caps into wobbly towers',
  'counts raindrops on quiet afternoons',
  'braids moss into tiny bracelets',
  'sketches clouds on flat rocks',
  'chats with snails about the weather',
  'hoards shiny buttons in a mossy burrow',
  'practices somersaults down the hill',
  'waters the younger mushrooms every morning',
  'whittles twigs into little spoons',
  'chases fireflies until well past dusk',
  'folds fallen leaves into tiny boats',
  'balances stones into tall, silly towers',
];

interface Archetype {
  label: string;
  tags: string[];
  sentence: string;
}

export const archetypes: Archetype[] = [
  { label: 'Chaotic Optimist', tags: ['Chaotic', 'Optimistic', 'Loud Laugher'], sentence: 'Always assumes the best, even when caked head to toe in mud.' },
  { label: 'Grumpy But Loyal', tags: ['Grumpy', 'Fiercely Loyal', 'Soft Interior'], sentence: 'Grumbles constantly, but would take on a badger for a friend.' },
  { label: 'Overthinking Planner', tags: ['Meticulous', 'Anxious', 'Prepared'], sentence: 'Has a backup plan for the backup plan.' },
  { label: 'Dreamy Wanderer', tags: ['Dreamy', 'Curious', 'Easily Distracted'], sentence: "Follows every butterfly, whether or not it's going anywhere." },
  { label: 'Quiet Observer', tags: ['Quiet', 'Watchful', 'Deep Thinker'], sentence: 'Notices everything, says little, remembers all of it.' },
  { label: 'Bold Show-Off', tags: ['Confident', 'Dramatic', 'Attention-Loving'], sentence: 'Turns every hello into a small performance.' },
  { label: 'Gentle Caretaker', tags: ['Nurturing', 'Patient', 'Warm-Hearted'], sentence: 'Tucks the smaller mushrooms in every single night.' },
  { label: 'Mischievous Prankster', tags: ['Sneaky', 'Playful', 'Unpredictable'], sentence: 'Has hidden a pebble in every pocket in the market.' },
  { label: 'Stubborn Traditionalist', tags: ['Stubborn', 'Old-Fashioned', 'Reliable'], sentence: 'Still does things exactly the way it did in spore-year one.' },
  { label: 'Anxious Sweetheart', tags: ['Sensitive', 'Sweet', 'Easily Startled'], sentence: 'Apologizes to furniture it accidentally bumps into.' },
  { label: 'Cheerful Chatterbox', tags: ['Talkative', 'Cheerful', 'Friend-Collector'], sentence: 'Has never met a stranger, only a future best friend.' },
  { label: 'Stoic Philosopher', tags: ['Calm', 'Wise', 'Unbothered'], sentence: 'Answers nearly every question with another question.' },
  { label: 'Competitive Spirit', tags: ['Competitive', 'Energetic', 'Determined'], sentence: 'Turns puddle-jumping into a full Olympic event.' },
  { label: 'Cozy Homebody', tags: ['Cozy', 'Cautious', 'Homebound'], sentence: 'Has never left its patch of moss, entirely by choice.' },
  { label: 'Free-Spirited Artist', tags: ['Creative', 'Free-Spirited', 'Messy'], sentence: "Paints with mud and insists on calling it 'seasonal work.'" },
];

const palette = ['#c4703f', '#6b7d4f', '#e0a83a', '#a15c8c', '#4f8ba7', '#b5652f'];

function buildMushrooms(): Mushroom[] {
  const list: Mushroom[] = [];
  for (let i = 0; i < 45; i++) {
    const first = firstParts[i % 15];
    const suf = suffixes[Math.floor(i / 15)];
    const name = first + suf;
    const arche = archetypes[i % 15];
    const adjective = adjectives[(i + 4) % 15];
    const habitat = habitats[(i + 9) % 15];
    const color = palette[i % 6];
    list.push({
      id: 'm' + i,
      name,
      initials: name.slice(0, 2).toUpperCase(),
      tagline: arche.label,
      tags: arche.tags,
      description: `${name} is a ${adjective} clay mushroom who ${habitat}. ${arche.sentence}`,
      color,
    });
  }
  return list;
}

export const mushrooms: Mushroom[] = buildMushrooms();

export const questions: Question[] = [
  { id: 1, text: "What's your perfect vacation?", options: ['A quiet cabin in the woods', 'A bustling city adventure', 'A beach with absolutely nothing to do', 'Backpacking somewhere brand new'] },
  { id: 2, text: "What's your perfect weekend?", options: ['Curled up with a good book', 'Out with a big group of friends', 'Trying something completely spontaneous', 'Deep-cleaning and organizing everything'] },
  { id: 3, text: "What's your perfect dinner?", options: ['Home-cooked comfort food', 'A loud, messy group potluck', 'Street food from a food truck', 'A fancy quiet meal for one'] },
  { id: 4, text: "What's your favorite marine animal?", options: ['Octopus', 'Dolphin', 'Turtle', 'Jellyfish'] },
  { id: 5, text: "What's your favorite stone?", options: ['A smooth river pebble', 'A cracked-open geode', 'Solid granite', 'A glowing moonstone'] },
];
