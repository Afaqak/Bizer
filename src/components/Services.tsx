"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import TextScramble from "./TextScramble";

// Add JSON-LD schema for services
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "ProfessionalService",
    name: "HackToast",
    url: "https://hacktoast.com",
  },
  serviceType: "Web Development Services",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Basic",
          description:
            "Static site with contact form. All packages include hosting and maintenance for a specific time for initial clients, plus basic SEO so people can find you on Google.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Basic Managed",
          description:
            "Dynamic content with a simple admin panel. All packages include hosting and maintenance for a specific time for initial clients, plus basic SEO so people can find you on Google.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Advanced",
          description:
            "Custom features depending on your specific needs. All packages include hosting and maintenance for a specific time for initial clients, plus basic SEO so people can find you on Google.",
        },
      },
    ],
  },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 1], ["40%", "0%", "0%"], {
    ease: (t) => Math.min(1, t * 1.5),
  });

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector(".contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      id: 1,
      title: "Custom Website Development",
      description: "Tailor-made sites built to match your brand perfectly",
    },
    {
      id: 2,
      title: "Web Based Solutions",
      description:
        "Apps and tools that solve real business problems, designed to simplify your workflow.",
    },
    {
      id: 3,
      title: "Rapid Website Development",
      description:
        "Fast, high-quality websites using platforms like Shopify or WordPress—ready in weeks.",
    },
    {
      id: 4,
      title: "Creative UI/UX Design",
      description:
        "Engaging, user-friendly designs that make your brand unforgettable.",
    },
    {
      id: 5,
      title: "SEO Optimization",
      description: "Get more eyes on your site with SEO optimized sites.",
    },
  ];

  const packages = [
    {
      id: 1,
      name: "Basic",
      price: "$100",
      description: "Static site with contact form",
      features: [
        "Static website",
        "Contact form",
        "Responsive design",
        "Less than 7 pages",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Basic Managed",
      price: "$150",
      description: "Dynamic content with a simple admin panel",
      features: [
        "Everything in Basic",
        "Less than 10 pages",
        "Simple admin panel for dynamic content updates",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Advanced",
      price: "$150+",
      description: "Custom features depending on your specific needs",
      features: [
        "Everything in Basic Managed",
        "Custom features",
        "Advanced statistics/analytics",
        "Custom integrations",
        "Any amount of pages",
      ],
      popular: false,
    },
  ];

  // Sliding text for infinite carousel
  const serviceTypes = [
    "Landing Pages",
    "• Web Design",
    "• Web Development",
    "• Branding",
    "• Visual Identity",
    "• E-commerce",
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="px-4 py-20 md:py-32 bg-black text-white"
      aria-label="Our Services"
    >
      {/* Add JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header and infinite slider in one row */}
        <div className="flex flex-col md:flex-row md:items-center mb-16 md:mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.4,
            }}
            viewport={{ once: true }}
          >
            <span className="text-[#4AFA4A]">Our</span> Services
          </motion.h2>

          {/* Separator */}
          <hr className="w-full border-t border-zinc-800 my-8 md:hidden" />

          {/* Infinite slider with service types */}
          <div className="relative w-full md:w-1/2 overflow-hidden md:ml-8">
            <div className="absolute left-0 w-12 bg-gradient-to-r from-black to-transparent h-full z-10"></div>
            <div className="absolute right-0 w-12 bg-gradient-to-l from-black to-transparent h-full z-10"></div>

            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "linear",
              }}
            >
              {[...serviceTypes, ...serviceTypes].map((type, i) => (
                <span key={i} className="text-sm mr-6 md:mr-8 text-gray-400">
                  {type}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-0 mb-32 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="border-b border-zinc-800 py-12 group hover:bg-zinc-900/30 transition-colors"
            >
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mr-6 group-hover:bg-[#4AFA4A]/10 transition-colors">
                  <div className="text-[#4AFA4A] font-bold text-xl">
                    {`${service.id}`}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#4AFA4A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Packages Section */}
        <motion.div
          className="mb-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.4,
          }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Flexible Pricing Plans</h2>
          <p className="text-gray-400 text-sm max-w-4xl mb-12">
            All packages include hosting and maintenance for a specific time (or
            number of updates) + basic SEO.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                className={cn(
                  "rounded-xl overflow-hidden relative p-1",
                  pkg.popular
                    ? "bg-gradient-to-br from-[#4AFA4A]/20 via-[#4AFA4A] to-[#4AFA4A]/20"
                    : "bg-zinc-800"
                )}
                whileHover={{
                  y: -10,
                  boxShadow: pkg.popular
                    ? "0 20px 25px -5px rgba(74, 250, 74, 0.1), 0 10px 10px -5px rgba(74, 250, 74, 0.04)"
                    : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="bg-zinc-900 rounded-lg p-8 h-full flex flex-col">
                  {pkg.popular && (
                    <div className="absolute top-0 right-6 bg-[#4AFA4A] text-black font-medium px-4 py-1 text-sm rounded-b-lg shadow-lg z-10">
                      Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold mb-2">{pkg.price}</div>
                  <p className="text-gray-400 text-sm mb-8">
                    {pkg.description}
                  </p>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#4AFA4A] mr-3 text-lg">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#contact"
                    className={cn(
                      "w-full py-3 rounded-lg font-medium transition-colors text-center block",
                      pkg.popular
                        ? "bg-[#4AFA4A] text-black"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleScrollToContact}
                  >
                    Get Started
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
