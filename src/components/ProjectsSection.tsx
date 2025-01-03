"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

// Add JSON-LD schema for projects section
const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": projects.map((project, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "image": `https://hacktoast.com${project.image}`,
      "keywords": project.tags.join(", ")
    }
  })),
  "numberOfItems": projects.length,
  "provider": {
    "@type": "Organization",
    "name": "HackToast",
    "url": "https://hacktoast.com"
  }
};

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
        delay: index * 0.1,
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
      aria-label="Our Projects"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.header
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
        </motion.header>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Projects Gallery"
        >
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
              role="listitem"
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}