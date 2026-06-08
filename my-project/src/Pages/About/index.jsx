import React, { useEffect, useRef, useState } from "react";

const aboutStyles = `
  /* ── leadership + staff carousel ── */
  .ab-ceo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 18px;
    margin: 10px 0 56px;
  }

  .ab-ceo-card {
    padding: 26px;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    position: relative;
    overflow: hidden;
  }

  .ab-ceo-card::after {
    content: '';
    position: absolute;
    inset: auto -20% -20% auto;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.16), transparent 70%);
    pointer-events: none;
  }

  .ab-ceo-layout {
    display: grid;
    grid-template-columns: 164px 1fr;
    gap: 22px;
    align-items: center;
  }

  .ab-ceo-portrait {
    width: 164px;
    height: 164px;
    border-radius: 34px;
    background: linear-gradient(135deg, rgba(99,102,241,0.26), rgba(168,85,247,0.18));
    border: 1px solid rgba(255,255,255,0.14);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .ab-ceo-portrait::before {
    content: '';
    position: absolute;
    inset: 12px;
    border-radius: 28px;
    border: 1px dashed rgba(255,255,255,0.18);
  }

  .ab-ceo-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  .ab-ceo-initials {
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
    color: #fff;
    margin-top: 6px;
  }

  .ab-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  .ab-chip {
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.78);
    font-size: 12px;
  }

  .ab-metric-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 18px;
  }

  .ab-metric {
    padding: 14px 12px;
    border-radius: 14px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .ab-metric-k {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  .ab-metric-v {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }

  .ab-carousel-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin: 8px 0 12px;
  }

  .ab-carousel-controls {
    display: flex;
    gap: 10px;
  }

  .ab-carousel-btn {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  }

  .ab-carousel-btn:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.1);
    border-color: rgba(99,102,241,0.4);
  }

  .ab-carousel-shell {
    position: relative;
  }

  .ab-carousel-track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding: 8px 4px 16px;
    -webkit-overflow-scrolling: touch;
  }

  .ab-carousel-track::-webkit-scrollbar {
    height: 8px;
  }

  .ab-carousel-track::-webkit-scrollbar-track {
    background: transparent;
  }

  .ab-carousel-track::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.18);
    border-radius: 999px;
  }

  .ab-carousel-card {
    flex: 0 0 300px;
    scroll-snap-align: start;
    min-height: 382px;
    border-radius: 22px;
    background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    overflow: hidden;
    position: relative;
    transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  }

  .ab-carousel-card:hover {
    transform: translateY(-8px);
    border-color: rgba(99,102,241,0.35);
    box-shadow: 0 18px 44px rgba(0,0,0,0.24);
  }

  .ab-carousel-card::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 40%);
  }

  .ab-card-top {
    padding: 18px;
    min-height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .ab-avatar {
    width: 84px;
    height: 84px;
    border-radius: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .ab-avatar strong {
    font-size: 24px;
    line-height: 1;
  }

  .ab-avatar small {
    font-size: 10px;
    opacity: 0.75;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 3px;
  }

  .ab-role-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    font-size: 11px;
    color: rgba(255,255,255,0.82);
    white-space: nowrap;
  }

  .ab-card-body {
    padding: 0 18px 18px;
  }

  .ab-card-name {
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    margin: 0 0 4px;
  }

  .ab-card-role {
    font-size: 12px;
    color: rgba(255,255,255,0.52);
    margin: 0 0 12px;
  }

  .ab-card-quote {
    font-size: 13px;
    color: rgba(255,255,255,0.62);
    line-height: 1.7;
    margin: 0 0 14px;
  }

  .ab-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ab-tag {
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 11px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.72);
  }

  .ab-dot-row {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 12px;
  }

  .ab-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255,255,255,0.18);
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  .ab-dot.ab-active {
    width: 26px;
    background: linear-gradient(90deg, #6366f1, #a5b4fc);
  }

  @media (max-width: 640px) {
    .ab-ceo-layout {
      grid-template-columns: 1fr;
    }

    .ab-ceo-portrait {
      width: 100%;
      height: 180px;
    }

    .ab-carousel-card {
      flex-basis: 82vw;
    }

    .ab-carousel-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .ab-metric-grid {
      grid-template-columns: 1fr;
    }
  }
  @keyframes about-ping {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.5); opacity: 0.4; }
  }
  @keyframes about-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes about-bar-grow {
    from { width: 0; }
  }
  @keyframes about-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }

  .about-ping { animation: about-ping 2.2s ease-in-out infinite; }
  .about-ring { animation: about-spin 28s linear infinite; }

  /* ── reveal base (starts hidden) ── */
  .ab-reveal {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ab-reveal.ab-visible { opacity: 1; }

  .ab-up    { transform: translateY(40px); }
  .ab-left  { transform: translateX(-40px); }
  .ab-right { transform: translateX(40px); }
  .ab-scale { transform: scale(0.88); }
  .ab-reveal.ab-visible.ab-up,
  .ab-reveal.ab-visible.ab-left,
  .ab-reveal.ab-visible.ab-right { transform: none; }
  .ab-reveal.ab-visible.ab-scale { transform: scale(1); }

  /* stagger siblings */
  .ab-stagger > * {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ab-stagger.ab-visible > *:nth-child(1) { opacity:1; transform:none; transition-delay: 0ms;   }
  .ab-stagger.ab-visible > *:nth-child(2) { opacity:1; transform:none; transition-delay: 110ms; }
  .ab-stagger.ab-visible > *:nth-child(3) { opacity:1; transform:none; transition-delay: 220ms; }
  .ab-stagger.ab-visible > *:nth-child(4) { opacity:1; transform:none; transition-delay: 330ms; }

  /* value cards stagger */
  .ab-cards-stagger > * {
    opacity: 0;
    transform: translateY(32px) scale(0.95);
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ab-cards-stagger.ab-visible > *:nth-child(1) { opacity:1; transform:none; transition-delay: 0ms;   }
  .ab-cards-stagger.ab-visible > *:nth-child(2) { opacity:1; transform:none; transition-delay: 150ms; }
  .ab-cards-stagger.ab-visible > *:nth-child(3) { opacity:1; transform:none; transition-delay: 300ms; }

  /* value card hover */
  .about-value-card {
    padding: 24px 22px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.09);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform 0.35s ease, border-color 0.35s ease;
    position: relative;
    overflow: hidden;
  }
  .about-value-card:hover {
    transform: translateY(-6px);
    border-color: rgba(99,102,241,0.45);
  }
  .about-value-card:hover .about-bar-fill { width: 100% !important; }
  .about-value-card::after {
    content: '';
    position: absolute; top: 0; left: 0; width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    transform: translateX(-100%);
  }
  .about-value-card:hover::after { animation: about-shimmer 0.65s ease forwards; }

  .about-bar-fill {
    height: 2px;
    border-radius: 2px;
    transition: width 0.9s cubic-bezier(0.16,1,0.3,1);
  }

  /* stat card hover */
  .about-stat-card {
    padding: 22px 18px;
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    text-align: center;
    transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .about-stat-card:hover {
    transform: translateY(-5px) scale(1.03);
    background: rgba(255,255,255,0.07);
    border-color: rgba(99,102,241,0.3);
  }
  .about-stat-card::after {
    content: '';
    position: absolute; top: 0; left: 0; width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    transform: translateX(-100%);
  }
  .about-stat-card:hover::after { animation: about-shimmer 0.65s ease forwards; }

  .about-divider {
    width: 40px; height: 2px;
    background: linear-gradient(90deg, #6366f1, transparent);
    border-radius: 2px;
    margin: 10px auto 8px;
  }

  /* heading underline draw */
  .ab-heading-line { display: inline-block; position: relative; }
  .ab-heading-line::after {
    content: '';
    position: absolute; bottom: -6px; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, #6366f1, #a5b4fc);
    border-radius: 2px;
    transition: width 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s;
  }
  .ab-reveal.ab-visible .ab-heading-line::after,
  .ab-heading-line.ab-visible::after { width: 100%; }

  /* bar animates when stat row enters view */
  .ab-bar-animate { width: 0 !important; transition: width 0.9s cubic-bezier(0.16,1,0.3,1); }
  .ab-bar-animate.ab-visible { width: var(--bar-w) !important; }

  /* orbit badge float */
  @keyframes badge-float-1 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)} }
  @keyframes badge-float-2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(6px)}  }
  @keyframes badge-float-3 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-5px)} }
  .badge-1 { animation: badge-float-1 4s ease-in-out infinite; }
  .badge-2 { animation: badge-float-2 5s ease-in-out infinite 0.5s; }
  .badge-3 { animation: badge-float-3 4.5s ease-in-out infinite 1s; }

  /* center card pulse glow */
  @keyframes center-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
    50%      { box-shadow: 0 0 32px 6px rgba(99,102,241,0.2); }
  }
  .orbit-center-card { animation: center-glow 4s ease-in-out infinite; }
`;

function AboutUsSection() {
  const sectionRef = useRef(null);
  const [activeStaffIndex, setActiveStaffIndex] = useState(0);
const staffTrackRef = useRef(null);
const staffItemRefs = useRef([]);


useEffect(() => {
  const track = staffTrackRef.current;
  if (!track) return;

  const onScroll = () => {
    const center = track.scrollLeft + track.clientWidth / 2;

    let closest = 0;
    let min = Infinity;

    staffItemRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < min) {
        min = dist;
        closest = idx;
      }
    });

    setActiveStaffIndex(closest);
  };

  onScroll();
  track.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    track.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}, []);

const scrollStaff = (dir) => {
  const track = staffTrackRef.current;
  if (!track) return;

  track.scrollBy({
    left: dir * Math.max(280, track.clientWidth * 0.82),
    behavior: "smooth",
  });
};

const jumpToStaff = (idx) => {
  staffItemRefs.current[idx]?.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });
};

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll(
      ".ab-reveal, .ab-stagger, .ab-cards-stagger, .ab-bar-animate",
    );
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ab-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

 const values = [
  {
    icon: "fa-solid fa-shield-halved",
    label: "Reliability",
    desc: "You can count on us. Every solution we build is tested, backed, and built to last.",
    bar: "88%",
    barColor: "linear-gradient(90deg,#6366f1,#a5b4fc)",
  },
  {
    icon: "fa-solid fa-graduation-cap",
    label: "Expertise",
    desc: "Years of hands-on experience across tech, education, and digital infrastructure.",
    bar: "78%",
    barColor: "linear-gradient(90deg,#3b82f6,#93c5fd)",
  },
  {
    icon: "fa-solid fa-rocket",
    label: "Forward-thinking",
    desc: "We build for where technology is going, not just where it is today.",
    bar: "94%",
    barColor: "linear-gradient(90deg,#a855f7,#d8b4fe)",
  },
];

  const stats = [
    { val: "8+", label: "Years in business" },
    { val: "500+", label: "Laptops delivered" },
    { val: "1,200+", label: "Students trained" },
  ];

  const badges = [
    {
      cls: "badge-1",
      top: -14,
      left: "50%",
      ml: -38,
      label: (
        <>
          <i className="fa-solid fa-graduation-cap"></i> Academy
        </>
      ),
      bg: "rgba(99,102,241,0.15)",
      border: "rgba(99,102,241,0.3)",
    },
    {
      cls: "badge-2",
      top: "50%",
      mt: -18,
      right: -20,
      label: (
        <>
          <i className="fa-solid fa-laptop"></i> Store
        </>
      ),
      bg: "rgba(59,130,246,0.15)",
      border: "rgba(59,130,246,0.3)",
    },
    {
      cls: "badge-3",
      bottom: -14,
      left: "50%",
      ml: -44,
      label: (
        <>
          <i className="fa-solid fa-users"></i> Co-work
        </>
      ),
      bg: "rgba(168,85,247,0.15)",
      border: "rgba(168,85,247,0.3)",
    },
  ];

  const ceo = {
  name: "Your CEO Name",
  role: "Chief Executive Officer",
  description:
    "Leads the company vision across training, retail, coworking, and customer success. Focused on building an accessible tech ecosystem that solves real problems.",
  focus: ["Vision & strategy", "Partnerships", "Growth"],
  metrics: [
    { k: "Leadership style", v: "Hands-on" },
    { k: "Business model", v: "Ecosystem" },
    { k: "North star", v: "Access" },
  ],
};

const staff = [
  {
    name: "Academy Team Lead",
    role: "Training & mentorship",
    dept: "Training",
    initials: "AL",
    status: "Teaching",
    cover:
      "linear-gradient(135deg, rgba(99,102,241,0.38), rgba(59,130,246,0.16))",
    avatarBg:
      "linear-gradient(135deg, rgba(99,102,241,0.28), rgba(255,255,255,0.08))",
    quote: "Turns complex tech into practical learning experiences.",
    tags: ["Curriculum", "Workshops", "Mentorship"],
  },
  {
    name: "Hardware Sales Lead",
    role: "Devices & accessories",
    dept: "Store",
    initials: "SL",
    status: "Selling",
    cover:
      "linear-gradient(135deg, rgba(59,130,246,0.34), rgba(14,165,233,0.15))",
    avatarBg:
      "linear-gradient(135deg, rgba(59,130,246,0.26), rgba(255,255,255,0.08))",
    quote: "Helps customers choose the right laptop, accessory, or setup.",
    tags: ["Inventory", "Sales", "Consulting"],
  },
  {
    name: "Coworking Manager",
    role: "Space operations",
    dept: "Workspace",
    initials: "WM",
    status: "Managing",
    cover:
      "linear-gradient(135deg, rgba(168,85,247,0.34), rgba(236,72,153,0.14))",
    avatarBg:
      "linear-gradient(135deg, rgba(168,85,247,0.26), rgba(255,255,255,0.08))",
    quote: "Creates a productive, calm, and modern work environment.",
    tags: ["Operations", "Community", "Support"],
  },
  {
    name: "Customer Success Lead",
    role: "Client support",
    dept: "Support",
    initials: "CS",
    status: "Helping",
    cover:
      "linear-gradient(135deg, rgba(34,197,94,0.28), rgba(16,185,129,0.14))",
    avatarBg:
      "linear-gradient(135deg, rgba(34,197,94,0.24), rgba(255,255,255,0.08))",
    quote: "Makes sure every customer gets a fast, friendly response.",
    tags: ["Support", "Retention", "Feedback"],
  },
  {
    name: "Brand & Content Lead",
    role: "Marketing & visuals",
    dept: "Creative",
    initials: "BC",
    status: "Creating",
    cover:
      "linear-gradient(135deg, rgba(249,115,22,0.28), rgba(245,158,11,0.14))",
    avatarBg:
      "linear-gradient(135deg, rgba(249,115,22,0.24), rgba(255,255,255,0.08))",
    quote: "Shapes the company voice across social, design, and campaigns.",
    tags: ["Content", "Design", "Campaigns"],
  },
  {
    name: "Systems Technician",
    role: "IT & infrastructure",
    dept: "Tech",
    initials: "ST",
    status: "Building",
    cover:
      "linear-gradient(135deg, rgba(20,184,166,0.28), rgba(59,130,246,0.14))",
    avatarBg:
      "linear-gradient(135deg, rgba(20,184,166,0.24), rgba(255,255,255,0.08))",
    quote: "Keeps devices, systems, and internal tools running smoothly.",
    tags: ["Systems", "Repairs", "Networks"],
  },
];

  return (
    <>
      <style>{aboutStyles}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "88px 24px",
          backgroundColor: "#01065d",
          fontFamily: "sans-serif",
        }}
      >
        {/* grid bg */}
        <div
          className="bg-grid-pattern"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* aura blobs */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            right: "-8%",
            width: "45vw",
            height: "45vw",
            minWidth: 260,
            minHeight: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-8%",
            width: "35vw",
            height: "35vw",
            minWidth: 200,
            minHeight: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* ── Top: text left / visual right ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 56,
              alignItems: "center",
              marginBottom: 72,
            }}
          >
            {/* Left text column */}
            <div>
              {/* eyebrow */}
              <div
                className="ab-reveal ab-up"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "#a5b4fc",
                  marginBottom: 20,
                }}
              >
                <span
                  className="about-ping"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#818cf8",
                    display: "inline-block",
                  }}
                />
                About Us
              </div>

              {/* headline */}
              <div
                className="ab-reveal ab-up"
                style={{ transitionDelay: "80ms", margin: "0 0 20px" }}
              >
                <h2
                  className="text-gradient ab-heading-line"
                  style={{
                    fontSize: "clamp(26px, 4.5vw, 44px)",
                    fontWeight: 800,
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Built for tech minds.
                  <br />
                  Designed for growth.
                </h2>
              </div>

              {/* body copy */}
              <p
                className="ab-reveal ab-up"
                style={{
                  transitionDelay: "160ms",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.78,
                  fontWeight: 300,
                  maxWidth: 480,
                  margin: "0 0 16px",
                }}
              >
                Tech Portal Solution is a technology services company dedicated
                to empowering businesses and individuals in Nigeria and across
                Africa. We don't just sell products — we build ecosystems where
                people learn, work, and thrive.
              </p>
              <p
                className="ab-reveal ab-up"
                style={{
                  transitionDelay: "200ms",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.50)",
                  lineHeight: 1.78,
                  fontWeight: 300,
                  maxWidth: 480,
                  margin: "0 0 32px",
                }}
              >
                From our training academy to our co-working spaces and laptop
                store, everything we do is connected by one mission: bridge the
                gap between business needs and technological advancement.
              </p>

            
            </div>

            {/* Right orbit graphic */}
            <div
              className="ab-reveal ab-scale"
              style={{
                transitionDelay: "100ms",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 320,
              }}
            >
              <div style={{ position: "relative", width: 280, height: 280 }}>
                {/* spinning rings */}
                <svg
                  className="about-ring"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  viewBox="0 0 280 280"
                  fill="none"
                >
                  <circle
                    cx="140"
                    cy="140"
                    r="130"
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r="105"
                    stroke="rgba(99,102,241,0.12)"
                    strokeWidth="1"
                    strokeDasharray="3 9"
                  />
                </svg>

                {/* center glass card */}
                <div
                  className="glass-card orbit-center-card"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 168,
                    padding: "22px 20px",
                    borderRadius: 18,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}><i className="fa-solid fa-building"></i></div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    Tech Portal Solutions
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "monospace",
                    }}
                  >
                    Akwa Ibom, Nigeria
                  </div>
                </div>

                {/* orbiting badges */}
                {badges.map((b, i) => (
                  <div
                    key={i}
                    className={b.cls}
                    style={{
                      position: "absolute",
                      top: b.top,
                      bottom: b.bottom,
                      left: b.left,
                      right: b.right,
                      marginLeft: b.ml,
                      marginTop: b.mt,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: b.bg,
                      border: `1px solid ${b.border}`,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div
            className="ab-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 14,
              marginBottom: 64,
            }}
          >
            {stats.map((s, i) => (
              <div key={i} className="about-stat-card">
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                </div>
                <div className="about-divider" />
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 300,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Core values label ── */}
          <div
            className="ab-reveal ab-up"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 18,
            }}
          >
            Our core values
          </div>

          {/* ── Value cards ── */}
          <div
            className="ab-cards-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {values.map((v, i) => (
              <div key={i} className="about-value-card">
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 19,
                    marginBottom: 14,
                  }}
                >
                  <i className={v.icon}></i>
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  {v.label}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.65,
                    fontWeight: 300,
                    margin: "0 0 18px",
                  }}
                >
                  {v.desc}
                </p>
                <div
                  style={{
                    height: 2,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="about-bar-fill"
                    style={{ width: v.bar, background: v.barColor }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Leadership / CEO ── */}
<div
  className="ab-reveal ab-up !mt-8"
  style={{
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    margin: " auto",
  }}
>
  Leadership & team
</div>

<div className="ab-ceo-grid">
  <div
    className="ab-ceo-card ab-reveal ab-up"
    style={{ transitionDelay: "80ms" }}
  >
    <div className="ab-ceo-layout">
      <div className="ab-ceo-portrait">
        <div className="ab-ceo-label">CEO / Founder</div>
        <div className="ab-ceo-initials">CEO</div>
      </div>

      <div>
        <div className="ab-role-badge" style={{ marginBottom: 12 }}>
          <i className="fa-solid fa-user-tie"></i> {ceo.role}
        </div>

        <h3
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(22px, 3vw, 30px)",
            color: "#fff",
            lineHeight: 1.15,
          }}
        >
          {ceo.name}
        </h3>

        <p
          style={{
            margin: "0 0 10px",
            fontSize: 14,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {ceo.description}
        </p>

        <div className="ab-chip-row">
          {ceo.focus.map((item, idx) => (
            <span key={idx} className="ab-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="ab-metric-grid">
          {ceo.metrics.map((m, idx) => (
            <div key={idx} className="ab-metric">
              <div className="ab-metric-k">{m.k}</div>
              <div className="ab-metric-v">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  <div
    className="ab-ceo-card ab-reveal ab-up"
    style={{ transitionDelay: "150ms" }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        marginBottom: 12,
      }}
    >
      Leadership notes
    </div>

    <div style={{ display: "grid", gap: 12 }}>
      {[
        {
          title: "Customer-first execution",
          text: "We build services around real business outcomes.",
        },
        {
          title: "Practical learning",
          text: "The academy, store, and workspace all support the same ecosystem.",
        },
        {
          title: "Local growth",
          text: "Designed for Nigeria and built to scale across Africa.",
        },
      ].map((item, idx) => (
        <div
          key={idx}
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {item.text}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* ── Staff carousel / gallery ── */}
<div
  className="ab-carousel-header ab-reveal ab-up"
  style={{ transitionDelay: "90ms" }}
>
  <div>
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        marginBottom: 8,
      }}
    >
      Staff carousel
    </div>

    <h3
      style={{
        margin: 0,
        fontSize: "clamp(20px, 3vw, 30px)",
        color: "#fff",
      }}
    >
      Meet the team
    </h3>

    <p
      style={{
        margin: "8px 0 0",
        fontSize: 14,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.58)",
        maxWidth: 620,
      }}
    >
      Swipe through the staff cards or use the arrows. This layout reads like a
      carousel on mobile and like a gallery on larger screens.
    </p>
  </div>

  <div className="ab-carousel-controls">
    <button
      type="button"
      className="ab-carousel-btn"
      onClick={() => scrollStaff(-1)}
      aria-label="Previous staff"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
    <button
      type="button"
      className="ab-carousel-btn"
      onClick={() => scrollStaff(1)}
      aria-label="Next staff"
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</div>

<div className="ab-carousel-shell">
  <div ref={staffTrackRef} className="ab-carousel-track">
    {staff.map((m, idx) => (
      <article
        key={idx}
        ref={(el) => (staffItemRefs.current[idx] = el)}
        className="ab-carousel-card ab-reveal ab-up"
        style={{ transitionDelay: `${70 + idx * 90}ms` }}
      >
        <div className="ab-card-top" style={{ background: m.cover }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <div className="ab-avatar" style={{ background: m.avatarBg }}>
              <strong>{m.initials}</strong>
              <small>{m.dept}</small>
            </div>

            <span className="ab-role-badge">
              <i className="fa-solid fa-briefcase"></i> {m.status}
            </span>
          </div>

          <div
            style={{
              marginTop: "auto",
              fontSize: 12,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Department profile
          </div>
        </div>

        <div className="ab-card-body">
          <h4 className="ab-card-name">{m.name}</h4>
          <p className="ab-card-role">{m.role}</p>
          <p className="ab-card-quote">{m.quote}</p>

          <div className="ab-tag-row">
            {m.tags.map((tag, i) => (
              <span key={i} className="ab-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    ))}
  </div>

  <div className="ab-dot-row">
    {staff.map((_, idx) => (
      <button
        key={idx}
        type="button"
        className={`ab-dot ${activeStaffIndex === idx ? "ab-active" : ""}`}
        onClick={() => jumpToStaff(idx)}
        aria-label={`Go to staff card ${idx + 1}`}
      />
    ))}
  </div>
</div>
        </div>
      </section>
    </>
  );
}

export default AboutUsSection;
