import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: {
      languages: {
        en: "/en/about",
        de: "/de/about",
        ja: "/ja/about",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        {t("title")}
      </h1>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          {t("intro")}
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">{t("mission.title")}</h2>
        <p>
          {t("mission.content")}
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">{t("why.title")}</h2>
        <p>
          {t("why.content")}
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">{t("offer.title")}</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t("offer.items.templates")}</li>
          <li>{t("offer.items.wizard")}</li>
          <li>{t("offer.items.editor")}</li>
          <li>{t("offer.items.export")}</li>
          <li>{t("offer.items.guides")}</li>
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-primary">{t("privacy.title")}</h2>
        <p>
          {t("privacy.content")}
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">{t("contact.title")}</h2>
        <p>
          {t("contact.content")}{" "}
          <strong>{t("contact.email")}</strong>.{" "}
          {t("contact.closing")}
        </p>
      </div>

      <div className="mt-10">
        <Button asChild>
          <Link href="/create">{t("ctaButton")}</Link>
        </Button>
      </div>
    </div>
  );
}
