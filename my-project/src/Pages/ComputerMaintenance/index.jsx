import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_white.png';
import FloatingWhatsapp from '../../components/WhatsappButton';
import Footer from '../../components/WebsiteFooter';



// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  "Hardware Repair",
  "Software Troubleshooting",
  "Data Recovery",
  "Virus/Malware Removal",
  "Performance Upgrade",
  "Networking Setup",
  "General Enquiry",
];

const serviceCards = [
  { icon: 'fa-microchip',  title: 'Hardware Repair',          desc: 'Motherboard fixes, screen replacements, and component-level diagnostics.' },
  { icon: 'fa-bug',        title: 'Virus & Malware Removal',  desc: 'Deep system cleaning and security hardening to protect your data.' },
  { icon: 'fa-database',   title: 'Data Recovery',            desc: 'Recovering lost, corrupted, or accidentally deleted files from any drive.' },
  { icon: 'fa-gauge-high', title: 'Performance Upgrades',     desc: 'SSD installations, RAM upgrades, and OS optimizations for speed.' },
  { icon: 'fa-wifi',       title: 'Network Setup',            desc: 'Router configuration, mesh networks, and secure connectivity solutions.' },
  { icon: 'fa-code',       title: 'Software Troubleshooting', desc: 'OS reinstallation, driver conflicts, and application error resolution.' },
];

const steps = [
  { num: '01', title: 'Book a Request', desc: 'Fill out the form below or bring your device directly to our Akwa Ibom office.' },
  { num: '02', title: 'Free Diagnosis', desc: 'Our technicians inspect the issue and provide a transparent, no-obligation quote.' },
  { num: '03', title: 'Expert Repair',  desc: 'We fix your device using premium parts and industry-best practices.' },
  { num: '04', title: 'Pickup / Delivery', desc: 'Collect your optimized machine or get it safely delivered right to your door.' },
];

const mobileLinks = [
    { label: 'Home', hash:'/', sub: 'Explore dynamic ecosystems' },
    { label: 'Courses', hash:'/courses', sub: 'Scale yourself with the right courses' },
    { label: 'WorkSpace', hash:'/workspace', sub: 'Work with ease' },
    { label: 'Computer maintenance', hash:'/maintenance', sub: 'Repair your laptops' },
    { label: 'About Us', hash:'/about', sub: 'Our story and mission' },
  ];

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.glass-card, .smooth-button, img, button, a { transform: translateZ(0); will-change: transform; backface-visibility: hidden; }

@keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; } 25% { transform: translate(30px, -60px) scale(1.15); opacity: 0.25; } 50% { transform: translate(-30px, 30px) scale(0.9); opacity: 0.2; } 75% { transform: translate(60px, 60px) scale(1.08); opacity: 0.22; } }
.animate-blob { animation: blob 25s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) backwards; }

.reveal-on-scroll { opacity: 0; transform: translateY(50px); transition: all 800ms cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-on-scroll.reveal-visible { opacity: 1; transform: translateY(0); }

.smooth-card-transition { transition: all 700ms cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; }
.smooth-card-transition::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%); opacity: 0; transition: opacity 500ms ease; }
.smooth-card-transition:hover::before { opacity: 1; }
.smooth-card-transition:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5); }

.smooth-icon { transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.group:hover .smooth-icon { animation: iconFloat 2s ease-in-out infinite; }
@keyframes iconFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(6deg); } }

.smooth-button { position: relative; overflow: hidden; transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.smooth-button::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.2); transform: translate(-50%, -50%); transition: width 600ms ease, height 600ms ease; }
.smooth-button:active::before { width: 300px; height: 300px; }
.smooth-button:hover { transform: translateY(-3px) scale(1.05); }
.smooth-button:active { transform: translateY(0) scale(0.98); }

.smooth-transition { transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1); }

@keyframes menuSlideIn { from { clip-path: circle(0% at 100% 0%); opacity: 0; } to { clip-path: circle(150% at 100% 0%); opacity: 1; } }
@keyframes menuSlideOut { from { clip-path: circle(150% at 100% 0%); opacity: 1; } to { clip-path: circle(0% at 100% 0%); opacity: 0; } }
.menu-slide-in { animation: menuSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.menu-slide-out { animation: menuSlideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.stagger-link { opacity: 0; transform: translateX(-30px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.menu-links-visible .stagger-link { opacity: 1; transform: translateX(0); }
.menu-links-visible .stagger-link:nth-child(1) { transition-delay: 200ms; }
.menu-links-visible .stagger-link:nth-child(2) { transition-delay: 300ms; }
.menu-links-visible .stagger-link:nth-child(3) { transition-delay: 400ms; }
.menu-links-visible .stagger-link:nth-child(4) { transition-delay: 500ms; }
.menu-links-visible .stagger-link:nth-child(5) { transition-delay: 600ms; }

.navbar-sticky { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1); }
.navbar-top { background: rgba(1, 5, 109, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.navbar-scrolled { background: rgba(1, 5, 109, 0.95); backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); }

.glass-card { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1); }
.glass-card:hover { background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%); border-color: rgba(255,255,255,0.25); }

@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
.shimmer-wrap { position: relative; overflow: hidden; }
.shimmer-wrap::after { content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transform: translateX(-100%); }
.shimmer-wrap:hover::after { animation: shimmer 1.2s cubic-bezier(0.4, 0, 0.2, 1); }

@keyframes spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
body { padding-top: 80px; }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const MaintenancePage = () => {
  const navigate = useNavigate();

  // ── Nav state ──
  const [scrolled,        setScrolled]        = useState(false);
  const [isMenuOpen,      setIsMenuOpen]       = useState(false);
  const [isMenuAnimating, setIsMenuAnimating]  = useState(false);
  const [menuAnimation,   setMenuAnimation]    = useState('');

  // ── Form state ──
  const [form,   setForm]   = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // ── Sticky nav on scroll ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // ── Scroll reveal ──
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [status]); // re-observe when form status changes to reveal success message

  // ── Toggle mobile menu ──
  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      setMenuAnimation('menu-slide-out');
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuAnimating(false);
        setMenuAnimation('');
      }, 500);
    } else {
      setIsMenuOpen(true);
      setIsMenuAnimating(true);
      setMenuAnimation('menu-slide-in');
      setTimeout(() => setMenuAnimation(prev => prev + ' menu-links-visible'), 100);
    }
  }, [isMenuOpen]);




  // ── Close menu and navigate ──
const handleMobileNav = useCallback((e, path) => {
  e.preventDefault();

  // Start closing animation
  setIsMenuAnimating(false);
  setMenuAnimation('menu-slide-out');

  // After animation completes, navigate
  setTimeout(() => {
    setIsMenuOpen(false);
    setMenuAnimation('');
    document.body.style.overflow = '';

    navigate(path);
  }, 500);
}, [navigate]);


  // ── Desktop nav — handles /#hash links ──
  const handleDesktopNav = useCallback((e, hash) => {
    e.preventDefault();
    if (hash.startsWith('/#')) {
      const id = hash.replace('/#', '');
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [navigate]);

  // ── Form handlers ──
  const validate = () => {
    const e = {};
    if (!form.name.trim())                      e.name    = 'Your name is required.';
    if (!form.email.trim())                     e.email   = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = 'Enter a valid email address.';
    if (!form.service)                          e.service = 'Please select a service.';
    if (!form.message.trim())                   e.message = 'Write a short message so we know how to help.';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error === false) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01056d] via-[#020a7a] to-[#01056d]">
      <style>{styles}</style>

      {/* ── Navbar ── */}
      <nav className={`navbar-sticky ${scrolled ? 'navbar-scrolled' : 'navbar-top'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group z-50">
            <img src={logo} width={170} alt="Tech Portal Solutions" className="transition-transform duration-500 group-hover:scale-105" />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
            <a href="/" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
              Home
            </a>
            <a
              href="/#services"
              onClick={(e) => handleDesktopNav(e, '/#services')}
              className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300"
            >
              Services
            </a>
            <a href="/courses" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
              Courses
            </a>
            <a href="/workspace" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">
              Workspace
            </a>
            <a href="/maintenance" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:transition-all after:duration-300">
              Maintenance
            </a>
            <a href="/store" className="px-4 py-2 bg-white/10 hover:bg-white hover:text-[#01056d] rounded-lg text-white border border-white/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
              Shop Laptops →
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 relative w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-white/5 shadow-2xl hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5 w-5">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2 w-5' : 'w-5'}`} />
              <span className={`block h-0.5 bg-indigo-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4 ml-2'}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2 w-5' : 'w-5 ml-auto'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {(isMenuOpen || isMenuAnimating) && (
        <div className={`fixed inset-0 z-40 md:hidden bg-[#01043a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 ${menuAnimation}`}>
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/0 blur-2xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[-20%] w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="flex justify-between items-center mt-20 border-b border-white/10 pb-6 stagger-link">
            <p className="text-xs text-white/50">Expert Tech Solutions</p>
          </div>

          <div className="flex flex-col space-y-5 my-auto text-left pl-2">
            {mobileLinks.map((link, i) => (
              <a
                key={i}
                href={link.hash}
                onClick={(e) => handleMobileNav(e, link.hash)}
                className="group block stagger-link"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-mono text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">0{i + 1}.</span>
                  <span className="text-3xl font-bold tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{link.label}</span>
                </div>
                <span className="block text-xs text-white/40 font-light pl-8 group-hover:text-indigo-200 transition-colors duration-300">{link.sub}</span>
              </a>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-4 flex items-center space-x-4 text-left stagger-link">
            <div><p className="text-xs font-bold text-white">Portal Systems Active</p></div>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative pt-22 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-[450px] h-[450px] bg-[#01065d]/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 backdrop-blur-md shadow-lg animate-fade-in-up">
            <span className="fa-solid fa-wrench text-white mr-2"></span>
            <span className="text-sm font-bold text-white">Professional Tech Support</span>
          </div>

          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1]">
              <span className="block bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Expert Computer</span>
              <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-[#01065d] bg-clip-text text-transparent mt-2">Maintenance</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
              From hardware failures to software bugs, we diagnose, repair, and optimize your machines to get you back to peak productivity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <a href="#contact-form" className="w-full sm:w-auto px-10 h-16 bg-white text-[#01056d] rounded-xl font-black text-lg flex items-center justify-center shadow-2xl smooth-button">
              Request Repair
            </a>
            <a href="https://wa.me/1234567890" className="w-full sm:w-auto text-white px-10 h-16 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-xl font-bold text-lg flex items-center justify-center smooth-button backdrop-blur-sm">
              <span className="fa-brands fa-whatsapp mr-3 text-xl"></span> Live Chat
            </a>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Our Repair</span>{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-[#01065d] bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Comprehensive solutions for all your tech headaches.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service, index) => (
              <div key={index} className="reveal-on-scroll group" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="glass-card p-8 rounded-3xl smooth-card-transition h-full flex flex-col shadow-2xl border border-white/10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center smooth-icon shadow-lg">
                    <span className={`fa-solid ${service.icon} text-white text-2xl`}></span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-200 smooth-transition">{service.title}</h3>
                  <p className="text-white/60 text-base leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">How It</span>{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-[#01065d] bg-clip-text text-transparent">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="reveal-on-scroll text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="text-5xl font-black text-indigo-500/30 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact-form" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Request a</span>{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-[#01065d] bg-clip-text text-transparent">Repair</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Tell us what's wrong, and we'll get back to you with a quote within hours.</p>
          </div>

          <div className="reveal-on-scroll">
            {status === 'success' ? (
              <div className="glass-card p-12 sm:p-16 rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border-2 border-green-400">
                  <span className="fa-solid fa-check text-green-400 text-3xl"></span>
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Request Sent!</h3>
                <p className="text-white/60 mb-8 max-w-md">We've received your maintenance request and will contact you shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 bg-white text-[#01056d] rounded-xl smooth-button font-bold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Full name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Emeka Okonkwo"
                      className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300"
                    />
                    {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Email address *</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300"
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Phone number</label>
                    <input
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  {/* Service */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Service Required *</label>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      style={{ colorScheme: 'dark' }}
                      className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-800">Select a service…</option>
                      {SERVICES.map(s => <option key={s} value={s} className="text-gray-800">{s}</option>)}
                    </select>
                    {errors.service && <p className="text-xs text-red-400">{errors.service}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-sm font-bold text-white/70">Describe the issue *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell us what's happening with your machine. The more detail, the faster we can help."
                    className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 resize-vertical min-h-[120px]"
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="mb-6 p-4 rounded-xl text-sm text-red-400 bg-red-500/10 border border-red-400/30">
                    Something went wrong. Please try again or contact us directly via WhatsApp.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full h-16 bg-white cursor-pointer text-[#01056d] hover:bg-[#01056d] hover:text-white font-black rounded-xl smooth-button flex items-center justify-center gap-2 shadow-lg text-base shimmer-wrap"
                >
                  {status === 'sending' ? (
                    <>
                      <span style={{
                        width: 20, height: 20,
                        border: '2px solid rgba(1,5,109,0.3)', borderTopColor: '#01056d',
                        borderRadius: '50%', display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <span className="fa-solid fa-arrow-right smooth-transition"></span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

     {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 py-6 mb-16">
        <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 smooth-card-transition shimmer-wrap reveal-on-scroll">
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-white text-center lg:text-start">Need a Laptop for Your Course?</h4>
            <p className="text-sm text-white/60 max-w-2xl text-center lg:text-start">Browse our curated selection of developer-grade laptops. Free delivery or pickup at our location.</p>
          </div>
          <a href="/store" className="px-8 h-14 bg-white text-[#01065d] hover:text-white hover:bg-[#01065d] font-bold rounded-xl flex items-center justify-center smooth-button shadow-lg whitespace-nowrap">
            Shop Laptops →
          </a>
        </div>
      </section>

      <FloatingWhatsapp />

       {/* ── Footer ── */}
          <Footer/>

          </div>
  );
};

export default MaintenancePage;