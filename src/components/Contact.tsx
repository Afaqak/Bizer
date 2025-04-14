"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import TextScramble from "./TextScramble";
import sendMail from "@/lib/email";
import { Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Extract first and last name from the name field
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Send email using the sendMail function
      await sendMail(firstName, lastName, formData.email, formData.message);

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black py-20 contact-section relative">
      {/* Invisible anchor for scroll targeting */}
      <span id="contact" className="absolute top-[-100px]"></span>

      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact HackToast",
            description:
              "Get in touch with us for your web design and development needs",
            contactPoint: {
              "@type": "ContactPoint",
              email: "frivxd10@gmail.com",
              telephone: ["+923305823280", "+94762028447"],
              contactType: "customer service",
              areaServed: "Worldwide",
            },
          }),
        }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header and infinite slider in one row */}
          <div className="flex flex-col md:flex-row md:items-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4,
              }}
            >
              <span className="text-[#4AFA4A]">Let's</span> Work Together
            </motion.h2>

            {/* Separator */}
            <hr className="w-full border-t border-zinc-800 my-8 md:hidden" />

            {/* Infinite slider with services */}
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
                {[
                  ...[
                    "Web Design",
                    "Development",
                    "UX/UI",
                    "Consulting",
                    "Support",
                  ],
                  ...[
                    "Web Design",
                    "Development",
                    "UX/UI",
                    "Consulting",
                    "Support",
                  ],
                ].map((service, i) => (
                  <span key={i} className="text-sm mr-6 md:mr-8 text-gray-400">
                    <TextScramble text={service} />
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="text-gray-300 text-sm mb-12 max-w-2xl">
            Have a project in mind? Let's discuss how we can help bring your
            vision to life.
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-lg border border-zinc-800"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-gray-300 mb-2"
                    >
                      <TextScramble text="Name" className="text-sm" />
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AFA4A] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-300 mb-2"
                    >
                      <TextScramble text="Email" className="text-sm" />
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AFA4A] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    <TextScramble text="Message" className="text-sm" />
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AFA4A] transition-colors"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Button with text sliding up from below effect */}
                <motion.div
                  className="relative overflow-hidden h-12 rounded-lg"
                  whileHover="hover"
                  initial="initial"
                  variants={{
                    initial: {},
                    hover: {},
                  }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute inset-0 flex items-center justify-center w-full h-full bg-[#4AFA4A] font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors rounded-lg overflow-hidden"
                  >
                    {isSubmitting ? (
                      <motion.div className="text-black">Sending...</motion.div>
                    ) : (
                      <>
                        <motion.div
                          variants={{
                            initial: { y: 0 },
                            hover: { y: -40, opacity: 0 },
                          }}
                          transition={{ duration: 0.2 }}
                          className="text-black absolute"
                        >
                          Send Message
                        </motion.div>
                        <motion.div
                          variants={{
                            initial: { y: 40, opacity: 0 },
                            hover: { y: 0, opacity: 1 },
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute text-black"
                        >
                          Get in touch
                        </motion.div>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:w-1/3 flex flex-col justify-center">
              <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 h-full">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  <TextScramble text="Contact Info" />
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4 shrink-0">
                      <Mail className="h-5 w-5 text-[#4AFA4A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        <TextScramble text="Email" className="text-sm" />
                      </p>
                      <a
                        href="mailto:frivxd10@gmail.com"
                        className="text-white hover:text-[#4AFA4A] transition-colors text-sm"
                      >
                        frivxd10@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="h-5 w-5 text-[#4AFA4A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        <TextScramble text="Location" className="text-sm" />
                      </p>
                      <span className="text-white text-sm">
                        Remote Services Worldwide
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4 shrink-0">
                      <Phone className="h-5 w-5 text-[#4AFA4A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        <TextScramble text="Phone" className="text-sm" />
                      </p>
                      <a
                        href="tel:+923305823280"
                        className="text-white hover:text-[#4AFA4A] transition-colors text-sm block"
                      >
                        +92 330 582 3280
                      </a>
                      <a
                        href="tel:+94762028447"
                        className="text-white hover:text-[#4AFA4A] transition-colors text-sm block mt-1"
                      >
                        +94 76 202 8447
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-800">
                    <p className="text-gray-400 mb-4 text-sm">
                      <TextScramble text="Follow us on social media" />
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.linkedin.com/in/hack-toast-440b98343/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#4AFA4A]/20 transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5 text-[#4AFA4A]" />
                      </a>
                      <a
                        href="https://www.instagram.com/hacktoast10/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#4AFA4A]/20 transition-colors"
                        aria-label="Instagram Profile"
                      >
                        <Instagram className="w-5 h-5 text-[#4AFA4A]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
