import { MetadataRoute } from "next";
import { getTemplates } from "@/lib/templates";
import { guides } from "@/data/guides";
import { TemplateCategory } from "@/lib/types";

const BASE_URL = "https://eternaltribute.com";

const categories: TemplateCategory[] = [
  "mother", "father", "spouse", "grandparent", "sibling", "friend", "child", "general",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const templates = getTemplates();

  const staticPages = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/templates`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/create`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/templates/${cat}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const templatePages = templates.map((t) => ({
    url: `${BASE_URL}/templates/${t.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guidePages = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...templatePages, ...guidePages];
}
