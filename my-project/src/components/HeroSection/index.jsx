import { useState, useEffect } from 'react';
import heroImage from "../../assets/bg.jpeg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Transform Your Tech Career',
      title: 'Learn. Work. Succeed.',
      subtitle: 'Your Complete Tech Growth Platform',
      description: 'Join 1,000+ professionals who upgraded their skills, found their perfect workspace, and got the best tech gear—all in one place.',
      buttons: [
        { text: 'Shop Premium Laptops', href: '/store', primary: true },
        { text: 'Explore All Services', href: '#services', primary: false }
      ]
    },
    {
      badge: 'Industry-Leading Education',
      title: 'Master In-Demand Skills Fast',
      subtitle: 'From Beginner to Job-Ready in Months',
      description: 'Learn Python, JavaScript, React, AI & more through hands-on projects. 94% of our graduates land tech jobs within 6 months.',
      buttons: [
        { text: 'Start Learning Today', href: '/courses', primary: true },
        { text: 'View Free Preview', href: '/courses', primary: false }
      ]
    },
    {
      badge: 'Elite Workspaces',
      title: 'Where Great Work Happens',
      subtitle: 'Premium Co-Working, Zero Distractions',
      description: 'Ultra-fast internet, ergonomic setups, 24/7 access, and a community of developers and entrepreneurs. First week free for new members.',
      buttons: [
        { text: 'Claim Free Week', href: '/workspace', primary: true },
        { text: 'Take Virtual Tour', href: '/workspace', primary: false }
      ]
    },
    {
      badge: 'Best Tech Deals',
      title: 'High-Performance Laptops',
      subtitle: 'Verified Quality, Unbeatable Prices',
      description: 'Get professional-grade laptops at 30-40% below retail. Every device tested, certified, and comes with a 1-year warranty.',
      buttons: [
        { text: 'Browse Laptops', href: '/store', primary: true },
        { text: 'Compare Models', href: '/store', primary: false }
      ]
    }
  ];

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          `url(${heroImage})`
      }}
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#01065d]/90 via-[#01065d]/25 to-[#01065d]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#01065d] via-[#01065d]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Sliding track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <div className="max-w-2xl space-y-6">
                  <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wide text-indigo-300 bg-white/10 px-3 py-1 rounded-full">
                    {slide.badge}
                  </span>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-lg sm:text-xl font-medium text-indigo-200">
                    {slide.subtitle}
                  </p>

                  <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {slide.buttons.map((button, idx) => (
                      <a
                        key={idx}
                        href={button.href}
                        className={
                          button.primary
                            ? "px-6 py-3 bg-white text-[#01065d] rounded-lg font-semibold text-center hover:bg-indigo-50 transition-colors"
                            : "px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-colors"
                        }
                      >
                        {button.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {/* <div className="flex items-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <span className="fa-solid fa-chevron-left text-white text-sm"></span>
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <span className="fa-solid fa-chevron-right text-white text-sm"></span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HeroCarousel;