import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Send, 
  Layers, 
  Cpu, 
  Gamepad2, 
  User, 
  Wrench, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Globe,
  Play
} from 'lucide-react';
import { Github } from '../components/Icons';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projectsData';

export default function HomePage({ onNavigate }) {
  // Flagship projects for home spotlight
  const flagshipProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  const gateways = [
    {
      id: 'about',
      title: 'About & Background',
      category: 'Professional Profile',
      desc: 'Software Developer experience at Universal SelfCare (June 2026 – Sep 2026), AI research, and engineering pillars.',
      icon: User,
      color: 'text-[#1a73e8] dark:text-[#8ab4f8]',
      badge: 'Profile'
    },
    {
      id: 'skills',
      title: 'Verified Tech Stack',
      category: 'Competencies',
      desc: '25+ languages, ML frameworks, databases, and dev tools verified directly from public GitHub repositories.',
      icon: Wrench,
      color: 'text-[#137333] dark:text-[#81c995]',
      badge: 'Verified'
    },
    {
      id: 'projects',
      title: 'Projects Directory',
      category: 'Portfolio',
      desc: 'Explore all 25 public repositories spanning autonomous AI, multi-LLM consensus, healthcare intelligence, and web apps.',
      icon: Layers,
      color: 'text-[#1a73e8] dark:text-[#8ab4f8]',
      badge: '25 Repos'
    },
    {
      id: 'games',
      title: 'Arcade Game Zone',
      category: 'Interactive Labs',
      desc: 'Play 5 custom browser arcade games (Neon Racer, Memory Matrix, Space Defender, 2048, Reaction Rush) with high scores.',
      icon: Gamepad2,
      color: 'text-[#b06000] dark:text-[#fdd663]',
      badge: '5 Games'
    },
    {
      id: 'resume',
      title: 'Curriculum Vitae',
      category: 'Credentials',
      desc: 'Inspect verified work experience at Universal SelfCare, Bachelor\'s GPA 3.24, education, and print/export PDF.',
      icon: FileText,
      color: 'text-[#185abc] dark:text-[#8ab4f8]',
      badge: 'Resume'
    },
    {
      id: 'contact',
      title: 'Direct Contact',
      category: 'Inquiries',
      desc: 'Send a direct message through the validated form or reach out via email, LinkedIn, or GitHub.',
      icon: Send,
      color: 'text-[#c5221f] dark:text-[#f28b82]',
      badge: 'Connect'
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* 1. Hero Section */}
      <section className="text-center flex flex-col items-center mb-24">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#202124]/80 backdrop-blur-sm text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0] dark:border-[#3c4043] text-xs font-medium tracking-normal mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#34a853]" />
          <span>Universal SelfCare: Software Developer (June 2026 – Sep 2026)</span>
        </div>

        {/* Developer Name */}
        <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-[#5f6368] dark:text-[#9aa0a6] uppercase mb-3">
          {siteConfig.name}
        </h2>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#202124] dark:text-[#ffffff] leading-[1.10] mb-6 max-w-4xl">
          Building Ideas Into <br className="hidden sm:inline" />
          <span className="text-[#1a73e8] dark:text-[#8ab4f8]">
            Intelligent Experiences.
          </span>
        </h1>

        {/* Supporting Headline */}
        <p className="text-base sm:text-xl text-[#5f6368] dark:text-[#bdc1c6] font-normal mb-6 max-w-2xl leading-relaxed">
          {siteConfig.subheadline}
        </p>

        {/* Introduction */}
        <p className="text-sm sm:text-base text-[#5f6368] dark:text-[#9aa0a6] mb-10 max-w-2xl leading-relaxed">
          {siteConfig.bio}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
          <button
            onClick={() => onNavigate('projects')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium shadow-xs hover:shadow transition-colors cursor-pointer"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/90 dark:bg-[#202124]/90 hover:bg-white dark:hover:bg-[#303134] text-[#202124] dark:text-[#ffffff] border border-[#dadce0] dark:border-[#3c4043] text-sm font-medium shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
            <span>View Resume</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-[#202124]/80 hover:bg-white dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0]/80 dark:border-[#3c4043] text-sm font-medium transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6]" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-[#dadce0]/70 dark:border-[#3c4043]/70 w-full max-w-2xl flex flex-wrap items-center justify-center gap-6 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
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
            <span>Bachelor's GPA: 3.24</span>
          </div>
        </div>
      </section>

      {/* 2. Page Gateways Grid (Dedicated Pages Overview) */}
      <section className="mb-24">
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8] mb-2">
            <span>PORTFOLIO SECTIONS</span>
            <span>•</span>
            <span>SEPARATE DEDICATED PAGES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124] dark:text-white">
            Explore Portfolio Pages
          </h2>
          <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-1">
            Each section features its own dedicated page with comprehensive architectural notes, source code, and live tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gateways.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group p-6 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition-all duration-150 hover:-translate-y-0.5 shadow-xs hover:shadow cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#f1f3f4] dark:bg-[#202124] flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] text-[#5f6368] dark:text-[#9aa0a6]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#202124] dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors mb-1.5 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dadce0]/50 dark:border-[#3c4043]/50 flex items-center text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                  <span>Open {item.title} Page</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Flagship Projects Spotlight */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#137333] dark:text-[#81c995] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP RESEARCH & SOFTWARE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124] dark:text-white">
              Featured Flagship Projects
            </h2>
            <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-1">
              Deep dive into autonomous vision computing, multi-LLM consensus graphs, and healthcare intelligence.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer shrink-0"
          >
            <span>View All 25 Repositories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {flagshipProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate('project-detail', project.id)}
              className="group p-6 rounded-2xl bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition shadow-xs hover:shadow cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                    {project.category}
                  </span>
                  {project.liveUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#137333] dark:text-[#81c995]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
                      Live Website
                    </span>
                  )}
                  {project.youtubeUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#c5221f] dark:text-[#f28b82]">
                      <Play className="w-3 h-3 fill-current" />
                      Video Demo
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#202124] dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                <button
                  onClick={() => onNavigate('project-detail', project.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1a73e8] text-white text-xs font-medium hover:bg-[#1557b0] transition shadow-xs cursor-pointer"
                >
                  <span>Open Dedicated Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

