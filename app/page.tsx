import DotWalkers from "@/components/DotWalkers";
import HeroCorner from "@/components/HeroCorner";
import HeroNav from "@/components/HeroNav";
import JourneyWordmark from "@/components/JourneyWordmark";

export default function Home() {
  return (
    <section className="relative h-dvh overflow-hidden bg-black">
      <DotWalkers />

      {/* Wordmark sits above the canvas (not in an isolated stacking context)
          so mix-blend-mode: exclusion can invert against the walking dots. */}
      <JourneyWordmark />

      <HeroNav />
      <HeroCorner />
    </section>
  );
}
