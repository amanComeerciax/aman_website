"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, useInView } from "framer-motion";

// --- FlipCard Component ---
const IMG_WIDTH = 60;  
const IMG_HEIGHT = 85; 

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
}) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", 
                perspective: "1000px",
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
                            delay: index * 0.1 
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
                        <p className="text-[8px] font-bold text-accent uppercase tracking-widest mb-1">View</p>
                        <p className="text-xs font-medium text-white">Connect</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000; 

// Mixed Professional 3D Logos (Confirmed SkillIcons)
const MIXED_LOGOS = [
    "react", "nextjs", "python", "nodejs", "mongodb", 
    "figma", "blender", "ps", "ai", "linkedin", 
    "github", "js", "ts", "tailwind", "vite", 
    "vercel", "aws", "docker", "discord", "wordpress"
].map(skill => `https://skillicons.dev/icons?i=${skill}`);

const lerp = (start, end, t) => start * (1 - t) + end * t;

export default function ScrollMorphHero() {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const morphProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    const scatterPositions = useMemo(() => {
        return MIXED_LOGOS.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[1000px] bg-transparent overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl font-display italic text-text-primary mb-4"
                    >
                        Ready to Build the Future?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-xs font-bold tracking-[0.2em] text-muted uppercase"
                    >
                        Scroll to Explore
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-display italic text-transparent bg-clip-text bg-gradient-to-r from-[#00d1b2] to-cyan-400 tracking-tight mb-4">
                        Let's Connect With <br /> Mohammad Aman
                    </h2>
                    <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
                        Transforming bold ideas into robust digital realities. <br className="hidden md:block" />
                        Reach out to collaborate on your next big project.
                    </p>
                    <a href="mailto:amanmemon0014@gmail.com" className="pointer-events-auto mt-6 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors">
                        Say Hello ↗
                    </a>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {MIXED_LOGOS.slice(0, TOTAL_IMAGES).map((src, i) => {
                        const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Keep it as a perfect circle
                            const circleRadius = Math.min(minDimension * 0.48, 450);

                            // Apply scroll rotation directly to the circle angle
                            // rotateValue goes from 0 to 150 (from the useTransform)
                            // We can use it to rotate the whole circle
                            const baseAngle = (i / TOTAL_IMAGES) * 360;
                            const circleAngle = baseAngle + rotateValue;
                            
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                                scale: 1.2,
                                opacity: 1
                            };

                            // Scatter to Circle Morph Logic
                            const target = {
                                x: lerp(scatterPositions[i].x, circlePos.x, morphValue),
                                y: lerp(scatterPositions[i].y, circlePos.y, morphValue),
                                rotation: lerp(scatterPositions[i].rotation, circlePos.rotation, morphValue),
                                scale: lerp(scatterPositions[i].scale, circlePos.scale, morphValue),
                                opacity: lerp(scatterPositions[i].opacity, circlePos.opacity, morphValue)
                            };

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
