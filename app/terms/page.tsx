import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "EternalTribute terms of service and usage guidelines.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Acceptance of Terms
          </h2>
          <p className="mt-2">
            By accessing and using EternalTribute, you agree to these Terms of Service.
            If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Use of Service
          </h2>
          <p className="mt-2">
            EternalTribute provides free obituary templates and creation tools. You may
            use these templates for personal, non-commercial purposes to create obituaries
            for yourself or on behalf of family members.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Content Ownership
          </h2>
          <p className="mt-2">
            The obituary content you create using our tools belongs to you. Our templates
            and website design remain the property of EternalTribute. You are free to use,
            modify, and distribute the obituaries you create.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            No Warranty
          </h2>
          <p className="mt-2">
            Our service is provided &ldquo;as is&rdquo; without warranties of any kind. While we
            strive to provide accurate templates and reliable tools, we cannot guarantee
            that the service will be error-free or uninterrupted.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            EternalTribute shall not be liable for any damages arising from your use of
            the service. You are responsible for reviewing and verifying any obituary
            content before publication or distribution.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Prohibited Uses
          </h2>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Use the service for any unlawful purpose</li>
            <li>Create false or misleading obituaries</li>
            <li>Attempt to disrupt or damage the website</li>
            <li>Scrape or collect data from the website</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Changes to Terms
          </h2>
          <p className="mt-2">
            We reserve the right to modify these terms at any time. Continued use of the
            website after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">Contact</h2>
          <p className="mt-2">
            For questions about these terms, contact us at support@eternaltribute.com.
          </p>
        </section>
      </div>
    </div>
  );
}
