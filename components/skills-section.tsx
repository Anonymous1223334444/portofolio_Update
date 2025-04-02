"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLanguage } from "./language-context"

// Define skill categories
type SkillCategory =
  | "Language"
  | "Web Framework"
  | "JavaScript Library"
  | "React Framework"
  | "CSS Library"
  | "Design Tool"
  | "Design Language"
  | "Markup Language"
  | "IDE"
  | "Version Control"
  | "Operating System"
  | "Collection of libraries"
  | "Network Tool"
  | "Analytics Tool"
  | "AI Tool"
  | "Database"
  | "Business Tool"
  | "Cloud Platform"
  | "Security Tool"

// Define skill interface with additional details
interface Skill {
  name: string
  category: SkillCategory
  icon: string
  score: number // Score out of 10
  description: string
  experience: string
  projects?: string[]
}

// Skills data with icons, categories, and details
const skills: Skill[] = [
  // Languages
  {
    name: "JavaScript",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    score: 8.5,
    description: "Modern ES6+ JavaScript for both frontend and backend development.",
    experience: "5+ years of experience building interactive web applications.",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    score: 8,
    description: "Strongly typed programming language that builds on JavaScript.",
    experience: "3+ years using TypeScript for large-scale applications.",
  },
  {
    name: "Python",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    score: 9,
    description: "General-purpose programming language with applications in web development, data science, and AI.",
    experience: "4+ years of Python development across various domains.",
  },
  {
    name: "HTML",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    score: 9.5,
    description: "Standard markup language for documents designed to be displayed in a web browser.",
    experience: "6+ years of creating semantic and accessible HTML structures.",
  },
  {
    name: "CSS",
    category: "Design Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    score: 9,
    description: "Style sheet language used for describing the presentation of a document.",
    experience: "6+ years of styling web applications with CSS and preprocessors.",
  },
  {
    name: "Node.js",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    score: 8,
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
    experience: "4+ years building backend services and APIs with Node.js.",
  },
  {
    name: "Bash",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    score: 7,
    description: "Unix shell and command language for task automation.",
    experience: "3+ years of shell scripting for DevOps and automation tasks.",
  },
  {
    name: "MySQL",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    score: 8,
    description: "Open-source relational database management system.",
    experience: "4+ years designing and optimizing database schemas.",
  },
  {
    name: "R",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
    score: 6.5,
    description: "Programming language for statistical computing and graphics.",
    experience: "2+ years using R for data analysis and visualization.",
  },

  // Frameworks & Libraries
  {
    name: "React",
    category: "JavaScript Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    score: 9,
    description: "JavaScript library for building user interfaces.",
    experience: "4+ years building complex applications with React and its ecosystem.",
  },
  {
    name: "Next.js",
    category: "React Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    score: 8.5,
    description: "React framework for production with server-side rendering and static site generation.",
    experience: "3+ years developing full-stack applications with Next.js.",
  },
  {
    name: "Django",
    category: "Web Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    score: 8,
    description: "High-level Python web framework that encourages rapid development.",
    experience: "3+ years building robust backend systems with Django.",
  },
  {
    name: "Flask",
    category: "Web Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    score: 7.5,
    description: "Lightweight WSGI web application framework in Python.",
    experience: "2+ years creating APIs and microservices with Flask.",
  },
  {
    name: "Svelte",
    category: "Web Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    score: 6,
    description: "Radical new approach to building user interfaces.",
    experience: "1+ year experimenting with Svelte for interactive applications.",
  },
  {
    name: "jQuery",
    category: "JavaScript Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
    score: 7,
    description: "Fast, small, and feature-rich JavaScript library.",
    experience: "5+ years using jQuery for DOM manipulation and AJAX.",
  },
  {
    name: "Flutter",
    category: "Web Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    score: 7.5,
    description: "UI toolkit for building natively compiled applications.",
    experience: "2+ years developing cross-platform mobile applications.",
  },

  // CSS Libraries
  {
    name: "Tailwind CSS",
    category: "CSS Library",
    icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    score: 9,
    description: "Utility-first CSS framework for rapidly building custom designs.",
    experience: "3+ years building responsive interfaces with Tailwind CSS.",
  },
  {
    name: "Bootstrap",
    category: "CSS Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    score: 8,
    description: "Front-end framework for developing responsive and mobile-first websites.",
    experience: "5+ years creating responsive layouts with Bootstrap.",
  },

  // Tools & Services
  {
    name: "Firebase",
    category: "Collection of libraries",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    score: 8,
    description: "Platform for developing web and mobile applications.",
    experience: "3+ years using Firebase for authentication, databases, and hosting.",
  },
  {
    name: "Git",
    category: "Version Control",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    score: 9,
    description: "Distributed version control system for tracking changes in source code.",
    experience: "5+ years managing code with Git and GitHub workflows.",
  },
  {
    name: "VSCode",
    category: "IDE",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    score: 9.5,
    description: "Lightweight but powerful source code editor.",
    experience: "5+ years using VSCode as primary development environment.",
  },
  {
    name: "Figma",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    score: 7,
    description: "Cloud-based design tool for collaborative interface design.",
    experience: "2+ years designing and prototyping interfaces in Figma.",
  },
  {
    name: "Markdown",
    category: "Markup Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
    score: 9,
    description: "Lightweight markup language with plain-text formatting syntax.",
    experience: "5+ years writing documentation and content in Markdown.",
  },

  // Operating Systems
  {
    name: "Windows",
    category: "Operating System",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    score: 9,
    description: "Microsoft's operating system for personal computers.",
    experience: "10+ years of Windows administration and development.",
  },
  {
    name: "Linux",
    category: "Operating System",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    score: 8,
    description: "Family of open-source Unix-like operating systems.",
    experience: "5+ years working with various Linux distributions for development and servers.",
  },

  // Additional requested tools with proper icons
  {
    name: "Wireshark",
    category: "Network Tool",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/df/Wireshark_icon.svg",
    score: 7.5,
    description: "Network protocol analyzer for network troubleshooting and analysis.",
    experience: "2+ years analyzing network traffic and security testing.",
  },
  {
    name: "Packet Tracer",
    category: "Network Tool",
    icon: "https://upload.wikimedia.org/wikipedia/en/d/dc/Cisco_Packet_Tracer_Icon.png",
    score: 7,
    description: "Network simulation tool developed by Cisco Systems.",
    experience: "2+ years designing and testing network topologies.",
  },
  {
    name: "Google Colab",
    category: "AI Tool",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
    score: 8,
    description: "Free cloud service based on Jupyter Notebooks for machine learning education and research.",
    experience: "3+ years developing and training ML models in Colab.",
  },
  {
    name: "Google Analytics",
    category: "Analytics Tool",
    icon: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg",
    score: 7,
    description: "Web analytics service that tracks and reports website traffic.",
    experience: "3+ years tracking and analyzing user behavior on websites.",
  },

  // AI related
  {
    name: "Artificial Intelligence",
    category: "AI Tool",
    icon: "https://cdn-icons-png.flaticon.com/512/2103/2103652.png",
    score: 8,
    description: "Development of computer systems able to perform tasks that normally require human intelligence.",
    experience: "3+ years working with machine learning models and AI applications.",
  },
  // Additional requested skills
  {
    name: "GitHub",
    category: "Version Control",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    score: 8.5,
    description: "Web-based platform for version control and collaboration using Git.",
    experience: "5+ years managing repositories, pull requests, and collaborative development workflows.",
  },
  {
    name: "PHP",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    score: 7.5,
    description: "Popular general-purpose scripting language suited for web development.",
    experience: "3+ years developing dynamic web applications and content management systems.",
  },
  {
    name: "Odoo",
    category: "Business Tool",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Odoo_logo_rgb.svg",
    score: 7,
    description: "All-in-one business software including CRM, e-commerce, billing, accounting, and project management.",
    experience: "2+ years implementing and customizing Odoo modules for business solutions.",
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    score: 8,
    description: "Cross-platform document-oriented NoSQL database program.",
    experience: "3+ years designing and optimizing MongoDB databases for web applications.",
  },
  {
    name: "Kali Linux",
    category: "Operating System",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg",
    score: 7.5,
    description: "Debian-derived Linux distribution designed for digital forensics and penetration testing.",
    experience: "2+ years using Kali Linux for security assessments and penetration testing.",
  },
  {
    name: "AWS",
    category: "Cloud Platform",
    icon: "https://www.svgrepo.com/show/448299/aws.svg",
    score: 8,
    description:
      "Amazon's comprehensive and widely adopted cloud platform offering compute power, storage, and other services.",
    experience: "3+ years deploying and managing applications on AWS infrastructure.",
  },
  {
    name: "OpenAI API",
    category: "AI Tool",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    score: 7.5,
    description:
      "API for accessing OpenAI's powerful language models like GPT-4 for natural language processing tasks.",
    experience: "2+ years integrating AI capabilities into applications using OpenAI's models.",
  },
  {
    name: "Google Cloud",
    category: "Cloud Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    score: 7,
    description: "Suite of cloud computing services that runs on the same infrastructure that Google uses internally.",
    experience: "2+ years building and deploying applications on Google Cloud Platform.",
  },
  {
    name: "Burp Suite",
    category: "Security Tool",
    icon: "https://cdn4.iconfinder.com/data/icons/macaron-1/48/BurpSuite-512.png",
    score: 7,
    description: "Integrated platform for performing security testing of web applications.",
    experience: "2+ years conducting web application security assessments and vulnerability testing.",
  },
]

export default function SkillsSection() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill)
  }

  const closeDetails = () => {
    setSelectedSkill(null)
  }

  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-8">{isClient ? t("skills.title") : "Skills & Tools"}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-pointer transform hover:scale-105"
              onClick={() => handleSkillClick(skill)}
            >
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src={skill.icon || "/placeholder.svg"}
                  alt={`${skill.name} icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {isClient ? t(`skills.${skill.category.toLowerCase().replace(" ", "")}`) : skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetails}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10">
                    <img
                      src={selectedSkill.icon || "/placeholder.svg"}
                      alt={`${selectedSkill.name} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isClient
                        ? t(`skills.${selectedSkill.category.toLowerCase().replace(" ", "")}`)
                        : selectedSkill.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {isClient ? t("skills.proficiency") : "Proficiency"}
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{selectedSkill.score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedSkill.score / 10) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {isClient ? t("skills.description") : "Description"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedSkill.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {isClient ? t("skills.experience") : "Experience"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedSkill.experience}</p>
                </div>

                {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {isClient ? t("skills.relatedProjects") : "Related Projects"}
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                      {selectedSkill.projects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

