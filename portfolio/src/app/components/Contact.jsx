"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // temporary fake submission
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center px-6 py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-white mb-8"
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-400 text-center max-w-md mb-10"
      >
        Have a project in mind, or just want to say hello?  
        Fill out the form below — I’d love to hear from you.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-md space-y-5"
      >
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-zinc-800 text-gray-100 border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-zinc-800 text-gray-100 border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 rounded-lg bg-zinc-800 text-gray-100 border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          {submitted ? "Message Sent!" : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
}
