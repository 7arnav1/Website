import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ProjectOrbs from './ProjectOrbs';
import { useUniverse } from '../../context/UniverseContext';

function StarLayers({ quality, mouseRef, reducedMotion }) {
  const near = useRef();
  const far = useRef();
  const count = quality === 'high' ? 5000 : 2000;
  const countFar = quality === 'high' ? 3000 : 1200;
  const speed = reducedMotion ? 0.15 : 1;

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.04 * speed;
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;
    if (near.current) {
      near.current.rotation.x = t * 0.12 + my * 0.05;
      near.current.rotation.y = t * 0.18 + mx * 0.05;
    }
    if (far.current) {
      far.current.rotation.x = t * 0.06;
      far.current.rotation.y = t * 0.1 + mx * 0.03;
    }
  });

  return (
    <>
      <group ref={far}>
        <Stars radius={200} depth={100} count={countFar} factor={5} saturation={0} fade speed={0.3} />
      </group>
      <group ref={near}>
        <Stars radius={100} depth={50} count={count} factor={6} saturation={0} fade speed={0.6} />
      </group>
    </>
  );
}

function ScrollCamera({ reducedMotion }) {
  const { camera } = useThree();
  const { scrollProgress, mouseRef } = useUniverse();

  useFrame(() => {
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;
    const scroll = reducedMotion ? scrollProgress * 0.25 : scrollProgress;
    /* Keep camera in front of orbs (orbs at z -3 to -4.5) */
    const targetZ = Math.max(4, 6 - scroll * 2);
    const targetY = scroll * 0.6 + my * 0.2;
    const targetX = scroll * 0.3 + mx * 0.3;
    const lerp = reducedMotion ? 0.08 : 0.05;

    camera.position.x += (targetX - camera.position.x) * lerp;
    camera.position.y += (targetY - camera.position.y) * lerp;
    camera.position.z += (targetZ - camera.position.z) * lerp;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function UniverseScene({ reducedMotion = false }) {
  const { quality, mouseRef } = useUniverse();

  return (
    <>
      <fog attach="fog" args={['#030308', 20, 70]} />
      <ambientLight intensity={1} />
      <StarLayers quality={quality} mouseRef={mouseRef} reducedMotion={reducedMotion} />
      <ProjectOrbs reducedMotion={reducedMotion} />
      <ScrollCamera reducedMotion={reducedMotion} />
    </>
  );
}
