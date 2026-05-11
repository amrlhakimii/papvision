import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BrainCircuit, Users, LogOut, Microscope, Menu, Crosshair } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { path: '/admin',              label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { path: '/admin/slides',       label: 'Slides',     icon: BookOpen },
  { path: '/admin/questions',    label: 'Questions',  icon: BrainCircuit },
  { path: '/admin/users',        label: 'Users',      icon: Users },
  { path: '/admin/cue-editor',   label: 'Cue Editor', icon: Crosshair },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => { await logout(); navigate('/login'); };

  const sidebar = (
    <div className="h-full w-60 flex flex-col bg-[#0F172A] border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/5 shrink-0">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
          <Microscope size={17} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-display font-bold text-white leading-none">PapVision</p>
          <p className="text-xs text-slate-500 mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 pt-4 pb-2">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Management</p>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/5 shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl mb-1">
          <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.displayName?.charAt(0).toUpperCase() ?? 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.displayName}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-[#0B1120] text-white overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-full flex-col shrink-0">{sidebar}</aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative z-10 h-full shrink-0">{sidebar}</aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden h-16 flex items-center gap-3 px-4 bg-[#0F172A] border-b border-white/5 shrink-0">
          <button onClick={() => setOpen(true)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
              <Microscope size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-sm">PapVision Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
