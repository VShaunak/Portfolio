import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Undo2, Trophy, Sparkles, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const TILE_STYLES = {
  2: 'bg-slate-800 text-slate-100 border-slate-700/80',
  4: 'bg-slate-700 text-slate-50 border-slate-600',
  8: 'bg-amber-600 text-white border-amber-500 shadow-amber-600/30 shadow-lg',
  16: 'bg-orange-600 text-white border-orange-500 shadow-orange-600/30 shadow-lg',
  32: 'bg-rose-600 text-white border-rose-500 shadow-rose-600/40 shadow-lg',
  64: 'bg-red-600 text-white border-red-500 shadow-red-600/50 shadow-xl font-bold',
  128: 'bg-yellow-500 text-slate-950 border-yellow-300 shadow-yellow-500/50 shadow-xl font-bold',
  256: 'bg-yellow-400 text-slate-950 border-yellow-200 shadow-yellow-400/60 shadow-xl font-bold',
  512: 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/60 shadow-xl font-bold',
  1024: 'bg-cyan-500 text-white border-cyan-400 shadow-cyan-500/60 shadow-xl font-extrabold',
  2048: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-300 shadow-purple-500/80 shadow-2xl font-extrabold animate-pulse'
};

export default function Game2048() {
  const [board, setBoard] = useState(() => getInitialBoard());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('2048_highscore') || '0', 10);
  });
  const [history, setHistory] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  const touchStartRef = useRef({ x: 0, y: 0 });

  function getEmptyBoard() {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  }

  function addRandomTile(currentBoard) {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentBoard;

    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = currentBoard.map((row) => [...row]);
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  }

  function getInitialBoard() {
    let b = getEmptyBoard();
    b = addRandomTile(b);
    b = addRandomTile(b);
    return b;
  }

  const restartGame = () => {
    const init = getInitialBoard();
    setBoard(init);
    setScore(0);
    setHistory(null);
    setGameOver(false);
    setHasWon(false);
    setKeepPlaying(false);
  };

  const handleUndo = () => {
    if (!history) return;
    setBoard(history.board);
    setScore(history.score);
    setGameOver(false);
    setHistory(null);
  };

  // Move and Merge logic
  const move = (direction) => {
    if (gameOver && !keepPlaying) return;

    let currentBoard = board.map((row) => [...row]);
    let pointsAdded = 0;
    let changed = false;

    // Helper to slide and merge a single row
    const slideAndMerge = (row) => {
      let filtered = row.filter((val) => val !== 0);
      let merged = [];
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          const val = filtered[i] * 2;
          merged.push(val);
          pointsAdded += val;
          if (val === 2048 && !hasWon) {
            setHasWon(true);
            try {
              confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            } catch {}
          }
          i++; // Skip merged partner
        } else {
          merged.push(filtered[i]);
        }
      }
      while (merged.length < 4) merged.push(0);
      return merged;
    };

    let newBoard = getEmptyBoard();

    if (direction === 'LEFT') {
      for (let r = 0; r < 4; r++) {
        newBoard[r] = slideAndMerge(currentBoard[r]);
      }
    } else if (direction === 'RIGHT') {
      for (let r = 0; r < 4; r++) {
        const reversed = [...currentBoard[r]].reverse();
        newBoard[r] = slideAndMerge(reversed).reverse();
      }
    } else if (direction === 'UP') {
      for (let c = 0; c < 4; c++) {
        const col = [currentBoard[0][c], currentBoard[1][c], currentBoard[2][c], currentBoard[3][c]];
        const merged = slideAndMerge(col);
        for (let r = 0; r < 4; r++) newBoard[r][c] = merged[r];
      }
    } else if (direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        const col = [currentBoard[3][c], currentBoard[2][c], currentBoard[1][c], currentBoard[0][c]];
        const merged = slideAndMerge(col);
        for (let r = 0; r < 4; r++) newBoard[3 - r][c] = merged[r];
      }
    }

    // Check if board changed
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (newBoard[r][c] !== currentBoard[r][c]) {
          changed = true;
          break;
        }
      }
      if (changed) break;
    }

    if (changed) {
      // Save history for Undo
      setHistory({ board: currentBoard, score });

      const finalBoard = addRandomTile(newBoard);
      setBoard(finalBoard);

      const newScore = score + pointsAdded;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('2048_highscore', newScore.toString());
      }

      // Check game over
      checkGameOver(finalBoard);
    }
  };

  const checkGameOver = (currentBoard) => {
    // Check if any empty cell
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) return;
      }
    }

    // Check if any adjacent merges possible
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = currentBoard[r][c];
        if (c < 3 && val === currentBoard[r][c + 1]) return;
        if (r < 3 && val === currentBoard[r + 1][c]) return;
      }
    }

    setGameOver(true);
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        move('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        move('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        move('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        move('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const threshold = 35;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) move('RIGHT');
        else move('LEFT');
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) move('DOWN');
        else move('UP');
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col items-center bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800 shadow-2xl text-white select-none"
    >
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <span className="text-slate-400 text-xs block leading-tight">Score</span>
            <span className="font-bold text-white text-base">{score}</span>
          </div>
          <div className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-sm">
            <span className="text-amber-400 text-xs block leading-tight flex items-center gap-1">
              <Trophy className="w-3 h-3" /> Best
            </span>
            <span className="font-bold text-amber-400 text-base">{highScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!history}
            className={`p-2 rounded-lg border flex items-center gap-1 text-xs font-medium transition ${
              history
                ? 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Undo move"
          >
            <Undo2 className="w-4 h-4" />
            <span className="hidden sm:inline">Undo</span>
          </button>
          <button
            onClick={restartGame}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2048 Grid Board */}
      <div className="relative w-full max-w-[340px] aspect-square p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
        <div className="grid grid-cols-4 grid-rows-4 gap-2.5 w-full h-full">
          {board.map((row, r) =>
            row.map((val, c) => {
              const style = val > 0 ? (TILE_STYLES[val] || 'bg-indigo-600 text-white font-extrabold') : 'bg-slate-950/70 border-slate-800/40 text-transparent';
              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center rounded-xl border-2 font-mono transition-transform duration-100 ${style} ${
                    val >= 1000 ? 'text-lg md:text-xl' : val >= 100 ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                  }`}
                >
                  {val > 0 ? val : ''}
                </div>
              );
            })
          )}
        </div>

        {/* Win Overlay */}
        {hasWon && !keepPlaying && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-3 text-amber-400 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-1">YOU REACHED 2048!</h3>
            <p className="text-sm text-slate-300 mb-5">Masterful calculation and tile merging.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setKeepPlaying(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold transition"
              >
                Keep Playing
              </button>
              <button
                onClick={restartGame}
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg transition"
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-2 text-red-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">NO MOVES REMAINING</h3>
            <p className="text-sm text-slate-400 mb-4">Board completely locked.</p>
            <button
              onClick={restartGame}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Mobile Arrow Controls */}
      <div className="flex sm:hidden flex-col items-center gap-2 mt-4">
        <button
          onClick={() => move('UP')}
          className="w-12 h-12 rounded-xl bg-slate-800 active:bg-indigo-600 border border-slate-700 flex items-center justify-center text-slate-200"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => move('LEFT')}
            className="w-12 h-12 rounded-xl bg-slate-800 active:bg-indigo-600 border border-slate-700 flex items-center justify-center text-slate-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => move('DOWN')}
            className="w-12 h-12 rounded-xl bg-slate-800 active:bg-indigo-600 border border-slate-700 flex items-center justify-center text-slate-200"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
          <button
            onClick={() => move('RIGHT')}
            className="w-12 h-12 rounded-xl bg-slate-800 active:bg-indigo-600 border border-slate-700 flex items-center justify-center text-slate-200"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 text-center hidden sm:block">
        Use Arrow keys, W/A/S/D, or swipe on mobile to slide and merge matching numbers.
      </div>
    </div>
  );
}

