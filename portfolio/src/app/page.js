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
import $ from "jquery";

export default function Home() {
  useEffect(() => {
    // Run only in browser
    if (typeof window !== "undefined") {
      import("jquery-scrollify").then(() => {
        $(function () {
          const elements = {
            navigateLink: $(".js--navigate-link"),
            navigate: $(".js--navigate"),
          };

          // Navigation click behavior
          elements.navigateLink.on("click", function (ev) {
            ev.preventDefault();
            const hash = $(this).attr("href");
            $.scrollify.move(hash);
          });

          // Initialize Scrollify safely
          $.scrollify({
            section: ".js--scrollify",
            sectionName: "section-name",
            scrollSpeed: 800,
            easing: "easeOutExpo",
            // ✅ Allow normal scrolling inside the About section
            standardScrollElements: ".scrollbox",
            // ✅ Prevent blank space after footer
            interstitialSection: "footer",
            updateHash: true,
            before: function (i, sections) {
              const ref = sections[i].data("section-name");
              $(".js--navigate-link").removeClass("is--active");
              $(`.js--navigate-link[href="#${ref}"]`).addClass("is--active");

              if (ref === "footer") {
                elements.navigate.addClass("is--inactive");
              } else {
                elements.navigate.removeClass("is--inactive");
              }
            },
          });
        });
      });
    }

    // Cleanup on unmount
    return () => {
      if ($.scrollify && $.scrollify.destroy) {
        $.scrollify.destroy();
      }
    };
  }, []);

  return (
    <main className="overflow-hidden">
      {/* --- Scrollify Sections --- */}
      <section className="js--scrollify" data-section-name="hero">
        <Hero />
      </section>

      <section className="js--scrollify" data-section-name="about">
        <About />
      </section>

      <section className="js--scrollify" data-section-name="projects">
        <Projects />
      </section>

      <section className="js--scrollify" data-section-name="contact">
        <Contact />
      </section>

      {/* ✅ Footer is outside Scrollify’s full-height constraint */}
      <footer data-section-name="footer">
        <Footer />
      </footer>

      {/* --- Navigation Dots --- */}
      <nav className="section-navigate js--navigate fixed top-1/2 -translate-y-1/2 right-5 z-[9999]">
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
