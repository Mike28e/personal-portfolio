/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects.jsx';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Decorative grid accents */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-5">
        <div className="col-span-2 row-span-2 bg-sky-600 rounded-lg animate-pulse"></div>
        <div className="col-start-4 col-span-3 row-start-3 row-span-3 bg-purple-600 rounded-lg animate-pulse delay-200"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Projects
          </h2>
          <p className="text-gray-400 mt-2">
            Showcasing some of my favorite builds
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 items-stretch">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="group h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gray-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl h-full flex flex-col">
                {/* Image with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        <Github size={16} className="mr-1" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
