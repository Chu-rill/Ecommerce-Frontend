import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-color)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)',
          },
          className: '!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white !border-gray-200 dark:!border-gray-700',
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;