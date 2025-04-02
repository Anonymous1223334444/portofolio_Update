import { motion } from "framer-motion"
import { Award, ExternalLink, Download } from "lucide-react"
import Image from "next/image"

const certifications = [
  {
    id: 1,
    title: "Python Essential 1",
    issuer: "Cisco",
    date: "2023",
    description: "Fundamental concepts of programming using Python, including data types, control structures, functions, and basic algorithms.",
    image: "/images/pythonessential2.png",
    verifyLink: "https://www.credly.com/badges/your-badge-id",
    downloadLink: "/certificates/python-essential-1.pdf",
    skills: ["Python", "Programming Fundamentals", "Algorithms"],
  },
  {
    id: 2,
    title: "Python Essential 2",
    issuer: "Cisco",
    date: "2023",
    description: "Advanced Python programming concepts including object-oriented programming, file handling, and exception handling.",
    image: "/images/pythonessential2.png",
    verifyLink: "https://www.credly.com/badges/your-badge-id",
    downloadLink: "/certificates/python-essential-2.pdf",
    skills: ["Advanced Python", "OOP", "Exception Handling"],
  },
  {
    id: 3,
    title: "Network Security+",
    issuer: "CompTIA",
    date: "2023",
    description: "Comprehensive understanding of network security fundamentals and implementation.",
    image: "/images/pythonessential2.png",
    verifyLink: "#",
    downloadLink: "#",
    skills: ["Network Security", "Security Implementation", "Network Protocols"],
  },
  {
    id: 4,
    title: "Cybersecurity Analyst",
    issuer: "CompTIA",
    date: "2023",
    description: "Advanced cybersecurity principles, threat analysis, and incident response.",
    image: "/images/pythonessential2.png",
    verifyLink: "#",
    downloadLink: "#",
    skills: ["Threat Analysis", "Incident Response", "Security Protocols"],
  },
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-spacing bg-gray-900/30">
      <div className="max-w-7xl mx-auto container-padding">
        <h2 className="text-2xl font-mono font-bold mb-12 text-green-400">
          Certifications ({certifications.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            console.log(`Rendering certification ${index + 1}:`, cert)
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden card-hover border border-gray-800"
              >
                <div className="relative h-40 bg-gray-800">
                  <Image 
                    src={cert.image || "/placeholder.svg"} 
                    alt={cert.title} 
                    fill 
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Award className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-mono font-semibold text-green-400">{cert.title}</h3>
                      <p className="text-sm text-gray-400">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs font-mono rounded-full bg-green-400/10 text-green-400 border border-green-400/20"
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
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-mono text-green-400 bg-green-400/10 hover:bg-green-400/20 rounded-md transition-colors"
                    >
                      Verify
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    <a
                      href={cert.downloadLink}
                      download
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-mono text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 rounded-md transition-colors"
                    >
                      Download
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}