import React, { useRef, useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

// Imported experience data
const experiences = [
  {
    id: 'job1',
    title: 'Solutions Developer',
    company: 'Ipsos',
    period: '2020 - Present',
    location: 'Troy, MI - USA',
    website: 'ipsos.com',
    websiteUrl: 'https://www.ipsos.com/en-us',
    description: `Led the modernization initiative to replace legacy systems with a scalable, cloud-based solution that improved data processing efficiency by 70%.`,
    skills: [
      'DevOps',
      'CI/CD',
      'Git',
      'Vue.js',
      'C#',
      'Apache Beam',
      'Kotlin',
      'GCP',
      'SQL Server',
    ],
    logo: '/lifecoach-elevate-logo.png',
  },
  {
    id: 'job2',
    title: 'Information Systems Manager',
    company: 'RDA Group',
    period: '2019 - 2020',
    location: 'Bloomfield Hills, MI - USA',
    website: 'rdagroup.com',
    websiteUrl: 'https://www.rdagroup.com',
    description: `Successfully managed a data processing team serving major automotive clients including Nissan, Ford, GM, and FCA.`,
    skills: [
      'SQL Server',
      'JavaScript',
      'Git',
      'SAS',
      'Python',
      'C#',
      '.NET Core',
      'VBA',
    ],
    logo: '/saimon-logo.png',
  },
  {
    id: 'job3',
    title: 'Senior Programmer Analyst',
    company: 'RDA Group',
    period: '2019 - 2019',
    location: 'Bloomfield Hills, MI - USA',
    website: 'rdagroup.com',
    websiteUrl: 'https://www.rdagroup.com',
    description: `Migrated legacy data processing from SAS to SQL, reducing department hours by 50%.`,
    skills: [
      'SQL Server',
      'JavaScript',
      'Git',
      'SAS',
      'Python',
      'C#',
      '.NET Core',
      'VBA',
    ],
    logo: '/saimon-logo.png',
  },
  {
    id: 'job4',
    title: 'Programmer Analyst II',
    company: 'RDA Group',
    period: '2018 - 2019',
    location: 'Bloomfield Hills, MI - USA',
    website: 'rdagroup.com',
    websiteUrl: 'https://www.rdagroup.com',
    description: `Optimized database performance for client-facing web applications, reducing query times by 40%.`,
    skills: ['SQL Server', 'SAS', 'Python', 'C#', '.NET Core', 'VBA'],
    logo: '/saimon-logo.png',
  },
  {
    id: 'job5',
    title: 'Programmer Analyst I',
    company: 'RDA Group',
    period: '2017 - 2018',
    location: 'Bloomfield Hills, MI - USA',
    website: 'rdagroup.com',
    websiteUrl: 'https://www.rdagroup.com',
    description: `Processed and analyzed large datasets using SAS, VB6, and SQL to support weekly client deliverables while collaborating with project teams to implement custom reporting solutions.`,
    skills: ['SQL Server', 'SAS', 'Python', 'VBA'],
    logo: '/saimon-logo.png',
  },
  {
    id: 'job6',
    title: 'Programmer Internship',
    company: 'RDA Group',
    period: '2016 - 2017',
    location: 'Bloomfield Hills, MI - USA',
    website: 'rdagroup.com',
    websiteUrl: 'https://www.rdagroup.com',
    description: `Optimized email campaign performance for automotive customer feedback initiatives.`,
    skills: ['SQL Server', 'SAS', 'Python', 'VBA'],
    logo: '/saimon-logo.png',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState(null);

  const perPage = 3;
  const total = experiences.length;
  const visible = experiences.slice(startIndex, startIndex + perPage);

  const scrollNext = () => {
    if (startIndex + perPage < total && !isScrolling) {
      setIsScrolling(true);
      setDirection('down');
      setTimeout(() => {
        setStartIndex((i) => i + 1);
        setTimeout(() => setIsScrolling(false), 300);
      }, 50);
    }
  };
  const scrollPrev = () => {
    if (startIndex > 0 && !isScrolling) {
      setIsScrolling(true);
      setDirection('up');
      setTimeout(() => {
        setStartIndex((i) => i - 1);
        setTimeout(() => setIsScrolling(false), 300);
      }, 50);
    }
  };

  const JobCard = ({ job }) => (
    <div className="mb-12 pl-12 relative">
      <div className="absolute left-0 top-2 w-8 h-8 bg-gradient-to-tr from-sky-500 to-purple-500 rounded-full flex items-center justify-center">
        <Briefcase size={20} className="text-white" />
      </div>
      <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold text-white mr-2">{job.title}</h3>
          <span className="text-gray-400 text-sm">{job.period}</span>
        </div>
        <p className="text-gray-300 mb-2 leading-relaxed">{job.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span>@ {job.company}</span>
          <a href={job.websiteUrl} className="hover:text-white">
            {job.website}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="experience"
      className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background accent hexagon */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-purple-800 opacity-10 clip-hexagon" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Journey
          </h2>
          <p className="text-gray-400 mt-2">
            A timeline of roles and experiences
          </p>
        </motion.div>

        {/* Up Arrow */}
        {startIndex > 0 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={scrollPrev}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <ChevronUp size={24} className="text-white" />
            </button>
          </div>
        )}

        {/* Animated Viewport */}
        <div
          ref={ref}
          className="overflow-auto md:overflow-hidden md:h-[650px]"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((job) => (
              <motion.div
                key={`${job.id}-${startIndex}`}
                initial={{
                  opacity: 0,
                  y: direction === 'down' ? 100 : direction === 'up' ? -100 : 0,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: direction === 'down' ? -100 : direction === 'up' ? 100 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Down Arrow */}
        {startIndex + perPage < total && (
          <div className="flex justify-center mt-4">
            <button
              onClick={scrollNext}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <ChevronDown size={24} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
