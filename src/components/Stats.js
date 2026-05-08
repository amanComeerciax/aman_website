"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StatItem = ({ stat }) => {
  const numRef = useRef(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (typeof stat.value === "number" && numRef.current) {
      let ctx = gsap.context(() => {
        gsap.fromTo(numRef.current, 
          { innerHTML: 0 },
          { 
            innerHTML: stat.value, 
            duration: 2.5, 
            snap: { innerHTML: 1 }, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: numRef.current,
              start: "top 85%"
            }
          }
        );
      }, numRef);
      return () => ctx.revert();
    }
  }, [stat]);

  return (
    <div>
      <h3 className="text-5xl md:text-6xl font-display italic text-text-primary mb-2">
        {typeof stat.value === "number" ? <span ref={numRef}>0</span> : stat.value}
        <span className="text-accent-gradient">{stat.suffix}</span>
      </h3>
      <p className="text-muted uppercase tracking-widest text-xs">{stat.label}</p>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { value: 14, suffix: "+", label: "Projects Built" },
    { value: 16, suffix: "+", label: "Technologies" },
    { value: "Active", suffix: "", label: "Open Source Contributor" },
  ];

  return (
    <section className="bg-transparent py-16 md:py-24 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
