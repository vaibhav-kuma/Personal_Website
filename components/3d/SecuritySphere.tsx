'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface SecuritySphereProps {
  radius?: number;
  nodeCount?: number;
}

export function SecuritySphere({ radius = 10, nodeCount = 200 }: SecuritySphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);

  const { positions, colors, indices } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const idx = new Uint16Array(nodeCount * 2);

    for (let i = 0; i < nodeCount; i++) {
      // Spherical distribution with clusters
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.3 + Math.random() * 0.7);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color based on "threat level" - green to red
      const threat = Math.random();
      col[i * 3] = threat;           // R
      col[i * 3 + 1] = 1 - threat;   // G
      col[i * 3 + 2] = 0.2;          // B
    }

    // Connect nearby nodes (simplified)
    for (let i = 0; i < nodeCount; i += 3) {
      if (i + 1 < nodeCount) {
        idx[i] = i;
        idx[i + 1] = i + 1;
      }
    }

    return { positions: pos, colors: col, indices: idx };
  }, [nodeCount, radius]);

  useFrame((_, delta) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.015;
    }
    if (connectionsRef.current) {
      connectionsRef.current.rotation.y += delta * 0.015;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[radius * 0.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff6b6b"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Threat Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
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
          color="#ff6b6b"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Pulsing Rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <torusGeometry args={[radius * (0.5 + i * 0.2), 0.03, 8, 64]} />
          <meshBasicMaterial
            color={['#ff6b6b', '#00bfff', '#50c878'][i]}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}