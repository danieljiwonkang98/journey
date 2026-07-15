import DotWalkers from "@/components/DotWalkers";

/**
 * Phone-only gate for the home experience.
 */
export default function MobileDesktopPrompt() {
  return (
    <section
      className="relative z-10 flex h-dvh min-h-dvh flex-col overflow-hidden px-6"
      aria-label="Desktop recommended"
    >
      <div className="pointer-events-none absolute inset-0">
        <DotWalkers />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-5">
        <h1 className="text-[clamp(56px,18vw,88px)] leading-none font-semibold tracking-[-0.04em] text-white">
          Journey
        </h1>
        <p className="max-w-[22ch] text-[clamp(20px,5.5vw,26px)] leading-snug font-medium tracking-[-0.02em] text-white">
          Best experienced on desktop.
        </p>
        <p className="max-w-[28ch] text-[clamp(15px,4vw,17px)] leading-relaxed text-white/55">
          Open this site on a larger screen for the full immersive experience.
        </p>
      </div>
    </section>
  );
}
