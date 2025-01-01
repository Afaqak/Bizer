'use client'
import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 100) {
      setHidden(true);
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
      setIsMobileMenuOpen(false);
    }
  };

  const navMenuItems = [
    { label: 'Projects', id: '#projects' },
    { label: 'Services', id: '#services' },
  ];

  return (
    <motion.header
      role="banner"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 w-full overflow-hidden z-50 bg-[#FABF29] shadow-md"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />

      <nav 
        className="flex justify-between items-center px-4 md:px-10 h-[70px]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a 
          href="/" 
          className="font-bold text-2xl md:text-4xl tracking-wide"
          aria-label="HackToast - Home"
        >
          HackToast
        </a>
       
        {/* Desktop Navigation */}
        <ul 
          className="hidden md:flex gap-6 text-lg items-center"
          role="menubar"
          aria-label="Desktop navigation"
        >
          {navMenuItems.map((item) => (
            <li
              key={item.id}
              role="none"
            >
              <a
                href={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.id);
                }}
                className="cursor-pointer hover:text-white transition-colors"
                role="menuitem"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
       
        {/* Desktop Contact Button */}
        <Button
          onClick={() => handleScroll("#contact")}
          className="hidden md:block tracking-wide text-lg px-6 py-0"
          aria-label="Contact Us"
        >
          Contact Us
        </Button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden focus:outline-none"
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
          className="fixed top-[65px] right-0 w-3/4 bg-[#FABF29] h-[calc(100vh-70px)] md:hidden z-50 shadow-lg p-6"
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
                <li
                  key={item.id}
                  role="none"
                >
                  <a
                    href={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(item.id);
                    }}
                    className="cursor-pointer hover:text-white transition-colors border-b pb-3 border-black/20 block"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li role="none">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll('#contact');
                  }}
                  className="cursor-pointer hover:text-white hover:underline hover:bg-black/40 transition-colors border-b pb-3 border-black/20 block"
                  role="menuitem"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Navbar;