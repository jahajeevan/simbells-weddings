export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.5" }
  public: {
    Tables: {
      analytics_events: {
        Row: { created_at: string; event_name: string; id: number; metadata: Json; path: string | null; referrer: string | null; session_id: string | null }
        Insert: { created_at?: string; event_name?: string; id?: never; metadata?: Json; path?: string | null; referrer?: string | null; session_id?: string | null }
        Update: { created_at?: string; event_name?: string; id?: never; metadata?: Json; path?: string | null; referrer?: string | null; session_id?: string | null }
        Relationships: []
      }
      appointments: {
        Row: { created_at: string; email: string | null; id: string; name: string; notes: string | null; phone: string; preferred_date: string | null; preferred_time: string | null; purpose: string | null; status: Database["public"]["Enums"]["appointment_status"]; updated_at: string }
        Insert: { created_at?: string; email?: string | null; id?: string; name: string; notes?: string | null; phone: string; preferred_date?: string | null; preferred_time?: string | null; purpose?: string | null; status?: Database["public"]["Enums"]["appointment_status"]; updated_at?: string }
        Update: { created_at?: string; email?: string | null; id?: string; name?: string; notes?: string | null; phone?: string; preferred_date?: string | null; preferred_time?: string | null; purpose?: string | null; status?: Database["public"]["Enums"]["appointment_status"]; updated_at?: string }
        Relationships: []
      }
      contact_messages: {
        Row: { created_at: string; email: string | null; event_type: string | null; id: string; message: string | null; name: string; phone: string; status: Database["public"]["Enums"]["lead_status"]; updated_at: string }
        Insert: { created_at?: string; email?: string | null; event_type?: string | null; id?: string; message?: string | null; name: string; phone: string; status?: Database["public"]["Enums"]["lead_status"]; updated_at?: string }
        Update: { created_at?: string; email?: string | null; event_type?: string | null; id?: string; message?: string | null; name?: string; phone?: string; status?: Database["public"]["Enums"]["lead_status"]; updated_at?: string }
        Relationships: []
      }
      gallery_items: {
        Row: { category: string; created_at: string; id: string; image_url: string; is_published: boolean; sort_order: number; storage_path: string | null; title: string | null; updated_at: string }
        Insert: { category?: string; created_at?: string; id?: string; image_url: string; is_published?: boolean; sort_order?: number; storage_path?: string | null; title?: string | null; updated_at?: string }
        Update: { category?: string; created_at?: string; id?: string; image_url?: string; is_published?: boolean; sort_order?: number; storage_path?: string | null; title?: string | null; updated_at?: string }
        Relationships: []
      }
      leads: {
        Row: { budget: string | null; created_at: string; email: string | null; event_date: string | null; event_type: string | null; guest_count: string | null; id: string; name: string; notes: string | null; phone: string; services: string[]; source: Database["public"]["Enums"]["enquiry_source"]; status: Database["public"]["Enums"]["lead_status"]; updated_at: string; venue: string | null }
        Insert: { budget?: string | null; created_at?: string; email?: string | null; event_date?: string | null; event_type?: string | null; guest_count?: string | null; id?: string; name: string; notes?: string | null; phone: string; services?: string[]; source?: Database["public"]["Enums"]["enquiry_source"]; status?: Database["public"]["Enums"]["lead_status"]; updated_at?: string; venue?: string | null }
        Update: { budget?: string | null; created_at?: string; email?: string | null; event_date?: string | null; event_type?: string | null; guest_count?: string | null; id?: string; name?: string; notes?: string | null; phone?: string; services?: string[]; source?: Database["public"]["Enums"]["enquiry_source"]; status?: Database["public"]["Enums"]["lead_status"]; updated_at?: string; venue?: string | null }
        Relationships: []
      }
      notifications_log: {
        Row: { channel: Database["public"]["Enums"]["notification_channel"]; created_at: string; error: string | null; id: string; lead_id: string | null; payload: Json | null; recipient: string | null; status: Database["public"]["Enums"]["notification_status"] }
        Insert: { channel: Database["public"]["Enums"]["notification_channel"]; created_at?: string; error?: string | null; id?: string; lead_id?: string | null; payload?: Json | null; recipient?: string | null; status?: Database["public"]["Enums"]["notification_status"] }
        Update: { channel?: Database["public"]["Enums"]["notification_channel"]; created_at?: string; error?: string | null; id?: string; lead_id?: string | null; payload?: Json | null; recipient?: string | null; status?: Database["public"]["Enums"]["notification_status"] }
        Relationships: [{ foreignKeyName: "notifications_log_lead_id_fkey"; columns: ["lead_id"]; isOneToOne: false; referencedRelation: "leads"; referencedColumns: ["id"] }]
      }
      packages: {
        Row: { accent: string | null; created_at: string; description: string | null; id: string; image_url: string | null; includes: string[]; is_active: boolean; is_featured: boolean; name: string; price: string; price_note: string | null; slug: string; sort_order: number; tagline: string | null; updated_at: string }
        Insert: { accent?: string | null; created_at?: string; description?: string | null; id?: string; image_url?: string | null; includes?: string[]; is_active?: boolean; is_featured?: boolean; name: string; price: string; price_note?: string | null; slug: string; sort_order?: number; tagline?: string | null; updated_at?: string }
        Update: { accent?: string | null; created_at?: string; description?: string | null; id?: string; image_url?: string | null; includes?: string[]; is_active?: boolean; is_featured?: boolean; name?: string; price?: string; price_note?: string | null; slug?: string; sort_order?: number; tagline?: string | null; updated_at?: string }
        Relationships: []
      }
      testimonials: {
        Row: { couple_name: string; created_at: string; event_type: string | null; id: string; image_url: string | null; is_published: boolean; quote: string; rating: number; sort_order: number; updated_at: string }
        Insert: { couple_name: string; created_at?: string; event_type?: string | null; id?: string; image_url?: string | null; is_published?: boolean; quote: string; rating?: number; sort_order?: number; updated_at?: string }
        Update: { couple_name?: string; created_at?: string; event_type?: string | null; id?: string; image_url?: string | null; is_published?: boolean; quote?: string; rating?: number; sort_order?: number; updated_at?: string }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: {
      appointment_status: "requested" | "confirmed" | "completed" | "cancelled"
      enquiry_source: "plan_wizard" | "contact_form" | "whatsapp" | "instagram" | "facebook" | "referral" | "other"
      lead_status: "new" | "contacted" | "quoted" | "booked" | "completed" | "cancelled"
      notification_channel: "whatsapp" | "email"
      notification_status: "pending" | "sent" | "failed"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

type PublicSchema = Database["public"]
export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Update"]
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T]
