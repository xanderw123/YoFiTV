'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const stations = JSON.parse(localStorage.getItem('stations') || '[]')
      const newStation = {
        id: Date.now().toString(),
        name,
        description,
      }
      stations.push(newStation)
      localStorage.setItem('stations', JSON.stringify(stations))

      setName('')
      setDescription('')
      router.push('/stations')
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
          Back
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
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your station about?"
              rows={4}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-yellow-300 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Station'}
          </button>
        </form>

        <div className="mt-12 bg-gray-900 p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Coming in Phase 2</h3>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>✓ Video rotation editor - drag & drop</p>
            <p>✓ Appreciations & Tips (90/10)</p>
            <p>✓ Subscriptions (90/10)</p>
            <p>✓ Ad revenue from uploads (70/30)</p>
            <p>✓ Analytics dashboard</p>
          </div>
        </div>
      </div>
    </div>
  )
}