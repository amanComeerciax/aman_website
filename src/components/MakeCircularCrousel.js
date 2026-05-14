"use client";
import React, { useRef, useEffect, useState } from "react";

const defaultImages = [
  { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Gradient 1" },
  { src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "Gradient 2" },
  { src: "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg", alt: "Gradient 3" },
  { src: "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg", alt: "Gradient 4" },
  { src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg", alt: "Gradient 5" }
];

export default function MakeCircularCrousel(props) {
  let {
    images,
    radius = 320,
    itemWidth = 260,
    itemHeight = 160,
    perspective = 1200,
    rotationSpeed = 0.18,
    shaderEffect = "none",
    tiltAngle = -18,
    style
  } = props;

  if (!images || !Array.isArray(images) || images.length === 0) {
    images = defaultImages;
  }

  const isStatic = false; // Mapped from useIsStaticRenderer
  const rotationRef = useRef(0);
  const containerContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    radius: radius,
    itemWidth: itemWidth,
    itemHeight: itemHeight,
    perspective: perspective
  });
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      if (isMobile) {
        setDimensions({
          radius: Math.min(radius, window.innerWidth * 0.85),
          itemWidth: 80,
          itemHeight: 80,
          perspective: 800
        });
      } else if (isTablet) {
        setDimensions({
          radius: radius * 0.8,
          itemWidth: itemWidth * 0.8,
          itemHeight: itemHeight * 0.8,
          perspective: perspective
        });
      } else {
        setDimensions({
          radius,
          itemWidth,
          itemHeight,
          perspective
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [radius, itemWidth, itemHeight]);

  useEffect(() => {
    if (isStatic) return;
    function onPointerDown(e) {
      dragging.current = true;
      lastX.current = e.clientX;
      e.target.setPointerCapture?.(e.pointerId);
    }
    function onPointerMove(e) {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      velocity.current = dx * 0.5;
      rotationRef.current += dx * 0.5;
      if (containerContainerRef.current) {
        containerContainerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
    }
    function onPointerUp() {
      dragging.current = false;
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;
    const animate = () => {
      if (dragging.current) {
        raf.current = requestAnimationFrame(animate);
        return;
      }

      let delta = 0;
      
      // Auto rotation
      delta += rotationSpeed;
      
      // Inertia
      if (Math.abs(velocity.current) > 0.01) {
        delta += velocity.current;
        velocity.current *= 0.94;
      }
      
      if (delta !== 0) {
        rotationRef.current += delta;
        if (containerContainerRef.current) {
          containerContainerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [rotationSpeed, isStatic]);

  const N = images.length;
  const angleStep = 360 / N;
  const shaderStyle = shaderEffect === "blur"
    ? { filter: "blur(2px) brightness(1.1)" }
    : shaderEffect === "contrast"
      ? { filter: "contrast(1.3) saturate(1.2)" }
      : {};

  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        perspective: dimensions.perspective,
        overflow: "visible",
        position: "relative",
        cursor: dragging.current ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none"
      }}
    >
      <div
        ref={containerContainerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: `rotateY(${rotationRef.current}deg)`
        }}
      >
        {images.map((img, i) => {
          const src = img.src?.src || img.src;
          const alt = img.alt || "";
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: dimensions.itemWidth,
                height: dimensions.itemHeight,
                marginLeft: -dimensions.itemWidth / 2,
                marginTop: -dimensions.itemHeight / 2,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: `rotateY(${angleStep * i}deg) translateZ(${dimensions.radius}px) rotateX(${tiltAngle}deg)`,
                ...shaderStyle
              }}
            >
              <img
                src={src}
                alt={alt}
                draggable={false}
                style={{
                  width: "55%",
                  height: "55%",
                  objectFit: "contain",
                  pointerEvents: "none",
                  filter: ["Next.js", "GitHub", "Express", "Vercel", "AWS"].includes(alt) ? "invert(1) brightness(2)" : "none"
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}