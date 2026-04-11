import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, Stars, Float as FloatObject } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 500, mode }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 10;
        p[i * 3 + 1] = (Math.random() - 0.5) * 10;
        p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    if (mode === 'creative') {
        ref.current.rotation.x = time * 0.08;
    }
  });

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
        size={0.015} 
        color={mode === 'professional' ? "#444" : "#8b5cf6"} 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
};

const RotatingCore = ({ mode }) => {
    const coreRef = useRef();
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        coreRef.current.rotation.y = t * 0.2;
        coreRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    });

    return (
        <group ref={coreRef}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color={mode === 'professional' ? "#18181b" : "#8b5cf6"}
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
            {/* Orbital Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.01, 16, 100]} />
                <meshStandardMaterial color={mode === 'professional' ? "#333" : "#06b6d4"} transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 4, 1, 0]}>
                <torusGeometry args={[2.5, 0.005, 16, 100]} />
                <meshStandardMaterial color={mode === 'professional' ? "#222" : "#ec4899"} transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

const Hero3D = ({ mode }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color={mode === 'creative' ? "#8b5cf6" : "#444"} intensity={1} />
        
        <ParticleField mode={mode} />
        <RotatingCore mode={mode} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
