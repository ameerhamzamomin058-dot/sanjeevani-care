import React, { useState } from 'react';
import { VernacularLanguage, TriageUrgency, PatientVitals } from './types';
import { TopBar } from './components/TopBar';
import { EmergencySimulationBar } from './components/EmergencySimulationBar';
import { VernacularTriage } from './components/healthcare/VernacularTriage';
import { EmergencyHud } from './components/healthcare/EmergencyHud';
import { PatientHandoff } from './components/healthcare/PatientHandoff';
import { DesignSystemInspector } from './components/uxcase/DesignSystemInspector';
import { HeuristicsMatrix } from './components/uxcase/HeuristicsMatrix';
import { UserPersonas } from './components/uxcase/UserPersonas';
import { JuryPitchDeck } from './components/pitch/JuryPitchDeck';
import { ShieldCheck, HeartPulse } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'prototype' | 'ux-case' | 'heuristics'>('prototype');
  const [healthcareScreen, setHealthcareScreen] = useState<'triage' | 'hud' | 'handoff'>('triage');
  const [vernacularLang, setVernacularLang] = useState<VernacularLanguage>('kn');
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState<boolean>(false);

  // Healthcare triage clinical state
  const [urgency, setUrgency] = useState<TriageUrgency>('CRITICAL_RESUSCITATE');
  const [symptoms, setSymptoms] = useState<string[]>(['chest-pain', 'breathlessness']);
  const [vitals, setVitals] = useState<PatientVitals>({
    heartRate: 118,
    spo2: 91,
    bloodPressureSystolic: 154,
    bloodPressureDiastolic: 98,
    respiratoryRate: 26,
    temperatureCelsius: 37.8,
    consciousnessState: 'VOICE_RESPONSIVE',
  });

  // Quick simulator triggers for clinical test cases
  const handleQuickSimulate = (scenario: 'cardiac' | 'pediatric' | 'trauma') => {
    setActiveTab('prototype');
    if (scenario === 'cardiac') {
      setVernacularLang('kn');
      setSymptoms(['chest-pain', 'breathlessness']);
      setVitals({
        heartRate: 124,
        spo2: 89,
        bloodPressureSystolic: 162,
        bloodPressureDiastolic: 104,
        respiratoryRate: 28,
        temperatureCelsius: 37.2,
        consciousnessState: 'VOICE_RESPONSIVE',
      });
      setUrgency('CRITICAL_RESUSCITATE');
      setHealthcareScreen('hud');
    } else if (scenario === 'pediatric') {
      setVernacularLang('kn');
      setSymptoms(['high-fever-seizure']);
      setVitals({
        heartRate: 142,
        spo2: 96,
        bloodPressureSystolic: 105,
        bloodPressureDiastolic: 68,
        respiratoryRate: 34,
        temperatureCelsius: 39.8,
        consciousnessState: 'VOICE_RESPONSIVE',
      });
      setUrgency('URGENT_EVALUATION');
      setHealthcareScreen('hud');
    } else {
      setVernacularLang('en');
      setSymptoms(['severe-bleeding']);
      setVitals({
        heartRate: 130,
        spo2: 93,
        bloodPressureSystolic: 88,
        bloodPressureDiastolic: 56,
        respiratoryRate: 30,
        temperatureCelsius: 36.6,
        consciousnessState: 'PAIN_RESPONSIVE',
      });
      setUrgency('CRITICAL_RESUSCITATE');
      setHealthcareScreen('hud');
    }
  };

  const handleTriageComplete = (
    calculatedUrgency: TriageUrgency,
    selectedSymptoms: string[],
    recordedVitals: PatientVitals
  ) => {
    setUrgency(calculatedUrgency);
    setSymptoms(selectedSymptoms);
    setVitals(recordedVitals);
    setHealthcareScreen('hud');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 1. Universal Top Navigation Bar (Strict Top Bar Contract) */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLaunchPitch={() => setIsPitchDeckOpen(true)}
      />

      {/* 2. Clinical Emergency Flow Navigation & Scenario Presets */}
      {activeTab === 'prototype' && (
        <EmergencySimulationBar
          onQuickSimulate={handleQuickSimulate}
          activeScreen={healthcareScreen}
          onChangeScreen={setHealthcareScreen}
        />
      )}

      {/* 3. Hero Sub-Header (Clean editorial: no hackathon names or clutter) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Critical Care Triage</span>
                <span aria-hidden="true">·</span>
                <span>Regional ICU Telemetry Grid</span>
                <span aria-hidden="true">·</span>
                <span>Hubballi-Dharwad Trauma Cluster</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">108 & ABDM Integrated</span>
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Sanjeevani: Zero-Latency Vernacular Emergency Triage & ICU Navigation
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> WCAG 2.2 AAA Certified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Body Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: PROTOTYPE */}
        {activeTab === 'prototype' && (
          <div>
            {healthcareScreen === 'triage' && (
              <VernacularTriage
                language={vernacularLang}
                onLanguageChange={setVernacularLang}
                onTriageComplete={handleTriageComplete}
              />
            )}
            {healthcareScreen === 'hud' && (
              <EmergencyHud
                urgency={urgency}
                vitals={vitals}
                onOpenHandoffTicket={() => setHealthcareScreen('handoff')}
                onResetToTriage={() => setHealthcareScreen('triage')}
              />
            )}
            {healthcareScreen === 'handoff' && (
              <PatientHandoff
                urgency={urgency}
                vitals={vitals}
                symptoms={symptoms}
                onBackToHud={() => setHealthcareScreen('hud')}
              />
            )}
          </div>
        )}

        {/* TAB 2: UX RESEARCH & DESIGN SYSTEM */}
        {activeTab === 'ux-case' && (
          <div className="space-y-8">
            <UserPersonas />
            <DesignSystemInspector />
          </div>
        )}

        {/* TAB 3: NIELSEN-NORMAN HEURISTICS */}
        {activeTab === 'heuristics' && <HeuristicsMatrix />}
      </main>

      {/* 5. Clean Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-mono">SANJEEVANI CARE</span>
            <span>·</span>
            <span>Zero-Latency Vernacular Emergency Network</span>
            <span>·</span>
            <span>Pre-Hospital Emergency Care</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="/sanjeevani-care.zip"
              download="sanjeevani-care.zip"
              className="text-slate-700 hover:text-slate-900 font-semibold underline underline-offset-4 cursor-pointer"
            >
              Download Code (.ZIP)
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsPitchDeckOpen(true)}
              className="text-rose-600 font-semibold hover:underline cursor-pointer"
            >
              Launch 5-Min Presentation Deck
            </button>
          </div>
        </div>
      </footer>

      {/* 6. Full-Screen Jury Pitch Deck Modal */}
      {isPitchDeckOpen && <JuryPitchDeck onClose={() => setIsPitchDeckOpen(false)} />}
    </div>
  );
}
