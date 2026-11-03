import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Send, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Code2, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Play,
  Sparkles,
  Terminal,
  Cpu
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import InteractiveGeometricName from '../components/InteractiveGeometricName';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projectsData';

export default function HomePage({ onNavigate }) {
  // Curated flagship projects for the Selected Work section
  const selectedProjects = projectsData.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-28 text-left">
      {/* ============================================================ */}
      {/* HERO SECTION — Completely Left-Aligned                       */}
      {/* ============================================================ */}
      <section className="text-left flex flex-col items-start pt-6 sm:pt-10 max-w-4xl">
        {/* Subtle Greeting */}
        <p className="text-base sm:text-lg font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-1 text-left">
          Hi, I'm
        </p>

        {/* Big, Attractive, Interactive Geometric Shaunak Vidwans */}
        <InteractiveGeometricName />

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#202124] dark:text-white leading-tight mt-2 mb-4 text-left">
          Building Ideas Into{' '}
          <span className="text-[#1a73e8] dark:text-[#8ab4f8]">
            Intelligent Experiences.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#5f6368] dark:text-[#bdc1c6] max-w-2xl font-normal leading-relaxed mb-8 text-left">
          Software Developer turning complex algorithms and data into practical technology solutions, exploring artificial intelligence, machine learning, and interactive applications.
        </p>

        {/* Three Primary Action Buttons — Left-Aligned */}
        <div className="flex flex-wrap items-center justify-start gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium shadow-xs hover:shadow transition cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/90 dark:bg-[#202124]/90 hover:bg-white dark:hover:bg-[#303134] text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] text-sm font-medium shadow-xs transition cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
            <span>View Resume</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-[#202124]/80 hover:bg-white dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0]/80 dark:border-[#3c4043] text-sm font-medium transition cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6]" />
            <span>Contact Me</span>
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 01 / SELECTED WORK — Editorial Asymmetric Showcase           */}
      {/* ============================================================ */}
      <section id="selected-work" className="scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <div>
            <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
              01 / Selected Work
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
              Things I've built.
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-1 max-w-xl">
              A selection of projects exploring software engineering, machine learning, multi-agent systems, and data analytics.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer shrink-0"
          >
            <span>View all 25 repositories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Project List (No Regular Boxes) */}
        <div className="divide-y divide-[#dadce0]/80 dark:divide-[#3c4043]/80">
          {selectedProjects.map((project, index) => {
            const indexStr = `0${index + 1}`;
            return (
              <div
                key={project.id}
                onClick={() => onNavigate('project-detail', project.id)}
                className="group py-10 transition-all duration-200 cursor-pointer hover:bg-[#1a73e8]/[0.02] dark:hover:bg-[#8ab4f8]/[0.02] -mx-4 px-4 rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Number + Title + Source Link */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#1a2e4c] px-2 py-0.5 rounded">
                        {indexStr}
                      </span>
                      <span className="text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6]">
                        {project.category}
                      </span>
                      {project.youtubeUrl && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#c5221f] dark:text-[#f28b82]">
                          <Play className="w-3 h-3 fill-current" />
                          Demo
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#202124] dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors leading-tight mb-4">
                      {project.title}
                    </h3>

                    {/* GitHub Source Code Button (Strictly No Live Website) */}
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-xs font-medium text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] transition shadow-2xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Narrative Description + Technologies */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full">
                    <p className="text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/80 dark:bg-[#202124] text-[#5f6368] dark:text-[#9aa0a6] border border-[#dadce0]/60 dark:border-[#3c4043]/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] group-hover:translate-x-1 transition-transform shrink-0">
                        <span>Read breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-[#dadce0]/60 dark:border-[#3c4043]/60 flex justify-start">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] text-xs font-medium text-[#202124] dark:text-white shadow-xs transition cursor-pointer"
          >
            <span>Browse Complete 25-Repository Directory</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#8ab4f8]" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 / EXPERIENCE & EDUCATION — Architectural Timeline Spine   */}
      {/* ============================================================ */}
      <section id="experience" className="scroll-mt-24">
        <div className="mb-10 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
            02 / Experience & Education
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
            Where I've worked and studied.
          </h2>
        </div>

        {/* Connected Timeline Spine (No Regular Boxes) */}
        <div className="relative border-l-2 border-[#1a73e8]/25 dark:border-[#8ab4f8]/25 ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12">
          {/* Milestone 1: Universal SelfCare Software Developer */}
          <div className="relative group">
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#121212] border-2 border-[#34a853] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#e6f4ea] dark:bg-[#133321] text-[#137333] dark:text-[#81c995] font-semibold">
                June 2026 — September 2026
              </span>
              <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">• United States</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#202124] dark:text-white mb-1">
              Software Developer
            </h3>
            <div className="text-sm font-semibold text-[#137333] dark:text-[#81c995] mb-3">
              Universal SelfCare
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] max-w-2xl leading-relaxed list-disc list-inside">
              <li>Engineered responsive full-stack software features, healthcare workflows, and digital user experiences.</li>
              <li>Collaborated on API development, data management, and frontend components to ensure high performance and reliability.</li>
              <li>Delivered production-grade code adhering to modern web development, type safety, and accessibility standards.</li>
            </ul>

            <button
              onClick={() => onNavigate('resume')}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
            >
              <span>View Universal SelfCare role on Resume page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Milestone 2: Bachelor's Degree */}
          <div className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#121212] border-2 border-[#1a73e8] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1a73e8] dark:text-[#8ab4f8] font-semibold">
                Undergraduate Degree
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#fef7e0] dark:bg-[#332a00] text-[#b06000] dark:text-[#fdd663]">
                Cumulative GPA: 3.24 / 4.0
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#202124] dark:text-white mb-1">
              Bachelor's Degree
            </h3>
            <div className="text-sm font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-3">
              Software Engineering & Artificial Intelligence Academic Focus
            </div>

            <p className="text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] max-w-2xl leading-relaxed mb-4">
              Graduated with a cumulative <strong>3.24 GPA</strong>. Academic background emphasizing algorithms, data structures, neural networks, machine learning theory, systems architecture, and database design.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {['Algorithms', 'Neural Networks', 'Machine Learning', 'Data Structures', 'Database Systems', 'Computer Vision'].map((course) => (
                <span
                  key={course}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0]/60 dark:border-[#3c4043]/60"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03 / TECHNICAL SKILLS — Creative Constellation Matrix        */}
      {/* ============================================================ */}
      <section id="skills" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <div>
            <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
              03 / Technical Skills
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
              My toolkit.
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-1 max-w-xl">
              Technologies and frameworks applied across public codebases, ML pipelines, and production systems.
            </p>
          </div>

          <button
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer shrink-0"
          >
            <span>Explore all verified skills</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Open Constellation Matrix (No Rigid Boxes) */}
        <div className="space-y-6">
          {/* Track 1: Languages */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center py-3 border-b border-[#dadce0]/50 dark:border-[#3c4043]/50">
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8]">
                Languages
              </span>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {['Python', 'JavaScript (ES6+)', 'SQL (T-SQL, MySQL)', 'C / C++', 'HTML5 & CSS3'].map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-[#1a1a1c] text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] shadow-2xs hover:border-[#1a73e8] transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Track 2: Web & Databases */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center py-3 border-b border-[#dadce0]/50 dark:border-[#3c4043]/50">
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#137333] dark:text-[#81c995]">
                Web & Databases
              </span>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {['React.js', 'Flask & FastAPI', 'Node.js', 'PostgreSQL & MySQL', 'REST APIs & WebSockets'].map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-[#1a1a1c] text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] shadow-2xs hover:border-[#34a853] transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Track 3: Machine Learning & AI */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center py-3 border-b border-[#dadce0]/50 dark:border-[#3c4043]/50">
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fbbc04]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b06000] dark:text-[#fdd663]">
                Machine Learning & AI
              </span>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {['PyTorch', 'TensorFlow', 'OpenCV & Vision Models', 'Multi-LLM Orchestration', 'Scikit-learn & NumPy'].map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-[#1a1a1c] text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] shadow-2xs hover:border-[#fbbc04] transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Track 4: Tools & Infrastructure */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center py-3 border-b border-[#dadce0]/50 dark:border-[#3c4043]/50">
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#c5221f] dark:text-[#f28b82]">
                Tools & Infra
              </span>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {['Git & GitHub', 'Docker', 'GitHub Actions CI/CD', 'WebGL & 3D Canvas', 'Vite & Tailwind CSS'].map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-[#1a1a1c] text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] shadow-2xs hover:border-[#ea4335] transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04 / ABOUT — Editorial Storytelling Format                   */}
      {/* ============================================================ */}
      <section id="about" className="scroll-mt-24">
        <div className="mb-10 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
            04 / About
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
            A little about me.
          </h2>
        </div>

        {/* Editorial Storytelling Layout (No Enclosed Box) */}
        <div className="space-y-6">
          <blockquote className="text-lg sm:text-2xl font-medium text-[#202124] dark:text-white leading-relaxed border-l-4 border-[#1a73e8] pl-4 sm:pl-6 my-6 italic">
            "Turning complex computational theories into dependable, human-friendly technology."
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
            <p>
              I'm a software developer with industry experience at <strong>Universal SelfCare (June 2026 – Sep 2026)</strong> and an academic foundation in computer science and artificial intelligence (Bachelor's GPA: <strong>3.24</strong>). I enjoy turning complex computational ideas into intuitive, dependable technology solutions.
            </p>
            <p>
              My engineering work spans applied artificial intelligence, deep learning models, data science pipelines, database architecture, and interactive web simulations. Whether training autonomous driving agents in WebGL, evaluating consensus across 10 free LLMs in parallel, or architecting healthcare triage networks with graph proximity, I prioritize clean system architecture and measurable real-world utility.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-1.5 text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
            >
              <span>Read complete engineering philosophy & 7 pillars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#dadce0] dark:text-[#3c4043]">•</span>
            <button
              onClick={() => onNavigate('games')}
              className="inline-flex items-center gap-1.5 text-[#34a853] dark:text-[#81c995] hover:underline cursor-pointer"
            >
              <span>Try 5 interactive arcade games in Game Zone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05 / CONTACT — Open Minimalist Invitation                    */}
      {/* ============================================================ */}
      <section id="contact" className="scroll-mt-24 pb-8">
        <div className="mb-10 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
            05 / Contact
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
            Let's talk.
          </h2>
        </div>

        {/* Open Minimalist Layout (No Rigid Box) */}
        <div className="space-y-6 max-w-3xl">
          <p className="text-base sm:text-xl text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
            I'm open to software engineering and artificial intelligence opportunities, research discussions, or technical consultations. Feel free to connect or send a message.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-xs hover:shadow transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send a Direct Message</span>
            </button>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#202124] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-xs font-medium text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] transition shadow-2xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={siteConfig.linkedin || "https://www.linkedin.com/in/shaunak-vidwans/"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#202124] hover:bg-[#f1f3f4] dark:hover:bg-[#303134] text-xs font-medium text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] transition shadow-2xs"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="pt-2 text-xs text-[#5f6368] dark:text-[#9aa0a6] font-mono">
            <span>Location: {siteConfig.location} • Available for remote and on-site roles</span>
          </div>
        </div>
      </section>
    </div>
  );
}
