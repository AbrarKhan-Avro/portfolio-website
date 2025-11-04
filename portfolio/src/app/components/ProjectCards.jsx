import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectCards.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allProjects = [
  {
    title: "Creative Portfolio",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    title: "E-commerce Dashboard",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
  },
  {
    title: "AI Chatbot App",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c5?w=800",
  },
  {
    title: "Data Visualization",
    image:
      "https://images.unsplash.com/photo-1610212570473-6015f631ae96?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Creative Web Design",
    image:
      "https://images.unsplash.com/photo-1603048675767-6e79ff5b8fc1?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Marketing Analytics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Finance Dashboard",
    image:
      "https://images.unsplash.com/photo-1612831817884-5241c0f0b9ef?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Game Landing Page",
    image:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "3D Product Showcase",
    image:
      "https://images.unsplash.com/photo-1602526218560-74e07d1d8f61?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Portfolio Revamp",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1350&q=80",
  },
];

export default function ProjectCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const CARDS_PER_PAGE = 5;
  const totalPages = Math.ceil(allProjects.length / CARDS_PER_PAGE);

  const start = page * CARDS_PER_PAGE;
  const visibleProjects = allProjects.slice(start, start + CARDS_PER_PAGE);

  const handleNext = () => {
    setDirection(1);
    setPage((prev) => (prev + 1) % totalPages);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
    setActiveIndex(0);
  };

  // Animation variants for sliding transition
  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  return (
    <div className="project-cards-wrapper">
      <div className="cards-animation-wrapper">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={page}
            className="project-cards-container"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {visibleProjects.map((p, i) => (
              <div
                key={i}
                className={`panel ${activeIndex === i ? "active" : ""}`}
                style={{ backgroundImage: `url(${p.image})` }}
                onClick={() => setActiveIndex(i)}
              >
                <h3>{p.title}</h3>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="bottom-controls">
        <button className="nav-btn bottom-left" onClick={handlePrev}>
          <ChevronLeft size={28} />
        </button>

        <div className="indicator-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i === page ? "active" : ""}`}
              onClick={() => {
                setDirection(i > page ? 1 : -1);
                setPage(i);
              }}
            ></span>
          ))}
        </div>

        <button className="nav-btn bottom-right" onClick={handleNext}>
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
