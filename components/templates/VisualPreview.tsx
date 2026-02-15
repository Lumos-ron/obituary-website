"use client";

import { VisualTheme, VISUAL_THEMES } from "@/lib/types";

interface VisualPreviewProps {
  theme: VisualTheme;
  fullName?: string;
  dateOfBirth?: string;
  dateOfPassing?: string;
  content: string;
  photo?: string | null;
  compact?: boolean;
}

// SVG decorative elements
function FloralCorner({ className, color }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <path
        d="M10 110 C10 60, 20 30, 60 10 C40 30, 25 50, 20 80 C30 50, 50 30, 80 20 C50 35, 35 55, 25 90"
        stroke={color || "currentColor"}
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="60" cy="10" r="4" fill={color || "currentColor"} opacity="0.2" />
      <circle cx="80" cy="20" r="3" fill={color || "currentColor"} opacity="0.15" />
      <circle cx="20" cy="80" r="3.5" fill={color || "currentColor"} opacity="0.2" />
      <circle cx="40" cy="40" r="5" fill={color || "currentColor"} opacity="0.1" />
      <path d="M55 8 C58 5, 62 5, 65 8 C62 6, 58 6, 55 8Z" fill={color || "currentColor"} opacity="0.25" />
      <path d="M75 17 C78 14, 82 14, 85 17 C82 15, 78 15, 75 17Z" fill={color || "currentColor"} opacity="0.2" />
    </svg>
  );
}

function CrossSymbol({ className, color }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20M7 7h10" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DoveSymbol({ className, color }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path
        d="M8 28C12 22 18 18 26 16C22 18 20 22 20 26C24 22 28 18 30 12C28 16 24 20 22 24C26 20 30 14 32 8C28 12 22 18 18 24C20 18 24 14 28 10C22 14 16 20 14 26C16 20 18 14 22 10C16 14 12 20 10 26"
        stroke={color || "currentColor"}
        strokeWidth="0.8"
        opacity="0.25"
      />
    </svg>
  );
}

function DiamondDivider({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "12px 0" }}>
      <div style={{ height: "1px", flex: "1", maxWidth: "64px", backgroundColor: color, opacity: 0.4 }} />
      <div style={{ height: "6px", width: "6px", transform: "rotate(45deg)", backgroundColor: color }} />
      <div style={{ height: "1px", flex: "1", maxWidth: "64px", backgroundColor: color, opacity: 0.4 }} />
    </div>
  );
}

function StarDivider({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "12px 0" }}>
      <div style={{ height: "1px", flex: "1", maxWidth: "48px", backgroundColor: color, opacity: 0.3 }} />
      <span style={{ fontSize: "12px", color, opacity: 0.4 }}>&#10022;</span>
      <div style={{ height: "4px", width: "4px", borderRadius: "50%", backgroundColor: color, opacity: 0.5 }} />
      <span style={{ fontSize: "12px", color, opacity: 0.4 }}>&#10022;</span>
      <div style={{ height: "1px", flex: "1", maxWidth: "48px", backgroundColor: color, opacity: 0.3 }} />
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
  const t = VISUAL_THEMES[theme];
  const isDark = theme === "dark-elegant";

  const fontFamily =
    t.fontStyle === "serif" || t.fontStyle === "elegant"
      ? "'Playfair Display', 'Georgia', serif"
      : "'Inter', 'Helvetica', sans-serif";

  const photoRadius =
    t.photoFrame === "circle" ? "50%" : t.photoFrame === "oval" ? "50%" : "12px";

  const hasFloral = theme === "soft-floral" || theme === "rose-garden" || theme === "lilac-dream";
  const hasDove = theme === "golden-light" || theme === "sunset-sky";
  const hasCross = theme === "marble-grace" || theme === "classic-white";
  const floralColor = theme === "lilac-dream" ? "#c084fc" : "#fb7185";

  // Compact card preview
  if (compact) {
    return (
      <div
        className={`relative overflow-hidden ${t.bgClass}`}
        style={{
          background: t.bgStyle,
          padding: "16px",
          height: "220px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {hasFloral && (
          <>
            <FloralCorner
              className="absolute left-0 top-0 h-12 w-12"
              color={floralColor}
            />
            <FloralCorner
              className="absolute bottom-0 right-0 h-12 w-12 rotate-180"
              color={floralColor}
            />
          </>
        )}

        <div
          style={{
            position: "absolute",
            inset: "8px",
            border: `1px solid ${t.borderColor}`,
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />

        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: photoRadius,
              border: `2px solid ${t.borderColor}`,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDark ? "#374151" : "rgba(255,255,255,0.6)",
              marginBottom: "8px",
            }}
          >
            {photo ? (
              <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg style={{ width: "20px", height: "20px", color: t.subTextColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
            )}
          </div>

          <p style={{
            fontSize: "12px",
            fontFamily,
            fontWeight: "bold",
            color: t.nameColor,
            lineHeight: "1.2",
            fontStyle: t.fontStyle === "elegant" ? "italic" : "normal",
          }}>
            {fullName}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
            <div style={{ height: "1px", width: "16px", backgroundColor: t.accentColor, opacity: 0.5 }} />
            <div style={{ height: "4px", width: "4px", transform: "rotate(45deg)", backgroundColor: t.accentColor, opacity: 0.5 }} />
            <div style={{ height: "1px", width: "16px", backgroundColor: t.accentColor, opacity: 0.5 }} />
          </div>

          {dateOfBirth && dateOfPassing && (
            <p style={{ fontSize: "9px", marginTop: "2px", color: t.subTextColor }}>
              {dateOfBirth} — {dateOfPassing}
            </p>
          )}

          <p style={{
            marginTop: "6px",
            fontSize: "9px",
            lineHeight: "1.6",
            color: t.textColor,
            opacity: 0.7,
            padding: "0 8px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}>
            {content.replace(/\{\{[^}]+\}\}/g, "___").substring(0, 150)}...
          </p>
        </div>
      </div>
    );
  }

  // Full preview
  return (
    <div
      className={`relative overflow-hidden ${t.bgClass}`}
      style={{
        background: t.bgStyle,
        padding: "40px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corners */}
      {hasFloral && (
        <>
          <FloralCorner className="absolute left-2 top-2 h-24 w-24 sm:h-32 sm:w-32" color={floralColor} />
          <FloralCorner className="absolute right-2 top-2 h-24 w-24 -scale-x-100 sm:h-32 sm:w-32" color={floralColor} />
          <FloralCorner className="absolute bottom-2 left-2 h-24 w-24 -scale-y-100 sm:h-32 sm:w-32" color={floralColor} />
          <FloralCorner className="absolute bottom-2 right-2 h-24 w-24 rotate-180 sm:h-32 sm:w-32" color={floralColor} />
        </>
      )}

      {hasDove && (
        <>
          <DoveSymbol className="absolute right-4 top-4 h-16 w-16" color={t.accentColor} />
          <DoveSymbol className="absolute bottom-4 left-4 h-16 w-16 rotate-180" color={t.accentColor} />
        </>
      )}

      {theme === "dark-elegant" && (
        <>
          <div style={{ position: "absolute", inset: "16px", border: `1px solid ${t.borderColor}`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: "24px", border: `1px solid rgba(245,158,11,0.1)`, pointerEvents: "none" }} />
        </>
      )}

      {theme !== "dark-elegant" && theme !== "classic-white" && (
        <div style={{
          position: "absolute",
          inset: "12px",
          border: `1px solid ${t.borderColor}`,
          pointerEvents: "none",
        }} />
      )}

      {/* Content */}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        {/* Cross for classic themes */}
        {hasCross && (
          <CrossSymbol className="mb-2 h-6 w-6" color={t.subTextColor} />
        )}

        {/* Photo */}
        <div
          style={{
            width: "120px",
            height: t.photoFrame === "oval" ? "150px" : "120px",
            borderRadius: photoRadius,
            border: isDark ? `3px solid ${t.borderColor}` : `3px solid ${t.borderColor}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDark ? "#374151" : "rgba(255,255,255,0.8)",
            marginBottom: "16px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          }}
        >
          {photo ? (
            <img src={photo} alt={fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: t.subTextColor }}>
              <svg style={{ width: "40px", height: "40px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
              <span style={{ fontSize: "10px" }}>Photo</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily,
          fontSize: "28px",
          fontWeight: "bold",
          letterSpacing: "0.05em",
          color: t.nameColor,
          fontStyle: t.fontStyle === "elegant" ? "italic" : "normal",
          margin: 0,
        }}>
          {fullName}
        </h2>

        {/* Dates */}
        {(dateOfBirth || dateOfPassing) && (
          <p style={{ marginTop: "4px", fontSize: "14px", color: t.subTextColor }}>
            {dateOfBirth || "____"} — {dateOfPassing || "____"}
          </p>
        )}

        {/* Divider */}
        {isDark ? (
          <StarDivider color={t.accentColor} />
        ) : (
          <DiamondDivider color={t.accentColor} />
        )}

        {/* Content */}
        <div style={{
          marginTop: "8px",
          maxWidth: "512px",
          textAlign: "left",
          fontSize: "15px",
          lineHeight: "1.9",
          color: t.textColor,
          fontFamily,
        }}>
          {content.split("\n\n").map((paragraph, i) => (
            <p key={i} style={{ marginBottom: "16px" }}>
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
          <StarDivider color={t.accentColor} />
        ) : (
          <DiamondDivider color={t.accentColor} />
        )}
      </div>
    </div>
  );
}
