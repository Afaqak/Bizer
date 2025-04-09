"use client";

import { useState, useRef, useEffect } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  hoverColor?: string;
}

const TextScramble = ({ text, className = "", hoverColor = "#4AFA4A" }: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Characters to cycle through
  const chars = '!<>-_\\/[]{}—=+*^?#________¡€£¥฿§¢₩¤₺₽₹₱₦₴$₿₸₼✓♠♣♥♦♪♫♬♭♮♯';
  
  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    let iteration = 0;
    const maxIterations = 10; // How many iterations before resolving
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => {
        return prev
          .split('')
          .map((char, idx) => {
            // If iteration is greater than idx * 1.5, return the original character
            if (iteration > idx * 1.5) return text[idx];
            // Otherwise return a random character from the chars string
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });
      
      iteration += 1 / 3;
      
      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, text]);

  return (
    <span 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`inline-block cursor-default hover:text-[${hoverColor}] transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
};

export default TextScramble; 