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
import SparkText from "./SparkText"; // add near top with other imports
import ProjectCards from "./ProjectCards"; // add this near top


export default function Projects() {
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

  // Prevent NaN issues before viewport is ready
  const rotateX = useTransform(y, [0, viewport.height || 1], [8, -8]);
  const rotateY = useTransform(x, [0, viewport.width || 1], [-8, 8]);

  // Smooth motion with spring
  const smoothX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="projects"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col items-center overflow-hidden px-6 py-24 transition-colors duration-700"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-200 to-orange-300 dark:from-amber-950 dark:via-yellow-700 dark:to-orange-900 -z-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "300% 300%", filter: "blur(60px)" }}
      />

      {/* Foreground with depth perspective */}
      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
          }}
          className="flex flex-col items-center w-full"
        >
          <motion.h2
            variants={fadeVariant}
            className="font-lobster text-4xl font-bold text-zinc-900 dark:text-white mb-12"
          >
            <SparkText text="My Projects" />
          </motion.h2>
          
          <motion.div variants={fadeVariant}>
            <ProjectCards />
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}
