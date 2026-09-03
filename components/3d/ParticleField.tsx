'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
  type?: 'sphere' | 'cube' | 'torus';
}

export function ParticleField({
  count = 1000,
  radius = 20,
  color = '#00bfff',
  speed = 0.5,
  type = 'sphere',
}: ParticleFieldProps) {
  const fieldRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    const c = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      let x, y, z;

      switch (type) {
        case 'sphere': {
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = Math.random() * Math.PI * 2;
          const r = radius * Math.cbrt(Math.random()); // Uniform volume distribution
          x = r * Math.sin(phi) * Math.cos(theta);
          y = r * Math.sin(phi) * Math.sin(theta);
          z = r * Math.cos(phi);
          break;
        }
        case 'cube': {
          x = (Math.random() - 0.5) * radius * 2;
          y = (Math.random() - 0.5) * radius * 2;
          z = (Math.random() - 0.5) * radius * 2;
          break;
        }
        case 'torus': {
          const tubeRadius = radius * 0.3;
          const u = Math.random() * Math.PI * 2;
          const v = Math.random() * Math.PI * 2;
          const R = radius * 0.7;
          x = (R + tubeRadius * Math.cos(v)) * Math.cos(u);
          y = tubeRadius * Math.sin(v);
          z = (R + tubeRadius * Math.cos(v)) * Math.sin(u);
          break;
        }
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = 0.05 + Math.random() * 0.1;

      // Random velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.5;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    return { positions: pos, colors: col, sizes: siz, velocities: vel };
  }, [count, radius, color, type]);

  useFrame((_, delta) => {
    timeRef.current += delta * speed;

    if (fieldRef.current) {
      const posAttr = fieldRef.current.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        // Apply velocity
        posAttr.setX(i, posAttr.getX(i) + velocities[i * 3] * delta);
        posAttr.setY(i, posAttr.getY(i) + velocities[i * 3 + 1] * delta);
        posAttr.setZ(i, posAttr.getZ(i) + velocities[i * 3 + 2] * delta);

        // Boundary check - wrap around
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);
        const bound = radius * 1.5;

        if (Math.abs(x) > bound) posAttr.setX(i, -Math.sign(x) * bound);
        if (Math.abs(y) > bound) posAttr.setY(i, -Math.sign(y) * bound);
        if (Math.abs(z) > bound) posAttr.setZ(i, -Math.sign(z) * bound);

        // Subtle attraction to center
        const dist = Math.sqrt(x * x + y * y + z * z);
        if (dist > radius) {
          const force = (dist - radius) * 0.01;
          posAttr.setX(i, x - x / dist * force);
          posAttr.setY(i, y - y / dist * force);
          posAttr.setZ(i, z - z / dist * force);
        }
      }
      posAttr.needsUpdate = true;

      // Slow overall rotation
      fieldRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={fieldRef}>
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
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}