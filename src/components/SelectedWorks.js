"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlippingCard } from "@/components/ui/FlippingCard";

const SelectedWorks = () => {
  const PROJECTS_DATA = [
    { title: "AI Upsell Engine", span: "md:col-span-8", img: "/images/upsell.png", desc: "Intelligent upselling platform for modern businesses.", stack: "Next.js, React, AI", link: "https://aiupsellengine.mohammadaman.in/" },
    { title: "AI Website Builder", span: "md:col-span-4", img: "/images/websitebuilder.png", desc: "Multi-model AI routing & dynamic Next.js generation.", stack: "TypeScript, AI Models", link: "https://websitebuilder.mohammadaman.in/" },
    { title: "PDF Analyzer", span: "md:col-span-4", img: "/images/pdfanalyzer.png", desc: "AI-powered document analysis and insight extraction.", stack: "Python, Next.js, OpenAI", link: "https://ragpdf.mohammadaman.in/" },
    { title: "MyTube Platform", span: "md:col-span-8", img: "/images/mytube.png", desc: "Feature-rich video streaming platform clone.", stack: "React, Node.js, API", link: "https://mytube.mohammadaman.in/" },
    { title: "SIS Landing Page", span: "md:col-span-6", img: "/images/sis.png", desc: "High-performance landing page for enterprise systems.", stack: "React, Tailwind", link: "https://sislanding.mohammadaman.in/" },
    { title: "Personal Portfolio", span: "md:col-span-6", img: "/images/portfolio.png", desc: "Premium personal portfolio showcasing my engineering work.", stack: "React, Tailwind, Framer", link: "https://portfolio.mohammadaman.in/" }
  ];

  const [projects, setProjects] = useState(PROJECTS_DATA);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      })
      .catch(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
  }, []);

  return (
    <section id="work" className="bg-transparent py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-stroke"></div>
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body">
              Featured <span className="font-display italic text-text-primary">projects</span>
            </h2>
            <p className="text-muted mt-2 max-w-md">A selection of projects I've worked on, from concept to launch.</p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-stroke/50 text-sm text-text-primary hover:border-transparent hover:shadow-[0_0_15px_rgba(137,170,204,0.3)] transition-all group relative overflow-hidden">
            <span className="relative z-10">View all work</span>
            <span className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        </motion.div>

        {/* Flipping Cards Projects Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <FlippingCard
                height={400}
                frontContent={
                  <div className="w-full h-full relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-6 flex flex-col justify-between overflow-hidden">
                    {/* Browser Mockup */}
                    <div className="w-full relative rounded-lg border border-white/10 bg-[#050505] overflow-hidden shadow-2xl mt-2 transform transition-transform duration-700 group-hover/flipping-card:-translate-y-2">
                      {/* Mac Dots Header */}
                      <div className="w-full h-7 bg-white/[0.03] border-b border-white/5 flex items-center px-3 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
                      </div>
                      <div className="w-full aspect-video overflow-hidden relative">
                        <img
                          src={project.img}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/flipping-card:scale-105"
                        />
                      </div>
                    </div>
                    
                    {/* Bottom Title Area */}
                    <div className="mt-auto pt-6 flex flex-col relative z-10">
                      <h3 className="text-2xl md:text-3xl font-display italic text-white mb-2">
                        {project.title}
                      </h3>
                      <span className="text-[#00d1b2] text-xs uppercase tracking-[0.2em] flex items-center gap-2 font-medium">
                        Hover to explore <span className="animate-pulse">→</span>
                      </span>
                    </div>
                    
                    {/* Subtle glow effect behind title */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00d1b2]/10 to-transparent pointer-events-none"></div>
                  </div>
                }
                backContent={
                  <div className="w-full h-full p-8 flex flex-col justify-center items-center text-center relative group">
                    <h3 className="text-3xl font-display italic text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/80 mb-6 max-w-xs">{project.desc}</p>
                    <div className="inline-block px-4 py-2 bg-[#00d1b2] text-black rounded-full text-xs font-bold shadow-lg mb-8">
                      {project.stack}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto absolute bottom-8 px-6 py-3 border border-white/20 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center gap-2 transform transition-all duration-300 font-medium"
                    >
                      View Live Project <span>↗</span>
                    </a>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
