import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { achievements } from "@/data/achievements";

import GithubContributions from "@/public/GithubContributions";


export default function Home() {
  return (
    <main>
      <NavBar />

      {/* Hero */}
      <section className="py-16 md:py-28">
        <div className="grid md:grid-cols-[1.1fr,1fr] gap-10 items-center">
          <div>
            <div className="inline-block badge mb-4">CSE Student • Aspiring SDE • Innovator</div>
            <h1 className="title">Unnati Girase</h1>
            <p className="mt-4 text-neutral-300 max-w-2xl">
              I love building useful, clean experiences on the web — from algorithm visualizers to AI‑assisted apps.
              This portfolio is my logbook of projects, learning, and community work.
            </p>
            <div className="mt-6 flex gap-4">
              <Link className="link" href="/blog">Read the blog</Link>
              <a className="link" href="#projects">See projects</a>
            </div>
          </div>
          <div className="justify-self-center">
            <Image src="/avatar.svg" width={200} height={200} alt="avatar" className="rounded-full border border-neutral-800 p-2" />
          </div>
        </div>
      </section>



      <Section id="about" title="About">
        <p className="text-neutral-300 max-w-3xl">
          I’m a second‑year CSE student exploring full‑stack engineering, UI/UX, and AI integrations.
          I lead E‑Cell SSVPS and love building communities where ideas turn into shipped products.
        </p>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skills.map(s => (
            <div key={s} className="card py-3 px-4 text-center">{s}</div>
          ))}
        </div>
      </Section>

      <GithubContributions />

      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(p => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <div className="grid gap-4">
          {experience.map((e) => (
            <div key={e.role} className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <span className="badge">{e.period}</span>
              </div>
              <ul className="mt-3 list-disc pl-6 text-neutral-300">
                {e.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="achievements" title="Achievements">
        <ul className="grid gap-3">
          {achievements.map((a, i) => <li key={i} className="card p-4">{a}</li>)}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <div className="card p-5">
          <p>Email: <a className="link" href="mailto:hi@unnati.build">hi@unnati.build</a></p>
          <p>GitHub: <a className="link" href="https://github.com/your-username" target="_blank">github.com/your-username</a></p>
          <p>LinkedIn: <a className="link" href="https://www.linkedin.com/in/your-profile" target="_blank">linkedin.com/in/your-profile</a></p>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
