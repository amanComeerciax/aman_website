"use client";
import React from "react";
import CircularCarousel from "./MakeCircularCrousel";
import ShinyText from "./ui/ShinyText";

const CoreSkills = () => {
  const skillLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", alt: "Docker" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", alt: "AWS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", alt: "Prisma" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", alt: "Express" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", alt: "Figma" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", alt: "HTML" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", alt: "CSS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", alt: "Git" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", alt: "GitHub" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", alt: "Vercel" }
  ];

  return (
    <section id="skills" className="bg-transparent py-12 md:py-16 overflow-hidden relative flex flex-col justify-center">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 lg:px-16 relative z-10 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-stroke"></div>
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body">
              Core <ShinyText text="Skills" className="font-display italic" color="#00d1b2" shineColor="#ffffff" speed={3} />
            </h2>
          </div>
        </div>

        {/* Framer Circular Carousel Component */}
        <div className="w-full flex justify-center items-center h-[350px] md:h-[400px]">
          <CircularCarousel 
            images={skillLogos} 
            radius={500} 
            itemWidth={120} 
            itemHeight={120} 
            style={{ width: "100%", height: "100%" }} 
          />
        </div>

        {/* Next-Gen Optimization (AEO & GEO) Showcase */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00d1b2] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#00d1b2]">
                  Next-Gen Search Architecture
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-body text-white">
                AEO & <ShinyText text="GEO Optimization" className="font-display italic" color="#00d1b2" shineColor="#ffffff" speed={3} />
              </h3>
            </div>
            <p className="text-white/50 text-xs md:text-sm max-w-md font-light">
              Beyond traditional SEO — engineering digital presence and citations for AI engines, voice assistants, and LLM summaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AEO Card */}
            <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00d1b2]/40 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d1b2]/5 rounded-full blur-2xl group-hover:bg-[#00d1b2]/15 transition-all duration-500 pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00d1b2] px-3 py-1 rounded-full bg-[#00d1b2]/10 border border-[#00d1b2]/20 font-bold">
                  Zero-Click & Voice
                </span>
                <span className="text-xs text-white/30 font-mono">01 / AEO</span>
              </div>
              <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Answer Engine Optimization
              </h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                Structuring deep semantic content and JSON-LD schemas so search engines deliver your brand as the direct, definitive answer on Google Snippets, Siri, and Alexa.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Schema.org Entities", "Featured Snippets", "Voice Search (Siri/Alexa)", "Direct Answers"].map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* GEO Card */}
            <div className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00d1b2]/40 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d1b2]/5 rounded-full blur-2xl group-hover:bg-[#00d1b2]/15 transition-all duration-500 pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00d1b2] px-3 py-1 rounded-full bg-[#00d1b2]/10 border border-[#00d1b2]/20 font-bold">
                  AI Citations & LLMs
                </span>
                <span className="text-xs text-white/30 font-mono">02 / GEO</span>
              </div>
              <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Generative Engine Optimization
              </h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                Optimizing brand authority, crawler accessibility, and information gain to get cited and recommended inside ChatGPT Search, Perplexity AI, and Google AI Overviews.
              </p>
              <div className="flex flex-wrap gap-2">
                {["ChatGPT & Perplexity", "AI Crawler Config", "Entity Authority", "Source Citations"].map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreSkills;
