"use client";

import { useEffect, useState } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle({ onToggle }) {
  // internal theme state: "dark" | "light"
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // load saved theme
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    else setTheme("dark");
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);

    if (typeof onToggle === "function") onToggle(theme);
  }, [theme, onToggle]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="toggle toggle--daynight" aria-hidden={false}>
      <input
        id="toggle--daynight-navbar"
        className="toggle--checkbox"
        type="checkbox"
        onChange={toggle}
        checked={theme === "light"}
        aria-label="Toggle day / night theme"
      />
      <label className="toggle--btn" htmlFor="toggle--daynight-navbar">
        <span className="toggle--feature" />
      </label>
    </div>
  );
}
