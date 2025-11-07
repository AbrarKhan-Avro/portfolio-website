import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectCards.css";
import PaginationSVG from "./PaginationSVG";

const allProjects = [
  {
    title: "Job Portal (Internship Project)",
    image:
      "https://raw.githubusercontent.com/AbrarKhan-Avro/internship-JBRSOFT/refs/heads/main/screenshots/Screenshot%202025-10-07%20165724.png",
    description:
      "Internship project under JBRSOFT. This project is of a dynamic job portal website. The website can be dynamically modified by the admin without getting technical.",
    link: "https://github.com/AbrarKhan-Avro/internship-JBRSOFT.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/internship-JBRSOFT/blob/main/screenshots/Screenshot%202025-10-07%20165821.png?raw=true",
      "https://github.com/AbrarKhan-Avro/internship-JBRSOFT/blob/main/screenshots/Screenshot%202025-10-07%20165807.png?raw=true",
      "https://github.com/AbrarKhan-Avro/internship-JBRSOFT/blob/main/screenshots/Screenshot%202025-10-07%20165627.png?raw=true",
      "https://github.com/AbrarKhan-Avro/internship-JBRSOFT/blob/main/screenshots/Screenshot%202025-10-07%20165642.png?raw=true"
    ]
  },
  {
    title: "Rhythmix (Course Project)",
    image:
      "https://github.com/AbrarKhan-Avro/course-WT/blob/main/screenshots/2.png?raw=true",
    description:
      "Web Technologies course project. A music platform website like Spotify or SoundCloud. Coded in PHP.",
    link: "https://github.com/AbrarKhan-Avro/course-WT.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/course-WT/blob/main/screenshots/1.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-WT/blob/main/screenshots/7.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-WT/blob/main/screenshots/8.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-WT/blob/main/screenshots/6.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-WT/blob/main/screenshots/3.png?raw=true"
    ]
  },
  {
    title: "Campus Connect (Course Project)",
    image:
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/1.png?raw=true",
    description:
      "Object-Oriented Programming 1 course projects. Simple social app called Campus Connect. Basic traffic simulation. Both coded in JAVA.",
    link: "https://github.com/AbrarKhan-Avro/course-OOP1.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/2.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/3.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/4.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/5.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/6.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-OOP1/blob/main/Campus%20Connect/screenshots/7.png?raw=true"
    ]
  },
  {
    title: "Space Invaders (Course Project)",
    image:
      "https://github.com/AbrarKhan-Avro/course-CG/blob/main/screenshots/1.png?raw=true",
    description:
      "Computer Graphics course project. Simple space invader style game. Coded in OpenGL.",
    link: "https://github.com/AbrarKhan-Avro/course-CG.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/course-CG/blob/main/screenshots/2.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-CG/blob/main/screenshots/3.png?raw=true"
    ]
  },
  {
    title: "Quiz App (Course Project)",
    image:
      "https://github.com/AbrarKhan-Avro/course-OOP2/blob/main/screenshots/1.png?raw=true",
    description:
      "Object-Oriented Programming 2 course project. Simple quiz app. Coded in C#.",
    link: "https://github.com/AbrarKhan-Avro/course-OOP2.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/course-OOP2/blob/main/screenshots/2.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-OOP2/blob/main/screenshots/3.png?raw=true"
    ]
  },
  {
    title: "Breakout Game (Course Project)",
    image:
      "https://github.com/AbrarKhan-Avro/course-IP/blob/main/screenshots/1.png?raw=true",
    description:
      "Introduction to Programming course project. Simple breakout style game. Coded in C++.",
    link: "https://github.com/AbrarKhan-Avro/course-IP.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/course-IP/blob/main/screenshots/2.png?raw=true",
      "https://github.com/AbrarKhan-Avro/course-IP/blob/main/screenshots/3.png?raw=true"
    ]
  },
  {
    title: "Algorithmic Trading Adventure (Internship Project)",
    image:
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_1-01.png?raw=true",
    description:
      "A python based algorithmic trading bot that uses financial market data and creates a demo simulation with output data and charts.",
    link: "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_1-02.png?raw=true",
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_1-03.png?raw=true",
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_1-04.png?raw=true"
    ]
  },
  {
    title: "Samsung Phone Advisor (Internship Project)",
    image:
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_2-01.png?raw=true",
    description:
      "A web application that helps users choose the right Samsung phone model based on their preferences using Retrieval-Augmented Generation (RAG) and Large Language Models (LLM).",
    link: "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment.git",
    showcase: [
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_2-02.png?raw=true",
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_2-03.png?raw=true",
      "https://github.com/AbrarKhan-Avro/GTRL-Internship-Assignment/blob/main/screenshots/Task_2-04.png?raw=true"
    ]
  },
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
              <a
                href={galleryProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-project-btn"
              >
                View Project
              </a>
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
