import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowLeft, Gamepad2, FileText, Send, Sparkles } from 'lucide-react';
import { Github } from './Icons';
import { siteConfig } from '../config/siteConfig';

export default function Navbar({ darkMode, setDarkMode, isProjectPage, onNavigateHome }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isProjectPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'games', 'resume', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectPage]);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'games', label: 'Game Zone', icon: Gamepad2, badge: '5' },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Send }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (isProjectPage) {
      if (onNavigateHome) onNavigateHome(id);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled || isProjectPage
          ? 'bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-[#dadce0] dark:border-[#3c4043] shadow-xs'
          : 'bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 text-left cursor-pointer group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-semibold text-sm shadow-sm group-hover:bg-[#1557b0] transition-colors">
            S
          </div>
          <div>
            <span className="font-semibold text-[#202124] dark:text-[#ffffff] tracking-tight text-sm sm:text-base block leading-none">
              Shaunak Vidwans
            </span>
            <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] block mt-0.5">
              Software & AI Developer
            </span>
          </div>
        </button>

        {/* Center / Right Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = !isProjectPage && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#1a2e4c]'
                    : 'text-[#3c4043] dark:text-[#bdc1c6] hover:text-[#202124] dark:hover:text-[#ffffff] hover:bg-[#f1f3f4] dark:hover:bg-[#202124]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1a73e8] dark:text-[#8ab4f8]">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Theme Toggle & GitHub */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:bg-[#f1f3f4] dark:hover:bg-[#202124] transition cursor-pointer"
            title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5f6368]" />}
          </button>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#202124] dark:text-[#e8eaed] border border-[#dadce0] dark:border-[#3c4043] transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-[#5f6368] dark:text-[#9aa0a6]"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#f1f3f4] dark:hover:bg-[#202124] transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-[#121212] border-b border-[#dadce0] dark:border-[#3c4043] px-4 pt-2 pb-5 space-y-1 shadow-md">
          {navLinks.map((link) => {
            const isActive = !isProjectPage && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-between ${
                  isActive
                    ? 'text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#1a2e4c]'
                    : 'text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#f1f3f4] dark:hover:bg-[#202124]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1a73e8] dark:text-[#8ab4f8]">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#dadce0] dark:border-[#3c4043]">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium bg-[#f1f3f4] dark:bg-[#202124] text-[#202124] dark:text-[#e8eaed]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repositories</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
