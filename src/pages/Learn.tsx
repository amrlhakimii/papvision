import React, { useState, useMemo } from 'react';
import { SlideCard } from '../components/learning/SlideCard';
import { SlideDetail } from '../components/learning/SlideDetail';
import { EmptyState } from '../components/ui/EmptyState';
import type { CategoryId, SlideContent } from '../types/learning';
import { categories } from '../data/categories';
import { useProgress } from '../hooks/useProgress';
import { useSlides } from '../hooks/useSlides';
import { Microscope, Lock, CheckCircle, BookOpen } from 'lucide-react';

const catColors: Record<CategoryId, { bg: string; text: string; activeBg: string; activeText: string }> = {
  normal:     { bg: 'bg-slate-100',       text: 'text-slate-600',    activeBg: 'bg-brand-500',     activeText: 'text-white' },
  infections: { bg: 'bg-slate-100',       text: 'text-slate-600',    activeBg: 'bg-brand-500',     activeText: 'text-white' },
  benign:     { bg: 'bg-slate-100',       text: 'text-slate-600',    activeBg: 'bg-brand-500',     activeText: 'text-white' },
  squamous:   { bg: 'bg-slate-100',       text: 'text-slate-600',    activeBg: 'bg-brand-500',     activeText: 'text-white' },
  glandular:  { bg: 'bg-slate-100',       text: 'text-slate-600',    activeBg: 'bg-brand-500',     activeText: 'text-white' },
};

const Learn: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('normal');
  const [selectedSlide, setSelectedSlide] = useState<SlideContent | null>(null);
  const { progress, markSlideViewed } = useProgress();
  const { slides } = useSlides();

  const activeSlides = useMemo(() => slides.filter(s => s.categoryId === selectedCategory), [slides, selectedCategory]);
  const activeCat = useMemo(() => categories.find(c => c.id === selectedCategory), [selectedCategory]);
  const isLocked = progress ? !progress.categories[selectedCategory]?.unlocked : false;

  const handleOpenSlide = (slide: SlideContent) => {
    setSelectedSlide(slide);
    markSlideViewed(selectedCategory, slide.id);
  };

  if (selectedSlide) {
    return <SlideDetail slide={selectedSlide} onBack={() => setSelectedSlide(null)} />;
  }

  return (
    <div className="max-w-5xl animate-fade-in space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Learn Morphology</h1>
        <p className="text-sm text-slate-500 mt-1">Study annotated cytology slides across all Bethesda System categories.</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => {
          const c = progress?.categories[cat.id];
          const locked = !(c?.unlocked ?? false);
          const score = c?.highestQuizScore ?? 0;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-sm'
                  : locked
                    ? 'bg-slate-100 text-slate-400 cursor-pointer hover:bg-slate-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {locked && !isActive && <Lock size={12} />}
              {!locked && score >= 80 && !isActive && <CheckCircle size={12} className="text-green-500" />}
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Category info bar */}
      <div className={`rounded-2xl border p-4 flex items-start gap-3 ${
        isLocked ? 'bg-amber-50 border-amber-100' : 'bg-white border-slate-100'
      }`}>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isLocked ? 'bg-amber-100' : 'bg-brand-50'
        }`}>
          {isLocked
            ? <Lock size={15} className="text-amber-500" />
            : <BookOpen size={15} className="text-brand-500" />
          }
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 text-sm">{activeCat?.title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{activeCat?.description}</p>
          {isLocked && (
            <p className="text-xs font-medium text-amber-600 mt-1.5">
              Score ≥80% on Normal and Infections quizzes to unlock this category.
            </p>
          )}
        </div>
        {!isLocked && (
          <div className="ml-auto text-right shrink-0 hidden sm:block">
            <p className="text-xs text-slate-400">Slides viewed</p>
            <p className="text-sm font-bold text-slate-700">
              {progress?.categories[selectedCategory]?.completedSlides.length ?? 0}
              <span className="font-normal text-slate-400"> / {activeSlides.length}</span>
            </p>
          </div>
        )}
      </div>

      {/* Slides grid */}
      {isLocked ? (
        <EmptyState
          icon={Lock}
          title="Category Locked"
          description="Complete earlier modules with ≥80% quiz score to unlock this category."
        />
      ) : activeSlides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeSlides.map(slide => (
            <SlideCard
              key={slide.id}
              slide={slide}
              isViewed={!!progress?.categories[selectedCategory]?.completedSlides.includes(slide.id)}
              onClick={handleOpenSlide}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Microscope}
          title="No Slides Yet"
          description="Content for this category is being developed."
        />
      )}
    </div>
  );
};

export default Learn;
