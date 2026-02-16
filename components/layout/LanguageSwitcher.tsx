"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  de: "DE",
  ja: "JA",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "de" | "ja" });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none rounded-md border border-border bg-white px-3 py-1.5 pr-8 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label={t("switchLanguage")}
      >
        <option value="en">{t("en")}</option>
        <option value="de">{t("de")}</option>
        <option value="ja">{t("ja")}</option>
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
