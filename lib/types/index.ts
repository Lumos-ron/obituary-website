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
