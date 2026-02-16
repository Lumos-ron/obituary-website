"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisualTheme } from "@/lib/types";
import { getTemplateById } from "@/lib/templates";
import { getTemplateTheme } from "@/lib/templates/theme-map";
import { VisualPreview } from "@/components/templates/VisualPreview";
import { PhotoUpload } from "@/components/templates/PhotoUpload";
import { ThemeSelector } from "@/components/templates/ThemeSelector";

export function EditorPageClient() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("editor");
  const id = params.id as string;
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showDesign, setShowDesign] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<VisualTheme>("classic-white");
  const [fullName, setFullName] = useState("Full Name");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfPassing, setDateOfPassing] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (id === "custom") {
      const saved = localStorage.getItem("obituary-content");
      if (saved) {
        setContent(saved);
        setOriginalContent(saved);
      }
      const data = localStorage.getItem("obituary-data");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.dateOfBirth) setDateOfBirth(parsed.dateOfBirth);
          if (parsed.dateOfPassing) setDateOfPassing(parsed.dateOfPassing);
        } catch { /* ignore */ }
      }
      // Only restore saved theme for custom mode
      const savedTheme = localStorage.getItem("editor-theme");
      if (savedTheme) setSelectedTheme(savedTheme as VisualTheme);
    } else {
      const template = getTemplateById(id);
      if (template) {
        setContent(template.content);
        setOriginalContent(template.content);
        // Always use the template's mapped theme when opening a specific template
        const templateTheme = getTemplateTheme(id);
        setSelectedTheme(templateTheme);
        localStorage.setItem("editor-theme", templateTheme);
      }
    }
    const savedPhoto = localStorage.getItem("editor-photo");
    if (savedPhoto) setPhoto(savedPhoto);
  }, [id]);

  const autoSave = useCallback(
    (text: string) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        localStorage.setItem(`editor-${id}`, text);
      }, 1000);
    },
    [id]
  );

  const handleChange = (text: string) => {
    setContent(text);
    autoSave(text);
  };

  const handlePhotoChange = (newPhoto: string | null) => {
    setPhoto(newPhoto);
    if (newPhoto) localStorage.setItem("editor-photo", newPhoto);
    else localStorage.removeItem("editor-photo");
  };

  const handleThemeChange = (theme: VisualTheme) => {
    setSelectedTheme(theme);
    localStorage.setItem("editor-theme", theme);
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleExport = () => {
    localStorage.setItem("preview-content", content);
    localStorage.setItem("preview-theme", selectedTheme);
    localStorage.setItem("preview-fullName", fullName);
    localStorage.setItem("preview-dob", dateOfBirth);
    localStorage.setItem("preview-dop", dateOfPassing);
    if (photo) localStorage.setItem("preview-photo", photo);
    else localStorage.removeItem("preview-photo");
    router.push(`/preview/${id}` as any);
  };

  const applyFormat = (prefix: string, suffix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end);
    const newContent =
      content.substring(0, start) + prefix + selected + suffix + content.substring(end);
    setContent(newContent);
    autoSave(newContent);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Toolbar */}
      <div className="sticky top-16 z-40 border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg font-semibold text-primary">
              {id === "custom" ? t("customObituary") : t("editTemplate")}
            </h1>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {t("wordCount", { count: wordCount })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showDesign ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowDesign(!showDesign)}
            >
              {t("design")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setContent(originalContent);
                autoSave(originalContent);
              }}
            >
              {t("reset")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? t("edit") : t("preview")}
            </Button>
            <Button size="sm" onClick={handleExport}>
              {t("previewExport")}
            </Button>
          </div>
        </div>
      </div>

      {/* Design Panel */}
      {showDesign && (
        <div className="border-b bg-white px-4 py-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <div>
                <Label className="mb-2 block text-sm font-medium">{t("photo")}</Label>
                <PhotoUpload
                  photo={photo}
                  onPhotoChange={handlePhotoChange}
                  size="md"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="ed-name" className="text-sm">{t("displayName")}</Label>
                  <Input
                    id="ed-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("displayNamePlaceholder")}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="ed-dob" className="text-sm">{t("born")}</Label>
                    <Input
                      id="ed-dob"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder={t("bornPlaceholder")}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ed-dop" className="text-sm">{t("passed")}</Label>
                    <Input
                      id="ed-dop"
                      value={dateOfPassing}
                      onChange={(e) => setDateOfPassing(e.target.value)}
                      placeholder={t("passedPlaceholder")}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label className="mb-3 block text-sm font-medium">{t("chooseTheme")}</Label>
              <ThemeSelector selected={selectedTheme} onSelect={handleThemeChange} />
            </div>
          </div>
        </div>
      )}

      {/* Editor + Preview */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        {/* Editor */}
        <div className={`flex-1 border-r ${showPreview ? "hidden md:block" : ""}`}>
          <div className="flex gap-1 border-b bg-gray-50 px-4 py-2">
            <button
              onClick={() => applyFormat("**", "**")}
              className="rounded px-2.5 py-1 text-sm font-bold hover:bg-gray-200"
              title={t("bold")}
            >
              B
            </button>
            <button
              onClick={() => applyFormat("*", "*")}
              className="rounded px-2.5 py-1 text-sm italic hover:bg-gray-200"
              title={t("italic")}
            >
              I
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            className="h-full min-h-[500px] w-full resize-none p-6 text-base leading-relaxed focus:outline-none"
            placeholder={t("placeholder")}
          />
        </div>

        {/* Visual Preview */}
        <div className={`flex-1 bg-gray-100 ${!showPreview ? "hidden md:block" : ""}`}>
          <div className="sticky top-32 p-6">
            <div className="mx-auto max-w-lg overflow-hidden rounded-xl border shadow-lg">
              <VisualPreview
                theme={selectedTheme}
                fullName={fullName}
                dateOfBirth={dateOfBirth}
                dateOfPassing={dateOfPassing}
                content={content}
                photo={photo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
