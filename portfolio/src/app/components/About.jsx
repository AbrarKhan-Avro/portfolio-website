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

  // 🔹 Typing effect for About paragraph
  const fullAboutText = `Hello! I'm Abrar Khan — a web developer with a love for turning imagination into interactive, beautiful, and functional digital experiences. I see the web as my playground — a place where design meets technology and ideas come alive through creativity, motion, and code. I enjoy building things that don’t just work well but also feel alive, engaging, and thoughtfully crafted.
\n
I’m a natural problem solver who enjoys thinking beyond the usual patterns and finding clever, out-of-the-box ways to bring ideas to life. I’m fueled by curiosity, creativity, and a never-give-up attitude — always ready to dive into new challenges and explore uncharted territory. Punctual, persistent, and full of imagination, I approach every project like an adventure — one that’s equal parts logic, artistry, and pure excitement.
\n
My journey into web development began with a spark of curiosity — one “what if I try this?” moment that turned into an endless exploration of creativity and code. What started as simple experiments soon grew into a passion for building things that connect, inspire, and tell stories through interactivity.
\n
Right now, I’m fascinated by the world of 3D and immersive web experiences — pushing beyond flat screens to create spaces that feel dynamic and alive. I love finding ways to blend storytelling with technology, where each click or scroll reveals something unexpected and delightful.
\n
When I’m not deep in code, I’m usually sketching ideas, watching creative films, or exploring design inspirations that spark new directions. I’m endlessly curious about how imagination and technology can work together — and I’m always chasing that next “aha!” moment where everything just clicks.`;
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (!inView) return; // only type when visible

    setAboutText(""); // reset text
    let i = 0;

    const typingInterval = setInterval(() => {
      setAboutText(fullAboutText.slice(0, i + 1));
      i++;
      if (i === fullAboutText.length) clearInterval(typingInterval);
    }, 15); // typing speed

    return () => clearInterval(typingInterval);
  }, [inView, fullAboutText]);

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

            <div className="scrollbox max-h-[350px] overflow-y-auto pr-3 relative">
              <p className="text-zinc-700 dark:text-gray-300 leading-relaxed">
                {aboutText}
                <span className="typing-cursor">█</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
