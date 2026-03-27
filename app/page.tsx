'use client'

import { useEffect, useState } from 'react'
import { getBetaToken, initBetaSession, getCurrentUser } from '@/lib/auth'
import Image from 'next/image'

export default function Home() {
  const [betaCode, setBetaCode] = useState('')
  const [showBetaForm, setShowBetaForm] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getBetaToken()
    if (token) {
      initBetaSession(token)
    }
    setUser(getCurrentUser())
    setLoading(false)
  }, [])

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (betaCode.trim()) {
      initBetaSession(betaCode)
      setUser(getCurrentUser())
      setBetaCode('')
      setShowBetaForm(false)
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-300 rounded flex items-center justify-center">
              <span className="text-black font-bold text-lg">▶</span>
            </div>
            <span className="font-bold text-lg">YoFi TV</span>
          </div>
          {user?.isBeta && (
            <div className="text-sm text-gray-400">
              {user.name} · <button onClick={() => { localStorage.clear(); window.location.href = '/' }} className="text-yellow-400 hover:text-yellow-300">Sign Out</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 p-4">
        {/* Logo */}
        <div className="w-24 h-24 bg-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-5xl font-bold text-black">▶</span>
        </div>

        {/* Hero */}
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Always On</h1>
          <p className="text-2xl text-gray-300 mb-2">Curate Your World</p>
          <p className="text-lg text-gray-400 mb-12">
            Watch stations. Follow creators. Cultivate your experience.
          </p>

          {user?.isBeta ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
                href="/stations"
                className="px-8 py-3 bg-yellow-300 text-black rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105"
              >
                Browse Stations
              </a>
              
                href="/dashboard"
                className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition border border-gray-700"
              >
                Create Station
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">Early access beta testing</p>
              <button
                onClick={() => setShowBetaForm(!showBetaForm)}
                className="px-6 py-2 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400 transition"
              >
                {showBetaForm ? 'Cancel' : 'Enter Beta Code'}
              </button>

              {showBetaForm && (
                <form onSubmit={handleBetaSubmit} className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value)}
                    placeholder="Enter beta code"
                    className="px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-yellow-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-300 text-black rounded font-bold hover:bg-yellow-400"
                  >
                    Enter
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mt-12">
          <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="font-bold text-lg mb-2">Always On</h3>
            <p className="text-gray-400 text-sm">
              24/7 stations curated from YouTube. Watch what station hosts cultivate for you.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-bold text-lg mb-2">Your Community</h3>
            <p className="text-gray-400 text-sm">
              Follow stations you love. Chat live. Cultivate your custom experience.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="font-bold text-lg mb-2">Grow Your Station</h3>
            <p className="text-gray-400 text-sm">
              Build an audience. Monetize your curation. Keep 90% of revenue.
            </p>
          </div>
        </div>

        {/* Phase 2 Preview */}
        <div className="max-w-2xl bg-gray-900 rounded-lg p-8 border border-gray-800 mt-8">
          <h3 className="text-xl font-bold mb-4">Coming in Phase 2</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <div>✓ Video uploads (70/30 ad revenue)</div>
            <div>✓ Appreciations/Tips (90/10)</div>
            <div>✓ Subscriptions (90/10)</div>
            <div>✓ Advanced analytics</div>
            <div>✓ Custom branding</div>
            <div>✓ Creator dashboard</div>
          </div>
        </div>
      </div>
    </div>
  )
}