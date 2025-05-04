import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Code, Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const [activeJob, setActiveJob] = useState("job1");
  
  const experiences = [
    {
      id: "job1",
      title: "Solutions Developer",
      company: "Ipsos",
      period: "2020 - Present",
      location: "Troy, MI - USA",
      website: "ipsos.com",
      websiteUrl: "https://www.ipsos.com/en-us",
      description: "",
      skills: ["DevOps", "CI/CD", "Git", "Vue.Js", "C#", "Apache Beam", "Kotlin", "GCP", "SQL Server"],
      logo: "/lifecoach-elevate-logo.png" 
    },
    {
      id: "job2",
      title: "Information Systems Manager",
      company: "RDA Group",
      period: "2019 - 2020",
      location: "Bloomfield Hills, MI - USA",
      website: "rdagroup.com",
      websiteUrl: "https://www.ipsos.com/en-us",
      description: "",
      skills: ["SQL Server", "Javascript", "Git", "SAS", "Python", "C#", ".NET Core", "VBA"],
      logo: "/saimon-logo.png" 
    },
    {
      id: "job3",
      title: "Senior Programmer Analyst",
      company: "RDA Group",
      period: "2019 - 2019",
      location: "Bloomfield Hills, MI - USA",
      website: "rdagroup.com",
      websiteUrl: "https://www.ipsos.com/en-us",
      description: "",
      skills: ["SQL Server", "Javascript", "Git", "SAS", "Python", "C#", ".NET Core", "VBA"],
      logo: "/saimon-logo.png" 
    },
    {
      id: "job4",
      title: "Programmer Analyst II",
      company: "RDA Group",
      period: "2018 - 2019",
      location: "Bloomfield Hills, MI - USA",
      website: "rdagroup.com",
      websiteUrl: "https://www.ipsos.com/en-us",
      description: "",
      skills: ["SQL Server", "SAS", "Python", "C#", ".NET Core", "VBA"],
      logo: "/saimon-logo.png" 
    },
    {
      id: "job5",
      title: "Programmer Analyst I",
      company: "RDA Group",
      period: "2017 - 2018",
      location: "Bloomfield Hills, MI - USA",
      website: "rdagroup.com",
      websiteUrl: "https://www.ipsos.com/en-us",
      description: "",
      skills: ["SQL Server", "SAS", "Python",  "VBA"],
      logo: "/saimon-logo.png" 
    },
    {
      id: "job6",
      title: "Programmer Internship",
      company: "RDA Group",
      period: "2016 - 2017",
      location: "Bloomfield Hills, MI - USA",
      website: "rdagroup.com",
      websiteUrl: "https://www.ipsos.com/en-us",
      description: "",
      skills: ["SQL Server", "SAS", "Python", "VBA"],
      logo: "/saimon-logo.png" 
    },
  
  ];

  return (
    <div className="w-full bg-black py-16">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Timeline navigation */}
          <div className="md:w-1/3">
            <h2 className="text-5xl font-bold text-white mb-10 relative">
              Experience
              <motion.div 
                className="absolute -bottom-3 left-0 h-1 w-16 bg-sky-600"
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </h2>
            
            <div className="space-y-4">
              {experiences.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveJob(job.id)}
                  className={`border-l-4 pl-4 py-3 cursor-pointer transition-all duration-300 ${
                    activeJob === job.id 
                      ? "border-sky-600 text-white" 
                      : "border-gray-700 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className={activeJob === job.id ? "text-sky-600" : "text-gray-500"} />
                    <h3 className="font-medium">{job.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Calendar size={14} />
                    <span>{job.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right side - Job details */}
          <div className="md:w-2/3 relative">
            <AnimatePresence mode="wait">
              {experiences.map((job) => {
                if (job.id !== activeJob) return null;
                
                return (
                  <motion.div
                    key={job.id}
                    className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-600" />
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{job.title}</h3>
                          <div className="flex items-center text-sky-600 text-lg">
                            @ {job.company}
                          </div>
                        </div>
                        
                        {job.logo && (
                          <div className="flex items-center">
                            <img 
                              src={job.logo} 
                              alt={`${job.company} logo`} 
                              className="h-12 w-auto" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Job details */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-sky-600" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-300">
                          <ExternalLink size={16} className="text-sky-600" />
                          <a href={job.websiteUrl}>{job.website}</a>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar size={16} className="text-sky-600" />
                          <span>{job.period}</span>
                        </div>
                      </div>
                      
                      <div className="text-gray-300 mb-6 leading-relaxed">
                        {job.description}
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3 text-gray-200">
                          <Code size={18} className="text-sky-600" />
                          <span className="font-medium">Technologies & Skills</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-md text-sm hover:bg-sky-900/30 hover:border-sky-700/40 hover:text-white transition-colors duration-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceSection;