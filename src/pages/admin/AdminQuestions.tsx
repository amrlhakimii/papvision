import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Save, AlertCircle } from 'lucide-react';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { getQuestions, saveQuestion, deleteQuestion } from '../../services/firestoreService';
import type { QuizQuestion, DifficultyLevel } from '../../types/quiz';
import type { CategoryId } from '../../types/learning';
import { categories } from '../../data/categories';

const EMPTY: Omit<QuizQuestion, 'id'> = {
  categoryId: 'normal',
  difficulty: 'beginner',
  imageUrl: '',
  question: '',
  options: ['', '', '', ''],
  correctAnswer: '',
  explanation: '',
  keyFeatures: [''],
  clinicalRelevance: '',
  hints: [''],
};

const generateId = () => `q-${Date.now()}`;

const QuestionForm: React.FC<{
  initial: QuizQuestion | null;
  onSave: (q: QuizQuestion) => Promise<void>;
  onCancel: () => void;
}> = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState<QuizQuestion>(
    initial ?? { id: generateId(), ...EMPTY }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof QuizQuestion, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const setOption = (i: number, val: string) => {
    const opts = [...form.options];
    opts[i] = val;
    setForm(prev => ({ ...prev, options: opts }));
  };

  const setListItem = (field: 'keyFeatures' | 'hints', i: number, val: string) => {
    const arr = [...form[field]];
    arr[i] = val;
    setForm(prev => ({ ...prev, [field]: arr }));
  };

  const addListItem = (field: 'keyFeatures' | 'hints') =>
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));

  const removeListItem = (field: 'keyFeatures' | 'hints', i: number) =>
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.correctAnswer.trim()) {
      setError('Question and correct answer are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } catch {
      setError('Failed to save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500";
  const labelCls = "block text-xs font-medium text-slate-400 mb-1.5";

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
          <label className={labelCls}>Difficulty</label>
          <select value={form.difficulty} onChange={e => set('difficulty', e.target.value as DifficultyLevel)} className={inputCls}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Image</label>
        <ImageUploader
          currentUrl={form.imageUrl}
          folder="questions"
          onUploaded={url => set('imageUrl', url)}
        />
      </div>

      <div>
        <label className={labelCls}>Question</label>
        <textarea value={form.question} onChange={e => set('question', e.target.value)} rows={3} className={inputCls} placeholder="What is the most likely diagnosis?" />
      </div>

      <div>
        <label className={labelCls}>Options (4 choices)</label>
        <div className="space-y-2">
          {form.options.map((opt, i) => (
            <input key={i} value={opt} onChange={e => setOption(i, e.target.value)} placeholder={`Option ${i + 1}`} className={inputCls} />
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Correct Answer (must match one option exactly)</label>
        <input value={form.correctAnswer} onChange={e => set('correctAnswer', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Explanation</label>
        <textarea value={form.explanation} onChange={e => set('explanation', e.target.value)} rows={3} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Clinical Relevance</label>
        <textarea value={form.clinicalRelevance} onChange={e => set('clinicalRelevance', e.target.value)} rows={2} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Key Features</label>
        {form.keyFeatures.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={f} onChange={e => setListItem('keyFeatures', i, e.target.value)} className={`${inputCls} flex-1`} placeholder={`Feature ${i + 1}`} />
            <button type="button" onClick={() => removeListItem('keyFeatures', i)} className="text-slate-500 hover:text-red-400"><X size={16} /></button>
          </div>
        ))}
        <button type="button" onClick={() => addListItem('keyFeatures')} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"><Plus size={13} /> Add feature</button>
      </div>

      <div>
        <label className={labelCls}>Hints</label>
        {form.hints.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={h} onChange={e => setListItem('hints', i, e.target.value)} className={`${inputCls} flex-1`} placeholder={`Hint ${i + 1}`} />
            <button type="button" onClick={() => removeListItem('hints', i)} className="text-slate-500 hover:text-red-400"><X size={16} /></button>
          </div>
        ))}
        <button type="button" onClick={() => addListItem('hints')} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"><Plus size={13} /> Add hint</button>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-lg text-sm font-semibold text-white transition-colors">
          <Save size={14} />{saving ? 'Saving...' : 'Save Question'}
        </button>
      </div>
    </form>
  );
};

const AdminQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<CategoryId | 'all'>('all');
  const [editing, setEditing] = useState<QuizQuestion | null | 'new'>(null);

  const load = async () => {
    setLoading(true);
    try { setQuestions(await getQuestions()); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (q: QuizQuestion) => {
    await saveQuestion(q);
    await load();
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this question?')) return;
    await deleteQuestion(id);
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const filtered = questions.filter(q =>
    (filterCat === 'all' || q.categoryId === filterCat) &&
    (q.question.toLowerCase().includes(search.toLowerCase()))
  );

  const diffColor = (d: string) =>
    d === 'beginner' ? 'text-green-400 bg-green-900/30' :
    d === 'intermediate' ? 'text-yellow-400 bg-yellow-900/30' : 'text-red-400 bg-red-900/30';

  if (editing !== null) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">{editing === 'new' ? 'New Question' : 'Edit Question'}</h1>
          <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <QuestionForm
            initial={editing === 'new' ? null : editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Questions</h1>
          <p className="text-slate-400 text-sm mt-1">{questions.length} total questions</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 rounded-lg text-sm font-semibold text-white transition-colors"
        >
          <Plus size={16} /> Add Question
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value as CategoryId | 'all')}
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No questions found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400">Question</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 hidden sm:table-cell">Difficulty</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3 text-slate-300 max-w-sm truncate">{q.question}</td>
                  <td className="px-5 py-3 text-slate-400 hidden md:table-cell capitalize">{q.categoryId}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffColor(q.difficulty)}`}>{q.difficulty}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditing(q)} className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(q.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 size={14} /></button>
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

export default AdminQuestions;
