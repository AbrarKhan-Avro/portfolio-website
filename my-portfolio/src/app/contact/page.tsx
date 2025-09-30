"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");
    // Example: connect to Formspree or API route
    setTimeout(() => setStatus("Message sent!"), 1500);
  }

  return (
    <section className="py-20 max-w-xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-10">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your message"
          required
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-500 transition"
        >
          Send
        </button>
      </form>
      {status && <p className="mt-4 text-green-400">{status}</p>}
    </section>
  );
}
