import { useState, useEffect } from 'react';
import heroImage from "../../assets/bg.jpeg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroImage,
      title: 'Learn. Work. Succeed.',
      description: 'Skills, workspace and gear — all in one place.',
      buttons: [
        { text: 'Shop Premium Laptops', href: '/store', primary: true },
        { text: 'Explore All Services', href: '#services', primary: false }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
      title: 'Master In-Demand Skills Fast',
      description: 'Hands-on courses that get you job-ready.',
      buttons: [
        { text: 'Start Learning Today', href: '/courses', primary: true },
        { text: 'View Free Preview', href: '/courses', primary: false }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      title: 'Where Great Work Happens',
      description: 'Premium co-working with zero distractions.',
      buttons: [
        { text: 'Claim Free Week', href: '/workspace', primary: true },
        { text: 'Take Virtual Tour', href: '/workspace', primary: false }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      title: 'High-Performance Laptops',
      description: 'Verified quality at unbeatable prices.',
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

  return (
    <section className="relative overflow-hidden">
      {/* Sliding track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#01065d]/90 via-[#01065d]/25 to-[#01065d]/85" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#01065d] via-[#01065d]/80 to-transparent" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                <div className="max-w-2xl space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    {slide.title}
                  </h1>

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
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroCarousel;