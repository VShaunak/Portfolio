import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import GamesPage from './pages/GamesPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import SolidGeometryBackground from './components/SolidGeometryBackground';

const parseRoute = (hash) => {
  const clean = (hash || '').replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home' || clean === 'hero') {
    return { page: 'home' };
  }
  if (clean.startsWith('project/')) {
    const id = clean.replace('project/', '');
    return { page: 'project-detail', projectId: id };
  }
  if (['about', 'skills', 'projects', 'games', 'resume', 'contact'].includes(clean)) {
    return { page: clean };
  }
  return { page: 'home' };
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme_preference');
    if (saved) return saved === 'dark';
    return false; // Google-style clean neutral light theme default
  });

  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

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
      setRoute(parseRoute(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (targetPage, extraId) => {
    if (targetPage === 'project-detail' && extraId) {
      window.location.hash = `#/project/${extraId}`;
    } else if (targetPage === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${targetPage}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c0f14] text-[#202124] dark:text-[#e8eaed] selection:bg-[#1a73e8] selection:text-white transition-colors duration-200 relative flex flex-col justify-between">
      {/* 3D Solid Geometry Animated Background */}
      <SolidGeometryBackground />

      {/* Top Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage={route.page}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area: Separate Page for Each Navbar Tab */}
      <main className="relative z-10 flex-grow">
        {route.page === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {route.page === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {route.page === 'skills' && (
          <SkillsPage onNavigate={handleNavigate} />
        )}

        {route.page === 'projects' && (
          <ProjectsPage onNavigate={handleNavigate} />
        )}

        {route.page === 'project-detail' && (
          <ProjectPage
            projectId={route.projectId}
            onNavigateBack={() => handleNavigate('projects')}
            onSelectProject={(p) => handleNavigate('project-detail', p.id || p)}
          />
        )}

        {route.page === 'games' && (
          <GamesPage onNavigate={handleNavigate} />
        )}

        {route.page === 'resume' && (
          <ResumePage onNavigate={handleNavigate} />
        )}

        {route.page === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Clean Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

