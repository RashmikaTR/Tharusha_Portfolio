import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 600, mode }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 14;
      p[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.04;
    ref.current.rotation.x = time * 0.02;
  });

  const particleColor = mode === 'cyberpunk' ? '#a855f7' : mode === 'minimal' ? '#71717a' : '#7FDBFF';

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color={particleColor}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

const DynamicCore = ({ mode }) => {
  const groupRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
      // Soft mouse tracking
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetX, 0.05);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  const sphereColor = mode === 'cyberpunk' ? '#8b5cf6' : mode === 'minimal' ? '#27272a' : '#0e1726';
  const ringColor1 = mode === 'cyberpunk' ? '#06b6d4' : mode === 'minimal' ? '#52525b' : '#7FDBFF';
  const ringColor2 = mode === 'cyberpunk' ? '#ec4899' : mode === 'minimal' ? '#3f3f46' : '#818cf8';

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <Sphere args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color={sphereColor}
            attach="material"
            distort={0.42}
            speed={2.2}
            roughness={0.15}
            metalness={0.9}
            wireframe={mode === 'minimal'}
          />
        </Sphere>
      </Float>

      {/* Orbital Ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 16, 120]} />
        <meshStandardMaterial
          color={ringColor1}
          emissive={ringColor1}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh rotation={[Math.PI / 3.8, 1, 0]}>
        <torusGeometry args={[2.7, 0.008, 16, 120]} />
        <meshStandardMaterial
          color={ringColor2}
          emissive={ringColor2}
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

const Hero3D = ({ mode = 'tokyonight' }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} />
        <pointLight position={[-10, -10, -10]} color={mode === 'cyberpunk' ? '#8b5cf6' : '#7FDBFF'} intensity={1.5} />
        <pointLight position={[0, 5, 0]} color="#38bdf8" intensity={1} />

        <ParticleField mode={mode} />
        <DynamicCore mode={mode} />
        <Stars radius={90} depth={40} count={3500} factor={3} saturation={0} fade speed={0.8} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
