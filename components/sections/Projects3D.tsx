'use client';

import { Canvas } from '@react-three/fiber';
import { RepositoryNode, ParticleField, DataStream } from '@/components/3d';
import { useWebGL, useReducedMotion, useInView, useMediaQuery } from '@/lib/hooks';
import { featuredProjects } from '@/data/projects';
import { getProjectColor } from '@/data/visualization';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function Projects3DScene() {
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  // Responsive particle count: 800 desktop, 400 tablet, 200 mobile
  const particleFieldCount = isMobile ? 200 : isTablet ? 400 : 800;

  // Generate positions for featured projects in a spiral/galaxy formation
  const projectPositions = featuredProjects.map((project, index) => {
    const angle = (index / featuredProjects.length) * Math.PI * 2 * 1.5; // 1.5 rotations
    const radius = 8 + index * 1.5;
    const height = (Math.random() - 0.5) * 4;
    return {
      ...project,
      position: [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      ] as [number, number, number],
    };
  });

  return (
    <>
      <ParticleField count={particleFieldCount} radius={30} color="#00bfff" speed={0.15} type="sphere" />
      
      {/* Connections from center to projects */}
      <group>
        {projectPositions.map((proj) => (
          <DataStream
            key={proj.id}
            start={[0, 0, 0]}
            end={proj.position}
            color={getProjectColor(proj.visualizationType)}
            speed={0.5}
            particleCount={20}
            thickness={0.03}
          />
        ))}
      </group>

      {/* Central Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Projects */}
      {projectPositions.map((proj) => (
        <RepositoryNode
          key={proj.id}
          position={proj.position}
          color={getProjectColor(proj.visualizationType)}
          size={proj.priority === 1 ? 1.5 : 1.2}
          isFeatured={true}
          visualizationType={proj.visualizationType}
          onHover={() => setHoveredProject(proj.id)}
          onClick={() => {}}
        />
      ))}

      {/* Hover Info Panel */}
      {hoveredProject && (
        <html>
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass px-6 py-4 rounded-xl border border-white/5 max-w-md text-center"
            >
              <p className="font-semibold text-white">{featuredProjects.find(p => p.id === hoveredProject)?.name}</p>
              <p className="text-white/60 text-sm mt-1">{featuredProjects.find(p => p.id === hoveredProject)?.description}</p>
            </motion.div>
          </div>
        </html>
      )}
    </>
  );
}

export function Projects3D() {
  const webglSupported = useWebGL();
  const prefersReduced = useReducedMotion();
  const [ref, isInView] = useInView<HTMLDivElement>();

  if (webglSupported === false) return null;

  return (
    <div ref={ref} className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden glass border border-white/5">
      <Canvas
        camera={{ position: [0, 10, 40], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        shadows={false}
        performance={{ min: prefersReduced ? 0.5 : 0.8 }}
      >
        <Projects3DScene />
      </Canvas>
      
      {/* Info Overlay */}
      <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none">
        <p className="text-white/40 text-sm font-mono">
          Drag to rotate • Scroll to zoom • Hover projects for details
        </p>
      </div>
    </div>
  );
}

import React from 'react';