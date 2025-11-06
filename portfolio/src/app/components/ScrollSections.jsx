"use client";

import { useEffect, useState } from "react";
import $ from "jquery";

export default function ScrollSections() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    $(function () {
      const elements = {
        scrollify: $(".js--scrollify"),
        navigateLink: $(".js--navigate-link"),
        navigate: $(".js--navigate"),
      };

      // Navigation dot click
      elements.navigateLink.on("click", function (ev) {
        ev.preventDefault();
        const hash = $(this).attr("href");
        $.scrollify.move(hash);
      });

      // Auto-hide logic
      let hideTimeout;

      const showNavigation = () => {
        setVisible(true);
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          if (!hovered) setVisible(false);
        }, 1000);
      };

      // Show when scrolling
      $(window).on("scroll", showNavigation);

      return () => {
        $.scrollify.destroy();
        $(window).off("scroll", showNavigation);
      };
    });
  }, [hovered]);

  return (
    <>
      {/* Right side navigation dots */}
      <nav
        className={`section-navigate js--navigate fixed top-1/2 -translate-y-1/2 right-5 z-[9999] transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
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
    </>
  );
}
