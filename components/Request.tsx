"use client";

import { FormEvent, useMemo, useState } from "react";

type RequestFormProps = {
  source:
    | "website_urberbusroma"
    | "website_charterbusrome"
    | "whatsapp_link"
    | "internal_manual"
    | "ai_agent";
  title?: string;
  submitLabel?: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

export default function RequestForm({
  source,
  title = "Richiedi un preventivo",
  submitLabel = "Invia richiesta",
}: RequestFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customerType, setCustomerType] = useState("private");
  const [serviceType, setServiceType] = useState("transfer");
  const [tripType, setTripType] = useState("oneWay");

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [passengersCount, setPassengersCount] = useState(1);
  const [luggageBig, setLuggageBig] = useState(0);
  const [luggageTrolley, setLuggageTrolley] = useState(0);
  const [luggageBackpack, setLuggageBackpack] = useState(0);

  const [departureCity, setDepartureCity] = useState("");
  const [departureAddress, setDepartureAddress] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  const [notes, setNotes] = useState("");

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createdRequestCode, setCreatedRequestCode] = useState("");

  const isRoundTrip = tripType === "roundTrip";

  const canSubmit = useMemo(() => {
    return (
      fullName.trim() &&
      email.trim() &&
      phone.trim() &&
      pickupDate &&
      pickupTime &&
      departureCity.trim() &&
      departureAddress.trim() &&
      destinationCity.trim() &&
      destinationAddress.trim() &&
      passengersCount > 0
    );
  }, [
    fullName,
    email,
    phone,
    pickupDate,
    pickupTime,
    departureCity,
    departureAddress,
    destinationCity,
    destinationAddress,
    passengersCount,
  ]);

  function buildRequestCode() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `WEB-${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!canSubmit) {
      setSubmitState("error");
      setErrorMessage("Compila tutti i campi obbligatori.");
      return;
    }

    setSubmitState("loading");
    setErrorMessage("");
    setSuccessMessage("");
    setCreatedRequestCode("");

    try {
      const payload = {
        locale: "it",
        requestCode: buildRequestCode(),
        source,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        customerType,
        serviceType,
        tripType,
        pickupDate,
        pickupTime,
        returnDate: isRoundTrip ? returnDate || null : null,
        returnTime: isRoundTrip ? returnTime || null : null,
        passengersCount: Number(passengersCount),
        luggageBig: Number(luggageBig),
        luggageTrolley: Number(luggageTrolley),
        luggageBackpack: Number(luggageBackpack),
        departureCity: departureCity.trim(),
        departureAddress: departureAddress.trim(),
        destinationCity: destinationCity.trim(),
        destinationAddress: destinationAddress.trim(),
        outboundStops: [],
        returnStartsFromSameAsDestination: true,
        returnEndsAtSameAsDeparture: true,
        returnStops: [],
        notes: notes.trim() || null,
      };

      const res = await fetch(`${API_BASE}/api/public/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data?.status !== "ok") {
        throw new Error(data?.message || "Errore invio richiesta");
      }

      setSubmitState("success");
      setCreatedRequestCode(data?.request_code || "");
      setSuccessMessage("Richiesta inviata correttamente.");

      setFullName("");
      setEmail("");
      setPhone("");
      setCustomerType("private");
      setServiceType("transfer");
      setTripType("oneWay");
      setPickupDate("");
      setPickupTime("");
      setReturnDate("");
      setReturnTime("");
      setPassengersCount(1);
      setLuggageBig(0);
      setLuggageTrolley(0);
      setLuggageBackpack(0);
      setDepartureCity("");
      setDepartureAddress("");
      setDestinationCity("");
      setDestinationAddress("");
      setNotes("");
    } catch (err: any) {
      setSubmitState("error");
      setErrorMessage(err.message || "Errore invio richiesta");
    }
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 20 }}>{title}</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Nome e cognome *</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Telefono *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Tipo cliente</label>
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              style={inputStyle}
            >
              <option value="private">Privato</option>
              <option value="company">Azienda</option>
              <option value="agency">Agenzia</option>
              <option value="public_body">Ente pubblico</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tipo servizio</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              style={inputStyle}
            >
              <option value="transfer">Transfer</option>
              <option value="hourly">Servizio a ore</option>
              <option value="tour">Tour</option>
              <option value="event">Evento</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tipo tratta</label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              style={inputStyle}
            >
              <option value="oneWay">Solo andata</option>
              <option value="roundTrip">Andata e ritorno</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Data partenza *</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Ora partenza *</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              style={inputStyle}
            />
          </div>

          {isRoundTrip ? (
            <>
              <div>
                <label style={labelStyle}>Data ritorno</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Ora ritorno</label>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </>
          ) : null}

          <div>
            <label style={labelStyle}>Passeggeri *</label>
            <input
              type="number"
              min={1}
              value={passengersCount}
              onChange={(e) => setPassengersCount(Number(e.target.value || 1))}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Bagagli grandi</label>
            <input
              type="number"
              min={0}
              value={luggageBig}
              onChange={(e) => setLuggageBig(Number(e.target.value || 0))}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Bagagli trolley</label>
            <input
              type="number"
              min={0}
              value={luggageTrolley}
              onChange={(e) => setLuggageTrolley(Number(e.target.value || 0))}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Zaini / bagagli a mano</label>
            <input
              type="number"
              min={0}
              value={luggageBackpack}
              onChange={(e) => setLuggageBackpack(Number(e.target.value || 0))}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Città partenza *</label>
            <input
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Indirizzo partenza *</label>
            <input
              value={departureAddress}
              onChange={(e) => setDepartureAddress(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Città destinazione *</label>
            <input
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Indirizzo destinazione *</label>
            <input
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>Note</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: 120,
              resize: "vertical",
            }}
          />
        </div>

        {submitState === "error" ? (
          <div style={errorBoxStyle}>{errorMessage}</div>
        ) : null}

        {submitState === "success" ? (
          <div style={successBoxStyle}>
            <div>{successMessage}</div>
            {createdRequestCode ? (
              <div style={{ marginTop: 6 }}>
                Codice richiesta: <strong>{createdRequestCode}</strong>
              </div>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitState === "loading"}
          style={buttonStyle}
        >
          {submitState === "loading" ? "Invio in corso..." : submitLabel}
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#111827",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "#fff",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const errorBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 12,
  borderRadius: 10,
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#b91c1c",
};

const successBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 12,
  borderRadius: 10,
  background: "#ecfdf5",
  border: "1px solid #86efac",
  color: "#166534",
};