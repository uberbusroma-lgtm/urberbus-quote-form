import type { Metadata } from "next";
import QuoteRequestForm from "@/components/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Request a quote - Charter Bus Rome",
  description: "Fill out the form to request a quote.",
};

export default function RequestPage() {
  return (
    <QuoteRequestForm
      source="website_charterbusrome"
      initialLocale="en"
      titleOverride="Request a quote - Charter Bus Rome"
      subtitleOverride="Fill out the form to request a quote."
    />
  );
}