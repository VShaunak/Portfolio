import React, { useRef, useEffect, useState } from 'react';

// Geometric Polyhedron 3D Vertices for Interactive Hover Elements
const PHI = (1 + Math.sqrt(5)) / 2;

const ICO_VERTS = [
  [-1,  PHI, 0], [ 1,  PHI, 0], [-1, -PHI, 0], [ 1, -PHI, 0],
  [0, -1,  PHI], [0,  1,  PHI], [0, -1, -PHI], [0,  1, -PHI],
  [ PHI, 0, -1], [ PHI, 0,  1], [-PHI, 0, -1], [-PHI, 0,  1]
].map(([x, y, z]) => {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
});

const ICO_FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9],  [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4],  [3, 4, 2],  [3, 2, 6],  [3, 6, 8],  [3, 8, 9],
  [4, 9, 5],  [2, 4, 11], [6, 2, 10], [8, 6, 7],  [9, 8, 1]
];

const OCTA_VERTS = [
  [ 1,  0,  0], [-1,  0,  0],
  [ 0,  1,  0], [ 0, -1,  0],
  [ 0,  0,  1], [ 0,  0, -1]
];

const OCTA_FACES = [
  [4, 0, 2], [4, 2, 1], [4, 1, 3], [4, 3, 0],
  [5, 2, 0], [5, 1, 2], [5, 3, 1], [5, 0, 3]
];

export default function InteractiveGeometricName() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.isHovering = true;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 3D rotation helpers
    const rotateX = ([x, y, z], angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x, y * cos - z * sin, y * sin + z * cos];
    };

    const rotateY = ([x, y, z], angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos + z * sin, y, -x * sin + z * cos];
    };

    const rotateZ = ([x, y, z], angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos - y * sin, x * sin + y * cos, z];
    };

    let time = 0;

    const render = () => {
      time += mouseRef.current.isHovering ? 0.025 : 0.008;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');

      // Light vector for shading
      const lightDir = [-0.5, -0.8, 0.7];
      const lightLen = Math.hypot(...lightDir);
      const lNorm = lightDir.map((v) => v / lightLen);

      // Two solid geometric companion polyhedra hovering left and right around the name
      const solids = [
        {
          // Left Geometric Solid (Icosahedron)
          verts: ICO_VERTS,
          faces: ICO_FACES,
          scale: Math.min(w, h) * (w < 640 ? 0.22 : 0.28),
          pos: [
            w * 0.12 + mouseRef.current.x * 20,
            h * 0.50 + Math.sin(time * 1.2) * 10 + mouseRef.current.y * 15
          ],
          rot: [time * 0.8, time * 1.1 + mouseRef.current.x * 0.8, time * 0.5],
          accentColor: '#1a73e8'
        },
        {
          // Right Geometric Solid (Octahedron)
          verts: OCTA_VERTS,
          faces: OCTA_FACES,
          scale: Math.min(w, h) * (w < 640 ? 0.20 : 0.26),
          pos: [
            w * 0.88 - mouseRef.current.x * 20,
            h * 0.48 + Math.cos(time * 1.1) * 10 - mouseRef.current.y * 15
          ],
          rot: [-time * 0.9, -time * 0.7 - mouseRef.current.x * 0.8, time * 0.6],
          accentColor: '#34a853'
        }
      ];

      solids.forEach((solid) => {
        const { verts, faces, scale, pos, rot, accentColor } = solid;

        const transformed = verts.map((v) => {
          let p = rotateX(v, rot[0]);
          p = rotateY(p, rot[1]);
          p = rotateZ(p, rot[2]);
          return [pos[0] + p[0] * scale, pos[1] + p[1] * scale, p[2] * scale];
        });

        const faceData = faces.map((indices) => {
          const v0 = transformed[indices[0]];
          const v1 = transformed[indices[1]];
          const v2 = transformed[indices[2]];

          const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
          const e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

          const nx = e1[1] * e2[2] - e1[2] * e2[1];
          const ny = e1[2] * e2[0] - e1[0] * e2[2];
          const nz = e1[0] * e2[1] - e1[1] * e2[0];
          const nlen = Math.hypot(nx, ny, nz) || 1;
          const normal = [nx / nlen, ny / nlen, nz / nlen];

          const avgZ = (v0[2] + v1[2] + v2[2]) / 3;
          const dot = normal[0] * lNorm[0] + normal[1] * lNorm[1] + normal[2] * lNorm[2];
          const intensity = Math.min(1, Math.max(0, 0.25 + dot * 0.75));

          return {
            points: [v0, v1, v2],
            avgZ,
            intensity,
            isFront: normal[2] > -0.05
          };
        });

        faceData.sort((a, b) => a.avgZ - b.avgZ);

        faceData.forEach(({ points, intensity, isFront }) => {
          if (!isFront) return;

          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          ctx.lineTo(points[1][0], points[1][1]);
          ctx.lineTo(points[2][0], points[2][1]);
          ctx.closePath();

          if (isDark) {
            const r = Math.round(25 + intensity * 60);
            const g = Math.round(45 + intensity * 80);
            const b = Math.round(95 + intensity * 140);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mouseRef.current.isHovering ? 0.85 : 0.65})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 + intensity * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          } else {
            const r = Math.round(200 - (1 - intensity) * 75);
            const g = Math.round(220 - (1 - intensity) * 70);
            const b = Math.round(250 - (1 - intensity) * 50);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mouseRef.current.isHovering ? 0.90 : 0.75})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(26, 115, 232, ${0.4 + intensity * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 sm:py-8 flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Realtime 3D Solid Geometric Companion Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Solid Geometric Background Glow Frame */}
      <div 
        className={`absolute inset-x-8 inset-y-2 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-teal-500/10 dark:from-blue-500/15 dark:via-indigo-500/15 dark:to-teal-500/15 blur-xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-40 scale-100'
        }`}
      />

      {/* Main Big, Attractive Shaunak Vidwans Typography */}
      <div className="relative z-10 text-center px-4">
        {/* Subtle Geometric Wireframe Crown Accent */}
        <div className="flex items-center justify-center gap-2 mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#1a73e8]" />
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#1a73e8] to-transparent" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#1a73e8] dark:text-[#8ab4f8] font-bold">
            Software Developer • AI & ML
          </span>
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#1a73e8] to-transparent" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#34a853]" />
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#202124] dark:text-white transition-all duration-300 transform group-hover:scale-[1.02] drop-shadow-xs">
          <span className="inline-block hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors">
            Shaunak
          </span>{' '}
          <span className="inline-block bg-gradient-to-r from-[#1a73e8] via-[#4285f4] to-[#1e8e3e] bg-clip-text text-transparent hover:from-[#1557b0] hover:to-[#0d652d] transition-all">
            Vidwans
          </span>
        </h1>

        {/* Subtle Interactive Instruction */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#5f6368] dark:text-[#9aa0a6] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] animate-ping" />
          <span>Interactive 3D geometry responds to cursor movement</span>
        </div>
      </div>
    </div>
  );
}

