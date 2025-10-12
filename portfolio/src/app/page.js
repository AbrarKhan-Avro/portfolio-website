import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <About />
      <Projects />

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 px-4"
      >
        <h2 className="text-4xl font-bold mb-6 text-white">Contact</h2>
        <p className="text-gray-400">Let's build something great together!</p>
      </section>
    </main>
  );
}
