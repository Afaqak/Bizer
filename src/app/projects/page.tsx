"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Footer from "@/components/Footer";

// Add JSON-LD schema for projects page
const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Projects",
  description: "Browse our portfolio of web development projects",
  url: "https://hacktoast.com/projects",
  mainEntity: {
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
  },
};

export default function ProjectsPage() {
  // Make sure view transitions are properly applied
  useEffect(() => {
    document.documentElement.classList.add("view-transition");

    // Enable view transitions if supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const transitionStylesheet = document.createElement("style");
      transitionStylesheet.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.5s;
        }
        
        ::view-transition-old(project-card),
        ::view-transition-new(project-card) {
          animation-duration: 0.6s;
        }
      `;
      document.head.appendChild(transitionStylesheet);

      return () => {
        transitionStylesheet.remove();
      };
    }
  }, []);

  const router = useRouter();

  // Reorder projects to highlight the specified ones
  const orderedProjects = useMemo(() => {
    // IDs of projects to prioritize
    const priorityIds = [
      "13",
      "14",
      "15",
      "8",
      "5",
      "6",
      "7",
      "9",
      "1",
      "3",
      "10",
      "4",
    ];

    // First, get all the priority projects in the order specified
    const priorityProjects = priorityIds
      .map((id) => projects.find((p) => p.id === id))
      .filter((project): project is Project => !!project);

    // Then, get the remaining projects
    const remainingProjects = projects.filter(
      (project) => !priorityIds.includes(project.id)
    );

    // Combine priority projects with remaining projects
    return [...priorityProjects, ...remainingProjects];
  }, []);

  // Update project URLs
  const updatedProjects = useMemo(() => {
    return orderedProjects.map((project) => {
      let updatedProject = { ...project };

      if (project.id === "9") {
        // Neurotablet
        updatedProject.liveUrl = "https://app.findneurotablet.com";
      } else if (project.id === "1") {
        // Sipath
        updatedProject.liveUrl = "https://sipath.com";
      } else if (project.id === "5") {
        // YouMedico
        updatedProject.title = "YouMedico";
        updatedProject.liveUrl = "https://app.youmedico.se";
      } else if (project.id === "8") {
        // ISG
        updatedProject.liveUrl = "https://transcom.com/awards/isg-recognition/";
      } else if (project.id === "14") {
        // Hellscription
        updatedProject.liveUrl = "https://hellscription-3sx8.vercel.app/";
      } else if (project.id === "3") {
        // Taublab
        updatedProject.liveUrl = "https://taulab.ai/";
      } else if (project.id === "15") {
        // Outsourced Services
        updatedProject.liveUrl =
          "https://transcom.com/services/outsourced-call-center/";
      } else if (project.id === "7") {
        // Financial Services
        updatedProject.liveUrl =
          "https://transcom.com/industries/financial-services/";
      } else if (project.id === "10") {
        // Alokofarms
        updatedProject.liveUrl = "https://alokofarms.netlify.app/";
      } else if (project.id === "6") {
        // Call Centers (if exists)
        updatedProject.liveUrl =
          "https://transcom.com/services/offshore-call-center/";
      }

      return updatedProject;
    });
  }, [orderedProjects]);

  return (
    <>
      <main className="w-full bg-black px-4 py-24 md:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />

        <div className="max-w-5xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[#4AFA4A]">Our</span> Projects
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Button
                onClick={() => router.push("/#contact")}
                className="mt-4 md:mt-0"
              >
                Start a Project
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {updatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.05 + 0.3,
                }}
                className="mb-12"
                style={{
                  viewTransitionName: `project-section-${project.id}`,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
                  <div className="md:col-span-6 xl:col-span-7 mb-8 md:mb-0">
                    <motion.div
                      className="relative aspect-[16/10] overflow-hidden bg-[#121212] rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      style={{
                        viewTransitionName: `project-image-${project.id}`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40 transition-all duration-200"></div>

                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
                        className="object-cover object-center w-full h-full"
                      />

                      {/* Show "Coming Soon" badge for Hellscription */}
                      {project.id === "14" && (
                        <div className="absolute top-4 right-4 bg-[#4AFA4A] text-black font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                          Coming Soon
                        </div>
                      )}
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
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      style={{
                        viewTransitionName: `project-info-${project.id}`,
                      }}
                    >
                      <div className="relative z-1">
                        <h2 className="text-2xl font-bold mb-2">
                          {project.title}
                        </h2>

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
                        <p className="text-gray-400 mb-6 flex-grow">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-auto">
                          {project.liveUrl && (
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#4AFA4A] text-black font-medium rounded-lg hover:bg-[#3ED63E] transition-colors"
                            >
                              View Website
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: updatedProjects.length * 0.05 + 0.5,
            }}
          >
            <Button onClick={() => router.push("/")} className="mx-auto">
              Back to Home
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
