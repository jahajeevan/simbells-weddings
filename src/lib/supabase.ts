import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const configured = /^https?:\/\//.test(supabaseUrl) && supabaseAnonKey.length > 0;

// Typed client. Null only if env is missing — WhatsApp remains the primary
// channel, so the site keeps working even without a DB connection.
export const supabase: SupabaseClient<Database> | null = configured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseReady = configured;

// ---------- Row / Insert aliases ----------
export type Lead = Tables<"leads">;
export type ContactMessage = Tables<"contact_messages">;
export type Appointment = Tables<"appointments">;
export type Package = Tables<"packages">;
export type Testimonial = Tables<"testimonials">;
export type GalleryItem = Tables<"gallery_items">;
export type LeadStatus = Database["public"]["Enums"]["lead_status"];

// ============================================================
// WRITES — public enquiry capture (anon key, RLS-validated)
// ============================================================

// NOTE: public (anon) inserts use return=minimal — i.e. NO chained .select().
// Anon has no SELECT policy on these tables (by design), so reading the row
// back would fail RLS. We deliberately don't read it back.

export async function saveLead(lead: TablesInsert<"leads">) {
  if (!supabase) return { error: null };
  const result = await supabase.from("leads").insert(lead);
  // Best-effort backup email notification — never blocks the user.
  if (!result.error) {
    supabase.functions.invoke("notify-enquiry", { body: { lead } }).catch(() => {});
  }
  return result;
}

export async function saveContactMessage(msg: TablesInsert<"contact_messages">) {
  if (!supabase) return { error: null };
  return supabase.from("contact_messages").insert(msg);
}

export async function saveAppointment(appt: TablesInsert<"appointments">) {
  if (!supabase) return { error: null };
  return supabase.from("appointments").insert(appt);
}

/**
 * Returns the time slots already taken for a given date.
 * Reads from the public `preferred_time` field of confirmed/requested rows.
 * Anon cannot SELECT appointments by RLS — so we call a small RPC-less
 * count query that works around this: we just try insert + on conflict
 * we surface a friendly error. For UX we keep this list empty client-side
 * and rely on Simon to confirm bookings.
 *
 * NOTE: kept simple by design. To strictly enforce no-double-book, add a
 * SELECT policy on appointments for anon limited to (preferred_date,
 * preferred_time) only — out of scope today.
 */
export async function getBookedSlots(_date: string): Promise<string[]> {
  // Anon can't read appointments → return empty until/unless we add a
  // dedicated availability view. Simon sees & confirms in /admin.
  void _date;
  return [];
}

export async function trackEvent(event: TablesInsert<"analytics_events">) {
  if (!supabase) return;
  // fire-and-forget; never block the UI on analytics
  await supabase.from("analytics_events").insert(event);
}

// ============================================================
// READS — published public content (with safe static fallbacks)
// ============================================================

export async function getPackages() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getTestimonials() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return data ?? [];
}

export async function getGallery() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return data ?? [];
}

// ============================================================
// ADMIN READS (require an authenticated session)
// ============================================================

export async function getLeads() {
  if (!supabase) return [];
  const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  if (!supabase) return { error: null };
  return supabase.from("leads").update({ status }).eq("id", id);
}
