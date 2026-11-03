import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Printer, 
  Building, 
  GraduationCap, 
  Cpu, 
  Sparkles, 
  Briefcase,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { siteConfig } from '../config/siteConfig';

export default function ResumePage({ onNavigate }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Breadcrumb Navigation & Print Action */}
      <nav className="mb-8 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium shadow-xs transition cursor-pointer print:hidden"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </nav>

      {/* Main Resume Paper Card */}
      <div className="bg-white dark:bg-[#1a1a1c] border border-[#dadce0] dark:border-[#3c4043] rounded-2xl p-6 sm:p-10 shadow-xs mb-16">
        {/* Document Header */}
        <header className="border-b border-[#dadce0] dark:border-[#3c4043] pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white mb-1">
              {siteConfig.name}
            </h1>
            <p className="text-sm font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-2">
              Software Developer • Artificial Intelligence • Machine Learning • Data Science
            </p>
            <div className="text-xs text-[#5f6368] dark:text-[#9aa0a6] flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <span>{siteConfig.location}</span>
              <span>•</span>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#1a73e8] dark:text-[#8ab4f8]">
                github.com/VShaunak
              </a>
              <span>•</span>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#1a73e8] dark:text-[#8ab4f8]">
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="text-right sm:block hidden">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] dark:bg-[#133321] text-[#137333] dark:text-[#81c995]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
              Verified Credentials
            </span>
          </div>
        </header>

        {/* Section 1: Professional Experience */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8] mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Professional Work Experience</span>
          </h2>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base font-bold text-[#202124] dark:text-white">
                    Software Developer
                  </h3>
                  <div className="text-xs font-semibold text-[#137333] dark:text-[#81c995]">
                    Universal SelfCare
                  </div>
                </div>
                <div className="text-xs font-mono text-[#5f6368] dark:text-[#9aa0a6]">
                  June 2026 – September 2026
                </div>
              </div>

              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] list-disc list-inside">
                <li>Engineered responsive full-stack software features, healthcare workflows, and digital user experiences.</li>
                <li>Collaborated on API development, data management, and frontend components to ensure high performance and reliability.</li>
                <li>Delivered production-grade code adhering to modern web development, type safety, and accessibility standards.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Education */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#137333] dark:text-[#81c995] mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Education & Academic Credentials</span>
          </h2>

          <div className="p-5 rounded-xl bg-[#f8f9fa] dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-2">
              <div>
                <h3 className="text-base font-bold text-[#202124] dark:text-white">
                  Bachelor's Degree
                </h3>
                <div className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                  Software Engineering & Artificial Intelligence Focus
                </div>
              </div>
              <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1a73e8] dark:text-[#8ab4f8]">
                Cumulative GPA: 3.24 / 4.0
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] mt-2">
              Graduated with a <strong>3.24 GPA</strong> in Bachelor's program, with academic focus on software engineering, data structures, algorithms, neural networks, machine learning, and database architecture.
            </p>
          </div>
        </section>

        {/* Section 3: Flagship Technical Implementations */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#b06000] dark:text-[#fdd663] mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Flagship Software & AI Research</span>
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-[#202124] dark:text-white">
                  RacingGenesis-2.0 — Autonomous AI vs Player WebGL Engine
                </h4>
                <span className="text-[10px] font-mono text-[#1a73e8] dark:text-[#8ab4f8]">CS 549 AI Visual Computing</span>
              </div>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                3D WebGL autonomous racing simulation featuring custom raycasting collision, obstacle avoidance steering algorithms, and comparative benchmark telemetry.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-[#202124] dark:text-white">
                  Multi-LLM FactChecker — Multi-Agent Consensus Verification
                </h4>
                <span className="text-[10px] font-mono text-[#137333] dark:text-[#81c995]">10 AI Models</span>
              </div>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                Parallel query orchestration across 10 free AI LLMs, 45 pairwise semantic comparison matrices, and 3D consensus graph analytics.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043]">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-[#202124] dark:text-white">
                  CareGraph — Healthcare Intelligence & Graph Proximity
                </h4>
                <span className="text-[10px] font-mono text-[#c5221f] dark:text-[#f28b82]">Graph Analytics</span>
              </div>
              <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                Graph analytics platform modeling clinical relationships, symptom-disease connectivity, and urgency-based triage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Technical Skills Summary */}
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6] mb-3">
            Verified Technical Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['Python', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'React.js', 'PyTorch', 'TensorFlow', 'OpenCV', 'SQL / T-SQL', 'Docker', 'Git & GitHub', 'REST APIs', 'WebGL', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-md bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6]">
                {tech}
              </span>
            ))}
          </div>
        </section>
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
          onClick={() => onNavigate('contact')}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs font-medium text-white shadow-xs cursor-pointer"
        >
          <span>Get in Touch with Shaunak</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </footer>
    </article>
  );
}

