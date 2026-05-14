"use client";
import React from "react";
import CircularCarousel from "./MakeCircularCrousel";

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
              Core <span className="font-display italic text-text-primary">Skills</span>
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
      </div>
    </section>
  );
};

export default CoreSkills;
