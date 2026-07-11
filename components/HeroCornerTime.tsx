"use client";

import { formatSeoulHeroTime } from "@/lib/seoulTime";
import { useEffect, useState } from "react";

type HeroCornerTimeProps = {
  className?: string;
};

export default function HeroCornerTime({ className }: HeroCornerTimeProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(formatSeoulHeroTime(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`type-meta flex flex-col items-end gap-0.5 text-white ${className ?? ""}`}
    >
      <span>{time}</span>
    </div>
  );
}
