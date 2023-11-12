import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./GltfModel";

const ModelViewer = ({ modelPath, scale = 0.7, position = [0, 0, 0] }) => {
  return (
    <Canvas
      style={{ width: '100%', height: '222px' }}
      camera={{ position: [1.8, 1, -3] }} // Set the camera position directly
    >
      {/* <ambientLight intensity={0.7} />
      <spotLight position={position} angle={0.15} penumbra={1} />
      <pointLight position={[position[0], position[1], position[2] - 10]} /> */}
      <Suspense fallback={null}>
        <GltfModel modelPath={modelPath} scale={scale} position={position} />
        <OrbitControls enableZoom={true} />
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;
