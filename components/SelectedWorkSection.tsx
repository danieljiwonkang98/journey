import Image from "next/image";
import Link from "next/link";

type Work = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  tags: readonly string[];
};

const WORKS: readonly Work[] = [
  {
    id: "kindletters",
    title: "Kind Letters",
    subtitle: "Community",
    href: "https://startjourney.today/#/works/kindletters",
    image: "/images/card_preview/kindletters_card.png",
    tags: ["UX Design", "Emotional UI", "Community"],
  },
  {
    id: "hype",
    title: "Hype",
    subtitle: "Community",
    href: "https://startjourney.today/#/works/hype",
    image: "/images/card_preview/hype_card.png",
    tags: ["UX Design", "Microinteraction", "Flutter Development"],
  },
  {
    id: "mirai",
    title: "Mirai",
    subtitle: "Habits",
    href: "https://www.miraihabits.com/",
    image: "/images/card_preview/mirai_card.png",
    tags: ["UX Design", "Habit Design", "Product Design"],
  },
  {
    id: "interviewshield",
    title: "InterviewShield",
    subtitle: "Security",
    href: "https://startjourney.today/#/works/interviewshield",
    image: "/images/card_preview/interviewshield_card.png",
    tags: ["Desktop App", "AI", "Security UX"],
  },
  {
    id: "razorcode",
    title: "RazorCode",
    subtitle: "Developer Tools",
    href: "https://startjourney.today/#/works/razorcode",
    image: "/images/card_preview/RazorCode_card.png",
    tags: ["AI Tool", "Developer Experience", "Productivity"],
  },
] as const;

function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block shrink-0 overflow-hidden rounded-[8px]"
      style={{
        width: "var(--work-card-w)",
        height: "var(--work-card-h)",
      }}
      aria-label={`${work.title} — ${work.subtitle}`}
    >
      <Image
        src={work.image}
        alt=""
        fill
        sizes="(max-width: 1920px) 36vw, 700px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        priority={work.id === "kindletters"}
      />

      {/* Bottom gradient for title legibility */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
        aria-hidden
      />

      <div className="absolute top-5 left-5 flex flex-col items-start gap-1.5 sm:top-6 sm:left-6">
        {work.tags.map((tag) => (
          <span key={tag} className="work-card-tag type-card-tag text-white">
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute right-5 bottom-5 left-5 sm:right-6 sm:bottom-6 sm:left-6">
        <h3 className="type-card-title text-white">{work.title}</h3>
        <p className="type-card-subtitle mt-1 text-white">{work.subtitle}</p>
      </div>
    </Link>
  );
}

export default function SelectedWorkSection() {
  return (
    <section
      id="works"
      className="relative z-10 bg-black"
      aria-labelledby="selected-work-heading"
    >
      {/* Divider inset matches --space-works-inset (48px at 1920) */}
      <div className="px-[var(--space-works-inset)]" aria-hidden>
        <div className="border-t border-white/20" />
      </div>

      <div
        className="pl-[var(--space-works-inset)]"
        style={{ paddingTop: "var(--space-works-label-top)" }}
      >
        <p className="type-section-label text-white">Selected work</p>

        <h2
          id="selected-work-heading"
          className="type-section-headline text-white"
          style={{ marginTop: "var(--space-works-headline-top)" }}
        >
          Five products, shaped
          <br />
          from first sketch to final ship.
        </h2>
      </div>

      <div
        className="work-cards-row flex gap-6 overflow-x-auto pb-16 pr-[var(--space-works-inset)] pl-[var(--space-works-inset)]"
        style={{ marginTop: "var(--space-works-cards-top)" }}
      >
        {WORKS.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}
