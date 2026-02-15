import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://eternaltribute.com"),
  title: {
    default: "Free Obituary Templates | Create Beautiful Memorials Online",
    template: "%s | EternalTribute",
  },
  description:
    "Create meaningful obituaries with our free templates. Choose from traditional, modern, and heartfelt designs. Download as Word, PDF, or share online.",
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
    locale: "en_US",
    url: "https://eternaltribute.com",
    siteName: "EternalTribute",
    title: "Free Obituary Templates | Create Beautiful Memorials Online",
    description:
      "Create meaningful obituaries with our free templates. Choose from traditional, modern, and heartfelt designs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Obituary Templates | EternalTribute",
    description:
      "Create meaningful obituaries with beautiful free templates",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Script
          defer
          src="https://umami.lumoss.top/script.js"
          data-website-id="906ae330-1023-49a8-810f-59c32e6a2fa8"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
