import React from 'react';
import { useState, useEffect, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = ["All", "Laptop Purchase", "Co-Working Space", "Training Academy", "General Enquiry", "Technical Support", "Partnership"];
const STATUSES  = ["all", "unread", "read", "replied"];

const STATUS_CONFIG = {
  unread:  { label:"Unread",  bg:"rgba(239,68,68,0.1)",   color:"#dc2626", dot:"#dc2626" },
  read:    { label:"Read",    bg:"rgba(245,158,11,0.1)",  color:"#d97706", dot:"#d97706" },
  replied: { label:"Replied", bg:"rgba(16,185,129,0.1)",  color:"#059669", dot:"#10b981" },
};

const KEYFRAMES = `
  @keyframes fadeIn    { from{opacity:0}           to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes drawerIn  { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)     return "just now";
  if (diff < 3600)   return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff/3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff/86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-NG", { day:"numeric", month:"short", year:"numeric" });
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-NG", {
    day:"numeric", month:"long", year:"numeric",
    hour:"2-digit", minute:"2-digit", timeZone:"Africa/Lagos",
  }) + " WAT";
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.unread;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      padding:"3px 10px", borderRadius:99, fontSize:12, fontWeight:600,
      background:cfg.bg, color:cfg.color,
    }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot, display:"inline-block" }}/>
      {cfg.label}
    </span>
  );
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ size=18 }) {
  return (
    <span style={{
      width:size, height:size, border:`2px solid rgba(1,6,93,0.15)`,
      borderTopColor:"#01065d", borderRadius:"50%", display:"inline-block",
      animation:"spin 0.7s linear infinite", flexShrink:0,
    }}/>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, accent, delay }) {
  return (
    <div style={{
      background:"#fff", border:"1px solid rgba(1,6,93,0.08)", borderRadius:16,
      padding:"20px 22px", display:"flex", alignItems:"center", gap:16,
      animation:`slideUp 0.4s ease ${delay} both`, boxShadow:"0 1px 4px rgba(1,6,93,0.04)",
    }}>
      <div style={{
        width:44, height:44, borderRadius:12, background:accent+"18",
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" style={{ width:20, height:20 }}>
          {icon}
        </svg>
      </div>
      <div>
        <p style={{ fontSize:26, fontWeight:700, color:"#01065d", lineHeight:1 }}>{value}</p>
        <p style={{ fontSize:12, color:"rgba(1,6,93,0.45)", marginTop:4 }}>{label}</p>
      </div>
    </div>
  );
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────

function DetailDrawer({ contact, onClose, onStatusChange, onDelete }) {
  const [updating, setUpdating] = useState(false);

  const changeStatus = async (status) => {
    setUpdating(true);
    await onStatusChange(contact._id, status);
    setUpdating(false);
  };

  if (!contact) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position:"fixed", inset:0, background:"rgba(1,6,93,0.18)",
        backdropFilter:"blur(3px)", zIndex:40, animation:"fadeIn 0.2s ease both",
      }}/>
      {/* Drawer */}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0, width:"min(480px, 100vw)",
        background:"#fff", zIndex:50, boxShadow:"-8px 0 40px rgba(1,6,93,0.12)",
        display:"flex", flexDirection:"column", animation:"drawerIn 0.3s ease both",
      }}>
        {/* Drawer header */}
        <div style={{
          padding:"20px 24px", borderBottom:"1px solid rgba(1,6,93,0.08)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:"#01065d", margin:0 }}>{contact.name}</h3>
            <p style={{ fontSize:12, color:"rgba(1,6,93,0.45)", marginTop:2 }}>{fmtDate(contact.createdAt)}</p>
          </div>
          <button onClick={onClose} style={{
            width:34, height:34, borderRadius:"50%", border:"1px solid rgba(1,6,93,0.12)",
            background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#01065d" strokeWidth="2"
              strokeLinecap="round" style={{ width:16, height:16 }}>
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>

          {/* Status badge + change */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24, flexWrap:"wrap" }}>
            <StatusBadge status={contact.status}/>
            {updating && <Spinner size={14}/>}
            {STATUSES.filter(s=>s!=="all" && s!==contact.status).map(s=>(
              <button key={s} onClick={()=>changeStatus(s)} style={{
                padding:"3px 12px", borderRadius:99, fontSize:12, fontWeight:600,
                border:`1px solid rgba(1,6,93,0.2)`, background:"transparent",
                color:"rgba(1,6,93,0.6)", cursor:"pointer",
              }}>
                Mark as {s}
              </button>
            ))}
          </div>

          {/* Info rows */}
          {[
            { label:"Email",   value:contact.email,   href:`mailto:${contact.email}` },
            { label:"Phone",   value:contact.phone || "—", href:contact.phone ? `tel:${contact.phone}` : null },
            { label:"Service", value:contact.service },
          ].map(({ label, value, href })=>(
            <div key={label} style={{
              display:"flex", gap:12, padding:"12px 0",
              borderBottom:"1px solid rgba(1,6,93,0.06)",
            }}>
              <span style={{ width:70, fontSize:12, fontWeight:600, color:"rgba(1,6,93,0.4)", flexShrink:0, paddingTop:1 }}>{label}</span>
              {href
                ? <a href={href} style={{ fontSize:14, color:"#3949ab", fontWeight:500, textDecoration:"none" }}>{value}</a>
                : <span style={{ fontSize:14, color:"#01065d", fontWeight:500 }}>{value}</span>
              }
            </div>
          ))}

          {/* Message */}
          <div style={{ marginTop:20 }}>
            <p style={{ fontSize:12, fontWeight:600, color:"rgba(1,6,93,0.4)", marginBottom:10 }}>MESSAGE</p>
            <div style={{
              background:"rgba(1,6,93,0.03)", border:"1px solid rgba(1,6,93,0.08)",
              borderRadius:12, padding:"16px", fontSize:14, color:"#01065d",
              lineHeight:1.7, whiteSpace:"pre-wrap",
            }}>
              {contact.message}
            </div>
          </div>

          {/* Quick reply link */}
          <a href={`mailto:${contact.email}?subject=Re: ${contact.service} — Tech Portal Solution`}
            style={{
              display:"flex", alignItems:"center", gap:8, marginTop:20,
              padding:"12px 16px", borderRadius:12, background:"#01065d",
              color:"#fff", textDecoration:"none", fontSize:14, fontWeight:600,
              justifyContent:"center",
            }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width:16, height:16 }}>
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Reply via email
          </a>
        </div>

        {/* Drawer footer */}
        <div style={{ padding:"16px 24px", borderTop:"1px solid rgba(1,6,93,0.08)" }}>
          <button onClick={()=>onDelete(contact._id)} style={{
            width:"100%", padding:"10px", borderRadius:10, border:"1px solid #fecaca",
            background:"#fff5f5", color:"#dc2626", fontSize:14, fontWeight:600,
            cursor:"pointer", transition:"background 0.2s",
          }}>
            Delete this message
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main admin panel ─────────────────────────────────────────────────────────

export default function ContactAdminPanel() {
  const [contacts, setContacts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [pagination, setPagination] = useState({ total:0, page:1, pages:1 });

  const [search, setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterService, setFilterService] = useState("All");

  const [selected, setSelected]   = useState(null);
  const [toast, setToast]         = useState(null);

  // ── Stats derived from current page data ──────────────────────────────────
  const stats = {
    total:   pagination.total,
    unread:  contacts.filter(c=>c.status==="unread").length,
    replied: contacts.filter(c=>c.status==="replied").length,
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchContacts = useCallback(async (page=1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit:15 });
      if (search)                      params.set("search",  search);
      if (filterStatus !== "all")      params.set("status",  filterStatus);
      if (filterService !== "All")     params.set("service", filterService);

      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/all?${params}`);
      const data = await res.json();
      if (data.error === false) {
        setContacts(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      showToast("Failed to load messages.", "error");
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, filterService]);

  useEffect(()=>{ fetchContacts(1); }, [fetchContacts]);

  // ── Toast ─────────────────────────────────────────────────────────────────

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(()=>setToast(null), 3200);
  };

  // ── Status change ─────────────────────────────────────────────────────────

  const handleStatusChange = async (id, status) => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}/status`, {
        method:"PATCH", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.error === false) {
        setContacts(cs => cs.map(c => c._id===id ? { ...c, status } : c));
        if (selected?._id === id) setSelected(s => ({ ...s, status }));
        showToast(`Marked as ${status}.`);
      }
    } catch {
      showToast("Update failed.", "error");
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, { method:"DELETE" });
      const data = await res.json();
      if (data.error === false) {
        setContacts(cs => cs.filter(c => c._id !== id));
        setSelected(null);
        showToast("Message deleted.");
      }
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight:"100vh", background:"transparent", fontFamily:"system-ui,sans-serif", color:"#01065d" }}>
      <style>{KEYFRAMES}</style>

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div style={{
        background:"#01065d", padding:"0 28px",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:60,
        position:"sticky", top:0, zIndex:30, boxShadow:"0 2px 12px rgba(1,6,93,0.25)",
      }} className="rounded-full !shadow-2xl">
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" style={{ width:20, height:20 }}>
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span style={{ color:"#fff", fontWeight:700, fontSize:16 }}>Contact Messages</span>
          <span style={{ color:"rgba(255,255,255,0.4)", fontSize:13 }}>· Tech Portal Admin</span>
        </div>
        <button onClick={()=>fetchContacts(pagination.page)} style={{
          background:"rgba(255,255,255,0.12)", border:"none", color:"#fff",
          padding:"6px 14px", borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer",
          display:"flex", alignItems:"center", gap:6,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" style={{ width:14, height:14 }}>
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
          </svg>
          Refresh
        </button>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }}>

        {/* ── Stats row ───────────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:28 }}>
          <StatCard className="!shadow-2xl" delay="0s"    label="Total messages" value={pagination.total}      accent="#01065d"
            icon={<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>}
          />
          <StatCard className="!shadow-2xl" delay="0.08s" label="Unread"         value={contacts.filter(c=>c.status==="unread").length}  accent="#dc2626"
            icon={<><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></>}
          />
          <StatCard className="!shadow-2xl" delay="0.16s" label="Read"           value={contacts.filter(c=>c.status==="read").length}    accent="#d97706"
            icon={<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>}
          />
          <StatCard className="!shadow-2xl" delay="0.24s" label="Replied"        value={contacts.filter(c=>c.status==="replied").length} accent="#059669"
            icon={<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>}
          />
        </div>

        {/* ── Filters bar ─────────────────────────────────────────────── */}
        <div style={{
          background:"#fff", border:"1px solid rgba(1,6,93,0.08)", borderRadius:14,
          padding:"16px 20px", marginBottom:20, display:"flex", gap:12, flexWrap:"wrap",
          alignItems:"center", boxShadow:"0 1px 4px rgba(1,6,93,0.04)",
        }}>
          {/* Search */}
          <div style={{ position:"relative", flex:"1 1 220px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(1,6,93,0.35)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:16, height:16 }}>
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search name, email or message…"
              style={{
                width:"100%", padding:"8px 12px 8px 36px", borderRadius:9,
                border:"1.5px solid rgba(1,6,93,0.12)", fontSize:13,
                color:"#01065d", outline:"none", boxSizing:"border-box",
              }}
            />
          </div>

          {/* Status filter */}
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
            style={{
              padding:"8px 12px", borderRadius:9, border:"1.5px solid rgba(1,6,93,0.12)",
              fontSize:13, color:"#01065d", background:"#fff", cursor:"pointer", outline:"none",
            }}>
            {STATUSES.map(s=>(
              <option key={s} value={s}>{s==="all" ? "All statuses" : STATUS_CONFIG[s]?.label}</option>
            ))}
          </select>

          {/* Service filter */}
          <select value={filterService} onChange={e=>setFilterService(e.target.value)}
            style={{
              padding:"8px 12px", borderRadius:9, border:"1.5px solid rgba(1,6,93,0.12)",
              fontSize:13, color:"#01065d", background:"#fff", cursor:"pointer", outline:"none",
            }}>
            {SERVICES.map(s=>(
              <option key={s} value={s}>{s==="All" ? "All services" : s}</option>
            ))}
          </select>
        </div>

        {/* ── Table ───────────────────────────────────────────────────── */}
        <div style={{
          background:"#fff", border:"1px solid rgba(1,6,93,0.08)", borderRadius:16,
          overflow:"hidden", boxShadow:"0 1px 4px rgba(1,6,93,0.04)",
        }}>
          {/* Table head */}
          <div style={{
            display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr",
            padding:"12px 20px", borderBottom:"1px solid rgba(1,6,93,0.07)",
            background:"rgba(1,6,93,0.02)",
          }}>
            {["Name / Email","Message","Service","Status","Date"].map(h=>(
              <span key={h} style={{ fontSize:11, fontWeight:700, letterSpacing:"0.07em",
                textTransform:"uppercase", color:"rgba(1,6,93,0.4)" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {loading ? (
            <div style={{ padding:48, display:"flex", justifyContent:"center" }}>
              <Spinner size={28}/>
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ padding:56, textAlign:"center", color:"rgba(1,6,93,0.35)", fontSize:14 }}>
              No messages found. Try adjusting your filters.
            </div>
          ) : contacts.map((c, i)=>(
            <div key={c._id}
              onClick={()=>{ setSelected(c); if(c.status==="unread") handleStatusChange(c._id,"read"); }}
              style={{
                display:"grid", gridTemplateColumns:"2fr 2fr 1.5fr 1fr 1fr",
                padding:"14px 20px", borderBottom:"1px solid rgba(1,6,93,0.05)",
                cursor:"pointer", transition:"background 0.15s",
                background: c.status==="unread" ? "rgba(1,6,93,0.015)" : "#fff",
                animation:`slideUp 0.35s ease ${i*30}ms both`,
              }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(1,6,93,0.03)"}
              onMouseLeave={e=>e.currentTarget.style.background= c.status==="unread" ? "rgba(1,6,93,0.015)" : "#fff"}
            >
              <div>
                <p style={{ fontSize:14, fontWeight: c.status==="unread" ? 700 : 500, color:"#01065d", margin:0 }}>{c.name}</p>
                <p style={{ fontSize:12, color:"rgba(1,6,93,0.45)", margin:"2px 0 0" }}>{c.email}</p>
              </div>
              <p style={{ fontSize:13, color:"rgba(1,6,93,0.6)", margin:0, overflow:"hidden",
                display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                {c.message}
              </p>
              <p style={{ fontSize:13, color:"rgba(1,6,93,0.6)", margin:0, alignSelf:"center" }}>{c.service}</p>
              <div style={{ alignSelf:"center" }}><StatusBadge status={c.status}/></div>
              <p style={{ fontSize:12, color:"rgba(1,6,93,0.4)", margin:0, alignSelf:"center" }}>{timeAgo(c.createdAt)}</p>
            </div>
          ))}
        </div>

        {/* ── Pagination ──────────────────────────────────────────────── */}
        {pagination.pages > 1 && (
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:20 }}>
            {Array.from({ length:pagination.pages }, (_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>fetchContacts(p)}
                style={{
                  width:36, height:36, borderRadius:8, border:"1px solid rgba(1,6,93,0.15)",
                  background: p===pagination.page ? "#01065d" : "#fff",
                  color:      p===pagination.page ? "#fff" : "#01065d",
                  fontWeight:600, fontSize:13, cursor:"pointer",
                }}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Detail drawer ───────────────────────────────────────────────── */}
      {selected && (
        <DetailDrawer
          contact={selected}
          onClose={()=>setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      {/* ── Toast ───────────────────────────────────────────────────────── */}
      {toast && (
        <div style={{
          position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
          background: toast.type==="error" ? "#dc2626" : "#01065d",
          color:"#fff", padding:"10px 20px", borderRadius:10, fontSize:14,
          fontWeight:500, zIndex:100, animation:"fadeIn 0.25s ease both",
          boxShadow:"0 4px 20px rgba(0,0,0,0.18)",
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}