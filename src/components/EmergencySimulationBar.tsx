import React from 'react';

interface EmergencySimulationBarProps {
  onQuickSimulate: (scenario: 'cardiac' | 'pediatric' | 'trauma') => void;
  activeScreen: 'triage' | 'hud' | 'handoff';
  onChangeScreen: (screen: 'triage' | 'hud' | 'handoff') => void;
}

export const EmergencySimulationBar: React.FC<EmergencySimulationBarProps> = ({
  onQuickSimulate,
  activeScreen,
  onChangeScreen,
}) => {
  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Triage Screen Flow Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 shrink-0 mr-1">
            Clinical Flow:
          </span>
          <div className="inline-flex p-1 bg-slate-800/90 rounded-lg shrink-0 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onChangeScreen('triage')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeScreen === 'triage'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              1. Vernacular Triage Intake
            </button>
            <button
              type="button"
              onClick={() => onChangeScreen('hud')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeScreen === 'hud'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              2. ICU Radar & CPR HUD
            </button>
            <button
              type="button"
              onClick={() => onChangeScreen('handoff')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeScreen === 'handoff'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              3. EMT Trauma Ticket (FHIR)
            </button>
          </div>
        </div>

        {/* Right: Realistic Clinical Test Scenarios */}
        <div className="flex items-center gap-2 text-xs text-slate-300 overflow-x-auto shrink-0">
          <span className="font-mono text-slate-400 shrink-0">Live Clinical Cases:</span>
          <button
            type="button"
            onClick={() => onQuickSimulate('cardiac')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            Cardiac Arrest
          </button>
          <button
            type="button"
            onClick={() => onQuickSimulate('pediatric')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            Pediatric Seizure
          </button>
          <button
            type="button"
            onClick={() => onQuickSimulate('trauma')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            Trauma Bleed
          </button>
        </div>
      </div>
    </div>
  );
};
