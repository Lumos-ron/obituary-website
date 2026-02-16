import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CreatePageClient } from "./CreatePageClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "create" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function CreatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CreatePageClient />;
}
