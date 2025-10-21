"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimation,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Hero() {
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateSize);
    };
  }, [x, y]);

  // Prevent divide by zero when viewport not ready
  const rotateX = useTransform(y, [0, viewport.height || 1], [10, -10]);
  const rotateY = useTransform(x, [0, viewport.width || 1], [-10, 10]);

  // Smooth motion
  const smoothX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="hero"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden transition-colors duration-700"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-300 to-rose-100 dark:from-purple-800 dark:via-fuchsia-900 dark:to-rose-950"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />

      {/* Foreground (with perspective and smooth tilt) */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          perspective: 1000, // Adds depth
        }}
      >
        <motion.div
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
          }}
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={fadeVariant}
            className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-500 dark:to-red-400"
          >
            Abrar Khan
          </motion.h1>

          <motion.div
            variants={fadeVariant}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
          >
            <TypeAnimation
              sequence={[
                "Web Developer",
                2000,
                "Designer",
                2000,
                "Storyteller",
                2000,
              ]}
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
      </div>

      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 text-gray-400 text-3xl z-10"
      >
        <FiChevronDown />
      </motion.div>
    </motion.section>
  );
}
