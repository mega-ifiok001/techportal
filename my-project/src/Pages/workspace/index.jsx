import { useState, useCallback, useEffect } from 'react';
import logo from '../../assets/logo_white.png';
import FloatingWhatsapp from '../../components/WhatsappButton';
import { useNavigate } from 'react-router-dom';

const WorkspacePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState('');

  const navigate = useNavigate();

  // Sticky nav shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu with animation
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

  // Close menu and navigate — handles /#hash, #hash, and /routes
  const handleMobileNav = useCallback((e, hash) => {
    e.preventDefault();
    setIsMenuAnimating(false);
    setMenuAnimation('menu-slide-out');

    setTimeout(() => {
      setIsMenuOpen(false);
      setMenuAnimation('');
      document.body.style.overflow = '';

      // Cross-page hash e.g. /#services
      if (hash.startsWith('/#')) {
        const id = hash.replace('/#', '');
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }

      // Same-page hash e.g. #spaces
      if (hash.startsWith('#')) {
        const target = document.querySelector(hash);
        if (target) {
          const navHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
        return;
      }

      // Regular route e.g. /courses
      navigate(hash);
    }, 500);
  }, [isMenuOpen, navigate]);

  // Desktop nav click handler for /#hash links
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mobileLinks = [
    { label: 'Home', hash: '/', sub: 'Back to homepage' },
    { label: 'Our Services', hash: '/#services', sub: 'Explore dynamic ecosystems' },
    { label: 'Courses', hash: '/courses', sub: 'Scale yourself with the right courses' },
    { label: 'WorkSpace', hash: '/workspace', sub: 'Work with ease' },
    { label: 'About Us', hash: '/about', sub: 'Our story and mission' },
  ];

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

  .smooth-image-transition { transition: transform 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  .group:hover .smooth-image-transition { transform: scale(1.15) rotate(2deg); }

  .smooth-button { position: relative; overflow: hidden; transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .smooth-button::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.2); transform: translate(-50%, -50%); transition: width 600ms ease, height 600ms ease; }
  .smooth-button:active::before { width: 300px; height: 300px; }
  .smooth-button:hover { transform: translateY(-3px) scale(1.05); }
  .smooth-button:active { transform: translateY(0) scale(0.98); }

  @keyframes iconFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(6deg); } }
  .smooth-icon { transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .group:hover .smooth-icon { animation: iconFloat 2s ease-in-out infinite; }

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
  .navbar-top { background: rgba(1, 5, 109, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  .navbar-scrolled { background: rgba(1, 5, 109, 0.95); backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); }

  .glass-card { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1); }
  .glass-card:hover { background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%); border-color: rgba(255,255,255,0.25); }

  @keyframes searchGlow { 0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); } 50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); } }
  .glass-card:has(input:focus) { animation: searchGlow 2s ease-in-out infinite; border-color: rgba(139, 92, 246, 0.6); }
  input { transition: all 400ms ease; } input:focus { outline: none; }

  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
  .shimmer-wrap { position: relative; overflow: hidden; }
  .shimmer-wrap::after { content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transform: translateX(-100%); }
  .shimmer-wrap:hover::after { animation: shimmer 1.2s cubic-bezier(0.4, 0, 0.2, 1); }

  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
  body { padding-top: 80px; }
  `;

  const workspaces = [
    {
      id: 'public',
      title: 'Public Workspace',
      subtitle: 'Collaborate, Connect, Create',
      description: 'Our open-plan public workspace is designed for freelancers, remote workers, and creatives who thrive in a vibrant, collaborative environment. Network with like-minded professionals while enjoying high-speed internet and premium amenities.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      features: [
        'Hot Desking Availability',
        'Ultra-Fast Starlink WiFi',
        'Community Networking Events',
        'Complimentary Coffee & Tea',
        'Ergonomic Seating',
        'Power Backup Guaranteed',
      ],
      price: '5,000',
      period: '/ month',
      badge: 'Community',
      badgeColor: 'bg-blue-500/30 border-blue-400 text-blue-100',
    },
    {
      id: 'private',
      title: 'Private Workspace',
      subtitle: 'Focus, Build, Scale',
      description: 'Secure, quiet, and fully customizable private offices perfect for teams and startups. Get 24/7 secure access, your own dedicated fiber connection, and the privacy needed to build your product without distractions.',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
      features: [
        'Dedicated Lockable Office',
        '24/7 Biometric Access',
        'Dedicated Fiber Line',
        'Meeting Room Credits',
        'Customizable Setup',
        'Priority IT Support',
      ],
      price: '25,000',
      period: '/ month',
      badge: 'Premium',
      badgeColor: 'bg-blue-500/30 border-blue-400 text-blue-100',
    }
  ];

  const amenities = [
    { icon: 'fa-wifi', title: 'Starlink Internet', desc: 'Blazing fast, reliable connectivity' },
    { icon: 'fa-plug', title: 'Power Backup', desc: 'Uninterrupted productivity' },
    { icon: 'fa-chair', title: 'Ergonomic Setup', desc: 'Comfort for long work hours' },
    { icon: 'fa-print', title: 'Printing Station', desc: 'High-speed document printing' },
    { icon: 'fa-users-rectangle', title: 'Meeting Rooms', desc: 'Professional collaboration spaces' },
    { icon: 'fa-shield-halved', title: 'Secure Access', desc: 'Safe and secure' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01056d] via-[#020a7a] to-[#01056d]">
      <style>{styles}</style>

      {/* Navigation */}
      <nav className={`navbar-sticky ${scrolled ? 'navbar-scrolled' : 'navbar-top'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group z-50">
            <img src={logo} width={170} alt="Tech Portal Solutions" className="transition-transform duration-500 group-hover:scale-105" />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
            <a href="/" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Home</a>
            <a
              href="/#services"
              onClick={(e) => handleDesktopNav(e, '/#services')}
              className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300"
            >
              Services
            </a>
            <a href="/courses" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Courses</a>
            <a href="/workspace" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:transition-all after:duration-300">Workspace</a>
            <a href="/store" className="px-4 py-2 bg-white/10 hover:bg-white hover:text-[#01056d] rounded-lg text-white border border-white/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">Shop Laptops →</a>
          </div>

          <button onClick={toggleMenu} className="md:hidden z-50 relative w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-white/5 shadow-2xl hover:bg-white/10 transition-all duration-300" aria-label="Toggle Menu">
            <div className="space-y-1.5 w-5">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2 w-5' : 'w-5'}`} />
              <span className={`block h-0.5 bg-indigo-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4 ml-2'}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2 w-5' : 'w-5 ml-auto'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {(isMenuOpen || isMenuAnimating) && (
        <div className={`fixed inset-0 z-40 md:hidden bg-[#01043a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 ${menuAnimation}`}>
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-br from-indigo-600/30 to-blue-600/0 blur-2xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[-20%] w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="flex justify-between items-center mt-20 border-b border-white/10 pb-6 stagger-link">
            <p className="text-xs text-white/50">Transform Your Career with Tech Skills</p>
          </div>
          <div className="flex flex-col space-y-5 my-auto text-left pl-2">
            {mobileLinks.map((link, i) => (
              <a key={i} href={link.hash} onClick={(e) => handleMobileNav(e, link.hash)} className="group block stagger-link">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-mono text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">0{i + 1}.</span>
                  <span className="text-3xl font-bold tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{link.label}</span>
                </div>
                <span className="block text-xs text-white/40 font-light pl-8 group-hover:text-indigo-200 transition-colors duration-300">{link.sub}</span>
              </a>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-4 flex items-center space-x-4 text-left stagger-link">
            <div><p className="text-xs font-bold">Portal Systems Active</p></div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-22 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-[450px] h-[450px] bg-[#01065d]/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-white/20 backdrop-blur-md shadow-lg animate-fade-in-up">
            <span className="text-sm font-bold text-white">Professional Co-Working Spaces Available</span>
          </div>

          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1]">
              <span className="block bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Where Great Work</span>
              <span className="block bg-gradient-to-r from-indigo-300 via-blue-300 to-[#01065d] bg-clip-text text-transparent mt-2">Happens</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
              Ultra-fast Starlink internet, ergonomic setups, 24/7 access, and a vibrant community. Zero distractions, maximum productivity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <a href="#spaces" className="w-full sm:w-auto px-10 h-16 bg-white text-[#01056d] rounded-xl font-black text-lg flex items-center justify-center shadow-2xl smooth-button">
              View Spaces
            </a>
            <a href="https://wa.me/1234567890" className="w-full sm:w-auto text-white px-10 h-16 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-xl font-bold text-lg flex items-center justify-center smooth-button backdrop-blur-sm">
              Book a Tour
            </a>
          </div>
        </div>
      </section>

      {/* Workspace Options Section */}
      <section id="spaces" className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Choose Your Ideal</span>{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-blue-300 to-[#01065d] bg-clip-text text-transparent">Environment</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Whether you need a collaborative hot-desk or a secure private office, we have you covered.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workspaces.map((space, index) => (
              <div key={space.id} className="course-card-animation reveal-on-scroll group" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="glass-card rounded-3xl overflow-hidden smooth-card-transition h-full flex flex-col shadow-2xl border border-white/10">
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-3xl font-black text-white mb-2 group-hover:text-indigo-200 smooth-transition">{space.title}</h3>
                    <p className="text-lg font-bold text-indigo-300 mb-4">{space.subtitle}</p>
                    <p className="text-white/60 text-base mb-8 leading-relaxed">{space.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {space.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-white/80">
                          <span className="fa-solid fa-check-circle text-green-400"></span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/10 flex items-end justify-center">
                      <a href="https://wa.me/1234567890" className="px-6 h-14 bg-white text-[#01056d] hover:bg-[#01056d] hover:text-white font-black rounded-xl smooth-button flex items-center justify-center gap-2 shadow-lg group/btn text-base shimmer-wrap">
                        <span>Get Started</span>
                        <span className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 smooth-transition"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Premium</span>{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-blue-300 to-[#01065d] bg-clip-text text-transparent">Amenities</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Everything you need to stay productive and comfortable.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="course-card-animation reveal-on-scroll group" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="glass-card p-6 rounded-2xl text-center smooth-card-transition h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center smooth-icon shadow-lg">
                    <span className={`fa-solid ${amenity.icon} text-white text-2xl`}></span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{amenity.title}</h4>
                  <p className="text-xs text-white/50">{amenity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 sm:p-16 rounded-3xl text-center relative overflow-hidden reveal-on-scroll shimmer-wrap">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-pink-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">Ready to Find</span><br/>
                <span className="bg-gradient-to-r from-indigo-300 via-blue-300 to-[#01065d] bg-clip-text text-transparent">Your Perfect Space?</span>
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Schedule a tour today and experience our premium workspaces. First week free for new members!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/1234567890" className="w-full sm:w-auto px-10 h-16 bg-white text-[#01056d] rounded-xl font-black text-lg flex items-center justify-center shadow-2xl smooth-button">
                  <span className="fa-brands fa-whatsapp mr-3 text-xl"></span> Chat on WhatsApp
                </a>
                <a href="/contact" className="w-full sm:w-auto text-white px-10 h-16 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-xl font-bold text-lg flex items-center justify-center smooth-button backdrop-blur-sm">
                  Send Us a Message
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="fa-solid fa-certificate text-yellow-400 text-xl"></span>
                  <span className="text-sm text-white/70">Professional Environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="fa-solid fa-shield-halved text-green-400 text-xl"></span>
                  <span className="text-sm text-white/70">Secure & Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="fa-solid fa-infinity text-indigo-400 text-xl"></span>
                  <span className="text-sm text-white/70">24/7 Access (Private)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 py-6 mb-16">
        <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 smooth-card-transition shimmer-wrap reveal-on-scroll">
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-white">Need a Laptop for Your Workspace?</h4>
            <p className="text-sm text-white/60 max-w-2xl">Browse our curated selection of developer-grade laptops. Perfect for your new office setup.</p>
          </div>
          <a href="/store" className="px-8 h-14 bg-white text-[#01056d] hover:text-white hover:bg-[#01056d] font-bold rounded-xl flex items-center justify-center smooth-button shadow-lg whitespace-nowrap">
            Shop Laptops →
          </a>
        </div>
      </section>

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
};

export default WorkspacePage;