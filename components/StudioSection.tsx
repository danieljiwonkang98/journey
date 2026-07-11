import Image from "next/image";

type Founder = {
  id: string;
  name: string;
  roleLine1: string;
  roleLine2: string;
  image: string;
};

const FOUNDERS: readonly Founder[] = [
  {
    id: "daniel",
    name: "Daniel",
    roleLine1: "CEO • The Engineer,",
    roleLine2: "Discipline & Precision",
    image: "/images/founders/daniel.png",
  },
  {
    id: "parker",
    name: "Parker",
    roleLine1: "CCO • The Designer,",
    roleLine2: "Aesthetics & Minimalist",
    image: "/images/founders/parker.png",
  },
] as const;

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[888/600] overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={founder.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div
        className="flex items-center"
        style={{ marginTop: "var(--space-studio-card-footer-top)" }}
      >
        <h3 className="type-founder-name shrink-0">{founder.name}</h3>
        <div
          className="shrink-0"
          style={{ width: "var(--space-founder-name-role-gap)" }}
          aria-hidden
        />
        <p className="type-founder-role min-w-0 text-black">
          {founder.roleLine1}
          <br />
          {founder.roleLine2}
        </p>
      </div>
    </article>
  );
}

export default function StudioSection() {
  return (
    <section
      id="studio"
      className="relative z-10 scroll-mt-24 bg-white"
      aria-labelledby="studio-heading"
    >
      <div className="px-[var(--space-works-inset)]" aria-hidden>
        <div className="border-t border-black/20" />
      </div>

      <div className="px-[var(--space-works-inset)] pb-[var(--space-works-inset)]">
        <p
          className="type-section-label text-black"
          style={{ paddingTop: "var(--space-studio-label-top)" }}
        >
          Studio
        </p>

        <div
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16"
          style={{ marginTop: "var(--space-studio-headline-top)" }}
        >
          <h2 id="studio-heading" className="type-section-headline text-black">
            Just the two of us.
          </h2>

          <p className="type-studio-body text-[#7A7A7A] lg:pt-2">
            You work directly with the people who make it. A
            <br />
            designer and a developer, that&apos;s the whole studio, and
            <br />
            that&apos;s the point.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            marginTop: "var(--space-studio-cards-top)",
            gap: "var(--space-studio-cards-gap)",
          }}
        >
          {FOUNDERS.map((founder) => (
            <FounderCard key={founder.id} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  );
}
