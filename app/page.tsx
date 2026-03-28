'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-300 rounded flex items-center justify-center">
            <span className="text-black font-bold">▶</span>
          </div>
          <span className="font-bold">YoFi TV</span>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold mb-4">Always On</h1>
          <p className="text-2xl text-gray-300 mb-2">Curate Your World</p>
          <p className="text-lg text-gray-400 mb-12">Watch stations. Follow creators. Chat live. 24/7.</p>

          <div className="flex gap-4 justify-center">
            <Link href="/stations" className="px-8 py-3 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400">
              Browse Stations
            </Link>
            <Link href="/create" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 border border-gray-700">
              Create Station
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}