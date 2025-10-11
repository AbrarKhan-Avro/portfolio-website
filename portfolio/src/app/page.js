export default function Home() {
  return (
    <main className="scroll-smooth">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center bg-black text-center px-4"
      >
        <h1 className="text-6xl font-bold mb-4">Hi, I'm Abrar Khan</h1>
        <p className="text-xl text-gray-400">
          Web Developer • Designer • Storyteller
        </p>
      </section>

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
