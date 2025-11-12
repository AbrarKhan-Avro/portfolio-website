import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Abrar's Webspace",
  description: "Web Developer & Storyteller",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white scroll-smooth relative transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          {/* Preloader */}
          <Preloader />

          {/* Custom Cursor */}
          <CustomCursor />

          {/* Navbar */}
          <Navbar />

          {/* Page content with smooth fade transitions */}
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
