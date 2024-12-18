"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 0.5], ["50px", "0px"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0], [0, 1]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9,
      rotateX: 30,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="w-full px-4 py-20 bg-[#1C1C1C] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{
            y: headlineY,
            opacity: headlineOpacity,
          }}
          initial={{ opacity: 0, y: 50 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 w-fit mx-auto bg-orange-500 p-6 text-white">
            Helping brands thrive
            <br />
            in the digital world
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={cardVariants}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}