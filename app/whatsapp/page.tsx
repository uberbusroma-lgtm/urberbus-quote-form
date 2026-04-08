import QuoteRequestForm from "@/components/QuoteRequestForm";

export default function WhatsappPage() {
  return (
    <QuoteRequestForm
      source="whatsapp_link"
      initialLocale="it"
      titleOverride="Completa la tua richiesta"
      subtitleOverride="Inserisci i dettagli del servizio per ricevere il preventivo."
    />
  );
}