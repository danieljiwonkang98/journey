"use client";

import { useEffect, useState } from "react";
import DesktopHome from "@/components/DesktopHome";
import MobileDesktopPrompt from "@/components/MobileDesktopPrompt";

type Mode = "pending" | "mobile" | "desktop";

/**
 * Mount either the phone gate or the full desktop home — never both.
 * Dual DotWalkers loops (hidden + visible) can freeze canvas paint and look
 * like a blank black screen on phones.
 */
export default function HomeExperience() {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMode(mq.matches ? "mobile" : "desktop");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (mode === "pending") {
    return <div className="h-dvh min-h-dvh bg-black" aria-hidden />;
  }

  if (mode === "mobile") {
    return <MobileDesktopPrompt />;
  }

  return <DesktopHome />;
}
