import React from 'react';
import { motion } from 'framer-motion';

export default function RibbonDivider() {
  return (
    <div className="relative w-full h-12 flex items-center justify-center my-16 overflow-hidden">
      {/* Golden Glowing horizontal line */}
      <div className="absolute w-full h-[1px] bg-gradient-to-right from-transparent via-gold-400/60 to-transparent shadow-[0_0_8px_#fbbf24]" />

      {/* Ribbon Shape */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Red Ribbon Left */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="w-16 h-4 ribbon-gradient rounded-l-sm transform -skew-x-12"
        />

        {/* Central Golden Medal/Shield */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
          className="w-8 h-8 rounded-full bg-gradient-to-b from-gold-200 to-gold-600 border-2 border-gold-100 flex items-center justify-center shadow-lg shadow-gold-500/20 mx-1 z-20"
        >
          <span className="text-[10px] font-black text-gold-950 font-cinzel">❤</span>
        </motion.div>

        {/* Red Ribbon Right */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="w-16 h-4 ribbon-gradient rounded-r-sm transform skew-x-12"
        />
      </div>
      
      {/* Light Rays flare */}
      <div className="absolute w-40 h-40 bg-radial from-gold-300/10 to-transparent blur-xl pointer-events-none" />
    </div>
  );
}
