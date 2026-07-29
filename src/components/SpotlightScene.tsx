"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

function Dust() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 4 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius * Math.random();
      arr[i * 3 + 1] = (Math.random() - 0.3) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#f5c76a"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function SpotlightCone() {
  return (
    <spotLight
      position={[0, 5, 2]}
      angle={0.5}
      penumbra={0.8}
      intensity={40}
      color="#ffcf7a"
      distance={12}
    />
  );
}

export function SpotlightScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, powerPreference: "low-power" }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.05} />
      <SpotlightCone />
      <Dust />
    </Canvas>
  );
}
