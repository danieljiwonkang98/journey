import type { GalleryRow } from "@/lib/workDetails";
import Image from "next/image";

function GalleryImage({ src }: { src: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[8px]">
      <Image
        src={src}
        alt=""
        width={1920}
        height={1080}
        sizes="(max-width: 1920px) 100vw, 920px"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function GalleryRowBlock({ row }: { row: GalleryRow }) {
  const gridClass =
    row.columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : row.columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1";

  return (
    <div
      className={`grid ${gridClass}`}
      style={{ gap: "var(--space-work-detail-gallery-gap)" }}
    >
      {row.images.map((src) => (
        <GalleryImage key={src} src={src} />
      ))}
    </div>
  );
}

type WorkGalleryProps = {
  gallery: readonly GalleryRow[];
};

export default function WorkGallery({ gallery }: WorkGalleryProps) {
  return (
    <div
      className="flex flex-col px-[var(--space-works-page-inset-x)]"
      style={{ gap: "var(--space-work-detail-gallery-gap)" }}
    >
      {gallery.map((row, index) => (
        <GalleryRowBlock key={`${row.columns}-${index}`} row={row} />
      ))}
    </div>
  );
}
