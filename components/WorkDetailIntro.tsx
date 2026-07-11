import type { WorkDetail } from "@/lib/workDetails";

type WorkDetailIntroProps = {
  work: WorkDetail;
};

export default function WorkDetailIntro({ work }: WorkDetailIntroProps) {
  return (
    <section
      className="px-[var(--space-works-page-inset-x)]"
      aria-labelledby="work-detail-intro"
      style={{ paddingBottom: "var(--space-work-detail-intro-bottom-gap)" }}
    >
      <p id="work-detail-intro" className="type-work-detail-meta-label">
        {work.introduction}
      </p>

      <p
        className="type-work-detail-description"
        style={{ marginTop: "var(--space-work-detail-intro-text-gap)" }}
      >
        {work.description}
      </p>
    </section>
  );
}
