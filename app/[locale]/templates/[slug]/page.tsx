import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateCard } from "@/components/templates/TemplateCard";
import {
  getTemplateById,
  getTemplates,
  getTemplatesByCategory,
  getRelatedTemplates,
} from "@/lib/templates";
import {
  TemplateCategory,
  VISUAL_THEMES,
} from "@/lib/types";
import { getTemplateTheme } from "@/lib/templates/theme-map";
import { VisualPreview } from "@/components/templates/VisualPreview";

const validCategories: TemplateCategory[] = [
  "mother", "father", "spouse", "grandparent", "sibling", "friend", "child", "general",
];

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function isCategory(slug: string): slug is TemplateCategory {
  return validCategories.includes(slug as TemplateCategory);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  const te = await getTranslations({ locale, namespace: "enums" });

  const baseUrl = "https://eternaltribute.com";

  if (isCategory(slug)) {
    const categoryLabel = te(`category.${slug}`);
    return {
      title: t("categoryPage.title", { category: categoryLabel }),
      description: t("categoryPage.description", { category: categoryLabel }),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}/templates/${slug}`])
        ),
      },
    };
  }

  const template = getTemplateById(slug, locale);
  if (!template) return {};
  return {
    title: `${template.title} - ${t("detail.useThisTemplate")}`,
    description: template.description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}/templates/${slug}`])
      ),
    },
  };
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const cat of validCategories) {
      params.push({ locale, slug: cat });
    }
    for (const t of getTemplates(locale)) {
      params.push({ locale, slug: t.id });
    }
  }
  return params;
}

function fillPreviewText(content: string) {
  return content
    .replace(/\{\{fullName\}\}/g, "Margaret Elizabeth Johnson")
    .replace(/\{\{firstName\}\}/g, "Margaret")
    .replace(/\{\{age\}\}/g, "78")
    .replace(/\{\{dateOfBirth\}\}/g, "March 15, 1946")
    .replace(/\{\{dateOfPassing\}\}/g, "January 8, 2025")
    .replace(/\{\{placeOfBirth\}\}/g, "Springfield, Illinois")
    .replace(/\{\{placeOfPassing\}\}/g, "her home")
    .replace(/\{\{cityOfResidence\}\}/g, "Portland, Oregon")
    .replace(/\{\{occupation\}\}/g, "elementary school teacher")
    .replace(/\{\{hobbies\}\}/g, "gardening, reading, and baking")
    .replace(/\{\{characterTraits\}\}/g, "loving, kind, and generous")
    .replace(
      /\{\{survivedBy\}\}/g,
      "her husband Robert, daughter Sarah (Tom), son David (Emily), and four grandchildren"
    )
    .replace(/\{\{precededBy\}\}/g, "her parents James and Mary Williams")
    .replace(
      /\{\{serviceDetails\}\}/g,
      "A memorial service will be held Saturday, January 15 at 2:00 PM at Grace Community Church."
    )
    .replace(/\{\{[^}]+\}\}/g, "___");
}

// Category page component
async function CategoryPage({ slug, locale }: { slug: TemplateCategory; locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });
  const te = await getTranslations({ locale, namespace: "enums" });

  const templates = getTemplatesByCategory(slug, locale);
  const categoryLabel = te(`category.${slug}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          {t("categoryPage.title", { category: categoryLabel })}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t("categoryPage.description", { category: categoryLabel })}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

// Template detail page component
async function TemplateDetailPage({ slug, locale }: { slug: string; locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });
  const te = await getTranslations({ locale, namespace: "enums" });

  const template = getTemplateById(slug, locale);
  if (!template) notFound();

  const related = getRelatedTemplates(template, locale);
  const themeId = getTemplateTheme(template.id);
  const themeConfig = VISUAL_THEMES[themeId];
  const previewText = fillPreviewText(template.content);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Template Visual Preview */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl border shadow-lg">
            <VisualPreview
              theme={themeId}
              fullName="Margaret Elizabeth Johnson"
              dateOfBirth="March 15, 1946"
              dateOfPassing="January 8, 2025"
              content={previewText}
            />
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {t("detail.themeLabel", { theme: themeConfig.name })} &middot; {t("detail.themeNote")}
          </p>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h1 className="font-serif text-2xl font-bold text-primary">
                {template.title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {template.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {te(`category.${template.category}`)}
                </Badge>
                <Badge variant="outline">
                  {te(`style.${template.style}`)}
                </Badge>
                <Badge variant="outline">{t("card.words", { count: template.wordCount })}</Badge>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full py-6 text-base" asChild>
                  <Link href={`/editor/${template.id}`}>{t("detail.useThisTemplate")}</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/create">{t("detail.orCreateFromScratch")}</Link>
                </Button>
              </div>
            </div>

            {related.length > 0 && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-serif text-lg font-semibold text-primary">
                  {t("detail.relatedTemplates")}
                </h3>
                <div className="space-y-3">
                  {related.map((rt) => (
                    <Link
                      key={rt.id}
                      href={`/templates/${rt.id}`}
                      className="block rounded-lg border p-3 transition-colors hover:bg-muted"
                    >
                      <p className="text-sm font-medium text-primary">
                        {rt.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {te(`style.${rt.style}`)} · {t("card.words", { count: rt.wordCount })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function TemplateSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (isCategory(slug)) {
    return <CategoryPage key={slug} slug={slug} locale={locale} />;
  }

  return <TemplateDetailPage key={slug} slug={slug} locale={locale} />;
}
