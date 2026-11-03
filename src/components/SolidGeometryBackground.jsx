import React, { useEffect, useRef } from 'react';

// Golden ratio for icosahedron geometry
const PHI = (1 + Math.sqrt(5)) / 2;

// Polyhedron 1: Solid Icosahedron (12 vertices, 20 solid triangular faces)
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

// Polyhedron 2: Solid Octahedron (6 vertices, 8 solid triangular faces)
const OCTA_VERTS = [
  [ 1,  0,  0], [-1,  0,  0],
  [ 0,  1,  0], [ 0, -1,  0],
  [ 0,  0,  1], [ 0,  0, -1]
];

const OCTA_FACES = [
  [4, 0, 2], [4, 2, 1], [4, 1, 3], [4, 3, 0],
  [5, 2, 0], [5, 1, 2], [5, 3, 1], [5, 0, 3]
];

// Polyhedron 3: Solid Crystalline Hexagonal Prism (8 vertices, 12 faces)
const PRISM_VERTS = [
  [0, 1.4, 0],
  [Math.cos(0), 0.2, Math.sin(0)],
  [Math.cos(Math.PI / 3), 0.2, Math.sin(Math.PI / 3)],
  [Math.cos(2 * Math.PI / 3), 0.2, Math.sin(2 * Math.PI / 3)],
  [Math.cos(Math.PI), 0.2, Math.sin(Math.PI)],
  [Math.cos(4 * Math.PI / 3), 0.2, Math.sin(4 * Math.PI / 3)],
  [Math.cos(5 * Math.PI / 3), 0.2, Math.sin(5 * Math.PI / 3)],
  [0, -1.4, 0]
];

const PRISM_FACES = [
  [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 6], [0, 6, 1],
  [7, 2, 1], [7, 3, 2], [7, 4, 3], [7, 5, 4], [7, 6, 5], [7, 1, 6]
];

export default function SolidGeometryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width) * 2 - 1;
      mouse.targetY = (e.clientY / height) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Matrix Math Helpers
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

    // Virtual Directional Light Vector
    const lightSource = [-0.6, -0.8, 0.8];
    const lightLen = Math.hypot(...lightSource);
    const lightDir = lightSource.map((v) => v / lightLen);

    let time = 0;

    const render = () => {
      time += 0.007;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Draw Subtle Isometric Background Grid
      const gridSize = 48;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Solid Geometric Entities with High Contrast & Shaded Facets
      const solidEntities = [
        {
          // Hero Solid Polyhedron (Prominent in Hero Viewport)
          mesh: { verts: ICO_VERTS, faces: ICO_FACES },
          scale: Math.min(width, height) * (width < 640 ? 0.32 : 0.28),
          pos: [
            width * (width < 768 ? 0.75 : 0.82) + mouse.x * 30,
            height * 0.30 + Math.sin(time * 0.8) * 16 + mouse.y * 25
          ],
          rot: [time * 0.45, time * 0.65 + mouse.x * 0.4, time * 0.3 + mouse.y * 0.3],
          colorScheme: 'primary'
        },
        {
          // Secondary Solid Octahedron (Mid-Left)
          mesh: { verts: OCTA_VERTS, faces: OCTA_FACES },
          scale: Math.min(width, height) * (width < 640 ? 0.20 : 0.18),
          pos: [
            width * (width < 768 ? 0.15 : 0.12) - mouse.x * 25,
            height * 0.65 + Math.cos(time * 0.7) * 18 - mouse.y * 20
          ],
          rot: [-time * 0.5, -time * 0.4 + mouse.x * 0.35, time * 0.45],
          colorScheme: 'accent'
        },
        {
          // Tertiary Solid Prism (Lower Right)
          mesh: { verts: PRISM_VERTS, faces: PRISM_FACES },
          scale: Math.min(width, height) * 0.16,
          pos: [
            width * 0.86 + mouse.x * 20,
            height * 0.82 + Math.sin(time * 0.6) * 15
          ],
          rot: [time * 0.4, time * 0.55, -time * 0.5],
          colorScheme: 'secondary'
        }
      ];

      solidEntities.forEach((entity) => {
        const { mesh, scale, pos, rot, colorScheme } = entity;

        // Transform vertices
        const transformedVerts = mesh.verts.map((v) => {
          let p = rotateX(v, rot[0]);
          p = rotateY(p, rot[1]);
          p = rotateZ(p, rot[2]);
          return [
            pos[0] + p[0] * scale,
            pos[1] + p[1] * scale,
            p[2] * scale
          ];
        });

        // Compute faces with normals and lighting
        const faceData = mesh.faces.map((faceIndices) => {
          const v0 = transformedVerts[faceIndices[0]];
          const v1 = transformedVerts[faceIndices[1]];
          const v2 = transformedVerts[faceIndices[2]];

          const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
          const e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

          const nx = e1[1] * e2[2] - e1[2] * e2[1];
          const ny = e1[2] * e2[0] - e1[0] * e2[2];
          const nz = e1[0] * e2[1] - e1[1] * e2[0];
          const nlen = Math.hypot(nx, ny, nz) || 1;
          const normal = [nx / nlen, ny / nlen, nz / nlen];

          const avgZ = (v0[2] + v1[2] + v2[2]) / 3;
          const dot = normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2];
          const intensity = Math.min(1, Math.max(0, 0.25 + dot * 0.75));

          return {
            points: [v0, v1, v2],
            normal,
            avgZ,
            intensity,
            isFrontFacing: normal[2] > -0.05
          };
        });

        // Painter's algorithm: sort back to front
        faceData.sort((a, b) => a.avgZ - b.avgZ);

        // Render solid facets with clear contrast and bevel lines
        faceData.forEach(({ points, intensity, isFrontFacing }) => {
          if (!isFrontFacing) return;

          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          ctx.lineTo(points[1][0], points[1][1]);
          ctx.lineTo(points[2][0], points[2][1]);
          ctx.closePath();

          if (isDark) {
            // Dark Mode: Deep metallic geometric solids with luminous cyan/blue edges
            let r, g, b, alpha;
            if (colorScheme === 'primary') {
              // Electric Indigo / Cobalt Solid
              r = Math.round(25 + intensity * 65);
              g = Math.round(45 + intensity * 85);
              b = Math.round(95 + intensity * 155);
              alpha = 0.75;
            } else if (colorScheme === 'accent') {
              // Emerald / Teal Solid
              r = Math.round(15 + intensity * 40);
              g = Math.round(55 + intensity * 115);
              b = Math.round(65 + intensity * 125);
              alpha = 0.70;
            } else {
              // Violet / Slate Solid
              r = Math.round(40 + intensity * 80);
              g = Math.round(30 + intensity * 60);
              b = Math.round(80 + intensity * 130);
              alpha = 0.65;
            }

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fill();

            // Crisp edge definition
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.35 + intensity * 0.45})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          } else {
            // Light Mode: High-contrast architectural porcelain / vibrant slate-blue geometry
            let r, g, b, alpha;
            if (colorScheme === 'primary') {
              // Crisp Google Blue / Slate Solid
              r = Math.round(195 - (1 - intensity) * 85);
              g = Math.round(218 - (1 - intensity) * 80);
              b = Math.round(250 - (1 - intensity) * 60);
              alpha = 0.88;
            } else if (colorScheme === 'accent') {
              // Mint / Slate Solid
              r = Math.round(200 - (1 - intensity) * 80);
              g = Math.round(235 - (1 - intensity) * 75);
              b = Math.round(225 - (1 - intensity) * 70);
              alpha = 0.82;
            } else {
              // Lavender / Slate Solid
              r = Math.round(215 - (1 - intensity) * 75);
              g = Math.round(215 - (1 - intensity) * 70);
              b = Math.round(245 - (1 - intensity) * 60);
              alpha = 0.80;
            }

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fill();

            // Distinct facet border
            ctx.strokeStyle = `rgba(26, 115, 232, ${0.4 + intensity * 0.45})`;
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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Solid Geometric Background Artwork (SVG Vector Polyhedra) */}
      <div className="absolute top-12 right-6 md:right-24 w-[360px] md:w-[480px] h-[360px] md:h-[480px] opacity-25 dark:opacity-20 animate-float-slow pointer-events-none">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="solidGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a73e8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8ab4f8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="solidGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e8e3e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#81c995" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="solidGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#f9ab00" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fde293" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Solid 3D Faceted Geometry Planes */}
          <polygon points="200,40 320,120 200,200 80,120" fill="url(#solidGrad1)" stroke="#1a73e8" strokeWidth="1.5" />
          <polygon points="80,120 200,200 200,340 80,260" fill="url(#solidGrad2)" stroke="#1a73e8" strokeWidth="1.5" />
          <polygon points="320,120 200,200 200,340 320,260" fill="url(#solidGrad3)" stroke="#1a73e8" strokeWidth="1.5" />
          <polygon points="200,40 260,20 320,120" fill="#1a73e8" fillOpacity="0.25" stroke="#1a73e8" strokeWidth="1" />
          <polygon points="200,40 140,20 80,120" fill="#8ab4f8" fillOpacity="0.25" stroke="#1a73e8" strokeWidth="1" />
        </svg>
      </div>

      {/* Floating Secondary Geometric Cube on Lower Left */}
      <div className="absolute bottom-20 left-8 md:left-20 w-[240px] md:w-[320px] h-[240px] md:h-[320px] opacity-20 dark:opacity-15 animate-float-slow pointer-events-none" style={{ animationDelay: '-4s' }}>
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <polygon points="150,30 240,90 150,150 60,90" fill="#1a73e8" fillOpacity="0.3" stroke="#1a73e8" strokeWidth="1.2" />
          <polygon points="60,90 150,150 150,250 60,190" fill="#4285f4" fillOpacity="0.45" stroke="#1a73e8" strokeWidth="1.2" />
          <polygon points="240,90 150,150 150,250 240,190" fill="#34a853" fillOpacity="0.35" stroke="#34a853" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 3D Realtime Animated Solid Geometry Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
