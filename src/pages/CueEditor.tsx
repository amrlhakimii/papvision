import React, { useState, useRef, useCallback } from 'react';
import { learningSlides } from '../data/learningData';
import type { MorphologyCue, SlideContent } from '../types/learning';
import { Crosshair, Trash2, Copy, Check, ChevronDown } from 'lucide-react';

interface PlacedCue extends MorphologyCue {
  isNew?: boolean;
}

const CueEditor: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState<SlideContent>(learningSlides[0]);
  const [cues, setCues] = useState<PlacedCue[]>(learningSlides[0].cues.map(c => ({ ...c })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [copied, setCopied] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(100);

  const handleSlideChange = (id: string) => {
    const slide = learningSlides.find(s => s.id === id)!;
    setSelectedSlide(slide);
    setCues(slide.cues.map(c => ({ ...c })));
    setEditingId(null);
    setPlacing(false);
  };

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!placing) return;
    const rect = imgContainerRef.current!.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(1));
    const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(1));
    const id = `cue-${++counterRef.current}`;
    const newCue: PlacedCue = { id, x, y, title: 'New Cue', description: '', isNew: true };
    setCues(prev => [...prev, newCue]);
    setEditingId(id);
    setPlacing(false);
  }, [placing]);

  const updateCue = (id: string, field: 'title' | 'description', value: string) => {
    setCues(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const deleteCue = (id: string) => {
    setCues(prev => prev.filter(c => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const output = `cues: [\n${cues.map(c =>
    `  {\n    id: '${c.id}',\n    x: ${c.x},\n    y: ${c.y},\n    title: '${c.title.replace(/'/g, "\\'")}',\n    description: '${c.description.replace(/'/g, "\\'")}',\n  },`
  ).join('\n')}\n],`;

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 bg-slate-900 border-b border-slate-800">
        <Crosshair size={20} className="text-brand-400" />
        <h1 className="text-lg font-bold">Cue Placement Editor</h1>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">dev tool</span>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedSlide.id}
              onChange={e => handleSlideChange(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {learningSlides.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Image canvas */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
          <div className="flex items-center gap-3 self-start">
            <button
              onClick={() => setPlacing(p => !p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                placing
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Crosshair size={15} />
              {placing ? 'Click on image to place...' : 'Place new cue'}
            </button>
            <span className="text-xs text-slate-500">{cues.length} cues total</span>
          </div>

          <div
            ref={imgContainerRef}
            onClick={handleImageClick}
            className={`relative w-full max-w-3xl aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden border-2 transition-all ${
              placing ? 'border-brand-500 cursor-crosshair shadow-lg shadow-brand-500/20' : 'border-slate-800 cursor-default'
            }`}
          >
            <img
              src={selectedSlide.imageUrl}
              alt={selectedSlide.title}
              className="w-full h-full object-contain pointer-events-none"
            />

            {cues.map(cue => (
              <div
                key={cue.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${cue.x}%`, top: `${cue.y}%` }}
              >
                <button
                  onClick={e => { e.stopPropagation(); setEditingId(cue.id === editingId ? null : cue.id); }}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-lg transition-all ${
                    editingId === cue.id
                      ? 'bg-brand-500 border-white text-white scale-125'
                      : 'bg-white border-brand-500 text-brand-600 hover:scale-110'
                  }`}
                  title={cue.title}
                >
                  {cues.indexOf(cue) + 1}
                </button>
                {editingId === cue.id && (
                  <div className="absolute left-8 top-0 z-20 bg-slate-800 border border-slate-700 rounded-lg p-2 w-48 shadow-xl text-xs">
                    <p className="text-slate-400 mb-1">x: {cue.x}% · y: {cue.y}%</p>
                    <input
                      autoFocus
                      value={cue.title}
                      onChange={e => updateCue(cue.id, 'title', e.target.value)}
                      onClick={e => e.stopPropagation()}
                      placeholder="Title"
                      className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white placeholder-slate-500 mb-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <textarea
                      value={cue.description}
                      onChange={e => updateCue(cue.id, 'description', e.target.value)}
                      onClick={e => e.stopPropagation()}
                      placeholder="Description"
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      onClick={e => { e.stopPropagation(); deleteCue(cue.id); }}
                      className="mt-1 flex items-center gap-1 text-red-400 hover:text-red-300 text-xs"
                    >
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600">
            Cues use <code className="text-slate-400">object-contain</code> — coordinates are % of the full image container including letterbox padding.
          </p>
        </div>

        {/* Output panel */}
        <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <span className="text-sm font-semibold text-slate-300">Output — copy to learningData.ts</span>
            <button
              onClick={copyOutput}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>

          <pre className="flex-1 overflow-auto p-4 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
            {output}
          </pre>

          <div className="px-4 py-3 border-t border-slate-800 space-y-1">
            {cues.map((cue, i) => (
              <div
                key={cue.id}
                onClick={() => setEditingId(cue.id === editingId ? null : cue.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                  editingId === cue.id ? 'bg-brand-900/50 text-brand-300' : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-xs truncate">{cue.title}</span>
                <span className="ml-auto text-xs text-slate-600 shrink-0">{cue.x},{cue.y}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CueEditor;
