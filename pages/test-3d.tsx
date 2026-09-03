import { Canvas } from '@react-three/fiber';
import { DigitalCore } from '@/components/3d/DigitalCore';

export default function Test3D() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 50], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <DigitalCore />
      </Canvas>
    </div>
  );
}