import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles, Terminal } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              SV
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Turning complex engineering problems into intelligent software experiences and interactive systems.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <a href="#hero" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</a>
          <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About</a>
          <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Skills</a>
          <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Projects</a>
          <a href="#games" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Game Zone</a>
          <a href="#resume" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Resume</a>
          <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</a>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.linkedin || "https://www.linkedin.com/in/shaunak-vidwans/"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition shadow-sm ml-2 cursor-pointer"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <div>
          © {new Date().getFullYear()} Shaunak Vidwans. Built with React 18, Vite, Tailwind CSS & HTML5 Canvas.
        </div>
        <div className="flex items-center gap-1 font-mono">
          <span>Published on GitHub Pages via automated Actions</span>
        </div>
      </div>
    </footer>
  );
}
