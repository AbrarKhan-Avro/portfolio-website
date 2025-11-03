// ProjectCards.jsx
import { useState, useRef, useEffect } from "react";
import "./ProjectCards.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allProjects = [
  { title: "Creative Portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", link: "#" },
  { title: "E-commerce Dashboard", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800", link: "#" },
  { title: "AI Chatbot App", image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c5?w=800", link: "#" },
  { title: "Data Visualization", image: "https://images.unsplash.com/photo-1610212570473-6015f631ae96?auto=format&fit=crop&w=1350&q=80", link: "#" },
  { title: "Creative Web Design", image: "https://images.unsplash.com/photo-1603048675767-6e79ff5b8fc1?auto=format&fit=crop&w=1350&q=80", link: "#" },
  { title: "Marketing Analytics", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80", link: "#" },
  { title: "Finance Dashboard", image: "https://images.unsplash.com/photo-1612831817884-5241c0f0b9ef?auto=format&fit=crop&w=1350&q=80", link: "#" },
  { title: "Game Landing Page", image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1350&q=80", link: "#" },
  { title: "3D Product Showcase", image: "https://images.unsplash.com/photo-1602526218560-74e07d1d8f61?auto=format&fit=crop&w=1350&q=80", link: "#" },
  { title: "Portfolio Revamp", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1350&q=80", link: "#" },
];

export default function ProjectCards() {
  const CARDS_PER_PAGE = 5;
  const FLIP_DURATION = 700; // ms
  const MIDPOINT = FLIP_DURATION / 2;
  const totalPages = Math.ceil(allProjects.length / CARDS_PER_PAGE);

  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const flipTimeout = useRef(null);
  const swapTimeout = useRef(null);

  const start = page * CARDS_PER_PAGE;
  const visibleProjects = allProjects.slice(start, start + CARDS_PER_PAGE);

  const clampIndex = (idx, arr) => Math.min(idx, Math.max(0, arr.length - 1));

  const flipPage = (newPage) => {
    if (isFlipping) return;
    setIsFlipping(true);

    clearTimeout(swapTimeout.current);
    clearTimeout(flipTimeout.current);

    swapTimeout.current = setTimeout(() => {
      setPage(newPage);
      setActiveIndex((prev) =>
        clampIndex(prev, allProjects.slice(newPage * CARDS_PER_PAGE, newPage * CARDS_PER_PAGE + CARDS_PER_PAGE))
      );
    }, MIDPOINT);

    flipTimeout.current = setTimeout(() => setIsFlipping(false), FLIP_DURATION);
  };

  const handleNext = () => flipPage((page + 1) % totalPages);
  const handlePrev = () => flipPage((page - 1 + totalPages) % totalPages);
  const handleDotClick = (i) => flipPage(i);

  const handleCardClick = (i, link) => {
    if (isFlipping) return;

    if (i !== activeIndex) {
      setActiveIndex(i);
    } else {
      setClickedIndex(i);
      setTimeout(() => {
        window.open(link, "_blank");
        setClickedIndex(null);
      }, 180);
    }
  };

  useEffect(() => () => {
    clearTimeout(flipTimeout.current);
    clearTimeout(swapTimeout.current);
  }, []);

  const startIdx = page * CARDS_PER_PAGE;
  const shown = allProjects.slice(startIdx, startIdx + CARDS_PER_PAGE);
  const clampedActive = clampIndex(activeIndex, shown);

  return (
    <div className="project-cards-wrapper">
      <div className={`project-cards-container ${isFlipping ? "is-flipping" : ""}`}>
        {shown.map((p, i) => (
          <div
            key={`${page}-${i}`}
            className={`panel ${clampedActive === i ? "active" : ""} ${isFlipping ? "flip" : ""} ${
              clickedIndex === i ? "clicked" : ""
            }`}
            style={{ backgroundImage: `url(${p.image})` }}
            onClick={() => handleCardClick(i, p.link)}
          >
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <button className="nav-btn" onClick={handlePrev}>
          <ChevronLeft size={32} />
        </button>

        <div className="indicator-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i === page ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>

        <button className="nav-btn" onClick={handleNext}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
