"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import TextScramble from "./TextScramble";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
    <section 
      className="bg-black py-20 contact-section relative" 
    >
      {/* Invisible anchor for scroll targeting */}
      <span id="contact" className="absolute top-[-100px]"></span>

      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact HackToast",
            "description": "Get in touch with us for your web design and development needs",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "frivxd10@gmail.com",
              "telephone": ["+923305823280", "+94762028447"],
              "contactType": "customer service",
              "areaServed": "Worldwide"
            }
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
                duration: 0.4
              }}
            >
              <span className="text-[#4AFA4A]">Let's</span> Work Together
            </motion.h2>

            {/* Separator */}
            <hr className="w-full border-t border-zinc-800 my-8 md:hidden"/>
            
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
                  ease: "linear" 
                }}
              >
                {[...["Web Design", "Development", "UX/UI", "Consulting", "Support"], 
                  ...["Web Design", "Development", "UX/UI", "Consulting", "Support"]].map((service, i) => (
                  <span key={i} className="text-sm mr-6 md:mr-8 text-gray-400">
                    <TextScramble text={service} />
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-12 max-w-2xl">
            <TextScramble text="Have a project in mind? Let's discuss how we can help bring your vision to life." />
          </p>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg border border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-2">
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
                    <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
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
                  <label htmlFor="message" className="block text-sm text-gray-300 mb-2">
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
                      <motion.div className="text-black">
                        Sending...
                      </motion.div>
                    ) : (
                      <>
                        <motion.div
                          variants={{
                            initial: { y: 0 },
                            hover: { y: -40, opacity: 0 }
                          }}
                          transition={{ duration: 0.2 }}
                          className="text-black absolute"
                        >
                          Send Message
                        </motion.div>
                        <motion.div
                          variants={{
                            initial: { y: 40, opacity: 0 },
                            hover: { y: 0, opacity: 1 }
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
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4AFA4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        <TextScramble text="Email" className="text-sm" />
                      </p>
                      <a href="mailto:frivxd10@gmail.com" className="text-white hover:text-[#4AFA4A] transition-colors text-sm">
                        <TextScramble text="frivxd10@gmail.com" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4AFA4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        <TextScramble text="Location" className="text-sm" />
                      </p>
                      <p className="text-white text-sm">
                        <TextScramble text="Remote Services Worldwide" />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-6">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4AFA4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        <TextScramble text="Phone" className="text-sm" />
                      </p>
                      <a href="tel:+923305823280" className="text-white hover:text-[#4AFA4A] transition-colors text-sm block">
                        <TextScramble text="+92 330 582 3280" />
                      </a>
                      <a href="tel:+94762028447" className="text-white hover:text-[#4AFA4A] transition-colors text-sm block mt-1">
                        <TextScramble text="+94 76 202 8447" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-800">
                    <p className="text-gray-400 mb-4 text-sm">
                      <TextScramble text="Follow us on social media" />
                    </p>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#4AFA4A]/20 transition-colors">
                        <svg className="w-5 h-5 text-[#4AFA4A]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#4AFA4A]/20 transition-colors">
                        <svg className="w-5 h-5 text-[#4AFA4A]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#4AFA4A]/20 transition-colors">
                        <svg className="w-5 h-5 text-[#4AFA4A]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
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
