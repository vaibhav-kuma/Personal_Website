'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface TechnologyNodeProps {
  position: [number, number, number];
  color: string;
  size?: number;
  label?: string;
  isActive?: boolean;
  onHover?: () => void;
  onClick?: () => void;
}

export function TechnologyNode({
  position,
  color,
  size = 0.5,
  isActive = false,
}: TechnologyNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Gentle floating
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0] * 10) * 0.1;

      // Pulse when active
      if (isActive) {
        pulseRef.current += delta * 5;
        const scale = 1 + Math.sin(pulseRef.current) * 0.2;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }

      // Slow rotation
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => {}}
      onClick={() => {}}
    >
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={isActive ? 0.8 : 0.5}
        wireframe={!isActive}
      />
      {isActive && (
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        >
          <sphereGeometry args={[size * 1.5, 16, 16]} />
        </meshBasicMaterial>
      )}
    </mesh>
  );
}