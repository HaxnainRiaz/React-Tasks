"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useMemo } from "react";
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
function FlatMarker({ position, color = "red", size = 0.08, rotation = [-Math.PI / 2, 0, 0], onClick, onHover }) {
  const pulseRef = useRef();

  useFrame((state) => {
    if (pulseRef.current) {
      const t = state.clock.elapsedTime;
      const pulseScale = 1 + 0.25 * Math.sin(t * 2);
      pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      pulseRef.current.material.opacity = 0.4 * (1 - Math.abs(Math.sin(t * 2)));
    }
  });

  return (
    <group position={position} rotation={rotation} onClick={onClick} onPointerOver={onHover} onPointerOut={() => onHover(null)}>
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
}

// --- Projection helper ---
function MarkerProjectionHelper({ marker, onProject }) {
  const { camera, gl } = useThree();
  const vec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (marker?.position) {
      vec.current.set(...marker.position);
      vec.current.project(camera); // project to NDC (-1 to 1)

      // convert to pixel coordinates relative to canvas
      const canvasRect = gl.domElement.getBoundingClientRect();
      const x = (vec.current.x * 0.5 + 0.5) * canvasRect.width;
      const y = (-vec.current.y * 0.5 + 0.5) * canvasRect.height;
      onProject({ x, y });
    }
  });

  return null;
}

// --- Twinkling stars ---
function TwinklingStars({ count = 20000, minRadius = 40, maxRadius = 100 }) {
  const pointsRef = useRef();

  const [positions, colors, phases, factors, speeds] = useMemo(() => {
    const pos = [];
    const col = [];
    const ph = [];
    const fac = [];
    const spd = [];

    const colorOptions = [
      new THREE.Color(0xffffff), // white
      new THREE.Color(0xfcf2e3), // soft yellow
      new THREE.Color(0xfae7c0), // yellow-orange
      new THREE.Color(0xfcc2c2), // red-ish
      new THREE.Color(0xdbedff), // bluish
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

      ph.push(Math.random() * Math.PI * 2); // random phase
      fac.push(0.5 + Math.random() * 0.5);  // twinkle intensity factor
      spd.push(0.5 + Math.random() * 1.5);  // speed per star
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

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        uniforms={{ time: { value: 0 } }}
        vertexColors
        transparent
        vertexShader={`
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
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if(d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0);
          }
        `}
      />
    </points>
  );
}

// --- Rotating globe ---
function RotatingEarth({ setHoveredMarker, setSelectedMarker }) {
  const globeRef = useRef();
  const globeRadius = 2;

  useFrame(() => {
    if (globeRef.current) globeRef.current.rotation.y += 0.002;
  });

  const markerPositions = [
    { name: "Lahore, Pakistan", raw: [2.1, 1.9, 0.2], rotation: [-Math.PI / 2.15, 0.83, 1] },
    { name: "Beijing, China", raw: [1.8, 1.9, -1], rotation: [-Math.PI / 1.52, Math.PI / 4.6, 2] },
    { name: "Dhaka, Bangladesh", raw: [1.8, 0.8, 0], rotation: [-Math.PI / 2, Math.PI / 2.7, Math.PI / 8] },
    { name: "Istanbul, Turkey", raw: [1.5, 2.6, 2.6], rotation: [-Math.PI / 4.1, Math.PI / 8, 4] },
    { name: "Tehran, Iran", raw: [1.5, 1.3, 1.1], rotation: [-Math.PI / 3.6, 0.73, Math.PI / 2] },
    { name: "Moscow, Russia", raw: [1.5, 3.2, 1.1], rotation: [-Math.PI / 2.55, Math.PI / 7.5, -Math.PI / 8] },
    { name: "Jerusalem, Palestine", raw: [1.2, 1.3, 1.7], rotation: [-Math.PI / 4.8, Math.PI / 6, -Math.PI / 1] },
    { name: "Riyadh, KSA", raw: [1.2, 0.7, 1.3], rotation: [-Math.PI / 6.5, 0.7, -Math.PI / 6] },
    { name: "Doha, Qatar", raw: [1.2, 0.75, 0.93], rotation: [-Math.PI / 4.5, Math.PI / 4, Math.PI / 6] },
  ];

  const markers = markerPositions.map((marker) => {
    const vec = new THREE.Vector3(...marker.raw).normalize().multiplyScalar(globeRadius + 2.05);
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
      <EarthModel scale={0.08} />
      <lineSegments>
        <bufferGeometry attach="geometry" setFromPoints={linePoints} />
        <lineBasicMaterial color="cyan" transparent opacity={0.4} />
      </lineSegments>

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
          {hoveredMarker && <MarkerProjectionHelper marker={hoveredMarker} onProject={setHoveredScreenPos} />}
          {selectedMarker && <MarkerProjectionHelper marker={selectedMarker} onProject={setSelectedScreenPos} />}
          <OrbitControls enableZoom={true} zoomSpeed={0} /> {/* disable zoom on globe */}
        </Suspense>
      </Canvas>

      {/* Hover popup */}
      {hoveredMarker && hoveredScreenPos && (
        <div
          className="absolute bg-black text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{
            top: hoveredScreenPos.y,
            left: hoveredScreenPos.x,
            transform: "translate(-50%, -100%)"
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
            transform: "translate(-50%, -100%)"
          }}
        >
          <h2 className="font-bold">{selectedMarker.name}</h2>
          <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded" onClick={() => setSelectedMarker(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
