import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import UniverseScene from './UniverseScene';
import { useUniverse } from '../../context/UniverseContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function canUseWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

export default function UniverseCanvas() {
  const reduced = usePrefersReducedMotion();
  const { mouseRef, quality } = useUniverse();
  const [webglOk] = useState(canUseWebGL);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseRef]);

  if (!webglOk) {
    return null;
  }

  const dpr = quality === 'high' ? [1, 1.5] : [1, 1];

  return (
    <div className="universe-canvas-wrap" aria-hidden="true">
      <Canvas
        className="universe-canvas"
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 100 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <UniverseScene reducedMotion={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
