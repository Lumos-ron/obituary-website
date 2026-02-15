import type { Metadata } from "next";
import { EditorPageClient } from "./EditorPageClient";

export const metadata: Metadata = {
  title: "Edit Obituary",
  description: "Customize and edit your obituary with our free online editor.",
};

export default function EditorPage() {
  return <EditorPageClient />;
}
