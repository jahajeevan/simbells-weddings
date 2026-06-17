"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/content";
import { saveContactMessage } from "@/lib/supabase";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

const EVENT_TYPES = ["Wedding", "Reception", "Engagement", "Birthday", "Baby Shower", "House Warming", "Corporate Event", "Other"];

const PHONE_REGEX = /^[6-9]\d{9}$/;
const validPhone = (p: string) => PHONE_REGEX.test(p);

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    eventType: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const onPhone = (v: string) => set("phone", v.replace(/\D/g, "").slice(0, 10));

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

  const submit = async () => {
    if (!form.firstName.trim() || !validPhone(form.phone)) {
      setShowErrors(true);
      toast.error("Please add your first name and a valid 10-digit phone.");
      return;
    }
    setShowErrors(false);
    setBusy(true);
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    try {
      await saveContactMessage({
        name: fullName,
        phone: form.phone,
        email: form.email || null,
        event_type: form.eventType || null,
        message: form.message || null,
      });
    } catch {
      // WhatsApp remains the primary channel
    }
    const msg = `Hello ${BUSINESS.owner}! ✦ Enquiry via simbells.com

Name: ${fullName}
Phone: +91 ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}
Event: ${form.eventType || "—"}
Message: ${form.message || "—"}`;
    window.open(waLink(msg), "_blank");
    setBusy(false);
    toast.success("Sent! Simon will reply on WhatsApp shortly.");
    setForm({ firstName: "", lastName: "", phone: "", email: "", eventType: "", message: "" });
  };

  const fieldBase = "w-full px-4 py-3 border rounded-sm focus:outline-none text-ink bg-white";
  const field = `${fieldBase} border-champagne focus:border-gold`;
  const fieldErr = `${fieldBase} border-red-500`;

  return (
    <div className="bg-white border border-champagne rounded-sm overflow-hidden">
      <div className="bg-ink px-6 py-5">
        <span className="eyebrow text-gold text-[0.6rem]">Send a Note</span>
        <h3 className="font-display text-ivory text-2xl mt-1">Message Simon directly</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              First name <span className="text-maroon">*</span>
            </label>
            <input
              className={firstNameError ? fieldErr : field}
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              aria-invalid={!!firstNameError}
            />
            {firstNameError && (
              <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3" /> {firstNameError}
              </p>
            )}
          </div>
          <div>
            <label className="eyebrow text-stone text-[0.6rem] block mb-2">
              Last name <span className="text-stone normal-case">(optional)</span>
            </label>
            <input
              className={field}
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="eyebrow text-stone text-[0.6rem] block mb-2">
            WhatsApp number <span className="text-maroon">*</span>
          </label>
          <div className="flex">
            <span className="px-4 py-3 bg-cream border border-r-0 border-champagne rounded-l-sm text-ink-soft">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
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
          {phoneError && (
            <p className="mt-1.5 text-red-600 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3" /> {phoneError}
            </p>
          )}
        </div>

        <div>
          <label className="eyebrow text-stone text-[0.6rem] block mb-2">
            Email <span className="text-stone normal-case">(optional)</span>
          </label>
          <input
            type="email"
            className={field}
            placeholder="Email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>

        <div>
          <label className="eyebrow text-stone text-[0.6rem] block mb-2">Event type</label>
          <select className={field} value={form.eventType} onChange={(e) => set("eventType", e.target.value)}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="eyebrow text-stone text-[0.6rem] block mb-2">Message</label>
          <textarea
            className={`${field} resize-none`}
            rows={4}
            placeholder="Tell us about your event..."
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>

        <button
          onClick={submit}
          disabled={busy}
          className="eyebrow w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-4 rounded-sm hover:brightness-95 transition-all disabled:opacity-50"
        >
          <WhatsAppGlyph className="w-4 h-4" /> {busy ? "Sending..." : "Send via WhatsApp"}
        </button>
        <p className="text-stone text-xs text-center font-serif italic">
          Your message is saved securely and delivered to Simon on WhatsApp.
        </p>
      </div>
    </div>
  );
}
