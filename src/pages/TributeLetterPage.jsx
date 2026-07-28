import React from 'react';
import { motion } from 'framer-motion';
import WaxSealLetter from '../components/WaxSealLetter';

export default function TributeLetterPage({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.0 }}
      className="fixed inset-0 w-full h-full bg-[#0d0907] flex flex-col items-center justify-center z-[90] p-6 text-center select-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(217,158,11,0.03) 0%, rgba(11,7,5,0) 70%)'
      }}
    >
      {/* Background Parallax Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 rounded-full bg-gold-400 blur-[1px]"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-xl flex flex-col items-center gap-6 z-10">
        <span className="font-cinzel text-xs md:text-sm tracking-widest text-gold-400 font-bold uppercase">
          A Letter of Gratitude
        </span>
        <h2 className="font-playfair text-3xl md:text-4xl text-gold-100 font-medium tracking-wide leading-relaxed italic">
          "To the mentor who shaped our paths..."
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mx-auto mb-4" />
        
        {/* The interactive wax seal letter */}
        <WaxSealLetter onLetterClose={onComplete} />
      </div>
    </motion.div>
  );
}
