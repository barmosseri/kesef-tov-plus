
import React from 'react';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
