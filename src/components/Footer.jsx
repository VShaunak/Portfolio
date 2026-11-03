import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles, Terminal } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { siteConfig } from '../config/siteConfig';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'games', label: 'Game Zone' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm border-t border-[#dadce0] dark:border-[#3c4043] text-[#5f6368] dark:text-[#9aa0a6] py-12 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-2 mb-1.5 cursor-pointer text-left focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-semibold text-xs shadow-xs">
              S
            </div>
            <span className="font-semibold text-[#202124] dark:text-white text-sm">
              {siteConfig.name}
            </span>
          </button>
          <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] max-w-sm">
            Turning complex engineering challenges into intelligent software experiences and interactive systems.
          </p>
        </div>

        {/* Quick Page Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate && onNavigate(link.id)}
              className="text-[#5f6368] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] transition"
            aria-label="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={siteConfig.linkedin || "https://www.linkedin.com/in/shaunak-vidwans/"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="p-2 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] transition"
            aria-label="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#1a73e8] hover:text-white transition shadow-xs ml-1 cursor-pointer"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5f6368] dark:text-[#9aa0a6] gap-2">
        <div>
          © {new Date().getFullYear()} Shaunak Vidwans • Software Developer • AI & Machine Learning
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <span>Universal SelfCare (June 2026 – Sep 2026) • Bachelor's GPA: 3.24</span>
        </div>
      </div>
    </footer>
  );
}
