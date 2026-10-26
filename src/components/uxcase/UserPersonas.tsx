import React, { useState } from 'react';
import { USER_PERSONAS } from '../../data/mockData';
import { User, Heart, ShieldAlert, ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const UserPersonas: React.FC = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('persona-1');

  const activePersona =
    USER_PERSONAS.find((p) => p.id === selectedPersonaId) || USER_PERSONAS[0];

  return (
    <div className="space-y-6">
      {/* 1. Double Diamond Design Process */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <span className="text-xs uppercase font-mono tracking-wider font-semibold text-rose-600 block mb-1">
          British Design Council Framework
        </span>
        <h2
          className="text-xl font-bold text-slate-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The Double Diamond UX Research Methodology
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl mb-4">
          How our 2-member team transformed chaotic rural emergency pain points into a cohesive, zero-friction medical interface.
        </p>

        {/* 4 Phases */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs font-mono font-bold text-rose-600 block mb-1">
              01. DISCOVER
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Empathy & Immersion</h4>
            <p className="text-xs text-slate-600">
              Interviews with 12 rural families in Kundgol & Hubli. Observed 6 ambulance admissions at KIMS Hospital.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs font-mono font-bold text-amber-600 block mb-1">
              02. DEFINE
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">How Might We (HMW)</h4>
            <p className="text-xs text-slate-600">
              HMW eliminate language barriers, English clinical jargon, and hospital ICU bed hunting in the first 15 minutes?
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs font-mono font-bold text-blue-600 block mb-1">
              03. DEVELOP
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Iterative Prototyping</h4>
            <p className="text-xs text-slate-600">
              Low-fidelity paper wireframes tested with elders. Refined to 64px tremor-safe touch targets & voice-first Kannada triage.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs font-mono font-bold text-emerald-600 block mb-1">
              04. DELIVER
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Production Design System</h4>
            <p className="text-xs text-slate-600">
              WCAG 2.2 AAA accessibility, 110 BPM CPR rhythm coach, and HL7 FHIR emergency trauma handoff tickets.
            </p>
          </div>
        </div>
      </div>

      {/* 2. User Personas Interactive Inspector */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Target User Personas & Empathy Profiles
            </h3>
            <p className="text-xs text-slate-500">
              Balancing rural patient panic with high-pressure clinical emergency workflows.
            </p>
          </div>

          {/* Persona Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedPersonaId('persona-1')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                selectedPersonaId === 'persona-1'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ramesh Gouda (Rural Patient)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPersonaId('persona-2')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                selectedPersonaId === 'persona-2'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dr. Priya Kulkarni (ER Registrar)
            </button>
          </div>
        </div>

        {/* Selected Persona Card */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-base">
                {activePersona.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{activePersona.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Age {activePersona.age}</span>
                  <span>·</span>
                  <span>{activePersona.role}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {activePersona.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono">
              <span className="text-slate-400 block">TECH LITERACY</span>
              <span className="font-bold text-slate-900">{activePersona.techLiteracy}</span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="p-3 bg-white rounded-lg border border-slate-200 text-xs italic text-slate-700">
            "{activePersona.quote}"
          </blockquote>

          {/* Pain Points vs Design Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-rose-50/60 rounded-lg border border-rose-200/80">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-rose-700 block mb-2">
                CRITICAL PAIN POINTS
              </span>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {activePersona.painPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200/80">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-700 block mb-2">
                SANJEEVANI UX SOLUTIONS
              </span>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {activePersona.designSolutions.map((sol, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Before vs After User Journey Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">
          User Journey Mapping: Golden Hour Comparison
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Legacy Journey */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2.5">
            <div className="flex items-center justify-between font-mono text-rose-800 font-bold">
              <span>LEGACY EMERGENCY JOURNEY</span>
              <span>47 MINS LOST</span>
            </div>
            <div className="space-y-2 text-slate-700">
              <div className="p-2 bg-white rounded border border-rose-200">
                1. Patient experiences chest pain; family panics trying to search English Google Maps.
              </div>
              <div className="p-2 bg-white rounded border border-rose-200">
                2. Travels to nearest clinic only to find no ventilator or ICU bed available.
              </div>
              <div className="p-2 bg-white rounded border border-rose-200">
                3. Bounced across 3 hospitals in transit; arrival paperwork consumes 20 minutes.
              </div>
            </div>
          </div>

          {/* Sanjeevani Journey */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2.5">
            <div className="flex items-center justify-between font-mono text-emerald-800 font-bold">
              <span>SANJEEVANI TRIAGE JOURNEY</span>
              <span>14 MINS TOTAL</span>
            </div>
            <div className="space-y-2 text-slate-700">
              <div className="p-2 bg-white rounded border border-emerald-200">
                1. One spoken Kannada sentence triggers instant ESI Level 1 priority triage.
              </div>
              <div className="p-2 bg-white rounded border border-emerald-200">
                2. 108 ambulance dispatched with direct GPS routing; audio-visual CPR coach guides family.
              </div>
              <div className="p-2 bg-white rounded border border-emerald-200">
                3. KIMS Cath Lab ventilator reserved; patient enters operating theater immediately upon arrival.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
