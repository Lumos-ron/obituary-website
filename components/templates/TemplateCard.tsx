import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Template, CATEGORY_LABELS, STYLE_LABELS } from "@/lib/types";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Preview area */}
      <div className="relative border-b bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="mx-auto max-w-[280px]">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="mb-1 text-center font-serif text-sm font-semibold text-primary">
              {template.title}
            </p>
            <div className="mx-auto my-2 h-px w-16 bg-accent/30" />
            <p className="line-clamp-4 text-center text-xs leading-relaxed text-muted-foreground">
              {template.content
                .replace(/\{\{[^}]+\}\}/g, "___")
                .substring(0, 180)}
              ...
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs">
            For {CATEGORY_LABELS[template.category]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {STYLE_LABELS[template.style]}
          </Badge>
        </div>
        <h3 className="mb-1 font-serif text-base font-semibold text-primary">
          {template.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {template.description}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/templates/${template.id}`}>Preview</Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/editor/${template.id}`}>Use Template</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
