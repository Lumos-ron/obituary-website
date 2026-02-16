import { GuideArticle } from "@/lib/types";
import { guides as enGuides } from "@/data/guides/en";

export function getGuides(locale: string = "en"): GuideArticle[] {
  if (locale === "de") {
    try {
      const { guides } = require("@/data/guides/de");
      return guides;
    } catch {
      return enGuides;
    }
  }
  if (locale === "ja") {
    try {
      const { guides } = require("@/data/guides/ja");
      return guides;
    } catch {
      return enGuides;
    }
  }
  return enGuides;
}

export function getGuideBySlug(slug: string, locale: string = "en"): GuideArticle | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

export function getGuideSlugs(locale: string = "en"): string[] {
  return getGuides(locale).map((g) => g.slug);
}
