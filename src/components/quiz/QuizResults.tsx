import React from 'react';
import type { QuizResult } from '../../types/quiz';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuizResultsProps {
  result: QuizResult;
  onRetry: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ result, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card padding="lg" className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center">
            <Trophy className="text-brand-500" size={40} />
          </div>
        </div>
        
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Quiz Completed!</h2>
        <p className="text-slate-500 mb-8">Here is your diagnostic performance summary.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Score</p>
            <p className="text-2xl font-bold text-slate-900">{result.score}/{result.totalQuestions}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-brand-600">{Math.round(result.accuracy)}%</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Correct</p>
            <p className="text-2xl font-bold text-green-600">{result.correctAnswers.length}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Incorrect</p>
            <p className="text-2xl font-bold text-red-600">{result.incorrectAnswers.length}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={onRetry} className="gap-2">
            <RotateCcw size={18} />
            Try Again
          </Button>
          <Button onClick={() => navigate('/progress')} className="gap-2">
            View My Progress
            <ArrowRight size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
};
