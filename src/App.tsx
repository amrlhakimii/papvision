import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import Challenge from './pages/Challenge';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

import CueEditor from './pages/CueEditor';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminSlides from './pages/admin/AdminSlides';
import AdminUsers from './pages/admin/AdminUsers';

const App: React.FC = () => {
  return (
    <Routes>

      {/* ── Admin panel (fully isolated, checked first) ───────────────────── */}
      <Route
        path="/admin"
        element={<AdminRoute><AdminLayout /></AdminRoute>}
      >
        <Route index          element={<AdminDashboard />} />
        <Route path="slides"      element={<AdminSlides />} />
        <Route path="questions"   element={<AdminQuestions />} />
        <Route path="users"       element={<AdminUsers />} />
        <Route path="cue-editor"  element={<CueEditor />} />
      </Route>

      {/* ── Student / public app ──────────────────────────────────────────── */}
      <Route path="/" element={<AppLayout />}>
        <Route index         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="learn"     element={<ProtectedRoute><Learn /></ProtectedRoute>} />
        <Route path="quiz"      element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="challenge" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
        <Route path="progress"  element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="login"     element={<Login />} />
      </Route>

      {/* ── Global 404 (never catches /admin/* because admin is defined above) */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default App;
