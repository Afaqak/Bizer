"use client";

import { bangers } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

// Add JSON-LD schema for organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HackToast",
  "description": "We Design Websites That Captivate, Convert, and Elevate Your Brand. Modern tech solutions for forward-thinking businesses.",
  "slogan": "We Design Websites That Captivate, Convert, and Elevate Your Brand",
  "url": "https://hacktoast.com",
  "knowsAbout": [
    "Web Design",
    "UI/UX Design",
    "Landing Page Design",
    "E-commerce Development"
  ]
};

export const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section 
      className="bg-black flex px-4 items-center mt-6 flex-col gap-16 justify-center w-full h-screen xl:h-[calc(100vh-20px)]"
      aria-label="Hero Section"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <motion.div
        className="text-[1.8rem] md:text-4xl xl:text-6xl text-center justify-center relative flex flex-col items-center font-bold text-white leading-normal space-y-2 sm:space-y-4 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="banner"
      >
        <motion.div
          className="absolute -right-8 sm:-right-16 hidden md:block animate-pulse -top-8 sm:-top-12"
          variants={starVariants}
          aria-hidden="true"
        >
          <Star className="fill-[#4AFA4A] stroke-[#4AFA4A] size-8 sm:size-12" />
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-center"
        >
          We Design <span className="text-[#4AFA4A]">Websites</span> That Captivate
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-center"
        >
          Convert, and <span className="text-[#4AFA4A]">Elevate Your Brand</span>
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          className="text-center text-gray-300 text-3xl xl:text-4xl"
        >
          Modern solutions for <span className="text-white font-extrabold">forward-thinking businesses</span>
        </motion.p>

        <motion.div
          className="absolute right-2 sm:-right-8 md:-left-14 -bottom-12 sm:-bottom-12"
          variants={starVariants}
          aria-hidden="true"
        >
          <Star className="fill-[#4AFA4A] animate-pulse stroke-[#4AFA4A] size-8 sm:size-12" />
        </motion.div>
      </motion.div>

      <motion.p
        className="text-white tracking-wider text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        With years of experience, we specialize in crafting
        <motion.span
          className={cn("text-2xl ml-2 font-bold text-[#4AFA4A]", bangers.className)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          VISUALLY STUNNING, USER-FRIENDLY WEBSITES
        </motion.span>
      </motion.p>
    </section>
  );
};