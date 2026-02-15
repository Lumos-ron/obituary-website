import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about EternalTribute and our mission to help families honor their loved ones.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        About EternalTribute
      </h1>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          EternalTribute was created with a simple yet profound mission: to help
          families find the right words during one of life&apos;s most difficult moments.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">Our Mission</h2>
        <p>
          We believe every life deserves to be honored with dignity and grace. When you
          lose someone you love, the last thing you want to worry about is how to write
          an obituary. That&apos;s where we come in — providing free, beautifully crafted
          templates and tools to help you create a meaningful tribute.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">Why We Built This</h2>
        <p>
          After experiencing the difficulty of writing obituaries firsthand, we realized
          there was a need for a simple, free, and compassionate tool. Many existing
          services charge high fees or require complex sign-up processes. We wanted to
          remove those barriers and make it easy for anyone to create a beautiful memorial.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">What We Offer</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>20+ professionally written obituary templates</li>
          <li>A step-by-step obituary creation wizard</li>
          <li>A flexible online editor with live preview</li>
          <li>Free export to Word, PDF, and image formats</li>
          <li>Comprehensive writing guides and resources</li>
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-primary">Your Privacy Matters</h2>
        <p>
          We do not collect, store, or share any personal information. Everything you
          create stays in your browser. We have no accounts, no databases of personal
          data, and no tracking. Your privacy during this sensitive time is paramount.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-primary">Contact Us</h2>
        <p>
          If you have questions, suggestions, or need assistance, please reach out to us
          at <strong>support@eternaltribute.com</strong>. We&apos;re here to help.
        </p>
      </div>

      <div className="mt-10">
        <Button asChild>
          <Link href="/create">Create an Obituary</Link>
        </Button>
      </div>
    </div>
  );
}
