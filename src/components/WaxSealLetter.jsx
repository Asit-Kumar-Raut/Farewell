import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function WaxSealLetter({ onLetterClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onLetterClose) {
      onLetterClose();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      {/* Letter Envelope Trigger */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="relative w-80 h-52 bg-[#f6ecd2] border-2 border-gold-400/30 rounded-lg shadow-2xl cursor-pointer overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-gold-500/20 group"
      >
        {/* Envelope folds design */}
        <div className="absolute inset-0 bg-radial from-transparent to-[#e4ce9b]/30 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        
        {/* Simulated envelope flap line */}
        <div className="absolute top-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[100px] border-t-[#ebd8ae] drop-shadow-sm group-hover:border-t-[#e2ce9f]" />

        {/* Outer Ribbon Wrap */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-8 h-full bg-red-700/80 border-x border-gold-300/30 z-10 flex items-center justify-center" />

        {/* Central Red Wax Seal */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-16 h-16 rounded-full bg-radial from-red-600 to-red-900 border-2 border-red-500 shadow-lg shadow-black/60 flex items-center justify-center cursor-pointer"
          >
            {/* Wax Seal pattern */}
            <div className="w-12 h-12 rounded-full border border-dashed border-red-400/40 flex items-center justify-center text-white font-serif font-black text-lg select-none">
              M
            </div>
          </motion.div>
        </div>

        <span className="absolute bottom-4 text-xs font-semibold tracking-widest text-gold-950 uppercase font-sans z-10">
          Click to Open Letter
        </span>
      </motion.div>

      {/* Unfolded Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[200] px-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-md"
            />

            {/* Letter Sheet */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-full max-w-2xl bg-[#faf5e9] border border-gold-200/50 rounded-md shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[85vh] text-[#2c1d11]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(230,210,180,0.1) 0%, rgba(220,195,160,0.15) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(139, 92, 26, 0.1)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#5c4028] hover:text-[#2c1d11] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Decorative Header */}
              <div className="text-center mb-8">
                <span className="font-cinzel text-xs tracking-widest uppercase text-[#8b5a2b] font-bold block mb-2">
                  Retirement Tribute Letter
                </span>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8b5a2b]/40 to-transparent mx-auto" />
              </div>

              {/* Letter content */}
              <div className="font-cursive text-3xl md:text-4xl text-[#3b2314] leading-loose space-y-6 text-center select-text">
                <p>Dear Mam,</p>
                <p>
                  As you step into this beautiful new chapter of retirement, we want to express our deepest gratitude.
                </p>
                <p>
                  You didn't just teach us lessons from textbooks; you taught us how to navigate life with grace, courage, and integrity.
                </p>
                <p>
                  Your classrooms were filled with warmth, and your guidance was a constant guiding light in our lives.
                </p>
                <p>
                  You believed in us when we struggled to believe in ourselves.
                </p>
                <p>
                  Though you are retiring from active duty, the impact of your teachings will live on forever in the hearts and minds of the generations of students you have shaped.
                </p>
                <p>
                  Thank you for being our teacher, our mentor, and our second mother.
                </p>
                <p className="pt-4 font-sans text-xs tracking-widest text-[#8b5a2b] uppercase font-bold not-italic">
                  With endless love and respect,
                </p>
                <p className="font-cursive text-4xl text-[#7f1d1d] font-bold">
                  Your Beloved Students ❤️
                </p>
              </div>

              {/* Bottom decorative seal mark */}
              <div className="mt-8 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-red-800/20 border border-red-800/30 flex items-center justify-center text-xs font-serif font-black text-red-800 select-none">
                  M
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
