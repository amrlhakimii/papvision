import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MorphologyCue } from '../../types/learning';
import { Info } from 'lucide-react';

interface CueMarkerProps {
  cue: MorphologyCue;
  isActive: boolean;
  onClick: () => void;
}

export const CueMarker: React.FC<CueMarkerProps> = ({ cue, isActive, onClick }) => {
  return (
    <div
      className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${cue.x}%`, top: `${cue.y}%` }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onClick();
        }}
        className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-colors border-2 ${
          isActive
            ? 'bg-brand-500 border-white text-white shadow-brand-500/50'
            : 'bg-white/90 backdrop-blur border-brand-500 text-brand-600 hover:bg-white'
        }`}
      >
        <span className="sr-only">{cue.title}</span>
        <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-brand-500'}`} />
      </motion.button>
    </div>
  );
};

interface CuePopupProps {
  cue: MorphologyCue | null;
  onClose: () => void;
}

export const CuePopup: React.FC<CuePopupProps> = ({ cue, onClose }) => {
  return (
    <AnimatePresence>
      {cue && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/20 z-20 pointer-events-auto"
        >
          <div className="flex items-start gap-3">
            <div className="bg-brand-100 text-brand-600 p-2 rounded-lg shrink-0 mt-0.5">
              <Info size={20} />
            </div>
            <div>
              <h4 className="font-display font-semibold text-slate-900 mb-1">{cue.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{cue.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-3 w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
