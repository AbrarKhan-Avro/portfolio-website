"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X, Home, User, Folder, Mail } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const controls = useAnimation();
  const intervalRef = useRef(null);

  // Scroll shrink & shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Theme handling
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    else setTheme("dark");
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navItems = [
    { name: "Home", id: "hero", icon: Home },
    { name: "About", id: "about", icon: User },
    { name: "Projects", id: "projects", icon: Folder },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  const fonts = [
    // 🖋️ Cursive / Handwritten
    "Dancing Script", "Pacifico", "Great Vibes", "Satisfy", "Parisienne",
    "Sacramento", "Allura", "Yellowtail", "Courgette", "Alex Brush",
    "Marck Script", "Clicker Script", "Italianno", "Cookie", "Rochester",
    "Lobster Two", "Molle", "Mr De Haviland", "Yesteryear", "Gloria Hallelujah",

    // 🔊 Loud / Bold / Impact
    "Anton", "Bebas Neue", "Oswald", "Black Ops One", "Bangers",
    "Alfa Slab One", "Ultra", "League Gothic", "Fredoka One", "Monoton",
    "Graduate", "Archivo Black", "Big Shoulders Display", "Passion One",
    "Lilita One", "Changa One", "Limelight", "Rubik Mono One", "Viga", "Righteous",

    // 🕴️ Formal / Serif
    "Playfair Display", "Merriweather", "Lora", "Libre Baskerville", "Cormorant Garamond",
    "EB Garamond", "Crimson Pro", "Spectral", "Prata", "Cardo",
    "DM Serif Display", "Noto Serif", "Cinzel", "Alegreya", "Domine",
    "Old Standard TT", "Vidaloka", "Fauna One", "Arvo", "Roboto Slab",

    // 😄 Informal / Fun / Comic
    "Comic Neue", "Chewy", "Indie Flower", "Amatic SC", "Patrick Hand",
    "Caveat", "Coming Soon", "Reenie Beanie", "Just Another Hand", "Covered By Your Grace",
    "Architects Daughter", "Rock Salt", "Short Stack", "Permanent Marker", "Shadows Into Light",
    "Walter Turncoat", "Schoolbell", "Gochi Hand", "Kalam", "Neucha",

    // 🚀 Futuristic / Tech
    "Orbitron", "Audiowide", "Exo 2", "Rajdhani", "Michroma",
    "Quantico", "Syncopate", "Oxanium", "Righteous", "Gruppo",
    "Chivo Mono", "Jockey One", "Teko", "Barlow Condensed", "Saira Semi Condensed",
    "Black Han Sans", "Quanty", "Tomorrow", "Russo One", "Krona One"
  ];


  // Shuffle array helper
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const startFontCycle = () => {
    if (intervalRef.current) return;

    const shuffledFonts = shuffleArray(fonts);
    let index = 0;

    intervalRef.current = setInterval(() => {
      controls.start({
        fontFamily: shuffledFonts[index],
        transition: { duration: 0.1, ease: "linear" },
      });
      index = (index + 1) % shuffledFonts.length;
    }, 500);
  };

  const stopFontCycle = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    // Do NOT reset fontFamily; leave the last font as permanent
  };

  return (
    <>
      <style jsx global>{`
        .nav-animated {
          position: relative;
          width: 130px;
          height: 45px;
          background: none;
          border: none;
          color: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s, color 0.3s;
        }
        .nav-animated:hover {
          transform: scale(1.05);
        }
        .nav-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .nav-svg rect {
          fill: none;
          stroke-linecap: round;
        }
        @keyframes outer-dashoffset {
          0% { stroke-dashoffset: 0; stroke-dasharray: 130 130; }
          50% { stroke-dasharray: 80 180; }
          100% { stroke-dashoffset: 260; stroke-dasharray: 130 130; }
        }
        .nav-line--outer {
          stroke-dasharray: 130 130;
          stroke-dashoffset: 0;
          animation: outer-dashoffset infinite linear 6s;
          stroke-width: 4;
          stroke: #a855f7;
        }
        @keyframes inner-dashoffset {
          0% { stroke-dashoffset: 0; stroke-dasharray: 130 130; }
          50% { stroke-dasharray: 80 180; }
          100% { stroke-dashoffset: -260; stroke-dasharray: 130 130; }
        }
        .nav-line--inner {
          stroke-dashoffset: 0;
          stroke-dasharray: 130 130;
          animation: inner-dashoffset infinite 5s;
          stroke-width: 2;
          stroke: #ec4899;
        }
        .nav-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }/* Pause animation on hover */
          .nav-animated:hover .nav-line--outer,
          .nav-animated:hover .nav-line--inner {
            animation-play-state: paused;
          }
        .icon-hover { transition: all 0.3s ease; }
        .icon-hover:hover { transform: scale(1.3); color: #000; fill: #000; }
        .dark .icon-hover:hover { color: #fff; fill: #fff; }
      `}</style>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-md h-12"
            : "bg-transparent h-20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center relative">
          <motion.h1
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            animate={controls}
            onHoverStart={startFontCycle}
            onHoverEnd={stopFontCycle}
            whileHover={{
              scale: 1.5,
              textShadow:
                "0px 0px 30px rgba(167, 139, 250, 1), 0px 0px 50px rgba(236, 72, 153, 0.9)",
            }}
            whileTap={{ scale: 0.9 }}
            className={`hoverable cursor-pointer font-bold transition-all duration-300 ${
              scrolled ? "text-lg" : "text-xl"
            } text-amber-600 dark:text-amber-300 select-none`}
          >
            Abrar Khan
          </motion.h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4">
              {navItems.map(({ name, id, icon: Icon }) => (
                <motion.li
                  key={id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <a
                    href={`#${id}`}
                    className="relative flex items-center justify-center text-center font-medium px-4 py-2 min-w-[90px] transition-all duration-300"
                  >
                    {/* Full view text with SVG hover */}
                    <div
                      className={`nav-animated absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                      } ${
                        activeSection === id
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <svg className="nav-svg" viewBox="0 0 130 45" xmlns="http://www.w3.org/2000/svg">
                        <rect
                          className={`nav-line nav-line--outer ${
                            id === "hero"
                              ? "stroke-purple-800 dark:stroke-purple-200"
                              : id === "about"
                              ? "stroke-blue-950 dark:stroke-blue-200"
                              : id === "projects"
                              ? "stroke-amber-950 dark:stroke-amber-100"
                              : id === "contact"
                              ? "stroke-green-950 dark:stroke-green-100"
                              : ""
                          }`}
                          x="2"
                          y="2"
                          width="126"
                          height="41"
                          rx="15"
                        />
                        <rect
                          className={`nav-line nav-line--inner ${
                            id === "hero"
                              ? "stroke-rose-950 dark:stroke-pink-300"
                              : id === "about"
                              ? "stroke-teal-800 dark:stroke-teal-300"
                              : id === "projects"
                              ? "stroke-yellow-800 dark:stroke-yellow-300"
                              : id === "contact"
                              ? "stroke-lime-900 dark:stroke-lime-300"
                              : ""
                          }`}
                          x="2"
                          y="2"
                          width="126"
                          height="41"
                          rx="15"
                        />
                      </svg>
                      <div className="nav-content">{name}</div>
                    </div>

                    {/* Scrolled view icons */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                      } ${
                        activeSection === id
                          ? "text-amber-600 dark:text-amber-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Icon size={20} className="transition-all duration-300 icon-hover" />
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.5, rotate: 20, backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-zinc-50 dark:bg-zinc-950 shadow-lg md:hidden z-40 flex flex-col p-6"
            >
              <ul className="flex flex-col gap-6 mt-8">
                {navItems.map(({ name, id }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-lg font-medium text-center transition-colors ${
                        activeSection === id
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                      }`}
                    >
                      {name}
                    </a>
                  </li>
                ))}
                <li className="mt-6 flex justify-center">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-5 h-5 text-yellow-400" /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-gray-800" /> Dark Mode
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
