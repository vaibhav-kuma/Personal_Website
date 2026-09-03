'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ThreatRadarProps {
  radius?: number;
  sweepSpeed?: number;
  blipCount?: number;
}

export function ThreatRadar({ radius = 12, sweepSpeed = 0.5, blipCount = 30 }: ThreatRadarProps) {
  const radarRef = useRef<THREE.Group>(null);
  const sweepRef = useRef<THREE.Mesh>(null);
  const blipsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, angles, distances } = useMemo(() => {
    const pos = new Float32Array(blipCount * 3);
    const col = new Float32Array(blipCount * 3);
    const siz = new Float32Array(blipCount);
    const ang = new Float32Array(blipCount);
    const dist = new Float32Array(blipCount);

    for (let i = 0; i < blipCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = radius * (0.1 + Math.random() * 0.85);
      const height = (Math.random() - 0.5) * radius * 0.3;

      ang[i] = angle;
      dist[i] = distance;
      pos[i * 3] = distance * Math.cos(angle);
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = distance * Math.sin(angle);

      // Threat level color
      const threat = Math.random();
      col[i * 3] = threat;
      col[i * 3 + 1] = threat > 0.7 ? 0.3 : 1 - threat;
      col[i * 3 + 2] = 0.1;

      siz[i] = 0.08 + threat * 0.15;
    }

    return { positions: pos, colors: col, sizes: siz, angles: ang, distances: dist };
  }, [blipCount, radius]);

  const sweepAngle = useRef(0);

  useFrame((_, delta) => {
    // Rotate sweep line
    sweepAngle.current += delta * sweepSpeed;
    if (sweepAngle.current > Math.PI * 2) sweepAngle.current -= Math.PI * 2;

    if (sweepRef.current) {
      sweepRef.current.rotation.y = -sweepAngle.current;
    }

    // Rotate entire radar slowly
    if (radarRef.current) {
      radarRef.current.rotation.y += delta * 0.02;
    }

    // Animate blips - pulse when sweep passes
    if (blipsRef.current && blipsRef.current.geometry.attributes.size) {
      const sizesAttr = blipsRef.current.geometry.attributes.size as THREE.BufferAttribute;
      const positionsAttr = blipsRef.current.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < blipCount; i++) {
        const blipAngle = angles[i];
        const angleDiff = Math.abs(sweepAngle.current - blipAngle);
        const normalizedDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);

        // Pulse when sweep is near
        if (normalizedDiff < 0.15) {
          const intensity = 1 - normalizedDiff / 0.15;
          sizesAttr.setX(i, sizes[i] * (1 + intensity * 2));
        } else {
          sizesAttr.setX(i, sizes[i] * (1 + Math.sin(Date.now() * 0.003 + i) * 0.2));
        }
      }
      sizesAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={radarRef}>
      {/* Base Platform */}
      <mesh>
        <cylinderGeometry args={[radius * 1.1, radius * 1.1, 0.2, 32]} />
        <meshBasicMaterial
          color="#111"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Grid Lines */}
      <group>
        {[0.25, 0.5, 0.75, 1.0].map((ratio) => (
          <mesh key={ratio}>
            <ringGeometry args={[radius * ratio * 0.98, radius * ratio * 1.02, 64]} />
            <meshBasicMaterial
              color="#00bfff"
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Sweep Line */}
      <mesh ref={sweepRef}>
        <planeGeometry args={[radius * 2, radius * 2, 1, 1]} />
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Threat Blips */}
      <points ref={blipsRef}>
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

      {/* Center Beacon */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer Ring */}
      <mesh>
        <torusGeometry args={[radius, 0.05, 8, 64]} />
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}