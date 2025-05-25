
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CyberParticles = () => {
  const ref = useRef<any>();
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      const color = new THREE.Color();
      color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere[0]} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

interface EnhancedBackgroundAnimationProps {
  type?: 'particles' | 'matrix' | 'cyber' | 'neural';
  className?: string;
}

const EnhancedBackgroundAnimation: React.FC<EnhancedBackgroundAnimationProps> = ({ 
  type = 'particles', 
  className = '' 
}) => {
  if (type === 'particles') {
    return (
      <div className={`absolute inset-0 -z-10 ${className}`}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <CyberParticles />
        </Canvas>
      </div>
    );
  }

  return <div className={`absolute inset-0 -z-10 ${className}`} />;
};

export default EnhancedBackgroundAnimation;
