import React, { useState } from 'react';
import { 
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
  BookOpen,
  Wrench
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

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All Technologies');

  const filteredSkills = selectedCategory === 'All Technologies'
    ? technicalSkillsList
    : technicalSkillsList.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>Verified Technology Stack</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Technologies Derived Directly from Repositories.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Every tool, library, and framework listed below is actively utilized in my public GitHub codebases, research models, or deployed applications.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Interactive Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredSkills.map((skill, index) => {
          const Icon = iconMap[skill.icon] || Code;
          return (
            <div
              key={index}
              className="group bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] hover:shadow-xs transition-all duration-150 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {skill.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                  {skill.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real Codebase Guarantee Note */}
      <div className="mt-10 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          * Strictly no artificial percentage-based skill meters. Technical depth is verified through commit history, test suites, and running code.
        </p>
      </div>
    </section>
  );
}

