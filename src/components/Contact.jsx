import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, useInView } from 'framer-motion';
import { sendEmail } from '../services/email';
import { socials } from '../data/socials';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [lastSent, setLastSent] = useState(null);
  const containerRef = React.useRef(null);

  const handleChange = (field) => (e) => {
    setFormState({ ...formState, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lastSent && Date.now() - lastSent < 10000) return;
    setIsSending(true);
    const response = await sendEmail({
      name: formState.name,
      email: formState.email,
      message: formState.message,
    });
    setIsSending(false);
    if (response.success) {
      setLastSent(Date.now());
      setFormState({ name: '', email: '', message: '' });
      alert('Message sent!');
    } else alert('Send failed.');
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Decorative rotated squares */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-600 opacity-10 transform rotate-45"></div>
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-purple-600 opacity-10 transform rotate-45"></div>

      <div
        ref={containerRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center"
      >
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Let's Connect
          </h2>
          <div className="mt-2 w-24 h-1 bg-gradient-to-tr from-sky-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <motion.div
            className="bg-gray-800 bg-opacity-60 p-8 rounded-2xl backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Contact Information
            </h3>
            <p className="text-gray-300 mb-6">
              I’m open to new opportunities and collaborations. Feel free to
              reach out via any platform below.
            </p>
            <div className="space-y-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <span className="mr-3 text-sky-500">
                    <social.Icon size={20} />
                  </span>
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gray-800 bg-opacity-60 p-8 rounded-2xl backdrop-blur-md shadow-lg flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <label className="mb-2 text-gray-300 font-medium">Name</label>
            <input
              type="text"
              value={formState.name}
              onChange={handleChange('name')}
              required
              className="mb-4 px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
            />

            <label className="mb-2 text-gray-300 font-medium">Email</label>
            <input
              type="email"
              value={formState.email}
              onChange={handleChange('email')}
              required
              className="mb-4 px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
            />

            <label className="mb-2 text-gray-300 font-medium">Message</label>
            <textarea
              rows={5}
              value={formState.message}
              onChange={handleChange('message')}
              required
              className="mb-6 px-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
            />

            <button
              type="submit"
              disabled={isSending}
              className="mt-auto px-6 py-3 bg-gradient-to-tr from-sky-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
