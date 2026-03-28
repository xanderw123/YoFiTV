'use client'

import Link from 'next/link'
import { getCurrentStationSession } from '@/lib/stationAuth'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [session, setSession] = useState(getCurrentStationSession())

  useEffect(() => {
    setSession(getCurrentStationSession())
    const handleStorageChange = () => {
      setSession(getCurrentStationSession())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <nav className="border-b border-gray-800 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logos/YoFi TV Icon.svg" alt="YoFi TV" className="w-10 h-10" />
          <span className="font-bold text-xl">YoFi TV</span>
        </Link>
        {session && (
          <Link href="/mystation" className="flex items-center gap-2 px-4 py-2 bg-yofi-green text-black rounded-lg hover:opacity-90 transition font-bold">
            <img src="/logos/MyStation_Logo.svg" alt="My Station" className="w-5 h-5" />
            My Station
          </Link>
        )}
      </div>
    </nav>
  )
}