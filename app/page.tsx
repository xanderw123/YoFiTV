'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-yofi-green rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">▶</span>
          </div>
          <span className="font-bold text-xl">YoFi TV</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 p-4">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-64 h-48 bg-yofi-green rounded-lg flex items-center justify-center">
              <span className="text-black text-6xl font-bold">▶</span>
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-4">Always On</h1>
          <p className="text-2xl text-gray-300 mb-2">Curate Your World</p>
          <p className="text-lg text-gray-400 mb-12">Watch stations. Follow creators. Chat live. 24/7.</p>

          <div className="flex gap-4 justify-center">
            <Link href="/stations" className="px-8 py-3 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90 transition">
              Browse Stations
            </Link>
            <Link href="/guide" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition border border-gray-700">
              Guide
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