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
  textClass: string;
  accentClass: string;
  nameClass: string;
  subTextClass: string;
  borderDecor: string;
  photoFrame: "circle" | "rounded" | "oval";
  fontStyle: "serif" | "sans" | "elegant";
}

export const VISUAL_THEMES: Record<VisualTheme, VisualThemeConfig> = {
  "classic-white": {
    id: "classic-white",
    name: "Classic White",
    description: "Clean and timeless design",
    bgClass: "bg-white",
    textClass: "text-gray-700",
    accentClass: "bg-gray-300",
    nameClass: "text-gray-900",
    subTextClass: "text-gray-500",
    borderDecor: "border-gray-200",
    photoFrame: "circle",
    fontStyle: "serif",
  },
  "soft-floral": {
    id: "soft-floral",
    name: "Soft Floral",
    description: "Delicate floral watercolor border",
    bgClass: "bg-gradient-to-br from-rose-50 via-white to-pink-50",
    textClass: "text-gray-700",
    accentClass: "bg-rose-300",
    nameClass: "text-rose-900",
    subTextClass: "text-rose-400",
    borderDecor: "border-rose-200",
    photoFrame: "circle",
    fontStyle: "serif",
  },
  "dark-elegant": {
    id: "dark-elegant",
    name: "Dark Elegant",
    description: "Sophisticated dark with gold accents",
    bgClass: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
    textClass: "text-gray-200",
    accentClass: "bg-amber-500",
    nameClass: "text-amber-100",
    subTextClass: "text-amber-400/70",
    borderDecor: "border-amber-500/30",
    photoFrame: "circle",
    fontStyle: "elegant",
  },
  "sunset-sky": {
    id: "sunset-sky",
    name: "Sunset Sky",
    description: "Warm sunset gradient with peaceful tones",
    bgClass: "bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100",
    textClass: "text-gray-700",
    accentClass: "bg-orange-300",
    nameClass: "text-orange-900",
    subTextClass: "text-orange-500",
    borderDecor: "border-orange-200",
    photoFrame: "circle",
    fontStyle: "serif",
  },
  "rose-garden": {
    id: "rose-garden",
    name: "Rose Garden",
    description: "Elegant roses with blush tones",
    bgClass: "bg-gradient-to-br from-pink-100 via-rose-50 to-red-50",
    textClass: "text-gray-700",
    accentClass: "bg-rose-400",
    nameClass: "text-rose-900",
    subTextClass: "text-rose-500",
    borderDecor: "border-rose-300",
    photoFrame: "oval",
    fontStyle: "elegant",
  },
  "ocean-mist": {
    id: "ocean-mist",
    name: "Ocean Mist",
    description: "Serene blue and seafoam tones",
    bgClass: "bg-gradient-to-b from-blue-50 via-cyan-50 to-teal-50",
    textClass: "text-gray-700",
    accentClass: "bg-teal-300",
    nameClass: "text-teal-900",
    subTextClass: "text-teal-500",
    borderDecor: "border-teal-200",
    photoFrame: "circle",
    fontStyle: "sans",
  },
  "golden-light": {
    id: "golden-light",
    name: "Golden Light",
    description: "Warm golden glow with elegant feel",
    bgClass: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    textClass: "text-gray-700",
    accentClass: "bg-amber-400",
    nameClass: "text-amber-900",
    subTextClass: "text-amber-600",
    borderDecor: "border-amber-200",
    photoFrame: "rounded",
    fontStyle: "elegant",
  },
  "forest-peace": {
    id: "forest-peace",
    name: "Forest Peace",
    description: "Calm green nature tones",
    bgClass: "bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50",
    textClass: "text-gray-700",
    accentClass: "bg-emerald-400",
    nameClass: "text-emerald-900",
    subTextClass: "text-emerald-600",
    borderDecor: "border-emerald-200",
    photoFrame: "rounded",
    fontStyle: "serif",
  },
  "lilac-dream": {
    id: "lilac-dream",
    name: "Lilac Dream",
    description: "Soft purple and lavender tones",
    bgClass: "bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50",
    textClass: "text-gray-700",
    accentClass: "bg-purple-300",
    nameClass: "text-purple-900",
    subTextClass: "text-purple-500",
    borderDecor: "border-purple-200",
    photoFrame: "oval",
    fontStyle: "elegant",
  },
  "marble-grace": {
    id: "marble-grace",
    name: "Marble Grace",
    description: "Sophisticated marble-inspired texture",
    bgClass: "bg-gradient-to-br from-gray-100 via-stone-50 to-gray-100",
    textClass: "text-gray-700",
    accentClass: "bg-stone-400",
    nameClass: "text-stone-800",
    subTextClass: "text-stone-500",
    borderDecor: "border-stone-300",
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
