'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { TechnologyNode, ParticleField } from '@/components/3d';
import { useWebGL, useReducedMotion, useInView, useMediaQuery } from '@/lib/hooks';
import { skillCategories } from '@/data/skills';

// Generate 3D positions for each category and skill
function generateSkillPositions() {
  const positions: { category: string; skills: Array<{ name: string; position: [number, number, number]; color: string; size: number }> }[] = [];
  
  skillCategories.forEach((cat, catIndex) => {
    const angle = (catIndex / skillCategories.length) * Math.PI * 2;
    const radius = 15;
    const centerX = Math.cos(angle) * radius;
    const centerZ = Math.sin(angle) * radius;
    
    const skills = cat.skills.map((skill, skillIndex) => {
      const skillAngle = (skillIndex / cat.skills.length) * Math.PI * 2;
      const skillRadius = 3 + skill.proficiency / 100 * 2;
      return {
        name: skill.name,
        position: [
          centerX + Math.cos(skillAngle) * skillRadius,
          (Math.random() - 0.5) * 2,
          centerZ + Math.sin(skillAngle) * skillRadius,
        ] as [number, number, number],
        color: cat.color,
        size: 0.3 + skill.proficiency / 100 * 0.5,
      };
    });
    
    positions.push({ category: cat.category, skills });
  });
  
  return positions;
}

const skillPositions = generateSkillPositions();

function Skills3DScene() {
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);

  // Responsive particle count: 500 desktop, 250 tablet, 100 mobile
  const particleFieldCount = isMobile ? 100 : isTablet ? 250 : 500;
  
  return (
    <>
      <ParticleField count={particleFieldCount} radius={30} color="#00bfff" speed={prefersReduced ? 0 : 0.2} type="sphere" />
      
      {skillPositions.map((cat) => (
        <group key={cat.category} position={[0, 0, 0]}>
          {/* Category center */}
          <mesh position={[cat.skills[0]?.position[0] || 0, 2, cat.skills[0]?.position[2] || 0]}>
            <torusGeometry args={[4, 0.1, 8, 32]} />
            <meshBasicMaterial
              color={cat.skills[0]?.color || '#00bfff'}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {cat.skills.map((skill) => (
            <TechnologyNode
              key={skill.name}
              position={skill.position}
              color={skill.color}
              size={skill.size}
              isActive={hoveredSkill === skill.name}
              onHover={() => setHoveredSkill(skill.name)}
              onClick={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
            />
          ))}
        </group>
      ))}
    </>
  );
}

export function Skills3D() {
  const webglSupported = useWebGL();
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [ref, isInView] = useInView<HTMLDivElement>();

  if (webglSupported === false) return null;

  return (
    <div ref={ref} className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden glass border border-white/5">
      <Canvas
        camera={{ position: [0, 10, 40], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        shadows={false}
        performance={{ min: prefersReduced ? 0.5 : isMobile ? 0.6 : 0.8 }}
      >
        <Skills3DScene />
      </Canvas>
      
      {/* Info Overlay */}
      <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none">
        <p className="text-white/40 text-sm font-mono">
          Drag to rotate • Scroll to zoom • Hover nodes for details
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import * as THREE from 'three';