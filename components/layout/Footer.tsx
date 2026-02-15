import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-bold text-primary">
              EternalTribute
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Helping families honor their loved ones with dignity and grace through
              thoughtfully crafted obituary templates.
            </p>
          </div>

          {/* Templates */}
          <div>
            <h3 className="text-sm font-semibold text-primary">Templates</h3>
            <ul className="mt-3 space-y-2">
              {["Mother", "Father", "Spouse", "Grandparent", "General"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/templates/${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item} Obituary
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-primary">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Writing Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Obituary Creator
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  All Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-primary">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EternalTribute. All rights reserved.
            Created with compassion to help families during difficult times.
          </p>
        </div>
      </div>
    </footer>
  );
}
