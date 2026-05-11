import React, { useState, useRef } from 'react';
import type { SlideContent } from '../../types/learning';
import { CueMarker, CuePopup } from './CueComponents';
import { ZoomIn, ZoomOut, Maximize, Microscope } from 'lucide-react';

interface AnnotatedImageProps {
  slide: SlideContent;
}

export const AnnotatedImage: React.FC<AnnotatedImageProps> = ({ slide }) => {
  const [activeCueId, setActiveCueId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCue = slide.cues.find(c => c.id === activeCueId) || null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setScale(1);

  return (
    <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-[4/3] flex items-center justify-center">
      
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
        <button onClick={handleZoomIn} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors" title="Zoom In">
          <ZoomIn size={20} />
        </button>
        <button onClick={handleResetZoom} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors" title="Reset Zoom">
          <Maximize size={20} />
        </button>
        <button onClick={handleZoomOut} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors" title="Zoom Out">
          <ZoomOut size={20} />
        </button>
      </div>

      {/* Image Container */}
      <div 
        ref={containerRef}
        className="w-full h-full relative origin-center transition-transform duration-300 ease-out cursor-move"
        style={{ transform: `scale(${scale})` }}
        onClick={() => setActiveCueId(null)}
      >
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
            <Microscope size={48} className="opacity-30" />
            <p className="text-sm font-medium opacity-50">Image not available</p>
          </div>
        ) : (
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-contain pointer-events-none"
            onError={() => setImgError(true)}
          />
        )}
        
        {/* Render Cues */}
        {slide.cues.map(cue => (
          <CueMarker 
            key={cue.id}
            cue={cue}
            isActive={activeCueId === cue.id}
            onClick={() => setActiveCueId(activeCueId === cue.id ? null : cue.id)}
          />
        ))}
      </div>

      {/* Popup overlay */}
      <CuePopup cue={activeCue} onClose={() => setActiveCueId(null)} />
    </div>
  );
};
