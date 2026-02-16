import { MetadataRoute } from "next";
import { getTemplates } from "@/lib/templates";
import { getGuides } from "@/lib/guides";
import { routing } from "@/i18n/routing";
import { TemplateCategory } from "@/lib/types";

const BASE_URL = "https://eternaltribute.com";

const categories: TemplateCategory[] = [
  "mother", "father", "spouse", "grandparent", "sibling", "friend", "child", "general",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = `${BASE_URL}/${locale}`;

    // Static pages
    entries.push(
      { url: prefix, changeFrequency: "weekly", priority: 1.0 },
      { url: `${prefix}/templates`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${prefix}/create`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${prefix}/guides`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${prefix}/about`, changeFrequency: "monthly", priority: 0.5 },
      { url: `${prefix}/privacy`, changeFrequency: "monthly", priority: 0.3 },
      { url: `${prefix}/terms`, changeFrequency: "monthly", priority: 0.3 },
    );

    // Category pages
    for (const cat of categories) {
      entries.push({
        url: `${prefix}/templates/${cat}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Template pages
    const templates = getTemplates(locale);
    for (const t of templates) {
      entries.push({
        url: `${prefix}/templates/${t.id}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Guide pages
    const guides = getGuides(locale);
    for (const g of guides) {
      entries.push({
        url: `${prefix}/guides/${g.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
