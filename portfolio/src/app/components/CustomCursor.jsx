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
  const [ripples, setRipples] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile devices or small screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Skip cursor setup entirely on mobile
  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("pointermove", moveCursor, { passive: true });

    const hoverStart = () => setIsHovering(true);
    const hoverEnd = () => setIsHovering(false);

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
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, pointer, .hoverable");
      if (target) hoverStart();
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, pointer, .hoverable");
      if (target) hoverEnd();
    };

    const handleTextOver = (e) => {
      const target = e.target.closest("input, textarea, [contenteditable='true']");
      if (target) textStart();
    };

    const handleTextOut = (e) => {
      const target = e.target.closest("input, textarea, [contenteditable='true']");
      if (target) textEnd();
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseover", handleTextOver);
    window.addEventListener("mouseout", handleTextOut);

    window.addEventListener("click", handleClick);
    window.addEventListener("pointerdown", handleMouseDown);
    window.addEventListener("pointerup", handleMouseUp);
    window.addEventListener("pointercancel", handleMouseUp);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("pointerup", handleMouseUp);
      window.removeEventListener("pointercancel", handleMouseUp);

      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseover", handleTextOver);
      window.removeEventListener("mouseout", handleTextOut);
    };
  }, [cursorX, cursorY, cursorSize, isHovering, isMobile]);

  useEffect(() => {
    if (!isMobile) setCursorSize(isHovering ? 40 : 24);
  }, [isHovering, isMobile]);

  // ✅ If on mobile, render nothing
  if (isMobile) return null;

  return (
    <>
      {/* Outer big glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full bg-amber-800/10 dark:bg-amber-200/10 blur-[120px] z-[9998]"
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
        className="pointer-events-none fixed top-0 left-0 rounded-full bg-amber-900/20 dark:bg-amber-300/10 blur-[60px] mix-blend-lighten z-[9999]"
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

      {/* Click-hold ring */}
      {isClicking && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 rounded-full border border-amber-600 dark:border-amber-300 z-[10001]"
          style={{
            width: cursorSize * 2,
            height: cursorSize * 2,
            translateX: cursorXSpring,
            translateY: cursorYSpring,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            opacity: 0.8,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed top-0 left-0 rounded-full border border-amber-600 dark:border-amber-300 z-[9999]"
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
