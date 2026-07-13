"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_WIDTH = 28.14;
const LOGO_HEIGHT = 25.98;

export default function HeroNavLogo() {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="relative block shrink-0"
      style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
      aria-label="Journey home"
    >
      <Image
        src="/icons/Journey_colored_circle.svg"
        alt="Journey"
        width={2814}
        height={2598}
        style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
        className="absolute inset-0 object-contain"
        priority
      />
    </Link>
  );
}
