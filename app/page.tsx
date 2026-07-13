import ContactSection from "@/components/ContactSection";
import CraftManifestoSection from "@/components/CraftManifestoSection";
import DotWalkers from "@/components/DotWalkers";
import FooterSection from "@/components/FooterSection";
import FounderPhotoSection from "@/components/FounderPhotoSection";
import HeroCorner from "@/components/HeroCorner";
import HeroNav from "@/components/HeroNav";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import HeroManifestoSnap from "@/components/HeroManifestoSnap";
import JourneyWordmark from "@/components/JourneyWordmark";
import ManifestoSection from "@/components/ManifestoSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ServicesScrollSection from "@/components/ServicesScrollSection";
import StudioSection from "@/components/StudioSection";
import WaveBarsTransition from "@/components/WaveBarsTransition";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed background — stays put while content scrolls */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <DotWalkers />
      </div>

      {/* Always-on chrome — outside overflow sections so it never clips */}
      <HeroNav />

      <HeroManifestoSnap />

      {/* Hero — first viewport.
          No z-index here: a stacking context would flatten the wordmark’s
          mix-blend-mode: exclusion before it can invert against DotWalkers. */}
      <section
        id="hero"
        className="relative h-dvh min-h-dvh overflow-hidden"
      >
        <JourneyWordmark />
        <HeroCorner />
      </section>

      {/* Manifesto — second viewport, scroll-lit sentences */}
      <ManifestoSection />

      {/* Selected work — solid black, no DotWalkers */}
      <SelectedWorkSection />

      {/* Craft manifesto — split cheetah video + centered copy */}
      <CraftManifestoSection />

      {/* Black → white zipper wave (short transition) */}
      <WaveBarsTransition />

      {/* How we work — white, centered */}
      <HowWeWorkSection />

      {/* Services — scroll-driven category + media swap */}
      <ServicesScrollSection />

      {/* Founders — full-page photo */}
      <FounderPhotoSection />

      {/* Studio — founders intro */}
      <StudioSection />

      {/* Contact — bright DotWalkers + CTA */}
      <ContactSection />

      {/* Footer — status, links, wordmark */}
      <FooterSection />
    </main>
  );
}
