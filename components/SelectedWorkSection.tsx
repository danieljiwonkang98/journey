"use client";

import { WORKS, workHref, type Work } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

const SCROLL_SPEED_PX_PER_SEC = 80;
const RESUME_DELAY_MS = 1500;
const DRAG_CLICK_THRESHOLD_PX = 5;

type CardInteractionHandlers = {
  onCardHoverStart: () => void;
  onCardHoverEnd: () => void;
};

function WorkCard({
  work,
  onCardHoverStart,
  onCardHoverEnd,
}: {
  work: Work;
} & CardInteractionHandlers) {
  return (
    <Link
      href={workHref(work.id)}
      className="group relative block shrink-0 overflow-hidden rounded-[8px]"
      style={{
        width: "var(--work-card-w)",
        height: "var(--work-card-h)",
      }}
      aria-label={`${work.title} — ${work.subtitle}`}
      onMouseEnter={onCardHoverStart}
      onMouseLeave={onCardHoverEnd}
      onFocus={onCardHoverStart}
      onBlur={onCardHoverEnd}
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

function WorkCardsTrack({
  works,
  ariaHidden,
  keyPrefix = "",
  onCardHoverStart,
  onCardHoverEnd,
}: {
  works: readonly Work[];
  ariaHidden?: boolean;
  keyPrefix?: string;
} & CardInteractionHandlers) {
  return (
    <div
      className="flex shrink-0 gap-6 pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {works.map((work) => (
        <WorkCard
          key={`${keyPrefix}${work.id}`}
          work={work}
          onCardHoverStart={onCardHoverStart}
          onCardHoverEnd={onCardHoverEnd}
        />
      ))}
    </div>
  );
}

function getTranslateX(element: HTMLElement) {
  return new DOMMatrixReadOnly(window.getComputedStyle(element).transform).m41;
}

function useContinuousWorkCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const loopWidthRef = useRef(0);
  const interactingRef = useRef(false);
  const hoverCountRef = useRef(0);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const syncAnimationPlayState = useCallback(() => {
    const track = trackRef.current;
    if (!track?.classList.contains("is-auto-playing")) return;

    const shouldPause = hoverCountRef.current > 0 || interactingRef.current;
    track.style.animationPlayState = shouldPause ? "paused" : "running";
  }, []);

  const onCardHoverStart = useCallback(() => {
    hoverCountRef.current += 1;
    syncAnimationPlayState();
  }, [syncAnimationPlayState]);

  const onCardHoverEnd = useCallback(() => {
    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
    syncAnimationPlayState();
  }, [syncAnimationPlayState]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateLoopWidth = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    const normalizePosition = (value: number) => {
      const loopWidth = loopWidthRef.current;
      if (loopWidth <= 0) return value;
      return ((value % loopWidth) + loopWidth) % loopWidth;
    };

    const applyManualPosition = (nextPosition: number) => {
      const normalized = normalizePosition(nextPosition);
      positionRef.current = normalized;
      track.style.transform = `translate3d(${-normalized}px, 0, 0)`;
    };

    const freezeAnimation = () => {
      const wasAutoPlaying = track.classList.contains("is-auto-playing");
      if (!wasAutoPlaying) return;

      track.style.animationPlayState = "paused";
      positionRef.current = normalizePosition(Math.abs(getTranslateX(track)));

      track.classList.remove("is-auto-playing");
      track.style.animationPlayState = "";
      track.style.animationDelay = "";
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
    };

    const startAutoPlay = () => {
      if (prefersReducedMotion || interactingRef.current) return;

      const loopWidth = loopWidthRef.current;
      if (loopWidth <= 0) return;

      const duration = loopWidth / SCROLL_SPEED_PX_PER_SEC;
      const progress = positionRef.current / loopWidth;
      const delay = -progress * duration;

      track.style.transform = "";
      track.style.setProperty("--marquee-duration", `${duration}s`);
      track.style.animationDelay = `${delay}s`;
      track.classList.add("is-auto-playing");
      syncAnimationPlayState();
    };

    const clearResumeTimeout = () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };

    const pauseAutoPlay = () => {
      interactingRef.current = true;
      clearResumeTimeout();
      freezeAnimation();
    };

    const scheduleResume = () => {
      clearResumeTimeout();
      resumeTimeoutRef.current = window.setTimeout(() => {
        interactingRef.current = false;
        resumeTimeoutRef.current = null;
        startAutoPlay();
      }, RESUME_DELAY_MS);
    };

    const syncAfterResize = () => {
      const wasAutoPlaying =
        track.classList.contains("is-auto-playing") && !interactingRef.current;

      if (wasAutoPlaying) {
        freezeAnimation();
      }

      updateLoopWidth();
      positionRef.current = normalizePosition(positionRef.current);

      if (wasAutoPlaying) {
        startAutoPlay();
      } else {
        applyManualPosition(positionRef.current);
      }
    };

    updateLoopWidth();
    if (!prefersReducedMotion) {
      startAutoPlay();
    }

    const resizeObserver = new ResizeObserver(syncAfterResize);
    resizeObserver.observe(track);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          if (!interactingRef.current && !prefersReducedMotion) {
            startAutoPlay();
          }
        } else {
          freezeAnimation();
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(viewport);

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      isDraggingRef.current = true;
      dragStartXRef.current = event.clientX;
      dragStartPosRef.current = positionRef.current;
      dragDistanceRef.current = 0;
      pauseAutoPlay();
      viewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const delta = event.clientX - dragStartXRef.current;
      dragDistanceRef.current = Math.max(
        dragDistanceRef.current,
        Math.abs(delta),
      );
      applyManualPosition(dragStartPosRef.current - delta);
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      scheduleResume();
    };

    const onWheel = (event: WheelEvent) => {
      if (
        Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
        event.deltaX === 0
      ) {
        return;
      }

      pauseAutoPlay();
      applyManualPosition(positionRef.current + event.deltaX);
      scheduleResume();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (dragDistanceRef.current > DRAG_CLICK_THRESHOLD_PX) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("wheel", onWheel, { passive: true });
    viewport.addEventListener("click", onClickCapture, true);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("click", onClickCapture, true);
      clearResumeTimeout();
      track.classList.remove("is-auto-playing");
    };
  }, [syncAnimationPlayState]);

  return { viewportRef, trackRef, onCardHoverStart, onCardHoverEnd };
}

export default function SelectedWorkSection() {
  const { viewportRef, trackRef, onCardHoverStart, onCardHoverEnd } =
    useContinuousWorkCarousel();

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
        ref={viewportRef}
        className="work-cards-marquee overflow-hidden pb-16 pl-[var(--space-works-inset)]"
        style={{ marginTop: "var(--space-works-cards-top)" }}
      >
        <div ref={trackRef} className="work-cards-track flex w-max">
          <WorkCardsTrack
            works={WORKS}
            onCardHoverStart={onCardHoverStart}
            onCardHoverEnd={onCardHoverEnd}
          />
          <WorkCardsTrack
            works={WORKS}
            ariaHidden
            keyPrefix="dup-"
            onCardHoverStart={onCardHoverStart}
            onCardHoverEnd={onCardHoverEnd}
          />
        </div>
      </div>
    </section>
  );
}
