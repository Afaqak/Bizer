"use client";

import { bangers } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        // delayChildren: 0.3,
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
    <header className="bg-[#1C1C1C] flex px-4 items-center flex-col gap-16 justify-center h-screen xl:h-[calc(100vh-70px)]">
      <motion.h1
        className="text-4xl xl:text-5xl relative flex flex-col items-center font-semibold text-white leading-normal"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute -right-16 animate-pulse -top-12"
          variants={starVariants}
        >
          <Star className="fill-[#FABF29] stroke-[#FABF29] size-12" />
        </motion.div>
        <motion.span variants={itemVariants}>
          Impactful <span className="text-[#F54E26]">development</span>, bold
          design.
        </motion.span>
        <motion.span variants={itemVariants}>
          Innovative solutions that{" "}
          <span className="text-[#82FF1F]">inspire</span>
        </motion.span>
        <motion.span variants={itemVariants}>
          Driving growth, sparking{" "}
          <span className="text-[#C66AFF]">Change</span>.
        </motion.span>
        <motion.span variants={itemVariants}>
          shaping <span className="text-[#FABF29]">futures</span> with
          creativity.
        </motion.span>
        <motion.div
          className="absolute -left-14 -bottom-12"
          variants={starVariants}
        >
          <Star className="fill-[#82FF1F] animate-pulse stroke-[#82FF1F] size-12" />
        </motion.div>
      </motion.h1>
      <motion.p
        className="text-white tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {" "}
        We highly dedicated engineers exists to make your business run{" "}
        <motion.span
          className={cn("text-2xl", bangers.className)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Kaboom
        </motion.span>
      </motion.p>
    </header>
  );
};
