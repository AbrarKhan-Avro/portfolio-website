"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SPRING_CONFIG = { damping: 100, stiffness: 400 };
const MAGNET_RADIUS = 300;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  // Show/hide button on scroll
  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Magnetic movement (plain JS event typing — no TypeScript annotations)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < MAGNET_RADIUS && isHovered) {
        x.set(dx * 0.8); // pull strength
        y.set(dy * 0.8);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, x, y]);

  if (!visible) return null;

  return (
    <motion.button
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 100)}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        x: springX,
        y: springY,
        rotate: springX.get() / 20,
        scale: isHovered ? 1.1 : 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition
        bg-amber-600 hover:bg-amber-800 text-white
        dark:bg-amber-300 dark:hover:bg-amber-500 dark:text-zinc-900
      "
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}
