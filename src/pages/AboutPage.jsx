import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
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
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { engineeringPillars } from '../data/skillsData';
import { siteConfig } from '../config/siteConfig';

const iconMap = {
  Code2,
  Brain,
  Cpu,
  BarChart3,
  Database,
  FlaskConical,
  Gamepad2
};

export default function AboutPage({ onNavigate }) {
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
          Profile & Engineering Pillars
        </span>
      </nav>

      {/* Page Header */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#202124]/80 backdrop-blur-sm text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0] dark:border-[#3c4043] text-xs font-medium tracking-normal mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#34a853]" />
          <span>Universal SelfCare: Software Developer (June 2026 – Sep 2026)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202124] dark:text-white leading-tight mb-4">
          About Shaunak Vidwans
        </h1>

        <p className="text-base sm:text-xl text-[#5f6368] dark:text-[#bdc1c6] leading-relaxed max-w-3xl font-normal">
          Software Developer specializing in artificial intelligence, machine learning, data engineering, full-stack web platforms, and interactive browser simulations.
        </p>
      </header>

      {/* Narrative Section */}
      <section className="mb-16 bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
        <h2 className="text-lg font-bold text-[#202124] dark:text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#1a73e8] dark:text-[#8ab4f8]" />
          <span>Professional Background & Industry Experience</span>
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
          <p>
            I have industry experience building production web features and digital health platforms as a <strong>Software Developer at Universal SelfCare (June 2026 – Sep 2026)</strong>. My work focuses on building clean, high-performance user experiences, resilient APIs, and data-driven systems.
          </p>
          <p>
            Beyond industry software engineering, I conduct active research and experimentation in applied artificial intelligence and machine learning. My projects span autonomous vision systems (WebGL racing with trained obstacle avoidance), consensus fact-checking across 10 parallel LLMs, and clinical intelligence using graph analytics.
          </p>
          <p>
            I hold a Bachelor's Degree with a cumulative <strong>GPA of 3.24</strong>, with rigorous academic focus on algorithms, data structures, machine learning theory, computer vision, and distributed software systems.
          </p>
        </div>
      </section>

      {/* 7 Engineering Pillars Section */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8] mb-2">
            <span>CORE EXPERTISE</span>
            <span>•</span>
            <span>7 ENGINEERING PILLARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124] dark:text-white">
            Engineering Pillars & Focus Areas
          </h2>
          <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-1">
            Structured methodologies applied across public codebases, ML pipelines, and production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {engineeringPillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Code2;
            return (
              <div
                key={pillar.id}
                className="group p-6 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] dark:bg-[#1a2e4c] flex items-center justify-center text-[#1a73e8] dark:text-[#8ab4f8] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#202124] dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 flex flex-wrap gap-1">
                  {pillar.competencies?.slice(0, 3).map((comp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation Actions */}
      <footer className="pt-8 border-t border-[#dadce0] dark:border-[#3c4043] flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-xs font-medium text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] cursor-pointer"
          >
            <span>Verified Tech Stack</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs font-medium text-white shadow-xs cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </article>
  );
}

