'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">YoFi TV</h1>
        <p className="text-xl text-gray-400 mb-8">Coming soon...</p>
        <a href="/stations" className="px-6 py-3 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400">
          View Stations
        </a>
      </div>
    </div>
  )
}