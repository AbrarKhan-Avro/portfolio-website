"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  User,
  Folder,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll shadow + shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy
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

  // Theme toggle
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    else setTheme("dark");
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navItems = [
    { name: "Home", id: "hero", icon: <Home size={18} /> },
    { name: "About", id: "about", icon: <User size={18} /> },
    { name: "Projects", id: "projects", icon: <Folder size={18} /> },
    { name: "Contact", id: "contact", icon: <Mail size={18} /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-md h-12"
          : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <h1
          className={`text-xl font-bold transition-all duration-300 ${
            scrolled ? "text-lg" : "text-xl"
          } text-gray-900 dark:text-white`}
        >
          Abrar Khan
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 relative">
            {navItems.map((item) => (
              <li key={item.id} className="relative flex items-center">
                {/* Transform text → icon when scrolled */}
                <a
                  href={`#${item.id}`}
                  className={`flex items-center transition-all duration-300 font-medium ${
                    activeSection === item.id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  <span
                    className={`mr-1 overflow-hidden transition-all duration-300 ${
                      scrolled ? "w-0 opacity-0" : "w-auto opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`transition-all duration-300 ${
                      scrolled ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.icon}
                  </span>
                </a>
                {/* Underline for text */}
                {!scrolled && (
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : "w-0"
                    }`}
                  ></span>
                )}
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>
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
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-64 bg-zinc-50 dark:bg-zinc-950 shadow-lg md:hidden z-40 flex flex-col p-6"
      >
        <ul className="flex flex-col gap-6 mt-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li className="mt-6">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
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
    </nav>
  );
}
