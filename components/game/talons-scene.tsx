'use client';

import { Float, Line, Stars } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '@/components/game/store';
import { units } from '@/lib/talons-data';
import { clampWorld, formatSpeed, getGroundHeight } from '@/lib/world';

type KeyMap = Record<string, boolean>;

function useKeyboard() {
  const keys = useRef<KeyMap>({});
  const setUnit = useGameStore((state) => state.setUnit);
  const resetRun = useGameStore((state) => state.resetRun);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = true;
      if (/^[1-8]$/.test(event.key)) {
        const unit = units[Number(event.key) - 1];
        if (unit) setUnit(unit.id);
      }
      if (event.key.toLowerCase() === 'r') {
        resetRun();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [resetRun, setUnit]);

  return keys;
}

const neonMaterial = new THREE.MeshStandardMaterial({
  color: '#69f3ff',
  emissive: '#1dcbe0',
  emissiveIntensity: 1.5,
  toneMapped: false,
});

const orangeMaterial = new THREE.MeshStandardMaterial({
  color: '#ffb76b',
  emissive: '#ff9a3d',
  emissiveIntensity: 1.2,
  toneMapped: false,
});

function CityBlocks() {
  const towers = useMemo(
    () => [
      [-34, 7, -34, 8, 16, 8],
      [-24, 6, -22, 10, 14, 10],
      [-10, 9, -34, 9, 20, 9],
      [6, 6, -18, 10, 12, 10],
      [26, 9, -8, 9, 18, 9],
      [34, 7, -32, 8, 16, 8],
    ],
    [],
  );

  const containers = useMemo(
    () => [
      [-44, 1.5, 34, '#ff8f7a'],
      [-40, 1.5, 34, '#69f3ff'],
      [-36, 1.5, 34, '#8ba1ff'],
      [-44, 1.5, 40, '#7fd4c3'],
      [-40, 1.5, 40, '#ffd166'],
      [-36, 1.5, 40, '#ff8f7a'],
      [-30, 1.5, 46, '#69f3ff'],
      [-26, 1.5, 46, '#ffd166'],
    ],
    [],
  );

  const lights = useMemo(
    () => [-40, -28, -16, -4, 8, 20, 32, 44],
    [],
  );

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -0.02, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#0a1722" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, -10]} receiveShadow>
        <planeGeometry args={[82, 72]} />
        <meshStandardMaterial color="#152838" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[-28, 0.02, 40]} receiveShadow>
        <planeGeometry args={[54, 34]} />
        <meshStandardMaterial color="#152231" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[34, 0.02, 38]} receiveShadow>
        <planeGeometry args={[48, 40]} />
        <meshStandardMaterial color="#2c241c" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[27, 2.02, -40]} receiveShadow>
        <planeGeometry args={[32, 28]} />
        <meshStandardMaterial color="#132131" />
      </mesh>

      <RoadStrip position={[0, 0.03, -2]} size={[98, 10]} />
      <RoadStrip position={[-22, 0.031, 26]} size={[10, 66]} />
      <RoadStrip position={[26, 0.031, 18]} size={[10, 84]} />
      <RoadStrip position={[34, 0.031, 34]} size={[48, 10]} />
      <RoadStrip position={[27, 2.03, -40]} size={[26, 10]} />
      <RoadStrip position={[-11.5, 1.5, 15]} size={[13, 4]} />
      <RoadStrip position={[26, 1.5, 15]} size={[16, 4]} />

      <mesh position={[7, 3.35, 10]} castShadow receiveShadow>
        <boxGeometry args={[24, 0.6, 8]} />
        <meshStandardMaterial color="#334e64" />
      </mesh>

      <mesh position={[-11.5, 1.25, 15]} rotation-x={-0.22} castShadow receiveShadow>
        <boxGeometry args={[13, 0.4, 6]} />
        <meshStandardMaterial color="#2f4659" />
      </mesh>
      <mesh position={[26, 1.25, 15]} rotation-x={0.22} castShadow receiveShadow>
        <boxGeometry args={[16, 0.4, 6]} />
        <meshStandardMaterial color="#2f4659" />
      </mesh>

      <mesh position={[27, 1.25, -40]} castShadow receiveShadow>
        <boxGeometry args={[36, 0.6, 30]} />
        <meshStandardMaterial color="#18293d" />
      </mesh>
      <mesh position={[27, 5, -53]} castShadow receiveShadow>
        <boxGeometry args={[34, 4, 1]} />
        <meshStandardMaterial color="#314a61" />
      </mesh>
      <mesh position={[27, 5, -27]} castShadow receiveShadow>
        <boxGeometry args={[34, 4, 1]} />
        <meshStandardMaterial color="#314a61" />
      </mesh>
      <mesh position={[10, 5, -40]} castShadow receiveShadow>
        <boxGeometry args={[1, 4, 28]} />
        <meshStandardMaterial color="#314a61" />
      </mesh>
      <mesh position={[44, 5, -40]} castShadow receiveShadow>
        <boxGeometry args={[1, 4, 28]} />
        <meshStandardMaterial color="#314a61" />
      </mesh>

      {towers.map(([x, y, z, w, h, d], index) => (
        <group key={`${x}-${z}`}>
          <mesh position={[x, y, z]} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={index % 2 === 0 ? '#22384d' : '#1a2c3d'} />
          </mesh>
          <mesh position={[x, y + h / 2 + 0.2, z]}>
            <boxGeometry args={[w * 0.92, 0.2, d * 0.92]} />
            <primitive object={neonMaterial} attach="material" />
          </mesh>
        </group>
      ))}

      {containers.map(([x, y, z, color]) => (
        <mesh key={`${x}-${z}`} position={[x as number, y as number, z as number]} castShadow receiveShadow>
          <boxGeometry args={[3, 3, 5]} />
          <meshStandardMaterial color={color as string} />
        </mesh>
      ))}

      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.45} position={[27, 6.5, -40]}>
        <mesh>
          <boxGeometry args={[10, 1, 0.18]} />
          <primitive object={neonMaterial} attach="material" />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.45} position={[-41, 7, 40]}>
        <mesh>
          <boxGeometry args={[7, 0.8, 0.18]} />
          <meshStandardMaterial color="#ff8f7a" emissive="#ff8f7a" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </Float>
      <Float speed={1.15} rotationIntensity={0.06} floatIntensity={0.35} position={[34, 5.5, 35]}>
        <mesh>
          <boxGeometry args={[8, 0.8, 0.18]} />
          <meshStandardMaterial color="#f6a15a" emissive="#f6a15a" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </Float>

      {lights.map((x) => (
        <group key={x} position={[x, 0, -2]}>
          <mesh position={[0, 2.8, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 5.6, 10]} />
            <meshStandardMaterial color="#213748" metalness={0.25} roughness={0.4} />
          </mesh>
          <mesh position={[0, 5.8, 0]}>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <primitive object={neonMaterial} attach="material" />
          </mesh>
          <pointLight position={[0, 5.6, 0]} color="#69f3ff" intensity={5} distance={9} decay={2} />
        </group>
      ))}
    </group>
  );
}

function RoadStrip({ position, size }: { position: [number, number, number]; size: [number, number] }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={position} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#2b3641" />
    </mesh>
  );
}

function NeonGuideLines() {
  return (
    <group>
      <Line points={[[-48, 0.05, -2], [48, 0.05, -2]]} color="#6cf5ff" lineWidth={1.1} dashed dashScale={6} />
      <Line points={[[-22, 0.05, -6], [-22, 0.05, 56]]} color="#6cf5ff" lineWidth={1.1} dashed dashScale={6} />
      <Line points={[[26, 0.05, -6], [26, 0.05, 56]]} color="#ffb76b" lineWidth={1.1} dashed dashScale={6} />
      <Line points={[[10, 3.5, 10], [20, 3.5, 10]]} color="#ffb76b" lineWidth={1.6} />
    </group>
  );
}

function MechModel({ unitId, color, accent, speed }: { unitId: string; color: string; accent: string; speed: number }) {
  const bodyColor = new THREE.Color(color);
  const accentColor = new THREE.Color(accent);
  const swing = Math.sin(speed * 3.4) * Math.min(0.5, Math.abs(speed) * 0.035);
  const pulseScale = 1 + Math.sin(speed * 2 + 0.5) * 0.03;

  const shoulderScale = unitId === 'vanguard' ? 1.45 : unitId === 'forge' ? 1.32 : 1.15;
  const torsoScale = unitId === 'pulse' ? [1.35, 1.7, 0.95] : unitId === 'forge' ? [1.75, 2.0, 1.2] : [1.65, 2.1, 1.15];

  return (
    <group>
      <mesh position={[0, 3.9, 0]} castShadow>
        <sphereGeometry args={[0.42, 18, 18]} />
        <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, 0.12)} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 2.65, 0]} castShadow scale={torsoScale as [number, number, number]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color={bodyColor} metalness={0.18} roughness={0.55} />
      </mesh>
      <mesh position={[0, 2.65, 0.66 * pulseScale]} scale={[0.34, 1.1, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <group position={[0, 2.95, 0]}>
        <mesh position={[-1.05 * shoulderScale, 0, 0]} castShadow scale={[0.7, 0.8, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, 0.08)} />
        </mesh>
        <mesh position={[1.05 * shoulderScale, 0, 0]} castShadow scale={[0.7, 0.8, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, 0.08)} />
        </mesh>
      </group>
      <group position={[-1.25 * shoulderScale, 2.45, 0]} rotation-z={0.14 + swing * 0.6}>
        <mesh position={[0, -0.78, 0]} castShadow>
          <boxGeometry args={[0.4, 1.55, 0.42]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.05)} />
        </mesh>
        <mesh position={[0, -1.8, 0]} castShadow>
          <boxGeometry args={[0.34, 0.85, 0.36]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.12)} />
        </mesh>
      </group>
      <group position={[1.25 * shoulderScale, 2.45, 0]} rotation-z={-0.14 - swing * 0.6}>
        <mesh position={[0, -0.78, 0]} castShadow>
          <boxGeometry args={[0.4, 1.55, 0.42]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.05)} />
        </mesh>
        <mesh position={[0, -1.8, 0]} castShadow>
          <boxGeometry args={[0.34, 0.85, 0.36]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.12)} />
        </mesh>
      </group>
      <group position={[-0.52, 1.4, 0]} rotation-x={swing * 0.9}>
        <mesh position={[0, -0.85, 0]} castShadow>
          <boxGeometry args={[0.55, 1.8, 0.58]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.08)} />
        </mesh>
        <mesh position={[0, -1.95, 0.08]} castShadow>
          <boxGeometry args={[0.6, 0.62, 0.95]} />
          <meshStandardMaterial color={accentColor.clone().offsetHSL(0, 0, -0.08)} />
        </mesh>
      </group>
      <group position={[0.52, 1.4, 0]} rotation-x={-swing * 0.9}>
        <mesh position={[0, -0.85, 0]} castShadow>
          <boxGeometry args={[0.55, 1.8, 0.58]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.08)} />
        </mesh>
        <mesh position={[0, -1.95, 0.08]} castShadow>
          <boxGeometry args={[0.6, 0.62, 0.95]} />
          <meshStandardMaterial color={accentColor.clone().offsetHSL(0, 0, -0.08)} />
        </mesh>
      </group>
    </group>
  );
}

function VehicleModel({ unitId, color, accent, speed }: { unitId: string; color: string; accent: string; speed: number }) {
  const bodyColor = new THREE.Color(color);
  const accentColor = new THREE.Color(accent);
  const wheelSpin = speed * 3.5;
  const isTruck = unitId === 'iron-hauler';
  const isOffRoad = unitId === 'dust-runner';
  const bodyLength = isTruck ? 4.8 : isOffRoad ? 3.8 : 3.4;
  const bodyWidth = isTruck ? 2.2 : isOffRoad ? 1.9 : 1.75;
  const cabinHeight = isTruck ? 1.45 : 1.15;

  return (
    <group>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[bodyWidth, 0.9, bodyLength]} />
        <meshStandardMaterial color={bodyColor} metalness={0.22} roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.7, isTruck ? -0.55 : -0.25]} castShadow>
        <boxGeometry args={[bodyWidth * (isTruck ? 0.78 : 0.72), cabinHeight, bodyLength * (isTruck ? 0.42 : 0.46)]} />
        <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, 0.08)} metalness={0.25} roughness={0.42} />
      </mesh>
      <mesh position={[0, 1.58, 0.82]}>
        <boxGeometry args={[bodyWidth * 0.86, 0.12, bodyLength * 0.18]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.15} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.45, -1.18]}>
        <boxGeometry args={[bodyWidth * 0.7, 0.1, 0.22]} />
        <primitive object={orangeMaterial} attach="material" />
      </mesh>
      {[
        [-bodyWidth / 2 + 0.24, 0.55, -bodyLength / 2 + 0.62],
        [bodyWidth / 2 - 0.24, 0.55, -bodyLength / 2 + 0.62],
        [-bodyWidth / 2 + 0.24, 0.55, bodyLength / 2 - 0.62],
        [bodyWidth / 2 - 0.24, 0.55, bodyLength / 2 - 0.62],
      ].map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]} rotation-z={wheelSpin}>
          <mesh castShadow rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[isOffRoad ? 0.42 : 0.35, isOffRoad ? 0.42 : 0.35, isTruck ? 0.42 : 0.3, 18]} />
            <meshStandardMaterial color="#0b1015" roughness={0.85} />
          </mesh>
          <mesh rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.15, 0.15, (isTruck ? 0.44 : 0.32) + 0.02, 18]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.75} />
          </mesh>
        </group>
      ))}
      {isTruck ? (
        <mesh position={[0, 1.05, 1.8]} castShadow>
          <boxGeometry args={[1.9, 0.75, 1.65]} />
          <meshStandardMaterial color={bodyColor.clone().offsetHSL(0, 0, -0.04)} />
        </mesh>
      ) : null}
    </group>
  );
}

function UnitController() {
  const group = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const { camera } = useThree();
  const activeUnitId = useGameStore((state) => state.activeUnitId);
  const storePosition = useGameStore((state) => state.position);
  const storeHeading = useGameStore((state) => state.heading);
  const setMotion = useGameStore((state) => state.setMotion);
  const registerZone = useGameStore((state) => state.registerZone);
  const markBridgeCrossed = useGameStore((state) => state.markBridgeCrossed);
  const setVelocityBadge = useGameStore((state) => state.setVelocityBadge);

  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const position = useRef(new THREE.Vector3(storePosition.x, storePosition.y, storePosition.z));
  const heading = useRef(storeHeading);
  const velocity = useRef(0);

  useEffect(() => {
    position.current.set(storePosition.x, getGroundHeight(storePosition.x, storePosition.z) + (activeUnit.mode === 'mech' ? 0.1 : 0.4), storePosition.z);
    heading.current = storeHeading;
    velocity.current = 0;
  }, [activeUnit.mode, storeHeading, storePosition.x, storePosition.z]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const forward = (keys.current.w ? 1 : 0) - (keys.current.s ? 1 : 0);
    const turn = (keys.current.a ? 1 : 0) - (keys.current.d ? 1 : 0);
    const boost = keys.current.shift ? 1 : 0;

    const maxForward = activeUnit.mode === 'vehicle' ? 10 + activeUnit.speed * 0.1 : 5 + activeUnit.speed * 0.055;
    const maxReverse = activeUnit.mode === 'vehicle' ? 5.8 : 3.2;
    const targetSpeed =
      forward === 0
        ? 0
        : forward > 0
          ? maxForward * (boost && activeUnit.mode === 'mech' ? 1.35 : boost && activeUnit.mode === 'vehicle' ? 1.1 : 1)
          : -maxReverse;

    const accel = activeUnit.mode === 'vehicle' ? 17 : 14;
    velocity.current = THREE.MathUtils.lerp(velocity.current, targetSpeed, 1 - Math.exp(-accel * dt));
    if (forward === 0) {
      velocity.current = THREE.MathUtils.lerp(velocity.current, 0, 1 - Math.exp(-(activeUnit.mode === 'vehicle' ? 8 : 12) * dt));
    }

    const turnScale = activeUnit.mode === 'vehicle' ? THREE.MathUtils.clamp(0.45 + Math.abs(velocity.current) / 15, 0.45, 1.2) : 1.6;
    heading.current += -turn * dt * turnScale;

    position.current.x += Math.sin(heading.current) * velocity.current * dt;
    position.current.z += Math.cos(heading.current) * velocity.current * dt;
    position.current.x = clampWorld(position.current.x);
    position.current.z = clampWorld(position.current.z);
    position.current.y = getGroundHeight(position.current.x, position.current.z) + (activeUnit.mode === 'mech' ? 0.15 : 0.42);

    if (group.current) {
      group.current.position.copy(position.current);
      group.current.rotation.y = heading.current;
    }

    const lookHeight = activeUnit.mode === 'mech' ? 3.2 : 1.8;
    const distance = activeUnit.mode === 'mech' ? 8.5 : 10.5;
    const camTarget = new THREE.Vector3(
      position.current.x - Math.sin(heading.current) * distance,
      position.current.y + (activeUnit.mode === 'mech' ? 5.2 : 4.1) + Math.min(Math.abs(velocity.current) * 0.06, 1.6),
      position.current.z - Math.cos(heading.current) * distance,
    );
    camera.position.lerp(camTarget, 1 - Math.exp(-5 * dt));
    camera.lookAt(position.current.x, position.current.y + lookHeight, position.current.z);

    const payload = { x: position.current.x, y: position.current.y, z: position.current.z };
    setMotion({ position: payload, heading: heading.current, speed: velocity.current });
    registerZone(payload);

    if (position.current.z > 8 && position.current.z < 14 && position.current.x > -3 && position.current.x < 17) {
      markBridgeCrossed();
    }
    if (activeUnit.mode === 'vehicle') {
      setVelocityBadge(formatSpeed(velocity.current) >= 180);
    }
  });

  return (
    <group ref={group}>
      {activeUnit.mode === 'mech' ? (
        <MechModel unitId={activeUnit.id} color={activeUnit.color} accent={activeUnit.accent} speed={velocity.current} />
      ) : (
        <VehicleModel unitId={activeUnit.id} color={activeUnit.color} accent={activeUnit.accent} speed={velocity.current} />
      )}
      <pointLight position={[0, 4.4, 1.4]} color={activeUnit.accent} intensity={12} distance={8} decay={2} />
    </group>
  );
}

const MemoWorld = memo(CityBlocks);

export function TalonsScene() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[18, 30, 12]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <pointLight position={[-18, 9, -24]} intensity={26} color="#69f3ff" distance={28} decay={2} />
      <pointLight position={[30, 8, 30]} intensity={20} color="#ff9a3d" distance={26} decay={2} />
      <Stars radius={120} depth={60} count={1400} factor={3} saturation={0} fade speed={0.5} />
      <MemoWorld />
      <NeonGuideLines />
      <UnitController />
    </>
  );
}
