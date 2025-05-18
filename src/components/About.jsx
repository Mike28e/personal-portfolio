/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Code } from 'lucide-react';
import aboutAnim from '../animations/brain.json';

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['Vue', 'Vuetify', 'React', 'Next.js', 'TailwindCSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'C#', '.NET Core', 'Kotlin', 'Apache Beam'],
  },
  {
    title: 'DevOps',
    skills: ['GCP', 'Terraform', 'Docker', 'AWS', 'CI/CD', 'Git'],
  },
  { title: 'Design', skills: ['UI/UX', 'Responsive Design'] },
];

export default function About() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-black overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-sky-600 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-600 opacity-20 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Text and Animation Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-12">
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Who I Am
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm a full-stack developer who specializes in modernizing legacy
              systems and engineering scalable applications. I bring deep
              experience working with large datasets and complex architectures,
              particularly with SQL Server.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              From data-heavy backends to sleek frontends, I build full
              applications from the ground up that are fast, maintainable, and
              built to last.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you can find me hiking mountains, reading
              sci-fi novels, or experimenting with new cooking recipes.
            </p>
          </motion.div>

          <motion.div
            className="md:w-1/3 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Lottie
              animationData={aboutAnim}
              loop
              autoplay
              className="w-64 h-64 md:w-80 md:h-80"
            />
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gradient-to-tr from-sky-500 to-purple-500 rounded-full">
                  <Code size={20} className="text-white" />
                </div>
                <h4 className="ml-3 text-xl font-semibold text-white">
                  {group.title}
                </h4>
              </div>
              <ul className="space-y-2">
                {group.skills.map((skill, i2) => (
                  <motion.li
                    key={i2}
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3, delay: 0.1 * i2 }}
                  >
                    <span className="w-2 h-2 bg-gradient-to-tr from-sky-500 to-purple-500 rounded-full mr-2"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
