"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";

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
  // Map slider 0-100 to duration (lower duration = faster wave)
  const mapWaveSpeed = (val) => {
    if (val === 0) return 0; // frozen
    const normalized = val / 100; // 0–1
    const minDuration = 0.5; // fastest
    const maxDuration = 4;   // slowest
    return maxDuration - normalized * (maxDuration - minDuration);
  };

  // Map slider 0-100 to glow duration
  const mapGlowSpeed = (val) => {
    if (val === 0) return 0;
    const normalized = val / 100;
    const minDuration = 2; // fastest glow cycle
    const maxDuration = 10;   // slowest
    return maxDuration - normalized * (maxDuration - minDuration);
  };

  const waveSpeed = mapWaveSpeed(waveSlider);
  const glowSpeed = mapGlowSpeed(glowSlider);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wave Text */}
      <h1 className={`flex justify-center ${className}`}>
        {text.split("").map((char, index) => {
          const y = useMotionValue(0);
          const waveAmplitude = 20; // max vertical movement

          useAnimationFrame((t) => {
            if (waveSpeed === 0) return;
            const speedFactor = 1 / waveSpeed; // smaller duration = faster
            const wave = Math.sin((t / 1000) * (2 * Math.PI * speedFactor) + index * 0.4);
            y.set(wave * waveAmplitude);
          });

          const textShadow = useMotionValue(`0 0 0px transparent`);
          useAnimationFrame((t) => {
            if (glowSpeed === 0) return;
            const speedFactor = 1 / glowSpeed;
            const glowPhase = ((t / 1000) * speedFactor) % 1; // cycles 0–1 smoothly
            const colorIndex = Math.floor(glowPhase * (glowColors.length - 1));
            const nextIndex = (colorIndex + 1) % glowColors.length;

            // Compute fractional blend between current and next color
            const blend = glowPhase * (glowColors.length - 1) - colorIndex;

            const interpolateColor = (c1, c2, t) => {
              const parse = (hex) =>
                hex
                  .replace("#", "")
                  .match(/.{2}/g)
                  .map((x) => parseInt(x, 16));
              const [r1, g1, b1] = parse(c1);
              const [r2, g2, b2] = parse(c2);
              const r = Math.round(r1 + (r2 - r1) * t);
              const g = Math.round(g1 + (g2 - g1) * t);
              const b = Math.round(b1 + (b2 - b1) * t);
              return `rgb(${r}, ${g}, ${b})`;
            };

            const c = interpolateColor(glowColors[colorIndex], glowColors[nextIndex], blend);
            textShadow.set(`0 0 8px ${c}, 0 0 16px ${c}, 0 0 24px ${c}`);
          });

          return (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block text-gray-800 dark:text-gray-200"
              style={{
                y,
                textShadow,
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
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
