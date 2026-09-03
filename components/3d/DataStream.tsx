'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface DataStreamProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  speed?: number;
  particleCount?: number;
  thickness?: number;
}

export function DataStream({
  start,
  end,
  color = '#00bfff',
  speed = 2,
  particleCount = 50,
  thickness = 0.05,
}: DataStreamProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, colors, sizes, progress } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);
    const prog = new Float32Array(particleCount);

    // Parse color
    const c = new THREE.Color(color);

    for (let i = 0; i < particleCount; i++) {
      prog[i] = i / particleCount;

      // Initial position along line
      pos[i * 3] = start[0] + (end[0] - start[0]) * prog[i];
      pos[i * 3 + 1] = start[1] + (end[1] - start[1]) * prog[i];
      pos[i * 3 + 2] = start[2] + (end[2] - start[2]) * prog[i];

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = thickness * (0.5 + Math.random() * 0.5);
    }

    return { positions: pos, colors: col, sizes: siz, progress: prog };
  }, [start, end, color, particleCount, thickness]);

  useFrame((_, delta) => {
    timeRef.current += delta * speed;

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        // Move particle along the line
        let p = progress[i] + delta * speed * 0.1;
        if (p > 1) p -= 1;

        posAttr.setX(i, start[0] + (end[0] - start[0]) * p);
        posAttr.setY(i, start[1] + (end[1] - start[1]) * p);
        posAttr.setZ(i, start[2] + (end[2] - start[2]) * p);

        // Add slight noise
        posAttr.setY(i, posAttr.getY(i) + Math.sin(timeRef.current * 5 + i) * 0.02);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Base Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={new Float32Array([
            start[0], start[1], start[2],
            end[0], end[1], end[2]
          ])} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </line>

      {/* Flowing Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" array={sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          size={1}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}