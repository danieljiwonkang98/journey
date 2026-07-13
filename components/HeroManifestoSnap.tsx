"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 720;
const HERO_SNAP_THRESHOLD = 2;

/** Gentle acceleration into the snap without lingering at the start. */
function easeInQuad(t: number) {
  return t * t;
}

/**
 * One-shot magnet from the hero into manifesto — only fires when resting at
 * the top of the page and scrolling down. Never pulls back to manifesto on
 * the way up.
 */
export default function HeroManifestoSnap() {
  const lastScrollYRef = useRef(0);
  const animatingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lastScrollYRef.current = window.scrollY;

    const getManifestoTop = () =>
      document.getElementById("manifesto")?.offsetTop ?? 0;

    const cancelAnimation = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      animatingRef.current = false;
      document.documentElement.classList.remove("snap-animating");
    };

    const animateTo = (target: number) => {
      const start = window.scrollY;
      const distance = target - start;

      if (Math.abs(distance) < 1) {
        lastScrollYRef.current = target;
        return;
      }

      cancelAnimation();
      animatingRef.current = true;
      document.documentElement.classList.add("snap-animating");

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / DURATION_MS);
        const eased = easeInQuad(t);

        window.scrollTo(0, start + distance * eased);

        if (t < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
          return;
        }

        window.scrollTo(0, target);
        animationFrameRef.current = null;
        animatingRef.current = false;
        document.documentElement.classList.remove("snap-animating");
        lastScrollYRef.current = target;
      };

      animationFrameRef.current = requestAnimationFrame(step);
    };

    const snapToManifestoFromHero = () => {
      const manifestoTop = getManifestoTop();
      if (!manifestoTop) return;
      animateTo(manifestoTop);
    };

    const isAtHero = (scrollY: number) => scrollY <= HERO_SNAP_THRESHOLD;

    const onWheel = (event: WheelEvent) => {
      if (animatingRef.current) {
        event.preventDefault();
        return;
      }

      const manifestoTop = getManifestoTop();
      if (!manifestoTop) return;

      const scrollY = window.scrollY;
      if (scrollY >= manifestoTop) return;

      if (event.deltaY > 0 && isAtHero(scrollY)) {
        event.preventDefault();
        snapToManifestoFromHero();
      }
    };

    const onScroll = () => {
      if (animatingRef.current) return;

      const manifestoTop = getManifestoTop();
      if (!manifestoTop) return;

      const scrollY = window.scrollY;

      if (scrollY >= manifestoTop) {
        lastScrollYRef.current = scrollY;
        return;
      }

      const wasAtHero = isAtHero(lastScrollYRef.current);
      const scrollingDown = scrollY > lastScrollYRef.current;

      if (wasAtHero && scrollingDown && scrollY < manifestoTop) {
        snapToManifestoFromHero();
        return;
      }

      lastScrollYRef.current = scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimation();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
