"use client";

import HeroCornerTime from "@/components/HeroCornerTime";
import { useEffect, useEffectEvent, useState } from "react";

type WhatWeMakeCornerProps = {
  headerId?: string;
};

export default function WhatWeMakeCorner({
  headerId = "what-we-make-header",
}: WhatWeMakeCornerProps) {
  const [visible, setVisible] = useState(true);

  const updateVisibility = useEffectEvent(() => {
    const header = document.getElementById(headerId);
    if (!header) {
      setVisible(window.scrollY < window.innerHeight);
      return;
    }

    const bottom = header.offsetTop + header.offsetHeight;
    setVisible(window.scrollY < bottom - 48);
  });

  useEffect(() => {
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [headerId]);

  return (
    <div
      className="fixed top-4 right-[var(--space-works-page-inset-x)] z-50 flex flex-col items-end gap-0.5 transition-opacity duration-300 sm:top-6"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <HeroCornerTime />
      <a
        href="mailto:daniel@startjourney.today"
        className="type-meta text-white hover:underline"
      >
        daniel@startjourney.today
      </a>
    </div>
  );
}
