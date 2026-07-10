"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

const SENTENCES = [
  "We're drawn to ideas, especially the half-imagined ones. ",
  "We love watching them grow into something real, and we'd like to keep meeting them all along the way. ",
  "What's left is yours. ",
  "The one you've only dreamed up once, fleeting, a little foolish, and all the more fun for it. ",
  "So —\u00A0Let's Talk Your JOURNEY",
] as const;

const INACTIVE = "rgba(255, 255, 255, 0.14)";
const ACTIVE = "#FFFFFF";

function sentenceProgress(index: number, progress: number, total: number) {
  // First sentence is lit when the section sticks; later ones follow scroll.
  const start = (index - 1) / total;
  const end = (index - 0.15) / total;
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function mixWhite(t: number) {
  const a = 0.14 + t * (1 - 0.14);
  return `rgba(255, 255, 255, ${a})`;
}

export default function ManifestoSection() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useEffectEvent(() => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - window.innerHeight;
    if (scrollable <= 0) {
      setProgress(rect.top <= 0 ? 1 : 0);
      return;
    }

    const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
    setProgress(scrolled / scrollable);
  });

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="relative z-10 h-[280vh]"
      aria-label="Manifesto"
    >
      {/*
        Padding from Figma desktop frame (1920×1080).
        Type uses .type-manifesto — exact 76px at design size, fluid below.
      */}
      <div className="sticky top-0 flex h-dvh items-start pt-[min(168px,15.5dvh)] pr-[25vw] pl-[clamp(24px,2.5vw,48px)]">
        <p className="type-manifesto w-full" style={{ color: INACTIVE }}>
          {SENTENCES.map((sentence, index) => {
            const t = sentenceProgress(index, progress, SENTENCES.length);
            return (
              <span
                key={sentence}
                style={{
                  color: t <= 0 ? INACTIVE : t >= 1 ? ACTIVE : mixWhite(t),
                  transition: "color 60ms linear",
                }}
              >
                {sentence}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
