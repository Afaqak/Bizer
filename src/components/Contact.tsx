"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import sendMail from "@/lib/email";
import { toast } from "sonner";

// Add JSON-LD schema for the contact page
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact HackToast",
  "description": "Get in touch with HackToast for web development, design, and digital solutions.",
  "url": "https://hacktoast.com/#contact",
  "mainEntity": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "English"
  }
};

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    // Check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true); // Set loading state
    try {
      await sendMail(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.message
      );
      toast.success("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen mb-[28rem] md:mb-[14rem] sticky top-0 z-20 flex items-center justify-center bg-[#1C1C1C] text-white"
      aria-label="Contact Form Section"
    >
      {/* Add JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="container max-w-xl bg-[#26241F] rounded-mx shadow mx-auto p-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="space-y-2">
            <h2 className="text-4xl font-bold" id="contact-heading">Contact Us</h2>
            <p className="text-gray-400">
              Need help with something? Want to discuss an idea? Get in touch
              with us and we'll get back to you ASAP!
            </p>
          </header>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            aria-labelledby="contact-heading"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">Your message</label>
              <textarea
                id="message"
                placeholder="Your message"
                className="w-full px-4 py-3 h-32 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loader" role="status" aria-label="Sending message">
                  sending...
                </span>
              ) : (
                "Get in touch"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
