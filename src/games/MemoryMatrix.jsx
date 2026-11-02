import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Brain, Sparkles, Volume2, VolumeX } from 'lucide-react';

const TILE_COLORS = [
  { base: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400', active: 'bg-emerald-400 border-white shadow-emerald-400 shadow-2xl scale-95', freq: 261.63 }, // C4
  { base: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400', active: 'bg-cyan-400 border-white shadow-cyan-400 shadow-2xl scale-95', freq: 293.66 }, // D4
  { base: 'bg-blue-500/20 border-blue-500/40 text-blue-400', active: 'bg-blue-400 border-white shadow-blue-400 shadow-2xl scale-95', freq: 329.63 }, // E4
  { base: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400', active: 'bg-indigo-400 border-white shadow-indigo-400 shadow-2xl scale-95', freq: 349.23 }, // F4
  { base: 'bg-purple-500/20 border-purple-500/40 text-purple-400', active: 'bg-purple-400 border-white shadow-purple-400 shadow-2xl scale-95', freq: 392.00 }, // G4
  { base: 'bg-pink-500/20 border-pink-500/40 text-pink-400', active: 'bg-pink-400 border-white shadow-pink-400 shadow-2xl scale-95', freq: 440.00 }, // A4
  { base: 'bg-rose-500/20 border-rose-500/40 text-rose-400', active: 'bg-rose-400 border-white shadow-rose-400 shadow-2xl scale-95', freq: 493.88 }, // B4
  { base: 'bg-amber-500/20 border-amber-500/40 text-amber-400', active: 'bg-amber-400 border-white shadow-amber-400 shadow-2xl scale-95', freq: 523.25 }, // C5
  { base: 'bg-violet-500/20 border-violet-500/40 text-violet-400', active: 'bg-violet-400 border-white shadow-violet-400 shadow-2xl scale-95', freq: 587.33 }  // D5
];

export default function MemoryMatrix() {
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [activeTile, setActiveTile] = useState(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'showing' | 'user' | 'gameover'
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('memory_matrix_highscore') || '0', 10);
  });
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  // Play audio frequency
  const playTileTone = (tileIndex) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const freq = TILE_COLORS[tileIndex]?.freq || 440;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio might be waiting for user click
    }
  };

  const playErrorTone = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  };

  const startGame = () => {
    setScore(0);
    setRound(1);
    const initialSeq = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
    setSequence(initialSeq);
    setUserStep(0);
    setGameState('showing');
  };

  // Playback sequence to player
  useEffect(() => {
    if (gameState !== 'showing' || sequence.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(interval);
        setActiveTile(null);
        setGameState('user');
        setUserStep(0);
        setTimeLeft(10 + sequence.length);
        return;
      }

      const tileToLight = sequence[index];
      setActiveTile(tileToLight);
      playTileTone(tileToLight);

      setTimeout(() => {
        setActiveTile(null);
      }, 400);

      index++;
    }, 700);

    return () => clearInterval(interval);
  }, [gameState, sequence]);

  // Turn timer countdown
  useEffect(() => {
    if (gameState !== 'user') {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const handleGameOver = () => {
    playErrorTone();
    setGameState('gameover');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('memory_matrix_highscore', score.toString());
    }
  };

  const handleTileClick = (index) => {
    if (gameState !== 'user') return;

    playTileTone(index);
    setActiveTile(index);
    setTimeout(() => setActiveTile(null), 200);

    if (sequence[userStep] === index) {
      // Correct step
      const nextStep = userStep + 1;
      const earned = 100 * round;
      setScore((s) => s + earned);

      if (nextStep === sequence.length) {
        // Round Completed!
        const nextRound = round + 1;
        setRound(nextRound);
        setGameState('showing');
        setSequence((prev) => [...prev, Math.floor(Math.random() * 9)]);
      } else {
        setUserStep(nextStep);
      }
    } else {
      // Incorrect tile!
      handleGameOver();
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800 shadow-2xl text-white select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">Score:</span>
            <span className="font-bold text-white">{score}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Best:</span>
            <span className="font-bold text-amber-400">{highScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {gameState === 'user' && (
            <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-xs text-amber-300 animate-pulse">
              Time: {timeLeft}s
            </div>
          )}
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-xs text-slate-300">
            Level: <span className="text-purple-400 font-bold">{round || 1}</span>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Matrix Arena */}
      <div className="relative w-full max-w-[340px] aspect-square p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-center shadow-inner">
        <div className="grid grid-cols-3 gap-3 w-full h-full">
          {TILE_COLORS.map((tile, i) => {
            const isActive = activeTile === i;
            return (
              <button
                key={i}
                disabled={gameState !== 'user'}
                onClick={() => handleTileClick(i)}
                className={`relative rounded-xl border-2 transition-all duration-150 flex items-center justify-center font-mono font-bold text-lg
                  ${isActive ? tile.active : tile.base}
                  ${gameState === 'user' ? 'hover:scale-[1.03] cursor-pointer' : 'cursor-default'}
                `}
              >
                <div className={`w-3 h-3 rounded-full transition-opacity ${isActive ? 'bg-white opacity-100' : 'bg-current opacity-30'}`} />
              </button>
            );
          })}
        </div>

        {/* State Banner */}
        {gameState === 'showing' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600/90 text-white text-xs font-mono font-semibold tracking-wider shadow-lg animate-pulse">
            WATCH SEQUENCE
          </div>
        )}

        {gameState === 'user' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-mono font-semibold tracking-wider shadow-lg">
            YOUR TURN ({userStep}/{sequence.length})
          </div>
        )}

        {/* Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-4 text-purple-400 shadow-lg shadow-purple-500/20 animate-bounce">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">MEMORY MATRIX</h3>
            <p className="text-sm text-slate-300 mb-6 max-w-[260px]">
              Memorize the sequence of glowing acoustic tiles and repeat them flawlessly.
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Start Challenge</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3 text-red-400 shadow-lg shadow-red-500/20">
              <RotateCcw className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-1">SEQUENCE BROKEN</h3>
            <div className="my-4 bg-slate-900/80 px-6 py-3 rounded-xl border border-slate-800">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Final Score</div>
              <div className="text-3xl font-extrabold text-purple-400 font-mono">{score}</div>
              <div className="text-xs text-slate-400 mt-1">Reached Level {round}</div>
            </div>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Matrix</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-slate-400 text-center">
        Each round adds an additional step and accelerates musical tempo.
      </div>
    </div>
  );
}

