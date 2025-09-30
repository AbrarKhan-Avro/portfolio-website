import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 space-y-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Profile */}
        <div>
          <p className="text-lg text-gray-400 leading-relaxed">
            I’m a passionate developer who loves building smooth, interactive
            web experiences. My focus is on modern frontend frameworks,
            responsive design, and performance.
          </p>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            When I’m not coding, I enjoy reading, exploring design trends,
            and learning new tech.
          </p>
        </div>

        {/* Profile image (replace with your photo later) */}
        <div className="flex justify-center">
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            width={300}
            height={300}
            className="rounded-2xl shadow-lg border border-gray-800"
          />
        </div>
      </div>

      {/* Skills grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Git", "Figma", "Framer Motion"].map((skill) => (
            <div
              key={skill}
              className="p-4 bg-gray-900 rounded-xl text-center text-gray-300 shadow hover:shadow-blue-500/30 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
