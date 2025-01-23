"use client";

import { Plus, Minus } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Add JSON-LD schema for services
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "ProfessionalService",
    "name": "HackToast",
    "url": "https://hacktoast.com"
  },
  "serviceType": "Web Development Services",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Website Development",
          "description": "Tailored solutions that reflect your unique brand identity and business goals, ensuring a website designed specifically for your needs."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Search Engine Optimization (SEO)",
          "description": "Comprehensive SEO strategies to improve your website's visibility, driving organic traffic and enhancing your online presence."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web-Based Solutions",
          "description": "Innovative web solutions that streamline your business processes, from customer management to inventory tracking, all accessible online."
        }
      }
    ]
  }
};

export default function ServicesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 0.3, 1], ["40%", "0%", "0%"], {
    ease: (t) => Math.min(1, t * 1.5) 
  });
  const [expandedService, setExpandedService] = useState<string | null>(
    "Creative Design"
  );

  const services = [
    {
      title: "Custom Website Development",
      description:
        "Tailored solutions that reflect your unique brand identity and business goals, ensuring a website designed specifically for your needs.",
    },
    {
      title: "Search Engine Optimization (SEO)",
      description:
        "Comprehensive SEO strategies to improve your website's visibility, driving organic traffic and enhancing your online presence.",
    },
    {
      title: "Web-Based Solutions",
      description:
        "Innovative web solutions that streamline your business processes, from customer management to inventory tracking, all accessible online.",
    },
    {
      title: "Rapid Website Development",
      description:
        "Prompt delivery of proficient websites via well-known systems such as Shopify and WooCommerce etc.",
    },
    {
      title: "Creative UI/UX Design",
      description:
        "Eye-catching and user-friendly designs that engage visitors, making a lasting impression while ensuring an intuitive user experience.",
    },
  ];

  return (
    <section 
      id="services" 
      className="px-4 py-20 md:py-48 bg-[#1C1C1C] text-white"
      aria-label="Our Services"
    >
      {/* Add JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <motion.div
        transition={{
          type: "spring",
        }}
        style={{
          y,
          transformOrigin: "center bottom",
        }}
        ref={ref}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16"
      >
        {/* Left Column - Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex h-[380px] md:h-full md:max-h-[539.556px] items-center justify-center flex-col bg-[#26241F]"
        >
          <header className='flex items-center justify-center flex-col gap-4'>
            <h2 className="text-4xl md:text-5xl xl:text-5xl tracking-wide text-center font-bold leading-snug">
              <span className="text-[#FABF29]">Fueling</span> growth
              <br />
              with innovative design and
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-orange-500 text-center text-3xl mx-4 md:text-4xl px-6 py-3 text-white inline-block mt-4 rounded-lg"
            >
              <span className="text-4xl font-bold">Strategic Solutions</span>
            </motion.div>
          </header>
        </motion.div>

        {/* Right Column - Services List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 bg-[#26241F] flex h-full min-h-[539.556px] p-10 flex-col"
          role="list"
          aria-label="Our Services List"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              role="listitem"
            >
              <button
                onClick={() =>
                  setExpandedService(
                    expandedService === service.title ? null : service.title
                  )
                }
                className="w-full group"
                aria-expanded={expandedService === service.title}
                aria-controls={`service-content-${index}`}
              >
                <motion.div
                  className={cn(
                    "flex text-start items-center justify-between border-b border-zinc-700 py-4",
                    index === services?.length - 1 && "border-b-0"
                  )}
                  layout
                >
                  <motion.h3
                    className={`text-2xl lg:text-4xl font-bold ${
                      expandedService === service.title
                        ? "text-white"
                        : "group-hover:text-[#C66AFF]/90 text-[#C66AFF]"
                    }`}
                    layout
                  >
                    {service.title}
                  </motion.h3>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-hidden="true"
                  >
                    {expandedService === service.title ? (
                      <Minus className="w-6 h-6 text-[#FABF29]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#FABF29]" />
                    )}
                  </motion.div>
                </motion.div>
                <AnimatePresence initial={false}>
                  {expandedService === service.title && (
                    <motion.div
                      id={`service-content-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          opacity: { duration: 0.2, delay: 0.1 },
                          height: { duration: 0.3 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        className="py-4 text-2xl text-left font-semibold text-white"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {service.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
