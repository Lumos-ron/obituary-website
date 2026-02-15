export type VisualTheme =
  | "classic-white"
  | "soft-floral"
  | "dark-elegant"
  | "sunset-sky"
  | "rose-garden"
  | "ocean-mist"
  | "golden-light"
  | "forest-peace"
  | "lilac-dream"
  | "marble-grace";

export interface VisualThemeConfig {
  id: VisualTheme;
  name: string;
  description: string;
  bgClass: string;
  bgStyle: string; // Inline CSS background for reliable export rendering
  textClass: string;
  textColor: string; // Inline CSS color
  accentClass: string;
  accentColor: string; // Inline CSS color
  nameClass: string;
  nameColor: string; // Inline CSS color
  subTextClass: string;
  subTextColor: string; // Inline CSS color
  borderDecor: string;
  borderColor: string; // Inline CSS border-color
  photoFrame: "circle" | "rounded" | "oval";
  fontStyle: "serif" | "sans" | "elegant";
}

export const VISUAL_THEMES: Record<VisualTheme, VisualThemeConfig> = {
  "classic-white": {
    id: "classic-white",
    name: "Classic White",
    description: "Clean and timeless design",
    bgClass: "bg-white",
    bgStyle: "#ffffff",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-gray-300",
    accentColor: "#d1d5db",
    nameClass: "text-gray-900",
    nameColor: "#111827",
    subTextClass: "text-gray-500",
    subTextColor: "#6b7280",
    borderDecor: "border-gray-200",
    borderColor: "#e5e7eb",
    photoFrame: "circle",
    fontStyle: "serif",
  },
  "soft-floral": {
    id: "soft-floral",
    name: "Soft Floral",
    description: "Delicate floral watercolor border",
    bgClass: "bg-gradient-to-br from-rose-50 via-white to-pink-50",
    bgStyle: "linear-gradient(to bottom right, #fff1f2, #ffffff, #fdf2f8)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-rose-300",
    accentColor: "#fda4af",
    nameClass: "text-rose-900",
    nameColor: "#881337",
    subTextClass: "text-rose-400",
    subTextColor: "#fb7185",
    borderDecor: "border-rose-200",
    borderColor: "#fecdd3",
    photoFrame: "circle",
    fontStyle: "serif",
  },
  "dark-elegant": {
    id: "dark-elegant",
    name: "Dark Elegant",
    description: "Sophisticated dark with gold accents",
    bgClass: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
    bgStyle: "linear-gradient(to bottom, #111827, #1f2937, #111827)",
    textClass: "text-gray-200",
    textColor: "#e5e7eb",
    accentClass: "bg-amber-500",
    accentColor: "#f59e0b",
    nameClass: "text-amber-100",
    nameColor: "#fef3c7",
    subTextClass: "text-amber-400/70",
    subTextColor: "rgba(251,191,36,0.7)",
    borderDecor: "border-amber-500/30",
    borderColor: "rgba(245,158,11,0.3)",
    photoFrame: "circle",
    fontStyle: "elegant",
  },
  "sunset-sky": {
    id: "sunset-sky",
    name: "Sunset Sky",
    description: "Warm sunset gradient with peaceful tones",
    bgClass: "bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100",
    bgStyle: "linear-gradient(to bottom, #ffedd5, #ffe4e6, #f3e8ff)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-orange-300",
    accentColor: "#fdba74",
    nameClass: "text-orange-900",
    nameColor: "#7c2d12",
    subTextClass: "text-orange-500",
    subTextColor: "#f97316",
    borderDecor: "border-orange-200",
    borderColor: "#fed7aa",
    photoFrame: "circle",
    fontStyle: "serif",
  },
  "rose-garden": {
    id: "rose-garden",
    name: "Rose Garden",
    description: "Elegant roses with blush tones",
    bgClass: "bg-gradient-to-br from-pink-100 via-rose-50 to-red-50",
    bgStyle: "linear-gradient(to bottom right, #fce7f3, #fff1f2, #fef2f2)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-rose-400",
    accentColor: "#fb7185",
    nameClass: "text-rose-900",
    nameColor: "#881337",
    subTextClass: "text-rose-500",
    subTextColor: "#f43f5e",
    borderDecor: "border-rose-300",
    borderColor: "#fda4af",
    photoFrame: "oval",
    fontStyle: "elegant",
  },
  "ocean-mist": {
    id: "ocean-mist",
    name: "Ocean Mist",
    description: "Serene blue and seafoam tones",
    bgClass: "bg-gradient-to-b from-blue-50 via-cyan-50 to-teal-50",
    bgStyle: "linear-gradient(to bottom, #eff6ff, #ecfeff, #f0fdfa)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-teal-300",
    accentColor: "#5eead4",
    nameClass: "text-teal-900",
    nameColor: "#134e4a",
    subTextClass: "text-teal-500",
    subTextColor: "#14b8a6",
    borderDecor: "border-teal-200",
    borderColor: "#99f6e4",
    photoFrame: "circle",
    fontStyle: "sans",
  },
  "golden-light": {
    id: "golden-light",
    name: "Golden Light",
    description: "Warm golden glow with elegant feel",
    bgClass: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    bgStyle: "linear-gradient(to bottom right, #fffbeb, #fefce8, #fff7ed)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-amber-400",
    accentColor: "#fbbf24",
    nameClass: "text-amber-900",
    nameColor: "#78350f",
    subTextClass: "text-amber-600",
    subTextColor: "#d97706",
    borderDecor: "border-amber-200",
    borderColor: "#fde68a",
    photoFrame: "rounded",
    fontStyle: "elegant",
  },
  "forest-peace": {
    id: "forest-peace",
    name: "Forest Peace",
    description: "Calm green nature tones",
    bgClass: "bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50",
    bgStyle: "linear-gradient(to bottom, #f0fdf4, #ecfdf5, #f0fdfa)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-emerald-400",
    accentColor: "#34d399",
    nameClass: "text-emerald-900",
    nameColor: "#064e3b",
    subTextClass: "text-emerald-600",
    subTextColor: "#059669",
    borderDecor: "border-emerald-200",
    borderColor: "#a7f3d0",
    photoFrame: "rounded",
    fontStyle: "serif",
  },
  "lilac-dream": {
    id: "lilac-dream",
    name: "Lilac Dream",
    description: "Soft purple and lavender tones",
    bgClass: "bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50",
    bgStyle: "linear-gradient(to bottom right, #faf5ff, #f5f3ff, #fdf4ff)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-purple-300",
    accentColor: "#d8b4fe",
    nameClass: "text-purple-900",
    nameColor: "#581c87",
    subTextClass: "text-purple-500",
    subTextColor: "#a855f7",
    borderDecor: "border-purple-200",
    borderColor: "#e9d5ff",
    photoFrame: "oval",
    fontStyle: "elegant",
  },
  "marble-grace": {
    id: "marble-grace",
    name: "Marble Grace",
    description: "Sophisticated marble-inspired texture",
    bgClass: "bg-gradient-to-br from-gray-100 via-stone-50 to-gray-100",
    bgStyle: "linear-gradient(to bottom right, #f3f4f6, #fafaf9, #f3f4f6)",
    textClass: "text-gray-700",
    textColor: "#374151",
    accentClass: "bg-stone-400",
    accentColor: "#a8a29e",
    nameClass: "text-stone-800",
    nameColor: "#292524",
    subTextClass: "text-stone-500",
    subTextColor: "#78716c",
    borderDecor: "border-stone-300",
    borderColor: "#d6d3d1",
    photoFrame: "rounded",
    fontStyle: "serif",
  },
};

export interface Template {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  style: TemplateStyle;
  length: TemplateLength;
  content: string;
  tags: string[];
  popular: boolean;
  wordCount: number;
  theme?: VisualTheme;
}

export type TemplateCategory =
  | "mother"
  | "father"
  | "spouse"
  | "grandparent"
  | "sibling"
  | "friend"
  | "child"
  | "general";

export type TemplateStyle =
  | "traditional"
  | "modern"
  | "heartfelt"
  | "simple"
  | "religious";

export type TemplateLength = "short" | "standard" | "detailed";

export interface ObituaryData {
  // Step 1: Relationship
  relationship: TemplateCategory;

  // Step 2: Basic Info
  fullName: string;
  firstName: string;
  dateOfBirth: string;
  dateOfPassing: string;
  age: string;
  placeOfBirth: string;
  placeOfPassing: string;
  cityOfResidence: string;

  // Step 3: Life Highlights
  occupation: string;
  education: string;
  militaryService: boolean;
  militaryDetails: string;
  hobbies: string[];
  customHobbies: string;
  achievements: string;
  characterTraits: string[];

  // Step 4: Family Members
  survivedBy: FamilyMember[];
  precededBy: FamilyMember[];

  // Step 5: Service Info
  serviceType: string;
  serviceDate: string;
  serviceTime: string;
  serviceLocation: string;
  serviceAddress: string;
  additionalInstructions: string;

  // Step 6: Style
  selectedStyle: TemplateStyle;
}

export interface FamilyMember {
  relationship: string;
  name: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  readingTime: number;
  content: string;
}

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  mother: "Mother",
  father: "Father",
  spouse: "Spouse",
  grandparent: "Grandparent",
  sibling: "Sibling",
  friend: "Friend",
  child: "Child",
  general: "General",
};

export const STYLE_LABELS: Record<TemplateStyle, string> = {
  traditional: "Traditional",
  modern: "Modern",
  heartfelt: "Heartfelt",
  simple: "Simple",
  religious: "Religious",
};

export const LENGTH_LABELS: Record<TemplateLength, string> = {
  short: "Short (100-150 words)",
  standard: "Standard (200-300 words)",
  detailed: "Detailed (400+ words)",
};

export const HOBBY_OPTIONS = [
  "Reading",
  "Gardening",
  "Traveling",
  "Music",
  "Sports",
  "Cooking",
  "Fishing",
  "Photography",
  "Painting",
  "Volunteering",
  "Dancing",
  "Writing",
];

export const TRAIT_OPTIONS = [
  "Loving",
  "Kind",
  "Generous",
  "Humorous",
  "Strong",
  "Compassionate",
  "Patient",
  "Wise",
  "Gentle",
  "Faithful",
  "Resilient",
  "Joyful",
];

export const FAMILY_RELATIONSHIP_OPTIONS = [
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandchild",
  "Mother",
  "Father",
  "Niece",
  "Nephew",
  "Friend",
];
