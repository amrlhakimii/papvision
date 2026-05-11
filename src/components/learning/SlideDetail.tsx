import React from 'react';
import type { SlideContent } from '../../types/learning';
import { AnnotatedImage } from './AnnotatedImage';
import { Badge } from '../ui/Badge';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface SlideDetailProps {
  slide: SlideContent;
  onBack: () => void;
}

export const SlideDetail: React.FC<SlideDetailProps> = ({ slide, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors font-medium"
      >
        <ArrowLeft size={18} />
        Back to Category
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-display font-bold text-slate-900">{slide.title}</h2>
            <Badge variant="primary">Slide Viewer</Badge>
          </div>
          <p className="text-slate-600">{slide.diagnosticNotes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnnotatedImage slide={slide} />
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-semibold text-amber-900 mb-1 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-amber-600" />
              Clinical Relevance
            </h4>
            <p className="text-amber-800 text-sm">{slide.clinicalRelevance}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">
              Cellular Features
            </h3>
            <ul className="space-y-3">
              {slide.cellularFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">
              Nuclear Features
            </h3>
            <ul className="space-y-3">
              {slide.nuclearFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-2">
              Background
            </h3>
            <ul className="space-y-3">
              {slide.backgroundFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
