import React, { useState } from 'react';
import type { SlideContent } from '../../types/learning';
import { Card } from '../ui/Card';
import { Image as ImageIcon, CheckCircle2, Microscope } from 'lucide-react';

interface SlideCardProps {
  slide: SlideContent;
  isViewed?: boolean;
  onClick: (slide: SlideContent) => void;
}

export const SlideCard: React.FC<SlideCardProps> = ({ slide, isViewed, onClick }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <Card
      variant="interactive"
      padding="none"
      onClick={() => onClick(slide)}
      className="flex flex-col h-full overflow-hidden"
    >
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50">
            <Microscope size={36} />
            <span className="text-xs font-medium text-slate-400">Image loading</span>
          </div>
        ) : (
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-sm">
          <ImageIcon size={14} />
          {slide.cues.length} Cues
        </div>

        {isViewed && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-sm">
            <CheckCircle2 size={12} />
            Viewed
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-display font-semibold text-slate-900 line-clamp-1 mb-1">{slide.title}</h4>
        <p className="text-sm text-slate-500 line-clamp-2 mt-auto">{slide.diagnosticNotes}</p>
      </div>
    </Card>
  );
};
