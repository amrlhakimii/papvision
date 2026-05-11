import { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types/quiz';
import { getQuestions } from '../services/firestoreService';
import { quizQuestions as staticQuestions } from '../data/quizData';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(staticQuestions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions().then(data => {
      setQuestions(data.length > 0 ? data : staticQuestions);
    }).catch(() => {
      setQuestions(staticQuestions);
    }).finally(() => setLoading(false));
  }, []);

  return { questions, loading, setQuestions };
};
