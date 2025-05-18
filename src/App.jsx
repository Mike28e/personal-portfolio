import { useState, useEffect } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
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
      <NavBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="pt-16">
        {/* Hero Section with staggered animations */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center"
        >
          <Home scrollToSection={scrollToSection} />
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
