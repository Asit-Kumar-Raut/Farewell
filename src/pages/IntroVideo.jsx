import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);

  useEffect(() => {
    // Attempt auto play with sound since user already interacted with the site
    if (videoRef.current) {
      videoRef.current.play()
        .catch((err) => {
          console.warn("Autoplay blocked by browser. Showing manual play overlay:", err);
          setShowPlayOverlay(true);
        });
    }
  }, []);

  const handleVideoEnded = () => {
    onComplete();
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setShowPlayOverlay(false);
        })
        .catch((err) => {
          console.error("Manual play failed:", err);
          // Play muted as a final fallback
          videoRef.current.muted = true;
          videoRef.current.play();
          setShowPlayOverlay(false);
        });
    }
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
        src="/Video/intro.mp4"
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/80" />

      {/* Interactive Fallback Play Overlay (Shown only if browser blocks autoplay) */}
      <AnimatePresence>
        {showPlayOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-95 text-center px-6"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayClick}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 border border-gold-300 flex items-center justify-center shadow-lg shadow-gold-500/30 cursor-pointer mb-6"
            >
              {/* Play SVG Icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#2c1d11"
                className="ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
            <h3 className="font-cinzel text-xl text-gold-200 tracking-wider font-bold mb-2">
              Play Tribute Movie
            </h3>
            <p className="text-xs text-gold-100/60 uppercase tracking-widest">
              Click to start playback with sound
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
