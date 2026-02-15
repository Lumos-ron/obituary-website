"use client";

import { VisualTheme, VISUAL_THEMES } from "@/lib/types";

interface ThemeSelectorProps {
  selected: VisualTheme;
  onSelect: (theme: VisualTheme) => void;
}

export function ThemeSelector({ selected, onSelect }: ThemeSelectorProps) {
  const themes = Object.values(VISUAL_THEMES);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
            selected === theme.id
              ? "border-primary shadow-md ring-2 ring-primary/20 scale-[1.02]"
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
          }`}
        >
          {/* Theme preview swatch */}
          <div className={`h-16 ${theme.bgClass} relative`}>
            {/* Inner border decoration */}
            <div className={`absolute inset-1 border ${theme.borderDecor} opacity-50`} />
            {/* Center photo indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`flex h-6 w-6 items-center justify-center border ${theme.borderDecor} ${
                  theme.id === "dark-elegant" ? "bg-gray-700" : "bg-white/70"
                } ${
                  theme.photoFrame === "circle"
                    ? "rounded-full"
                    : theme.photoFrame === "oval"
                    ? "rounded-[50%]"
                    : "rounded-md"
                }`}
              >
                <div className={`h-1 w-1 rounded-full ${theme.accentClass}`} />
              </div>
            </div>
            {/* Accent line */}
            <div className={`absolute bottom-1 left-1/2 h-px w-8 -translate-x-1/2 ${theme.accentClass} opacity-40`} />
          </div>

          {/* Theme name */}
          <div className="bg-white px-2 py-1.5">
            <p className="text-[11px] font-medium text-gray-700 truncate">
              {theme.name}
            </p>
          </div>

          {/* Selected indicator */}
          {selected === theme.id && (
            <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
