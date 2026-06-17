"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Calendar, Clock, AlertCircle, Check } from "lucide-react";
import { BUSINESS, waLink, SERVICE_COLLECTIONS } from "@/lib/content";
import { saveAppointment } from "@/lib/supabase";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

const SLOTS = ["10:00 AM", "11:30 AM", "1:30 PM", "3:30 PM", "5:00 PM", "6:30 PM"];

const PHONE_REGEX = /^[6-9]\d{9}$/;
const validPhone = (p: string) => PHONE_REGEX.test(p);

function todayISO() {
  // Use local date in YYYY-MM-DD so the <input type="date"> min works correctly.
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function AppointmentForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    slot: "",
    venue: "",
    notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const min = useMemo(todayISO, []);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const onPhone = (v: string) => set("phone", v.replace(/\D/g, "").slice(0, 10));

  const firstNameError = showErrors && !form.firstName.trim() ? "First name is required." : null;
  const phoneError = showErrors && !validPhone(form.phone)
    ? form.phone.length === 0
      ? "Phone number is required."
      : form.phone.length !== 10
        ? "Phone must be exactly 10 digits."
        : "Enter a valid Indian mobile (starts with 6, 7, 8 or 9)."
    : null;
  const dateError = showErrors && !form.date ? "Please pick a date." : null;
  const slotError = showErrors && !form.slot ? "Please pick a time slot." : null;

  const ready = form.firstName.trim() && validPhone(form.phone) && form.date && form.slot;

  const submit = async () => {
    if (!ready) { setShowErrors(true); toast.error("Please complete the required fields."); return; }
    setBusy(true);
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    try {
      await saveAppointment({
        name: fullName,
        phone: form.phone,
        email: form.email || null,
        preferred_date: form.date,
        preferred_time: form.slot,
        purpose: form.service || "Studio consultation",
        notes: [
          form.venue ? `Venue: ${form.venue}` : null,
          form.notes ? `Notes: ${form.notes}` : null,
        ].filter(Boolean).join(" · ") || null,
      });
    } catch {
      // WhatsApp is the primary delivery channel
    }
    const msg = `Hello ${BUSINESS.owner}! ✦ New appointment request via simbells.com

Name: ${fullName}
Phone: +91 ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}
Service to discuss: ${form.service || "General consultation"}
Date: ${form.date}
Slot: ${form.slot}${form.venue ? `\nVenue / city: ${form.venue}` : ""}${form.notes ? `\nNotes: ${form.notes}` : ""}

Please confirm or suggest another slot.`;
    window.open(waLink(msg), "_blank");
    setBusy(false);
    setDone(true);
    toast.success("Sent! Simon will confirm your slot on WhatsApp.");
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-blush/30 border border-gold flex items-center justify-center mx-auto mb-7">
          <Check className="w-9 h-9 text-maroon" />
        </div>
        <h2 className="font-display text-ink text-4xl">Beautifully done.</h2>
        <p className="text-ink-soft mt-4 leading-relaxed">
          Your appointment request has reached {BUSINESS.owner} on WhatsApp.
          He will confirm <span className="font-medium text-ink">{form.date}, {form.slot}</span> shortly — or suggest the nearest available slot.
        </p>
        <a href={`tel:${BUSINESS.phonesE164[0]}`} className="font-display text-maroon text-2xl mt-6 block hover:text-gold-deep transition-colors">
          {BUSINESS.phones[0]}
        </a>
        <button
          onClick={() => {
            setDone(false);
            setForm({ firstName: "", lastName: "", phone: "", email: "", service: "", date: "", slot: "", venue: "", notes: "" });
            setShowErrors(false);
          }}
          className="eyebrow text-stone mt-8 hover:text-ink transition-colors"
        >
          Book another visit
        </button>
      </div>
    );
  }

  const field = "w-full px-4 py-3 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink bg-white";

  return (
    <div className="bg-white border border-champagne rounded-2xl overflow-hidden shadow-xl shadow-blush-deep/10">
      <div className="bg-ink px-7 py-6">
        <span className="eyebrow text-gold text-[0.6rem]">Studio Visit</span>
        <h2 className="font-display text-ivory text-3xl mt-1.5">Book your appointment</h2>
        <p className="text-cream/70 text-sm mt-2 font-serif italic">
          A free 30-minute consultation with {BUSINESS.owner}, in person or on a video call.
        </p>
      </div>

      <div className="p-7 md:p-9 space-y-6">
        {/* Name */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              First name <span className="text-maroon">*</span>
            </label>
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              aria-invalid={!!firstNameError}
              className={firstNameError ? field.replace("border-champagne", "border-red-500") : field}
            />
            {firstNameError && <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> {firstNameError}</p>}
          </div>
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              Last name <span className="text-stone normal-case">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className={field}
            />
          </div>
        </div>

        {/* Phone + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              WhatsApp number <span className="text-maroon">*</span>
            </label>
            <div className="flex">
              <span className="px-4 py-3 bg-cream border border-r-0 border-champagne rounded-l-sm text-ink-soft">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                placeholder="10-digit mobile"
                value={form.phone}
                onChange={(e) => onPhone(e.target.value)}
                aria-invalid={!!phoneError}
                className={`flex-1 px-4 py-3 border rounded-r-sm focus:outline-none text-ink ${
                  phoneError ? "border-red-500" : "border-champagne focus:border-gold"
                }`}
              />
            </div>
            {phoneError && <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> {phoneError}</p>}
          </div>
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              Email <span className="text-stone normal-case">(optional)</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={field}
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="eyebrow text-stone text-[0.6rem] block mb-2">What would you like to discuss?</label>
          <select className={field} value={form.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">General consultation</option>
            {SERVICE_COLLECTIONS.map((c) => (
              <option key={c.key} value={`${c.title} ${c.italic}`}>{c.title} {c.italic}</option>
            ))}
          </select>
        </div>

        {/* Date + Slot — the calendar */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="eyebrow text-stone text-[0.6rem] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Preferred date <span className="text-maroon">*</span>
            </label>
            <input
              type="date"
              value={form.date}
              min={min}
              onChange={(e) => set("date", e.target.value)}
              aria-invalid={!!dateError}
              className={`${dateError ? field.replace("border-champagne", "border-red-500") : field} text-lg`}
            />
            {dateError && <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> {dateError}</p>}
          </div>

          <div>
            <label className="eyebrow text-stone text-[0.6rem] mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Preferred slot <span className="text-maroon">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("slot", s)}
                  className={`px-3 py-3 rounded-sm border text-xs font-medium transition-all ${
                    form.slot === s
                      ? "border-gold bg-gold/15 text-ink"
                      : "border-champagne text-ink-soft hover:border-gold hover:bg-gold/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {slotError && <p className="mt-2 text-red-600 text-xs flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> {slotError}</p>}
            <p className="mt-2 text-stone text-xs font-serif italic">
              Simon will confirm or suggest the nearest available slot.
            </p>
          </div>
        </div>

        {/* Venue + Notes */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              Venue / city <span className="text-stone normal-case">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Trichy, Chennai, …"
              value={form.venue}
              onChange={(e) => set("venue", e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              Notes <span className="text-stone normal-case">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Anything we should know?"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={field}
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={busy}
          className="eyebrow btn-peach w-full flex items-center justify-center gap-2.5 py-4 rounded-full text-[0.7rem] disabled:opacity-50"
        >
          <WhatsAppGlyph className="w-4 h-4" /> {busy ? "Sending..." : "Confirm via WhatsApp"}
        </button>

        <p className="text-stone text-xs text-center font-serif italic">
          Your details stay private — shared only with {BUSINESS.owner}.
        </p>
      </div>
    </div>
  );
}
