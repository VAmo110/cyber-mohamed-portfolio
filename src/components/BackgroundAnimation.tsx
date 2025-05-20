
import React, { useEffect, useRef } from 'react';

interface BackgroundAnimationProps {
  type?: 'matrix' | 'cyber' | 'particles' | 'grid';
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  color?: string;
  className?: string;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  type = 'cyber',
  opacity = 0.1,
  speed = 'medium',
  color = '#9b87f5',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation speed
    const speedValue = {
      slow: 0.5,
      medium: 1,
      fast: 2,
    };
    
    let animation: number;
    
    // Matrix rain effect
    if (type === 'matrix') {
      const characters = '01'.split('');
      const fontSize = 10;
      const columns = Math.floor(canvas.width / fontSize);
      
      const drops: number[] = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * 100) - 100;
      }
      
      const drawMatrix = () => {
        ctx.fillStyle = `rgba(0, 0, 0, ${1 - opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const text = characters[Math.floor(Math.random() * characters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
        
        animation = requestAnimationFrame(drawMatrix);
      };
      
      drawMatrix();
    }
    
    // Cyber grid effect
    else if (type === 'cyber') {
      const gridSize = 20;
      const gridSpacing = canvas.width / gridSize;
      
      const drawCyberGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = opacity;
        
        const time = performance.now() * 0.001 * speedValue[speed];
        
        // Draw horizontal lines
        for (let i = 0; i <= gridSize; i++) {
          ctx.beginPath();
          const y = i * gridSpacing;
          
          for (let x = 0; x < canvas.width; x += 5) {
            const distFromCenter = Math.abs(x - canvas.width / 2) / canvas.width;
            const wave = Math.sin(x * 0.01 + time) * 5 * distFromCenter;
            
            ctx.lineTo(x, y + wave);
          }
          
          ctx.stroke();
        }
        
        // Draw vertical lines
        for (let i = 0; i <= gridSize; i++) {
          ctx.beginPath();
          const x = i * gridSpacing;
          
          for (let y = 0; y < canvas.height; y += 5) {
            const distFromCenter = Math.abs(y - canvas.height / 2) / canvas.height;
            const wave = Math.sin(y * 0.01 + time) * 5 * distFromCenter;
            
            ctx.lineTo(x + wave, y);
          }
          
          ctx.stroke();
        }
        
        animation = requestAnimationFrame(drawCyberGrid);
      };
      
      drawCyberGrid();
    }
    
    // Particles effect
    else if (type === 'particles') {
      const particleCount = 100;
      const particles: {
        x: number;
        y: number;
        radius: number;
        vx: number;
        vy: number;
      }[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * speedValue[speed],
          vy: (Math.random() - 0.5) * speedValue[speed],
        });
      }
      
      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        
        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw connections
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x;
            const dy = particle.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.lineWidth = 0.3;
              ctx.strokeStyle = color;
              ctx.globalAlpha = (100 - distance) / 1000 * opacity;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        });
        
        animation = requestAnimationFrame(drawParticles);
      };
      
      drawParticles();
    }
    
    // Grid effect
    else if (type === 'grid') {
      const gridSize = 30;
      
      const drawGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = opacity;
        
        const time = performance.now() * 0.0005 * speedValue[speed];
        
        // Draw grid
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        
        // Draw pulsing circles
        for (let x = gridSize; x < canvas.width; x += gridSize * 3) {
          for (let y = gridSize; y < canvas.height; y += gridSize * 3) {
            const sizeOffset = Math.sin(time + x * 0.01 + y * 0.01) * 5 + 5;
            
            ctx.beginPath();
            ctx.arc(x, y, sizeOffset, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.stroke();
          }
        }
        
        animation = requestAnimationFrame(drawGrid);
      };
      
      drawGrid();
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animation);
    };
  }, [type, opacity, speed, color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default BackgroundAnimation;
