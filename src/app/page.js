"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Above-the-fold — load eagerly
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import RiveHero from "@/components/RiveHero";
import UiloraBiolumeGrain from "@/components/Backgrounds/UiloraBiolumeGrain";
import Particles from "@/components/ui/Particles";

// Below-the-fold — lazy loaded
const SelectedWorks = dynamic(() => import("@/components/SelectedWorks"), { ssr: false });
const CoreSkills = dynamic(() => import("@/components/CoreSkills"), { ssr: false });
const Explorations = dynamic(() => import("@/components/Explorations"), { ssr: false });
const Certificates = dynamic(() => import("@/components/Certificates"), { ssr: false });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const Education = dynamic(() => import("@/components/Education"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: false });
const ScrollMorphHero = dynamic(() => import("@/components/ui/ScrollMorphHero"), { ssr: false });
const BlogFeed = dynamic(() => import("@/components/BlogFeed"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true, // Enable smooth scroll for all devices
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth scroll to anchors
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -80, // Account for fixed navbar
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      lenis.destroy();
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-60">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
      </div>
      
      {/* THE BIOLUMINESCENT PULSE BACKGROUND - GLOBAL */}
      <div className="fixed inset-0 w-full h-full z-[-2]">
        <UiloraBiolumeGrain
          baseColor="#121212"
          glowColor="#00d1b2"
          breatheSpeed={0.5}
          sensitivity={1.2}
          grainScale={1200}
        />
      </div>

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Particles 
        particleCount={100}
        color="#00d1b2"
        speed={0.5}
        staticity={30}
      />
      <div className={`relative z-10 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <RiveHero />
        <SelectedWorks />
        <CoreSkills />
        <Experience />
        <Explorations />
        <Certificates />
        <Education />
        <Stats />
        <BlogFeed />
        <ScrollMorphHero />
        <Footer />
      </div>
    </main>
  );
}
