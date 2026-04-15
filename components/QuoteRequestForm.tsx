"use client";
import "intl-tel-input/build/css/intlTelInput.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import intlTelInput from "intl-tel-input";
import type { Iti } from "intl-tel-input";
import Script from "next/script";

const translations = {
  it: {
    language: "Lingua",
    title: "Richiesta preventivo",
    subtitle: "Compila il modulo per richiedere un preventivo.",
    step: "Step",
    previous: "Indietro",
    next: "Avanti",
    submit: "Invia richiesta",
    sending: "Invio in corso...",
    successTitle: "Richiesta inviata correttamente",
    successText:
      "Abbiamo ricevuto la tua richiesta. Ti contatteremo il prima possibile.",
    customerInfo: "Dati cliente",
    serviceInfo: "Dati servizio",
    itinerary: "Itinerario",
    passengers: "Passeggeri e bagagli",
    notes: "Note finali",
    fullName: "Nome e cognome",
    email: "Email",
    phone: "Telefono internazionale",
    customerType: "Tipologia cliente",
    private: "Privato",
    company: "Azienda",
    agency: "Agenzia",
    publicAdministration: "Amministrazione pubblica",
    serviceType: "Tipo servizio",
    tripType: "Tipologia viaggio",
    oneWay: "Solo andata",
    roundTrip: "Andata e ritorno",
    transfer: "Transfer",
    hourly: "Bus a disposizione",
    tour: "Tour",
    multiDay: "Servizio più giorni",
    event: "Evento",
    pickupDate: "Data servizio",
    pickupTime: "Orario pick-up",
    returnDate: "Data ritorno",
    returnTime: "Orario ritorno",
    departureCity: "Città di partenza",
    departureAddress: "Indirizzo di partenza",
    destinationCity: "Città di destinazione",
    destinationAddress: "Indirizzo di destinazione",
    intermediateStops: "Tappe intermedie",
    addStop: "Stop extra",
    stopCity: "Città stop extra",
    stopAddress: "Indirizzo stop extra",
    remove: "Rimuovi",
    noStops: "Nessuna tappa aggiunta",
    passengersCount: "Numero passeggeri",
    luggageBig: "Valigie da stiva 23 kg",
    luggageTrolley: "Trolley da cabina",
    luggageBackpack: "Zaini / borse piccole",
    specialEquipment: "Attrezzature speciali",
    specialEquipmentPlaceholder:
      "Passeggini, carrozzine, strumenti musicali, attrezzature sportive...",
    notesLabel: "Note aggiuntive",
    notesPlaceholder:
      "Inserisci qui dettagli utili: programma, orari, fermate, esigenze particolari...",
    required: "Campo obbligatorio",
    invalidEmail: "Email non valida",
    invalidPhone: "Inserisci un numero valido",
    minPassengers: "Inserisci almeno 1 passeggero",
    summary: "Riepilogo",
    requestCode: "Codice richiesta",
    invalidReturnDate:
      "La data/ora di ritorno non può essere precedente alla partenza.",
    invalidPickupDate: "La data/ora del servizio non può essere nel passato.",
    outboundSectionTitle: "Andata",
    returnSectionTitle: "Ritorno",
    outboundIntermediateStops: "Tappe intermedie andata",
    returnIntermediateStops: "Tappe intermedie ritorno",
    outboundStopLabel: "Tappa andata",
    returnStopLabel: "Stop extra",
    returnStartsSameQuestion:
      "Il ritorno parte dallo stesso luogo di arrivo?",
    returnEndsSameQuestion:
      "Il ritorno arriva nello stesso luogo di partenza?",
    autoReturnHelp:
      "Se selezioni Sì, il sistema compilerà automaticamente il percorso di ritorno.",
    yes: "Sì",
    no: "No",
    returnDepartureCityLabel: "Città di partenza ritorno",
    returnDepartureAddressLabel: "Indirizzo di partenza ritorno",
    returnDestinationCityLabel: "Città di destinazione ritorno",
    returnDestinationAddressLabel: "Indirizzo di destinazione ritorno",
    reviewText:
      "Controlla attentamente i dati inseriti. Se qualcosa è sbagliato puoi tornare indietro e correggerlo prima dell’invio.",
    specialEquipmentSummary: "Attrezzature speciali",
    customerDetailsSummary: "Dati cliente",
    serviceDetailsSummary: "Dati servizio",
    passengersSummary: "Passeggeri e bagagli",
    itinerarySummary: "Itinerario",
    submitError: "Errore durante l'invio del modulo.",
  },
  en: {
    language: "Language",
    title: "Quote request",
    subtitle: "Fill out the form to request a quote.",
    step: "Step",
    previous: "Back",
    next: "Next",
    submit: "Submit request",
    sending: "Sending...",
    successTitle: "Request sent successfully",
    successText:
      "We received your request. We will contact you as soon as possible.",
    customerInfo: "Customer details",
    serviceInfo: "Service details",
    itinerary: "Itinerary",
    passengers: "Passengers and luggage",
    notes: "Final notes",
    fullName: "Full name",
    email: "Email",
    phone: "International phone number",
    customerType: "Customer type",
    private: "Private customer",
    company: "Company",
    agency: "Agency",
    publicAdministration: "Public administration",
    serviceType: "Service type",
    tripType: "Trip type",
    oneWay: "One way",
    roundTrip: "Round trip",
    transfer: "Transfer",
    hourly: "Bus at disposal",
    tour: "Tour",
    multiDay: "Multi-day service",
    event: "Event",
    pickupDate: "Service date",
    pickupTime: "Pick-up time",
    returnDate: "Return date",
    returnTime: "Return time",
    departureCity: "Departure city",
    departureAddress: "Departure address",
    destinationCity: "Destination city",
    destinationAddress: "Destination address",
    intermediateStops: "Intermediate stops",
    addStop: "Extra stop",
    stopCity: "Extra stop city",
    stopAddress: "Extra stop address",
    remove: "Remove",
    noStops: "No stops added",
    passengersCount: "Number of passengers",
    luggageBig: "Checked luggage 23 kg",
    luggageTrolley: "Cabin trolley",
    luggageBackpack: "Backpacks / small bags",
    specialEquipment: "Special equipment",
    specialEquipmentPlaceholder:
      "Strollers, wheelchairs, musical instruments, sports equipment...",
    notesLabel: "Additional notes",
    notesPlaceholder:
      "Add useful details here: program, timing, stops, special requirements...",
    required: "Required field",
    invalidEmail: "Invalid email",
    invalidPhone: "Enter a valid number",
    minPassengers: "Enter at least 1 passenger",
    summary: "Summary",
    requestCode: "Request code",
    invalidReturnDate:
      "Return date/time cannot be earlier than departure.",
    invalidPickupDate: "Service date/time cannot be in the past.",
    outboundSectionTitle: "Outbound",
    returnSectionTitle: "Return",
    outboundIntermediateStops: "Intermediate stops outbound",
    returnIntermediateStops: "Intermediate stops return",
    outboundStopLabel: "Extra stop",
    returnStopLabel: "Return stop",
    returnStartsSameQuestion:
      "Does the return trip start from the same arrival location?",
    returnEndsSameQuestion:
      "Does the return trip end at the same departure location?",
    autoReturnHelp:
      "If you select Yes, the system will automatically fill in the return route.",
    yes: "Yes",
    no: "No",
    returnDepartureCityLabel: "Return departure city",
    returnDepartureAddressLabel: "Return departure address",
    returnDestinationCityLabel: "Return destination city",
    returnDestinationAddressLabel: "Return destination address",
    reviewText:
      "Please review the information carefully. If something is incorrect, you can go back and edit it before submitting.",
    specialEquipmentSummary: "Special equipment",
    customerDetailsSummary: "Customer details",
    serviceDetailsSummary: "Service details",
    passengersSummary: "Passengers and luggage",
    itinerarySummary: "Itinerary",
    submitError: "An error occurred while sending the form.",
  },
};

type Locale = keyof typeof translations;

type Stop = {
  city: string;
  address: string;
};

type FormData = {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  customerType: string;
  serviceType: string;
  tripType: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  passengersCount: number;
  luggageBig: number;
  luggageTrolley: number;
  luggageBackpack: number;
  specialEquipment: string;

  departureCity: string;
  departureAddress: string;
  destinationCity: string;
  destinationAddress: string;
  outboundStops: Stop[];

  returnStartsFromSameAsDestination: boolean;
  returnEndsAtSameAsDeparture: boolean;
  returnDepartureCity: string;
  returnDepartureAddress: string;
  returnDestinationCity: string;
  returnDestinationAddress: string;
  returnStops: Stop[];

  notes: string;
};

type RequestSource =
  | "website_urberbusroma"
  | "website_charterbusrome"
  | "whatsapp_link"
  | "internal_manual"
  | "ai_agent";

type QuoteRequestFormProps = {
  source: RequestSource;
  initialLocale?: Locale;
  titleOverride?: string;
  subtitleOverride?: string;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  phoneCountryCode: "+39",
  phone: "",
  customerType: "private",
  serviceType: "transfer",
  tripType: "oneWay",
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  returnTime: "",
  passengersCount: 1,
  luggageBig: 0,
  luggageTrolley: 0,
  luggageBackpack: 0,
  specialEquipment: "",

  departureCity: "",
  departureAddress: "",
  destinationCity: "",
  destinationAddress: "",
  outboundStops: [],

  returnStartsFromSameAsDestination: true,
  returnEndsAtSameAsDeparture: true,
  returnDepartureCity: "",
  returnDepartureAddress: "",
  returnDestinationCity: "",
  returnDestinationAddress: "",
  returnStops: [],

  notes: "",
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPhoneLikelyValid(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function generateRequestCode() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `UBR-${yyyy}${mm}${dd}-${rand}`;
}

function buildNormalizedPhone(
  iti: Iti | null,
  input: HTMLInputElement | null,
  fallbackPhone: string
) {
  const rawPhone = input?.value || fallbackPhone || "";
  const digitsOnly = rawPhone.replace(/[^\d]/g, "");

  if (!digitsOnly) return "";

  const selectedCountryData = iti?.getSelectedCountryData();
  const dialCode = selectedCountryData?.dialCode || "";

  if (dialCode && digitsOnly.startsWith(dialCode)) {
    return `+${digitsOnly}`;
  }

  if (dialCode) {
    return `+${dialCode}${digitsOnly}`;
  }

  return rawPhone.trim();
}

export default function QuoteRequestForm({
  source,
  initialLocale,
  titleOverride,
  subtitleOverride,
}: QuoteRequestFormProps) {
  const getBrowserLanguage = () => {
    if (typeof navigator === "undefined") return "it";
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("en")) return "en";
    return "it";
  };

  const [locale, setLocale] = useState<Locale>(
    initialLocale || getBrowserLanguage()
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<Iti | null>(null);

  const departureAddressRef = useRef<HTMLInputElement | null>(null);
  const destinationAddressRef = useRef<HTMLInputElement | null>(null);
  const returnDepartureAddressRef = useRef<HTMLInputElement | null>(null);
  const returnDestinationAddressRef = useRef<HTMLInputElement | null>(null);

  const outboundStopAddressRefs = useRef<(HTMLInputElement | null)[]>([]);
  const returnStopAddressRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!phoneInputRef.current) return;

    itiRef.current = intlTelInput(phoneInputRef.current, {
      initialCountry: initialLocale === "en" ? "us" : "it",
      nationalMode: false,
      separateDialCode: true,
      autoPlaceholder: "aggressive",
      formatAsYouType: true,
    });

    return () => {
      itiRef.current?.destroy();
      itiRef.current = null;
    };
  }, [initialLocale]);

  useEffect(() => {
    if (!googleReady || !window.google?.maps?.places) return;
    if (step !== 4) return;

    const fillCityFromPlace = (
      place: google.maps.places.PlaceResult
    ): string => {
      const component =
        place.address_components?.find(
          (c) =>
            c.types.includes("locality") ||
            c.types.includes("administrative_area_level_3")
        ) ||
        place.address_components?.find((c) =>
          c.types.includes("administrative_area_level_2")
        );

      return component?.long_name || "";
    };

    const setupAutocomplete = (
      input: HTMLInputElement | null,
      onAddress: (address: string) => void,
      onCity: (city: string) => void
    ) => {
      if (!input) return;
      if (input.dataset.autocompleteBound === "1") return;

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["address"],
        fields: ["formatted_address", "address_components"],
      });

      input.dataset.autocompleteBound = "1";

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address || input.value || "";
        const city = fillCityFromPlace(place);

        onAddress(address);
        if (city) onCity(city);
      });
    };

    setupAutocomplete(
      departureAddressRef.current,
      (address) => updateField("departureAddress", address),
      (city) => updateField("departureCity", city)
    );

    setupAutocomplete(
      destinationAddressRef.current,
      (address) => updateField("destinationAddress", address),
      (city) => updateField("destinationCity", city)
    );

    outboundStopAddressRefs.current.forEach((input, index) => {
      setupAutocomplete(
        input,
        (address) => updateOutboundStop(index, "address", address),
        (city) => updateOutboundStop(index, "city", city)
      );
    });

    if (formData.tripType === "roundTrip") {
      setupAutocomplete(
        returnDepartureAddressRef.current,
        (address) => updateField("returnDepartureAddress", address),
        (city) => updateField("returnDepartureCity", city)
      );

      setupAutocomplete(
        returnDestinationAddressRef.current,
        (address) => updateField("returnDestinationAddress", address),
        (city) => updateField("returnDestinationCity", city)
      );

      returnStopAddressRefs.current.forEach((input, index) => {
        setupAutocomplete(
          input,
          (address) => updateReturnStop(index, "address", address),
          (city) => updateReturnStop(index, "city", city)
        );
      });
    }
  }, [
    googleReady,
    step,
    formData.tripType,
    formData.outboundStops.length,
    formData.returnStops.length,
  ]);

  const t = translations[locale];
  const totalSteps = 5;

  const summary = useMemo(
    () => ({
      ...formData,
      fullPhone: itiRef.current?.getNumber() || formData.phone,
      luggageTotal:
        formData.luggageBig +
        formData.luggageTrolley +
        formData.luggageBackpack,
    }),
    [formData]
  );

  function addOutboundStop() {
    setFormData((prev) => ({
      ...prev,
      outboundStops: [...prev.outboundStops, { city: "", address: "" }],
    }));
  }

  function updateOutboundStop(index: number, field: keyof Stop, value: string) {
    setFormData((prev) => ({
      ...prev,
      outboundStops: prev.outboundStops.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop
      ),
    }));
  }

  function removeOutboundStop(index: number) {
    setFormData((prev) => ({
      ...prev,
      outboundStops: prev.outboundStops.filter((_, i) => i !== index),
    }));
  }

  function addReturnStop() {
    setFormData((prev) => ({
      ...prev,
      returnStops: [...prev.returnStops, { city: "", address: "" }],
    }));
  }

  function updateReturnStop(index: number, field: keyof Stop, value: string) {
    setFormData((prev) => ({
      ...prev,
      returnStops: prev.returnStops.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop
      ),
    }));
  }

  function removeReturnStop(index: number) {
    setFormData((prev) => ({
      ...prev,
      returnStops: prev.returnStops.filter((_, i) => i !== index),
    }));
  }

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validateStep(currentStep: number) {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) nextErrors.fullName = t.required;
      if (!formData.email.trim()) nextErrors.email = t.required;
      else if (!isEmailValid(formData.email))
        nextErrors.email = t.invalidEmail;

      const currentPhoneValue = buildNormalizedPhone(
        itiRef.current,
        phoneInputRef.current,
        formData.phone
      );

      if (!currentPhoneValue.trim()) {
        nextErrors.phone = t.required;
      } else if (!isPhoneLikelyValid(currentPhoneValue)) {
        nextErrors.phone = t.invalidPhone;
      }
    }

    if (currentStep === 2) {
      if (!formData.pickupDate) nextErrors.pickupDate = t.required;
      if (!formData.pickupTime) nextErrors.pickupTime = t.required;

      if (formData.pickupDate && formData.pickupTime) {
        const pickupDateTime = new Date(
          `${formData.pickupDate}T${formData.pickupTime}`
        );
        const now = new Date();

        if (pickupDateTime < now) {
          nextErrors.pickupDate = t.invalidPickupDate;
          nextErrors.pickupTime = t.invalidPickupDate;
        }
      }

      if (formData.tripType === "roundTrip") {
        if (!formData.returnDate) nextErrors.returnDate = t.required;
        if (!formData.returnTime) nextErrors.returnTime = t.required;

        if (
          formData.pickupDate &&
          formData.pickupTime &&
          formData.returnDate &&
          formData.returnTime
        ) {
          const pickupDateTime = new Date(
            `${formData.pickupDate}T${formData.pickupTime}`
          );
          const returnDateTime = new Date(
            `${formData.returnDate}T${formData.returnTime}`
          );

          if (returnDateTime < pickupDateTime) {
            nextErrors.returnDate = t.invalidReturnDate;
            nextErrors.returnTime = t.invalidReturnDate;
          }
        }
      }
    }

    if (currentStep === 3) {
      if (!formData.passengersCount || formData.passengersCount < 1) {
        nextErrors.passengersCount = t.minPassengers;
      }
    }

    if (currentStep === 4) {
      if (!formData.departureCity.trim())
        nextErrors.departureCity = t.required;
      if (!formData.departureAddress.trim())
        nextErrors.departureAddress = t.required;
      if (!formData.destinationCity.trim())
        nextErrors.destinationCity = t.required;
      if (!formData.destinationAddress.trim())
        nextErrors.destinationAddress = t.required;

      if (formData.tripType === "roundTrip") {
        const effectiveReturnDepartureCity =
          formData.returnStartsFromSameAsDestination
            ? formData.destinationCity
            : formData.returnDepartureCity;

        const effectiveReturnDepartureAddress =
          formData.returnStartsFromSameAsDestination
            ? formData.destinationAddress
            : formData.returnDepartureAddress;

        const effectiveReturnDestinationCity =
          formData.returnEndsAtSameAsDeparture
            ? formData.departureCity
            : formData.returnDestinationCity;

        const effectiveReturnDestinationAddress =
          formData.returnEndsAtSameAsDeparture
            ? formData.departureAddress
            : formData.returnDestinationAddress;

        if (!effectiveReturnDepartureCity.trim()) {
          nextErrors.returnDepartureCity = t.required;
        }

        if (!effectiveReturnDepartureAddress.trim()) {
          nextErrors.returnDepartureAddress = t.required;
        }

        if (!effectiveReturnDestinationCity.trim()) {
          nextErrors.returnDestinationCity = t.required;
        }

        if (!effectiveReturnDestinationAddress.trim()) {
          nextErrors.returnDestinationAddress = t.required;
        }
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrevious() {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (step !== 5) return;

    setIsSubmitting(true);

    try {
      const requestCode = generateRequestCode();

      const normalizedPhone = buildNormalizedPhone(
       itiRef.current,
       phoneInputRef.current,
       formData.phone
      );

      if (!normalizedPhone) {
        setErrors((prev) => ({
          ...prev,
          phone: t.invalidPhone,
        }));
        setIsSubmitting(false);
        setStep(1);
        return;
      }

      const payload = {
        locale,
        requestCode,
        source,
        ...formData,
        phone: normalizedPhone,
      };

      const response = await fetch(`${API_BASE}/api/public/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data?.status !== "ok") {
        throw new Error(data?.message || "Request failed");
      }

      setSubmittedCode(data?.request_code || requestCode);
      setFormData(initialData);
      setStep(1);
      setErrors({});

      if (itiRef.current) {
        itiRef.current.setNumber("");
      }
      if (phoneInputRef.current) {
        phoneInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert(t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Script
        id="google-maps-places"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
        strategy="afterInteractive"
        onLoad={() => setGoogleReady(true)}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
          {!submittedCode ? (
            <div className="border-b border-slate-200 p-5 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {titleOverride || t.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    {subtitleOverride || t.subtitle}
                  </p>
                </div>

                <div className="w-full sm:w-44">
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t.language}
                  </label>
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as Locale)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                  >
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>
                    {t.step} {step} / {totalSteps}
                  </span>
                  <span>{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all duration-300"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="border-b border-slate-200 p-5 sm:p-8">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {t.successTitle}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {t.successText}
              </p>
            </div>
          )}

          {submittedCode ? (
            <div className="p-5 sm:p-8">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-xl font-semibold text-emerald-900">
                  {t.successTitle}
                </h2>
                <p className="mt-2 text-sm text-emerald-800 sm:text-base">
                  {t.successText}
                </p>
                <p className="mt-4 text-sm font-medium text-emerald-900">
                  {t.requestCode}:{" "}
                  <span className="font-bold">{submittedCode}</span>
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="p-5 sm:p-8"
            >
              {step === 1 && (
                <section className="space-y-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {t.customerInfo}
                  </h2>

                  <Field label={t.fullName} error={errors.fullName}>
                    <input
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={inputClass(errors.fullName)}
                      placeholder={t.fullName}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.email} error={errors.email}>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={inputClass(errors.email)}
                        placeholder="name@email.com"
                      />
                    </Field>

                    <Field label={t.phone} error={errors.phone}>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        required
                        defaultValue={formData.phone}
                        onInput={(e) =>
                          updateField(
                            "phone",
                            (e.target as HTMLInputElement).value
                          )
                        }
                        className={inputClass(errors.phone)}
                        placeholder="333 1234567"
                      />
                    </Field>
                  </div>

                  <Field label={t.customerType} error={errors.customerType}>
                    <select
                      value={formData.customerType}
                      onChange={(e) =>
                        updateField("customerType", e.target.value)
                      }
                      className={inputClass()}
                    >
                      <option value="private">{t.private}</option>
                      <option value="company">{t.company}</option>
                      <option value="agency">{t.agency}</option>
                      <option value="publicAdministration">
                        {t.publicAdministration}
                      </option>
                    </select>
                  </Field>
                </section>
              )}

              {step === 2 && (
                <section className="space-y-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {t.serviceInfo}
                  </h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.serviceType}>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          updateField("serviceType", e.target.value)
                        }
                        className={inputClass()}
                      >
                        <option value="transfer">{t.transfer}</option>
                        <option value="hourly">{t.hourly}</option>
                      </select>
                    </Field>

                    <Field label={t.tripType}>
                      <select
                        value={formData.tripType}
                        onChange={(e) =>
                          updateField("tripType", e.target.value)
                        }
                        className={inputClass()}
                      >
                        <option value="oneWay">{t.oneWay}</option>
                        <option value="roundTrip">{t.roundTrip}</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.pickupDate} error={errors.pickupDate}>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.pickupDate}
                        onChange={(e) =>
                          updateField("pickupDate", e.target.value)
                        }
                        className={inputClass(errors.pickupDate)}
                      />
                    </Field>

                    <Field label={t.pickupTime} error={errors.pickupTime}>
                      <input
                        type="time"
                        value={formData.pickupTime}
                        onChange={(e) =>
                          updateField("pickupTime", e.target.value)
                        }
                        className={inputClass(errors.pickupTime)}
                      />
                    </Field>
                  </div>

                  {formData.tripType === "roundTrip" && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label={t.returnDate} error={errors.returnDate}>
                        <input
                          type="date"
                          min={formData.pickupDate || undefined}
                          value={formData.returnDate}
                          onChange={(e) =>
                            updateField("returnDate", e.target.value)
                          }
                          className={inputClass(errors.returnDate)}
                        />
                      </Field>

                      <Field label={t.returnTime} error={errors.returnTime}>
                        <input
                          type="time"
                          value={formData.returnTime}
                          onChange={(e) =>
                            updateField("returnTime", e.target.value)
                          }
                          className={inputClass(errors.returnTime)}
                        />
                      </Field>
                    </div>
                  )}
                </section>
              )}

              {step === 3 && (
                <section className="space-y-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {t.passengers}
                  </h2>

                  <Field
                    label={t.passengersCount}
                    error={errors.passengersCount}
                  >
                    <input
                      type="number"
                      min={1}
                      value={formData.passengersCount}
                      onChange={(e) =>
                        updateField("passengersCount", Number(e.target.value))
                      }
                      className={inputClass(errors.passengersCount)}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field label={t.luggageBig}>
                      <input
                        type="number"
                        min={0}
                        value={formData.luggageBig}
                        onChange={(e) =>
                          updateField("luggageBig", Number(e.target.value))
                        }
                        className={inputClass()}
                      />
                    </Field>

                    <Field label={t.luggageTrolley}>
                      <input
                        type="number"
                        min={0}
                        value={formData.luggageTrolley}
                        onChange={(e) =>
                          updateField("luggageTrolley", Number(e.target.value))
                        }
                        className={inputClass()}
                      />
                    </Field>

                    <Field label={t.luggageBackpack}>
                      <input
                        type="number"
                        min={0}
                        value={formData.luggageBackpack}
                        onChange={(e) =>
                          updateField("luggageBackpack", Number(e.target.value))
                        }
                        className={inputClass()}
                      />
                    </Field>
                  </div>

                  <Field label={t.specialEquipment}>
                    <textarea
                      rows={3}
                      value={formData.specialEquipment}
                      onChange={(e) =>
                        updateField("specialEquipment", e.target.value)
                      }
                      className={inputClass()}
                      placeholder={t.specialEquipmentPlaceholder}
                    />
                  </Field>
                </section>
              )}

              {step === 4 && (
  <section className="space-y-8">
    <h2 className="text-lg font-semibold text-slate-900">
      {t.itinerary}
    </h2>

    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-4 text-base font-semibold text-slate-900">
        {t.outboundSectionTitle}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t.departureAddress}
          error={errors.departureAddress}
        >
          <input
            ref={departureAddressRef}
            value={formData.departureAddress}
            onChange={(e) =>
              updateField("departureAddress", e.target.value)
            }
            className={inputClass(errors.departureAddress)}
            placeholder={t.departureAddress}
          />
        </Field>

        <Field
          label={t.departureCity}
          error={errors.departureCity}
        >
          <input
            value={formData.departureCity}
            onChange={(e) =>
              updateField("departureCity", e.target.value)
            }
            className={inputClass(errors.departureCity)}
            placeholder={t.departureCity}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          label={t.destinationAddress}
          error={errors.destinationAddress}
        >
          <input
            ref={destinationAddressRef}
            value={formData.destinationAddress}
            onChange={(e) =>
              updateField("destinationAddress", e.target.value)
            }
            className={inputClass(errors.destinationAddress)}
            placeholder={t.destinationAddress}
          />
        </Field>

        <Field
          label={t.destinationCity}
          error={errors.destinationCity}
        >
          <input
            value={formData.destinationCity}
            onChange={(e) =>
              updateField("destinationCity", e.target.value)
            }
            className={inputClass(errors.destinationCity)}
            placeholder={t.destinationCity}
          />
        </Field>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={addOutboundStop}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            + {t.addStop}
          </button>
        </div>

        {formData.outboundStops.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm text-slate-500">
            {t.noStops}
          </div>
        ) : (
          <div className="space-y-4">
            {formData.outboundStops.map((stop, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">
                    {t.outboundStopLabel} {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeOutboundStop(index)}
                    className="text-sm font-medium text-red-600 transition hover:text-red-700"
                  >
                    {t.remove}
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.stopAddress}>
                    <input
                      ref={(el) => {
                        outboundStopAddressRefs.current[index] = el;
                      }}
                      value={stop.address}
                      onChange={(e) =>
                        updateOutboundStop(index, "address", e.target.value)
                      }
                      className={inputClass()}
                      placeholder={t.stopAddress}
                    />
                  </Field>

                  <Field label={t.stopCity}>
                    <input
                      value={stop.city}
                      onChange={(e) =>
                        updateOutboundStop(index, "city", e.target.value)
                      }
                      className={inputClass()}
                      placeholder={t.stopCity}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {formData.tripType === "roundTrip" && (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          {t.returnSectionTitle}
        </h3>

        <div className="space-y-5">
          <Field label={t.returnStartsSameQuestion}>
            <select
              value={
                formData.returnStartsFromSameAsDestination
                  ? "yes"
                  : "no"
              }
              onChange={(e) =>
                updateField(
                  "returnStartsFromSameAsDestination",
                  e.target.value === "yes"
                )
              }
              className={inputClass()}
            >
              <option value="yes">{t.yes}</option>
              <option value="no">{t.no}</option>
            </select>
          </Field>

          <Field label={t.returnEndsSameQuestion}>
            <select
              value={
                formData.returnEndsAtSameAsDeparture
                  ? "yes"
                  : "no"
              }
              onChange={(e) =>
                updateField(
                  "returnEndsAtSameAsDeparture",
                  e.target.value === "yes"
                )
              }
              className={inputClass()}
            >
              <option value="yes">{t.yes}</option>
              <option value="no">{t.no}</option>
            </select>
          </Field>

          <p className="text-sm text-slate-500">
            {t.autoReturnHelp}
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label={t.returnDepartureCityLabel}
            error={errors.returnDepartureCity}
          >
            <input
              value={
                formData.returnStartsFromSameAsDestination
                  ? formData.destinationCity
                  : formData.returnDepartureCity
              }
              onChange={(e) =>
                updateField("returnDepartureCity", e.target.value)
              }
              disabled={formData.returnStartsFromSameAsDestination}
              className={inputClass(errors.returnDepartureCity)}
              placeholder={t.returnDepartureCityLabel}
            />
          </Field>

          <Field
            label={t.returnDepartureAddressLabel}
            error={errors.returnDepartureAddress}
          >
            <input
              ref={returnDepartureAddressRef}
              value={
                formData.returnStartsFromSameAsDestination
                  ? formData.destinationAddress
                  : formData.returnDepartureAddress
              }
              onChange={(e) =>
                updateField(
                  "returnDepartureAddress",
                  e.target.value
                )
              }
              disabled={formData.returnStartsFromSameAsDestination}
              className={inputClass(
                errors.returnDepartureAddress
              )}
              placeholder={t.returnDepartureAddressLabel}
            />
          </Field>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label={t.returnDestinationCityLabel}
            error={errors.returnDestinationCity}
          >
            <input
              value={
                formData.returnEndsAtSameAsDeparture
                  ? formData.departureCity
                  : formData.returnDestinationCity
              }
              onChange={(e) =>
                updateField(
                  "returnDestinationCity",
                  e.target.value
                )
              }
              disabled={formData.returnEndsAtSameAsDeparture}
              className={inputClass(
                errors.returnDestinationCity
              )}
              placeholder={t.returnDestinationCityLabel}
            />
          </Field>

          <Field
            label={t.returnDestinationAddressLabel}
            error={errors.returnDestinationAddress}
          >
            <input
              ref={returnDestinationAddressRef}
              value={
                formData.returnEndsAtSameAsDeparture
                  ? formData.departureAddress
                  : formData.returnDestinationAddress
              }
              onChange={(e) =>
                updateField(
                  "returnDestinationAddress",
                  e.target.value
                )
              }
              disabled={formData.returnEndsAtSameAsDeparture}
              className={inputClass(
                errors.returnDestinationAddress
              )}
              placeholder={t.returnDestinationAddressLabel}
            />
          </Field>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-slate-900">
              {t.returnIntermediateStops}
            </h4>
            <button
              type="button"
              onClick={addReturnStop}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              + {t.addStop}
            </button>
          </div>

          {formData.returnStops.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm text-slate-500">
              {t.noStops}
            </div>
          ) : (
            <div className="space-y-4">
              {formData.returnStops.map((stop, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-900">
                      {t.returnStopLabel} {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeReturnStop(index)}
                      className="text-sm font-medium text-red-600 transition hover:text-red-700"
                    >
                      {t.remove}
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t.stopCity}>
                      <input
                        value={stop.city}
                        onChange={(e) =>
                          updateReturnStop(
                            index,
                            "city",
                            e.target.value
                          )
                        }
                        className={inputClass()}
                        placeholder={t.stopCity}
                      />
                    </Field>

                    <Field label={t.stopAddress}>
                      <input
                        ref={(el) => {
                          returnStopAddressRefs.current[index] = el;
                        }}
                        value={stop.address}
                        onChange={(e) =>
                          updateReturnStop(
                            index,
                            "address",
                            e.target.value
                          )
                        }
                        className={inputClass()}
                        placeholder={t.stopAddress}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </section>
)}

          {step === 5 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {t.summary}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {t.reviewText}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {t.customerDetailsSummary}
                </h3>

                <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <SummaryItem label={t.fullName} value={summary.fullName} />
                  <SummaryItem label={t.email} value={summary.email} />
                  <SummaryItem label={t.phone} value={summary.fullPhone} />
                  <SummaryItem
                    label={t.customerType}
                    value={summary.customerType}
                  />
                </dl>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {t.serviceDetailsSummary}
                </h3>

                <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <SummaryItem
                    label={t.serviceType}
                    value={summary.serviceType}
                  />
                  <SummaryItem label={t.tripType} value={summary.tripType} />
                  <SummaryItem
                    label={t.pickupDate}
                    value={summary.pickupDate}
                  />
                  <SummaryItem
                    label={t.pickupTime}
                    value={summary.pickupTime}
                  />
                  {summary.tripType === "roundTrip" && (
                    <>
                      <SummaryItem
                        label={t.returnDate}
                        value={summary.returnDate}
                      />
                      <SummaryItem
                        label={t.returnTime}
                        value={summary.returnTime}
                      />
                    </>
                  )}
                </dl>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {t.passengersSummary}
                </h3>

                <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <SummaryItem
                    label={t.passengersCount}
                    value={String(summary.passengersCount)}
                  />
                  <SummaryItem
                    label={t.luggageBig}
                    value={String(summary.luggageBig)}
                  />
                  <SummaryItem
                    label={t.luggageTrolley}
                    value={String(summary.luggageTrolley)}
                  />
                  <SummaryItem
                    label={t.luggageBackpack}
                    value={String(summary.luggageBackpack)}
                  />
                  <SummaryItem
                    label={t.specialEquipmentSummary}
                    value={summary.specialEquipment}
                  />
                </dl>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {t.itinerarySummary}
                </h3>

                <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <SummaryItem
                    label={t.departureCity}
                    value={summary.departureCity}
                  />
                  <SummaryItem
                    label={t.departureAddress}
                    value={summary.departureAddress}
                  />
                  <SummaryItem
                    label={t.destinationCity}
                    value={summary.destinationCity}
                  />
                  <SummaryItem
                    label={t.destinationAddress}
                    value={summary.destinationAddress}
                  />

                  {summary.outboundStops.map((stop, index) => (
                    <React.Fragment
                      key={`summary-outbound-stop-${index}`}
                    >
                      <SummaryItem
                        label={`${t.outboundStopLabel} ${index + 1} - ${t.stopCity}`}
                        value={stop.city}
                      />
                      <SummaryItem
                        label={`${t.outboundStopLabel} ${index + 1} - ${t.stopAddress}`}
                        value={stop.address}
                      />
                    </React.Fragment>
                  ))}

                  {summary.tripType === "roundTrip" && (
                    <>
                      <SummaryItem
                        label={t.returnDepartureCityLabel}
                        value={
                          summary.returnStartsFromSameAsDestination
                            ? summary.destinationCity
                            : summary.returnDepartureCity
                        }
                      />
                      <SummaryItem
                        label={t.returnDepartureAddressLabel}
                        value={
                          summary.returnStartsFromSameAsDestination
                            ? summary.destinationAddress
                            : summary.returnDepartureAddress
                        }
                      />
                      <SummaryItem
                        label={t.returnDestinationCityLabel}
                        value={
                          summary.returnEndsAtSameAsDeparture
                            ? summary.departureCity
                            : summary.returnDestinationCity
                        }
                      />
                      <SummaryItem
                        label={t.returnDestinationAddressLabel}
                        value={
                          summary.returnEndsAtSameAsDeparture
                            ? summary.departureAddress
                            : summary.returnDestinationAddress
                        }
                      />

                      {summary.returnStops.map((stop, index) => (
                        <React.Fragment
                          key={`summary-return-stop-${index}`}
                        >
                          <SummaryItem
                            label={`${t.returnStopLabel} ${index + 1} - ${t.stopCity}`}
                            value={stop.city}
                          />
                          <SummaryItem
                            label={`${t.returnStopLabel} ${index + 1} - ${t.stopAddress}`}
                            value={stop.address}
                          />
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </dl>
              </div>

              <Field label={t.notesLabel}>
                <textarea
                  rows={5}
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className={inputClass()}
                  placeholder={t.notesPlaceholder}
                />
              </Field>
            </section>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={step === 1}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.previous}
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {t.next}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || step !== 5}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t.sending : t.submit}
              </button>
            )}
          </div>
        </form>
          )}
      </div>
    </div >
    </>
  );
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

function SummaryItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
      <dt className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-slate-900">{value || "-"}</dd>
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 ${error ? "border-red-400" : "border-slate-300"
    }`;
}