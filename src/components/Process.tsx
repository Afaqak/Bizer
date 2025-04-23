"use client";

import { motion, useInView } from "framer-motion";
import { useRef, memo, useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import TextScramble with no SSR
const TextScramble = dynamic(() => import("./TextScramble"), { ssr: false });

// Move schema outside of component to prevent re-creation on each render
const processSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Our Design & Development Process",
  description: "HackToast's proven process for web design and development",
  step: [
    {
      "@type": "HowToStep",
      name: "Discovery & Strategy",
      position: "1",
      itemListElement: {
        "@type": "HowToDirection",
        text: "We start by understanding your business, goals, and target audience. This phase includes research, competitor analysis, and defining the project scope to ensure a clear direction.",
      },
    },
    {
      "@type": "HowToStep",
      name: "Wireframing & UX Design",
      position: "2",
      itemListElement: {
        "@type": "HowToDirection",
        text: "Before jumping into visuals, we create wireframes to map out the structure and user flow. This ensures an intuitive and seamless experience for visitors.",
      },
    },
    {
      "@type": "HowToStep",
      name: "Visual Design & Branding",
      position: "3",
      itemListElement: {
        "@type": "HowToDirection",
        text: "This is where your website comes to life. Using your brand identity, we design a visually compelling interface with the perfect balance of aesthetics and usability.",
      },
    },
    {
      "@type": "HowToStep",
      name: "Development & Implementation",
      position: "4",
      itemListElement: {
        "@type": "HowToDirection",
        text: "Once the design is approved, we build your website using modern, responsive technologies. We ensure that it's optimized for speed, SEO, and a flawless user experience across all devices.",
      },
    },
  ],
};

// Memoized process step component to prevent unnecessary re-renders
const ProcessStep = memo(
  ({
    step,
    index,
    isInView,
  }: {
    step: { number: string; title: string; description: string };
    index: number;
    isInView: boolean;
  }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.1,
                duration: 0.4,
              },
            }
          : {}
      }
      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start"
    >
      <div className="md:col-span-3 flex items-center md:items-start">
        <div className="flex items-center">
          <h3 className="text-xl md:text-2xl font-bold">
            <span className="text-[#4AFA4A]">{step.number}.</span> {step.title}
          </h3>
        </div>
      </div>
      <motion.div
        className="md:col-span-9 pl-10 md:pl-0"
        whileHover={{ x: 10 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <p className="text-gray-300 text-sm mb-0 max-w-3xl">
          <TextScramble text={step.description} />
        </p>
      </motion.div>
    </motion.div>
  )
);

ProcessStep.displayName = "ProcessStep";

export default function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const processSteps = useMemo(
    () => [
      {
        number: "1",
        title: "Discovery & Strategy",
        description:
          "We start by understanding your business, goals, and target audience. This phase includes research, competitor analysis, and defining the project scope to ensure a clear direction.",
      },
      {
        number: "2",
        title: "Wireframing & UX Design",
        description:
          "Before jumping into visuals, we create wireframes to map out the structure and user flow. This ensures an intuitive and seamless experience for visitors.",
      },
      {
        number: "3",
        title: "Visual Design & Branding",
        description:
          "This is where your website comes to life. Using your brand identity, we design a visually compelling interface with the perfect balance of aesthetics and usability.",
      },
      {
        number: "4",
        title: "Development & Implementation",
        description:
          "Once the design is approved, we build your website using modern, responsive technologies. We ensure that it's optimized for speed, SEO, and a flawless user experience across all devices.",
      },
    ],
    []
  );

  // Sliding text for infinite carousel
  const processTypes = useMemo(
    () => [
      "Discovery",
      "• Strategy",
      "• Wireframing",
      "• UX Design",
      "• Visual Design",
      "• Branding",
      "• Development",
      "• Implementation",
    ],
    []
  );

  return (
    <section className="py-20 md:py-32 bg-black" id="process" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header and infinite slider in one row */}
        <div className="flex flex-col md:flex-row md:items-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.4,
            }}
          >
            <span className="text-[#4AFA4A]">Our</span> Process
          </motion.h2>

          {/* Separator */}
          <hr className="w-full border-t border-zinc-800 my-8 md:hidden" />

          {/* Infinite slider with process types - only render when mounted */}
          {mounted && (
            <div className="relative w-full md:w-1/2 overflow-hidden md:ml-8">
              <div className="absolute left-0 w-12 bg-gradient-to-r from-black to-transparent h-full z-10"></div>
              <div className="absolute right-0 w-12 bg-gradient-to-l from-black to-transparent h-full z-10"></div>

              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear",
                }}
                style={{ willChange: "transform" }}
              >
                {[...processTypes, ...processTypes].map((type, i) => (
                  <span key={i} className="text-sm mr-6 md:mr-8 text-gray-400">
                    <TextScramble text={type} />
                  </span>
                ))}
              </motion.div>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:gap-12 mx-auto">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <motion.a
            href="./#contact"
            className="bg-[#4AFA4A] text-black px-6 py-3 rounded-full font-bold hover:bg-[#3ED63E] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.querySelector(".contact-section");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <TextScramble text="Let's get started →" />
          </motion.a>
        </div>
      </div>

      {/* Render schema JSON only after component is mounted */}
      {mounted && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }}
        />
      )}
    </section>
  );
}
