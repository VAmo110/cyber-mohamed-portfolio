
import React, { useState, useEffect, useRef } from 'react';

interface TerminalEffectProps {
  text: string;
  speed?: number;
  className?: string;
  blinkCursor?: boolean;
  typingDelay?: number;
  eraseEffect?: boolean;
  cursorColor?: string;
  onComplete?: () => void;
}

const TerminalEffect: React.FC<TerminalEffectProps> = ({ 
  text, 
  speed = 50,
  className = "",
  blinkCursor = true,
  typingDelay = 0,
  eraseEffect = false,
  cursorColor = "bg-cyber-purple2",
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Process special characters like pause and erase
  const processSpecialChars = (text: string) => {
    // Handle pause with {p:1000} syntax (pause for 1000ms)
    if (text.substring(currentIndex).startsWith('{p:')) {
      const endBrace = text.indexOf('}', currentIndex);
      if (endBrace !== -1) {
        const pauseTime = parseInt(text.substring(currentIndex + 3, endBrace), 10);
        setIsPaused(true);
        
        // Skip the pause command in the output
        const nextIndex = endBrace + 1;
        setCurrentIndex(nextIndex);
        
        // Resume after pause
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
        }, pauseTime);
        
        return true;
      }
    }
    
    return false;
  };

  useEffect(() => {
    if (typingDelay > 0 && currentIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(1);
      }, typingDelay);
      return;
    }
    
    if (isPaused) return;
    
    if (!isErasing && currentIndex < text.length) {
      // Check for special characters
      if (processSpecialChars(text)) return;
      
      timeoutRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } 
    else if (!isErasing && currentIndex >= text.length) {
      setIsComplete(true);
      if (eraseEffect) {
        timeoutRef.current = setTimeout(() => {
          setIsErasing(true);
          setCurrentIndex(text.length - 1);
        }, 2000);
      } else if (onComplete) {
        onComplete();
      }
    }
    else if (isErasing && currentIndex >= 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 2);
    }
    else if (isErasing && currentIndex < 0) {
      setIsErasing(false);
      setCurrentIndex(0);
      setDisplayedText('');
      setIsComplete(false);
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, text, speed, isComplete, isErasing, isPaused, eraseEffect, typingDelay, onComplete]);

  return (
    <div className={`terminal-text ${className}`}>
      <span className="text-white whitespace-pre-wrap">{displayedText}</span>
      <span 
        className={`inline-block w-2 h-5 ml-1 ${cursorColor} ${
          blinkCursor && isComplete ? 'animate-terminal-cursor' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default TerminalEffect;
