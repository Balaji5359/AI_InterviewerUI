import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Avatar = ({ isSpeaking, emotion, position = [0, 0, 0] }) => {
  const group = useRef();
  const headRef = useRef();
  const eyesRef = useRef();
  const jawRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  
  const blinkTimer = useRef(0);
  const speakTimer = useRef(0);
  const idleTimer = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Idle animation
    idleTimer.current += delta;
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(idleTimer.current * 0.5) * 0.08;
      headRef.current.rotation.x = Math.sin(idleTimer.current * 0.3) * 0.03;
    }

    // Arm gestures during speaking
    if (isSpeaking) {
      speakTimer.current += delta * 3;
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0.3 + Math.sin(speakTimer.current) * 0.2;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.3 + Math.sin(speakTimer.current + 1) * 0.15;
      }
      if (jawRef.current) {
        jawRef.current.scale.y = 1 + Math.sin(speakTimer.current * 4) * 0.1;
      }
    } else {
      if (leftArmRef.current) leftArmRef.current.rotation.z = 0.3;
      if (rightArmRef.current) rightArmRef.current.rotation.z = -0.3;
      if (jawRef.current) jawRef.current.scale.y = 1;
    }

    // Blinking
    blinkTimer.current += delta;
    if (blinkTimer.current > 3 + Math.random() * 2) {
      if (eyesRef.current) {
        eyesRef.current.children.forEach(eye => {
          eye.scale.y = 0.1;
          setTimeout(() => { if (eye.scale) eye.scale.y = 1; }, 150);
        });
      }
      blinkTimer.current = 0;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Torso */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.6, 1.2, 0.3]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.2]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.0, -0.05]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>

      {/* Eyes */}
      <group ref={eyesRef}>
        <mesh position={[-0.07, 0.85, 0.18]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.07, 0.85, 0.18]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[-0.07, 0.85, 0.2]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0.07, 0.85, 0.2]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      {/* Nose */}
      <mesh position={[0, 0.8, 0.2]}>
        <coneGeometry args={[0.02, 0.06, 8]} />
        <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
      </mesh>

      {/* Mouth/Jaw */}
      <mesh ref={jawRef} position={[0, 0.72, 0.18]}>
        <sphereGeometry args={[0.04, 16, 8]} />
        <meshStandardMaterial color="#d4756b" roughness={0.6} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef}>
        <mesh position={[-0.35, 0.1, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.04, 0.05, 0.6]} />
          <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
        </mesh>
        <mesh position={[-0.55, -0.25, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.035, 0.04, 0.5]} />
          <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef}>
        <mesh position={[0.35, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.04, 0.05, 0.6]} />
          <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
        </mesh>
        <mesh position={[0.55, -0.25, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.035, 0.04, 0.5]} />
          <meshStandardMaterial color="#f4c2a1" roughness={0.8} />
        </mesh>
      </group>

      {/* Shirt */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.65, 1.25, 0.32]} />
        <meshStandardMaterial color="#2c5aa0" roughness={0.7} />
      </mesh>
    </group>
  );
};

export default Avatar;