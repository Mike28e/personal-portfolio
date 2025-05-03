import { useState, useEffect } from 'react';
import { Code, Github, Linkedin, Mail, Twitter, ExternalLink, Menu, X } from 'lucide-react';

export default function PortfolioHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    };

    window.addEventListener('scroll', handleScroll);
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

  // Handle contact form submission
  const handleSubmit = () => {
    console.log('Form submitted:', { contactName, contactEmail, contactMessage });
    alert('Thanks for your message! This would connect to a backend in a real application.');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900/95 z-50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-full w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Mike Elias</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink label="Home" section="home" active={activeSection} onClick={scrollToSection} />
              <NavLink label="About" section="about" active={activeSection} onClick={scrollToSection} />
              <NavLink label="Projects" section="projects" active={activeSection} onClick={scrollToSection} />
              <NavLink label="Contact" section="contact" active={activeSection} onClick={scrollToSection} />
              <a 
                href="#" 
                className="ml-4 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800">
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
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-3/5">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Hi, I'm <span className="text-sky-600">Mike Elias</span> 👋
                </h1>
                <h2 className="text-2xl md:text-3xl text-amber-300 mb-1">
                  Designer, Creator, and Problem Solver
                </h2>
                <h4 className="text-xl md:text-xl text-gray-300 mb-6">
                Upgrading the Past. Building the Future.
                </h4>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  I create beautiful, responsive web applications with modern technologies.
                  Specialized in React, Node.js, and full-stack development.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#contact" 
                    onClick={(e) => {e.preventDefault(); scrollToSection('contact')}}
                    className="px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-700 transition-colors font-medium"
                  >
                    Get in Touch
                  </a>
                  <a 
                    href="#projects"
                    onClick={(e) => {e.preventDefault(); scrollToSection('projects')}}
                    className="px-6 py-3 rounded-md border border-gray-700 hover:border-gray-500 transition-colors font-medium"
                  >
                    View My Work
                  </a>
                </div>
                <div className="flex gap-4 mt-8">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
              <div className="md:w-2/5 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-sky-600/30 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/400/400" 
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="About Me" subtitle="My background and skills" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div>
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
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">My Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCard title="Frontend" skills={["Vue", "Vuetify", "React", "Next.js", "TailwindCSS"]} />
                  <SkillCard title="Backend" skills={["Node.js", "C#", ".NET Core", "Kotlin", "Apache Beam"]} />
                  <SkillCard title="DevOps" skills={["GCP", "Terraform", "Docker", "AWS", "CI/CD", "Git"]} />
                  <SkillCard title="Design" skills={["UI/UX", "Responsive Design"]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="My Projects" subtitle="Recent work I've completed" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <ProjectCard 
                title="E-Commerce Platform"
                description="A full-stack e-commerce solution with cart, payments, and admin dashboard."
                tags={["React", "Node.js", "MongoDB"]}
                image="/api/placeholder/600/400"
              />
              <ProjectCard 
                title="Task Management App"
                description="Kanban-style task management with drag-and-drop functionality."
                tags={["Next.js", "TypeScript", "PostgreSQL"]}
                image="/api/placeholder/600/400"
              />
              <ProjectCard 
                title="Personal Finance Dashboard"
                description="Data visualization dashboard for tracking expenses and investments."
                tags={["React", "D3.js", "Firebase"]}
                image="/api/placeholder/600/400"
              />
              
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Get In Touch" subtitle="Let's work together" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Feel free to reach out for project inquiries, job opportunities,
                  or just to say hello. I'm always open to discussing new projects and ideas.
                </p>
                
                <div className="space-y-4">
                  <ContactItem icon={<Mail size={20} />} text="hello@placeholder.com" href="mailto:hello@placeholder.com" />
                  <ContactItem icon={<Github size={20} />} text="github.com/placeholder" href="https://github.com/placeholder" />
                  <ContactItem icon={<Linkedin size={20} />} text="linkedin.com/in/placeholder" href="https://linkedin.com/in/placeholder" />
                  <ContactItem icon={<Twitter size={20} />} text="@placeholder" href="https://twitter.com/placeholder" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                      placeholder="placeholder"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                      placeholder="placeholder@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="5"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-700 rounded-md transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for desktop navigation links
function NavLink({ label, section, active, onClick }) {
  return (
    <a 
      href={`#${section}`}
      onClick={(e) => {e.preventDefault(); onClick(section)}}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active === section ? 'text-sky-400' : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </a>
  );
}

// Component for mobile navigation links
function MobileNavLink({ label, section, active, onClick }) {
  return (
    <a 
      href={`#${section}`}
      onClick={(e) => {e.preventDefault(); onClick(section)}}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active === section 
          ? 'bg-gray-800 text-sky-400' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {label}
    </a>
  );
}

// Component for section headings
function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <p className="text-gray-400 mt-2">{subtitle}</p>
      <div className="w-24 h-1 bg-sky-600 mx-auto mt-4"></div>
    </div>
  );
}

// Component for skill cards
function SkillCard({ title, skills }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="text-lg font-medium mb-3 flex items-center">
        <Code size={18} className="mr-2 text-sky-400" />
        {title}
      </h4>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="text-gray-400 flex items-center">
            <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
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