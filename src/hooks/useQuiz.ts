import { useState } from 'react';
import type { QuizQuestion, QuizResult } from '../types/quiz';

export const useQuiz = (questions: QuizQuestion[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (answer: string) => {
    if (isAnswerRevealed) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerRevealed(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      if (!correctAnswers.includes(currentQuestion.id)) {
        setCorrectAnswers(prev => [...prev, currentQuestion.id]);
      }
    } else {
      if (!incorrectAnswers.includes(currentQuestion.id)) {
        setIncorrectAnswers(prev => [...prev, currentQuestion.id]);
      }
      setShowHint(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setShowHint(false);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setIsFinished(false);
  };

  const setFinished = () => setIsFinished(true);

  const getResult = (): QuizResult => {
    return {
      score: correctAnswers.length,
      totalQuestions: questions.length,
      accuracy: (correctAnswers.length / questions.length) * 100,
      timeSpentMs: Date.now() - startTime,
      correctAnswers,
      incorrectAnswers
    };
  };

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    isAnswerRevealed,
    showHint,
    isFinished,
    handleSelectAnswer,
    handleSubmit,
    handleNext,
    resetQuiz,
    setFinished,
    getResult,
    progress: ((currentIndex) / questions.length) * 100
  };
};
