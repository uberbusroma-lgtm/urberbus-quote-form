import QuoteRequestForm from "@/components/QuoteRequestForm";

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