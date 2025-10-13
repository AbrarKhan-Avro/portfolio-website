"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-10 text-gray-400 text-center border-t border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:your@email.com"
            className="hover:text-white transition"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} Abrar Khan — All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
}
