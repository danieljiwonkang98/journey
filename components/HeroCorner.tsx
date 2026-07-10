"use client";

import { useEffect, useState } from "react";

function formatGmtPlus2Time(date: Date) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60_000;
  const gmt2 = new Date(utc + 2 * 3_600_000);
  const hours = gmt2.getHours();
  const minutes = gmt2.getMinutes();
  const period = hours < 12 ? "오전" : "오후";
  const h12 = hours % 12 || 12;
  return `${h12}:${String(minutes).padStart(2, "0")} ${period} (GMT+2)`;
}

export default function HeroCorner() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(formatGmtPlus2Time(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-3 sm:top-6 sm:right-6">
      <div className="flex flex-col items-end gap-0.5 font-[family-name:var(--font-urbanist)] text-sm leading-tight text-white">
        <span>{time}</span>
        <a
          href="mailto:hello@startjourney.today"
          className="hover:underline"
        >
          hello@startjourney.today
        </a>
      </div>

      <div className="relative mt-1 h-[146px] w-[130px]">
        <div
          className="absolute top-2 right-0 overflow-hidden rounded-lg bg-cover bg-no-repeat"
          style={{
            width: 99.32,
            height: 133.7,
            transform: "rotate(13deg)",
            opacity: 0.8,
            backgroundImage:
              "url(/images/home/homepage_card_kindletters_preview.png.png)",
            backgroundPosition: "-69.166px -76.83px",
            backgroundSize: "209.107% 219.288%",
          }}
          aria-hidden
        />
        <div
          className="absolute top-0 right-4 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat"
          style={{
            width: 108,
            height: 146,
            backgroundImage: "url(/images/home/homepage_card_hype_preview.png)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
