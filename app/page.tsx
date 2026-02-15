import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { getPopularTemplates } from "@/lib/templates";

export default function HomePage() {
  const popularTemplates = getPopularTemplates();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f4f8] to-background px-4 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
            Honor Their Memory with Dignity
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Free obituary templates to help you find the right words in
            difficult times. Create a beautiful tribute in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 py-6 text-base" asChild>
              <Link href="/create">Create an Obituary</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base"
              asChild
            >
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "100% Free",
                desc: "No hidden costs, no sign-up required. All templates are completely free to use and download.",
              },
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "3-Minute Setup",
                desc: "Simple step-by-step process guides you through creating a meaningful obituary quickly.",
              },
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Multiple Formats",
                desc: "Download as Word, PDF, or image. Copy as text or share a link with family members.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mb-4 text-secondary">{feature.icon}</div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary">
              Popular Templates
            </h2>
            <p className="mt-3 text-muted-foreground">
              Choose from our most-used obituary templates to get started
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularTemplates.slice(0, 6).map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/templates">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-2xl font-bold text-primary">
            Trusted by Families Everywhere
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-12">
            <div>
              <p className="text-4xl font-bold text-primary">10,000+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Families Helped
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">20+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Template Options
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Free Forever
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "During the hardest week of my life, this tool helped me write a beautiful tribute for my mother.",
                name: "Sarah M.",
              },
              {
                quote:
                  "So easy to use. I had a lovely obituary ready for the newspaper within minutes.",
                name: "James R.",
              },
              {
                quote:
                  "The templates gave me the words when I couldn\u2019t find my own. I am so grateful this exists.",
                name: "Linda K.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 text-left shadow-sm"
              >
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm font-medium text-primary">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold">
            Ready to Create a Meaningful Tribute?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Our guided process makes it simple to write a heartfelt obituary.
            No experience needed.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-6 text-base"
              asChild
            >
              <Link href="/create">Start Creating Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 px-8 py-6 text-base text-white hover:bg-white/10"
              asChild
            >
              <Link href="/guides">Read Our Guides</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
