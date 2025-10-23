"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Home, User, Folder, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      <style jsx global>{`
        /* Dual-line hover effect (for text items only) */
        .nav-hover::before,
        .nav-hover::after {
          content: "";
          position: absolute;
          height: 2px;
          width: 0;
          background: linear-gradient(to right, #8b5cf6, #ec4899, #6366f1);
          transition: width 0.4s ease;
        }
        .nav-hover::before {
          bottom: 0;
          left: 0;
        }
        .nav-hover::after {
          top: 0;
          right: 0;
        }
        .nav-hover:hover::before,
        .nav-hover:hover::after {
          width: 100%;
        }
        .nav-hover:hover {
          background: linear-gradient(
            90deg,
            rgba(147, 51, 234, 0.15),
            rgba(236, 72, 153, 0.15)
          );
          border-radius: 10px;
        }

        /* Icon hover fill effect (when scrolled) */
        .icon-hover {
          transition: all 0.3s ease;
        }
        .icon-hover:hover {
          transform: scale(1.3);
          color: #000;
          fill: #000;
        }
        .dark .icon-hover:hover {
          color: #fff;
          fill: #fff;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-md h-12"
            : "bg-transparent h-20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center relative">
          {/* Logo */}
          <motion.h1
            onClick={() =>
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              scale: 1.5,
              textShadow:
                "0px 0px 30px rgba(167, 139, 250, 1), 0px 0px 50px rgba(236, 72, 153, 0.9)",
            }}
            whileTap={{ scale: 0.9 }}
            className={`hoverable cursor-pointer font-bold transition-all duration-300 ${
              scrolled ? "text-lg" : "text-xl"
            } text-gray-900 dark:text-white select-none`}
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
                    className={`relative flex items-center justify-center text-center font-medium px-4 py-2 min-w-[90px] transition-all duration-300 ${
                      !scrolled ? "nav-hover" : ""
                    } ${
                      activeSection === id
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {/* Text (visible before scroll) */}
                    <span
                      className={`transition-all duration-300 ${
                        scrolled ? "hidden opacity-0" : "inline opacity-100"
                      }`}
                    >
                      {name}
                    </span>

                    {/* Icon (visible after scroll) */}
                    <span
                      className={`absolute transition-all duration-300 flex items-center justify-center ${
                        scrolled ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Icon
                        size={scrolled ? 20 : 18}
                        className={`transition-all duration-300 ${
                          scrolled ? "icon-hover" : ""
                        }`}
                      />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{
                scale: 1.5,
                rotate: 20,
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
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
