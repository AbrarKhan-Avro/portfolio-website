"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/30">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MyPortfolio
        </Link>
        <button
          className="md:hidden text-gray-200"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <ul
          className={`${
            open ? "block" : "hidden"
          } md:flex gap-8 text-gray-300`}
        >
          <li><Link href="/about">About</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
