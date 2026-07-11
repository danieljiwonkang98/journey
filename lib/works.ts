export type Work = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  previewImage: string;
  tags: readonly string[];
};

export function workHref(id: string) {
  return `/works/${id}`;
}

export const WORKS: readonly Work[] = [
  {
    id: "hype",
    title: "Hype",
    subtitle: "Community",
    image: "/images/card_preview/hype_card.png",
    previewImage: "/images/works/what_we_make_previews/hype_preview.png",
    tags: ["UX Design", "Microinteraction", "Flutter Development"],
  },
  {
    id: "kindletters",
    title: "Kindletters",
    subtitle: "Community",
    image: "/images/card_preview/kindletters_card.png",
    previewImage: "/images/works/what_we_make_previews/kindletters_preview.png",
    tags: ["UX Design", "Emotional UI", "Community"],
  },
  {
    id: "razorcode",
    title: "RazorCode",
    subtitle: "Developer Tools",
    image: "/images/card_preview/RazorCode_card.png",
    previewImage: "/images/works/what_we_make_previews/razorcode_preview.png",
    tags: ["AI Tool", "Developer Experience", "Productivity"],
  },
  {
    id: "interviewshield",
    title: "InterviewShield",
    subtitle: "Security",
    image: "/images/card_preview/interviewshield_card.png",
    previewImage: "/images/works/what_we_make_previews/interviewshield_preview.png",
    tags: ["Desktop App", "AI", "Security UX"],
  },
  {
    id: "mirai",
    title: "Mirai",
    subtitle: "Habits",
    image: "/images/card_preview/mirai_card.png",
    previewImage: "/images/works/what_we_make_previews/mirai_preview.png",
    tags: ["UX Design", "Habit Design", "Product Design"],
  },
] as const;
