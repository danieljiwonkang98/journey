import DotWalkers from "@/components/DotWalkers";
import Link from "next/link";

function UprightArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 h-dvh overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <DotWalkers bright />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="flex max-w-[min(1100px,92vw)] flex-col items-center text-center">
          <h2 id="contact-heading" className="type-section-headline text-black">
            Just the two of us.
            <br />
            and your idea.
          </h2>

          <p
            className="type-studio-body text-[#7A7A7A]"
            style={{ marginTop: "var(--space-contact-subheadline-gap)" }}
          >
            Even the half-imagined ones count.
          </p>

          <Link
            href="mailto:daniel@startjourney.today"
            className="type-contact-cta inline-flex items-center gap-2 text-black"
            style={{ marginTop: "var(--space-contact-cta-gap)" }}
          >
            Get in touch
            <UprightArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
