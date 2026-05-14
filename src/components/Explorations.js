"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          end: "+=1500",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
        });

        // Parallax columns
        gsap.to(".col-left", {
          y: -300,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.fromTo(".col-right",
          { y: -300 },
          { y: 0, ease: "none", scrollTrigger: { trigger: pinRef.current, start: "top top", end: "bottom top", scrub: 1 } }
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
    <section id="explorations" ref={pinRef} className="relative min-h-screen w-full bg-transparent overflow-hidden flex flex-col justify-center items-center">
      {/* Content */}
      <div className="relative z-20 text-center px-4 mb-20 pointer-events-none">
        <p className="text-accent-gradient text-sm font-bold uppercase tracking-widest mb-4">Milestones</p>
        <h2 className="text-5xl md:text-7xl font-display italic">Personal <span className="text-text-primary">Achievements</span></h2>
        <p className="text-muted max-w-md mx-auto mt-4">A glimpse into my journey, team events, and proudest moments.</p>
      </div>

      {/* Parallax Grid */}
      <div className="relative z-10 flex md:grid md:grid-cols-2 flex-col gap-8 md:gap-40 max-w-[1400px] px-4 md:px-6 mt-10">
        <div className="col-left flex flex-col items-center md:items-end gap-8 md:gap-12">
          {images.slice(0, 3).map((src, i) => (
            <div key={i} className="w-[70vw] sm:w-[200px] md:w-[320px] aspect-square rounded-2xl overflow-hidden border border-stroke/30 rotate-2 md:rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer will-change-transform">
              <img src={src} className="w-full h-full object-cover" alt="Achievement" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div className="col-right flex flex-col items-center md:items-start gap-8 md:gap-12 pt-0 md:pt-24">
          {images.slice(3, 6).map((src, i) => (
            <div key={i} className="w-[70vw] sm:w-[200px] md:w-[320px] aspect-square rounded-2xl overflow-hidden border border-stroke/30 -rotate-2 md:-rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer will-change-transform">
              <img src={src} className="w-full h-full object-cover" alt="Achievement" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explorations;
