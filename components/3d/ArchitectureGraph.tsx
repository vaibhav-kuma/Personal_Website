'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface NodeData {
  id: string;
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  layer: number;
}

interface EdgeData {
  from: string;
  to: string;
  color: string;
}

interface ArchitectureGraphProps {
  nodes: NodeData[];
  edges: EdgeData[];
  autoRotate?: boolean;
}

export const defaultNodes: NodeData[] = [
  { id: 'client', position: [-15, 5, 0], color: '#00bfff', size: 1.2, label: 'Client', layer: 0 },
  { id: 'gateway', position: [-10, 5, 0], color: '#8a2be2', size: 1, label: 'API Gateway', layer: 1 },
  { id: 'auth', position: [-10, 2, -3], color: '#8a2be2', size: 0.8, label: 'Auth', layer: 1 },
  { id: 'rate', position: [-10, 2, 3], color: '#8a2be2', size: 0.8, label: 'Rate Limit', layer: 1 },
  { id: 'api', position: [-5, 5, 0], color: '#50c878', size: 1.2, label: 'API Services', layer: 2 },
  { id: 'business', position: [-5, 2, -3], color: '#50c878', size: 1, label: 'Business Logic', layer: 2 },
  { id: 'domain', position: [-5, 2, 3], color: '#50c878', size: 1, label: 'Domain Services', layer: 2 },
  { id: 'ml', position: [0, 5, 0], color: '#f59e0b', size: 1.2, label: 'ML Inference', layer: 3 },
  { id: 'detection', position: [0, 2, -3], color: '#f59e0b', size: 1, label: 'Detection Engine', layer: 3 },
  { id: 'agent', position: [0, 2, 3], color: '#f59e0b', size: 1, label: 'AI Agents', layer: 3 },
  { id: 'kafka', position: [5, 5, 0], color: '#ec4899', size: 1.2, label: 'Kafka', layer: 4 },
  { id: 'redis', position: [5, 2, -3], color: '#ec4899', size: 0.8, label: 'Redis Streams', layer: 4 },
  { id: 'pg', position: [10, 5, -4], color: '#00bfff', size: 1, label: 'PostgreSQL', layer: 5 },
  { id: 'es', position: [10, 5, 0], color: '#00bfff', size: 1, label: 'Elasticsearch', layer: 5 },
  { id: 'mongo', position: [10, 5, 4], color: '#00bfff', size: 1, label: 'MongoDB', layer: 5 },
  { id: 'redis2', position: [10, 2, -4], color: '#00bfff', size: 0.8, label: 'Redis Cache', layer: 5 },
  { id: 'prom', position: [15, 5, 0], color: '#8a2be2', size: 1, label: 'Prometheus', layer: 6 },
  { id: 'grafana', position: [15, 2, -3], color: '#8a2be2', size: 0.8, label: 'Grafana', layer: 6 },
  { id: 'jaeger', position: [15, 2, 3], color: '#8a2be2', size: 0.8, label: 'Jaeger', layer: 6 },
];

export const defaultEdges: EdgeData[] = [
  { from: 'client', to: 'gateway', color: '#00bfff' },
  { from: 'gateway', to: 'auth', color: '#8a2be2' },
  { from: 'gateway', to: 'rate', color: '#8a2be2' },
  { from: 'gateway', to: 'api', color: '#50c878' },
  { from: 'api', to: 'business', color: '#50c878' },
  { from: 'api', to: 'domain', color: '#50c878' },
  { from: 'business', to: 'ml', color: '#f59e0b' },
  { from: 'domain', to: 'detection', color: '#f59e0b' },
  { from: 'ml', to: 'agent', color: '#f59e0b' },
  { from: 'business', to: 'kafka', color: '#ec4899' },
  { from: 'detection', to: 'kafka', color: '#ec4899' },
  { from: 'agent', to: 'kafka', color: '#ec4899' },
  { from: 'api', to: 'pg', color: '#00bfff' },
  { from: 'api', to: 'redis2', color: '#00bfff' },
  { from: 'kafka', to: 'es', color: '#00bfff' },
  { from: 'kafka', to: 'mongo', color: '#00bfff' },
  { from: 'kafka', to: 'redis', color: '#ec4899' },
  { from: 'es', to: 'prom', color: '#8a2be2' },
  { from: 'kafka', to: 'prom', color: '#8a2be2' },
  { from: 'api', to: 'jaeger', color: '#8a2be2' },
];

export function ArchitectureGraph({ nodes = defaultNodes, edges = defaultEdges, autoRotate = true }: ArchitectureGraphProps) {
  const graphRef = useRef<THREE.Group>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const edgeLinesRef = useRef<THREE.LineSegments>(null);
  const particleRefs = useRef<Map<string, THREE.Points>>(new Map());
  const timeRef = useRef(0);

  const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

  const { edgePositions, edgeColors, edgeIndices, particlePositions, particleColors, particleProgress } = useMemo(() => {
    // Edge geometry
    const edgePos: number[] = [];
    const edgeCol: number[] = [];
    const edgeIdx: number[] = [];

    edges.forEach((edge, i) => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      if (!fromNode || !toNode) return;

      const baseIdx = edgePos.length / 3;
      edgePos.push(
        fromNode.position[0], fromNode.position[1], fromNode.position[2],
        toNode.position[0], toNode.position[1], toNode.position[2]
      );

      const c = new THREE.Color(edge.color);
      edgeCol.push(c.r, c.g, c.b, c.r, c.g, c.b);

      edgeIdx.push(baseIdx, baseIdx + 1);
    });

    // Flow particles along edges
    const particleCount = edges.length * 3;
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);
    const pProg = new Float32Array(particleCount);

    edges.forEach((edge, edgeIdx) => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      if (!fromNode || !toNode) return;

      const c = new THREE.Color(edge.color);
      for (let p = 0; p < 3; p++) {
        const idx = edgeIdx * 3 + p;
        pProg[idx] = p / 3;
        pPos[idx * 3] = fromNode.position[0];
        pPos[idx * 3 + 1] = fromNode.position[1];
        pPos[idx * 3 + 2] = fromNode.position[2];
        pCol[idx * 3] = c.r;
        pCol[idx * 3 + 1] = c.g;
        pCol[idx * 3 + 2] = c.b;
      }
    });

    return {
      edgePositions: new Float32Array(edgePos),
      edgeColors: new Float32Array(edgeCol),
      edgeIndices: new Uint16Array(edgeIdx),
      particlePositions: pPos,
      particleColors: pCol,
      particleProgress: pProg,
    };
  }, [nodes, edges]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (autoRotate && graphRef.current) {
      graphRef.current.rotation.y += delta * 0.02;
    }

    // Animate flow particles
    const particleMesh = particleRefs.current.get('flow');
    if (particleMesh) {
      const posAttr = particleMesh.geometry.attributes.position as THREE.BufferAttribute;
      const progAttr = particleMesh.geometry.attributes.progress as THREE.BufferAttribute;

      for (let i = 0; i < progAttr.count; i++) {
        let p = progAttr.getX(i) + delta * 0.3;
        if (p > 1) p -= 1;
        progAttr.setX(i, p);

        // Find which edge this particle belongs to
        const edgeIdx = Math.floor(i / 3);
        const edge = edges[edgeIdx];
        if (!edge) continue;

        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) continue;

        posAttr.setX(i, fromNode.position[0] + (toNode.position[0] - fromNode.position[0]) * p);
        posAttr.setY(i, fromNode.position[1] + (toNode.position[1] - fromNode.position[1]) * p);
        posAttr.setZ(i, fromNode.position[2] + (toNode.position[2] - fromNode.position[2]) * p);
      }
      posAttr.needsUpdate = true;
    }

    // Pulse nodes
    nodeMeshesRef.current.forEach((mesh, nodeId) => {
      const node = nodeMap.get(nodeId);
      if (!node) return;

      const pulse = 1 + Math.sin(timeRef.current * 2 + node.layer) * 0.1;
      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={graphRef}>
      {/* Edges */}
      <lineSegments ref={edgeLinesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={edgePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={edgeColors} itemSize={3} />
          <bufferAttribute attach="index" array={edgeIndices} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Flow Particles */}
      <points
        ref={(el) => { particleRefs.current.set('flow', el!); }}
      >
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={particlePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={particleColors} itemSize={3} />
          <bufferAttribute attach="attributes-progress" array={particleProgress} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Nodes */}
      {nodes.map((node) => (
        <mesh
          key={node.id}
          ref={(el) => { if (el) nodeMeshesRef.current.set(node.id, el); }}
          position={node.position}
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}