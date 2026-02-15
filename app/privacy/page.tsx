import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EternalTribute privacy policy - how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">Overview</h2>
          <p className="mt-2">
            EternalTribute is committed to protecting your privacy. This policy explains
            how we handle information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Information We Do NOT Collect
          </h2>
          <p className="mt-2">
            We do not collect, store, or process any personal information. Specifically:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>We do not require any user accounts or registration</li>
            <li>We do not store any obituary content on our servers</li>
            <li>We do not collect names, email addresses, or contact information</li>
            <li>We do not use cookies for tracking purposes</li>
            <li>We do not sell or share any data with third parties</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Local Storage
          </h2>
          <p className="mt-2">
            Our website uses your browser&apos;s local storage to save drafts of your
            work. This data is stored only on your device and is never transmitted to
            our servers. You can clear this data at any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Analytics
          </h2>
          <p className="mt-2">
            We may use basic, privacy-respecting analytics to understand how our website
            is used. This data is aggregated and anonymized — we never track individual users.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Third-Party Services
          </h2>
          <p className="mt-2">
            Our website is hosted on Vercel. Google Fonts are used for typography. These
            services have their own privacy policies. No personal data from our website
            is shared with these services beyond standard web hosting functionality.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">
            Changes to This Policy
          </h2>
          <p className="mt-2">
            We may update this privacy policy from time to time. Any changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-primary">Contact</h2>
          <p className="mt-2">
            If you have any questions about this privacy policy, please contact us at
            support@eternaltribute.com.
          </p>
        </section>
      </div>
    </div>
  );
}
