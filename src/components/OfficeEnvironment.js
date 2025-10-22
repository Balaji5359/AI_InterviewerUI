import React from 'react';
import * as THREE from 'three';

const OfficeEnvironment = () => {
  return (
    <group>
      {/* Office Wall */}
      <mesh position={[0, 0, -3]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#e9ecef" roughness={0.9} />
      </mesh>

      {/* Desk */}
      <mesh position={[0, -1.8, -1.5]} castShadow>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.7} />
      </mesh>

      {/* Bookshelf */}
      <mesh position={[-2.5, -0.5, -2.8]} castShadow>
        <boxGeometry args={[0.3, 3, 1]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>

      {/* Books */}
      <mesh position={[-2.4, -0.2, -2.5]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.2]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      <mesh position={[-2.4, -0.2, -2.3]} castShadow>
        <boxGeometry args={[0.05, 0.25, 0.15]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      <mesh position={[-2.4, -0.2, -2.1]} castShadow>
        <boxGeometry args={[0.05, 0.35, 0.18]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>

      {/* Window frame */}
      <mesh position={[2.5, 0.5, -2.9]} castShadow>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      {/* Window glass */}
      <mesh position={[2.5, 0.5, -2.85]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default OfficeEnvironment;