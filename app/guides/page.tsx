import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Obituary Writing Guides - Tips & Resources",
  description:
    "Learn how to write a meaningful obituary with our free guides. Get tips, examples, and best practices for honoring your loved one.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          Obituary Writing Guides
        </h1>
        <p className="mt-3 text-muted-foreground">
          Helpful resources to guide you through writing a meaningful obituary
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
            <div className="p-5">
              <h2 className="font-serif text-lg font-semibold text-primary group-hover:text-secondary">
                {guide.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {guide.description}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {guide.readingTime} min read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
