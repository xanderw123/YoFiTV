'use client'

import Link from 'next/link'
import { getCurrentStationSession } from '@/lib/stationAuth'
import { useEffect, useState } from 'react'

export default function Home() {
  const [session, setSession] = useState(getCurrentStationSession())

  useEffect(() => {
    setSession(getCurrentStationSession())
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/YoFi TV Icon.svg" alt="YoFi TV" className="w-10 h-10" />
            <span className="font-bold text-xl">YoFi TV</span>
          </div>
          {session && (
            <Link href="/mystation" className="text-yofi-green hover:opacity-90">
              My Station
            </Link>
          )}
        </div>
      </nav>

      {/* Hero - Just Logo and Links */}
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
    </div>
  )
}