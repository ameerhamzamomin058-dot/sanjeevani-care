import React, { useState } from 'react';
import { PatientVitals, TriageUrgency } from '../../types';
import { REGIONAL_HOSPITALS } from '../../data/mockData';
import {
  QrCode,
  FileCheck,
  Copy,
  Check,
  Clock,
  Heart,
  Activity,
  ShieldCheck,
  Hospital,
  User,
  ArrowLeft,
} from 'lucide-react';

interface PatientHandoffProps {
  urgency: TriageUrgency;
  vitals: PatientVitals;
  symptoms: string[];
  onBackToHud: () => void;
}

export const PatientHandoff: React.FC<PatientHandoffProps> = ({
  urgency,
  vitals,
  symptoms,
  onBackToHud,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const receivingHospital = REGIONAL_HOSPITALS[0]; // KIMS Hubli

  const fhirPayload = {
    resourceType: 'EmergencyTriageRecord',
    triageId: 'SNJ-2026-KA-0941',
    timestamp: new Date().toISOString(),
    urgencyTier: urgency,
    chiefComplaints: symptoms,
    vitalsRecorded: vitals,
    receivingFacility: {
      name: receivingHospital.name,
      allocatedBedType: 'ICU_VENTILATOR_PRIORITY',
      cathLabStandby: receivingHospital.hasCathLab,
    },
    preHospitalIntervention: 'Active CPR @ 110 BPM initiated pre-arrival',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(fhirPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHud}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Emergency HUD
        </button>

        <span className="text-xs font-mono text-slate-500">
          HL7 FHIR v4.3 Protocol Compliant
        </span>
      </div>

      {/* Main Handoff Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Ticket Header */}
        <div className="bg-slate-900 text-white p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-rose-400">
                  PRE-ARRIVAL DIGITAL TRAUMA TICKET
                </span>
                <span className="text-xs text-slate-400 font-mono">· ID #SNJ-2026-KA-0941</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Emergency Medical Technician (EMT) Handoff
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied FHIR JSON' : 'Copy Clinical Data'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Top Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5" /> ONSET DURATION
              </div>
              <span className="text-xl font-bold font-mono text-slate-900">00:14:22</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Golden Hour intact</span>
            </div>

            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-700 mb-1">
                <Activity className="w-3.5 h-3.5" /> TRIAGE INDEX
              </div>
              <span className="text-xl font-bold font-mono text-rose-700">ESI LEVEL 1</span>
              <span className="text-[11px] text-rose-600 block mt-0.5">Immediate Resuscitation</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <Hospital className="w-3.5 h-3.5" /> RECEIVING CENTER
              </div>
              <span className="text-sm font-bold text-slate-900 block truncate">
                {receivingHospital.name}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                Ventilator Bed #04 Reserved
              </span>
            </div>
          </div>

          {/* QR Code and Clinical Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Clean QR Canvas */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="w-40 h-40 bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-center relative">
                {/* SVG Mock QR Code */}
                <svg
                  className="w-full h-full text-slate-900"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <rect x="5" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="13" y="13" width="10" height="10" />
                  <rect x="69" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="77" y="13" width="10" height="10" />
                  <rect x="5" y="69" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="13" y="77" width="10" height="10" />
                  {/* Pattern dots */}
                  <rect x="38" y="8" width="6" height="6" />
                  <rect x="52" y="8" width="6" height="6" />
                  <rect x="38" y="24" width="6" height="6" />
                  <rect x="48" y="38" width="6" height="6" />
                  <rect x="62" y="38" width="6" height="6" />
                  <rect x="76" y="52" width="6" height="6" />
                  <rect x="38" y="66" width="6" height="6" />
                  <rect x="52" y="80" width="6" height="6" />
                  <rect x="66" y="80" width="6" height="6" />
                  <rect x="80" y="80" width="6" height="6" />
                </svg>
              </div>
              <span className="text-xs font-mono text-slate-500 mt-2 block">
                Scan with ER Ward Scanner
              </span>
            </div>

            {/* Structured Vitals & Clinical Protocol */}
            <div className="md:col-span-8 space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Pre-Hospital Clinical Findings
              </h4>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Recorded Heart Rate:</span>
                  <span className="font-bold text-slate-900">{vitals.heartRate} BPM (Tachycardia)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SpO2 Oxygen Saturation:</span>
                  <span className="font-bold text-rose-600">{vitals.spo2}% (Hypoxic)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Non-Invasive Blood Pressure:</span>
                  <span className="font-bold text-slate-900">
                    {vitals.bloodPressureSystolic} / {vitals.bloodPressureDiastolic} mmHg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Active First Aid Intervention:</span>
                  <span className="font-bold text-emerald-700">AHA Resuscitation Metronome (110 BPM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vernacular Intake Language:</span>
                  <span className="font-bold text-slate-900">Kannada (North Karnataka Dialect)</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Admission paper queue bypassed: Patient admitted straight to Cath Lab upon ambulance arrival.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
