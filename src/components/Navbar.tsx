'use client'
import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { Button } from "./Button";
import { Menu, X } from 'lucide-react';

// Add JSON-LD schema for navigation
const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Main Navigation",
  "hasPart": [
    {
      "@type": "WebPage",
      "name": "Projects",
      "url": "https://hacktoast.com/#projects"
    },
    {
      "@type": "WebPage",
      "name": "Services",
      "url": "https://hacktoast.com/#services"
    },
    {
      "@type": "WebPage",
      "name": "Contact",
      "url": "https://hacktoast.com/#contact"
    }
  ]
};

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transforms for the navbar shrinking effect
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 20]);
  const height = useTransform(scrollY, [0, 100], [70, 60]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  // For the glow effect intensity
  const glowOpacity = useTransform(scrollY, [0, 100], [0.6, 0.8]);
  // For adjusting top position when in centered mode
  const topPosition = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  
  // Track scroll position for changing style
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only apply scrolled styles after 50px
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleScroll = (sectionId: string) => {
    // Special case for contact section
    if (sectionId === '#contact') {
      const contactSection = document.querySelector('.contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
        return;
      }
    }
    
    // Default behavior for other sections
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navMenuItems = [
    { label: 'Projects', id: '#projects' },
    { label: 'Services', id: '#services' },
    { label: 'Process', id: '#process' },
  ];

  return (
    <motion.header
      role="banner"
      style={{
        top: scrolled ? topPosition : 0
      }}
      className="fixed left-0 right-0 w-full overflow-hidden z-50 flex justify-center items-center pointer-events-none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />

      <motion.nav 
        style={{ 
          width, 
          height,
          borderRadius,
          scale
        }}
        className={`relative flex justify-between items-center px-4 md:px-8 text-white pointer-events-auto mx-auto
          ${scrolled 
            ? 'bg-black/90 backdrop-blur-md shadow-[0_0_15px_rgba(74,250,74,0.15)] border border-[#4AFA4A]/20' 
            : 'bg-gradient-to-r from-black via-black to-black'}`}
        aria-label="Main navigation"
      >
        {/* Glow/Shine effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ 
            borderRadius,
            opacity: glowOpacity
          }}
        >
          <motion.div 
            className="absolute h-[200%] w-[50px] top-0 -left-[100px] bg-gradient-to-r from-transparent via-[#4AFA4A]/10 to-transparent transform -rotate-45"
            animate={{ 
              left: ["0%", "150%"],
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 3
              } 
            }}
          />
        </motion.div>

        {/* Logo */}
        <motion.a 
          href="/" 
          className="font-bold text-2xl md:text-4xl tracking-wide transition-all relative z-10"
          style={{ fontSize: useTransform(scrollY, [0, 100], ['2rem', '1.75rem']) }}
          aria-label="HackToast - Home"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4AFA4A] to-[#2ED82E]">Hack</span>
          <span className="text-white">Toast</span>
        </motion.a>
       
        {/* Desktop Navigation */}
        <ul 
          className="hidden md:flex gap-6 text-lg items-center relative z-10"
          role="menubar"
          aria-label="Desktop navigation"
        >
          {navMenuItems.map((item) => (
            <motion.li
              key={item.id}
              role="none"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a
                href={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.id);
                }}
                className="cursor-pointer hover:text-[#4AFA4A] transition-colors"
                role="menuitem"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
       
        {/* Desktop Contact Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="relative z-10"
        >
          <Button
            onClick={() => handleScroll("#contact")}
            className="hidden md:block tracking-wide text-lg px-6 py-0"
            aria-label="Contact Us"
          >
            Let's Talk
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden focus:outline-none text-white relative z-20"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          id="mobile-menu"
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "tween" }}
          className="fixed top-[65px] right-0 w-3/4 bg-black/95 backdrop-blur-md h-[calc(100vh-70px)] md:hidden z-50 shadow-[0_0_15px_rgba(74,250,74,0.15)] p-6 text-white border-l border-[#4AFA4A]/20 pointer-events-auto"
          aria-hidden={!isMobileMenuOpen}
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <nav>
            <ul 
              className="flex flex-col gap-6 text-xl"
              role="menu"
              aria-label="Mobile navigation"
            >
              {navMenuItems.map((item) => (
                <motion.li
                  key={item.id}
                  role="none"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <a
                    href={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(item.id);
                    }}
                    className="cursor-pointer hover:text-[#4AFA4A] transition-colors border-b pb-3 border-white/20 block"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li 
                role="none"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll('#contact');
                  }}
                  className="cursor-pointer hover:text-[#4AFA4A] transition-colors border-b pb-3 border-white/20 block"
                  role="menuitem"
                >
                  Contact Us
                </a>
              </motion.li>
            </ul>
          </nav>
        </motion.div>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;