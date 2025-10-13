"use client";

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

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
      id="about"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-900 px-6 py-24 overflow-hidden transition-colors duration-500"
    >
      {/* Parallax foreground */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center relative z-10"
      >
        {/* Left: Photo */}
        <motion.div variants={fadeVariant} className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500"
            alt="Abrar Khan"
            className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover shadow-lg shadow-purple-500/20"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div variants={fadeVariant} transition={{ delay: 0.2 }} className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 text-zinc-900 dark:text-white">About Me</h2>
          <p className="text-zinc-700 dark:text-gray-400 leading-relaxed mb-4">
            Hello! I'm Abrar Khan — a web developer passionate about building interactive, beautiful, and functional
            digital experiences. My work blends creativity with technology — I love crafting interfaces that tell a
            story and feel alive.
          </p>
          <p className="text-zinc-700 dark:text-gray-400 leading-relaxed">
            When I’m not coding, I enjoy designing motion graphics, learning new tools, and exploring how technology
            can inspire emotion through design.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
