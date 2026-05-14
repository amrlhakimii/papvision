import React, { useState, useCallback } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Target, Zap, Shuffle, ArrowLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { CountdownTimer } from '../components/challenge/CountdownTimer';
import { quizQuestions } from '../data/quizData';
import { QuizOptions } from '../components/quiz/QuizComponents';
import { motion } from 'framer-motion';
import type { QuizQuestion } from '../types/quiz';

type Mode = 'selection' | 'timed' | 'rapid' | 'random';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Shared Result Screen ─────────────────────────────────────────────────────

const ResultScreen: React.FC<{
  title: string;
  score: number;
  total: number;
  icon: React.ReactNode;
  iconBg: string;
  onBack: () => void;
}> = ({ title, score, total, icon, iconBg, onBack }) => {
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center mt-8">
      <div className={`w-24 h-24 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
        {icon}
      </div>
      <h2 className="text-4xl font-display font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 mb-8">Here is your performance summary.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Score</p>
          <p className="text-3xl font-bold text-slate-900">{score}/{total}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Accuracy</p>
          <p className={`text-3xl font-bold ${accuracy >= 80 ? 'text-green-600' : accuracy >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{accuracy}%</p>
        </div>
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Result</p>
          <p className="text-3xl font-bold text-brand-600">{accuracy >= 80 ? '🏆' : accuracy >= 60 ? '📚' : '💪'}</p>
        </div>
      </div>

      <Button onClick={onBack} size="lg" className="gap-2">
        <ArrowLeft size={18} />
        Return to Challenge Menu
      </Button>
    </motion.div>
  );
};

// ─── TIMED QUIZ MODE ─────────────────────────────────────────────────────────

const TimedMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions] = useState<QuizQuestion[]>(() => shuffle(quizQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
    setIsGameOver(true);
  }, []);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsRevealed(true);
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    return (
      <ResultScreen
        title={timeUp ? "Time's Up!" : 'Timed Quiz Complete!'}
        score={score}
        total={currentIndex + (isRevealed ? 1 : 0)}
        icon={<Clock className="text-brand-600" size={48} />}
        iconBg="bg-brand-100"
        onBack={onBack}
      />
    );
  }

  const q = questions[currentIndex];
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft size={18} /> Exit
        </Button>
        <CountdownTimer initialSeconds={300} onTimeUp={handleTimeUp} isRunning={!isGameOver} />
        <Badge variant="primary">Q {currentIndex + 1}/{questions.length}</Badge>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
        <div className="bg-brand-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-lg">
          <img src={q.imageUrl} alt="Cytology" className="w-full h-full object-cover" />
        </div>

        <Card className="flex flex-col shadow-xl">
          <Badge variant={q.difficulty === 'beginner' ? 'success' : q.difficulty === 'intermediate' ? 'warning' : 'danger'} className="w-fit mb-4">
            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
          </Badge>
          <h3 className="text-base font-medium text-slate-900 mb-4 leading-snug">{q.question}</h3>
          <QuizOptions
            options={q.options}
            selectedOption={selectedAnswer}
            correctOption={q.correctAnswer}
            isRevealed={isRevealed}
            onSelect={setSelectedAnswer}
          />

          {isRevealed && (
            <div className={`mt-4 p-4 rounded-xl border text-sm ${selectedAnswer === q.correctAnswer ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              {selectedAnswer === q.correctAnswer ? <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Correct! </span> : <span className="flex items-center gap-2"><XCircle size={16} /> Incorrect — {q.correctAnswer}</span>}
              <p className="mt-1 text-xs opacity-80">{q.explanation}</p>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            {!isRevealed ? (
              <Button onClick={handleSubmit} disabled={!selectedAnswer} className="px-6">Submit</Button>
            ) : (
              <Button onClick={handleNext} variant="secondary" className="px-6">
                {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── RAPID SCREENING MODE ────────────────────────────────────────────────────

const RapidMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions] = useState<QuizQuestion[]>(() => shuffle(quizQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const handleTimeUp = useCallback(() => setIsGameOver(true), []);

  const handleAnswer = (option: string) => {
    if (option === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimerKey(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    return (
      <ResultScreen
        title="Rapid Screening Complete!"
        score={score}
        total={Math.min(currentIndex + 1, questions.length)}
        icon={<Zap className="text-highlight-500" size={48} />}
        iconBg="bg-highlight-100"
        onBack={onBack}
      />
    );
  }

  const q = questions[currentIndex];
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft size={18} /> Exit
        </Button>
        <CountdownTimer key={timerKey} initialSeconds={10} onTimeUp={handleTimeUp} isRunning={!isGameOver} />
        <div className="font-bold text-highlight-600 bg-highlight-100 px-3 py-1 rounded-full text-sm">Score: {score}</div>
      </div>

      <Card padding="none" className="overflow-hidden border-highlight-200 shadow-xl shadow-highlight-500/10">
        <div className="p-3 bg-highlight-50 border-b border-highlight-100 flex items-center gap-2 text-highlight-600 font-semibold text-sm">
          <Zap size={16} /> RAPID SCREENING — Answer within 10 seconds!
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-900 aspect-square md:aspect-auto relative">
            <img src={q.imageUrl} alt="Slide" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
              Case {currentIndex + 1} of {questions.length}
            </p>
            <h3 className="text-base font-medium text-slate-900 mb-6 leading-snug">{q.question}</h3>
            <QuizOptions
              options={q.options}
              selectedOption={null}
              correctOption={q.correctAnswer}
              isRevealed={false}
              onSelect={handleAnswer}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

// ─── RANDOMIZED CASES MODE ────────────────────────────────────────────────────

const RandomMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions] = useState<QuizQuestion[]>(() => shuffle(quizQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsRevealed(true);
    if (selectedAnswer === questions[currentIndex].correctAnswer) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    return (
      <ResultScreen
        title="Randomized Cases Complete!"
        score={score}
        total={questions.length}
        icon={<Shuffle className="text-accent-500" size={48} />}
        iconBg="bg-accent-100"
        onBack={onBack}
      />
    );
  }

  const q = questions[currentIndex];
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft size={18} /> Exit
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant={q.difficulty === 'beginner' ? 'success' : q.difficulty === 'intermediate' ? 'warning' : 'danger'}>
            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
          </Badge>
          <span className="text-sm text-slate-500">Case {currentIndex + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
        <div className="bg-accent-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-lg">
          <img src={q.imageUrl} alt="Cytology" className="w-full h-full object-cover" />
        </div>

        <Card className="flex flex-col shadow-xl">
          <h3 className="text-base font-medium text-slate-900 mb-4 leading-snug">{q.question}</h3>
          <QuizOptions
            options={q.options}
            selectedOption={selectedAnswer}
            correctOption={q.correctAnswer}
            isRevealed={isRevealed}
            onSelect={setSelectedAnswer}
          />

          {isRevealed && (
            <div className={`mt-4 p-4 rounded-xl border text-sm ${selectedAnswer === q.correctAnswer ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              {selectedAnswer === q.correctAnswer
                ? <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} /> Correct Diagnosis!</span>
                : <span className="flex items-center gap-2 font-medium"><XCircle size={16} /> Incorrect — {q.correctAnswer}</span>}
              <p className="mt-2 opacity-80">{q.explanation}</p>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            {!isRevealed ? (
              <Button onClick={handleSubmit} disabled={!selectedAnswer} className="px-6">Submit Diagnosis</Button>
            ) : (
              <Button onClick={handleNext} variant="secondary" className="px-6">
                {currentIndex < questions.length - 1 ? 'Next Case' : 'Finish'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── SELECTION SCREEN ─────────────────────────────────────────────────────────

const Challenge: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('selection');

  if (activeMode === 'timed') return <TimedMode onBack={() => setActiveMode('selection')} />;
  if (activeMode === 'rapid') return <RapidMode onBack={() => setActiveMode('selection')} />;
  if (activeMode === 'random') return <RandomMode onBack={() => setActiveMode('selection')} />;

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-highlight-100 rounded-full mb-4">
          <Target className="text-highlight-500" size={32} />
        </div>
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Challenge Mode</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Test your diagnostic reflexes under pressure. Choose a challenge mode to simulate real clinical screening environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timed Quiz */}
        <Card variant="interactive" className="flex flex-col border-brand-200 ring-2 ring-transparent hover:ring-brand-300">
          <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Timed Quiz</h3>
          <p className="text-slate-600 mb-6 flex-1">Complete all cases against a 5-minute countdown. Accuracy and speed both count. Answer after viewing feedback on each case.</p>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="primary">5 min timer</Badge>
            <Badge variant="neutral">{quizQuestions.length} cases</Badge>
          </div>
          <Button className="w-full" onClick={() => setActiveMode('timed')}>
            Start Timed Quiz
          </Button>
        </Card>

        {/* Rapid Screening */}
        <Card variant="interactive" className="flex flex-col border-highlight-200 ring-2 ring-transparent hover:ring-highlight-300">
          <div className="w-12 h-12 rounded-xl bg-highlight-100 text-highlight-500 flex items-center justify-center mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Rapid Screening</h3>
          <p className="text-slate-600 mb-6 flex-1">10 seconds per case. Auto-progresses when time runs out. Tests instant pattern recognition and rapid visual interpretation.</p>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="danger">10s per case</Badge>
            <Badge variant="neutral">No feedback</Badge>
          </div>
          <Button className="w-full bg-highlight-500 hover:bg-highlight-600 shadow-highlight-500/20" onClick={() => setActiveMode('rapid')}>
            Play Rapid Mode
          </Button>
        </Card>

        {/* Randomized Cases */}
        <Card variant="interactive" className="flex flex-col border-accent-200 ring-2 ring-transparent hover:ring-accent-300">
          <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-500 flex items-center justify-center mb-4">
            <Shuffle size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Randomized Cases</h3>
          <p className="text-slate-600 mb-6 flex-1">Mixed beginner, intermediate, and advanced cases in completely random order. Full feedback shown after each answer.</p>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">All levels</Badge>
            <Badge variant="neutral">Full feedback</Badge>
          </div>
          <Button className="w-full bg-accent-500 hover:bg-accent-600 shadow-accent-500/20 text-white" onClick={() => setActiveMode('random')}>
            Start Random Cases
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Challenge;
