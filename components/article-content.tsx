"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

// Create a client-side only component for syntax highlighting
const ClientSideSyntaxHighlighter = ({ language, children }: { language: string; children: string }) => {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null)
  const [highlighterStyle, setHighlighterStyle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load both the highlighter and style only on client
    const loadHighlighter = async () => {
      try {
        // Import the syntax highlighter
        const highlighterModule = await import("react-syntax-highlighter")
        // Import the style
        const styleModule = await import("react-syntax-highlighter/dist/cjs/styles/prism")

        setSyntaxHighlighter(() => highlighterModule.Prism)
        setHighlighterStyle(styleModule.atomDark)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load syntax highlighter:", error)
        setIsLoading(false)
      }
    }

    loadHighlighter()
  }, [])

  // Show a simple placeholder while loading
  if (isLoading || !SyntaxHighlighter) {
    return (
      <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
        <code>{children}</code>
      </pre>
    )
  }

  // Render the actual syntax highlighter once loaded
  return (
    <SyntaxHighlighter style={highlighterStyle} language={language} PreTag="div">
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}

export function ArticleContent({ content }: { content: string }) {
  const components = {
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "")

      if (!inline && match) {
        return <ClientSideSyntaxHighlighter language={match[1]}>{String(children)}</ClientSideSyntaxHighlighter>
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}

