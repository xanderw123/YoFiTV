'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createStation } from '@/lib/stations'
import { createStationSession } from '@/lib/stationAuth'

export default function CreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const station = createStation(name, description)
      createStationSession(station.id, station.name)
      router.push(`/stations/${station.id}/edit`)
    } catch (error) {
      console.error('Error creating station:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 mb-8 inline-block hover:text-white">
          ← Back
        </Link>

        <h1 className="text-4xl font-bold mb-8">Create Station</h1>

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

          <button
            type="submit"
            disabled={loading || !name}
            className="w-full bg-yofi-green text-black font-bold py-3 rounded hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Station'}
          </button>
        </form>

        <div className="mt-12 bg-gray-900 p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4">What happens next</h3>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>✓ Upload your station logo</p>
            <p>✓ Add YouTube videos to your rotation</p>
            <p>✓ Edit video titles & descriptions</p>
            <p>✓ Customize station settings</p>
            <p>✓ Your station goes live immediately</p>
          </div>
        </div>
      </div>
    </div>
  )
}