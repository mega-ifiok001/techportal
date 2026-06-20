import { useState, useCallback, useEffect } from 'react';
import logo from '../../assets/logo_white.png';
import FloatingWhatsapp from '../../components/WhatsappButton';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sticky nav shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
      setTimeout(() => {
        setMenuAnimation(prev => prev + ' menu-links-visible');
      }, 100);
    }
  }, [isMenuOpen]);

  // Close menu and navigate
  const handleMobileNav = useCallback((e, hash) => {
    e.preventDefault();
    setIsMenuAnimating(false);
    setMenuAnimation('menu-slide-out');
    setTimeout(() => {
      setIsMenuOpen(false);
      setMenuAnimation('');
      document.body.style.overflow = '';
      const target = document.querySelector(hash);
      if (target) {
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }, 500);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const mobileLinks = [
    { label: 'Home', hash: '/', sub: 'Back to homepage' },
    { label: 'Our Services', hash: '/services', sub: 'Explore dynamic ecosystems' },
    { label: 'Courses', hash: '/courses', sub: 'Scale yourself with the right courses' },
    { label: 'WorkSpace', hash: '/workspace', sub: 'Work with ease' },
    { label: 'About Us', hash: '/about', sub: 'Our story and mission' },
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: 'fa-th-large', count: 6 },
    { id: 'programming', name: 'Programming', icon: 'fa-code', count: 3 },
    { id: 'data', name: 'Data Science', icon: 'fa-chart-line', count: 1 },
    { id: 'design', name: 'Design', icon: 'fa-palette', count: 1 },
    { id: 'marketing', name: 'Marketing', icon: 'fa-bullhorn', count: 1 },
  ];

  const levels = [
    { id: 'all', name: 'All Levels', icon: 'fa-layer-group' },
    { id: 'beginner', name: 'Beginner', icon: 'fa-seedling' },
    { id: 'intermediate', name: 'Intermediate', icon: 'fa-chart-line' },
    { id: 'advanced', name: 'Advanced', icon: 'fa-trophy' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      category: 'programming',
      level: 'beginner',
      description: 'Master HTML, CSS, JavaScript, React, Node.js and become a full-stack developer from scratch.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      instructor: 'John Kamau',
      instructorAvatar: 'https://i.pravatar.cc/150?img=12',
      duration: '12 weeks',
      lessons: 156,
      students: 8750,
      rating: 4.9,
      reviews: 2341,
      price: 35000,
      originalPrice: 60000,
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      features: ['Lifetime Access', 'Certificate', '1-on-1 Mentoring', 'Job Guarantee'],
      bestseller: true,
      completionRate: 94,
    },
    {
      id: 2,
      title: 'Python AI & Machine Learning Masterclass',
      category: 'data',
      level: 'intermediate',
      description: 'Build intelligent applications with Python, TensorFlow, and scikit-learn. Real-world AI projects.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      instructor: 'Dr. Grace Njeri',
      instructorAvatar: 'https://i.pravatar.cc/150?img=9',
      duration: '15 weeks',
      lessons: 178,
      students: 9234,
      rating: 4.9,
      reviews: 2789,
      price: 40000,
      originalPrice: 70000,
      tags: ['Python', 'TensorFlow', 'ML', 'AI', 'Data Analysis'],
      features: ['Real Datasets', 'Certificate', 'Kaggle Competitions', 'Career Support'],
      bestseller: true,
      hot: true,
      completionRate: 91,
    },
    {
      id: 3,
      title: 'React Native Mobile App Development',
      category: 'programming',
      level: 'intermediate',
      description: 'Create stunning cross-platform iOS and Android apps using React Native and publish to app stores.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      instructor: 'Sarah Mwangi',
      instructorAvatar: 'https://i.pravatar.cc/150?img=5',
      duration: '10 weeks',
      location: 'Physical',
      students: 6890,
      rating: 4.8,
      reviews: 1876,
      price: 30000,
      originalPrice: 50000,
      tags: ['React Native', 'iOS', 'Android', 'Mobile', 'Firebase'],
      features: ['App Publishing', 'Certificate', 'Real Apps', 'Community Access'],
      new: true,
      completionRate: 88,
    },
    {
      id: 4,
      title: 'UI/UX Design Complete Course',
      category: 'design',
      level: 'beginner',
      description: 'Design beautiful user interfaces with Figma. Learn user research, wireframing, and prototyping.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      instructor: 'Lucy Akinyi',
      instructorAvatar: 'https://i.pravatar.cc/150?img=10',
      duration: '10 weeks',
      lessons: 118,
      students: 5890,
      rating: 4.9,
      reviews: 1876,
      price: 28000,
      originalPrice: 48000,
      tags: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'],
      features: ['Portfolio Projects', 'Certificate', 'Figma Files', 'Design Resources'],
      hot: true,
      completionRate: 92,
    },
    {
      id: 5,
      title: 'Digital Marketing Complete Course',
      category: 'marketing',
      level: 'beginner',
      description: 'Master SEO, social media marketing, email marketing, and Google Ads to grow any business online.',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80',
      instructor: 'Alice Njoroge',
      instructorAvatar: 'https://i.pravatar.cc/150?img=4',
      duration: '14 weeks',
      lessons: 167,
      students: 9876,
      rating: 4.9,
      reviews: 2567,
      price: 32000,
      originalPrice: 55000,
      tags: ['SEO', 'Social Media', 'Google Ads', 'Content Marketing'],
      features: ['Marketing Tools', 'Certificate', 'Templates', 'Live Projects'],
      bestseller: true,
      completionRate: 90,
    },
    {
      id: 6,
      title: 'Full Stack JavaScript Development',
      category: 'programming',
      level: 'advanced',
      description: 'Advanced JavaScript, TypeScript, Node.js, MongoDB, React. Build production-ready applications.',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
      instructor: 'Michael Wanjiru',
      instructorAvatar: 'https://i.pravatar.cc/150?img=13',
      duration: '14 weeks',
      lessons: 167,
      students: 7845,
      rating: 4.8,
      reviews: 2134,
      price: 38000,
      originalPrice: 65000,
      tags: ['JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'React'],
      features: ['Code Reviews', 'Certificate', 'Premium Support', 'Job Prep'],
      completionRate: 87,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    const searchMatch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && levelMatch && searchMatch;
  });

  const stats = [
    { 
      icon: 'fa-users', 
      value: '50,000+', 
      label: 'Students Trained', 
      color: 'from-blue-500 to-indigo-600',
      description: 'Active learners worldwide'
    },
    { 
      icon: 'fa-book-open', 
      value: '100+', 
      label: 'Expert Courses', 
      color: 'from-purple-500 to-pink-600',
      description: 'Across 6 categories'
    },
    { 
      icon: 'fa-star', 
      value: '4.9/5', 
      label: 'Average Rating', 
      color: 'from-yellow-500 to-orange-600',
      description: 'From 10k+ reviews'
    },
    { 
      icon: 'fa-briefcase', 
      value: '95%', 
      label: 'Job Success Rate', 
      color: 'from-green-500 to-teal-600',
      description: 'Within 6 months'
    },
  ];

  // Scroll reveal animation - PLACED AFTER filteredCourses is defined!
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredCourses]);

  const styles = `
  /* ═══════════════════════════════════════════════════════════
     ULTRA-SMOOTH ANIMATIONS - PROFESSIONAL GRADE
     ═══════════════════════════════════════════════════════════ */

  /* Hardware Acceleration & Performance */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Smooth transitions for all interactive elements */
  .glass-card,
  .smooth-button,
  img,
  button,
  a {
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }

  /* ═══════════════════════════════════════════════════════════
     BACKGROUND ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  @keyframes blob {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.2;
    }
    25% {
      transform: translate(30px, -60px) scale(1.15);
      opacity: 0.25;
    }
    50% {
      transform: translate(-30px, 30px) scale(0.9);
      opacity: 0.2;
    }
    75% {
      transform: translate(60px, 60px) scale(1.08);
      opacity: 0.22;
    }
  }

  .animate-blob {
    animation: blob 25s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  /* ═══════════════════════════════════════════════════════════
     ENTRANCE ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }

  /* ═══════════════════════════════════════════════════════════
     COURSE CARD ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  .course-card-animation {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .course-card-animation.reveal-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* Stagger animation for cards */
  .course-card-animation:nth-child(1) { transition-delay: 0ms; }
  .course-card-animation:nth-child(2) { transition-delay: 100ms; }
  .course-card-animation:nth-child(3) { transition-delay: 200ms; }
  .course-card-animation:nth-child(4) { transition-delay: 300ms; }
  .course-card-animation:nth-child(5) { transition-delay: 400ms; }
  .course-card-animation:nth-child(6) { transition-delay: 500ms; }

  /* ═══════════════════════════════════════════════════════════
     CARD HOVER EFFECTS
     ═══════════════════════════════════════════════════════════ */

  .smooth-card-transition {
    transition: all 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  }

  .smooth-card-transition::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, 
      rgba(255,255,255,0.1) 0%, 
      rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 500ms ease;
  }

  .smooth-card-transition:hover::before {
    opacity: 1;
  }

  .smooth-card-transition:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
  }

  /* ═══════════════════════════════════════════════════════════
     IMAGE ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  .smooth-image-transition {
    transition: transform 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .group:hover .smooth-image-transition {
    transform: scale(1.15) rotate(2deg);
  }

  /* ═══════════════════════════════════════════════════════════
     BUTTON ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  .smooth-button {
    position: relative;
    overflow: hidden;
    transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .smooth-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 600ms ease, height 600ms ease;
  }

  .smooth-button:active::before {
    width: 300px;
    height: 300px;
  }

  .smooth-button:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .smooth-button:active {
    transform: translateY(0) scale(0.98);
  }

  /* ═══════════════════════════════════════════════════════════
     ICON ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  @keyframes iconFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(6deg);
    }
  }

  .smooth-icon {
    transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .group:hover .smooth-icon {
    animation: iconFloat 2s ease-in-out infinite;
  }

  /* ═══════════════════════════════════════════════════════════
     TEXT & GRADIENT ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .bg-gradient-to-r {
    background-size: 200% 200%;
    animation: gradientFlow 4s ease infinite;
  }

  .smooth-transition {
    transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ═══════════════════════════════════════════════════════════
     PROGRESS BAR ANIMATION
     ═══════════════════════════════════════════════════════════ */

  @keyframes progressFill {
    from {
      transform: scaleX(0);
      transform-origin: left;
    }
    to {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  .course-card-animation.reveal-visible .bg-gradient-to-r[style*="width"] {
    animation: progressFill 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
  }

  /* ═══════════════════════════════════════════════════════════
     CATEGORY PILLS ANIMATION
     ═══════════════════════════════════════════════════════════ */

  @keyframes pillPop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.05);
    }
  }

  .smooth-button.bg-gradient-to-r {
    animation: none;
  }

  .smooth-button.bg-gradient-to-r:hover {
    animation: pillPop 0.4s ease;
  }

  /* ═══════════════════════════════════════════════════════════
     MOBILE MENU ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  @keyframes menuSlideIn {
    from {
      clip-path: circle(0% at 100% 0%);
      opacity: 0;
    }
    to {
      clip-path: circle(150% at 100% 0%);
      opacity: 1;
    }
  }

  @keyframes menuSlideOut {
    from {
      clip-path: circle(150% at 100% 0%);
      opacity: 1;
    }
    to {
      clip-path: circle(0% at 100% 0%);
      opacity: 0;
    }
  }

  .menu-slide-in {
    animation: menuSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .menu-slide-out {
    animation: menuSlideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .stagger-link {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .menu-links-visible .stagger-link {
    opacity: 1;
    transform: translateX(0);
  }

  .menu-links-visible .stagger-link:nth-child(1) { transition-delay: 200ms; }
  .menu-links-visible .stagger-link:nth-child(2) { transition-delay: 300ms; }
  .menu-links-visible .stagger-link:nth-child(3) { transition-delay: 400ms; }
  .menu-links-visible .stagger-link:nth-child(4) { transition-delay: 500ms; }
  .menu-links-visible .stagger-link:nth-child(5) { transition-delay: 600ms; }

  /* ═══════════════════════════════════════════════════════════
     NAVBAR ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  .navbar-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar-top {
    background: rgba(1, 6, 93, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .navbar-scrolled {
    background: rgba(1, 6, 93, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  }

  /* ═══════════════════════════════════════════════════════════
     GLASS CARD EFFECTS
     ═══════════════════════════════════════════════════════════ */

  .glass-card {
    background: linear-gradient(135deg, 
      rgba(255,255,255,0.1) 0%, 
      rgba(255,255,255,0.05) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.15);
    transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    background: linear-gradient(135deg, 
      rgba(255,255,255,0.15) 0%, 
      rgba(255,255,255,0.08) 100%);
    border-color: rgba(255,255,255,0.25);
  }

  /* ═══════════════════════════════════════════════════════════
     SEARCH BAR ANIMATION
     ═══════════════════════════════════════════════════════════ */

  @keyframes searchGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
    }
  }

  .glass-card:has(input:focus) {
    animation: searchGlow 2s ease-in-out infinite;
    border-color: rgba(139, 92, 246, 0.6);
  }

  input {
    transition: all 400ms ease;
  }

  input:focus {
    outline: none;
  }

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL SYSTEM
     ═══════════════════════════════════════════════════════════ */

  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(50px);
    transition: all 800ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal-on-scroll.reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ═══════════════════════════════════════════════════════════
     SHIMMER EFFECT
     ═══════════════════════════════════════════════════════════ */

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(300%);
    }
  }

  .shimmer-wrap {
    position: relative;
    overflow: hidden;
  }

  .shimmer-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255,255,255,0.1), 
      transparent);
    transform: translateX(-100%);
  }

  .shimmer-wrap:hover::after {
    animation: shimmer 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ═══════════════════════════════════════════════════════════
     UTILITY CLASSES
     ═══════════════════════════════════════════════════════════ */

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ═══════════════════════════════════════════════════════════
     PERFORMANCE OPTIMIZATION
     ═══════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Prevent layout shifts */
  body {
    padding-top: 80px;
  }
`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01065d] via-[#020a7a] to-[#01065d]">
      <style>{styles}</style>

      {/* Navigation */}
      <nav className={`navbar-sticky ${scrolled ? 'navbar-scrolled' : 'navbar-top'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group z-50">
            <img src={logo} width={170} alt="Tech Portal Solutions" className="transition-transform duration-500 group-hover:scale-105" />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
            <a href="/" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Home</a>
            <a href="#services" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Our Services</a>
            <a href="/courses" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Courses</a>
            <a href="/workspace" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Workspace</a>
            <a href="#testimonials" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Testimonials</a>
            <a href="/store" className="px-4 py-2 bg-white/10 hover:bg-white hover:text-[#01065d] rounded-lg text-white border border-white/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
              Shop Laptops →
            </a>
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
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/0 blur-2xl animate-pulse" />
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
            <div>
              <p className="text-xs font-bold">Portal Systems Active</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1]">
                <span className="block bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                  Master Skills That
                </span>
                <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mt-2">
                  Matter
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                Learn from industry experts, build real projects, and land your dream tech job
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="glass-card p-2 rounded-2xl flex items-center gap-3 shadow-2xl">
                <span className="fa-solid fa-search text-white/50 pl-4"></span>
                <input
                  type="text"
                  placeholder="Search for courses, skills, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base py-3"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 cursor-pointer to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 smooth-button">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center smooth-card-transition group cursor-pointer">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center smooth-icon shadow-lg`}>
                  <span className={`fa-solid ${stat.icon} text-white text-2xl`}></span>
                </div>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-white/5 backdrop-blur-sm reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group px-6 py-3 rounded-full font-bold text-sm smooth-button ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className={`fa-solid ${category.icon} mr-2`}></span>
                {category.name}
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section id="courses" className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 reveal-on-scroll">
            {/* Level Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-white/70 uppercase tracking-wide">Level:</span>
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm smooth-button ${
                    selectedLevel === level.id
                      ? 'bg-white text-[#01065d] shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <span className={`fa-solid ${level.icon} mr-2`}></span>
                  {level.name}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-sm">
                Found <span className="font-bold text-white text-lg">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
              </span>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="course-card-animation reveal-on-scroll group"
              >
                <div className="glass-card rounded-3xl overflow-hidden smooth-card-transition h-full flex flex-col shadow-2xl border border-white/10">
                  {/* Course Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover smooth-image-transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01065d] via-[#01065d]/60 to-transparent"></div>

                    {/* Level Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl border-2 ${
                        course.level === 'beginner' ? 'bg-green-500/30 border-green-400 text-green-100' :
                        course.level === 'intermediate' ? 'bg-blue-500/30 border-blue-400 text-blue-100' :
                        'bg-purple-500/30 border-purple-400 text-purple-100'
                      }`}>
                        <span className="fa-solid fa-layer-group mr-1"></span>
                        {course.level.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Tag */}
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 text-xs font-bold rounded-lg border border-indigo-500/30">
                        {course.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-200 smooth-transition leading-tight">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                          <span className="fa-solid fa-check-circle text-green-400"></span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Completion Rate */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-white/50">Completion Rate</span>
                        <span className="text-xs font-bold text-green-400">{course.completionRate}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4">
                      <button className="w-full cursor-pointer h-14 bg-white text-[#01065d] hover:bg-[#01065d] hover:text-white font-black rounded-xl smooth-button flex items-center justify-center gap-2 shadow-lg group/btn text-base shimmer-wrap">
                        <span>Enroll Now</span>
                        <span className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 smooth-transition"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-20 reveal-on-scroll">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <span className="fa-solid fa-search text-white/30 text-4xl"></span>
              </div>
              <h3 className="text-3xl font-black text-white mb-3">No courses found</h3>
              <p className="text-white/60 mb-8 text-lg">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl smooth-button shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 sm:p-16 rounded-3xl text-center relative overflow-hidden reveal-on-scroll shimmer-wrap">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                  Not Sure Of The Right 
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Courses For You?
                </span>
              </h2>

              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join our active students already learning. Get premium and serious access, industry certificates, and dedicated career support.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/1234567890" className="w-full sm:w-auto px-10 h-16 bg-white text-[#01065d] rounded-xl font-black text-lg flex items-center justify-center shadow-2xl smooth-button">
                  Talk to Our Advisor
                </a>
                <a href="/contact" className="w-full sm:w-auto text-white px-10 h-16 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-xl font-bold text-lg flex items-center justify-center smooth-button backdrop-blur-sm">
                  Send Us a Message
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="fa-solid fa-certificate text-yellow-400 text-xl"></span>
                  <span className="text-sm text-white/70">Certified Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="fa-solid fa-shield-halved text-green-400 text-xl"></span>
                  <span className="text-sm text-white/70">Professional Mentors</span>
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
            <h4 className="text-2xl font-black text-white">Need a Laptop for Your Course?</h4>
            <p className="text-sm text-white/60 max-w-2xl">Browse our curated selection of developer-grade laptops. Free delivery or pickup at our location.</p>
          </div>
          <a href="/store" className="px-8 h-14 bg-white text-[#01065d] hover:text-white hover:bg-[#01065d] font-bold rounded-xl flex items-center justify-center smooth-button shadow-lg whitespace-nowrap">
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

export default CoursePage;