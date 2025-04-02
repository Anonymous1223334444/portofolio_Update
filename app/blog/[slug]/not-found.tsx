import Link from "next/link"

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
      <p className="text-xl text-gray-400 mb-8">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link href="/blog" target="_blank" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
        Back to Blog
      </Link>
    </div>
  )
}

