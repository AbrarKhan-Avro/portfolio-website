"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import ParticleBackground from "./components/ParticleBackground";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const $ = require("jquery");
      const sections = $("section[id]");
      const navLinks = $(".js--navigate-link");

      // ✅ Smooth scroll on dot click
      navLinks.on("click", function (ev) {
        ev.preventDefault();
        const hash = $(this).attr("href");
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });

      // ✅ Detect current section on scroll and update active dot
      const handleScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;

        let currentSection = "hero"; // fallback
        sections.each(function () {
          const top = $(this).offset().top;
          const bottom = top + $(this).outerHeight();
          if (scrollPos >= top && scrollPos < bottom) {
            currentSection = $(this).attr("id");
            return false; // stop loop once found
          }
        });

        // Update active class
        navLinks.removeClass("is--active");
        $(`.js--navigate-link[href="#${currentSection}"]`).addClass("is--active");
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // run once on load

      // Cleanup
      return () => {
        navLinks.off("click");
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* --- Regular Scrolling Sections --- */}
      <section id="hero" className="js--scrollify" data-section-name="hero">
        <Hero />
      </section>

      <section id="about" className="js--scrollify" data-section-name="about">
        <About />
      </section>

      <section id="projects" className="js--scrollify" data-section-name="projects">
        <Projects />
      </section>

      <section id="contact" className="js--scrollify" data-section-name="contact">
        <Contact />
      </section>

      {/* ✅ Footer (scrolls normally) */}
      <footer id="footer" data-section-name="footer">
        <Footer />
      </footer>

      {/* --- Navigation Dots --- */}
      <nav className="section-navigate js--navigate fixed top-1/2 -translate-y-1/2 right-5 z-[9999] transition-opacity duration-500">
        <ul className="section-navigate__items relative">
          {["hero", "about", "projects", "contact"].map((name) => (
            <li key={name} className="section-navigate__item relative mb-3">
              <a
                href={`#${name}`}
                className={`section-navigate__link js--navigate-link ${
                  name === "hero" ? "is--active" : ""
                }`}
              >
                <span className="section-navigate__name capitalize">{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Other global elements --- */}
      <ScrollToTop />
      <PageTransition />
      <ParticleBackground />
    </main>
  );
}
