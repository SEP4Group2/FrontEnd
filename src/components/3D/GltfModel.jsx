import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GltfModel = ({ modelPath, scale = 0.7, position = [0, 0, 0], initialRotation = [0, 1, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);
  const animatedRotation = useRef([0, 0, 0]); // Use a ref to store animated rotation

  useFrame((state, delta) => {
    // Rotate the mesh every frame
    animatedRotation.current[1] += 0.002 * rotationDirection;

    // Check if it's time to change rotation direction
    if (Math.abs(animatedRotation.current[1]) > 0.6) {
      setRotationDirection(rotationDirection * -1);
    }// Apply rotation to the mesh
    ref.current.rotation.y = animatedRotation.current[1] + initialRotation[1];

  });

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        rotation={[initialRotation[0], initialRotation[1], initialRotation[2]]}
        scale={hovered ? scale * 1.04 : scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      />
    </>
  );
};

export default GltfModel;
