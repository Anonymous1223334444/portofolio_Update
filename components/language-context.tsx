"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Start with English on both server and client
  const [language, setLanguage] = useState<Language>("en")
  // Add a state to track if we've loaded the preference from localStorage
  const [isInitialized, setIsInitialized] = useState(false)

  // Only run on client-side after initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
    setIsInitialized(true)
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("language", language)
    }
  }, [language, isInitialized])

  // Translation dictionary
  const translations = {
    en: {
      // Navigation
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.skills": "Skills",
      "nav.certifications": "Certifications",
      "nav.contact": "Contact",
      "nav.blog": "Blog",

      // Hero section
      "hero.title": "An AI developer/mobile and app developer and cybersecurity anthousiast, based in Dakar, Senegal",
      "hero.findOutMore": "find out more",
      "hero.securityLevel": "Security Level",
      "hero.hello": "HELLO, I'M",
      "hero.welcome": "Welcome",
      "hero.encryptedMessage": "Encrypted Message:",
      "hero.securityMessages.1": "Initializing basic security protocols...",
      "hero.securityMessages.2": "Enabling advanced encryption layers...",
      "hero.securityMessages.3": "Activating maximum security shield...",
      "hero.securityMaximum": "SECURITY LEVEL MAXIMUM: All systems protected",

      // About section
      "about.passionate": "Passionate About Technology",
      "about.description":
        "As a technology enthusiast and software developer, I thrive on turning complex problems into simple, beautiful, and intuitive solutions. My journey in tech is driven by curiosity and a constant desire to learn and grow.",
      "about.codeCraftsman": "Code Craftsman",
      "about.codeCraftsmanDesc":
        "Transforming complex challenges into elegant solutions through clean, efficient code.",
      "about.continuousLearner": "Continuous Learner",
      "about.continuousLearnerDesc":
        "Embracing new technologies and methodologies to stay at the forefront of innovation.",
      "about.problemSolver": "Problem Solver",
      "about.problemSolverDesc": "Turning ideas into reality with a strategic approach and attention to detail.",
      "about.passionateDev": "Passionate Developer",
      "about.passionateDevDesc": "Dedicated to creating meaningful experiences that make a difference.",
      "about.quote": '"The technology you use impresses no one. The experience you create with it is everything."',
      "about.quoteAuthor": "— Sean Gerety",

      // Projects section
      "projects.featured": "Featured Projects",
      "projects.django": "Django Application Development - User Registration Email Validation System",
      "projects.djangoDesc":
        "Developed and deployed with docker a Django-based application focused on user registration and email validation. Integrated JavaScript for enhanced user experience and real-time validation. Collaborated with a cross-functional team to ensure the application met project goals and deadlines.",
      "projects.waxma": "Waxma - Chatbot",
      "projects.waxmaDesc":
        "Pioneering a New Paradigm in Geospatial Data Management to Deliver Precise and Accessible Mapping for All.",
      "projects.ai": "AI Model for Sign Language Recognition - Flutter App Integration",
      "projects.aiDesc":
        "Trained an AI model to recognize sign language gestures from images. Integrated the model into a Flutter app, enabling real-time gesture recognition and user interaction. Conducted extensive testing and optimization to improve model accuracy and performance.",
      "projects.portfolio": "Portfolio",
      "projects.portfolioDesc":
        "This website describe all the project that I have worked on even though all of them didn't appear here.",
      "projects.elearning": "E-Learning Platform",
      "projects.elearningDesc":
        "E-Learning Platform created with PHP and in which I experiment the api stripe checkout as payment gateway.",
      "projects.hotel": "Hotel and Show Reservations Platform",
      "projects.hotelDesc":
        "Simple interface that manages hotel and show reservations made using the django framework and mysql server. All back-end processes happens locally.",
      "projects.viewCase": "View Case Study",
      "projects.showLess": "Show less",

      // Skills section
      "skills.title": "Skills & Tools",
      "skills.language": "Language",
      "skills.designLanguage": "Design Language",
      "skills.jsLibrary": "JavaScript Library",
      "skills.reactFramework": "React Framework",
      "skills.webFramework": "Web Framework",
      "skills.cssLibrary": "CSS Library",
      "skills.libraries": "Collection of libraries",
      "skills.versionControl": "Version Control",
      "skills.ide": "IDE",
      "skills.designTool": "Design Tool",
      "skills.markupLanguage": "Markup Language",
      "skills.os": "Operating System",
      "skills.networkTool": "Network Tool",
      "skills.aiTool": "AI Tool",
      "skills.analyticsTools": "Analytics Tool",
      "skills.database": "Database",
      "skills.businessTool": "Business Tool",
      "skills.cloudPlatform": "Cloud Platform",
      "skills.securityTool": "Security Tool",
      "skills.proficiency": "Proficiency",
      "skills.description": "Description",
      "skills.experience": "Experience",
      "skills.relatedProjects": "Related Projects",

      // Certifications section
      "cert.title": "Certifications",
      "cert.google": "Google Cybersecurity Certification",
      "cert.googleDesc":
        "Comprehensive training in cybersecurity fundamentals, including security frameworks, network security, Python scripting for security, and incident response strategies.",
      "cert.network": "Network Technician Career Path",
      "cert.networkDesc":
        "Deep dive into networking fundamentals, including network protocols, infrastructure configuration, troubleshooting, and network security implementation.",
      "cert.python": "Python Essential 2",
      "cert.pythonDesc":
        "Advanced Python programming concepts covering object-oriented programming, file operations, modules, packages, and error handling mechanisms.",
      "cert.security": "Pre Security Learning Path",
      "cert.securityDesc":
        "Foundation in cybersecurity essentials, covering networking basics, web security fundamentals, and common security vulnerabilities and threats.",
      "cert.microsoft": "Certification Microsoft Tech@Work",
      "cert.microsoftDesc":
        "Practical training in Microsoft technologies and tools, focusing on productivity applications, cloud services, and workplace collaboration solutions.",
      "cert.pythonBasics": "Python Basics",
      "cert.pythonBasicsDesc":
        "Fundamental Python programming skills verification, including data structures, control flow, functions, and basic problem-solving techniques.",
      "cert.verify": "Verify Certificate",
      "cert.download": "Download",

      // Contact section
      "contact.title": "Get In Touch",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send Message",
      "contact.sending": "Sending...",
      "contact.success": "Message sent successfully!",
      "contact.error": "Failed to send message. Please try again.",

      // Scripture section
      "scripture.quote":
        '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
      "scripture.reference": "Jeremiah 29:11",

      // Footer section
      "footer.copyright": "© 2024 Andre Sarr. All rights reserved.",

      // Chat section
      "chat.askAbout": "Ask about Andre",
      "chat.placeholder": "Ask about Andre...",
      "chat.error": "Sorry, I encountered an error. Please try again later.",
      "chat.initialMessage":
        "Hi there! I'm Andre's AI assistant. Ask me anything about Andre's skills, experience, or projects! Type 'vacuum' to close this chat.",
    },
    fr: {
      // Navigation
      "nav.about": "À propos",
      "nav.projects": "Projets",
      "nav.skills": "Compétences",
      "nav.certifications": "Certifications",
      "nav.contact": "Contact",
      "nav.blog": "Blog",

      // Hero section
      "hero.title": "Un développeur IA/mobile et d'applications et passionné de cybersécurité, basé à Dakar, Sénégal",
      "hero.findOutMore": "en savoir plus",
      "hero.securityLevel": "Niveau de Sécurité",
      "hero.hello": "BONJOUR, JE SUIS",
      "hero.welcome": "Bienvenue",
      "hero.encryptedMessage": "Message Crypté:",
      "hero.securityMessages.1": "Initialisation des protocoles de sécurité de base...",
      "hero.securityMessages.2": "Activation des couches de cryptage avancées...",
      "hero.securityMessages.3": "Activation du bouclier de sécurité maximum...",
      "hero.securityMaximum": "NIVEAU DE SÉCURITÉ MAXIMUM: Tous les systèmes protégés",

      // About section
      "about.passionate": "Passionné par la Technologie",
      "about.description":
        "En tant qu'enthousiaste de la technologie et développeur de logiciels, je m'épanouis en transformant des problèmes complexes en solutions simples, élégantes et intuitives. Mon parcours dans la tech est motivé par la curiosité et un désir constant d'apprendre et de grandir.",
      "about.codeCraftsman": "Artisan du Code",
      "about.codeCraftsmanDesc":
        "Transformer des défis complexes en solutions élégantes grâce à un code propre et efficace.",
      "about.continuousLearner": "Apprenant Continu",
      "about.continuousLearnerDesc":
        "Adopter de nouvelles technologies et méthodologies pour rester à la pointe de l'innovation.",
      "about.problemSolver": "Résolveur de Problèmes",
      "about.problemSolverDesc":
        "Transformer des idées en réalité avec une approche stratégique et une attention aux détails.",
      "about.passionateDev": "Développeur Passionné",
      "about.passionateDevDesc": "Dédié à créer des expériences significatives qui font la différence.",
      "about.quote":
        "\"La technologie que vous utilisez n'impressionne personne. L'expérience que vous créez avec elle est tout ce qui compte.\"",
      "about.quoteAuthor": "— Sean Gerety",

      // Projects section
      "projects.featured": "Projets en Vedette",
      "projects.django":
        "Développement d'Application Django - Système de Validation d'Email pour Inscription Utilisateur",
      "projects.djangoDesc":
        "Développé et déployé avec docker une application basée sur Django axée sur l'inscription des utilisateurs et la validation des emails. Intégré JavaScript pour améliorer l'expérience utilisateur et la validation en temps réel. Collaboré avec une équipe pluridisciplinaire pour garantir que l'application réponde aux objectifs et délais du projet.",
      "projects.waxma": "Waxma - Chatbot",
      "projects.waxmaDesc":
        "Pionnier d'un nouveau paradigme dans la gestion des données géospatiales pour fournir une cartographie précise et accessible à tous.",
      "projects.ai": "Modèle IA pour la Reconnaissance de la Langue des Signes - Intégration d'Application Flutter",
      "projects.aiDesc":
        "Entraîné un modèle d'IA pour reconnaître les gestes de la langue des signes à partir d'images. Intégré le modèle dans une application Flutter, permettant la reconnaissance de gestes en temps réel et l'interaction utilisateur. Mené des tests approfondis et des optimisations pour améliorer la précision et les performances du modèle.",
      "projects.portfolio": "Portfolio",
      "projects.portfolioDesc":
        "Ce site web décrit tous les projets sur lesquels j'ai travaillé même si tous n'apparaissent pas ici.",
      "projects.elearning": "Plateforme E-Learning",
      "projects.elearningDesc":
        "Plateforme E-Learning créée avec PHP et dans laquelle j'expérimente l'API Stripe Checkout comme passerelle de paiement.",
      "projects.hotel": "Plateforme de Réservations d'Hôtels et de Spectacles",
      "projects.hotelDesc":
        "Interface simple qui gère les réservations d'hôtels et de spectacles réalisée avec le framework Django et un serveur MySQL. Tous les processus back-end se déroulent localement.",
      "projects.viewCase": "Voir l'Étude de Cas",
      "projects.showLess": "Voir moins",

      // Skills section
      "skills.title": "Compétences & Outils",
      "skills.language": "Langage",
      "skills.designLanguage": "Langage de Design",
      "skills.jsLibrary": "Bibliothèque JavaScript",
      "skills.reactFramework": "Framework React",
      "skills.webFramework": "Framework Web",
      "skills.cssLibrary": "Bibliothèque CSS",
      "skills.libraries": "Collection de bibliothèques",
      "skills.versionControl": "Contrôle de Version",
      "skills.ide": "EDI",
      "skills.designTool": "Outil de Design",
      "skills.markupLanguage": "Langage de Balisage",
      "skills.os": "Système d'Exploitation",
      "skills.networkTool": "Outil Réseau",
      "skills.aiTool": "Outil d'IA",
      "skills.analyticsTools": "Outil d'Analyse",
      "skills.database": "Base de Données",
      "skills.businessTool": "Outil d'Entreprise",
      "skills.cloudPlatform": "Plateforme Cloud",
      "skills.securityTool": "Outil de Sécurité",
      "skills.proficiency": "Compétence",
      "skills.description": "Description",
      "skills.experience": "Expérience",
      "skills.relatedProjects": "Projets Associés",

      // Certifications section
      "cert.title": "Certifications",
      "cert.google": "Certification Google Cybersécurité",
      "cert.googleDesc":
        "Formation complète sur les fondamentaux de la cybersécurité, incluant les cadres de sécurité, la sécurité réseau, la programmation Python pour la sécurité, et les stratégies de réponse aux incidents.",
      "cert.network": "Parcours de Carrière de Technicien Réseau",
      "cert.networkDesc":
        "Plongée approfondie dans les fondamentaux du réseau, incluant les protocoles réseau, la configuration d'infrastructure, le dépannage, et l'implémentation de la sécurité réseau.",
      "cert.python": "Python Essentiel 2",
      "cert.pythonDesc":
        "Concepts avancés de programmation Python couvrant la programmation orientée objet, les opérations de fichiers, les modules, les packages, et les mécanismes de gestion d'erreurs.",
      "cert.security": "Parcours d'Apprentissage Pré-Sécurité",
      "cert.securityDesc":
        "Fondements des essentiels de la cybersécurité, couvrant les bases du réseau, les fondamentaux de la sécurité web, et les vulnérabilités et menaces de sécurité courantes.",
      "cert.microsoft": "Certification Microsoft Tech@Work",
      "cert.microsoftDesc":
        "Formation pratique sur les technologies et outils Microsoft, axée sur les applications de productivité, les services cloud, et les solutions de collaboration en milieu de travail.",
      "cert.pythonBasics": "Bases de Python",
      "cert.pythonBasicsDesc":
        "Vérification des compétences fondamentales en programmation Python, incluant les structures de données, le flux de contrôle, les fonctions, et les techniques de base de résolution de problèmes.",
      "cert.verify": "Vérifier le Certificat",
      "cert.download": "Télécharger",

      // Contact section
      "contact.title": "Contactez-Moi",
      "contact.name": "Nom",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Envoyer le Message",
      "contact.sending": "Envoi en cours...",
      "contact.success": "Message envoyé avec succès !",
      "contact.error": "Échec de l'envoi du message. Veuillez réessayer.",

      // Scripture section
      "scripture.quote":
        "\"Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.\"",
      "scripture.reference": "Jérémie 29:11",

      // Footer section
      "footer.copyright": "© 2024 Andre Sarr. Tous droits réservés.",

      // Chat section
      "chat.askAbout": "Demandez à propos d'Andre",
      "chat.placeholder": "Posez une question sur Andre...",
      "chat.error": "Désolé, j'ai rencontré une erreur. Veuillez réessayer plus tard.",
      "chat.initialMessage":
        "Bonjour ! Je suis l'assistant IA d'Andre. Posez-moi n'importe quelle question sur les compétences, l'expérience ou les projets d'Andre ! Tapez 'vacuum' pour fermer cette conversation.",
    },
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

