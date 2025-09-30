"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-[90vh] flex flex-col justify-center items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
      >
        Hi, I’m Your Name
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 text-lg md:text-2xl text-gray-400 max-w-2xl"
      >
        I build modern, interactive websites that are smooth and engaging.
      </motion.p>
      <motion.a
        href="/projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-500 transition"
      >
        View My Work
      </motion.a>
    </section>
  );
}
