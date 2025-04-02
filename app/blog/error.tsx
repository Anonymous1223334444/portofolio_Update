"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Blog page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">Something went wrong!</h2>
        <p className="text-gray-400 text-center">{error.message}</p>
        <div className="flex justify-center">
          <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

