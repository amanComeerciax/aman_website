"use client";

import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 420,
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className="group/flipping-card w-full flex justify-center cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: "1000px",
        height: `${height}px`,
      }}
    >
      <div
        className={cn(
          "relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "group-hover/flipping-card:[transform:rotateY(180deg)]",
          className
        )}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl border border-white/[0.08] [backface-visibility:hidden] -webkit-backface-visibility:hidden overflow-hidden"
          style={{ transform: "rotateY(0deg)" }}
        >
          {frontContent}
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl border border-[#00d1b2]/30 bg-black/80 backdrop-blur-md [backface-visibility:hidden] -webkit-backface-visibility:hidden overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
