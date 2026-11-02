import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import GameZone from './components/GameZone';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme_preference');
    if (saved) return saved === 'dark';
    return false; // Default light theme as requested in prompt: "predominantly light visual theme with sophisticated neutral background"
  });

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenResume={() => {
          const el = document.getElementById('resume');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Verified Technology Stack */}
        <Skills />

        {/* 4. Complete Repository Projects Catalog */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Game Zone (5 Original Interactive Games) */}
        <GameZone />

        {/* 6. Professional Resume Section */}
        <Resume />

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detailed Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

