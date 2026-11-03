import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Calendar, 
  Globe, 
  ArrowRight,
  Code2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Github } from '../components/Icons';
import { projectsData } from '../data/projectsData';

export default function ProjectPage({ projectId, onNavigateBack, onSelectProject }) {
  const projectIndex = projectsData.findIndex((p) => p.id === projectId);
  const project = projectsData[projectIndex] || projectsData[0];

  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${project.title} — Shaunak Vidwans`;
    return () => {
      document.title = 'Shaunak Vidwans — Software Developer | AI & Machine Learning | Data Science';
    };
  }, [project]);

  // Extract YouTube embed URL if present
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(project.youtubeUrl);

  return (
    <article className="min-h-screen bg-white dark:bg-[#121212] text-[#202124] dark:text-[#e8eaed] pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-colors duration-200">
      {/* Top Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center justify-between">
        <button
          onClick={onNavigateBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to all projects</span>
        </button>

        <span className="text-xs font-mono text-[#5f6368] dark:text-[#9aa0a6]">
          Project {projectIndex + 1} of {projectsData.length}
        </span>
      </nav>

      {/* Project Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#e8f0fe] dark:bg-[#1a2e4c] text-[#1967d2] dark:text-[#8ab4f8]">
            {project.category}
          </span>
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] dark:bg-[#133321] text-[#137333] dark:text-[#81c995]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
              Live Published
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202124] dark:text-[#ffffff] leading-tight mb-4">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#5f6368] dark:text-[#bdc1c6] leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-[#dadce0] dark:border-[#3c4043]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium transition shadow-sm"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1f3f4] dark:bg-[#202124] hover:bg-[#e8eaed] dark:hover:bg-[#303134] text-[#202124] dark:text-[#e8eaed] text-sm font-medium border border-[#dadce0] dark:border-[#3c4043] transition"
            >
              <Github className="w-4 h-4" />
              <span>Source Code on GitHub</span>
            </a>
          )}

          {project.youtubeUrl && !embedUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#fce8e6] dark:bg-[#371e1c] text-[#c5221f] dark:text-[#f28b82] text-sm font-medium transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Video Walkthrough</span>
            </a>
          )}
        </div>
      </header>

      {/* Embedded Video Demo (if available, e.g. RacingGenesis 2.0) */}
      {embedUrl && (
        <section className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6] mb-3">
            Video Demonstration Walkthrough
          </h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#dadce0] dark:border-[#3c4043] shadow-sm">
            <iframe
              src={embedUrl}
              title={`${project.title} Video Demonstration`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Main Body Content Sections */}
      <div className="space-y-12">
        {/* Section 1: Problem Statement */}
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8] mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>The Challenge & Context</span>
          </h2>
          <div className="bg-[#f8f9fa] dark:bg-[#1a1a1c] p-6 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]">
            <p className="text-sm sm:text-base text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
              {project.problem}
            </p>
          </div>
        </section>

        {/* Section 2: Technical Approach */}
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#137333] dark:text-[#81c995] mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>System Architecture & Engineering Approach</span>
          </h2>
          <div className="bg-[#f8f9fa] dark:bg-[#1a1a1c] p-6 rounded-2xl border border-[#dadce0] dark:border-[#3c4043]">
            <p className="text-sm sm:text-base text-[#3c4043] dark:text-[#bdc1c6] leading-relaxed">
              {project.approach}
            </p>
          </div>
        </section>

        {/* Section 3: Key Features & Capabilities */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[#202124] dark:text-white mb-4">
              Core Capabilities & Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1c] border border-[#dadce0] dark:border-[#3c4043]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#34a853] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#3c4043] dark:text-[#bdc1c6] leading-snug">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Technologies Used */}
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6] mb-3">
            Technologies & Frameworks
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f1f3f4] dark:bg-[#282a2d] text-[#3c4043] dark:text-[#e8eaed] border border-[#dadce0] dark:border-[#3c4043]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Project Meta Information */}
        <section className="pt-8 border-t border-[#dadce0] dark:border-[#3c4043] flex flex-wrap items-center justify-between text-xs text-[#5f6368] dark:text-[#9aa0a6] gap-4">
          <div>
            Repository: <span className="font-mono text-[#202124] dark:text-[#ffffff]">{project.repoName}</span>
          </div>
          <div>
            Updated: <span className="text-[#202124] dark:text-[#ffffff]">{project.updatedAt}</span>
          </div>
          <div>
            Status: <span className="text-[#137333] dark:text-[#81c995] font-medium">Verified & Active</span>
          </div>
        </section>
      </div>

      {/* Bottom Previous / Next Project Navigation Bar */}
      <footer className="mt-16 pt-8 border-t border-[#dadce0] dark:border-[#3c4043]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <button
              onClick={() => onSelectProject(prevProject)}
              className="text-left p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-1">
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Previous project</span>
              </div>
              <div className="text-sm font-semibold text-[#202124] dark:text-white line-clamp-1 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8]">
                {prevProject.title}
              </div>
            </button>
          ) : <div />}

          {nextProject && (
            <button
              onClick={() => onSelectProject(nextProject)}
              className="text-right p-4 rounded-xl border border-[#dadce0] dark:border-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#8ab4f8] transition group cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-1">
                <span>Next project</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="text-sm font-semibold text-[#202124] dark:text-white line-clamp-1 group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8]">
                {nextProject.title}
              </div>
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 text-sm text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to portfolio homepage</span>
          </button>
        </div>
      </footer>
    </article>
  );
}

