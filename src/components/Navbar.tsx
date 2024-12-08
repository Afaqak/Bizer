'use client'
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from "./Button";

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (previous && latest > previous && latest > 100) {
      setHidden(true);
    } 
    else if (previous && latest < previous) {
      setHidden(false);
    }
  });

  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FABF29] flex justify-between items-center px-10 h-[70px] shadow-md"
    >
      <h2 className="font-bold text-4xl tracking-wide">HackToast</h2>
      
      <ul className="flex gap-6 text-lg items-center">
        <li 
          onClick={() => handleScroll("#projects")} 
          className="cursor-pointer hover:text-white transition-colors"
        >
          Projects
        </li>
        <li 
          onClick={() => handleScroll("#services")} 
          className="cursor-pointer hover:text-white transition-colors"
        >
          Services
        </li>
        <li 
          onClick={() => handleScroll("#contact")} 
          className="cursor-pointer hover:text-white transition-colors"
        >
          Contact
        </li>
      </ul>
      
      <Button
        onClick={() => handleScroll("#contact")}
        className="tracking-wide text-lg p-6"
      >
        Contact Us
      </Button>
    </motion.nav>
  );
};

export default Navbar;