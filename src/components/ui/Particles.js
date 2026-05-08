'use client';
import { useRef, useEffect } from 'react';

const Particles = ({
  particleCount = 200,
  blur = false,
  speed = 1,
  staticity = 50,
  ease = 50,
  color = '#00d1b2',
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      initCanvas();
    }
    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationId;
    const animateLoop = () => {
      animate();
      animationId = requestAnimationFrame(animateLoop);
    };
    animateLoop();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const onMouseMove = (e) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x < containerSize.current.w && x > 0 && y < containerSize.current.h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current) {
      particles.current = [];
      containerSize.current.w = canvasContainerRef.current.offsetWidth;
      containerSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = containerSize.current.w * dpr;
      canvasRef.current.height = containerSize.current.h * dpr;
      canvasRef.current.style.width = `${containerSize.current.w}px`;
      canvasRef.current.style.height = `${containerSize.current.h}px`;
      const context = canvasRef.current.getContext('2d');
      context.scale(dpr, dpr);
    }
  };

  const drawParticles = () => {
    for (let i = 0; i < particleCount; i++) {
      const x = Math.floor(Math.random() * containerSize.current.w);
      const y = Math.floor(Math.random() * containerSize.current.h);
      const alpha = Math.random() * 0.5 + 0.1;
      const targetAlpha = alpha;
      const dx = (Math.random() - 0.5) * 0.2;
      const dy = (Math.random() - 0.5) * 0.2;
      const size = Math.random() * 1.5 + 0.5;
      particles.current.push({ x, y, alpha, targetAlpha, dx, dy, size });
    }
  };

  const animate = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, containerSize.current.w, containerSize.current.h);
      particles.current.forEach((p, i) => {
        // Handle Mouse interaction
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (120 - distance) / 120;

        if (force > 0) {
          p.dx -= (dx / distance) * force * (speed / ease);
          p.dy -= (dy / distance) * force * (speed / ease);
        }

        p.x += p.dx + vx;
        p.y += p.dy + vy;
        p.dx *= (1 - 1 / staticity);
        p.dy *= (1 - 1 / staticity);

        if (p.x < 0 || p.x > containerSize.current.w || p.y < 0 || p.y > containerSize.current.h) {
          p.x = Math.floor(Math.random() * containerSize.current.w);
          p.y = Math.floor(Math.random() * containerSize.current.h);
        }

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.globalAlpha = p.alpha;
        context.fill();
      });
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0" ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Particles;
