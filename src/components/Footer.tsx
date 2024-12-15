import React from 'react';
import { Button } from "./Button"; // Assuming you have a Button component

export const Footer = () => {
  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#FABF29] text-white py-12 z-50 sticky top-0 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Name */}
        <div>
          <h3 className="text-3xl font-bold mb-4">HackToast</h3>
          <p className="text-sm">Transforming ideas into innovative digital solutions.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li 
              onClick={() => handleScroll("#services")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Services
            </li>
            <li 
              onClick={() => handleScroll("#projects")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Projects
            </li>
            <li 
              onClick={() => handleScroll("#contact")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Get in Touch</h4>
          <div className="space-y-2">
            <p>Email: hello@hacktoast.com</p>
            <Button 
              onClick={() => handleScroll("#contact")}
              className="mt-4 w-full"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-black/20">
        <p className="text-sm">
          © {new Date().getFullYear()} HackToast. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;