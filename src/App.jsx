import { useState, useEffect } from 'react';
import * as motion from "motion/react-client";
import { Code, Github, Linkedin, Mail, Twitter, ExternalLink, Menu, X } from 'lucide-react';
import { sendEmail } from './services/email';

export default function PortfolioHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isVisible, setIsVisible] = useState({});

  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(null);
  const HONEYPOT_FIELD_NAME = "phone";

  // Handle scroll to update active section and trigger animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      // Track active section for navigation
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
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
          setIsVisible(prev => ({...prev, [elementId]: true}));
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
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // 🐝 1. Honeypot check — if filled, it's likely a bot
    const honeypotValue = form[HONEYPOT_FIELD_NAME]?.value;
    if (honeypotValue) {
      console.log("Spam bot detected. Submission blocked.");
      return;
    }

    // 🚫 2. Rate limit — block if sent within 10 seconds
    const now = Date.now();
    if (lastSentTime && now - lastSentTime < 10000) {
      alert("Please wait a few seconds before trying again.");
      return;
    }

    if (isSending) return;
    setIsSending(true);

    const response = await sendEmail({
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });

    if (response.success) {
      alert('Thanks for your message!');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setLastSentTime(now); // ⏱ Update rate limit timer
    } else {
      alert('Failed to send message. Please try again later.');
    }

    setIsSending(false);
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
              {['home', 'about', 'projects', 'contact'].map((section, index) => (
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
              ))}
              <motion.a 
                href="#" 
                className="ml-4 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
              >
                Resume
              </motion.a>
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
              <MobileNavLink label="Home" section="home" active={activeSection} onClick={scrollToSection} />
              <MobileNavLink label="About" section="about" active={activeSection} onClick={scrollToSection} />
              <MobileNavLink label="Projects" section="projects" active={activeSection} onClick={scrollToSection} />
              <MobileNavLink label="Contact" section="contact" active={activeSection} onClick={scrollToSection} />
              <a 
                href="#" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 hover:bg-sky-700 transition-colors mt-4"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main className="pt-16">
        {/* Hero Section with staggered animations */}
        <section id="home" className="min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-3/5">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Hi, I'm <motion.span 
                    className="text-sky-600"
                    initial={{ color: '#ffffff' }}
                    animate={{ color: '#0284c7' }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    Mike Elias
                  </motion.span> 👋
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
                  I create beautiful, responsive web applications with modern technologies.
                  Specialized in React, Node.js, and full-stack development.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <motion.a 
                    href="#contact" 
                    onClick={(e) => {e.preventDefault(); scrollToSection('contact')}}
                    className="px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.a>
                  <motion.a 
                    href="#projects"
                    onClick={(e) => {e.preventDefault(); scrollToSection('projects')}}
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
                  {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
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
                    scale: { type: "spring", stiffness: 100, damping: 15 }
                  }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-sky-600/30 relative overflow-hidden">
                    <img 
                      src="/api/placeholder/400/400" 
                      alt="Profile"
                      className="absolute inset-0 w-full h-full object-cover"
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
              animate={isVisible["about-heading"] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="About Me" subtitle="My background and skills" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <motion.div
                id="about-text"
                data-animate="true"
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible["about-text"] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  I'm a forward-thinking developer with 8+ years of experience designing and implementing scalable solutions 
                  across full-stack environments. Proven track record of modernizing legacy systems and automating critical 
                  business processes. Adept at balancing independent work with collaborative team efforts to achieve 
                  organizational objectives.
                </p>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  My journey in tech started when I built my first website at 16. Since then,
                  I've powered through various legacy systems in an effort to modernize and explored the various 
                  methods of doing so. 
                </p>
                <p className="text-gray-400 leading-relaxed">
                  When I'm not coding, you can find me hiking mountains, reading sci-fi novels,
                  or experimenting with new cooking recipes.
                </p>
              </motion.div>
              <motion.div
                id="about-skills"
                data-animate="true"
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible["about-skills"] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">My Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Frontend", skills: ["Vue", "Vuetify", "React", "Next.js", "TailwindCSS"] },
                    { title: "Backend", skills: ["Node.js", "C#", ".NET Core", "Kotlin", "Apache Beam"] },
                    { title: "DevOps", skills: ["GCP", "Terraform", "Docker", "AWS", "CI/CD", "Git"] },
                    { title: "Design", skills: ["UI/UX", "Responsive Design"] }
                  ].map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible["about-skills"] ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <SkillCard 
                        title={skillGroup.title} 
                        skills={skillGroup.skills} 
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section with scroll animations */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              id="projects-heading"
              data-animate="true"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible["projects-heading"] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="My Projects" subtitle="Recent work I've completed" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "E-Commerce Platform",
                  description: "A full-stack e-commerce solution with cart, payments, and admin dashboard.",
                  tags: ["React", "Node.js", "MongoDB"],
                  image: "/api/placeholder/600/400"
                },
                {
                  title: "Task Management App",
                  description: "Kanban-style task management with drag-and-drop functionality.",
                  tags: ["Next.js", "TypeScript", "PostgreSQL"],
                  image: "/api/placeholder/600/400"
                },
                {
                  title: "Personal Finance Dashboard",
                  description: "Data visualization dashboard for tracking expenses and investments.",
                  tags: ["React", "D3.js", "Firebase"],
                  image: "/api/placeholder/600/400"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  id={`project-${index}`}
                  data-animate="true"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible[`project-${index}`] ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ y: -10 }}
                >
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with scroll animations */}
        <section id="contact" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              id="contact-heading"
              data-animate="true"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible["contact-heading"] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="Get In Touch" subtitle="Let's work together" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <motion.div
                id="contact-info"
                data-animate="true"
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible["contact-info"] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Feel free to reach out for project inquiries, job opportunities,
                  or just to say hello. I'm always open to discussing new projects and ideas.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: <Mail size={20} />, text: "hello@placeholder.com", href: "mailto:hello@placeholder.com" },
                    { icon: <Github size={20} />, text: "github.com/placeholder", href: "https://github.com/placeholder" },
                    { icon: <Linkedin size={20} />, text: "linkedin.com/in/placeholder", href: "https://linkedin.com/in/placeholder" },
                    { icon: <Twitter size={20} />, text: "@placeholder", href: "https://twitter.com/placeholder" }
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isVisible["contact-info"] ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                    >
                      <ContactItem 
                        icon={contact.icon} 
                        text={contact.text} 
                        href={contact.href} 
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                id="contact-form"
                data-animate="true"
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible["contact-form"] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
                <div className="space-y-4">
                  {[
                    { 
                      id: "name", 
                      label: "Name", 
                      type: "text", 
                      value: contactName, 
                      onChange: setContactName, 
                      placeholder: "placeholder" 
                    },
                    { 
                      id: "email", 
                      label: "Email", 
                      type: "email", 
                      value: contactEmail, 
                      onChange: setContactEmail, 
                      placeholder: "placeholder@example.com" 
                    }
                  ].map((field, index) => (
                    <motion.div 
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible["contact-form"] ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-400 mb-1">{field.label}</label>
                      <input 
                        type={field.type} 
                        id={field.id} 
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                        placeholder={field.placeholder}
                      />
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible["contact-form"] ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="5"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                      placeholder="Your message here..."
                    ></textarea>
                  </motion.div>
                  <input 
                    type="text" 
                    name={HONEYPOT_FIELD_NAME} 
                    autoComplete="off"
                    className="hidden" 
                    tabIndex="-1"
                  />
                  <motion.button 
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-700 rounded-md transition-colors font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible["contact-form"] ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with fade-in animation */}
      <motion.footer 
        className="bg-gray-950 py-8 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">© {new Date().getFullYear()} Mike Elias. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

// Component for desktop navigation links
function NavLink({ label, section, active, onClick }) {
  return (
    <motion.a 
      href={`#${section}`}
      onClick={(e) => {e.preventDefault(); onClick(section)}}
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
      onClick={(e) => {e.preventDefault(); onClick(section)}}
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

// Component for skill cards
function SkillCard({ title, skills }) {
  return (
    <motion.div 
      className="bg-gray-800 p-4 rounded-lg"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      transition={{ duration: 0.2 }}
    >
      <h4 className="text-lg font-medium mb-3 flex items-center">
        <Code size={18} className="mr-2 text-sky-400" />
        {title}
      </h4>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li 
            key={index} 
            className="text-gray-400 flex items-center"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// Component for project cards
function ProjectCard({ title, description, tags, image }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 rounded-md text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a href="#" className="text-sky-400 hover:text-sky-300 flex items-center text-sm">
            <Github size={16} className="mr-1" />
            Code
          </a>
          <a href="#" className="text-sky-400 hover:text-sky-300 flex items-center text-sm">
            <ExternalLink size={16} className="mr-1" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

// Component for contact items
function ContactItem({ icon, text, href }) {
  return (
    <a 
      href={href} 
      className="flex items-center text-gray-400 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="mr-3 text-sky-400">{icon}</span>
      {text}
    </a>
  );
}