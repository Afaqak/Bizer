import React from 'react';
import { Button } from "./Button";

// Add JSON-LD schema for footer
const footerSchema = {
  "@context": "https://schema.org",
  "@type": "WPFooter",
  "name": "HackToast Footer",
  "hasPart": [
    {
      "@type": "SiteNavigationElement",
      "name": "Quick Links",
      "hasPart": [
        {
          "@type": "WebPage",
          "name": "Services",
          "url": "https://hacktoast.com/#services"
        },
        {
          "@type": "WebPage",
          "name": "Projects",
          "url": "https://hacktoast.com/#projects"
        },
        {
          "@type": "WebPage",
          "name": "Contact",
          "url": "https://hacktoast.com/#contact"
        }
      ]
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "frivxd10@gmail.com",
    "contactType": "customer service"
  }
};

export const Footer = () => {
  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      className="bg-[#FABF29] text-white py-12 h-[28rem] md:h-[14rem] z-50 sticky top-0 px-10"
      role="contentinfo"
      aria-label="Site Footer"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(footerSchema) }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Information */}
        <div>
          <h2 className="text-3xl font-bold mb-4">HackToast</h2>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul role="menu" className="space-y-2">
            <li role="none">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("#services");
                }}
                className="cursor-pointer hover:text-white transition-colors"
                role="menuitem"
              >
                Services
              </a>
            </li>
            <li role="none">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("#projects");
                }}
                className="cursor-pointer hover:text-white transition-colors"
                role="menuitem"
              >
                Projects
              </a>
            </li>
            <li role="none">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("#contact");
                }}
                className="cursor-pointer hover:text-white transition-colors"
                role="menuitem"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <address className="space-y-2 not-italic">
            <p>
              <a 
                href="mailto:frivxd10@gmail.com" 
                className="text-black-500 hover:underline"
                aria-label="Email us"
              >
                frivxd10@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;