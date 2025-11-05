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
import WaveText from "./WaveText";


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
        className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-100 to-fuchsia-300 dark:from-purple-900 dark:via-pink-700 dark:to-fuchsia-950"
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
          <br />
          <br />
          <WaveText
            text="Abrar's Webspace"
            className="relative z-10 font-lobster text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-500 dark:to-red-400"
          />
          <br />
          <motion.div
            variants={fadeVariant}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
          >
            <div className="flex items-center justify-center">
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
                speed={30}
                repeat={Infinity}
                cursor={false} // disable the default "|"
              />
              <span className="custom-cursor ml-1">_</span>

              <style jsx>{`
                .custom-cursor {
                  color: #ff9900;
                  animation: blink 1s infinite;
                }

                :global(.dark) .custom-cursor {
                  color: #ffeb3b;
                }


                @keyframes blink {
                  0%, 50%, 100% { opacity: 1; }
                  25%, 75% { opacity: 0; }
                }
              `}</style>
            </div>
          </motion.div>
            <motion.a
              variants={fadeVariant}
              href="#projects"
              className="relative group w-[200px] h-[60px] mt-2"
              whileTap={{ scale: 0.9 }}
            >
              {/* 3D Flip Button CSS */}
              <style global jsx>{`
                .flip-btn {
                  position: relative;
                  width: 200px;
                  height: 60px;
                  transform-style: preserve-3d;
                  transform: perspective(1000px) rotateX(0deg);
                  transition: transform 4s;
                }

                .flip-btn:hover {
                  transform: perspective(1000px) rotateX(360deg);
                }

                .flip-btn span {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #000;
                  background: rgb(255, 153, 0, 1);
                  text-transform: uppercase;
                  font-size: 18px;
                  letter-spacing: 2px;
                  border: 2px solid #000;
                  box-sizing: border-box;
                  transition: 0.5s;
                  border-radius: 0.75rem; /* Slight rounding for smooth corners */
                  box-shadow: inset 0 20px 50px rgba(0, 0, 0, 0.2);
                }

                .dark .flip-btn span {
                  background: rgb(255, 235, 59, 1);
                }

                .flip-btn:hover span {
                  color: #fff;
                  background: rgb(255, 173, 51, 0.6);
                  border-color: #332d00;
                }

                .dark .flip-btn:hover span {
                  background: rgb(255, 240, 102, 0.6);
                }

                .flip-btn span:nth-child(1) {
                  transform: rotateX(360deg) translateZ(30px);
                }
                .flip-btn span:nth-child(2) {
                  transform: rotateX(270deg) translateZ(30px);
                }
                .flip-btn span:nth-child(3) {
                  transform: rotateX(180deg) translateZ(30px);
                }
                .flip-btn span:nth-child(4) {
                  transform: rotateX(90deg) translateZ(30px);
                }
              `}</style>

              <div className="flip-btn">
                <span>View My Work</span>
                <span>View My Work</span>
                <span>View My Work</span>
                <span>View My Work</span>
              </div>
            </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="hoverable absolute bottom-10 text-gray-400 text-3xl z-10 cursor-pointer"
        animate={{ 
          y: [0, 15, 0],       // bounce
          opacity: [0.6, 1, 0.6], // fade in/out
          scale: [1, 1.2, 1],   // subtle pulsing
          textShadow: [
            "0 0 0px rgba(255,255,255,0)", 
            "0 0 15px rgba(255,255,255,0.7)", 
            "0 0 0px rgba(255,255,255,0)"
          ]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: [1.2, 1.5, 1.2, 1.5, 1.2], color: "#fcd34d", textShadow: "0 0 20px #fcd34d", transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } }}
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
      >
        <FiChevronDown />
      </motion.div>

    </motion.section>
  );
}
