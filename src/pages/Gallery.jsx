import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calendar, User } from 'lucide-react';
import Typewriter from 'typewriter-effect';

export default function Gallery({ onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Expose the 7 images with specific quotes, styles, and animation classes
  const slides = [
    {
      url: "/images/IMG-20260727-WA0009.jpg",
      quote: "A teacher affects eternity; she can never tell where her influence stops.",
      title: "Lessons Beyond Books",
      animationType: "fade-zoom",
      aspect: "portrait"
    },
    {
      url: "/images/IMG-20260727-WA0010.jpg",
      quote: "Your lessons shaped our future, and your kindness opened our minds.",
      title: "Shaping Generations",
      animationType: "card-flip",
      aspect: "landscape"
    },
    {
      url: "/images/IMG-20260727-WA0011.jpg",
      quote: "Thank you for believing in us, even when we struggled to believe in ourselves.",
      title: "Unconditional Belief",
      animationType: "slide-up",
      aspect: "portrait"
    },
    {
      url: "/images/IMG-20260728-WA0002.jpg",
      quote: "Your kindness and gentle guidance will always be remembered.",
      title: "Gentle Guidance",
      animationType: "rotate-frame",
      aspect: "portrait"
    },
    {
      url: "/images/InShot_20260728_080344596.png",
      quote: "You inspired generations of dreamers, thinkers, and doers.",
      title: "Inspiring Dreams",
      animationType: "polaroid-float",
      aspect: "landscape"
    },
    {
      url: "/images/Picsart_26-07-28_10-00-00-108.png",
      quote: "You will forever remain in our hearts, Mam.",
      title: "Forever in Our Hearts",
      animationType: "glass-reveal",
      aspect: "landscape"
    },
    {
      url: "/images/Screenshot_2026-07-27-15-28-45-604_com.whatsapp-edit.jpg",
      quote: "A truly great teacher is hard to find, difficult to part with, and impossible to forget.",
      title: "The Ultimate Mentor",
      animationType: "crystal-zoom",
      aspect: "portrait"
    }
  ];

  // Auto progression
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 9000); // 9 seconds per slide to read quotes and view images

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      // Trigger cinematic exit transition to Thank You page
      onComplete();
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  // Select transition variants based on animation type
  const getVariants = (type) => {
    switch (type) {
      case "card-flip":
        return {
          initial: { rotateY: 90, opacity: 0, scale: 0.8 },
          animate: { rotateY: 0, opacity: 1, scale: 1 },
          exit: { rotateY: -90, opacity: 0, scale: 0.8 }
        };
      case "slide-up":
        return {
          initial: { y: 150, opacity: 0, scale: 0.95 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: -150, opacity: 0, scale: 0.95 }
        };
      case "rotate-frame":
        return {
          initial: { rotate: -8, opacity: 0, scale: 0.9 },
          animate: { rotate: 0, opacity: 1, scale: 1 },
          exit: { rotate: 8, opacity: 0, scale: 0.9 }
        };
      case "polaroid-float":
        return {
          initial: { y: 80, x: -20, rotate: -4, opacity: 0 },
          animate: { y: 0, x: 0, rotate: 2, opacity: 1 },
          exit: { y: -80, x: 20, rotate: 4, opacity: 0 }
        };
      case "glass-reveal":
        return {
          initial: { filter: 'blur(20px)', opacity: 0, scale: 1.1 },
          animate: { filter: 'blur(0px)', opacity: 1, scale: 1 },
          exit: { filter: 'blur(20px)', opacity: 0, scale: 0.9 }
        };
      case "crystal-zoom":
        return {
          initial: { scale: 1.3, opacity: 0, filter: 'contrast(1.5)' },
          animate: { scale: 1, opacity: 1, filter: 'contrast(1)' },
          exit: { scale: 0.7, opacity: 0, filter: 'contrast(1.5)' }
        };
      case "fade-zoom":
      default:
        return {
          initial: { scale: 1.08, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.95, opacity: 0 }
        };
    }
  };

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-12 px-4 md:px-8 select-none z-10">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-gold-400/5 to-transparent blur-3xl pointer-events-none" />

      {/* Elegant Top Header Navigation */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-20">
        <div className="flex flex-col">
          <span className="font-cinzel text-xs md:text-sm tracking-widest text-gold-300 font-bold uppercase">
            Interactive Tribute
          </span>
          <span className="text-[10px] md:text-xs text-gold-400/60 uppercase tracking-widest mt-1">
            Section II • The Gallery of Honor
          </span>
        </div>
        <div className="text-xs md:text-sm text-gold-300/80 uppercase tracking-widest font-semibold bg-gold-950/40 border border-gold-400/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Interactive Photo Canvas Frame Area */}
      <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center min-h-[50vh] z-20">
        <div className="relative w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={getVariants(activeSlide.animationType)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative max-w-full ${
                activeSlide.aspect === 'portrait' 
                  ? 'w-[85vw] max-w-[350px] h-[55vh] max-h-[480px]' 
                  : 'w-[90vw] max-w-[640px] h-[45vh] max-h-[380px]'
              } flex flex-col`}
            >
              {/* Premium Luxury Frame */}
              <div className="absolute inset-0 bg-[#0d0907] rounded-2xl p-3 shadow-2xl border border-gold-300/30 overflow-hidden group">
                {/* Mirror reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10 transition-all duration-700 group-hover:translate-x-full" />
                
                {/* Gold Inner Bevel */}
                <div className="w-full h-full border border-gold-500/20 rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img
                    src={activeSlide.url}
                    alt={activeSlide.title}
                    className="w-full h-full object-contain select-none pointer-events-none"
                    loading="lazy"
                  />
                  {/* Subtle vignette filter inside photo */}
                  <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/45 pointer-events-none" />
                </div>
              </div>

              {/* Floating metadata badge inside frame */}
              <div className="absolute top-6 left-6 z-20 flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest bg-black/60 border border-gold-400/20 text-gold-300 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <User className="w-3 h-3 text-gold-400" />
                  Mam
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Bottom Quote & Controls */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 z-20">
        {/* Animated quote message container */}
        <div className="text-center min-h-[80px] flex items-center justify-center px-4 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h4 className="font-playfair text-xl md:text-2xl text-gold-100 font-medium tracking-wide leading-relaxed italic select-text">
                <Typewriter
                  options={{
                    strings: [`"${activeSlide.quote}"`],
                    autoStart: true,
                    delay: 45,
                    cursor: "",
                    deleteSpeed: 9999999
                  }}
                />
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Navigation Controls */}
        <div className="flex items-center gap-10">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`p-3 md:p-4 rounded-full border border-gold-400/30 text-gold-300 hover:text-gold-100 flex items-center justify-center transition-all duration-300 shadow-md ${
              activeIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'bg-gold-950/40 hover:bg-gold-900 cursor-pointer active:scale-95 shadow-gold-500/10'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="px-6 md:px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-gold-950 font-bold uppercase text-xs tracking-widest rounded-full cursor-pointer flex items-center gap-2 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-95 transition-all duration-300"
          >
            <span>{activeIndex === slides.length - 1 ? "Proceed to Wishes" : "Next Photo"}</span>
            <ChevronRight className="w-4 h-4 text-gold-950" />
          </button>
        </div>
      </div>
    </div>
  );
}
