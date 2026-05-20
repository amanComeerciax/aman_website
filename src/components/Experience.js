"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import DocumentFolder from "./ui/DocumentFolder";
import ShinyText from "./ui/ShinyText";

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const y = useMotionValue(0);
  const controls = useAnimation();
  
  const threshold = 100;
  const stringLength = 80;

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

  // Generate Zipper Teeth
  const renderZipperTeeth = () => {
    const teeth = [];
    for (let i = 0; i < 20; i++) {
      teeth.push(
        <motion.rect 
          key={i}
          x={i % 2 === 0 ? 21 : 25}
          y={i * 8}
          width="4"
          height="2"
          fill="rgba(0, 209, 178, 0.3)"
          rx="1"
        />
      );
    }
    return teeth;
  };

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
              Work <ShinyText text="Experience" className="font-display italic" color="#00d1b2" shineColor="#ffffff" speed={3} />
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-md font-light">
              Unzipping industrial experience and full-stack technical mastery.
            </p>

            {/* ZIPPER Toggle */}
            <div className="relative w-12 h-48 flex flex-col items-center">
              {/* Zipper Track */}
              <div className="absolute top-0 w-2 h-full bg-white/5 rounded-full overflow-hidden">
                <svg className="w-full h-full">
                   {renderZipperTeeth()}
                </svg>
              </div>

              {/* Zipper Pull Handle */}
              <motion.div
                className="pointer-events-auto cursor-grab active:cursor-grabbing absolute flex items-center justify-center z-20"
                style={{ 
                  top: stringLength, 
                  y,
                  width: 44,
                  height: 70,
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 150 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                animate={controls}
                whileHover={{ scale: 1.05 }}
              >
                {/* Metallic Zipper Pull Shape */}
                <div className="relative w-full h-full flex flex-col items-center">
                   {/* Top slider part */}
                   <div className="w-10 h-10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#00d1b2]/40 rounded-lg shadow-xl flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-[#00d1b2]/30 rounded-full mb-1" />
                      <div className="w-6 h-0.5 bg-[#00d1b2]/30 rounded-full" />
                   </div>
                   {/* Puller part */}
                   <div className="w-8 h-12 -mt-1 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border border-[#00d1b2]/60 rounded-b-xl shadow-2xl flex flex-col items-center pt-2">
                      <div className="w-3 h-5 rounded-full border-2 border-[#00d1b2]/40 mb-1" />
                      <div className="text-[8px] text-[#00d1b2] font-black uppercase tracking-tighter opacity-70">ZIP</div>
                   </div>
                   
                   {/* Glow effect when near handle */}
                   <motion.div 
                     className="absolute -inset-2 bg-[#00d1b2]/10 blur-lg rounded-full -z-10"
                     animate={{ opacity: [0.3, 0.6, 0.3] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   />
                </div>
              </motion.div>

              {/* ISHARA (Visual Guide) */}
              <AnimatePresence>
                {!isOpen && !isDragging && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute left-16 top-[100px] flex items-center gap-3 whitespace-nowrap pointer-events-none"
                  >
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[#00d1b2]"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="19 12 12 19 5 12"></polyline>
                        <polyline points="19 6 12 13 5 6"></polyline>
                      </svg>
                    </motion.div>
                    <span className="text-[11px] font-bold text-[#00d1b2] tracking-[0.2em] uppercase">Unzip to View</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute top-56 left-1/2 -translate-x-1/2 text-center w-full">
                <p className="text-[9px] uppercase tracking-[0.5em] text-[#00d1b2]/60 font-black">
                  {isOpen ? "ZIP_UP" : "UNZIP_FILE"}
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
                   <div className="relative z-10 py-2">
                      <div className="mb-10 relative">
                         <p className="text-[11px] font-mono text-[#00d1b2] font-bold uppercase tracking-[0.2em] mb-2">Subject_Role_01</p>
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
