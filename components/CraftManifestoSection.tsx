export default function CraftManifestoSection() {
  return (
    <section
      className="relative z-10 flex h-dvh items-center justify-center overflow-hidden bg-black"
      aria-labelledby="craft-manifesto-heading"
    >
      <div className="relative z-10 flex max-w-[min(920px,90vw)] flex-col items-center px-6 text-center">
        <p className="type-section-label text-white">Manifesto</p>

        <h2
          id="craft-manifesto-heading"
          className="type-craft-headline text-white"
          style={{ marginTop: "var(--space-craft-label-gap)" }}
        >
          More Features Don&apos;t Make a Better Product.
          <br />
          Better Decisions Do.
        </h2>

        <p
          className="type-craft-body text-white"
          style={{ marginTop: "var(--space-craft-headline-gap)" }}
        >
          We question what belongs, focus on what matters, and make every detail
          earn its place.
        </p>
      </div>
    </section>
  );
}
