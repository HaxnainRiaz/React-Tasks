"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

// --- Globe model (inner globe only, outer removed) ---
function EarthModel({ scale = 0.04 }) {
  const { scene } = useGLTF("/models/earth_and_clouds.glb");
  scene.traverse((child) => {
    if (child.isMesh && child.name.includes("Outer")) {
      child.visible = false; // 🔥 hide the semi-transparent outer layer
    }
  });
  return <primitive object={scene} scale={[scale, scale, scale]} />;
}

// --- Flat sticker-style marker with pulse effect ---
function FlatMarker({
  position,
  color = "red",
  size = 0.08,
  rotation = [-Math.PI / 2, 0, 0],
  onClick,
  onHover,
}) {
  const pulseRef = useRef();

  useFrame((state) => {
    if (pulseRef.current) {
      const t = state.clock.elapsedTime;
      const pulseScale = 1 + 0.25 * Math.sin(t * 2);
      pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      pulseRef.current.material.opacity =
        0.4 * (1 - Math.abs(Math.sin(t * 2)));
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={onHover}
      onPointerOut={() => onHover(null)}
    >
      {/* Pulse ring */}
      <mesh ref={pulseRef}>
        <ringGeometry args={[size * 0.6, size * 1.2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sticker marker */}
      <mesh scale={[size, size, size]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// --- Projection helper (3D -> 2D) ---
function MarkerProjectionHelper({ marker, onProject }) {
  const { camera, size } = useThree();
  const vec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (marker?.position) {
      vec.current.set(...marker.position);
      vec.current.project(camera);
      const x = (vec.current.x * 0.5 + 0.5) * size.width;
      const y = (-vec.current.y * 0.5 + 0.5) * size.height;
      onProject({ x, y });
    }
  });

  return null;
}

// --- Rotating globe wrapper ---
function RotatingEarth({ setHoveredMarker, setSelectedMarker }) {
  const globeRadius = 2;

  const markerPositions = [
    { name: "Lahore, Pakistan", raw: [2.1, 1.9, 0.2], rotation: [-Math.PI / 2.2, 0.82, 1] },
    { name: "Beijing, China", raw: [1.8, 1.9, -1], rotation: [-Math.PI / 1.5, Math.PI / 4.4, 2] },
    { name: "Dhaka, Bangladesh", raw: [1.8, 0.8, 0], rotation: [-Math.PI / 2, Math.PI / 2.7, Math.PI / 8] },
    { name: "Istanbul, Turkey", raw: [1.5, 2.6, 2.6], rotation: [-Math.PI / 4.1, Math.PI / 8, 4] },
    { name: "Tehran, Iran", raw: [1.5, 1.3, 1.1], rotation: [-Math.PI / 3.5, 0.7, Math.PI / 2] },
    { name: "Moscow, Russia", raw: [1.5, 3.2, 1.1], rotation: [-Math.PI / 2.5, Math.PI / 8, -Math.PI / 8] },
    { name: "Jerusalem, Palestine", raw: [1.2, 1.3, 1.7], rotation: [-Math.PI / 5, Math.PI / 6, -Math.PI / 1] },
    { name: "Riyadh, KSA", raw: [1.2, 0.7, 1.3], rotation: [-Math.PI / 6, 0.7, -Math.PI / 6] },
    { name: "Doha, Qatar", raw: [1.2, 0.75, 0.93], rotation: [-Math.PI / 5, Math.PI / 4, Math.PI / 6] },
  ];

  const markers = markerPositions.map((marker) => {
    const vec = new THREE.Vector3(...marker.raw)
      .normalize()
      .multiplyScalar(globeRadius + 0.001);
    return { ...marker, position: [vec.x, vec.y, vec.z] };
  });

  return (
    <group>
      <EarthModel scale={0.04} />
      {markers.map((marker, idx) => (
        <FlatMarker
          key={idx}
          position={marker.position}
          size={0.08}
          rotation={marker.rotation}
          color="red"
          onClick={() => setSelectedMarker(marker)}
          onHover={(m) => setHoveredMarker(m ? marker : null)}
        />
      ))}
    </group>
  );
}

// --- Main viewer ---
export default function ThreeDViewer() {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [hoveredScreenPos, setHoveredScreenPos] = useState(null);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedScreenPos, setSelectedScreenPos] = useState(null);

  return (
    <div className="w-full h-[500px] bg-black relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <RotatingEarth
            setHoveredMarker={setHoveredMarker}
            setSelectedMarker={setSelectedMarker}
          />
        </Suspense>

        {hoveredMarker && (
          <MarkerProjectionHelper
            marker={hoveredMarker}
            onProject={setHoveredScreenPos}
          />
        )}
        {selectedMarker && (
          <MarkerProjectionHelper
            marker={selectedMarker}
            onProject={setSelectedScreenPos}
          />
        )}

        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Hover popup */}
      {hoveredMarker && hoveredScreenPos && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{
            top: hoveredScreenPos.y,
            left: hoveredScreenPos.x,
            transform: "translate(-50%, -120%)",
          }}
        >
          {hoveredMarker.name}
        </div>
      )}

      {/* Click popup */}
      {selectedMarker && selectedScreenPos && (
        <div
          className="absolute bg-white p-2 rounded shadow-lg z-50"
          style={{
            top: selectedScreenPos.y,
            left: selectedScreenPos.x,
            transform: "translate(-50%, -120%)",
          }}
        >
          <h2 className="font-bold">{selectedMarker.name}</h2>
          <button
            className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => setSelectedMarker(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
