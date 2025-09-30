import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "E-commerce Website",
    description: "A full-stack store with cart, checkout, and payment integration.",
    image: "/projects/ecommerce.png",
    link: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description: "My own portfolio with animations and smooth UX.",
    image: "/projects/portfolio.png",
    link: "https://example.com",
  },
  {
    title: "Dashboard App",
    description: "Analytics dashboard with interactive charts and auth system.",
    image: "/projects/dashboard.png",
    link: "https://example.com",
  },
];

export default function Projects() {
  return (
    <section className="py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-10">Projects</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
