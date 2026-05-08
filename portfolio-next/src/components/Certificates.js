"use client";
import React from "react";
import Folder from "./ui/Folder";
import { motion } from "framer-motion";

const Certificates = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const certificateImages = [
    "/images/certifiacte1.png",
    "/images/certifiacte2.png",
    "/images/certifiacte3.png",
    "/images/certifiacte4.png",
    "/images/certifiacte5.png",
    "/images/certifiacte6.png",
  ];

  return (
    <section id="certificates" className="relative py-20 md:py-24 bg-transparent overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12 md:mb-20 relative z-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-stroke"></div>
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Recognition</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-body">
          Key <span className="font-display italic text-text-primary">Certifications</span>
        </h2>
      </div>

      <div className={`relative w-full ${isMobile ? 'h-[450px]' : 'h-[700px]'} flex items-center justify-center pt-12 md:pt-24`}>
        <Folder 
          size={isMobile ? 1.4 : 2.5} 
          color="#00d1b2" 
          label="Certificates"
          items={certificateImages.map((src, i) => (
            <img 
              key={i} 
              src={src} 
              alt={`Certificate ${i+1}`} 
              className="w-full h-full object-cover rounded-[2px]"
            />
          ))}
        />

        {/* Floating Hint */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-30"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium">Click to Open Folder</span>
          <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center animate-bounce bg-white/5">
            <span className="text-white/40 text-xs">↓</span>
          </div>
        </motion.div>
        
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00d1b2]/5 blur-[120px] rounded-full -z-10"></div>
      </div>
    </section>
  );
};

export default Certificates;
