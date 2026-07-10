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
      className="group relative block shrink-0"
      style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
      aria-label="Journey home"
    >
      <Image
        src="/icons/journey_white_circle_logo.svg"
        alt="Journey"
        width={2814}
        height={2598}
        style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
        className="absolute inset-0 object-contain transition-opacity duration-300 group-hover:opacity-0"
        priority
      />
      <Image
        src="/icons/Journey_colored_circle.svg"
        alt=""
        width={2814}
        height={2598}
        style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
        aria-hidden
        className="absolute inset-0 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        priority
      />
    </Link>
  );
}
