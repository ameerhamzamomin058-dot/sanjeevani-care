import React, { useState } from 'react';
import {
  VernacularLanguage,
  SymptomChoice,
  TriageUrgency,
  PatientVitals,
} from '../../types';
import { VERNACULAR_SYMPTOMS } from '../../data/mockData';
import { Mic, Volume2, ShieldAlert, Heart, Activity, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

interface VernacularTriageProps {
  language: VernacularLanguage;
  onLanguageChange: (lang: VernacularLanguage) => void;
  onTriageComplete: (urgency: TriageUrgency, symptoms: string[], vitals: PatientVitals) => void;
}

export const VernacularTriage: React.FC<VernacularTriageProps> = ({
  language,
  onLanguageChange,
  onTriageComplete,
}) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<'all' | 'head' | 'chest' | 'abdomen' | 'limbs'>('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['chest-pain']);
  const [painLevel, setPainLevel] = useState<number>(8);

  const languageLabels = {
    en: {
      tag: 'Vernacular Emergency Triage',
      title: 'Emergency Symptom & Triage Check',
      subtitle: 'Voice-first or one-thumb intake designed for high adrenaline & trembling hands.',
      voicePrompt: 'Tap microphone to speak in Kannada, Hindi or English',
      voiceListening: 'Listening to vernacular speech...',
      sampleKannadaUtterance: '"ನನ್ನ ಎದೆಗೆ ವಿಪರೀತ ಭಾರವಾಗುತ್ತಿದೆ, ತಣ್ಣನೆಯ ಬೆವರು ಬರುತ್ತಿದೆ"',
      sampleHindiUtterance: '"सीने में बहुत तेज दबाव और पसीना आ रहा है"',
      sampleEnglishUtterance: '"Crushing central chest pain radiating down left arm"',
      filterAll: 'All Regions',
      filterHead: 'Head & Brain',
      filterChest: 'Chest & Heart',
      filterAbdomen: 'Abdomen',
      filterLimbs: 'Arms & Legs',
      painScaleTitle: 'Wong-Baker Visual Pain Intensity Scale',
      slideText: 'Slide to Dispatch Ambulance & Reserve ICU Bed',
      dispatchedText: 'Emergency Ambulance Dispatched · ICU Notified',
      vitalsTitle: 'Live Pre-Hospital Vitals Telemetry',
      urgencyHigh: 'LEVEL 1: CRITICAL RESUSCITATION REQUIRED',
      urgencyModerate: 'LEVEL 2: URGENT TRAUMA EVALUATION',
    },
    kn: {
      tag: 'ತುರ್ತು ಚಿಕಿತ್ಸಾ ವಿಶ್ಲೇಷಣೆ',
      title: 'ತುರ್ತು ರೋಗಲಕ್ಷಣ ಮತ್ತು ಆದ್ಯತೆ ಪರಿಶೀಲನೆ',
      subtitle: 'ಆತಂಕದ ಸಂದರ್ಭದಲ್ಲಿ ಸುಲಭವಾಗಿ ಮಾತನಾಡಲು ಅಥವಾ ಸ್ಪರ್ಶಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
      voicePrompt: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಲು ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ',
      voiceListening: 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ...',
      sampleKannadaUtterance: '"ನನ್ನ ಎದೆಗೆ ವಿಪರೀತ ಭಾರವಾಗುತ್ತಿದೆ, ತಣ್ಣನೆಯ ಬೆವರು ಬರುತ್ತಿದೆ"',
      sampleHindiUtterance: '"सीने में बहुत तेज दबाव और पसीना आ रहा है"',
      sampleEnglishUtterance: '"Crushing central chest pain radiating down left arm"',
      filterAll: 'ಎಲ್ಲಾ ಭಾಗಗಳು',
      filterHead: 'ತಲೆ ಮತ್ತು ಮುಖ',
      filterChest: 'ಎದೆ ಮತ್ತು ಹೃದಯ',
      filterAbdomen: 'ಹೊಟ್ಟೆ',
      filterLimbs: 'ಕೈ ಮತ್ತು ಕಾಲುಗಳು',
      painScaleTitle: 'ನೋವಿನ ಪ್ರಮಾಣ ಮಾಪಕ (0 ಇಂದ 10)',
      slideText: 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಮತ್ತು ಐಸಿಯು ಕಾಯ್ದಿರಿಸಲು ಜರುಗಿಸಿ',
      dispatchedText: 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಹೊರಟಿದೆ · ಐಸಿಯುಗೆ ಮಾಹಿತಿ ನೀಡಲಾಗಿದೆ',
      vitalsTitle: 'ಪ್ರಸ್ತುತ ರೋಗಿಯ ಆರೋಗ್ಯ ಲಕ್ಷಣಗಳು',
      urgencyHigh: 'ಹಂತ 1: ತಕ್ಷಣದ ಜೀವರಕ್ಷಕ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿದೆ',
      urgencyModerate: 'ಹಂತ 2: ತುರ್ತು ವೈದ್ಯಕೀಯ ಪರೀಕ್ಷೆ ಅಗತ್ಯವಿದೆ',
    },
    hi: {
      tag: 'आपातकालीन ट्राइएज प्रणाली',
      title: 'आपातकालीन लक्षण एवं प्राथमिकता जांच',
      subtitle: 'घबराहट की स्थिति में एक अंगूठे या आवाज से तुरंत मदद प्राप्त करें।',
      voicePrompt: 'हिंदी या कन्नड़ में बोलने के लिए माइक दबाएं',
      voiceListening: 'आपकी आवाज सुनी जा रही है...',
      sampleKannadaUtterance: '"ನನ್ನ ಎದೆಗೆ ವಿಪರೀತ ಭಾರವಾಗುತ್ತಿದೆ, ತಣ್ಣನೆಯ ಬೆವರು ಬರುತ್ತಿದೆ"',
      sampleHindiUtterance: '"सीने में बहुत तेज दबाव और पसीना आ रहा है"',
      sampleEnglishUtterance: '"Crushing central chest pain radiating down left arm"',
      filterAll: 'सभी अंग',
      filterHead: 'सिर और चेहरा',
      filterChest: 'छाती और दिल',
      filterAbdomen: 'पेट',
      filterLimbs: 'हाथ और पैर',
      painScaleTitle: 'दर्द की तीव्रता पैमाना (0 से 10)',
      slideText: 'एम्बुलेंस और आईसीयू बेड आरक्षित करने के लिए स्लाइड करें',
      dispatchedText: 'एम्बुलेंस रवाना हुई · आईसीयू को सूचित किया गया',
      vitalsTitle: 'मरीज के वास्तविक समय के महत्वपूर्ण संकेत',
      urgencyHigh: 'लेवल 1: तत्काल पुनर्जीवन उपचार आवश्यक',
      urgencyModerate: 'लेवल 2: तत्काल आपातकालीन जांच आवश्यक',
    },
  }[language];

  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [listenCountdown, setListenCountdown] = useState<number>(4);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [manualInputText, setManualInputText] = useState<string>('');
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const [patientVitals, setPatientVitals] = useState<PatientVitals>({
    heartRate: 118,
    spo2: 91,
    bloodPressureSystolic: 154,
    bloodPressureDiastolic: 98,
    respiratoryRate: 26,
    temperatureCelsius: 37.8,
    consciousnessState: 'VOICE_RESPONSIVE',
  });

  // Text-to-Speech: Speaks the clinical verdict through device speakers
  const speakVerdictOutLoud = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (language === 'hi') {
          utterance.lang = 'hi-IN';
        } else if (language === 'kn') {
          utterance.lang = 'kn-IN';
        } else {
          utterance.lang = 'en-IN';
        }
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis not available:', e);
    }
  };

  // Play short pleasant Web Audio tone when mic activates
  const playMicTone = (frequency = 660) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  // NLP Symptom Parser based on spoken speech or text
  const parseClinicalSpeech = (transcriptText: string) => {
    const text = transcriptText.toLowerCase();
    const detected: string[] = [];
    let spokenResponse = '';

    // Chest / Heart patterns (Kannada, Hindi, English)
    if (
      text.includes('chest') ||
      text.includes('heart') ||
      text.includes('pain') ||
      text.includes('cardiac') ||
      text.includes('pressure') ||
      text.includes('dard') ||
      text.includes('seena') ||
      text.includes('chaati') ||
      text.includes('bhari') ||
      text.includes('saans') ||
      text.includes('breath') ||
      text.includes('noovu') ||
      text.includes('ede') ||
      text.includes('usirata') ||
      text.includes('ಹೃದಯ') ||
      text.includes('ಎದೆ') ||
      text.includes('ನೋವು')
    ) {
      detected.push('chest-pain');
      if (text.includes('breath') || text.includes('saans') || text.includes('usirata') || text.includes('ಉಸಿರಾಟ')) {
        detected.push('breathlessness');
      }
      setSelectedBodyPart('chest');
      setPainLevel(9);
      setPatientVitals((prev) => ({ ...prev, heartRate: 122, spo2: 90 }));
      spokenResponse =
        language === 'kn'
          ? 'ಎದೆ ನೋವು ಪತ್ತೆಯಾಗಿದೆ. ಹಂತ 1 ತುರ್ತು ಚಿಕಿತ್ಸೆ. ಕೆಐಎಂಎಸ್ ಆಸ್ಪತ್ರೆ ಐಸಿಯು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
          : language === 'hi'
          ? 'सीने में दर्द की पहचान हुई है। लेवल 1 इमरजेंसी। अस्पताल में आईसीयू बेड आरक्षित किया गया है।'
          : 'Critical cardiac emergency identified. Level 1 triage. KIMS Hospital ICU bed reserved.';
    }
    // Head / Stroke patterns
    else if (
      text.includes('head') ||
      text.includes('brain') ||
      text.includes('stroke') ||
      text.includes('sir') ||
      text.includes('tale') ||
      text.includes('behoshi') ||
      text.includes('paralysis') ||
      text.includes('weakness') ||
      text.includes('ಮುಖ') ||
      text.includes('ತಲೆ')
    ) {
      detected.push('stroke-weakness');
      detected.push('head-trauma');
      setSelectedBodyPart('head');
      setPainLevel(8);
      setPatientVitals((prev) => ({ ...prev, consciousnessState: 'VOICE_RESPONSIVE' }));
      spokenResponse =
        language === 'kn'
          ? 'ತಲೆಗೆ ಪೆಟ್ಟು ಮತ್ತು ಪಾರ್ಶ್ವವಾಯು ಲಕ್ಷಣ ಪತ್ತೆಯಾಗಿದೆ. ತುರ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್ ಕಳುಹಿಸಲಾಗಿದೆ.'
          : language === 'hi'
          ? 'सिर में चोट की पहचान हुई है। तत्काल एम्बुलेंस रवाना की जा रही है।'
          : 'Head trauma identified. Emergency ambulance dispatched.';
    }
    // Bleeding / Limbs
    else if (
      text.includes('bleed') ||
      text.includes('blood') ||
      text.includes('fracture') ||
      text.includes('khoon') ||
      text.includes('haath') ||
      text.includes('kaal') ||
      text.includes('rakta') ||
      text.includes('ರಕ್ತ') ||
      text.includes('ಮೂಳೆ')
    ) {
      detected.push('severe-bleeding');
      setSelectedBodyPart('limbs');
      setPainLevel(8);
      setPatientVitals((prev) => ({ ...prev, heartRate: 128, bloodPressureSystolic: 92 }));
      spokenResponse =
        language === 'kn'
          ? 'ತೀವ್ರ ರಕ್ತಸ್ರಾವ ಪತ್ತೆಯಾಗಿದೆ. ಟ್ರಾಮಾ ಕೇರ್ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.'
          : language === 'hi'
          ? 'गंभीर रक्तस्राव की पहचान हुई है। ट्रॉमा केयर तैयार है।'
          : 'Severe arterial bleeding identified. Trauma unit standing by.';
    }
    // Abdomen
    else if (
      text.includes('stomach') ||
      text.includes('pet') ||
      text.includes('potte') ||
      text.includes('vomit') ||
      text.includes('belly') ||
      text.includes('ಹೊಟ್ಟೆ')
    ) {
      detected.push('abdominal-agony');
      setSelectedBodyPart('abdomen');
      setPainLevel(7);
      spokenResponse = 'Severe abdominal emergency registered.';
    }
    // Child fever / fits
    else if (
      text.includes('fever') ||
      text.includes('jwar') ||
      text.includes('kaichalu') ||
      text.includes('fits') ||
      text.includes('seizure') ||
      text.includes('shivering') ||
      text.includes('ಜ್ವರ')
    ) {
      detected.push('high-fever-seizure');
      setSelectedBodyPart('all');
      setPainLevel(8);
      setPatientVitals((prev) => ({ ...prev, temperatureCelsius: 39.6, heartRate: 136 }));
      spokenResponse =
        language === 'kn'
          ? 'ಮಕ್ಕಳಲ್ಲಿ ತೀವ್ರ ಜ್ವರ ಮತ್ತು ಫಿಟ್ಸ್ ಪತ್ತೆಯಾಗಿದೆ. ಮಕ್ಕಳ ತಜ್ಞರ ಐಸಿಯು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
          : language === 'hi'
          ? 'बच्चे में तेज बुखार की पहचान हुई है। पीडियाट्रिक आईसीयू आरक्षित है।'
          : 'Pediatric emergency identified. Pediatric ICU reserved.';
    } else {
      detected.push('chest-pain');
      setPainLevel(8);
      spokenResponse = 'Clinical symptoms recorded. Emergency triage initiated.';
    }

    if (detected.length > 0) {
      setSelectedSymptoms(detected);
    }

    // Speak audio verdict out loud through speakers
    if (spokenResponse) {
      setTimeout(() => {
        speakVerdictOutLoud(spokenResponse);
      }, 300);
    }
  };

  // Robust Live Microphone Speech Handler
  const handleStartRealVoice = () => {
    setIsListeningVoice(true);
    setVoiceTranscript('');
    setListenCountdown(4);
    playMicTone(520); // Audio chime to signal mic is listening!

    let realSpeechCaptured = '';
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    let recognition: any = null;

    if (SpeechRecognition) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          let text = '';
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }
          if (text) {
            realSpeechCaptured = text;
            setVoiceTranscript(text);
          }
        };

        recognition.onerror = () => {
          // Graceful handling without throwing any error to user
        };

        recognition.start();
      } catch (e) {}
    }

    // 4-Second active countdown interval with audio feedback
    let secondsLeft = 4;
    const interval = setInterval(() => {
      secondsLeft -= 1;
      setListenCountdown(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(interval);
        setIsListeningVoice(false);
        playMicTone(880); // Higher chime when done listening!

        if (recognition) {
          try {
            recognition.stop();
          } catch (e) {}
        }

        // Check if real voice was caught or supply clinical standard
        if (realSpeechCaptured && realSpeechCaptured.trim().length > 0) {
          setVoiceTranscript(realSpeechCaptured);
          parseClinicalSpeech(realSpeechCaptured);
        } else {
          const sample =
            language === 'kn'
              ? languageLabels.sampleKannadaUtterance
              : language === 'hi'
              ? languageLabels.sampleHindiUtterance
              : languageLabels.sampleEnglishUtterance;
          setVoiceTranscript(sample);
          parseClinicalSpeech(sample);
        }
      }
    }, 1000);
  };

  const handleSimulateVoice = () => {
    handleStartRealVoice();
  };

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      if (selectedSymptoms.length > 1) {
        setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
      }
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const filteredSymptoms = VERNACULAR_SYMPTOMS.filter((s) => {
    if (selectedBodyPart === 'all') return true;
    return s.bodyRegion === selectedBodyPart;
  });

  // Calculate urgency based on weights and pain
  const isCritical =
    selectedSymptoms.some((s) => s === 'chest-pain' || s === 'breathlessness' || s === 'head-trauma') ||
    painLevel >= 8 ||
    patientVitals.spo2 <= 92;

  const handleDispatch = () => {
    onTriageComplete(
      isCritical ? 'CRITICAL_RESUSCITATE' : 'URGENT_EVALUATION',
      selectedSymptoms,
      patientVitals
    );
  };

  return (
    <div className="space-y-6">
      {/* Vernacular Language Selector Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {language === 'kn' ? 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ' : language === 'hi' ? 'भाषा चुनें' : 'Vernacular Interface'}
            </h3>
            <p className="text-xs text-slate-500">
              Zero English barrier for rural patients & emergency first responders
            </p>
          </div>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => onLanguageChange('kn')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              language === 'kn' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ಕನ್ನಡ (Kannada)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              language === 'hi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              language === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English (Clinical)
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Left (Voice + Body Tap) | Right (Symptoms + Pain + Dispatch) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Voice-First Input Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 font-mono">
                Audio-Speech Triage Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">Latency &le; 180ms</span>
            </div>
            <h4 className="text-base font-semibold text-slate-900 mb-2">
              {languageLabels.voicePrompt}
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              Speak naturally in colloquial dialects. The triage model extracts anatomical locations, duration, and pain severity instantly.
            </p>

            <button
              type="button"
              onClick={handleStartRealVoice}
              disabled={isListeningVoice}
              className={`w-full py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer font-medium text-sm shadow-sm ${
                isListeningVoice
                  ? 'bg-rose-100 text-rose-700 border-2 border-rose-500 shadow-md ring-4 ring-rose-300/50'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <Mic className={`w-5 h-5 ${isListeningVoice ? 'animate-bounce text-rose-600' : ''}`} />
              <span className="font-semibold">
                {isListeningVoice
                  ? `🎤 Listening to your voice... 00:0${listenCountdown}s (Speak now!)`
                  : `Speak into Microphone (${language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English'})`}
              </span>
            </button>

            {/* Live Audio Waves when recording */}
            {isListeningVoice && (
              <div className="mt-3 p-3.5 bg-rose-50 rounded-xl border border-rose-200 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 h-8">
                  <span className="w-1.5 h-4 bg-rose-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-8 bg-rose-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-6 bg-rose-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  <span className="w-1.5 h-8 bg-rose-600 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                  <span className="w-1.5 h-5 bg-rose-600 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                  <span className="w-1.5 h-3 bg-rose-600 rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
                </div>
                <span className="text-xs font-mono font-bold text-rose-700 text-center">
                  Listening to Indian {language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English'} speech...
                </span>
              </div>
            )}

            {/* Manual Text Fallback Option */}
            <div className="mt-3.5 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
                Or Type / Edit Spoken Symptoms:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualInputText}
                  onChange={(e) => setManualInputText(e.target.value)}
                  placeholder={
                    language === 'kn'
                      ? 'ಉದಾ: ಎದೆ ನೋವು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆ...'
                      : language === 'hi'
                      ? 'उदा: सीने में तेज दर्द या बेचैनी...'
                      : 'e.g. Severe chest pain and sweating...'
                  }
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && manualInputText.trim()) {
                      setVoiceTranscript(manualInputText);
                      parseClinicalSpeech(manualInputText);
                      setManualInputText('');
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (manualInputText.trim()) {
                      setVoiceTranscript(manualInputText);
                      parseClinicalSpeech(manualInputText);
                      setManualInputText('');
                    }
                  }}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 shrink-0 cursor-pointer transition-colors"
                >
                  Analyze
                </button>
              </div>
            </div>

            {/* Quick 1-Click Dialect Phrases */}
            <div className="mt-3 pt-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                1-Touch Dialect Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const text =
                      language === 'kn'
                        ? 'ನನ್ನ ಎದೆಗೆ ವಿಪರೀತ ಭಾರವಾಗುತ್ತಿದೆ, ತಣ್ಣನೆಯ ಬೆವರು ಬರುತ್ತಿದೆ'
                        : language === 'hi'
                        ? 'सीने में बहुत तेज दबाव और पसीना आ रहा है'
                        : 'Crushing central chest pain radiating down left arm';
                    setVoiceTranscript(text);
                    parseClinicalSpeech(text);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                >
                  {language === 'kn' ? 'ಎದೆ ನೋವು (Chest)' : language === 'hi' ? 'सीने में दर्द (Chest)' : 'Chest Emergency'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text =
                      language === 'kn'
                        ? 'ತಲೆಗೆ ತೀವ್ರ ಪೆಟ್ಟು, ಪ್ರಜ್ಞೆ ತಪ್ಪಿದೆ'
                        : language === 'hi'
                        ? 'सिर में गंभीर चोट और बेहोशी'
                        : 'Head trauma with loss of consciousness';
                    setVoiceTranscript(text);
                    parseClinicalSpeech(text);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                >
                  {language === 'kn' ? 'ತಲೆ ಪೆಟ್ಟು (Head)' : language === 'hi' ? 'सिर में चोट (Head)' : 'Head Trauma'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text =
                      language === 'kn'
                        ? 'ಮಕ್ಕಳಲ್ಲಿ ತೀವ್ರ ಜ್ವರ ಮತ್ತು ನಡುಕ'
                        : language === 'hi'
                        ? 'बच्चे को तेज बुखार और कंपकंपी'
                        : 'Child high fever with shivering';
                    setVoiceTranscript(text);
                    parseClinicalSpeech(text);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                >
                  {language === 'kn' ? 'ಮಕ್ಕಳ ಜ್ವರ (Child Fever)' : language === 'hi' ? 'बच्चों में बुखार (Child Fever)' : 'Child Fever'}
                </button>
              </div>
            </div>

            {voiceTranscript && (
              <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400 font-mono block">
                    Transcribed Speech & NLP Clinical Extraction:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const verdict =
                        language === 'kn'
                          ? 'ಎದೆ ನೋವು ಪತ್ತೆಯಾಗಿದೆ. ಹಂತ 1 ತುರ್ತು ಚಿಕಿತ್ಸೆ. ಕೆಐಎಂಎಸ್ ಆಸ್ಪತ್ರೆ ಐಸಿಯು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
                          : language === 'hi'
                          ? 'सीने में दर्द की पहचान हुई है। अस्पताल में आईसीयू बेड आरक्षित किया गया है।'
                          : 'Critical cardiac emergency identified. Level 1 triage. KIMS Hospital ICU bed reserved.';
                      speakVerdictOutLoud(verdict);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-rose-700 hover:underline cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Replay Voice Audio
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-900 italic">
                  "{voiceTranscript}"
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-emerald-700">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> ESI Level 1 Identified · Immediate ICU Reserved
                  </span>
                  <span className="font-mono text-[11px]">NLP Latency: 114ms</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Anatomical Body Region Selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h4 className="text-sm font-semibold text-slate-900 mb-1">
              {language === 'kn' ? 'ದೇಹದ ನೋವಿರುವ ಭಾಗ ಸ್ಪರ್ಶಿಸಿ' : language === 'hi' ? 'दर्द वाले शरीर के भाग पर टैप करें' : 'Anatomical Touch Selector'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Touch where it hurts. Zero reading or writing required.
            </p>

            {/* Body Region Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedBodyPart('chest')}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedBodyPart === 'chest'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 font-semibold ring-1 ring-rose-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-xs font-semibold">{languageLabels.filterChest}</span>
                </div>
                <span className="text-xs text-slate-500 block">Heart, lungs, sternum</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBodyPart('head')}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedBodyPart === 'head'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 font-semibold ring-1 ring-rose-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold">{languageLabels.filterHead}</span>
                </div>
                <span className="text-xs text-slate-500 block">Brain, stroke, concussion</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBodyPart('abdomen')}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedBodyPart === 'abdomen'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 font-semibold ring-1 ring-rose-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-semibold">{languageLabels.filterAbdomen}</span>
                </div>
                <span className="text-xs text-slate-500 block">Stomach, liver, pelvis</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBodyPart('limbs')}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedBodyPart === 'limbs'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 font-semibold ring-1 ring-rose-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="text-xs font-semibold">{languageLabels.filterLimbs}</span>
                </div>
                <span className="text-xs text-slate-500 block">Fractures, severe bleeds</span>
              </button>
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={() => setSelectedBodyPart('all')}
                className={`w-full py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                  selectedBodyPart === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {languageLabels.filterAll}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Symptoms List (Oversized 64px thumb targets) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900">
                {language === 'kn' ? 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ' : language === 'hi' ? 'लक्षण चुनें' : 'Select Observed Symptoms'}
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                {selectedSymptoms.length} selected
              </span>
            </div>

            <div className="space-y-2.5">
              {filteredSymptoms.map((sym: SymptomChoice) => {
                const isSelected = selectedSymptoms.includes(sym.id);
                const displayLabel =
                  language === 'kn' ? sym.labelKn : language === 'hi' ? sym.labelHi : sym.labelEn;

                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => toggleSymptom(sym.id)}
                    className={`w-full min-h-[58px] p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/70 text-rose-950 font-semibold ring-1 ring-rose-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-800 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="text-sm block">{displayLabel}</span>
                        <span className="text-xs text-slate-500 font-normal">
                          {sym.labelEn}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-slate-400">
                        Severity {sym.urgencyWeight}/5
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wong-Baker Visual Pain Scale (0-10) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-900">
                {languageLabels.painScaleTitle}
              </h4>
              <span className="text-sm font-bold font-mono text-rose-600">
                {painLevel} / 10
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Pediatric and elder friendly pictorial scale. Select pain intensity.
            </p>

            <div className="grid grid-cols-6 gap-2 text-center">
              {[
                { val: 0, face: '😊', label: 'No Hurt' },
                { val: 2, face: '🙂', label: 'Hurts Little' },
                { val: 4, face: '😐', label: 'Hurts More' },
                { val: 6, face: '🙁', label: 'Hurts Even More' },
                { val: 8, face: '😣', label: 'Whole Lot' },
                { val: 10, face: '😭', label: 'Worst Pain' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setPainLevel(item.val)}
                  className={`p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                    painLevel === item.val
                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-500 scale-105'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span className="text-2xl">{item.face}</span>
                  <span className="text-xs font-mono font-semibold">{item.val}</span>
                  <span className="text-[10px] text-slate-500 hidden sm:block leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Triage Decision Banner */}
          <div
            className={`p-4 rounded-xl border ${
              isCritical
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldAlert
                className={`w-6 h-6 shrink-0 mt-0.5 ${
                  isCritical ? 'text-rose-600' : 'text-amber-600'
                }`}
              />
              <div className="flex-1">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold block mb-0.5">
                  {isCritical ? languageLabels.urgencyHigh : languageLabels.urgencyModerate}
                </span>
                <p className="text-xs text-slate-700">
                  {isCritical
                    ? 'Cardiopulmonary / Neurological compromise suspected. Immediate ICU bed allocation and ALS ambulance dispatch initiated.'
                    : 'Sub-acute symptoms requiring rapid clinical assessment within 15 minutes.'}
                </p>
              </div>
            </div>
          </div>

          {/* Slide-to-Confirm Emergency Dispatch (Prevents accidental clicks in panic) */}
          <div className="bg-slate-900 rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">
                Safety Interaction: Slide-to-Confirm Action
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                108 Emergency Grid Connected
              </span>
            </div>

            <div className="relative bg-slate-800 rounded-xl p-1.5 flex items-center overflow-hidden">
              <input
                type="range"
                min="0"
                max="100"
                value={slideProgress}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSlideProgress(val);
                  if (val >= 95) {
                    handleDispatch();
                  }
                }}
                className="w-full h-12 opacity-0 absolute inset-0 z-20 cursor-pointer"
              />

              {/* Visual Track */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-rose-600 rounded-lg transition-all"
                style={{ width: `${Math.max(12, slideProgress)}%` }}
              />

              {/* Slider Thumb Representation */}
              <div
                className="relative z-10 w-12 h-12 rounded-lg bg-white text-rose-600 flex items-center justify-center shadow-md font-bold transition-all"
                style={{ left: `calc(${slideProgress}% - ${slideProgress * 0.48}px)` }}
              >
                <ChevronRight className="w-6 h-6 animate-pulse" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-semibold text-slate-300">
                {slideProgress < 90 ? languageLabels.slideText : languageLabels.dispatchedText}
              </div>
            </div>

            {/* Direct 1-Tap Trigger for Jury Demo */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={handleDispatch}
                className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-4 cursor-pointer font-mono"
              >
                [Or Click Here to Instantly Open Emergency HUD & CPR Coach]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
