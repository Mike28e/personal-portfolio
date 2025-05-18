/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Desktop nav link
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

// Mobile nav link
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

// Navbar component
export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) {
  const sections = ['home', 'about', 'experience', 'projects', 'contact'];

  return (
    <motion.nav
      className="fixed top-0 w-full bg-gray-900/95 z-50 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {sections.map((section, idx) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
              >
                <NavLink
                  label={section.charAt(0).toUpperCase() + section.slice(1)}
                  section={section}
                  active={activeSection}
                  onClick={scrollToSection}
                />
              </motion.div>
            ))}
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 border-b border-gray-800"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {sections.map((section) => (
              <MobileNavLink
                key={section}
                label={section.charAt(0).toUpperCase() + section.slice(1)}
                section={section}
                active={activeSection}
                onClick={scrollToSection}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
