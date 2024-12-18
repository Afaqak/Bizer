'use client'
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from "./Button";
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
   
    if (previous && latest > previous && latest > 100) {
      setHidden(true);
      // Close mobile menu when scrolling down
      setIsMobileMenuOpen(false);
    }
    else if (previous && latest < previous) {
      setHidden(false);
    }
  });

  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  const navMenuItems = [
    { label: 'Projects', id: '#projects' },
    { label: 'Services', id: '#services' },
    // { label: 'Contact', id: '#contact' }
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 w-full overflow-hidden z-50 bg-[#FABF29] flex justify-between items-center px-4 md:px-10 h-[70px] shadow-md"
    >
      {/* Logo */}
      <h2 className="font-bold text-2xl md:text-4xl tracking-wide">HackToast</h2>
     
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 text-lg items-center">
        {navMenuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className="cursor-pointer hover:text-white transition-colors"
          >
            {item.label}
          </li>
        ))}
      </ul>
     
      {/* Desktop Contact Button */}
      <Button
        onClick={() => handleScroll("#contact")}
        className="hidden md:block tracking-wide text-lg px-6 py-0"
      >
        Contact Us
      </Button>

      <div className="md:hidden z-[9999999]">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween" }}
        className="fixed top-[65px] right-0 w-3/4 bg-[#FABF29] 
        h-[calc(100vh-70px)] md:hidden z-50 shadow-lg p-6"
      >
        <ul className="flex flex-col gap-6 text-xl">
          {navMenuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="cursor-pointer hover:text-white transition-colors 
              border-b pb-3 border-black/20"
            >
              {item.label}
            </li>
          ))}
           <li
              key={'#contact'}
              onClick={() => handleScroll('#contact')}
              className="cursor-pointer hover:text-white transition-colors 
              border-b pb-3 border-black/20"
            >
              {'Contact Us'}
            </li>
        </ul>
        
        {/* <Button
          onClick={() => handleScroll("#contact")}
          className="w-full mt-6 tracking-wide text-lg"
        >
          Contact Us
        </Button> */}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;