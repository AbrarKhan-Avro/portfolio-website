"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorSize, setCursorSize] = useState(24);
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [ripples, setRipples] = useState([]); // store active ripples

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);

    const hoverStart = () => {
      setIsHovering(true);
      setCursorSize(40);
    };
    const hoverEnd = () => {
      setIsHovering(false);
      setCursorSize(24);
    };

    const textStart = () => {
      setIsText(true);
      setCursorSize(12);
    };
    const textEnd = () => {
      setIsText(false);
      setCursorSize(isHovering ? 40 : 24);
    };

    const handleClick = (e) => {
      const id = Date.now();
      const x = e.clientX;
      const y = e.clientY;
      setRipples((prev) => [...prev, { id, x, y }]);

      // Remove ripple after animation finishes (500ms)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    const hoverables = document.querySelectorAll("a, button, .hoverable");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", hoverStart);
      el.addEventListener("mouseleave", hoverEnd);
    });

    const texts = document.querySelectorAll("input, textarea, [contenteditable='true']");
    texts.forEach((el) => {
      el.addEventListener("mouseenter", textStart);
      el.addEventListener("mouseleave", textEnd);
    });

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
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
      {/* Outer big glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full bg-purple-500/5 blur-[120px] z-[9998]"
        style={{
          width: 400,
          height: 400,
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Inner glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full bg-purple-400/10 blur-[60px] mix-blend-lighten z-[9999]"
        style={{
          width: 150,
          height: 150,
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full mix-blend-difference bg-white z-[10000]"
        style={{
          width: cursorSize,
          height: cursorSize,
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
          scale: isText ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed top-0 left-0 rounded-full border border-purple-400 z-[9999]"
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 0, scale: 5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: 30,
            height: 30,
            translateX: ripple.x,
            translateY: ripple.y,
            x: "-50%",
            y: "-50%",
          }}
        />
      ))}
    </>
  );
}
