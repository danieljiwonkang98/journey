"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

const SENTENCES = [
  "We're drawn to ideas before they're fully formed, especially the half-imagined ones. ",
  "We help find their shape and build them into something real.",
] as const;

const INACTIVE_ALPHA = 0.14;
const TRACK_HEIGHT = "320dvh";
const REVEAL_START = 0.06;
const REVEAL_END = 0.72;
const FEATHER_PERCENT = 14;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Hermite smoothstep — same ease lib2 uses on its scroll ramps. */
function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export default function ManifestoSection() {
  const trackRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
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
    const onScrollOrResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // The reveal occupies the middle of the track: a short settling beat before
  // it begins, then a generous fully-lit hold before the next section arrives.
  const revealProgress = smoothstep(
    (progress - REVEAL_START) / (REVEAL_END - REVEAL_START),
  );
  const revealEdge =
    revealProgress * (100 + FEATHER_PERCENT * 2) - FEATHER_PERCENT;
  const whiteStop =
    clamp01((revealEdge - FEATHER_PERCENT / 2) / 100) * 100;
  const grayStop =
    clamp01((revealEdge + FEATHER_PERCENT / 2) / 100) * 100;
  const inactiveColor = `rgba(255, 255, 255, ${INACTIVE_ALPHA})`;
  const inkFill = `linear-gradient(to bottom, #fff 0%, #fff ${whiteStop}%, ${inactiveColor} ${grayStop}%, ${inactiveColor} 100%)`;

  return (
    <section
      id="manifesto"
      ref={trackRef}
      className="relative z-10 bg-black"
      style={{ height: TRACK_HEIGHT }}
      aria-label="Manifesto"
    >
      {/*
        Padding from Figma desktop frame (1920×1080).
        Type uses .type-manifesto — exact 76px at design size, fluid below.
      */}
      <div className="sticky top-0 flex h-dvh min-h-dvh items-start bg-black pt-[min(240px,24dvh)] pr-[25vw] pl-[clamp(24px,2.5vw,48px)]">
        <p
          className="type-manifesto w-full pb-[0.12em]"
          style={{
            color: "transparent",
            backgroundImage: inkFill,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          {SENTENCES.join("")}
        </p>
      </div>
    </section>
  );
}
