import React, { useState, useEffect, useRef } from 'react';
import { HospitalFacility, PatientVitals, TriageUrgency } from '../../types';
import { REGIONAL_HOSPITALS } from '../../data/mockData';
import {
  Heart,
  Activity,
  Navigation,
  PhoneCall,
  Volume2,
  VolumeX,
  Play,
  Pause,
  AlertCircle,
  Clock,
  WifiOff,
  QrCode,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface EmergencyHudProps {
  urgency: TriageUrgency;
  vitals: PatientVitals;
  onOpenHandoffTicket: () => void;
  onResetToTriage: () => void;
}

export const EmergencyHud: React.FC<EmergencyHudProps> = ({
  urgency,
  vitals,
  onOpenHandoffTicket,
  onResetToTriage,
}) => {
  const [selectedHospital, setSelectedHospital] = useState<HospitalFacility>(REGIONAL_HOSPITALS[0]);
  const [isCprActive, setIsCprActive] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [cprBeat, setCprBeat] = useState<boolean>(false);
  const [compressionCount, setCompressionCount] = useState<number>(34);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(142);
  const [ambulanceEtaSeconds, setAmbulanceEtaSeconds] = useState<number>(510); // ~8.5 mins
  const [showOfflineSms, setShowOfflineSms] = useState<boolean>(false);

  // Audio Context Ref for CPR click
  const audioCtxRef = useRef<AudioContext | null>(null);

  // 110 BPM Metronome interval (~545ms per beat)
  useEffect(() => {
    let interval: any = null;
    if (isCprActive) {
      interval = setInterval(() => {
        setCprBeat((prev) => !prev);
        setCompressionCount((prev) => prev + 1);

        // Sound click if unmuted
        if (!isAudioMuted) {
          try {
            if (!audioCtxRef.current) {
              audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioCtxRef.current.state === 'suspended') {
              audioCtxRef.current.resume();
            }
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
            gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(audioCtxRef.current.destination);
            osc.start();
            osc.stop(audioCtxRef.current.currentTime + 0.08);
          } catch (e) {
            // Audio context restricted or muted
          }
        }
      }, 545);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCprActive, isAudioMuted]);

  // Elapsed Timer and ETA countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setAmbulanceEtaSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Emergency Status Bar */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-5 text-white shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shrink-0 animate-pulse">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-rose-400">
                  {urgency === 'CRITICAL_RESUSCITATE'
                    ? 'Code Red: ALS Resuscitation Active'
                    : 'Code Yellow: Trauma Grid Active'}
                </span>
                <span className="text-xs text-slate-400 font-mono">· Hubballi Central EMS</span>
              </div>
              <h2
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                108 Emergency Response En Route to Patient
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[10px]">TIME SINCE DISPATCH</span>
              <span className="text-sm font-bold text-white tabular-nums">
                T+{formatTime(elapsedSeconds)}
              </span>
            </div>
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[10px]">AMBULANCE ETA</span>
              <span className="text-sm font-bold text-emerald-400 tabular-nums">
                {formatTime(ambulanceEtaSeconds)} MIN
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenHandoffTicket}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <QrCode className="w-4 h-4" />
              <span>EMT Handoff Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Left (CPR Metronome & Vitals) | Right (Hospital ICU Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 6 Cols - Resuscitation Rhythm Coach */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-rose-600">
                  AHA Guidelines · 100-120 BPM
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Audio-Visual CPR Compression Coach
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isAudioMuted
                      ? 'border-slate-200 text-slate-500 hover:bg-slate-100'
                      : 'border-rose-300 bg-rose-50 text-rose-700'
                  }`}
                  title={isAudioMuted ? 'Unmute Audio Beat' : 'Mute Audio Beat'}
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCprActive(!isCprActive)}
                  className="p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs cursor-pointer transition-colors"
                >
                  {isCprActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Metronome Pulse Visual Target */}
            <div className="p-6 bg-slate-950 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div
                className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-100 ${
                  cprBeat
                    ? 'border-rose-500 bg-rose-600/30 scale-105 shadow-lg shadow-rose-900/50'
                    : 'border-slate-700 bg-slate-900/60 scale-100'
                }`}
              >
                <Heart
                  className={`w-12 h-12 transition-transform duration-75 ${
                    cprBeat ? 'text-rose-400 scale-125' : 'text-slate-500 scale-100'
                  }`}
                />
                <span className="text-xs font-mono font-bold text-white mt-1">PUSH HARD</span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-6 text-slate-300 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">TARGET CADENCE</span>
                  <span className="text-base font-bold text-white">110 BPM</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-slate-500 block text-[10px]">COMPRESSIONS GIVEN</span>
                  <span className="text-base font-bold text-rose-400 tabular-nums">
                    {compressionCount}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400 max-w-sm">
                Place heel of hand on center of sternum. Depress 2 inches (5cm) deep. Allow complete chest recoil between pumps.
              </p>
            </div>

            {/* 3 Visual Step Guidance Cards */}
            <div className="grid grid-cols-3 gap-2.5 mt-4">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-900 block mb-0.5">1. Center</span>
                <span className="text-[11px] text-slate-500 leading-tight block">
                  Interlock fingers at center of sternum
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-900 block mb-0.5">2. 2 Inches</span>
                <span className="text-[11px] text-slate-500 leading-tight block">
                  Compress firmly with straight locked elbows
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-900 block mb-0.5">3. Recoil</span>
                <span className="text-[11px] text-slate-500 leading-tight block">
                  Let chest return fully up between beats
                </span>
              </div>
            </div>
          </div>

          {/* Patient Vitals Stream (Tabular Numerals) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Pre-Hospital Telemetry Vitals
              </h4>
              <span className="text-xs text-emerald-700 font-mono font-medium inline-flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Sensor Connected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">HEART RATE</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {vitals.heartRate}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">BPM</span>
                </div>
                <span className="text-[10px] text-rose-600 font-medium block mt-0.5">Tachycardic</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">SPO2 OXYGEN</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {vitals.spo2}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">%</span>
                </div>
                <span className="text-[10px] text-rose-600 font-medium block mt-0.5">Low Oxygen</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">BLOOD PRESS.</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {vitals.bloodPressureSystolic}/{vitals.bloodPressureDiastolic}
                  </span>
                </div>
                <span className="text-[10px] text-amber-600 font-medium block mt-0.5">Elevated</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">RESPIRATION</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {vitals.respiratoryRate}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">/min</span>
                </div>
                <span className="text-[10px] text-amber-600 font-medium block mt-0.5">Tachypneic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 6 Cols - Hospital ICU Radar & Bed Allocation */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-700">
                  Live Regional ICU Radar
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Pre-Allocated Emergency Hospital Bed
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">Radius: 15km Hubballi</span>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Real-time ICU and ventilator sync prevents the fatal transit ping-pong where ambulances arrive at hospitals with no open beds.
            </p>

            {/* List of 4 verified regional hospitals */}
            <div className="space-y-3">
              {REGIONAL_HOSPITALS.map((hosp) => {
                const isSelected = selectedHospital.id === hosp.id;
                return (
                  <div
                    key={hosp.id}
                    onClick={() => setSelectedHospital(hosp)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900">{hosp.name}</h4>
                          {isSelected && (
                            <span className="text-[10px] bg-emerald-600 text-white font-mono px-1.5 py-0.5 rounded font-semibold">
                              RESERVED
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 block mt-0.5">{hosp.address}</span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-slate-900 font-mono block">
                          {hosp.travelTimeMinutes} min
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{hosp.distanceKm} km</span>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-700 font-semibold">
                          ICU Beds: {hosp.icuBedsAvailable}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-blue-700 font-semibold">
                          Vents: {hosp.ventilatorsAvailable}
                        </span>
                        {hosp.hasCathLab && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-purple-700">Cath Lab OK</span>
                          </>
                        )}
                      </div>

                      <a
                        href={`tel:${hosp.contactPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-sans font-medium"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Direct Line
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rural Offline-First USSD / SMS Fallback Feature */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-semibold text-slate-900">
                  Rural Offline-First USSD Mesh Fallback
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowOfflineSms(!showOfflineSms)}
                className="text-xs text-amber-700 hover:underline font-mono cursor-pointer"
              >
                {showOfflineSms ? 'Hide Payload' : 'Inspect 140b Payload'}
              </button>
            </div>
            <p className="text-xs text-slate-600">
              When 4G cellular drops in remote taluks, Sanjeevani compiles vital triage markers into a 138-byte compressed SMS packet sent to the national 108 emergency tower.
            </p>

            {showOfflineSms && (
              <div className="mt-3 p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto">
                <div className="text-slate-400 mb-1">// Compressed Binary SMS Payload:</div>
                <code>
                  SNJ-TRG#L1|HR:118|SP:91|BP:154/98|P:9|LOC:15.3647,75.1240|HOSP:KIMS|AUTH:SHA256:7f8e3a2b
                </code>
                <div className="mt-2 text-slate-400 text-[11px]">
                  Delivered over 2G GSM cellular signaling channel without requiring mobile internet.
                </div>
              </div>
            )}
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onResetToTriage}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              &larr; Back to Symptom Intake
            </button>
            <button
              type="button"
              onClick={onOpenHandoffTicket}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer transition-colors shadow-xs"
            >
              View Paramedic FHIR Handoff &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
