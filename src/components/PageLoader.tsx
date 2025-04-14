"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
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
    // Language rotation effect - faster speed (600ms)
    const langInterval = setInterval(() => {
      setCurrentLangIndex((prevIndex) =>
        prevIndex === greetings.length - 1 ? 0 : prevIndex + 1
      );
    }, 150);

    // Hide loader after content is presumably loaded
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearInterval(langInterval);
      clearTimeout(timeout);
    };
  }, []);

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
              //   initial={{ opacity: 0 }}
              //   animate={{ opacity: 1, y: 0, scale: 1 }}
              //   exit={{ opacity: 0 }}
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
              //   initial={{ opacity: 0, scale: 0.8 }}
              //   animate={{ opacity: 1, scale: 1 }}
              //   exit={{ opacity: 0, scale: 0.8 }}
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
