"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zen_Tokyo_Zoo } from "next/font/google";

const zenTokyoZooFont = Zen_Tokyo_Zoo({ weight: "400", subsets: ["latin"] });

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3600); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  const name = "KHAN".split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
          initial={{ clipPath: "circle(100% at 50% 50%)" }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{ backgroundColor: "black" }}
        >
          <div className="flex gap-6">
            {name.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }} // <-- start invisible
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.5, 0.8],
                }}
                transition={{
                  delay: i * 0.192,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: (name.length - 1) * 0.192,
                  ease: "easeInOut",
                }}
                className={`${zenTokyoZooFont.className} text-5xl md:text-7xl font-bold text-white`}
                style={{
                  textShadow:
                    "0 0 25px rgba(252, 211, 77, 1), 0 0 50px rgba(252, 211, 77, 0.8)",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
