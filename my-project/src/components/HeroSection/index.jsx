import { useState, useEffect, useRef } from 'react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const slides = [
    {
      badge: { icon: 'fa-star', text: 'Transform Your Tech Career' },
      title: 'Learn. Work.\nSucceed.',
      subtitle: 'Your Complete Tech Growth Platform',
      description: 'Join 1,000+ professionals who upgraded their skills, found their perfect workspace, and got the best tech gear—all in one place.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      imageAlt: 'Tech professionals collaborating',
      buttons: [
        { text: 'Shop Premium Laptops →', href: '/store', primary: true },
        { text: 'Explore All Services', href: '#services', primary: false }
      ],
      stats: { value: '1,000+', label: 'Active Members' }
    },
    {
      badge: { icon: 'fa-graduation-cap', text: 'Industry-Leading Education' },
      title: 'Master In-Demand\nSkills Fast',
      subtitle: 'From Beginner to Job-Ready in Months',
      description: 'Learn Python, JavaScript, React, AI & more through hands-on projects. 94% of our graduates land tech jobs within 6 months. Lifetime access included.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      imageAlt: 'Developer learning to code',
      buttons: [
        { text: 'Start Learning Today →', href: '/courses', primary: true },
        { text: 'View Free Preview', href: '#preview', primary: false }
      ],
      stats: { value: '94%', label: 'Get Hired' }
    },
    {
      badge: { icon: 'fa-building', text: 'Elite Workspaces' },
      title: 'Where Great Work\nHappens',
      subtitle: 'Premium Co-Working, Zero Distractions',
      description: 'Ultra-fast Starlink internet, ergonomic setups, 24/7 access, free coffee & snacks. Network with top developers and entrepreneurs. First week free for new members!',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      imageAlt: 'Modern co-working space',
      buttons: [
        { text: 'Claim Free Week →', href: '/workspace', primary: true },
        { text: 'Take Virtual Tour', href: '#tour', primary: false }
      ],
      stats: { value: '24/7', label: 'Always Open' }
    },
    {
      badge: { icon: 'fa-laptop-code', text: 'Best Tech Deals' },
      title: 'High-Performance\nLaptops',
      subtitle: 'Verified Quality, Unbeatable Prices',
      description: 'Get professional-grade laptops at 30-40% below retail. Every device tested, certified, and comes with 1-year warranty. Free same-day delivery available.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      imageAlt: 'Premium laptop setup',
      buttons: [
        { text: 'Browse Laptops →', href: '/store', primary: true },
        { text: 'Compare Models', href: '#compare', primary: false }
      ],
      stats: { value: '40%', label: 'Below Retail' }
    }
  ];

  // Typewriter effect
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    const title = slides[currentSlide].title;
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < title.length) {
        setDisplayed(title.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentSlide]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 75;
    const isRightSwipe = distance < -75;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (touchStart) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 75;
    const isRightSwipe = distance < -75;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
    setIsPaused(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-15 md:pt-10 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Auto-play Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div 
          key={currentSlide}
          className="!h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left smooth-progress"
          style={{ 
            animation: isPaused ? 'none' : 'progressBar 5s linear forwards'
          }}
        ></div>
      </div>

      <div 
        ref={carouselRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left z-10 relative" style={{ minHeight: '500px' }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 right-0 smooth-transition ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0 pointer-events-auto z-10'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-8 pointer-events-none z-0'
                  : 'opacity-0 translate-x-8 pointer-events-none z-0'
              }`}
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Main Title */}
                <div className={`smooth-element ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '200ms' }}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] sm:leading-[1.05]">
                    {index === currentSlide && (
                      <>
                        {displayed.split("\n").map((line, i) => (
                          <span key={i} className="block bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                            {line}
                          </span>
                        ))}
                        {!done && (
                          <span
                            className="blink-cursor inline-block align-middle"
                            style={{ 
                              width: '3px', 
                              height: '0.85em', 
                              background: 'linear-gradient(to right, #fff, #a5b4fc)', 
                              borderRadius: '2px', 
                              marginLeft: '6px',
                              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                            }}
                          />
                        )}
                      </>
                    )}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mt-2 sm:mt-3">
                    {slide.subtitle}
                  </p>
                </div>
                
                {/* Description */}
                <p className={`text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-normal leading-relaxed smooth-element ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '300ms' }}>
                  {slide.description}
                </p>
                
                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 smooth-element ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '500ms' }}>
                  {slide.buttons.map((button, idx) => (
                    <a 
                      key={idx}
                      href={button.href} 
                      className={button.primary 
                        ? "group w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 bg-white text-[#01065d] rounded-xl font-bold flex items-center justify-center shadow-[0_10px_40px_rgba(255,255,255,0.25)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] smooth-button hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg relative overflow-hidden"
                        : "w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-xl font-bold flex items-center justify-center smooth-button hover:scale-105 text-sm sm:text-base md:text-lg backdrop-blur-sm"
                      }
                    >
                      {button.primary && (
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 smooth-overlay"></span>
                      )}
                      <span className="relative">{button.text}</span>
                    </a>
                  ))}
                </div>

                {/* Key Stat */}
                <div className={`pt-2 sm:pt-4 flex items-center gap-3 smooth-element ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '600ms' }}>
                  <div className="glass-card px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl smooth-button hover:scale-105">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">{slide.stats.value}</div>
                    <div className="text-[10px] sm:text-xs text-white/60 font-semibold uppercase tracking-wide">{slide.stats.label}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Visual - Images with Ultra-Smooth Transitions */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] sm:min-h-[400px] md:min-h-[500px] mt-8 lg:mt-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 image-container-transition ${
                index === currentSlide
                  ? 'opacity-100 scale-100 rotate-0 z-10'
                  : index < currentSlide
                  ? 'opacity-0 scale-90 -rotate-6 z-0'
                  : 'opacity-0 scale-90 rotate-6 z-0'
              }`}
            >
              {/* Main Image Card */}
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.6)] sm:shadow-[30px_30px_80px_rgba(0,0,0,0.6)] image-card-hover group">
                {/* Image with parallax-like effect */}
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={slide.image} 
                    alt={slide.imageAlt}
                    className={`w-full h-full object-cover image-smooth-transition group-hover:scale-110 ${
                      index === currentSlide ? 'image-fade-in' : 'image-fade-out'
                    }`}
                    loading="lazy"
                  />
                </div>
                
                {/* Gradient Overlay with smooth transition */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#01065d]/90 via-[#01065d]/40 to-transparent gradient-smooth-transition ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                {/* Image Caption */}
                <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 caption-transition ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '400ms' }}>
                  <div className="glass-card px-3 sm:px-5 py-2 sm:py-4 rounded-lg sm:rounded-xl backdrop-blur-md border border-white/20">
                    <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      {slide.imageAlt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Top Right */}
              <div 
                className={`absolute -top-2 sm:-top-4 -right-2 sm:-right-4 glass-card w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col justify-between border border-white/20 backdrop-blur-md floating-badge-transition ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0' 
                    : 'opacity-0 translate-x-12 -translate-y-12 scale-75 rotate-45'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <span className={`text-2xl sm:text-3xl fa-solid ${slide.badge.icon} text-white icon-rotate ${
                  index === currentSlide ? 'rotate-0' : 'rotate-180'
                }`}></span>
                <span className="text-[10px] sm:text-xs font-bold text-white/90">Featured</span>
              </div>

              {/* Top Left Accent */}
              <div 
                className={`absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-[#01065d] rounded-full flex items-center justify-center shadow-2xl accent-transition ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100 rotate-0' 
                    : 'opacity-0 scale-0 -rotate-360'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className={`fa-solid fa-star text-white text-lg sm:text-2xl star-pulse ${
                  index === currentSlide ? 'animate-pulse-slow' : ''
                }`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls - Positioned closer to carousel */}
      <div className="relative mt-8 sm:mt-12 md:mt-16 flex items-center justify-center gap-4 sm:gap-6 z-20">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 border-2 border-white/30 backdrop-blur-md flex items-center justify-center smooth-button hover:scale-110 active:scale-95 shadow-lg group"
          aria-label="Previous slide"
        >
          <span className="fa-solid fa-chevron-left text-white text-sm sm:text-lg group-hover:-translate-x-0.5 smooth-icon"></span>
        </button>

        {/* Dots */}
        <div className="flex gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-white/20 shadow-xl">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`h-2 sm:h-2.5 rounded-full smooth-dot ${
                currentSlide === index 
                  ? 'w-6 sm:w-8 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]' 
                  : 'w-2 sm:w-2.5 bg-white/40 group-hover:bg-white/60 group-hover:w-3 sm:group-hover:w-4'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 border-2 border-white/30 backdrop-blur-md flex items-center justify-center smooth-button hover:scale-110 active:scale-95 shadow-lg group"
          aria-label="Next slide"
        >
          <span className="fa-solid fa-chevron-right text-white text-sm sm:text-lg group-hover:translate-x-0.5 smooth-icon"></span>
        </button>
      </div>

      {/* Slide Counter - Mobile optimized */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex flex-col gap-2 items-end z-30">
       
        <div className="bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-xs sm:text-sm font-bold text-white shadow-lg">
          {currentSlide + 1}/{slides.length}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;