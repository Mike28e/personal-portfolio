/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

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
  {
    title: 'Design',
    skills: ['UI/UX', 'Responsive Design'],
  },
];

export default function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
      {/* About Text */}
      <motion.div
        id="about-text"
        data-animate="true"
        className="space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
        <p className="text-gray-400 leading-relaxed">
          I'm a full-stack developer who specializes in modernizing legacy
          systems and engineering scalable applications. I bring deep experience
          working with large datasets and complex architectures, particularly
          with SQL Server. From data-heavy backends to sleek frontends, I build
          full applications from the ground up that are fast, maintainable, and
          built to last.
        </p>
        <p className="text-gray-400 leading-relaxed">
          My passion for tech has always driven my career. I’m continuously
          evolving my skills to solve complex problems, whether it's working
          with large datasets or crafting user-friendly, scalable applications.
        </p>
        <p className="text-gray-400 leading-relaxed">
          When I'm not coding, you can find me hiking mountains, reading sci-fi
          novels, or experimenting with new cooking recipes.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        id="about-skills"
        data-animate="true"
        className="space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">My Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-3 flex items-center">
                  <Code size={18} className="mr-2 text-sky-400" />
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.skills.map((skill, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.3, delay: 0.1 * idx }}
                    >
                      <span className="w-2 h-2 bg-sky-600 rounded-full mr-2" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
