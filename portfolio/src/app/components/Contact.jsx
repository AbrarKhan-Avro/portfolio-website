"use client";

import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import "./ContactTitleEffect.css";
import SpotlightButton from "./SpotlightButton";
import emailjs from "@emailjs/browser";

const reloadKey = Date.now();

export default function Contact() {
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

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Updated handleSubmit (EmailJS)
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_6tki80p",
        "template_ke7ckdk",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "xl_aOxFCFiXAvkl8Y"
      )
      .then(() => {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
      });
  };

  // 🔹 Typing effect setup
  const fullText =
    "Have a project in mind, or just want to say hello? Fill out the form below — I’d love to hear from you.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload || inView) {
      setDisplayText("");
      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) clearInterval(typingInterval);
      }, 25);

      return () => clearInterval(typingInterval);
    }
  }, [inView, fullText]);

  // Parallax Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [viewport, setViewport] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth || 1,
        height: window.innerHeight || 1,
      });
    };
    updateViewport();

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      x.set(t.clientX);
      y.set(t.clientY);
    };

    window.addEventListener("resize", updateViewport);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [x, y]);

  const rotateX = useTransform(y, [0, viewport.height || 1], [8, -8]);
  const rotateY = useTransform(x, [0, viewport.width || 1], [-8, 8]);
  const smoothX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  return (
    <motion.section
      key={reloadKey}
      ref={ref}
      id="contact"
      variants={fadeVariant}
      initial="hidden"
      animate={controls}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden transition-colors duration-700"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-300 via-emerald-100 to-lime-300 dark:from-green-950 dark:via-emerald-700 dark:to-lime-900 -z-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "300% 300%", filter: "blur(60px)" }}
      />

      <div
        className="relative z-10 flex flex-col items-center w-full max-w-md"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="w-full"
        >
          <motion.h2
            variants={fadeVariant}
            className="font-lobster text-4xl font-bold mb-8 text-zinc-900 dark:text-white transition-colors duration-500"
          >
            <span
              className="get-in-touch-hover"
              aria-hidden="false"
              role="text"
            >
              {"Get In Touch".split("").map((ch, i) => (
                <span
                  key={i}
                  className="cth-letter"
                  data-char={ch}
                  tabIndex={0}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </motion.h2>

          {/* 🔹 Typing effect applied here */}
          <motion.p
            variants={fadeVariant}
            transition={{ delay: 0.1 }}
            className="text-zinc-700 dark:text-gray-400 text-center mb-10 transition-colors duration-500"
          >
            {displayText}
            <span className="typing-cursor">|</span>
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            variants={fadeVariant}
            transition={{ delay: 0.2 }}
            className="w-full space-y-5"
          >
            <div>
              <label className="block text-zinc-700 dark:text-gray-400 mb-1 transition-colors duration-500">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-gray-400 mb-1 transition-colors duration-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-gray-400 mb-1 transition-colors duration-500">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 resize-none"
              />
            </div>

            <SpotlightButton
              onClick={handleSubmit}
              formValid={form.name && form.email && form.message}
            />
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
}
