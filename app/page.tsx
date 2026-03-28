'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-12 p-4">
      <img src="/logos/YoFi TV - Always On.svg" alt="YoFi TV - Always On" className="w-96 h-auto" />

      <div className="flex gap-6">
        <Link href="/guide" className="px-8 py-3 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90 transition">
          YoFi TV Guide
        </Link>
        <Link href="/create" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition border border-gray-700">
          Create a Station
        </Link>
      </div>
    </div>
  )
}