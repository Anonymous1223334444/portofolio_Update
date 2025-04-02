"use client"

import type React from "react"

import { useState } from "react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email)
    // Reset form
    setEmail("")
    // You could add a toast notification here
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-md text-white outline-none"
        required
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
      >
        Subscribe
      </button>
    </form>
  )
}

