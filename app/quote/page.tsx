import type { Metadata } from "next";
import QuoteRequestForm from "@/components/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Richiedi un preventivo - Urber Bus Roma",
  description: "Compila il modulo per richiedere un preventivo.",
};

export default function QuotePage() {
  return (
    <QuoteRequestForm
      source="website_urberbusroma"
      initialLocale="it"
      titleOverride="Richiedi un preventivo - Urber Bus Roma"
      subtitleOverride="Compila il modulo per richiedere un preventivo."
    />
  );
}