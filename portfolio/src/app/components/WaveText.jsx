"use client";

import { motion } from "framer-motion";

export default function WaveText({ text, className = "" }) {
  return (
    <h1 className={`flex justify-center ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block text-white"
          style={{ display: "inline-block" }}
          animate={{ y: ["0%", "-20%", "0%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}
