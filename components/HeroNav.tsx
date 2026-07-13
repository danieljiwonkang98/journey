"use client";

import HeroNavLogo from "@/components/HeroNavLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    label: "PORTFOLIO",
    href: "/works",
    hoverClass: "hover:text-[#E2838C]",
    activeClass: "text-[#E2838C]",
    isActive: (pathname: string) => pathname.startsWith("/works"),
  },
  {
    label: "WHO WE ARE",
    href: "/#studio",
    hoverClass: "hover:text-[#2D91F3]",
    activeClass: "text-[#2D91F3]",
    isActive: () => false,
  },
] as const;

export default function HeroNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 sm:top-6">
      <div className="glass-nav flex items-center py-1.5 pr-1.5 pl-5">
        <HeroNavLogo />

        <div className="ml-4 flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = link.isActive(pathname);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`type-nav transition-colors duration-300 ${link.hoverClass} ${
                  active ? link.activeClass : "text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="mailto:daniel@startjourney.today"
          className="type-nav ml-4 flex h-12 items-center justify-center gap-2 rounded-[48px] bg-black px-5 text-white transition-colors duration-300 hover:text-[#F4E654]"
        >
          CONTACT US
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M5 15.8334L15.8333 5M5.43333 5H15.8333V15.4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
