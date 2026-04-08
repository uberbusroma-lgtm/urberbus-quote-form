import QuoteRequestForm from "@/components/QuoteRequestForm";

export default function InternalRequestPage() {
  return (
    <QuoteRequestForm
      source="internal_manual"
      initialLocale="it"
      titleOverride="Inserimento richiesta interna"
      subtitleOverride="Modulo per richieste ricevute via telefono, email o contatto diretto."
    />
  );
}