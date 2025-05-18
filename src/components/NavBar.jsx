/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sections = ['home', 'about', 'experience', 'projects', 'contact'];

// Desktop NavLink with animated underline
function NavLink({ label, section, active, onClick }) {
  return (
    <motion.a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(section);
      }}
      className="relative px-3 py-2 text-white font-medium"
      initial={{ opacity: 0.7 }}
      animate={{ opacity: active === section ? 1 : 0.7 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {label}
      <motion.span
        className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full"
        layoutId="nav-underline"
        initial={false}
        animate={{ width: active === section ? '100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </motion.a>
  );
}

// Mobile NavLink
function MobileNavLink({ label, section, active, onClick }) {
  return (
    <motion.a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(section);
      }}
      className={`block px-6 py-3 text-lg font-semibold transition-colors ${
        active === section ? 'text-sky-400' : 'text-gray-300'
      }`}
      whileHover={{ x: 10 }}
      transition={{ duration: 0.3 }}
    >
      {label}
    </motion.a>
  );
}

// Navbar
export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Backdrop and gradient bar */}
      <div className="backdrop-blur-lg bg-gradient-to-b from-black/60 to-black/20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="text-2xl font-extrabold text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Mike Elias
            </motion.div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              {sections.map((sec) => (
                <NavLink
                  key={sec}
                  label={sec.charAt(0).toUpperCase() + sec.slice(1)}
                  section={sec}
                  active={activeSection}
                  onClick={scrollToSection}
                />
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile overlay menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute inset-0 bg-black/90 flex flex-col items-center justify-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sections.map((sec) => (
              <MobileNavLink
                key={sec}
                label={sec.charAt(0).toUpperCase() + sec.slice(1)}
                section={sec}
                active={activeSection}
                onClick={scrollToSection}
              />
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
