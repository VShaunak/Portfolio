import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  SlidersHorizontal,
  FolderGit2,
  Calendar,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Github } from './Icons';
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

export default function Projects({ onSelectProject }) {
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#dadce0] dark:border-[#3c4043] transition-colors">
      {/* Section Header: Human, Spacious, Google-Style */}
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-2">
          <span>PROJECT DIRECTORY</span>
          <span>•</span>
          <span>25 PUBLIC REPOSITORIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#202124] dark:text-[#ffffff] mb-3">
          Projects & Implementations
        </h2>
        <p className="text-sm sm:text-base text-[#5f6368] dark:text-[#9aa0a6] max-w-2xl leading-relaxed">
          Click any project to open its dedicated technical page with architectural breakdowns, problem context, and source code.
        </p>
      </div>

      {/* Google-Inspired Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Clean Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6368] dark:text-[#9aa0a6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, model, or tech (e.g. PyTorch, OpenRouter, T-SQL)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-[#ffffff] placeholder-[#5f6368] dark:placeholder-[#9aa0a6] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition shadow-sm"
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
              className="px-4 py-2.5 rounded-full bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] focus:outline-none cursor-pointer"
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
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1a73e8] text-white'
                    : 'bg-[#f1f3f4] dark:bg-[#202124] text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#e8eaed] dark:hover:bg-[#303134]'
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

      {/* Clean List View (No bulky cards - clean Google research directory style) */}
      <div className="divide-y divide-[#dadce0] dark:divide-[#3c4043]">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group py-6 flex flex-col sm:flex-row items-start justify-between gap-4 cursor-pointer hover:bg-[#f8f9fa] dark:hover:bg-[#1a1a1c] px-3 sm:px-4 rounded-xl transition-colors duration-150"
            >
              <div className="flex-1 min-w-0">
                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#202124] dark:text-[#ffffff] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors leading-snug mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>

                {/* Technology chips */}
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
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Read project page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
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
        <div className="text-center py-16 bg-[#f8f9fa] dark:bg-[#1a1a1c] rounded-2xl border border-[#dadce0] dark:border-[#3c4043] mt-4">
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
    </section>
  );
}
