import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Wrench, 
  Search, 
  Code, 
  Cpu, 
  Database, 
  Layout, 
  Flame, 
  Sparkles, 
  Eye, 
  Camera, 
  Binary, 
  Bot, 
  Atom, 
  Zap, 
  Server, 
  Globe, 
  Palette, 
  Compass, 
  Table, 
  PieChart, 
  Box, 
  GitBranch, 
  BookOpen 
} from 'lucide-react';
import { technicalSkillsList } from '../data/skillsData';

const iconMap = {
  Code,
  Cpu,
  Database,
  Layout,
  Flame,
  Sparkles,
  Eye,
  Search,
  Camera,
  Binary,
  Bot,
  Atom,
  Zap,
  Server,
  Globe,
  Palette,
  Compass,
  Table,
  PieChart,
  Box,
  GitBranch,
  BookOpen
};

const CATEGORIES = ['All Technologies', 'Languages', 'AI & ML', 'Web & Backend', 'Data & Tools'];

export default function SkillsPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All Technologies');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return technicalSkillsList.filter((s) => {
      const matchesCategory =
        selectedCategory === 'All Technologies' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono text-[#5f6368] dark:text-[#9aa0a6]">
          {filteredSkills.length} Verified Skills
        </span>
      </nav>

      {/* Page Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1967d2] dark:text-[#8ab4f8] text-xs font-medium mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>VERIFIED DIRECTLY FROM REPOSITORIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202124] dark:text-white leading-tight mb-4">
          Technical Skills & Stack
        </h1>

        <p className="text-base sm:text-lg text-[#5f6368] dark:text-[#bdc1c6] max-w-2xl font-normal leading-relaxed">
          Every tool, library, and framework listed below is actively utilized in Shaunak Vidwans's public GitHub codebases, research models, or deployed systems.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified tools (e.g. PyTorch, React, SQL)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 dark:bg-[#202124]/90 border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-white placeholder-[#5f6368] dark:placeholder-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-white/80 dark:bg-[#202124]/80 text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f1f3f4] dark:hover:bg-[#303134]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-16">
        {filteredSkills.map((skill, index) => {
          const Icon = iconMap[skill.icon] || Code;
          return (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition flex items-center gap-3 shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f1f3f4] dark:bg-[#202124] flex items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8] shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#202124] dark:text-white truncate">
                  {skill.name}
                </div>
                <div className="text-[10px] text-[#5f6368] dark:text-[#9aa0a6] truncate">
                  {skill.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Navigation */}
      <footer className="pt-8 border-t border-[#dadce0] dark:border-[#3c4043] flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>

        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs font-medium text-white shadow-xs cursor-pointer"
        >
          <span>See All 25 Projects Using This Stack</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </footer>
    </article>
  );
}

