'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface RepositoryNodeProps {
  position: [number, number, number];
  color: string;
  size?: number;
  isFeatured?: boolean;
  visualizationType?: string;
  onHover?: () => void;
  onClick?: () => void;
}

export function RepositoryNode({
  position,
  color,
  size = 1,
  isFeatured = false,
  visualizationType = 'default',
}: RepositoryNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    switch (visualizationType) {
      case 'security-core':
        return <octahedronGeometry args={[size, 0]} />;
      case 'ai-engine':
        return <tetrahedronGeometry args={[size, 0]} />;
      case 'threat-radar':
        return <coneGeometry args={[size, size * 1.5, 8]} />;
      case 'threat-network':
        return <icosahedronGeometry args={[size, 0]} />;
      case 'monitoring-grid':
        return <boxGeometry args={[size, size, size]} />;
      default:
        return <sphereGeometry args={[size, 16, 16]} />;
    }
  }, [size, visualizationType]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (isFeatured ? 0.3 : 0.15);
      groupRef.current.rotation.x += delta * 0.05;
    }

    if (coreRef.current) {
      // Pulse
      const pulse = 1 + Math.sin(timeRef.current * 2) * 0.1;
      coreRef.current.scale.setScalar(pulse);
    }

    if (ringRef.current && isFeatured) {
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Core */}
      <mesh ref={coreRef}>
        {geometry}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isFeatured ? 0.7 : 0.5}
          wireframe={true}
        />
      </mesh>

      {/* Outer Ring for featured */}
      {isFeatured && (
        <mesh ref={ringRef}>
          <torusGeometry args={[size * 1.8, 0.04, 8, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Glow */}
      <mesh>
        <sphereGeometry args={[size * 2.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}