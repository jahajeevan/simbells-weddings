"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
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
  name: string;
  phone: string;
  notes: string;
}

const INIT: Form = { eventType: "", date: "", venue: "", guests: "", budget: "", requirements: [], name: "", phone: "", notes: "" };

const STEPS = [
  { t: "The Occasion", s: "What are we celebrating?" },
  { t: "The Date", s: "When is your big day?" },
  { t: "The Venue", s: "Where will it take place?" },
  { t: "The Gathering", s: "How many guests?" },
  { t: "The Budget", s: "What range feels right?" },
  { t: "The Details", s: "What would you like from us?" },
  { t: "Your Details", s: "How can Simon reach you?" },
];

export function PlanWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(INIT);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const pct = ((step + 1) / STEPS.length) * 100;
  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));
  const toggleReq = (r: string) =>
    set({ requirements: form.requirements.includes(r) ? form.requirements.filter((x) => x !== r) : [...form.requirements, r] });

  const canNext = () =>
    [form.eventType, form.date, form.venue, form.guests, form.budget, form.requirements.length > 0, form.name && form.phone][step];

  const buildMessage = () =>
    `Hello ${BUSINESS.owner}! ✦ New enquiry via simbells.com

Name: ${form.name}
Phone: ${form.phone}
Occasion: ${form.eventType}
Date: ${form.date}
Venue: ${form.venue}
Guests: ${form.guests}
Budget: ${form.budget}
Needs: ${form.requirements.join(", ")}
Notes: ${form.notes || "—"}

Looking forward to making this beautiful!`;

  const submit = async () => {
    setBusy(true);
    try {
      await saveLead({
        name: form.name,
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
        <button onClick={() => { setDone(false); setForm(INIT); setStep(0); }} className="eyebrow text-stone mt-8 hover:text-ink transition-colors">
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
              <div>
                <label className="eyebrow text-stone text-[0.6rem] block mb-2">Your Name</label>
                <input type="text" placeholder="Full name" value={form.name} onChange={(e) => set({ name: e.target.value })}
                  className="w-full px-5 py-3.5 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink" />
              </div>
              <div>
                <label className="eyebrow text-stone text-[0.6rem] block mb-2">WhatsApp Number</label>
                <div className="flex">
                  <span className="px-4 py-3.5 bg-cream border border-r-0 border-champagne rounded-l-sm text-ink-soft">+91</span>
                  <input type="tel" placeholder="99999 99999" value={form.phone} onChange={(e) => set({ phone: e.target.value })}
                    className="flex-1 px-5 py-3.5 border border-champagne rounded-r-sm focus:border-gold focus:outline-none text-ink" />
                </div>
              </div>
              <div>
                <label className="eyebrow text-stone text-[0.6rem] block mb-2">Anything else? (optional)</label>
                <textarea rows={3} placeholder="Tell us about your vision..." value={form.notes} onChange={(e) => set({ notes: e.target.value })}
                  className="w-full px-5 py-3.5 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink resize-none" />
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
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="eyebrow flex items-center gap-1.5 bg-maroon text-ivory px-8 py-3.5 rounded-full hover:bg-ink transition-colors disabled:opacity-40"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!canNext() || busy}
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
