'use client';

import { Canvas } from '@react-three/fiber';
import { DigitalCore } from '@/components/3d/DigitalCore';
import { useWebGL, useReducedMotion, useMediaQuery } from '@/lib/hooks';

export function HeroCanvas() {
  const webglSupported = useWebGL();
  const prefersReduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  if (webglSupported === false) return null;

  // Responsive particle count: 800 desktop, 400 tablet, 200 mobile
  const particleCount = isMobile ? 200 : isTablet ? 400 : 800;

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      shadows={false}
      performance={{ min: prefersReduced ? 0.5 : 0.8 }}
    >
      <DigitalCore particleCount={particleCount} />
    </Canvas>
  );
}