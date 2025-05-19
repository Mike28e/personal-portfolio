/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sections = ['home', 'about', 'experience', 'projects', 'contact'];

export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-lg bg-gradient-to-b from-black/60 to-black/20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo / Name always in DOM, just fade it out on home */}
            <motion.div
              className="text-2xl font-extrabold text-white"
              initial={false}
              animate={{ opacity: activeSection === 'home' ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              Mike Elias
            </motion.div>

            {/* Desktop links */}
            <div className="hidden md:flex space-x-8">
              {sections.map((sec) => (
                <motion.a
                  key={sec}
                  href={`#${sec}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sec);
                  }}
                  className="relative px-3 py-2 text-white font-medium"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: activeSection === sec ? 1 : 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  <motion.span
                    className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full"
                    layoutId="nav-underline"
                    initial={false}
                    animate={{ width: activeSection === sec ? '100%' : '0%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile hamburger */}
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-16 inset-x-0 bottom-0 bg-black/90 overflow-y-auto flex flex-col items-center pt-6 space-y-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'calc(100vh - 4rem)', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {sections.map((sec) => (
                <motion.a
                  key={sec}
                  href={`#${sec}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sec);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-6 py-3 text-lg font-semibold transition-colors ${
                    activeSection === sec ? 'text-sky-400' : 'text-gray-300'
                  }`}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
