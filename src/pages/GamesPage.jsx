import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Gamepad2, 
  Trophy, 
  Flame, 
  Zap, 
  Brain, 
  Rocket, 
  Hash, 
  Clock, 
  Play, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import NeonRacer from '../games/NeonRacer';
import MemoryMatrix from '../games/MemoryMatrix';
import SpaceDefender from '../games/SpaceDefender';
import Game2048 from '../games/Game2048';
import ReactionRush from '../games/ReactionRush';

const GAMES_CATALOG = [
  {
    id: 'neon-racer',
    title: 'Neon Racer',
    category: 'Cyber Arcade',
    difficulty: 'Medium',
    icon: Zap,
    color: 'from-cyan-500 to-blue-600',
    description: 'Top-down cyberpunk arcade racer. Dodge oncoming hazards, collect blue energy orbs, and test your high-speed reflexes.',
    controls: 'Arrow Keys / A, D (Steer) • W / Up (Boost)',
    storageKey: 'neon_racer_highscore',
    component: NeonRacer
  },
  {
    id: 'memory-matrix',
    title: 'Memory Matrix',
    category: 'Cognitive Puzzle',
    difficulty: 'Hard',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    description: 'Audio-visual pattern challenge. Memorize the cascading sequence of glowing acoustic tiles and repeat them before time expires.',
    controls: 'Click / Touch tiles in matching order',
    storageKey: 'memory_matrix_highscore',
    component: MemoryMatrix
  },
  {
    id: 'space-defender',
    title: 'Space Defender',
    category: 'Retro Shoot-em-up',
    difficulty: 'Medium',
    icon: Rocket,
    color: 'from-emerald-500 to-teal-600',
    description: 'Classic vertical space defender. Blast incoming alien swarms, dodge orbital lasers, and rack up multiplier combos.',
    controls: 'A, D / Left, Right (Move) • Spacebar (Fire)',
    storageKey: 'space_defender_highscore',
    component: SpaceDefender
  },
  {
    id: 'game-2048',
    title: 'Quantum 2048',
    category: 'Mathematical Strategy',
    difficulty: 'Medium',
    icon: Hash,
    color: 'from-amber-500 to-orange-600',
    description: 'Slide numbered tiles across a 4x4 matrix. When two matching values collide, they merge to synthesize the 2048 tile.',
    controls: 'Arrow Keys / Swipe (Up, Down, Left, Right)',
    storageKey: 'game_2048_highscore',
    component: Game2048
  },
  {
    id: 'reaction-rush',
    title: 'Reaction Rush',
    category: 'Reflex Benchmark',
    difficulty: 'Easy to Master',
    icon: Clock,
    color: 'from-rose-500 to-red-600',
    description: 'Precision reaction time measurement. Wait for the signal shift from red to green, then trigger your click instantly.',
    controls: 'Click / Tap the active zone on GREEN',
    storageKey: 'reaction_rush_best',
    component: ReactionRush
  }
];

export default function GamesPage({ onNavigate }) {
  const [activeGameId, setActiveGameId] = useState(GAMES_CATALOG[0].id);

  const activeGame = GAMES_CATALOG.find((g) => g.id === activeGameId) || GAMES_CATALOG[0];
  const ActiveGameComponent = activeGame.component;

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
          5 Interactive Games
        </span>
      </nav>

      {/* Header */}
      <header className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef7e0] dark:bg-[#332a00] text-[#b06000] dark:text-[#fdd663] text-xs font-medium mb-3">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>5 ORIGINAL BROWSER ARCADE GAMES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202124] dark:text-white leading-tight mb-3">
          Interactive Game Zone
        </h1>
        <p className="text-sm sm:text-base text-[#5f6368] dark:text-[#9aa0a6] max-w-2xl leading-relaxed">
          Five fully playable browser games engineered with HTML5 Canvas, React state machines, and local high-score persistence.
        </p>
      </header>

      {/* Game Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {GAMES_CATALOG.map((game) => {
          const isActive = game.id === activeGameId;
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => setActiveGameId(game.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#1a73e8] text-white shadow-xs'
                  : 'bg-white/80 dark:bg-[#202124]/80 text-[#3c4043] dark:text-[#bdc1c6] border border-[#dadce0] dark:border-[#3c4043] hover:bg-[#f1f3f4] dark:hover:bg-[#303134]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{game.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Game Stage Card */}
      <div className="bg-white/90 dark:bg-[#1a1a1c]/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#dadce0] dark:border-[#3c4043] shadow-xs mb-16">
        {/* Game Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#dadce0] dark:border-[#3c4043]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8]">
                {activeGame.category}
              </span>
              <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">•</span>
              <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                Difficulty: {activeGame.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124] dark:text-white">
              {activeGame.title}
            </h2>
          </div>

          <div className="text-xs font-mono text-[#5f6368] dark:text-[#9aa0a6] bg-[#f1f3f4] dark:bg-[#202124] px-3 py-1.5 rounded-lg">
            {activeGame.controls}
          </div>
        </div>

        {/* Embedded Game Component */}
        <div className="flex justify-center items-center py-2">
          <ActiveGameComponent />
        </div>
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
          onClick={() => onNavigate('resume')}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs font-medium text-white shadow-xs cursor-pointer"
        >
          <span>View Professional Resume</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </footer>
    </article>
  );
}

