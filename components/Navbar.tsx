'use client'

import Link from 'next/link'
import { getCurrentStationSession } from '@/lib/stationAuth'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [session, setSession] = useState(getCurrentStationSession())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSession(getCurrentStationSession())
    
    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      setSession(getCurrentStationSession())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (!mounted) return null

  return (
    <nav className="border-b border-gray-800 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <img src="/logos/YoFi TV Icon.svg" alt="YoFi TV" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/guide" className="h-10 hover:opacity-90 transition flex items-center">
            <img src="/logos/TV_Guide_Logo.svg" alt="Guide" className="h-10 w-auto" />
          </Link>

          {session ? (
            <Link href="/mystation" className="h-10 hover:opacity-90 transition flex items-center">
              <img src="/logos/MyStation_Logo.svg" alt="My Station" className="h-10 w-auto" />
            </Link>
          ) : (
            <Link href="/create" className="h-10 hover:opacity-90 transition flex items-center">
              <img src="/logos/Host_a_Station_Logo.svg" alt="Host a Station" className="h-10 w-auto" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}