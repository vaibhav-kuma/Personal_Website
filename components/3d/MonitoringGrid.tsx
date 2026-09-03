'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface MonitoringGridProps {
  gridSize?: number;
  cellSize?: number;
}

export function MonitoringGrid({ gridSize = 20, cellSize = 1 }: MonitoringGridProps) {
  const gridRef = useRef<THREE.Group>(null);
  const cellsRef = useRef<THREE.InstancedMesh>(null);
  const metricsRef = useRef<THREE.Points>(null);

  const { cellPositions, cellColors, cellScales, metricPositions, metricColors, cellGeometry } = useMemo(() => {
    const totalCells = gridSize * gridSize;
    const positions = new Float32Array(totalCells * 3);
    const colors = new Float32Array(totalCells * 3);
    const scales = new Float32Array(totalCells);

    const metricCount = 200;
    const metricPos = new Float32Array(metricCount * 3);
    const metricCol = new Float32Array(metricCount * 3);

    // Grid cells
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const i = x * gridSize + z;
        positions[i * 3] = (x - gridSize / 2) * cellSize * 1.2;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z - gridSize / 2) * cellSize * 1.2;

        // Default color - dark grid
        colors[i * 3] = 0.1;
        colors[i * 3 + 1] = 0.1;
        colors[i * 3 + 2] = 0.15;

        scales[i] = 0.8;
      }
    }

    // Floating metrics
    for (let i = 0; i < metricCount; i++) {
      const x = (Math.random() - 0.5) * gridSize * cellSize * 1.2;
      const z = (Math.random() - 0.5) * gridSize * cellSize * 1.2;
      const y = Math.random() * 8 + 1;

      metricPos[i * 3] = x;
      metricPos[i * 3 + 1] = y;
      metricPos[i * 3 + 2] = z;

      // Metric type color
      const type = Math.floor(Math.random() * 4);
      switch (type) {
        case 0: // Logs - cyan
          metricCol[i * 3] = 0; metricCol[i * 3 + 1] = 0.9; metricCol[i * 3 + 2] = 1;
          break;
        case 1: // Metrics - green
          metricCol[i * 3] = 0.2; metricCol[i * 3 + 1] = 1; metricCol[i * 3 + 2] = 0.3;
          break;
        case 2: // Alerts - red
          metricCol[i * 3] = 1; metricCol[i * 3 + 1] = 0.3; metricCol[i * 3 + 2] = 0.3;
          break;
        case 3: // Traces - purple
          metricCol[i * 3] = 0.7; metricCol[i * 3 + 1] = 0.3; metricCol[i * 3 + 2] = 1;
          break;
      }
    }

    const geometry = new THREE.BoxGeometry(cellSize, 0.1, cellSize);

    return {
      cellPositions: positions,
      cellColors: colors,
      cellScales: scales,
      metricPositions: metricPos,
      metricColors: metricCol,
      cellGeometry: geometry,
    };
  }, [gridSize, cellSize]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Animate grid cells - pulse based on "activity"
    if (cellsRef.current) {
      const scalesArray = cellsRef.current.instanceMatrix.array;
      // We'll use a simpler approach - just rotate the whole grid
    }

    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.015;
    }

    // Animate floating metrics
    if (metricsRef.current) {
      const posAttr = metricsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const y = posAttr.getY(i);
        const newY = y + delta * 0.5;
        posAttr.setY(i, newY > 10 ? 1 : newY);

        // Horizontal drift
        posAttr.setX(i, posAttr.getX(i) + Math.sin(timeRef.current + i) * delta * 0.3);
        posAttr.setZ(i, posAttr.getZ(i) + Math.cos(timeRef.current + i) * delta * 0.3);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={gridRef}>
      {/* Grid Floor */}
      <gridHelper args={[gridSize * cellSize * 1.2, gridSize, '#00bfff22', '#00bfff11']} />

      {/* Grid Cells (Instanced Cubes) */}
      <instancedMesh
        ref={cellsRef}
        args={[cellGeometry, undefined, gridSize * gridSize]}
        instanceMatrix={new THREE.InstancedBufferAttribute(new Float32Array(16 * gridSize * gridSize), 16)}
        instanceColor={new THREE.InstancedBufferAttribute(new Float32Array(3 * gridSize * gridSize), 3)}
      >
        <meshBasicMaterial
          transparent
          opacity={0.3}
          vertexColors
        />
      </instancedMesh>

      {/* Floating Metrics */}
      <points ref={metricsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={metricPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={metricColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Service Nodes - at grid intersections */}
      <group>
        {([
          [-8, 0, -8], [8, 0, -8], [-8, 0, 8], [8, 0, 8], // corners
          [0, 0, -8], [0, 0, 8], [-8, 0, 0], [8, 0, 0], // edges
          [0, 0, 0], // center
        ] as const).map((pos, i) => (
          <mesh key={i} position={pos}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial
              color={['#00bfff', '#50c878', '#ff6b6b', '#8a2be2', '#f59e0b'][i % 5]}
              transparent
              opacity={0.5}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Data Flow Lines */}
      <group>
        {[
          { from: [-8, 0, -8], to: [0, 0, 0] },
          { from: [8, 0, -8], to: [0, 0, 0] },
          { from: [-8, 0, 8], to: [0, 0, 0] },
          { from: [8, 0, 8], to: [0, 0, 0] },
          { from: [0, 0, 0], to: [0, 3, 0] },
        ].map((line, i) => (
          <mesh key={i} position={[(line.from[0] + line.to[0]) / 2, (line.from[1] + line.to[1]) / 2, (line.from[2] + line.to[2]) / 2]}>
            <cylinderGeometry args={[0.02, 0.02, Math.sqrt(
              Math.pow(line.to[0] - line.from[0], 2) +
              Math.pow(line.to[1] - line.from[1], 2) +
              Math.pow(line.to[2] - line.from[2], 2)
            ), 8]} />
            <meshBasicMaterial
              color="#00bfff"
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}