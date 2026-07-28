import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ isPlaying, setIsPlaying }) {
  const audioContextRef = useRef(null);
  const playStateRef = useRef(false);
  const notesTimeoutRef = useRef([]);

  // Synthesize soft, cinematic piano & flute ambient notes
  const startSynthesizer = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      playStateRef.current = true;

      // Master Gain for volume control and fades
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 3); // soft entry
      masterGain.connect(ctx.destination);

      // Lowpass filter for warm, cozy sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.connect(masterGain);

      // Delay effect for ambient space
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.6;
      const delayGain = ctx.createGain();
      delayGain.gain.value = 0.4;

      delay.connect(delayGain);
      delayGain.connect(delay); // feedback loop
      delayGain.connect(filter); // feedback into filter

      // Base Chords (Cmaj9, Am9, Fmaj9, G11) in Hz
      const chordProgression = [
        [130.81, 195.99, 261.63, 329.63, 392.00, 493.88], // Cmaj9 (C3, G3, C4, E4, G4, B4)
        [110.00, 164.81, 220.00, 261.63, 329.63, 392.00], // Am9   (A2, E3, A3, C4, E4, G4)
        [87.31,  130.81, 174.61, 218.08, 261.63, 349.23], // Fmaj9 (F2, C3, F3, A3, C4, F4)
        [97.99,  146.83, 195.99, 246.94, 293.66, 349.23]  // G11   (G2, D3, G3, B3, D4, F4)
      ];

      // Melodic notes mapping for random soft lead melody (Pentatonic C major)
      const melodyNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

      let chordIndex = 0;

      const playSineNote = (freq, startTime, duration, volume = 0.05, type = 'sine') => {
        if (!playStateRef.current || ctx.state === 'suspended') return;
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        gainNode.gain.setValueAtTime(0.001, startTime);
        gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.1);

        osc.connect(gainNode);
        gainNode.connect(filter);
        if (type === 'sine') {
          gainNode.connect(delay); // add delay to soft lead
        }

        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const playAmbientLoop = () => {
        if (!playStateRef.current) return;

        const now = ctx.currentTime;
        const chords = chordProgression[chordIndex];

        // 1. Play Chord Pad (Warm Triangle waves)
        chords.forEach((freq, i) => {
          // Stagger starting times for human touch
          const stagger = i * 0.05 + Math.random() * 0.05;
          playSineNote(freq, now + stagger, 8.0, 0.03, 'triangle');
        });

        // 2. Play Arpeggiated / Melodic soft notes
        const melodyLength = 8;
        for (let step = 0; step < melodyLength; step++) {
          if (Math.random() > 0.3) {
            const freq = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
            const noteDelay = step * 1.0 + Math.random() * 0.2;
            const volume = Math.random() * 0.02 + 0.01;
            const duration = Math.random() * 2.0 + 1.5;
            playSineNote(freq, now + noteDelay, duration, volume, 'sine');
          }
        }

        // Advance to next chord in loop
        chordIndex = (chordIndex + 1) % chordProgression.length;

        // Schedule next chord block in 8 seconds
        const timeoutId = setTimeout(playAmbientLoop, 8000);
        notesTimeoutRef.current.push(timeoutId);
      };

      // Start looping
      playAmbientLoop();

    } catch (error) {
      console.warn("Web Audio API failed to initialize:", error);
    }
  };

  const stopSynthesizer = () => {
    playStateRef.current = false;
    notesTimeoutRef.current.forEach(clearTimeout);
    notesTimeoutRef.current = [];

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Resume or start
      if (audioContextRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      } else {
        startSynthesizer();
      }
    } else {
      // Pause
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
    }

    return () => {
      // Don't close on unmount, we want the player to persist across routes!
    };
  }, [isPlaying]);

  // Handle manual tab visibility or window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend();
        }
      } else {
        if (isPlaying && audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return null;
}
