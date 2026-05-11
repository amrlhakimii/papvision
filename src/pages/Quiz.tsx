import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { QuizOptions, DiagnosticFeedback, HintBox } from '../components/quiz/QuizComponents';
import { QuizResults } from '../components/quiz/QuizResults';
import { useQuiz } from '../hooks/useQuiz';
import { useProgress } from '../hooks/useProgress';
import { useQuestions } from '../hooks/useQuestions';
import { categories } from '../data/categories';
import { ArrowRight, BrainCircuit, ChevronDown } from 'lucide-react';
import type { CategoryId } from '../types/learning';

const Quiz: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [started, setStarted] = useState(false);
  const { saveQuizScore } = useProgress();
  const { questions } = useQuestions();

  const filteredQuestions = selectedCategory === 'all'
    ? questions
    : questions.filter(q => q.categoryId === selectedCategory);

  const quiz = useQuiz(filteredQuestions);

  const handleFinish = () => {
    const result = quiz.getResult();
    if (selectedCategory !== 'all') {
      saveQuizScore(selectedCategory, result);
    } else {
      // Save to each touched category
      const categoryScores = new Map<CategoryId, { correct: number; total: number }>();
      filteredQuestions.forEach((q) => {
        const catId = q.categoryId;
        if (!categoryScores.has(catId)) categoryScores.set(catId, { correct: 0, total: 0 });
        const s = categoryScores.get(catId)!;
        s.total++;
        if (result.correctAnswers.includes(q.id)) s.correct++;
      });
      categoryScores.forEach((val, catId) => {
        saveQuizScore(catId, {
          ...result,
          score: val.correct,
          totalQuestions: val.total,
          accuracy: (val.correct / val.total) * 100,
        });
      });
    }
    quiz.setFinished();
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-accent-100 rounded-full mb-4">
            <BrainCircuit className="text-accent-600" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Diagnostic Quiz</h1>
          <p className="text-slate-500">Test your cytomorphological recognition and diagnostic reasoning.</p>
        </div>

        <Card className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Category</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as CategoryId | 'all')}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 appearance-none bg-white"
              >
                <option value="all">All Categories ({questions.length} questions)</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title} ({questions.filter(q => q.categoryId === cat.id).length} questions)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
              const count = filteredQuestions.filter(q => q.difficulty === level).length;
              return (
                <div key={level} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <Badge variant={level === 'beginner' ? 'success' : level === 'intermediate' ? 'warning' : 'danger'} className="mb-2">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Badge>
                  <p className="text-lg font-bold text-slate-900">{count}</p>
                  <p className="text-xs text-slate-500">questions</p>
                </div>
              );
            })}
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={() => { quiz.resetQuiz(); setStarted(true); }}
            disabled={filteredQuestions.length === 0}
          >
            Start Quiz
          </Button>
        </Card>
      </div>
    );
  }

  if (quiz.isFinished) {
    return (
      <QuizResults
        result={quiz.getResult()}
        onRetry={() => { quiz.resetQuiz(); setStarted(false); }}
      />
    );
  }

  const q = quiz.currentQuestion;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-100 text-accent-600 rounded-lg">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-slate-900">Diagnostic Quiz</h1>
            <p className="text-sm text-slate-500">Question {quiz.currentIndex + 1} of {quiz.totalQuestions}</p>
          </div>
        </div>
        <Badge variant={q.difficulty === 'beginner' ? 'success' : q.difficulty === 'intermediate' ? 'warning' : 'danger'}>
          {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
        </Badge>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className="bg-accent-500 h-2 rounded-full transition-all duration-500" style={{ width: `${quiz.progress}%` }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video md:aspect-[4/3] shadow-lg border-4 border-white relative">
            <img
              src={q.imageUrl}
              alt="Cytology Specimen"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = 'none';
                const p = t.parentElement;
                if (p && !p.querySelector('.img-fallback')) {
                  const d = document.createElement('div');
                  d.className = 'img-fallback w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2';
                  d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-30"><path d="M6 18L18 6M8 6h10v10"/><circle cx="12" cy="12" r="10"/></svg><p class="text-sm opacity-50">Image unavailable</p>';
                  p.appendChild(d);
                }
              }}
            />
          </div>
          {quiz.showHint && <HintBox hints={q.hints} />}
        </div>

        <div className="flex flex-col">
          <Card className="flex-1 border-0 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-900 leading-snug">{q.question}</h3>
            </div>

            <QuizOptions
              options={q.options}
              selectedOption={quiz.selectedAnswer}
              correctOption={q.correctAnswer}
              isRevealed={quiz.isAnswerRevealed}
              onSelect={quiz.handleSelectAnswer}
            />

            {quiz.isAnswerRevealed && (
              <DiagnosticFeedback question={q} isCorrect={quiz.selectedAnswer === q.correctAnswer} />
            )}
          </Card>

          <div className="mt-6 flex justify-end">
            {!quiz.isAnswerRevealed ? (
              <Button onClick={quiz.handleSubmit} disabled={!quiz.selectedAnswer} className="px-8">
                Submit Diagnosis
              </Button>
            ) : (
              <Button
                onClick={quiz.currentIndex < quiz.totalQuestions - 1 ? quiz.handleNext : handleFinish}
                className="px-8 gap-2"
                variant="secondary"
              >
                {quiz.currentIndex < quiz.totalQuestions - 1 ? 'Next Case' : 'View Results'}
                <ArrowRight size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
