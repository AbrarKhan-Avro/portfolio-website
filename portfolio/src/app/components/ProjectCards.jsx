// ProjectCards.jsx
import { useEffect, useRef, useState } from "react";
import "./ProjectCards.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// sample projects (10)
const allProjects = [
  { title: "Creative Portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200", link: "#" },
  { title: "E-commerce Dashboard", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200", link: "#" },
  { title: "AI Chatbot App", image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c5?w=1200", link: "#" },
  { title: "Data Visualization", image: "https://images.unsplash.com/photo-1610212570473-6015f631ae96?w=1200", link: "#" },
  { title: "Creative Web Design", image: "https://images.unsplash.com/photo-1603048675767-6e79ff5b8fc1?w=1200", link: "#" },
  { title: "Marketing Analytics", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", link: "#" },
  { title: "Finance Dashboard", image: "https://images.unsplash.com/photo-1612831817884-5241c0f0b9ef?w=1200", link: "#" },
  { title: "Game Landing Page", image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200", link: "#" },
  { title: "3D Product Showcase", image: "https://images.unsplash.com/photo-1602526218560-74e07d1d8f61?w=1200", link: "#" },
  { title: "Portfolio Revamp", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200", link: "#" },
];

export default function ProjectCards() {
  const CARDS_PER_PAGE = 5;
  const FLIP_MS = 800; // total flip duration (ms) — keep this same in CSS
  const MID_MS = FLIP_MS / 2;
  const totalPages = Math.ceil(allProjects.length / CARDS_PER_PAGE);

  const [page, setPage] = useState(0);
  const [rotated, setRotated] = useState(false); // false => showing frontContent, true => showing backContent
  const [frontContent, setFrontContent] = useState(() => getPage(0));
  const [backContent, setBackContent] = useState(() => getPage(1 % totalPages));
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  const timeoutRef = useRef(null);

  // helpers
  function getPage(p) {
    const start = ((p % totalPages) + totalPages) % totalPages * CARDS_PER_PAGE;
    return allProjects.slice(start, start + CARDS_PER_PAGE);
  }

  // Start a flip. dir: "next" or "prev" or numeric target page
  function flipTo(dirOrPage) {
    if (isAnimating) return;

    const dir =
      dirOrPage === "next" || dirOrPage === "prev"
        ? dirOrPage
        : typeof dirOrPage === "number" && dirOrPage !== page
        ? dirOrPage > page
          ? "next"
          : "prev"
        : null;
    if (!dir) return;

    const target =
      dir === "next" ? (page + 1) % totalPages : (page - 1 + totalPages) % totalPages;

    // prepare the *hidden* face with the target page content
    if (!rotated) {
      // front is visible, prepare back with target
      setBackContent(getPage(target));
    } else {
      // back is visible, prepare front with target
      setFrontContent(getPage(target));
    }

    setIsAnimating(true);

    // trigger rotation: toggle rotated class after a tiny delay so styles settle
    // We toggle rotated to animate from current visible face to the other face.
    // The face that was prepared above will be revealed at MIDPOINT visually.
    requestAnimationFrame(() => {
      // start transform
      setRotated((r) => !r);
    });

    // At midpoint, we consider content "swapped" logically — but because we preloaded faces,
    // visual swap already shows target content (no DOM replace required).
    // After full animation, we update canonical 'page' and also move content so next flip can prepare correctly.
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      // animation finished
      setPage(target);

      // normalize content arrays so frontContent always matches the visible face (rotated state)
      if (!rotated) {
        // we toggled rotated to true above; now visible is backContent -> make frontContent reflect current page
        setFrontContent(getPage(target));
        // backContent can remain (it will be overwritten when preparing next flip)
      } else {
        // we toggled rotated to false above; now visible is frontContent -> make backContent reflect current page
        setBackContent(getPage(target));
      }

      setIsAnimating(false);
    }, FLIP_MS);
  }

  // click behavior: only active card opens link; others just activate
  function handlePanelClick(i, link) {
    if (isAnimating) return;
    if (i !== activeIndex) {
      setActiveIndex(i);
      return;
    }
    // active clicked -> small bounce then open
    setClickedIndex(i);
    setTimeout(() => {
      setClickedIndex(null);
      if (link) window.open(link, "_blank", "noopener,noreferrer");
    }, 160);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // choose which dataset is visible for rendering faces:
  // front face shows frontContent, back face shows backContent.
  const front = frontContent;
  const back = backContent;

  // clamp active index if needed
  const clampActive = (idx, arr) => Math.min(idx, Math.max(0, arr.length - 1));
  const active = clampActive(activeIndex, front);

  return (
    <div className="project-cards-wrapper">
      <div className="project-cards-container">
        {front.map((card, i) => {
          // show front[i] on face-front, back[i] on face-back
          const frontCard = front[i] || { title: "", image: "", link: "#" };
          const backCard = back[i] || { title: "", image: "", link: "#" };
          const isActive = i === active;

          // compute classes
          const innerClasses = ["card-inner"];
          if (rotated) innerClasses.push("rotated"); // rotated true => showing back face
          if (isAnimating) innerClasses.push("animating");
          if (clickedIndex === i) innerClasses.push("clicked");

          return (
            <div
              key={i}
              className={`panel ${isActive ? "active" : ""}`}
              onClick={() => handlePanelClick(i, frontCard.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePanelClick(i, frontCard.link);
              }}
              aria-pressed={isActive}
            >
              <div
                className={innerClasses.join(" ")}
                style={{ transitionDuration: `${FLIP_MS}ms` }}
              >
                <div
                  className="card-face card-front"
                  style={{ backgroundImage: `url(${frontCard.image})` }}
                >
                  <h3>{frontCard.title}</h3>
                </div>

                <div
                  className="card-face card-back"
                  style={{ backgroundImage: `url(${backCard.image})` }}
                >
                  <h3>{backCard.title}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav">
        <button
          className="nav-btn"
          onClick={() => flipTo("prev")}
          aria-label="Previous projects"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="indicator-dots" aria-hidden={isAnimating}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i === page ? "active" : ""}`}
              onClick={() => flipTo(i > page ? "next" : "prev")}
              role="button"
              tabIndex={0}
            />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={() => flipTo("next")}
          aria-label="Next projects"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
