import React, { useEffect, useState } from 'react';
import { Search, Shield, User, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { getAllUsers, getUserProgress, setUserRole } from '../../services/firestoreService';
import type { UserProfile } from '../../types/auth';
import type { UserProgress } from '../../types/progress';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedUid, setExpandedUid] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress | null>>({});
  const [loadingProgress, setLoadingProgress] = useState<string | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try { setUsers(await getAllUsers()); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const toggleExpand = async (uid: string) => {
    if (expandedUid === uid) { setExpandedUid(null); return; }
    setExpandedUid(uid);
    if (progressMap[uid] === undefined) {
      setLoadingProgress(uid);
      try {
        const p = await getUserProgress(uid);
        setProgressMap(prev => ({ ...prev, [uid]: p }));
      } finally {
        setLoadingProgress(null);
      }
    }
  };

  const handleRoleToggle = async (user: UserProfile) => {
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    if (!confirm(`Set ${user.displayName} as ${newRole}?`)) return;
    setUpdatingRole(user.uid);
    try {
      await setUserRole(user.uid, newRole);
      setUsers(prev => prev.map(u => u.uid === user.uid ? { ...u, role: newRole } : u));
    } finally {
      setUpdatingRole(null);
    }
  };

  const filtered = users.filter(u =>
    u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-slate-400 text-sm mt-1">{users.length} registered users</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading users...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No users found.</div>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {filtered.map(u => {
              const isExpanded = expandedUid === u.uid;
              const progress = progressMap[u.uid];

              return (
                <div key={u.uid}>
                  <div className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {u.displayName?.charAt(0).toUpperCase() ?? '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{u.displayName}</p>
                      <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    </div>
                    <span className={`hidden sm:block text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${u.role === 'admin' ? 'bg-brand-900 text-brand-300' : 'bg-slate-800 text-slate-400'}`}>
                      {u.role}
                    </span>
                    <p className="hidden md:block text-xs text-slate-500 shrink-0">{new Date(u.createdAt).toLocaleDateString()}</p>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleRoleToggle(u)}
                        disabled={updatingRole === u.uid}
                        title={u.role === 'admin' ? 'Remove admin' : 'Make admin'}
                        className={`p-1.5 rounded-lg transition-colors ${u.role === 'admin' ? 'text-brand-400 hover:bg-brand-900/30' : 'text-slate-500 hover:text-brand-400 hover:bg-slate-800'}`}
                      >
                        <Shield size={14} />
                      </button>
                      <button onClick={() => toggleExpand(u.uid)} className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-4 bg-slate-950/50">
                      {loadingProgress === u.uid ? (
                        <p className="text-xs text-slate-500 py-2">Loading progress...</p>
                      ) : !progress ? (
                        <p className="text-xs text-slate-500 py-2">No progress data yet.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
                          {Object.values(progress.categories).map(cat => {
                            const pct = cat.totalSlides > 0 ? Math.round(cat.completedSlides.length / cat.totalSlides * 100) : 0;
                            return (
                              <div key={cat.categoryId} className="bg-slate-800 rounded-lg p-3">
                                <p className="text-xs font-medium text-slate-300 capitalize mb-2">{cat.categoryId}</p>
                                <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
                                  <div className="bg-brand-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                </div>
                                <p className="text-xs text-slate-400">{cat.completedSlides.length}/{cat.totalSlides} slides</p>
                                <p className="text-xs text-slate-400">Best quiz: {cat.highestQuizScore}%</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span>XP: <span className="text-white font-medium">{progress?.totalXp ?? 0}</span></span>
                        <span>Achievements: <span className="text-white font-medium">{progress?.achievements.length ?? 0}</span></span>
                        {progress?.lastActive && <span>Last active: <span className="text-white font-medium">{new Date(progress.lastActive).toLocaleDateString()}</span></span>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
