"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const rotateX = useTransform(y, [0, viewport.height || 1], [10, -10]);
  const rotateY = useTransform(x, [0, viewport.width || 1], [-10, 10]);

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden transition-colors duration-700"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-teal-100 to-cyan-200 dark:from-green-950 dark:via-teal-900 dark:to-cyan-950"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "300% 300%", filter: "blur(60px)" }}
      />

      {/* Foreground Content */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex flex-col items-center w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white transition-colors duration-500"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-700 dark:text-gray-400 text-center mb-10 transition-colors duration-500"
        >
          Have a project in mind, or just want to say hello? Fill out the form below — I’d love to hear from you.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full space-y-5"
        >
          <div>
            <label className="block text-zinc-700 dark:text-gray-400 mb-1 transition-colors duration-500">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-500"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-gray-400 mb-1 transition-colors duration-500">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-500"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-gray-400 mb-1 transition-colors duration-500">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-500 resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-500"
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
}

