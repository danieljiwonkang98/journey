import { WORKS, workHref, type Work } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";

function WorkPreviewCard({ work }: { work: Work }) {
  return (
    <Link
      href={workHref(work.id)}
      className="group relative flex min-w-0 flex-1 flex-col items-start justify-between overflow-hidden rounded-[8px]"
      style={{ height: "var(--works-grid-card-h)" }}
      aria-label={`${work.title} — ${work.subtitle}`}
    >
      <Image
        src={work.previewImage}
        alt=""
        fill
        sizes="(max-width: 1920px) 50vw, 920px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

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

export default function WhatWeMakeSection() {
  return (
    <section
      className="relative z-10 bg-black pb-[var(--space-works-page-grid-bottom,80px)]"
      aria-labelledby="what-we-make-heading"
    >
      <div
        id="what-we-make-header"
        className="relative px-[var(--space-works-page-inset-x)]"
        style={{ paddingTop: "var(--space-works-page-top)" }}
      >
        <h1 id="what-we-make-heading" className="type-works-page-headline">
          What We Make
        </h1>

        <div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          style={{ marginTop: "var(--space-works-page-headline-gap)" }}
        >
          <p className="type-works-page-body max-w-[720px]">
            We invent, test, and build — before being asked.
            <br />
            These are projects we created because we couldn&apos;t not make
            them.
          </p>

          <p className="type-works-page-tagline shrink-0 lg:text-right">
            Beautiful. Crafted. Complete.
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 px-[var(--space-works-page-inset-x)] md:grid-cols-2"
        style={{
          marginTop: "var(--space-works-page-grid-top)",
          gap: "var(--space-works-grid-gap-y) var(--space-works-grid-gap-x)",
        }}
      >
        {WORKS.map((work) => (
          <WorkPreviewCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}
