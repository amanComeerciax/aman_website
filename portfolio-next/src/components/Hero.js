"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Hls from "hls.js";

const Hero = () => {
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay blocked", e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log("Autoplay blocked", e));
      });
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
      .fromTo(eyebrowRef.current,
        { opacity: 0, filter: "blur(10px)", y: 20 },
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

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none"></div>

      {/* Hero Content */}
      <div ref={containerRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          ref={eyebrowRef}
          className="text-xs text-muted uppercase tracking-[0.3em] mb-8"
        >
          Portfolio '26
        </motion.div>

        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 break-words">
          Mohammad Aman Memon
        </h1>

        <div className="text-lg md:text-xl text-muted max-w-md mx-auto mb-12">
          A{" "}
          <span key={roleIndex} className="font-display italic text-text-primary animate-role-fade-in inline-block">
            {roles[roleIndex]}
          </span>
          {" "} available for freelance & collaboration.
        </div>

        <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-12 opacity-80">
          Software engineering = managing complexity. Building maintainable architecture with a performance-first mindset.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#work" className="relative px-7 py-3.5 rounded-full text-sm bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all duration-300 overflow-hidden group">
            <span className="relative z-10">See Works</span>
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a href="mailto:amanmemon0014@gmail.com" className="px-7 py-3.5 rounded-full text-sm border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Reach out... <span className="text-lg leading-none">↗</span>
            </span>
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 blur-[1px] transition-opacity"></span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-0 w-full h-1/2 bg-text-primary/50 animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
