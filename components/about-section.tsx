"use client"

import { motion } from "framer-motion"
import { Code2, Brain, Rocket, Heart } from "lucide-react"
import { useLanguage } from "./language-context"
import { useState, useEffect } from "react"

const phrases = [
  {
    icon: Code2,
    titleKey: "about.codeCraftsman",
    descriptionKey: "about.codeCraftsmanDesc",
  },
  {
    icon: Brain,
    titleKey: "about.continuousLearner",
    descriptionKey: "about.continuousLearnerDesc",
  },
  {
    icon: Rocket,
    titleKey: "about.problemSolver",
    descriptionKey: "about.problemSolverDesc",
  },
  {
    icon: Heart,
    titleKey: "about.passionateDev",
    descriptionKey: "about.passionateDevDesc",
  },
]

export function AboutSection() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {isClient ? t("about.passionate") : "Passionate About Technology"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {isClient
              ? t("about.description")
              : "As a technology enthusiast and software developer, I thrive on turning complex problems into simple, beautiful, and intuitive solutions. My journey in tech is driven by curiosity and a constant desire to learn and grow."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {phrases.map((phrase, index) => (
            <motion.div
              key={phrase.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transform -rotate-1 group-hover:rotate-0 transition-transform duration-200 opacity-10" />
              <div className="relative p-8 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <phrase.icon className="w-6 h-6" />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold">
                    {isClient
                      ? t(phrase.titleKey)
                      : phrase.titleKey === "about.codeCraftsman"
                        ? "Code Craftsman"
                        : phrase.titleKey === "about.continuousLearner"
                          ? "Continuous Learner"
                          : phrase.titleKey === "about.problemSolver"
                            ? "Problem Solver"
                            : "Passionate Developer"}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {isClient
                    ? t(phrase.descriptionKey)
                    : phrase.descriptionKey === "about.codeCraftsmanDesc"
                      ? "Transforming complex challenges into elegant solutions through clean, efficient code."
                      : phrase.descriptionKey === "about.continuousLearnerDesc"
                        ? "Embracing new technologies and methodologies to stay at the forefront of innovation."
                        : phrase.descriptionKey === "about.problemSolverDesc"
                          ? "Turning ideas into reality with a strategic approach and attention to detail."
                          : "Dedicated to creating meaningful experiences that make a difference."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center mt-16"
        >
          <p className="text-xl font-medium text-gray-900 dark:text-white">
            {isClient
              ? t("about.quote")
              : '"The technology you use impresses no one. The experience you create with it is everything."'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{isClient ? t("about.quoteAuthor") : "— Sean Gerety"}</p>
        </motion.div>
      </div>
    </section>
  )
}

