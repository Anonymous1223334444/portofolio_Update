"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function SeedBlogPage() {
  const [status, setStatus] = useState<{
    loading: boolean
    error: string | null
    data: any | null
  }>({
    loading: true,
    error: null,
    data: null,
  })

  useEffect(() => {
    async function seedDatabase() {
      try {
        setStatus({ loading: true, error: null, data: null })

        // First seed the initial article
        const initialResponse = await fetch("/api/seed-db")
        const initialData = await initialResponse.json()

        // Then seed additional articles
        const additionalResponse = await fetch("/api/seed-more-articles")
        const additionalData = await additionalResponse.json()

        setStatus({
          loading: false,
          error: null,
          data: {
            initial: initialData,
            additional: additionalData,
          },
        })
      } catch (error) {
        setStatus({
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred",
          data: null,
        })
      }
    }

    seedDatabase()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Blog Database Seeding</h1>

        {status.loading ? (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            Seeding database with blog articles...
          </div>
        ) : status.error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h2 className="text-red-400 font-semibold mb-2">Seeding Error:</h2>
            <pre className="text-sm">{status.error}</pre>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h2 className="text-green-400 font-semibold mb-2">Seeding Completed!</h2>
              <pre className="text-sm overflow-auto">{JSON.stringify(status.data, null, 2)}</pre>
            </div>

            <div className="flex justify-center space-x-4">
              <Link href="/blog" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                View Blog
              </Link>
              <Link href="/test" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                Test Database
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

