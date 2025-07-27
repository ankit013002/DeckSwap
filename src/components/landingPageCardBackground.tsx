"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Float, Stage, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CharizardCard() {
  const { scene } = useGLTF("/cards/pokemon_tcg_charizard_1st_edition.glb");
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = false;
    }
  });
  return <primitive object={scene} rotation={[Math.PI / 2.75, 0, -0.2]} />;
}

export function LandingPageCardBackground() {
  return (
    <div className="h-screen w-full transform-gpu will-change-transform">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: true }}
        camera={{ fov: 20, position: [0, 1, 4] }}
      >
        {/* 💡 Lights */}
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[4, 4, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
          shadow-camera-left={-2}
          shadow-camera-right={2}
        />

        <Suspense fallback={null}>
          <Float speed={5} floatIntensity={0.5}>
            <CharizardCard />
          </Float>
        </Suspense>

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.5}
          scale={10}
          blur={1.5}
          far={4.5}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            intensity={1}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
