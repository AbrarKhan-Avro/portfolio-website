"use client";

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Creative Portfolio",
    description:
      "An interactive portfolio showcasing animations, motion design, and responsive layouts.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    link: "#",
  },
  {
    title: "E-commerce Dashboard",
    description:
      "A sleek dashboard with charts, filters, and analytics for modern online stores.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
    link: "#",
  },
  {
    title: "AI Chatbot App",
    description:
      "Conversational AI interface built with Next.js and OpenAI APIs.",
    image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c5?w=800",
    link: "#",
  },
];

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

  const rotateX = useTransform(y, [0, viewport.height || 1], [8, -8]);
  const rotateY = useTransform(x, [0, viewport.width || 1], [-8, 8]);

  return (
    <motion.section
      ref={ref}
      id="projects"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen bg-zinc-800 px-6 py-24 flex flex-col items-center overflow-hidden"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        <motion.h2 variants={fadeVariant} className="text-4xl font-bold text-white mb-12">
          My Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-zinc-900 hover:bg-zinc-700 transition-all duration-500"
              variants={fadeVariant}
              transition={{ delay: index * 0.2 }}
            >
              <div className="overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>

              <motion.div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white text-lg font-medium transition-opacity duration-500"
                whileHover={{ scale: 1.05 }}
              >
                View Project →
              </motion.div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
