"use client";

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorSize, setCursorSize] = useState(24); // default size
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - cursorSize / 2);
      cursorY.set(e.clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", moveCursor);

    const hoverStart = () => {
      setIsHovering(true);
      setCursorSize(40); // expand for buttons/links
    };
    const hoverEnd = () => {
      setIsHovering(false);
      setCursorSize(24); // back to default
    };

    const textStart = () => {
      setIsText(true);
      setCursorSize(12); // shrink for text
    };
    const textEnd = () => {
      setIsText(false);
      setCursorSize(isHovering ? 40 : 24); // respect hover state
    };

    // hoverable elements
    const hoverables = document.querySelectorAll("a, button, .hoverable");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", hoverStart);
      el.addEventListener("mouseleave", hoverEnd);
    });

    // text/input elements
    const texts = document.querySelectorAll("input, textarea, [contenteditable='true']");
    texts.forEach((el) => {
      el.addEventListener("mouseenter", textStart);
      el.addEventListener("mouseleave", textEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", hoverStart);
        el.removeEventListener("mouseleave", hoverEnd);
      });
      texts.forEach((el) => {
        el.removeEventListener("mouseenter", textStart);
        el.removeEventListener("mouseleave", textEnd);
      });
    };
  }, [cursorSize, isHovering]);

  return (
    <>
      {/* Outer glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-12 h-12 rounded-full bg-purple-500/20 mix-blend-lighten blur-lg z-[9999]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full mix-blend-difference z-[9999] bg-white/80"
        style={{
          width: cursorSize,
          height: cursorSize,
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
