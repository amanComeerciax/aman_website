"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    const startTime = Date.now();
    const duration = 2700;

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    requestAnimationFrame(frame);

    return () => clearInterval(wordInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10 lg:p-16">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display tabular-nums text-text-primary mb-4">
          {String(count).padStart(3, "0")}
        </div>
        <div className="w-full max-w-[200px] h-[3px] bg-stroke/50 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 accent-gradient shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
