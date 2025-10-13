import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "Abrar Khan Portfolio",
  description: "Web Developer & Storyteller",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white scroll-smooth">
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
