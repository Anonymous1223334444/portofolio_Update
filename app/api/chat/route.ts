import { NextResponse } from "next/server"
import OpenAI from "openai"

// Define a type for the message structure
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Define a type for the request body
interface RequestBody {
  messages: ChatMessage[];
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as RequestBody;

    // Create context about Andre
    const systemMessage: ChatMessage = {
      role: "system",
      content: `
        You are an AI assistant for Andre Sarr, a Full Stack Developer & Security Enthusiast.
       
        Context about Andre:
        - Full Stack Developer with expertise in Next.js, React, Python/Django, and Flutter
        - Security enthusiast with certifications in cybersecurity
        - Has worked on projects including Django applications, AI models for sign language recognition, and web development
        - Has certifications from Google, Cisco, TryHackMe, and others
        - Passionate about technology, innovation, and creation
       
        Respond as Andre's AI assistant. Be helpful, friendly, and informative. Keep responses concise.
      `,
    }

    // Format messages for OpenAI
    const formattedMessages = [
      systemMessage,
      ...messages.map((msg: ChatMessage) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 500,
    })

    // Return the response
    return NextResponse.json({
      content: response.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}