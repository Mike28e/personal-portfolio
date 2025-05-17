import { useState, useEffect } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function PortfolioHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [isVisible, setIsVisible] = useState({});
  // Handle scroll to update active section and trigger animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Track active section for navigation
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height
        ) {
          setActiveSection(section);
          break;
        }
      }

      // Check visibility for animation triggers
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementId = element.getAttribute('id');

        // Element is visible if it's in the viewport
        if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
          setIsVisible((prev) => ({ ...prev, [elementId]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger initial check
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section when nav link is clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Navbar with slide-down animation */}
      <motion.nav
        className="fixed top-0 w-full bg-gray-900/95 z-50 backdrop-blur-sm border-b border-gray-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-full w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.span
                className="text-xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Mike Elias
              </motion.span>
            </div>

            {/* Desktop Navigation with staggered animation */}
            <div className="hidden md:flex items-center space-x-4">
              {['home', 'about', 'experience', 'projects', 'contact'].map(
                (section, index) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <NavLink
                      label={section.charAt(0).toUpperCase() + section.slice(1)}
                      section={section}
                      active={activeSection}
                      onClick={scrollToSection}
                    />
                  </motion.div>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu with slide-down animation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 border-b border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink
                label="Home"
                section="home"
                active={activeSection}
                onClick={scrollToSection}
              />
              <MobileNavLink
                label="About"
                section="about"
                active={activeSection}
                onClick={scrollToSection}
              />
              <MobileNavLink
                label="Experience"
                section="experience"
                active={activeSection}
                onClick={scrollToSection}
              />
              <MobileNavLink
                label="Projects"
                section="projects"
                active={activeSection}
                onClick={scrollToSection}
              />
              <MobileNavLink
                label="Contact"
                section="contact"
                active={activeSection}
                onClick={scrollToSection}
              />
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main className="pt-16">
        {/* Hero Section with staggered animations */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-3/5">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Hi, I'm{' '}
                  <motion.span
                    className="text-sky-600"
                    initial={{ color: '#ffffff' }}
                    animate={{ color: '#0284c7' }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    Mike Elias
                  </motion.span>{' '}
                  👋
                </motion.h1>
                <motion.h2
                  className="text-2xl md:text-3xl text-amber-300 mb-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Designer, Creator, and Problem Solver
                </motion.h2>
                <motion.h4
                  className="text-xl md:text-xl text-gray-300 mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Upgrading the Past. Building the Future.
                </motion.h4>
                <motion.p
                  className="text-lg text-gray-400 mb-8 leading-relaxed"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  I build responsive, scalable web applications with clean code
                  and solid architecture. Skilled in full-stack development, and
                  quick to adapt to any tech stack.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.a>
                  <motion.a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('projects');
                    }}
                    className="px-6 py-3 rounded-md border border-gray-700 hover:border-gray-500 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.a>
                </motion.div>
                <motion.div
                  className="flex gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  {[Github, Linkedin, Mail].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
              <div className="md:w-2/5 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    scale: { type: 'spring', stiffness: 100, damping: 15 },
                  }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-sky-600/30 relative overflow-hidden">
                    <img
                      src="/assets/images/mike_hs.jpeg"
                      alt="Profile"
                      className="absolute inset-0 w-full h-full object-cover brightness-85"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section with scroll animations */}
        <section id="about" className="py-20 bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              id="about-heading"
              data-animate="true"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible['about-heading'] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="About Me"
                subtitle="My background and skills"
              />
            </motion.div>

            <About />
          </div>
        </section>

        {/* Experience Section with scroll animations */}
        <section id="experience" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              id="experience-heading"
              data-animate="true"
              initial={{ opacity: 0, y: 50 }}
              animate={
                isVisible['experience-heading'] ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="My Experience" subtitle="" />
            </motion.div>

            <Experience />
          </div>
        </section>

        {/* Projects Section with scroll animations */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              id="projects-heading"
              data-animate="true"
              initial={{ opacity: 0, y: 50 }}
              animate={
                isVisible['projects-heading'] ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="My Projects"
                subtitle="Some of my recent work"
              />
            </motion.div>

            {/* Make sure you're actually rendering the component */}
            <Projects />
          </div>
        </section>

        {/* Contact Section with scroll animations */}
        <section id="contact" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              id="contact-heading"
              data-animate="true"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible['contact-heading'] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Get In Touch"
                subtitle="Let's work together"
              />
            </motion.div>

            <Contact />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Component for desktop navigation links
function NavLink({ label, section, active, onClick }) {
  return (
    <motion.a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(section);
      }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active === section ? 'text-sky-400' : 'text-gray-300 hover:text-white'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
}

// Component for mobile navigation links
function MobileNavLink({ label, section, active, onClick }) {
  return (
    <motion.a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(section);
      }}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active === section
          ? 'bg-gray-800 text-sky-400'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
}

// Component for section headings
function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <p className="text-gray-400 mt-2">{subtitle}</p>
      <motion.div
        className="w-24 h-1 bg-sky-600 mx-auto mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }} // 24 * 4 = 96px
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      ></motion.div>
    </div>
  );
}
