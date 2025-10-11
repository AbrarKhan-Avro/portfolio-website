"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">Abrar Khan</h1>
        <ul className="flex space-x-6 text-gray-300">
          <li><a href="#hero" className="hover:text-white transition">Home</a></li>
          <li><a href="#about" className="hover:text-white transition">About</a></li>
          <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
