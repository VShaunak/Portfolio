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
  return [x / len, y / len, z / len]; // Normalized unit sphere
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

// Polyhedron 3: Solid Dodecahedron Dual / Crystalline Hexagonal Prism
const PRISM_VERTS = [
  [0, 1.2, 0],
  [Math.cos(0), 0.3, Math.sin(0)],
  [Math.cos(Math.PI / 3), 0.3, Math.sin(Math.PI / 3)],
  [Math.cos(2 * Math.PI / 3), 0.3, Math.sin(2 * Math.PI / 3)],
  [Math.cos(Math.PI), 0.3, Math.sin(Math.PI)],
  [Math.cos(4 * Math.PI / 3), 0.3, Math.sin(4 * Math.PI / 3)],
  [Math.cos(5 * Math.PI / 3), 0.3, Math.sin(5 * Math.PI / 3)],
  [0, -1.2, 0]
];

const PRISM_FACES = [
  // Top pyramidal fan
  [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 6], [0, 6, 1],
  // Bottom pyramidal fan
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

    // Mouse coordinates with smoothing
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

    // Virtual Directional Light Vector (from upper-left, slightly forward)
    const lightSource = [-0.55, -0.75, 0.75];
    const lightLen = Math.hypot(...lightSource);
    const lightDir = lightSource.map((v) => v / lightLen);

    let time = 0;

    const render = () => {
      time += 0.005;
      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // Configuration for 3 distinct solid geometric objects
      const solidEntities = [
        {
          // Primary Solid Polyhedron: Upper-Right Hero zone
          mesh: { verts: ICO_VERTS, faces: ICO_FACES },
          scale: Math.min(width, height) * 0.23,
          pos: [
            width * 0.76 + mouse.x * 25,
            height * 0.34 + Math.sin(time * 0.8) * 16 + mouse.y * 20
          ],
          rot: [time * 0.45, time * 0.65 + mouse.x * 0.35, time * 0.25 + mouse.y * 0.25],
          opacity: isDark ? 0.88 : 0.95
        },
        {
          // Secondary Solid Octahedron: Mid-Left zone
          mesh: { verts: OCTA_VERTS, faces: OCTA_FACES },
          scale: Math.min(width, height) * 0.15,
          pos: [
            width * 0.14 - mouse.x * 20,
            height * 0.66 + Math.cos(time * 0.7) * 15 - mouse.y * 15
          ],
          rot: [-time * 0.55, -time * 0.4 + mouse.x * 0.3, time * 0.45],
          opacity: isDark ? 0.78 : 0.88
        },
        {
          // Tertiary Solid Crystalline Prism: Lower-Right zone
          mesh: { verts: PRISM_VERTS, faces: PRISM_FACES },
          scale: Math.min(width, height) * 0.13,
          pos: [
            width * 0.85 + mouse.x * 15,
            height * 0.85 + Math.sin(time * 0.6) * 14
          ],
          rot: [time * 0.38, time * 0.48, -time * 0.55],
          opacity: isDark ? 0.68 : 0.78
        }
      ];

      solidEntities.forEach((entity) => {
        const { mesh, scale, pos, rot, opacity } = entity;

        // Transform vertices
        const transformedVerts = mesh.verts.map((v) => {
          let p = rotateX(v, rot[0]);
          p = rotateY(p, rot[1]);
          p = rotateZ(p, rot[2]);
          // Orthographic projection with slight depth
          return [
            pos[0] + p[0] * scale,
            pos[1] + p[1] * scale,
            p[2] * scale
          ];
        });

        // Compute faces with lighting and depth
        const faceData = mesh.faces.map((faceIndices) => {
          const v0 = transformedVerts[faceIndices[0]];
          const v1 = transformedVerts[faceIndices[1]];
          const v2 = transformedVerts[faceIndices[2]];

          // Surface edge vectors
          const e1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
          const e2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

          // Cross product for outward normal
          const nx = e1[1] * e2[2] - e1[2] * e2[1];
          const ny = e1[2] * e2[0] - e1[0] * e2[2];
          const nz = e1[0] * e2[1] - e1[1] * e2[0];
          const nlen = Math.hypot(nx, ny, nz) || 1;
          const normal = [nx / nlen, ny / nlen, nz / nlen];

          // Average depth for Painter's algorithm
          const avgZ = (v0[2] + v1[2] + v2[2]) / 3;

          // Compute directional light illumination
          const dot = normal[0] * lightDir[0] + normal[1] * lightDir[1] + normal[2] * lightDir[2];
          const intensity = Math.min(1, Math.max(0, 0.28 + dot * 0.72));

          return {
            points: [v0, v1, v2],
            normal,
            avgZ,
            intensity,
            isFrontFacing: normal[2] > -0.05
          };
        });

        // Sort faces from back to front (Painter's Algorithm for solid rendering)
        faceData.sort((a, b) => a.avgZ - b.avgZ);

        // Render solid polygonal facets
        faceData.forEach(({ points, intensity, isFrontFacing }) => {
          if (!isFrontFacing) return; // Backface culling for crisp solid depth

          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          ctx.lineTo(points[1][0], points[1][1]);
          ctx.lineTo(points[2][0], points[2][1]);
          ctx.closePath();

          if (isDark) {
            // Dark Mode Solid Geometry: Sleek titanium / deep slate with indigo-blue ambient light
            const r = Math.round(20 + intensity * 46);
            const g = Math.round(28 + intensity * 58);
            const b = Math.round(45 + intensity * 90);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.52 * opacity})`;
            ctx.fill();

            // Crisp subtle facet bevel edges
            ctx.strokeStyle = `rgba(138, 180, 248, ${0.16 + intensity * 0.26})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            // Light Mode Solid Geometry: Architectural alabaster / porcelain with Google Blue tint
            const r = Math.round(248 - (1 - intensity) * 34);
            const g = Math.round(250 - (1 - intensity) * 28);
            const b = Math.round(254 - (1 - intensity) * 16);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.75 * opacity})`;
            ctx.fill();

            // Subtle border definition
            ctx.strokeStyle = `rgba(26, 115, 232, ${0.12 + intensity * 0.22})`;
            ctx.lineWidth = 1;
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
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* 3D Solid Geometry Realtime Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Subtle Architectural Grid Overlay for Depth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#dadce0_1px,transparent_1px)] dark:bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:36px_36px] opacity-35"
      />

      {/* Soft Vignette / Ambient Fade to protect typography readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70 dark:from-[#121212]/60 dark:via-transparent dark:to-[#121212]/70"
      />
    </div>
  );
}
