import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GrandOpening({ onComplete, isSoundPlaying, setIsSoundPlaying }) {
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
      const ctx = new AudioContext();
      
      // We will play 3 chimes spaced 1 second apart
      const triggerChime = (delayTime, pitch = 440) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        // Bell frequencies consist of a fundamental and higher partials
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(pitch, ctx.currentTime + delayTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(pitch * 1.5, ctx.currentTime + delayTime); // overtone

        gain.gain.setValueAtTime(0.001, ctx.currentTime + delayTime);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + delayTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delayTime + 2.0); // long decay

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(ctx.currentTime + delayTime);
        osc2.start(ctx.currentTime + delayTime);

        osc1.stop(ctx.currentTime + delayTime + 2.2);
        osc2.stop(ctx.currentTime + delayTime + 2.2);
      };

      triggerChime(0, 523.25); // C5 bell
      triggerChime(0.8, 659.25); // E5 bell
      triggerChime(1.6, 783.99); // G5 bell
    } catch (e) {
      console.warn("Bells synthesis failed", e);
    }
  };

  useEffect(() => {
    // 1. Silent for 2 seconds
    const timer = setTimeout(() => {
      // Begin sequence
      setStep(1);
      // Play temple bell chimes
      playBellChime();
      // Auto-start background music!
      setIsSoundPlaying(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 0 || step > titles.length) return;

    // Advance to next text slide every 3 seconds
    const interval = setTimeout(() => {
      if (step < titles.length) {
        setStep((prev) => prev + 1);
        if (step === titles.length - 1) {
          // Play final chime
          playBellChime();
        }
      } else {
        // Complete Grand Opening and move to Intro Video
        onComplete();
      }
    }, 3200);

    return () => clearTimeout(interval);
  }, [step]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#030202] flex items-center justify-center z-[100] overflow-hidden select-none">
      {/* Golden glowing expanding light in the center */}
      {step > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0.1, 0],
            scale: [0.1, 1.5, 2.5, 3.5, 5, 6],
          }}
          transition={{ duration: 20, ease: "easeOut" }}
          className="absolute w-[200px] h-[200px] rounded-full bg-radial from-gold-300 via-gold-600/30 to-transparent blur-2xl pointer-events-none"
        />
      )}

      {/* Floating golden particle effects */}
      {step > 0 && (
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

      {/* Cinematic Text Reveal */}
      <div className="text-center px-6 max-w-4xl z-10">
        <AnimatePresence mode="wait">
          {step > 0 && step <= titles.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(15px)', scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              {/* Optional top elegant floral SVG divider */}
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

              <h1 className={`text-4xl md:text-7xl font-cinzel tracking-widest text-center leading-relaxed text-gold-gradient font-bold drop-shadow-[0_4px_15px_rgba(217,119,6,0.3)]`}>
                {titles[step - 1]}
              </h1>

              {/* Bottom subtitle/quotes for larger titles */}
              {step === 3 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-sm md:text-base tracking-widest text-gold-100/70 uppercase font-sans font-medium"
                >
                  Honoring a lifetime of dedication
                </motion.p>
              )}
              {step === 7 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-lg md:text-xl text-cursive text-gold-200 tracking-wider"
                >
                  from all of us...
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom begin prompt if the user blocks audio context */}
      {step === 0 && (
        <motion.button
          onClick={() => {
            setStep(1);
            playBellChime();
            setIsSoundPlaying(true);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="absolute bottom-12 px-6 py-2 border border-gold-400/30 rounded-full font-semibold uppercase text-xs tracking-widest text-gold-300 hover:text-gold-100 hover:bg-gold-950/40 hover:border-gold-300 transition-all duration-300 cursor-pointer"
        >
          Enter the Tribute
        </motion.button>
      )}
    </div>
  );
}
