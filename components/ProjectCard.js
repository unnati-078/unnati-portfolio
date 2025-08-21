import Link from "next/link";

export default function ProjectCard({ p }) {
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {p.tags?.map(t => <span key={t} className="badge">{t}</span>)}
      </div>
      <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
      <p className="text-sm text-neutral-300 mb-4">{p.description}</p>
      <div className="flex gap-4">
        {p.github && <Link className="link" href={p.github} target="_blank">GitHub</Link>}
        {p.demo && <Link className="link" href={p.demo} target="_blank">Live demo</Link>}
      </div>
    </div>
  );
}
