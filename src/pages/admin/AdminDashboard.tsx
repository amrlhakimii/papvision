import React, { useEffect, useState } from 'react';
import { Users, BookOpen, BrainCircuit, Database, RefreshCw, Check, AlertCircle, ShieldCheck, X, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllUsers, getUserCount, seedCollection, getSlides, getQuestions } from '../../services/firestoreService';
import { learningSlides } from '../../data/learningData';
import { quizQuestions } from '../../data/quizData';
import { categories } from '../../data/categories';
import type { UserProfile } from '../../types/auth';
import type { SlideContent } from '../../types/learning';
import type { QuizQuestion } from '../../types/quiz';

interface Stats {
  userCount: number;
  recentUsers: UserProfile[];
}

interface Mismatch {
  id: string;
  type: 'slides' | 'questions';
  issue: string;
  detail?: string;
}

// Stringify with sorted keys so Firestore's alphabetical field order doesn't cause false mismatches
const stableStringify = (val: unknown): string => {
  if (Array.isArray(val)) return '[' + val.map(stableStringify).join(',') + ']';
  if (val !== null && typeof val === 'object') {
    const sorted = Object.keys(val as object).sort().map(
      k => `${JSON.stringify(k)}:${stableStringify((val as Record<string, unknown>)[k])}`
    );
    return '{' + sorted.join(',') + '}';
  }
  return JSON.stringify(val);
};

// Deep-compare two objects, return list of differing keys
const diffFields = (local: Record<string, unknown>, remote: Record<string, unknown>): string[] => {
  const keys = new Set([...Object.keys(local), ...Object.keys(remote)]);
  const diffs: string[] = [];
  keys.forEach(k => {
    if (stableStringify(local[k]) !== stableStringify(remote[k])) diffs.push(k);
  });
  return diffs;
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number | string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <div className={`inline-flex p-2.5 rounded-lg mb-3 ${color}`}>{icon}</div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 mt-0.5">{label}</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ userCount: 0, recentUsers: [] });
  const [loading, setLoading] = useState(true);

  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [verifying, setVerifying] = useState(false);
  const [mismatches, setMismatches] = useState<Mismatch[] | null>(null);
  const [showVerify, setShowVerify] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [count, users] = await Promise.all([getUserCount(), getAllUsers()]);
        setStats({ userCount: count, recentUsers: users.slice(0, 5) });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedStatus('idle');
    setMismatches(null);
    try {
      await Promise.all([
        seedCollection('slides', learningSlides),
        seedCollection('questions', quizQuestions),
        seedCollection('categories', categories),
      ]);
      setSeedStatus('success');
    } catch (e) {
      console.error(e);
      setSeedStatus('error');
    } finally {
      setSeeding(false);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setMismatches(null);
    setShowVerify(true);
    try {
      const [fsSlides, fsQuestions] = await Promise.all([getSlides(), getQuestions()]);
      const found: Mismatch[] = [];

      // ── Slides ──────────────────────────────────────────────────────────────
      const fsSlideMap = new Map(fsSlides.map(s => [s.id, s]));
      const localSlideMap = new Map(learningSlides.map(s => [s.id, s]));

      learningSlides.forEach(local => {
        const remote = fsSlideMap.get(local.id);
        if (!remote) {
          found.push({ id: local.id, type: 'slides', issue: 'Missing in Firestore', detail: local.title });
        } else {
          const diffs = diffFields(
            local as unknown as Record<string, unknown>,
            remote as unknown as Record<string, unknown>
          );
          if (diffs.length > 0) {
            found.push({ id: local.id, type: 'slides', issue: 'Field mismatch', detail: `${local.title} — fields: ${diffs.join(', ')}` });
          }
        }
      });

      fsSlides.forEach(remote => {
        if (!localSlideMap.has(remote.id)) {
          found.push({ id: remote.id, type: 'slides', issue: 'Extra in Firestore (not in code)', detail: remote.title });
        }
      });

      // ── Questions ────────────────────────────────────────────────────────────
      const fsQMap = new Map(fsQuestions.map(q => [q.id, q]));
      const localQMap = new Map(quizQuestions.map(q => [q.id, q]));

      quizQuestions.forEach(local => {
        const remote = fsQMap.get(local.id);
        if (!remote) {
          found.push({ id: local.id, type: 'questions', issue: 'Missing in Firestore', detail: local.question.slice(0, 60) });
        } else {
          const diffs = diffFields(
            local as unknown as Record<string, unknown>,
            remote as unknown as Record<string, unknown>
          );
          if (diffs.length > 0) {
            found.push({ id: local.id, type: 'questions', issue: 'Field mismatch', detail: `${local.question.slice(0, 50)}… — fields: ${diffs.join(', ')}` });
          }
        }
      });

      fsQuestions.forEach(remote => {
        if (!localQMap.has(remote.id)) {
          found.push({ id: remote.id, type: 'questions', issue: 'Extra in Firestore (not in code)', detail: remote.question.slice(0, 60) });
        }
      });

      setMismatches(found);
    } catch (e) {
      console.error(e);
      setMismatches([{ id: 'error', type: 'slides', issue: 'Verification failed — check console.', detail: String(e) }]);
    } finally {
      setVerifying(false);
    }
  };

  const allGood = mismatches !== null && mismatches.length === 0;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Overview of PapVision content and users.</p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Seed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white mb-1">Seed Firestore</p>
              <p className="text-xs text-slate-400 leading-relaxed">Push all slides, questions, and categories from code to Firestore. Safe to re-run — overwrites matching IDs.</p>
            </div>
            <Database size={18} className="text-slate-500 shrink-0 mt-0.5" />
          </div>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-lg text-sm font-semibold text-white transition-colors"
          >
            {seeding ? <RefreshCw size={14} className="animate-spin" /> : seedStatus === 'success' ? <Check size={14} /> : <Database size={14} />}
            {seeding ? 'Seeding...' : seedStatus === 'success' ? 'Seeded!' : seedStatus === 'error' ? 'Failed — retry?' : 'Seed Data'}
          </button>
        </div>

        {/* Verify */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white mb-1">Verify Data</p>
              <p className="text-xs text-slate-400 leading-relaxed">Compare every slide and question in Firestore against the hardcoded files. Reports missing items and field differences.</p>
            </div>
            <ShieldCheck size={18} className="text-slate-500 shrink-0 mt-0.5" />
          </div>
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg text-sm font-semibold text-white transition-colors"
          >
            {verifying ? <RefreshCw size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
            {verifying ? 'Checking...' : 'Verify Now'}
          </button>
        </div>
      </div>

      {/* Verify results */}
      {showVerify && mismatches !== null && (
        <div className={`rounded-xl border overflow-hidden ${allGood ? 'border-green-800 bg-green-950/30' : 'border-slate-800 bg-slate-900'}`}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-inherit">
            <div className="flex items-center gap-2">
              {allGood
                ? <><Check size={15} className="text-green-400" /><span className="text-sm font-semibold text-green-400">All data matches — Firestore is in sync</span></>
                : <><AlertCircle size={15} className="text-yellow-400" /><span className="text-sm font-semibold text-yellow-400">{mismatches.length} issue{mismatches.length !== 1 ? 's' : ''} found</span></>
              }
            </div>
            <button
              onClick={() => setShowVerify(false)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {!allGood && (
            <div className="divide-y divide-slate-800">
              {mismatches.map((m, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${
                    m.type === 'slides' ? 'bg-green-900/40 text-green-400' : 'bg-purple-900/40 text-purple-400'
                  }`}>
                    {m.type === 'slides' ? 'slide' : 'question'}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white">{m.issue}</p>
                    {m.detail && <p className="text-xs text-slate-400 mt-0.5 truncate">{m.detail}</p>}
                    <p className="text-xs text-slate-600 mt-0.5 font-mono">{m.id}</p>
                  </div>
                  {m.issue === 'Field mismatch' && (
                    <span className="ml-auto text-xs text-slate-500 shrink-0">Re-seed to fix</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {!allGood && (
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/50">
              <p className="text-xs text-slate-500">
                To fix mismatches — click <span className="text-white font-medium">Seed Data</span> above (safe to re-run, it overwrites by ID).
              </p>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={<Users size={18} className="text-blue-400" />}           label="Registered Users"  value={loading ? '—' : stats.userCount}       color="bg-blue-500/10" />
        <StatCard icon={<BookOpen size={18} className="text-green-400" />}       label="Learning Slides"   value={learningSlides.length}                  color="bg-green-500/10" />
        <StatCard icon={<BrainCircuit size={18} className="text-purple-400" />}  label="Quiz Questions"    value={quizQuestions.length}                   color="bg-purple-500/10" />
      </div>

      {/* Recent users */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white">Recent Users</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-slate-500 text-sm">Loading...</div>
        ) : stats.recentUsers.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-sm">No users yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400">Email</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400">Role</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentUsers.map(u => (
                <tr key={u.uid} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3 text-white">{u.displayName}</td>
                  <td className="px-5 py-3 text-slate-400">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === 'admin' ? 'bg-brand-900 text-brand-300' : 'bg-slate-800 text-slate-400'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
