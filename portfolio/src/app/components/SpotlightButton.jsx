import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SpotlightButton = ({ onClick, formValid }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [error, setError] = useState(false);

  // Spotlight movement logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;
      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate({ left: "50%" }, { duration: 150, fill: "forwards" });
    };

    const btn = btnRef.current;
    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Handle click — flip if valid, shake if invalid
  const handleClick = (e) => {
    e.preventDefault();
    if (!formValid) {
      // Trigger shake + red flash
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    if (onClick) onClick(e);
    setFlipped(true);
    setTimeout(() => setFlipped(false), 10000); // Stay flipped for 10s
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      type="submit"
      whileTap={{ scale: 0.8 }}
      animate={
        error
          ? {
              x: [0, -10, 10, -8, 8, -5, 5, 0],
              backgroundColor: ["#000000", "#ff0000", "#000000"],
            }
          : { x: 0, backgroundColor: "#000000" }
      }
      transition={{ duration: error ? 0.6 : 0.3 }}
      className="relative w-full py-5 rounded-lg overflow-hidden font-semibold text-lg text-black"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Flip text animation */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <span
          className="absolute inset-0 flex items-center justify-center backface-hidden mix-blend-difference"
          style={{ backfaceVisibility: "hidden" }}
        >
          Send Message
        </span>

        {/* Back side */}
        <span
          className="absolute inset-0 flex items-center justify-center mix-blend-difference"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          Message Sent!
        </span>
      </motion.div>

      {/* Spotlight */}
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-gray-300 dark:bg-[#ffeb3b]"
      />
    </motion.button>
  );
};

export default SpotlightButton;
