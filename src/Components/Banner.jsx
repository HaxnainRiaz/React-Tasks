'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = ({ onAnimationComplete }) => {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Disable scrolling while banner visible
    document.body.style.overflow = 'hidden';

    const handleScroll = () => {
      if (!slideUp) setSlideUp(true); // trigger animation
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [slideUp]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: slideUp ? '-100%' : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          if (slideUp) {
            document.body.style.overflow = 'auto'; // enable scroll after animation
            if (onAnimationComplete) onAnimationComplete();
          }
        }}
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-[#FF842D] to-[#FF2D55] z-[100] flex flex-col items-center justify-center"
      >
        <h1 className="text-white text-6xl font-bold text-center">
          Welcome to Astra
        </h1>
        <p className="text-white text-xl mt-6 text-center">
          Unifying partners with secure, compliant & seamless solutions.
        </p>

        {/* Scroll down arrow */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-16"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Banner;
