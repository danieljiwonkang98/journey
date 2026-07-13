export default function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className="relative z-10 flex min-h-[66.67dvh] scroll-mt-[min(30vh,280px)] items-center justify-center bg-white px-6 pb-24 pt-16"
      aria-labelledby="how-we-work-heading"
    >
      <div className="-translate-y-[min(5vh,48px)] flex max-w-[min(1100px,92vw)] flex-col items-center text-center">
        <p className="type-section-label text-black">How we work</p>

        <h2
          id="how-we-work-heading"
          className="type-section-headline text-black"
          style={{ marginTop: "var(--space-craft-label-gap)" }}
        >
          We Work in
          <br />
          Clear Stages.
        </h2>

        <p
          className="type-craft-body text-[#7A7A7A]"
          style={{ marginTop: "var(--space-craft-headline-gap)" }}
        >
          First, we define what to build.
          <br />
          Then we design, develop, and launch it
          <br />
          with regular reviews and clear next steps.
        </p>
      </div>
    </section>
  );
}
