import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Microscope, Mail, Lock, User, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const friendlyError = (err: unknown): string => {
  const code = (err as { code?: string })?.code ?? '';
  const map: Record<string, string> = {
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/network-request-failed':  'Network error. Please check your connection.',
    'auth/configuration-not-found': 'Firebase is not configured yet. Use "Try Demo Mode" on the sign-in page.',
  };
  return map[code] ?? (err as Error)?.message ?? 'An unexpected error occurred. Please try again.';
};

interface PasswordRule {
  label: string;
  met: (pw: string) => boolean;
}

const rules: PasswordRule[] = [
  { label: 'At least 6 characters', met: pw => pw.length >= 6 },
  { label: 'Contains a number', met: pw => /\d/.test(pw) },
  { label: 'Contains uppercase letter', met: pw => /[A-Z]/.test(pw) },
];

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setIsLoading(true);
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-800 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <Microscope size={32} className="text-brand-200" />
          <span className="text-2xl font-display font-bold text-white tracking-tight">
            Pap<span className="text-brand-200">Vision</span>
          </span>
        </div>

        <div>
          <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
            Start your cytopathology journey today.
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed mb-8">
            Create a free account to access all learning modules, track your progress, and earn achievement badges.
          </p>
          <div className="space-y-3">
            {[
              'Free access to all 5 morphology categories',
              'Progress saved across all your sessions',
              '8 achievements to unlock',
              'Challenge mode with 3 game types',
            ].map(f => (
              <div key={f} className="flex items-center gap-3 text-brand-100 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-300 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-brand-300 text-xs">Join hundreds of cytopathology students already learning with PapVision.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md py-8"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Microscope size={28} className="text-brand-500" />
            <span className="text-xl font-display font-bold text-slate-900">
              Pap<span className="text-brand-500">Vision</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900">Create account</h2>
            <p className="text-slate-500 mt-1">It's free. No credit card required.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  className="pl-10 pr-4 w-full rounded-xl border border-slate-300 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="pl-10 pr-4 w-full rounded-xl border border-slate-300 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  placeholder="student@uitm.edu.my"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  className="pl-10 pr-10 w-full rounded-xl border border-slate-300 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password strength */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {rules.map(r => (
                    <div key={r.label} className={`flex items-center gap-2 text-xs ${r.met(password) ? 'text-green-600' : 'text-slate-400'}`}>
                      {r.met(password) ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      {r.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  className={`pl-10 pr-10 w-full rounded-xl border py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ${
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? 'border-green-400 focus:border-green-500'
                        : 'border-red-400 focus:border-red-500'
                      : 'border-slate-300 focus:border-brand-500'
                  }`}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <XCircle size={12} /> Passwords do not match
                </p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              disabled={isLoading || (confirmPassword.length > 0 && !passwordsMatch)}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
