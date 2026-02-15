"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VisualTheme } from "@/lib/types";
import { VisualPreview } from "@/components/templates/VisualPreview";

export function PreviewPageClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState<VisualTheme>("classic-white");
  const [fullName, setFullName] = useState("Full Name");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfPassing, setDateOfPassing] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("preview-content");
    if (savedContent) setContent(savedContent);
    const savedTheme = localStorage.getItem("preview-theme");
    if (savedTheme) setTheme(savedTheme as VisualTheme);
    const savedName = localStorage.getItem("preview-fullName");
    if (savedName) setFullName(savedName);
    const savedDob = localStorage.getItem("preview-dob");
    if (savedDob) setDateOfBirth(savedDob);
    const savedDop = localStorage.getItem("preview-dop");
    if (savedDop) setDateOfPassing(savedDop);
    const savedPhoto = localStorage.getItem("preview-photo");
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      const margin = 25;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - margin * 2;
      let y = margin;
      const lines = doc.splitTextToSize(content, maxWidth);
      for (const line of lines) {
        if (y > 270) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += 6;
      }
      doc.save("obituary.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleExportWord = async () => {
    setExporting(true);
    try {
      const { Document, Packer, Paragraph, TextRun } = await import("docx");
      const paragraphs = content.split("\n\n").map(
        (text) =>
          new Paragraph({
            children: [new TextRun({ text, font: "Times New Roman", size: 24 })],
            spacing: { after: 200 },
          })
      );
      const doc = new Document({ sections: [{ children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "obituary.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Word export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleExportImage = async () => {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      if (!previewRef.current) return;
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "obituary.png";
      a.click();
    } catch (err) {
      console.error("Image export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky toolbar */}
      <div className="sticky top-16 z-40 border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" onClick={() => router.push(`/editor/${id}`)}>
            &larr; Back to Editor
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyText} disabled={exporting}>
              {copied ? "Copied!" : "Copy Text"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportWord} disabled={exporting}>
              Download Word
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={exporting}>
              Download PDF
            </Button>
            <Button size="sm" onClick={handleExportImage} disabled={exporting}>
              Save as Image
            </Button>
          </div>
        </div>
      </div>

      {/* Visual Preview */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <div
          ref={previewRef}
          className="overflow-hidden rounded-xl shadow-2xl"
        >
          <VisualPreview
            theme={theme}
            fullName={fullName}
            dateOfBirth={dateOfBirth}
            dateOfPassing={dateOfPassing}
            content={content}
            photo={photo}
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Tip: &ldquo;Save as Image&rdquo; will capture the full visual design with background and photo.
          &ldquo;Copy Text&rdquo; and &ldquo;Download Word/PDF&rdquo; export text only.
        </p>
      </div>
    </div>
  );
}
