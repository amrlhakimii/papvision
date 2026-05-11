import type { CategoryId } from './learning';

export interface CategoryProgress {
  categoryId: CategoryId;
  completedSlides: string[]; // slide IDs
  totalSlides: number;
  highestQuizScore: number;
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: number;
}

export interface UserProgress {
  userId: string;
  categories: Record<CategoryId, CategoryProgress>;
  achievements: Achievement[];
  totalXp: number;
  lastActive: number;
}
