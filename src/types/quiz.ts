import type { CategoryId } from './learning';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  categoryId: CategoryId;
  difficulty: DifficultyLevel;
  imageUrl: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  keyFeatures: string[];
  clinicalRelevance: string;
  hints: string[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentMs: number;
  correctAnswers: string[]; // Question IDs
  incorrectAnswers: string[]; // Question IDs
}

export interface ChallengeRecord {
  id: string;
  mode: 'timed' | 'rapid' | 'random';
  date: number;
  score: number;
  accuracy: number;
  timeSpentMs: number;
}
