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
          <div
            className="relative h-16"
            style={{ background: theme.bgStyle }}
          >
            {/* Inner border decoration */}
            <div
              className="absolute inset-1 opacity-50"
              style={{ border: `1px solid ${theme.borderColor}` }}
            />
            {/* Center photo indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`flex h-6 w-6 items-center justify-center ${
                  theme.photoFrame === "circle"
                    ? "rounded-full"
                    : theme.photoFrame === "oval"
                    ? "rounded-[50%]"
                    : "rounded-md"
                }`}
                style={{
                  border: `1px solid ${theme.borderColor}`,
                  backgroundColor: theme.id === "dark-elegant" ? "#374151" : "rgba(255,255,255,0.7)",
                }}
              >
                <div
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </div>
            </div>
            {/* Accent line */}
            <div
              className="absolute bottom-1 left-1/2 h-px w-8 -translate-x-1/2 opacity-40"
              style={{ backgroundColor: theme.accentColor }}
            />
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
