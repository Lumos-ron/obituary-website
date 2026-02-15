import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  CATEGORY_LABELS,
  STYLE_LABELS,
  VISUAL_THEMES,
} from "@/lib/types";
import { getTemplateTheme } from "@/lib/templates/theme-map";
import { VisualPreview } from "@/components/templates/VisualPreview";

const validCategories: TemplateCategory[] = [
  "mother", "father", "spouse", "grandparent", "sibling", "friend", "child", "general",
];

interface Props {
  params: Promise<{ slug: string }>;
}

function isCategory(slug: string): slug is TemplateCategory {
  return validCategories.includes(slug as TemplateCategory);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (isCategory(slug)) {
    const label = CATEGORY_LABELS[slug];
    return {
      title: `Free ${label} Obituary Templates`,
      description: `Browse our collection of free obituary templates for ${label.toLowerCase()}. Choose from traditional, modern, heartfelt, and religious styles.`,
    };
  }

  const template = getTemplateById(slug);
  if (!template) return {};
  return {
    title: `${template.title} - Free Obituary Template`,
    description: template.description,
  };
}

export function generateStaticParams() {
  const categoryParams = validCategories.map((c) => ({ slug: c }));
  const templateParams = getTemplates().map((t) => ({ slug: t.id }));
  return [...categoryParams, ...templateParams];
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
function CategoryPage({ slug }: { slug: TemplateCategory }) {
  const templates = getTemplatesByCategory(slug);
  const label = CATEGORY_LABELS[slug];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          {label} Obituary Templates
        </h1>
        <p className="mt-3 text-muted-foreground">
          Thoughtfully crafted templates to help you write a meaningful obituary
          for your {label.toLowerCase()}.
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
function TemplateDetailPage({ slug }: { slug: string }) {
  const template = getTemplateById(slug);
  if (!template) notFound();

  const related = getRelatedTemplates(template);
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
            Theme: <span className="font-medium">{themeConfig.name}</span> &middot; You can change the theme in the editor
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
                  For {CATEGORY_LABELS[template.category]}
                </Badge>
                <Badge variant="outline">
                  {STYLE_LABELS[template.style]}
                </Badge>
                <Badge variant="outline">{template.wordCount} words</Badge>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full py-6 text-base" asChild>
                  <Link href={`/editor/${template.id}`}>Use This Template</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/create">Or Create from Scratch</Link>
                </Button>
              </div>
            </div>

            {related.length > 0 && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-serif text-lg font-semibold text-primary">
                  Related Templates
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
                        {STYLE_LABELS[rt.style]} · {rt.wordCount} words
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
  const { slug } = await params;

  if (isCategory(slug)) {
    return <CategoryPage key={slug} slug={slug} />;
  }

  return <TemplateDetailPage key={slug} slug={slug} />;
}
