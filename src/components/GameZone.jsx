import React, { useState } from 'react';
import { 
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
  ChevronRight,
  ShieldAlert
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
    category: 'Retro Shooter',
    difficulty: 'Hard',
    icon: Rocket,
    color: 'from-indigo-500 to-rose-600',
    description: 'Action-packed space defense. Man dual plasma cannons, survive hostile alien waves, and protect your shields.',
    controls: 'A, D / Arrow Keys (Move) • Spacebar (Fire)',
    storageKey: 'space_defender_highscore',
    component: SpaceDefender
  },
  {
    id: '2048',
    title: '2048 Cyber Edition',
    category: 'Strategy & Math',
    difficulty: 'Medium',
    icon: Hash,
    color: 'from-amber-500 to-orange-600',
    description: 'Classic numerical slider with an Apple-style aesthetic. Slide and merge powers of 2 with full Undo and swipe gesture support.',
    controls: 'Arrow Keys / W,A,S,D / Mobile Swipe',
    storageKey: '2048_highscore',
    component: Game2048
  },
  {
    id: 'reaction-rush',
    title: 'Reaction Rush',
    category: 'Reflex Benchmark',
    difficulty: 'Dynamic',
    icon: Clock,
    color: 'from-emerald-500 to-teal-600',
    description: 'Precision reaction timer benchmark. 5 rounds of randomized emerald signals to benchmark your reflexes against esports benchmarks.',
    controls: 'Click / Tap immediately on green flash',
    storageKey: 'reaction_rush_best',
    unit: 'ms',
    component: ReactionRush
  }
];

export default function GameZone() {
  const [activeGameId, setActiveGameId] = useState(null);

  const activeGame = GAMES_CATALOG.find((g) => g.id === activeGameId);
  const ActiveGameComponent = activeGame?.component;

  const getHighScore = (game) => {
    const val = localStorage.getItem(game.storageKey);
    if (!val) return '—';
    return game.unit ? `${val} ${game.unit}` : val;
  };

  return (
    <section id="games" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Interactive Entertainment Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          GAME ZONE: 5 Original Browser Games.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Zero placeholders. Fully playable games engineered with custom 2D canvas physics, audio synthesis, gesture controls, and localStorage high score tracking.
        </p>
      </div>

      {/* Game Cards Lobby Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES_CATALOG.map((game) => {
          const Icon = game.icon;
          const bestScore = getHighScore(game);

          return (
            <div
              key={game.id}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {game.difficulty}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300">
                      {game.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {game.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {game.description}
                </p>

                {/* Controls Preview */}
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Controls:</span>
                  {game.controls}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Personal Best:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{bestScore}</span>
                </div>

                <button
                  onClick={() => setActiveGameId(game.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition transform hover:scale-105 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Game</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Playing Modal Overlay */}
      {activeGame && ActiveGameComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 flex flex-col my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeGame.color} flex items-center justify-center text-white`}>
                  <activeGame.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg leading-tight">{activeGame.title}</h3>
                  <p className="text-[11px] font-mono text-slate-400">{activeGame.category}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveGameId(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Exit Game"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Game Container */}
            <div className="w-full flex justify-center">
              <ActiveGameComponent />
            </div>

            {/* Modal Footer Controls / Dismiss */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">{activeGame.controls}</span>
              <button
                onClick={() => setActiveGameId(null)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer"
              >
                Close Arena
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

