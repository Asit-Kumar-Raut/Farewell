import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GrandOpening from './pages/GrandOpening';
import TributeLetterPage from './pages/TributeLetterPage';
import IntroVideo from './pages/IntroVideo';
import Gallery from './pages/Gallery';
import ThankYou from './pages/ThankYou';
import Background from './components/Background';
import FlowerRain from './components/FlowerRain';
import AudioPlayer from './components/AudioPlayer';
import ParticleTrail from './components/ParticleTrail';

export default function App() {
  // Navigation phases: 'opening', 'letter', 'video', 'gallery', 'thankyou'
  const [phase, setPhase] = useState('opening');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const handleOpeningComplete = () => {
    setPhase('letter');
    // Start background music immediately upon opening finish
    setIsSoundPlaying(true);
  };

  const handleLetterComplete = () => {
    setPhase('video');
    // Temporarily stop background music during video phase so video audio can be heard
    setIsSoundPlaying(false);
  };

  const handleVideoComplete = () => {
    setPhase('gallery');
    // Resume atmospheric music for the rest of the journey
    setIsSoundPlaying(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0705] text-[#f3f4f6] overflow-x-hidden selection:bg-gold-500 selection:text-gold-950">
      
      {/* Persisted Audio player for seamless background music */}
      <AudioPlayer isPlaying={isSoundPlaying} setIsPlaying={setIsSoundPlaying} />

      {/* Global canvas animations active during interactive stages */}
      {(phase === 'letter' || phase === 'gallery' || phase === 'thankyou') && (
        <>
          <Background />
          <FlowerRain />
          <ParticleTrail />
        </>
      )}

      {/* Main navigation screen states */}
      <AnimatePresence mode="wait">
        {phase === 'opening' && (
          <motion.div
            key="opening"
            exit={{ opacity: 0, filter: 'brightness(1.5)' }}
            transition={{ duration: 1.5 }}
          >
            <GrandOpening 
              onComplete={handleOpeningComplete} 
              isSoundPlaying={isSoundPlaying}
              setIsSoundPlaying={setIsSoundPlaying}
            />
          </motion.div>
        )}

        {phase === 'letter' && (
          <motion.div
            key="letter"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.0 }}
          >
            <TributeLetterPage onComplete={handleLetterComplete} />
          </motion.div>
        )}

        {phase === 'video' && (
          <motion.div
            key="video"
            exit={{ opacity: 0, filter: 'brightness(1.8) blur(8px)' }}
            transition={{ duration: 1.2 }}
          >
            <IntroVideo onComplete={handleVideoComplete} />
          </motion.div>
        )}

        {phase === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1.2 }}
          >
            <Gallery onComplete={() => setPhase('thankyou')} />
          </motion.div>
        )}

        {phase === 'thankyou' && (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <ThankYou />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
