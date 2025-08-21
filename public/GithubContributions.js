"use client";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";

export default function GithubContributions() {
  return (
    <section className="p-8 text-center bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl shadow-lg">
      <motion.h2
        className="text-3xl font-extrabold mb-6 text-amber-300 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        GitHub Contributions
      </motion.h2>

      <motion.div
        className="mx-auto p-6 rounded-lg border border-amber-400/30 bg-gray-950 shadow-md overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <GitHubCalendar
          username="unnati-078"
          blockSize={15}       // size of squares
          blockMargin={5}      // spacing between squares
          colorScheme="dark"   // dark mode friendly
        />
      </motion.div>

      <motion.p
        className="mt-6 text-sm italic text-amber-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Tracking my open-source journey — June 2025 to Present 🚀
      </motion.p>
    </section>
  );
}
