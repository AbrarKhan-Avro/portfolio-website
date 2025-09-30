"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({ title, description, image, link }: ProjectProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800"
    >
      <Link href={link} target="_blank">
        <div className="relative h-48">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-400 mt-2">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
