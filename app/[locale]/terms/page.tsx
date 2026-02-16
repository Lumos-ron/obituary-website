import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("terms.title"),
    description: t("terms.description"),
    alternates: {
      languages: {
        en: "/en/terms",
        de: "/de/terms",
        ja: "/ja/terms",
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("lastUpdated")}</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("acceptance.title")}
          </h2>
          <p className="mt-2">
            {t("acceptance.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("useOfService.title")}
          </h2>
          <p className="mt-2">
            {t("useOfService.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("ownership.title")}
          </h2>
          <p className="mt-2">
            {t("ownership.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("noWarranty.title")}
          </h2>
          <p className="mt-2">
            {t("noWarranty.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("liability.title")}
          </h2>
          <p className="mt-2">
            {t("liability.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("prohibited.title")}
          </h2>
          <p className="mt-2">{t("prohibited.intro")}</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>{t("prohibited.items.unlawful")}</li>
            <li>{t("prohibited.items.false")}</li>
            <li>{t("prohibited.items.disrupt")}</li>
            <li>{t("prohibited.items.scrape")}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("changes.title")}
          </h2>
          <p className="mt-2">
            {t("changes.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">{t("contactTitle")}</h2>
          <p className="mt-2">
            {t("contactContent")}
          </p>
        </section>
      </div>
    </div>
  );
}
