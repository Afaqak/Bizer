"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/data";
import Image from "next/image";
import TextScramble from "./TextScramble";

// Add JSON-LD schema for projects section
const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: `https://hacktoast.com${project.image}`,
      keywords: project.tags.join(", "),
    },
  })),
  numberOfItems: projects.length,
  provider: {
    "@type": "Organization",
    name: "HackToast",
    url: "https://hacktoast.com",
  },
};

export default function ProjectsSection() {
  const { scrollYProgress } = useScroll();

  // Project types for infinite slider
  const projectTypes = [
    "Websites",
    "• E-commerce",
    "• Landing Pages",
    "• Web Apps",
    "• Dashboards",
    "• Online Stores",
  ];

  return (
    <section
      id="projects"
      className="w-full px-4 py-20 md:py-32 bg-black overflow-hidden"
      aria-label="Our Projects"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header and infinite slider in one row */}
        <div className="flex flex-col md:flex-row md:items-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.4,
            }}
            viewport={{ once: true }}
          >
            <span className="text-[#4AFA4A]">Selected</span> Projects
          </motion.h2>

          {/* Separator */}
          <hr className="w-full border-t border-zinc-800 my-8 md:hidden" />

          {/* Infinite slider with project types */}
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
            >
              {[...projectTypes, ...projectTypes].map((type, i) => (
                <span key={i} className="text-sm mr-6 md:mr-8 text-gray-400">
                  <TextScramble text={type} />
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Simple and reliable project display */}
        <div className="space-y-16 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.05,
              }}
              viewport={{ once: true, margin: "-20px" }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
                <div className="md:col-span-6 xl:col-span-7 mb-8 md:mb-0">
                  <motion.div
                    className="relative aspect-[16/10] overflow-hidden bg-[#00B8FF] rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <div className="hidden">
                          <h3 className="text-3xl font-bold">
                            <TextScramble text={project.title} />
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <motion.a
                            href="#"
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                            whileHover={{
                              scale: 1.2,
                              backgroundColor: "rgba(255,255,255,0.3)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <span className="sr-only">Instagram</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                                fill="currentColor"
                              />
                            </svg>
                          </motion.a>
                          <motion.a
                            href="#"
                            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                            whileHover={{
                              scale: 1.2,
                              backgroundColor: "rgba(255,255,255,0.3)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <span className="sr-only">Twitter</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                                fill="currentColor"
                              />
                            </svg>
                          </motion.a>
                        </div>
                      </div>
                      <div className="hidden">
                        <p className="text-sm mb-1">
                          <TextScramble text="Photography & Filmmaking Studio based in London" />
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-white/20 rounded-full"
                            >
                              <TextScramble text={tag} className="text-xs" />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-200"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                <div className="md:col-span-6 xl:col-span-5">
                  <motion.div
                    className="bg-zinc-900 rounded-lg p-6 h-full flex flex-col relative"
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Shiny effect overlay */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[rgba(74,250,74,0.2)] to-transparent opacity-0 group-hover:opacity-100 z-0 overflow-hidden rounded-lg">
                      <motion.div
                        className="w-[200%] h-full"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                        }}
                      />
                    </div>

                    <div className="relative z-1">
                      <h4 className="text-2xl font-bold mb-2">
                        {project.title}
                      </h4>

                      <div className="flex gap-2 flex-wrap mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h4 className="text-xl font-bold mb-2">
                        Project Overview
                      </h4>
                      <p className="text-gray-400 mb-6 flex-grow line-clamp-3">
                        {project.description}
                      </p>

                      {/* <div className="flex flex-wrap gap-4">
                        {project.liveUrl && (
                          <motion.div 
                            className="relative overflow-hidden h-10 rounded-lg w-fit"
                            whileHover="hover"
                            initial="initial"
                          >
                            <motion.a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 flex items-center justify-center h-full bg-[#4AFA4A] text-black font-medium rounded-lg"
                              variants={{
                                initial: {},
                                hover: {},
                              }}
                            >
                              <motion.span
                                variants={{
                                  initial: { y: 0 },
                                  hover: { y: -30 }
                                }}
                                transition={{ duration: 0.2 }}
                                className="block"
                              >
                                View Website
                              </motion.span>
                              <motion.span
                                variants={{
                                  initial: { y: 60, opacity: 0 },
                                  hover: { y: 0, opacity: 1 }
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute"
                              >
                                Check it out
                              </motion.span>
                            </motion.a>
                          </motion.div>
                        )}
                        <motion.a 
                          href="#" 
                          className="px-4 py-2 border border-white/20 rounded-lg hover:border-[#4AFA4A] hover:text-[#4AFA4A] transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          More Details
                        </motion.a>
                      </div> */}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
