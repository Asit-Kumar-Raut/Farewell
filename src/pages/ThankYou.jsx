import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import RibbonDivider from '../components/RibbonDivider';
import WaxSealLetter from '../components/WaxSealLetter';
import MemoryTree from '../components/MemoryTree';
import { Heart, BookOpen, GraduationCap, Award, Quote, Linkedin, Instagram } from 'lucide-react';

export default function ThankYou() {
  const [walkthroughActive, setWalkthroughActive] = useState(true);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  // Disable walkthrough on mobile devices to prevent layout truncation
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setWalkthroughActive(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger continuous golden fireworks/confetti during Thank You page mount
  useEffect(() => {
    const duration = 12 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 90 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#fbbf24', '#fde68a'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#fbbf24', '#fde68a'] });
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  // Step sequencer for the automatic cinematic walkthrough (First visit scroll lock)
  useEffect(() => {
    if (!walkthroughActive) return;

    const timings = [
      4500, // Step 0: Climax Banner
      5000, // Step 1: Tribute Letter
      8500, // Step 2: Memory Tree
      6000, // Step 3: Timeline
      6000, // Step 4: Footer
    ];

    let currentStep = 0;
    
    const runStep = () => {
      if (currentStep < timings.length - 1) {
        currentStep++;
        setWalkthroughStep(currentStep);
        setTimeout(runStep, timings[currentStep]);
      } else {
        // Step 5: Animate back to top smoothly
        setTimeout(() => {
          setWalkthroughStep(0); // slide back to top
          // Wait for slide-back animation to finish, then unlock scroll!
          setTimeout(() => {
            setWalkthroughActive(false);
          }, 2200);
        }, 3000);
      }
    };

    // Start sequence
    const initialTimer = setTimeout(runStep, timings[0]);

    return () => clearTimeout(initialTimer);
  }, [walkthroughActive]);

  // Timeline events
  const timelineEvents = [
    {
      year: "2012 - 2017",
      title: "Rasanga Prathamika Vidyalaya",
      desc: "Our golden batch! The years where you nurtured our foundational dreams and guided us with infinite warmth and love.",
      icon: BookOpen,
    },
    {
      year: "The Journey",
      title: "Nurturing Talents",
      desc: "Countless hours spent explaining complex concepts, building confidence, and showing compassion to every single student.",
      icon: GraduationCap,
    },
    {
      year: "The Legacy",
      title: "Mentorship and Wisdom",
      desc: "Becoming a guide, a second mother, and a counselor. Standing strong as an inspiration to students across generations.",
      icon: Award,
    },
  ];

  // Images for Heart-shaped Collage (using the 7 local photos)
  const collageImages = [
    { url: "/images/IMG-20260727-WA0009.jpg", rotate: -5, scale: 0.95, gridArea: "col-start-1 col-end-3 row-start-1" },
    { url: "/images/IMG-20260727-WA0010.jpg", rotate: 3, scale: 1.0, gridArea: "col-start-3 col-end-5 row-start-1" },
    { url: "/images/IMG-20260727-WA0011.jpg", rotate: -2, scale: 0.9, gridArea: "col-start-5 col-end-7 row-start-1" },
    { url: "/images/IMG-20260728-WA0002.jpg", rotate: 6, scale: 1.02, gridArea: "col-start-2 col-end-4 row-start-2" },
    { url: "/images/InShot_20260728_080344596.png", rotate: -4, scale: 0.98, gridArea: "col-start-4 col-end-6 row-start-2" },
    { url: "/images/Picsart_26-07-28_10-00-00-108.png", rotate: 5, scale: 0.95, gridArea: "col-start-1 col-end-4 row-start-3" },
    { url: "/images/Screenshot_2026-07-27-15-28-45-604_com.whatsapp-edit.jpg", rotate: -3, scale: 1.0, gridArea: "col-start-4 col-end-7 row-start-3" }
  ];

  return (
    <div 
      className={
        walkthroughActive 
          ? "fixed inset-0 w-full h-screen overflow-hidden bg-[#090605]" 
          : "relative w-full min-h-screen z-10 flex flex-col items-center justify-start select-none"
      }
    >
      {/* Golden progress indicator banner during walkthrough */}
      <AnimatePresence>
        {walkthroughActive && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 w-full bg-gradient-to-r from-gold-950/90 via-gold-900/95 to-gold-950/90 border-b border-gold-400/20 text-center py-2.5 z-[200] backdrop-blur-md"
          >
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-semibold text-gold-200 uppercase animate-pulse">
              ✨ Cinematic Presentation (Auto-Scrolling Walkthrough) ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Inner Wrapper with programmatic CSS Translation */}
      <div 
        className={walkthroughActive ? "w-full h-full transition-transform duration-1000 ease-in-out" : "w-full"}
        style={walkthroughActive ? { transform: `translateY(-${walkthroughStep * 100}vh)` } : {}}
      >
        
        {/* Section 1: Grand Climax Banner */}
        <section 
          className={
            walkthroughActive 
              ? "w-full h-screen flex flex-col items-center justify-center flex-shrink-0 relative text-center overflow-hidden px-4" 
              : "min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 relative text-center"
          }
        >
          {/* Floating Paper Lanterns Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  scale: Math.random() * 0.4 + 0.4,
                  opacity: 0,
                }}
                animate={{
                  y: -150,
                  opacity: [0, 0.7, 0.7, 0],
                  x: [null, Math.random() * 100 - 50 + (i * 10)],
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Infinity,
                  delay: i * 2.5,
                }}
                className="absolute w-8 h-12 bg-gradient-to-t from-gold-900 to-gold-400 rounded-md border border-gold-200/20 shadow-lg shadow-gold-500/20 flex flex-col justify-between p-1"
              >
                <div className="w-full h-1/2 border-b border-gold-400/20 text-[6px] text-center text-gold-100/40">TY</div>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-200 mx-auto animate-pulse" />
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mb-4"
          >
            <Heart className="w-12 h-12 text-red-500 fill-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </motion.div>

          <h2 className="font-cinzel text-4xl md:text-7xl lg:text-8xl font-black tracking-widest text-gold-gradient drop-shadow-[0_10px_25px_rgba(217,119,6,0.3)] mb-4">
            THANK YOU MAM ❤️
          </h2>
          
          <p className="font-playfair text-base md:text-xl lg:text-2xl text-gold-100 max-w-2xl mx-auto italic font-medium tracking-wide leading-relaxed px-4 mb-10">
            "A great teacher never truly retires... she lives forever in the hearts of her students."
          </p>

          {/* Heart-Shaped Collage of the 7 Photos (Desktop/Tablet Layout) */}
          <div className="hidden md:block w-full max-w-3xl mx-auto px-4 scale-90 md:scale-100">
            <div className="grid grid-cols-6 gap-3 items-center justify-center">
              {collageImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  whileInView={{ opacity: 1, scale: img.scale, rotate: img.rotate }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
                  transition={{ duration: 1.0, delay: idx * 0.1 }}
                  className={`glassmorphism-card p-1.5 rounded-xl overflow-hidden shadow-2xl cursor-pointer ${img.gridArea}`}
                >
                  <div className="w-full h-24 md:h-36 rounded-lg overflow-hidden border border-gold-400/20 relative">
                    <img src={img.url} alt="Memory" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/20 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Large Stacking List (Mobile layout as requested - bigger photos, one under another) */}
          <div className="grid grid-cols-1 gap-6 md:hidden items-center justify-center px-4 w-full max-w-xs mx-auto mb-8">
            {collageImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className="glassmorphism-card p-2 rounded-2xl overflow-hidden shadow-xl cursor-pointer w-full"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border border-gold-400/20 relative">
                  <img src={img.url} alt="Memory" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll prompter visible only when scroll is unlocked */}
          {!walkthroughActive && (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-[9px] tracking-widest text-gold-400/50 uppercase font-bold">Scroll Down to Explore</span>
              <div className="w-[1px] h-6 bg-gradient-to-b from-gold-400/60 to-transparent shadow-[0_0_4px_#fbbf24]" />
            </motion.div>
          )}
        </section>

        {walkthroughActive ? null : <RibbonDivider />}

        {/* Section 2: Appreciation Letter Section */}
        <section 
          className={
            walkthroughActive 
              ? "w-full h-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden px-6" 
              : "w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center mx-auto"
          }
        >
          <h3 className="font-cinzel text-xl md:text-3xl font-bold text-gold-200 tracking-wider mb-2">
            A Message of Honor
          </h3>
          <p className="text-xs md:text-sm text-gold-400/60 uppercase tracking-widest max-w-md mx-auto mb-6">
            Click the wax seal to unfold our letters of gratitude
          </p>
          <WaxSealLetter />
        </section>

        {walkthroughActive ? null : <RibbonDivider />}

        {/* Section 3: The Memory Tree Section */}
        <section 
          className={
            walkthroughActive 
              ? "w-full h-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden px-6" 
              : "w-full max-w-5xl px-6 py-12 flex flex-col items-center mx-auto"
          }
        >
          <MemoryTree />
        </section>

        {walkthroughActive ? null : <RibbonDivider />}

        {/* Section 4: Career Timeline Section */}
        <section 
          className={
            walkthroughActive 
              ? "w-full h-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden px-6" 
              : "w-full max-w-4xl px-6 py-12 flex flex-col items-center mx-auto"
          }
        >
          <h3 className="font-cinzel text-xl md:text-3xl font-bold text-gold-200 tracking-wider text-center mb-10 md:mb-16">
            The Legacy Timeline
          </h3>

          <div className="relative w-full border-l border-gold-400/20 ml-2 md:ml-0 md:left-1/2 md:transform md:-translate-x-1/2 max-w-2xl">
            {timelineEvents.map((ev, idx) => {
              const Icon = ev.icon;
              const isLeft = idx % 2 === 0;

              return (
                <div key={idx} className="relative mb-10 md:mb-16 w-full flex flex-col md:flex-row md:justify-between items-start md:items-center">
                  <div className="absolute -left-[17px] md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gold-950 border border-gold-300 shadow-md shadow-gold-500/20 flex items-center justify-center z-20">
                    <Icon className="w-4 h-4 text-gold-400" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`w-full md:w-[45%] pl-6 md:pl-0 ${isLeft ? 'md:text-right' : 'md:text-left ml-auto'}`}
                  >
                    <div className="glassmorphism-card p-4 md:p-6 rounded-2xl border border-gold-400/10 hover:border-gold-400/30 transition-all duration-300">
                      <span className="font-cinzel text-[10px] md:text-xs text-gold-400 font-bold tracking-widest block mb-1">
                        {ev.year}
                      </span>
                      <h4 className="font-playfair text-base md:text-lg text-gold-100 font-semibold mb-2">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-gold-200/70 leading-relaxed font-sans select-text">
                        {ev.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {walkthroughActive ? null : <RibbonDivider />}

        {/* Section 5: Grand Finale / Footer */}
        <section 
          className={
            walkthroughActive 
              ? "w-full h-screen flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden px-6" 
              : "w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 relative text-center"
          }
        >
          {/* Floating candles Near Footer */}
          <div className="absolute bottom-16 left-12 flex flex-col items-center gap-1.5 z-20 pointer-events-none opacity-40">
            <div className="w-2.5 h-3 bg-amber-400/60 rounded-full blur-[2px] animate-pulse" />
            <div className="w-4 h-12 bg-white/20 border border-white/10 rounded-sm" />
          </div>
          <div className="absolute bottom-16 right-12 flex flex-col items-center gap-1.5 z-20 pointer-events-none opacity-40">
            <div className="w-2.5 h-3 bg-amber-400/60 rounded-full blur-[2px] animate-pulse" />
            <div className="w-4 h-12 bg-white/20 border border-white/10 rounded-sm" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.0 }}
            className="max-w-3xl flex flex-col items-center"
          >
            <Quote className="w-8 h-8 text-gold-400/40 mb-6" />

            <h3 className="font-cinzel text-xl md:text-3xl font-black text-gold-gradient tracking-widest leading-relaxed mb-4">
              FOREVER IN OUR HEARTS
            </h3>

            <p className="font-cursive text-3xl md:text-5xl text-gold-100 leading-loose max-w-2xl mx-auto italic mb-8 select-text">
              "A Great Teacher Never Truly Retires... She Lives Forever in the Hearts of Her Students."
            </p>

            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] font-bold text-gold-400/50 uppercase block mb-6">
              Presented with love, admiration, and respect • July 2026
            </span>

            <div className="flex flex-col items-center gap-3 mt-6 border-t border-gold-400/10 pt-6">
              <span className="text-[11px] tracking-widest text-gold-200/60 uppercase font-semibold">
                Developed with Love by Asit
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/asit-kumar-raut-275845322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gold-950/40 hover:bg-gold-900 border border-gold-400/20 text-gold-400 hover:text-gold-200 rounded-full transition-all duration-300 shadow-md hover:shadow-gold-500/10 cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://www.instagram.com/_asit.0.__/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gold-950/40 hover:bg-gold-900 border border-gold-400/20 text-gold-400 hover:text-gold-200 rounded-full transition-all duration-300 shadow-md hover:shadow-gold-500/10 cursor-pointer"
                  title="Instagram Profile"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
