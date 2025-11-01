"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full pt-0">
        <div className="relative h-12 md:h-14 flex items-center justify-between bg-black/60 backdrop-blur-md border border-border-light rounded-2xl shadow-elegant mx-auto max-w-6xl px-4 md:px-8">
          <Link href="/" className="font-display text-lg">unnati.build</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-5 text-sm">
            {links.map((l) => (
              <Link key={l.label} className="hover:text-accent" href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border-light bg-black/40 hover:bg-black/60"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "tween", duration: 0.18 }}
                className="absolute left-2 right-2 top-[calc(100%+8px)] md:hidden z-50"
              >
                <div className="rounded-2xl border border-border-light bg-black/80 backdrop-blur-md shadow-elegant p-2">
                  <div className="grid gap-1">
                    {links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        onClick={close}
                        className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-accent text-sm"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
