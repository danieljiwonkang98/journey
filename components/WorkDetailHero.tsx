import type { WorkDetail } from "@/lib/workDetails";
import Image from "next/image";

type WorkDetailHeroProps = {
  work: WorkDetail;
};

export default function WorkDetailHero({ work }: WorkDetailHeroProps) {
  const meta = [
    { label: "Product", value: work.product },
    { label: "Industry", value: work.industry },
    { label: "Scope", value: work.scope },
  ] as const;

  return (
    <section aria-labelledby="work-detail-title">
      <div
        id="work-detail-header"
        className="px-[var(--space-works-page-inset-x)]"
        style={{ paddingTop: "var(--space-work-detail-top)" }}
      >
        <h1 id="work-detail-title" className="type-work-detail-title">
          {work.title.toUpperCase()}
        </h1>

        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-[2fr_1fr_1fr]"
          style={{
            marginTop: "var(--space-work-detail-title-meta-gap)",
            paddingBottom: "var(--space-work-detail-meta-header-gap)",
          }}
        >
          {meta.map((item) => (
            <div key={item.label}>
              <p className="type-work-detail-meta-label">{item.label}</p>
              <p
                className="type-work-detail-meta-value"
                style={{ marginTop: "var(--space-work-detail-meta-value-gap)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="px-[var(--space-works-page-inset-x)]"
        style={{
          paddingBottom: "var(--space-work-detail-header-bottom-gap)",
        }}
      >
        <div className="relative w-full overflow-hidden rounded-[8px]">
          <Image
            src={work.headerImage}
            alt=""
            width={1920}
            height={1080}
            sizes="100vw"
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
