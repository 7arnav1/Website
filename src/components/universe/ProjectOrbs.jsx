import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { projects } from '../../data/projects';
import { useUniverse } from '../../context/UniverseContext';

/* Screen-space layout: x/y spread, z always in front of camera */
const ORB_LAYOUT = [
  { id: 'sponta', position: [2.2, 0.8, -3], scale: 0.85 },
  { id: 'justgo', position: [-2.4, 0.3, -3.5], scale: 0.65 },
  { id: 'aivestor', position: [0.5, -1.1, -4], scale: 0.7 },
  { id: 'hive', position: [2.6, -0.6, -4.5], scale: 0.6 },
];

function Orb({ project, basePosition, scale, reducedMotion }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { focusProject, mouseRef } = useUniverse();
  const [bx, by, bz] = basePosition;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const bob = reducedMotion ? 0.05 : 0.18;
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;

    groupRef.current.position.set(
      bx + mx * 0.35,
      by + Math.sin(t * 0.9 + bx) * bob + my * 0.15,
      bz,
    );
    groupRef.current.rotation.y = t * 0.2;
  });

  const s = scale * (hovered ? 1.12 : 1);
  const color = project.accent;

  return (
    <group ref={groupRef}>
      {/* Outer glow halo */}
      <mesh scale={s * 1.55}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} />
      </mesh>
      {/* Core orb — meshBasic = always visible, no lighting needed */}
      <mesh
        scale={s}
        onClick={(e) => {
          e.stopPropagation();
          focusProject(project.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Always-visible label */}
      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div className={`orb-label ${hovered ? 'orb-label--hover' : ''}`}>
          <strong>{project.title}</strong>
        </div>
      </Html>
    </group>
  );
}

export default function ProjectOrbs({ reducedMotion = false }) {
  return (
    <group>
      {ORB_LAYOUT.map((layout) => {
        const project = projects.find((p) => p.id === layout.id);
        if (!project) return null;
        return (
          <Orb
            key={layout.id}
            project={project}
            basePosition={layout.position}
            scale={layout.scale}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
}
