'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [betaCode, setBetaCode] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const beta = params.get('beta')
    const stored = localStorage.getItem('beta_token')

    if (beta) {
      localStorage.setItem('beta_token', beta)
      localStorage.setItem('user_id', `tester_${beta}`)
      localStorage.setItem('user_name', `Tester ${beta.substring(0, 6).toUpperCase()}`)
      setIsSignedIn(true)
    } else if (stored) {
      setIsSignedIn(true)
    }

    setLoading(false)
  }, [])

  const handleBetaCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (betaCode.trim()) {
      localStorage.setItem('beta_token', betaCode)
      localStorage.setItem('user_id', `tester_${betaCode}`)
      localStorage.setItem('user_name', `Tester ${betaCode.substring(0, 6).toUpperCase()}`)
      setIsSignedIn(true)
      setBetaCode('')
    }
  }

  const handleSignOut = () => {
    localStorage.clear()
    setIsSignedIn(false)
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-300 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">▶</span>
            </div>
            <span className="font-bold text-xl">YoFi TV</span>
          </div>
          {isSignedIn && (
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white text-sm"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 p-4">
        {/* Logo */}
        <div className="w-24 h-24 bg-yellow-300 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-6xl font-bold text-black">▶</span>
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Always On</h1>
          <p className="text-2xl text-gray-300 mb-4">Curate Your World</p>
          <p className="text-lg text-gray-400 mb-12">
            Watch stations. Follow creators. Chat live. 24/7.
          </p>

          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
                href="/stations"
                className="px-8 py-3 bg-yellow-300 text-black rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
              >
                Browse Stations
              </a>
              
                href="/create"
                className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition border border-gray-700"
              >
                Create Station
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">Early access beta</p>
              <form onSubmit={handleBetaCode} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={betaCode}
                  onChange={(e) => setBetaCode(e.target.value)}
                  placeholder="Enter beta code"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400"
                >
                  Enter
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Info Cards */}
        {!isSignedIn && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-8">
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📺</div>
              <h3 className="font-bold mb-2">Always On</h3>
              <p className="text-gray-400 text-sm">24/7 stations curated from YouTube</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-bold mb-2">Your Community</h3>
              <p className="text-gray-400 text-sm">Follow. Chat. Connect. Live.</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-bold mb-2">Grow & Earn</h3>
              <p className="text-gray-400 text-sm">Build audience. Keep 90% revenue.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}