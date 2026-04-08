import QuoteRequestForm from "@/components/QuoteRequestForm";

export default function AiRequestPage() {
  return (
    <QuoteRequestForm
      source="ai_agent"
      initialLocale="it"
      titleOverride="Inserimento richiesta AI"
      subtitleOverride="Modulo dedicato a richieste create o assistite da AI."
    />
  );
}