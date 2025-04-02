export default function Loading() {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="relative h-[50vh] min-h-[400px] animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="h-12 w-64 bg-gray-800 rounded-lg mx-auto" />
              <div className="h-8 w-96 bg-gray-800 rounded-lg mx-auto" />
            </div>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-800" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-24 bg-gray-800 rounded" />
                  <div className="h-8 w-full bg-gray-800 rounded" />
                  <div className="h-4 w-3/4 bg-gray-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  