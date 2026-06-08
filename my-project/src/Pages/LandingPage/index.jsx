import React, { useState, useEffect, useRef, useCallback } from 'react';
import logo from '../../assets/logo_white.png';
import About from '../About';
import FloatingWhatsapp from '../../components/WhatsappButton';

// ─── Reusable scroll-reveal hook ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const styles = `
  /* ── Keyframes ── */
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
  @keyframes bar-grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
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

  /* ── Utilities ── */
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

  /* ── Mobile Menu ── */
  .menu-slide-in {
    animation: menuSlideIn 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .menu-slide-out {
    animation: menuSlideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .stagger-link {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .menu-links-visible .stagger-link {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Scroll reveal base ── */
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

  .service-tab { opacity:0; transform: translateX(-24px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .service-tab.is-visible { opacity:1; transform:none; }

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

  .video-reveal { opacity:0; transform: scale(0.92) translateY(30px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1); }
  .video-reveal.is-visible { opacity:1; transform:none; }

  .testi-card { opacity:0; transform: translateY(40px) rotate(-1deg); transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.34,1.56,0.64,1); }
  .testi-card.is-visible { opacity:1; transform:none; }

  .banner-reveal { opacity:0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .banner-reveal.is-visible { opacity:1; transform:none; }

  /* ── Sticky Navbar ── */
  .navbar-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    transition: all 0.3s ease;
  }
  
 
  
  .navbar-scrolled {
    background: rgba(1, 6, 93, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }
  
  .navbar-top {
  background: rgba(1, 6, 93, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

  /* Add padding to body to account for fixed navbar */
  body {
    padding-top: 80px;
  }
`;

const TYPED_TEXT = "Learn tech, share space, and get the best tools.";
const TYPE_SPEED = 45;
const WHATSAPP_NUMBER = "234XXXXXXXXXX";

export default function TechPortalLanding() {
  const [activeService, setActiveService] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState('');
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── Typewriter ──
  useEffect(() => {
    let i = 0;
    setDisplayed(''); setDone(false);
    const t = setInterval(() => {
      i++;
      setDisplayed(TYPED_TEXT.slice(0, i));
      if (i >= TYPED_TEXT.length) { clearInterval(t); setDone(true); }
    }, TYPE_SPEED);
    return () => clearInterval(t);
  }, []);

  // ── Sticky nav shadow on scroll ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // ── Global scroll-reveal observer ──
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Stagger children observer ──
  useEffect(() => {
    const els = document.querySelectorAll('.stagger-children');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── Toggle mobile menu with animation ──
  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      // Close menu with animation
      setMenuAnimation('menu-slide-out');
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuAnimating(false);
        setMenuAnimation('');
      }, 500);
    } else {
      // Open menu
      setIsMenuOpen(true);
      setIsMenuAnimating(true);
      setMenuAnimation('menu-slide-in');
      // Add stagger class after animation starts
      setTimeout(() => {
        setMenuAnimation(prev => prev + ' menu-links-visible');
      }, 100);
    }
  }, [isMenuOpen]);

  // ── Close menu and navigate ──
  const handleMobileNav = useCallback((e, hash) => {
    e.preventDefault();
    
    // Start closing animation
    setIsMenuAnimating(false);
    setMenuAnimation('menu-slide-out');
    
    // After animation completes, navigate
    setTimeout(() => {
      setIsMenuOpen(false);
      setMenuAnimation('');
      document.body.style.overflow = '';
      
      // Scroll to section
      const target = document.querySelector(hash);
      if (target) {
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }, 500);
  }, []);

  const services = [
    {
      title: "Digital Education & Automation",
      description:
        "Master AI automation, faceless YouTube systems, web & app development, and digital marketing, Cyber Security through real-world projects and guided mentorship.",
      tag: "Learn & Automate",
      metric: "1,200+ Students",
      icon: "fa-solid fa-brain",
      cta: "Start Learning",
      ctaType: "whatsapp",
      ctaText:
        "Hi, I'm interested in your Digital Education programs (AI, Web Dev, Marketing, YouTube Automation). I'd like more details.",
    },
    {
      title: "Innovation Co-Working Spaces",
      description:
        "A modern workspace built for developers, freelancers, and startups with high-speed internet, quiet zones, and collaboration areas.",
      tag: "Work & Build",
      metric: "24/7 Access",
      icon: "fa-solid fa-building",
      cta: "Enquire Now",
      ctaType: "whatsapp",
      ctaText:
        "Hi, I want to enquire about your Co-Working Space (pricing, availability, and facilities).",
    },
    {
      title: "Tech Hardware Hub",
      description:
        "Performance-tested laptops and tech gear optimized for developers and creators, backed with warranty and support.",
      tag: "Build & Buy",
      metric: "Warranty Included",
      icon: "fa-solid fa-laptop",
      cta: "Open Store",
      ctaType: "link",
      link: "/store",
    },
  ];

  const testimonials = [
    { name: "Sarah Joshua", role: "Software Engineer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", text: "Tech Portal changed my life. I learned coding here, bought my first developer laptop from their store, and now I work from their co-working space!" },
    { name: "David Okafor", role: "Fullstack Student", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", text: "The internet is blazing fast and the mentors genuinely care. It is the perfect place if you want to get serious about learning technology." },
    { name: "Blessing Umar", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", text: "I love the community here. The blend of learning space, networking events, and access to good laptops is something you can't find anywhere else." }
  ];

  const mobileLinks = [
    { label: 'Our Services', hash: '#services', sub: 'Explore dynamic ecosystems' },
    { label: 'Student Tour', hash: '#video', sub: 'Take a virtual look inside' },
    { label: 'Testimonials', hash: '#testimonials', sub: 'What our developers say' },
    { label: 'About Us', hash: '#about', sub: 'Our story and mission' },
  ];

  return (
    <>
     <div className="min-h-screen font-sans antialiased text-white relative" style={{ backgroundColor: '#01065d' }}>
      <style>{styles}</style>

      {/* ══════════════════════════════════════════════════════════════
          ── STICKY NAVBAR (using fixed positioning) ──
         ══════════════════════════════════════════════════════════════ */}
      <nav className={`navbar-sticky ${scrolled ? 'navbar-scrolled' : 'navbar-top'} navbar-blur`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group z-50">
            <img src={logo} width={170} alt="Tech Portal Solutions Official Logo" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
            <a 
              href="#services" 
              className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
            >
              Our Services
            </a>
            <a 
              href="#video" 
              className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
            >
              Student Tour
            </a>
            <a 
              href="#testimonials" 
              className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
            >
              Testimonials
            </a>
            <a 
              href="#about" 
              className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
            >
              About Us
            </a>
            <a 
              href="/store" 
              className="px-4 py-2 bg-white/10 hover:bg-white hover:text-[#01065d] rounded-lg text-white border border-white/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
            >
              Laptop Shop →
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 relative w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5 w-5">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2 w-5' : 'w-5'}`} />
              <span className={`block h-0.5 bg-indigo-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4 ml-auto'}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2 w-5' : 'w-3 ml-auto'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu (Overlay) ── */}
      {(isMenuOpen || isMenuAnimating) && (
        <div 
          className={`fixed inset-0 z-40 md:hidden bg-[#01043a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 ${menuAnimation}`}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/0 blur-2xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[-20%] w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Top tagline */}
          <div className="flex justify-between items-center mt-20 border-b border-white/10 pb-6 stagger-link" style={{ transitionDelay: '100ms' }}>
            <p className="text-xs text-white/50">Delivering Innovative Technology Driven Solutions</p>
          </div>

          {/* Nav Links - each link uses its specific hash */}
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
            <div className="pt-4 stagger-link" style={{ transitionDelay: '600ms' }}>
              <a
                href="/store"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav(e, '/store');
                }}
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

          {/* Footer inside menu */}
          <div className="glass-card rounded-2xl p-4 flex items-center space-x-4 text-left stagger-link" style={{ transitionDelay: '700ms' }}>
            <div>
              <p className="text-xs font-bold">Portal Systems Syncing</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Hero Section ── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-medium text-indigo-200 animate-pulse shadow-inner">
            <span><span className="fa-solid fa-star"></span> Welcome to Your Tech Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-gradient">
            {displayed}
            {!done && (
              <span
                className="blink-cursor"
                style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#a5b4fc', borderRadius: 2, marginLeft: 4, verticalAlign: 'middle' }}
              />
            )}
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl font-light leading-relaxed">
            Tech Portal is a simple all-in-one place for tech minds. We teach software skills, offer beautiful shared workspaces, and sell high-performance laptops.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="/store" className="px-8 h-14 bg-white text-[#01065d] rounded-xl font-bold flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300">Buy Laptops</a>
            <a href="#services" className="px-8 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">Explore Services</a>
          </div>
        </div>
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px]">
          <div className="glass-card w-72 h-72 rounded-3xl shadow-[30px_30px_60px_rgba(0,0,0,0.5)] transform rotate-6 animate-float-1 p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-center shadow-inner text-xl fa-solid fa-rocket"></div>
            <div>
              <p className="text-xs uppercase font-mono text-indigo-300 tracking-widest">Active Hub</p>
              <h3 className="text-xl font-bold mt-1 text-white">Growth Portal Online</h3>
            </div>
          </div>
          <div className="absolute top-4 right-4 glass-card w-28 h-28 rounded-2xl shadow-2xl transform -rotate-12 animate-float-2 p-3 flex flex-col justify-between hover:rotate-0 transition-transform duration-300">
            <span className="text-xl fa-solid fa-laptop"></span>
            <span className="text-[10px] font-mono text-white/60">Shop Synced</span>
          </div>
          <div className="absolute -bottom-6 left-8 glass-card px-4 py-3 rounded-xl shadow-lg transform rotate-12 animate-float-3 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
            <span className="text-xs font-semibold">100+ Students</span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-8 glass-card rounded-2xl shadow-2xl text-center shimmer-wrap">
          {[
            { val: "98%",  desc: "Student Success Rate" },
            { val: "500+", desc: "Laptops Delivered" },
            { val: "4.9/5",desc: "Workspace Rating" },
            { val: "24/7", desc: "Electricity & Internet" },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <h3 className="text-3xl font-extrabold text-white group-hover:scale-110 group-hover:text-indigo-300 transition-all duration-300 inline-block">{stat.val}</h3>
              <p className="text-xs text-white/60 mt-1 font-light">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="reveal rv-fade-up text-3xl font-bold tracking-tight text-white heading-line">What We Offer</h2>
          <p className="reveal rv-fade-up text-sm text-white/60 font-light" style={{ transitionDelay: '120ms' }}>Click below to see how our different systems serve you under one roof.</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {services.map((item, index) => (
              <div key={index} className="reveal service-tab" style={{ transitionDelay: `${index * 130}ms` }}>
                <button
                  onClick={() => setActiveService(index)}
                  className={`w-full p-5 rounded-xl border text-left transition-all duration-500 focus:outline-none shimmer-wrap ${
                    activeService === index
                      ? 'bg-white text-[#01065d] border-white shadow-[0_20px_40px_rgba(255,255,255,0.1)] scale-[1.03]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100 hover:translate-x-1'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${activeService === index ? 'bg-[#01065d]/10 text-[#01065d]' : 'bg-white/10 text-indigo-300'}`}>{item.tag}</span>
                    <span className="text-xs opacity-60">{item.metric}</span>
                  </div>
                  <h3 className="text-lg font-bold mt-2">{item.title}</h3>
                </button>
              </div>
            ))}
          </div>
          <div className="lg:col-span-7 reveal rv-fade-right">
            <div className="glass-card p-1 rounded-2xl shadow-[20px_20px_40px_rgba(0,0,0,0.4)] flex relative group h-full">
              <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="bg-[#01065d]/90 rounded-[15px] p-8 w-full flex flex-col justify-between min-h-[280px] z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className={`${services[activeService].icon} text-indigo-300 text-lg`} />
                    <h3 className="text-2xl font-bold text-gradient">{services[activeService].title}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed font-light">{services[activeService].description}</p>
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden', marginTop: 12 }}>
                    <div
                      key={activeService}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg,#6366f1,#a5b4fc)',
                        borderRadius: 2,
                        animation: 'bar-grow 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
                        transformOrigin: 'left',
                      }}
                    />
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  {services[activeService].ctaType === "whatsapp" ? (
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(services[activeService].ctaText)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-white text-[#01065d] font-bold text-xs rounded-lg hover:bg-indigo-100 shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      {services[activeService].cta} →
                    </a>
                  ) : services[activeService].ctaType === "link" ? (
                    <a href={services[activeService].link} className="px-5 py-2.5 bg-white text-[#01065d] font-bold text-xs rounded-lg hover:bg-indigo-100 shadow-md hover:scale-105 active:scale-95 transition-all">
                      {services[activeService].cta} →
                    </a>
                  ) : (
                    <span className="text-xs text-white/40 font-mono">Portal Service Activated ✓</span>
                  )}
                  <span className="text-xs opacity-30 font-mono">0{activeService + 1} / {services.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section id="video" className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-8 space-y-2">
          <h2 className="reveal rv-fade-up text-2xl md:text-3xl font-bold heading-line">See Life At Tech Portal</h2>
          <p className="reveal rv-fade-up text-xs md:text-sm text-white/60" style={{ transitionDelay: '120ms' }}>Take a short 1-minute visual tour of our hub and meeting spaces.</p>
        </div>
        <div className="reveal video-reveal relative rounded-2xl overflow-hidden glass-card p-2 aspect-video shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
          {!isPlayingVideo ? (
            <div
              className="w-full h-full bg-cover bg-center rounded-xl relative flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.01]"
              style={{ backgroundImage: `url('../../assets/image.jpeg')` }}
            >
              <div className="absolute inset-0 bg-[#01065d]/60 group-hover:bg-[#01065d]/40 transition-colors duration-300" />
              <button
                onClick={() => setIsPlayingVideo(true)}
                className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white text-[#01065d] fa-solid fa-play rounded-full flex items-center justify-center text-xl font-bold shadow-2xl hover:scale-110 active:scale-90 transition-transform duration-300 animate-bounce"
                style={{ animationDuration: '3s' }}
              ></button>
              <span className="absolute bottom-4 left-4 z-10 text-[11px] font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10"><span className="fa-solid fa-clock"></span> 1:14 Min Tour</span>
            </div>
          ) : (
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-sm font-mono text-white/80 fa-solid fa-video"> [ Video element plays here seamlessly ]</p>
                <button onClick={() => setIsPlayingVideo(false)} className="mt-4 text-xs underline text-indigo-300 hover:text-white transition-colors focus:outline-none">Close player</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="reveal rv-fade-up text-3xl font-bold tracking-tight heading-line">Loved by Students & Engineers</h2>
          <p className="reveal rv-fade-up text-sm text-white/60" style={{ transitionDelay: '120ms' }}>Read true stories from real people growing inside our hub.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="reveal testi-card glass-card rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-[1.04] hover:-translate-y-1 transition-all duration-500 text-left relative overflow-hidden group shimmer-wrap"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 group-hover:scale-150 transition-all duration-700" />
              <p className="text-sm text-white/80 leading-relaxed font-light italic mb-6 relative z-10">"{t.text}"</p>
              <div className="flex items-center space-x-3 pt-4 border-t border-white/15 relative z-10">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md group-hover:border-indigo-400 transition-colors duration-300" />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">{t.name}</h4>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <About />
      </section>

      {/* ── Banner ── */}
      <section className="max-w-7xl mx-auto px-6 py-6 mb-16">
        <div className="reveal banner-reveal relative rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl overflow-hidden group shimmer-wrap">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="space-y-1 relative z-10">
            <h4 className="text-xl font-bold">Ready to upgrade your computer?</h4>
            <p className="text-xs text-white/60 max-w-md font-light">Our laptop catalog is online and ready. Pick up at our co-working office or get free delivery.</p>
          </div>
          <a href="/store" className="w-full md:w-auto px-6 h-12 bg-white text-[#01065d] font-bold text-xs rounded-xl flex items-center justify-center hover:bg-indigo-50 shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap relative z-10">
            Enter Laptop Store
          </a>
        </div>
      </section>

      <FloatingWhatsapp />

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-[#000236]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 font-mono">
          <p>© 2026 Tech Portal Solutions. Delivering Innovative technology driven solutions.</p>
          <div className="flex space-x-6">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#video" className="hover:text-white transition-colors">Tour</a>
            <a href="/store" className="text-indigo-300 hover:text-white transition-colors">Buy Devices from us →</a>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}