import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  Search, 
  ExternalLink, 
  Globe, 
  Layers,
  Sparkles,
  Play
} from 'lucide-react';
import { Github } from '../components/Icons';
import { projectsData } from '../data/projectsData';

const CATEGORIES = [
  'All',
  'AI & Machine Learning',
  'Data Science & Analytics',
  'Web Development',
  'Software Engineering',
  'Interactive Applications',
  'Database & Backend'
];

export default function ProjectsPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          project.category === selectedCategory ||
          project.categoryTags?.includes(selectedCategory);

        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.repoName.toLowerCase().includes(query) ||
          project.technologies.some((t) => t.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.updatedAt.localeCompare(a.updatedAt);
        }
        if (sortBy === 'recent') {
          return b.updatedAt.localeCompare(a.updatedAt);
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

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
          {filteredProjects.length} of {projectsData.length} Repositories
        </span>
      </nav>

      {/* Header */}
      <header className="mb-8 text-left">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-2">
          <span>PROJECT DIRECTORY</span>
          <span>•</span>
          <span>25 VERIFIED PUBLIC REPOSITORIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202124] dark:text-white leading-tight mb-3">
          Projects & Implementations
        </h1>
        <p className="text-sm sm:text-base text-[#5f6368] dark:text-[#9aa0a6] max-w-2xl leading-relaxed">
          Every project below opens its dedicated technical page with architectural breakdowns, problem context, and source code.
        </p>
      </header>

      {/* Google-Inspired Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search Input & Sort dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, model, or tech (e.g. PyTorch, OpenRouter, T-SQL)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/90 dark:bg-[#202124]/90 border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-white placeholder-[#5f6368] dark:placeholder-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-full bg-white/90 dark:bg-[#202124]/90 border border-[#dadce0] dark:border-[#3c4043] text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="recent">Recently Updated</option>
              <option value="name">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Minimalist Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-white/80 dark:bg-[#202124]/80 text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f1f3f4] dark:hover:bg-[#303134]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Count */}
      <div className="flex items-center justify-between text-xs text-[#5f6368] dark:text-[#9aa0a6] mb-4 pb-2 border-b border-[#dadce0] dark:border-[#3c4043]">
        <span>{filteredProjects.length} projects found</span>
        <span>Click row to open dedicated page</span>
      </div>

      {/* Clean List View */}
      <div className="divide-y divide-[#dadce0] dark:divide-[#3c4043] mb-16">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => onNavigate('project-detail', project.id)}
              className="group py-6 flex flex-col sm:flex-row items-start justify-between gap-4 cursor-pointer hover:bg-white/60 dark:hover:bg-[#1a1a1c]/60 px-3 sm:px-4 rounded-xl transition duration-150"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                    {project.category}
                  </span>
                  {project.liveUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#137333] dark:text-[#81c995]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
                      Live Website Available
                    </span>
                  )}
                  {project.youtubeUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#c5221f] dark:text-[#f28b82]">
                      <Play className="w-3 h-3 fill-current" />
                      Video Demo
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#202124] dark:text-white group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors leading-snug mb-2">
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
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] px-1.5 py-0.5 text-[#5f6368] dark:text-[#9aa0a6]">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Right Action Links */}
              <div 
                className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto pt-2 sm:pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onNavigate('project-detail', project.id)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Read project page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] hover:bg-[#e8f0fe] dark:hover:bg-[#1a2e4c] transition"
                      title="Visit Live Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-white hover:bg-[#e8eaed] dark:hover:bg-[#303134] transition"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white/70 dark:bg-[#1a1a1c]/70 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] mb-16">
          <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm mb-3">
            No projects matched "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-[#1a73e8] text-white text-xs font-medium rounded-full cursor-pointer"
          >
            Clear Search & Reset
          </button>
        </div>
      )}

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
          onClick={() => onNavigate('games')}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs font-medium text-white shadow-xs cursor-pointer"
        >
          <span>Try Interactive Game Zone</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </footer>
    </article>
  );
}

