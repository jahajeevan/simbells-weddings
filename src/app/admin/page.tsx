"use client";

import { useEffect, useState, useCallback } from "react";
import { Users, Calendar, Clock, CheckCircle2, MessageCircle, Phone, LogOut, RefreshCw } from "lucide-react";
import { supabase, isSupabaseReady, type Lead, type LeadStatus } from "@/lib/supabase";

const STATUSES: Record<LeadStatus, { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-blue-50 text-blue-700" },
  contacted: { label: "Contacted", cls: "bg-amber-50 text-amber-700" },
  quoted: { label: "Quoted", cls: "bg-purple-50 text-purple-700" },
  booked: { label: "Booked", cls: "bg-emerald-50 text-emerald-700" },
  completed: { label: "Completed", cls: "bg-stone-100 text-stone-600" },
  cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-700" },
};

function Login({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!supabase) return;
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    else onSignedIn();
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-champagne rounded-sm overflow-hidden">
        <div className="bg-ink px-8 py-7 text-center">
          <div className="font-display tracking-[0.16em] text-ivory text-lg">SIMBELLS</div>
          <div className="eyebrow text-gold text-[0.55rem] mt-1">Lead Studio · Admin</div>
        </div>
        <div className="p-8 space-y-4">
          <input className="w-full px-4 py-3 border border-champagne rounded-sm focus:border-gold focus:outline-none" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full px-4 py-3 border border-champagne rounded-sm focus:border-gold focus:outline-none" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button onClick={submit} disabled={busy} className="eyebrow w-full bg-maroon text-ivory py-3.5 rounded-full hover:bg-ink transition-colors disabled:opacity-50">
            {busy ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-stone text-xs text-center font-serif italic">Create your admin user in Supabase → Authentication → Users.</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState({ contacts: 0, appts: 0 });
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const [l, c, a] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      supabase.from("appointments").select("id", { count: "exact", head: true }),
    ]);
    setLeads(l.data ?? []);
    setCounts({ contacts: c.count ?? 0, appts: a.count ?? 0 });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setReady(true);
      if (data.session) load();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
      if (session) load();
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const updateStatus = async (id: string, status: LeadStatus) => {
    if (!supabase) return;
    setLeads((p) => p.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const exportCsv = () => {
    const rows = [
      ["Name", "Phone", "Event", "Date", "Venue", "Guests", "Budget", "Services", "Status", "Created"],
      ...filtered.map((l) => [l.name, l.phone, l.event_type ?? "", l.event_date ?? "", l.venue ?? "", l.guest_count ?? "", l.budget ?? "", (l.services ?? []).join(" | "), l.status, l.created_at]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `simbells-leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!ready) return <div className="min-h-screen bg-cream flex items-center justify-center text-stone">Loading…</div>;

  if (!isSupabaseReady)
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-ink text-2xl mb-3">Supabase not configured</h1>
          <p className="text-ink-soft text-sm">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.</p>
        </div>
      </div>
    );

  if (!authed) return <Login onSignedIn={load} />;

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    booked: leads.filter((l) => l.status === "booked").length,
  };
  const filtered = leads.filter((l) => {
    const ms = filter === "all" || l.status === filter;
    const mq = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search) || (l.event_type ?? "").toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  return (
    <div className="min-h-screen bg-cream pt-20">
      <header className="bg-ink text-ivory px-6 py-4 flex items-center justify-between">
        <div className="font-display tracking-[0.16em] text-lg">SIMBELLS <span className="text-stone text-sm font-sans tracking-normal ml-2">· Lead Studio</span></div>
        <button onClick={() => supabase?.auth.signOut()} className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, icon: Users },
            { label: "New", value: stats.new, icon: Clock },
            { label: "Booked", value: stats.booked, icon: CheckCircle2 },
            { label: "Contact Msgs", value: counts.contacts, icon: MessageCircle },
            { label: "Appointments", value: counts.appts, icon: Calendar },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-sm p-5 border border-champagne">
              <div className="w-9 h-9 rounded-full bg-maroon/10 flex items-center justify-center mb-3"><s.icon className="w-4 h-4 text-maroon" /></div>
              <div className="font-display text-3xl text-ink">{s.value}</div>
              <div className="eyebrow text-stone text-[0.55rem] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-sm border border-champagne overflow-hidden">
          <div className="px-6 py-4 border-b border-champagne flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <h2 className="font-display text-ink text-xl">Lead Management</h2>
            <div className="flex gap-2 flex-wrap">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="px-4 py-2 border border-champagne rounded-sm text-sm focus:outline-none focus:border-gold" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 border border-champagne rounded-sm text-sm bg-white focus:outline-none">
                <option value="all">All Status</option>
                {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <button onClick={load} className="flex items-center gap-2 px-3 py-2 border border-champagne rounded-sm text-sm hover:bg-cream transition-colors" title="Refresh"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /></button>
              <button onClick={exportCsv} className="px-4 py-2 bg-ink text-ivory rounded-sm text-sm hover:bg-maroon transition-colors">Export CSV</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream">
                <tr>{["Client", "Event", "Date", "Budget", "Status", "Actions"].map((h) => <th key={h} className="text-left px-6 py-3 eyebrow text-stone text-[0.55rem]">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-champagne/40">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-cream/40">
                    <td className="px-6 py-4"><div className="font-medium text-ink">{l.name}</div><div className="text-stone text-xs">{l.phone}</div></td>
                    <td className="px-6 py-4"><div className="text-ink-soft">{l.event_type ?? "—"}</div><div className="text-stone text-xs">{l.guest_count ?? ""}{l.venue ? ` · ${l.venue}` : ""}</div></td>
                    <td className="px-6 py-4 text-ink-soft">{l.event_date ?? "—"}</td>
                    <td className="px-6 py-4 text-ink-soft">{l.budget ?? "—"}</td>
                    <td className="px-6 py-4">
                      <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)} className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer ${STATUSES[l.status].cls}`}>
                        {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <a href={`https://wa.me/91${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-sm bg-emerald-50 flex items-center justify-center hover:bg-emerald-100" aria-label="WhatsApp"><MessageCircle className="w-4 h-4 text-emerald-600" /></a>
                        <a href={`tel:+91${l.phone.replace(/\D/g, "")}`} className="w-8 h-8 rounded-sm bg-maroon/10 flex items-center justify-center hover:bg-maroon/20" aria-label="Call"><Phone className="w-4 h-4 text-maroon" /></a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-14 text-stone">{loading ? "Loading…" : "No leads yet — they'll appear here as enquiries arrive."}</div>}
        </div>
      </div>
    </div>
  );
}
