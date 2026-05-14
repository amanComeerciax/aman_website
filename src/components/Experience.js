"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import DocumentFolder from "./ui/DocumentFolder";

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const y = useMotionValue(0);
  const controls = useAnimation();
  
  const threshold = 100;
  const stringLength = 80;
  const stringThickness = 2;

  const skills = [
    "React.js", "Node.js", "MongoDB", "Express.js", "Docker", 
    "Payment Gateways", "JWT", "Git", "GitHub", "WebRTC", 
    "Firebase", "Socket.io", "Cloudinary", "Vercel", "Render", 
    "Redis", "RAG"
  ];

  const handleDragEnd = () => {
    setIsDragging(false);
    if (y.get() > threshold) {
      setIsOpen(!isOpen);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
    controls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
  };

  const path = useTransform(y, (yValue) => `M 24 0 L 24 ${stringLength + yValue}`);

  return (
    <section id="experience" className="py-20 md:py-32 relative font-sans overflow-visible antialiased">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Side */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#00d1b2]/50" />
              <span className="text-sm text-muted uppercase tracking-[0.4em] font-semibold text-white/40">Professional Journey</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-body text-white mb-8 tracking-tight leading-[1.1]">
              Work <span className="font-display italic text-[#00d1b2]">Experience</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-md font-light">
              Detailed technical history and industrial contributions in modern web engineering.
            </p>

            {/* Pull String Integrated here */}
            <div className="relative w-12 h-32 flex flex-col items-center">
              <div className="absolute top-0 w-px h-full bg-white/10 -z-10" />
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                <motion.path 
                  d={path} 
                  stroke="rgba(0, 209, 178, 0.8)" 
                  strokeWidth={stringThickness} 
                  strokeLinecap="round" 
                  fill="none" 
                />
              </svg>
              
              <motion.div
                className="pointer-events-auto cursor-grab active:cursor-grabbing absolute flex items-center justify-center backdrop-blur-md rounded-full shadow-2xl border border-[#00d1b2]/60 bg-black/80"
                style={{ 
                  top: stringLength, 
                  y,
                  width: 56,
                  height: 56,
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 150 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                animate={controls}
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0, 209, 178, 0.4)" }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ 
                    rotate: isOpen ? 180 : 0,
                    color: isOpen ? "#00d1b2" : "#ffffff"
                  }}
                  className="flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </motion.div>
              </motion.div>
              
              <div className="absolute top-48 left-1/2 -translate-x-1/2 text-center w-full">
                <p className="text-[10px] uppercase tracking-[0.6em] text-[#00d1b2] font-black">
                  {isOpen ? "CLOSE" : "OPEN"}
                </p>
              </div>
            </div>
          </div>

          {/* Folder Side */}
          <div className="relative flex justify-center py-10">
             <DocumentFolder isOpen={isOpen}>
                <div 
                  className="flex-1 overflow-y-auto pr-3 custom-scrollbar relative bg-white"
                  data-lenis-prevent="true"
                >
                   {/* Removed texture for maximum clarity */}
                   <div className="relative z-10 py-2">
                      <div className="mb-10 relative">
                         <p className="text-[11px] font-mono text-[#00d1b2] font-bold uppercase tracking-[0.2em] mb-2">Subject_Role_01</p>
                         {/* Changed to sharp sans-serif for clarity */}
                         <h4 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2 tracking-tighter antialiased">
                           Full Stack Developer Trainee
                         </h4>
                         <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#00d1b2]/40" />
                            <p className="text-sm md:text-base text-slate-600 font-bold tracking-tight">Commerciax Infotech Pvt. Ltd.</p>
                         </div>
                      </div>

                      <div className="space-y-8 mb-12">
                         {[
                           "Developed scalable, production-level applications using the MERN Stack, focusing on real-world solutions.",
                           "Gained hands-on experience in system design and Docker, implementing industry best practices.",
                           "Collaborated with cross-functional teams to enhance application performance and user experience."
                         ].map((bullet, i) => (
                           <div key={i} className="flex gap-5 group">
                              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mt-2 shrink-0 group-hover:bg-[#00d1b2] transition-colors" />
                              <p className="text-base md:text-lg text-slate-800 leading-relaxed font-semibold tracking-tight antialiased">
                                 {bullet}
                              </p>
                           </div>
                         ))}
                      </div>

                      <div className="mb-6">
                         <p className="text-[11px] font-mono text-[#00d1b2] font-bold uppercase tracking-[0.3em] mb-6">Expertise_Matrix</p>
                         <div className="flex flex-wrap gap-2.5">
                            {skills.map((skill, i) => (
                               <span 
                                 key={i} 
                                 className="px-4 py-2 bg-slate-50 text-[11px] md:text-[12px] font-bold text-slate-800 rounded-lg border border-slate-200 uppercase tracking-wide"
                               >
                                  {skill}
                               </span>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono relative z-10 uppercase font-bold">
                   <span className="flex items-center gap-2.5 text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                      SYSTEM_STATUS: OK
                   </span>
                   <span>DOC_REF: AMAN_001</span>
                </div>
             </DocumentFolder>

             <motion.div 
               animate={{ 
                  scale: isOpen ? 1.5 : 1,
                  opacity: isOpen ? 0.3 : 0.1
               }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#00d1b2] blur-[140px] rounded-full -z-10 pointer-events-none"
             />
          </div>

        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00d1b240;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00d1b2;
        }
      `}</style>
    </section>
  );
};

export default Experience;
