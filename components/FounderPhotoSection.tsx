import Image from "next/image";

export default function FounderPhotoSection() {
  return (
    <section
      id="founders"
      className="relative z-10 flex min-h-dvh w-full items-center justify-center bg-white"
      aria-label="Founders"
      style={{ paddingBottom: "var(--space-founder-photo-bottom)" }}
    >
      <Image
        src="/images/founders/founder_photo.png"
        alt="Founders in the Journey studio"
        width={1920}
        height={1002}
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}
