import React from 'react';
import { 
  Code2, 
  Brain, 
  Cpu, 
  BarChart3, 
  Database, 
  FlaskConical, 
  Gamepad2, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { engineeringPillars } from '../data/skillsData';

const iconMap = {
  Code2,
  Brain,
  Cpu,
  BarChart3,
  Database,
  FlaskConical,
  Gamepad2
};

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide mb-3">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Universal SelfCare: Software Developer (June 2026 – Sep 2026)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Versatile Engineering Across the Modern Tech Stack.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Industry experience building full-stack platforms at <strong>Universal SelfCare (June 2026 – Sep 2026)</strong>, paired with applied artificial intelligence research, deep learning models, data science pipelines, and interactive browser simulations.
        </p>
      </div>

      {/* 7 Engineering Pillars Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineeringPillars.map((pillar) => {
          const Icon = iconMap[pillar.icon] || Code2;
          return (
            <div
              key={pillar.id}
              className="group relative bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {pillar.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <ul className="space-y-2">
                  {pillar.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Philosophy Banner */}
      <div className="mt-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white border border-indigo-900/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>My Engineering Principles</span>
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            Prioritize measurable substance over decorative hype. Every mathematical model is evaluated transparently, every user interface is designed for spacious clarity, and every codebase is architected for clean maintainability.
          </p>
        </div>
        <a
          href="#projects"
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 shadow-md transition transform hover:scale-105"
        >
          <span>See Projects In Action</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

