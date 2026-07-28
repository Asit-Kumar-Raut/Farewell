import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function GrandOpening({ onComplete, isSoundPlaying, setIsSoundPlaying }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);

  // Tribute titles sequence
  const titles = [
    "A Tribute",
    "To",
    "Our Beloved Teacher",
    "An Inspiration",
    "A Guiding Light",
    "A Second Mother",
    "Thank You Mam ❤️"
  ];

  // Synthesize soft, rich temple bells chime
  const playBellChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = window.unlockedAudioContext || new AudioContext();
      
      const triggerChime = (delayTime, pitch = 440) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(pitch, ctx.currentTime + delayTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(pitch * 1.5, ctx.currentTime + delayTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + delayTime);
        gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + delayTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delayTime + 2.0);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(ctx.currentTime + delayTime);
        osc2.start(ctx.currentTime + delayTime);

        osc1.stop(ctx.currentTime + delayTime + 2.2);
        osc2.stop(ctx.currentTime + delayTime + 2.2);
      };

      triggerChime(0, 523.25);
      triggerChime(0.8, 659.25);
      triggerChime(1.6, 783.99);
    } catch (e) {
      console.warn("Bells synthesis failed", e);
    }
  };

  const unlockAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      // Play a quick silent note to trigger browser unlock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.value = 0.001;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      osc.stop(0.1);
      
      // Save it globally so AudioPlayer can reuse it
      window.unlockedAudioContext = ctx;
    } catch (e) {
      console.warn("Audio context unlock failed:", e);
    }
  };

  const handleBegin = () => {
    unlockAudio();
    playBellChime();
    setIsSoundPlaying(true);
    setStarted(true);
    setStep(1);

    // Run typewriter sequences
    startTitleSequence();
  };

  const startTitleSequence = () => {
    let currentStep = 1;
    const runNext = () => {
      setTimeout(() => {
        currentStep++;
        if (currentStep <= titles.length) {
          setStep(currentStep);
          if (currentStep === titles.length) {
            playBellChime();
          }
          runNext();
        } else {
          // Finish grand opening and advance to Tribute Letter Page
          onComplete();
        }
      }, 3400);
    };
    runNext();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#030202] flex items-center justify-center z-[100] overflow-hidden select-none">
      
      {/* Golden glowing expanding light in the center */}
      {started && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0.1, 0],
            scale: [0.1, 1.5, 2.5, 3.5, 5, 6],
          }}
          transition={{ duration: 25, ease: "easeOut" }}
          className="absolute w-[200px] h-[200px] rounded-full bg-radial from-gold-300 via-gold-600/30 to-transparent blur-2xl pointer-events-none"
        />
      )}

      {/* Floating golden particle effects */}
      {started && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 rounded-full bg-gold-200 shadow-md shadow-gold-400"
            />
          ))}
        </div>
      )}

      {/* Initial Landing Screen (To force user click and unlock audio context) */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center max-w-lg px-6 z-20 text-center"
          >
            {/* Elegant Shield */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full border border-gold-400/40 flex items-center justify-center mb-6 shadow-lg shadow-gold-500/10"
            >
              <Heart className="w-6 h-6 text-gold-400 fill-gold-400/20" />
            </motion.div>

            <span className="font-cinzel text-xs tracking-[0.3em] text-gold-300 font-bold uppercase block mb-2">
              Rasanga Prathamika Vidyalaya
            </span>
            <span className="text-[10px] tracking-widest text-gold-200/50 uppercase font-semibold block mb-6">
              Batch of 2012 - 2017
            </span>

            <h1 className="font-playfair text-4xl md:text-5xl text-gold-100 font-bold leading-tight mb-8 select-text drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]">
              A Grand Farewell Tribute to Our Beloved Mam
            </h1>

            <button
              onClick={handleBegin}
              className="px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 text-gold-950 font-black uppercase text-xs tracking-widest rounded-full cursor-pointer hover:from-gold-500 hover:to-gold-300 transition-all duration-300 shadow-lg shadow-gold-500/20 active:scale-95"
            >
              Begin Tribute
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Text Reveal Sequence */}
      <div className="text-center px-6 max-w-4xl z-10">
        <AnimatePresence mode="wait">
          {started && step > 0 && step <= titles.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(15px)', scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              {/* Elegant floral divider */}
              <motion.svg
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 0.3, duration: 1.0 }}
                height="24"
                viewBox="0 0 100 24"
                fill="none"
                stroke="currentColor"
                className="text-gold-400/50 mb-6"
              >
                <path d="M10 12 C30 2, 40 22, 50 12 C60 2, 70 22, 90 12" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="50" cy="12" r="3" fill="#fbbf24" />
              </motion.svg>

              <h1 className="text-4xl md:text-7xl font-cinzel tracking-widest text-center leading-relaxed text-gold-gradient font-bold drop-shadow-[0_4px_15px_rgba(217,119,6,0.3)]">
                {titles[step - 1]}
              </h1>

              {step === 3 && (
                <p className="mt-4 text-sm md:text-base tracking-widest text-gold-100/70 uppercase font-sans font-medium">
                  Honoring a lifetime of dedication
                </p>
              )}
              {step === 7 && (
                <p className="mt-4 text-lg md:text-xl text-cursive text-gold-200 tracking-wider">
                  from all of us...
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
