import type { Metadata } from "next";
import { TemplatesPageClient } from "./TemplatesPageClient";

export const metadata: Metadata = {
  title: "Free Obituary Templates - Browse All Categories",
  description:
    "Browse our collection of free obituary templates for mother, father, spouse, grandparent, and more. Traditional, modern, heartfelt, and religious styles available.",
};

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}
