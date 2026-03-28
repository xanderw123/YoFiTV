'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-300 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">▶</span>
          </div>
          <span className="font-bold text-xl">YoFi TV</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 bg-yellow-300 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <span className="text-6xl font-bold text-black">▶</span>
          </div>

          <h1 className="text-6xl font-bold mb-4">Always On</h1>
          <p className="text-2xl text-gray-300 mb-2">Curate Your World</p>
          <p className="text-lg text-gray-400 mb-12">Watch stations. Follow creators. Chat live. 24/7.</p>

          <div className="flex gap-4 justify-center">
            <Link href="/stations" className="px-8 py-3 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400 transition">
              Browse Stations
            </Link>
            <Link href="/create" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition border border-gray-700">
              Create Station
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}