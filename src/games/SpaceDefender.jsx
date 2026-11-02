import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Shield, Rocket, Volume2, VolumeX, Crosshair } from 'lucide-react';

export default function SpaceDefender() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('space_defender_highscore') || '0', 10);
  });
  const [shields, setShields] = useState(3);
  const [isMuted, setIsMuted] = useState(false);
  const [wave, setWave] = useState(1);

  const stateRef = useRef({
    player: { x: 180, y: 460, width: 34, height: 40, speed: 6 },
    keys: { left: false, right: false, shoot: false },
    bullets: [],
    enemies: [],
    particles: [],
    stars: [],
    shields: 3,
    score: 0,
    wave: 1,
    lastShotTime: 0,
    lastEnemyTime: 0
  });

  const playSound = (type) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'laser') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'explosion') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {}
  };

  const startGame = () => {
    const s = stateRef.current;
    s.player = { x: 180, y: 460, width: 34, height: 40, speed: 6 };
    s.bullets = [];
    s.enemies = [];
    s.particles = [];
    s.shields = 3;
    s.score = 0;
    s.wave = 1;
    s.lastShotTime = Date.now();
    s.lastEnemyTime = Date.now();

    // Generate starry space background
    s.stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * 380,
      y: Math.random() * 520,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 2 + 0.5
    }));

    setScore(0);
    setShields(3);
    setWave(1);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) stateRef.current.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) stateRef.current.keys.right = true;
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
        stateRef.current.keys.shoot = true;
        if (gameState !== 'playing') {
          e.preventDefault();
          startGame();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) stateRef.current.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) stateRef.current.keys.right = false;
      if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) stateRef.current.keys.shoot = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const spawnEnemy = () => {
      const types = [
        { color: '#f43f5e', points: 100, hp: 1, w: 28, h: 24, speed: 2 + Math.random() * 1.5 },
        { color: '#a855f7', points: 250, hp: 2, w: 34, h: 28, speed: 1.5 + Math.random() * 1.0 },
        { color: '#eab308', points: 400, hp: 3, w: 40, h: 32, speed: 1.0 + Math.random() * 0.8 }
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      stateRef.current.enemies.push({
        x: Math.random() * (canvas.width - type.w - 40) + 20,
        y: -40,
        width: type.w,
        height: type.h,
        color: type.color,
        hp: type.hp,
        maxHp: type.hp,
        speed: type.speed,
        points: type.points,
        angle: 0
      });
    };

    const addExplosion = (x, y, color, count = 16) => {
      for (let i = 0; i < count; i++) {
        stateRef.current.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1.5,
          color,
          alpha: 1
        });
      }
    };

    const shootBullet = () => {
      const p = stateRef.current.player;
      stateRef.current.bullets.push(
        { x: p.x + 6, y: p.y, vy: -9, radius: 3 },
        { x: p.x + p.width - 6, y: p.y, vy: -9, radius: 3 }
      );
      playSound('laser');
    };

    const loop = () => {
      const s = stateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Deep space background
      ctx.fillStyle = '#050711';
      ctx.fillRect(0, 0, width, height);

      // Starfield rendering
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      s.stars.forEach((star) => {
        star.y = (star.y + star.speed) % height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (gameState === 'playing') {
        // Player movement
        if (s.keys.left) s.player.x -= s.player.speed;
        if (s.keys.right) s.player.x += s.player.speed;
        s.player.x = Math.max(15, Math.min(width - s.player.width - 15, s.player.x));

        // Player shooting
        const fireRate = 220;
        if (s.keys.shoot && Date.now() - s.lastShotTime > fireRate) {
          shootBullet();
          s.lastShotTime = Date.now();
        }

        // Spawn enemies
        const spawnInterval = Math.max(500, 1500 - s.wave * 120);
        if (Date.now() - s.lastEnemyTime > spawnInterval) {
          spawnEnemy();
          s.lastEnemyTime = Date.now();
        }

        // Advance waves based on score
        const currentWave = Math.floor(s.score / 1500) + 1;
        if (currentWave !== s.wave) {
          s.wave = currentWave;
          setWave(currentWave);
        }

        // Bullets update
        for (let i = s.bullets.length - 1; i >= 0; i--) {
          const b = s.bullets[i];
          b.y += b.vy;
          if (b.y < -10) {
            s.bullets.splice(i, 1);
            continue;
          }

          // Bullet collision with enemies
          for (let j = s.enemies.length - 1; j >= 0; j--) {
            const e = s.enemies[j];
            if (
              b.x > e.x &&
              b.x < e.x + e.width &&
              b.y > e.y &&
              b.y < e.y + e.height
            ) {
              e.hp -= 1;
              s.bullets.splice(i, 1);
              addExplosion(b.x, b.y, '#38bdf8', 6);

              if (e.hp <= 0) {
                playSound('explosion');
                addExplosion(e.x + e.width / 2, e.y + e.height / 2, e.color, 20);
                s.score += e.points;
                setScore(s.score);
                s.enemies.splice(j, 1);
              }
              break;
            }
          }
        }

        // Enemies update
        for (let j = s.enemies.length - 1; j >= 0; j--) {
          const e = s.enemies[j];
          e.y += e.speed;
          e.angle += 0.05;
          e.x += Math.sin(e.angle) * 0.8;

          // Enemy collision with player
          const p = s.player;
          if (
            p.x < e.x + e.width &&
            p.x + p.width > e.x &&
            p.y < e.y + e.height &&
            p.y + p.height > e.y
          ) {
            playSound('explosion');
            addExplosion(e.x + e.width / 2, e.y + e.height / 2, '#ef4444', 24);
            s.enemies.splice(j, 1);
            s.shields -= 1;
            setShields(s.shields);

            if (s.shields <= 0) {
              setGameState('gameover');
              if (s.score > highScore) {
                setHighScore(s.score);
                localStorage.setItem('space_defender_highscore', s.score.toString());
              }
            }
            continue;
          }

          // Escaped enemies
          if (e.y > height + 40) {
            s.enemies.splice(j, 1);
          }
        }
      }

      // Render Bullets
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fillStyle = '#38bdf8';
      s.bullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Render Enemies
      s.enemies.forEach((e) => {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = e.color;
        ctx.fillStyle = e.color;

        // Draw alien ship diamond / polygon
        ctx.beginPath();
        ctx.moveTo(e.x + e.width / 2, e.y + e.height);
        ctx.lineTo(e.x + e.width, e.y + e.height / 3);
        ctx.lineTo(e.x + e.width / 2, e.y);
        ctx.lineTo(e.x, e.y + e.height / 3);
        ctx.closePath();
        ctx.fill();

        // Eye / cockpit
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(e.x + e.width / 2, e.y + e.height / 2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Health bar if multi-hit
        if (e.maxHp > 1) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(e.x, e.y - 8, e.width, 3);
          ctx.fillStyle = '#10b981';
          ctx.fillRect(e.x, e.y - 8, (e.width * e.hp) / e.maxHp, 3);
        }
        ctx.restore();
      });

      // Render Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.04;

        if (pt.alpha <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Player Ship
      if (gameState !== 'gameover') {
        const p = s.player;
        ctx.save();
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#6366f1';

        // Thruster flame
        const flameY = p.y + p.height + (Math.random() * 8 + 4);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(p.x + p.width / 2 - 5, p.y + p.height - 4);
        ctx.lineTo(p.x + p.width / 2, flameY);
        ctx.lineTo(p.x + p.width / 2 + 5, p.y + p.height - 4);
        ctx.fill();

        // Main hull
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.moveTo(p.x + p.width / 2, p.y);
        ctx.lineTo(p.x + p.width, p.y + p.height);
        ctx.lineTo(p.x + p.width / 2, p.y + p.height - 8);
        ctx.lineTo(p.x, p.y + p.height);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2 - 2, 4, 0, Math.PI * 2);
        ctx.fill();

        // Dual plasma wingtips
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(p.x + 3, p.y + p.height - 12, 3, 10);
        ctx.fillRect(p.x + p.width - 6, p.y + p.height - 12, 3, 10);

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
            <Rocket className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Score:</span>
            <span className="font-bold text-white">{score}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shield
                key={i}
                className={`w-4 h-4 ${i < shields ? 'text-emerald-400 fill-emerald-400/40' : 'text-slate-700'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-xs text-slate-300">
            Wave: <span className="text-indigo-400 font-bold">{wave}</span>
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
          height={520}
          className="block w-full max-w-[370px] h-[480px] sm:h-[520px]"
        />

        {/* Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mb-4 text-indigo-400 shadow-lg shadow-indigo-500/20 animate-bounce">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">SPACE DEFENDER</h3>
            <p className="text-sm text-slate-300 mb-6 max-w-[280px]">
              Defend the sector against waves of alien invaders with plasma cannons.
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Engage Invaders</span>
            </button>
            <p className="mt-4 text-xs text-slate-400">Controls: A / D to steer, Space to Fire</p>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3 text-red-400 shadow-lg shadow-red-500/20">
              <RotateCcw className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-1">DEFENSE BREACHED</h3>
            <div className="my-4 bg-slate-900/80 px-6 py-3 rounded-xl border border-slate-800">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Final Score</div>
              <div className="text-3xl font-extrabold text-indigo-400 font-mono">{score}</div>
              <div className="text-xs text-slate-400 mt-1">Survived until Wave {wave}</div>
              {score >= highScore && score > 0 && (
                <div className="mt-1 text-xs text-amber-400 font-medium">New Sector High Score!</div>
              )}
            </div>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Launch Next Wing</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="flex sm:hidden items-center justify-between w-full mt-4 gap-3 px-2">
        <button
          onPointerDown={() => { stateRef.current.keys.left = true; }}
          onPointerUp={() => { stateRef.current.keys.left = false; }}
          className="flex-1 py-3 bg-slate-900 border border-slate-700 rounded-xl text-indigo-400 font-bold"
        >
          ← LEFT
        </button>
        <button
          onPointerDown={() => { stateRef.current.keys.shoot = true; }}
          onPointerUp={() => { stateRef.current.keys.shoot = false; }}
          className="flex-1 py-3 bg-indigo-600/30 border border-indigo-500 rounded-xl text-indigo-300 font-bold flex items-center justify-center gap-1"
        >
          <Crosshair className="w-4 h-4" /> FIRE
        </button>
        <button
          onPointerDown={() => { stateRef.current.keys.right = true; }}
          onPointerUp={() => { stateRef.current.keys.right = false; }}
          className="flex-1 py-3 bg-slate-900 border border-slate-700 rounded-xl text-indigo-400 font-bold"
        >
          RIGHT →
        </button>
      </div>
    </div>
  );
}
