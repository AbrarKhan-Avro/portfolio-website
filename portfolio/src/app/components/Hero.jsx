"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-black via-zinc-900 to-black px-4"
    >
      {/* Animated Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      >
        Abrar Khan
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-xl md:text-2xl text-gray-300 mb-8"
      >
        Web Developer • Designer • Storyteller
      </motion.p>

      {/* Call to Action Button */}
      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium shadow-lg hover:shadow-pink-500/50 transition"
      >
        View My Work
      </motion.a>
    </section>
  );
}
