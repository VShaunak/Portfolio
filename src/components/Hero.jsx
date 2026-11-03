import React, { useEffect, useRef } from 'react';
import { ArrowRight, FileText, Send, Sparkles, Terminal, Code2, Compass } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Hero({ onOpenResume }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 });

  // Interactive Particle Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate constellation nodes
    const particleCount = Math.min(65, Math.floor((canvas.width * canvas.height) / 14000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.2,
      originX: 0,
      originY: 0
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const nodeColor = isDark ? 'rgba(129, 140, 248, ' : 'rgba(99, 102, 241, ';
      const lineColor = isDark ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ';

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse gentle repulsion / pull
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
        }

        // Draw particle dot
        ctx.fillStyle = `${nodeColor}0.65)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect adjacent nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            const opacity = (1 - distNodes / 110) * (isDark ? 0.22 : 0.15);
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (dist < mouseRef.current.radius) {
          const mouseOpacity = (1 - dist / mouseRef.current.radius) * 0.35;
          ctx.strokeStyle = `${lineColor}${mouseOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Interactive Canvas Visualizer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
      </div>

      {/* Subtle Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-teal-400/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide mb-6 shadow-sm hover:scale-[1.02] transition-transform">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Universal SelfCare: Software Developer (June 2026 – Sep 2026)</span>
        </div>

        {/* Developer Name */}
        <h2 className="text-sm sm:text-base font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-3">
          {siteConfig.name}
        </h2>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
          Building Ideas Into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">
            Intelligent Experiences.
          </span>
        </h1>

        {/* Supporting Headline */}
        <p className="text-base sm:text-xl font-medium text-slate-700 dark:text-slate-300 mb-6 max-w-2xl">
          {siteConfig.subheadline}
        </p>

        {/* Introduction */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed font-normal">
          {siteConfig.bio}
        </p>

        {/* Three Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          {/* Button 1: Explore My Work */}
          <button
            onClick={() => scrollTo('projects')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Button 2: View My Resume */}
          <button
            onClick={() => scrollTo('resume')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>View My Resume</span>
          </button>

          {/* Button 3: Contact Me */}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base border border-transparent hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
          >
            <Send className="w-4 h-4 text-indigo-500" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Quick Tech Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 w-full max-w-3xl flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>25 Verified Repositories</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>5 Playable Web Games</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Multi-LLM & Computer Vision</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Automated CI/CD Deployment</span>
          </div>
        </div>
      </div>
    </section>
  );
}

