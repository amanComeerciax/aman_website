"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { name: "Home", href: "#" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#explorations" },
    { name: "Education", href: "#education" },
    { name: "Resume", href: "/resume/Mo.Amaan_CV2%202.pdf" },
    { name: "Say hi ↗", href: "mailto:amanmemon0014@gmail.com" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 md:pt-6 px-4 transition-all duration-500 ${
        scrolled ? "pt-2" : ""
      }`}
    >
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex items-center gap-0 border border-white/10 rounded-full overflow-hidden p-1 bg-white/5 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-xl shadow-black/40 scale-95" : ""
        }`}
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.name === "Resume" ? "_blank" : undefined}
            className="relative px-5 py-2 group overflow-hidden rounded-full text-sm lg:text-base"
          >
            <span className={`relative z-10 transition-colors duration-500 group-hover:text-zinc-900 font-medium whitespace-nowrap ${
              item.name === "Say hi ↗" ? "text-[#00d1b2]" : "text-zinc-300"
            }`}>
              {item.name}
            </span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </a>
        ))}
      </nav>

      {/* Mobile Navbar Trigger */}
      <div className="md:hidden flex items-center justify-center w-full">
        <motion.button
          onClick={() => setIsMenuOpen(true)}
          className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center gap-3 shadow-2xl"
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white text-sm font-bold tracking-widest uppercase">Menu</span>
          <div className="flex flex-col gap-1">
            <div className="w-4 h-0.5 bg-[#00d1b2]"></div>
            <div className="w-4 h-0.5 bg-white"></div>
            <div className="w-2 h-0.5 bg-[#00d1b2]"></div>
          </div>
        </motion.button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[110] bg-black/60 md:hidden flex flex-col items-center justify-center p-8"
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            {/* Menu Links */}
            <div className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsMenuOpen(false)}
                  target={item.name === "Resume" ? "_blank" : undefined}
                  className={`text-2xl font-body font-bold tracking-tight ${
                    item.name === "Say hi ↗" ? "text-[#00d1b2]" : "text-white"
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Social / Footer in Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 text-white/30 text-[10px] uppercase tracking-[0.3em]"
            >
              © 2024 Mohammad Aman
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
