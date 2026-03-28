'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getStations, verifyStationPasscode } from '@/lib/stations'
import { createStationSession, getCurrentStationSession } from '@/lib/stationAuth'

export default function SignInPage() {
  const router = useRouter()
  const session = getCurrentStationSession()
  const [stations, setStations] = useState<any[]>([])
  const [selectedStationId, setSelectedStationId] = useState('')
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      router.push('/mystation')
      return
    }

    const allStations = getStations()
    setStations(allStations)
  }, [session, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!selectedStationId || !passcode) {
      setError('Please select a station and enter your passcode')
      setLoading(false)
      return
    }

    const isValid = verifyStationPasscode(selectedStationId, passcode)
    
    if (!isValid) {
      setError('Invalid passcode')
      setLoading(false)
      return
    }

    const station = stations.find(s => s.id === selectedStationId)
    if (station) {
      createStationSession(selectedStationId, station.name)
      router.push('/mystation')
    }
  }

  if (session) return null

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 mb-8 inline-block hover:text-white">
          ← Back
        </Link>

        <h1 className="text-4xl font-bold mb-2">Sign In to Your Station</h1>
        <p className="text-gray-400 mb-12">Enter your station name and passcode to manage your station.</p>

        {stations.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-6">No stations yet. Create one to get started!</p>
            <Link href="/create" className="inline-block px-8 py-3 bg-yofi-green text-black rounded-lg font-bold hover:opacity-90">
              Create a Station
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSignIn} className="bg-gray-900 rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Station</label>
              <select
                value={selectedStationId}
                onChange={(e) => setSelectedStationId(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
              >
                <option value="">Select your station...</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter your passcode"
                className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
              />
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedStationId || !passcode}
              className="w-full bg-yofi-green text-black font-bold py-3 rounded hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Don't have a station? <Link href="/create" className="text-yofi-green hover:opacity-90">Create one</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}