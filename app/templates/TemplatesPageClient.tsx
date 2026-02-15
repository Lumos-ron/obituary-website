"use client";

import { useState, useMemo } from "react";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { getTemplates } from "@/lib/templates";
import {
  TemplateCategory,
  TemplateStyle,
  TemplateLength,
  CATEGORY_LABELS,
  STYLE_LABELS,
  LENGTH_LABELS,
} from "@/lib/types";

export function TemplatesPageClient() {
  const allTemplates = getTemplates();
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [style, setStyle] = useState<TemplateStyle | "all">("all");
  const [length, setLength] = useState<TemplateLength | "all">("all");
  const [sort, setSort] = useState<"popular" | "newest" | "category">("popular");

  const filtered = useMemo(() => {
    let result = allTemplates;
    if (category !== "all") result = result.filter((t) => t.category === category);
    if (style !== "all") result = result.filter((t) => t.style === style);
    if (length !== "all") result = result.filter((t) => t.length === length);

    if (sort === "popular") result = [...result].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    if (sort === "category") result = [...result].sort((a, b) => a.category.localeCompare(b.category));

    return result;
  }, [allTemplates, category, style, length, sort]);

  const FilterButton = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-white text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          Obituary Templates
        </h1>
        <p className="mt-3 text-muted-foreground">
          Find the perfect template to honor your loved one. All templates are free to use and customize.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
        {/* Category filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            Relationship
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={category === "all"} onClick={() => setCategory("all")}>
              All
            </FilterButton>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <FilterButton
                key={key}
                active={category === key}
                onClick={() => setCategory(key as TemplateCategory)}
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Style filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            Style
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={style === "all"} onClick={() => setStyle("all")}>
              All
            </FilterButton>
            {Object.entries(STYLE_LABELS).map(([key, label]) => (
              <FilterButton
                key={key}
                active={style === key}
                onClick={() => setStyle(key as TemplateStyle)}
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Length filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            Length
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={length === "all"} onClick={() => setLength("all")}>
              All
            </FilterButton>
            {Object.entries(LENGTH_LABELS).map(([key, label]) => (
              <FilterButton
                key={key}
                active={length === key}
                onClick={() => setLength(key as TemplateLength)}
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-lg border px-3 py-1.5 text-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="category">By Category</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} template{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm">
          <p className="text-muted-foreground">
            No templates match your filters. Try adjusting your selection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
