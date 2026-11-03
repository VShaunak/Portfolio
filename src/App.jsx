import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectPage from './pages/ProjectPage';
import GameZone from './components/GameZone';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SolidGeometryBackground from './components/SolidGeometryBackground';
import { projectsData } from './data/projectsData';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme_preference');
    if (saved) return saved === 'dark';
    return false; // Google-style clean neutral light theme default
  });

  // Track active project page from hash (#/project/:id)
  const [currentProjectId, setCurrentProjectId] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/project/')) {
      return hash.replace('#/project/', '');
    }
    return null;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [darkMode]);

  // Sync hash routing for GitHub Pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const id = hash.replace('#/project/', '');
        setCurrentProjectId(id);
      } else {
        setCurrentProjectId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (project) => {
    const id = typeof project === 'string' ? project : project.id;
    window.location.hash = `#/project/${id}`;
    setCurrentProjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBack = (targetSection = 'projects') => {
    window.location.hash = `#${targetSection}`;
    setCurrentProjectId(null);
    setTimeout(() => {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#121212] text-[#202124] dark:text-[#e8eaed] selection:bg-[#1a73e8] selection:text-white transition-colors duration-200 relative">
      {/* 3D Solid Geometry Animated Background */}
      <SolidGeometryBackground />

      {/* Top Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isProjectPage={Boolean(currentProjectId)}
        onNavigateHome={(sectionId) => handleNavigateBack(sectionId || 'hero')}
      />

      {/* Render dedicated Project Page or Homepage */}
      {currentProjectId ? (
        <main className="pt-8">
          <ProjectPage
            projectId={currentProjectId}
            onNavigateBack={() => handleNavigateBack('projects')}
            onSelectProject={handleSelectProject}
          />
        </main>
      ) : (
        <main>
          {/* 1. Google-Style Calm Minimalist Hero */}
          <Hero
            onOpenResume={() => {
              const el = document.getElementById('resume');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2. About Me Section */}
          <About />

          {/* 3. Verified Technology Stack */}
          <Skills />

          {/* 4. Complete Repository Projects Catalog - Dedicated Page on click */}
          <Projects onSelectProject={handleSelectProject} />

          {/* 5. Game Zone (5 Original Interactive Games) */}
          <GameZone />

          {/* 6. Professional Resume Section */}
          <Resume />

          {/* 7. Contact Section */}
          <Contact />
        </main>
      )}

      {/* Clean Global Footer */}
      <Footer />
    </div>
  );
}

