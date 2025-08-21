import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";

export const metadata = { title: "Blog — Unnati Girase" };

export default function Blog() {
  return (
    <main>
      <NavBar />
      <section className="py-16 md:py-24">
        <h1 className="title mb-6">Blog</h1>
        <p className="text-neutral-300 mb-8">Short posts on projects, algorithms, and learnings.</p>
        <div className="grid gap-4">
          {posts.map(p => (
            <article key={p.slug} className="card p-5">
              <h2 className="text-xl font-semibold"><Link className="link" href={`/blog/${p.slug}`}>{p.title}</Link></h2>
              <p className="text-xs text-neutral-400 mt-1">{p.date}</p>
              <p className="mt-2 text-neutral-300">{p.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
