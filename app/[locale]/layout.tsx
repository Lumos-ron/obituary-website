import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Noto Sans JP loaded via CSS @import for Japanese locale to avoid Turbopack build issues

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("home.title"),
      template: "%s | EternalTribute",
    },
    description: t("home.description"),
    keywords: [
      "obituary template",
      "free obituary template",
      "obituary template word",
      "memorial template",
      "death notice template",
      "obituary examples",
      "write an obituary",
    ],
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "ja" ? "ja_JP" : "en_US",
      url: `https://eternaltribute.com/${locale}`,
      siteName: "EternalTribute",
      title: t("home.ogTitle"),
      description: t("home.ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: "/en",
        de: "/de",
        ja: "/ja",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {locale === "ja" && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
            rel="stylesheet"
          />
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        style={locale === "ja" ? { fontFamily: "'Noto Sans JP', sans-serif" } : undefined}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Script
          defer
          src="https://umami2.lumoss.top/script.js"
          data-website-id="66a9b94a-4ce2-4c71-b53e-058b3633812f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
