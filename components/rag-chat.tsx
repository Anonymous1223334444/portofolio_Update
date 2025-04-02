"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, X, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useLanguage } from "./language-context"

interface Message {
  role: "user" | "assistant"
  content: string
}

// Add a custom type for code elements with inline property
interface CodeProps {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export function RagChat() {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Set initial message after client-side rendering
  useEffect(() => {
    setIsClient(true)
    setMessages([
      {
        role: "assistant",
        content:
          "Hi there! I'm Andre's AI assistant. Ask me anything about Andre's skills, experience, or projects! Type 'vacuum' to close this chat.",
      },
    ])
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef, messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Check for "vacuum" command to close the chat
    if (input.toLowerCase().trim() === "vacuum") {
      setIsOpen(false)
      setInput("")
      return
    }

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call API route to handle OpenAI request
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isClient ? t("chat.error") : "Sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)} // Toggle open/close state
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-6 z-50 w-full max-w-md bg-card border border-border rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="w-6 h-6 text-blue-500" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <h3 className="font-medium text-foreground">{isClient ? t("chat.askAbout") : "Ask about Andre"}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-accent transition-colors text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown
                          components={{
                            p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({ ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                            ol: ({ ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                            li: ({ ...props }) => <li className="mb-1" {...props} />,
                            h1: ({ ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                            h2: ({ ...props }) => <h2 className="text-md font-bold mb-2" {...props} />,
                            h3: ({ ...props }) => <h3 className="text-sm font-bold mb-2" {...props} />,
                            a: ({ ...props }) => (
                              <a
                                className="text-blue-400 dark:text-blue-300 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                              />
                            ),
                            code: ({ inline, ...props }: CodeProps) =>
                              inline ? (
                                <code
                                  className="bg-accent/50 dark:bg-accent/70 px-1 py-0.5 rounded text-sm"
                                  {...props}
                                />
                              ) : (
                                <code
                                  className="block bg-accent/50 dark:bg-accent/70 p-2 rounded text-sm my-2 overflow-x-auto"
                                  {...props}
                                />
                              ),
                            pre: ({ ...props }) => (
                              <pre
                                className="bg-accent/50 dark:bg-accent/70 p-2 rounded my-2 overflow-x-auto"
                                {...props}
                              />
                            ),
                            blockquote: ({ ...props }) => (
                              <blockquote className="border-l-4 border-border pl-2 italic my-2" {...props} />
                            ),
                            hr: ({ ...props }) => <hr className="my-2 border-border" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-foreground rounded-tl-none">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isClient ? t("chat.placeholder") : "Ask about Andre..."}
                  className="flex-1 p-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

