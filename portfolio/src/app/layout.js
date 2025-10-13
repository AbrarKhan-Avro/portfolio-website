import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";

export const metadata = {
  title: "Abrar Khan Portfolio",
  description: "Web Developer & Storyteller",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white scroll-smooth relative">
        {/* Custom cursor */}
        <CustomCursor />

        {/* Navbar */}
        <Navbar />

        {/* Page content with smooth fade transitions */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
