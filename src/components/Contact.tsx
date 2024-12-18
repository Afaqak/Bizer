"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import sendMail from "@/lib/email";
import { toast } from "sonner";

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
    <main
      id="contact"
      className="min-h-screen mb-[28rem] md:mb-[14rem] sticky top-0 z-20 flex items-center justify-center bg-[#1C1C1C] text-white"
    >
      <div className="container max-w-xl bg-[#26241F] rounded-mx shadow mx-auto p-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-gray-400">
              Need help with something? Want to discuss an idea? Get in touch
              with us and we'll get back to you ASAP!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <textarea
              placeholder="Your message"
              className="w-full px-4 py-3 h-32 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 resize-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? (
                <span className="loader">sending...</span> // Replace this with a spinner
              ) : (
                "Get in touch"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
