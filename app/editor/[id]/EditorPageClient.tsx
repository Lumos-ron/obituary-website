"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTemplateById, fillTemplate } from "@/lib/templates";

export function EditorPageClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (id === "custom") {
      const saved = localStorage.getItem("obituary-content");
      if (saved) {
        setContent(saved);
        setOriginalContent(saved);
      }
    } else {
      const template = getTemplateById(id);
      if (template) {
        setContent(template.content);
        setOriginalContent(template.content);
      }
    }
  }, [id]);

  // Auto-save
  const autoSave = useCallback((text: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(`editor-${id}`, text);
    }, 1000);
  }, [id]);

  const handleChange = (text: string) => {
    setContent(text);
    autoSave(text);
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleExport = () => {
    localStorage.setItem("preview-content", content);
    router.push(`/preview/${id}`);
  };

  // Formatting helpers
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
              {id === "custom" ? "Custom Obituary" : "Edit Template"}
            </h1>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {wordCount} words
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setContent(originalContent);
                autoSave(originalContent);
              }}
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button size="sm" onClick={handleExport}>
              Preview & Export
            </Button>
          </div>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        {/* Editor */}
        <div className={`flex-1 border-r ${showPreview ? "hidden md:block" : ""}`}>
          {/* Format buttons */}
          <div className="flex gap-1 border-b bg-gray-50 px-4 py-2">
            <button
              onClick={() => applyFormat("**", "**")}
              className="rounded px-2.5 py-1 text-sm font-bold hover:bg-gray-200"
              title="Bold"
            >
              B
            </button>
            <button
              onClick={() => applyFormat("*", "*")}
              className="rounded px-2.5 py-1 text-sm italic hover:bg-gray-200"
              title="Italic"
            >
              I
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            className="h-full min-h-[500px] w-full resize-none p-6 text-base leading-relaxed focus:outline-none"
            placeholder="Start writing your obituary..."
          />
        </div>

        {/* Preview */}
        <div className={`flex-1 bg-gray-50 ${!showPreview ? "hidden md:block" : ""}`}>
          <div className="sticky top-32 p-6">
            <div className="mx-auto max-w-lg rounded-xl border bg-white p-8 shadow-md">
              <div className="template-preview">
                {content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-base leading-relaxed">
                    {paragraph.split("\n").map((line, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
