"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const EXPLORE_LINKS = [
  { label: "Portfolio", href: "/works" },
  { label: "Who we are", href: "#studio" },
  { label: "Contact us", href: "mailto:daniel@startjourney.today" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

// Icon forced to pure white regardless of the source artwork's colors.
const WHITE_FILTER = "brightness(0) invert(1)";

function useSeoulTime() {
  const [state, setState] = useState<{ time: string; isDay: boolean } | null>(
    null,
  );

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      const hour = Number(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Seoul",
          hour: "2-digit",
          hour12: false,
        }).format(now),
      );
      const isDay = hour >= 6 && hour < 18;

      setState({ time, isDay });
    };

    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}

export default function FooterSection() {
  const seoul = useSeoulTime();
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative z-10 overflow-hidden bg-black"
      aria-label="Footer"
    >
      <div
        className="px-[var(--space-works-inset)]"
        style={{ paddingTop: "var(--space-footer-inset-top)" }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
          {/* Left — status, headline, CTA, copyright */}
          <div>
            <div className="flex items-center gap-2">
              {seoul && (
                <Image
                  src={seoul.isDay ? "/icons/sun.svg" : "/icons/night.svg"}
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden
                  className="size-[14px] shrink-0"
                  style={{ filter: WHITE_FILTER }}
                />
              )}
              <span className="type-footer-meta">
                {seoul ? seoul.time : "\u00A0"}
              </span>
              <span
                className="type-footer-meta"
                style={{ marginLeft: "0.5em" }}
              >
                Seoul, still building
              </span>
            </div>

            <h2
              className="type-footer-heading"
              style={{ marginTop: "var(--space-footer-meta-heading-gap)" }}
            >
              S
              <Image
                src="/icons/journey_white_circle_logo.svg"
                alt="o"
                width={25}
                height={24}
                className="ml-[0.04em] mr-[0.02em] inline-block h-[calc(1ex+0.02em)] w-[calc(1ex+0.02em)] align-baseline"
                style={{ filter: WHITE_FILTER }}
              />
              {" what's your journey?"}
            </h2>

            <Link
              href="mailto:daniel@startjourney.today"
              className="type-footer-cta inline-flex items-center gap-2"
              style={{
                marginTop: "var(--space-footer-heading-cta-gap)",
                borderRadius: "48px",
                background: "#FFF",
                boxShadow: "0 0 20px 5px rgba(255, 43, 43, 0.00)",
                padding: "0.7em 1.4em",
              }}
            >
              Get in touch
            </Link>

            <p
              className="type-footer-copyright"
              style={{ marginTop: "var(--space-footer-cta-copyright-gap)" }}
            >
              {year} Journey Inc. All rights reserved.
              <br />
              Flows become products.
            </p>
          </div>

          {/* Right — link columns */}
          <div className="flex" style={{ gap: "var(--space-footer-cols-gap)" }}>
            <nav aria-label="Explore">
              <p className="type-footer-col-label">Explore</p>
              <ul
                className="flex flex-col"
                style={{
                  marginTop: "var(--space-footer-col-label-gap)",
                  gap: "var(--space-footer-links-gap)",
                }}
              >
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="type-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-label="Socials"
              style={{
                paddingRight: "var(--space-footer-socials-inset-right)",
              }}
            >
              <p className="type-footer-col-label">Socials</p>
              <ul
                className="flex flex-col"
                style={{
                  marginTop: "var(--space-footer-col-label-gap)",
                  gap: "var(--space-footer-links-gap)",
                }}
              >
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-footer-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Full-bleed Journey wordmark */}
      <div style={{ marginTop: "var(--space-footer-logo-gap)" }}>
        <Image
          src="/icons/JourneyLogoDarkGradientTop.svg"
          alt="Journey"
          width={1824}
          height={349}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
    </footer>
  );
}
