"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const RiveHero = () => {
  const titleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const containerRef = useRef(null);

  const { RiveComponent } = useRive({
    src: "/rive/hero.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
      .fromTo(eyebrowRef.current,
        { opacity: 0, filter: "blur(10px)", y: 10 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 },
        "-=1"
      );
  }, []);

  const roles = ["Full Stack Developer", "Software Engineer", "Freelancer", "Creator"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const ActionButtons = (
    <>
      <a href="#work" className="w-full sm:w-auto text-center relative px-8 py-4 rounded-full text-sm bg-white text-black hover:bg-zinc-200 transition-all duration-300 overflow-hidden group font-medium">
        <span className="relative z-10">See Works</span>
      </a>
      <a href="mailto:amanmemon0014@gmail.com" className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-sm border-2 border-white/30 bg-black/20 text-white hover:border-white transition-all duration-300 group relative overflow-hidden font-medium">
        <span className="relative z-10 flex items-center justify-center gap-2">
          Reach out... <span className="text-lg leading-none">↗</span>
        </span>
      </a>
    </>
  );

  return (
    <section className="relative min-h-[100dvh] lg:h-screen w-full overflow-hidden flex items-center bg-transparent">
      
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center min-h-full pt-24 pb-32 lg:py-0">
        
        {/* Left Side: Content */}
        <div ref={containerRef} className="text-left order-1 lg:col-span-5">
          <motion.div
            ref={eyebrowRef}
            className="text-xs text-white/70 uppercase tracking-[0.3em] mb-6"
          >
            Portfolio '26
          </motion.div>

          <h1 ref={titleRef} className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic leading-[0.9] tracking-tight text-white mb-8">
            Mohammad <br /> Aman Memon
          </h1>

          <div className="text-lg md:text-xl text-white/80 mb-0 lg:mb-12 max-w-lg">
            A{" "}
            <span key={roleIndex} className="font-display italic text-[#00d1b2] animate-role-fade-in inline-block font-medium">
              {roles[roleIndex]}
            </span>
            {" "} available for freelance & collaboration.
          </div>

          <div className="hidden lg:flex flex-row items-center gap-4">
            {ActionButtons}
          </div>
        </div>

        {/* Right Side: Rive Animation */}
        <div className="h-[300px] xs:h-[350px] sm:h-[500px] lg:h-[800px] w-full relative order-2 lg:col-span-7 overflow-visible">
          <div 
            className="absolute inset-0 scale-[1.15] lg:scale-[1.1] origin-center lg:translate-x-4"
            style={{
              WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 80%)",
              maskImage: "radial-gradient(circle at center, black 50%, transparent 80%)"
            }}
          >
            <RiveComponent />
          </div>
        </div>

        {/* Buttons (Mobile Only) */}
        <div className="flex lg:hidden flex-col sm:flex-row items-center gap-4 order-3 w-full mt-[-2rem] sm:mt-0 relative z-20">
          {ActionButtons}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-[10px] text-white/60 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-1/2 bg-white animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default RiveHero;
