import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getGuideBySlug, getGuides } from "@/lib/guides";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug, locale);
  if (!guide) return {};

  const baseUrl = "https://eternaltribute.com";
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}/guides/${slug}`])
      ),
    },
  };
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const guide of getGuides(locale)) {
      params.push({ locale, slug: guide.slug });
    }
  }
  return params;
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "guides" });
  const guide = getGuideBySlug(slug, locale);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="mb-8">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-muted-foreground hover:text-primary"
        >
          {t("detail.backToGuides")}
        </Link>
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t("card.readingTime", { minutes: guide.readingTime })}
        </p>
      </div>

      <div
        className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />

      <div className="mt-12 rounded-xl border bg-primary/5 p-8 text-center">
        <h3 className="font-serif text-xl font-semibold text-primary">
          {t("detail.ctaTitle")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("detail.ctaDescription")}
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button asChild>
            <Link href="/create">{t("detail.createButton")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/templates">{t("detail.browseButton")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
