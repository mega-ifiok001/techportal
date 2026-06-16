import { useState, useEffect, useRef } from "react";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes floatBlob {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(22px,-26px) scale(1.05); }
    66%  { transform: translate(-18px,20px) scale(0.96); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes floatIcon {
    0%   { transform: translate(0,0) rotate(0deg); }
    25%  { transform: translate(10px,-14px) rotate(6deg); }
    50%  { transform: translate(-8px,10px) rotate(-4deg); }
    75%  { transform: translate(14px,6px) rotate(3deg); }
    100% { transform: translate(0,0) rotate(0deg); }
  }
  @keyframes fadeSlideUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes drawLine {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes checkPop {
    0%   { transform:scale(0) rotate(-10deg); opacity:0; }
    70%  { transform:scale(1.15) rotate(3deg); opacity:1; }
    100% { transform:scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes pulse {
    0%,100% { opacity:1; }
    50%      { opacity:0.5; }
  }
`;

// ─── Floating background ──────────────────────────────────────────────────────

const BLOBS = [
  { top:"4%",  left:"1%",  size:300, dur:"20s", delay:"0s",   op:0.04 },
  { top:"55%", left:"87%", size:260, dur:"25s", delay:"-8s",  op:0.035 },
  { top:"80%", left:"3%",  size:200, dur:"18s", delay:"-4s",  op:0.03 },
  { top:"30%", left:"76%", size:140, dur:"28s", delay:"-13s", op:0.045 },
];

const BG_ICONS = [
  { d:"M3 8h18M3 8l2-4h14l2 4M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M9 12h6", top:"10%", left:"88%", size:44, dur:"18s", delay:"-2s" },
  { d:"M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1", top:"48%", left:"3%",  size:40, dur:"22s", delay:"-9s" },
  { d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", top:"75%", left:"91%", size:42, dur:"20s", delay:"-5s" },
  { d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", top:"88%", left:"20%", size:38, dur:"24s", delay:"-12s" },
];

function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(1,6,93,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(1,6,93,0.028) 1px,transparent 1px)",
        backgroundSize:"52px 52px",
      }}/>
      {BLOBS.map((b,i)=>(
        <div key={i} style={{
          position:"absolute", top:b.top, left:b.left,
          width:b.size, height:b.size, borderRadius:"50%",
          background:"#01065d", opacity:b.op, filter:"blur(64px)",
          animation:`floatBlob ${b.dur} ease-in-out infinite`,
          animationDelay:b.delay,
        }}/>
      ))}
      {BG_ICONS.map((ic,i)=>(
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke="#01065d"
          strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
          style={{
            position:"absolute", top:ic.top, left:ic.left,
            width:ic.size, height:ic.size, opacity:0.065,
            animation:`floatIcon ${ic.dur} ease-in-out infinite`,
            animationDelay:ic.delay,
          }}>
          <path d={ic.d}/>
        </svg>
      ))}
    </div>
  );
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setVisible(true); obs.disconnect(); }
    },{ threshold:0.1 });
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return { ref, visible };
}

// ─── Contact info card ────────────────────────────────────────────────────────

function InfoCard({ icon, label, value, href, delay }) {
  const { ref, visible } = useReveal();
  return (
    <a
      ref={ref}
      href={href || "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-start gap-4 p-5 rounded-2xl border border-[#01065d]/10 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-[#01065d]/25 hover:shadow-md transition-all duration-300 group"
      style={{
        opacity: visible ? 1 : 0,
        animation: visible ? `slideInLeft 0.5s ease ${delay} both` : "none",
        textDecoration:"none",
      }}
    >
      <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background:"rgba(1,6,93,0.06)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#01065d" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18 }}>
          {icon}
        </svg>
      </span>
      <div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#01065d]/40 mb-0.5">{label}</p>
        <p className="text-[15px] font-medium text-[#01065d] group-hover:text-[#3949ab] transition-colors">{value}</p>
      </div>
    </a>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#01065d]/70">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputStyle = {
  width:"100%", padding:"10px 14px",
  borderRadius:10, border:"1.5px solid rgba(1,6,93,0.15)",
  background:"rgba(255,255,255,0.7)", color:"#01065d",
  fontSize:15, outline:"none", transition:"border-color 0.2s, box-shadow 0.2s",
  backdropFilter:"blur(6px)",
};

// ─── Main component ───────────────────────────────────────────────────────────

const SERVICES = ["Laptop Purchase", "Co-Working Space", "Training Academy", "General Enquiry", "Technical Support", "Partnership"];

export default function ContactPage() {
  const [form, setForm]     = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                       e.name    = "Your name is required.";
    if (!form.email.trim())                      e.email   = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))  e.email   = "Enter a valid email address.";
    if (!form.service)                           e.service = "Please select a service.";
    if (!form.message.trim())                    e.message = "Write a short message so we know how to help.";
    // else if (form.message.trim().length < 20)    e.message = "Message is too short (min 20 characters).";
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
   console.log("Submitting:", form);
    setStatus("sending");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error === false) {
        setStatus("success");
        setForm({ name:"", email:"", phone:"", service:"", message:"" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const focused = (name) => ({
    ...inputStyle,
    borderColor: focusedField === name ? "#01065d" : errors[name] ? "#ef4444" : "rgba(1,6,93,0.15)",
    boxShadow:   focusedField === name ? "0 0 0 3px rgba(1,6,93,0.08)" : "none",
  });

  return (
    <div className="relative min-h-screen bg-white text-[#01065d]">
      <style>{KEYFRAMES}</style>
      <FloatingBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">

        {/* ── Page header ── */}
        <div className="mb-16" style={{ animation:"fadeSlideUp 0.55s ease both" }}>
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color:"#3949ab", background:"rgba(57,73,171,0.1)" }}>
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            We're right here<br/>
            <span style={{ color:"#3949ab" }}>in Akwa Ibom.</span>
          </h1>
          <div style={{
            marginTop:12, height:3, width:56, borderRadius:99, background:"#01065d",
            transformOrigin:"left", animation:"drawLine 0.55s ease 0.3s both",
          }}/>
          <p className="mt-5 text-base md:text-lg text-[#01065d]/55 max-w-xl leading-relaxed">
            Whether you're shopping for a laptop, booking a desk, or enrolling in a course — drop us a message and we'll respond within one business day.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20">

          {/* Left — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard delay="0.1s"
              label="Visit us"
              value="Tech Portal Solution, Akwa Ibom, Nigeria"
              href="https://maps.google.com"
              icon={<><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></>}
            />
            <InfoCard delay="0.2s"
              label="Email us"
              value="hello@techportalsolution.com"
              href="mailto:hello@techportalsolution.com"
              icon={<><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></>}
            />
            <InfoCard delay="0.3s"
              label="WhatsApp / Call"
              value="(+234) 915 968 5595"
              href="https://wa.me/09159685595"
              icon={<><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></>}
            />
            <InfoCard delay="0.4s"
              label="Business hours"
              value="Mon – Sat, 8 AM – 6 PM WAT"
              icon={<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}
            />

            {/* Map placeholder */}
            <div className="mt-2 rounded-2xl overflow-hidden border border-[#01065d]/10 flex items-center justify-center"
              style={{ height:180, background:"rgba(1,6,93,0.04)" }}>
              <div className="text-center text-[#01065d]/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ width:40, height:40, margin:"0 auto 8px" }}>
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <p className="text-sm">Embed your Google Map here</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3"
            style={{ animation:"slideInRight 0.55s ease 0.15s both" }}>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-20 px-8 rounded-3xl border border-[#01065d]/10 bg-white/70 backdrop-blur-sm text-center"
                style={{ animation:"fadeSlideUp 0.5s ease both" }}>
                <div style={{
                  width:72, height:72, borderRadius:"50%", background:"rgba(1,6,93,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20,
                  animation:"checkPop 0.5s ease both",
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#01065d" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" style={{ width:32, height:32 }}>
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#01065d] mb-2">Message sent!</h2>
                <p className="text-[#01065d]/55 max-w-sm">
                  We've received your message and will get back to you within one business day.
                </p>
                <button onClick={()=>setStatus("idle")}
                  className="mt-8 px-6 py-2.5 rounded-full text-sm font-medium border border-[#01065d]/20 text-[#01065d] hover:bg-[#e8eaf6] transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <div className="rounded-3xl border border-[#01065d]/10 bg-white/70 backdrop-blur-sm p-8 md:p-10">
                <h2 className="text-xl font-bold text-[#01065d] mb-1">Send us a message</h2>
                <p className="text-sm text-[#01065d]/45 mb-8">All fields marked with * are required.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <Field label="Full name *" error={errors.name}>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Emeka Okonkwo"
                      onFocus={()=>setFocusedField("name")} onBlur={()=>setFocusedField(null)}
                      style={focused("name")}
                    />
                  </Field>

                  <Field label="Email address *" error={errors.email}>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      onFocus={()=>setFocusedField("email")} onBlur={()=>setFocusedField(null)}
                      style={focused("email")}
                    />
                  </Field>

                  <Field label="Phone number" error={errors.phone}>
                    <input
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      onFocus={()=>setFocusedField("phone")} onBlur={()=>setFocusedField(null)}
                      style={focused("phone")}
                    />
                  </Field>

                  <Field label="Service *" error={errors.service}>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      onFocus={()=>setFocusedField("service")} onBlur={()=>setFocusedField(null)}
                      style={{ ...focused("service"), appearance:"none", cursor:"pointer" }}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map(s=>(
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Message *" error={errors.message}>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell us what you need. The more detail, the faster we can help."
                        rows={5}
                        onFocus={()=>setFocusedField("message")} onBlur={()=>setFocusedField(null)}
                        style={{ ...focused("message"), resize:"vertical", minHeight:120 }}
                      />
                    </Field>
                  </div>
                </div>

                {status === "error" && (
                  <div className="mt-4 p-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-200">
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="mt-7 w-full py-3.5 rounded-xl text-white font-semibold text-[15px] transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                  style={{ background:"#01065d" }}
                >
                  {status === "sending" ? (
                    <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }}/>
                      Sending…
                    </span>
                  ) : "Send message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}