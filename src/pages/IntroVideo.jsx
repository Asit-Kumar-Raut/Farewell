import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt auto play with sound since user already interacted with the letter
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Auto-play failed, playing muted as fallback:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, []);

  const handleVideoEnded = () => {
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
        src="/Video/Free_Farewell_Wishes_for_Teacher_Video_Template__Customizable__-_FlexClip%28720p%29.mp4"
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* Cinematic Vignette Overlay to maintain premium movie feel */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/80" />
    </motion.div>
  );
}
