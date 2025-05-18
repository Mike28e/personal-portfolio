/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Mike28e', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/MikeElias1/',
      label: 'LinkedIn',
    },
    { icon: Mail, href: 'mailto:hello@placeholder.com', label: 'Email' },
    { icon: Twitter, href: 'https://twitter.com/yourhandle', label: 'Twitter' },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black pt-20 pb-8 overflow-hidden">
      {/* SVG Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.32C207.82,72.63,103.91,94.69,0,112V0H1200V27.35c-105.21,15.2-210.43,39-315.66,60.42C741.89,113,643.08,133,545,125.17c-130.64-10.83-227.23-60.79-358.07-68.85C529.62,46.46,384.71,32,321.39,56.32Z"
            className="fill-gray-900"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-gray-400">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Made with ♥ by Mike Elias
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={i}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs"
        >
          <p>Built with React, TailwindCSS & Framer Motion.</p>
        </motion.div>
      </div>
    </footer>
  );
}
