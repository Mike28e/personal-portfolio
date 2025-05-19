/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { socials } from '../data/socials.jsx';
import GeometricParticlesBackground from './GeometricParticlesBackground';

export default function Home({ scrollToSection }) {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Add the geometric particles background - now with higher z-index */}
      <GeometricParticlesBackground />

      {/* Diagonal gradient overlay - reduced opacity to let particles show through */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-purple-900/80 to-black clip-[polygon(0_0,100%_0,100%_75%,0_100%)] opacity-80"></div>

      {/* Triangular accents */}
      <svg
        className="absolute top-10 right-0 w-48 h-48 text-sky-400 opacity-20"
        viewBox="0 0 100 100"
      >
        <polygon points="0,0 100,0 0,100" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-10 left-0 w-48 h-48 text-purple-500 opacity-20 rotate-180"
        viewBox="0 0 100 100"
      >
        <polygon points="0,0 100,0 0,100" fill="currentColor" />
      </svg>

      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-20">
        {/* Text Column */}
        <motion.div
          className="space-y-6 max-w-xl text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Hi, I'm
            <br />
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Clean, solid color text */}
              <motion.span
                className="text-slate-50 relative z-20"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Mike Elias
              </motion.span>

              {/* Subtle glow effect */}
              <motion.span
                className="absolute inset-0 text-violet-400 z-10 blur-sm opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Mike Elias
              </motion.span>
            </motion.div>{' '}
            {/* <motion.span
              className="inline-block text-5xl md:text-6xl"
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              👋
            </motion.span> */}
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            I build responsive, scalable web applications with clean code and
            solid architecture. Skilled in full-stack development, and quick to
            adapt to any tech stack.
          </p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-gradient-to-tr from-sky-500 to-purple-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition"
            >
              Explore Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border-2 border-sky-400 rounded-full text-sky-400 font-semibold hover:scale-105 transform transition"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div
            className="flex gap-6 justify-center md:justify-start mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                className="text-gray-400 hover:text-white transform hover:scale-125 transition"
                transition={{ duration: 0.3 }}
              >
                <social.Icon size={28} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Circle with Enhanced Glow Effect */}
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Glowing ring animation - enhanced glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-50 to-slate-50"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: 'calc(100% + 30px)',
              height: 'calc(100% + 30px)',
              top: -15,
              left: -15,
              filter: 'blur(20px)',
              zIndex: -1,
            }}
          />

          {/* Profile image */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 relative z-10 shadow-lg shadow-purple-500/20">
            <img
              src="/assets/images/mike_hs.jpeg"
              alt="Mike Elias Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
