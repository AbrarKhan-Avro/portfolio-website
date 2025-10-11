import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Abrar Khan Portfolio",
  description: "Web Developer & Storyteller",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
