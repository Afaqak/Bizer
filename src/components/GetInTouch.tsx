'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function GetInTouch() {
  const textVariants = {
    hidden: { 
      opacity: 0,
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  return (
    <main className="py-48 sticky top-0 z-10 bg-[#1C1C1C]">
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="flex flex-col items-center justify-center px-4 py-16"
      >
        <div className="max-w-4xl w-full text-center space-y-8">
          <motion.h1 
            variants={textVariants}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <motion.span 
              variants={textVariants}
              className="block text-pink-300"
            >
              LET'S MAKE
            </motion.span>
            <motion.span 
              variants={textVariants}
              className="block text-pink-300"
            >
              SOMETHING GREAT!
            </motion.span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto"
          >
            I'm always open to new opportunities, collaborations, and connections. Whether
            you have a project you'd like to discuss, want to share your work, or just say hi!
            Feel free to reach out.
          </motion.p>

          <motion.div
            variants={textVariants}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-4xl md:text-5xl font-bold text-orange-500 hover:text-orange-400 transition-colors"
            >
              GET IN TOUCH
              <ArrowRight className="text-3xl animate-move-left ml-2 md:text-4xl" />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}