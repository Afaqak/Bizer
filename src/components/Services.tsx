import { Plus, Minus } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
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
    <div id="services" className="px-4 py-20 md:py-48 bg-[#1C1C1C] text-white ">
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
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex h-[400px] md:h-[505.333px] items-center justify-center flex-col bg-[#26241F]"
        >
          <h1 className="text-4xl md:text-5xl xl:text-5xl tracking-wide text-center font-bold leading-snug">
            <span className="text-[#FABF29]">Fueling</span> growth
            <br />
            with innovative design and
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="bg-orange-500 text-center px-6 py-3 text-white inline-block mt-4 rounded-lg"
          >
            <span className="text-4xl font-bold">Strategic Solutions</span>
          </motion.div>

          {/* Purple splash decoration */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute bottom-0 left-0 w-24 h-24"
          >
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 bg-[#26241F] flex p-10 flex-col"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <button
                onClick={() =>
                  setExpandedService(
                    expandedService === service.title ? null : service.title
                  )
                }
                className="w-full group"
              >
                <motion.div
                  className="flex text-start items-center justify-between border-b border-zinc-700 py-4"
                  layout
                >
                  <motion.h2
                    className={`text-2xl lg:text-4xl font-bold ${
                      expandedService === service.title
                        ? "text-white"
                        : "group-hover:text-[#C66AFF]/90 text-[#C66AFF]"
                    }`}
                    layout
                  >
                    {service.title}
                  </motion.h2>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "200px",
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
                          // height: { duration: 0.3 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        className="py-4 text-2xl text-left font-semibold  text-white"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.3 },
                        }}
                        // exit={{ y: -10, opacity: 0 }}
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
    </div>
  );
}
