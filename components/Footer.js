export default function Footer() {
  return (
    <footer className="py-12 text-sm text-neutral-400">
      <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Unnati Girase. All rights reserved.</p>
        <p>Built with Next.js + Tailwind. Deployed on Vercel.</p>
      </div>
    </footer>
  );
}
