"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import ShinyText from "./ui/ShinyText";

const Counter = ({ value, color }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isCGPA = value.includes("CGPA");
  useEffect(() => {
    const controls = animate(0, targetValue, {
      duration: 1.8, ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [targetValue]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-6xl font-display italic font-light" style={{ color }}>
        {isCGPA ? displayValue.toFixed(2) : Math.round(displayValue)}
        <span className="text-lg md:text-xl ml-1 opacity-50 lowercase">{isCGPA ? "cgpa" : "%"}</span>
      </span>
    </div>
  );
};

const Education = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const data = [
    {
      title: "Integrated Master of Computer Application",
      institution: "LJ University, Ahmedabad",
      period: "2021 - 2026", grade: "8.04 CGPA",
      description: "Completed Integrated Master's in Computer Application (IMCA) from LJ University, deepening my understanding of computing and technology.",
      tags: ["Data Structures", "Algorithms", "Web Dev", "DBMS"],
      image: "/images/lj.png",
      accent: "#1a5276"
    },
    {
      title: "GSEB 12th — Commerce",
      institution: "Jay Ambe GHS School",
      period: "2020 - 2021", grade: "67%",
      description: "Completed class 12 education from Jay Ambe GHS School, Ahmedabad. Built foundation in commerce, accountancy, and finance.",
      tags: ["Economics", "Accountancy", "Business", "Stats"],
      image: "/images/school-BnQQPdZR.png",
      accent: "#6c3483"
    },
    {
      title: "GSEB 10th",
      institution: "Jay Ambe GHS School",
      period: "2018 - 2019", grade: "63%",
      description: "Completed class 10 education from Jay Ambe GHS School, Ahmedabad, under the GSEB board.",
      tags: ["Science", "Maths", "Social", "English"],
      image: "/images/school-BnQQPdZR.png",
      accent: "#1e8449"
    }
  ];

  const bookW = isMobile ? 260 : 380;
  const bookH = isMobile ? 370 : 520;
  const coverAngle = isOpen ? -180 : 0;

  const handleBookClick = () => {
    if (!isOpen) { setIsOpen(true); return; }
    setActiveIdx((prev) => (prev + 1) % data.length);
  };

  const cur = data[activeIdx];

  return (
    <section id="education" className="relative py-20 md:py-32 bg-transparent overflow-hidden font-sans">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12 md:mb-20 relative z-20 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
          <div className="w-8 h-px bg-[#00d1b2]/50" />
          <span className="text-xs text-muted uppercase tracking-[0.4em] font-medium">Learning Journey</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-body text-white">
          Scholastic <ShinyText text="History" className="font-display italic" color="#00d1b2" shineColor="#ffffff" speed={3} />
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[450px] md:min-h-[650px] w-full relative">
        {/* Book Container */}
        <div
          className="relative cursor-pointer"
          style={{ width: bookW, height: bookH, perspective: 1200, transformStyle: "preserve-3d" }}
          onMouseEnter={() => !isMobile && setIsOpen(true)}
          onMouseLeave={() => { if (!isMobile) { setIsOpen(false); setActiveIdx(0); } }}
          onClick={handleBookClick}
        >
          {/* ===== PAGES BEHIND THE COVER ===== */}
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {/* Base back cover/paper just in case */}
            <div className="absolute inset-0 rounded-r-md overflow-hidden" style={{
              background: "linear-gradient(135deg, #faf6ef 0%, #f0e9dc 60%, #e8e0d0 100%)",
              boxShadow: "inset 2px 0 12px rgba(0,0,0,0.06), 0 8px 30px rgba(0,0,0,0.3)",
              border: "1px solid rgba(180,170,150,0.3)",
              transform: "translateZ(-5px)",
            }}>
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
            </div>

            {/* Pages */}
            {data.map((item, idx) => {
              const isTurned = idx < activeIdx;
              
              return (
                <motion.div
                  key={idx}
                  className="absolute inset-0 origin-left"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={false}
                  animate={{ 
                    rotateY: isTurned ? -180 : 0,
                    z: isTurned ? (3 + idx * 0.1) : (1 - idx * 0.1)
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* Front Face (Right Page Content) */}
                  <div className="absolute inset-0 rounded-r-md overflow-hidden backface-hidden" style={{
                    background: "linear-gradient(135deg, #faf6ef 0%, #f0e9dc 60%, #e8e0d0 100%)",
                    border: "1px solid rgba(180,170,150,0.3)",
                    boxShadow: "inset 2px 0 12px rgba(0,0,0,0.02)",
                  }}>
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
                    <div className="absolute top-0 bottom-0 left-0 w-8" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, transparent 100%)" }} />

                    <div className="absolute inset-0 flex flex-col" style={{ padding: isMobile ? "28px 24px" : "44px 40px 36px 44px" }}>
                      <div className="flex justify-between items-start mb-3 md:mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#9b8e7a" }}>{item.period}</span>
                        <img src={item.image} className="w-8 h-8 md:w-12 md:h-12 object-contain opacity-80" alt="" />
                      </div>

                      <h3 className="text-base md:text-xl font-body font-semibold leading-tight mb-1" style={{ color: "#2c2418" }}>{item.title}</h3>
                      <p className="text-[11px] md:text-xs italic mb-4" style={{ color: "#7a6c5a" }}>{item.institution}</p>

                      <div className="w-10 h-[2px] rounded-full mb-4" style={{ backgroundColor: item.accent }} />

                      <p className="text-[11px] md:text-[13px] leading-relaxed mb-5" style={{ color: "#5a4e3e" }}>{item.description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.tags.map((t, i) => (
                          <span key={i} className="text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{
                            backgroundColor: item.accent + "12", color: item.accent, border: `1px solid ${item.accent}25`
                          }}>{t}</span>
                        ))}
                      </div>

                      <div className="flex-1 flex items-center justify-center">
                        {isOpen && idx === activeIdx && <Counter value={item.grade} color={item.accent} />}
                        {(!isOpen || idx !== activeIdx) && (
                          <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-6xl font-display italic font-light" style={{ color: item.accent }}>
                              {item.grade.includes("CGPA") ? parseFloat(item.grade.replace(/[^0-9.]/g, "")).toFixed(2) : Math.round(parseFloat(item.grade.replace(/[^0-9.]/g, "")))}
                              <span className="text-lg md:text-xl ml-1 opacity-50 lowercase">{item.grade.includes("CGPA") ? "cgpa" : "%"}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-3 border-t flex justify-between items-center" style={{ borderColor: "#ddd5c5" }}>
                        <div className="flex gap-2">
                          {data.map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full transition-all duration-300" style={{
                              backgroundColor: i === idx ? item.accent : "#d4cabb",
                              transform: i === idx ? "scale(1.3)" : "scale(1)",
                            }} />
                          ))}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: "#b8a990" }}>
                          {idx + 1} / {data.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back Face (Left Page Content when turned) */}
                  <div className="absolute inset-0 rounded-l-md overflow-hidden backface-hidden" style={{
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(225deg, #faf6ef 0%, #f0e9dc 60%, #e8e0d0 100%)",
                    border: "1px solid rgba(180,170,150,0.3)",
                  }}>
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
                    <div className="absolute top-0 bottom-0 right-0 w-8" style={{ background: "linear-gradient(270deg, rgba(0,0,0,0.08) 0%, transparent 100%)" }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <img src="/images/lj.png" className="w-1/2 h-1/2 object-contain grayscale" alt="" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ===== PAGE EDGES (right side, visible when cover is closed) ===== */}
          <div className="absolute top-[3px] bottom-[3px] pointer-events-none" style={{ right: "-10px", width: "10px", transform: "translateZ(1.5px)" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0" style={{
                right: `${i * 1.2}px`, width: "1.2px",
                background: `linear-gradient(180deg, #e8e0d0, #cfc5b4 50%, #e0d8c8 100%)`,
              }} />
            ))}
          </div>

          {/* ===== HARDCOVER ===== */}
          <motion.div
            className="absolute inset-0 origin-left"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: coverAngle, z: 2 }}
            transition={{ type: "spring", stiffness: 40, damping: 16, mass: 0.8 }}
          >
            {/* Front face of cover */}
            <div className="absolute inset-0 rounded-r-md overflow-hidden backface-hidden" style={{
              background: "linear-gradient(155deg, #1c2833 0%, #0e151c 40%, #080c10 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.3)",
            }}>
              {/* Glossy light reflections */}
              <div className="absolute inset-0 pointer-events-none z-[3]" style={{
                background: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 15%, rgba(0,0,0,0.25) 30%, rgba(255,255,255,0.04) 42%, transparent 100%)",
              }} />
              <div className="absolute inset-0 pointer-events-none z-[4]" style={{
                background: "linear-gradient(38deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
              }} />

              {/* Cover image */}
              <div className="absolute inset-0 flex items-center justify-center p-10 md:p-14 z-[1]">
                <img src="/images/lj.png" className="w-[55%] h-[50%] object-contain" alt="cover"
                  style={{ filter: "brightness(1.1) contrast(1.05) drop-shadow(0 0 30px rgba(26,82,118,0.25))" }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-transparent to-transparent opacity-90 z-[2]" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-[5]">
                <div className="w-10 md:w-14 h-[2px] bg-[#c9a84c] mb-3 rounded-full" />
                <h3 className="text-xl md:text-3xl font-display italic text-white/90 leading-none">Academic</h3>
                <h3 className="text-sm md:text-lg font-display italic text-right mt-1 tracking-[0.15em]" style={{ color: "#c9a84c" }}>ARCHIVE</h3>
              </div>
            </div>

            {/* Back face of cover (inside cover) */}
            <div className="absolute inset-0 rounded-r-md overflow-hidden backface-hidden" style={{
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #161310 0%, #0e0c09 100%)",
            }}>
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
              <div className="h-full flex flex-col justify-center px-6 md:px-10" style={{ borderRight: "3px solid rgba(201,168,76,0.25)" }}>
                <h4 className="text-xl md:text-2xl font-display italic text-white/80 leading-tight">Mohammad Aman<br />Memon</h4>
                <p className="text-[10px] md:text-xs text-white/30 mt-4 italic uppercase tracking-[0.3em]">Class of 2021 — 2026</p>
              </div>
            </div>

            {/* Cover thickness (top/bottom edges) */}
            <div className="absolute top-0 left-0 right-0 origin-top pointer-events-none" style={{
              height: 4, transform: "rotateX(90deg)",
              background: "linear-gradient(90deg, #0e151c, #1c2833)",
            }} />
            <div className="absolute bottom-0 left-0 right-0 origin-bottom pointer-events-none" style={{
              height: 4, transform: "rotateX(-90deg)",
              background: "linear-gradient(90deg, #080c10, #0e151c)",
            }} />
          </motion.div>

          {/* ===== SPINE ===== */}
          <div className="absolute top-0 bottom-0 left-0 pointer-events-none" style={{
            width: 16, transform: "translateX(-16px) translateZ(2px) rotateY(-90deg)", transformOrigin: "right",
            background: "linear-gradient(180deg, #1a1510, #0c0a07 50%, #1a1510)",
            boxShadow: "inset -3px 0 8px rgba(0,0,0,0.6)",
          }} />
        </div>

        {/* Hover hint */}
        <motion.p
          className="mt-8 text-[11px] text-white/25 uppercase tracking-[0.3em] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {isMobile ? "Tap" : "Hover"} to open the book
        </motion.p>

        {isOpen && (
          <motion.p
            className="mt-8 text-[11px] text-white/25 uppercase tracking-[0.3em] select-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Click to turn page
          </motion.p>
        )}
      </div>

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </section>
  );
};

export default Education;
