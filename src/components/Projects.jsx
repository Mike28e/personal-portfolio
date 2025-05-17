import { Github } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Luxury Car Rental Site',
      description:
        'A luxury car rental platform with booking options, site analytics, and chatbot integration.',
      tags: ['Vue.js', 'Vuetify', 'Google Cloud'],
      image: '/assets/images/dycerentals.png',
      github: 'https://github.com/Mike28e/car-rental-site',
    },
    // {
    //   title: 'Portfolio Website',
    //   description:
    //     'A modern portfolio website built with React and Framer Motion for smooth animations.',
    //   tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    //   image: '/assets/images/portfolio.png',
    //   github: 'https://github.com/Mike28e/portfolio',
    // },
  ];

  // Component for project cards
  function ProjectCard({ title, description, tags, image, github }) {
    // Default image fallback
    const imgSrc = image || '/api/placeholder/400/320';

    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sky-900/20 h-full">
        <div className="h-48 overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a
              href={github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 flex items-center text-sm"
            >
              <Github size={16} className="mr-1" />
              Code
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          id={`project-${index}`}
          data-animate="true"
          initial={{ opacity: 0, y: 50 }}
          // animate={{ opacity: 1, y: 0 }} // This makes the component visible
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          whileHover={{ y: -10 }}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            github={project.github}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsSection;
