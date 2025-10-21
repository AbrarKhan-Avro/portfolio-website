"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      const totalHeight = document.body.scrollHeight;
      canvas.height = totalHeight;
      setPageHeight(totalHeight);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    const numParticles = 500;
    const maxDistance = 150;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    });

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 0.5;
      const dy = (Math.random() - 0.5) * 0.5;
      particles.push({ x, y, dx, dy, size });
    }

    // Color updater for dark/light mode
    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark
        ? { dot: "rgba(255, 255, 255, 0.5)", line: "rgba(169, 169, 169, 0.2)" } // white dots, darkgray lines
        : { dot: "rgba(0, 0, 0, 0.5)", line: "rgba(10, 20, 20, 0.2)" };
    };

    let colors = getColors();

    // Observe dark mode change dynamically
    const observer = new MutationObserver(() => {
      colors = getColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < maxDistance) {
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots and move particles
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.dot;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Mouse magnetism
        if (mouse.x && mouse.y) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full z-0 pointer-events-none"
      style={{ height: `${pageHeight}px` }}
    />
  );
}
