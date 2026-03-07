import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 2.8;
const MOUSE_INFLUENCE = 2.5;

const PRIMARY_COLOR = new THREE.Color('#fdbaae');

const Particles: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        0
      ),
      scale: Math.random() * 0.025 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const lineGeometry = useMemo(() => {
    const maxLines = PARTICLE_COUNT * 4;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(maxLines * 6);
    const colors = new Float32Array(maxLines * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  React.useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseWorld = new THREE.Vector3(
      mouse.current.x * viewport.width * 0.5,
      mouse.current.y * viewport.height * 0.5,
      0
    );

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];

      p.position.add(p.velocity);
      p.position.x += Math.sin(time * 0.2 + p.phase) * 0.001;
      p.position.y += Math.cos(time * 0.15 + p.phase) * 0.001;

      // Mouse repulsion
      const dx = p.position.x - mouseWorld.x;
      const dy = p.position.y - mouseWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_INFLUENCE && dist > 0.01) {
        const force = (1 - dist / MOUSE_INFLUENCE) * 0.015;
        p.position.x += (dx / dist) * force;
        p.position.y += (dy / dist) * force;
      }

      // Wrap
      if (p.position.x > 8) p.position.x = -8;
      if (p.position.x < -8) p.position.x = 8;
      if (p.position.y > 6) p.position.y = -6;
      if (p.position.y < -6) p.position.y = 6;

      const s = p.scale;
      dummy.position.copy(p.position);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Draw sparse connections
    const posAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
    let lineIndex = 0;
    const maxLines = PARTICLE_COUNT * 4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const d = particles[i].position.distanceTo(particles[j].position);
        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.09;
          const idx = lineIndex * 6;

          posAttr.array[idx] = particles[i].position.x;
          posAttr.array[idx + 1] = particles[i].position.y;
          posAttr.array[idx + 2] = particles[i].position.z;
          posAttr.array[idx + 3] = particles[j].position.x;
          posAttr.array[idx + 4] = particles[j].position.y;
          posAttr.array[idx + 5] = particles[j].position.z;

          colAttr.array[idx] = PRIMARY_COLOR.r * alpha;
          colAttr.array[idx + 1] = PRIMARY_COLOR.g * alpha;
          colAttr.array[idx + 2] = PRIMARY_COLOR.b * alpha;
          colAttr.array[idx + 3] = PRIMARY_COLOR.r * alpha;
          colAttr.array[idx + 4] = PRIMARY_COLOR.g * alpha;
          colAttr.array[idx + 5] = PRIMARY_COLOR.b * alpha;

          lineIndex++;
          if (lineIndex >= maxLines) break;
        }
      }
      if (lineIndex >= maxLines) break;
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={PRIMARY_COLOR} transparent opacity={0.4} toneMapped={false} />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent toneMapped={false} />
      </lineSegments>
    </>
  );
};

const ParticleField: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-75">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleField;
