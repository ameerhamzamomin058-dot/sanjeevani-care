import React from 'react';

interface TopBarProps {
  activeTab: 'prototype' | 'ux-case' | 'heuristics';
  onSelectTab: (tab: 'prototype' | 'ux-case' | 'heuristics') => void;
  onLaunchPitch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onLaunchPitch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('prototype');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-800 transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Sanjeevani
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onSelectTab('prototype')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'prototype'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-rose-600'
                : 'hover:text-slate-900'
            }`}
          >
            Emergency Triage Prototype
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('ux-case')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'ux-case'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-rose-600'
                : 'hover:text-slate-900'
            }`}
          >
            UX Research & Design System
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('heuristics')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'heuristics'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-rose-600'
                : 'hover:text-slate-900'
            }`}
          >
            Nielsen Heuristics (10/10)
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onLaunchPitch}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Launch Jury Pitch Deck
          </button>
        </div>
      </div>
    </header>
  );
};
