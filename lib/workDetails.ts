export type GalleryRow = {
  columns: 1 | 2 | 3;
  images: readonly string[];
};

export type WorkDetail = {
  id: string;
  title: string;
  product: string;
  industry: string;
  industryLabel: string;
  scope: string;
  headerImage: string;
  introduction: string;
  description: string;
  gallery: readonly GalleryRow[];
  externalUrl?: string;
};

const GALLERY_LAYOUT: readonly GalleryRow[] = [
  { columns: 2, images: ["1", "2"] },
  { columns: 1, images: ["3"] },
  { columns: 2, images: ["4", "5"] },
  { columns: 1, images: ["6"] },
  { columns: 2, images: ["7", "8"] },
] as const;

function galleryForProject(id: string): readonly GalleryRow[] {
  return GALLERY_LAYOUT.map((row) => ({
    columns: row.columns,
    images: row.images.map((n) => `/images/works/${id}/${id}${n}.png`),
  }));
}

export const WORK_DETAILS: readonly WorkDetail[] = [
  {
    id: "hype",
    title: "Hype",
    product: "Hype",
    industry: "Social",
    industryLabel: "Social Networking",
    scope: "Product Design, Branding, Web Development",
    headerImage: "/images/works/hype/hype_header.png",
    introduction: "Introduction",
    description:
      "Hype is a social app that allows users to vote anonymously on playful questions, sparking curiosity and positivity among friends.",
    gallery: galleryForProject("hype"),
    externalUrl: "https://hypeus.framer.website/",
  },
  {
    id: "kindletters",
    title: "Kindletters",
    product: "Kindletters",
    industry: "Mental Health",
    industryLabel: "Mental Health",
    scope: "UI Design, Interaction Design, Brand Identity, Frontend Development",
    headerImage: "/images/works/kindletters/kindletters_header.png",
    introduction: "Introduction",
    description:
      "Kindletters is a heartfelt platform where users can share their feelings anonymously and receive comforting replies. It's built on trust, softness, and sincerity — not metrics.",
    gallery: galleryForProject("kindletters"),
    externalUrl: "https://kindletters.xyz/",
  },
  {
    id: "razorcode",
    title: "RazorCode",
    product: "RazorCode",
    industry: "Developer Tools",
    industryLabel: "Developer Tools",
    scope: "AI Product UX, Voice Interface Design, WebApp Architecture, Product Branding",
    headerImage: "/images/works/razorcode/razorcode_header.png",
    introduction: "Introduction",
    description:
      "RazorCode is an AI coding assistant that analyzes your entire codebase in real-time and suggests optimal code snippets, voice-controlled commands, and kanban-based task flow.",
    gallery: galleryForProject("razorcode"),
    externalUrl: "https://razorcode.ai/",
  },
  {
    id: "interviewshield",
    title: "InterviewShield",
    product: "InterviewShield",
    industry: "HR Tech",
    industryLabel: "HR Tech",
    scope: "Desktop App UX, UX/UI Design, Analytics Dashboard, Performance Metrics",
    headerImage: "/images/works/interviewshield/interviewshield_header.png",
    introduction: "Introduction",
    description:
      "InterviewShield monitors system-level activity to detect AI-based cheating in online interviews — from clipboard usage to eye tracking.",
    gallery: galleryForProject("interviewshield"),
    externalUrl: "https://interviewshield.co/",
  },
  {
    id: "mirai",
    title: "Mirai",
    product: "Mirai",
    industry: "Habits",
    industryLabel: "Habits",
    scope: "UX Design, Habit Design, Product Design",
    headerImage: "/images/works/what_we_make_previews/mirai_preview.png",
    introduction: "Introduction",
    description:
      "Mirai turns habit-building into something you want to return to — a personal world that grows as your routines do.",
    gallery: [
      {
        columns: 2,
        images: [
          "/images/works/what_we_make_previews/mirai_preview.png",
          "/images/card_preview/mirai_card.png",
        ],
      },
    ],
    externalUrl: "https://www.miraihabits.com/",
  },
] as const;

export function getWorkDetail(id: string): WorkDetail | undefined {
  return WORK_DETAILS.find((work) => work.id === id);
}

export function getRelatedWorks(currentId: string, count = 2): WorkDetail[] {
  const index = WORK_DETAILS.findIndex((work) => work.id === currentId);
  if (index === -1) return WORK_DETAILS.slice(0, count);

  const related: WorkDetail[] = [];
  for (let offset = 1; related.length < count && offset < WORK_DETAILS.length; offset++) {
    const next = WORK_DETAILS[(index + offset) % WORK_DETAILS.length];
    if (next.id !== currentId) related.push(next);
  }
  return related;
}
