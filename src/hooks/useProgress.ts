import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, CategoryProgress } from '../types/progress';
import type { CategoryId } from '../types/learning';
import type { QuizResult } from '../types/quiz';
import { useAuth } from './useAuth';
import { loadProgressFromFirestore, saveProgressToFirestore } from '../services/firestoreService';

const defaultCategoryProgress = (id: CategoryId, totalSlides: number, unlocked: boolean): CategoryProgress => ({
  categoryId: id,
  completedSlides: [],
  totalSlides,
  highestQuizScore: 0,
  unlocked,
});

const buildDefaultProgress = (userId: string): UserProgress => ({
  userId,
  totalXp: 0,
  lastActive: Date.now(),
  categories: {
    normal:     defaultCategoryProgress('normal',     5, true),
    infections: defaultCategoryProgress('infections', 5, true),
    benign:     defaultCategoryProgress('benign',     4, true),
    squamous:   defaultCategoryProgress('squamous',   5, false),
    glandular:  defaultCategoryProgress('glandular',  4, false),
  },
  achievements: [],
});

const ACHIEVEMENTS = [
  { id: 'first-slide',      title: 'First Steps',                   description: 'Viewed your first learning slide.',                       icon: 'Flag',        condition: (p: UserProgress) => Object.values(p.categories).some(c => c.completedSlides.length > 0) },
  { id: 'normal-master',    title: 'Normal Cell Master',             description: 'Completed all Normal Cervical Cell slides.',               icon: 'CheckCircle', condition: (p: UserProgress) => p.categories.normal.completedSlides.length >= p.categories.normal.totalSlides },
  { id: 'infection-expert', title: 'Infection Recognition Expert',   description: 'Completed all Infectious Organisms slides.',               icon: 'Shield',      condition: (p: UserProgress) => p.categories.infections.completedSlides.length >= p.categories.infections.totalSlides },
  { id: 'first-quiz',       title: 'First Diagnosis',                description: 'Completed your first diagnostic quiz.',                    icon: 'Brain',       condition: (p: UserProgress) => Object.values(p.categories).some(c => c.highestQuizScore > 0) },
  { id: 'perfect-score',    title: 'Perfect Diagnosis',              description: 'Scored 100% on a diagnostic quiz.',                        icon: 'Award',       condition: (p: UserProgress) => Object.values(p.categories).some(c => c.highestQuizScore === 100) },
  { id: 'xp-500',           title: 'Rising Scholar',                 description: 'Earned 500 XP.',                                          icon: 'Star',        condition: (p: UserProgress) => p.totalXp >= 500 },
  { id: 'lsil-badge',       title: 'LSIL Recognition Badge',         description: 'Scored ≥80% on a squamous abnormalities quiz.',            icon: 'Badge',       condition: (p: UserProgress) => p.categories.squamous.highestQuizScore >= 80 },
  { id: 'screening-ready',  title: 'Ready for Screening Challenge',  description: 'Unlocked all morphology categories.',                      icon: 'Target',      condition: (p: UserProgress) => Object.values(p.categories).every(c => c.unlocked) },
];

const applyAchievements = (progress: UserProgress): UserProgress => {
  const earned = progress.achievements.map(a => a.id);
  const newAchievements = [...progress.achievements];
  ACHIEVEMENTS.forEach(ach => {
    if (!earned.includes(ach.id) && ach.condition(progress)) {
      newAchievements.push({ id: ach.id, title: ach.title, description: ach.description, icon: ach.icon, earnedAt: Date.now() });
    }
  });
  return { ...progress, achievements: newAchievements };
};

const applyUnlocks = (progress: UserProgress): UserProgress => {
  const updated = { ...progress, categories: { ...progress.categories } };
  if (updated.categories.normal.highestQuizScore >= 80 && updated.categories.infections.highestQuizScore >= 80) {
    updated.categories.squamous = { ...updated.categories.squamous, unlocked: true };
  }
  if (updated.categories.squamous.unlocked && updated.categories.benign.highestQuizScore >= 60) {
    updated.categories.glandular = { ...updated.categories.glandular, unlocked: true };
  }
  return updated;
};

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setProgress(null); setLoading(false); return; }
    setLoading(true);
    loadProgressFromFirestore(user.uid).then(p => {
      setProgress(p ?? buildDefaultProgress(user.uid));
    }).catch(() => {
      setProgress(buildDefaultProgress(user.uid));
    }).finally(() => setLoading(false));
  }, [user]);

  const markSlideViewed = useCallback((categoryId: CategoryId, slideId: string) => {
    setProgress(prev => {
      if (!prev) return prev;
      const cat = prev.categories[categoryId];
      if (cat.completedSlides.includes(slideId)) return prev;
      let updated: UserProgress = {
        ...prev,
        totalXp: prev.totalXp + 10,
        lastActive: Date.now(),
        categories: { ...prev.categories, [categoryId]: { ...cat, completedSlides: [...cat.completedSlides, slideId] } },
      };
      updated = applyUnlocks(applyAchievements(updated));
      saveProgressToFirestore(updated).catch(console.error);
      return updated;
    });
  }, []);

  const saveQuizScore = useCallback((categoryId: CategoryId, result: QuizResult) => {
    setProgress(prev => {
      if (!prev) return prev;
      const cat = prev.categories[categoryId];
      const accuracy = Math.round(result.accuracy);
      const isImprovement = accuracy > cat.highestQuizScore;
      const xpGained = isImprovement ? Math.round((accuracy - cat.highestQuizScore) * 2) + 50 : 50;
      let updated: UserProgress = {
        ...prev,
        totalXp: prev.totalXp + xpGained,
        lastActive: Date.now(),
        categories: { ...prev.categories, [categoryId]: { ...cat, highestQuizScore: Math.max(accuracy, cat.highestQuizScore) } },
      };
      updated = applyUnlocks(applyAchievements(updated));
      saveProgressToFirestore(updated).catch(console.error);
      return updated;
    });
  }, []);

  return { progress, loading, markSlideViewed, saveQuizScore };
};
