import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PaginationSVG({ totalPages, currentPage, onPageChange }) {
  const lineRef = useRef(null);
  const circlesRef = useRef([]);
  const innerCircleRef = useRef(null);

  useEffect(() => {
    if (!circlesRef.current[currentPage]) return;

    const target = circlesRef.current[currentPage];
    const cx = target.getAttribute("cx");

    // Animate the moving line
    gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to(lineRef.current, {
        duration: 0.25,
        attr: { x2: cx },
        strokeWidth: 0,
        ease: "power2.in",
      })
      .to(
        lineRef.current,
        {
          duration: 0.8,
          attr: { x1: cx },
          ease: "elastic.out(1, 0.75)",
        },
        "+=0"
      )
      .to(
        lineRef.current,
        {
          duration: 1,
          strokeWidth: 10,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.5"
      );

    // Move the inner active circle smoothly
    gsap.to(innerCircleRef.current, {
      duration: 0.8,
      attr: { cx },
      ease: "elastic.out(1, 0.8)",
    });
  }, [currentPage]);

  // layout variables
  const circleSpacing = 70;
  const startX = 100;
  const baseY = 60;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="90 0 50 120"
      style={{
        width: "100%",
        maxWidth: "360px",
        height: "80px",
        overflow: "visible",
      }}
    >
      {/* Outer rings */}
      <g fill="transparent" strokeWidth="3" stroke="#fff" strokeMiterlimit="10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <circle
            key={i}
            cx={startX + i * circleSpacing}
            cy={baseY}
            r="22"
            ref={(el) => (circlesRef.current[i] = el)}
            stroke={i === currentPage ? "#fff" : "rgba(255,255,255,0.4)"}
            style={{ cursor: "pointer", transition: "stroke 0.3s" }}
            onClick={() => onPageChange(i)}
          />
        ))}
      </g>

      {/* Connecting line */}
      <line
        ref={lineRef}
        x1={startX}
        y1={baseY}
        x2={startX}
        y2={baseY}
        stroke="#fff"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Inner filled indicator */}
      <circle
        ref={innerCircleRef}
        cx={startX}
        cy={baseY}
        r="15"
        fill="#fff"
      />
    </svg>
  );
}
