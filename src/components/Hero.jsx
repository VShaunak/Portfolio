import React, { useEffect, useRef } from 'react';
import { ArrowRight, FileText, Send, Sparkles, Terminal, Code2, Compass } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Hero({ onOpenResume }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 100 });

  // Minimalist, Calm, Ambient Particle Canvas (Google-inspired)
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

    // Subtle number of nodes for a serene, uncluttered aesthetic
    const particleCount = Math.min(38, Math.floor((canvas.width * canvas.height) / 28000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28, // gentle ambient drift
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.5 + 1.2
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
      const nodeColor = isDark ? 'rgba(138, 180, 248, ' : 'rgba(26, 115, 232, ';
      const lineColor = isDark ? 'rgba(138, 180, 248, ' : 'rgba(26, 115, 232, ';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Very gentle mouse influence
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRef.current.radius && dist > 0) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          p.x -= (dx / dist) * force * 0.6;
          p.y -= (dy / dist) * force * 0.6;
        }

        // Draw node
        ctx.fillStyle = `${nodeColor}0.25)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes with calm, low-opacity strokes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            const opacity = (1 - distNodes / 110) * (isDark ? 0.12 : 0.08);
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
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
      className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-[#121212] transition-colors"
    >
      {/* Background Interactive Ambient Visualizer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block opacity-80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Google-Style Pill Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0] dark:border-[#3c4043] text-xs font-medium tracking-normal mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#34a853]" />
          <span>Universal SelfCare: Software Developer (June 2026 – Sep 2026)</span>
        </div>

        {/* Developer Name */}
        <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-[#5f6368] dark:text-[#9aa0a6] uppercase mb-3">
          {siteConfig.name}
        </h2>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#202124] dark:text-[#ffffff] leading-[1.12] mb-5">
          Building Ideas Into <br className="hidden sm:inline" />
          <span className="text-[#1a73e8] dark:text-[#8ab4f8]">
            Intelligent Experiences.
          </span>
        </h1>

        {/* Supporting Headline */}
        <p className="text-base sm:text-lg text-[#5f6368] dark:text-[#bdc1c6] font-normal mb-6 max-w-xl leading-relaxed">
          {siteConfig.subheadline}
        </p>

        {/* Introduction */}
        <p className="text-sm sm:text-base text-[#5f6368] dark:text-[#9aa0a6] mb-10 max-w-xl leading-relaxed">
          {siteConfig.bio}
        </p>

        {/* Three Primary Action Buttons (Google Minimalist Style) */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
          {/* Button 1: Explore My Work */}
          <button
            onClick={() => scrollTo('projects')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium shadow-xs hover:shadow transition-colors cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Button 2: View My Resume */}
          <button
            onClick={() => scrollTo('resume')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#202124] hover:bg-[#f8f9fa] dark:hover:bg-[#303134] text-[#202124] dark:text-[#ffffff] border border-[#dadce0] dark:border-[#3c4043] text-sm font-medium shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
            <span>View My Resume</span>
          </button>

          {/* Button 3: Contact Me */}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] text-sm font-medium transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6]" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-[#dadce0] dark:border-[#3c4043] w-full max-w-2xl flex flex-wrap items-center justify-center gap-6 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
            <span>25 Public Repositories</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#34a853]" />
            <span>5 Playable Web Games</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fbbc04]" />
            <span>Multi-LLM & Computer Vision</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
            <span>GitHub Pages Deployed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

