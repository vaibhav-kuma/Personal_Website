'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ThreatNetworkProps {
  nodeCount?: number;
  connectionProbability?: number;
}

export function ThreatNetwork({ nodeCount = 150, connectionProbability = 0.02 }: ThreatNetworkProps) {
  const networkRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);

  const { positions, colors, indices, nodeTypes } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const types = new Uint8Array(nodeCount); // 0=domain, 1=IP, 2=threat, 3=exposure
    const idx: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      // Spherical distribution
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 8 + Math.random() * 12;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Assign type and color
      const type = Math.floor(Math.random() * 4);
      types[i] = type;

      switch (type) {
        case 0: // Domain - cyan
          col[i * 3] = 0; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 1;
          break;
        case 1: // IP - purple
          col[i * 3] = 0.6; col[i * 3 + 1] = 0.2; col[i * 3 + 2] = 1;
          break;
        case 2: // Threat - red
          col[i * 3] = 1; col[i * 3 + 1] = 0.2; col[i * 3 + 2] = 0.2;
          break;
        case 3: // Exposure - orange
          col[i * 3] = 1; col[i * 3 + 1] = 0.6; col[i * 3 + 2] = 0;
          break;
      }
    }

    // Create connections based on probability
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < connectionProbability) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Only connect if reasonably close
          if (dist < 15) {
            idx.push(i, j);
          }
        }
      }
    }

    return {
      positions: pos,
      colors: col,
      indices: new Uint16Array(idx),
      nodeTypes: types,
    };
  }, [nodeCount, connectionProbability]);

  useFrame((_, delta) => {
    if (networkRef.current) {
      networkRef.current.rotation.y += delta * 0.01;
      networkRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group ref={networkRef}>
      {/* Connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="index" array={indices} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central Globe */}
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#0a0a0a"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Pulsing Rings */}
      {[1, 2, 3].map((i) => (
        <mesh key={i}>
          <torusGeometry args={[8 + i * 2, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={['#00bfff', '#8a2be2', '#ff6b6b'][i - 1]}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}