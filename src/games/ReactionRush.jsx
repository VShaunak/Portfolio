import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Zap, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const TOTAL_ROUNDS = 5;

export default function ReactionRush() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'early' | 'round_result' | 'summary'
  const [currentRound, setCurrentRound] = useState(1);
  const [roundTimes, setRoundTimes] = useState([]);
  const [lastTime, setLastTime] = useState(0);
  const [bestTime, setBestTime] = useState(() => {
    return parseInt(localStorage.getItem('reaction_rush_best') || '9999', 10);
  });

  const startTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  const startRound = () => {
    setGameState('waiting');
    // Random delay between 1.5s and 4.5s
    const delay = Math.floor(Math.random() * 3000) + 1500;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setGameState('ready');
    }, delay);
  };

  const handleFullStart = () => {
    setCurrentRound(1);
    setRoundTimes([]);
    startRound();
  };

  const handleArenaClick = () => {
    if (gameState === 'idle') {
      handleFullStart();
    } else if (gameState === 'waiting') {
      // Too early! False start
      clearTimeout(timeoutRef.current);
      setGameState('early');
    } else if (gameState === 'ready') {
      // Registered reaction!
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setLastTime(elapsed);
      const updatedTimes = [...roundTimes, elapsed];
      setRoundTimes(updatedTimes);

      if (elapsed < bestTime) {
        setBestTime(elapsed);
        localStorage.setItem('reaction_rush_best', elapsed.toString());
      }

      if (currentRound >= TOTAL_ROUNDS) {
        setGameState('summary');
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {}
      } else {
        setGameState('round_result');
      }
    } else if (gameState === 'early' || gameState === 'round_result') {
      // Advance to next round
      setCurrentRound((prev) => prev + 1);
      startRound();
    } else if (gameState === 'summary') {
      handleFullStart();
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const calculateAverage = () => {
    if (roundTimes.length === 0) return 0;
    const sum = roundTimes.reduce((acc, t) => acc + t, 0);
    return Math.round(sum / roundTimes.length);
  };

  const getReflexRating = (ms) => {
    if (ms <= 180) return { label: 'GODLIKE REFLEXES', color: 'text-amber-400', badge: 'Top 0.1% Esports' };
    if (ms <= 220) return { label: 'F1 DRIVER TIER', color: 'text-emerald-400', badge: 'Top 1% Reflexes' };
    if (ms <= 265) return { label: 'SHARPSHOOTER', color: 'text-cyan-400', badge: 'Fast Reflexes' };
    if (ms <= 330) return { label: 'SOLID REACTION', color: 'text-blue-400', badge: 'Average Human' };
    return { label: 'WARMING UP', color: 'text-slate-400', badge: 'Room to Accelerate' };
  };

  return (
    <div className="relative flex flex-col items-center bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800 shadow-2xl text-white select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Round:</span>
            <span className="font-bold text-white">{Math.min(currentRound, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Best:</span>
            <span className="font-bold text-amber-400">
              {bestTime < 9000 ? `${bestTime} ms` : '—'}
            </span>
          </div>
        </div>

        <button
          onClick={handleFullStart}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          title="Restart Test"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Reactive Click Arena */}
      <div
        onClick={handleArenaClick}
        className={`relative w-full max-w-[360px] h-[360px] rounded-2xl border-2 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 shadow-inner ${
          gameState === 'idle'
            ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            : gameState === 'waiting'
            ? 'bg-red-950/60 border-red-600/80 shadow-red-950/50'
            : gameState === 'ready'
            ? 'bg-emerald-500 border-white text-slate-950 shadow-emerald-500/60 shadow-2xl scale-[1.02]'
            : gameState === 'early'
            ? 'bg-amber-950/70 border-amber-500'
            : gameState === 'round_result'
            ? 'bg-slate-900 border-indigo-500/60'
            : 'bg-slate-900 border-slate-800'
        }`}
      >
        {gameState === 'idle' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 animate-pulse">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">REACTION RUSH</h3>
            <p className="text-sm text-slate-300 mb-6 max-w-[260px]">
              Click as soon as the screen flashes emerald green. 5 rounds to measure your speed.
            </p>
            <div className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25">
              <Play className="w-4 h-4 fill-current" />
              <span>Tap to Begin</span>
            </div>
          </>
        )}

        {gameState === 'waiting' && (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-500/30 border border-red-500 flex items-center justify-center mb-3 text-red-400">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black tracking-widest text-red-400 mb-1">WAIT FOR GREEN...</h4>
            <p className="text-xs text-red-300/80">Do not click yet</p>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="animate-bounce flex flex-col items-center">
            <Zap className="w-16 h-16 text-slate-950 mb-1" />
            <h4 className="text-4xl font-black tracking-tight text-slate-950">CLICK NOW!</h4>
          </div>
        )}

        {gameState === 'early' && (
          <div className="flex flex-col items-center animate-shake">
            <AlertTriangle className="w-14 h-14 text-amber-400 mb-2" />
            <h4 className="text-2xl font-bold text-amber-400 mb-1">TOO EARLY!</h4>
            <p className="text-sm text-slate-300 mb-4">You triggered before the green flash.</p>
            <span className="px-4 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-mono">
              Click to retry round
            </span>
          </div>
        )}

        {gameState === 'round_result' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mb-2" />
            <div className="text-xs text-slate-400 font-mono uppercase mb-1">Round {currentRound} Speed</div>
            <div className="text-5xl font-black text-emerald-400 font-mono mb-2">{lastTime} <span className="text-2xl font-normal">ms</span></div>
            <p className="text-xs text-slate-400 mb-4">Click anywhere to proceed to Round {currentRound + 1}</p>
          </div>
        )}

        {gameState === 'summary' && (
          <div className="flex flex-col items-center w-full">
            <Trophy className="w-12 h-12 text-amber-400 mb-2 animate-bounce" />
            <h4 className="text-xl font-bold text-white mb-1">BENCHMARK COMPLETE</h4>
            <div className="my-2 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 w-full max-w-[260px]">
              <div className="text-xs text-slate-400">5-Round Average:</div>
              <div className="text-3xl font-extrabold text-white font-mono">{calculateAverage()} ms</div>
              <div className={`text-xs font-bold mt-1 ${getReflexRating(calculateAverage()).color}`}>
                {getReflexRating(calculateAverage()).label}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
              {roundTimes.map((t, idx) => (
                <span key={idx} className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">{t}ms</span>
              ))}
            </div>
            <span className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-lg">
              Test Again
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-slate-400 text-center">
        Average human reaction time is approximately 250 ms. How fast are yours?
      </div>
    </div>
  );
}

