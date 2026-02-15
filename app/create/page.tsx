import type { Metadata } from "next";
import { CreatePageClient } from "./CreatePageClient";

export const metadata: Metadata = {
  title: "Create an Obituary - Free Obituary Generator",
  description:
    "Create a meaningful obituary in minutes with our free step-by-step generator. Choose a style, enter details, and download or share instantly.",
};

export default function CreatePage() {
  return <CreatePageClient />;
}
