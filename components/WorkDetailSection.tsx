import ContinueJourneySection from "@/components/ContinueJourneySection";
import WorkDetailHero from "@/components/WorkDetailHero";
import WorkDetailIntro from "@/components/WorkDetailIntro";
import WorkGallery from "@/components/WorkGallery";
import type { WorkDetail } from "@/lib/workDetails";

type WorkDetailSectionProps = {
  work: WorkDetail;
};

export default function WorkDetailSection({ work }: WorkDetailSectionProps) {
  return (
    <>
      <WorkDetailHero work={work} />
      <WorkDetailIntro work={work} />
      <WorkGallery gallery={work.gallery} />
      <ContinueJourneySection currentWorkId={work.id} />
    </>
  );
}
