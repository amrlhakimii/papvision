import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // Auth pages are full-screen — render with no chrome
  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="h-screen bg-surface-50 flex flex-col font-sans overflow-hidden">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
