import React, { useState, useEffect } from 'react';
import { PITCH_DECK_SLIDES } from '../../data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  X,
  Clock,
  User,
  Sparkles,
  Award,
} from 'lucide-react';

interface JuryPitchDeckProps {
  onClose: () => void;
}

export const JuryPitchDeck: React.FC<JuryPitchDeckProps> = ({ onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 minutes (300s)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const currentSlide = PITCH_DECK_SLIDES[currentSlideIndex];

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(PITCH_DECK_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-y-auto">
      {/* Top Deck Control Header */}
      <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <span
            className="text-base font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Sanjeevani Care
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-400">
            5-Minute Clinical Pitch Mode
          </span>
        </div>

        {/* 5-Minute Timer Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span
              className={`font-bold tabular-nums ${
                timerSeconds < 60 ? 'text-rose-400 animate-pulse' : 'text-white'
              }`}
            >
              {formatTimer(timerSeconds)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            title={isTimerRunning ? 'Pause Pitch Timer' : 'Start 5-Min Timer'}
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(300);
            }}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-slate-800 mx-1" />

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-white cursor-pointer transition-colors"
            title="Exit Presentation (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl relative">
          {/* Slide Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-rose-400 font-bold">
                SLIDE {currentSlide.number} / {PITCH_DECK_SLIDES.length}
              </span>
              <span>·</span>
              <span>EST. TIME: {currentSlide.timing}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full text-slate-300">
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentSlide.speaker}</span>
            </div>
          </div>

          {/* Slide Title & Subtitle */}
          <h1
            className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {currentSlide.title}
          </h1>
          <p className="text-base text-slate-400 mb-8 max-w-3xl">
            {currentSlide.subtitle}
          </p>

          {/* 3 Core Talking Points for the Speaker */}
          <div className="space-y-3.5 mb-8">
            {currentSlide.talkingPoints.map((point, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* Key Metric Highlights Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            {currentSlide.metrics.map((m, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">
                  {m.label}
                </span>
                <span className="text-xl font-bold font-mono text-rose-400 tabular-nums">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Key Highlight Banner */}
          <div className="mt-6 p-3 bg-rose-950/40 border border-rose-900/50 rounded-lg text-xs text-rose-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>Key Pitch Takeaway:</strong> {currentSlide.keyHighlight}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Slide Navigation Bar */}
      <div className="border-t border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-md shrink-0">
        <button
          type="button"
          onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentSlideIndex === 0}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
            currentSlideIndex === 0
              ? 'opacity-30 text-slate-600 cursor-not-allowed'
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous Slide
        </button>

        {/* Slide Number Indicators */}
        <div className="flex items-center gap-2">
          {PITCH_DECK_SLIDES.map((s, idx) => (
            <button
              key={s.number}
              type="button"
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? 'bg-rose-500 scale-125 ring-2 ring-rose-400/40'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Slide ${s.number}: ${s.title}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setCurrentSlideIndex((prev) => Math.min(PITCH_DECK_SLIDES.length - 1, prev + 1))
          }
          disabled={currentSlideIndex === PITCH_DECK_SLIDES.length - 1}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
            currentSlideIndex === PITCH_DECK_SLIDES.length - 1
              ? 'opacity-30 text-slate-600 cursor-not-allowed'
              : 'bg-rose-600 text-white hover:bg-rose-500 shadow-sm'
          }`}
        >
          Next Slide <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
