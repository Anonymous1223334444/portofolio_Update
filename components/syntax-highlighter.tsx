// syntax-highlighter.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const ClientSideSyntaxHighlighter = ({ language, children }: { language: string; children: string }) => {
  return (
    <SyntaxHighlighter style={atomDark} language={language} PreTag="div">
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}