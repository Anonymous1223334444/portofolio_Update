"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import Image from "next/image"
import { CustomCursor } from "@/components/custom-cursor"
import { AudioPlayer } from "@/components/audio-player"
import { NavBar } from "@/components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/components/audio-context"
import { ProjectCard } from "@/components/project-card"
import { AboutSection } from "@/components/about-section"
import { HeroSection } from "./hero-section"
import { RagChat } from "@/components/rag-chat"
import SkillsSection from "./skills-section"
import { useLanguage } from "./language-context"

// Projects Section
const projects = [
  {
    id: 1,
    title: "Django Application Development - User Registration Email Validation System",
    description:
      "Developed and deployed with docker a Django-based application focused on user registration and email validation. Integrated JavaScript for enhanced user experience and real-time validation. Collaborated with a cross-functional team to ensure the application met project goals and deadlines.",
    imageSrc: "/images/dashboard.PNG",
    technologies: [
      { name: "Django", color: "#012E90" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "AWS", color: "#F1DF7E" },
      { name: "Heroku", color: "#B1DF7E" },
      { name: "Docker", color: "#2496ED" },
    ],
    caseStudyLink: "https://django-dashboard-docker-2d6c094b404f.herokuapp.com/authentication/login?next=/",
    githubLink: "https://github.com/Anonymous1223334444/django_dashboard.git",
  },
  {
    id: 2,
    title: "Waxma - Chatbot",
    description:
      "Pioneering a New Paradigm in Geospatial Data Management to Deliver Precise and Accessible Mapping for All.",
    imageSrc: "/images/waxma.png",
    technologies: [
      { name: "RAG", color: "#3776AB" },
      { name: "NLP", color: "#38B2AC" },
      { name: "NextJS", color: "#92B8AC" },
      { name: "OpenStreetMap", color: "#31B2FC" },
      { name: "OpenData", color: "#98B2BC" },
      { name: "Earth Engine", color: "#28E2BC" },
      { name: "HuggingFace", color: "#21B2FC" },
    ],
    caseStudyLink: "https://www.youtube.com/watch?v=bbsVHL0oA8M",
    githubLink: "https://github.com/Anonymous1223334444/waxma.git",
  },
  {
    id: 3,
    title: "AI Model for Sign Language Recognition - Flutter App Integration",
    description:
      "Trained an AI model to recognize sign language gestures from images. Integrated the model into a Flutter app, enabling real-time gesture recognition and user interaction. Conducted extensive testing and optimization to improve model accuracy and performance.",
    imageSrc: "/images/decrypt.png",
    technologies: [
      { name: "Yolov5", color: "#CF9F00" },
      { name: "Flutter", color: "#02569B" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "Python", color: "#3776AB" },
    ],
    caseStudyLink: "https://not-deployed-yet.vercel.app/",
    githubLink: "https://github.com/Anonymous1223334444/decryptage_de_geste.git",
  },
  {
    id: 4,
    title: "Portofolio",
    description:
      "This website describe all the project that I have worked on even though all of them didn't appear here.",
    imageSrc: "/images/portofolio1.PNG",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Github", color: "#9118C6" },
      { name: "Netlify", color: "#9999A9" },
    ],
    caseStudyLink: "https://andresarr.netlify.app/",
    githubLink: "https://github.com/Anonymous1223334444/portofolio.git",
  },
  {
    id: 5,
    title: "E-Learning Platform",
    description:
      "E-Learning Platform created with PHP and in which I experiment the api stripe checkout as payment gateway.",
    imageSrc: "/images/e-learning.PNG",
    technologies: [
      { name: "PHP", color: "#777BB4" },
      { name: "Stripe", color: "#008CDD" },
      { name: "MySQL", color: "#4479A1" },
    ],
    caseStudyLink: "https://youtu.be/IG1Z6SSxNWY?feature=shared",
    githubLink: "https://github.com/Anonymous1223334444/web_project_semi_final.git",
  },
  {
    id: 6,
    title: "Portofolio",
    description:
      "This website describe all the project that I have worked on even though all of them didn't appear here.",
    imageSrc: "/images/portofolio2.PNG",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#0F00F0" },
      { name: "TypeScript", color: "#9FFEF9" },
      { name: "Tailwind", color: "#38B2AC" },
    ],
    caseStudyLink: "https://portofoliowebdev.vercel.app/",
    githubLink: "https://github.com/Anonymous1223334444/portofolio2.git",
  },
  {
    id: 7,
    title: "Hotel and Show Reservations Platform",
    description:
      "Simple interface that manages hotel and show reservations made using the django framework and mysql server. All back-end processes happens locally.",
    imageSrc: "/images/hs.PNG",
    technologies: [
      { name: "Django", color: "#432E95" },
      { name: "MySQL", color: "#4479A1" },
    ],
    caseStudyLink: "https://not-deployed-yet.vercel.app/",
    githubLink: "https://github.com/Anonymous1223334444/Show_Hotel.git",
  },
]

function ProjectsSection() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section id="projects" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-8">{isClient ? t("projects.featured") : "Featured Projects"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              title={
                isClient
                  ? project.id === 1
                    ? t("projects.django")
                    : project.id === 2
                      ? t("projects.waxma")
                      : project.id === 3
                        ? t("projects.ai")
                        : project.id === 4
                          ? t("projects.portfolio")
                          : project.id === 5
                            ? t("projects.elearning")
                            : project.id === 6
                              ? t("projects.portfolio")
                              : t("projects.hotel")
                  : project.title
              }
              description={
                isClient
                  ? project.id === 1
                    ? t("projects.djangoDesc")
                    : project.id === 2
                      ? t("projects.waxmaDesc")
                      : project.id === 3
                        ? t("projects.aiDesc")
                        : project.id === 4
                          ? t("projects.portfolioDesc")
                          : project.id === 5
                            ? t("projects.elearningDesc")
                            : project.id === 6
                              ? t("projects.portfolioDesc")
                              : t("projects.hotelDesc")
                  : project.description
              }
              viewCaseText={isClient ? t("projects.viewCase") : "View Case Study"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Certifications Section
const certifications = [
  {
    id: 1,
    title: "Google Cybersecurity Certification",
    issuer: "Google, Coursera",
    date: "2025",
    description:
      "Comprehensive training in cybersecurity fundamentals, including security frameworks, network security, Python scripting for security, and incident response strategies.",
    image: "/images/cybesecuritygoogle.png",
    verifyLink: "https://coursera.org/share/73cee5cddf014d091ae9a29114c6be50",
    downloadLink: "https://drive.google.com/file/d/1R-aFOZrDfuHzwcUzfgRCOOfeu_2FelSs/view?usp=drive_link",
    skills: ["Security Frameworks", "Network Security", "Python for Security", "Incident Response", "Risk Management"],
  },
  {
    id: 2,
    title: "Network Technician Career Path",
    issuer: "Cisco Networking Academy",
    date: "2024",
    description:
      "Deep dive into networking fundamentals, including network protocols, infrastructure configuration, troubleshooting, and network security implementation.",
    image: "/images/cisconetworking.png",
    verifyLink: "https://www.credly.com/badges/d83635e2-12d0-4825-920e-0419a959b9f3/public_url",
    downloadLink: "https://drive.google.com/file/d/1YchMIWpQKmU2lg7BTYyJA9YnPSNrDDkh/view?usp=drive_link",
    skills: ["Network Protocols", "Infrastructure Setup", "Network Security", "Troubleshooting", "CCNA Preparation"],
  },
  {
    id: 3,
    title: "Python Essential 2",
    issuer: "Cisco",
    date: "2024",
    description:
      "Advanced Python programming concepts covering object-oriented programming, file operations, modules, packages, and error handling mechanisms.",
    image: "/images/pythonessential2.png",
    verifyLink: "https://www.credly.com/badges/1b4f5194-d93f-41aa-89fd-cb38ec1dba15/linked_in_profile",
    downloadLink: "https://drive.google.com/file/d/1oJ8wQ1qeP8gQuUAVeUqEPxyQZCB-SqNt/view?usp=drive_link",
    skills: [
      "Object-Oriented Programming",
      "Exception Handling",
      "Modules & Packages",
      "File Operations",
      "Advanced Python",
    ],
  },
  {
    id: 4,
    title: "Pre Security Learning Path",
    issuer: "TryHackMe",
    date: "2024",
    description:
      "Foundation in cybersecurity essentials, covering networking basics, web security fundamentals, and common security vulnerabilities and threats.",
    image: "/images/tryhackme.png",
    verifyLink: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-FX8KYIEIZI.pdf",
    downloadLink: "https://drive.google.com/file/d/1KTfS7gmQRUOKmhugfE_C0sj-e4nm51dT/view?usp=drive_link",
    skills: ["Security Fundamentals", "Web Security", "Network Basics", "Vulnerability Assessment", "Security Tools"],
  },
  {
    id: 5,
    title: "Certification Microsoft Tech@Work",
    issuer: "Microsoft, IOE, Synapse",
    date: "2023",
    description:
      "Practical training in Microsoft technologies and tools, focusing on productivity applications, cloud services, and workplace collaboration solutions.",
    image: "/images/microsoft.png",
    verifyLink: "https://drive.google.com/file/d/1lkr0y28w5LCpKLX-wNuo6C8WTdLshNxv/view?usp=drive_link",
    downloadLink: "https://drive.google.com/file/d/1lkr0y28w5LCpKLX-wNuo6C8WTdLshNxv/view?usp=drive_link",
    skills: ["Microsoft 365", "Cloud Services", "Workplace Tools", "Digital Collaboration", "Productivity Solutions"],
  },
  {
    id: 6,
    title: "Python Basics",
    issuer: "HackerRank",
    date: "2024",
    description:
      "Fundamental Python programming skills verification, including data structures, control flow, functions, and basic problem-solving techniques.",
    image: "/images/hackerramk.png",
    verifyLink: "https://www.hackerrank.com/certificates/70e2f1c5941d",
    downloadLink: "https://drive.google.com/file/d/1_jEPQJ4jX1a0qcfMku5v45j9-ZPLJURb/view?usp=drive_link",
    skills: ["Python Fundamentals", "Data Structures", "Problem Solving", "Control Flow", "Basic Algorithms"],
  },
]

function CertificationsSection() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section id="certifications" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-8">{isClient ? t("cert.title") : "Certifications"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-contain p-4" />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">
                    {isClient
                      ? cert.id === 1
                        ? t("cert.google")
                        : cert.id === 2
                          ? t("cert.network")
                          : cert.id === 3
                            ? t("cert.python")
                            : cert.id === 4
                              ? t("cert.security")
                              : cert.id === 5
                                ? t("cert.microsoft")
                                : t("cert.pythonBasics")
                      : cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {isClient
                    ? cert.id === 1
                      ? t("cert.googleDesc")
                      : cert.id === 2
                        ? t("cert.networkDesc")
                        : cert.id === 3
                          ? t("cert.pythonDesc")
                          : cert.id === 4
                            ? t("cert.securityDesc")
                            : cert.id === 5
                              ? t("cert.microsoftDesc")
                              : t("cert.pythonBasicsDesc")
                    : cert.description}
                </p>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                  >
                    {isClient ? t("cert.verify") : "Verify Certificate"}
                  </a>
                  <a
                    href={cert.downloadLink}
                    download
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-md transition-colors duration-200"
                  >
                    {isClient ? t("cert.download") : "Download"}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("sending")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      console.error("Error:", error)
      setFormStatus("error")
    }
  }

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-8 text-center">{isClient ? t("contact.title") : "Get In Touch"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {isClient ? t("contact.name") : "Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {isClient ? t("contact.email") : "Email"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {isClient ? t("contact.message") : "Message"}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={formStatus === "sending"}
            className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition duration-150 ease-in-out"
          >
            {formStatus === "sending"
              ? isClient
                ? t("contact.sending")
                : "Sending..."
              : isClient
                ? t("contact.send")
                : "Send Message"}
            <Send className="ml-2 -mr-1 h-5 w-5" />
          </button>
          {formStatus === "success" && (
            <p className="text-green-600 dark:text-green-400 text-center">
              {isClient ? t("contact.success") : "Message sent successfully!"}
            </p>
          )}
          {formStatus === "error" && (
            <p className="text-red-600 dark:text-red-400 text-center">
              {isClient ? t("contact.error") : "Failed to send message. Please try again."}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

// Scripture Section
function ScriptureSection() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isClient
              ? t("scripture.quote")
              : '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."'}
          </h2>
          <p className="text-xl md:text-2xl italic text-gray-600 dark:text-gray-300">
            {isClient ? t("scripture.reference") : "Jeremiah 29:11"}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer className="bg-white dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            {isClient ? t("footer.copyright") : "© 2024 Andre Sarr. All rights reserved."}
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/Anonymous1223334444"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-150"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/andré-sarr-8b87a1202"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-150"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:sarrandremichel@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-150"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Portfolio Component
export function Portfolio() {
  return (
    <AudioProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
          <CustomCursor />
          <AudioPlayer />
          <NavBar />
          <main>
            <HeroSection
              name="Andre Sarr"
              title="An AI developer/mobile and app developer and cybersecurity anthousiast, based in Dakar, Senegal"
              profileImage="/images/profile-picture.jpg"
            />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <CertificationsSection />
            <ContactSection />
            <ScriptureSection />
          </main>
          <Footer />
          <RagChat />
        </div>
      </ThemeProvider>
    </AudioProvider>
  )
}

