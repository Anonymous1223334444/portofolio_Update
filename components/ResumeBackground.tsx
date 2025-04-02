"use client"

import type React from "react"

export default function ResumeBackground() {
  return (
    <div className="relative min-h-screen bg-[#000B18]">
      {/* SVG Background */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 898 1700"
      >
        <defs>
          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#4169E1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
          </radialGradient>
          <filter id="blueBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000B18" />
            <stop offset="100%" stopColor="#0A2342" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGradient)" />

        <g className="animate float" style={{ animationDelay: "0.2s" }}>
          <path d="M0,50 Q200,0 400,50 T800,50" fill="none" stroke="#1E3A5F" strokeWidth="0.5" />
          <path d="M0,150 Q200,100 400,150 T800,150" fill="none" stroke="#1E3A5F" strokeWidth="0.5" />
          <path d="M0,250 Q200,200 400,250 T800,250" fill="none" stroke="#1E3A5F" strokeWidth="0.5" />
          <path d="M0,350 Q200,300 400,350 T800,350" fill="none" stroke="#1E3A5F" strokeWidth="0.5" />
        </g>

        <g className="animate" style={{ animationDelay: "0.4s" }}>
          <circle cx="100" cy="100" r="30" fill="url(#blueGlow)" filter="url(#blueBlur)" opacity="0.7" />
          <circle cx="700" cy="200" r="50" fill="url(#blueGlow)" filter="url(#blueBlur)" opacity="0.5" />
          <circle cx="200" cy="600" r="40" fill="url(#blueGlow)" filter="url(#blueBlur)" opacity="0.6" />
          <circle cx="600" cy="1000" r="60" fill="url(#blueGlow)" filter="url(#blueBlur)" opacity="0.4" />
        </g>

        <g className="animate">
          {[50, 150, 250, 450, 550, 650, 750].map((cx, index) => (
            <circle key={index} cx={cx} cy={(index + 1) * 50} r="1" fill="#4169E1" className="particle" />
          ))}
        </g>

        <text x="40" y="80" fontSize="48" fontWeight="bold" fill="#fff">
          Andre SARR
        </text>
        <text x="40" y="130" fontSize="24" fill="#B0C4DE">
          Web & App Developer
        </text>
        <text x="40" y="180" fontSize="16" fill="#B0C4DE" letterSpacing="0.5">
          📧 sarrandremichel@gmail.com | 📱 (221) 77-882-83-76 | 🌐 portofoliowebdev.vercel.app/ | 📍 Dakar
        </text>

        <text x="40" y="250" fontSize="28" fontWeight="600" fill="#fff">
          Professional Summary
        </text>
        <rect x="40" y="270" width="720" height="2" fill="#4169E1" />
        <text x="40" y="300" fontSize="16" fill="#B0C4DE" letterSpacing="0.2">
          <tspan x="40" dy="0">
            Self-taught developer with 4 years of coding experience and a passion for learning. Although I have
          </tspan>
          <tspan x="40" dy="25">
            no professional experience yet, I&apos;ve dedicated myself to mastering various programming languages
          </tspan>
          <tspan x="40" dy="25">
            and technologies. Eager to apply my skills and contribute to innovative projects in a professional setting.
          </tspan>
        </text>

        <text x="40" y="400" fontSize="28" fontWeight="600" fill="#fff">
         Skills
        </text>
        <rect x="40" y="420" width="720" height="2" fill="#4169E1" />
        {[
          { skill: "Python / Django", width: 200 },
          { skill: "JavaScript / NextJS", width: 180 },
          { skill: "Artificial Intelligence", width: 160 },
          { skill: "Flutter / Android", width: 150 },
          { skill: "AWS / Docker", width: 140 },
          { skill: "Git / Github", width: 120 },
        ].map((item, index) => (
          <g key={index}>
            <text x={index % 2 === 0 ? 40 : 420} y={460 + Math.floor(index / 2) * 50} fontSize="18" fill="#B0C4DE">
              {item.skill}
            </text>
            <rect
              x={index % 2 === 0 ? 40 : 420}
              y={470 + Math.floor(index / 2) * 50}
              width={item.width}
              height="12"
              rx="6"
              fill="#4169E1"
            />
          </g>
        ))}

        <text x="40" y="700" fontSize="28" fontWeight="600" fill="#fff">
          Projects and Contributions
        </text>
        <rect x="40" y="720" width="720" height="2" fill="#4169E1" />

        <text x="40" y="760" fontSize="22" fontWeight="500" fill="#fff">
          Inovative Project: Waxma Chatbot
        </text>
        <text x="40" y="790" fontSize="16" fill="#B0C4DE">
          December 2024
        </text>

        <text x="40" y="900" fontSize="22" fontWeight="500" fill="#fff">
          Personal Project: Expense and Income Management Application
        </text>
        <text x="40" y="930" fontSize="16" fill="#B0C4DE">
          August 2024
        </text>

        <text x="40" y="1040" fontSize="22" fontWeight="500" fill="#fff">
          Self-Study Project: Web Development Bootcamp
        </text>
        <text x="40" y="1070" fontSize="16" fill="#B0C4DE">
          August 2022 - October 2022
        </text>

        <text x="40" y="1200" fontSize="28" fontWeight="600" fill="#fff">
          Education
        </text>
        <rect x="40" y="1220" width="720" height="2" fill="#4169E1" />
        <text x="40" y="1260" fontSize="22" fontWeight="500" fill="#fff">
          Engineering Technology Degree in Computer Science
        </text>
        <text x="40" y="1290" fontSize="16" fill="#B0C4DE">
          Polythecnic School, 2023
        </text>
        <text x="40" y="1340" fontSize="22" fontWeight="500" fill="#fff">
          Associate&apos;s Degree Physics / Chemestry
        </text>
        <text x="40" y="1370" fontSize="16" fill="#B0C4DE">
          Faculty of Science and Technology, 2020
        </text>

        <text x="40" y="1440" fontSize="28" fontWeight="600" fill="#fff">
          Certifications
        </text>
        <rect x="40" y="1460" width="720" height="2" fill="#4169E1" />
        <text x="40" y="1500" fontSize="18" fill="#B0C4DE">
          • Google Cybersecurity Certification
        </text>
        <text x="40" y="1535" fontSize="18" fill="#B0C4DE">
          • Cisco Network Technician Carrer Path
        </text>
        <text x="40" y="1570" fontSize="18" fill="#B0C4DE">
          • TryHackMe Pre Security Learning Path
        </text>
        <text x="40" y="1605" fontSize="18" fill="#B0C4DE">
          • HackerRank Python Basics
        </text>
        <text x="40" y="1640" fontSize="18" fill="#B0C4DE">
          • Python Essential 2
        </text>
      </svg>

    </div>
  )
}

