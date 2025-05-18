/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function HomeSection({ scrollToSection }) {
  return (
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
            I build responsive, scalable web applications with clean code and
            solid architecture. Skilled in full-stack development, and quick to
            adapt to any tech stack.
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
  );
}
