import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "WORKS", href: "#works" },
  { label: "WHO WE ARE", href: "#" },
  { label: "SERVICES", href: "#" },
] as const;

export default function HeroNav() {
  return (
    <nav className="fixed top-4 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 sm:top-6">
      <div className="glass-nav flex items-center py-1.5 pr-1.5 pl-5">
        <Image
          src="/images/journey/journey_circle_white.png"
          alt="Journey"
          width={36}
          height={36}
          className="aspect-square shrink-0"
          style={{ width: 36, height: 36 }}
          priority
        />

        <div className="ml-4 flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="type-nav text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="mailto:hello@startjourney.today"
          className="type-nav ml-4 flex h-12 items-center justify-center gap-2 rounded-[48px] bg-black px-5 text-white"
        >
          LET&apos;S TALK
          <Image
            src="/images/journey/upright_arrow.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden
          />
        </Link>
      </div>
    </nav>
  );
}
