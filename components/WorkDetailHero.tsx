"use client";

import type { WorkDetail } from "@/lib/workDetails";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type WorkDetailHeroProps = {
  work: WorkDetail;
};

type EntrancePhase = "covered" | "split" | "settle" | "done";

const ENTRANCE_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const HOLD_MS = 350;
const SPLIT_MS = 900;
const SETTLE_MS = 900;
const SETTLE_START_MS = HOLD_MS + SPLIT_MS - 100;
const TEXT_RISE_START_MS = SETTLE_START_MS + 50;
const DONE_MS = 2100;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function WorkDetailHero({ work }: WorkDetailHeroProps) {
  const meta = [
    { label: "Product", value: work.product },
    { label: "Industry", value: work.industry },
    { label: "Scope", value: work.scope },
  ] as const;

  const [phase, setPhase] = useState<EntrancePhase>("covered");
  const [textRise, setTextRise] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const overlayImageRef = useRef<HTMLDivElement>(null);

  const animationComplete = phase === "done";

  useEffect(() => {
    if (prefersReducedMotion()) {
      const frame = window.requestAnimationFrame(() => {
        setPhase("done");
        setTextRise(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const splitTimer = window.setTimeout(() => setPhase("split"), HOLD_MS);
    const settleTimer = window.setTimeout(() => setPhase("settle"), SETTLE_START_MS);
    const textRiseTimer = window.setTimeout(() => setTextRise(true), TEXT_RISE_START_MS);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = previousOverflow;
    }, DONE_MS);

    return () => {
      window.clearTimeout(splitTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(textRiseTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (phase !== "settle") return;

    const container = imageContainerRef.current;
    const overlay = overlayImageRef.current;
    if (!container || !overlay) return;

    const endRect = container.getBoundingClientRect();

    const animation = overlay.animate(
      [
        {
          top: "0px",
          left: "0px",
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px`,
          borderRadius: "0px",
        },
        {
          top: `${endRect.top}px`,
          left: `${endRect.left}px`,
          width: `${endRect.width}px`,
          height: `${endRect.height}px`,
          borderRadius: "8px",
        },
      ],
      {
        duration: SETTLE_MS,
        easing: ENTRANCE_EASE,
        fill: "forwards",
      },
    );

    return () => animation.cancel();
  }, [phase]);

  const riseClass = (delayClass?: string) =>
    [
      "work-detail-rise",
      textRise ? "is-visible" : "",
      delayClass ?? "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <section aria-labelledby="work-detail-title">
      {!animationComplete && (
        <div
          className="work-entrance-overlay pointer-events-none fixed inset-0 z-40"
          aria-hidden
        >
          <div
            ref={overlayImageRef}
            className="work-entrance-image fixed overflow-hidden"
            style={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
            }}
          >
            <Image
              src={work.headerImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {phase !== "settle" && (
            <>
              <div
                className={`work-entrance-panel work-entrance-panel-left absolute top-0 left-0 h-full w-1/2 bg-black ${
                  phase === "split" ? "is-split" : ""
                }`}
              />
              <div
                className={`work-entrance-panel work-entrance-panel-right absolute top-0 right-0 h-full w-1/2 bg-black ${
                  phase === "split" ? "is-split" : ""
                }`}
              />
            </>
          )}
        </div>
      )}

      <div
        id="work-detail-header"
        className="px-[var(--space-works-page-inset-x)]"
        style={{ paddingTop: "var(--space-work-detail-top)" }}
      >
        <h1
          id="work-detail-title"
          className={`type-work-detail-title ${riseClass()}`}
        >
          {work.title.toUpperCase()}
        </h1>

        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-[2fr_1fr_1fr]"
          style={{
            marginTop: "var(--space-work-detail-title-meta-gap)",
            paddingBottom: "var(--space-work-detail-meta-header-gap)",
          }}
        >
          {meta.map((item, index) => (
            <div
              key={item.label}
              className={riseClass(`work-detail-rise-delay-${index + 1}`)}
            >
              <p className="type-work-detail-meta-label">{item.label}</p>
              <p
                className="type-work-detail-meta-value"
                style={{ marginTop: "var(--space-work-detail-meta-value-gap)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="px-[var(--space-works-page-inset-x)]"
        style={{
          paddingBottom: "var(--space-work-detail-header-bottom-gap)",
        }}
      >
        <div
          ref={imageContainerRef}
          className={`relative w-full overflow-hidden rounded-[8px] ${
            animationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={work.headerImage}
            alt=""
            width={1920}
            height={1080}
            sizes="100vw"
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
