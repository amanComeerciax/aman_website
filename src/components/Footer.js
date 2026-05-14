"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(linksRef.current,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

  }, []);

  const handleHover = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, y: -5, duration: 0.3, ease: "power2.out" });
  };

  const handleHoverExit = (e) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
  };

  const socials = [
    { name: 'Email', icon: <FaEnvelope size={24} />, url: 'mailto:amanmemon0014@gmail.com', color: "hover:text-[#ea4335]" },
    { name: 'Phone', icon: <FaPhoneAlt size={22} />, url: 'tel:+919265588226', color: "hover:text-[#34a853]" },
    { name: 'GitHub', icon: <FaGithub size={26} />, url: 'https://github.com/amanComeerciax', color: "hover:text-white" },
    { name: 'LinkedIn', icon: <FaLinkedinIn size={24} />, url: 'https://www.linkedin.com/in/mohammad-aman-memon/', color: "hover:text-[#0a66c2]" },
    { name: 'Twitter', icon: <FaTwitter size={24} />, url: 'https://twitter.com/amanComeerciax', color: "hover:text-[#1da1f2]" },
  ];

  return (
    <footer id="contact" ref={containerRef} className="relative bg-transparent pb-16 overflow-hidden">
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Social Links Container */}
        <div ref={textRef} className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-3xl pt-8">
          {socials.map((social, index) => (
            <a
              key={social.name}
              ref={el => linksRef.current[index] = el}
              href={social.url}
              target={social.name !== 'Email' && social.name !== 'Phone' ? '_blank' : undefined}
              rel={social.name !== 'Email' && social.name !== 'Phone' ? 'noopener noreferrer' : undefined}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
              className={`flex flex-col items-center justify-center gap-3 text-white/60 transition-colors duration-300 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 w-[110px] sm:w-32 ${social.color}`}
            >
              <div className="p-3 bg-black/40 rounded-full border border-white/10">
                {social.icon}
              </div>
              <span className="text-xs font-medium tracking-wider">{social.name}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-20 flex flex-col sm:flex-row justify-between items-center w-full text-xs text-white/40 border-t border-white/5 pt-8">
          <p>© {new Date().getFullYear()} Mohammad Aman Memon. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span className="w-2 h-2 rounded-full bg-[#00d1b2] animate-pulse"></span>
            Available for new opportunities
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
