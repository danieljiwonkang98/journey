"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";

type Service = {
  id: string;
  index: string;
  title: string;
  caption: string;
  image: string;
};

const SERVICES: readonly Service[] = [
  {
    id: "product-strategy",
    index: "001",
    title: "Product Strategy",
    caption:
      "Defining the problem, the audience, and the clearest path to a useful product.",
    image: "/images/services/strategy-planning.png",
  },
  {
    id: "product-design",
    index: "002",
    title: "Product Design",
    caption:
      "Shaping flows and interfaces around how people will actually use the product.",
    image: "/images/services/product-design.png",
  },
  {
    id: "product-development",
    index: "003",
    title: "Development",
    caption:
      "Building polished products across mobile and web, with the design intent intact.",
    image: "/images/services/growth-marketing.png",
  },
  {
    id: "motion",
    index: "004",
    title: "Motion & Interaction",
    caption:
      "Using movement to guide attention, clarify feedback, and give the product a distinct feel.",
    image: "/images/services/motion-design.png",
  },
  {
    id: "launch",
    index: "005",
    title: "Launch & Iteration",
    caption:
      "Preparing the release, learning from real use, and improving what comes next.",
    image: "/images/services/launch-support.png",
  },
] as const;

export default function ServicesScrollSection() {
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [display, setDisplay] = useState(0);

  const updateActive = useEffectEvent(() => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - window.innerHeight;
    if (scrollable <= 0) {
      setActive(0);
      return;
    }

    const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
    const progress = scrolled / scrollable;
    const next = Math.min(
      SERVICES.length - 1,
      Math.floor(progress * SERVICES.length),
    );
    setActive(next);
  });

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Crossfade media when the active service changes
  useEffect(() => {
    if (active === display) return;

    const id = window.setTimeout(() => {
      setDisplay(active);
    }, 220);

    return () => window.clearTimeout(id);
  }, [active, display]);

  const mediaVisible = active === display;
  const current = SERVICES[display]!;

  return (
    <section
      ref={trackRef}
      id="services"
      className="relative z-10 bg-white"
      style={{ height: `${SERVICES.length * 100}vh` }}
      aria-label="Services"
    >
      <div className="px-[clamp(24px,5vw,96px)]" aria-hidden>
        <div className="border-t border-black/20" />
      </div>

      <div
        className="sticky top-0 flex h-dvh items-start px-[clamp(24px,5vw,96px)]"
        style={{ paddingTop: "var(--space-service-inset-top)" }}
      >
        <div className="mx-auto grid w-full max-w-[1728px] grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_var(--service-image-w)] lg:gap-[clamp(48px,8vw,160px)]">
          {/* Left — category list */}
          <ul
            className="flex min-w-0 flex-col"
            style={{ gap: "var(--space-service-item-gap)" }}
          >
            {SERVICES.map((service, i) => {
              const isActive = i === active;
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    className="type-service-item flex w-full items-start text-left transition-colors duration-500 ease-out"
                    style={{
                      color: isActive ? "#000000" : "#C8C8C8",
                      gap: "var(--space-service-index-gap)",
                    }}
                    onClick={() => {
                      const track = trackRef.current;
                      if (!track) return;
                      const scrollable =
                        track.offsetHeight - window.innerHeight;
                      const target =
                        track.offsetTop +
                        (scrollable * (i + 0.5)) / SERVICES.length;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="type-service-index shrink-0 tabular-nums">
                      ({service.index})
                    </span>
                    <span className="whitespace-nowrap">{service.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right — image + caption */}
          <div
            className="relative mx-auto w-full lg:mx-0 lg:justify-self-end lg:self-start"
            style={{ width: "var(--service-image-w)" }}
          >
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: mediaVisible ? 1 : 0,
                transform: mediaVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(12px) scale(0.985)",
              }}
            >
              <div
                className="relative overflow-hidden rounded-lg bg-neutral-100"
                style={{
                  width: "var(--service-image-w)",
                  height: "var(--service-image-h)",
                  aspectRatio: "57 / 40",
                }}
              >
                <Image
                  src={current.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 90vw, 456px"
                  className="object-cover"
                  priority={display === 0}
                />
              </div>
              <p
                className="type-service-caption text-black"
                style={{
                  marginTop: "var(--space-service-caption-gap)",
                  maxWidth: "var(--service-image-w)",
                }}
              >
                {current.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
