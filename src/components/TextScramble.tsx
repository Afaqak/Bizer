"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  hoverColor?: string;
}

// Pre-compute characters to cycle through
const SCRAMBLE_CHARS =
  "!<>-_\\/[]{}—=+*^?#________¡€£¥฿§¢₩¤₺₽₹₱₦₴$₿₸₼✓♠♣♥♦♪♫♬♭♮♯";

// Use a less intensive scramble effect for better performance
const TextScramble = memo(
  ({ text, className = "", hoverColor = "#4AFA4A" }: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const iterationRef = useRef(0);
    const isActiveRef = useRef(false);

    // Throttle the effect to reduce CPU usage
    const scrambleText = useCallback(() => {
      if (!isActiveRef.current) return;

      setDisplayText((prev) => {
        return prev
          .split("")
          .map((char, idx) => {
            // If iteration is greater than idx * 1.5, return the original character
            if (iterationRef.current > idx * 1.5) return text[idx];
            // Otherwise return a random character from the chars string
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("");
      });

      iterationRef.current += 1 / 3;

      if (iterationRef.current >= 10) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
        isActiveRef.current = false;
      }
    }, [text]);

    // Handle hover state changes
    const handleMouseEnter = useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsHovering(true);
      iterationRef.current = 0;
      isActiveRef.current = true;

      // Use a slightly longer interval for better performance
      intervalRef.current = setInterval(scrambleText, 40);
    }, [scrambleText]);

    const handleMouseLeave = useCallback(() => {
      setIsHovering(false);
      isActiveRef.current = false;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setDisplayText(text);
    }, [text]);

    // Update display text when text prop changes
    useEffect(() => {
      if (!isHovering) {
        setDisplayText(text);
      }
    }, [text, isHovering]);

    // Clean up on unmount
    useEffect(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, []);

    // Create class string using template literals for proper interpolation
    const classString = `inline-block cursor-default hover:text-[${hoverColor}] transition-colors ${className}`;

    return (
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classString}
      >
        {displayText}
      </span>
    );
  }
);

TextScramble.displayName = "TextScramble";

export default TextScramble;
