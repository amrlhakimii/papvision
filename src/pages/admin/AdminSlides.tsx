import React, { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Save, Crosshair, AlertCircle } from 'lucide-react';
import { getSlides, saveSlide, deleteSlide } from '../../services/firestoreService';
import type { SlideContent, MorphologyCue, CategoryId } from '../../types/learning';
import { categories } from '../../data/categories';
import { ImageUploader } from '../../components/admin/ImageUploader';

const generateId = (prefix: string) => `${prefix}-${Date.now()}`;

const EMPTY_SLIDE: Omit<SlideContent, 'id'> = {
  categoryId: 'normal',
  title: '',
  imageUrl: '',
  cellularFeatures: [''],
  nuclearFeatures: [''],
  backgroundFeatures: [''],
  diagnosticNotes: '',
  clinicalRelevance: '',
  cues: [],
};

// ─── Cue Placement Sub-component ─────────────────────────────────────────────
const CuePlacer: React.FC<{ imageUrl: string; cues: MorphologyCue[]; onChange: (cues: MorphologyCue[]) => void }> = ({ imageUrl, cues, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [placing, setPlacing] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const counter = useRef(200);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!placing) return;
    const rect = ref.current!.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(1));
    const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(1));
    const id = `cue-${++counter.current}`;
    const newCue: MorphologyCue = { id, x, y, title: 'New Cue', description: '' };
    onChange([...cues, newCue]);
    setActiveId(id);
    setPlacing(false);
  };

  const update = (id: string, field: 'title' | 'description', val: string) =>
    onChange(cues.map(c => c.id === id ? { ...c, [field]: val } : c));

  const remove = (id: string) => { onChange(cues.filter(c => c.id !== id)); if (activeId === id) setActiveId(null); };

  const inputCls = "w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPlacing(p => !p)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${placing ? 'bg-brand-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
        >
          <Crosshair size={13} />{placing ? 'Click image to place...' : 'Place Cue'}
        </button>
        <span className="text-xs text-slate-500">{cues.length} cues</span>
      </div>

      <div
        ref={ref}
        onClick={handleClick}
        className={`relative w-full aspect-[4/3] bg-slate-900 rounded-lg overflow-hidden border-2 transition-colors ${placing ? 'border-brand-500 cursor-crosshair' : 'border-slate-700'}`}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full h-full object-contain pointer-events-none" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">Upload an image above to place cues</div>
        )}

        {cues.map((cue, i) => (
          <div
            key={cue.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${cue.x}%`, top: `${cue.y}%` }}
          >
            <button
              type="button"
              onClick={e => { e.stopPropagation(); setActiveId(cue.id === activeId ? null : cue.id); }}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-lg transition-all ${activeId === cue.id ? 'bg-brand-500 border-white text-white scale-125' : 'bg-white border-brand-500 text-brand-600 hover:scale-110'}`}
            >
              {i + 1}
            </button>
            {activeId === cue.id && (
              <div className="absolute left-7 top-0 z-20 bg-slate-800 border border-slate-600 rounded-lg p-2 w-44 shadow-xl">
                <p className="text-slate-400 text-xs mb-1">x: {cue.x}% · y: {cue.y}%</p>
                <input autoFocus value={cue.title} onChange={e => update(cue.id, 'title', e.target.value)} onClick={e => e.stopPropagation()} placeholder="Title" className={`${inputCls} mb-1`} />
                <textarea value={cue.description} onChange={e => update(cue.id, 'description', e.target.value)} onClick={e => e.stopPropagation()} placeholder="Description" rows={2} className={`${inputCls} resize-none`} />
                <button type="button" onClick={e => { e.stopPropagation(); remove(cue.id); }} className="mt-1 text-xs text-red-400 hover:text-red-300 flex items-center gap-1"><X size={11} /> Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Slide Form ───────────────────────────────────────────────────────────────
const SlideForm: React.FC<{ initial: SlideContent | null; onSave: (s: SlideContent) => Promise<void>; onCancel: () => void }> = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState<SlideContent>(initial ?? { id: generateId('slide'), ...EMPTY_SLIDE });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof SlideContent, value: unknown) => setForm(prev => ({ ...prev, [field]: value }));

  const setList = (field: 'cellularFeatures' | 'nuclearFeatures' | 'backgroundFeatures', i: number, val: string) => {
    const arr = [...form[field]]; arr[i] = val; set(field, arr);
  };
  const addList = (field: 'cellularFeatures' | 'nuclearFeatures' | 'backgroundFeatures') =>
    set(field, [...form[field], '']);
  const removeList = (field: 'cellularFeatures' | 'nuclearFeatures' | 'backgroundFeatures', i: number) =>
    set(field, form[field].filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    try { await onSave(form); } catch { setError('Failed to save.'); } finally { setSaving(false); }
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500";
  const labelCls = "block text-xs font-medium text-slate-400 mb-1.5";

  const ListField: React.FC<{ label: string; field: 'cellularFeatures' | 'nuclearFeatures' | 'backgroundFeatures' }> = ({ label, field }) => (
    <div>
      <label className={labelCls}>{label}</label>
      {form[field].map((v, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={v} onChange={e => setList(field, i, e.target.value)} className={`${inputCls} flex-1`} placeholder={`Item ${i + 1}`} />
          <button type="button" onClick={() => removeList(field, i)} className="text-slate-500 hover:text-red-400"><X size={16} /></button>
        </div>
      ))}
      <button type="button" onClick={() => addList(field)} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"><Plus size={13} /> Add</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14} />{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <select value={form.categoryId} onChange={e => set('categoryId', e.target.value as CategoryId)} className={inputCls}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Title</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="e.g. Superficial Squamous Cells" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Image</label>
        <ImageUploader
          currentUrl={form.imageUrl}
          folder="slides"
          onUploaded={url => set('imageUrl', url)}
        />
      </div>

      <div>
        <label className={labelCls}>Cue Placement</label>
        <CuePlacer imageUrl={form.imageUrl} cues={form.cues} onChange={cues => set('cues', cues)} />
      </div>

      <ListField label="Cellular Features" field="cellularFeatures" />
      <ListField label="Nuclear Features" field="nuclearFeatures" />
      <ListField label="Background Features" field="backgroundFeatures" />

      <div>
        <label className={labelCls}>Diagnostic Notes</label>
        <textarea value={form.diagnosticNotes} onChange={e => set('diagnosticNotes', e.target.value)} rows={3} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Clinical Relevance</label>
        <textarea value={form.clinicalRelevance} onChange={e => set('clinicalRelevance', e.target.value)} rows={2} className={inputCls} />
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-lg text-sm font-semibold text-white transition-colors">
          <Save size={14} />{saving ? 'Saving...' : 'Save Slide'}
        </button>
      </div>
    </form>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminSlides: React.FC = () => {
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<CategoryId | 'all'>('all');
  const [editing, setEditing] = useState<SlideContent | null | 'new'>(null);

  const load = async () => { setLoading(true); try { setSlides(await getSlides()); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const handleSave = async (s: SlideContent) => { await saveSlide(s); await load(); setEditing(null); };
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    await deleteSlide(id);
    setSlides(prev => prev.filter(s => s.id !== id));
  };

  const filtered = slides.filter(s =>
    (filterCat === 'all' || s.categoryId === filterCat) &&
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  if (editing !== null) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">{editing === 'new' ? 'New Slide' : 'Edit Slide'}</h1>
          <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <SlideForm initial={editing === 'new' ? null : editing} onSave={handleSave} onCancel={() => setEditing(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Slides</h1>
          <p className="text-slate-400 text-sm mt-1">{slides.length} total slides</p>
        </div>
        <button onClick={() => setEditing('new')} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 rounded-lg text-sm font-semibold text-white transition-colors">
          <Plus size={16} /> Add Slide
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search slides..." className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value as CategoryId | 'all')} className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No slides found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400">Title</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 hidden sm:table-cell">Cues</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3 text-slate-300">{s.title}</td>
                  <td className="px-5 py-3 text-slate-400 hidden md:table-cell capitalize">{s.categoryId}</td>
                  <td className="px-5 py-3 text-slate-400 hidden sm:table-cell">{s.cues.length}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditing(s)} className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSlides;
