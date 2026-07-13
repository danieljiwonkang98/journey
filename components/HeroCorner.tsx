"use client";

import HeroCornerTime from "@/components/HeroCornerTime";
import { useEffect, useEffectEvent, useState } from "react";

export default function HeroCorner() {
  const [visible, setVisible] = useState(true);

  const updateVisibility = useEffectEvent(() => {
    setVisible(window.scrollY < window.innerHeight);
  });

  useEffect(() => {
    const onScrollOrResize = () => updateVisibility();
    const frame = requestAnimationFrame(() => {
      updateVisibility();
    });

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
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
    </div>
  );
}
