import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_white.png";
import FloatingWhatsapp from '../../components/WhatsappButton';


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
  @keyframes spin {
    to { transform:rotate(360deg); }
  }
`;

// ─── Styles ───────────────────────────────────────────────────────────────────

const STYLES = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    50% { transform: translateY(-20px) rotate(3deg) scale(1.02); }
  }
  @keyframes float-fast {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(-3deg); }
  }
  @keyframes grid-move {
    0% { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }
  @keyframes text-reveal {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes blink-cursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes shimmer-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }
  @keyframes menuSlideIn {
    0% { clip-path: circle(0% at 100% 0%); }
    100% { clip-path: circle(150% at 100% 0%); }
  }
  @keyframes menuSlideOut {
    0% { clip-path: circle(150% at 100% 0%); }
    100% { clip-path: circle(0% at 100% 0%); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(6deg); }
    50% { transform: translateY(-20px) rotate(6deg); }
  }

  .animate-float-1 { animation: float-slow 7s ease-in-out infinite; }
  .animate-float-2 { animation: float-fast 5s ease-in-out infinite 1s; }
  .animate-float-3 { animation: float-slow 9s ease-in-out infinite 2s; }
  .animate-spin-slow { animation: spin-slow 25s linear infinite; }
  .animate-spin-reverse { animation: spin-slow 35s linear infinite reverse; }
  .blink-cursor { animation: blink-cursor 0.75s step-end infinite; }

  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    animation: grid-move 20s linear infinite;
  }
  .text-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #6366f1 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: text-reveal 6s linear infinite;
  }
  .glass-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.12);
  }

  .menu-slide-in { animation: menuSlideIn 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .menu-slide-out { animation: menuSlideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .stagger-link {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .menu-links-visible .stagger-link {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal { opacity: 0; }
  .reveal.is-visible { opacity: 1; }
  .rv-fade-up   { transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .rv-fade-left  { transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .rv-fade-right { transform: translateX(40px);  transition: opacity 0.7s ease, transform 0.7s ease; }
  .rv-scale      { transform: scale(0.9);         transition: opacity 0.6s ease, transform 0.6s ease; }
  .rv-fade       {                                 transition: opacity 0.8s ease; }
  .reveal.is-visible.rv-fade-up,
  .reveal.is-visible.rv-fade-left,
  .reveal.is-visible.rv-fade-right { transform: none; }
  .reveal.is-visible.rv-scale      { transform: scale(1); }

  .stagger-children > * { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .stagger-children.is-visible > *:nth-child(1) { opacity:1; transform:none; transition-delay:0ms;   }
  .stagger-children.is-visible > *:nth-child(2) { opacity:1; transform:none; transition-delay:120ms; }
  .stagger-children.is-visible > *:nth-child(3) { opacity:1; transform:none; transition-delay:240ms; }
  .stagger-children.is-visible > *:nth-child(4) { opacity:1; transform:none; transition-delay:360ms; }

  .shimmer-wrap { position:relative; overflow:hidden; }
  .shimmer-wrap::after {
    content:'';
    position:absolute; top:0; left:0; width:40%; height:100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    transform: translateX(-100%);
  }
  .shimmer-wrap:hover::after { animation: shimmer-line 0.7s ease forwards; }

  .heading-line { display:inline-block; position:relative; }
  .heading-line::after {
    content:'';
    position:absolute;
    bottom:-6px; left:0;
    height:2px; width:0;
    background: linear-gradient(90deg,#6366f1,#a5b4fc);
    border-radius:2px;
    transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .heading-line.is-visible::after { width:100%; }

  .navbar-sticky {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    transition: all 0.3s ease;
  }
  .navbar-top {
    background: rgba(1, 6, 93, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .navbar-scrolled {
    background: rgba(1, 6, 93, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
  }
  body { padding-top: 80px; }
`;

// ─── Floating background ──────────────────────────────────────────────────────

const BLOBS = [
  { top: "4%",  left: "1%",  size: 300, dur: "20s", delay: "0s",   op: 0.04  },
  { top: "55%", left: "87%", size: 260, dur: "25s", delay: "-8s",  op: 0.035 },
  { top: "80%", left: "3%",  size: 200, dur: "18s", delay: "-4s",  op: 0.03  },
  { top: "30%", left: "76%", size: 140, dur: "28s", delay: "-13s", op: 0.045 },
];

const BG_ICONS = [
  { d: "M3 8h18M3 8l2-4h14l2 4M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M9 12h6",                                                                                                                           top: "10%", left: "88%", size: 44, dur: "18s", delay: "-2s"  },
  { d: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1",                                                                                                                              top: "48%", left: "3%",  size: 40, dur: "22s", delay: "-9s"  },
  { d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", top: "75%", left: "91%", size: 42, dur: "20s", delay: "-5s"  },
  { d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",                                                                       top: "88%", left: "20%", size: 38, dur: "24s", delay: "-12s" },
];

function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(1,6,93,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(1,6,93,0.028) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }} />
      {BLOBS.map((b, i) => (
        <div key={i} style={{
          position: "absolute", top: b.top, left: b.left,
          width: b.size, height: b.size, borderRadius: "50%",
          background: "#01065d", opacity: b.op, filter: "blur(64px)",
          animation: `floatBlob ${b.dur} ease-in-out infinite`,
          animationDelay: b.delay,
        }} />
      ))}
      {BG_ICONS.map((ic, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke="#01065d"
          strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
          style={{
            position: "absolute", top: ic.top, left: ic.left,
            width: ic.size, height: ic.size, opacity: 0.065,
            animation: `floatIcon ${ic.dur} ease-in-out infinite`,
            animationDelay: ic.delay,
          }}>
          <path d={ic.d} />
        </svg>
      ))}
    </div>
  );
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
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
        textDecoration: "none",
      }}
    >
      <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(1,6,93,0.06)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#01065d" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
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
  width: "100%", padding: "10px 14px",
  borderRadius: 10, border: "1.5px solid rgba(1,6,93,0.15)",
  background: "rgba(255,255,255,0.7)", color: "#01065d",
  fontSize: 15, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  backdropFilter: "blur(6px)",
};

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = ["Laptop Purchase", "Co-Working Space", "Training Academy", "General Enquiry", "Technical Support", "Partnership"];

const mobileLinks = [
  { label: "Home",       hash: "/",          sub: "Back to homepage" },
  { label: "Our Services", hash: "/#services", sub: "Explore dynamic ecosystems" },
  { label: "Courses",    hash: "/courses",   sub: "Scale yourself with the right courses" },
  { label: "WorkSpace",  hash: "/workspace", sub: "Work with ease" },
  { label: "About Us",   hash: "/about",     sub: "Our story and mission" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  const navigate = useNavigate();

  // ── Nav state ──
  const [scrolled,        setScrolled]        = useState(false);
  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [menuAnimation,   setMenuAnimation]   = useState("");

  // ── Form state ──
  const [form,         setForm]         = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors,       setErrors]       = useState({});
  const [status,       setStatus]       = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  // ── Sticky nav ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // ── Global scroll-reveal observer ──
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Stagger children observer ──
  useEffect(() => {
    const els = document.querySelectorAll(".stagger-children");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Toggle mobile menu ──
  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      setMenuAnimation("menu-slide-out");
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuAnimating(false);
        setMenuAnimation("");
      }, 500);
    } else {
      setIsMenuOpen(true);
      setIsMenuAnimating(true);
      setMenuAnimation("menu-slide-in");
      setTimeout(() => setMenuAnimation(prev => prev + " menu-links-visible"), 100);
    }
  }, [isMenuOpen]);

  // ── Mobile nav — handles /#hash, #hash, and /routes ──
  const handleMobileNav = useCallback((e, hash) => {
    e.preventDefault();
    setIsMenuAnimating(false);
    setMenuAnimation("menu-slide-out");

    setTimeout(() => {
      setIsMenuOpen(false);
      setMenuAnimation("");
      document.body.style.overflow = "";

      // Cross-page hash e.g. /#services
      if (hash.startsWith("/#")) {
        const id = hash.replace("/#", "");
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return;
      }

      // Same-page hash e.g. #about
      if (hash.startsWith("#")) {
        const target = document.querySelector(hash);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
        return;
      }

      // Regular route e.g. /courses
      navigate(hash);
    }, 500);
  }, [isMenuOpen, navigate]);

  // ── Desktop nav — handles /#hash links ──
  const handleDesktopNav = useCallback((e, hash) => {
    e.preventDefault();
    if (hash.startsWith("/#")) {
      const id = hash.replace("/#", "");
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [navigate]);

  // ── Form handlers ──
  const validate = () => {
    const e = {};
    if (!form.name.trim())                      e.name    = "Your name is required.";
    if (!form.email.trim())                     e.email   = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = "Enter a valid email address.";
    if (!form.service)                          e.service = "Please select a service.";
    if (!form.message.trim())                   e.message = "Write a short message so we know how to help.";
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error === false) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
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

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen bg-white text-[#01065d]">
      <style>{KEYFRAMES}</style>
      <style>{STYLES}</style>

      {/* ── Navbar ── */}
      <nav className={`navbar-sticky ${scrolled ? "navbar-scrolled" : "navbar-top"}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group z-50">
            <img src={logo} width={170} alt="Tech Portal Solutions Official Logo" />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
            <a href="/" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
              Home
            </a>
            <a
              href="/#services"
              onClick={(e) => handleDesktopNav(e, "/#services")}
              className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
            >
              Services
            </a>
            <a href="/courses" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
              Courses
            </a>
            <a href="/workspace" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
              WorkSpace
            </a>
            <a href="/maintenance" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
              Computer Maintenance
            </a>
            <a href="#about" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
              About Us
            </a>
            <a href="/store" className="px-4 py-2 bg-white/10 hover:bg-white hover:text-[#01065d] rounded-lg text-white border border-white/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
              Laptop Shop →
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 relative w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-white/5 shadow-2xl hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5 w-5">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "transform rotate-45 translate-y-2 w-5" : "w-5"}`} />
              <span className={`block h-0.5 bg-indigo-300 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-4 ml-2"}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "transform -rotate-45 -translate-y-2 w-5" : "w-5 ml-auto"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {(isMenuOpen || isMenuAnimating) && (
        <div className={`fixed inset-0 z-40 md:hidden bg-[#01043a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 ${menuAnimation}`}>
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/0 blur-2xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[-20%] w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          <div className="flex justify-between items-center mt-20 border-b border-white/10 pb-6 stagger-link" style={{ transitionDelay: "100ms" }}>
            <p className="text-xs text-white/50">Delivering Innovative Technology Driven Solutions</p>
          </div>

          <div className="flex flex-col space-y-5 my-auto text-left pl-2">
            {mobileLinks.map((link, i) => (
              <a
                key={i}
                href={link.hash}
                onClick={(e) => handleMobileNav(e, link.hash)}
                className="group block stagger-link"
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-mono text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">0{i + 1}.</span>
                  <span className="text-3xl font-bold tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 inline-block">{link.label}</span>
                </div>
                <span className="block text-xs text-white/40 font-light pl-8 group-hover:text-indigo-200 transition-colors">{link.sub}</span>
              </a>
            ))}

            <div className="pt-4 stagger-link" style={{ transitionDelay: "700ms" }}>
              <a
                href="/store"
                onClick={(e) => handleMobileNav(e, "/store")}
                className="glass-card flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-white/5 border border-white/15 shadow-2xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <span className="text-[9px] font-mono tracking-wider text-indigo-300 block uppercase mb-0.5">Buy affordable devices</span>
                  <span className="text-base font-bold text-white">Enter Laptop Store →</span>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 flex items-center space-x-4 text-left stagger-link" style={{ transitionDelay: "800ms" }}>
            <div><p className="text-xs font-bold text-white">Portal Systems Syncing</p></div>
          </div>
        </div>
      )}

      {/* ── Floating background ── */}
      <FloatingBackground />

      {/* ── Page content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">

        {/* Page header */}
        <div className="mb-16" style={{ animation: "fadeSlideUp 0.55s ease both" }}>
          <span
            className="inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#3949ab", background: "rgba(57,73,171,0.1)" }}
          >
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            We're right here<br />
            <span style={{ color: "#3949ab" }}>in Akwa Ibom.</span>
          </h1>
          <div style={{
            marginTop: 12, height: 3, width: 56, borderRadius: 99, background: "#01065d",
            transformOrigin: "left", animation: "drawLine 0.55s ease 0.3s both",
          }} />
          <p className="mt-5 text-base md:text-lg text-[#01065d]/55 max-w-xl leading-relaxed">
            Whether you're shopping for a laptop, booking a desk, or enrolling in a course — drop us a message and we'll respond within one business day.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20">

          {/* Left — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard delay="0.1s"
              label="Visit us"
              value="59 Ikot Ekpene Rd., Uyo. ... Tech Portal Solutions, Akwa Ibom, Nigeria"
              href="https://maps.app.goo.gl/5tiX3mWb72Avq4sU9"
              icon={<><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>}
            />
            <InfoCard delay="0.2s"
              label="Email us"
              value="hello@techportalsolution.com"
              href="mailto:hello@techportalsolution.com"
              icon={<><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></>}
            />
            <InfoCard delay="0.3s"
              label="WhatsApp / Call"
              value="(+234) 915 968 5595"
              href="https://wa.me/09159685595"
              icon={<><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></>}
            />
            <InfoCard delay="0.4s"
              label="Business hours"
              value="Mon – Sat, 8 AM – 6 PM WAT"
              icon={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>}
            />

            {/* Map placeholder */}
            <div
              className="mt-2 rounded-2xl overflow-hidden border border-[#01065d]/10 flex items-center justify-center"
              style={{ height: 180, background: "rgba(1,6,93,0.04)" }}
            >
              <div className="text-center text-[#01065d]/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40, margin: "0 auto 8px" }}>
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4064764.7501678783!2d3.100090401805285!3d5.785266815355056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6005729e5a8c8c31%3A0x454ccfe657dc1c54!2sTech%20Portal%20Solutions!5e0!3m2!1sen!2sng!4v1781956273914!5m2!1sen!2sng" width="600" height="450" 
                                style={{border:"0" }}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3" style={{ animation: "slideInRight 0.55s ease 0.15s both" }}>
            {status === "success" ? (
              <div
                className="flex flex-col items-center justify-center py-20 px-8 rounded-3xl border border-[#01065d]/10 bg-white/70 backdrop-blur-sm text-center"
                style={{ animation: "fadeSlideUp 0.5s ease both" }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", background: "rgba(1,6,93,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  animation: "checkPop 0.5s ease both",
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#01065d" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#01065d] mb-2">Message sent!</h2>
                <p className="text-[#01065d]/55 max-w-sm">
                  We've received your message and will get back to you within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2.5 rounded-full text-sm font-medium border border-[#01065d]/20 text-[#01065d] hover:bg-[#e8eaf6] transition-colors"
                >
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
                      onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                      style={focused("name")}
                    />
                  </Field>

                  <Field label="Email address *" error={errors.email}>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                      style={focused("email")}
                    />
                  </Field>

                  <Field label="Phone number" error={errors.phone}>
                    <input
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                      style={focused("phone")}
                    />
                  </Field>

                  <Field label="Service *" error={errors.service}>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      onFocus={() => setFocusedField("service")} onBlur={() => setFocusedField(null)}
                      style={{ ...focused("service"), appearance: "none", cursor: "pointer" }}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => (
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
                        onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                        style={{ ...focused("message"), resize: "vertical", minHeight: 120 }}
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
                  style={{ background: "#01065d" }}
                >
                  {status === "sending" ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span style={{
                        width: 16, height: 16,
                        border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                        borderRadius: "50%", display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }} />
                      Sending…
                    </span>
                  ) : "Send message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      
            <FloatingWhatsapp />
      
            {/* ── Footer ── */}
            <footer className="border-t border-white/5 bg-[#000236]">
              <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
                <p>© 2025 Tech Portal Solutions. </p>
                <div className="flex space-x-6">
                  <a href="/" className="hover:text-white transition-colors duration-300">Home</a>
                  <a href="/courses" className="text-indigo-300 hover:text-white transition-colors duration-300">Courses</a>
                  <a href="/workspace" className="hover:text-white transition-colors duration-300">Workspace</a>
                  <a href="/maintenance" className="hover:text-white transition-colors duration-300">Computer Maintenance</a>
                  <a href="/store" className="text-purple-300 hover:text-white transition-colors duration-300">Shop</a>
                </div>
                <p>Built with ❤️ by <a className="text-indigo-300 hover:text-white transition-colors duration-300" target="_blank" rel="noopener noreferrer" href="https://pluscodeltd.vercel.app">PlusCode Ltd</a></p>
              </div>
            </footer>
    </div>
  );
}