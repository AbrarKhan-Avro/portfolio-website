import React, { useRef, useState, useEffect } from "react";
import "./Cube.css";

export default function Cube() {
  const cubeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useRef({ x: 0, y: 0 }); // store current rotation

  useEffect(() => {
    let frameId;

    const rotate = () => {
      if (isHovered) {
        // rotate by a small amount each frame
        rotation.current.x += 0.5; // adjust speed
        rotation.current.y += 1;
        cubeRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
      }
      frameId = requestAnimationFrame(rotate);
    };

    frameId = requestAnimationFrame(rotate);

    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  return (
    <div
      className="cube-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="box-card" ref={cubeRef}>
        <div className="face front">
          <img
            src={new URL(
              "../assets/01.jpg",
              import.meta.url
            ).href}
            alt="Front"
          />
        </div>
        <div className="face back">
          <img
            src={new URL(
              "../assets/06.jpg",
              import.meta.url
            ).href}
            alt="Back"
          />
        </div>
        <div className="face right">
          <img
            src={new URL(
              "../assets/02.jpg",
              import.meta.url
            ).href}
            alt="Right"
          />
        </div>
        <div className="face left">
          <img
            src={new URL(
              "../assets/03.jpg",
              import.meta.url
            ).href}
            alt="Left"
          />
        </div>
        <div className="face top">
          <img
            src={new URL(
              "../assets/04.jpg",
              import.meta.url
            ).href}
            alt="Top"
          />
        </div>
        <div className="face bottom">
          <img
            src={new URL(
              "../assets/05.jpg",
              import.meta.url
            ).href}
            alt="Bottom"
          />
        </div>
      </div>
    </div>
  );
}
