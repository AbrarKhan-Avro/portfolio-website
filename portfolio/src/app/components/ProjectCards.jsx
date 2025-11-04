// ProjectCards.jsx
import { useEffect, useRef, useState } from "react";
import "./ProjectCards.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// sample projects (10)
const allProjects = [
  { title: "Creative Portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200", link: "#" },
  { title: "E-commerce Dashboard", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200", link: "#" },
  { title: "AI Chatbot App", image: "https://images.pexels.com/photos/11813187/pexels-photo-11813187.jpeg?_gl=1*176u2qo*_ga*MzQyMjkxMzkwLjE3NjEzODMxNjE.*_ga_8JE65Q40S6*czE3NjIyMTcwNzQkbzMkZzEkdDE3NjIyMTg1MDUkajYwJGwwJGgw", link: "#" },
  { title: "Data Visualization", image: "https://images.unsplash.com/photo-1610212570473-6015f631ae96?w=1200", link: "#" },
  { title: "Creative Web Design", image: "https://images.unsplash.com/photo-1603048675767-6e79ff5b8fc1?w=1200", link: "#" },
  { title: "Marketing Analytics", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", link: "#" },
  { title: "Finance Dashboard", image: "https://images.pexels.com/photos/5424636/pexels-photo-5424636.jpeg?_gl=1*hfhs0c*_ga*MzQyMjkxMzkwLjE3NjEzODMxNjE.*_ga_8JE65Q40S6*czE3NjIyMTcwNzQkbzMkZzEkdDE3NjIyMTg2MDckajUwJGwwJGgw", link: "#" },
  { title: "Game Landing Page", image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200", link: "#" },
  { title: "3D Product Showcase", image: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?_gl=1*106r1lk*_ga*MzQyMjkxMzkwLjE3NjEzODMxNjE.*_ga_8JE65Q40S6*czE3NjIyMTcwNzQkbzMkZzEkdDE3NjIyMTg2NDIkajE1JGwwJGgw", link: "#" },
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

          // number of half-turns: card 1 -> 1, card 2 -> 2, ...
          const flips = i + 1;

          // degrees to rotate for this card
          const degrees = 180 * flips;

          // Angular-speed constant: base time per single half-turn (FLIP_MS)
          // total duration for this card = FLIP_MS * flips
          const durationMs = FLIP_MS * flips;

          // compute transform when rotated (vertical for active, horizontal otherwise)
          const rotatedTransform = isActive
            ? `rotateX(${degrees}deg)`
            : `rotateY(${degrees}deg)`;

          // when not rotated show identity (no rotation)
          const normalTransform = "rotateY(0deg)";

          // compute classes
          const innerClasses = ["card-inner"];
          if (rotated) {
            // note: we keep classes for styling, but actual degrees are applied inline
            if (isActive) innerClasses.push("rotated-vertical");
            else innerClasses.push("rotated-horizontal");
          }
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
                // inline style controls BOTH transform and transition duration per-card
                style={{
                  transitionDuration: `${durationMs}ms`,
                  transitionProperty: "transform, box-shadow, filter",
                  transform: rotated ? rotatedTransform : normalTransform,
                }}
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
