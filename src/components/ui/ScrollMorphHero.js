"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll } from "framer-motion";

// --- FlipCard Component ---
const IMG_WIDTH = 60;  
const IMG_HEIGHT = 85; 

function FlipCard({
    src,
    index,
    total,
    smoothMorph,
    smoothScrollRotate,
    scatterPos,
    containerSize
}) {
    const isMobile = containerSize.width < 768;
    const minDimension = Math.min(containerSize.width, containerSize.height);
    const circleRadius = isMobile ? (minDimension * 0.4) : Math.min(minDimension * 0.48, 450);
    const baseAngle = (index / total) * 360;

    // Derived values using useTransform for zero re-renders
    const x = useTransform(smoothMorph, (m) => {
        const angle = baseAngle + smoothScrollRotate.get();
        const rad = (angle * Math.PI) / 180;
        const circleX = Math.cos(rad) * circleRadius;
        const sX = isMobile ? (scatterPos.x * 0.3) : scatterPos.x;
        return sX * (1 - m) + circleX * m;
    });

    const y = useTransform(smoothMorph, (m) => {
        const angle = baseAngle + smoothScrollRotate.get();
        const rad = (angle * Math.PI) / 180;
        const circleY = Math.sin(rad) * circleRadius;
        const sY = isMobile ? (scatterPos.y * 0.5) : scatterPos.y;
        return sY * (1 - m) + circleY * m;
    });

    const rotation = useTransform(smoothMorph, (m) => {
        const angle = baseAngle + smoothScrollRotate.get();
        const circleRot = angle + 90;
        return scatterPos.rotation * (1 - m) + circleRot * m;
    });

    const scale = useTransform(smoothMorph, (m) => {
        const circleScale = isMobile ? 0.8 : 1.2;
        return scatterPos.scale * (1 - m) + circleScale * m;
    });

    const opacity = useTransform(smoothMorph, (m) => {
        return scatterPos.opacity * (1 - m) + 1 * m;
    });

    return (
        <motion.div
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                x,
                y,
                rotate: rotation,
                scale,
                opacity
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-zinc-900/80 border border-white/10 flex items-center justify-center backdrop-blur-sm"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <motion.div
                        className="relative w-12 h-12 flex items-center justify-center"
                        animate={{ 
                            y: [-5, 5, -5],
                            rotateY: [-10, 10, -10],
                            rotateX: [-10, 10, -10]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut", 
                            delay: index * 0.1,
                            type: "tween" 
                        }}
                    >
                        <img
                            src={src}
                            alt={`logo-${index}`}
                            className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                        />
                    </motion.div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-zinc-900 flex flex-col items-center justify-center p-4 border border-white/10"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-[#00d1b2] uppercase tracking-widest mb-1">View</p>
                        <p className="text-xs font-medium text-white">Connect</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 12;

// Mixed Professional 3D Logos (Confirmed SkillIcons)
const MIXED_LOGOS = [
    "react", "nextjs", "python", "nodejs", "mongodb", 
    "figma", "blender", "ps", "ai", "linkedin", 
    "github", "js", "ts", "tailwind", "vite", 
    "vercel", "aws", "docker", "discord", "wordpress"
].map(skill => `https://skillicons.dev/icons?i=${skill}`);

export default function ScrollMorphHero() {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const morphProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const scatterPositions = useMemo(() => {
        return MIXED_LOGOS.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);
    
    const introOpacity = useTransform(smoothMorph, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[1000px] bg-transparent overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out) */}
                <motion.div 
                    style={{ opacity: introOpacity, filter: useTransform(smoothMorph, m => `blur(${m * 20}px)`) }}
                    className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2"
                >
                    <h1 className="text-4xl md:text-6xl font-display italic text-white mb-4">
                        Ready to Build the Future?
                    </h1>
                    <p className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                        Scroll to Explore
                    </p>
                </motion.div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-display italic text-transparent bg-clip-text bg-gradient-to-r from-[#00d1b2] to-cyan-400 tracking-tight mb-4">
                        Let's Connect With <br /> Mohammad Aman
                    </h2>
                    <p className="text-sm md:text-base text-white/50 max-w-lg leading-relaxed">
                        Transforming bold ideas into robust digital realities. <br className="hidden md:block" />
                        Reach out to collaborate on your next big project.
                    </p>
                    <a href="mailto:amanmemon0014@gmail.com" className="pointer-events-auto mt-6 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors">
                        Say Hello ↗
                    </a>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {containerSize.width > 0 && MIXED_LOGOS.slice(0, containerSize.width < 768 ? 12 : TOTAL_IMAGES).map((src, i) => (
                        <FlipCard
                            key={i}
                            src={src}
                            index={i}
                            total={containerSize.width < 768 ? 12 : TOTAL_IMAGES}
                            smoothMorph={smoothMorph}
                            smoothScrollRotate={smoothScrollRotate}
                            scatterPos={scatterPositions[i]}
                            containerSize={containerSize}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
