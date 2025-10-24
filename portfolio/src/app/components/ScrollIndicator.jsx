"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollIndicator() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY);
      setScrollHeight(document.body.scrollHeight);
      setWindowHeight(window.innerHeight);
      setVisible(true);
      clearTimeout(window.hideTimeout);
      window.hideTimeout = setTimeout(() => {
        if (!hovered) setVisible(false);
      }, 1000);
    };

    window.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);

    updateScroll(); // initial

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [hovered]);

  // Calculate thumb height and position
  const thumbHeight = Math.max((windowHeight / scrollHeight) * windowHeight, 30);
  const thumbY = (scrollY / (scrollHeight - windowHeight)) * (windowHeight - thumbHeight);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed right-2 top-0 h-screen w-2 flex justify-center z-[9999]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div
            className="w-1 rounded-full bg-purple-500/60"
            style={{
              height: thumbHeight,
              y: thumbY,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
