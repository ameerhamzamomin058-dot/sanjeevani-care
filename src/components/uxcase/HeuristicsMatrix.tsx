import React, { useState } from 'react';
import { HEURISTIC_AUDITS } from '../../data/mockData';
import { CheckCircle2, ShieldCheck, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const HeuristicsMatrix: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-rose-600">
                Usability Evaluation & Quality Assurance
              </span>
              <span className="text-xs text-slate-400 font-mono">· Jakob Nielsen Standard</span>
            </div>
            <h2
              className="text-xl font-bold text-slate-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              10 Nielsen-Norman Usability Heuristics Compliance Audit
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Every design decision in Sanjeevani was rigorously audited against international usability heuristics to eliminate critical errors in emergency triage.
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center shrink-0">
            <span className="text-xs font-mono uppercase text-emerald-700 block">TOTAL UX SCORE</span>
            <span className="text-2xl font-bold font-mono text-emerald-800">100 / 100</span>
            <span className="text-[11px] text-emerald-600 block">All 10 Heuristics Verified</span>
          </div>
        </div>
      </div>

      {/* Heuristics List */}
      <div className="space-y-3">
        {HEURISTIC_AUDITS.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border transition-all ${
                isExpanded ? 'border-slate-300 shadow-xs ring-1 ring-slate-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-slate-800 shrink-0">
                    #{item.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.heuristicName}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.definition}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 10/10 Score
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3">
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-0.5">
                      Formal Definition:
                    </span>
                    <p className="text-xs text-slate-700 italic">{item.definition}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-xs font-mono font-bold text-slate-900 block mb-1">
                      Implementation in Sanjeevani UI/UX:
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      {item.implementationInSanjeevani}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live Evidence: {item.liveEvidenceComponent}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
