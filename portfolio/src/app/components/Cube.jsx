import React from "react";
import "./Cube.css";

export default function Cube() {
  return (
    <div className="cube-container">
      <div className="box-card">
        <div className="face front">
          <img
            src={new URL("../assets/pexels-macro-photography-12412301-12569708.jpg", import.meta.url).href}
            alt="Front"
          />
        </div>
        <div className="face back">
          <img
            src={new URL("../assets/pexels-balazs-benjamin-299828-872492.jpg", import.meta.url).href}
            alt="Back"
          />
        </div>
        <div className="face right">
          <img
            src={new URL("../assets/pexels-balazs-benjamin-299828-872512.jpg", import.meta.url).href}
            alt="Right"
          />
        </div>
        <div className="face left">
          <img
            src={new URL("../assets/pexels-wes-guild-2156563637-34439880.jpg", import.meta.url).href}
            alt="Left"
          />
        </div>
        <div className="face top">
          <img
            src={new URL("../assets/pexels-mahmoud-yahyaoui-34368085.jpg", import.meta.url).href}
            alt="Top"
          />
        </div>
        <div className="face bottom">
          <img
            src={new URL("../assets/pexels-alisha-mishra-579430-1346347.jpg", import.meta.url).href}
            alt="Bottom"
          />
        </div>
      </div>
    </div>
  );
}
