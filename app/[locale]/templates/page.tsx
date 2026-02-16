import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TemplatesPageClient } from "./TemplatesPageClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TemplatesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TemplatesPageClient />;
}
