import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getGuides } from "@/lib/guides";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "guides" });
  const guides = getGuides(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          {t("page.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t("page.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
            <div className="p-5">
              <h2 className="font-serif text-lg font-semibold text-primary group-hover:text-secondary">
                {guide.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {guide.description}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t("card.readingTime", { minutes: guide.readingTime })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
