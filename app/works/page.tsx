import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import HeroNav from "@/components/HeroNav";
import WhatWeMakeCorner from "@/components/WhatWeMakeCorner";
import WhatWeMakeSection from "@/components/WhatWeMakeSection";

export default function WorksPage() {
  return (
    <main className="relative bg-black">
      <HeroNav />
      <WhatWeMakeCorner />
      <WhatWeMakeSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
