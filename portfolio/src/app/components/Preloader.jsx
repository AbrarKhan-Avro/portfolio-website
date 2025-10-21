"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Bitcount_Grid_Single } from "next/font/google";

const bitcountFont = Bitcount_Grid_Single({ weight: "400", subsets: ["latin"] });

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3600); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  const name = "ABRAR KHAN".split("");

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
          style={{ backgroundColor: "black" }} // stays solid black
        >
          <div className="flex gap-6">
            {name.map((letter, i) => (
              <motion.span
                key={i}
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
                className={`${bitcountFont.className} text-5xl md:text-7xl font-bold text-white`}
                style={{
                  textShadow:
                    "0 0 25px rgba(168, 85, 247, 1), 0 0 50px rgba(168, 85, 247, 0.8)",
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
