"use client";

import { VisualTheme, VisualThemeConfig, VISUAL_THEMES } from "@/lib/types";

interface VisualPreviewProps {
  theme: VisualTheme;
  fullName?: string;
  dateOfBirth?: string;
  dateOfPassing?: string;
  content: string;
  photo?: string | null;
  compact?: boolean; // For card previews
}

// SVG decorative elements for each theme
function FloralCorner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <path
        d="M10 110 C10 60, 20 30, 60 10 C40 30, 25 50, 20 80 C30 50, 50 30, 80 20 C50 35, 35 55, 25 90"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="60" cy="10" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="80" cy="20" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="20" cy="80" r="3.5" fill="currentColor" opacity="0.2" />
      <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.1" />
      <path
        d="M55 8 C58 5, 62 5, 65 8 C62 6, 58 6, 55 8Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M75 17 C78 14, 82 14, 85 17 C82 15, 78 15, 75 17Z"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

function CrossSymbol({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v20M7 7h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoveSymbol({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path
        d="M8 28C12 22 18 18 26 16C22 18 20 22 20 26C24 22 28 18 30 12C28 16 24 20 22 24C26 20 30 14 32 8C28 12 22 18 18 24C20 18 24 14 28 10C22 14 16 20 14 26C16 20 18 14 22 10C16 14 12 20 10 26"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.25"
      />
    </svg>
  );
}

function DiamondDivider({ colorClass }: { colorClass: string }) {
  return (
    <div className="flex items-center justify-center gap-2 my-3">
      <div className={`h-px flex-1 max-w-16 ${colorClass} opacity-40`} />
      <div className={`h-1.5 w-1.5 rotate-45 ${colorClass}`} />
      <div className={`h-px flex-1 max-w-16 ${colorClass} opacity-40`} />
    </div>
  );
}

function StarDivider({ colorClass }: { colorClass: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <div className={`h-px flex-1 max-w-12 ${colorClass} opacity-30`} />
      <span className={`text-xs opacity-40`} style={{ color: "currentColor" }}>
        &#10022;
      </span>
      <div className={`h-1 w-1 rounded-full ${colorClass} opacity-50`} />
      <span className={`text-xs opacity-40`} style={{ color: "currentColor" }}>
        &#10022;
      </span>
      <div className={`h-px flex-1 max-w-12 ${colorClass} opacity-30`} />
    </div>
  );
}

export function VisualPreview({
  theme,
  fullName = "Full Name",
  dateOfBirth,
  dateOfPassing,
  content,
  photo,
  compact = false,
}: VisualPreviewProps) {
  const themeConfig = VISUAL_THEMES[theme];
  const isDark = theme === "dark-elegant";

  const fontClass =
    themeConfig.fontStyle === "serif"
      ? "font-serif"
      : themeConfig.fontStyle === "elegant"
      ? "font-serif italic"
      : "font-sans";

  const photoShapeClass =
    themeConfig.photoFrame === "circle"
      ? "rounded-full"
      : themeConfig.photoFrame === "oval"
      ? "rounded-[50%]"
      : "rounded-xl";

  if (compact) {
    return (
      <div
        className={`relative overflow-hidden ${themeConfig.bgClass} p-4 ${
          compact ? "h-[220px]" : ""
        }`}
      >
        {/* Decorative corners - compact */}
        {(theme === "soft-floral" || theme === "rose-garden" || theme === "lilac-dream") && (
          <>
            <FloralCorner className="absolute left-0 top-0 h-12 w-12 text-rose-400/40" />
            <FloralCorner className="absolute bottom-0 right-0 h-12 w-12 rotate-180 text-rose-400/40" />
          </>
        )}

        {/* Border frame */}
        <div
          className={`absolute inset-2 border ${themeConfig.borderDecor} ${
            theme === "dark-elegant" ? "border-amber-500/20" : ""
          } pointer-events-none`}
          style={{ borderRadius: "4px" }}
        />

        <div className="relative flex h-full flex-col items-center justify-center text-center">
          {/* Photo placeholder */}
          <div
            className={`mb-2 flex items-center justify-center overflow-hidden border-2 ${themeConfig.borderDecor} ${photoShapeClass} ${
              isDark ? "bg-gray-700" : "bg-white/60"
            }`}
            style={{ width: 48, height: 48 }}
          >
            {photo ? (
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <svg className={`h-5 w-5 ${themeConfig.subTextClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
            )}
          </div>

          <p className={`text-xs ${fontClass} font-bold ${themeConfig.nameClass} leading-tight`}>
            {fullName}
          </p>

          <div className="flex items-center gap-1 mt-0.5">
            <div className={`h-px w-4 ${themeConfig.accentClass} opacity-50`} />
            <div className={`h-1 w-1 rotate-45 ${themeConfig.accentClass} opacity-50`} />
            <div className={`h-px w-4 ${themeConfig.accentClass} opacity-50`} />
          </div>

          {dateOfBirth && dateOfPassing && (
            <p className={`text-[9px] mt-0.5 ${themeConfig.subTextClass}`}>
              {dateOfBirth} — {dateOfPassing}
            </p>
          )}

          <p className={`mt-1.5 line-clamp-3 text-[9px] leading-relaxed ${themeConfig.textClass} opacity-70 px-2`}>
            {content.replace(/\{\{[^}]+\}\}/g, "___").substring(0, 150)}...
          </p>
        </div>
      </div>
    );
  }

  // Full preview
  return (
    <div
      className={`relative overflow-hidden ${themeConfig.bgClass} px-8 py-10 sm:px-12 sm:py-14`}
    >
      {/* Decorative corners */}
      {(theme === "soft-floral" || theme === "rose-garden" || theme === "lilac-dream") && (
        <>
          <FloralCorner className="absolute left-2 top-2 h-24 w-24 text-rose-400/30 sm:h-32 sm:w-32" />
          <FloralCorner className="absolute right-2 top-2 h-24 w-24 -scale-x-100 text-rose-400/30 sm:h-32 sm:w-32" />
          <FloralCorner className="absolute bottom-2 left-2 h-24 w-24 -scale-y-100 text-rose-400/30 sm:h-32 sm:w-32" />
          <FloralCorner className="absolute bottom-2 right-2 h-24 w-24 rotate-180 text-rose-400/30 sm:h-32 sm:w-32" />
        </>
      )}

      {(theme === "golden-light" || theme === "sunset-sky") && (
        <>
          <DoveSymbol className="absolute right-4 top-4 h-16 w-16 text-amber-600" />
          <DoveSymbol className="absolute bottom-4 left-4 h-16 w-16 rotate-180 text-amber-600" />
        </>
      )}

      {theme === "dark-elegant" && (
        <>
          <div className="absolute inset-4 border border-amber-500/20 pointer-events-none" />
          <div className="absolute inset-6 border border-amber-500/10 pointer-events-none" />
        </>
      )}

      {(theme !== "dark-elegant" && theme !== "classic-white") && (
        <div className={`absolute inset-3 border ${themeConfig.borderDecor} pointer-events-none sm:inset-5`} />
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Cross or dove for religious-feel themes */}
        {(theme === "marble-grace" || theme === "classic-white") && (
          <CrossSymbol className={`mb-2 h-6 w-6 ${themeConfig.subTextClass} opacity-40`} />
        )}

        {/* Photo */}
        <div
          className={`mb-4 flex items-center justify-center overflow-hidden border-3 ${
            isDark ? "border-amber-500/40" : themeConfig.borderDecor
          } ${photoShapeClass} shadow-lg ${
            isDark ? "bg-gray-700" : "bg-white/80"
          }`}
          style={{ width: 120, height: themeConfig.photoFrame === "oval" ? 150 : 120 }}
        >
          {photo ? (
            <img src={photo} alt={fullName} className="h-full w-full object-cover" />
          ) : (
            <div className={`flex flex-col items-center gap-1 ${themeConfig.subTextClass}`}>
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
              <span className="text-[10px]">Photo</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h2
          className={`${fontClass} text-2xl font-bold tracking-wide sm:text-3xl ${themeConfig.nameClass}`}
        >
          {fullName}
        </h2>

        {/* Dates */}
        {(dateOfBirth || dateOfPassing) && (
          <p className={`mt-1 text-sm ${themeConfig.subTextClass}`}>
            {dateOfBirth || "____"} — {dateOfPassing || "____"}
          </p>
        )}

        {/* Divider */}
        {isDark ? (
          <StarDivider colorClass={themeConfig.accentClass} />
        ) : (
          <DiamondDivider colorClass={themeConfig.accentClass} />
        )}

        {/* Content */}
        <div
          className={`mt-2 max-w-lg text-left text-sm leading-relaxed sm:text-base sm:leading-[1.9] ${themeConfig.textClass} ${fontClass}`}
          style={{ fontStyle: "normal" }}
        >
          {content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph.split("\n").map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>

        {/* Bottom divider */}
        {isDark ? (
          <StarDivider colorClass={themeConfig.accentClass} />
        ) : (
          <DiamondDivider colorClass={themeConfig.accentClass} />
        )}
      </div>
    </div>
  );
}
