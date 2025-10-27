"use client";
import { useEffect, useRef } from "react";
import "./SparkText.css";

export default function SparkText({ text }) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // wrap each character in spans
    el.innerHTML = "";
    for (const ch of text) {
      const span = document.createElement("span");
      span.innerHTML = ch === " " ? "&nbsp;" : ch;
      el.appendChild(span);
    }

    const spans = Array.from(el.querySelectorAll("span"));

    const handleEnter = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      spans.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanCenterX = spanRect.left + spanRect.width / 2;
        const spanCenterY = spanRect.top + spanRect.height / 2;

        // distance from cursor to each letter center
        const dx = spanCenterX - e.clientX;
        const dy = spanCenterY - e.clientY;

        // random scaling factor for spread
        const spread = 1 + Math.random() * 0.6;

        // set motion variables based on direction away from cursor
        span.style.setProperty("--rx", dx * spread);
        span.style.setProperty("--ry", dy * spread);
        span.style.setProperty("--rz", (Math.random() * 200 - 100).toFixed(2));
        span.style.setProperty("--rXdeg", (Math.random() * 720 - 360).toFixed(2));
        span.style.setProperty("--rYdeg", (Math.random() * 720 - 360).toFixed(2));
      });

      el.classList.add("disperse");
    };

    const handleLeave = () => {
      el.classList.remove("disperse");
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [text]);

  return (
    <span ref={textRef} className="spark-text">
      {text}
    </span>
  );
}
