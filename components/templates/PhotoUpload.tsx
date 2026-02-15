"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  photo: string | null;
  onPhotoChange: (photo: string | null) => void;
  frameShape?: "circle" | "rounded" | "oval";
  size?: "sm" | "md" | "lg";
}

export function PhotoUpload({
  photo,
  onPhotoChange,
  frameShape = "circle",
  size = "md",
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const shapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    oval: "rounded-[50%] aspect-[3/4]",
  };

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onPhotoChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative cursor-pointer overflow-hidden border-2 border-dashed transition-all ${sizeClasses[size]} ${shapeClasses[frameShape]} ${
          dragOver
            ? "border-primary bg-primary/5 scale-105"
            : photo
            ? "border-transparent"
            : "border-gray-300 hover:border-primary/50"
        }`}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt="Uploaded photo"
              className="h-full w-full object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <span className="text-xs font-medium text-white">Change</span>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gray-400">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-[10px]">Add Photo</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {photo && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onPhotoChange(null);
          }}
        >
          Remove Photo
        </Button>
      )}
    </div>
  );
}
