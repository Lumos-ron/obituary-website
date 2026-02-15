import type { Metadata } from "next";
import { PreviewPageClient } from "./PreviewPageClient";

export const metadata: Metadata = {
  title: "Preview & Export Obituary",
  description: "Preview your obituary and download as Word, PDF, or image.",
};

export default function PreviewPage() {
  return <PreviewPageClient />;
}
