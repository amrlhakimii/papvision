import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, BrainCircuit, Target, LineChart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard',       path: '/',          icon: LayoutDashboard, end: true },
  { name: 'Learn',           path: '/learn',     icon: BookOpen },
  { name: 'Quiz',            path: '/quiz',      icon: BrainCircuit },
  { name: 'Challenge',       path: '/challenge', icon: Target },
  { name: 'My Progress',     path: '/progress',  icon: LineChart },
];

const NavItem: React.FC<{ item: typeof navItems[0]; onClick?: () => void }> = ({ item, onClick }) => (
  <NavLink
    to={item.path}
    end={item.end}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
        isActive
          ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <item.icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
        {item.name}
      </>
    )}
  </NavLink>
);

const SidebarContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="h-full w-60 flex flex-col bg-white border-r border-slate-200">
    <div className="px-4 pt-5 pb-2">
      <p className="section-label px-3">Menu</p>
    </div>
    <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
      {navItems.map(item => (
        <NavItem
          key={item.path}
          item={item}
          onClick={() => { if (window.innerWidth < 1024) onClose?.(); }}
        />
      ))}
    </nav>

    <div className="px-4 py-4 border-t border-slate-100">
      <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-4 text-white">
        <p className="text-sm font-semibold mb-1">Keep going!</p>
        <p className="text-xs text-brand-100 leading-relaxed">
          Complete quizzes to unlock advanced morphology modules.
        </p>
      </div>
    </div>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => (
  <>
    {/* Mobile overlay */}
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.22 }}
            className="fixed inset-y-0 left-0 z-50 lg:hidden"
          >
            <SidebarContent onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>

    {/* Desktop persistent */}
    <aside className="hidden lg:flex h-full flex-col">
      <SidebarContent />
    </aside>
  </>
);
