import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, Target, Trophy, Zap, Eye, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { categories } from '../data/categories';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { progress, loading } = useProgress();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const overallScore = progress
    ? Math.round(Object.values(progress.categories).reduce((a, c) => a + c.highestQuizScore, 0) / Object.keys(progress.categories).length)
    : 0;

  const totalViewed = progress
    ? Object.values(progress.categories).reduce((a, c) => a + c.completedSlides.length, 0)
    : 0;

  const modulesCompleted = progress
    ? Object.values(progress.categories).filter(c => c.highestQuizScore >= 80).length
    : 0;

  return (
    <div className="space-y-8 max-w-5xl animate-fade-in">

      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">
            {greeting()}, {user?.displayName?.split(' ')[0] ?? 'Student'}
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Here's where you left off in your cytopathology journey.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-2.5">
          <Zap size={15} className="text-amber-500" />
          <span className="text-sm font-semibold text-amber-700">{progress?.totalXp ?? 0} XP</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide sm:tracking-widest">Competency</span>
            <div className="w-7 h-7 rounded-lg bg-brand-50 hidden sm:flex items-center justify-center">
              <Trophy size={13} className="text-brand-500" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-bold text-slate-900">{overallScore}<span className="text-sm sm:text-base font-medium text-slate-400 ml-0.5">%</span></p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Avg score</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide sm:tracking-widest">Slides</span>
            <div className="w-7 h-7 rounded-lg bg-accent-50 hidden sm:flex items-center justify-center">
              <Eye size={13} className="text-accent-500" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-bold text-slate-900">{totalViewed}</p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Studied</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide sm:tracking-widest">Modules</span>
            <div className="w-7 h-7 rounded-lg bg-green-50 hidden sm:flex items-center justify-center">
              <CheckCircle size={13} className="text-green-500" />
            </div>
          </div>
          <p className="text-xl sm:text-3xl font-bold text-slate-900">{modulesCompleted}<span className="text-sm sm:text-base font-medium text-slate-400 ml-1">/ 5</span></p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Done ≥80%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Study Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/learn" className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-brand-100 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
              <BookOpen size={19} className="text-brand-500" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Learn Morphology</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Explore annotated cytology slides with interactive cue markers.</p>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
              Open library <ArrowRight size={13} />
            </div>
          </Link>

          <Link to="/quiz" className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-accent-100 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center mb-4 group-hover:bg-accent-100 transition-colors">
              <BrainCircuit size={19} className="text-accent-500" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Practice Quiz</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Image-based diagnostic questions with instant guided feedback.</p>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-accent-500 group-hover:gap-2 transition-all">
              Start quiz <ArrowRight size={13} />
            </div>
          </Link>

          <Link to="/challenge" className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-highlight-100 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-highlight-50 flex items-center justify-center mb-4 group-hover:bg-highlight-100 transition-colors">
              <Target size={19} className="text-highlight-500" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Challenge Mode</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Timed and rapid-fire modes to simulate real screening pressure.</p>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-highlight-500 group-hover:gap-2 transition-all">
              Take challenge <ArrowRight size={13} />
            </div>
          </Link>
        </div>
      </div>

      {/* Module Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Module Progress</h2>
          <Link to="/progress" className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
          {categories.map((cat) => {
            const c = progress?.categories[cat.id];
            const score = c?.highestQuizScore ?? 0;
            const locked = !(c?.unlocked ?? false);
            const viewed = c?.completedSlides.length ?? 0;
            const total = c?.totalSlides ?? 0;
            const slidePercent = total > 0 ? Math.round((viewed / total) * 100) : 0;

            return (
              <div key={cat.id} className={`flex items-center gap-4 px-5 py-4 ${locked ? 'opacity-50' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  locked ? 'bg-slate-100' : score >= 80 ? 'bg-green-50' : 'bg-brand-50'
                }`}>
                  {locked
                    ? <Lock size={14} className="text-slate-400" />
                    : score >= 80
                      ? <CheckCircle size={14} className="text-green-500" />
                      : <BookOpen size={14} className="text-brand-500" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-800 truncate">{cat.title}</span>
                    <span className="text-sm font-bold text-slate-700 ml-4 shrink-0">{score > 0 ? `Quiz: ${score}%` : `${slidePercent}%`}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${score >= 80 ? 'bg-green-400' : 'bg-brand-400'}`}
                      style={{ width: `${Math.max(slidePercent, score)}%` }}
                    />
                  </div>
                </div>

                <span className="text-xs text-slate-400 shrink-0 hidden sm:block">{viewed}/{total} slides</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements */}
      {progress && progress.achievements.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Recent Achievements</h2>
          <div className="flex flex-wrap gap-2">
            {progress.achievements.slice(-5).map(ach => (
              <div key={ach.id} className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl text-sm">
                <Trophy size={13} className="text-amber-500" />
                <span className="font-medium text-amber-800 text-xs">{ach.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
