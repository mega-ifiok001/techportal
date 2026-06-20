import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo_offical.png";

// ─── Keyframes injected once ─────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes floatBlob {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(20px,-24px) scale(1.05); }
    66%  { transform: translate(-16px,18px) scale(0.96); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes floatIcon {
    0%   { transform: translate(0,0) rotate(0deg); }
    25%  { transform: translate(10px,-12px) rotate(6deg); }
    50%  { transform: translate(-8px,10px) rotate(-4deg); }
    75%  { transform: translate(12px,4px) rotate(3deg); }
    100% { transform: translate(0,0) rotate(0deg); }
  }
  @keyframes fadeSlideUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes badgePop {
    from { opacity:0; transform:scale(0.8) translateY(8px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-22px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes revealSection {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
`;

// ─── Content ─────────────────────────────────────────────────────────────────

const policyContent = {
  "legal-notice": {
    title: "Legal Notice",
    badge: "Publisher Info",
    icon: (
      <path d="M9 12l2 2 4-4M7 3h10l2 2v14a1 1 0 01-1 1H6a1 1 0 01-1-1V5l2-2z"
        strokeLinecap="round" strokeLinejoin="round" />
    ),
    intro:
      "Mandatory information about the publisher, hosting, and intellectual property rights connected to this website.",
    sections: [
      {
        id: "publisher",
        title: "Publisher Information",
        body: "This website is published by Tech Portal Solution, a registered technology business operating in Akwa Ibom, Nigeria. All business activities conducted through this platform are subject to applicable Nigerian commercial law.",
      },
      {
        id: "contact",
        title: "Contact",
        body: "For legal inquiries, reach us at legal@techportalsolution.com. For general support, visit our co-working front desk or write to our registered business address.",
      },
      {
        id: "hosting",
        title: "Hosting",
        body: "This website is hosted on a privately-owned VPS infrastructure with security measures aligned to data handling best practices. Uptime and data integrity are maintained by the Tech Portal engineering team.",
      },
      {
        id: "ip",
        title: "Intellectual Property",
        body: "All text, graphics, software, logos, and content on this platform belong to Tech Portal Solution or its respective licensors. Reproduction, distribution, or reuse without prior written consent is strictly prohibited.",
      },
    ],
  },

  "terms-and-conditions": {
    title: "Terms & Conditions",
    badge: "Usage Rules",
    icon: (
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        strokeLinecap="round" strokeLinejoin="round" />
    ),
    intro:
      "These terms govern your use of this website, the laptop store, our training academy, and co-working services. Please read them carefully before using the platform.",
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of Terms",
        body: "By accessing and using this platform, you accept these Terms and Conditions in full. If you disagree with any part of these terms, please discontinue use of the website and its associated services immediately.",
      },
      {
        id: "orders",
        title: "Orders & Payment",
        body: "All product orders are subject to stock availability and confirmation. Prices are listed in Nigerian Naira (₦) and include applicable taxes unless stated otherwise. Payments are processed securely at checkout via Paystack and other supported gateways.",
      },
      {
        id: "academy",
        title: "Training Academy",
        body: "Enrollment in Tech Portal courses is subject to seat availability and payment confirmation. Course materials, schedules, and instructors are subject to change. Certificates are issued upon successful completion of programme requirements.",
      },
      {
        id: "coworking",
        title: "Co-Working Space",
        body: "Co-working access is granted based on active subscription or day-pass booking. Members are responsible for maintaining a respectful and productive environment. Tech Portal reserves the right to revoke access for conduct that disrupts other members.",
      },
      {
        id: "returns",
        title: "Returns & Refunds",
        body: "Customers may request a return within 7 days of delivery for products in original, unused condition. Refunds are issued to the original payment method after the returned item is received and inspected by our team.",
      },
      {
        id: "liability",
        title: "Limitation of Liability",
        body: "To the extent permitted by law, Tech Portal Solution is not liable for indirect, incidental, or consequential losses arising from the use of this platform or any purchased products or services.",
      },
    ],
  },

  delivery: {
    title: "Delivery Policy",
    badge: "Shipping Info",
    icon: (
      <path d="M3 8h11v7H3zm11 2h4l3 3v2h-7zM7 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
        strokeLinecap="round" strokeLinejoin="round" />
    ),
    intro:
      "Everything you need to know about how we handle dispatch, timelines, and tracking for all laptop store orders across Nigeria.",
    sections: [
      {
        id: "areas",
        title: "Delivery Areas",
        body: "We currently deliver across Akwa Ibom State and major cities in Nigeria including Lagos, Abuja, Port Harcourt, and Kano. Nationwide coverage continues to expand — contact us to confirm your specific location before ordering.",
      },
      {
        id: "processing",
        title: "Processing Time",
        body: "Orders confirmed before 12:00 PM on business days are processed the same day. Orders placed after the cutoff, on weekends, or on public holidays are queued and processed the next working day.",
      },
      {
        id: "shipping",
        title: "Shipping Times",
        body: "Intra-state delivery (within Akwa Ibom) typically takes 1 to 2 business days. Interstate shipping usually takes 3 to 6 business days depending on destination and courier network availability.",
      },
      {
        id: "tracking",
        title: "Tracking & Delays",
        body: "A tracking reference is sent to your registered email and WhatsApp once your order is dispatched. Delivery estimates are not guaranteed and may be affected by courier delays, public holidays, or adverse weather conditions.",
      },
      {
        id: "damaged",
        title: "Damaged or Missing Items",
        body: "If your order arrives damaged or incomplete, contact us within 24 hours of delivery with photos of the packaging and item. We will arrange a replacement or refund based on investigation findings.",
      },
    ],
  },
};

// ─── Floating Background ─────────────────────────────────────────────────────

const BLOBS = [
  { top: "6%",  left: "2%",  size: 340, dur: "20s", delay: "0s",   op: 0.04  },
  { top: "52%", left: "86%", size: 280, dur: "24s", delay: "-7s",  op: 0.035 },
  { top: "78%", left: "4%",  size: 220, dur: "17s", delay: "-3s",  op: 0.03  },
  { top: "28%", left: "74%", size: 160, dur: "26s", delay: "-12s", op: 0.045 },
  { top: "62%", left: "42%", size: 110, dur: "22s", delay: "-8s",  op: 0.025 },
];

const ICONS = [
  { d: "M9 12l2 2 4-4M7 3h10l2 2v14a1 1 0 01-1 1H6a1 1 0 01-1-1V5l2-2z", top:"12%", left:"89%", size:46, dur:"18s", delay:"-2s" },
  { d: "M3 8h11v7H3zm11 2h4l3 3v2h-7zM7 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z", top:"44%", left:"3%", size:40, dur:"22s", delay:"-9s" },
  { d: "M12 5l6 3v4c0 5-3 8-6 9-3-1-6-4-6-9V8zM9.5 12.5l2 2 3.5-4", top:"72%", left:"92%", size:44, dur:"20s", delay:"-5s" },
  { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2", top:"86%", left:"18%", size:38, dur:"25s", delay:"-13s" },
  { d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", top:"22%", left:"6%", size:36, dur:"16s", delay:"-4s" },
];

function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {/* grid */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(1,6,93,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(1,6,93,0.028) 1px,transparent 1px)",
        backgroundSize:"52px 52px",
      }}/>
      {/* blobs */}
      {BLOBS.map((b,i)=>(
        <div key={i} style={{
          position:"absolute", top:b.top, left:b.left,
          width:b.size, height:b.size, borderRadius:"50%",
          background:"#01065d", opacity:b.op, filter:"blur(64px)",
          animation:`floatBlob ${b.dur} ease-in-out infinite`,
          animationDelay:b.delay,
        }}/>
      ))}
      {/* icons */}
      {ICONS.map((ic,i)=>(
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke="#01065d"
          strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
          style={{
            position:"absolute", top:ic.top, left:ic.left,
            width:ic.size, height:ic.size, opacity:0.07,
            animation:`floatIcon ${ic.dur} ease-in-out infinite`,
            animationDelay:ic.delay,
          }}>
          <path d={ic.d}/>
        </svg>
      ))}
    </div>
  );
}

// ─── Scroll-reveal hook ──────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setVisible(true); obs.disconnect(); }
    },{ threshold });
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return { ref, visible };
}

// ─── Animated Section Card ───────────────────────────────────────────────────

function SectionCard({ section, index }) {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      id={section.id}
      className="scroll-mt-24"
      style={{
        opacity: visible ? 1 : 0,
        animation: visible ? `revealSection 0.55s ease forwards` : "none",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex items-start gap-5 p-6 rounded-2xl border border-[#01065d]/08 bg-white/60 backdrop-blur-sm hover:bg-white/90 hover:border-[#01065d]/20 hover:shadow-lg transition-all duration-300">
        {/* number badge */}
        <span
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
          style={{ background: "#01065d", marginTop: "2px" }}
        >
          {index + 1}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[#01065d] mb-2">{section.title}</h2>
          <p className="text-[#01065d]/65 leading-relaxed text-[15px]">{section.body}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Sticky Section Nav ──────────────────────────────────────────────────────

function SectionNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(()=>{
    setActiveId(sections[0]?.id);
    const observers = sections.map(({ id })=>{
      const el = document.getElementById(id);
      if(!el) return null;
      const obs = new IntersectionObserver(
        ([entry])=>{ if(entry.isIntersecting) setActiveId(id); },
        { rootMargin:"-25% 0px -65% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return ()=>observers.forEach(o=>o?.disconnect());
  },[sections]);

  return (
    <nav
      className="hidden lg:flex flex-col gap-1 sticky self-start min-w-[200px]"
      style={{ top:"88px", animation:"slideInLeft 0.5s ease forwards" }}
    >
      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#01065d]/35 mb-3 px-3">
        On this page
      </p>
      {sections.map(({ id, title })=>(
        <a
          key={id}
          href={`#${id}`}
          className="text-sm px-3 py-2 rounded-lg transition-all duration-200 border-l-2"
          style={{
            borderLeftColor: activeId===id ? "#01065d" : "transparent",
            color: activeId===id ? "#01065d" : "rgba(1,6,93,0.45)",
            fontWeight: activeId===id ? 600 : 400,
            background: activeId===id ? "rgba(1,6,93,0.06)" : "transparent",
          }}
        >
          {title}
        </a>
      ))}
    </nav>
  );
}

// ─── Policy Page ─────────────────────────────────────────────────────────────

function PolicyPage({ type }) {
  const content = policyContent[type] ?? policyContent["legal-notice"];

  return (
    <div className="flex gap-14 xl:gap-20 items-start">
      <SectionNav sections={content.sections} />

      <main className="flex-1 min-w-0 pb-28">

        {/* Hero header */}
        <div className="mb-10" style={{ animation:"fadeSlideUp 0.55s ease forwards" }}>
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
            style={{
              color:"#3949ab", background:"rgba(57,73,171,0.1)",
              animation:"badgePop 0.45s ease 0.1s both",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width:13, height:13 }}>
              {content.icon}
            </svg>
            {content.badge}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#01065d] tracking-tight leading-tight">
            {content.title}
          </h1>

          {/* animated underline */}
          <div style={{
            marginTop:10, height:3, width:64, borderRadius:99,
            background:"#01065d", transformOrigin:"left",
            animation:"drawLine 0.5s ease 0.3s both",
          }}/>

          <p className="mt-5 text-base md:text-lg text-[#01065d]/55 leading-relaxed max-w-2xl">
            {content.intro}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#01065d]/08 mb-10"
          style={{ animation:"drawLine 0.6s ease 0.2s both", transformOrigin:"left" }}
        />

        {/* Section cards */}
        <div className="space-y-4">
          {content.sections.map((section, i)=>(
            <SectionCard key={section.id} section={section} index={i} />
          ))}
        </div>

        {/* Footer stamp */}
        <div
          className="mt-14 p-5 rounded-2xl border border-[#01065d]/08 bg-white/50 backdrop-blur-sm flex items-center gap-3"
          style={{ animation:"fadeSlideUp 0.5s ease 0.6s both" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#01065d" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18, opacity:0.4, flexShrink:0 }}>
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          <p className="text-sm text-[#01065d]/45">
            Last updated: June 2025 · Tech Portal Solution, Akwa Ibom, Nigeria
          </p>
        </div>
      </main>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function PolicyHeader() {
  const links = [
    { label: "Legal Notice",       to: "/info/legal-notice" },
    { label: "Terms & Conditions", to: "/info/terms-and-conditions" },
    { label: "Delivery",           to: "/info/delivery" },
  ];

  return (
    <header style={{
      borderBottom:"1px solid rgba(1,6,93,0.08)",
      background:"rgba(255,255,255,0.82)",
      backdropFilter:"blur(14px)",
      position:"sticky", top:0, zIndex:50,
    }}>
      <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <a href="/store" className="inline-block">
          <img src={logo} alt="Tech Portal Solution" className="h-9 w-auto" />
        </a>
        <nav className="flex flex-wrap gap-2">
          {links.map(link=>(
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive })=>
                `px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-sm"
                    : "text-[#01065d] hover:bg-[#e8eaf6]"
                }`
              }
              style={({ isActive })=>
                isActive ? { background:"#01065d" } : {}
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function InfoPages() {
  return (
    <div className="relative min-h-screen bg-white text-[#01065d]">
      <style>{KEYFRAMES}</style>
      <FloatingBackground />

      <div className="relative z-10">
        <PolicyHeader />
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Routes>
            <Route index element={<Navigate to="/info/legal-notice" replace />} />
            <Route path="legal-notice"        element={<PolicyPage type="legal-notice" />} />
            <Route path="terms-and-conditions" element={<PolicyPage type="terms-and-conditions" />} />
            <Route path="delivery"             element={<PolicyPage type="delivery" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}