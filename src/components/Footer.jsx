import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  // Create a structured array of social links
  const socialLinks = [
    { icon: Github, href: "https://github.com/Mike28e", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/MikeElias1/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" }
  ];

  return (
    <motion.footer 
      className="bg-gray-950 py-8 border-t border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400">© 2025 Made by Mike Elias</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                aria-label={social.label}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;