export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-12 md:py-20">
      <h2 className="section">{title}</h2>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
