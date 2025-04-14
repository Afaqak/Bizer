"use client";

import React from "react";
import {
  ChevronRight,
  Code,
  LineChart,
  Lightbulb,
  Palette,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

type SliderItem = {
  key: string;
  icon?: React.ReactNode;
  title: string;
  value: string;
};

const sliderItems: SliderItem[] = [
  {
    key: "experience",
    icon: <ChevronRight className="text-[#4AFA4A]" />,
    title: "years of experience",
    value: "2+",
  },
  {
    key: "projects",
    icon: <Rocket className="text-[#4AFA4A] mr-2" />,
    title: "projects completed",
    value: "15+",
  },
  {
    key: "technologies",
    icon: <Code className="text-[#4AFA4A] mr-2" />,
    title: "modern technologies",
    value: "10+",
  },
  {
    key: "designs",
    icon: <Palette className="text-[#4AFA4A] mr-2" />,
    title: "unique designs",
    value: "20+",
  },
  {
    key: "innovation",
    icon: <Lightbulb className="text-[#4AFA4A] mr-2" />,
    title: "creative solutions",
    value: "∞",
  },
];

export const InfiniteSlider: React.FC<{ rotate?: number }> = ({
  rotate = 0,
}) => {
  return (
    <div className="py-12 md:py-16 bg-black w-full relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div
          style={{
            transform: rotate ? `rotate(${rotate}deg)` : "none",
          }}
          className="w-full relative h-12 flex items-center overflow-hidden"
        >
          {/* Gradient overlay for left fade effect */}
          <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10"></div>

          {/* Gradient overlay for right fade effect */}
          <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

          {/* Animated slider content */}
          <motion.div
            className="flex whitespace-nowrap text-white text-lg"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* Double the items for continuous loop */}
            {[...sliderItems, ...sliderItems].map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="flex items-center mx-6 md:mx-8"
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="text-[#4AFA4A] font-bold mr-1">
                    {item.value}
                  </span>
                  <span className="text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
