import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { guides } from "@/data/guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
  };
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="mb-8">
        <Link
          href="/guides"
          className="mb-4 inline-block text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to Guides
        </Link>
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{guide.readingTime} min read</p>
      </div>

      <div
        className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />

      <div className="mt-12 rounded-xl border bg-primary/5 p-8 text-center">
        <h3 className="font-serif text-xl font-semibold text-primary">
          Ready to Create an Obituary?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Put these tips into practice with our free obituary creator
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button asChild>
            <Link href="/create">Create an Obituary</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/templates">Browse Templates</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
