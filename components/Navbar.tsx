'use client'

import Link from 'next/link'
import { getCurrentStationSession, clearStationSession } from '@/lib/stationAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const router = useRouter()
  const [session, setSession] = useState(getCurrentStationSession())
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSession(getCurrentStationSession())
    
    const handleStorageChange = () => {
      setSession(getCurrentStationSession())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleSignOut = () => {
    clearStessionSession()
    setSession(null)
    setMenuOpen(false)
    router.push('/')
  }

  if (!mounted) return null

  return (
    <nav className="border-b border-gray-800 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-4">
          {/* Home Icon */}
          <Link href="/" className="flex items-center hover:opacity-90 transition">
            <img src="/logos/YoFi TV Icon.svg" alt="YoFi TV Home" className="h-8 w-auto" />
          </Link>

          {/* Hamburger Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-800 rounded transition"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 min-w-48">
                <Link
                  href="/guide"
                  className="block px-4 py-3 hover:bg-gray-800 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  YoFi TV Guide
                </Link>
                
                {session ? (
                  <>
                    <Link
                      href="/mystation"
                      className="block px-4 py-3 hover:bg-gray-800 text-sm font-medium border-t border-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Station
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 hover:bg-gray-800 text-sm font-medium border-t border-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 hover:bg-gray-800 text-sm font-medium border-t border-gray-700 text-red-400"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/create"
                      className="block px-4 py-3 hover:bg-gray-800 text-sm font-medium border-t border-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Host a Station
                    </Link>
                    <Link
                      href="/signin"
                      className="block px-4 py-3 hover:bg-gray-800 text-sm font-medium border-t border-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Guide Icon */}
        <Link href="/guide" className="flex items-center hover:opacity-90 transition">
          <img src="/logos/TV_Guide_Icon.svg" alt="Station Guide" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Close menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}