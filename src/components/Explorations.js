"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "./ui/ShinyText";

const Explorations = () => {
  const pinRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Pin the section
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "+=600",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
        });

        // Parallax columns
        gsap.to(".col-left", {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.fromTo(".col-right",
          { y: -150 },
          { y: 150, ease: "none", scrollTrigger: { trigger: pinRef.current, start: "top top", end: "bottom top", scrub: 1 } }
        );
      });
    }, pinRef);
    return () => ctx.revert();
  }, []);

  const images = [
    "/images/25f406e2-871e-4cf3-9f89-08d82e3d9859%202.JPG",
    "/images/IMG_5372.jpg",
    "/images/IMG_6604.jpg",
    "/images/IMG_6610.jpg",
    "/images/23d70b24-90a1-4a53-b075-e7653c77749e.jpg"
  ];

  return (
    <section id="explorations" ref={pinRef} className="relative min-h-screen w-full bg-transparent flex flex-col justify-start items-center pt-20 md:pt-32 pb-12 md:pb-20">
      {/* Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 md:px-6 mb-12 pointer-events-none text-left">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-stroke" />
          <span className="text-sm text-muted uppercase tracking-[0.4em] font-semibold">Milestones</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-body tracking-tight leading-[1.1]">
          Personal <ShinyText text="Achievements" className="font-display italic" color="#00d1b2" shineColor="#ffffff" speed={3} />
        </h2>
        <p className="text-muted text-lg md:text-xl leading-relaxed mt-6 max-w-md font-light">
          A glimpse into my journey, team events, and proudest moments.
        </p>
      </div>

      {/* Parallax Grid */}
      <div className="relative z-10 flex md:grid md:grid-cols-2 flex-col gap-8 md:gap-40 max-w-[1400px] w-full px-4 md:px-6 mt-16 md:mt-32">
        <div className="col-left flex flex-col items-center md:items-end gap-8 md:gap-12">
          {images.slice(0, 3).map((src, i) => (
            <div key={i} className="relative w-[70vw] sm:w-[200px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5 rotate-2 md:rotate-3 hover:rotate-0 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,209,178,0.15)] transition-all duration-700 ease-out cursor-pointer will-change-transform group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-white/5 opacity-70 z-10 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
              <img src={src} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Achievement" loading="lazy" decoding="async" />
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#00d1b2]/40 z-20 pointer-events-none transition-colors duration-700" />
            </div>
          ))}
        </div>
        <div className="col-right flex flex-col items-center md:items-start gap-8 md:gap-12 pt-0 md:pt-24">
          {images.slice(3, 6).map((src, i) => (
            <div key={i} className="relative w-[70vw] sm:w-[200px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5 -rotate-2 md:-rotate-3 hover:rotate-0 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,209,178,0.15)] transition-all duration-700 ease-out cursor-pointer will-change-transform group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-white/5 opacity-70 z-10 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
              <img src={src} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Achievement" loading="lazy" decoding="async" />
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#00d1b2]/40 z-20 pointer-events-none transition-colors duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explorations;
