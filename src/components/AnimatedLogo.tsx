
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';

const CyberLogo3D = () => {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        font="/fonts/inter-bold.woff"
        fontSize={1.5}
        color="#9b87f5"
        anchorX="center"
        anchorY="middle"
      >
        CWM
      </Text>
    </Float>
  );
};

const AnimatedLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <CyberLogo3D />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default AnimatedLogo;
