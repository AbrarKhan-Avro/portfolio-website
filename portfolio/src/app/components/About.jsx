"use client";

import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Cube from "./Cube"; // 👈 import the cube component

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const fadeVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateViewport);
    };
  }, [x, y]);

  // Prevent divide-by-zero when viewport isn't ready
  const rotateX = useTransform(y, [0, viewport.height || 1], [10, -10]);
  const rotateY = useTransform(x, [0, viewport.width || 1], [-10, 10]);

  // Smooth spring motion
  const smoothX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="about"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden transition-colors duration-700 px-6 py-24"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-300 via-teal-100 to-cyan-300 dark:from-blue-950 dark:via-cyan-700 dark:to-teal-950 -z-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "300% 300%", filter: "blur(60px)" }}
      />

      {/* Content Wrapper with perspective for depth */}
      <div
        className="relative z-10 max-w-6xl w-full"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
          }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={fadeVariant} className="flex justify-center">
            <Cube />
          </motion.div>

          <motion.div
            variants={fadeVariant}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h2 className="font-lobster text-4xl font-bold mb-6 relative inline-block group select-none">
              <span className="base-text text-zinc-900 dark:text-white">About Me</span>
              <span className="absolute inset-0 z-30 clip-top pointer-events-none transition-transform duration-500 ease-in-out group-hover:-translate-y-3 text-zinc-900 dark:text-white">
                About Me
              </span>
              <span className="absolute inset-0 z-30 clip-bottom pointer-events-none transition-transform duration-500 ease-in-out group-hover:translate-y-3 text-zinc-900 dark:text-white">
                About Me
              </span>
              <span className="absolute left-0 top-1/2 w-full z-20 reveal origin-center transition-transform duration-500 ease-in-out">
                Abrar Khan
              </span>
            </h2>

            <p className="text-zinc-700 dark:text-gray-400 leading-relaxed mb-4">
              Hello! I'm <span className="font-semibold">Abrar Khan</span> — a
              web developer passionate about crafting interactive, beautiful,
              and functional digital experiences. I love combining design and
              technology to bring ideas to life with a touch of creativity and
              precision.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
