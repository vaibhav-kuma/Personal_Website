'use client';

import { Canvas } from '@react-three/fiber';
import { ArchitectureGraph, defaultNodes, defaultEdges } from '@/components/3d';
import { useWebGL, useReducedMotion, useInView, useMediaQuery } from '@/lib/hooks';

export function Architecture3D() {
  const webglSupported = useWebGL();
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [ref, isInView] = useInView<HTMLDivElement>();

  if (webglSupported === false) return null;

  return (
    <div ref={ref} className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden glass border border-white/5">
      <Canvas
        camera={{ position: [0, 15, 50], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows={false}
        performance={{ min: prefersReduced ? 0.5 : isMobile ? 0.6 : 0.8 }}
      >
        <ArchitectureGraph nodes={defaultNodes} edges={defaultEdges} autoRotate={!prefersReduced} />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50 font-mono">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#00bfff]"></span>Client/Edge</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#8a2be2]"></span>Gateway/Auth</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#50c878]"></span>Services</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#f59e0b]"></span>AI/ML</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#ec4899]"></span>Messaging</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#00bfff]"></span>Data</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#8a2be2]"></span>Observability</span>
        </div>
      </div>
    </div>
  );
}