"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useMemo, useEffect, forwardRef } from "react";
import * as THREE from "three";

// --- Globe model ---
function EarthModel({ scale = 0.04 }) {
  const { scene } = useGLTF("/models/earth_and_clouds.glb");
  scene.traverse((child) => {
    if (child.isMesh && child.name.includes("Outer")) {
      child.visible = false;
    }
  });
  return <primitive object={scene} scale={[scale, scale, scale]} />;
}

// --- Flat marker with pulse effect ---
const FlatMarker = forwardRef(function FlatMarker(
  { position, color = "red", size = 0.08, rotation = [-Math.PI / 2, 0, 0], onClick, onHover },
  ref
) {
  const pulseRef = useRef();

  useFrame((state) => {
    if (pulseRef.current) {
      const t = state.clock.elapsedTime;
      const pulseScale = 1 + 0.25 * Math.sin(t * 2);
      pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      pulseRef.current.material.opacity = THREE.MathUtils.clamp(
        0.4 * (1 - Math.abs(Math.sin(t * 2))),
        0.02,
        0.6
      );
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => onHover && onHover(true, ref)}
      onPointerOut={() => onHover && onHover(false, ref)}
    >
      <mesh ref={pulseRef}>
        <ringGeometry args={[size * 0.6, size * 1.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      <mesh scale={[size, size, size]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
});

// --- Projection helper (fixed to world position) ---
function MarkerProjectionHelper({ markerRef, onProject }) {
  const { camera, gl } = useThree();
  const vec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (markerRef?.current) {
      markerRef.current.getWorldPosition(vec.current);
      vec.current.project(camera);

      const canvasRect = gl.domElement.getBoundingClientRect();
      const x = (vec.current.x * 0.5 + 0.5) * canvasRect.width;
      const y = (-vec.current.y * 0.5 + 0.5) * canvasRect.height;

      onProject({ x, y });
    }
  });

  return null;
}

// --- Twinkling stars ---
function TwinklingStars({ count = 100, minRadius = 90, maxRadius = 100 }) {
  const pointsRef = useRef();

  const [positions, colors, phases, factors, speeds] = useMemo(() => {
    const pos = [];
    const col = [];
    const ph = [];
    const fac = [];
    const spd = [];

    const colorOptions = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xfcf2e3),
      new THREE.Color(0xfae7c0),
      new THREE.Color(0xfce1e1),
      new THREE.Color(0xdbedff),
    ];

    for (let i = 0; i < count; i++) {
      const r = minRadius + Math.random() * (maxRadius - minRadius);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos.push(x, y, z);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col.push(color.r, color.g, color.b);

      ph.push(Math.random() * Math.PI * 2);
      fac.push(0.5 + Math.random() * 0.5);
      spd.push(0.5 + Math.random() * 1.5);
    }

    return [pos, col, ph, fac, spd];
  }, [count, minRadius, maxRadius]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geom.setAttribute("phase", new THREE.Float32BufferAttribute(phases, 1));
    geom.setAttribute("factor", new THREE.Float32BufferAttribute(factors, 1));
    geom.setAttribute("speed", new THREE.Float32BufferAttribute(speeds, 1));
    return geom;
  }, [positions, colors, phases, factors, speeds]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        attribute float phase;
        attribute float factor;
        attribute float speed;
        varying vec3 vColor;
        uniform float time;
        void main() {
          float twinkle = abs(sin(time * speed + phase)) * factor;
          vColor = color * (0.8 + 0.2 * sin(time * 1.5 * speed + phase));
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (0.2 + twinkle) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if(d > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (material && material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  useEffect(() => {
    return () => {
      geometry?.dispose?.();
      material?.dispose?.();
    };
  }, [geometry, material]);

  return <points ref={pointsRef} geometry={geometry} material={material} raycast={() => null} />;
}

// --- Rotating globe ---
function RotatingEarth({ setHoveredMarker, setSelectedMarker }) {
  const globeRef = useRef();
  const globeRadius = 2;

  useFrame(() => {
    if (globeRef.current) globeRef.current.rotation.y += 0.002;
  });

  const markerPositions = [
    { name: "Lahore, Pakistan is my belove country", raw: [2.1, 1.9, 0.2], rotation: [-Math.PI / 2.15, 0.83, 1] },
    { name: "Beijing, China is our great friend", raw: [1.8, 1.9, -1], rotation: [-Math.PI / 1.52, Math.PI / 4.6, 2] },
    { name: "Dhaka, Bangladesh is our long lost brother", raw: [1.8, 0.8, 0], rotation: [-Math.PI / 2, Math.PI / 2.7, Math.PI / 8] },
    { name: "Istanbul, Turkey is my travel destination", raw: [1.5, 2.6, 2.6], rotation: [-Math.PI / 4.1, Math.PI / 8, 4] },
    { name: "Tehran, Iran is our good neighbour", raw: [1.5, 1.3, 1.1], rotation: [-Math.PI / 3.6, 0.73, Math.PI / 2] },
    { name: "Moscow, Russia is a good allie", raw: [1.5, 3.2, 1.1], rotation: [-Math.PI / 2.55, Math.PI / 7.5, -Math.PI / 8] },
    { name: "Jerusalem, Palestine is our beloved holy land", raw: [1.2, 1.3, 1.7], rotation: [-Math.PI / 4.8, Math.PI / 6, -Math.PI / 1] },
    { name: "Riyadh, KSA is my dream destination", raw: [1.2, 0.7, 1.3], rotation: [-Math.PI / 6.5, 0.7, -Math.PI / 6] },
    { name: "Doha, Qatar is nuetral", raw: [1.2, 0.75, 0.93], rotation: [-Math.PI / 4.5, Math.PI / 4, Math.PI / 6] },
  ];

  const markers = markerPositions.map((marker) => {
    const vec = new THREE.Vector3(...marker.raw).normalize().multiplyScalar(globeRadius + 0.55);
    return { ...marker, position: [vec.x, vec.y, vec.z] };
  });

  const linePoints = [];
  for (let i = 0; i < markers.length; i++) {
    for (let j = i + 1; j < markers.length; j++) {
      linePoints.push(new THREE.Vector3(...markers[i].position));
      linePoints.push(new THREE.Vector3(...markers[j].position));
    }
  }

  return (
    <group ref={globeRef}>
      <EarthModel scale={0.05} />
      <lineSegments>
        <bufferGeometry attach="geometry" setFromPoints={linePoints} />
        <lineBasicMaterial color="cyan" transparent opacity={0.4} />
      </lineSegments>

      {markers.map((marker, idx) => {
        const markerRef = useRef();
        return (
          <FlatMarker
            key={idx}
            ref={markerRef}
            position={marker.position}
            size={0.08}
            rotation={marker.rotation}
            color="red"
            onClick={() => setSelectedMarker({ ...marker, ref: markerRef })}
            onHover={(hovering) =>
              setHoveredMarker(hovering ? { ...marker, ref: markerRef } : null)
            }
          />
        );
      })}
    </group>
  );
}

// --- Main Viewer ---
export default function ThreeDViewer() {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [hoveredScreenPos, setHoveredScreenPos] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedScreenPos, setSelectedScreenPos] = useState(null);

  return (
    <div className="w-full h-[500px] bg-black relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <TwinklingStars count={10000} minRadius={90} maxRadius={100} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <RotatingEarth setHoveredMarker={setHoveredMarker} setSelectedMarker={setSelectedMarker} />
          {hoveredMarker && (
            <MarkerProjectionHelper markerRef={hoveredMarker.ref} onProject={setHoveredScreenPos} />
          )}
          {selectedMarker && (
            <MarkerProjectionHelper markerRef={selectedMarker.ref} onProject={setSelectedScreenPos} />
          )}
          <OrbitControls enableZoom={true} zoomSpeed={0} />
        </Suspense>
      </Canvas>

      {/* Hover popup */}
      {hoveredMarker && hoveredScreenPos && (
        <div
          className="absolute bg-white text-black text-xs px-2 py-1 rounded pointer-events-none"
          style={{
            top: hoveredScreenPos.y,
            left: hoveredScreenPos.x,
            transform: "translate(-50%, -100%)",
          }}
        >
          {hoveredMarker.name}
        </div>
      )}

      {/* Click popup */}
      {selectedMarker && selectedScreenPos && (
        <div
          className="absolute bg-white p-2 rounded  shadow-lg z-50"
          style={{
            top: selectedScreenPos.y,
            left: selectedScreenPos.x,
            transform: "translate(-50%, -100%)",
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
