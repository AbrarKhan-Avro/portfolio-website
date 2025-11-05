import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectCards.css";
import PaginationSVG from "./PaginationSVG";

const allProjects = [
  {
    title: "Creative Portfolio",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    description:
      "A React-based personal portfolio showcasing creative work with motion and 3D visuals.",
    link: "https://example.com/creative-portfolio",
    showcase: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      "https://images.unsplash.com/photo-1509228627151-3cf2b39e0f7a?w=800"
    ]
  },
  {
    title: "E-commerce Dashboard",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
    description:
      "An interactive dashboard for tracking sales performance, customer data, and revenue analytics.",
    link: "https://example.com/ecommerce-dashboard",
    showcase: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
      "https://images.unsplash.com/photo-1557682250-9691d27a8d12?w=800",
      "https://images.unsplash.com/photo-1561414927-6d1f87b03d54?w=800"
    ]
  },
  {
    title: "AI Chatbot App",
    image:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c5?w=800",
    description:
      "An intelligent chatbot interface built with AI integration for seamless real-time conversations.",
    link: "https://example.com/ai-chatbot-app",
    showcase: [
      "https://images.unsplash.com/photo-1555617117-08f6f3a3dfc3?w=800",
      "https://images.unsplash.com/photo-1581091215362-2c2b46c07321?w=800",
      "https://images.unsplash.com/photo-1581091012184-5f7f4b6b55ff?w=800"
    ]
  },
  {
    title: "Data Visualization",
    image:
      "https://images.unsplash.com/photo-1610212570473-6015f631ae96?auto=format&fit=crop&w=1350&q=80",
    description:
      "A dynamic data visualization dashboard with interactive charts and real-time insights.",
    link: "https://example.com/data-visualization",
    showcase: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      "https://images.unsplash.com/photo-1509228627151-3cf2b39e0f7a?w=800"
    ]
  },
  {
    title: "Creative Web Design",
    image:
      "https://images.unsplash.com/photo-1603048675767-6e79ff5b8fc1?auto=format&fit=crop&w=1350&q=80",
    description:
      "A modern, artistic web design focused on aesthetics, typography, and motion-based user interaction.",
    link: "https://example.com/creative-web-design",
    showcase: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
      "https://images.unsplash.com/photo-1557682250-9691d27a8d12?w=800",
      "https://images.unsplash.com/photo-1561414927-6d1f87b03d54?w=800"
    ]
  },
  {
    title: "Marketing Analytics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80",
    description:
      "An analytics platform for marketers to track campaigns, conversions, and customer engagement.",
    link: "https://example.com/marketing-analytics",
    showcase: [
      "https://images.unsplash.com/photo-1581091215362-2c2b46c07321?w=800",
      "https://images.unsplash.com/photo-1581091012184-5f7f4b6b55ff?w=800",
      "https://images.unsplash.com/photo-1555617117-08f6f3a3dfc3?w=800"
    ]
  },
  {
    title: "Finance Dashboard",
    image:
      "https://images.unsplash.com/photo-1612831817884-5241c0f0b9ef?auto=format&fit=crop&w=1350&q=80",
    description:
      "A sleek financial dashboard for tracking expenses, profits, and investment performance in real-time.",
    link: "https://example.com/finance-dashboard",
    showcase: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      "https://images.unsplash.com/photo-1509228627151-3cf2b39e0f7a?w=800"
    ]
  },
  {
    title: "Game Landing Page",
    image:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1350&q=80",
    description:
      "A cinematic landing page for a game launch featuring animated visuals and engaging call-to-actions.",
    link: "https://example.com/game-landing-page",
    showcase: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
      "https://images.unsplash.com/photo-1557682250-9691d27a8d12?w=800",
      "https://images.unsplash.com/photo-1561414927-6d1f87b03d54?w=800"
    ]
  },
  {
    title: "3D Product Showcase",
    image:
      "https://images.unsplash.com/photo-1602526218560-74e07d1d8f61?auto=format&fit=crop&w=1350&q=80",
    description:
      "An immersive 3D product display page with interactive model views and smooth transitions.",
    link: "https://example.com/3d-product-showcase",
    showcase: [
      "https://images.unsplash.com/photo-1581091215362-2c2b46c07321?w=800",
      "https://images.unsplash.com/photo-1581091012184-5f7f4b6b55ff?w=800",
      "https://images.unsplash.com/photo-1555617117-08f6f3a3dfc3?w=800"
    ]
  },
  {
    title: "Portfolio Revamp",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1350&q=80",
    description:
      "A redesigned personal portfolio with improved performance, layout, and visual storytelling. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text. Dummy text dummy text.",
    link: "https://example.com/portfolio-revamp",
    showcase: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
      "https://images.unsplash.com/photo-1509228627151-3cf2b39e0f7a?w=800"
    ]
  }
];

export default function ProjectCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // --- added for gallery ---
  const [galleryProject, setGalleryProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const openGallery = (project) => {
    setGalleryProject(project);
    setCurrentImage(0);
  };

  const closeGallery = () => {
    setGalleryProject(null);
  };
  // --------------------------

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      // When gallery is open — use arrows for gallery navigation
      if (galleryProject) {
        if (e.key === "ArrowLeft") {
          setCurrentImage((prev) =>
            galleryProject
              ? (prev - 1 + galleryProject.showcase.length) %
                galleryProject.showcase.length
              : prev
          );
        } else if (e.key === "ArrowRight") {
          setCurrentImage((prev) =>
            galleryProject
              ? (prev + 1) % galleryProject.showcase.length
              : prev
          );
        } else if (e.key === "Escape") {
          closeGallery();
        }
        return; // stop here so cards don't move
      }

      // Card navigation (only if gallery is closed)
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryProject, closeGallery]);

  useEffect(() => {
    setFullyExpanded(false);
    const timer = setTimeout(() => setFullyExpanded(true), 350);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -100 : 100, transition: { duration: 0.4, ease: "easeIn" } }),
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
            {visibleProjects.map((p, i) => {
              const isActive = activeIndex === i;
              const isHovered = hoveredIndex === i;

              return (
                <motion.div
                  key={i}
                  className={`panel ${isActive ? "active" : ""}`}
                  style={{ backgroundImage: `url(${p.image})` }}
                  onClick={() => {
                    if (isActive) openGallery(p);
                    else setActiveIndex(i);
                  }}
                  onMouseEnter={() => isActive && setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{ flex: isActive ? 5 : 0.5 }}
                  transition={{ flex: { type: "tween", duration: 0.8, ease: "easeInOut" } }}
                >
                  <AnimatePresence>
                    {isActive && fullyExpanded && isHovered && (
                      <>
                        <motion.div
                          className="overlay-top"
                          initial={{ y: "-120%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "-120%", opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <a
                            href={p.link}
                            className="hoverable"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {p.title}
                          </a>
                        </motion.div>
                        <motion.div
                          className="overlay-bottom"
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "100%", opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <p>{p.description}</p>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bottom-controls">
        <button
          className="paginate left"
          onClick={handlePrev}
          data-state={page === 0 ? "disabled" : ""}
        >
          <i></i><i></i>
        </button>

        <PaginationSVG
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(i) => {
            setDirection(i > page ? 1 : -1);
            setPage(i);
          }}
        />

        <button
          className="paginate right"
          onClick={handleNext}
          data-state={page === totalPages - 1 ? "disabled" : ""}
        >
          <i></i><i></i>
        </button>
      </div>

      {/* --- Gallery Modal --- */}
      <AnimatePresence>
        {galleryProject && (
          <motion.div
            className="gallery-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="gallery-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryProject.showcase[currentImage]}
                alt={galleryProject.title}
                className="gallery-image"
              />
              <div className="gallery-controls">
                <button
                  onClick={() =>
                    setCurrentImage(
                      (currentImage - 1 + galleryProject.showcase.length) %
                        galleryProject.showcase.length
                    )
                  }
                >
                  ‹
                </button>
                <span>
                  {currentImage + 1}/{galleryProject.showcase.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentImage(
                      (currentImage + 1) % galleryProject.showcase.length
                    )
                  }
                >
                  ›
                </button>
              </div>
              <button className="close-gallery" onClick={closeGallery}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
