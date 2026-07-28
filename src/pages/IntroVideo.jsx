import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolumePrompt, setShowVolumePrompt] = useState(true);

  useEffect(() => {
    // Attempt auto play
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Auto-play failed, waiting for user interaction:", err);
      });
    }

    // Auto dismiss volume prompt after 6 seconds
    const timer = setTimeout(() => {
      setShowVolumePrompt(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnded = () => {
    // Smooth transition
    onComplete();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !videoRef.current.muted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
      setShowVolumePrompt(false);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'brightness(1.5) blur(10px)' }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="fixed inset-0 w-full h-full bg-black z-90 overflow-hidden flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="/Video/Free_Farewell_Wishes_for_Teacher_Video_Template__Customizable__-_FlexClip(720p).mp4"
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={handleVideoEnded}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/80" />

      {/* Subtle Volume Alert/Prompt */}
      {showVolumePrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute bottom-28 left-1/2 transform -translate-x-1/2 glassmorphism px-6 py-3 rounded-full border border-gold-400/30 text-gold-200 text-sm tracking-wider flex items-center gap-3 shadow-2xl"
        >
          <span>🎵 Experience the music and voiceover!</span>
          <button
            onClick={toggleMute}
            className="px-3 py-1 bg-gold-400 text-gold-950 font-bold rounded-full text-xs uppercase cursor-pointer hover:bg-gold-300 transition-colors"
          >
            Unmute
          </button>
        </motion.div>
      )}

      {/* Floating Header Label */}
      <div className="absolute top-8 left-8 tracking-widest text-gold-300/60 uppercase text-xs font-semibold font-cinzel">
        Tribute Cinematic Intro
      </div>

      {/* Custom Control Buttons in corners */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-95">
        {/* Unmute/Mute Toggle */}
        <button
          onClick={toggleMute}
          className="p-3 bg-black/60 hover:bg-gold-950/80 border border-gold-400/20 text-gold-200 hover:text-gold-100 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-md"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Skip Video */}
        <button
          onClick={handleSkip}
          className="px-5 py-2.5 bg-black/60 hover:bg-gold-950/80 border border-gold-400/30 text-gold-300 hover:text-gold-100 font-semibold tracking-wider text-xs uppercase rounded-full cursor-pointer flex items-center gap-2 transition-all duration-300 backdrop-blur-md"
        >
          <span>Skip Video</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
