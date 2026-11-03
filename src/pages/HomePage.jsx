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
  Play
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import InteractiveGeometricName from '../components/InteractiveGeometricName';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projectsData';

export default function HomePage({ onNavigate }) {
  // Curated flagship projects for the Selected Work section
  const selectedProjects = projectsData.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-28">
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="text-center flex flex-col items-center pt-8 sm:pt-12">
        {/* Subtle greeting */}
        <p className="text-sm sm:text-base font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-1">
          Hi, I'm
        </p>

        {/* Big, Attractive, Interactive Geometric Shaunak Vidwans */}
        <InteractiveGeometricName />

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white leading-snug mt-2 mb-4 max-w-3xl">
          Building Ideas Into{' '}
          <span className="text-[#1a73e8] dark:text-[#8ab4f8]">
            Intelligent Experiences.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-[#5f6368] dark:text-[#bdc1c6] max-w-2xl font-normal leading-relaxed mb-8">
          Software Developer turning complex algorithms and data into practical technology solutions, exploring artificial intelligence, machine learning, and interactive applications.
        </p>

        {/* Three Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
          <button
            onClick={() => onNavigate('projects')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium shadow-xs hover:shadow transition cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/90 dark:bg-[#202124]/90 hover:bg-white dark:hover:bg-[#303134] text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] text-sm font-medium shadow-xs transition cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" />
            <span>View Resume</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-[#202124]/80 hover:bg-white dark:hover:bg-[#303134] text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0]/80 dark:border-[#3c4043] text-sm font-medium transition cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#5f6368] dark:text-[#9aa0a6]" />
            <span>Contact Me</span>
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 01 / SELECTED WORK — Things I've built.                       */}
      {/* ============================================================ */}
      <section id="selected-work" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
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

        {/* Clean Project Showcase */}
        <div className="space-y-6">
          {selectedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate('project-detail', project.id)}
              className="group p-6 sm:p-7 rounded-2xl bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition shadow-xs hover:shadow cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">
                    {project.category}
                  </span>
                  {project.youtubeUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#c5221f] dark:text-[#f28b82]">
                      <Play className="w-3 h-3 fill-current" />
                      Video Walkthrough
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#202124] dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors mb-2.5">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#bdc1c6] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Project Actions: ONLY GitHub Source Code + Read Project Breakdown */}
              <div 
                className="pt-4 border-t border-[#dadce0]/70 dark:border-[#3c4043]/70 flex flex-wrap items-center justify-between gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-xs font-medium text-[#202124] dark:text-white border border-[#dadce0] dark:border-[#3c4043] transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Source Code</span>
                </a>

                <button
                  onClick={() => onNavigate('project-detail', project.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>Read project page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 dark:bg-[#202124]/90 border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] text-xs font-medium text-[#202124] dark:text-white shadow-xs transition cursor-pointer"
          >
            <span>Browse Complete 25-Repository Directory</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1a73e8] dark:text-[#8ab4f8]" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 / EXPERIENCE & EDUCATION                                  */}
      {/* ============================================================ */}
      <section id="experience" className="scroll-mt-24">
        <div className="mb-8 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
            02 / Experience & Education
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
            Where I've worked and studied.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work Experience */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-2 font-mono">
                <span>June 2026 — September 2026</span>
                <span>United States</span>
              </div>

              <h3 className="text-xl font-bold text-[#202124] dark:text-white mb-1">
                Software Developer
              </h3>
              <div className="text-sm font-semibold text-[#137333] dark:text-[#81c995] mb-4">
                Universal SelfCare
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed list-disc list-inside">
                <li>Engineered responsive full-stack software features, healthcare workflows, and digital user experiences.</li>
                <li>Collaborated on API development, data management, and frontend components to ensure high performance and reliability.</li>
                <li>Delivered production-grade code adhering to modern web development, type safety, and accessibility standards.</li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#dadce0]/70 dark:border-[#3c4043]/70">
              <button
                onClick={() => onNavigate('resume')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
              >
                <span>View full experience details on Resume page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Academic Background */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-2 font-mono">
                <span>Undergraduate Degree</span>
                <span className="font-semibold text-[#1a73e8] dark:text-[#8ab4f8]">GPA: 3.24 / 4.0</span>
              </div>

              <h3 className="text-xl font-bold text-[#202124] dark:text-white mb-1">
                Bachelor's Degree
              </h3>
              <div className="text-sm font-medium text-[#5f6368] dark:text-[#9aa0a6] mb-4">
                Software Engineering & Artificial Intelligence Focus
              </div>

              <p className="text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed mb-4">
                Graduated with a cumulative <strong>3.24 GPA</strong>. Academic background emphasizing algorithms, data structures, neural networks, machine learning theory, systems architecture, and database design.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {['Algorithms', 'Neural Networks', 'Machine Learning', 'Data Structures', 'Database Systems', 'Computer Vision'].map((course) => (
                  <span
                    key={course}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#dadce0]/70 dark:border-[#3c4043]/70">
              <button
                onClick={() => onNavigate('resume')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
              >
                <span>Inspect academic credentials & PDF CV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03 / TECHNICAL SKILLS — My toolkit.                           */}
      {/* ============================================================ */}
      <section id="skills" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <div>
            <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
              03 / Technical Skills
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
              My toolkit.
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] mt-1 max-w-xl">
              Languages, frameworks, ML tools, and databases applied across public GitHub codebases and industry software.
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

        {/* 4 Clean Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Languages */}
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#1a73e8] dark:text-[#8ab4f8] mb-3">
              Languages
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6]">
              <li className="font-medium text-[#202124] dark:text-white">Python</li>
              <li className="font-medium text-[#202124] dark:text-white">JavaScript (ES6+)</li>
              <li className="font-medium text-[#202124] dark:text-white">SQL (T-SQL, MySQL)</li>
              <li>C / C++</li>
              <li>HTML5 & CSS3</li>
            </ul>
          </div>

          {/* Web & Databases */}
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#137333] dark:text-[#81c995] mb-3">
              Web & Databases
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6]">
              <li className="font-medium text-[#202124] dark:text-white">React.js</li>
              <li className="font-medium text-[#202124] dark:text-white">Flask & FastAPI</li>
              <li>Node.js</li>
              <li>PostgreSQL & MySQL</li>
              <li>REST APIs & JSON-RPC</li>
            </ul>
          </div>

          {/* Machine Learning & AI */}
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#b06000] dark:text-[#fdd663] mb-3">
              Machine Learning & AI
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6]">
              <li className="font-medium text-[#202124] dark:text-white">PyTorch</li>
              <li className="font-medium text-[#202124] dark:text-white">TensorFlow</li>
              <li>OpenCV & Vision Models</li>
              <li>Multi-LLM Orchestration</li>
              <li>Scikit-learn & NumPy</li>
            </ul>
          </div>

          {/* Infrastructure & Tools */}
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#c5221f] dark:text-[#f28b82] mb-3">
              Tools & Infra
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#3c4043] dark:text-[#bdc1c6]">
              <li className="font-medium text-[#202124] dark:text-white">Git & GitHub</li>
              <li>Docker</li>
              <li>GitHub Actions CI/CD</li>
              <li>WebGL & 3D Canvas</li>
              <li>Vite & Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04 / ABOUT — A little about me.                               */}
      {/* ============================================================ */}
      <section id="about" className="scroll-mt-24">
        <div className="mb-8 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
            04 / About
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
            A little about me.
          </h2>
        </div>

        <div className="bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] shadow-xs space-y-4 text-sm sm:text-base text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
          <p>
            I'm a software developer with industry experience at <strong>Universal SelfCare (June 2026 – Sep 2026)</strong> and an academic foundation in computer science and artificial intelligence (Bachelor's GPA: <strong>3.24</strong>). I enjoy turning complex computational ideas into intuitive, dependable technology solutions.
          </p>
          <p>
            My engineering work spans applied artificial intelligence, deep learning models, data science pipelines, database architecture, and interactive web simulations. Whether training autonomous driving agents in WebGL, evaluating consensus across 10 free LLMs in parallel, or architecting healthcare triage networks with graph proximity, I prioritize clean system architecture and measurable real-world utility.
          </p>
          <p>
            I believe software should be built with craftsmanship: thoughtful user interfaces, transparent algorithms, robust error handling, and zero unnecessary bloat.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
            >
              <span>Read complete engineering philosophy & 7 pillars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#dadce0] dark:text-[#3c4043]">•</span>
            <button
              onClick={() => onNavigate('games')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#34a853] dark:text-[#81c995] hover:underline cursor-pointer"
            >
              <span>Try 5 interactive arcade games</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05 / CONTACT — Let's talk.                                   */}
      {/* ============================================================ */}
      <section id="contact" className="scroll-mt-24">
        <div className="mb-8 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <span className="text-xs font-mono font-semibold text-[#1a73e8] dark:text-[#8ab4f8] uppercase tracking-wider block mb-1">
            05 / Contact
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-white">
            Let's talk.
          </h2>
        </div>

        <div className="bg-white/85 dark:bg-[#1a1a1c]/85 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm sm:text-base text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed mb-4">
              I'm open to software engineering and artificial intelligence opportunities, research discussions, or technical consultations. Feel free to connect or send a message.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#202124] dark:text-white transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/VShaunak</span>
              </a>

              <a
                href={siteConfig.linkedin || "https://www.linkedin.com/in/shaunak-vidwans/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#202124] dark:text-white transition"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>

              <span>• Location: United States</span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-xs hover:shadow transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send a Message</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
