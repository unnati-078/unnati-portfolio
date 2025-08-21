import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default function Post({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return <div className="p-8">Post not found.</div>;
  return (
    <main>
      <NavBar />
      <article className="py-16 md:py-24 prose prose-invert max-w-3xl">
        <h1 className="title mb-2">{post.title}</h1>
        <p className="text-xs text-neutral-400 mb-8">{post.date}</p>
        <div className="card p-6 whitespace-pre-wrap leading-relaxed">{post.content}</div>
      </article>
      <Footer />
    </main>
  );
}
