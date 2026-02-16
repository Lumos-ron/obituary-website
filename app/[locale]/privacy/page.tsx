import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
    alternates: {
      languages: {
        en: "/en/privacy",
        de: "/de/privacy",
        ja: "/ja/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("lastUpdated")}</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">{t("overview.title")}</h2>
          <p className="mt-2">
            {t("overview.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("noCollect.title")}
          </h2>
          <p className="mt-2">
            {t("noCollect.intro")}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>{t("noCollect.items.accounts")}</li>
            <li>{t("noCollect.items.storage")}</li>
            <li>{t("noCollect.items.personal")}</li>
            <li>{t("noCollect.items.cookies")}</li>
            <li>{t("noCollect.items.sharing")}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("localStorage.title")}
          </h2>
          <p className="mt-2">
            {t("localStorage.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("analytics.title")}
          </h2>
          <p className="mt-2">
            {t("analytics.content")}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("thirdParty.title")}
          </h2>
          <p className="mt-2">
            {t("thirdParty.content")}
          </p>
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
