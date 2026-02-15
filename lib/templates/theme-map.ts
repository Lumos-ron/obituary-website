import { VisualTheme } from "@/lib/types";

// Map template IDs to visual themes for variety
const themeAssignments: Record<string, VisualTheme> = {
  "mother-traditional-01": "soft-floral",
  "mother-heartfelt-01": "rose-garden",
  "mother-simple-01": "lilac-dream",
  "mother-religious-01": "golden-light",
  "father-traditional-01": "marble-grace",
  "father-modern-01": "ocean-mist",
  "father-simple-01": "classic-white",
  "father-religious-01": "forest-peace",
  "spouse-traditional-01": "dark-elegant",
  "spouse-heartfelt-01": "sunset-sky",
  "spouse-modern-01": "golden-light",
  "grandparent-traditional-01": "classic-white",
  "grandparent-heartfelt-01": "soft-floral",
  "grandparent-simple-01": "marble-grace",
  "sibling-heartfelt-01": "ocean-mist",
  "sibling-modern-01": "forest-peace",
  "friend-heartfelt-01": "sunset-sky",
  "friend-modern-01": "lilac-dream",
  "child-heartfelt-01": "rose-garden",
  "child-religious-01": "golden-light",
  "general-traditional-01": "dark-elegant",
  "general-simple-01": "classic-white",
};

export function getTemplateTheme(templateId: string): VisualTheme {
  return themeAssignments[templateId] || "classic-white";
}
