"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/content";
import { saveLead } from "@/lib/supabase";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

const EVENT_TYPES = ["Wedding", "Reception", "Engagement", "Baby Shower", "Birthday", "House Warming", "Corporate Event", "Other"];
const BUDGETS = ["Below ₹1 Lakh", "₹1L – ₹3L", "₹3L – ₹5L", "Above ₹5L", "Flexible / Not sure"];
const GUESTS = ["Below 100", "100 – 300", "300 – 500", "500 – 1000", "1000+"];
const REQUIREMENTS = [
  "Wedding Planning", "Stage & Décor", "Photography", "Videography", "Drone Coverage",
  "Bridal Makeup", "Catering / Food", "DJ & Music", "Nadaswaram / Chenda Melam",
  "Live Counters", "Lighting & Audio", "Entertainment Shows", "360 Camera", "Welcome Entries",
];

interface Form {
  eventType: string;
  date: string;
  venue: string;
  guests: string;
  budget: string;
  requirements: string[];
  firstName: string;
  lastName: string;
  phone: string;
  notes: string;
}

const INIT: Form = {
  eventType: "", date: "", venue: "", guests: "", budget: "", requirements: [],
  firstName: "", lastName: "", phone: "", notes: "",
};

const STEPS = [
  { t: "The Occasion", s: "What are we celebrating?" },
  { t: "The Date", s: "When is your big day?" },
  { t: "The Venue", s: "Where will it take place?" },
  { t: "The Gathering", s: "How many guests?" },
  { t: "The Budget", s: "What range feels right?" },
  { t: "The Details", s: "What would you like from us?" },
  { t: "Your Details", s: "How can Simon reach you?" },
];

// Indian mobile: 10 digits, starts with 6/7/8/9
const PHONE_REGEX = /^[6-9]\d{9}$/;
const validPhone = (p: string) => PHONE_REGEX.test(p);

function WizardInner() {
  const search = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(INIT);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [prefilledFrom, setPrefilledFrom] = useState<string>("");

  // Read query params from URL (e.g. /plan?event=Wedding&services=Photography,Videography&from=weddings)
  useEffect(() => {
    const eventParam = search.get("event") || "";
    const servicesParam = search.get("services") || "";
    const from = search.get("from") || "";
    if (eventParam || servicesParam) {
      const validEvent = EVENT_TYPES.includes(eventParam) ? eventParam : "";
      const services = servicesParam
        ? servicesParam.split(",").map((s) => s.trim()).filter((s) => REQUIREMENTS.includes(s))
        : [];
      setForm((f) => ({ ...f, eventType: validEvent, requirements: services }));
      setPrefilledFrom(from);
      // If event was provided, skip the first step (Occasion) — start at Date.
      if (validEvent) setStep(1);
    }
  }, [search]);

  const pct = ((step + 1) / STEPS.length) * 100;
  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));
  const toggleReq = (r: string) =>
    set({ requirements: form.requirements.includes(r) ? form.requirements.filter((x) => x !== r) : [...form.requirements, r] });

  // Phone helper — strip non-digits, cap at 10
  const onPhone = (v: string) => set({ phone: v.replace(/\D/g, "").slice(0, 10) });

  // Errors for the contact step
  const firstNameError = showErrors && form.firstName.trim().length === 0
    ? "First name is required."
    : null;
  const phoneError = showErrors && !validPhone(form.phone)
    ? form.phone.length === 0
      ? "Phone number is required."
      : form.phone.length !== 10
        ? "Phone must be exactly 10 digits."
        : "Enter a valid Indian mobile (starts with 6, 7, 8 or 9)."
    : null;

  const stepReady = (s: number) => {
    switch (s) {
      case 0: return !!form.eventType;
      case 1: return !!form.date;
      case 2: return form.venue.trim().length > 0;
      case 3: return !!form.guests;
      case 4: return !!form.budget;
      case 5: return form.requirements.length > 0;
      case 6: return form.firstName.trim().length > 0 && validPhone(form.phone);
      default: return true;
    }
  };

  const canNext = stepReady(step);

  const onNext = () => {
    if (step === 6) return; // final handled by submit
    if (!canNext) { setShowErrors(true); return; }
    setShowErrors(false);
    setStep((s) => s + 1);
  };

  const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

  const buildMessage = () =>
    `Hello ${BUSINESS.owner}! ✦ New enquiry via simbells.com

Name: ${fullName}
Phone: +91 ${form.phone}
Occasion: ${form.eventType}
Date: ${form.date}
Venue: ${form.venue}
Guests: ${form.guests}
Budget: ${form.budget}
Needs: ${form.requirements.join(", ")}
Notes: ${form.notes || "—"}

Looking forward to making this beautiful!`;

  const submit = async () => {
    if (!stepReady(6)) { setShowErrors(true); return; }
    setBusy(true);
    try {
      await saveLead({
        name: fullName,
        phone: form.phone,
        event_type: form.eventType,
        event_date: form.date || null,
        venue: form.venue,
        budget: form.budget,
        guest_count: form.guests,
        services: form.requirements,
        notes: form.notes || null,
        source: "plan_wizard",
      });
    } catch {
      // DB optional — WhatsApp is the primary channel
    }
    window.open(waLink(buildMessage()), "_blank");
    setDone(true);
    setBusy(false);
    toast.success("Enquiry sent — Simon will be in touch shortly.");
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-maroon/10 border border-gold flex items-center justify-center mx-auto mb-7">
          <Check className="w-9 h-9 text-maroon" />
        </div>
        <h2 className="font-display text-ink text-4xl">Beautifully done.</h2>
        <p className="text-ink-soft mt-4 leading-relaxed">
          Your enquiry has reached {BUSINESS.owner} on WhatsApp. He&apos;ll personally
          reach out shortly to begin shaping your celebration.
        </p>
        <div className="mt-8 rule-gold max-w-[120px] mx-auto"><span className="text-gold text-xs">✦</span></div>
        <a href={`tel:${BUSINESS.phonesE164[0]}`} className="font-display text-maroon text-2xl mt-6 block hover:text-gold-deep transition-colors">
          {BUSINESS.phones[0]}
        </a>
        <button onClick={() => { setDone(false); setForm(INIT); setStep(0); setShowErrors(false); }} className="eyebrow text-stone mt-8 hover:text-ink transition-colors">
          Submit another enquiry
        </button>
      </div>
    );
  }

  const optionBtn = (selected: boolean) =>
    `w-full text-left px-6 py-4 rounded-sm border transition-all ${
      selected ? "border-gold bg-gold/10 text-ink" : "border-champagne hover:border-gold text-ink-soft"
    }`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Prefill notice */}
      {prefilledFrom && step <= 5 && (
        <div className="mb-6 bg-gold/10 border border-gold/40 rounded-sm px-4 py-3 flex items-start gap-3">
          <span className="text-gold-deep">✦</span>
          <p className="text-ink-soft text-sm font-serif italic">
            We&apos;ve pre-filled your selections — feel free to change anything.
          </p>
        </div>
      )}

      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-3">
          <span className="eyebrow text-stone text-[0.6rem]">Step {step + 1} / {STEPS.length}</span>
          <span className="eyebrow text-gold-deep text-[0.6rem]">{Math.round(pct)}%</span>
        </div>
        <div className="h-px bg-champagne relative">
          <div className="absolute inset-y-0 left-0 bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="bg-white border border-champagne rounded-sm overflow-hidden">
        <div className="bg-ink px-8 py-7">
          <span className="eyebrow text-gold text-[0.6rem]">{STEPS[step].t}</span>
          <h2 className="font-display text-ivory text-3xl mt-2">{STEPS[step].s}</h2>
        </div>

        <div className="p-8">
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {EVENT_TYPES.map((e) => (
                <button key={e} onClick={() => set({ eventType: e })} className={optionBtn(form.eventType === e)}>
                  <span className="font-serif italic text-lg">{e}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => set({ date: e.target.value })}
                className="w-full px-5 py-4 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink text-lg"
              />
              <p className="text-stone text-sm mt-4 font-serif italic">Not fixed yet? An approximate date is perfectly fine.</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <input
                type="text"
                placeholder="Venue name or area (e.g. Tennur, Trichy)"
                value={form.venue}
                onChange={(e) => set({ venue: e.target.value })}
                className="w-full px-5 py-4 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink"
              />
              <p className="text-stone text-sm mt-4 font-serif italic">Still searching for a venue? We can help with that too.</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {GUESTS.map((g) => (
                <button key={g} onClick={() => set({ guests: g })} className={optionBtn(form.guests === g)}>
                  {g} guests
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              {BUDGETS.map((b) => (
                <button key={b} onClick={() => set({ budget: b })} className={optionBtn(form.budget === b)}>
                  {b}
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-2 gap-2.5">
              {REQUIREMENTS.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleReq(r)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-sm border text-sm text-left transition-all ${
                    form.requirements.includes(r) ? "border-gold bg-gold/10 text-ink" : "border-champagne hover:border-gold text-ink-soft"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-[3px] border flex items-center justify-center flex-shrink-0 ${form.requirements.includes(r) ? "bg-gold border-gold" : "border-stone"}`}>
                    {form.requirements.includes(r) && <Check className="w-3 h-3 text-ink" />}
                  </span>
                  {r}
                </button>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="eyebrow text-stone text-[0.6rem] block mb-2">
                    First name <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => set({ firstName: e.target.value })}
                    aria-invalid={!!firstNameError}
                    className={`w-full px-5 py-3.5 border rounded-sm focus:outline-none text-ink ${
                      firstNameError ? "border-red-500" : "border-champagne focus:border-gold"
                    }`}
                  />
                  {firstNameError && (
                    <p className="mt-2 text-red-600 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" /> {firstNameError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="eyebrow text-stone text-[0.6rem] block mb-2">
                    Last name <span className="text-stone normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => set({ lastName: e.target.value })}
                    className="w-full px-5 py-3.5 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow text-stone text-[0.6rem] block mb-2">
                  WhatsApp number <span className="text-maroon">*</span>
                </label>
                <div className="flex">
                  <span className="px-4 py-3.5 bg-cream border border-r-0 border-champagne rounded-l-sm text-ink-soft">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    pattern="[6-9][0-9]{9}"
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) => onPhone(e.target.value)}
                    aria-invalid={!!phoneError}
                    maxLength={10}
                    className={`flex-1 px-5 py-3.5 border rounded-r-sm focus:outline-none text-ink ${
                      phoneError ? "border-red-500" : "border-champagne focus:border-gold"
                    }`}
                  />
                </div>
                {phoneError ? (
                  <p className="mt-2 text-red-600 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> {phoneError}
                  </p>
                ) : (
                  <p className="mt-2 text-stone text-xs font-serif italic">10-digit Indian mobile, no spaces.</p>
                )}
              </div>

              <div>
                <label className="eyebrow text-stone text-[0.6rem] block mb-2">
                  Anything else? <span className="text-stone normal-case">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your vision..."
                  value={form.notes}
                  onChange={(e) => set({ notes: e.target.value })}
                  className="w-full px-5 py-3.5 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink resize-none"
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-8 pb-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="eyebrow flex items-center gap-1.5 text-stone hover:text-ink disabled:opacity-0 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={onNext}
              className="eyebrow flex items-center gap-1.5 bg-maroon text-ivory px-8 py-3.5 rounded-full hover:bg-ink transition-colors disabled:opacity-40"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={busy}
              className="eyebrow flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-3.5 rounded-full hover:brightness-95 transition-all disabled:opacity-40"
            >
              <WhatsAppGlyph className="w-4 h-4" /> {busy ? "Sending..." : "Send to Simon"}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-stone text-xs mt-6 font-serif italic">
        Your details stay private — shared only with {BUSINESS.owner}. Expect a reply within minutes.
      </p>
    </div>
  );
}

// useSearchParams must be wrapped in Suspense in Next.js 16
export function PlanWizard() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto py-16 text-center text-stone">Loading…</div>}>
      <WizardInner />
    </Suspense>
  );
}
