import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, AlertCircle } from 'lucide-react';
import type { QuizQuestion } from '../../types/quiz';

interface QuizOptionsProps {
  options: string[];
  selectedOption: string | null;
  correctOption: string;
  isRevealed: boolean;
  onSelect: (option: string) => void;
}

export const QuizOptions: React.FC<QuizOptionsProps> = ({
  options, selectedOption, correctOption, isRevealed, onSelect
}) => {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option;
        const isCorrect = option === correctOption;

        let stateClass = 'bg-white border-slate-200 hover:border-brand-300 hover:bg-slate-50 text-slate-700';

        if (isRevealed) {
          if (isCorrect) {
            stateClass = 'bg-green-50 border-green-500 text-green-900';
          } else if (isSelected && !isCorrect) {
            stateClass = 'bg-red-50 border-red-500 text-red-900 opacity-70';
          } else {
            stateClass = 'bg-white border-slate-200 text-slate-400 opacity-50';
          }
        } else if (isSelected) {
          stateClass = 'bg-brand-50 border-brand-500 text-brand-900 shadow-sm shadow-brand-500/10';
        }

        return (
          <button
            key={option}
            disabled={isRevealed}
            onClick={() => onSelect(option)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${stateClass}`}
          >
            <span className="font-medium">{option}</span>
            {isRevealed && isCorrect && <CheckCircle2 className="text-green-500 shrink-0" size={20} />}
            {isRevealed && isSelected && !isCorrect && <XCircle className="text-red-500 shrink-0" size={20} />}
          </button>
        );
      })}
    </div>
  );
};

interface DiagnosticFeedbackProps {
  question: QuizQuestion;
  isCorrect: boolean;
}

export const DiagnosticFeedback: React.FC<DiagnosticFeedbackProps> = ({ question, isCorrect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-5 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {isCorrect ? (
            <CheckCircle2 className="text-green-600" size={24} />
          ) : (
            <AlertCircle className="text-amber-600" size={24} />
          )}
        </div>
        <div>
          <h4 className={`font-display font-semibold mb-2 ${isCorrect ? 'text-green-900' : 'text-amber-900'}`}>
            {isCorrect ? 'Correct Diagnosis!' : 'Incorrect Diagnosis'}
          </h4>
          <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
            {question.explanation}
          </p>

          <div className="mt-4 border-t border-black/10 pt-4">
            <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
              Key Diagnostic Features
            </h5>
            <ul className="space-y-1">
              {question.keyFeatures.map((feature, i) => (
                <li key={i} className={`text-sm flex items-start gap-2 ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                  <div className={`w-1 h-1 rounded-full mt-2 shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-amber-500'}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface HintBoxProps {
  hints: string[];
}

export const HintBox: React.FC<HintBoxProps> = ({ hints }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-6 bg-brand-50 border border-brand-200 rounded-xl p-4"
    >
      <div className="flex items-start gap-3">
        <div className="bg-brand-100 p-1.5 rounded-lg text-brand-600 shrink-0">
          <Lightbulb size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-900 mb-1">Diagnostic Hints</h4>
          <ul className="space-y-2">
            {hints.map((hint, i) => (
              <li key={i} className="text-sm text-brand-800 flex items-start gap-2">
                <span className="font-bold text-brand-600 shrink-0">{i + 1}.</span>
                {hint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
