export interface Mushroom {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  description: string;
  image: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface TraitGroup {
  label: string;
  traits: string[];
}

export type QuizPhase = 'detail' | 'question' | 'loading' | 'reveal';
export type MatchFlowPhase = 'picking' | 'loading' | 'results' | null;

export interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  duration: number;
  delay: number;
}
