import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 px-4"
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="max-w-2xl text-center text-gray-400">
          I’m passionate about creating beautiful, interactive experiences on
          the web. This is where my creativity meets code.
        </p>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center items-center bg-zinc-800 px-4"
      >
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
        <p className="text-gray-400">Coming soon...</p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 px-4"
      >
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="text-gray-400">Let's build something great together!</p>
      </section>
    </main>
  );
}
