"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BUSINESS, waLink } from "@/lib/content";
import { saveContactMessage } from "@/lib/supabase";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

const EVENT_TYPES = ["Wedding", "Reception", "Engagement", "Birthday", "Baby Shower", "House Warming", "Corporate Event", "Other"];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", eventType: "", message: "" });
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.phone) {
      toast.error("Please add your name and phone number.");
      return;
    }
    setBusy(true);
    try {
      await saveContactMessage({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        event_type: form.eventType || null,
        message: form.message || null,
      });
    } catch {
      // WhatsApp remains the primary channel
    }
    const msg = `Hello ${BUSINESS.owner}! ✦ Enquiry via simbells.com

Name: ${form.name}
Phone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}
Event: ${form.eventType || "—"}
Message: ${form.message || "—"}`;
    window.open(waLink(msg), "_blank");
    setBusy(false);
    toast.success("Sent! Simon will reply on WhatsApp shortly.");
    setForm({ name: "", phone: "", email: "", eventType: "", message: "" });
  };

  const field = "w-full px-4 py-3 border border-champagne rounded-sm focus:border-gold focus:outline-none text-ink bg-white";

  return (
    <div className="bg-white border border-champagne rounded-sm overflow-hidden">
      <div className="bg-ink px-6 py-5">
        <span className="eyebrow text-gold text-[0.6rem]">Send a Note</span>
        <h3 className="font-display text-ivory text-2xl mt-1">Message Simon directly</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={field} placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <input className={field} placeholder="Phone number" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <input className={field} placeholder="Email (optional)" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <select className={field} value={form.eventType} onChange={(e) => set("eventType", e.target.value)}>
          <option value="">Event type</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <textarea className={`${field} resize-none`} rows={4} placeholder="Tell us about your event..." value={form.message} onChange={(e) => set("message", e.target.value)} />
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
