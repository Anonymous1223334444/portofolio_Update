"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import dynamic from 'next/dynamic'
// Create a client-side only component for syntax highlighting
const ClientSideSyntaxHighlighter = dynamic(
  () => import('./syntax-highlighter').then((mod) => mod.ClientSideSyntaxHighlighter),
  {
    ssr: false,
    loading: () => (
      <pre className="bg-gray-800 text-gray-200 p-4 rounded overflow-x-auto">
        <code>Loading syntax highlighter...</code>
      </pre>  
    )
  }
)

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

