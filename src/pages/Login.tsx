import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Microscope, GraduationCap, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

type LoginMode = 'student' | 'admin';

const Login: React.FC = () => {
  const [mode, setMode] = useState<LoginMode>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      const profile = await loginWithGoogle();
      if (mode === 'admin') {
        if (profile.role !== 'admin') {
          setError('Your account does not have admin access. Contact the administrator.');
          setIsLoading(false);
          return;
        }
        navigate('/admin', { replace: true });
      } else {
        navigate(from === '/admin' ? '/' : from, { replace: true });
      }
    } catch (err) {
      const code = (err as { code?: string })?.code ?? '';
      if (code !== 'auth/popup-closed-by-user') {
        setError('Sign-in failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-800 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <Microscope size={32} className="text-brand-200" />
          <span className="text-2xl font-display font-bold text-white tracking-tight">
            Pap<span className="text-brand-200">Vision</span>
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Master cytopathology.<br />One slide at a time.
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed mb-8">
            Interactive Pap smear education with annotated images, diagnostic quizzes, and competency tracking for medical students.
          </p>
          <div className="space-y-3">
            {[
              '23 annotated cytology slides across 5 categories',
              'Interactive morphology cue markers',
              'Timed, rapid & randomised challenge modes',
              'Real-time progress & achievement tracking',
            ].map(f => (
              <div key={f} className="flex items-center gap-3 text-brand-100 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-300 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="text-brand-300 text-xs">For cytopathology students, MLT students & pathology trainees.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-50">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <div className="bg-brand-500 p-2 rounded-xl">
              <Microscope size={26} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-900">
              Pap<span className="text-brand-500">Vision</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900">Welcome</h2>
            <p className="text-slate-500 mt-1">Choose how you're signing in.</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => { setMode('student'); setError(''); }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                mode === 'student'
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <GraduationCap size={26} className={mode === 'student' ? 'text-brand-500' : 'text-slate-400'} />
              <div className="text-center">
                <p className="font-semibold text-sm">Student</p>
                <p className="text-xs opacity-70 mt-0.5">Learning portal</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => { setMode('admin'); setError(''); }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                mode === 'admin'
                  ? 'border-slate-800 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <ShieldCheck size={26} className={mode === 'admin' ? 'text-slate-300' : 'text-slate-400'} />
              <div className="text-center">
                <p className="font-semibold text-sm">Admin</p>
                <p className="text-xs opacity-70 mt-0.5">Management panel</p>
              </div>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${
              mode === 'admin'
                ? 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {isLoading ? 'Signing in...' : `Continue as ${mode === 'admin' ? 'Admin' : 'Student'}`}
          </button>

          <p className="mt-5 text-center text-xs text-slate-400 leading-relaxed">
            {mode === 'admin'
              ? 'Admin access requires an authorised Google account.'
              : 'Sign in to track your progress across devices.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
