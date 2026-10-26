export type DomainType = 'healthcare' | 'edtech' | 'ecommerce';

export type TriageUrgency = 'CRITICAL_RESUSCITATE' | 'URGENT_EVALUATION' | 'STANDARD_CLINIC';

export type VernacularLanguage = 'en' | 'kn' | 'hi';

export interface PatientVitals {
  heartRate: number;
  spo2: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  respiratoryRate: number;
  temperatureCelsius: number;
  consciousnessState: 'ALERT' | 'VOICE_RESPONSIVE' | 'PAIN_RESPONSIVE' | 'UNRESPONSIVE';
}

export interface HospitalFacility {
  id: string;
  name: string;
  distanceKm: number;
  travelTimeMinutes: number;
  icuBedsAvailable: number;
  ventilatorsAvailable: number;
  traumaLevel: 'Level 1 Trauma' | 'Level 2 Specialty' | 'Primary Emergency';
  contactPhone: string;
  hasCathLab: boolean;
  hasPediatricIcu: boolean;
  address: string;
}

export interface SymptomChoice {
  id: string;
  labelEn: string;
  labelKn: string;
  labelHi: string;
  bodyRegion: 'head' | 'chest' | 'abdomen' | 'limbs' | 'general';
  urgencyWeight: number; // 1 to 5
}

export interface PersonaProfile {
  id: string;
  name: string;
  age: number;
  role: string;
  location: string;
  techLiteracy: 'Low' | 'Medium' | 'High';
  quote: string;
  painPoints: string[];
  designSolutions: string[];
  devices: string[];
}

export interface HeuristicAuditItem {
  id: number;
  heuristicName: string;
  definition: string;
  implementationInSanjeevani: string;
  score: number; // e.g. 10/10
  liveEvidenceComponent: string;
}

export interface SlideItem {
  number: number;
  title: string;
  subtitle: string;
  speaker: 'Team Member 1 (Lead UX Researcher)' | 'Team Member 2 (Design Engineer)' | 'Both Team Members in Unison';
  timing: string;
  talkingPoints: string[];
  keyHighlight: string;
  metrics: { label: string; value: string }[];
}
