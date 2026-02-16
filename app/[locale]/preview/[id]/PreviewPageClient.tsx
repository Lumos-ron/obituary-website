"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { VisualTheme } from "@/lib/types";
import { VisualPreview } from "@/components/templates/VisualPreview";

export function PreviewPageClient() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("preview");
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

  // Capture the visual preview as a PNG data URL
  const capturePreview = useCallback(async (): Promise<string | null> => {
    if (!previewRef.current) return null;
    const { toPng } = await import("html-to-image");
    // Wait a tick for rendering to settle
    await new Promise((r) => setTimeout(r, 100));
    const dataUrl = await toPng(previewRef.current, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      // Inline all computed styles to ensure gradients render
      style: {
        // Ensure no clipping from overflow hidden
        overflow: "visible",
      },
    });
    return dataUrl;
  }, []);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const dataUrl = await capturePreview();
      if (!dataUrl) throw new Error("Capture failed");

      const { default: jsPDF } = await import("jspdf");

      // Create an image element to get dimensions
      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Calculate PDF dimensions - fit image to A4 width with margins
      const pdfMargin = 15; // mm
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfPageWidth = doc.internal.pageSize.getWidth();
      const pdfPageHeight = doc.internal.pageSize.getHeight();
      const maxImgWidth = pdfPageWidth - pdfMargin * 2;
      const maxImgHeight = pdfPageHeight - pdfMargin * 2;

      // Scale to fit within page
      const scale = Math.min(maxImgWidth / imgWidth, maxImgHeight / imgHeight);
      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;

      // Center the image on the page
      const xOffset = (pdfPageWidth - finalWidth) / 2;
      const yOffset = (pdfPageHeight - finalHeight) / 2;

      doc.addImage(dataUrl, "PNG", xOffset, yOffset, finalWidth, finalHeight);
      doc.save("obituary.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
      // Fallback: plain text PDF
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
      } catch (fallbackErr) {
        console.error("Fallback PDF export also failed:", fallbackErr);
      }
    } finally {
      setExporting(false);
    }
  };

  const handleExportWord = async () => {
    setExporting(true);
    try {
      const dataUrl = await capturePreview();
      if (!dataUrl) throw new Error("Capture failed");

      const { Document, Packer, Paragraph, ImageRun, AlignmentType } = await import("docx");

      // Convert data URL to buffer
      const base64Data = dataUrl.split(",")[1];
      const binaryStr = atob(base64Data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      // Get image dimensions for Word
      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      // Scale to fit letter-width (about 600 points wide)
      const maxDocWidth = 600;
      const scaleFactor = maxDocWidth / img.naturalWidth;
      const docWidth = Math.round(img.naturalWidth * scaleFactor);
      const docHeight = Math.round(img.naturalHeight * scaleFactor);

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: bytes,
                    transformation: { width: docWidth, height: docHeight },
                    type: "png",
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "obituary.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Word export failed:", err);
      // Fallback: plain text Word
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
      } catch (fallbackErr) {
        console.error("Fallback Word export also failed:", fallbackErr);
      }
    } finally {
      setExporting(false);
    }
  };

  const handleExportImage = async () => {
    setExporting(true);
    try {
      const dataUrl = await capturePreview();
      if (!dataUrl) throw new Error("Capture failed");
      const a = document.createElement("a");
      a.href = dataUrl;
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
          <Button variant="ghost" onClick={() => router.push(`/editor/${id}` as any)}>
            {t("backToEditor")}
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyText} disabled={exporting}>
              {copied ? t("copied") : t("copyText")}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportWord} disabled={exporting}>
              {exporting ? t("exporting") : t("downloadWord")}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={exporting}>
              {exporting ? t("exporting") : t("downloadPdf")}
            </Button>
            <Button size="sm" onClick={handleExportImage} disabled={exporting}>
              {exporting ? t("exporting") : t("saveAsImage")}
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
          {t("exportNote")}
        </p>
      </div>
    </div>
  );
}
