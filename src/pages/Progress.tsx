import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Trophy, Zap, Eye, CheckCircle, Lock, BookOpen, Star } from 'lucide-react';
import { categories } from '../data/categories';
import type { Achievement } from '../types/progress';

const ACHIEVEMENT_DEFS = [
  { id: 'first-slide',      title: 'First Steps',                  description: 'Viewed your first learning slide.',                    icon: '👣' },
  { id: 'normal-master',    title: 'Normal Cell Master',            description: 'Completed all Normal Cervical Cell slides.',            icon: '🔬' },
  { id: 'infection-expert', title: 'Infection Expert',              description: 'Completed all Infectious Organisms slides.',            icon: '🛡️' },
  { id: 'first-quiz',       title: 'First Diagnosis',               description: 'Completed your first diagnostic quiz.',                 icon: '🧠' },
  { id: 'perfect-score',    title: 'Perfect Diagnosis',             description: 'Scored 100% on any quiz.',                             icon: '🏆' },
  { id: 'xp-500',           title: 'Rising Scholar',                description: 'Earned 500 XP.',                                       icon: '⭐' },
  { id: 'lsil-badge',       title: 'LSIL Recognition',              description: 'Scored ≥80% on Squamous Abnormalities.',               icon: '🎖️' },
  { id: 'screening-ready',  title: 'Screening Ready',               description: 'Unlocked all morphology categories.',                  icon: '🎯' },
];

const Progress: React.FC = () => {
  const { progress, loading } = useProgress();

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <LoadingSpinner size="xl" />
    </div>
  );

  if (!progress) return null;

  const totalCats = Object.keys(progress.categories).length;
  const avgScore = Math.round(Object.values(progress.categories).reduce((a, c) => a + c.highestQuizScore, 0) / totalCats);
  const totalViewed = Object.values(progress.categories).reduce((a, c) => a + c.completedSlides.length, 0);
  const completed = Object.values(progress.categories).filter(c => c.highestQuizScore >= 80).length;
  const earnedIds = new Set(progress.achievements.map(a => a.id));

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">

      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">My Progress</h1>
        <p className="text-sm text-slate-500 mt-1">Your cytopathology competency at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Score',     value: `${avgScore}%`,  sub: 'Quiz average',         icon: Trophy,      color: 'bg-brand-50 text-brand-500' },
          { label: 'Total XP',          value: progress.totalXp, sub: 'Points earned',        icon: Zap,         color: 'bg-amber-50 text-amber-500' },
          { label: 'Slides Viewed',     value: totalViewed,      sub: 'Images studied',       icon: Eye,         color: 'bg-accent-50 text-accent-500' },
          { label: 'Modules Done',      value: `${completed}/5`, sub: 'Scored ≥80%',         icon: CheckCircle, color: 'bg-green-50 text-green-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={16} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Module breakdown */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Module Competency</h2>

          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
            {categories.map(cat => {
              const cp = progress.categories[cat.id];
              const locked = !cp.unlocked;
              const score = cp.highestQuizScore;
              const done = score >= 80;
              const pct = (cp.completedSlides.length / (cp.totalSlides || 1)) * 100;

              return (
                <div key={cat.id} className={`px-5 py-4 ${locked ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      locked ? 'bg-slate-100 text-slate-400' : done ? 'bg-green-50 text-green-500' : 'bg-brand-50 text-brand-500'
                    }`}>
                      {locked ? <Lock size={13} /> : done ? <CheckCircle size={13} /> : <BookOpen size={13} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-800">{cat.title}</span>
                        <div className="flex items-center gap-2">
                          {done && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Passed</span>}
                          {locked && <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Locked</span>}
                          <span className="text-sm font-bold text-slate-900">{score}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quiz progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Quiz score</span>
                      <span>{score}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${done ? 'bg-green-400' : 'bg-brand-400'}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                      <span>Slides viewed</span>
                      <span>{cp.completedSlides.length}/{cp.totalSlides}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent-400 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            Achievements <span className="normal-case font-normal text-slate-400">({earnedIds.size}/{ACHIEVEMENT_DEFS.length})</span>
          </h2>

          <div className="space-y-2">
            {ACHIEVEMENT_DEFS.map(def => {
              const earned = earnedIds.has(def.id);
              const achData = progress.achievements.find(a => a.id === def.id);
              return (
                <div
                  key={def.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                    earned
                      ? 'bg-white border-amber-100 shadow-sm'
                      : 'bg-slate-50 border-slate-100 opacity-50 grayscale'
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{def.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${earned ? 'text-slate-900' : 'text-slate-500'}`}>{def.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{def.description}</p>
                    {achData?.earnedAt && (
                      <p className="text-xs text-amber-500 mt-1">{new Date(achData.earnedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                  {earned && <Star size={13} className="text-amber-400 shrink-0 mt-0.5 ml-auto" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
