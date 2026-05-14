"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const PullStringThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
  const y = useMotionValue(0);
  const controls = useAnimation();
  
  const threshold = 100;
  const stringLength = 80;
  const stringThickness = 2;

  useEffect(() => {
    // Initial check (assume dark mode by default for this portfolio)
    setIsDark(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    // Toggle the class on html
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (y.get() > threshold) {
      toggleTheme();
    }
    controls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
  };

  const path = useTransform(y, (yValue) => `M 24 0 L 24 ${stringLength + yValue}`);
  
  const iconColor = isDark ? "#ffffff" : "#1a1a1a";
  const lineColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const handleBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <div className="fixed top-0 right-6 md:right-12 w-12 h-64 z-[9999] pointer-events-none flex justify-center">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.path 
          d={path} 
          stroke={lineColor} 
          strokeWidth={stringThickness} 
          strokeLinecap="round" 
          fill="none" 
        />
      </svg>
      
      <motion.div
        className="pointer-events-auto cursor-grab active:cursor-grabbing absolute flex items-center justify-center backdrop-blur-md rounded-full shadow-lg border"
        style={{ 
          top: stringLength, 
          y,
          width: 36,
          height: 36,
          backgroundColor: handleBg,
          borderColor: lineColor
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 120 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Sun */}
          <motion.svg 
            viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            animate={{ rotate: isDark ? 90 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>

          {/* Moon */}
          <motion.svg 
            viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            initial={{ scale: 0, rotate: -90 }}
            animate={{ rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        </div>
      </motion.div>
    </div>
  );
};

export default PullStringThemeToggle;
