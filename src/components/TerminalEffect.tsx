
import React, { useState, useEffect } from 'react';

interface TerminalEffectProps {
  text: string;
  speed?: number;
  className?: string;
}

const TerminalEffect: React.FC<TerminalEffectProps> = ({ 
  text, 
  speed = 50,
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={`terminal-text ${className}`}>
      {displayedText}
      <span className={`inline-block w-2 h-5 bg-cyber-purple2 ml-1 ${isComplete ? 'animate-terminal-cursor' : 'opacity-100'}`}></span>
    </div>
  );
};

export default TerminalEffect;
