import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import HeroNav from "@/components/HeroNav";
import WhatWeMakeCorner from "@/components/WhatWeMakeCorner";
import WorkDetailSection from "@/components/WorkDetailSection";
import { getWorkDetail, WORK_DETAILS } from "@/lib/workDetails";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type WorkDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return WORK_DETAILS.map((work) => ({ id: work.id }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const work = getWorkDetail(id);

  if (!work) {
    return { title: "Work — Journey" };
  }

  return {
    title: `${work.title} — Journey`,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = getWorkDetail(id);

  if (!work) {
    notFound();
  }

  return (
    <main className="work-detail relative bg-black">
      <HeroNav />
      <WhatWeMakeCorner headerId="work-detail-header" />
      <WorkDetailSection work={work} />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
