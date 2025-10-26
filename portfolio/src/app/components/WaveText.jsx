"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WaveText({ text, className = "" }) {
  const [waveSlider, setWaveSlider] = useState(0); // 0-100 slider
  const [glowSlider, setGlowSlider] = useState(0); // 0-100 slider

  const glowColors = [
    "#9D4EDD",
    "#7B5FFF",
    "#4D96FF",
    "#4DB6FF",
    "#FFA45C",
    "#FF8A4D",
    "#6BCB77",
    "#52B788",
    "#9D4EDD",
  ];

  // Map slider 0-100 to duration (0 = frozen, higher = faster)
  const mapWaveSpeed = (val) => (val === 0 ? 0 : 0.5 + (100 - val) * 0.05); 
  const mapGlowSpeed = (val) => (val === 0 ? 0 : 2 + (100 - val) * 0.16);

  const waveSpeed = mapWaveSpeed(waveSlider);
  const glowSpeed = mapGlowSpeed(glowSlider);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wave Text */}
      <h1 className={`flex justify-center ${className}`}>
        {text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}-${waveSpeed}-${glowSpeed}`} // force re-render on speed change
            className="inline-block text-gray-800 dark:text-gray-200"
            style={{ display: "inline-block" }}
            animate={{
              y: waveSpeed === 0 ? "0%" : ["0%", "-20%", "0%"],
              textShadow:
                glowSpeed === 0
                  ? `0 0 0px transparent`
                  : glowColors.map(
                      (c) => `0 0 8px ${c}, 0 0 16px ${c}, 0 0 24px ${c}`
                    ),
            }}
            transition={{
              y:
                waveSpeed === 0
                  ? {}
                  : {
                      duration: waveSpeed,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    },
              textShadow:
                glowSpeed === 0
                  ? {}
                  : {
                      duration: glowSpeed,
                      repeat: Infinity,
                      ease: "linear",
                    },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>

      {/* Sliders */}
      <div className="flex flex-col items-center w-80 space-y-6">
        {/* Wave Speed Slider */}
        <div className="w-full flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1">
            Wave
          </label>
          <div className="relative w-full">
            {/* Dynamic Value */}
            <div className="absolute right-0 -top-5 text-sm text-gray-600 dark:text-gray-300">
              {waveSlider}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={waveSlider}
              onChange={(e) => setWaveSlider(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none
                bg-gray-600 dark:bg-gray-300
                hover:bg-gray-700 dark:hover:bg-gray-400
                focus:outline-none
                thumb:appearance-none thumb:w-5 thumb:h-5
                thumb:rounded-full thumb:bg-purple-400 dark:thumb:bg-purple-600
                thumb:cursor-pointer"
            />
            <div className="absolute w-full top-6 flex justify-between text-sm text-gray-500 dark:text-gray-300 px-1">
              <span>Chill</span>
              <span>Party</span>
            </div>
          </div>
        </div>

        {/* Glow Speed Slider */}
        <div className="w-full flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1">
            Glow
          </label>
          <div className="relative w-full">
            {/* Dynamic Value */}
            <div className="absolute right-0 -top-5 text-sm text-gray-600 dark:text-gray-300">
              {glowSlider}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={glowSlider}
              onChange={(e) => setGlowSlider(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none
                bg-gray-600 dark:bg-gray-300
                hover:bg-gray-700 dark:hover:bg-gray-400
                focus:outline-none
                thumb:appearance-none thumb:w-5 thumb:h-5
                thumb:rounded-full thumb:bg-purple-400 dark:thumb:bg-purple-600
                thumb:cursor-pointer"
            />
            <div className="absolute w-full top-6 flex justify-between text-sm text-gray-500 dark:text-gray-300 px-1">
              <span>Chill</span>
              <span>Party</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
