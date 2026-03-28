'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createStation } from '@/lib/stations'
import { createStationSession, getCurrentStationSession } from '@/lib/stationAuth'

export default function CreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [passcode, setPasscode] = useState('')
  const [passcodeConfirm, setPasscodeConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const session = getCurrentStationSession()

  useEffect(() => {
    if (session) {
      router.push('/mystation')
    }
  }, [session, router])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!name.trim()) {
      setError('Station name is required')
      setLoading(false)
      return
    }

    if (!passcode || passcode.length < 4) {
      setError('Passcode must be at least 4 characters')
      setLoading(false)
      return
    }

    if (passcode !== passcodeConfirm) {
      setError('Passcodes do not match')
      setLoading(false)
      return
    }

    try {
      const station = createStation(name, description, passcode)
      createStationSession(station.id, station.name)
      router.push('/mystation')
    } catch (error) {
      setError('Failed to create station')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 mb-8 inline-block hover:text-white">
          ← Back
        </Link>

        <h1 className="text-4xl font-bold mb-8">Create Your Station</h1>

        <form onSubmit={handleCreate} className="bg-gray-900 p-8 rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Station Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., BoneMan's World"
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your station about?"
              rows={4}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Create a passcode (min 4 characters)"
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
              required
            />
            <p className="text-gray-500 text-xs mt-1">You'll use this to sign in to your station</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Confirm Passcode</label>
            <input
              type="password"
              value={passcodeConfirm}
              onChange={(e) => setPasscodeConfirm(e.target.value)}
              placeholder="Confirm your passcode"
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yofi-green"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !name}
            className="w-full bg-yofi-green text-black font-bold py-3 rounded hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Station'}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already have a station? <Link href="/signin" className="text-yofi-green hover:opacity-90">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}