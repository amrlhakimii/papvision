import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Microscope, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 gap-4">
      {/* Mobile menu */}
      {user && (
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 select-none shrink-0">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm">
          <Microscope size={17} className="text-white" />
        </div>
        <span className="text-base font-display font-bold text-slate-900 hidden sm:block">
          Pap<span className="text-brand-500">Vision</span>
        </span>
      </Link>

      {user && (
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-3.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.displayName?.charAt(0).toUpperCase() ?? 'S'}
            </div>
            <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
              {user.displayName ?? 'Student'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <LogOut size={15} />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      )}
    </header>
  );
};
