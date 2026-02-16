"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-bold text-primary">
              EternalTribute
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("brandDescription")}
            </p>
          </div>

          {/* Templates */}
          <div>
            <h3 className="text-sm font-semibold text-primary">{t("templates")}</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/templates/mother" as const, label: t("motherObituary") },
                { href: "/templates/father" as const, label: t("fatherObituary") },
                { href: "/templates/spouse" as const, label: t("spouseObituary") },
                { href: "/templates/grandparent" as const, label: t("grandparentObituary") },
                { href: "/templates/general" as const, label: t("generalObituary") },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-primary">{t("resources")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("writingGuides")}
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("obituaryCreator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("allTemplates")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-primary">{t("legal")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
