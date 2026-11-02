import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, ArrowLeft, ArrowRight, Zap, Volume2, VolumeX } from 'lucide-react';

export default function NeonRacer() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('neon_racer_highscore') || '0', 10);
  });
  const [speed, setSpeed] = useState(5);
  const [isMuted, setIsMuted] = useState(false);

  // Game internal mutable state
  const stateRef = useRef({
    player: { x: 175, y: 460, width: 36, height: 60, targetX: 175 },
    keys: { left: false, right: false, up: false, down: false },
    obstacles: [],
    coins: [],
    particles: [],
    roadOffset: 0,
    speed: 6,
    score: 0,
    lastObstacleTime: 0,
    lastCoinTime: 0,
    animId: null
  });

  // Sound effects generator using Web Audio API
  const playSound = (type) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'coin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'crash') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // AudioContext might be blocked until user gesture
    }
  };

  const startGame = () => {
    const s = stateRef.current;
    s.player = { x: 175, y: 460, width: 36, height: 60, targetX: 175 };
    s.obstacles = [];
    s.coins = [];
    s.particles = [];
    s.roadOffset = 0;
    s.speed = 6;
    s.score = 0;
    s.lastObstacleTime = Date.now();
    s.lastCoinTime = Date.now();
    setScore(0);
    setSpeed(6);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) stateRef.current.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) stateRef.current.keys.right = true;
      if (['ArrowUp', 'KeyW'].includes(e.code)) stateRef.current.keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) stateRef.current.keys.down = true;
      if (e.code === 'Space' && gameState !== 'playing') {
        e.preventDefault();
        startGame();
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) stateRef.current.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) stateRef.current.keys.right = false;
      if (['ArrowUp', 'KeyW'].includes(e.code)) stateRef.current.keys.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) stateRef.current.keys.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const spawnObstacle = () => {
      const lanes = [65, 145, 225, 305];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const types = [
        { color: '#ef4444', label: 'HAZARD', w: 38, h: 55, speed: 2 },
        { color: '#f59e0b', label: 'BLOCK', w: 42, h: 42, speed: 1 },
        { color: '#ec4899', label: 'BARRIER', w: 50, h: 30, speed: 1.5 }
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      stateRef.current.obstacles.push({
        x: lane - type.w / 2,
        y: -60,
        width: type.w,
        height: type.h,
        color: type.color,
        speed: type.speed
      });
    };

    const spawnCoin = () => {
      const lanes = [65, 145, 225, 305];
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      stateRef.current.coins.push({
        x: lane,
        y: -30,
        radius: 12,
        pulse: 0
      });
    };

    const addExplosion = (x, y, color) => {
      for (let i = 0; i < 20; i++) {
        stateRef.current.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          radius: Math.random() * 4 + 2,
          color,
          alpha: 1
        });
      }
    };

    const loop = () => {
      const s = stateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark road gradient
      const roadGrad = ctx.createLinearGradient(0, 0, width, 0);
      roadGrad.addColorStop(0, '#0a0f1d');
      roadGrad.addColorStop(0.5, '#0f172a');
      roadGrad.addColorStop(1, '#0a0f1d');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw road curbs with neon cyan & magenta glows
      ctx.fillStyle = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#06b6d4';
      ctx.fillRect(20, 0, 6, height);
      ctx.fillStyle = '#8b5cf6';
      ctx.shadowColor = '#8b5cf6';
      ctx.fillRect(width - 26, 0, 6, height);
      ctx.shadowBlur = 0;

      // Draw road lane dividers
      s.roadOffset = (s.roadOffset + s.speed) % 40;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -s.roadOffset;
      ctx.lineWidth = 2;

      [105, 185, 265].forEach((laneX) => {
        ctx.beginPath();
        ctx.moveTo(laneX, 0);
        ctx.lineTo(laneX, height);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      if (gameState === 'playing') {
        // Handle player input
        const moveSpeed = 5.5;
        if (s.keys.left) s.player.x -= moveSpeed;
        if (s.keys.right) s.player.x += moveSpeed;
        if (s.keys.up) s.speed = Math.min(13, s.speed + 0.05);
        else if (s.keys.down) s.speed = Math.max(4, s.speed - 0.1);
        else s.speed = Math.max(6, Math.min(11, 6 + Math.floor(s.score / 200)));

        // Keep inside road bounds
        s.player.x = Math.max(30, Math.min(width - 30 - s.player.width, s.player.x));

        // Increment score
        s.score += Math.round(s.speed * 0.1);
        setScore(s.score);
        setSpeed(Math.round(s.speed * 10) / 10);

        // Spawn obstacles
        const obstacleInterval = Math.max(700, 1600 - s.speed * 80);
        if (Date.now() - s.lastObstacleTime > obstacleInterval) {
          spawnObstacle();
          s.lastObstacleTime = Date.now();
        }

        // Spawn bonus energy orbs
        if (Date.now() - s.lastCoinTime > 2400) {
          spawnCoin();
          s.lastCoinTime = Date.now();
        }

        // Update obstacles
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.y += s.speed + obs.speed;

          // Collision detection AABB
          const p = s.player;
          if (
            p.x < obs.x + obs.width &&
            p.x + p.width > obs.x &&
            p.y < obs.y + obs.height &&
            p.y + p.height > obs.y
          ) {
            // Crash!
            playSound('crash');
            addExplosion(p.x + p.width / 2, p.y + p.height / 2, '#ef4444');
            setGameState('gameover');
            if (s.score > highScore) {
              setHighScore(s.score);
              localStorage.setItem('neon_racer_highscore', s.score.toString());
            }
            break;
          }

          if (obs.y > height + 60) {
            s.obstacles.splice(i, 1);
          }
        }

        // Update energy coins
        for (let i = s.coins.length - 1; i >= 0; i--) {
          const c = s.coins[i];
          c.y += s.speed;
          c.pulse += 0.1;

          // Check collect
          const p = s.player;
          const dist = Math.hypot(p.x + p.width / 2 - c.x, p.y + p.height / 2 - c.y);
          if (dist < c.radius + p.width / 2) {
            playSound('coin');
            s.score += 150;
            addExplosion(c.x, c.y, '#38bdf8');
            s.coins.splice(i, 1);
            continue;
          }

          if (c.y > height + 40) {
            s.coins.splice(i, 1);
          }
        }
      }

      // Render coins
      stateRef.current.coins.forEach((c) => {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#38bdf8';
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        const r = c.radius + Math.sin(c.pulse) * 2;
        ctx.arc(c.x, c.y, Math.max(6, r), 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(c.x, c.y, r * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render obstacles
      stateRef.current.obstacles.forEach((obs) => {
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = obs.color;
        ctx.fillStyle = obs.color;

        // Rounded neon obstacle box
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
        ctx.fill();

        // Inner glowing stripes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(obs.x + 4, obs.y + obs.height / 2 - 2, obs.width - 8, 4);
        ctx.restore();
      });

      // Render particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.03;

        if (pt.alpha <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render player hover car
      if (gameState !== 'gameover') {
        const p = s.player;
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#06b6d4';

        // Thruster flame
        const flameLength = 12 + Math.random() * 10 + (s.speed * 1.2);
        const flameGrad = ctx.createLinearGradient(p.x + p.width / 2, p.y + p.height, p.x + p.width / 2, p.y + p.height + flameLength);
        flameGrad.addColorStop(0, '#06b6d4');
        flameGrad.addColorStop(0.5, '#3b82f6');
        flameGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(p.x + 8, p.y + p.height);
        ctx.lineTo(p.x + p.width / 2, p.y + p.height + flameLength);
        ctx.lineTo(p.x + p.width - 8, p.y + p.height);
        ctx.fill();

        // Car chassis
        const carGrad = ctx.createLinearGradient(p.x, p.y, p.x + p.width, p.y + p.height);
        carGrad.addColorStop(0, '#06b6d4');
        carGrad.addColorStop(1, '#2563eb');
        ctx.fillStyle = carGrad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.width, p.height, 8);
        ctx.fill();

        // Cockpit canopy
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(p.x + 6, p.y + 12, p.width - 12, 22, 4);
        ctx.fill();

        // Headlight glow
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(p.x + 4, p.y + 2, 6, 4);
        ctx.fillRect(p.x + p.width - 10, p.y + 2, 6, 4);

        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, isMuted]);

  return (
    <div className="relative flex flex-col items-center bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800 shadow-2xl text-white select-none">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
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
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-xs text-slate-300">
            Speed: <span className="text-cyan-400 font-bold">{speed}x</span>
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

      {/* Canvas Viewport */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-inner">
        <canvas
          ref={canvasRef}
          width={370}
          height={540}
          className="block w-full max-w-[370px] h-[480px] sm:h-[520px]"
        />

        {/* Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-4 text-cyan-400 shadow-lg shadow-cyan-500/20 animate-bounce">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">NEON RACER</h3>
            <p className="text-sm text-slate-300 mb-6 max-w-[280px]">
              Dodge oncoming cyber obstacles and collect blue energy orbs for score boosts!
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Launch Racer</span>
            </button>
            <p className="mt-4 text-xs text-slate-400">Controls: A / D or Arrow Keys</p>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3 text-red-400 shadow-lg shadow-red-500/20">
              <RotateCcw className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-1">RACE TERMINATED</h3>
            <div className="my-4 bg-slate-900/80 px-6 py-3 rounded-xl border border-slate-800">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Final Score</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">{score}</div>
              {score >= highScore && score > 0 && (
                <div className="mt-1 text-xs text-amber-400 font-medium">New Personal Best!</div>
              )}
            </div>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Race Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Steering Controls */}
      <div className="flex sm:hidden items-center justify-between w-full mt-4 gap-4 px-2">
        <button
          onPointerDown={() => { stateRef.current.keys.left = true; }}
          onPointerUp={() => { stateRef.current.keys.left = false; }}
          onPointerLeave={() => { stateRef.current.keys.left = false; }}
          className="flex-1 py-3 bg-slate-900 active:bg-cyan-500/30 border border-slate-700 rounded-xl flex items-center justify-center text-cyan-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onPointerDown={() => { stateRef.current.keys.right = true; }}
          onPointerUp={() => { stateRef.current.keys.right = false; }}
          onPointerLeave={() => { stateRef.current.keys.right = false; }}
          className="flex-1 py-3 bg-slate-900 active:bg-cyan-500/30 border border-slate-700 rounded-xl flex items-center justify-center text-cyan-400"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 text-center hidden sm:block">
        Pro tip: Hold <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">W</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↑</kbd> to boost speed and earn points faster!
      </div>
    </div>
  );
}

