"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { getTemplates } from "@/lib/templates";
import {
  TemplateCategory,
  TemplateStyle,
  TemplateLength,
} from "@/lib/types";

const categoryKeys = ["mother", "father", "spouse", "grandparent", "sibling", "friend", "child", "general"] as const;
const styleKeys = ["traditional", "modern", "heartfelt", "simple", "religious"] as const;
const lengthKeys = ["short", "standard", "detailed"] as const;

export function TemplatesPageClient() {
  const locale = useLocale();
  const t = useTranslations("templates");
  const te = useTranslations("enums");
  const allTemplates = getTemplates(locale);
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
          {t("page.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t("page.subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
        {/* Category filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            {t("filters.relationship")}
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={category === "all"} onClick={() => setCategory("all")}>
              {t("filters.all")}
            </FilterButton>
            {categoryKeys.map((key) => (
              <FilterButton
                key={key}
                active={category === key}
                onClick={() => setCategory(key)}
              >
                {te(`category.${key}`)}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Style filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            {t("filters.style")}
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={style === "all"} onClick={() => setStyle("all")}>
              {t("filters.all")}
            </FilterButton>
            {styleKeys.map((key) => (
              <FilterButton
                key={key}
                active={style === key}
                onClick={() => setStyle(key as TemplateStyle)}
              >
                {te(`style.${key}`)}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Length filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            {t("filters.length")}
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={length === "all"} onClick={() => setLength("all")}>
              {t("filters.all")}
            </FilterButton>
            {lengthKeys.map((key) => (
              <FilterButton
                key={key}
                active={length === key}
                onClick={() => setLength(key as TemplateLength)}
              >
                {te(`length.${key}`)}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">{t("filters.sortBy")}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-lg border px-3 py-1.5 text-sm"
          >
            <option value="popular">{t("filters.mostPopular")}</option>
            <option value="newest">{t("filters.newest")}</option>
            <option value="category">{t("filters.byCategory")}</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <p className="mb-4 text-sm text-muted-foreground">
        {t("results.showing", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm">
          <p className="text-muted-foreground">
            {t("results.noResults")}
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
