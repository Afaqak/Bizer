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
    <section className="py-20 md:py-32 bg-black">
      <motion.div 
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
              className="block text-white"
            >
              LET'S WORK
            </motion.span>
            <motion.span 
              variants={textVariants}
              className="block text-[#4AFA4A]"
            >
              TOGETHER!
            </motion.span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto"
          >
            If you're looking to elevate your digital presence with a website that captivates your audience and converts visitors into customers, we'd love to collaborate with you on your next project.
          </motion.p>

          <motion.div
            variants={textVariants}
          >
            <motion.a
              href="./#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.querySelector('.contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2 text-4xl md:text-5xl font-bold text-[#4AFA4A] hover:text-[#3ED63E] transition-colors"
            >
              GET IN TOUCH
              <ArrowRight className="w-10 h-10 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}