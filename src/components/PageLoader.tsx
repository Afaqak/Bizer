"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);

  // Array of greetings in different languages
  const greetings = [
    { text: "Hello", language: "English" },
    { text: "Hola", language: "Spanish" },
    { text: "Bonjour", language: "French" },
    { text: "Ciao", language: "Italian" },
    { text: "Konnichiwa", language: "Japanese" },
    { text: "Nǐ hǎo", language: "Chinese" },
    { text: "Annyeong", language: "Korean" },
    { text: "Hallo", language: "German" },
    { text: "Olá", language: "Portuguese" },
    { text: "Namaste", language: "Hindi" },
    { text: "Merhaba", language: "Turkish" },
    { text: "Salam", language: "Arabic" },
    { text: "Sawatdee", language: "Thai" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    try {
      const hasVisited = localStorage.getItem("hasVisitedSite");
      if (!hasVisited) {
        setLoading(true);
      }
    } catch (e) {
      console.error("Failed to check localStorage:", e);
    }
  }, [isMounted]);

  // Third effect: Handle the animation and language rotation
  useEffect(() => {
    if (!loading || !isMounted) return;

    try {
      // Language rotation effect - faster speed
      const langInterval = setInterval(() => {
        setCurrentLangIndex((prevIndex) =>
          prevIndex === greetings.length - 1 ? 0 : prevIndex + 1
        );
      }, 150);

      // Hide loader after content is presumably loaded and THEN set localStorage
      const timeout = setTimeout(() => {
        setLoading(false);
        // Set the flag in localStorage AFTER animation completes
        localStorage.setItem("hasVisitedSite", "true");
      }, 3000);

      return () => {
        clearInterval(langInterval);
        clearTimeout(timeout);
      };
    } catch (error) {
      // In case of errors, hide the loader
      console.error("Loader error:", error);
      setLoading(false);
    }
  }, [loading, isMounted, greetings.length]);

  // Only render the loader client-side to avoid hydration errors
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              key={currentLangIndex}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 1,
              }}
              className="text-6xl md:text-8xl font-bold text-[#4AFA4A] mb-2"
            >
              {greetings[currentLangIndex].text}
            </motion.div>

            <motion.div
              key={`lang-${currentLangIndex}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
              }}
              className="text-white text-xl md:text-2xl"
            >
              {greetings[currentLangIndex].language}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
