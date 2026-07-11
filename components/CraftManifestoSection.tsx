"use client";

import { attachSeamlessLoop } from "@/lib/seamlessVideoLoop";
import { useEffect, useEffectEvent, useRef } from "react";

const VIDEO_SRC = "/videos/cheetah.mp4";

export default function CraftManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);

  const playBoth = useEffectEvent(async () => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    try {
      left.currentTime = right.currentTime;
      await Promise.all([left.play(), right.play()]);
    } catch {
      // Browsers may block until a gesture; muted + playsInline usually allows it
    }
  });

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const section = sectionRef.current;
    if (!left || !right || !section) return;

    const syncFromLeft = () => {
      if (Math.abs(left.currentTime - right.currentTime) > 0.05) {
        right.currentTime = left.currentTime;
      }
      if (right.paused && !left.paused) void right.play();
    };

    left.addEventListener("timeupdate", syncFromLeft);

    const detachLoop = attachSeamlessLoop(left, () => {
      right.currentTime = 0;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void playBoth();
        else {
          left.pause();
          right.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);

    void playBoth();

    return () => {
      left.removeEventListener("timeupdate", syncFromLeft);
      detachLoop();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-dvh items-center justify-center overflow-hidden bg-black"
      aria-labelledby="craft-manifesto-heading"
    >
      {/*
        2160×1080 cheetah — sides are swapped so the right half of the frame
        sits on the left edge and the left half sits on the right edge.
        Each video is height-full (aspect 2:1) so it overflows the 50vw clip.
      */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        aria-hidden
      >
        <video
          ref={leftRef}
          className="absolute top-1/2 right-0 h-full max-w-none -translate-y-1/2"
          style={{ aspectRatio: "2160 / 1080" }}
          src={VIDEO_SRC}
          muted
          playsInline
          autoPlay
          preload="auto"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        aria-hidden
      >
        <video
          ref={rightRef}
          className="absolute top-1/2 left-0 h-full max-w-none -translate-y-1/2"
          style={{ aspectRatio: "2160 / 1080" }}
          src={VIDEO_SRC}
          muted
          playsInline
          autoPlay
          preload="auto"
        />
      </div>

      <div className="relative z-10 flex max-w-[min(920px,90vw)] flex-col items-center px-6 text-center">
        <p className="type-section-label text-white">Manifesto</p>

        <h2
          id="craft-manifesto-heading"
          className="type-craft-headline text-white"
          style={{ marginTop: "var(--space-craft-label-gap)" }}
        >
          Anyone can ship fast now.
          <br />
          We&apos;d rather build something
          <br />
          worth keeping.
        </h2>

        <p
          className="type-craft-body text-white"
          style={{ marginTop: "var(--space-craft-headline-gap)" }}
        >
          Speed used to be a selling point. Now it&apos;s a given.
          <br />
          What lasts is the care in the details the craft you can feel but
          can&apos;t rush.
          <br />
          That&apos;s the part we obsess over.
        </p>
      </div>
    </section>
  );
}
