'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface DigitalCoreProps {
  radius?: number;
  particleCount?: number;
}

export function DigitalCore({ radius = 8, particleCount = 800 }: DigitalCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);

  // Create geometry and materials once
  const { positions, colors, indices } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const idx = new Uint16Array(particleCount * 2); // for lines (pairs)

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution with noise
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.5 + Math.random() * 0.5);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color: cyan to purple gradient
      const t = Math.random();
      col[i * 3] = t * 0.5; // R
      col[i * 3 + 1] = t * 0.2 + 0.3; // G
      col[i * 3 + 2] = 1 - t * 0.3; // B
    }

    // Simple connections: connect nearby particles (for visual, we'll just create random pairs)
    for (let i = 0; i < particleCount; i += 2) {
      if (i + 1 < particleCount) {
        idx[i] = i;
        idx[i + 1] = i + 1;
      }
    }

    return { positions: pos, colors: col, indices: idx };
  }, [particleCount, radius]);

  // Animation
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += delta * 0.01;
    }
    if (connectionsRef.current) {
      connectionsRef.current.rotation.y += delta * 0.02;
      connectionsRef.current.rotation.x += delta * 0.01;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central Core Sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.3, 32, 32]} />
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Outer Glow Sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.5, 16, 16]} />
        <meshBasicMaterial
          color="#8a2be2"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="index" array={indices} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Data Streams - rotating rings */}
      <group>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[i * Math.PI / 3, 0, 0]}>
            <torusGeometry args={[radius * (0.7 + i * 0.15), 0.02, 8, 64]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#00bfff' : '#8a2be2'}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}