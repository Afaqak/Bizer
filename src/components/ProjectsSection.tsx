"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/lib/data";
import Image from "next/image";
import TextScramble from "./TextScramble";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // For view transitions
  const handleNavigateToProjects = () => {
    // Use View Transitions API if supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      //@ts-ignore - TypeScript doesn't know about this API yet
      document.startViewTransition(() => {
        router.push("/projects");
      });
    } else {
      router.push("/projects");
    }
  };

  // Project types for infinite slider
  const projectTypes = [
    "Websites",
    "• E-commerce",
    "• Landing Pages",
    "• Web Apps",
    "• Dashboards",
    "• Online Stores",
  ];

  // Featured projects we want to display
  const featuredProjectIds = ["9", "1", "5", "8", "14"]; // neurotablet, sipath, youmedico, isg, hellscription
  const featuredProjects = projects.filter((project) =>
    featuredProjectIds.includes(project.id)
  );

  // Update project URLs
  const updatedProjects = featuredProjects.map((project) => {
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
    }

    return updatedProject;
  });

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
          {updatedProjects.map((project, index) => (
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
              style={{ viewTransitionName: `project-section-${project.id}` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
                <div className="md:col-span-6 xl:col-span-7 mb-8 md:mb-0">
                  <motion.div
                    className="relative aspect-[16/10] overflow-hidden bg-[#00B8FF] rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                      viewTransitionName: `project-image-${project.id}`,
                    }}
                  >
                    <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <div className="hidden">
                          <h3 className="text-3xl font-bold">
                            <TextScramble text={project.title} />
                          </h3>
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

                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
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
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ viewTransitionName: `project-info-${project.id}` }}
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

                      <div className="flex flex-wrap gap-4">
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
                                  hover: { y: -30 },
                                }}
                                transition={{ duration: 0.2 }}
                                className="block"
                              >
                                View Website
                              </motion.span>
                              <motion.span
                                variants={{
                                  initial: { y: 60, opacity: 0 },
                                  hover: { y: 0, opacity: 1 },
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute"
                              >
                                Check it out
                              </motion.span>
                            </motion.a>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Button onClick={handleNavigateToProjects} className="mx-auto px-8">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
