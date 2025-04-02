"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function CVLink() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/resume")}
      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
    >
      View My CV
      <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
    </button>
  )
}

