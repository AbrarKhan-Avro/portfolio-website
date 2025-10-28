"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";
import "./footer.css";

export default function Footer() {
  useEffect(() => {
    // Decode animation script
    function decodeText() {
      const text = document.querySelector(".decode-text");
      if (!text) return;

      const state = [];
      for (let i = 0; i < text.children.length; i++) {
        text.children[i].classList.remove("state-1", "state-2", "state-3");
        state[i] = i;
      }

      const shuffled = shuffle(state);
      for (let i = 0; i < shuffled.length; i++) {
        const child = text.children[shuffled[i]];
        const classes = child.classList;
        const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
        if (classes.contains("text-animation")) {
          setTimeout(() => firstStages(child), state1Time);
        }
      }
    }

    function firstStages(child) {
      if (child.classList.contains("state-2")) {
        child.classList.add("state-3");
      } else if (child.classList.contains("state-1")) {
        child.classList.add("state-2");
      } else if (!child.classList.contains("state-1")) {
        child.classList.add("state-1");
        setTimeout(() => secondStages(child), 100);
      }
    }

    function secondStages(child) {
      if (child.classList.contains("state-1")) {
        child.classList.add("state-2");
        setTimeout(() => thirdStages(child), 100);
      } else if (!child.classList.contains("state-1")) {
        child.classList.add("state-1");
      }
    }

    function thirdStages(child) {
      if (child.classList.contains("state-2")) {
        child.classList.add("state-3");
      }
    }

    function shuffle(array) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    decodeText();
    const interval = setInterval(decodeText, 5000);
    return () => clearInterval(interval);
  }, []);

  // Split your paragraph text into spans
  const footerText = "© " + new Date().getFullYear() + " Abrar Khan — All Rights Reserved";

  return (
    <footer className="bg-gray-300 dark:bg-zinc-950 py-10 text-amber-600 dark:text-amber-300 text-center border-t border-gray-300 dark:border-zinc-800 transition-colors duration-500">
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
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors icon-wobble"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors icon-wobble"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:your@email.com"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors icon-wobble"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* 👇 Decode Animation Paragraph */}
        <p className="text-sm decode-text">
          {footerText.split("").map((char, i) =>
            char === " " ? (
              <span key={i} className="space"></span>
            ) : (
              <span key={i} className="text-animation">
                {char}
              </span>
            )
          )}
        </p>
      </motion.div>
    </footer>
  );
}
