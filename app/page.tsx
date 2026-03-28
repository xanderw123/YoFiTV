'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Image
            src="/logos/YoFi TV Icon.svg"
            alt="YoFi TV"
            width={40}
            height={40}
            priority
          />
          <span className="font-bold text-xl">YoFi TV</span>
        </div>
      </nav>

      {/* Hero - Just Logo */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 p-4">
        <div className="flex justify-center">
          <Image
            src="/logos/YoFi TV - Always On.svg"
            alt="YoFi TV - Always On"
            width={400}
            height={300}
            priority
          />
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/stations" className="px-8 py-3 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90 transition">
            Browse Stations
          </Link>
          <Link href="/create" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition border border-gray-700">
            Create Station
          </Link>
        </div>
      </div>
    </div>
  )
}