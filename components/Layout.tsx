
import React from 'react';
import { ActivePage } from '../types';
import { NAV_ITEMS, APP_NAME } from '../constants';

interface LayoutProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  children: React.ReactNode;
  showAddButton?: boolean;
  onAddButtonClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ activePage, onNavigate, children, showAddButton, onAddButtonClick }) => {
  const currentPageInfo = NAV_ITEMS.find(item => item.page === activePage);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header - Simple for now, can be enhanced */}
      <header className="bg-yellow-400 dark:bg-yellow-600 text-black shadow-md sticky top-0 z-20 ios-safe-area-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center relative">
          <h1 className="text-xl font-bold">{currentPageInfo?.label || APP_NAME}</h1>
          {/* Add button can be here or floating */}
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow overflow-y-auto">
        {/*
          The padding-bottom for the main content should be equal to the height of the bottom navigation bar
          plus any safe area inset at the bottom. The bottom nav height is h-16 (4rem).
        */}
        <div className="pb-16 md:pb-0 ios-safe-area-bottom"> {/* md:pb-0 for desktop where nav might be sidebar or not fixed bottom */}
             {children}
        </div>
      </main>

      {/* Floating Action Button for adding transaction - only on Home page */}
      {activePage === ActivePage.Home && showAddButton && onAddButtonClick && (
        <button
          onClick={onAddButtonClick}
          className="fixed bottom-20 right-5 z-30 bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Add new transaction"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-top z-20 flex justify-around items-center ios-safe-area-bottom md:hidden">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors w-1/3 h-full
                        ${activePage === item.page 
                            ? 'text-yellow-500 dark:text-yellow-400' 
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            aria-current={activePage === item.page ? "page" : undefined}
          >
            <item.icon className={`w-6 h-6 mb-0.5 ${activePage === item.page ? '' : ''}`} />
            <span className={`text-xs font-medium ${activePage === item.page ? '' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};
