import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Template, CATEGORY_LABELS, STYLE_LABELS, VISUAL_THEMES } from "@/lib/types";
import { getTemplateTheme } from "@/lib/templates/theme-map";
import { VisualPreview } from "./VisualPreview";

export function TemplateCard({ template }: { template: Template }) {
  const themeId = getTemplateTheme(template.id);
  const theme = VISUAL_THEMES[themeId];

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Visual preview area */}
      <div className="relative overflow-hidden">
        <VisualPreview
          theme={themeId}
          fullName="Margaret E. Johnson"
          dateOfBirth="1946"
          dateOfPassing="2025"
          content={template.content}
          compact
        />
        {/* Theme badge overlay */}
        <div className="absolute bottom-2 right-2">
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm">
            {theme.name}
          </span>
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
