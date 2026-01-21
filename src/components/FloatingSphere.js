import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function FloatingPC({ position = [0, 0, 0], scale = 1, rotationSpeed = 0.005 }) {
  const gltf = useGLTF("/models/gaming_desktop_pc.glb");
  const ref = useRef();

  // Rotate around Y-axis
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed * delta * 60; // delta-based smooth rotation
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}
