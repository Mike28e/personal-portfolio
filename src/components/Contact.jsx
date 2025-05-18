/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { sendEmail } from '.././services/email';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  // const [isVisible] = useState({});

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(null);
  const HONEYPOT_FIELD_NAME = 'phone';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // 🐝 1. Honeypot check — if filled, it's likely a bot
    const honeypotValue = form[HONEYPOT_FIELD_NAME]?.value;
    if (honeypotValue) {
      console.log('Spam bot detected. Submission blocked.');
      return;
    }

    // 🚫 2. Rate limit — block if sent within 10 seconds
    const now = Date.now();
    if (lastSentTime && now - lastSentTime < 10000) {
      alert('Please wait a few seconds before trying again.');
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

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-8 mt-12">
      <motion.div
        className="w-full"
        id="contact-info"
        data-animate="true"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Feel free to reach out for project inquiries, job opportunities, or
          just to say hello. I'm always open to discussing new projects and
          ideas.
        </p>

        <div className="space-y-4">
          {[
            {
              icon: <Mail size={20} />,
              text: 'hello@placeholder.com',
              href: 'mailto:hello@placeholder.com',
            },
            {
              icon: <Github size={20} />,
              text: 'Github.com/Mike28e',
              href: 'https://github.com/Mike28e',
            },
            {
              icon: <Linkedin size={20} />,
              text: 'LinkedIn.com/in/MikeElias1',
              href: 'https://www.linkedin.com/in/MikeElias1',
            },
          ].map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
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
        className="w-full"
        id="contact-form"
        data-animate="true"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
        <div className="space-y-4">
          {[
            {
              id: 'name',
              label: 'Name',
              type: 'text',
              value: contactName,
              onChange: setContactName,
              placeholder: 'Your Name',
            },
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              value: contactEmail,
              onChange: setContactEmail,
              placeholder: 'YourEmail@example.com',
            },
          ].map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {field.label}
              </label>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Message
            </label>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
