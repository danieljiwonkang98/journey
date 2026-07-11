"use client";

import { attachSeamlessLoop } from "@/lib/seamlessVideoLoop";
import { WORKS } from "@/lib/works";
import { getRelatedWorks, type WorkDetail } from "@/lib/workDetails";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/cheetah.mp4";

function RelatedWorkCard({ work }: { work: WorkDetail }) {
  const preview = WORKS.find((item) => item.id === work.id);

  return (
    <Link
      href={`/works/${work.id}`}
      className="group relative mx-auto block shrink-0 rounded-[8px] lg:mx-0"
      style={{
        width: "var(--space-continue-journey-card-w)",
        height: "var(--space-continue-journey-card-h)",
      }}
      aria-label={work.title}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[8px]">
        <Image
          src={preview?.previewImage ?? work.headerImage}
          alt=""
          fill
          sizes="(max-width: 1920px) 30vw, 520px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="continue-journey-card-footer absolute inset-x-0 bottom-0 rounded-b-[8px]">
        <div
          className="continue-journey-card-footer-blur pointer-events-none absolute inset-0 rounded-b-[8px]"
          aria-hidden
        />
        <div
          className="continue-journey-card-footer-shade pointer-events-none absolute inset-0 rounded-b-[8px]"
          aria-hidden
        />
        <div className="relative z-10 px-5 pb-5 sm:px-6 sm:pb-6">
          <h3 className="continue-journey-card-title">{work.title}</h3>
          <p className="continue-journey-card-industry">{work.industryLabel}</p>
        </div>
      </div>
    </Link>
  );
}

type ContinueJourneySectionProps = {
  currentWorkId: string;
};

export default function ContinueJourneySection({
  currentWorkId,
}: ContinueJourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const related = getRelatedWorks(currentWorkId, 2);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const detachLoop = attachSeamlessLoop(video);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    void video.play().catch(() => undefined);

    return () => {
      detachLoop();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black"
      aria-labelledby="continue-journey-heading"
      style={{
        paddingTop: "var(--space-work-detail-gallery-bottom-gap)",
        paddingBottom: "var(--space-work-detail-gallery-bottom-gap)",
      }}
    >
      <div className="px-[var(--space-works-page-inset-x)]">
        <h2
          id="continue-journey-heading"
          className="type-continue-journey-title"
        >
          Continue the Journey
        </h2>

        <div
          className="flex flex-col items-center lg:flex-row lg:flex-nowrap lg:items-center lg:justify-center"
          style={{
            marginTop: "var(--space-continue-journey-row-top)",
            gap: "var(--space-works-grid-gap-x)",
          }}
        >
          <RelatedWorkCard work={related[0]} />

          <div
            className="relative shrink-0 overflow-hidden rounded-[8px] bg-black"
            style={{
              width: "var(--space-continue-journey-video-w)",
              height: "var(--space-continue-journey-card-h)",
            }}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="h-full w-full object-cover"
              muted
              playsInline
              autoPlay
              preload="auto"
            />
          </div>

          <RelatedWorkCard work={related[1]} />
        </div>
      </div>
    </section>
  );
}
