import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

export default function MemoryTree() {
  const [selectedWish, setSelectedWish] = useState(null);

  // Student wishes data
  const wishes = [
    { id: 1, name: "Asit Kumar Raut", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Thank you Mam for shaping our lives. Your dedication at Rasanga Prathamika Vidyalaya will always remain in our hearts. You are our guiding light! Happy Retirement!", x: "28%", y: "25%", color: "#fef08a" },
    { id: 2, name: "Akash Raut", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "You didn't just teach us subjects; you taught us how to be good human beings. We will always cherish your classes, Mam!", x: "36%", y: "18%", color: "#bfdbfe" },
    { id: 3, name: "Chandan Kumar Sahoo", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Your patience with us was legendary. Thank you for always answering our questions with a warm smile. Happy retirement!", x: "44%", y: "14%", color: "#bbf7d0" },
    { id: 4, name: "Bibhuprasad Swain", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Your lessons on discipline and hard work have stayed with me all these years. Thank you for being such an inspiration!", x: "52%", y: "11%", color: "#fed7aa" },
    { id: 5, name: "Susil Gochi", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "You believed in us when we were just kids and guided us toward our dreams. We are forever grateful to you, Mam!", x: "60%", y: "15%", color: "#fbcfe8" },
    { id: 6, name: "Rajendra Behera", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Thank you for the wonderful memories and the guiding values you instilled in us. Wishing you a peaceful retirement!", x: "68%", y: "20%", color: "#c7d2fe" },
    { id: 7, name: "Sumitra Swain", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Your classes were always filled with love and warmth. You are truly a second mother to all of us. Thank you, Mam!", x: "74%", y: "27%", color: "#fbcfe8" },
    { id: 8, name: "Dibyabharati Swain", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Wishing you a happy, healthy, and blessed retirement life. Your teachings will live on forever in our hearts.", x: "30%", y: "38%", color: "#bfdbfe" },
    { id: 9, name: "Jyotrimayee Swain", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Thank you for being our mentor and our guiding light. Your kindness will never be forgotten!", x: "38%", y: "30%", color: "#fef08a" },
    { id: 10, name: "Babina Sahoo", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "You made school feel like a second home. Thank you for your care, your wisdom, and your unconditional support.", x: "48%", y: "28%", color: "#bbf7d0" },
    { id: 11, name: "Sumitra Samal", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "May this new chapter of your life bring you endless peace, joy, and happiness. We will miss you so much!", x: "58%", y: "32%", color: "#fed7aa" },
    { id: 12, name: "Sunita Raut", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Thank you for always encouraging us to do our best. Your legacy will continue through all the lives you've touched.", x: "66%", y: "40%", color: "#c7d2fe" },
    { id: 13, name: "Chenmayee Behera", role: "Batch of 2012 - 2017 • Rasanga Prathamika Vidyalaya", wish: "Your guidance was the foundation of our success. Thank you for being the most amazing teacher we could ever ask for!", x: "48%", y: "44%", color: "#fbcfe8" }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] bg-black/30 rounded-3xl border border-gold-400/10 p-6 flex flex-col items-center justify-between overflow-hidden shadow-2xl backdrop-blur-sm">
      <div className="text-center z-10">
        <h3 className="font-cinzel text-xl md:text-3xl font-bold text-gold-200 tracking-wider">
          The Tree of Memories
        </h3>
        <p className="text-xs md:text-sm text-gold-300/60 uppercase tracking-widest mt-1">
          Click the glowing leaves to reveal student wishes
        </p>
      </div>

      {/* SVG Tree Structure */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-12 select-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-h-[500px]"
        >
          {/* Trunk */}
          <path
            d="M380 580 C380 500, 390 400, 370 350 C360 320, 320 280, 280 260 C240 240, 200 240, 180 250"
            stroke="#3b2314"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M420 580 C420 500, 410 400, 430 340 C450 280, 500 250, 560 220 C600 200, 640 220, 670 230"
            stroke="#3b2314"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M400 580 C400 480, 400 380, 400 300 C400 240, 410 180, 440 140 C460 110, 480 90, 500 80"
            stroke="#3b2314"
            strokeWidth="28"
            strokeLinecap="round"
          />
          {/* Main Branches */}
          <path
            d="M390 310 C360 270, 320 240, 300 200 C280 160, 290 120, 310 90"
            stroke="#3b2314"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M410 270 C440 230, 480 200, 520 180 C550 160, 570 120, 580 90"
            stroke="#3b2314"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M400 190 C380 150, 390 110, 420 80"
            stroke="#3b2314"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Interactive Leaves */}
      <div className="absolute inset-0 w-full h-full">
        {wishes.map((w) => (
          <motion.button
            key={w.id}
            onClick={() => setSelectedWish(w)}
            style={{ left: w.x, top: w.y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute p-3 rounded-full cursor-pointer hover:z-30 select-none shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.7)] group"
          >
            {/* Flapping Leaf Shape */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={w.color}
              className="transform group-hover:scale-125 transition-transform duration-300 drop-shadow-md"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 12 22 12 22C12 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" />
            </svg>
            <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 mb-1 px-2 py-0.5 bg-black/80 text-[10px] text-gold-200 border border-gold-400/20 rounded font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              {w.name.split(" ")[0]}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Ground Roots / Base details */}
      <div className="w-full h-2 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent mt-auto z-10" />

      {/* Wish Display Modal Overlay */}
      <AnimatePresence>
        {selectedWish && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[250] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWish(null)}
              className="absolute inset-0 w-full h-full bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-md glassmorphism border border-gold-300/40 rounded-2xl p-6 md:p-8 text-center text-white"
            >
              <button
                onClick={() => setSelectedWish(null)}
                className="absolute top-4 right-4 p-1.5 text-gold-300 hover:text-gold-100 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <Heart className="w-8 h-8 text-red-500 fill-red-500 mx-auto mb-4 animate-pulse" />

              <h4 className="font-playfair text-2xl font-bold text-gold-200">
                {selectedWish.name}
              </h4>
              <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block mb-4">
                {selectedWish.role}
              </span>

              <p className="font-cursive text-3xl text-gold-50/90 leading-relaxed mb-6 select-text">
                "{selectedWish.wish}"
              </p>

              <div className="w-12 h-[1px] bg-gold-400/30 mx-auto" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
