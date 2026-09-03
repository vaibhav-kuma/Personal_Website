'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface AITransformationEngineProps {
  particleCount?: number;
  flowSpeed?: number;
}

export function AITransformationEngine({ particleCount = 500, flowSpeed = 1 }: AITransformationEngineProps) {
  const engineRef = useRef<THREE.Group>(null);
  const legacyParticlesRef = useRef<THREE.Points>(null);
  const modernParticlesRef = useRef<THREE.Points>(null);
  const agentRefs = useRef<THREE.Mesh[]>([]);

  const { legacyPositions, modernPositions, agentPositions, legacyColors, modernColors } = useMemo(() => {
    const legacyPos = new Float32Array(particleCount * 3);
    const modernPos = new Float32Array(particleCount * 3);
    const agentPos = new Float32Array(4 * 3); // 4 AI agents
    const legacyCol = new Float32Array(particleCount * 3);
    const modernCol = new Float32Array(particleCount * 3);

    // Legacy particles (left side) - red/orange tones
    for (let i = 0; i < particleCount; i++) {
      legacyPos[i * 3] = -15 + Math.random() * 5;      // x: left zone
      legacyPos[i * 3 + 1] = (Math.random() - 0.5) * 8; // y
      legacyPos[i * 3 + 2] = (Math.random() - 0.5) * 8; // z

      const t = Math.random();
      legacyCol[i * 3] = 1;                    // R
      legacyCol[i * 3 + 1] = 0.3 + t * 0.4;    // G
      legacyCol[i * 3 + 2] = 0.1;              // B
    }

    // Modern particles (right side) - green/blue tones
    for (let i = 0; i < particleCount; i++) {
      modernPos[i * 3] = 15 + Math.random() * 5;       // x: right zone
      modernPos[i * 3 + 1] = (Math.random() - 0.5) * 8; // y
      modernPos[i * 3 + 2] = (Math.random() - 0.5) * 8; // z

      const t = Math.random();
      modernCol[i * 3] = 0.1;              // R
      modernCol[i * 3 + 1] = 0.5 + t * 0.5; // G
      modernCol[i * 3 + 2] = 1;            // B
    }

    // AI Agent positions (in the middle transformation zone)
    const agentOffsets = [
      [-5, 3, 0],
      [-2, -2, 2],
      [2, 2, -1],
      [5, -3, 1],
    ];
    for (let i = 0; i < 4; i++) {
      agentPos[i * 3] = agentOffsets[i][0];
      agentPos[i * 3 + 1] = agentOffsets[i][1];
      agentPos[i * 3 + 2] = agentOffsets[i][2];
    }

    return { legacyPositions: legacyPos, modernPositions: modernPos, agentPositions: agentPos, legacyColors: legacyCol, modernColors: modernCol };
  }, [particleCount]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * flowSpeed;

    // Rotate engine slowly
    if (engineRef.current) {
      engineRef.current.rotation.y += delta * 0.02;
    }

    // Animate legacy particles flowing toward center
    if (legacyParticlesRef.current) {
      const posAttr = legacyParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);

        // Flow toward center
        posAttr.setX(i, x + delta * flowSpeed * 2);

        // Reset when passed center
        if (x > 5) {
          posAttr.setX(i, -15 + Math.random() * 2);
          posAttr.setY(i, (Math.random() - 0.5) * 8);
          posAttr.setZ(i, (Math.random() - 0.5) * 8);
        }
      }
      posAttr.needsUpdate = true;
    }

    // Animate modern particles flowing outward
    if (modernParticlesRef.current) {
      const posAttr = modernParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const x = posAttr.getX(i);
        posAttr.setX(i, x + delta * flowSpeed * 1.5);

        if (x > 25) {
          posAttr.setX(i, 15 + Math.random() * 2);
          posAttr.setY(i, (Math.random() - 0.5) * 8);
          posAttr.setZ(i, (Math.random() - 0.5) * 8);
        }
      }
      posAttr.needsUpdate = true;
    }

    // Pulse agents
    agentRefs.current.forEach((agent, i) => {
      const scale = 1 + Math.sin(timeRef.current * 3 + i) * 0.2;
      agent.scale.setScalar(scale);
    });
  });

  return (
    <group ref={engineRef}>
      {/* Legacy Code Zone (Left) */}
      <mesh>
        <boxGeometry args={[5, 12, 12]} />
        <meshBasicMaterial
          color="#ff4444"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>

      {/* Transformation Zone (Center) */}
      <mesh>
        <boxGeometry args={[12, 14, 14]} />
        <meshBasicMaterial
          color="#8a2be2"
          transparent
          opacity={0.03}
          wireframe
        />
      </mesh>

      {/* Modern Code Zone (Right) */}
      <mesh>
        <boxGeometry args={[5, 12, 12]} />
        <meshBasicMaterial
          color="#50c878"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>

      {/* Legacy Particles */}
      <points ref={legacyParticlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={legacyPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={legacyColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Modern Particles */}
      <points ref={modernParticlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={modernPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={modernColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* AI Agents */}
      <group>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => { agentRefs.current[i] = el!; }}
            position={[
              agentPositions[i * 3],
              agentPositions[i * 3 + 1],
              agentPositions[i * 3 + 2],
            ]}
          >
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial
              color="#8a2be2"
              transparent
              opacity={0.6}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Flow Arrows - simplified as lines */}
      <group>
        {[ -8, -4, 0, 4, 8 ].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <coneGeometry args={[0.3, 1, 8]} />
            <meshBasicMaterial
              color="#8a2be2"
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}