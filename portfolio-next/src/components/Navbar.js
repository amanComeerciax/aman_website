"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { name: "Home", href: "#" },
    { name: "Work", href: "#work" },
    { name: "Resume", href: "/resume/Mo.Amaan_CV2%202.pdf" },
    { name: "Say hi ↗", href: "mailto:amanmemon0014@gmail.com" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-2 sm:px-4 transition-all duration-500 ${
        scrolled ? "pt-2" : ""
      }`}
    >
      <nav
        className={`flex gap-0 border border-white/10 rounded-full overflow-hidden p-1 bg-white/5 backdrop-blur-md transition-transform duration-300 ${
          scrolled ? "shadow-md shadow-black/20 scale-95" : ""
        }`}
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.name === "Resume" ? "_blank" : undefined}
            className="relative px-4 sm:px-6 py-2 group overflow-hidden rounded-full text-sm sm:text-base"
          >
            <span className="relative z-10 text-zinc-300 transition-colors duration-500 group-hover:text-zinc-900 font-medium whitespace-nowrap">
              {item.name}
            </span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </a>
        ))}
      </nav>
    </div>
  );
}
