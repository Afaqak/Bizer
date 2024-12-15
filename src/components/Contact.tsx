"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export  function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <main 
    id="contact"
    className="min-h-[110vh] md:mb-[30vh] sticky top-0 z-20 flex items-center justify-center bg-[#1C1C1C] text-white">
      <div className="container max-w-xl bg-[#26241F] rounded-mx shadow mx-auto p-10">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Chat with our team</h1>
            <p className="text-gray-400">
              Need help with something? Want a demo? Get in touch with our friendly team and we'll get in touch within 2 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input 
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>

            <input 
              type="text"
              placeholder="Job title"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
            />

            <input 
              type="email"
              placeholder="Work email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <input 
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />

            <button 
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Get in touch
            </button>
          </form>
        </motion.div>
      </div>
      
      </main>
  )
}