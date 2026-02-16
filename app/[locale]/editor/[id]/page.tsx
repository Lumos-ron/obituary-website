import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EditorPageClient } from "./EditorPageClient";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "editor" });

  return {
    title: t("title"),
    description: t("title"),
  };
}

export default async function EditorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorPageClient />;
}
