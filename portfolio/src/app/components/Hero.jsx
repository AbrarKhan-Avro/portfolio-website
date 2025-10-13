"use client";

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  // Scroll-triggered fade in/out
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const fadeVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Parallax motion
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
      ref={ref}
      id="hero"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-white dark:bg-black transition-colors duration-500 px-4"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-white dark:from-purple-900/20 dark:to-black"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
      />

      {/* Floating blurred orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute w-[400px] h-[400px] bg-pink-300/10 dark:bg-pink-500/10 rounded-full blur-3xl top-[30%] left-[15%]"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      ></motion.div>

      {/* Foreground content with 3D parallax */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          variants={fadeVariant}
          className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-500 dark:to-red-400"
        >
          Abrar Khan
        </motion.h1>

        <motion.div
          variants={fadeVariant}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
        >
          <TypeAnimation
            sequence={["Web Developer", 2000, "Designer", 2000, "Storyteller", 2000]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
          />
        </motion.div>

        <motion.a
          variants={fadeVariant}
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium shadow-lg hover:shadow-pink-500/50 transition"
        >
          View My Work
        </motion.a>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 text-gray-400 text-3xl"
      >
        <FiChevronDown />
      </motion.div>
    </motion.section>
  );
}
