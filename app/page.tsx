import DotWalkers from "@/components/DotWalkers";
import HeroCorner from "@/components/HeroCorner";
import HeroNav from "@/components/HeroNav";
import JourneyWordmark from "@/components/JourneyWordmark";
import ManifestoSection from "@/components/ManifestoSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed background — stays put while content scrolls */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <DotWalkers />
      </div>

      {/* Always-on chrome — outside overflow sections so it never clips */}
      <HeroNav />

      {/* Hero — first viewport */}
      <section className="relative z-10 h-dvh overflow-hidden">
        {/* Wordmark sits above the canvas (not in an isolated stacking context)
            so mix-blend-mode: exclusion can invert against the walking dots. */}
        <JourneyWordmark />
        <HeroCorner />
      </section>

      {/* Manifesto — second viewport, scroll-lit sentences */}
      <ManifestoSection />

      {/* Selected work — solid black, no DotWalkers */}
      <SelectedWorkSection />
    </main>
  );
}
