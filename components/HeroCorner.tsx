"use client";

import HeroCornerTime from "@/components/HeroCornerTime";
import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

type DeckPhase = "idle" | "anticipate" | "fan";

const ANTICIPATE_MS = 140;
const CURSOR_LERP = 0.4;
const WORKS_HREF = "/works";

export default function HeroCorner() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<DeckPhase>("idle");
  const [cursorActive, setCursorActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  const anticipateTimerRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  const updateVisibility = useEffectEvent(() => {
    setVisible(window.scrollY < window.innerHeight);
  });

  useEffect(() => {
    const onScrollOrResize = () => updateVisibility();
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      updateVisibility();
    });

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (anticipateTimerRef.current !== null) {
        window.clearTimeout(anticipateTimerRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cursorActive) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = () => {
      const el = cursorRef.current;
      if (el) {
        const current = currentPosRef.current;
        const target = targetPosRef.current;
        current.x += (target.x - current.x) * CURSOR_LERP;
        current.y += (target.y - current.y) * CURSOR_LERP;
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [cursorActive]);

  const clearAnticipateTimer = () => {
    if (anticipateTimerRef.current !== null) {
      window.clearTimeout(anticipateTimerRef.current);
      anticipateTimerRef.current = null;
    }
  };

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const snapCursor = (clientX: number, clientY: number) => {
    targetPosRef.current = { x: clientX, y: clientY };
    currentPosRef.current = { x: clientX, y: clientY };
    const el = cursorRef.current;
    if (el) {
      el.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const startFan = () => {
    clearAnticipateTimer();
    if (prefersReducedMotion()) {
      setPhase("fan");
      return;
    }
    setPhase("anticipate");
    anticipateTimerRef.current = window.setTimeout(() => {
      setPhase("fan");
      anticipateTimerRef.current = null;
    }, ANTICIPATE_MS);
  };

  const handleDeckEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    hoveringRef.current = true;
    snapCursor(event.clientX, event.clientY);
    setCursorActive(true);
    // Snap again after paint — portal node may not exist on the first enter frame
    requestAnimationFrame(() => {
      if (hoveringRef.current) {
        snapCursor(event.clientX, event.clientY);
      }
    });
    startFan();
  };

  const handleDeckLeave = () => {
    hoveringRef.current = false;
    clearAnticipateTimer();
    setPhase("idle");
    setCursorActive(false);
  };

  const handleDeckMove = (event: MouseEvent<HTMLAnchorElement>) => {
    targetPosRef.current = { x: event.clientX, y: event.clientY };
    if (prefersReducedMotion()) {
      snapCursor(event.clientX, event.clientY);
    }
  };

  const backTransform =
    phase === "anticipate"
      ? "rotate(5deg) scale(0.96) translate(3px, 2px)"
      : phase === "fan"
        ? "rotate(28deg) scale(1.12) translate(10px, -8px)"
        : "rotate(13deg) scale(1)";

  const frontTransform =
    phase === "anticipate"
      ? "rotate(3deg) scale(0.96) translate(-2px, 1px)"
      : phase === "fan"
        ? "rotate(-10deg) scale(1.12) translate(-14px, 4px)"
        : "rotate(0deg) scale(1)";

  const cardTransition =
    phase === "anticipate"
      ? "transform 140ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 140ms ease, opacity 140ms ease"
      : phase === "fan"
        ? "transform 420ms cubic-bezier(0.22, 1.15, 0.36, 1), box-shadow 420ms ease, opacity 420ms ease"
        : "transform 320ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 320ms ease, opacity 320ms ease";

  return (
    <>
      <div
        className="fixed top-4 right-4 z-50 flex flex-col items-end gap-3 transition-opacity duration-300 sm:top-6 sm:right-6"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-end gap-0.5">
          <HeroCornerTime />
          <a
            href="mailto:daniel@startjourney.today"
            className="type-meta text-white hover:underline"
          >
            daniel@startjourney.today
          </a>
        </div>

        <Link
          href={WORKS_HREF}
          aria-label="View what we make"
          className={`hero-corner-deck relative mt-1 block h-[146px] w-[130px] outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
            cursorActive ? "cursor-none" : "cursor-pointer"
          }`}
          onMouseEnter={handleDeckEnter}
          onMouseLeave={handleDeckLeave}
          onMouseMove={handleDeckMove}
          onFocus={startFan}
          onBlur={handleDeckLeave}
        >
          <span
            className="hero-corner-card absolute top-2 right-0 overflow-hidden rounded-lg bg-cover bg-no-repeat"
            style={{
              width: 99.32,
              height: 133.7,
              opacity: phase === "fan" ? 1 : 0.8,
              backgroundImage:
                "url(/images/home/homepage_card_kindletters_preview.png.png)",
              backgroundPosition: "-69.166px -76.83px",
              backgroundSize: "209.107% 219.288%",
              transform: backTransform,
              transformOrigin: "70% 80%",
              transition: cardTransition,
              zIndex: 1,
              boxShadow:
                phase === "fan"
                  ? "0 14px 28px rgba(0, 0, 0, 0.35)"
                  : "0 4px 12px rgba(0, 0, 0, 0.18)",
            }}
            aria-hidden
          />
          <span
            className="hero-corner-card absolute top-0 right-4 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat"
            style={{
              width: 108,
              height: 146,
              backgroundImage:
                "url(/images/home/homepage_card_hype_preview.png)",
              transform: frontTransform,
              transformOrigin: "40% 85%",
              transition: cardTransition,
              zIndex: 2,
              boxShadow:
                phase === "fan"
                  ? "0 16px 32px rgba(0, 0, 0, 0.4)"
                  : "0 6px 16px rgba(0, 0, 0, 0.22)",
            }}
            aria-hidden
          />
        </Link>
      </div>

      {mounted
        ? createPortal(
            <div
              ref={cursorRef}
              className={`hero-corner-cursor${cursorActive ? " is-active" : ""}`}
              aria-hidden
            >
              <span className="hero-corner-cursor-label">Works</span>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
