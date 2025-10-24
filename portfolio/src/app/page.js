import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import ParticleBackground from "./components/ParticleBackground";
import ScrollIndicator from "./components/ScrollIndicator";


export default function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
      <PageTransition />
      <ParticleBackground /> {/* shared global background */}
      <ScrollIndicator />
    </main>
  );
}
